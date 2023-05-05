import {
  useContract,
  useCreateAuctionListing,
  useCreateDirectListing,
  Web3Button
} from "@thirdweb-dev/react";
import { NFT as NFTType } from "@thirdweb-dev/sdk";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import profileStyles from "../../styles/Profile.module.css";
import styles from "../../styles/Sale.module.css";
import {
  ETHDrop,
  ETH_MARKETPLACE_ADDRESS
} from "../../const/contractAddresses";
import toastStyle from "../../utils/toastConfig";

type Props = {
  nft: NFTType;
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
  // Connect to marketplace contract
  const { contract: marketplace } = useContract(
    ETH_MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  // useContract is a React hook that returns an object with the contract key.
  // The value of the contract key is an instance of an NFT_COLLECTION on the blockchain.
  // This instance is created from the contract address (NFT_COLLECTION_ADDRESS)
  const { contract: nftCollection } = useContract(ETHDrop);

  // Hook provides an async function to create a new auction listing
  const { mutateAsync: createAuctionListing } =
    useCreateAuctionListing(marketplace);

  // Hook provides an async function to create a new direct listing
  const { mutateAsync: createDirectListing } =
    useCreateDirectListing(marketplace);

  // Manage form submission state using tabs and conditional rendering
  const [tab, setTab] = useState<"direct" | "auction" | "Floor-crapper 420">("direct");

  // Manage form batch listing amount using tabs and conditional rendering
  const [dumpTab, setDumpTab] = useState<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20">("1");

  // Manage form values using react-hook-form library: Auction form
  const { register: registerAuction, handleSubmit: handleSubmitAuction } =
    useForm<AuctionFormData>({
      defaultValues: {
        nftContractAddress: ETHDrop,
        tokenId: nft.metadata.id,
        startDate: new Date(),
        endDate: new Date(),
        currencyContractAddress: "0x72F60F2F9695C5911bA57ee43339AD82ce8ABB6A",
        floorPrice: "0",
        buyoutPrice: "0",
      },
    });

  // User requires to set marketplace approval before listing
  async function checkAndProvideApproval() {
    // Check if approval is required
    const hasApproval = await nftCollection?.call(
      "isApprovedForAll",
      [nft.owner,
      ETH_MARKETPLACE_ADDRESS]
    );

    // If it is, provide approval
    if (!hasApproval) {
      const txResult = await nftCollection?.call(
        "setApprovalForAll",
       [ ETH_MARKETPLACE_ADDRESS,
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
        nftContractAddress: ETHDrop,
        tokenId: nft.metadata.id,
        startDate: new Date(),
        endDate: new Date(),
        currencyContractAddress: "0x72F60F2F9695C5911bA57ee43339AD82ce8ABB6A",
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

    // Manage form values using react-hook-form library: Direct form
    const { register: registerBatch2, handleSubmit: handleSubmitBatch2 } =
    useForm<DirectFormData>({
      defaultValues: {
        nftContractAddress: ETHDrop,
        tokenId: nft.metadata.id,
        startDate: new Date(),
        endDate: new Date(),
        currencyContractAddress: "0x72F60F2F9695C5911bA57ee43339AD82ce8ABB6A",
        price: "0",
      },
    });

  function createListingArray(data: DirectFormData, count: number) {
    const listings = [];
  
    for (let i = 0; i < count; i++) {
      const listing = {
        assetContractAddress: data.nftContractAddress,
        tokenId: data.tokenId,
        currencyContractAddress: data.currencyContractAddress,
        pricePerToken: data.price,
        startTimestamp: new Date(data.startDate),
        endTimestamp: new Date(data.endDate),
      };
      listings.push(listing);
    }
  
    return listings;
  }

  async function handleSubmissionBatch(data: DirectFormData, count: number) {
    const listings = createListingArray(data, count);
    await checkAndProvideApproval();
    const txResult = await marketplace?.directListings.createListingsBatch(listings);
  
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
          <h3
            className={`${profileStyles.tab} 
        ${tab === "Floor-crapper 420" ? profileStyles.activeTab : ""}`}
            onClick={() => setTab("Floor-crapper 420")}
          >
            Floor-crapper 420
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
            contractAddress={ETH_MARKETPLACE_ADDRESS}
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
                `/ethdrop/${ETHDrop}/${nft.metadata.id}`
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
            contractAddress={ETH_MARKETPLACE_ADDRESS}
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
                `/ethdrop/${ETHDrop}/${nft.metadata.id}`
              );
            }}
          >
            Create Auction Listing
          </Web3Button>
        </div>

                {/* Batch direct listing fields */}
                <div
          className={`${
            tab === "Floor-crapper 420"
              ? styles.activeTabContent
              : profileStyles.tabContent
          }`}
          style={{ flexDirection: "column" }}
        >
          <h5 className={styles.formSectionTitle2}>How many to sell?</h5>
          <div className={profileStyles.tabs2}>
          <h3
            className={`${profileStyles.tab2} 
        ${dumpTab === "2" ? profileStyles.activeTab : ""}`}
            onClick={() => setDumpTab("2")}
          >
            2
          </h3>
          <h3
            className={`${profileStyles.tab2} 
        ${dumpTab === "3" ? profileStyles.activeTab : ""}`}
            onClick={() => setDumpTab("3")}
          >
            3
          </h3>
          <h3
            className={`${profileStyles.tab2} 
        ${dumpTab === "4" ? profileStyles.activeTab : ""}`}
            onClick={() => setDumpTab("4")}
          >
            4
          </h3>
          <h3
            className={`${profileStyles.tab2} 
        ${dumpTab === "5" ? profileStyles.activeTab : ""}`}
            onClick={() => setDumpTab("5")}
          >
            5
          </h3>
          <h3
            className={`${profileStyles.tab2} 
        ${dumpTab === "6" ? profileStyles.activeTab : ""}`}
            onClick={() => setDumpTab("6")}
          >
            6
          </h3>
          <h3
            className={`${profileStyles.tab2} 
        ${dumpTab === "7" ? profileStyles.activeTab : ""}`}
            onClick={() => setDumpTab("7")}
          >
            7
          </h3>
          <h3
            className={`${profileStyles.tab2} 
        ${dumpTab === "8" ? profileStyles.activeTab : ""}`}
            onClick={() => setDumpTab("8")}
          >
            8
          </h3>
          <h3
            className={`${profileStyles.tab2} 
        ${dumpTab === "9" ? profileStyles.activeTab : ""}`}
            onClick={() => setDumpTab("9")}
          >
            9
          </h3>
          <h3
            className={`${profileStyles.tab2} 
        ${dumpTab === "10" ? profileStyles.activeTab : ""}`}
            onClick={() => setDumpTab("10")}
          >
            10
          </h3>
          <h3
            className={`${profileStyles.tab2} 
        ${dumpTab === "11" ? profileStyles.activeTab : ""}`}
            onClick={() => setDumpTab("11")}
          >
            11
          </h3>
          <h3
            className={`${profileStyles.tab2} 
        ${dumpTab === "12" ? profileStyles.activeTab : ""}`}
            onClick={() => setDumpTab("12")}
          >
            12
          </h3>
          <h3
            className={`${profileStyles.tab2} 
        ${dumpTab === "13" ? profileStyles.activeTab : ""}`}
            onClick={() => setDumpTab("13")}
          >
            13
          </h3>
          <h3
            className={`${profileStyles.tab2} 
        ${dumpTab === "14" ? profileStyles.activeTab : ""}`}
            onClick={() => setDumpTab("14")}
          >
            14
          </h3>
          <h3
            className={`${profileStyles.tab2} 
        ${dumpTab === "15" ? profileStyles.activeTab : ""}`}
            onClick={() => setDumpTab("15")}
          >
            15
          </h3>
          <h3
            className={`${profileStyles.tab2} 
        ${dumpTab === "16" ? profileStyles.activeTab : ""}`}
            onClick={() => setDumpTab("16")}
          >
            16
          </h3>
          <h3
            className={`${profileStyles.tab2} 
        ${dumpTab === "17" ? profileStyles.activeTab : ""}`}
            onClick={() => setDumpTab("17")}
          >
            17
          </h3>
          <h3
            className={`${profileStyles.tab2} 
        ${dumpTab === "18" ? profileStyles.activeTab : ""}`}
            onClick={() => setDumpTab("18")}
          >
            18
          </h3>
          <h3
            className={`${profileStyles.tab2} 
        ${dumpTab === "19" ? profileStyles.activeTab : ""}`}
            onClick={() => setDumpTab("19")}
          >
            19
          </h3>
          <h3
            className={`${profileStyles.tab2} 
        ${dumpTab === "20" ? profileStyles.activeTab : ""}`}
            onClick={() => setDumpTab("20")}
          >
            20
          </h3>
        </div>
        {/* Batch listing 2 */}
        <div
          className={`${
            dumpTab === "2"
              ? styles.activeTabContent
              : profileStyles.tabContent
          }`}
          style={{ flexDirection: "column" }}
        >

          <h5 className={styles.formSectionTitle}>listing 1</h5>
          <h4 className={styles.formSectionTitle}>When </h4>

          {/* Input field for auction start date */}
          <legend className={styles.legend}> Listing Starts on </legend>
          <input
            className={styles.input}
            type="datetime-local"
            {...registerBatch2("startDate")}
            aria-label="Auction Start Date"
          />

          {/* Input field for auction end date */}
          <legend className={styles.legend}> Listing Ends on </legend>
          <input
            className={styles.input}
            type="datetime-local"
            {...registerBatch2("endDate")}
            aria-label="Auction End Date"
          />
          <h4 className={styles.formSectionTitle}>Price </h4>

          {/* Input field for buyout price */}
          <legend className={styles.legend}> Price per token</legend>
          <input
            className={styles.input}
            type="number"
            step={0.000001}
            {...registerBatch2("price")}
          />

<h5 className={styles.formSectionTitle}>listing 2</h5>
          <h4 className={styles.formSectionTitle}>When </h4>

          {/* Input field for auction start date */}
          <legend className={styles.legend}> Listing Starts on </legend>
          <input
            className={styles.input}
            type="datetime-local"
            {...registerBatch2("startDate")}
            aria-label="Auction Start Date"
          />

          {/* Input field for auction end date */}
          <legend className={styles.legend}> Listing Ends on </legend>
          <input
            className={styles.input}
            type="datetime-local"
            {...registerBatch2("endDate")}
            aria-label="Auction End Date"
          />
          <h4 className={styles.formSectionTitle}>Price </h4>

          {/* Input field for buyout price */}
          <legend className={styles.legend}> Price per token</legend>
          <input
            className={styles.input}
            type="number"
            step={0.000001}
            {...registerBatch2("price")}
          />

          <Web3Button
            contractAddress={ETH_MARKETPLACE_ADDRESS}
            action={async () => {
              await handleSubmitBatch2(handleSubmissionDirect)();
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
                `/ethdrop/`
              );
            }}
          >
            list 2
          </Web3Button>
          </div>
        </div>
      </div>
    </>
  );
}
