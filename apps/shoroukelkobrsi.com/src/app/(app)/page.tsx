import FilmShowcase from "@/components/film/film-showcase";
import Reel from "@/components/film/reel";
import { RefreshRouteOnSave } from "@/components/utils/refresh-route-on-save";
import styles from "./page.module.css";

export default function Home(): React.ReactElement {
  return (
    <>
      <RefreshRouteOnSave />
      <div className={styles.homepage}>
        <section className={styles.reelSection}>
          <Reel />
        </section>
        <section className={styles.showcaseSection}>
          <FilmShowcase />
        </section>
      </div>
    </>
  );
}
