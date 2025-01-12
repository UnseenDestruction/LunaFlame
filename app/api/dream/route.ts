import { NextResponse } from 'next/server';
import OpenAI from "openai";

const GPT = process.env.GPT;
const ACCESS_CODE = process.env.ACCESS_CODE;
const openai = new OpenAI({ apiKey: GPT });

export async function POST(request: Request) {
    const start = Date.now();

    try {
        const accessCode = request.headers.get("x-api-key");
        if (!accessCode || accessCode !== ACCESS_CODE) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await request.json();
        const { userMessage } = body;

        const chatPromise = openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "Your name is Luna, you are an astrologer providing accurate predictions and dream interpretations. Be conversational and straight to the point." },
                { role: "user", content: userMessage }
            ],
            temperature: 0.7,
        });

        const imagePrompt = `${userMessage}, highly realistic, 3D rendering, in natural light, portrait-oriented, vertical format, dream interpretation`;
        const imagePromise = openai.images.generate({
            model: "dall-e-3",
            prompt: imagePrompt,
            n: 1,
            size: "1024x1792",
        });

        const [chatResponse, imageResponse] = await Promise.all([chatPromise, imagePromise]);

        const assistantResponse = chatResponse.choices[0]?.message?.content || "I'm sorry, I couldn't process that.";
        const imageUrl = imageResponse.data[0]?.url || null;

        console.log(`Execution Time: ${Date.now() - start}ms`);

        return NextResponse.json({
            role: "assistant",
            content: assistantResponse,
            image: imageUrl,
            userMessage: userMessage,
        });
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
