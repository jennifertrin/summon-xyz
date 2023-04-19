import React from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react";
import { PolygonZkevmTestnet } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import "flowbite";
import { Signer, ethers } from "ethers";

type Mint = {
    prompt: string,
    image: string,
}

function MintNFT({prompt, image} : Mint) {
  const { primaryWallet } = useDynamicContext();

  if (!primaryWallet?.address) return <div></div>;

  const initThirdWeb = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      prompt: prompt,
      image: image,
      address: primaryWallet?.address
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch("/api/mintNFTs", requestOptions);
    const result = await response.json();
    return result;
  };

  return (
    <div>
      <button
        onClick={async () => await initThirdWeb()}
        type="button"
        className="text-white bg-blue-700 disabled:bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Mint design
      </button>
    </div>
  );
}

export default MintNFT;
