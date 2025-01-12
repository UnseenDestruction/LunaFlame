/* eslint-disable */

import OpenAI from "openai";
import { NextResponse } from "next/server";

const GPT = process.env.GPT;
const ACCESS_CODE = process.env.ACCESS_CODE;
const openai = new OpenAI({ apiKey: GPT });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(request: Request) {
  try {
    const accessCode = request.headers.get("x-api-key");
    if (!accessCode || accessCode !== ACCESS_CODE) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { selected } = body;

    const cardDescriptions = selected.map((card: { description: any }) => card.description).join(", ");
    console.log("Selected cards:", cardDescriptions);

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a skilled astrologer and tarot reader. Provide a detailed analysis based on the user's cards. Return the response strictly in valid JSON format. Do not include any Markdown or additional text.`,
        },
        {
          role: "user",
          content: `Tarot Card Result:
Provide a unique and descriptive title (different from the card name) and a description for each card. The title should capture the essence of the card's meaning in a concise way. The description should explain the card's significance in detail, focusing on its symbolism and message. Return the response strictly in valid JSON format as an array of objects with "title" and "description" keys. Here are the selected cards: ${cardDescriptions}`,
        },
      ],
    });

    let assistantResponse = response.choices[0]?.message?.content;
    if (!assistantResponse) {
      throw new Error("Assistant response is null or undefined.");
    }


    assistantResponse = assistantResponse.replace(/```json|```/g, "").trim();
    console.log("Cleaned assistant response:", assistantResponse);

    let cardData;
    try {
      cardData = JSON.parse(assistantResponse);
    } catch (parseError) {
      console.error("Failed to parse assistant response as JSON:", parseError);
      throw new Error("Response format is invalid or not JSON.");
    }

    console.log("Parsed card data:", cardData);

    return NextResponse.json({
      status: "success",
      message: "Tarot Card Analysis Complete.",
      content: cardData,
    });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
