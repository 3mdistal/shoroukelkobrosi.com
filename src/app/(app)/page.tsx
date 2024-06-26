import styles from "./page.module.css";
import { Square } from "./square";

export default function Home() {
  const grids = Array.from({ length: 3 });
  return (
    <main className="grid aspect-square place-content-center bg-[#333] p-4">
      <div className="w-[75vw] bg-black p-[10%]">
        <h1 className="mb-4 text-6xl font-thin tracking-wide text-[#ddd]">
          Hello, world.
        </h1>
        <p className="leading-10 text-[#ccc]">
          Here we go again. <i>Sigh.</i>
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
