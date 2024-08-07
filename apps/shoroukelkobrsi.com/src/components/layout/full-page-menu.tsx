import { Link } from "next-view-transitions";
import styles from "./full-page-menu.module.css";

export default function FullPageMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}): React.ReactElement {
  if (!isOpen) return null;

  return (
    <div className={styles.fullPageMenu}>
      <button className={styles.closeButton} onClick={onClose}>
        Close
      </button>
      <nav className={styles.menuNav}>
        <Link href="/" onClick={onClose}>
          Home
        </Link>
        <Link href="/stills" onClick={onClose}>
          Stills
        </Link>
        <Link href="/films" onClick={onClose}>
          Films
        </Link>
        <Link href="/about" onClick={onClose}>
          About
        </Link>
        <Link href="/contact" onClick={onClose}>
          Contact
        </Link>
      </nav>
    </div>
  );
}
