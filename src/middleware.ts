import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {

    const jwt = await getToken({ req })

    if (jwt) {
        if (req.nextUrl.pathname === '/signin' || req.nextUrl.pathname === '/signup') {
            return NextResponse.redirect(new URL('/', req.url))
        } else {
            return NextResponse.next();
        }
    } else {
        if ((req.nextUrl.pathname).includes('/cart')
            || (req.nextUrl.pathname).includes('/checkout')
            || (req.nextUrl.pathname).includes('/allorders')
            || (req.nextUrl.pathname).includes('/wishlist')
            || (req.nextUrl.pathname).includes('/user-profile')
        ) {
            return NextResponse.redirect(new URL('/signin', req.url))
        } else {
            return NextResponse.next();
        }
    }
}

export const config = {
    matcher: ['/cart', '/user-profile/:path*', '/wishlist', '/allorders/:path*', '/signin', '/signup']
}
