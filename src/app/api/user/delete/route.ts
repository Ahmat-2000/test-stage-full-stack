import { getSession } from "@/app/utils/session";
import prisma from "@/app/utils/prismaClient";

export async function DELETE() {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    await prisma.users.delete({
      where: { id: session.user.id },
    });

    return new Response(JSON.stringify({ message: "Account deleted successfully" }), { status: 200 });

  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
