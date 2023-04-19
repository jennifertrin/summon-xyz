import React, { useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react";
import "flowbite";

type Mint = {
  prompt: string;
  image: string;
};

function MintNFT({ prompt, image }: Mint) {
  const { primaryWallet } = useDynamicContext();
  const [minting, setMinting] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>();

  if (!primaryWallet?.address) return <div></div>;

  const initThirdWeb = async () => {
    setMinting(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      prompt: prompt,
      image: image,
      address: primaryWallet?.address,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch("/api/mintNFT", requestOptions);
    const result = await response.json();
    if (result) {
      setTransactionHash(result.hashId);
      setMinting(false);
    }
  };

  return (
    <div>
      <button
        onClick={async () => await initThirdWeb()}
        disabled={minting}
        type="button"
        className="text-white bg-blue-700 disabled:bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        {!minting ? "Mint design" : "Minting. Please wait"}
      </button>
      {transactionHash
        ? `Minting completed. Check: https://testnet-zkevm.polygonscan.com/tx/${transactionHash}`
        : null}
    </div>
  );
}

export default MintNFT;
