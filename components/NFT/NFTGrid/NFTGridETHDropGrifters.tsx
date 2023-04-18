import type {
    EnglishAuction
    } from "@thirdweb-dev/sdk";
 import Link from "next/link";
 import styles from "../../../styles/Buy.module.css";
 import Skeleton from "../../Skeleton/Skeleton";
 import NFTCard from "../NFTGriftCard";
 import {ETHDrop} from "../../../const/contractAddresses";

 type Props = {
    isLoading: boolean;
    data: EnglishAuction[] | undefined;
    overrideOnclickBehavior?: (nft: string) => void;
    emptyText?: string;
  };
  
  export default function NFTGrid({
    isLoading,
    data,
    overrideOnclickBehavior,
    emptyText = "Looks like there is no Grifters in the alley today.",
  }: Props) {
    return (
      <div className={styles.nftGridContainer}>
        {isLoading ? (
          [...Array(20)].map((_, index) => (
            <div key={index} className={styles.nftContainer}>
              <Skeleton key={index} width={"100%"} height="312px" />
            </div>
          ))
        ) : data && data.length > 0 ? (
          data.map((nft) =>
            !overrideOnclickBehavior ? (
              <Link
                  href={`/ethdrop/${ETHDrop}/${nft.tokenId}`}
                  key={nft.assetContractAddress + nft.id}
                  className={styles.nftContainer}
                   >
                <NFTCard
                  nft={{
                   tokenId: nft.asset.id as string,
                   name: nft.asset.name as string,
                   tokenUri: nft.asset.image as string,
                   bid: nft.minimumBidCurrencyValue?.displayValue + nft.minimumBidCurrencyValue?.symbol
                  }}
                  />
              </Link>
            ) : (
              <div
                key={nft.id}
                className={styles.nftContainer}
                onClick={() => overrideOnclickBehavior(nft as unknown as string)}
              >
                <NFTCard
                  nft={{
                   tokenId: nft.asset.id as string,
                   name: nft.asset.name as string,
                   tokenUri: nft.asset.image as string,
                   bid: nft.minimumBidCurrencyValue?.displayValue + nft.minimumBidCurrencyValue?.symbol
                  }}
                  />
              </div>
            )
          )
        ) : (
          <p>{emptyText}</p>
        )}
      </div>
    );
  }
  