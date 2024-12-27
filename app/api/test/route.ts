import OpenAI from "openai";
import { NextResponse } from "next/server";

const GPT = process.env.GPT;
const Google = process.env.Google;
const ACCESS_CODE = process.env.ACCESS_CODE;
const openai = new OpenAI({ apiKey: GPT });

export async function POST(request: Request) {
    try {
      const accessCode = request.headers.get("x-api-key");
      if (!accessCode || accessCode !== ACCESS_CODE) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const body = await request.json();
      const { Image } = body;
  
      console.log(Image)
  
  
  
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
  
      const assistantResponse = response.choices[0].message.content;
  
      return NextResponse.json({
        status: "success",
        message: "Palm analysis completed.",
        analysis: {
         assistantResponse
        },
      });
    } catch (error) {
      console.error("Error:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }