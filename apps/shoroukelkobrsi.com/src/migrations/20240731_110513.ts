import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
await db.execute(sql`
 DO $$ BEGIN
 CREATE TYPE "enum__films_v_version_aspect_ratio" AS ENUM('4:3', '5:4', '16:9', '2.35:1', '9:16');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "_films_v_version_prizes" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"prize" varchar,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_films_v_version_stills" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"image_id" integer NOT NULL,
	"featured" boolean,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_films_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_title" varchar NOT NULL,
	"version_slug" varchar NOT NULL,
	"version_date" timestamp(3) with time zone NOT NULL,
	"version_trailer" varchar,
	"version_director" varchar,
	"version_producer" varchar,
	"version_format" varchar,
	"version_imdb_link" varchar,
	"version_aspectRatio" "enum__films_v_version_aspect_ratio",
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "_stills_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_date" timestamp(3) with time zone NOT NULL,
	"version_location" varchar NOT NULL,
	"version_format" varchar,
	"version_image_id" integer NOT NULL,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "_homepage_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "_homepage_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"films_id" integer
);

CREATE INDEX IF NOT EXISTS "_films_v_version_prizes_order_idx" ON "_films_v_version_prizes" ("_order");
CREATE INDEX IF NOT EXISTS "_films_v_version_prizes_parent_id_idx" ON "_films_v_version_prizes" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_films_v_version_stills_order_idx" ON "_films_v_version_stills" ("_order");
CREATE INDEX IF NOT EXISTS "_films_v_version_stills_parent_id_idx" ON "_films_v_version_stills" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_films_v_version_version_created_at_idx" ON "_films_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_films_v_created_at_idx" ON "_films_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_films_v_updated_at_idx" ON "_films_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "_stills_v_version_version_created_at_idx" ON "_stills_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_stills_v_created_at_idx" ON "_stills_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_stills_v_updated_at_idx" ON "_stills_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "_homepage_v_rels_order_idx" ON "_homepage_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "_homepage_v_rels_parent_idx" ON "_homepage_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "_homepage_v_rels_path_idx" ON "_homepage_v_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "_films_v_version_prizes" ADD CONSTRAINT "_films_v_version_prizes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_films_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_films_v_version_stills" ADD CONSTRAINT "_films_v_version_stills_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_films_v_version_stills" ADD CONSTRAINT "_films_v_version_stills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_films_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_films_v" ADD CONSTRAINT "_films_v_parent_id_films_id_fk" FOREIGN KEY ("parent_id") REFERENCES "films"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_stills_v" ADD CONSTRAINT "_stills_v_parent_id_stills_id_fk" FOREIGN KEY ("parent_id") REFERENCES "stills"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_stills_v" ADD CONSTRAINT "_stills_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

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

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
await db.execute(sql`
 DROP TABLE "_films_v_version_prizes";
DROP TABLE "_films_v_version_stills";
DROP TABLE "_films_v";
DROP TABLE "_stills_v";
DROP TABLE "_homepage_v";
DROP TABLE "_homepage_v_rels";`)
}
