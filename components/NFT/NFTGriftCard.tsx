import {
  MediaRenderer
} from "@thirdweb-dev/react";
import { EnglishAuction } from "@thirdweb-dev/sdk";
import styles from "../NFT/NFT.module.css";

type Props = {
  nft: EnglishAuction;
};

export default function NFTComponent({ nft }: Props) {
  


  return (
    <>
      <MediaRenderer src={nft?.asset.image} className={styles.nftImage} />

      <p className={styles.nftTokenId}>Token ID #{nft.asset.id}</p>
      <p className={styles.nftName}>{nft.asset.name}</p>

      <div className={styles.priceContainer}>
              <div className={styles.nftBidContainer}>
              <div>
                <p className={styles.nftPriceLabel}>Bids start at</p>
                <p className={styles.nftPriceValue}>
                {`${nft.minimumBidCurrencyValue.displayValue}
          ${nft.minimumBidCurrencyValue.symbol}`}
                </p>
              </div>
            </div>
          </div>
    </>
  );
}