import { createPerplexity } from '@ai-sdk/perplexity';
import { streamText } from 'ai';
import { SYSTEM_PROMPT } from '@/lib/prompts';
import { MAX_PROMPT_LENGTH } from '@/lib/constants';
import type { InteractionType } from '@/types';

const perplexity = createPerplexity({
  apiKey: process.env.PERPLEXITY_API_KEY ?? '',
});

export const maxDuration = 45;

function getModelForInteraction(type: InteractionType): string {
  switch (type) {
    case 'explain-more':
      return 'sonar-pro';
    case 'initial':
    case 'follow-up':
    default:
      return 'sonar';
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const question = body.prompt ?? body.question;
  const interactionType: InteractionType = body.interactionType ?? 'initial';

  if (!question || typeof question !== 'string' || question.length > MAX_PROMPT_LENGTH) {
    return new Response(JSON.stringify({ error: 'Invalid question' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const model = getModelForInteraction(interactionType);

  const result = streamText({
    model: perplexity(model),
    system: SYSTEM_PROMPT,
    prompt: question,
    providerOptions: {
      perplexity: {
        search_recency_filter: 'month',
      },
    },
  });

  // Custom stream: forward text in real-time, collect citation URLs,
  // then append them as a delimiter after all text is streamed.
  const encoder = new TextEncoder();
  const citations: string[] = [];

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const part of result.fullStream) {
          if (part.type === 'text-delta') {
            controller.enqueue(encoder.encode(part.text));
          } else if (part.type === 'source' && part.sourceType === 'url') {
            citations.push(part.url);
          }
        }
        if (citations.length > 0) {
          controller.enqueue(
            encoder.encode(`\n<!--CITATIONS:${JSON.stringify(citations)}-->`)
          );
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
