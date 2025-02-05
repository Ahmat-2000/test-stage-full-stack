import { getSession } from "@/app/utils/session";
import prisma from "@/app/utils/prismaClient";

export async function POST(request: Request) {
  try {
    const { page = 1, search = "", page_size = 6 } = await request.json();
    
    const session = await getSession();
    if (!session?.user?.id) {
      return Response.json({ error: "User is not authenticated" },
        { status: 401 }
      );
    }

     /**
     * TODO
     * Security validation for attacks like XSS , SQLI ...
     */

    const favorites = await prisma.favorites.findMany({
      where: { 
        userId: session.user.id,
        game: {
          name: { contains: search }, 
        }
      },
      include: {
        game: {
          include: { genres: { select: { genre: true } } },
        },
      },
      skip: (page - 1) * page_size,
      take: page_size,
    });
    
    const results = favorites.map((fav) => ({
      id: fav.game.id,
      name: fav.game.name,
      released: fav.game.released,
      rating: fav.game.rating,
      background_image: fav.game.background_image,
      genres: fav.game.genres.map((g) => ({ name: g.genre.name })),
    }));

    const total_count = await prisma.favorites.count({
      where: { 
        userId: session.user.id,
        game: { name: { contains: search} }
      },
    });

    return Response.json({ results, total_count },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching favorite games:", error);
    return Response.json({ error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

