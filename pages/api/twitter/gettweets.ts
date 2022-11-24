import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { Client } from "twitter-api-sdk";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const token =
        (await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        })) || {};

    const client = new Client(token.accessToken as string);

    try {
        const tweets = await client.tweets.usersIdTweets(token.userId as string);
        return res.status(200).json({
            status: "Ok",
            tweets,
        });
    } catch (e: any) {
        return res.status(400).json({
            status: e.message,
        });
    }
};
