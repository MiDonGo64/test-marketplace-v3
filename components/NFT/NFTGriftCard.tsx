import { MediaRenderer } from "@thirdweb-dev/react";
  import React from "react";
  import styles from "./NFT.module.css";
  
  

export default function NFTCard({
 nft,
}: {
 nft: {
 tokenUri: string;
 name: string;
 tokenId: string,
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
              <div className={styles.nftPriceContainer}>
                <div>
                  <p className={styles.nftPriceLabel}>Minimum Bid</p>
                  <p className={styles.nftPriceValue}>
                    {nft.bid}
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      );
    }