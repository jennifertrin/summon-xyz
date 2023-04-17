import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@xmtp/xmtp-js";
import { ethers } from "ethers";

interface Data {
  userAddress: string;
  characterTitle: string;
}

interface Character {
  name: string;
  privateKey: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { userAddress, characterTitle }: Data = req.body;

      const characterAddress = getAddressByName(characterTitle);

      const provider = new ethers.JsonRpcProvider(
        "https://rpc.ankr.com/eth_goerli"
      );
      const signer = new ethers.Wallet(characterAddress, provider);

      const xmtp = await Client.create(signer, { env: "dev" });

      const allConversations = await xmtp.conversations.list();
      const characterConversationsWithWallet = allConversations.filter(
        (convo) =>
          convo.context?.conversationId &&
          convo.context.conversationId.startsWith(
            `postIndustrial/${characterTitle}`
          ) && convo.peerAddress === userAddress
      );

      if (characterConversationsWithWallet.length > 0) {
        res.status(200).json({ createConversation: true, previouslyCreated: true });
      }

      if (characterConversationsWithWallet.length === 0 || !characterConversationsWithWallet) {
        const conversation = await xmtp.conversations.newConversation(
          userAddress,
          {
            conversationId: `postIndustrial/${characterTitle}-main-chat`,
            metadata: { game: "postIndustrial" },
          }
        );
        await conversation.send(`I'm the ${characterTitle}. Nice to meet you!`);
        const conversation1 = await xmtp.conversations.newConversation(
          userAddress,
          {
            conversationId: `postIndustrial/${characterTitle}-scene-1`,
            metadata: { game: "postIndustrial" },
          }
        );
        await conversation1.send(
          `Welcome to Scene 1. We recently received funding to build a new library. What should the new design look like?`
        );
        const conversation2 = await xmtp.conversations.newConversation(
          userAddress,
          {
            conversationId: `postIndustrial/${characterTitle}-scene-2`,
            metadata: { game: "postIndustrial" },
          }
        );
        await conversation2.send(
          `Welcome to Scene 2. This road in Downtown needs to be rebuilt. What should the new design look like?`
        );
        const conversation3 = await xmtp.conversations.newConversation(
          userAddress,
          {
            conversationId: `postIndustrial/${characterTitle}-scene-3`,
            metadata: { game: "postIndustrial" },
          }
        );
        await conversation3.send(
          `Welcome to Scene 3. We are looking to revitalize a parking lot of an abandoned factory building. What should we build in its place?`
        );
        res.status(200).json({ createConversation: true, previouslyCreated: false });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

const characters: Character[] = [
  { name: "Mayor", privateKey: process.env.MAYOR_PRIVATE_KEY as string },
  {
    name: "Businessman",
    privateKey: process.env.BUSINESSMAN_PRIVATE_KEY as string,
  },
];

function getAddressByName(name: string): string {
  const character = characters.find((c) => c.name === name);
  if (!character) return "";
  return character?.privateKey;
}
