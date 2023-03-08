import {
    ThirdwebNftMedia,
    useContract,
    useValidDirectListings,
    useValidEnglishAuctions,
  } from "@thirdweb-dev/react";
  import { NFT } from "@thirdweb-dev/sdk";
  import React from "react";
  import {
    MARKETPLACE_ADDRESS,
    NFT_COLLECTION_ADDRESS,
  } from "../../const/contractAddresses";
  import Skeleton from "../Skeleton/Skeleton";
  import styles from "./NFT.module.css";
  
  type Props = {
    nft: NFT;
  };
  
  export default function NFTComponent({ nft }: Props) {
    const { contract: marketplace, isLoading: loadingContract } = useContract(
      MARKETPLACE_ADDRESS,
      "marketplace-v3"
    );
  
    // 1. Load if the NFT is for direct listing
    const { data: directListing, isLoading: loadingDirect } =
      useValidDirectListings(marketplace, {
        tokenContract: NFT_COLLECTION_ADDRESS,
        tokenId: nft.metadata.id,
      });
  
      if (loadingDirect)
      return (
      <div className={"mb-3 flex w-screen justify-center"}>Loading ...</div>
      );
  
    return (
      <>
        <ThirdwebNftMedia metadata={nft.metadata} className={styles.nftImage} />
  
        <p className={styles.nftTokenId}>Token ID #{nft.metadata.id}</p>
        <p className={styles.nftName}>{nft.metadata.name}</p>
  
        <div className={styles.priceContainer}>
          {directListing && directListing[0] && (
            <div className={styles.nftPriceContainer}>
              <div>
                <p className={styles.nftPriceLabel}>Price</p>
                <p className={styles.nftPriceValue}>
                  {`${directListing[0]?.currencyValuePerToken.displayValue}
            ${directListing[0]?.currencyValuePerToken.symbol}`}
                </p>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
  