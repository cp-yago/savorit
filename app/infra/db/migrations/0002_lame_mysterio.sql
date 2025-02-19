ALTER TABLE "recipes" ADD COLUMN "image_url" varchar(255);--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "source_url" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "ingredients" json;--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "instructions" json;