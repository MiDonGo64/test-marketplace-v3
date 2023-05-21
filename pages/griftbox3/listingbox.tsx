import {
    useContract,
    useAddress,
    useValidDirectListings,
  } from "@thirdweb-dev/react";
  import type { NextPage } from 'next';
  import Head from 'next/head';
  import siteMetadata from '../../data/siteMetadata';
  import Container from "../../components/Container/Container";
  import NFTGrid from "components/NFT/NFTGrid/NFTGridGriftbox3";
  import { POLY_MARKETPLACE_ADDRESS } from "../../const/contractAddresses";
  import Link from "next/link";
  import styles from "../../styles/Navbar.module.css"
  
  
  
  const PolyScratch: NextPage = () => {
  const address = useAddress();
    const { contract: marketplace } = useContract(
        POLY_MARKETPLACE_ADDRESS,
        "marketplace-v3"
      );

    const { data: nft, isLoading } = useValidDirectListings(marketplace, {seller: address});
  

    
    return (
      <>
      <Head>
          <title>{siteMetadata.siteName} | Grift Box</title>
        </Head>
        <div className="">  
      <Container maxWidth="lg">
          <h1 className="text-3xl font-bold">Watcha Selling...</h1>
          <Link href="/griftbox1/griftbox" className={styles.link}>
            Auctions I Won
          </Link>
          <Link href="/griftbox1/griftbox" className={styles.link}>
            ||
          </Link>
          <Link href="/griftbox2/griftbox" className={styles.link}>
            My Auctions
          </Link>
          <Link href="/griftbox2/griftbox" className={styles.link}>
            ||
          </Link>
          <Link href="/griftbox3/listingbox" className={styles.link}>
            My listings
          </Link>
          <Link href="griftbox3/listingbox" className={styles.link}>
            ||
          </Link>
          <Link href="/griftbox4/scratch" className={styles.link}>
            Cancel Offers Made
          </Link> 
          <p className="mt-8">Did you forget what you listed? Here they are. You can cancel a sell or just wait for the listing to end.</p>
          <NFTGrid
              data={nft}
              isLoading={isLoading}
              emptyText={"You've made no listings. None given, none to taketh away."} />
        </Container>
        </div>
        </>
    );
  }
  
  export default PolyScratch;