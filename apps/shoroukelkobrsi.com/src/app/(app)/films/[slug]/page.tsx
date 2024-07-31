import FilmPage from "@/components/film-page";
import { RefreshRouteOnSave } from "@/components/refresh-route-on-save";

export default function Page({
  params,
}: {
  params: { slug: string };
}): React.ReactElement {
  return (
    <>
      <RefreshRouteOnSave />
      <FilmPage slug={params.slug} />
    </>
  );
}
