import { NextApiRequest, NextApiResponse } from "next";
import { PolygonZkevmTestnet } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";

interface Data {
  prompt: string;
  image: string;
  address: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const sdk = ThirdwebSDK.fromPrivateKey(
        process.env.MAYOR_PRIVATE_KEY!,
        PolygonZkevmTestnet
      );
      const { prompt, image, address }: Data = req.body;

      const metadata = {
        name: prompt,
        description: prompt,
        image: image,
      };

      const contract = await sdk.getContract(
        "0x06A46ad6DE3B469B56Dc75F4348C5130Edbca1fF"
      );
      const tx = await contract.erc721.mintTo(address, metadata);
      const receipt = tx.receipt;
      const tokenId = tx.id;
      const nft = await tx.data();

      res.status(200).json({ prompt, image, address });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
