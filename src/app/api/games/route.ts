import { env } from "@/app/utils/env";
import { getSession } from "@/app/utils/session";
import prisma from "@/app/utils/prismaClient";
import { Game } from "@/types/types";

export async function POST(request: Request) {
  try {
    const { page = 1, search = "", page_size = 6 } = await request.json();
    const API_KEY = env.NEXT_PUBLIC_RAWG_API_KEY;

    /**
     * TODO
     * Security validation for attacks like XSS , SQLI ...
     */
    const RAWG_URL = `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=${page_size}&search=${search}`;
    const response = await fetch(RAWG_URL);

    if (!response.ok) throw new Error("RAWG API request failed");

    const data = await response.json();

    const filteredGames: Game[] = data?.results?.filter((game: Game) => game.background_image && game.name && game.rating) || [];

    const session = await getSession();
    const userId = session?.user?.id || null;

    let userFavorites: number[] = [];
    if (userId) {
      const favorites = await prisma.favorites.findMany({
        where: { userId },
        select: { gameId: true },
      });
      userFavorites = favorites.map((fav) => fav.gameId);
    }

    return Response.json(
      {
        results: filteredGames,
        total_count: search ? filteredGames.length : data.count,
        favorites: userFavorites,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ error: "Failed to fetch games" }, { status: 500 });
  }
}
