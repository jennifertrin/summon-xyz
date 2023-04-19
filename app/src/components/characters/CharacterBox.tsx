import "flowbite";
import { Client } from "@xmtp/xmtp-js";
import { useDynamicContext } from "@dynamic-labs/sdk-react";
import { Signer } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";

interface Character {
  title: string;
  description: string;
  cta: string;
  photoHref: string;
  photoAlt: string;
  characterHref: string;
}

export default function CharacterBox({
  title,
  description,
  cta,
  photoHref,
  photoAlt,
  characterHref,
}: Character) {
  const { primaryWallet } = useDynamicContext();
  const router = useRouter();
  const [initiatingChat, setInitiatingChat] = useState<boolean>();

  const initXmtp = async function () {
    setInitiatingChat(true);
    const signer = (await primaryWallet?.connector.getSigner()) as Signer;
    const xmtp = await Client.create(signer, { env: "dev" });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      userAddress: primaryWallet?.address,
      characterTitle: title,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch("/api/createConversation", requestOptions);
    const result = await response.json();

    if (result.createConversation) {
      setInitiatingChat(false);
      return;
    }
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
            disabled={initiatingChat}
            onClick={() => chatWithCharacter()}
            className="inline-flex items-center px-3 py-2 mt-2 text-sm cursor-pointer font-medium text-center text-white bg-blue-700 disabled:bg-blue-400 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
