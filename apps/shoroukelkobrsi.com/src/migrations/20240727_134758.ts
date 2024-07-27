import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
await db.execute(sql`
 ALTER TABLE "films" ADD COLUMN "slug" varchar;
ALTER TABLE "_films_v" ADD COLUMN "version_slug" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
await db.execute(sql`
 ALTER TABLE "films" DROP COLUMN IF EXISTS "slug";
ALTER TABLE "_films_v" DROP COLUMN IF EXISTS "version_slug";`)
}
