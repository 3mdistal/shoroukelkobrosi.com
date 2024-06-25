// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const mongo = mongooseAdapter({
  url: process.env.DATABASE_URI || "",
})
const postgres = mongooseAdapter({
  url: process.env.DATABASE_URI || "",
})

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
    declare: false
  },
  db: process.env.VERCEL_ENV === "development" ? mongo : postgres,
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
});
