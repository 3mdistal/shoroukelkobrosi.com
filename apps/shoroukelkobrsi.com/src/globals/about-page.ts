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
          HTMLConverterFeature(),
        ],
      }),
    },
    lexicalHTML("intro", {
      name: "intro_html",
    }),
    {
      name: "personal-tidbits",

      type: "blocks",
      blocks: [
        {
          slug: "tidbit",
          fields: [
            {
              name: "header",
              type: "text",
              required: true,
            },
            {
              name: "body",
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
            lexicalHTML("body", {
              name: "body_html",
            }),
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              required: true,
            },
          ],
        },
      ],
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
