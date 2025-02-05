import { getSession, deleteSession } from "@/app/utils/session";
import prisma from "@/app/utils/prismaClient";

export async function DELETE() {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    /* Delete user from the database */
    await prisma.users.delete({
      where: { id: session.user.id },
    });

    /* Clear the session after deleting the user */
    await deleteSession();

    return Response.json({ message: "Account deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting user:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
