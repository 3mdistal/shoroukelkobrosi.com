import { type CollectionConfig } from "payload";

export const Stills: CollectionConfig = {
  slug: "stills",
  admin: {
    useAsTitle: "location",
  },
  fields: [
    {
      name: "date",
      type: "date",
      required: true,
    },
    {
      name: "location",
      type: "text",
      required: true,
    },
    {
      name: "format",
      type: "text",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};
