import {
    ThirdwebNftMedia,
    useContract,
    useValidDirectListings,
    useValidEnglishAuctions
  } from "@thirdweb-dev/react";
  import { NFT } from "@thirdweb-dev/sdk";
  import {
    ETH_3, ETH_MARKETPLACE_ADDRESS
  } from "../../../const/contractAddresses";
  import styles from "../../NFT/NFT.module.css";
  import Skeleton from "../../Skeleton/Skeleton";
  
  type Props = {
    nft: NFT;
  };
  
  export default function NFTComponent({ nft }: Props) {
    const { contract: marketplace, isLoading: loadingContract } = useContract(
      ETH_MARKETPLACE_ADDRESS,
      "marketplace-v3"
    );
  
    // 1. Load if the NFT is for direct listing
    const { data: directListing, isLoading: loadingDirect } =
      useValidDirectListings(marketplace, {
        tokenContract: ETH_3,
        tokenId: nft.metadata.id,
      });
  
    // 2. Load if the NFT is for auction
    const { data: auctionListing, isLoading: loadingAuction } =
      useValidEnglishAuctions(marketplace, {
        tokenContract: ETH_3,
        tokenId: nft.metadata.id,
      });
  
    return (
      <>
        <ThirdwebNftMedia metadata={nft.metadata} className={styles.nftImage} />
  
        <p className={styles.nftTokenId}>Token ID #{nft.metadata.id}</p>
        <p className={styles.nftName}>{nft.metadata.name}</p>
  
        <div className={styles.priceContainer}>
          {loadingContract || loadingDirect || loadingAuction ? (
            <Skeleton width="100%" height="100%" />
          ) : directListing && directListing[0] ? (
            <div className={styles.nftPriceContainer}>
              <div>
                <p className={styles.nftPriceLabel}>Price</p>
                <p className={styles.nftPriceValue}>
                  {`${directListing[0]?.currencyValuePerToken.displayValue}
            ${directListing[0]?.currencyValuePerToken.symbol}`}
                </p>
              </div>
            </div>
          ) : auctionListing && auctionListing[0] ? (
            <div className={styles.nftBidContainer}>
              <div>
                <p className={styles.nftPriceLabel}>Minimum Bid</p>
                <p className={styles.nftPriceValue}>
                  {`${auctionListing[0]?.minimumBidCurrencyValue.displayValue}
            ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}
                </p>
              </div>
              <div>
                <p className={styles.nftPriceLabel}>Time Left</p>
                <p className={styles.nftPriceValue}>
                  {`${auctionListing[0]?.endTimeInSeconds}`}
                </p>
              </div>
            </div>
          ) : (
            <div className={styles.nftPriceContainer}>
              <div>
                <p className={styles.nftPriceLabel}>Price</p>
                <p className={styles.nftPriceValue}>Not for sale</p>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
  