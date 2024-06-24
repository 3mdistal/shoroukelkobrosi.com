import styles from "./page.module.css";
import { Square } from "./square";

export default function Home() {
  const grids = Array.from({ length: 3 });
  return (
    <main className={styles.main}>
      <div>
        <h1>Hello, world.</h1>
        <p>
          Alice is officially learning Next.js. <i>Sigh.</i>
        </p>
        {grids.map((_, i) => (
          <Grid key={i} />
        ))}
      </div>
    </main>
  );
}

function Grid() {
  const squares = Array.from({ length: 9 });
  return (
    <div className={styles.grid}>
      {squares.map((_, i) => (
        <Square key={i} />
      ))}
    </div>
  );
}
