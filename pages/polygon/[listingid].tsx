import { useRouter } from "next/router";
import {
    MediaRenderer,
    ThirdwebNftMedia,
    useContract,
    useContractEvents,
    useDirectListing,
    useValidDirectListings,
    useValidEnglishAuctions,
    Web3Button,
  } from "@thirdweb-dev/react";
import React, { useState, useEffect, useCallback } from "react";
import {
    MARKETPLACE_ADDRESS
  } from "../../const/contractAddresses";
import randomColor from "../../util/randomColor";
import Skeleton from "../../components/Skeleton/Skeleton";
import toast, { Toaster } from "react-hot-toast";
import toastStyle from "../../util/toastConfig";
import styles from "../../styles/Token.module.css";
import Container from "../../components/Container/Container";
import Link from "next/link";
import { BigNumber } from "ethers";
import { OfferV3 } from "@thirdweb-dev/sdk";


const [randomColor1, randomColor2] = [randomColor(), randomColor()];
  
export default async function TokenPage() {
  const [bidValue, setBidValue] = useState<string>();
  const [ listingIdFormatted, setListingIdFormatted ] = useState<BigNumber>();
  const [offers, setOffers] = useState<OfferV3[]>()
  const router = useRouter();
  const listingId = router.query;

  // Connect to marketplace smart contract
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: nft, isLoading } = useDirectListing(marketplace, listingIdFormatted);

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

    const listingEvents = async () => {
      const offers = await marketplace?.offers.getAllValid(listingId);
      return offers || [];
    };

    // load list of valid offers made on token
    useEffect( () => {
      async function listingEvents() {
        const offers = await marketplace?.offers.getAllValid(listingId);
        setOffers(offers);
        console.log(offers);
      }
      listingEvents();
    }, []);
  
    async function createBidOrOffer() {
      let txResult;
      if (!bidValue) {
        toast(`Please enter a bid value`, {
          icon: "❌",
          style: toastStyle,
          position: "bottom-center",
        });
        return;
      }
  
      try {
        txResult = await marketplace?.offers.makeOffer({
        quantity: 1,
        currencyContractAddress: "0xEeFf81Ff1eCE66F44CD6D1681789AB447F2004Fb",
        tokenId: nft?.tokenId as string,
        totalPrice: bidValue,
        assetContractAddress: nft?.assetContractAddress as string,
        });
      } catch {
        throw new Error("No valid listing found for this NFT");
      }
  
      return txResult;
    }
  
    async function buyListing() {
      let txResult;
  
      try {
        txResult = await marketplace?.directListings.buyFromListing(
          nft?.id as string,
          1
        );
      } catch {
        throw new Error("No valid listing found for this NFT");
      }
      return txResult;
    }
  
    useEffect(() => {
      if (router.isReady) {
        setListingIdFormatted(BigNumber.from(listingId.listingid));
        console.log(listingId.listingid);
      }
    }, [router.isReady]);


    return (
        <>
          <Toaster position="bottom-center" reverseOrder={false} />
          <Container maxWidth="lg">
            <div className={styles.container}>
              <div className={styles.metadataContainer}>
                <MediaRenderer
                  src={nft?.asset?.image}
                  className={styles.image}
                />
    
                <div className={styles.descriptionContainer}>
                <p className={styles.label}>add link to collection page</p>
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
                    <p className={styles.label}>Current Owner</p>
                    <p className={styles.nftOwnerAddress}>
                      {nft?.creatorAddress.slice(0, 8)}...{nft?.creatorAddress.slice(-4)}
                    </p>
                  </div>
                </div>
    
                <div className={styles.pricingContainer}>
                  {/* Pricing information */}
                  <div className={styles.pricingInfo}>
                    <p className={styles.label}>Price</p>
                    <div className={styles.pricingValue}>
                      {isLoading || !nft ? (
                        <Skeleton width="120" height="24" />
                      ) : (
                        <>
                          {nft ? (
                        <>
                          {nft?.currencyValuePerToken.displayValue}
                          {" " + nft?.currencyValuePerToken.symbol}
                        </>
                          ) : (
                            "Not for sale"
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
    
                {isLoading ? (
                  <Skeleton width="100%" height="164" />
                ) : (
                  <>
                    <Web3Button
                      contractAddress={MARKETPLACE_ADDRESS}
                      action={async () => await buyListing()}
                      onSuccess={() => {
                        toast(`Purchase success!`, {
                          icon: "✅",
                          style: toastStyle,
                          position: "bottom-center",
                        });
                      }}
                      onError={(e) => {
                        toast(`Purchase failed! Reason: ${e.message}`, {
                          icon: "❌",
                          style: toastStyle,
                          position: "bottom-center",
                        });
                      }}
                    >
                      buy now
                    </Web3Button>
    
                    <div className={`${styles.listingTimeContainer} ${styles.or}`}>
                      <p className={styles.listingTime}>or</p>
                    </div>
    
                    <input
                      className={styles.input}
                      defaultValue={
                         0
                      }
                      type="number"
                      step={0.000001}
                      onChange={(e) => {
                        setBidValue(e.target.value);
                      }}
                    />
    
                    <Web3Button
                      contractAddress={MARKETPLACE_ADDRESS}
                      action={async () => await createBidOrOffer()}
                      onSuccess={() => {
                        toast(`Bid success!`, {
                          icon: "✅",
                          style: toastStyle,
                          position: "bottom-center",
                        });
                      }}
                      onError={(e) => {
                        console.log(e);
                        toast(`Bid failed! Reason: ${e.message}`, {
                          icon: "❌",
                          style: toastStyle,
                          position: "bottom-center",
                        });
                      }}
                    >
                      place offer
                    </Web3Button>
                  </>
                )}
                </div>
              </div>
    
              <div className={styles.listingContainer}>
              <h3 className={styles.descriptionTitle}>Description</h3>
                <p className={styles.description}>{nft?.asset.description}</p>
    
                <h3 className={styles.descriptionTitle}>Traits</h3>
    
                <div className={styles.traitsContainer}>
                  {Object.entries(nft?.asset.attributes || {}).map(
                    ([key, value]) => (
                      <div className={styles.traitContainer} key={key}>
                        <p className={styles.traitName}>{key}</p>
                        <p className={styles.traitValue}>
                          {value?.toString() || ""}
                        </p>
                      </div>
                    )
                  )}
                </div>
    
                <h3 className={styles.descriptionTitle}>Offers</h3>
    
                <div className={styles.traitsContainer}>
                  {offers?.map((list, index) => (
                    <div
                      key={list.id}
                      className={styles.eventsContainer}
                    >
                      <div className={styles.eventContainer}>
                        <p className={styles.traitName}>ID</p>
                        <p className={styles.traitValue}>
                          {list.id}
                        </p>
                      </div>
    
                      <div className={styles.eventContainer}>
                        <p className={styles.traitName}>USDC</p>
                        <p className={styles.traitValue}>
                          {list.currencyValue.displayValue}
                        </p>
                      </div>
    
                      <div className={styles.eventContainer}>
                        <p className={styles.traitName}>By</p>
                        <p className={styles.traitValue}>
                        {list.offerorAddress?.slice(0, 4)}...
                          {list.offerorAddress?.slice(-2)}
                        </p>
                      </div>
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
        </>
      );
    }

