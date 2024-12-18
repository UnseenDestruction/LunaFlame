import OpenAI from "openai";
import { NextResponse } from "next/server";

const GPT = process.env.GPT;
const ACCESS_CODE = process.env.ACCESS_CODE;
const openai = new OpenAI({ apiKey: GPT });

async function analyzeImageWithOpenAI(Image: any) {


  console.log(Image)

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are an expert palm reader and astrologer specializing in analyzing images of palms to extract insights about health, love, fate, and life.",
      },
      {
        role: "user",
        content: `I have an image of a palm. Use your expertise to generate an analysis for:
        - Health
        - Love
        - Fate
        - Life
        - Career
        - Strengths and Weaknesses
        - Personality
      
        Provide a structured response.
        The image data is as follows: 
        `,
      },
    ],
    max_tokens: 1000,
  });

  

  const content = response.choices[0].message.content;

  if (!content) {
    throw new Error("No content returned from OpenAI.");
  }

  const analysis = parseOpenAIAnalysis(content);

  return analysis;
}

function parseOpenAIAnalysis(content: string) {
  const health = content.match(/- Health: (.+)/)?.[1] || "No data.";
  const love = content.match(/- Love: (.+)/)?.[1] || "No data.";
  const fate = content.match(/- Fate: (.+)/)?.[1] || "No data.";
  const life = content.match(/- Life: (.+)/)?.[1] || "No data.";
  const career = content.match(/- Career: (.+)/)?.[1] || "No data.";
  const strengths = content.match(/- Strengths: (.+)/)?.[1]?.split(", ") || [];
  const weaknesses = content.match(/- Weaknesses: (.+)/)?.[1]?.split(", ") || [];
  const personality = content.match(/- Personality: (.+)/)?.[1] || "No data.";

  return {
    health,
    love,
    fate,
    life,
    career,
    characteristics: {
      strengths,
      weaknesses,
      personality,
    },
  };
}

function calculateDynamicPercentages(analysis: any) {
  const totalAttributes = Object.keys(analysis).length;
  const baseValues = {
    health: analysis.health.length % 100,
    love: analysis.love.length % 100,
    fate: analysis.fate.length % 100,
    life: analysis.life.length % 100,
  };

  const normalizedPercentages = Object.fromEntries(
    Object.entries(baseValues).map(([key, value]) => [
      key,
      Math.min(Math.max(value, 20), 100),
    ])
  );

  return normalizedPercentages;
}

export async function POST(request: Request) {
  try {
    const accessCode = request.headers.get("x-api-key");
    if (!accessCode || accessCode !== ACCESS_CODE) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { Image } = body;

    console.log(Image)


    const visionAnalysis = await analyzeImageWithOpenAI(Image);

    const percentages = calculateDynamicPercentages(visionAnalysis);

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a skilled astrologer and palm reader. Provide a detailed analysis based on the user's palm image.",
        },
        {
          role: "user",
          content: `Palm analysis results:
          - Health: ${visionAnalysis.health}
          - Love: ${visionAnalysis.love}
          - Fate: ${visionAnalysis.fate}
          - Life: ${visionAnalysis.life}
          - Career: ${visionAnalysis.career}
          - Characteristics:
            Strengths: ${visionAnalysis.characteristics.strengths.join(", ")}
            Weaknesses: ${visionAnalysis.characteristics.weaknesses.join(", ")}
            Personality: ${visionAnalysis.characteristics.personality}
          
          Provide insights for Overview, Career, and Characteristics make it direct to the point and accurate.`,
        },
      ],
    });

    const assistantResponse = response.choices[0].message.content;

    return NextResponse.json({
      status: "success",
      message: "Palm analysis completed.",
      analysis: {
        overview: {
          percentages,
          summary: "A dynamic summary derived from your palm reading insights.",
        },
        visionAnalysis,
        detailedInsights: assistantResponse,
        career: {
          description: visionAnalysis.career,
        },
        characteristics: visionAnalysis.characteristics,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
