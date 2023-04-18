import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import siteMetadata from '../data/siteMetadata';

const Sell = dynamic(
  () => import('../evm-engine/evmarketplace/polydrop/sell'),
  { ssr: false }
);

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{siteMetadata.siteName} | Bags</title>
      </Head>
      <div className="">
        <Sell />
      </div>
    </>
  );
};

export default Home;
