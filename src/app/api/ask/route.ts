import { createPerplexity } from '@ai-sdk/perplexity';
import { streamText } from 'ai';
import { SYSTEM_PROMPT } from '@/lib/prompts';
import { MAX_PROMPT_LENGTH } from '@/lib/constants';

const perplexity = createPerplexity({
  apiKey: process.env.PERPLEXITY_API_KEY ?? '',
});

export const maxDuration = 30;

export async function POST(request: Request) {
  const body = await request.json();
  const question = body.prompt ?? body.question;

  if (!question || typeof question !== 'string' || question.length > MAX_PROMPT_LENGTH) {
    return new Response(JSON.stringify({ error: 'Invalid question' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const result = streamText({
    model: perplexity('sonar'),
    system: SYSTEM_PROMPT,
    prompt: question,
    providerOptions: {
      perplexity: {
        search_recency_filter: 'month',
      },
    },
  });

  return result.toTextStreamResponse();
}
