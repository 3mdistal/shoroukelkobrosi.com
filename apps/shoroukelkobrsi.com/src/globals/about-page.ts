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
      name: "personal-intro",
      type: "richText",
      editor: lexicalEditor({
        features: () => [
          BoldFeature(),
          ItalicFeature(),
          HTMLConverterFeature(),
        ],
      }),
      required: true,
    },
    {
      name: "personal-photo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    lexicalHTML("personal-intro", {
      name: "personal-intro_html",
    }),
    {
      name: "professional-intro",
      type: "richText",
      editor: lexicalEditor({
        features: () => [
          BoldFeature(),
          ItalicFeature(),
          HTMLConverterFeature(),
        ],
      }),
      required: true,
    },
    lexicalHTML("professional-intro", {
      name: "professional-intro_html",
    }),
    {
      name: "professional-photo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "professional-logos",
      type: "array",
      fields: [
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
      required: true,
    },
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
