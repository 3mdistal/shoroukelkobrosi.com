"use client";
import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation.js";
import React, { useEffect, useState } from "react";
import { getURL } from "@/utilities/get-url";

export function RefreshRouteOnSave(): React.ReactElement {
  const router = useRouter();
  const [serverURL, setServerURL] = useState("");

  useEffect(() => {
    const url = getURL();
    // eslint-disable-next-line no-console -- This is for debugging
    console.log("RefreshRouteOnSave serverURL:", url);
    setServerURL(url);
  }, []);

  if (!serverURL) return <div />;

  return (
    <PayloadLivePreview
      refresh={() => {
        // eslint-disable-next-line no-console -- This is for debugging
        console.log("Refresh called");
        router.refresh();
      }}
      serverURL={serverURL}
    />
  );
}
