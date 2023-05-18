import { MediaRenderer } from "@thirdweb-dev/react";
import React from "react";
import styles from "./OPENNFT.module.css";
import { Nft } from "alchemy-sdk";

type Props = {
    nft: Nft;
  };
  
  export default function NFTComponent({ nft }: Props) {

    return (
        <>
        <div className={styles.nftContainer}>
          <MediaRenderer src={nft.rawMetadata?.image} className={styles.nftImage} />
    
          <p className={styles.nftTokenId}>{nft.title}</p>
          <p className={styles.nftTokenId}>Token ID #{nft.tokenId}</p>
    
          <div className={styles.priceContainer}>
          
            {nft.contract && (
              <div className={styles.nftPriceContainer}>
                <div>
                  <p className={styles.nftPriceLabel}>Contract:</p>
                  <p className={styles.nftPriceValue}>
                    {nft.contract.address}
                  </p>
                </div>
              </div>
            )}
          </div>
          </div>
        </>
      );
    }