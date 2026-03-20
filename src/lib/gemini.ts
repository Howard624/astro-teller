// File: src/lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

// 1. Retrieve the secret key from your .env.local "vault"
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('CRITICAL: GEMINI_API_KEY is missing in .env.local!');
}

// 2. Initialize the Google AI SDK with your key
const genAI = new GoogleGenerativeAI(apiKey);

// 3. Configure and export the specific model instance
// We use 'gemini-3-flash-preview' for maximum speed and intelligence
export const geminiModel = genAI.getGenerativeModel({
  model: 'gemini-3-flash-preview',
  generationConfig: {
    temperature: 0.8, // 0.8 adds a touch of creative "mysticism" to the responses
    maxOutputTokens: 1000, // Limits the length of the fortune to about 500-800 words
  },
});