import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./app/utils/session";

const protectedRoutes = ["/profile", "/favorites"]
const publicRoutes = ["/login","/signup"]

export default async function middleware(request : NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const session = await getSession();

  if (isProtectedRoute && !session?.user) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isPublicRoute && session?.user) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  return NextResponse.next();
}