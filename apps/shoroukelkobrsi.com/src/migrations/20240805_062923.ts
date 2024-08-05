import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
await db.execute(sql`
 DO $$ BEGIN
 CREATE TYPE "enum_users_role" AS ENUM('admin', 'editor');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_films_aspect_ratio" AS ENUM('4:3', '5:4', '16:9', '2.35:1', '9:16');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__films_v_version_aspect_ratio" AS ENUM('4:3', '5:4', '16:9', '2.35:1', '9:16');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" "enum_users_role",
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

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
	"slug" varchar NOT NULL,
	"date" timestamp(3) with time zone NOT NULL,
	"trailer" varchar,
	"director" varchar,
	"producer" varchar,
	"format" varchar,
	"imdb_link" varchar,
	"aspectRatio" "enum_films_aspect_ratio",
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

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

CREATE TABLE IF NOT EXISTS "stills" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" timestamp(3) with time zone NOT NULL,
	"location" varchar NOT NULL,
	"format" varchar,
	"image_id" integer NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
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

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"thumbnail_u_r_l" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "homepage" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "homepage_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"films_id" integer
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

CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "films_prizes_order_idx" ON "films_prizes" ("_order");
CREATE INDEX IF NOT EXISTS "films_prizes_parent_id_idx" ON "films_prizes" ("_parent_id");
CREATE INDEX IF NOT EXISTS "films_stills_order_idx" ON "films_stills" ("_order");
CREATE INDEX IF NOT EXISTS "films_stills_parent_id_idx" ON "films_stills" ("_parent_id");
CREATE INDEX IF NOT EXISTS "films_created_at_idx" ON "films" ("created_at");
CREATE INDEX IF NOT EXISTS "_films_v_version_prizes_order_idx" ON "_films_v_version_prizes" ("_order");
CREATE INDEX IF NOT EXISTS "_films_v_version_prizes_parent_id_idx" ON "_films_v_version_prizes" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_films_v_version_stills_order_idx" ON "_films_v_version_stills" ("_order");
CREATE INDEX IF NOT EXISTS "_films_v_version_stills_parent_id_idx" ON "_films_v_version_stills" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_films_v_version_version_created_at_idx" ON "_films_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_films_v_created_at_idx" ON "_films_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_films_v_updated_at_idx" ON "_films_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "stills_created_at_idx" ON "stills" ("created_at");
CREATE INDEX IF NOT EXISTS "_stills_v_version_version_created_at_idx" ON "_stills_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_stills_v_created_at_idx" ON "_stills_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_stills_v_updated_at_idx" ON "_stills_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" ("filename");
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");
CREATE INDEX IF NOT EXISTS "homepage_rels_order_idx" ON "homepage_rels" ("order");
CREATE INDEX IF NOT EXISTS "homepage_rels_parent_idx" ON "homepage_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "homepage_rels_path_idx" ON "homepage_rels" ("path");
CREATE INDEX IF NOT EXISTS "_homepage_v_rels_order_idx" ON "_homepage_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "_homepage_v_rels_parent_idx" ON "_homepage_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "_homepage_v_rels_path_idx" ON "_homepage_v_rels" ("path");
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
 ALTER TABLE "stills" ADD CONSTRAINT "stills_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
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
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "homepage"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_films_fk" FOREIGN KEY ("films_id") REFERENCES "films"("id") ON DELETE cascade ON UPDATE no action;
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
 DROP TABLE "users";
DROP TABLE "films_prizes";
DROP TABLE "films_stills";
DROP TABLE "films";
DROP TABLE "_films_v_version_prizes";
DROP TABLE "_films_v_version_stills";
DROP TABLE "_films_v";
DROP TABLE "stills";
DROP TABLE "_stills_v";
DROP TABLE "media";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";
DROP TABLE "homepage";
DROP TABLE "homepage_rels";
DROP TABLE "_homepage_v";
DROP TABLE "_homepage_v_rels";`)
}
