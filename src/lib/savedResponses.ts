import { SavedResponse } from '@/types';

const STORAGE_KEY = 'list_saved_responses';

export function loadSavedResponses(): SavedResponse[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveResponse(question: string, completion: string): SavedResponse | null {
  if (typeof window === 'undefined') return null;
  const existing = loadSavedResponses();
  if (existing.some((r) => r.question === question && r.completion === completion)) return null;
  const item: SavedResponse = {
    id: crypto.randomUUID(),
    question,
    completion,
    savedAt: Date.now(),
  };
  const updated = [item, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return item;
}

export function deleteSavedResponse(id: string): SavedResponse[] {
  if (typeof window === 'undefined') return [];
  const existing = loadSavedResponses();
  const updated = existing.filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function getSavedResponseById(id: string): SavedResponse | null {
  return loadSavedResponses().find((r) => r.id === id) ?? null;
}
