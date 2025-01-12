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
    console.log("here is the credits:", body);

    const { one, two } = body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert astrologer and relationship analyst. You specialize in creating detailed and visually appealing Zodiac compatibility reports. 
          Given two Zodiac signs, generate structured JSON data that represents the compatibility report. The JSON output must include:
          1. "zodiacOne": The first Zodiac sign's name (${one}) and a short description of its traits.
          2. "zodiacTwo": The second Zodiac sign's name (${two}) and a short description of its traits.
          3. "relationshipOverview": A detailed summary of the compatibility between the two signs, covering their strengths, challenges, and overall connection.
          4. "compatibilitySections": An array of objects, each containing:
             - "title": The section title (e.g., "Emotional Connection").
             - "percentage": Compatibility percentage for that aspect (e.g., 60).
             - "description": A brief explanation of why the compatibility score was assigned.
          5. "advice": A personalized message or suggestion for improving the relationship based on their traits.
          
          The JSON response must be structured in this way and include creative, meaningful content relevant to Zodiac compatibility. Return **only** the JSON data, no extra text.`
        }
      ],
    });

    let assistantResponse = response.choices[0]?.message?.content;

    if (!assistantResponse) {
      throw new Error("Assistant response is null or undefined.");
    }

    assistantResponse = assistantResponse.replace(/```json|```/g, "").trim();
    console.log("Cleaned assistant response:", assistantResponse);

    let compatibilityReport;
    try {
      compatibilityReport = JSON.parse(assistantResponse);
      if (typeof compatibilityReport !== "object" || Array.isArray(compatibilityReport)) {
        throw new Error("Response format is invalid: Expected an object.");
      }
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError);
      throw new Error("Failed to parse response. Ensure JSON structure is correct.");
    }

    return NextResponse.json({
      status: "success",
      message: "Compatibility Analysis Complete.",
      content: compatibilityReport,
    });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
