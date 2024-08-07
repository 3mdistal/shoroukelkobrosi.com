import Link from "next/link";
import styles from "./menu.module.css";

interface MenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const Menu = ({ isOpen, toggleMenu }: MenuProps) => {
  return (
    <>
      <button onClick={toggleMenu} className={styles.menuButton}>
        {isOpen ? "Close" : "Menu"}
      </button>
      {isOpen && (
        <div className={styles.fullPageMenu}>
          <nav>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/films">Films</Link>
              </li>
              <li>
                <Link href="/stills">Stills</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Menu;
