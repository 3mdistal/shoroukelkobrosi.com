import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
await db.execute(sql`
 DROP TABLE "_homepage_v";
DROP TABLE "_homepage_v_rels";
DROP INDEX IF EXISTS "homepage__status_idx";
ALTER TABLE "homepage" DROP COLUMN IF EXISTS "_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
await db.execute(sql`
 DO $$ BEGIN
 CREATE TYPE "enum_homepage_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__homepage_v_version_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "_homepage_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version__status" "enum__homepage_v_version_status",
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean,
	"autosave" boolean
);

CREATE TABLE IF NOT EXISTS "_homepage_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"films_id" integer
);

ALTER TABLE "homepage" ADD COLUMN "_status" "enum_homepage_status";
CREATE INDEX IF NOT EXISTS "_homepage_v_version_version__status_idx" ON "_homepage_v" ("version__status");
CREATE INDEX IF NOT EXISTS "_homepage_v_latest_idx" ON "_homepage_v" ("latest");
CREATE INDEX IF NOT EXISTS "_homepage_v_autosave_idx" ON "_homepage_v" ("autosave");
CREATE INDEX IF NOT EXISTS "_homepage_v_rels_order_idx" ON "_homepage_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "_homepage_v_rels_parent_idx" ON "_homepage_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "_homepage_v_rels_path_idx" ON "_homepage_v_rels" ("path");
CREATE INDEX IF NOT EXISTS "homepage__status_idx" ON "homepage" ("_status");
DO $$ BEGIN
 ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_films_fk" FOREIGN KEY ("films_id") REFERENCES "films"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`)
}
