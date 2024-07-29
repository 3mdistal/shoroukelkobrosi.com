import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { resendAdapter } from "@payloadcms/email-resend";
import { buildConfig, type EmailAdapter } from "payload";
import sharp from "sharp";
import { getURL } from "./utilities/get-url";
import { Users } from "./collections/users";
import { Media } from "./collections/media";
import { Films } from "./collections/films";
import { Stills } from "./collections/stills";

export default buildConfig({
  admin: {
    autoLogin: {
      email: "admin_dev@dev.com",
      password: "dev",
      prefillOnly: true,
    },
    avatar: "gravatar",
    livePreview: {
      url: getURL(),
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
  serverURL: getURL(),
  sharp,
  typescript: {
    outputFile: "src/payload-types.ts",
    declare: {
      ignoreTSError: true,
    },
  },
});
