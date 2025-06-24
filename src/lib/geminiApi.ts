// Gemini API integration with streaming support
interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Non-streaming response (for backward compatibility)
export async function generateResponse(userMessage: string, context?: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  // Build the prompt with context if available
  let prompt = '';
  
  if (context) {
    prompt = `You are an AI assistant specialized in discussing "The Technological Republic" by Alex Karp. Use the following context from the book and related materials to provide informed, accurate responses.

CONTEXT:
${context}

USER QUESTION: ${userMessage}

Please provide a thoughtful response based on the context above and your knowledge of the book's themes. If the context doesn't contain relevant information for the question, acknowledge this and provide what insight you can based on the book's general themes.`;
  } else {
    prompt = `You are an AI assistant specialized in discussing "The Technological Republic" by Alex Karp. 

USER QUESTION: ${userMessage}

Please provide a thoughtful response about the book's themes and arguments. Note: Additional context materials are being prepared and will enhance future responses.`;
  }

  const requestBody: GeminiRequest = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  };

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response generated from Gemini API');
    }

    const responseText = data.candidates[0].content.parts[0].text;
    return responseText;
    
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    if (error instanceof Error) {
      return `Sorry, I encountered an error: ${error.message}. Please check your API key and try again.`;
    }
    
    return 'Sorry, I encountered an unexpected error. Please try again.';
  }
}

// Streaming response function
export async function generateStreamingResponse(
  userMessage: string, 
  context?: string,
  onChunk?: (chunk: string) => void
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  // Build the prompt with context if available
  let prompt = '';
  
  if (context) {
    prompt = `You are an AI assistant specialized in discussing "The Technological Republic" by Alex Karp. Use the following context from the book and related materials to provide informed, accurate responses.

CONTEXT:
${context}

USER QUESTION: ${userMessage}

Please provide a thoughtful response based on the context above and your knowledge of the book's themes. If the context doesn't contain relevant information for the question, acknowledge this and provide what insight you can based on the book's general themes.`;
  } else {
    prompt = `You are an AI assistant specialized in discussing "The Technological Republic" by Alex Karp. 

USER QUESTION: ${userMessage}

Please provide a thoughtful response about the book's themes and arguments. Note: Additional context materials are being prepared and will enhance future responses.`;
  }

  const requestBody: GeminiRequest = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  };

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response generated from Gemini API');
    }

    const responseText = data.candidates[0].content.parts[0].text;
    
    // Simulate streaming by sending chunks
    if (onChunk) {
      const words = responseText.split(' ');
      let currentText = '';
      
      for (const word of words) {
        currentText += (currentText ? ' ' : '') + word;
        onChunk(currentText);
        // Small delay to simulate streaming
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
    
    return responseText;
    
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    if (error instanceof Error) {
      return `Sorry, I encountered an error: ${error.message}. Please check your API key and try again.`;
    }
    
    return 'Sorry, I encountered an unexpected error. Please try again.';
  }
} 