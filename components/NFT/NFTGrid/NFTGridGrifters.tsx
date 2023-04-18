import type {
    EnglishAuction
    } from "@thirdweb-dev/sdk";
 import Link from "next/link";
 import styles from "../../../styles/Buy.module.css";
 import Skeleton from "../../Skeleton/Skeleton";
 import NFTCard from "../NFTGriftCard";
 
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
   emptyText = "No grifters hanging out in the alley today. Check back tomorrow.",
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
                 href={`/eth_grifters/${nft.id}`}
                 key={nft.assetContractAddress + nft.id}
                 className={styles.nftContainer}
                  >
               <NFTCard
                 nft={{
                  tokenId: nft.asset.id as string,
                  name: nft.asset.name as string,
                  tokenUri: nft.asset.image as string,
                  time: nft.endTimeInSeconds as number,
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
                  time: nft.endTimeInSeconds as number,
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
 