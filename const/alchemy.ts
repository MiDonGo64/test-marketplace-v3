import { Alchemy, Network } from "alchemy-sdk";



const config = {
    apiKey: process.env.NEXT_PUBLIC_ALCH_API_KEY,
    network: Network.MATIC_MUMBAI,
    maxRetries: 10,
  };

export const alchemy = new Alchemy(config);
