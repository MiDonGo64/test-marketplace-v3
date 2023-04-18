import {
    useContract,
    useValidDirectListings,
} from "@thirdweb-dev/react";
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from "next/link";
import siteMetadata from '../../data/siteMetadata';
import Container from "../../components/Container/Container";
import NFTGrid from "components/NFT/NFTGrid/NFTGridETHDropPaperhands";
import { ETH_MARKETPLACE_ADDRESS } from "../../const/contractAddresses";
import styles from "../../styles/Buy.module.css";
import { ETHDrop } from "../../const/contractAddresses";

  
const PaperHands: NextPage = () => {
    const { contract: marketplace } = useContract(
        ETH_MARKETPLACE_ADDRESS,
        "marketplace-v3"
      );
    
    const { data: nfts, isLoading } = useValidDirectListings(
        marketplace,
       { tokenContract: ETHDrop});
    
       return (
        <>
        <Head>
            <title>{siteMetadata.siteName} | Paperhands</title>
          </Head>
          <div className="">  
        <Container maxWidth="lg">
            <h1 className="text-3xl font-bold">ETH DROP: Paperhands</h1>
                <Link href="/ethdrop/paperhands" className={styles.link}>
                  Paper Hands
                </Link>
                <Link href="/ethdrop/paperhands" className={styles.link}>
                  ||
                </Link>
                <Link href="/ethdrop/grifters" className={styles.link}>
                  Grifters
                </Link>
                <Link href="/ethdrop/grifters" className={styles.link}>
                  ||
                </Link>
                <Link href="ethdrop/ethdrop" className={styles.link}>
                  Collection
                </Link>
                <Link href="ethdrop/ethdrop" className={styles.link}>
                  ||
                </Link>
                <Link href="/ethdrop/bags" className={styles.link}>
                  Bags
                </Link> 
            <p className="mt-8">See what's on the floor.</p>
            <NFTGrid
              data={nfts}
              isLoading={isLoading}
              emptyText={"Sorry. Nothing but diamond hands here."} />
          </Container>
          </div>
          </>
      );
    }

export default PaperHands;