import { useContract, useNFTs } from "@thirdweb-dev/react";
import React from "react";
import Container from "../../components/Container/Container";
import NFTGridETHDrop from "../../components/NFT/NFTGrid/NFTGridETHDrop";
import { ETHDrop } from "../../const/contractAddresses";
import styles from "../../styles/Navbar.module.css"
import Link from "next/link";
import Head from 'next/head';
import siteMetadata from '../../data/siteMetadata';
import { NextPage } from "next";

const EthDrop: NextPage = () => {
  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(ETHDrop);
  const { data, isLoading } = useNFTs(contract);

  return (
    <>
    <Head>
        <title>{siteMetadata.siteName} | ETHDROP</title>
      </Head>
      <div className="">  
    <Container maxWidth="lg">
        <h1 className="text-3xl font-bold">ETH DROP</h1>
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
            <Link href="/ethdrop/ethdrop" className={styles.link}>
              Collection
            </Link>
            <Link href="ethdrop/ethdrop" className={styles.link}>
              ||
            </Link>
            <Link href="/ethdrop/bags" className={styles.link}>
              Bags
            </Link> 
        <p className="mt-8">Right... Click.. Save.</p>
        <NFTGridETHDrop
          data={data}
          isLoading={isLoading}
          emptyText={"Looks like there are no NFTs in this collection. Did you fat finger some code???"} />
      </Container>
      </div>
      </>
  );
}

export default EthDrop;
