import React, { useEffect, useState } from "react";
import {
  Client,
  Conversation
} from "@xmtp/xmtp-js";
import { useDynamicContext } from "@dynamic-labs/sdk-react";
import { Signer } from "ethers";
import "flowbite";
import ConversationList from "./ConversationList";

type Chat = {
  address: string;
  title: string;
};

function App({ title }: Chat) {
  const { primaryWallet } = useDynamicContext();

  const [conversations, setConversations] = useState<Conversation[]>();

  useEffect(() => {
    async function getConversations() {
      const signer = (await primaryWallet?.connector.getSigner()) as Signer;
      const xmtp = await Client.create(signer, { env: "dev" });
      const conversations = await xmtp.conversations.list();
      const characterConversations = conversations.filter(
        (convo) =>
          convo.context?.conversationId &&
          convo.context.conversationId.startsWith(`postIndustrial/${title}`)
      );
      if (characterConversations) {
        setConversations(characterConversations);
      }
    }
    getConversations();
  }, [primaryWallet?.connector, title]);

  return (
    <div className="flex flex-col w-full">
      {primaryWallet && (
        <>
          {conversations ? (
            <ConversationList conversations={conversations} />
          ) : null}
        </>
      )}
    </div>
  );
}

export default App;
