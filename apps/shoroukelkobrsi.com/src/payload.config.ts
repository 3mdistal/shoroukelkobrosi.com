// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { resendAdapter } from '@payloadcms/email-resend'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { getURL } from '@/utilities/get-url'
import sharp from 'sharp'

import { Users, Media, Films, Stills } from '@/collections'
import { Homepage, AboutPage } from '@/globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    avatar: 'gravatar',
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: getURL(),
      globals: ['homepage'],
      collections: ['films'],
    },
  },
  collections: [Users, Media, Films, Stills],
  globals: [Homepage, AboutPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
  email: resendAdapter({
    apiKey: process.env.RESEND_API_KEY ?? '',
    defaultFromAddress: 'admin@shoroukelkobrosi.com',
    defaultFromName: 'Shorouk Elkobrsi',
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled:
        process.env.VERCEL_ENV === 'production' || process.env.VERCEL_ENV === 'preview'
          ? true
          : false,
      access: 'public',
      addRandomSuffix: true,
      collections: {
        [Media.slug]: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN ?? '',
    }),
  ],
})
