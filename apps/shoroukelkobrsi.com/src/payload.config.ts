import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Users } from "./collections/users";
import { Media } from "./collections/media";
import { Films } from "./collections/films";
import { Stills } from "./collections/stills";

export default buildConfig({
  admin: {
    autoLogin: {
      email: "dev@dev.com",
      password: "dev",
    },
    user: Users.slug,
  },
  collections: [Users, Media, Films, Stills],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? "",
  typescript: {
    outputFile: "src/payload-types.ts",
    declare: {
      ignoreTSError: true,
    },
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL ?? "",
    },
  }),
  sharp,
});
