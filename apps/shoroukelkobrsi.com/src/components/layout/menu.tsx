import Link from "next/link";
import styles from "./menu.module.css";

export default function Menu(): React.ReactElement {
  return (
    <header className={styles.menu}>
      <Link href="/" className={styles.menuLogo}>
        <div>Logo</div>
      </Link>
      <nav className={styles.menuNav}>
        <Link href="/stills">Stills</Link>
        <button type="button" className={styles.menuButton}>
          Menu
        </button>
      </nav>
    </header>
  );
}
