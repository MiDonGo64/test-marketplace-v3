import {
    ThirdwebNftMedia,
    useAddress,
    useContract,
    useOwnedNFTs
  } from "@thirdweb-dev/react";
  import { NFT as NFTType } from "@thirdweb-dev/sdk";
  import { useState } from "react";
  import tokenPageStyles from "../../styles/Token.module.css";
  import Container from "../../components/Container/Container";
  import NFTGridETH_3 from "../../components/NFT/NFTGrid/NFTGridETH_3";
  import SaleInfo from "../../components/SaleInfo/SaleInfoETH_3";
  import { ETH_3 } from "../../const/contractAddresses";
  import Link from "next/link";
  import styles from "../../styles/Navbar.module.css"
  import Head from 'next/head';
  import siteMetadata from '../../data/siteMetadata';
  import { NextPage } from "next";

const Bags: NextPage = () => {
    // Load all of the NFTs from the NFT Collection
    const { contract } = useContract(ETH_3);
    const address = useAddress();
    const { data, isLoading } = useOwnedNFTs(contract, address);
  
    const [selectedNft, setSelectedNft] = useState<NFTType>();
  
    return (
      <>
      <Head>
        <title>{siteMetadata.siteName} | Paper Hands</title>
      </Head>
      <div className="">  
      <Container maxWidth="lg">
        <h1 className="text-3xl font-bold">ETH DROP: BAGS</h1>
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
                <Link href="/eththree/eththree" className={styles.link}>
                  ||
                </Link>
                <Link href="/eththree/bags" className={styles.link}>
                  Bags
                </Link> 
        <h1>Drop some bags</h1>
        {!selectedNft ? (
          <>
            <p>Select which NFT you&rsquo;d like to paperhand (sell) or grift (auction).</p>
            <NFTGridETH_3
              data={data}
              isLoading={isLoading}
              overrideOnclickBehavior={(nft) => {
                setSelectedNft(nft);
              }}
              emptyText={
                "Looks like you don't own any NFTs in this collection. Get some off the paperhands!"
              }
            />
          </>
        ) : (
          <div className={tokenPageStyles.container} style={{ marginTop: 0 }}>
            <div className={tokenPageStyles.metadataContainer}>
              <div className={tokenPageStyles.imageContainer}>
                <ThirdwebNftMedia
                  metadata={selectedNft.metadata}
                  className={tokenPageStyles.image}
                />
                <button
                  onClick={() => {
                    setSelectedNft(undefined);
                  }}
                  className={tokenPageStyles.crossButton}
                >
                  X
                </button>
              </div>
            </div>
  
            <div className={tokenPageStyles.listingContainer}>
              <p>You&rsquo;re about to list the following item for sale.</p>
              <p>All sales are done in USDC.</p>
              <h1 className={tokenPageStyles.title}>
                {selectedNft.metadata.name}
              </h1>
              <p className={tokenPageStyles.collectionName}>
                Token ID #{selectedNft.metadata.id}
              </p>
  
              <div className={tokenPageStyles.pricingContainer}>
                <SaleInfo nft={selectedNft} />
              </div>
            </div>
          </div>
        )}
      </Container>
      </div>
      </>
  );
}

export default Bags;
  