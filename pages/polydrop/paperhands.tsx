import {
    useContract,
    useValidDirectListings,
} from "@thirdweb-dev/react";
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from "next/link";
import siteMetadata from '../../data/siteMetadata';
import Container from "../../components/Container/Container";
import NFTGrid from "components/NFT/NFTGrid/NFTGridPolyDropPaperhands";
import { POLY_MARKETPLACE_ADDRESS } from "../../const/contractAddresses";
import styles from "../../styles/Buy.module.css";
import { PolyDrop } from "../../const/contractAddresses";

  
const PaperHands: NextPage = () => {
    const { contract: marketplace } = useContract(
        POLY_MARKETPLACE_ADDRESS,
        "marketplace-v3"
      );
    
    const { data: nfts, isLoading } = useValidDirectListings(
        marketplace,
       { tokenContract: PolyDrop});
    
       return (
        <>
        <Head>
            <title>{siteMetadata.siteName} | Paperhands</title>
          </Head>
          <div className="">  
        <Container maxWidth="lg">
            <h1 className="text-3xl font-bold">POLY DROP: Paperhands</h1>
                <Link href="/polydrop/paperhands" className={styles.link}>
                  Paper Hands
                </Link>
                <Link href="/polydrop/paperhands" className={styles.link}>
                  ||
                </Link>
                <Link href="/polydrop/grifters" className={styles.link}>
                  Grifters
                </Link>
                <Link href="/polydrop/grifters" className={styles.link}>
                  ||
                </Link>
                <Link href="polydrop/polydrop" className={styles.link}>
                  Collection
                </Link>
                <Link href="polydrop/polydrop" className={styles.link}>
                  ||
                </Link>
                <Link href="/polydrop/bags" className={styles.link}>
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