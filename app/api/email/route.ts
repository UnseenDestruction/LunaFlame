
import { NextResponse } from "next/server";
import { db } from "@/lib/db";



export async function POST(req: Request) {
  try {


    const body = await req.json();

    console.log(body)

    const { email } = body;

    console.log(email)

    try {
      await db.waitlist.create({
        data: {
          email,
        },
      });
      return NextResponse.json({ message: "Added Email" }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ user: null, message: "An error occurred while creating user" }, { status: 500 });

    }


  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ user: null, message: "An error occurred while creating user" }, { status: 500 });
  }
}
