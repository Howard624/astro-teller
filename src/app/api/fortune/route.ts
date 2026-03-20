/**
 * @ai Wrote Code
 * @aidetails Created a POST API route to handle user data and generate a fortune using AI.
 */
import { NextResponse } from 'next/server';
import { geminiModel } from '@/lib/gemini';

/**
 * Handles the POST request for fortune telling.
 * @param {Request} req - The incoming HTTP request containing user's birth data.
 * @returns {Promise<NextResponse>} The AI-generated fortune or an error message.
 */
export async function POST(req: Request) {
  try {
    // 1. Unpack the data sent from the frontend
    const body = await req.json();
    const { name, gender, birthDate, birthTime, mbti } = body;

    // 2. Simple validation: Must have a name and a birthday
    if (!name || !birthDate) {
      return NextResponse.json(
        { error: 'Name and Birth Date are required.' },
        { status: 400 }
      );
    }

    // 3. Crafting the "Mystic Master" persona prompt
    const prompt = `
      You are a world-class mystical master specializing in Eastern and Western astrology.
      Your tone: Wise, mysterious, insightful, and slightly witty.
      
      Reading for:
      - Name: ${name}
      - Gender: ${gender}
      - Birth Date: ${birthDate}
      - Birth Time: ${birthTime || 'Unknown'}
      - MBTI: ${mbti || 'Unknown'}

      Output 3 sections in Chinese (Simplified) using beautiful Markdown and emojis:
      1. 【命盘解析】 (Soul Analysis)
      2. 【三月运势】 (3-Month Forecast)
      3. 【大师锦囊】 (Master's Advice)
    `;

    // 4. Send to Gemini and get the "divine" answer
    const result = await geminiModel.generateContent(prompt);
    const responseText = result.response.text();

    // 5. Send the result back to the frontend
    return NextResponse.json({ fortuneText: responseText });

  } catch (error) {
    // Log error for debugging, but keep the user response polite
    console.error('SERVER_API_ERROR:', error);
    return NextResponse.json(
      { error: 'The stars are hidden. Please try again later.' },
      { status: 500 }
    );
  }
}