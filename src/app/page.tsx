import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div>
        <h1>Hello, world.</h1>
        <p>
          Alice is officially learning Next.js. <i>Sigh.</i>
        </p>
        <ReusableComponent />
      </div>
    </main>
  );
}

function ReusableComponent() {
  return (
    <p>This is a reusable component.</p>
  )
}
