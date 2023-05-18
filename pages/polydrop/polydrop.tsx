import { useContract, useNFTs } from "@thirdweb-dev/react";
import React from "react";
import Container from "../../components/Container/Container";
import NFTGrid from "../../components/NFT/NFTGrid/NFTGridPolyDrop";
import { PolyDrop } from "../../const/contractAddresses";
import styles from "../../styles/Navbar.module.css"
import Link from "next/link";
import Head from 'next/head';
import siteMetadata from '../../data/siteMetadata';
import { NextPage } from "next";

const ethtree: NextPage = () => {
  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(PolyDrop);
  const { data, isLoading } = useNFTs(contract);

  return (
    <>
    <Head>
        <title>{siteMetadata.siteName} | Poly Drop</title>
      </Head>
      <div className="">  
    <Container maxWidth="lg">
        <h1 className="text-3xl font-bold">POLY DROP</h1>
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
            <Link href="/polydrop/polydrop" className={styles.link}>
              Collection
            </Link>
            <Link href="polydrop/polydrop" className={styles.link}>
              ||
            </Link>
            <Link href="/polydrop/bags" className={styles.link}>
              Bags
            </Link> 
        <p className="mt-8">Right... Click.. Save.</p>
        <NFTGrid
          data={data}
          isLoading={isLoading}
          emptyText={"Looks like there are no NFTs in this collection. Did you fat finger some code???"} />
      </Container>
      </div>
      </>
  );
}

export default ethtree;
