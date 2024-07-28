import FilmShowcase from "@/components/film-showcase";
import Reel from "@/components/reel";
import { RefreshRouteOnSave } from "@/components/refresh-route-on-save";

export default function Home(): React.ReactElement {
  return (
    <>
      <RefreshRouteOnSave />
      <Reel />
      <FilmShowcase />
    </>
  );
}
