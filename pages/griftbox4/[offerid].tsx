import {
    MediaRenderer, useContract,
    useContractEvents,
    Web3Button
  } from "@thirdweb-dev/react";
  import { OfferV3 } from "@thirdweb-dev/sdk";
  import { BigNumber } from "ethers";
  import Link from "next/link";
  import { useRouter } from "next/router";
  import { useEffect, useState } from "react";
  import toast, { Toaster } from "react-hot-toast";
  import Container from "../../components/Container/Container";
  import Skeleton from "../../components/Skeleton/Skeleton";
  import {
    POLY_MARKETPLACE_ADDRESS
  } from "../../const/contractAddresses";
  import randomColor from "../../utils/randomColor";
  import toastStyle from "../../utils/toastConfig";
  import styles from "../../styles/Token.module.css";
  import type { NextPage } from 'next';
  import Head from 'next/head';
  import siteMetadata from '../../data/siteMetadata';
  
  const [randomColor1, randomColor2] = [randomColor(), randomColor()];
  
  const TokenId: NextPage = () => {
    const [offerIdFormatted, setOfferIdFormatted] = useState<BigNumber>();
    const [nft, setNft] = useState<OfferV3>()
    const router = useRouter();
    const offerId = router.query;
  
    // Connect to marketplace smart contract
    const { contract: marketplace } = useContract(
      POLY_MARKETPLACE_ADDRESS,
      "marketplace-v3"
    );
  
    const collectionAddress = nft?.assetContractAddress;
  
    // Connect to NFT Collection smart contract
    const { contract: nftCollection } = useContract(collectionAddress);
  
    // Load historical transfer events: TODO - more event types like sale
    const { data: transferEvents, isLoading: loadingTransferEvents } =
      useContractEvents(nftCollection, "Transfer", {
        queryFilter: {
          filters: {
            tokenId: nft?.tokenId,
          },
          order: "desc",
        },
      });

    async function cancelOffer() {
      let txResult;
        if (offerIdFormatted)
      try {
        txResult = await marketplace?.offers.cancelOffer(offerIdFormatted)
      } catch {
        throw new Error("No valid listing found for this NFT");
      }
      return txResult;
    }
  
    useEffect(() => {
      if (router.isReady) {
        setOfferIdFormatted(BigNumber.from(offerId.offerid));
        console.log(offerId.offerid);
      }
    }, [router.isReady]);
  
    // load list of valid offers made on token
    useEffect(() => {
      async function listingEvents() {
        if (offerIdFormatted) { // Check if nft is defined
          const nft = await marketplace?.offers.getOffer(offerIdFormatted);
          setNft(nft);
        }
      }
      listingEvents();
    }, [offerIdFormatted]);
  
  
  
    return (
      <>
        <Head>
          <title>{siteMetadata.siteName} | Sell</title>
        </Head>
        <div className="">
        <Toaster position="bottom-center" reverseOrder={false} />
        <Container maxWidth="lg">
          <div className={styles.container}>
            <div className={styles.metadataContainer}>
            <p className={styles.collectionName}>Offer # {nft?.id}</p>
              <MediaRenderer
                src={nft?.asset?.image}
                className={styles.image}
              />
  
              <div className={styles.descriptionContainer}>
                <h1 className={styles.title}>{nft?.asset?.name}</h1>
                <p className={styles.collectionName}>Token ID #{nft?.tokenId}</p>
  
                <div
                  className={styles.nftOwnerContainer}
                >
                  {/* Random linear gradient circle shape */}
                  <div
                    className={styles.nftOwnerImage}
                    style={{
                      background: `linear-gradient(90deg, ${randomColor1}, ${randomColor2})`,
                    }}
                  />
                  <div className={styles.nftOwnerInfo}>
                    <p className={styles.label}>Offer Wallet</p>
                    <p className={styles.nftOwnerAddress}>
                      {nft?.offerorAddress.slice(0, 8)}...{nft?.offerorAddress.slice(-4)}
                    </p>
                  </div>
                </div>
  
                <div className={styles.pricingContainer}>
                  {/* Pricing information */}
                  <div className={styles.pricingInfo}>
                    <p className={styles.label}>Your Offer</p>
                    <div className={styles.pricingValue}>
                      {!nft ? (
                        <Skeleton width="120" height="24" />
                      ) : (
                        <>
                          {nft ? (
                            <>
                              {nft?.currencyValue.displayValue}
                              {" " + nft?.currencyValue.symbol}
                            </>
                          ) : (
                            "Not for sale"
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
  
                {!nft ? (
                  <Skeleton width="100%" height="164" />
                ) : (
                  <>
                    <Web3Button
                      contractAddress={POLY_MARKETPLACE_ADDRESS}
                      action={async () => await cancelOffer()}
                      onSuccess={() => {
                        toast(`Offer cancelled!`, {
                          icon: "✅",
                          style: toastStyle,
                          position: "bottom-center",
                        });
                        router.push(
                            `/griftbox/scratch`
                          );
                      }}
                      onError={(e) => {
                        toast(`Cancel failed! Reason: ${e.message}`, {
                          icon: "❌",
                          style: toastStyle,
                          position: "bottom-center",
                        });
                      }}
                    >
                      Cancel Offer
                    </Web3Button>
  
  
  
                  </>
                )}
              </div>
            </div>
  
            <div className={styles.listingContainer}>
              <h3 className={styles.descriptionTitle}>Description</h3>
              <p className={styles.description}>{nft?.asset.description}</p>
  
              <h3 className={styles.descriptionTitle}>Attributes:</h3>
  
              <div className={styles.traitsContainer}>
                {Array.isArray(nft?.asset.attributes) &&
                  nft?.asset.attributes.map((trait: any, index: number) => (
                    <div className={styles.traitContainer} key={index}>
                      <p className={styles.traitName}>{trait.trait_type}</p>
                      <p className={styles.traitValue}>
                        {trait.value?.toString() || ""}
                      </p>
                    </div>
                  ))}
              </div>
  
              <h3 className={styles.descriptionTitle}>History</h3>
  
              <div className={styles.traitsContainer}>
                {transferEvents?.map((event, index) => (
                  <div
                    key={event.transaction.transactionHash}
                    className={styles.eventsContainer}
                  >
                    <div className={styles.eventContainer}>
                      <p className={styles.traitName}>Event</p>
                      <p className={styles.traitValue}>
                        {
                          // if last event in array, then it's a mint
                          index === transferEvents.length - 1
                            ? "Mint"
                            : "Transfer"
                        }
                      </p>
                    </div>
  
                    <div className={styles.eventContainer}>
                      <p className={styles.traitName}>From</p>
                      <p className={styles.traitValue}>
                        {event.data.from?.slice(0, 4)}...
                        {event.data.from?.slice(-2)}
                      </p>
                    </div>
  
                    <div className={styles.eventContainer}>
                      <p className={styles.traitName}>To</p>
                      <p className={styles.traitValue}>
                        {event.data.to?.slice(0, 4)}...
                        {event.data.to?.slice(-2)}
                      </p>
                    </div>
  
                    <div className={styles.eventContainer}>
                      <Link
                        className={styles.txHashArrow}
                        href={`https://mumbai.polygonscan.com/tx/${event.transaction.transactionHash}`}
                        target="_blank"
                      >
                        ↗
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
        </div>
      </>
    );
  }
  
  export default TokenId;