import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

export async function POST(request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'GROQ_API_KEY is not set in environment variables.' }, { status: 500 });
    }

    const { mood } = await request.json();

    if (!mood) {
      return NextResponse.json({ error: 'Mood is required.' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'llama3-70b-8192',
      messages: [
        {
          role: 'system',
          content: `You are a genius songwriter who writes viral Urdu/Hindi/English song hooks.
Your hooks are deeply emotional, poetic, and instantly memorable.
Use a natural mix of Urdu, Hindi, and English (Hinglish/code-switching style).
Write in Roman script only — no Nastaliq/Devanagari script.
Return ONLY the hook text — no quotes, no explanation, no title, nothing else.`,
        },
        {
          role: 'user',
          content: `Write one viral song hook (2–4 lines). Mood: ${mood}.`,
        },
      ],
      temperature: 0.88,
      max_tokens: 100,
    });

    const hook = completion.choices[0].message.content.trim();
    return NextResponse.json({ hook });

  } catch (error) {
    console.error('Groq API error:', error);
    return NextResponse.json({ error: error.message || 'Something went wrong.' }, { status: 500 });
  }
}
