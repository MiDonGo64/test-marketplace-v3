// import { DevTip } from "../DevTip";
import {
  useAddress,
  useConnect, 
  useDisconnect,
  metamaskWallet
} from "@thirdweb-dev/react";
import { BsDiscord, BsTwitter } from 'react-icons/bs';
import siteData from '../../data/siteMetadata';
import Link from 'next/link';
import { alchemy } from "const/alchemy";
import { useEffect, useState } from 'react';
import { TUSDC_FOR_MUMBAI } from 'const/contractAddresses';
import { Utils } from 'alchemy-sdk';

const metamask = metamaskWallet();

const Footer: React.FC = () => {
  const [usdcBalance, setUsdcBalance] = useState("fetching...");
  const [balance, setBalance] = useState("fetching...");
  const ownerAddress = useAddress();
  const connect = useConnect();
  const disconnect = useDisconnect();
  const tokenContractAddresses = [TUSDC_FOR_MUMBAI];

  const shortWalletAddress =
    ownerAddress?.slice(0, 5) + '..' + ownerAddress?.slice(-4);
  

    useEffect(() => {
      (async function () {
        // Create alchemy instance for Eth Mainnet
        
  
        // Fetch balances for user
        const data = await alchemy.core.getTokenBalances(ownerAddress as string, tokenContractAddresses);
        console.log("Response Object for getTokenBalances\n", data)      
  
       

        // fetch token metadata for render
        const metadata = await alchemy.core.getTokenMetadata( 
          tokenContractAddresses[0]
      );

      //Forming the name of the token that comprises of the Name and the Symbol of the token
      const tokenName = metadata.name + "(" + metadata.symbol + ")";

      /* Calculating the tokenBalance in decimal. The "decimals" field in the token metadata on line 21 tells us 
      how many digits at the end of the tokenBalance in Line 17 are to the right of the decimal. 
      so we divide the Full tokenBalance with 10 to the power of the decimal value of the token
      */
      const usdcBalance = data.tokenBalances[0].tokenBalance as any/Math.pow(10, metadata.decimals)
      console.log("Token balance for", tokenName, "is", usdcBalance);
      setUsdcBalance((usdcBalance).toString());

      // Get balance and format in terms of ETH
      let balance = (await alchemy.core.getBalance(ownerAddress as string, 'latest')).toString();
      balance = Utils.formatEther(balance);
      console.log(`Balance of ${ownerAddress}: ${balance} ETH`);
      setBalance(balance)
      })();
    }, []);

  return (
    <footer className="footer">
      <div className="flex items-center justify-center gap-4 p-8 flex-wrap">
        {siteData.social.twitter && (
          <Link
            className="text-blue-600 hover:underline flex items-center gap-1 font-black text-sm md:text-base"
            href={siteData.social.twitter}
            target="_blank"
            rel="noreferrer"
          >
            <BsTwitter />
            Twitter
          </Link>
        )}
        {/* {siteData.social.instagram && (
          <a
            className="text-blue-600 hover:underline flex items-center gap-1 font-black text-sm md:text-base"
            href={siteData.social.instagram}
            target="_blank"
            rel="noreferrer"
          >
            <BsInstagram />
            Instagram
          </a>
        )} */}
        {siteData.social.discord && (
          <Link
            className="text-blue-600 hover:underline flex items-center gap-1 font-black text-sm md:text-base"
            href={siteData.social.discord}
            target="_blank"
            rel="noreferrer"
          >
            <BsDiscord />
            Discord
          </Link>
        )}
        {/* {siteData.social.facebook && (
          <a
            className="text-blue-600 hover:underline flex items-center gap-1 font-black text-sm md:text-base"
            href={siteData.social.facebook}
            target="_blank"
            rel="noreferrer"
          >
            <BsFacebook />
            Facebook
          </a>
        )} */}
      </div>
      <div className="flex  justify-between flex-wrap-reverse">
        <div className="flex flex-col justify-end items-end">
          {ownerAddress && (
            <>
            <p className="text-2xs text-pageBG">USDC: ◎ {usdcBalance}</p>
            <p className="text-2xs text-pageBG">Matic: ◎ {balance.slice(0,8)}</p>
            </>
          )}
          <div className="footer-button">
          <button className="btn-wallet" onClick={() => {
        if (ownerAddress) {
        disconnect()
        } else {
          connect(
            metamask,
            { chainId: 80001 },
          )}
      }}>
              <div className="relative ">
                {ownerAddress ? (
                  <span>
                    <span className="mr-3">
                      <span className="relative inline-flex rounded-full h-3 w-3 border border-inherit bg-green-500"></span>
                    </span>
                    <span className="break-all text-left">
                      {/* {walletAddress} */}
                      {shortWalletAddress}
                    </span>
                  </span>
                ) : (
                  <span>
                    <span className="mr-3">
                      <span className="relative inline-flex rounded-full h-3 w-3 border border-inherit bg-red-500"></span>
                    </span>
                    Connect Wallet
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;