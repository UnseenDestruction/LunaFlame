import OpenAI from "openai";
import { NextResponse } from 'next/server';
import { ChatOpenAI } from "@langchain/openai";
import { ConversationChain } from "langchain/chains";
import {
    ChatPromptTemplate,
    MessagesPlaceholder,
} from "@langchain/core/prompts";

const GPT = process.env.GPT;
const openai = new OpenAI({ apiKey: GPT });

const prompt = ChatPromptTemplate.fromMessages([
    { role: "system", content: "Your name is Luna, you are an astrologer providing accurate predictions and dream interpretations and it should just be a conversational type and straight to the point." },
    new MessagesPlaceholder("messages"),
]);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userMessage } = body;

        const langchain = new ChatOpenAI({
            apiKey: GPT,
            modelName: "gpt-4o",
            temperature: 0,
        });

        const conversationChain = new ConversationChain({
            llm: langchain,
            verbose: true,
            prompt: prompt 
        });

        let assistantResponse = '';
        let imageUrl = null;

        const langChainResponse = await conversationChain.call({
            messages: [{ role: "user", content: userMessage }], 
        });

        assistantResponse += langChainResponse.response;

        const imagePrompt = `${userMessage}, highly realistic, 3D rendering, in natural light, portrait-oriented, vertical format, dream interpretation`;
        const imageResponse = await openai.images.generate({
            model: "dall-e-3", 
            prompt: imagePrompt,
            n: 1,
            size: "1024x1792",
        });

        if (imageResponse && imageResponse.data && imageResponse.data[0].url) {
            imageUrl = imageResponse.data[0].url;
        }

        return NextResponse.json({
            role: "assistant",
            content: assistantResponse,
            image: imageUrl,
            userMessage: userMessage
        });

    } catch (error: any) {
        console.error('Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
