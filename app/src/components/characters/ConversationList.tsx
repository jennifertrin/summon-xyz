import { Conversation, DecodedMessage } from "@xmtp/xmtp-js";
import ChatPrompt from "./ChatPrompt";
import { useEffect, useState } from "react";

type ConversationList = {
  conversations: Conversation[] | undefined;
};

export default function ConversationList({ conversations }: ConversationList) {
  const [activeTabId, setActiveTabId] = useState<string>();
  const [activeConversation, setActiveConversation] = useState<Conversation>();
  const [messages, setMessages] = useState<DecodedMessage[]>();

  function getSceneName(conversationId: string | undefined): string | null {
    if (!conversationId) return null;
    const regex = /(?<=postIndustrial\/Mayor-).*/;
    const match = conversationId.match(regex);
    if (match) {
      return match[0].replace(/-/g, " ");
    } else {
      return null;
    }
  }

  async function activeConversationMessages(conversation: Conversation) {
    const messagesInConversation = await conversation.messages();
    return messagesInConversation;
  }

  useEffect(() => {
    async function getMessage() {
      if (!activeConversation) return;
      const conversationMessages = await activeConversationMessages(
        activeConversation
      );
      setMessages(conversationMessages);
    }
    getMessage();
  }, [activeConversation]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {conversations?.map((conversation) => (
          <li key={conversation?.context?.conversationId} className="mr-2">
            <button
              className={`${
                conversation?.context?.conversationId === activeTabId
                  ? "bg-blue-300"
                  : ""
              } inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500`}
              onClick={() => {
                setActiveTabId(conversation?.context?.conversationId);
                setActiveConversation(conversation);
              }}
            >
              {getSceneName(conversation?.context?.conversationId)}
            </button>
          </li>
        ))}
      </ul>
      <div className="py-8 px-6">
        <ul className="mb-4 flex flex-wrap text-md font-medium text-center text-gray-900 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          {messages?.map((message) => (
            <li className="mr-2 p-2" key={message.id}>
              {message.content}
            </li>
          ))}
        </ul>
        {activeConversation ? (
          <ChatPrompt conversation={activeConversation} />
        ) : null}
      </div>
    </div>
  );
}
