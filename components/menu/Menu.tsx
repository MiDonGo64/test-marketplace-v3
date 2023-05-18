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
                <Link href="/polyway" className="menu-bar-link" onClick={menuToggle}>
                    Polygon Way
                </Link>
              </li>
              <li>
                <Link href="/polywaygrifters" className="menu-bar-link" onClick={menuToggle}>
                    Polygon Way Grifters
                </Link>
              </li>
              <li>
                <Link href="/BigBag" className="menu-bar-link" onClick={menuToggle}>
                    Polygon Bags
                </Link>
              </li>
              <li>
                <Link href="/griftbox3/listingbox" className="menu-bar-link" onClick={menuToggle}>
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
