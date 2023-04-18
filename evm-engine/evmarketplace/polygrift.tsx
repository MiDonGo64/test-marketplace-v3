import {
  useContract,
  useValidEnglishAuctions
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Link from "next/link";
import Container from "../components/Container/Container";
import NFTGriftCard from "../components/NFT/NFTGriftCard";
import { POLY_MARKETPLACE_ADDRESS } from "../const/contractAddresses";
import styles from "../styles/Buy.module.css";


  
const PolyBuy: NextPage = () => {
    const { contract: marketplace } = useContract(
        POLY_MARKETPLACE_ADDRESS,
        "marketplace-v3"
      );
    
    const { data: nfts, isLoading } = useValidEnglishAuctions(marketplace);
    
    if (isLoading)
    return (
    <div className={"mb-3 flex w-screen justify-center"}>Loading ...</div>
    );

    return (
      <Container maxWidth="lg">
      <h1>Polygon Grifters on the Block</h1>
          <div className={styles.nftGridContainer}>
           {nfts &&
            nfts.map((nft) => {
             return (
              <Link
                href={`/polyauction/${nft.id}`}
                key={nft.assetContractAddress + nft.id} >
                
               <NFTGriftCard
                nft={{
                 name: nft.asset.name as string,
                 tokenId: nft.asset.tokenID as string,
                 tokenUri: nft.asset.image as string,
                 bid: nft.minimumBidCurrencyValue?.displayValue + nft.minimumBidCurrencyValue?.symbol
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