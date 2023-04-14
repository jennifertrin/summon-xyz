import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface Data {
  prompt: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const api_key = process.env.BLOCKADE_API_KEY;
      const { prompt }: Data = req.body;

      const response: any = await axios.post(
        "https://backend.blockadelabs.com/api/v1/skybox",
        { api_key, prompt }
      );

      const status_channel = response?.data.pusher_channel;
      const event = response?.data.pusher_event;
      const id = response?.data.id;

      if (status_channel && event) {
        res.status(200).json({ status_channel: status_channel, event: event, id: id });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
