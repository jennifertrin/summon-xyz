import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface Data {
  id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const api_key = process.env.BLOCKADE_API_KEY;
      const { id }: Data = req.body;

      const response: any = await axios.get(
        `https://backend.blockadelabs.com/api/v1/imagine/requests/${id}?api_key=${api_key}`,
      );

      const image = response?.data?.request?.file_url;

      if (image) {
        res.status(200).json({ image: image });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
