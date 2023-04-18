import {
  useContract,
  useValidDirectListings
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Link from "next/link";
import Container from "../components/Container/Container";
import NFTCard from "../components/NFT/NFTCard";
import { POLY_MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import styles from "../styles/Buy.module.css";


  
const PolyBuy: NextPage = () => {
    const { contract: marketplace } = useContract(
        POLY_MARKETPLACE_ADDRESS,
        "marketplace-v3"
      );
    
    const { data: nfts, isLoading } = useValidDirectListings(marketplace);
    
    if (isLoading)
    return (
    <div className={"mb-3 flex w-screen justify-center"}>Loading ...</div>
    );

    return (
      <Container maxWidth="lg">
      <h1>Polygon Alley</h1>
          <div className={styles.nftGridContainer}>
           {nfts &&
            nfts.map((nft) => {
             return (
              <Link
                href={`/polygon/${nft.id}`}
                key={nft.assetContractAddress + nft.id} >
                
               <NFTCard
                nft={{
                 tokenId: nft.asset.id as string,
                 name: nft.asset.name as string,
                 tokenUri: nft.asset.image as string,
                 price: nft.currencyValuePerToken?.displayValue + nft.currencyValuePerToken?.symbol
                }}
                />
              
              </Link>
             );
            })}
           </div>
          </Container>
         );
}

export default PolyBuy;