import type { GlobalConfig } from "payload";
import { revalidateTag } from "next/cache";

// todo: Needs to be able to be updated in prod, and something is breaking it.
export const Homepage: GlobalConfig = {
  slug: "homepage",
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: "featuredFilms",
      type: "relationship",
      relationTo: "films",
      hasMany: true,
      index: true,
      admin: {
        isSortable: true,
      },
    },
  ],
  hooks: {
    afterChange: [
      () => {
        revalidateTag("homepage");
      },
    ],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
  },
};
