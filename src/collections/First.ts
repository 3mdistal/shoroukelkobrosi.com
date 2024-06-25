import type { CollectionConfig } from "payload";

export const First: CollectionConfig = {
  slug: "first",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
