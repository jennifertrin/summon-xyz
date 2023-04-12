import { useDynamicContext } from '@dynamic-labs/sdk-react';
import { Client } from '@xmtp/xmtp-js';
import { Signer } from 'ethers';

export default function MainButton() {
  const { primaryWallet } = useDynamicContext();

  const initXmtp = async function() {
    const signer = await primaryWallet?.connector.getSigner() as Signer;
    const xmtp = await Client.create(signer, { env: "local" });
  }

  return (
    <button
      type="button"
      onClick={initXmtp}
      className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      Start Building
    </button>
  );
}

