import "tailwindcss/tailwind.css";
import Head from "next/head";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { getSession, signIn, signOut } from "next-auth/react";
import { Tweets } from "../components/Tweets";
import { Button } from "../components/Button";
import { connectSubsocialSDK } from "./api/subsocial/connect";

const myLoader = ({ src }: { src: string }) => {
    return src;
};

export default function Home({ session }: any) {
    useEffect(() => {
        connectSubsocialSDK();
    }, [session]);

    return (
        <div className="md:container md:mx-auto px-3 sm:px-16">
            {session && (
                <>
                    <div className="flex justify-left mb-2 items-center mt-5 sm:justify-center justify-start">
                        <Image
                            loader={myLoader}
                            src={session?.user?.image}
                            alt="avatar"
                            width={75}
                            height={75}
                            className="rounded-full hover:animate-bounce w-75 h-75 mr-3"
                        />

                        <span>
                            You signed in as{" "}
                            <span className="text-purple">{session?.user?.name}</span> and you are
                            awesome! It's only in case if you don't plan to{" "}
                            <Button onClick={() => signOut()} className="bg-purple hover:bg-purple-50">
                                Sign out
                            </Button>
                        </span>
                    </div>
                </>
            )}

            <h1 className="text-2xl mt-10 mb-3 flex flex-wrap sm:justify-center justify-start">
                <span className="mr-2">Let's destroy Elon Musk data monopoly with</span>
                <img
                    src="https://uploads-ssl.webflow.com/626fee97e03eed4b123c6e3e/627e59fa160d1313444caabe_subsocial-logo.svg"
                    loading="lazy"
                    id="w-node-_1848ef70-37f1-228e-4680-e091ddd9f5ba-ddd9f5b8"
                    alt="logo"
                    className="image-6"
                ></img>
            </h1>
            <Head>
                <title>From Twitter to Subcosial</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <p className="flex flex-wrap sm:flex-row flex-col sm:items-center items-start sm:justify-center justify-start">
                {!session && (
                    <>
                        <span className="mr-3 mb-2">
                        Let's start our journey. First, please sign in on this old fashioned
                        social media with a bird on a logo
                        </span>
                        <Button
                            onClick={() => signIn()}
                            className="bg-purple hover:bg-purple-50 animate-pulse"
                        >
                            Sign in
                        </Button>
                    </>
                )}
            </p>

            {session && (
                <>
                    <p className="flex justify-center">Your tweets looks like absolutely unfsafe, subsocial always the answer</p>
                    <Tweets />
                </>
            )}
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    return {
        props: {
            session,
        },
    };
};
