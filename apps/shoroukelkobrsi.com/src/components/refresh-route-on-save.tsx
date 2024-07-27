"use client";
import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation.js";
import React from "react";

export function RefreshRouteOnSave(): React.ReactElement {
  const router = useRouter();

  return (
    <PayloadLivePreview
      refresh={() => {
        router.refresh();
      }}
      serverURL="http://localhost:3000" // todo: Should eventually be dynamic to current route.
    />
  );
}
