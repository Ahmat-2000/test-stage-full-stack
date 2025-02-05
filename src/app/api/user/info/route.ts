import { getSession } from "@/app/utils/session";
import prisma from "@/app/utils/prismaClient";

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.users.findUnique({
      where: { id: session.user.id },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(user, { status: 200 });

  } catch (error) {
    console.error("Error fetching user profile:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
