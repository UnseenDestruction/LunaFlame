/* eslint-disable */

import OpenAI from "openai";
import { DateTime } from "luxon";
import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/storage";

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
  userId:  string;
  gender: string
};



export async function POST(request: Request) {
  try {
    const accessCode = request.headers.get("x-api-key");
    if (!accessCode || accessCode !== ACCESS_CODE) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body: SignUpRequest = await request.json();

    console.log("here is the data from client:", body);

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
            Today's Horoscope: Today's Horoscope
            Affirmation: Affirmation
            Daily Tips for ${sunSign}: 
            Daily Tips for ${sunSign} 
            -Love
            -Warning
            -Work
            -Suggestions
            Today's Matches: Today's Matches
            Lunar Calendar:  Lunar Calendar

            
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

    console.log("here is the:", extractedData.affirmation)
    

    const { error } = await supabase.from("horoscopes").insert([
      {
        userId: body.userId,
        name: body.name,
        sun_sign: sunSign,
        moon_sign: moonSign,
        ascendant: ascendant,
        element: element,
        todayHoroscope: extractedData.horoscope,
        affirmation: extractedData.affirmation,
        dailyTips: extractedData.tips,
        matches: extractedData.matches,
        lunar_calendar: extractedData.lunarCalendar,
        features: extractedData.features,
        gender: body.gender,
        birth: body.dob
      },
    ]);

    if (error) {
      console.error("Supabase Insert Error:", error);
      return NextResponse.json({
        status: "error",
        message: `Failed to save data to the database. ${error}`,
      });
    }

    return NextResponse.json({
      status: "success",
      message: "Info Analysis Complete",
      content: assistantResponse,
      Name: body.name,
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

function parseAssistantResponse(response: any) {
  const nameMatch = response.match(/Name: ([\w\s]+)/);
  const sunSignMatch = response.match(/Sun Sign: (\w+)/);
  const moonSignMatch = response.match(/Moon Sign: (\w+)/);
  const ascendantMatch = response.match(/Ascendant: (\w+)/);
  const elementMatch = response.match(/Element: (\w+)/);
  const horoscopeMatch = response.match(/Horoscope:([\s\S]+?)(?=Affirmation|$)/);
  const affirmationMatch = response.match(/Affirmation:\s*\*\*([\s\S]*?)\*\*/);
  const dateMatch = response.match(/Date: ([\w\s]+)/);
  const tipsMatch = response.match(/Tips:([\s\S]+?)(?=Matches|$)/);
  const matchesMatch = response.match(/Matches:([\s\S]+?)(?=Lunar Calendar|$)/);
  const lunarCalendarMatch = response.match(/Lunar Calendar:([\s\S]+?)(?=Features|$)/);
  const featuresMatch = response.match(/Features:([\s\S]+?)(?=$)/);

  const parsedData = {
    sunSign: sunSignMatch ? sunSignMatch[1].trim() : undefined,
    moonSign: moonSignMatch ? moonSignMatch[1].trim() : undefined,
    ascendant: ascendantMatch ? ascendantMatch[1].trim() : undefined,
    element: elementMatch ? elementMatch[1].trim() : undefined,
    horoscope: horoscopeMatch ? horoscopeMatch[1].trim() : undefined,
    affirmation: affirmationMatch ? affirmationMatch[1].trim() : undefined,
    date: dateMatch ? dateMatch[1].trim() : undefined,
    tips: tipsMatch ? tipsMatch[1].trim() : undefined,
    matches: matchesMatch ? matchesMatch[1].trim() : undefined,
    lunarCalendar: lunarCalendarMatch ? lunarCalendarMatch[1].trim() : undefined,
    features: featuresMatch ? featuresMatch[1].trim() : undefined,
  };

  console.log("Parsed Data:", parsedData);

  return parsedData;
}

