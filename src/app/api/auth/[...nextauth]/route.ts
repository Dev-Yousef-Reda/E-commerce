import { nextAuthConfig } from "_/next-auth/nextAuthConfig";
import NextAuth from "next-auth";

const handler = NextAuth(nextAuthConfig)

export { handler as GET, handler as POST }