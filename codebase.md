# turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "env": ["PAYLOAD_SECRET", "POSTGRES_URL"],
      "persistent": true,
      "cache": false
    },
    "storybook": {
      "persistent": true,
      "cache": false
    },
    "build-storybook": {
      "outputs": ["storybook-static/**"]
    },
    "lint": {
      "outputs": ["node_modules/.cache/.eslintcache"]
    },
    "migrate:create": {
      "outputs": ["migrations/**"],
      "interactive": true,
      "cache": false
    },
    "env-pull": {
      "cache": false,
      "interactive": true,
      "outputs": [".env.local"]
    },
    "start": {
      "env": ["PAYLOAD_SECRET", "POSTGRES_URL"],
      "persistent": true,
      "cache": false,
      "dependsOn": ["build"]
    },
    "test": {
      "env": ["PAYLOAD_SECRET", "POSTGRES_URL"],
      "cache": false
    },
    "vercel": {
      "env": ["PAYLOAD_SECRET", "POSTGRES_URL"],
      "cache": false
    }
  }
}

```

# teenylilapps.code-workspace

```code-workspace
{
  "folders": [
    {
      "name": "✨ teenylilapps",
      "path": ".",
    },
    {
      "name": "🚀 shoroukelkobrsi.com",
      "path": "apps/shoroukelkobrsi.com",
    },
  ],
  "settings": {},
}

```

# pnpm-workspace.yaml

```yaml
packages:
  - "apps/*"
  - "packages/*"

```

# package.json

```json
{
  "name": "teenylilapps",
  "private": true,
  "version": "0.1.0",
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "prettier": "^3.3.2",
    "prettier-plugin-css-order": "^2.1.2",
    "turbo": "latest"
  },
  "packageManager": "pnpm@9.5.0"
}

```

# README.md

```md
A collection of apps maintained by Alice Alexandra Moore.
```

# CHANGELOG.md

```md
# Changelog - teenylilapps
_A record of the goings-on in my unhinged development brain._

## 0.1.0

- Monorepo set up with Turborepo.
- TypeScript config abstracted to a package.
- ESLint config abstracted to a package.
- Next.js template app about where I want it, working with all next-gen tooling:
  - Payload CMS 3 (Beta)
  - Next.js 15 (RC)
  - React 19 (RC)
  - React Compiler (Experimental)
  - Turbopack (Experimental)
  - Open Props
```

# .prettierrc

```
{
  "plugins": ["prettier-plugin-css-order"],
  "tabWidth": 2,
  "useTabs": false
}

```

# .npmrc

```
hoist=true
```

# .gitignore

```
# dependencies
**/node_modules

# next.js
**/.next/

# production
**/build

# vscode
**/.vscode
teenylilapps.code-workspace

# misc
.DS_Store
*.pem

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# storybook
*storybook.log
**/storybook-static/**

# turbo
.turbo

# playrought
**/test-results/
**/playwright-report/
**/blob-report/
**/playwright/.cache/

```

# .aidigestignore

```
**/.next/**
**/.turbo/**
**/.vercel/**
**/.vscode/**
**/node_modules/**
**/playwright-report/**
**/migrations/**
```

# packages/tsconfig/package.json

```json
{
    "name": "@repo/typescript-config",
    "version": "0.0.0",
    "private": true
}
```

# packages/tsconfig/base.json

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"],
      "@payload-config": ["./src/payload.config.ts"]
    },
    "target": "ES2017",
    "types": ["@playwright/test"]
  }
}

```

# packages/eslint/package.json

```json
{
  "name": "@repo/eslint-config",
  "version": "0.0.0",
  "private": true,
  "devDependencies": {
    "@vercel/style-guide": "latest",
    "eslint-config-turbo": "latest"
  }
}

```

# packages/eslint/next.js

```js
const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/react",
    "@vercel/style-guide/eslint/next",
    // Turborepo custom eslint configuration configures the following rules:
    //  - https://github.com/vercel/turbo/blob/main/packages/eslint-plugin-turbo/docs/rules/no-undeclared-env-vars.md
    "eslint-config-turbo",
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/"],
  // add rules configurations here
  rules: {
    "import/no-default-export": "off",
  },
};

```

# apps/shoroukelkobrsi.com/tsconfig.json

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
      // Provides IDE-only errors and autocompletion.
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

# apps/shoroukelkobrsi.com/playwright.config.ts

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

# apps/shoroukelkobrsi.com/package.json

```json
{
  "name": "shoroukelkobrsi.com",
  "version": "0.0.1",
  "private": true,
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
    "@payloadcms/db-postgres": "3.0.0-beta.53",
    "@payloadcms/next": "3.0.0-beta.53",
    "@payloadcms/plugin-cloud": "3.0.0-beta.53",
    "@payloadcms/richtext-lexical": "3.0.0-beta.53",
    "babel-plugin-react-compiler": "0.0.0-experimental-938cd9a-20240601",
    "graphql": "^16.9.0",
    "next": "15.0.0-rc.0",
    "payload": "3.0.0-beta.53",
    "react": "19.0.0-rc-f994737d14-20240522",
    "react-dom": "19.0.0-rc-f994737d14-20240522",
    "sharp": "^0.33.4"
  },
  "devDependencies": {
    "@playwright/test": "^1.45.1",
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@types/node": "^20.14.10",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "cross-env": "^7.0.3",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.4",
    "open-props": "^1.7.5",
    "postcss": "^8.4.39",
    "postcss-jit-props": "^1.0.14",
    "turbo": "^2.0.6",
    "typescript": "^5.5.3",
    "typescript-plugin-css-modules": "^5.1.0"
  },
  "packageManager": "pnpm@9.5.0"
}

```

# apps/shoroukelkobrsi.com/next.config.mjs

```mjs
import { withPayload } from "@payloadcms/next/withPayload";
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    reactCompiler: true,
    // typedRoutes: true, // Not yet available in Turbopack.
  },
};

export default withPayload(nextConfig);

```

# apps/shoroukelkobrsi.com/next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

```

# apps/shoroukelkobrsi.com/README.md

```md
Welcome to the portfolio of Shorouk Elkobrsi, cinematographer.
```

# apps/shoroukelkobrsi.com/CHANGELOG.md

```md
## 0.0.1

- Site is deploying as part of a larger monorepo.
- Payload config locked and loaded.
```

# apps/shoroukelkobrsi.com/.gitignore

```
.vercel
.env*.local

```

# apps/shoroukelkobrsi.com/.eslintrc.json

```json
{
  "extends": ["@repo/eslint-config/next.js"],
  "rules": {
    "strict": ["error", "global"]
  }
}

```

# apps/shoroukelkobrsi.com/.eslintignore

```
# Payload
src/payload-types.ts
src/migrations/*
src/app/(payload)/layout.tsx
src/app/(payload)/admin/*
src/app/(payload)/api/*
```

# apps/nextjs-playground/tsconfig.json

```json
{
  "plugins": [
    {
      "name": "next"
    }
  ],
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@payload-config": ["./src/payload.config.ts"]
    },
    "plugins": [
      // Provides IDE-only errors and autocompletion.
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

# apps/nextjs-playground/playwright.config.ts

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

# apps/nextjs-playground/package.json

```json
{
  "name": "nextjs-playground",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbo",
    "env-pull": "vc env pull",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write \"./**/*.{js,jsx,mjs,cjs,ts,tsx,json}\"",
    "migrate:create": "cross-env PAYLOAD_CONFIG_PATH=src/payload.config.ts payload migrate:create",
    "test": "playwright test"
  },
  "dependencies": {
    "@payloadcms/db-postgres": "3.0.0-beta.53",
    "@payloadcms/next": "3.0.0-beta.53",
    "@payloadcms/plugin-cloud": "3.0.0-beta.53",
    "@payloadcms/richtext-lexical": "3.0.0-beta.53",
    "babel-plugin-react-compiler": "0.0.0-experimental-938cd9a-20240601",
    "graphql": "^16.9.0",
    "next": "15.0.0-rc.0",
    "open-props": "^1.7.5",
    "payload": "3.0.0-beta.53",
    "postcss-jit-props": "^1.0.14",
    "react": "19.0.0-rc-f994737d14-20240522",
    "react-dom": "19.0.0-rc-f994737d14-20240522",
    "sharp": "^0.33.4"
  },
  "devDependencies": {
    "@playwright/test": "^1.45.1",
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@types/node": "^20.14.10",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "cross-env": "^7.0.3",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.4",
    "postcss": "^8.4.39",
    "turbo": "^2.0.6",
    "typescript": "^5.5.3",
    "typescript-plugin-css-modules": "^5.1.0"
  },
  "packageManager": "pnpm@9.5.0"
}

```

# apps/nextjs-playground/next.config.mjs

```mjs
import { withPayload } from "@payloadcms/next/withPayload";
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    reactCompiler: true,
    // typedRoutes: true, // Not yet available in Turbopack.
  },
};

export default withPayload(nextConfig);

```

# apps/nextjs-playground/next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

```

# apps/nextjs-playground/README.md

```md
A template to clone for other apps in the collection. A testing ground.
```

# apps/nextjs-playground/CHANGELOG.md

```md
## 0.1.0

- Next.js template app about where I want it, working with all next-gen tooling:
  - Payload CMS 3 (Beta)
  - Next.js 15 (RC)
  - React 19 (RC)
  - React Compiler (Experimental)
  - Turbopack (Experimental)
  - Open Props
```

# apps/nextjs-playground/.gitignore

```
.vercel
.env*.local

```

# apps/nextjs-playground/.eslintrc.json

```json
{
  "extends": ["@repo/eslint-config/next.js"],
  "rules": {
    "strict": ["error", "global"]
  }
}

```

# apps/nextjs-playground/.eslintignore

```
# Payload
src/payload-types.ts
src/migrations/*
src/app/(payload)/layout.tsx
src/app/(payload)/admin/*
src/app/(payload)/api/*
```

# apps/shoroukelkobrsi.com/types/modules.d.ts

```ts
declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}

```

# apps/shoroukelkobrsi.com/src/payload.config.ts

```ts
import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Users } from "./collections/users";
import { Media } from "./collections/media";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    autoLogin: {
      email: "dev@dev.com",
      password: "dev",
    },
    user: Users.slug,
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
    declare: false,
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL ?? "",
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
});

```

# apps/shoroukelkobrsi.com/src/payload-types.ts

```ts
/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    media: Media;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
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

```

# apps/shoroukelkobrsi.com/public/vercel.svg

This is a file of the type: SVG Image

# apps/shoroukelkobrsi.com/public/next.svg

This is a file of the type: SVG Image

# apps/nextjs-playground/tests/admin-login.spec.ts

```ts
import { test, expect, Page } from "@playwright/test";

test.describe("Admin Login Flow", () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
  });

  test("should allow access to admin route", async () => {
    // Visit the /admin route with a longer timeout
    const adminResponse = await page.goto("http://localhost:3000/admin");

    // Check that the /admin page loaded without an error
    expect(adminResponse?.status()).toBe(200);
  });

  test.afterEach(async () => {
    await page.close();
  });
});

```

# apps/nextjs-playground/test-results/.last-run.json

```json
{
  "status": "passed",
  "failedTests": []
}
```

# apps/nextjs-playground/src/payload.config.ts

```ts
import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Users } from "./collections/users";
import { Media } from "./collections/media";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
    declare: false,
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL ?? "",
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
});

```

# apps/nextjs-playground/src/payload-types.ts

```ts
/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    media: Media;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
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

```

# apps/nextjs-playground/public/vercel.svg

This is a file of the type: SVG Image

# apps/nextjs-playground/public/next.svg

This is a file of the type: SVG Image

# apps/shoroukelkobrsi.com/src/components/reel.tsx

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

# apps/shoroukelkobrsi.com/src/components/reel.module.css

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

# apps/shoroukelkobrsi.com/src/components/project-showcase.tsx

```tsx
export default function ProjectShowcase(): React.ReactElement {
  return (
    <div>
      <h1>Project Showcase</h1>
      <p>Test text.</p>
    </div>
  );
}

```

# apps/shoroukelkobrsi.com/src/components/project-showcase.module.css

```css

```

# apps/shoroukelkobrsi.com/src/components/menu.tsx

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

# apps/shoroukelkobrsi.com/src/components/menu.module.css

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

# apps/shoroukelkobrsi.com/src/collections/users.ts

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
  ],
};

```

# apps/shoroukelkobrsi.com/src/collections/media.ts

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

# apps/shoroukelkobrsi.com/src/app/favicon.ico

This is a binary file of the type: Binary

# apps/nextjs-playground/src/collections/users.ts

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
  ],
};

```

# apps/nextjs-playground/src/collections/media.ts

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

# apps/nextjs-playground/src/app/favicon.ico

This is a binary file of the type: Binary

# apps/shoroukelkobrsi.com/src/app/my-route/route.ts

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

# apps/shoroukelkobrsi.com/src/app/(payload)/layout.tsx

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

# apps/shoroukelkobrsi.com/src/app/(payload)/custom.scss

```scss

```

# apps/shoroukelkobrsi.com/src/app/(app)/page.tsx

```tsx
import ProjectShowcase from "@/components/project-showcase";
import Reel from "@/components/reel";

export default function Home(): React.ReactElement {
  return (
    <>
      <Reel />
      <ProjectShowcase />
    </>
  );
}

```

# apps/shoroukelkobrsi.com/src/app/(app)/layout.tsx

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

# apps/shoroukelkobrsi.com/src/app/(app)/globals.css

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

# apps/nextjs-playground/src/app/my-route/route.ts

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

# apps/nextjs-playground/src/app/(payload)/layout.tsx

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

# apps/nextjs-playground/src/app/(payload)/custom.scss

```scss

```

# apps/nextjs-playground/src/app/(app)/page.tsx

```tsx
export default function Home(): React.ReactElement {
  return (
    <div>
      <p className="font-serif">Hello, world.</p>
    </div>
  );
}

```

# apps/nextjs-playground/src/app/(app)/layout.tsx

```tsx
import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en" className={lora.variable}>
      <body>{children}</body>
    </html>
  );
}

```

# apps/nextjs-playground/src/app/(app)/globals.css

```css
@layer base {
  :root {
    /* Core Variables - These are the ones you'd expose in your UI */
    --base-unit: 16px; /* Base unit for calculations */
    --scale-ratio: 1.25; /* Major third */
    --space-ratio: 0.5; /* Ratio of space scale to typography scale */

    /* Unified Scale */
    --scale-3xs: calc(
      var(--base-unit) / var(--scale-ratio) / var(--scale-ratio) /
        var(--scale-ratio)
    );
    --scale-2xs: calc(
      var(--base-unit) / var(--scale-ratio) / var(--scale-ratio)
    );
    --scale-xs: calc(var(--base-unit) / var(--scale-ratio));
    --scale-sm: calc(var(--base-unit) * var(--scale-ratio));
    --scale-md: var(--base-unit);
    --scale-lg: calc(var(--base-unit) * var(--scale-ratio));
    --scale-xl: calc(
      var(--base-unit) * var(--scale-ratio) * var(--scale-ratio)
    );
    --scale-2xl: calc(
      var(--base-unit) * var(--scale-ratio) * var(--scale-ratio) *
        var(--scale-ratio)
    );
    --scale-3xl: calc(
      var(--base-unit) * var(--scale-ratio) * var(--scale-ratio) *
        var(--scale-ratio) * var(--scale-ratio)
    );

    /* Spacing Scale */
    --space-3xs: calc(var(--scale-3xs) * var(--space-ratio));
    --space-2xs: calc(var(--scale-2xs) * var(--space-ratio));
    --space-xs: calc(var(--scale-xs) * var(--space-ratio));
    --space-sm: calc(var(--scale-sm) * var(--space-ratio));
    --space-md: calc(var(--scale-md) * var(--space-ratio));
    --space-lg: calc(var(--scale-lg) * var(--space-ratio));
    --space-xl: calc(var(--scale-xl) * var(--space-ratio));
    --space-2xl: calc(var(--scale-2xl) * var(--space-ratio));
    --space-3xl: calc(var(--scale-3xl) * var(--space-ratio));

    /* Font Sizes */
    --font-size-3xs: var(--scale-3xs);
    --font-size-2xs: var(--scale-2xs);
    --font-size-xs: var(--scale-xs);
    --font-size-sm: var(--scale-sm);
    --font-size-md: var(--scale-md);
    --font-size-lg: var(--scale-lg);
    --font-size-xl: var(--scale-xl);
    --font-size-2xl: var(--scale-2xl);
    --font-size-3xl: var(--scale-3xl);

    /* Line Heights */
    --line-height-tight: 1.1;
    --line-height-snug: 1.2;
    --line-height-normal: 1.5;
    --line-height-relaxed: 1.75;

    /* Font Families */
    --font-display: var(--font-lora), serif;
    --font-title: var(--font-lora), serif;
    --font-body: var(--font-lora), serif;

    /* Font Weights */
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 700;

    /* Typography Presets */
    --text-body: var(--font-weight-normal) var(--font-size-md) /
      var(--line-height-normal) var(--font-body);
    --text-body-small: var(--font-weight-normal) var(--font-size-sm) /
      var(--line-height-normal) var(--font-body);
    --text-title: var(--font-weight-bold) var(--font-size-xl) /
      var(--line-height-tight) var(--font-title);
    --text-display: var(--font-weight-bold) var(--font-size-3xl) /
      var(--line-height-tight) var(--font-display);

    /* Colors */
    /* not working, bc Sass compiles at build, while CSS vars are available in runtime. */
    /* todo: Need to rethink the strategy, but I do like where I've gotten with calculations. */

    /* Base color adjustment variables */
    --hue-adjustment: 5;
    --saturation-adjustment: 10%;
    --lightness-adjustment: 15%;

    /* Base color definitions as CSS variables */
    --base-bg: 60 30% 96%;
    --base-text: 0 0% 20%;
    --base-primary: 270 60% 80%;
    --base-secondary: 120 25% 70%;
    --base-tertiary: 300 50% 30%;
    --base-error: 0 65% 65%;
    --base-warning: 30 90% 70%;
    --base-success: 120 40% 60%;
    --base-info: 200 75% 65%;
  }

  /* Sass functions */
  /* @function hsl-var-to-list($var-name) {
    $hsl-string: var(#{$var-name});
    $hsl-list: ();
    @each $value in $hsl-string {
      $hsl-list: append($hsl-list, $value);
    }
    @return $hsl-list;
  }

  @function extract-hue($hsl-list) {
    @return nth($hsl-list, 1);
  }

  @function extract-saturation($hsl-list) {
    @return nth($hsl-list, 2);
  }

  @function extract-lightness($hsl-list) {
    @return nth($hsl-list, 3);
  }

  @function invert-lightness($hsl-list) {
    $hue: extract-hue($hsl-list);
    $saturation: extract-saturation($hsl-list);
    $lightness: extract-lightness($hsl-list);
    @return ($hue #{$saturation} #{100% - $lightness});
  }

  @function dark-mode-color($hsl-list) {
    $hue: extract-hue($hsl-list);
    $saturation: extract-saturation($hsl-list);
    $lightness: extract-lightness($hsl-list);

    $new-saturation: if(
      str-index($saturation, "%") and parseInt($saturation) < 10,
      min(100%, parseInt($saturation) + 10) * 1%,
      min(100%, parseInt($saturation) * 1.1) * 1%
    );

    $new-lightness: if(
      str-index($lightness, "%") and
        (parseInt($lightness) > 90 or parseInt($lightness) < 10),
      #{100% - parseInt($lightness) * 1%},
      #{80% - parseInt($lightness) * 1%}
    );

    $new-lightness: max(10%, min(90%, $new-lightness));

    @return ($hue #{$new-saturation} #{$new-lightness});
  }

  @function adjust-color(
    $hsl-list,
    $hue-adjustment,
    $saturation-adjustment,
    $lightness-adjustment
  ) {
    $hue: extract-hue($hsl-list);
    $saturation: extract-saturation($hsl-list);
    $lightness: extract-lightness($hsl-list);

    $new-hue: $hue + $hue-adjustment;
    $new-saturation: max(
        0%,
        min(100%, parseInt($saturation) + parseInt($saturation-adjustment))
      ) * 1%;
    $new-lightness: max(
        0%,
        min(100%, parseInt($lightness) + parseInt($lightness-adjustment))
      ) * 1%;

    @return ($new-hue #{$new-saturation} #{$new-lightness});
  } */

  /* Mixin for generating color variants */
  /* @mixin generate-color-variants($color-name, $base-var-name) {
    --#{$color-name}: hsl(var(#{$base-var-name}));
    --#{$color-name}-light: #{hsl(
        adjust-color(
          hsl-var-to-list($base-var-name),
          var(--hue-adjustment) * -1,
          var(--saturation-adjustment) * -1,
          var(--lightness-adjustment)
        )
      )};
    --#{$color-name}-dark: #{hsl(
        adjust-color(
          hsl-var-to-list($base-var-name),
          var(--hue-adjustment),
          var(--saturation-adjustment),
          var(--lightness-adjustment) * -1
        )
      )};

    @media (prefers-color-scheme: dark) {
      --#{$color-name}: #{hsl(dark-mode-color(hsl-var-to-list($base-var-name)))};
      --#{$color-name}-light: #{hsl(
          adjust-color(
            dark-mode-color(hsl-var-to-list($base-var-name)),
            var(--hue-adjustment) * -1,
            var(--saturation-adjustment) * -1,
            var(--lightness-adjustment)
          )
        )};
      --#{$color-name}-dark: #{hsl(
          adjust-color(
            dark-mode-color(hsl-var-to-list($base-var-name)),
            var(--hue-adjustment),
            var(--saturation-adjustment),
            var(--lightness-adjustment) * -1
          )
        )};
    }
  } */

  /* Generate color variants */
  /* @include generate-color-variants("color-bg", "--base-bg");
  @include generate-color-variants("color-text", "--base-text");
  @include generate-color-variants("color-primary", "--base-primary");
  @include generate-color-variants("color-secondary", "--base-secondary");
  @include generate-color-variants("color-tertiary", "--base-tertiary");
  @include generate-color-variants("color-error", "--base-error");
  @include generate-color-variants("color-warning", "--base-warning");
  @include generate-color-variants("color-success", "--base-success");
  @include generate-color-variants("color-info", "--base-info"); */

  /* Dark mode overrides for background and foreground */
  /* @media (prefers-color-scheme: dark) {
    :root {
      --color-bg: #{hsl(invert-lightness(hsl-var-to-list("--base-bg")))};
      --color-text: #{hsl(invert-lightness(hsl-var-to-list("--base-text")))};
    }
  } */
}

@layer theme {
  /* @each $size in xs, sm, md, lg, xl {
    .font-body-#{$size} {
      font: var(--font-body-#{$size});
    }
    .font-title-#{$size} {
      font: var(--font-title-#{$size});
    }
    .font-display-#{$size} {
      font: var(--font-display-#{$size});
    }
  } */
}

@layer components {
}

@layer utilities {
}

```

# apps/shoroukelkobrsi.com/src/app/(payload)/api/graphql-playground/route.ts

```ts
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY it because it could be re-written at any time. */
import config from "@payload-config";
import { GRAPHQL_PLAYGROUND_GET } from "@payloadcms/next/routes";

export const GET = GRAPHQL_PLAYGROUND_GET(config);

```

# apps/shoroukelkobrsi.com/src/app/(payload)/admin/[[...segments]]/page.tsx

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

# apps/shoroukelkobrsi.com/src/app/(payload)/admin/[[...segments]]/not-found.tsx

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

# apps/shoroukelkobrsi.com/src/app/(payload)/api/[...slug]/route.ts

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

# apps/shoroukelkobrsi.com/src/app/(payload)/api/graphql/route.ts

```ts
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY it because it could be re-written at any time. */
import config from "@payload-config";
import { GRAPHQL_POST } from "@payloadcms/next/routes";

export const POST = GRAPHQL_POST(config);

```

# apps/nextjs-playground/src/app/(payload)/admin/[[...segments]]/page.tsx

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

# apps/nextjs-playground/src/app/(payload)/admin/[[...segments]]/not-found.tsx

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

# apps/nextjs-playground/src/app/(payload)/api/graphql-playground/route.ts

```ts
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY it because it could be re-written at any time. */
import config from "@payload-config";
import { GRAPHQL_PLAYGROUND_GET } from "@payloadcms/next/routes";

export const GET = GRAPHQL_PLAYGROUND_GET(config);

```

# apps/nextjs-playground/src/app/(payload)/api/graphql/route.ts

```ts
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY it because it could be re-written at any time. */
import config from "@payload-config";
import { GRAPHQL_POST } from "@payloadcms/next/routes";

export const POST = GRAPHQL_POST(config);

```

# apps/nextjs-playground/src/app/(payload)/api/[...slug]/route.ts

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

