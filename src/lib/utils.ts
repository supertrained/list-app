export function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^[-*]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\n{2,}/g, '. ')
    .replace(/\n/g, '. ')
    .trim();
}

export function generateBlockId(): string {
  return crypto.randomUUID();
}

export function findInsertIndex(thread: { parentId?: string; id: string }[], parentId: string): number {
  const parentIdx = thread.findIndex(b => b.id === parentId);
  if (parentIdx === -1) return thread.length;
  let idx = parentIdx + 1;
  while (idx < thread.length && thread[idx].parentId !== undefined) {
    idx++;
  }
  return idx;
}
