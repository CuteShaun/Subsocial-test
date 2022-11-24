import { SubsocialApi, generateCrustAuthToken } from "@subsocial/api";
import { IpfsContent } from "@subsocial/api/substrate/wrappers";
import Keyring from "@polkadot/keyring";

const mnemonic = "bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice";
let api: SubsocialApi;

export const connectSubsocialSDK = async () => {
    const authHeader = generateCrustAuthToken(mnemonic);

    api = await SubsocialApi.create({
        substrateNodeUrl: "wss://rco-para.subsocial.network",
        ipfsNodeUrl: "https://crustwebsites.net",
    });

    api.ipfs.setWriteHeaders({
        authorization: "Basic " + authHeader,
    });
};

export const saveTweetsSubsocial = async (id: string, name: string, text: string) => {
    const keyring = new Keyring({ type: "sr25519" });
    const pair = keyring.addFromMnemonic(mnemonic);

    const cid = await api?.ipfs
        ?.saveContent({
            title: `It's a saved post of ${name} with ${id} from Twitter`,
            image: null,
            tags: ["Hello world", "FAQ"],
            body: text,
            canonical: "htpps://twitter.com",
        })
        .then(result => result)
        .catch(e => console.log(e.message));

    const substrateApi = await api?.blockchain.api;
    const spaceId = "10102";

    const postTransaction = cid && substrateApi?.tx?.posts?.createPost(
        spaceId,
        { RegularPost: null },
        IpfsContent(cid)
    );

    cid && postTransaction && postTransaction.signAndSend(pair);
};
