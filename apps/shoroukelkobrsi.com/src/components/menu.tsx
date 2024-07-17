import styles from "./menu.module.css";

export default function Menu(): React.ReactElement {
  return (
    <header className={styles.menu}>
      <div className={styles["menu-children"]}>Logo</div>
      <div className={`${styles["menu-children"]} ${styles["menu-title"]}`}>
        The cinema of Shorouk Elkorsi.
      </div>
      <div className={styles["menu-children"]}>Menu</div>
    </header>
  );
}
