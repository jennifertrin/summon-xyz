import React, { useEffect, useState } from "react";
import {
  Client,
  Conversation,
  DecodedMessage,

} from "@xmtp/xmtp-js";
import { useDynamicContext } from "@dynamic-labs/sdk-react";
import { Signer } from "ethers";
// import Pusher from "pusher-js/with-encryption";
import "flowbite";
import ConversationList from "./ConversationList";

type MessageListProps = {
  msg: DecodedMessage[];
};

type Chat = {
  address: string;
  title: string;
};

type apiData = {
  prompt: string;
};

type apiResponse = {
  image: string;
};

function App({ title }: Chat) {
  const { primaryWallet } = useDynamicContext();

  const [messages, setMessages] = useState<DecodedMessage[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>();
  const [client, setClient] = useState<any>();
  const [xmtpClientAddress, setXmtpClientAddress] = useState<any>();
  const [prompt, setPrompt] = useState<string>("");
  const [imageGenerating, setImageGenerating] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<apiResponse>();

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
  }, []);

  useEffect(() => {
    if (xmtpClientAddress) {
      const streamMessages = async () => {
        const newStream = await client.streamMessages();
        for await (const msg of newStream) {
          setMessages((prevMessages) => {
            const messages = [...prevMessages];
            messages.unshift(msg);
            return messages;
          });
        }
      };
      streamMessages();
    }
  }, [client, xmtpClientAddress]);

  const MessageList: React.FC<MessageListProps> = ({ msg }) => {
    return (
      <ul>
        {msg.map((message, index) => (
          <li key={index}>{message.content}</li>
        ))}
      </ul>
    );
  };

  const fetchAPI = async ({ prompt }: apiData) => {
    setImageGenerating(true);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      prompt: prompt,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch("/api/generateSkybox", requestOptions);
    const result = await response.json();

    const id = result.id;

    if (result) {
      setTimeout(async function () {
        var raw = JSON.stringify({
          id: id,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
        };

        const response = await fetch("/api/checkSkybox", requestOptions);
        const result = await response.json();
        if (result) {
          setApiResponse(result);
          setImageGenerating(false);
        }
      }, 30000);
    }
  };

  //   useEffect(() => {
  //     if (apiResponse) {
  //
  //       const channel = pusher.subscribe(apiResponse?.status_channel);

  //       channel.bind(apiResponse?.event, (data: any) => {
  //         console.log("data", data);
  //       });
  //     }
  //   }, [apiResponse]);

  return (
    <div className="flex flex-col w-full">
      {primaryWallet && (
        <>
          <MessageList msg={messages} />
          {conversations ? (
            <ConversationList conversations={conversations} />
          ) : null}
          <div className="w-full flex-col flex">
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
              <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <label className="sr-only">Your comment</label>
                <textarea
                  disabled={imageGenerating}
                  id="comment"
                  onBlur={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="Write a response..."
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                <button
                  disabled={imageGenerating}
                  onClick={async () => await fetchAPI({ prompt })}
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                >
                  Post response
                </button>
              </div>
            </div>
            {apiResponse ? (
              <img
                className="flex mx-auto h-auto max-w-2xl mt-6 rounded-lg shadow-xl dark:shadow-gray-800"
                src={apiResponse?.image}
                alt={prompt}
              />
            ) : null}
            {imageGenerating ? (
              <div className="flex items-center mt-2 justify-center w-full h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-1  text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                  generating scene...
                </div>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
