// Tool and Content Types
export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  promptTemplate: string;
}

export interface GeneratedContent {
  id: string;
  user_id?: string;
  toolid: string;
  content: string;
  prompt: string;
  timestamp: number | string;
}

// Gemini API Types
export interface GeminiRequest {
  contents: {
    parts: {
      text: string;
    }[];
  }[];
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}