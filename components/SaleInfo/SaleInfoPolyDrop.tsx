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
    PolyDrop, POLY_MARKETPLACE_ADDRESS, TUSDC_FOR_MUMBAI
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
  
  type TwoBatchFormData = {
    listings: [
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      }
    ],
  };
  
  type ThreeBatchFormData = {
    listings: [
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      }
    ],
  };
  
  type FourBatchFormData = {
    listings: [
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      }
    ],
  };
  
  type FiveBatchFormData = {
    listings: [
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      }
    ],
  };
  
  type SixBatchFormData = {
    listings: [
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      }
    ],
  };
  
  type SevenBatchFormData = {
    listings: [
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      }
    ],
  };
  
  type EightBatchFormData = {
    listings: [
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      }
    ],
  };
  
  type NineBatchFormData = {
    listings: [
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      }
    ],
  };
  
  type TenBatchFormData = {
    listings: [
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      },
      {
        nftContractAddress: string;
        tokenId: string;
        currencyContractAddress: string;
        price: string;
        startDate: Date;
        endDate: Date;
      }
    ],
  };
  
  export default function SaleInfo({ nft }: Props) {
    const router = useRouter();
    // Connect to marketplace contract
    const { contract: marketplace } = useContract(
      POLY_MARKETPLACE_ADDRESS,
      "marketplace-v3"
    );
  
    // useContract is a React hook that returns an object with the contract key.
    // The value of the contract key is an instance of an NFT_COLLECTION on the blockchain.
    // This instance is created from the contract address (NFT_COLLECTION_ADDRESS)
    const { contract: nftCollection } = useContract(PolyDrop);
  
    // Hook provides an async function to create a new auction listing
    const { mutateAsync: createAuctionListing } =
      useCreateAuctionListing(marketplace);
  
    // Hook provides an async function to create a new direct listing
    const { mutateAsync: createDirectListing } =
      useCreateDirectListing(marketplace);
  
    // Manage form submission state using tabs and conditional rendering
    const [tab, setTab] = useState<"direct" | "auction" | "Floor-crapper 420">("direct");
  
    // Manage form batch listing amount using tabs and conditional rendering
    const [dumpTab, setDumpTab] = useState<"2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20">("2");
  
    // Manage form values using react-hook-form library: Auction form
    const { register: registerAuction, handleSubmit: handleSubmitAuction } =
      useForm<AuctionFormData>({
        defaultValues: {
          nftContractAddress: PolyDrop,
          tokenId: nft.metadata.id,
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
        [nft.owner,
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
          nftContractAddress: PolyDrop,
          tokenId: nft.metadata.id,
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
  
      // Manage form values using react-hook-form library: Direct form for batch sell
      // Two listings
      const { register: registerBatch2, handleSubmit: handleSubmitBatch2 } =
      useForm<TwoBatchFormData>({
        defaultValues: {
          listings: [
            {
              nftContractAddress: PolyDrop,
              tokenId: "0",
              startDate: new Date(),
              endDate: new Date(),
              currencyContractAddress: TUSDC_FOR_MUMBAI,
              price: "0",
            },
            {
              nftContractAddress: PolyDrop,
              tokenId: "0",
              startDate: new Date(),
              endDate: new Date(),
              currencyContractAddress: TUSDC_FOR_MUMBAI,
              price: "0",
            }
          ]
        }
      });
  
      function createListingArray2(data: TwoBatchFormData) {
       let listings = [];
       let counterI= 0;
       for (var i in data.listings){
       console.log(
        data.listings[i].nftContractAddress,
        data.listings[i].tokenId,
        data.listings[i].currencyContractAddress,
        data.listings[i].price,
        data.listings[i].startDate,
        data.listings[i].endDate,
        );
        counterI+=1;
          const listing = {
            assetContractAddress: data.listings[i].nftContractAddress,
            tokenId: data.listings[i].tokenId,
            currencyContractAddress: data.listings[i].currencyContractAddress,
            pricePerToken: data.listings[i].price,
            startTimestamp: new Date(data.listings[i].startDate),
            endTimestamp: new Date(data.listings[i].endDate),
          };
          listings.push(listing);
        }
      
        return listings;
      }
      
  
    async function handleSubmissionBatch2(data: TwoBatchFormData) {
      const listings = createListingArray2(data)
      await checkAndProvideApproval();
      const txResult = await marketplace?.directListings.createListingsBatch(listings);
      console.log(listings)
    
      return txResult;
    }
  
    //Three Listings
    const { register: registerBatch3, handleSubmit: handleSubmitBatch3 } =
    useForm<ThreeBatchFormData>({
      defaultValues: {
        listings: [
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          }
        ]
      }
    });
  
    function createListingArray3(data: ThreeBatchFormData) {
     let listings = [];
     let counterI= 0;
     for (var i in data.listings){
     console.log(
      data.listings[i].nftContractAddress,
      data.listings[i].tokenId,
      data.listings[i].currencyContractAddress,
      data.listings[i].price,
      data.listings[i].startDate,
      data.listings[i].endDate,
      );
      counterI+=1;
        const listing = {
          assetContractAddress: data.listings[i].nftContractAddress,
          tokenId: data.listings[i].tokenId,
          currencyContractAddress: data.listings[i].currencyContractAddress,
          pricePerToken: data.listings[i].price,
          startTimestamp: new Date(data.listings[i].startDate),
          endTimestamp: new Date(data.listings[i].endDate),
        };
        listings.push(listing);
      }
    
      return listings;
    }
    
  
  
  async function handleSubmissionBatch3(data: ThreeBatchFormData) {
    const listings = createListingArray3(data)
    await checkAndProvideApproval();
    const txResult = await marketplace?.directListings.createListingsBatch(listings);
    console.log(listings)
  
    return txResult;
  }
  
    //Four Listings
    const { register: registerBatch4, handleSubmit: handleSubmitBatch4 } =
    useForm<FourBatchFormData>({
      defaultValues: {
        listings: [
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          }
        ]
      }
    });
  
    function createListingArray4(data: FourBatchFormData) {
     let listings = [];
     let counterI= 0;
     for (var i in data.listings){
     console.log(
      data.listings[i].nftContractAddress,
      data.listings[i].tokenId,
      data.listings[i].currencyContractAddress,
      data.listings[i].price,
      data.listings[i].startDate,
      data.listings[i].endDate,
      );
      counterI+=1;
        const listing = {
          assetContractAddress: data.listings[i].nftContractAddress,
          tokenId: data.listings[i].tokenId,
          currencyContractAddress: data.listings[i].currencyContractAddress,
          pricePerToken: data.listings[i].price,
          startTimestamp: new Date(data.listings[i].startDate),
          endTimestamp: new Date(data.listings[i].endDate),
        };
        listings.push(listing);
      }
    
      return listings;
    }
    
  
  
  async function handleSubmissionBatch4(data: FourBatchFormData) {
    const listings = createListingArray4(data)
    await checkAndProvideApproval();
    const txResult = await marketplace?.directListings.createListingsBatch(listings);
    console.log(listings)
  
    return txResult;
  }
  
    //Five Listings
    const { register: registerBatch5, handleSubmit: handleSubmitBatch5 } =
    useForm<FiveBatchFormData>({
      defaultValues: {
        listings: [
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          }
        ]
      }
    });
  
    function createListingArray5(data: FiveBatchFormData) {
     let listings = [];
     let counterI= 0;
     for (var i in data.listings){
     console.log(
      data.listings[i].nftContractAddress,
      data.listings[i].tokenId,
      data.listings[i].currencyContractAddress,
      data.listings[i].price,
      data.listings[i].startDate,
      data.listings[i].endDate,
      );
      counterI+=1;
        const listing = {
          assetContractAddress: data.listings[i].nftContractAddress,
          tokenId: data.listings[i].tokenId,
          currencyContractAddress: data.listings[i].currencyContractAddress,
          pricePerToken: data.listings[i].price,
          startTimestamp: new Date(data.listings[i].startDate),
          endTimestamp: new Date(data.listings[i].endDate),
        };
        listings.push(listing);
      }
    
      return listings;
    }
    
  
  
  async function handleSubmissionBatch5(data: FiveBatchFormData) {
    const listings = createListingArray5(data)
    await checkAndProvideApproval();
    const txResult = await marketplace?.directListings.createListingsBatch(listings);
    console.log(listings)
  
    return txResult;
  }
  
    //Six Listings
    const { register: registerBatch6, handleSubmit: handleSubmitBatch6 } =
    useForm<SixBatchFormData>({
      defaultValues: {
        listings: [
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          }
        ]
      }
    });
  
    function createListingArray6(data: SixBatchFormData) {
     let listings = [];
     let counterI= 0;
     for (var i in data.listings){
     console.log(
      data.listings[i].nftContractAddress,
      data.listings[i].tokenId,
      data.listings[i].currencyContractAddress,
      data.listings[i].price,
      data.listings[i].startDate,
      data.listings[i].endDate,
      );
      counterI+=1;
        const listing = {
          assetContractAddress: data.listings[i].nftContractAddress,
          tokenId: data.listings[i].tokenId,
          currencyContractAddress: data.listings[i].currencyContractAddress,
          pricePerToken: data.listings[i].price,
          startTimestamp: new Date(data.listings[i].startDate),
          endTimestamp: new Date(data.listings[i].endDate),
        };
        listings.push(listing);
      }
    
      return listings;
    }
    
  
  
  async function handleSubmissionBatch6(data: SixBatchFormData) {
    const listings = createListingArray6(data)
    await checkAndProvideApproval();
    const txResult = await marketplace?.directListings.createListingsBatch(listings);
    console.log(listings)
  
    return txResult;
  }
  
    //Seven Listings
    const { register: registerBatch7, handleSubmit: handleSubmitBatch7 } =
    useForm<SevenBatchFormData>({
      defaultValues: {
        listings: [
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          }
        ]
      }
    });
  
    function createListingArray7(data: SevenBatchFormData) {
     let listings = [];
     let counterI= 0;
     for (var i in data.listings){
     console.log(
      data.listings[i].nftContractAddress,
      data.listings[i].tokenId,
      data.listings[i].currencyContractAddress,
      data.listings[i].price,
      data.listings[i].startDate,
      data.listings[i].endDate,
      );
      counterI+=1;
        const listing = {
          assetContractAddress: data.listings[i].nftContractAddress,
          tokenId: data.listings[i].tokenId,
          currencyContractAddress: data.listings[i].currencyContractAddress,
          pricePerToken: data.listings[i].price,
          startTimestamp: new Date(data.listings[i].startDate),
          endTimestamp: new Date(data.listings[i].endDate),
        };
        listings.push(listing);
      }
    
      return listings;
    }
    
  
  
  async function handleSubmissionBatch7(data: SevenBatchFormData) {
    const listings = createListingArray7(data)
    await checkAndProvideApproval();
    const txResult = await marketplace?.directListings.createListingsBatch(listings);
    console.log(listings)
  
    return txResult;
  }
  
    //Eight Listings
    const { register: registerBatch8, handleSubmit: handleSubmitBatch8 } =
    useForm<EightBatchFormData>({
      defaultValues: {
        listings: [
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          }
        ]
      }
    });
  
    function createListingArray8(data: EightBatchFormData) {
     let listings = [];
     let counterI= 0;
     for (var i in data.listings){
     console.log(
      data.listings[i].nftContractAddress,
      data.listings[i].tokenId,
      data.listings[i].currencyContractAddress,
      data.listings[i].price,
      data.listings[i].startDate,
      data.listings[i].endDate,
      );
      counterI+=1;
        const listing = {
          assetContractAddress: data.listings[i].nftContractAddress,
          tokenId: data.listings[i].tokenId,
          currencyContractAddress: data.listings[i].currencyContractAddress,
          pricePerToken: data.listings[i].price,
          startTimestamp: new Date(data.listings[i].startDate),
          endTimestamp: new Date(data.listings[i].endDate),
        };
        listings.push(listing);
      }
    
      return listings;
    }
  
  
  async function handleSubmissionBatch8(data: EightBatchFormData) {
    const listings = createListingArray8(data)
    await checkAndProvideApproval();
    const txResult = await marketplace?.directListings.createListingsBatch(listings);
    console.log(listings)
  
    return txResult;
  }
  
    //Nine Listings
    const { register: registerBatch9, handleSubmit: handleSubmitBatch9 } =
    useForm<NineBatchFormData>({
      defaultValues: {
        listings: [
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          }
        ]
      }
    });
  
    function createListingArray9(data: NineBatchFormData) {
     let listings = [];
     let counterI= 0;
     for (var i in data.listings){
     console.log(
      data.listings[i].nftContractAddress,
      data.listings[i].tokenId,
      data.listings[i].currencyContractAddress,
      data.listings[i].price,
      data.listings[i].startDate,
      data.listings[i].endDate,
      );
      counterI+=1;
        const listing = {
          assetContractAddress: data.listings[i].nftContractAddress,
          tokenId: data.listings[i].tokenId,
          currencyContractAddress: data.listings[i].currencyContractAddress,
          pricePerToken: data.listings[i].price,
          startTimestamp: new Date(data.listings[i].startDate),
          endTimestamp: new Date(data.listings[i].endDate),
        };
        listings.push(listing);
      }
    
      return listings;
    }
  
  
  async function handleSubmissionBatch9(data: NineBatchFormData) {
    const listings = createListingArray9(data)
    await checkAndProvideApproval();
    const txResult = await marketplace?.directListings.createListingsBatch(listings);
    console.log(listings)
  
    return txResult;
  }
  
    //Ten Listings
    const { register: registerBatch10, handleSubmit: handleSubmitBatch10 } =
    useForm<TenBatchFormData>({
      defaultValues: {
        listings: [
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          },
          {
            nftContractAddress: PolyDrop,
            tokenId: "0",
            startDate: new Date(),
            endDate: new Date(),
            currencyContractAddress: TUSDC_FOR_MUMBAI,
            price: "0",
          }
        ]
      }
    });
  
    function createListingArray10(data: TenBatchFormData) {
     let listings = [];
     let counterI= 0;
     for (var i in data.listings){
     console.log(
      data.listings[i].nftContractAddress,
      data.listings[i].tokenId,
      data.listings[i].currencyContractAddress,
      data.listings[i].price,
      data.listings[i].startDate,
      data.listings[i].endDate,
      );
      counterI+=1;
        const listing = {
          assetContractAddress: data.listings[i].nftContractAddress,
          tokenId: data.listings[i].tokenId,
          currencyContractAddress: data.listings[i].currencyContractAddress,
          pricePerToken: data.listings[i].price,
          startTimestamp: new Date(data.listings[i].startDate),
          endTimestamp: new Date(data.listings[i].endDate),
        };
        listings.push(listing);
      }
    
      return listings;
    }
  
  
  async function handleSubmissionBatch10(data: TenBatchFormData) {
    const listings = createListingArray10(data)
    await checkAndProvideApproval();
    const txResult = await marketplace?.directListings.createListingsBatch(listings);
    console.log(listings)
  
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
                  `/PolyDrop/${PolyDrop}/${nft.metadata.id}`
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
                  `/PolyDrop/${PolyDrop}/${nft.metadata.id}`
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
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch2("listings.0.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch2("listings.0.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch2("listings.0.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch2("listings.0.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 2</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch2("listings.1.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch2("listings.1.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch2("listings.1.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch2("listings.1.price")}
            />
  
            <Web3Button
              contractAddress={POLY_MARKETPLACE_ADDRESS}
              action={async () => {
                await handleSubmitBatch2(handleSubmissionBatch2)();
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
                  `/PolyDrop/paperhands`
                );
              }}
            >
              list 2
            </Web3Button>
            </div>
          {/* Batch listing 3 */}
          <div
            className={`${
              dumpTab === "3"
                ? styles.activeTabContent
                : profileStyles.tabContent
            }`}
            style={{ flexDirection: "column" }}
          >
  
            <h5 className={styles.formSectionTitle}>listing 1</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch3("listings.0.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch3("listings.0.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch3("listings.0.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch3("listings.0.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 2</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch3("listings.1.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch3("listings.1.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch3("listings.1.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch3("listings.1.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 3</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch3("listings.2.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch3("listings.2.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch3("listings.2.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch3("listings.2.price")}
            />
  
            <Web3Button
              contractAddress={POLY_MARKETPLACE_ADDRESS}
              action={async () => {
                await handleSubmitBatch3(handleSubmissionBatch3)();
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
                  `/PolyDrop/paperhands`
                );
              }}
            >
              list 3
            </Web3Button>
            </div>
          {/* Batch listing 4 */}
          <div
            className={`${
              dumpTab === "4"
                ? styles.activeTabContent
                : profileStyles.tabContent
            }`}
            style={{ flexDirection: "column" }}
          >
  
            <h5 className={styles.formSectionTitle}>listing 1</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch4("listings.0.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch4("listings.0.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch4("listings.0.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch4("listings.0.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 2</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch4("listings.1.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch4("listings.1.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch4("listings.1.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch4("listings.1.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 3</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch4("listings.2.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch4("listings.2.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch4("listings.2.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch4("listings.2.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 4</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch4("listings.3.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch4("listings.3.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch4("listings.3.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch4("listings.3.price")}
            />
  
            <Web3Button
              contractAddress={POLY_MARKETPLACE_ADDRESS}
              action={async () => {
                await handleSubmitBatch4(handleSubmissionBatch4)();
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
                  `/PolyDrop/paperhands`
                );
              }}
            >
              list 4
            </Web3Button>
            </div>
  
          {/* Batch listing 5 */}
          <div
            className={`${
              dumpTab === "5"
                ? styles.activeTabContent
                : profileStyles.tabContent
            }`}
            style={{ flexDirection: "column" }}
          >
  
            <h5 className={styles.formSectionTitle}>listing 1</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch5("listings.0.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch5("listings.0.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch5("listings.0.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch5("listings.0.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 2</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch5("listings.1.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch5("listings.1.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch5("listings.1.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch5("listings.1.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 3</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch5("listings.2.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch5("listings.2.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch5("listings.2.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch5("listings.2.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 4</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch5("listings.3.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch5("listings.3.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch5("listings.3.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch5("listings.3.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 5</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch5("listings.4.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch5("listings.4.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch5("listings.4.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch5("listings.4.price")}
            />
  
            <Web3Button
              contractAddress={POLY_MARKETPLACE_ADDRESS}
              action={async () => {
                await handleSubmitBatch5(handleSubmissionBatch5)();
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
                  `/PolyDrop/paperhands`
                );
              }}
            >
              list 5
            </Web3Button>
            </div>
  
          {/* Batch listing 6 */}
          <div
            className={`${
              dumpTab === "6"
                ? styles.activeTabContent
                : profileStyles.tabContent
            }`}
            style={{ flexDirection: "column" }}
          >
  
            <h5 className={styles.formSectionTitle}>listing 1</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch6("listings.0.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch6("listings.0.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch6("listings.0.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch6("listings.0.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 2</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch6("listings.1.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch6("listings.1.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch6("listings.1.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch6("listings.1.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 3</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch6("listings.2.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch6("listings.2.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch6("listings.2.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch6("listings.2.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 4</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch6("listings.3.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch6("listings.3.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch6("listings.3.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch6("listings.3.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 5</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch6("listings.4.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch6("listings.4.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch6("listings.4.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch6("listings.4.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 6</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch6("listings.5.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch6("listings.5.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch6("listings.5.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch6("listings.5.price")}
            />
  
            <Web3Button
              contractAddress={POLY_MARKETPLACE_ADDRESS}
              action={async () => {
                await handleSubmitBatch6(handleSubmissionBatch6)();
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
                  `/PolyDrop/paperhands`
                );
              }}
            >
              list 6
            </Web3Button>
            </div>
  
          {/* Batch listing 7 */}
          <div
            className={`${
              dumpTab === "7"
                ? styles.activeTabContent
                : profileStyles.tabContent
            }`}
            style={{ flexDirection: "column" }}
          >
  
            <h5 className={styles.formSectionTitle}>listing 1</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch7("listings.0.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch7("listings.0.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch7("listings.0.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch7("listings.0.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 2</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch7("listings.1.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch7("listings.1.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch7("listings.1.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch7("listings.1.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 3</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch7("listings.2.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch7("listings.2.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch7("listings.2.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch7("listings.2.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 4</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch7("listings.3.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch7("listings.3.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch7("listings.3.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch7("listings.3.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 5</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch7("listings.4.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch7("listings.4.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch7("listings.4.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch7("listings.4.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 6</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch7("listings.5.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch7("listings.5.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch7("listings.5.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch7("listings.5.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 7</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch7("listings.6.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch7("listings.6.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch7("listings.6.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch7("listings.6.price")}
            />
  
            <Web3Button
              contractAddress={POLY_MARKETPLACE_ADDRESS}
              action={async () => {
                await handleSubmitBatch7(handleSubmissionBatch7)();
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
                  `/PolyDrop/paperhands`
                );
              }}
            >
              list 7
            </Web3Button>
            </div>
  
          {/* Batch listing 8 */}
          <div
            className={`${
              dumpTab === "8"
                ? styles.activeTabContent
                : profileStyles.tabContent
            }`}
            style={{ flexDirection: "column" }}
          >
  
            <h5 className={styles.formSectionTitle}>listing 1</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch8("listings.0.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch8("listings.0.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch8("listings.0.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch8("listings.0.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 2</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch8("listings.1.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch8("listings.1.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch8("listings.1.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch8("listings.1.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 3</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch8("listings.2.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch8("listings.2.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch8("listings.2.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch8("listings.2.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 4</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch8("listings.3.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch8("listings.3.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch8("listings.3.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch8("listings.3.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 5</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch8("listings.4.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch8("listings.4.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch8("listings.4.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch8("listings.4.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 6</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch8("listings.5.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch8("listings.5.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch8("listings.5.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch8("listings.5.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 7</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch8("listings.6.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch8("listings.6.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch8("listings.6.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch8("listings.6.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 8</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch8("listings.7.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch8("listings.7.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch8("listings.7.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch8("listings.7.price")}
            />
  
            <Web3Button
              contractAddress={POLY_MARKETPLACE_ADDRESS}
              action={async () => {
                await handleSubmitBatch8(handleSubmissionBatch8)();
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
                  `/PolyDrop/paperhands`
                );
              }}
            >
              list 8
            </Web3Button>
            </div>
  
          {/* Batch listing 9 */}
          <div
            className={`${
              dumpTab === "9"
                ? styles.activeTabContent
                : profileStyles.tabContent
            }`}
            style={{ flexDirection: "column" }}
          >
  
            <h5 className={styles.formSectionTitle}>listing 1</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch9("listings.0.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch9("listings.0.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch9("listings.0.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch9("listings.0.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 2</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch9("listings.1.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch9("listings.1.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch9("listings.1.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch9("listings.1.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 3</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch9("listings.2.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch9("listings.2.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch9("listings.2.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch9("listings.2.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 4</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch9("listings.3.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch9("listings.3.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch9("listings.3.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch9("listings.3.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 5</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch9("listings.4.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch9("listings.4.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch9("listings.4.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch9("listings.4.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 6</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch9("listings.5.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch9("listings.5.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch9("listings.5.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch9("listings.5.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 7</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch9("listings.6.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch9("listings.6.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch9("listings.6.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch9("listings.6.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 8</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch9("listings.7.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch9("listings.7.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch9("listings.7.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch9("listings.7.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 9</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch9("listings.8.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch9("listings.8.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch9("listings.8.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch9("listings.8.price")}
            />
  
            <Web3Button
              contractAddress={POLY_MARKETPLACE_ADDRESS}
              action={async () => {
                await handleSubmitBatch9(handleSubmissionBatch9)();
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
                  `/PolyDrop/paperhands`
                );
              }}
            >
              list 9
            </Web3Button>
            </div>
  
          {/* Batch listing 10 */}
          <div
            className={`${
              dumpTab === "10"
                ? styles.activeTabContent
                : profileStyles.tabContent
            }`}
            style={{ flexDirection: "column" }}
          >
  
            <h5 className={styles.formSectionTitle}>listing 1</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch10("listings.0.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch10("listings.0.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch10("listings.0.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch10("listings.0.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 2</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch10("listings.1.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch10("listings.1.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch10("listings.1.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch10("listings.1.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 3</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch10("listings.2.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch10("listings.2.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch10("listings.2.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch10("listings.2.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 4</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch10("listings.3.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch10("listings.3.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch10("listings.3.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch10("listings.3.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 5</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch10("listings.4.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch10("listings.4.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch10("listings.4.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch10("listings.4.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 6</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch10("listings.5.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch10("listings.5.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch10("listings.5.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch10("listings.5.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 7</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch10("listings.6.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch10("listings.6.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch10("listings.6.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch10("listings.6.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 8</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch10("listings.7.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch10("listings.7.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch10("listings.7.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch10("listings.7.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 9</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch10("listings.8.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch10("listings.8.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch10("listings.8.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch10("listings.8.price")}
            />
  
  <h5 className={styles.formSectionTitle}>listing 10</h5>
            {/* Input field for token Id to sell */}
            <legend className={styles.legend}> Token ID </legend>
            <input
              className={styles.input}
              type="number"
              step={1.000000}
              {...registerBatch10("listings.9.tokenId")}
            />
            <h4 className={styles.formSectionTitle}>When </h4>
  
            {/* Input field for auction start date */}
            <legend className={styles.legend}> Listing Starts on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch10("listings.9.startDate")}
              aria-label="Auction Start Date"
            />
  
            {/* Input field for auction end date */}
            <legend className={styles.legend}> Listing Ends on </legend>
            <input
              className={styles.input}
              type="datetime-local"
              {...registerBatch10("listings.9.endDate")}
              aria-label="Auction End Date"
            />
            <h4 className={styles.formSectionTitle}>Price </h4>
  
            {/* Input field for buyout price */}
            <legend className={styles.legend}> Price per token</legend>
            <input
              className={styles.input}
              type="number"
              step={0.000001}
              {...registerBatch10("listings.9.price")}
            />
  
            <Web3Button
              contractAddress={POLY_MARKETPLACE_ADDRESS}
              action={async () => {
                await handleSubmitBatch10(handleSubmissionBatch10)();
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
                  `/PolyDrop/paperhands`
                );
              }}
            >
              list 10
            </Web3Button>
            </div>
          </div>
        </div>
      </>
    );
  }
  