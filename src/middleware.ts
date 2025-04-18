import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("accessToken")?.value; // Get access token from cookies

    // If user is NOT logged in and trying to access `/` or `/drawboard`, redirect to `/login`
    if (!token && (req.nextUrl.pathname === "/" )) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next(); // Allow access if authenticated
}

// Apply middleware ONLY to `/` and `/drawboard` routes
export const config = {
    matcher: ["/", "/drawboard/:path*"], // Protects both `/` and all `/drawboard/*` paths
};
