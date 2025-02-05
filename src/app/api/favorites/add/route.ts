import { getSession } from "@/app/utils/session";
import prisma from "@/app/utils/prismaClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gameId, name, released, rating, background_image, genres } = body;

     /**
     * TODO
     * Security validation for attacks like XSS , SQLI ...
     */

    if (!gameId || !name || !background_image) {
      return new Response(
        JSON.stringify({ error: "Missing required game data" }),
        { status: 400 }
      );
    }

    const session = await getSession();
    if (!session?.user?.id) {
      return new Response(
        JSON.stringify({ error: "User is not authenticated" }),
        { status: 401 }
      );
    }
    
    let game = await prisma.games.findUnique({
      where: { id: gameId }, 
    });

    if (!game) {
      game = await prisma.games.create({
        data: {
          id: gameId, 
          name,
          released: new Date(released),
          rating,
          background_image,
        },
      });

      // Store game genres in pivot table
      if (genres && genres.length > 0) {
        for (const genre of genres) {
          let genreRecord = await prisma.genres.findUnique({
            where: { name: genre.name },
          });

          if (!genreRecord) {
            genreRecord = await prisma.genres.create({
              data: { name: genre.name },
            });
          }

          await prisma.gameGenres.create({
            data: {
              gameId: gameId, 
              genreId: genreRecord.id,
            },
          });
        }
      }
    }

    const existingFavorite = await prisma.favorites.findUnique({
      where: {
        userId_gameId: {
          userId: session.user.id,
          gameId: gameId, 
        },
      },
    });

    if (existingFavorite) {
      return new Response(
        JSON.stringify({ error: "Game is already in favorites" }),
        { status: 400 }
      );
    }

    const favorite = await prisma.favorites.create({
      data: {
        userId: session.user.id,
        gameId: gameId,
      },
    });

    return new Response(
      JSON.stringify({ message: "Added to favorites", favorite }),
      { status: 201 }
    );

  } catch (error) {
    console.error("Error adding to favorites:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
