import { useContract, useNFTs } from "@thirdweb-dev/react";
import React from "react";
import Container from "../../components/Container/Container";
import NFTGridETH_3 from "../../components/NFT/NFTGrid/NFTGridETH_3";
import { ETH_3 } from "../../const/contractAddresses";
import styles from "../../styles/Navbar.module.css"
import Link from "next/link";
import Head from 'next/head';
import siteMetadata from '../../data/siteMetadata';
import { NextPage } from "next";

const ethtree: NextPage = () => {
  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(ETH_3);
  const { data, isLoading } = useNFTs(contract);

  return (
    <>
    <Head>
        <title>{siteMetadata.siteName} | ETH_3</title>
      </Head>
      <div className="">  
    <Container maxWidth="lg">
        <h1 className="text-3xl font-bold">ETH THREE</h1>
            <Link href="/eththree/paperhands" className={styles.link}>
              Paper Hands
            </Link>
            <Link href="/eththree/paperhands" className={styles.link}>
              ||
            </Link>
            <Link href="/eththree/grifters" className={styles.link}>
              Grifters
            </Link>
            <Link href="/eththree/grifters" className={styles.link}>
              ||
            </Link>
            <Link href="/eththree/eththree" className={styles.link}>
              Collection
            </Link>
            <Link href="eththree/eththree" className={styles.link}>
              ||
            </Link>
            <Link href="/eththree/bags" className={styles.link}>
              Bags
            </Link> 
        <p className="mt-8">Right... Click.. Save.</p>
        <NFTGridETH_3
          data={data}
          isLoading={isLoading}
          emptyText={"Looks like there are no NFTs in this collection. Did you fat finger some code???"} />
      </Container>
      </div>
      </>
  );
}

export default ethtree;
