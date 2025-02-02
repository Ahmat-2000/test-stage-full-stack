import { NextResponse } from "next/server";

export async function GET() {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
    const RAWG_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

    const response = await fetch(RAWG_URL);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 });
  }
}
