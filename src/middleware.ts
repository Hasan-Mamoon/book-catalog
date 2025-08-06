export {default} from "next-auth/middleware"

export const config = {
  matcher: [
    // Only protect these paths:
    "/",
    "/home/:path*",
    "/profile/:path*",
    "/settings/:path*",
    // Add more as needed...
  ],
};