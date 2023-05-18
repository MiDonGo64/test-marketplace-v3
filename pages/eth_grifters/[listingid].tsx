import {
  MediaRenderer, useContract,
  useContractEvents,
  useEnglishAuction, Web3Button
} from "@thirdweb-dev/react";
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
  const [bidValue, setBidValue] = useState<string>();
  const [ listingIdFormatted, setListingIdFormatted ] = useState<BigNumber>();
  const router = useRouter();
  const listingId = router.query;

  // Connect to marketplace smart contract
  const { contract: marketplace } = useContract(
    POLY_MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: nft, isLoading } = useEnglishAuction(marketplace, listingIdFormatted)

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
  
      if (nft?.id) {
        txResult = await marketplace?.englishAuctions.makeBid(
          nft?.id,
          bidValue
        );
      }
  
      return txResult;
    }
  
    async function buyListing() {
      let txResult;
  
      try {
        txResult = await marketplace?.englishAuctions.buyoutAuction(
          nft?.id as string,
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
          <Head>
            <title>{siteMetadata.siteName} | Sell</title>
          </Head>
          <div className="">
          <Toaster position="bottom-center" reverseOrder={false} />
          <Container maxWidth="lg">
            <div className={styles.container}>
              <div className={styles.metadataContainer}>
                <MediaRenderer
                  src={nft?.asset?.image}
                  className={styles.image}
                />
    
                <div className={styles.descriptionContainer}>
                <Link
                 href={`/index`}
                 className={styles.label}
                  >
                Check if this NFT is on the big list.
                </Link>
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
                <p className={styles.label}>Buy Now</p>
                <div className={styles.pricingValue}>
                  {isLoading || !nft ? (
                    <Skeleton width="120" height="24" />
                  ) : (
                    <>
                      {nft ? (
                        <>
                          {nft?.buyoutCurrencyValue.displayValue}
                          {" " + nft?.buyoutCurrencyValue.symbol}
                        </>
                      ) : (
                        "Not for sale"
                      )}
                    </>
                  )}
                </div>

                <div>
                  {isLoading ? (
                    <Skeleton width="120" height="24" />
                  ) : (
                    <>
                      {nft && (
                        <>
                          <p className={styles.label} style={{ marginTop: 12 }}>
                            Bids starting from
                          </p>

                          <div className={styles.pricingValue}>
                            {
                              nft?.minimumBidCurrencyValue
                                .displayValue
                            }
                            {" " +
                              nft?.minimumBidCurrencyValue.symbol}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {isLoading || !nft ? (
              <Skeleton width="100%" height="164" />
            ) : (
              <>
                <Web3Button
                  contractAddress={POLY_MARKETPLACE_ADDRESS}
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
                  Actually Own It
                </Web3Button>

                <div className={`${styles.listingTimeContainer} ${styles.or}`}>
                  <p className={styles.listingTime}>or</p>
                </div>

                <input
                  className={styles.input}
                  defaultValue={
                    nft?.minimumBidCurrencyValue
                      ?.displayValue || 0.00
                  }
                  type="number"
                  step={0.000001}
                  onChange={(e) => {
                    setBidValue(e.target.value);
                  }}
                />

                <Web3Button
                  contractAddress={POLY_MARKETPLACE_ADDRESS}
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
                  Shoot Your Shot
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