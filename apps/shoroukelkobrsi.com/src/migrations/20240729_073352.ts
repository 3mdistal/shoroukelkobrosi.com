import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
await db.execute(sql`
 DO $$ BEGIN
 CREATE TYPE "enum_users_role" AS ENUM('admin', 'editor');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "users" ADD COLUMN "role" "enum_users_role";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
await db.execute(sql`
 ALTER TABLE "users" DROP COLUMN IF EXISTS "role";`)
}
