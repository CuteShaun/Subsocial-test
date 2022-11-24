import { useEffect, useState } from "react";
import { saveTweetsSubsocial } from "../pages/api/subsocial/connect";
import { useSession } from "next-auth/react";
import { Tweet } from "./Tweet";
import { Feed } from "./Feed";

export const Tweets = () => {
    const [tweets, setTweets] = useState([{ id: "", text: "" }]);
    const { data: session } = useSession();

    useEffect(() => {
        const getTweets = async () => {
            const data = await fetch(`api/twitter/gettweets`);
            const result = await data.json();

            setTweets(result?.tweets?.data);
        };

        getTweets();
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, name?: string, text?: string, id?: string) => {
        const target = event.target as HTMLButtonElement;
        saveTweetsSubsocial(target.id, name as string, text as string);
    };

    if (tweets?.length > 1) {
        return (
                <Feed>
                    {tweets.map((tweet) => (
                        <Tweet key={tweet.id} id={tweet.id} name={session?.user?.name as string} text={tweet.text} onClick={handleClick} image={session?.user?.image as string} />
                    ))}
                </Feed>
        );
    } else return <><p>If you want see tweets, please relogin, current session is expired</p></>;
};
