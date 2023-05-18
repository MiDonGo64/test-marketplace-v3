import {
    MediaRenderer
  } from "@thirdweb-dev/react";
  import { DirectListingV3 } from "@thirdweb-dev/sdk";
  import styles from "../NFT/NFT.module.css";
  
  type Props = {
    nft: DirectListingV3;
  };
  
  export default function NFTComponent({ nft }: Props) {
    
  
  
    return (
      <>
        <MediaRenderer src={nft.asset.image} className={styles.nftImage} />
  
        <p className={styles.nftTokenId}>Token ID #{nft.asset.id}</p>
        <p className={styles.nftName}>{nft.asset.name}</p>
  
        <div className={styles.priceContainer}>
                <div className={styles.nftBidContainer}>
                <div>
                  <p className={styles.nftPriceLabel}>Offer Price</p>
                  <p className={styles.nftPriceValue}>
                  {`${nft.currencyValuePerToken.displayValue}
            ${nft.currencyValuePerToken.symbol}`}
                  </p>
                </div>
              </div>
            </div>
      </>
    );
  }
  