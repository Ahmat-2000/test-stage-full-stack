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

/** TODO
 * CORS config
 */

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    '/',
    '/games',
  ],
}