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

export interface ResponseBlock {
  id: string;
  type: 'initial' | 'explain-more' | 'follow-up';
  heading: string;
  content: string;
  timestamp: number;
}
