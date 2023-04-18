// import { DevTip } from "../DevTip";
import { ConnectWallet } from '@thirdweb-dev/react';
import { BsDiscord, BsTwitter } from 'react-icons/bs';
import siteData from '../../data/siteMetadata';
import Link from 'next/link';


const Footer: React.FC = () => {

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
        <div className="flex flex-col justify-end">
          {/* <DevTip /> */}
          <ConnectWallet />
        </div>
      </div>
    </footer>
  );
};

export default Footer;