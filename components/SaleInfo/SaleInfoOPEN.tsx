import {
    useContract,
    useCreateAuctionListing,
    useCreateDirectListing,
    Web3Button,
    useAddress
  } from "@thirdweb-dev/react";
  import { Nft } from "alchemy-sdk";
  import Link from "next/link";
  import { useRouter } from "next/router";
  import { useState } from "react";
  import { useForm } from "react-hook-form";
  import toast, { Toaster } from "react-hot-toast";
  import profileStyles from "../../styles/Profile.module.css";
  import styles from "../../styles/Sale.module.css";
  import {
    POLY_MARKETPLACE_ADDRESS,
    TUSDC_FOR_MUMBAI
  } from "../../const/contractAddresses";
  import toastStyle from "../../utils/toastConfig";
  
  type Props = {
    nft: Nft;
  };
  
  type AuctionFormData = {
    nftContractAddress: string;
    tokenId: string;
    currencyContractAddress: string;
    startDate: Date;
    endDate: Date;
    floorPrice: string;
    buyoutPrice: string;
  };
  
  type DirectFormData = {
    nftContractAddress: string;
    tokenId: string;
    currencyContractAddress: string;
    price: string;
    startDate: Date;
    endDate: Date;
  };
  
  export default function SaleInfo({ nft }: Props) {
    const router = useRouter();
    const owner = useAddress();
    // Connect to marketplace contract
    const { contract: marketplace } = useContract(
      POLY_MARKETPLACE_ADDRESS,
      "marketplace-v3"
    );
  
    // useContract is a React hook that returns an object with the contract key.
    // The value of the contract key is an instance of an NFT_COLLECTION on the blockchain.
    // This instance is created from the contract address (NFT_COLLECTION_ADDRESS)
    const collectionAddress = nft?.contract;
    const { contract: nftCollection } = useContract(collectionAddress.address);
  
    // Hook provides an async function to create a new auction listing
    const { mutateAsync: createAuctionListing } =
      useCreateAuctionListing(marketplace);
  
    // Hook provides an async function to create a new direct listing
    const { mutateAsync: createDirectListing } =
      useCreateDirectListing(marketplace);
  
    // Manage form submission state using tabs and conditional rendering
    const [tab, setTab] = useState<"direct" | "auction">("direct");
  
    // Manage form values using react-hook-form library: Auction form
    const { register: registerAuction, handleSubmit: handleSubmitAuction } =
      useForm<AuctionFormData>({
        defaultValues: {
          nftContractAddress: collectionAddress.address,
          tokenId: nft.tokenId,
          startDate: new Date(),
          endDate: new Date(),
          currencyContractAddress: TUSDC_FOR_MUMBAI,
          floorPrice: "0",
          buyoutPrice: "0",
        },
      });
  
    // User requires to set marketplace approval before listing
    async function checkAndProvideApproval() {
      // Check if approval is required
      const hasApproval = await nftCollection?.call(
        "isApprovedForAll",
        [owner,
        POLY_MARKETPLACE_ADDRESS]
      );
  
      // If it is, provide approval
      if (!hasApproval) {
        const txResult = await nftCollection?.call(
          "setApprovalForAll",
         [ POLY_MARKETPLACE_ADDRESS,
          true]
        );
  
        if (txResult) {
          toast.success("Marketplace approval granted", {
            icon: "👍",
            style: toastStyle,
            position: "bottom-center",
          });
        }
      }
  
      return true;
    }
  
    // Manage form values using react-hook-form library: Direct form
    const { register: registerDirect, handleSubmit: handleSubmitDirect } =
      useForm<DirectFormData>({
        defaultValues: {
          nftContractAddress: collectionAddress.address,
          tokenId: nft.tokenId,
          startDate: new Date(),
          endDate: new Date(),
          currencyContractAddress: TUSDC_FOR_MUMBAI,
          price: "0",
        },
      });
  
    async function handleSubmissionAuction(data: AuctionFormData) {
      await checkAndProvideApproval();
      const txResult = await createAuctionListing({
        assetContractAddress: data.nftContractAddress,
        tokenId: data.tokenId,
        currencyContractAddress: data.currencyContractAddress,
        buyoutBidAmount: data.buyoutPrice,
        minimumBidAmount: data.floorPrice,
        startTimestamp: new Date(data.startDate),
        endTimestamp: new Date(data.endDate),
      });
  
      return txResult;
    }
  
    async function handleSubmissionDirect(data: DirectFormData) {
      await checkAndProvideApproval();
      const txResult = await createDirectListing({
        assetContractAddress: data.nftContractAddress,
        tokenId: data.tokenId,
        currencyContractAddress: data.currencyContractAddress,
        pricePerToken: data.price,
        startTimestamp: new Date(data.startDate),
        endTimestamp: new Date(data.endDate),
      });
  
      return txResult;
    }
  
    return (
      <>
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className={styles.saleInfoContainer} style={{ marginTop: -42 }}>
          <div className={profileStyles.tabs}>
            <h3
              className={`${profileStyles.tab} 
          ${tab === "direct" ? profileStyles.activeTab : ""}`}
              onClick={() => setTab("direct")}
            >
              Direct
            </h3>
            <h3
              className={`${profileStyles.tab} 
          ${tab === "auction" ? profileStyles.activeTab : ""}`}
              onClick={() => setTab("auction")}
            >
              Auction
            </h3>
          </div>
  
          {/* Direct listing fields */}
          <div
            className={`${
              tab === "direct"
                ? styles.activeTabContent
                : profileStyles.tabContent
            }`}
            style={{ flexDirection: "column" }}
          >
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerDirect("startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerDirect("endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerDirect("price")}
            />
  
            <Web3Button
              contractAddress={POLY_MARKETPLACE_ADDRESS}
              action={async () => {
                await handleSubmitDirect(handleSubmissionDirect)();
              }}
              onError={(error) => {
                toast(`Listed Failed! Reason: ${error.cause}`, {
                  icon: "❌",
                  style: toastStyle,
                  position: "bottom-center",
                });
              }}
              onSuccess={(txResult) => {
                toast("Listed Successfully!", {
                  icon: "🥳",
                  style: toastStyle,
                  position: "bottom-center",
                });
                router.push(
                  `/polyway`
                );
              }}
            >
              Create Direct Listing
            </Web3Button>
          </div>
  
          {/* Auction listing fields */}
          <div
            className={`${
              tab === "auction"
                ? styles.activeTabContent
                : profileStyles.tabContent
            }`}
            style={{ flexDirection: "column" }}
          >
            <h5 className={styles.formSectionTitle}>Be sure to check <Link href="/" className={styles.link} >
                grift bag
              </Link> after the auction ends to collect your earnings.</h5>
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Auction Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerAuction("startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Auction Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerAuction("endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for minimum bid price */}
            <legend className={styles.legend}> Allow bids starting from </legend>
            <input
              className={styles.input}
              step={0.000001}
              type="number"
              {...registerAuction("floorPrice")}
            />
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Buyout price </legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerAuction("buyoutPrice")}
            />
  
            <Web3Button
              contractAddress={POLY_MARKETPLACE_ADDRESS}
              action={async () => {
                return await handleSubmitAuction(handleSubmissionAuction)();
              }}
              onError={(error) => {
                toast(`Listed Failed! Reason: ${error.cause}`, {
                  icon: "❌",
                  style: toastStyle,
                  position: "bottom-center",
                });
              }}
              onSuccess={(txResult) => {
                toast("Listed Successfully!", {
                  icon: "🥳",
                  style: toastStyle,
                  position: "bottom-center",
                });
                router.push(
                  `/ethavegrifters`
                );
              }}
            >
              Create Auction Listing
            </Web3Button>
          </div>
        </div>
      </>
    );
  }
  