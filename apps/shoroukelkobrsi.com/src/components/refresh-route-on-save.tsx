"use client";
import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation.js";
import { getURL } from "@/utilities/get-url";

export function RefreshRouteOnSave(): React.ReactElement {
  const router = useRouter();
  const serverURL = getURL();

  return (
    <PayloadLivePreview
      refresh={() => {
        router.refresh();
      }}
      serverURL={serverURL}
    />
  );
}
