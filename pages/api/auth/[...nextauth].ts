import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

const {
    TWITTER_CONSUMER_KEY = "",
    TWITTER_CONSUMER_SECRET = "",
    NEXTAUTH_SECRET = "",
} = process.env;

export const authOptions: NextAuthOptions = {
    providers: [
        TwitterProvider({
            clientId: TWITTER_CONSUMER_KEY,
            clientSecret: TWITTER_CONSUMER_SECRET,
            version: "2.0",
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
            }

            if (user && user.id) {
                token.userId = user.id;
            }

            return token;
        },
        session: async ({ session }) => {
            return session;
        },
    },
    secret: NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
