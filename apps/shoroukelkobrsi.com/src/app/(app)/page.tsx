import { Suspense } from "react";
import FilmShowcase from "@/components/film-showcase";
import Reel from "@/components/reel";

export default function Home(): React.ReactElement {
  return (
    <>
      <Reel />
      <Suspense fallback="<p>Loading...</p>">
        <FilmShowcase />
      </Suspense>
    </>
  );
}
