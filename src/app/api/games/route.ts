import { env } from "@/app/utils/env";

export async function POST(request : Request) {
  try {
    const API_KEY = env.NEXT_PUBLIC_RAWG_API_KEY;
    const RAWG_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

    const response = await fetch(RAWG_URL);
    const data = await response.json();

    return Response.json(data,{status: 200});
  } catch (error) {
    return Response.json({ error: "Failed to fetch games" }, { status: 500 });
  }
}
