import type { GlobalConfig } from "payload";
import { revalidateTag } from "next/cache";
import {
  HTMLConverterFeature,
  BoldFeature,
  ItalicFeature,
  lexicalEditor,
  lexicalHTML,
} from "@payloadcms/richtext-lexical";
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
      editor: lexicalEditor({
        features: () => [
          BoldFeature(),
          ItalicFeature(),
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML("intro", {
      name: "intro_html",
    }),
  ],
  hooks: {
    afterChange: [
      () => {
        revalidateTag("about-page");
      },
    ],
  },
  versions: true,
};
