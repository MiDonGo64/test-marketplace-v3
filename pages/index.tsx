import { NextPage } from 'next';
import Head from 'next/head';
import { BsDiscord } from 'react-icons/bs';
import siteData from '../data/siteMetadata';
import Link from 'next/link';
import Container from 'components/Container/Container';
import styles from "../styles/Buy.module.css"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Big List | {siteData.siteName}</title>
      </Head>

      <h1 className="text-3xl font-bold">The Big List: ETHEREUM</h1>
      <div className="flex flex-col items-center justify-center text-pageText mt-24 gap-2 leading-12">
        <p className="max-w-3xl text-center font-normal text-2xl">
          {siteData.description}
        </p>
        <Link
          className="text-yellow-400 hover:underline flex items-center gap-1 text-xl"
          href="https://t.co/560iZqnYkx"
          target="_blank"
          rel="noreferrer"
        >
          <BsDiscord />
          Discord
        </Link>
        <p className="max-w-3xl text-center font-normal text-base">
        This is version 0.0.1 of our marketplace. Thanks for checking us out. Below is our big list of curated collections. You can find planned updates and more in our discord...  This is an open market for Solana, Ethereum, and Polygon with a curation towards projects building entertaining ip and comics. All trade fee profits go toward an advertising fund for the curated groups that opt into the collective to help them grow.
        </p>
        <img className="w-10 hover:brightness-200 hover:grayscale flex items-center" src="./hotdog-truck.png" alt="Hotdog Truck"></img>
        <p className="max-w-3xl text-center font-normal text-base">
          The hotdog truck can take you anywhere.
        </p>
        <p className="max-w-3xl text-center font-normal text-2xl">
          Ethereum Comics
        </p>
        <p className="max-w-3xl text-center font-normal text-2xl">
          Ethereum Collections
        </p>
        <Container maxWidth="lg">
        <div className={styles.nftGridContainer}>
            <Link
              href={`/ethdrop/ethdrop`}
              className={styles.nftContainer}
            >
              <img className="w-100 hover:brightness-200 hover:grayscale" src="/DrDoomFunny.png" alt="Super Donnie"></img>
              <p>Eth Drop</p>
            </Link>
            <Link
              href={`/testkong/testkong`}
              className={styles.nftContainer}
            >
              <img className="w-100 hover:brightness-200 hover:grayscale" src="/DrDoomFunny.png" alt="Super Donnie"></img>
              <p>Test Kong</p>
            </Link>
            <Link
              href={`/polydrop/polydrop`}
              className={styles.nftContainer}
            >
              <img className="w-100 hover:brightness-200 hover:grayscale" src="/DrDoomFunny.png" alt="Super Donnie"></img>
              <p>Poly Drop</p>
            </Link>
        </div>  
        </Container>
      </div>
    </>
  );
};

export default Home;