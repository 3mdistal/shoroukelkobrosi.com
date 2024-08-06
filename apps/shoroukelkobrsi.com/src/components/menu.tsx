import Link from "next/link";
import styles from "./menu.module.css";

export default function Menu(): React.ReactElement {
  return (
    <header className={styles.menu}>
      <div className={styles.menuLogo}>Logo</div>
      <nav className={styles.menuNav}>
        <Link href="/">Home</Link>
        <Link href="/stills">Stills</Link>
        <button type="button" className={styles.menuButton}>
          Menu
        </button>
      </nav>
    </header>
  );
}
