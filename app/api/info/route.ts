import OpenAI from "openai";
import { DateTime } from "luxon";
import { NextResponse } from "next/server";

const GPT = process.env.GPT;
const ACCESS_CODE = process.env.ACCESS_CODE;
const openai = new OpenAI({ apiKey: GPT });

type SignUpRequest = {
  name: string;
  dob: string;
  time: string;
  location: string;
  email: string;
  password: string;
};

export async function POST(request: any) {
  try {
    const accessCode = request.headers.get("x-api-key");
    if (!accessCode || accessCode !== ACCESS_CODE) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body: SignUpRequest = await request.json();

    console.log(body);

    if (!body.name || !body.dob) {
      return NextResponse.json({
        status: "error",
        message:
          "Invalid input. Please provide name, date of birth, and time of birth.",
      });
    }

    const time = body.time || "12:00:00";
    const birthDateTime = DateTime.fromISO(`${body.dob}T${time}`);

    if (!birthDateTime.isValid) {
      return NextResponse.json({
        status: "error",
        message: "Invalid date or time of birth. Please provide valid inputs.",
      });
    }

    console.log(`Parsed DateTime: ${birthDateTime.toISO()}`);
    console.log(`Month: ${birthDateTime.month}, Day: ${birthDateTime.day}`);

    const sunSign = calculateSunSign(birthDateTime);
    const moonSign = calculateMoonSign(birthDateTime);
    const ascendant = calculateAscendant(birthDateTime, body.location);
    const element = getElement(sunSign);

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert astrologer providing detailed horoscope analysis. Include horoscope, affirmation, tips, matches, lunar calendar, and today's astrological features.`,
        },
        {
          role: "user",
          content: `Based on the following data, generate a detailed astrological analysis including:
            - Horoscope
            - Affirmation
            - Today's Tips
            - Today's Matches
            - Lunar Calendar
            - Today's Features
            
            Name: ${body.name}
            Sun Sign: ${sunSign}
            Moon Sign: ${moonSign}
            Ascendant: ${ascendant}
            Element: ${element}
           `,
        },
      ],
    });

    const assistantResponse = response.choices[0].message.content;

    console.log(assistantResponse);

    if (!assistantResponse) {
      return NextResponse.json({
        status: "error",
        message: "The assistant did not return a response.",
      });
    }

    const extractedData = parseAssistantResponse(assistantResponse);

    return NextResponse.json({
      status: "success",
      message: "Info Analysis Complete",
      content: assistantResponse,
      Name: extractedData.name || body.name,
      Moon: extractedData.moonSign || moonSign,
      Ascendant: extractedData.ascendant || ascendant,
      Element: extractedData.element || element,
      SunSign: extractedData.sunSign || sunSign,
    });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

function calculateSunSign(dateTime: DateTime): string {
  const month = dateTime.month;
  const day = dateTime.day;

  const signs: [string, number][] = [
    ["Capricorn", 19],
    ["Aquarius", 18],
    ["Pisces", 20],
    ["Aries", 19],
    ["Taurus", 20],
    ["Gemini", 20],
    ["Cancer", 22],
    ["Leo", 22],
    ["Virgo", 22],
    ["Libra", 22],
    ["Scorpio", 21],
    ["Sagittarius", 21],
  ];

  if (month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}`);
  }

  const nextMonth = month % 12;
  return day > signs[month - 1][1]
    ? signs[nextMonth][0]
    : signs[month - 1][0];
}

function calculateMoonSign(dateTime: DateTime) {
  return "Leo";
}

function calculateAscendant(dateTime: DateTime, location: string) {
  return "Sagittarius";
}

function getElement(sunSign: string) {
  const elements: { [key: string]: string } = {
    Aries: "Fire",
    Leo: "Fire",
    Sagittarius: "Fire",
    Taurus: "Earth",
    Virgo: "Earth",
    Capricorn: "Earth",
    Gemini: "Air",
    Libra: "Air",
    Aquarius: "Air",
    Cancer: "Water",
    Scorpio: "Water",
    Pisces: "Water",
  };

  return elements[sunSign] || "Unknown";
}

function parseAssistantResponse(response: string) {
  const nameMatch = response.match(/Name: ([\w\s]+)/);
  const sunSignMatch = response.match(/Sun Sign: (\w+)/);
  const moonSignMatch = response.match(/Moon Sign: (\w+)/);
  const ascendantMatch = response.match(/Ascendant: (\w+)/);
  const elementMatch = response.match(/Element: (\w+)/);

  return {
    name: nameMatch ? nameMatch[1].trim() : undefined,
    sunSign: sunSignMatch ? sunSignMatch[1].trim() : undefined,
    moonSign: moonSignMatch ? moonSignMatch[1].trim() : undefined,
    ascendant: ascendantMatch ? ascendantMatch[1].trim() : undefined,
    element: elementMatch ? elementMatch[1].trim() : undefined,
  };
}
