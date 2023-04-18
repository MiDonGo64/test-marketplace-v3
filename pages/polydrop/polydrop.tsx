import { useContract, useNFTs } from "@thirdweb-dev/react";
import Head from 'next/head';
import siteMetadata from '../../data/siteMetadata';
import Container from "../../evm-engine/components/Container/Container";
import NFTGrid from "../../evm-engine/components/NFT/NFTGrid/NFTGrid";
import { PolyDrop } from "../../evm-engine/const/contractAddresses";

export default function Buy() {
  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(PolyDrop);
  const { data, isLoading } = useNFTs(contract);

  return (
    <>
      <Head>
        <title>{siteMetadata.siteName} | Bags</title>
      </Head>
      <div className="">
    <Container maxWidth="lg">
      <h1>Buy NFTs</h1>
      <p>Browse which NFTs are available from the collection.</p>
      <NFTGrid
        data={data}
        isLoading={isLoading}
        emptyText={
          "Looks like there are no NFTs in this collection. Did you import your contract on the thirdweb dashboard? https://thirdweb.com/dashboard"
        }
      />
    </Container>
    </div>
    </>
  );
}
