import { getSession } from "@/app/utils/session";
import prisma from "@/app/utils/prismaClient";
import bcrypt from "bcryptjs";
import { profileSchema } from "@/types/types";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const { name, email, password } = await request.json();
    /**
     * TODO
     * Security validation for attacks like XSS , SQLI ...
     */

    /* Validate with Zod */
    const validation = profileSchema.safeParse({name, email , password});
    if (!validation.success) {
      return new Response(JSON.stringify({
        code: "ZOD_ERROR", 
        errors: validation.error.format()
      }), { status: 400 });
    }
    
    if (!name || !email) {
      return new Response(JSON.stringify({ error: "Name and email are required" }), { status: 400 });
    }

    const updateData: { name: string; email: string; password?: string } = { name, email };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await prisma.users.update({
      where: { id: session.user.id },
      data: updateData,
      select: { id: true, name: true, email: true },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });

  } catch (error) {
    console.error("Error updating user profile:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
