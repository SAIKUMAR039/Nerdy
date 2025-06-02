import { GeminiRequest, GeminiResponse } from '../types';

const API_KEY = 'AIzaSyC3ihKC_ws8fjzqh5lJUXLHdW7pHEFzZhM';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function generateContent(prompt: string): Promise<string> {
  try {
    // For code analysis tools, enhance the prompt to get structured output
    const enhancedPrompt = prompt + "\n\nPlease structure your response with clear sections marked by ** ** and format code blocks with ```language\ncode\n```";

    const request: GeminiRequest = {
      contents: [
        {
          parts: [
            {
              text: enhancedPrompt
            }
          ]
        }
      ]
    };

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data: GeminiResponse = await response.json();
    let content = data.candidates[0].content.parts[0].text;

    // Ensure code blocks are properly formatted
    content = content.replace(/```(\w+)?\s*\n/g, '```$1\n');
    
    return content;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}