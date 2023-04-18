import { MediaRenderer } from "@thirdweb-dev/react";
  import React from "react";
  import styles from "./OPENNFT.module.css";
  
  

export default function NFTCard({
 nft,
}: {
 nft: {
 tokenUri: string;
 name: string;
 tokenId: string,
 time: number,
 bid?: string;
 };
}) {
    return (
        <>
          <MediaRenderer src={nft.tokenUri} className={styles.nftImage} />
    
          <p className={styles.nftTokenId}>Token ID #{nft.tokenId}</p>
          <p className={styles.nftName}>{nft.name}</p>
    
          <div className={styles.priceContainer}>
            {nft.bid && (
              <div className={styles.nftBidContainer}>
              <div>
                <p className={styles.nftPriceLabel}>Minimum Bid</p>
                <p className={styles.nftPriceValue}>
                  {nft.bid}
                </p>
              </div>
              <div>
                <p className={styles.nftPriceLabel}>Time Left</p>
                <p className={styles.nftPriceValue}>
                  {nft.time}
                </p>
              </div>
            </div>
            )}
          </div>
        </>
      );
    }