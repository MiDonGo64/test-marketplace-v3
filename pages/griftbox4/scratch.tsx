import {
    useContract,
    useAddress,
    OfferV3,
} from "@thirdweb-dev/react";
import type { NextPage } from 'next';
import Head from 'next/head';
import siteMetadata from '../../data/siteMetadata';
import Container from "../../components/Container/Container";
import NFTGrid from "components/NFT/NFTGrid/NFTGridScratch";
import { POLY_MARKETPLACE_ADDRESS } from "../../const/contractAddresses";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../styles/Navbar.module.css"


  
const PolyScratch: NextPage = () => {
  const [offers, setOffers] = useState<OfferV3[]>()
  const address = useAddress();
    const { contract: marketplace } = useContract(
        POLY_MARKETPLACE_ADDRESS,
        "marketplace-v3"
      );

      // load list of valid offers made on token
  useEffect(() => {
    async function listingEvents() {
      if (address) { // Check if nft is defined
        const offers = await marketplace?.offers.getAllValid({
          offeror: address
        });
        setOffers(offers);
      }
    }
    listingEvents();
  }, [address]);
    
    return (
      <>
      <Head>
          <title>{siteMetadata.siteName} | Grift Box</title>
        </Head>
        <div className="">  
      <Container maxWidth="lg">
          <h1 className="text-3xl font-bold">Scratch that!</h1>
          <Link href="/ethdrop/paperhands" className={styles.link}>
              Auctions I Won
            </Link>
            <Link href="/ethdrop/paperhands" className={styles.link}>
              ||
            </Link>
            <Link href="/ethdrop/grifters" className={styles.link}>
              My Auctions
            </Link>
            <Link href="/ethdrop/grifters" className={styles.link}>
              ||
            </Link>
            <Link href="/griftbox3/listingbox" className={styles.link}>
              My listings
            </Link>
            <Link href="/griftbox3/listingbox" className={styles.link}>
              ||
            </Link>
            <Link href="/griftbox4/scratch" className={styles.link}>
              Cancel Offers Made
            </Link> 
          <p className="mt-8">Keep your money or just wait for the listing to end. This function isn't that useful but here for you if you want it.</p>
          <NFTGrid
            data={offers}
            emptyText={"You've made no offers. None given, none to taketh away."} />
        </Container>
        </div>
        </>
    );
  }

export default PolyScratch;