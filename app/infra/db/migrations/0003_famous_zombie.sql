CREATE TYPE "public"."status" AS ENUM('error', 'pending', 'done');--> statement-breakpoint
ALTER TABLE "recipes" ALTER COLUMN "title" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "recipes" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "status" "status" DEFAULT 'pending';