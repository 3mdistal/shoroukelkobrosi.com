import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DO $$ BEGIN
 CREATE TYPE "enum_films_aspect_ratio" AS ENUM('4:3', '5:4', '16:9', '2.35:1', '9:16');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "films_prizes" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"prize" varchar
);

CREATE TABLE IF NOT EXISTS "films_stills" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"image_id" integer NOT NULL,
	"featured" boolean
);

CREATE TABLE IF NOT EXISTS "films" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"date" timestamp(3) with time zone NOT NULL,
	"trailer" varchar,
	"director" varchar,
	"producer" varchar,
	"format" varchar,
	"imdb_link" varchar,
	"aspectRatio" "enum_films_aspect_ratio",
	"display_on_homepage" boolean,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "stills" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" timestamp(3) with time zone NOT NULL,
	"location" varchar NOT NULL,
	"format" varchar,
	"image_id" integer NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "films_prizes_order_idx" ON "films_prizes" ("_order");
CREATE INDEX IF NOT EXISTS "films_prizes_parent_id_idx" ON "films_prizes" ("_parent_id");
CREATE INDEX IF NOT EXISTS "films_stills_order_idx" ON "films_stills" ("_order");
CREATE INDEX IF NOT EXISTS "films_stills_parent_id_idx" ON "films_stills" ("_parent_id");
CREATE INDEX IF NOT EXISTS "films_created_at_idx" ON "films" ("created_at");
CREATE INDEX IF NOT EXISTS "stills_created_at_idx" ON "stills" ("created_at");
DO $$ BEGIN
 ALTER TABLE "films_prizes" ADD CONSTRAINT "films_prizes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "films"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "films_stills" ADD CONSTRAINT "films_stills_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "films_stills" ADD CONSTRAINT "films_stills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "films"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "stills" ADD CONSTRAINT "stills_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`)
};

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DROP TABLE "films_prizes";
DROP TABLE "films_stills";
DROP TABLE "films";
DROP TABLE "stills";`)
};
