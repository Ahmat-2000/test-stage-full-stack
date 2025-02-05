import prisma from "@/app/utils/prismaClient";
import bcrypt from "bcryptjs";
import { userLoginSchema } from "@/types/types";
import { createSession } from "@/app/utils/session"; 

export async function POST(request: Request) {
  try {
    const requestData = await request.json();

    /**
     * TODO
     * Security validation for attacks like XSS , SQLI ...
     */

    /** Validate with Zod */
    const validation = userLoginSchema.safeParse(requestData);
    if (!validation.success) {
      return Response.json({
        code: "ZOD_ERROR",
        message: "Invalid email or password",
      }, { status: 400 });
    }
    const { email, password } = validation.data;

    /* Find user by email */
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      return Response.json({
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
      }, { status: 401 });
    }

    /* Compare passwords */
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return Response.json({
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
      }, { status: 401 });
    }
    const { password: pass, ...userWithoutPassword } = user;
    /** Create Session  */
    await createSession(userWithoutPassword);

    return Response.json({
      code: "SUCCESS",
      message: "Login successful! Redirecting...",
    }, { status: 200 });

  } catch (error) {
    console.error("Login error:", error);
    return Response.json({
      code: "SERVER_ERROR",
      message: "Something went wrong",
    }, { status: 500 });
  }
}
