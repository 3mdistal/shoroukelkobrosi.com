import type { CollectionConfig } from "payload";
import { revalidateTag } from "next/cache";
import { slugify } from "@/utilities/slugify";

export const Films: CollectionConfig = {
  slug: "films",
  admin: {
    description: "Films to display both on the homepage and on project pages.",
    useAsTitle: "title",
  },
  hooks: {
    afterChange: [
      () => {
        revalidateTag("films");
      },
    ],
    afterDelete: [
      () => {
        revalidateTag("films");
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      admin: {
        hidden: true,
      },
      required: true,
      type: "text",
      hooks: {
        beforeValidate: [
          ({ data }) => {
            return data?.title ? slugify(data.title as string) : undefined;
          },
        ],
      },
    },
    {
      name: "date",
      type: "date",
      required: true,
      label: "Date Completed",
    },
    {
      name: "trailer",
      type: "text",
      label: "Trailer embed URL (Vimeo or YouTube).",
    },
    {
      name: "director",
      type: "text",
    },
    {
      name: "producer",
      type: "text",
      label: "Producer or production house.",
    },
    {
      name: "format",
      type: "text",
    },
    {
      name: "prizes",
      type: "array",
      fields: [
        {
          name: "prize",
          type: "text",
        },
      ],
    },
    {
      name: "imdbLink",
      type: "text",
      label: "IMDb Link",
    },
    {
      name: "aspectRatio",
      type: "select",
      options: [
        { label: "4:3", value: "4:3" },
        { label: "5:4", value: "5:4" },
        { label: "16:9", value: "16:9" },
        { label: "2.35:1", value: "2.35:1" },
        { label: "9:16", value: "9:16" },
      ],
    },
    {
      name: "stills",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "featured",
          type: "checkbox",
          label: "Feature on homepage.",
        },
      ],
    },
    {
      name: "displayOnHomepage",
      type: "checkbox",
      defaultValue: false,
    },
  ],
  versions: {
    drafts: {
      autosave: true,
    },
  },
};

/* Fields to Add

- newest goes first
- trailer (embedded from YT or Vimeo)
- more stills (which means we need "featured")
- title
- director
- producer
- format
- prizes
- imdb
- aspect ratio
- next and previous


Photos/Stills (not on homepage)
- date
- location
- format
- organized into masonry


*/
