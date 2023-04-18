import {
  useAddress, useMetamask
} from "@thirdweb-dev/react";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContextProvider';



function useIsScrollTop() {
  const [isTop, setIsTop] = useState(true);
  useEffect(() => {
    function onScroll() {
      setIsTop(window.scrollY <= 0);
    }
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return isTop;
}

const Header: React.FC = () => {
  const { menuOpen, setMenuOpen } = useUserContext();
  const isTop = useIsScrollTop();
  const connectWithMetamask = useMetamask();
  const address = useAddress();

  const shortAddress =
    address?.slice(0, 5);

  return (
    <header
      className={`header w-full sticky z-20 top-0 flex items-center justify-between   ${
        isTop ? 'border-none' : 'border-b border-gray-200 dark:border-gray-800'
      } `}
    >
      {/* Hamburger Menu */}
      <div className="menu">
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="space-y-1.5 block"
        >
          <img className="w-10 hover:brightness-200 hover:grayscale" src="/hotdog-truck.png" alt="Hotdog Truck"></img>
        </button>
      </div>
      <div className="menu">
        <Link href={'https://donsnft.com/home'}>
          <img className="w-10 hover:brightness-200 hover:grayscale" src="/donnie.png" alt="Super Donnie"></img>
        </Link>
      </div>
      <div className="menu">
        <Link href={'https://www.piratebroadcast.xyz/shows'}>
          <img className="w-10 hover:brightness-200 hover:grayscale" src="/SkullPhones.png" alt="Skull Phones"></img>
        </Link>
      </div>
      {/* Logo */}
      
      {/* Wallet Connect Button */}
      <div className="wallet">
        <button className="btn-wallet" onClick={() => connectWithMetamask()}>
          <div className="relative ">
          <img className="w-10 hover:brightness-200 hover:grayscale" src="/PCData.png" alt="Databanks"></img>

            {address ? (
              <span className="absolute bottom-1 translate-y-full  -right-2 sm:right-1/2 sm:translate-x-1/2  text-3xs p-1 leading-4 text-center">
                {shortAddress}
              </span>
            ) : (
              <span className="absolute  bottom-3 md:bottom-1 translate-y-full  right-1/2 translate-x-1/2  text-3xs p-1 leading-4 text-center">
                EVM
              </span>
            )}
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
