import { getSession } from "@/app/utils/session";
import prisma from "@/app/utils/prismaClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gameId } = body;
    /**
     * TODO
     * Security validation for attacks like XSS , SQLI ...
     */

    if (!gameId) {
      return new Response(
        JSON.stringify({ error: "gameId is required" }),
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

    await prisma.favorites.delete({
      where: {
        userId_gameId: {
          userId: session.user.id,
          gameId: gameId,
        },
      },
    });

    return new Response(
      JSON.stringify({ message: "Removed from favorites" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
