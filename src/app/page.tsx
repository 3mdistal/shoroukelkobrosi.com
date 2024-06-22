import styles from "./page.module.css";
import { Square } from "./square";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1>Hello, world.</h1>
        <p>
          Alice is officially learning Next.js. <i>Sigh.</i>
        </p>
        <Grid />
        <Grid />
        <Grid />
        <Grid />
        <Grid />
        <Grid />
        <Grid />
        <Grid />
        <Grid />
        <Grid />
        <Grid />
        <Grid />
        <Grid />
      </div>
    </main>
  );
}

const Grid = () => {
  return (
    <div className={styles.grid}>
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
    </div>
  );
};
