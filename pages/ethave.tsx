import {
    useContract,
    useValidDirectListings,
} from "@thirdweb-dev/react";
import type { NextPage } from 'next';
import Head from 'next/head';
import siteMetadata from '../data/siteMetadata';
import Container from "../components/Container/Container";
import NFTGrid from "components/NFT/NFTGrid/NFTGrid";
import { ETH_MARKETPLACE_ADDRESS } from "../const/contractAddresses";


  
const PolyBuy: NextPage = () => {
    const { contract: marketplace } = useContract(
        ETH_MARKETPLACE_ADDRESS,
        "marketplace-v3"
      );
    
    const { data: nfts, isLoading } = useValidDirectListings(marketplace);
    
    return (
      <>
      <Head>
          <title>{siteMetadata.siteName} | Ethereum Avenue</title>
        </Head>
        <div className="">  
      <Container maxWidth="lg">
          <h1 className="text-3xl font-bold">Ethereum Avenue</h1>
          <p className="mt-8">Whatcha buyin'...</p>
          <NFTGrid
            data={nfts}
            isLoading={isLoading}
            emptyText={"Looks like there are no NFTs in this collection. Did you fat finger some code???"} />
        </Container>
        </div>
        </>
    );
  }

export default PolyBuy;