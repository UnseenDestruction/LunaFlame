import OpenAI from "openai";
import { NextResponse } from "next/server";

const GPT = process.env.GPT;
const ACCESS_CODE = process.env.ACCESS_CODE;
const openai = new OpenAI({ apiKey: GPT });

async function analyzeImageWithOpenAI(Image: any) {

  console.log("Analyzing image data:", Image);

  

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are an expert palm reader and astrologer specializing in analyzing palm images. Respond in a structured JSON format without any additional text.",
      },
      {
        role: "user",
        content: [
          {type: "text", text:
`I have an image of a palm. Use your expertise to generate an analysis for:
          - Health
          - Love
          - Fate
          - Life
          - Career
          - Strengths and Weaknesses
          - Personality
        Additionally, I want you to provide coordinates for dots and lines in the palm.

          Respond only in JSON format as follows:
  
          {
            "health": "Your health analysis...",
            "love": "Your love analysis...",
            "fate": "Your fate analysis...",
            "life": "Your life analysis...",
            "career": "Your career analysis...",
            "characteristics": {
              "strengths": ["list of strengths"],
              "weaknesses": ["list of weaknesses"],
              "personality": "Your personality analysis..."
            }
          }
        `
          },
          {type: "image_url", image_url: {
            url: `${Image}`
          }}
        ]
      },
    ],
    max_tokens: 1000,
  });
  

  const content = response.choices[0].message.content;

  console.log("here is the content:", content)

  if (!content) {
    throw new Error("No content returned from OpenAI.");
  }

  const analysis = parseOpenAIAnalysis(content);

  return analysis;
}

function parseOpenAIAnalysis(content: string) {
  try {
    const cleanedContent = content.replace(/```json\s*|```/g, "").trim();
    const analysis = JSON.parse(cleanedContent);

    return {
      coordinates: analysis.coordinates || "No data.",
      health: analysis.health || "No data.",
      love: analysis.love || "No data.",
      fate: analysis.fate || "No data.",
      life: analysis.life || "No data.",
      career: analysis.career || "No data.",
      characteristics: {
        strengths: analysis.characteristics?.strengths || [],
        weaknesses: analysis.characteristics?.weaknesses || [],
        personality: analysis.characteristics?.personality || "No data.",
      },
    };
  } catch (error) {
    console.error("Error parsing JSON response:", error, content);
    return {
      health: "No data.",
      love: "No data.",
      fate: "No data.",
      life: "No data.",
      career: "No data.",
      characteristics: {
        strengths: [],
        weaknesses: [],
        personality: "No data.",
      },
    };
  }
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

    console.log("here is the:", visionAnalysis)

    const percentages = calculateDynamicPercentages(visionAnalysis);

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a skilled astrologer and palm reader. Provide a detailed analysis based on the user's palm image.`,
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
