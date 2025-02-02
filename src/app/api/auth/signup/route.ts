"use server";
import prisma from "@/app/lib/prismaClient"; 
import bcrypt from "bcryptjs";
import { UserSignUpInput } from "@/types/types"; 
import { isValidEmail, isValidPassword } from "@/app/lib/helpers";

export async function POST(request: Request) {
  try {
    // Read & Validate Data from Request
    const { email, name, password }: UserSignUpInput = await request.json();
    
    if (!email || !password || !name) {
      return new Response(JSON.stringify({ error: "All fields are required." }), { status: 400 });
    }
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400 });
    }
    if (!isValidPassword(password)) {
      console.log(`password = ${password}`);
      
      return new Response(JSON.stringify({ error: "Password must be at least 8 characters, include uppercase, lowercase, number, and special character (!@#$%^&*)" }), { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    // Hash Password 
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create User in Database
    const createdUser = await prisma.user.create({
      data: { email, name, password: hashedPassword },
      select: { id: true, email: true, name: true, createdAt: true }, 
    });

    return new Response(JSON.stringify({ message: "User created successfully", user: createdUser }), { status: 201 });
  } catch (error) {
    console.error("Sign up error: ", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}
