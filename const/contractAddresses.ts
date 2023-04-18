/** Replace the values below with the addresses of your smart contracts. */

// 1. Set up the network your smart contracts are deployed to.
// First, import the chain from the package, then set the NETWORK variable to the chain.
import { Mumbai } from "@thirdweb-dev/chains";
export const NETWORK = Mumbai;

// 2. The address of the marketplace V3 smart contract.
// Deploy your own: https://thirdweb.com/thirdweb.eth/MarketplaceV3
export const ETH_MARKETPLACE_ADDRESS = "0x7a4bC905e56B748e04d3bEeaA5005745059F72EC";
export const POLY_MARKETPLACE_ADDRESS = "0xb06f1eDb9823068179dAA763497E6D0B2C2AF306";


// 3. The address of your NFT collection smart contract.
export const PolyDrop =
  "0x7613612ac58548C8509D0D41b838Ca0c9e04dd63";

export const ETH_3 =
  "0xAEc8bBBA662C2D984347750541C101a44F07De54";

export const ETHDrop =
  "0xAb4D4a30DE6849626FD8fc706E945C389Bb601cB";

// (Optional) Set up the URL of where users can view transactions on
// For example, below, we use Mumbai.polygonscan to view transactions on the Mumbai testnet.
export const ETHERSCAN_URL = "https://goerli.etherscan.io/";

export const POLYSCAN_URL = "https://mumbai.polygonscan.com";