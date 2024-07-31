import type { CollectionBeforeChangeHook, CollectionConfig } from "payload";
import { revalidateTag } from "next/cache";
import { slugify } from "@/utilities/slugify";
import { getURL } from "@/utilities/get-url";
import { type Film } from "@/payload-types";

const beforeChangeHook: CollectionBeforeChangeHook = ({
  originalDoc,
  data,
}) => {
  revalidateTag("homepage");

  const oldDoc: Film = originalDoc as Film;
  const newDoc: Film = data as Film;

  revalidateTag(`film-${oldDoc.slug}`);
  revalidateTag(`film-${newDoc.slug}`);
};

export const Films: CollectionConfig = {
  slug: "films",
  admin: {
    description: "Films to display both on the homepage and on project pages.",
    livePreview: {
      url: ({ data }) => {
        const film: Film = data as Film;

        return `${getURL()}/films/${film.slug}`;
      },
    },
    useAsTitle: "title",
  },
  hooks: {
    beforeChange: [beforeChangeHook],
    afterDelete: [
      ({ doc }: { doc: Film }) => {
        revalidateTag("homepage");
        if (typeof doc.slug === "string") {
          revalidateTag(`film-${doc.slug}`);
        }
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
      // admin: {
      //   hidden: true,
      // },
      required: true,
      type: "text",
      hooks: {
        beforeValidate: [
          ({ data }) => {
            console.log("setting new slug");
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
  ],
};
