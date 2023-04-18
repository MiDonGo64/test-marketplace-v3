import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs
} from "@thirdweb-dev/react";
import { NFT as NFTType } from "@thirdweb-dev/sdk";
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from "react";
import siteMetadata from '../../data/siteMetadata';
import Container from "../../evm-engine/components/Container/Container";
import NFTGrid from "../../evm-engine/components/NFT/NFTGrid/NFTGrid";
import SaleInfo from "../../evm-engine/components/SaleInfo/SaleInfo";
import { PolyDrop } from "../../evm-engine/const/contractAddresses";
import tokenPageStyles from "../../styles/Token.module.css";


const PolyDropBags: NextPage = () => {
  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(PolyDrop);
  const address = useAddress();
  const { data, isLoading } = useOwnedNFTs(contract, address);

  const [selectedNft, setSelectedNft] = useState<NFTType>();
  return (
    <>
      <Head>
        <title>{siteMetadata.siteName} | Bags</title>
      </Head>
      <div className="">
      <Container maxWidth="lg">
      <h1>Sell NFTs</h1>
      {!selectedNft ? (
        <>
          <p>Select which NFT you&rsquo;d like to sell below.</p>
          <NFTGrid
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
};

export default PolyDropBags;
