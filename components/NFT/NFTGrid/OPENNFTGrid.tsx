import { Nft, OwnedNftsResponse } from "alchemy-sdk";
import Link from "next/link";
import styles from "../../../styles/Buy.module.css";
import NFTCard from "../OPENNFTCard";

type Props = {
 NFTs: OwnedNftsResponse | undefined;
 overrideOnclickBehavior?: (nft: Nft) => void;
 emptyText?: string;
};

export default function NFTGrid({
 NFTs,
 overrideOnclickBehavior,
 emptyText = "Your coffers are bare, Might you care to check the back alley for paper hands...",
}: Props) {
 return (
   <div className={styles.nftGridContainer}>
     {NFTs && NFTs.blockHash.length > 0 ? (
       NFTs.ownedNfts.map((nft: Nft) =>
         !overrideOnclickBehavior ? (
           <Link
               href={`/ethave`}
               key={nft.contract.address + nft.tokenId}
               className={styles.nftContainer}
                >
             <NFTCard
               nft={nft}
               />
           </Link>
         ) : (
           <div
             key={nft.tokenId}
             className={styles.nftContainer}
             onClick={() => overrideOnclickBehavior(nft)}
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
