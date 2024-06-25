import type { CollectionConfig } from "payload";

export const TestCollection: CollectionConfig = {
  slug: "test-collection",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
