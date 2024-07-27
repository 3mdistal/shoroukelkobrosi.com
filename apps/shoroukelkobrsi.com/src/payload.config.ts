import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { resendAdapter } from "@payloadcms/email-resend";
import { buildConfig, type EmailAdapter } from "payload";
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
    livePreview: {
      url: "http://localhost:3000",
      collections: ["films", "stills"],
    },
    user: Users.slug,
  },
  collections: [Users, Media, Films, Stills],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL ?? "",
    },
  }),
  editor: lexicalEditor(),
  email: resendAdapter({
    apiKey: process.env.RESEND_KEY ?? "",
    defaultFromAddress: "admin@teenylilapps.com",
    defaultFromName: "Shorouk Elkobrsi",
  }) as EmailAdapter,
  secret: process.env.PAYLOAD_SECRET ?? "",
  sharp,
  typescript: {
    outputFile: "src/payload-types.ts",
    declare: {
      ignoreTSError: true,
    },
  },
});
