import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "role",
      type: "select",
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Editor",
          value: "editor",
        },
      ],
      access: {
        read: ({ req: { user } }) => user?.role === "admin",
        create: ({ req: { user } }) => user?.role === "admin",
        update: ({ req: { user } }) => user?.role === "admin",
      },
    },
  ],
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === "admin") return true;
      return {
        id: {
          equals: user?.id,
        },
      };
    },
    create: ({ req: { user } }) => user?.role === "admin",
    update: ({ req: { user } }) => {
      if (user?.role === "admin") return true;
      return {
        id: {
          equals: user?.id,
        },
      };
    },
    delete: ({ req: { user } }) => user?.role === "admin",
    unlock: ({ req: { user } }) => user?.role === "admin",
  },
};
