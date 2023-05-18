import type {
    DirectListingV3
    } from "@thirdweb-dev/sdk";
  import Link from "next/link";
  import styles from "../../../styles/Buy.module.css";
  import NFTCard from "../NFTGBListingCard";
  
  type Props = {
   data: DirectListingV3[] | undefined;
   overrideOnclickBehavior?: (nft: string) => void;
   emptyText?: string;
  };
  
  export default function NFTGrid({
   data,
   overrideOnclickBehavior,
   emptyText = "Sorry nothing but diamond hands here.",
  }: Props) {
   return (
     <div className={styles.nftGridContainer}>
       {data && data.length > 0 ? (
         data.map((nft) =>
           !overrideOnclickBehavior ? (
             <Link
                 href={`/griftbox2/${nft.id}`}
                 key={nft.assetContractAddress + nft.id}
                 className={styles.nftContainer}
                  >
               <NFTCard
                 nft={nft}
                 />
             </Link>
           ) : (
             <div
               key={nft.id}
               className={styles.nftContainer}
               onClick={() => overrideOnclickBehavior(nft as unknown as string)}
             >
               <NFTCard
                 nft={nft}
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
  