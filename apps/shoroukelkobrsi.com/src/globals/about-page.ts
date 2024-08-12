import type { GlobalConfig } from "payload";
import { revalidateTag } from "next/cache";
import { getURL } from "../utilities/get-url";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  admin: {
    livePreview: {
      url: `${getURL()}/about`,
    },
  },
  fields: [
    {
      name: "intro",
      type: "richText",
    },
  ],
  hooks: {
    afterChange: [
      () => {
        revalidateTag("homepage");
      },
    ],
  },
  versions: true,
};
