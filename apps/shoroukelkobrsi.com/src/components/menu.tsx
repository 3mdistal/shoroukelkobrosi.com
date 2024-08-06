import Link from "next/link";
import styles from "./menu.module.css";

export default function Menu(): React.ReactElement {
  return (
    <header className={styles.menu}>
      <div className={styles["menu-logo"]}>Logo</div>
      <nav className={styles["menu-nav"]}>
        <Link href="/">Home</Link>
        <Link href="/stills">Stills</Link>
        <button className={styles["menu-button"]}>Menu</button>
      </nav>
    </header>
  );
}
