export interface ExampleQuestion {
  text: string;
  category: string;
}

export interface SavedResponse {
  id: string;
  question: string;
  completion: string;
  savedAt: number;
}

export type InteractionType = 'initial' | 'follow-up' | 'explain-more';

export interface ResponseBlock {
  id: string;
  type: InteractionType;
  heading: string;
  content: string;
  citations: string[];
  timestamp: number;
  parentId?: string;
}
