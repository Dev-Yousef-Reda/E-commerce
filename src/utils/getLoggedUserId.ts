import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getLoggedUserId() {

    const allCookies = await cookies()

    const cookiesToken: (string | undefined) = allCookies.get('next-auth.session-token')?.value

    if (cookiesToken) {
        const jwt = await decode({ token: cookiesToken, secret: process.env.NEXTAUTH_SECRET! })
        
        return jwt?.id;
    }
    return null
}

