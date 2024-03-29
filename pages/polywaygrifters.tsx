import {
    useContract,
    useValidEnglishAuctions
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Container from "../components/Container/Container";
import { POLY_MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import Head from 'next/head';
import siteMetadata from '../data/siteMetadata';
import NFTGrid from "components/NFT/NFTGrid/NFTGridGrifters";
  
    
  const EthGrift: NextPage = () => {
      const { contract: marketplace } = useContract(
          POLY_MARKETPLACE_ADDRESS,
          "marketplace-v3"
        );
      
      const { data: nfts, isLoading } = useValidEnglishAuctions(marketplace);
      
      return (
        <>
        <Head>
          <title>{siteMetadata.siteName} | Polygon Way</title>
        </Head>
        <div className="">  
          <Container maxWidth="lg">
            <h1 className="text-3xl font-bold">Polygon Way: Grifters</h1>
            <p className="mt-8"></p>
            <NFTGrid
              data={nfts}
              isLoading={isLoading}
              emptyText={"No grifters hanging out in the alley today. Check back tomorrow."} />
          </Container>
        </div>
        </>
      );
    }
  
  export default EthGrift;