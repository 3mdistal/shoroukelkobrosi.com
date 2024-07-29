# tsconfig.json

```json
{
  "plugins": [
    {
      "name": ["next", "typescript-plugin-css-modules"]
    }
  ],
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@payload-config": ["./src/payload.config.ts"]
    },
    "plugins": [
      {
        "name": "typescript-plugin-css-modules",
        "options": {
          "noUncheckedIndexedAccess": true,
          "goToDefinition": true
        }
      },
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    "postcss.config.mjs"
  ],
  "exclude": ["node_modules", "src/migrations"]
}

```

# playwright.config.ts

```ts
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "turbo dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
  },
});

```

# package.json

```json
{
  "name": "shoroukelkobrsi.com",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev --turbo",
    "env-pull": "vc env pull",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write \"./**/*.{js,jsx,mjs,cjs,ts,tsx,json}\"",
    "migrate:create": "cross-env PAYLOAD_CONFIG_PATH=src/payload.config.ts payload migrate:create",
    "test": "playwright test",
    "vercel": "vercel"
  },
  "dependencies": {
    "@payloadcms/db-postgres": "3.0.0-beta.70",
    "@payloadcms/email-resend": "3.0.0-beta.70",
    "@payloadcms/graphql": "3.0.0-beta.70",
    "@payloadcms/live-preview-react": "3.0.0-beta.70",
    "@payloadcms/next": "3.0.0-beta.70",
    "@payloadcms/plugin-cloud": "3.0.0-beta.70",
    "@payloadcms/richtext-lexical": "3.0.0-beta.70",
    "@payloadcms/translations": "3.0.0-beta.70",
    "@payloadcms/ui": "3.0.0-beta.70",
    "babel-plugin-react-compiler": "0.0.0-experimental-938cd9a-20240601",
    "graphql": "^16.9.0",
    "next": "15.0.0-rc.0",
    "payload": "3.0.0-beta.70",
    "react": "19.0.0-rc-f994737d14-20240522",
    "react-dom": "19.0.0-rc-f994737d14-20240522",
    "sharp": "^0.33.4"
  },
  "devDependencies": {
    "@playwright/test": "^1.45.3",
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@types/node": "^20.14.12",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "cross-env": "^7.0.3",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.4",
    "open-props": "^1.7.5",
    "postcss": "^8.4.40",
    "postcss-jit-props": "^1.0.14",
    "turbo": "^2.0.9",
    "typescript": "^5.5.4",
    "typescript-plugin-css-modules": "^5.1.0"
  },
  "packageManager": "pnpm@9.5.0"
}

```

# next.config.mjs

```mjs
import { withPayload } from "@payloadcms/next/withPayload";
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    reactCompiler: true,
    // typedRoutes: true, // Not yet available in Turbopack.
  },
  productionBrowserSourceMaps: true,
};

export default withPayload(nextConfig);

```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

```

# README.md

```md
Welcome to the portfolio of Shorouk Elkobrsi, cinematographer.
```

# CHANGELOG.md

```md
## 0.0.1

- Site is deploying as part of a larger monorepo.
- Payload config locked and loaded.
```

# .gitignore

```
.vercel
.env*.local

```

# .eslintrc.json

```json
{
  "extends": ["@repo/eslint-config/next.js"],
  "rules": {
    "strict": ["error", "global"]
  }
}

```

# .eslintignore

```
# Payload
src/payload-types.ts
src/migrations/*
src/app/(payload)/layout.tsx
src/app/(payload)/admin/*
src/app/(payload)/api/*
```

# .aidigestignore

```
**/playwright-report/**
**/.turbo/**
**/migrations/**
```

# types/modules.d.ts

```ts
declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}

```

# test-results/.last-run.json

```json
{
  "status": "failed"
}
```

# src/payload.config.ts

```ts
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

```

# src/payload-types.ts

```ts
/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    media: Media;
    films: Film;
    stills: Still;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  db: {
    defaultIDType: number;
  };
  globals: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  role?: ('admin' | 'editor') | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "films".
 */
export interface Film {
  id: number;
  title: string;
  slug: string;
  date: string;
  trailer?: string | null;
  director?: string | null;
  producer?: string | null;
  format?: string | null;
  prizes?:
    | {
        prize?: string | null;
        id?: string | null;
      }[]
    | null;
  imdbLink?: string | null;
  aspectRatio?: ('4:3' | '5:4' | '16:9' | '2.35:1' | '9:16') | null;
  stills?:
    | {
        image: number | Media;
        featured?: boolean | null;
        id?: string | null;
      }[]
    | null;
  displayOnHomepage?: boolean | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "stills".
 */
export interface Still {
  id: number;
  date: string;
  location: string;
  format?: string | null;
  image: number | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  // @ts-ignore 
  export interface GeneratedTypes extends Config {}
}
```

# public/vercel.svg

This is a file of the type: SVG Image

# public/next.svg

This is a file of the type: SVG Image

# media/testing-1.avif

This is a binary file of the type: Binary

# .vercel/project.json

```json
{"projectId":"prj_fzO9A2PdRAPSuQhCli1oYsq5HKoL","orgId":"team_TPoHMtzMQOYaTA8ny4zYhngM"}
```

# .vercel/README.txt

```txt
> Why do I have a folder named ".vercel" in my project?
The ".vercel" folder is created when you link a directory to a Vercel project.

> What does the "project.json" file contain?
The "project.json" file contains:
- The ID of the Vercel project that you linked ("projectId")
- The ID of the user or team your Vercel project is owned by ("orgId")

> Should I commit the ".vercel" folder?
No, you should not share the ".vercel" folder with anyone.
Upon creation, it will be automatically added to your ".gitignore" file.

```

# src/utilities/slugify.ts

```ts
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

```

# src/utilities/get-url.ts

```ts
export const getURL = (): string => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ?? "error"}`;
  } else if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL ?? "error"}`;
  }
  return "http://localhost:3000";
};

```

# src/components/refresh-route-on-save.tsx

```tsx
"use client";
import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation.js";
import { getURL } from "@/utilities/get-url";

export function RefreshRouteOnSave(): React.ReactElement {
  const router = useRouter();
  const serverURL = getURL();

  return (
    <PayloadLivePreview
      refresh={() => {
        router.refresh();
      }}
      serverURL={serverURL}
    />
  );
}

```

# src/components/reel.tsx

```tsx
import styles from "./reel.module.css";

export default function Reel(): React.ReactElement {
  return (
    <div className={styles.reelContainer}>
      <div className={styles.reel} />
    </div>
  );
}

```

# src/components/reel.module.css

```css
.reelContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: calc(var(--menu-height) * -1);
  background: var(--gray-12);
  width: 100%;
  height: 100dvh;
}

.reel {
  animation: gradientAnimation 10s ease infinite;
  background: linear-gradient(to bottom, var(--gray-10), var(--gray-2));
  background-size: 100% 200%;
  aspect-ratio: var(--ratio-widescreen);
  max-width: 100%;
  height: 100%;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}

```

# src/components/menu.tsx

```tsx
import styles from "./menu.module.css";

export default function Menu(): React.ReactElement {
  return (
    <header className={styles.menu}>
      <div className={styles["menu-children"]}>Logo</div>
      <div className={`${styles["menu-children"]} ${styles["menu-title"]}`}>
        The cinema of Shorouk Elkorsi.
      </div>
      <div className={styles["menu-children"]}>Menu</div>
    </header>
  );
}

```

# src/components/menu.module.css

```css
.menu {
  display: flex;
  position: sticky;
  top: 0px;
  justify-content: space-between;
  z-index: var(--layer-1);
  background: linear-gradient(
    to bottom,
    rgba(50, 50, 50, 0.4),
    rgba(0, 0, 0, 0)
  );
  padding: 0 var(--menu-height);
  width: 100lvw;
  height: var(--menu-height);
  color: var(--gray-3);

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: "";
  }

  @media screen and (max-width: 768px) {
    --menu-height: var(--size-8);
    padding: 0 calc(var(--menu-height) * 0.25);
  }
}

.menu-children {
  z-index: var(--layer-2);
  font-size: var(--font-size-xl);
  line-height: var(--menu-height);
  font-family: var(--font-lora);
}

.menu-title {
  @media screen and (max-width: 768px) {
    display: none;
  }
}

```

# src/components/film-showcase.tsx

```tsx
import { getPayloadHMR } from "@payloadcms/next/utilities";
import Image from "next/image";
import Link from "next/link";
import type { Payload } from "payload";
import { unstable_cache as cache } from "next/cache";
import configPromise from "@payload-config";
import type { Film } from "../payload-types";
import styles from "./film-showcase.module.css";

const getCachedFilms = cache(
  async (): Promise<Film[]> => {
    const payload: Payload = await getPayloadHMR({
      config: configPromise,
    });

    const response = await payload.find({
      collection: "films",
      where: {
        displayOnHomepage: {
          equals: true,
        },
      },
      sort: "-date",
    });

    return response.docs;
  },
  ["data-cache"],
  {
    tags: ["films"],
  },
);

function getSeason(date: Date): string {
  const month = date.getMonth();
  switch (month) {
    case 2:
    case 3:
    case 4:
      return "Spring";
    case 5:
    case 6:
    case 7:
      return "Summer";
    case 8:
    case 9:
    case 10:
      return "Autumn";
    default:
      return "Winter";
  }
}

function formatSeasonYear(dateString: string): string {
  const date = new Date(dateString);
  const season = getSeason(date);
  const year = date.getFullYear().toString();
  return `${season} ${year}`;
}

export default async function FilmShowcase(): Promise<React.ReactElement> {
  const films = await getCachedFilms();

  return (
    <section className={styles.showcase}>
      <h2>Films</h2>
      {films.map((film) => (
        <Link
          href={`/films/${film.slug}`}
          key={film.id}
          className={styles.film}
        >
          <div className={styles.filmInfo}>
            <h3>{film.title}</h3>
            <p>{formatSeasonYear(film.date)}</p>
          </div>
          <div className={styles.stillsGrid}>
            {film.stills
              ?.filter((still) => still.featured)
              .map((still) => (
                <div className={styles.gridCell} key={still.id}>
                  <Image
                    src={
                      typeof still.image === "object" && still.image.url
                        ? still.image.url
                        : "https://unplash.it/1600/900"
                    }
                    alt={`Still from ${film.title}`}
                    style={{ objectFit: "cover" }}
                    fill
                  />
                </div>
              ))}
          </div>
        </Link>
      ))}
    </section>
  );
}

```

# src/components/film-showcase.module.css

```css
.showcase {
  display: flex;
  row-gap: var(--size-12);
  flex-direction: column;
  padding: var(--size-12);
  width: 100%;
  min-height: 100dvw;
}

.film {
  display: block;
  height: 100dvw;
}

.stillsGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--size-6);
  width: 100%;
}

.gridCell {
  position: relative;
  aspect-ratio: 16/9;
}

```

# src/collections/users.ts

```ts
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
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
    update: ({ req: { user } }) => user?.role === "admin",
    delete: ({ req: { user } }) => user?.role === "admin",
  },
};

```

# src/collections/stills.ts

```ts
import { type CollectionConfig } from "payload";

export const Stills: CollectionConfig = {
  slug: "stills",
  admin: {
    useAsTitle: "location",
  },
  fields: [
    {
      name: "date",
      type: "date",
      required: true,
    },
    {
      name: "location",
      type: "text",
      required: true,
    },
    {
      name: "format",
      type: "text",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};

```

# src/collections/media.ts

```ts
import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
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

```

# src/collections/films.ts

```ts
import type { CollectionConfig } from "payload";
import { revalidateTag } from "next/cache";
import { slugify } from "@/utilities/slugify";

export const Films: CollectionConfig = {
  slug: "films",
  admin: {
    description: "Films to display both on the homepage and on project pages.",
    useAsTitle: "title",
  },
  hooks: {
    afterChange: [
      () => {
        revalidateTag("films");
      },
    ],
    afterDelete: [
      () => {
        revalidateTag("films");
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      admin: {
        hidden: true,
      },
      required: true,
      type: "text",
      hooks: {
        beforeValidate: [
          ({ data }) => {
            return data?.title ? slugify(data.title as string) : undefined;
          },
        ],
      },
    },
    {
      name: "date",
      type: "date",
      required: true,
      label: "Date Completed",
    },
    {
      name: "trailer",
      type: "text",
      label: "Trailer embed URL (Vimeo or YouTube).",
    },
    {
      name: "director",
      type: "text",
    },
    {
      name: "producer",
      type: "text",
      label: "Producer or production house.",
    },
    {
      name: "format",
      type: "text",
    },
    {
      name: "prizes",
      type: "array",
      fields: [
        {
          name: "prize",
          type: "text",
        },
      ],
    },
    {
      name: "imdbLink",
      type: "text",
      label: "IMDb Link",
    },
    {
      name: "aspectRatio",
      type: "select",
      options: [
        { label: "4:3", value: "4:3" },
        { label: "5:4", value: "5:4" },
        { label: "16:9", value: "16:9" },
        { label: "2.35:1", value: "2.35:1" },
        { label: "9:16", value: "9:16" },
      ],
    },
    {
      name: "stills",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "featured",
          type: "checkbox",
          label: "Feature on homepage.",
        },
      ],
    },
    {
      name: "displayOnHomepage",
      type: "checkbox",
      defaultValue: false,
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
  },
};

```

# src/app/favicon.ico

This is a binary file of the type: Binary

# src/app/my-route/route.ts

```ts
import { getPayload } from "payload";
import configPromise from "@payload-config";

export const GET = async (): Promise<Response> => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "users",
  });

  return Response.json(data);
};

```

# src/app/(payload)/layout.tsx

```tsx
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import configPromise from "@payload-config";
import "@payloadcms/next/css";
import { RootLayout } from "@payloadcms/next/layouts";
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import React from "react";

import "./custom.scss";

type Args = {
  children: React.ReactNode;
};

const Layout = ({ children }: Args) => (
  <RootLayout config={configPromise}>{children}</RootLayout>
);

export default Layout;

```

# src/app/(payload)/custom.scss

```scss

```

# src/app/(app)/page.tsx

```tsx
import FilmShowcase from "@/components/film-showcase";
import Reel from "@/components/reel";
import { RefreshRouteOnSave } from "@/components/refresh-route-on-save";

export default function Home(): React.ReactElement {
  return (
    <>
      <RefreshRouteOnSave />
      <Reel />
      <FilmShowcase />
    </>
  );
}

```

# src/app/(app)/layout.tsx

```tsx
import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import Menu from "@/components/menu";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Anthropotpourri",
  description: "The cinema of Shorouk Elkobrsi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en" className={lora.variable}>
      <body>
        <Menu />
        <main>{children}</main>
      </body>
    </html>
  );
}

```

# src/app/(app)/globals.css

```css
@import "open-props/normalize";
@import "open-props/style";

@layer base {
}

@layer theme {
}

@layer components {
  :root {
    --menu-height: var(--size-10);
  }
}

@layer utilities {
}

@layer styles {
  body {
    height: 200lvh;
  }
}

```

# src/app/(payload)/admin/[[...segments]]/page.tsx

```tsx
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from "next";

import config from "@payload-config";
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";

type Args = {
  params: {
    segments: string[];
  };
  searchParams: {
    [key: string]: string | string[];
  };
};

export const generateMetadata = ({
  params,
  searchParams,
}: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, params, searchParams });

export default Page;

```

# src/app/(payload)/admin/[[...segments]]/not-found.tsx

```tsx
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from "next";

import config from "@payload-config";
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import { NotFoundPage, generatePageMetadata } from "@payloadcms/next/views";

type Args = {
  params: {
    segments: string[];
  };
  searchParams: {
    [key: string]: string | string[];
  };
};

export const generateMetadata = ({
  params,
  searchParams,
}: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

const NotFound = ({ params, searchParams }: Args) =>
  NotFoundPage({ config, params, searchParams });

export default NotFound;

```

# src/app/(payload)/api/graphql/route.ts

```ts
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY it because it could be re-written at any time. */
import config from "@payload-config";
import { GRAPHQL_POST } from "@payloadcms/next/routes";

export const POST = GRAPHQL_POST(config);

```

# src/app/(payload)/api/graphql-playground/route.ts

```ts
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY it because it could be re-written at any time. */
import config from "@payload-config";
import { GRAPHQL_PLAYGROUND_GET } from "@payloadcms/next/routes";

export const GET = GRAPHQL_PLAYGROUND_GET(config);

```

# src/app/(payload)/api/[...slug]/route.ts

```ts
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY it because it could be re-written at any time. */
import config from "@payload-config";
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
} from "@payloadcms/next/routes";

export const GET = REST_GET(config);
export const POST = REST_POST(config);
export const DELETE = REST_DELETE(config);
export const PATCH = REST_PATCH(config);
export const OPTIONS = REST_OPTIONS(config);

```

# src/app/(app)/films/[slug]/page.tsx

```tsx
export default function FilmPage(): React.ReactElement {
  return <p>Film Page</p>;
}

```

