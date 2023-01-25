// This is a middleware that verifies the user's token on every request.
// If the user is not logged in, they are redirected to the login page.
// If the user is logged in, they are allowed to continue.

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/verifyToken"

export async function middleware(req: NextRequest) {
  // get the token from the cookie
  const token = req ? req.cookies?.get("token")?.value : null

  if (!token) {
    return NextResponse.next()
  }
  // get the userId from the token
  // must use jose to verify the token since it does not use crypto module
  const userId = await verifyToken(token)
  const { pathname } = req.nextUrl

  // check the pathname of the request URL to determine if the request should be allowed to continue or if it should be redirected.
  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/login") ||
    userId ||
    pathname.includes("/static")
  ) {
    return NextResponse.next()
  }

  // If the token or userId is not present, and the pathname is not "/login", it redirects the request to the "/login" page.
  if ((!token || !userId) && pathname !== "/login") {
    const url = req.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.rewrite(url)
  }
}
