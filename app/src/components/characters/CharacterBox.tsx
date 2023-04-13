import "flowbite";
import { Client, DecodedMessage, SortDirection } from "@xmtp/xmtp-js";
import { useDynamicContext } from "@dynamic-labs/sdk-react";
import { useState } from "react";
import { Signer } from "ethers";
import { useRouter } from "next/router";

interface Character {
  title: string;
  description: string;
  cta: string;
  photoHref: string;
  photoAlt: string;
  characterAddress: string;
  characterHref: string;
}

export default function CharacterBox({
  title,
  description,
  cta,
  photoHref,
  photoAlt,
  characterAddress,
  characterHref,
}: Character) {
  const { primaryWallet } = useDynamicContext();
  const router = useRouter();

  const [messages, setMessages] = useState<DecodedMessage[]>([]);
  const [client, setClient] = useState<any>();
  const [xmtpClientAddress, setXmtpClientAddress] = useState<any>();

  const initXmtp = async function () {
    const signer = (await primaryWallet?.connector.getSigner()) as Signer;
    const xmtp = await Client.create(signer, { env: "dev" });
    const conversation = await xmtp.conversations.newConversation(
      characterAddress
    );
    const messages = await conversation.messages({
      direction: SortDirection.SORT_DIRECTION_DESCENDING,
    });
    setClient(conversation);
    setMessages(messages);
    setXmtpClientAddress(xmtp.address);
  };

  const chatWithCharacter = async function () {
    await initXmtp();
    router.push(characterHref);
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg" src={photoHref} alt={photoAlt} />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
          <button
            onClick={() => chatWithCharacter()}
            className="inline-flex items-center px-3 py-2 mt-2 text-sm cursor-pointer font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {cta}
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
