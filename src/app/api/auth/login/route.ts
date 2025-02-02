// "use server";
// import prisma from "@/app/lib/prismaClient";
// import bcrypt from "bcryptjs"; 

// export async function POST(formData: FormData) {
export async function POST(request : Request) {
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   // Find user by email
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) {
//     return { error: "Invalid credentials" };
//   }

//   // Compare passwords
//   const passwordMatch = await bcrypt.compare(password, user.password);
//   if (!passwordMatch) {
//     return { error: "Invalid credentials" };
//   }


//   return { message: "Login successful" };
  return Response.json({});
}
