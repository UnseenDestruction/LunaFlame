import OpenAI from "openai";
import { NextResponse } from "next/server";

const GPT = process.env.GPT;
const ACCESS_CODE = process.env.ACCESS_CODE;
const openai = new OpenAI({ apiKey: GPT });

export async function POST(request: Request) {
  try {
    const accessCode = request.headers.get("x-api-key");
    if (!accessCode || accessCode !== ACCESS_CODE) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    console.log("here is the credits:", body)

    const { userName, dob } = body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a skilled numerologist. Given a name and date of birth, analyze the user's numerology and return structured JSON data. 
          The response must be a valid JSON array of objects, each representing a numerology aspect. 
          Each object should have:
          - "name": The numerology aspect (e.g., "Life Path Number", "Expression Number").
          - "number": The calculated numerology number.
          - "title": A unique and descriptive title related to the meaning of the numerology number.
          - "description": A detailed explanation of its significance, including strengths, challenges, and personality traits.
          Return **only** the JSON data, no extra text.`
        },
        {
          role: "user",
          content: `Please calculate the numerology readings based on the following information:
          Name: ${userName}
          Date of Birth: ${dob}
          
          Return the response in JSON format as an array of objects. Each object should contain:
          - "name" (e.g., "Life Path Number")
          - "number" (the derived number)
          - "title" (a creative label)
          - "description" (detailed meaning of the number).`
        },
      ],
    });

    let assistantResponse = response.choices[0]?.message?.content;


    if (!assistantResponse) {
      throw new Error("Assistant response is null or undefined.");
    }

    assistantResponse = assistantResponse.replace(/```json|```/g, "").trim();
    console.log("Cleaned assistant response:", assistantResponse);

    let numerology;
    try {
      numerology = JSON.parse(assistantResponse);
      if (!Array.isArray(numerology)) {
        throw new Error("Response format is invalid: Expected an array.");
      }
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError);
      throw new Error("Failed to parse response. Ensure JSON structure is correct.");
    }


    return NextResponse.json({
      status: "success",
      message: "Numerology Analysis Complete.",
      content: numerology,
    });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
