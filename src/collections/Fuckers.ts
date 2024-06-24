import type { CollectionConfig } from "payload";

export const Fuckers: CollectionConfig = {
  slug: "fuckers",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "Who to fuck up",
      type: "text",
      required: true,
    },
  ],
};
