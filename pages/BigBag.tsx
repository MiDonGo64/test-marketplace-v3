import { NextPage } from "next";
import { alchemy } from "const/alchemy";
import { useEffect, useState } from "react";
import { Nft, OwnedNftsResponse } from "alchemy-sdk";
import { MediaRenderer, useAddress } from "@thirdweb-dev/react";
import tokenPageStyles from "../styles/Token.module.css";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid/OPENNFTGrid";
import SaleInfo from "../components/SaleInfo/SaleInfoOPEN";
import Head from 'next/head';
import siteMetadata from '../data/siteMetadata';

const Bags: NextPage = () => {
    const [NFTs, setNFTs] = useState<OwnedNftsResponse>();
    const owner = useAddress();
    const [selectedNft, setSelectedNft] = useState<Nft>();



 useEffect( () => {
  if (owner) {
    async function grabber() {
        const NFTs = await alchemy.nft.getNftsForOwner(owner as unknown as string);
      setNFTs(NFTs);
    }
    console.log(NFTs);
    grabber();
  }  
  }, [owner]);
  
    if (!NFTs)
      return (
        <div className={"flex h-screen w-screen items-center justify-center"}>
          Loading ...
        </div>
      );
  
    return (
      <>
      <Head>
        <title>{siteMetadata.siteName} | Paper Hands</title>
      </Head>
      <div className="">  
      <Container maxWidth="lg">
        <h1 className="text-3xl font-bold">Your Big Bag of Ethereum Collectibles</h1>
        <div className={"flex items-center space-x-1"}>
            <p className={"w-1/4"}>TOTAL NFTs TO SELL:</p>
            </div>
            <div className={"flex items-center space-x-1"}>
            <p className={"w-1/4 text-green-400"}>{NFTs.totalCount}</p>
            </div>
        <h1>Drop some bags</h1>
        {!selectedNft ? (
          <>
            <p>Select which NFT you&rsquo;d like to paperhand (sell) or grift (auction). Got a few to sell? Try the</p><p className="text-green-500"> Floor-Crapper-420.</p>
            <NFTGrid
              NFTs={NFTs}
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
            <p className={tokenPageStyles.collectionName}>
                Contract Address:
              </p>
              <p className={"w-1/4 text-green-400"}>{selectedNft.contract.address}</p>
              <div className={tokenPageStyles.imageContainer}>
                <MediaRenderer
                  src={selectedNft.rawMetadata?.image}
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
                {selectedNft.rawMetadata?.name}
              </h1>
              <p className={tokenPageStyles.collectionName}>
                Token ID #{selectedNft.tokenId}
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