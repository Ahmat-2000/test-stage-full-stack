import prisma from "@/app/utils/prismaClient";
import bcrypt from "bcryptjs";
import { userSignUpSchema, userSignUpType } from "@/types/types";

export async function POST(request: Request) {
  try {
    const requestData: userSignUpType = await request.json();

    /**
     * TODO
     * Security validation for attacks like XSS , SQLI ...
     */

    /* Validate with Zod */
    const validation = userSignUpSchema.safeParse(requestData);
    if (!validation.success) {
      return Response.json({
        code: "ZOD_ERROR", 
        errors: validation.error.format()
      }, { status: 400 });
    }

    const { email, name, password } = validation.data;

    /* Check if user already exists */
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      return Response.json({
        code: "USER_EXISTS",
        message: "User already exists",
      }, { status: 400 });
    }

    /* Hash Password */
    const hashedPassword = await bcrypt.hash(password, 8);

    /* Create User in Database */
    const createdUser = await prisma.users.create({
      data: { email, name, password: hashedPassword },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    return Response.json({
      code: "SUCCESS", 
      message: "Account created successfully! Redirecting...",
      user: createdUser,
    }, { status: 201 });

  } catch (error) {
    console.error("Sign up error:", error);
    return Response.json({
      code: "SERVER_ERROR",
      message: "Something went wrong",
    }, { status: 500 });
  }
}
