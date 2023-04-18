import { useEffect } from "react";
import { Goerli } from "@thirdweb-dev/chains";
import {
    MediaRenderer,
    ThirdwebNftMedia,
    useContract,
    useContractEvents, 
    useValidDirectListings,
    useValidEnglishAuctions,
    Web3Button
} from "@thirdweb-dev/react";
import { NFT, ThirdwebSDK, OfferV3 } from "@thirdweb-dev/sdk";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Container from "../../../components/Container/Container";
import Skeleton from "../../../components/Skeleton/Skeleton";
import {
    ETHDrop,
    ETH_MARKETPLACE_ADDRESS
} from "../../../const/contractAddresses";
import randomColor from "../../../utils/randomColor";
import toastStyle from "../../../utils/toastConfig";
import styles from "../../../styles/Token.module.css";

type Props = {
  nft: NFT;
  contractMetadata: any;
};

const [randomColor1, randomColor2] = [randomColor(), randomColor()];

export default function TokenPage({ nft, contractMetadata }: Props) {
  const [bidValue, setBidValue] = useState<string>();
  const [offers, setOffers] = useState<OfferV3[]>()

  // Connect to marketplace smart contract
  const { contract: marketplace, isLoading: loadingContract } = useContract(
    ETH_MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  // Connect to NFT Collection smart contract
  const { contract: nftCollection } = useContract(ETHDrop);

  const { data: directListing, isLoading: loadingDirect } =
    useValidDirectListings(marketplace, {
      tokenContract: ETHDrop,
      tokenId: nft.metadata.id,
    });

  // 2. Load if the NFT is for auction
  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: ETHDrop,
      tokenId: nft.metadata.id,
    });

  // load list of valid offers made on token
  useEffect( () => {
    async function listingEvents() {
      const offers = await marketplace?.offers.getAllValid(
        {
          tokenContract: ETHDrop,
          tokenId: nft.metadata.id,
        }
      );
      setOffers(offers);
    }
    listingEvents();
  }, [offers]);

  // Load historical transfer events: TODO - more event types like sale
  const { data: transferEvents, isLoading: loadingTransferEvents } =
    useContractEvents(nftCollection, "Transfer", {
      queryFilter: {
        filters: {
          tokenId: nft.metadata.id,
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

    if (auctionListing?.[0]) {
      txResult = await marketplace?.englishAuctions.makeBid(
        auctionListing[0].id,
        bidValue
      );
    } else {
      txResult = await marketplace?.offers.makeOffer({
        quantity: 1,
        currencyContractAddress: "0x72F60F2F9695C5911bA57ee43339AD82ce8ABB6A",
        tokenId: nft.metadata.id,
        totalPrice: bidValue,
        assetContractAddress: ETHDrop,
      });
    }

    return txResult;
  }

  async function buyListing() {
    let txResult;

    if (auctionListing?.[0]) {
      txResult = await marketplace?.englishAuctions.buyoutAuction(
        auctionListing[0].id
      );
    } else if (directListing?.[0]) {
      txResult = await marketplace?.directListings.buyFromListing(
        directListing[0].id,
        1
      );
    } else {
      throw new Error("No valid listing found for this NFT");
    }
    return txResult;
  }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Container maxWidth="lg">
            <Link href="/ethdrop/paperhands" className={styles.link}>
              Paper Hands
            </Link>
            <Link href="/ethdrop/paperhands" className={styles.link}>
              ||
            </Link>
            <Link href="/ethdrop/grifters" className={styles.link}>
              Grifters
            </Link>
            <Link href="/ethdrop/grifters" className={styles.link}>
              ||
            </Link>
            <Link href="/ethdrop/ethdrop" className={styles.link}>
              Collection
            </Link>
            <Link href="ethdrop/ethdrop" className={styles.link}>
              ||
            </Link>
            <Link href="/ethdrop/bags" className={styles.link}>
              Bags
            </Link> 
        <div className={styles.container}>
          <div className={styles.metadataContainer}>
            <ThirdwebNftMedia
              metadata={nft.metadata}
              className={styles.image}
            />

            <div className={styles.descriptionContainer}>
            {contractMetadata && (
              <div className={styles.contractMetadataContainer}>
                <MediaRenderer
                  src={contractMetadata.image}
                  className={styles.collectionImage}
                />
                <p className={styles.collectionName}>{contractMetadata.name}</p>
              </div>
            )}
            <h1 className={styles.title}>{nft.metadata.name}</h1>
            <p className={styles.collectionName}>Token ID #{nft.metadata.id}</p>

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
                  {nft.owner.slice(0, 8)}...{nft.owner.slice(-4)}
                </p>
              </div>
            </div>

            <div className={styles.pricingContainer}>
              {/* Pricing information */}
              <div className={styles.pricingInfo}>
                <p className={styles.label}>Buy Now</p>
                <div className={styles.pricingValue}>
                  {loadingContract || loadingDirect || loadingAuction ? (
                    <Skeleton width="120" height="24" />
                  ) : (
                    <>
                      {directListing && directListing[0] ? (
                        <>
                          {directListing[0]?.currencyValuePerToken.displayValue}
                          {" " + directListing[0]?.currencyValuePerToken.symbol}
                        </>
                      ) : auctionListing && auctionListing[0] ? (
                        <>
                          {auctionListing[0]?.buyoutCurrencyValue.displayValue}
                          {" " + auctionListing[0]?.buyoutCurrencyValue.symbol}
                        </>
                      ) : (
                        "Not for sale"
                      )}
                    </>
                  )}
                </div>

                <div>
                  {loadingAuction ? (
                    <Skeleton width="120" height="24" />
                  ) : (
                    <>
                      {auctionListing && auctionListing[0] && (
                        <>
                          <p className={styles.label} style={{ marginTop: 12 }}>
                            Bids starting from
                          </p>

                          <div className={styles.pricingValue}>
                            {
                              auctionListing[0]?.minimumBidCurrencyValue
                                .displayValue
                            }
                            {" " +
                              auctionListing[0]?.minimumBidCurrencyValue.symbol}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {loadingContract || loadingDirect || loadingAuction ? (
              <Skeleton width="100%" height="164" />
            ) : (
              <>
                <Web3Button
                  contractAddress={ETH_MARKETPLACE_ADDRESS}
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
                    auctionListing?.[0]?.minimumBidCurrencyValue
                      ?.displayValue || 0.00
                  }
                  type="number"
                  step={0.000001}
                  onChange={(e) => {
                    setBidValue(e.target.value);
                  }}
                />

                <Web3Button
                  contractAddress={ETH_MARKETPLACE_ADDRESS}
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
            <p className={styles.description}>{nft.metadata.description}</p>

            <h3 className={styles.descriptionTitle}>Attributes:</h3>

            <div className={styles.traitsContainer}>
              {Array.isArray(nft?.metadata?.attributes) &&
                nft.metadata.attributes.map((trait: any, index: number) => (
              <div className={styles.traitContainer} key={index}>
              <p className={styles.traitName}>{trait.trait_type}</p>
              <p className={styles.traitValue}>
                {trait.value?.toString() || ""}
               </p>
              </div>
              ))}
            </div>

            <h3 className={styles.descriptionTitle}>Offers:</h3>

            <div className={styles.traitsContainer}>
              {offers?.map((offer) => (
                <div
                  key={offer.id}
                  className={styles.eventsContainer}
                >

                  <div className={styles.eventContainer}>
                    <p className={styles.traitName}>ID</p>
                    <p className={styles.traitValue}>
                      {offer.id}
                    </p>
                  </div>

                  <div className={styles.eventContainer}>
                    <p className={styles.traitName}>USDC</p>
                    <p className={styles.traitValue}>
                      {offer.currencyValue.displayValue}
                    </p>
                  </div>

                  <div className={styles.eventContainer}>
                    <p className={styles.traitName}>From</p>
                    <p className={styles.traitValue}>
                      {offer.offerorAddress?.slice(0, 4)}...
                      {offer.offerorAddress?.slice(-2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className={styles.descriptionTitle}>History:</h3>

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
                      href={`https://goerli.etherscan.io/tx/${event.transaction.transactionHash}`}
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

export const getStaticProps: GetStaticProps = async (context) => {
  const tokenId = context.params?.tokenId as string;

  const sdk = new ThirdwebSDK(Goerli);

  const contract = await sdk.getContract(ETHDrop);

  const nft = await contract.erc721.get(tokenId);

  let contractMetadata;

  try {
    contractMetadata = await contract.metadata.get();
  } catch (e) {}

  return {
    props: {
      nft,
      contractMetadata: contractMetadata || null,
    },
    revalidate: 1, // https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const sdk = new ThirdwebSDK(Goerli);

  const contract = await sdk.getContract(ETHDrop);

  const nfts = await contract.erc721.getAll();

  const paths = nfts.map((nft) => {
    return {
      params: {
        contractAddress: ETHDrop,
        tokenId: nft.metadata.id,
      },
    };
  });

  return {
    paths,
    fallback: "blocking", // can also be true or 'blocking'
  };
};
