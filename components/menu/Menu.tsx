import Link from 'next/link';
import { useUserContext } from '../../context/UserContextProvider';
// import { isBrowser } from "../../utils/utils";

// To Do
// Add ESC key to close

export default function Menu() {
  const { menuOpen, setMenuOpen } = useUserContext();

  const menuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      className={menuOpen ? 'menu-wrapper' : 'menu-wrapper--hidden'}
      onClick={menuToggle}
    >
      <div className="menu-bar">
        <div className="menu-bar-content">
          <div className="flex justify-end">
            <button className="menu-bar-close" onClick={menuToggle}>
              &#xd7;
            </button>
          </div>
          <nav className="menu-bar-links">
            <ul>
              <li>
                <Link href="/" className="menu-bar-link" onClick={menuToggle}>
                    Solana
                </Link>
              </li>
              <li>
                <Link href="/ETH" className="menu-bar-link" onClick={menuToggle}>
                    Ethereum
                </Link>
              </li>
              <li>
                <Link href="/POLY" className="menu-bar-link" onClick={menuToggle}>
                    Polygon
                </Link>
              </li>
              <li>
                <Link href="/ethave" className="menu-bar-link" onClick={menuToggle}>
                    Ethereum Avenue
                </Link>
              </li>
              <li>
                <Link href="/ethavegrifters" className="menu-bar-link" onClick={menuToggle}>
                    Eth Ave Grifters
                </Link>
              </li>
              <li>
                <Link href="/polygonbags" className="menu-bar-link" onClick={menuToggle}>
                    Ethereum Bags
                </Link>
              </li>
              <li>
                <Link href="/ethavegrifters" className="menu-bar-link" onClick={menuToggle}>
                    My Grift Box
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
