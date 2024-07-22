import FilmShowcase from "@/components/film-showcase";
import Reel from "@/components/reel";

export default function Home(): React.ReactElement {
  return (
    <>
      <Reel />
      <FilmShowcase />
    </>
  );
}
