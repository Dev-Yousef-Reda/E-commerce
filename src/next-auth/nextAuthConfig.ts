import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const nextAuthConfig: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: {},
                password: {},
            },
            authorize: async function (credentials) {
                try {
                    const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    const payload = await response.json();

                    if (payload.message === 'success') {

                        const jwtDecodedToken: { id: string } = jwtDecode(payload.token);
                        const userData = {
                            ...payload.user,
                            userToken: payload.token,
                            id: jwtDecodedToken.id,
                        };
                        return userData;
                    };

                } catch (error: unknown) {
                    if (error instanceof Error) {
                        return error.message;
                    }
                    return String(error);
                }
            },
        })
    ],

    callbacks: {
        jwt(params ) {

            if (params.user) {
                params.token.userToken = params.user.userToken;
                params.token.id = params.user.id;
                
            };

            if (params.trigger === "update" && params.session?.token) {
                params.token.userToken = params.session.token   // ← new JWT from password change
            }
            return params.token;
        },

        session(params) {
            params.session.user.userId = params.token.id;
            return params.session;
        }
    },

    pages: {
        signIn: '/signin',
    },

    secret: process.env.NEXTAUTH_SECRET,

    session: {
        maxAge: 60 * 60 * 24 * 3,
        
    }
}