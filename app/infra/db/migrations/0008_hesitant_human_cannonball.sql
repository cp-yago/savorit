CREATE TABLE "books_to_recipes" (
	"book_id" uuid NOT NULL,
	"recipe_id" uuid NOT NULL,
	CONSTRAINT "books_to_recipes_book_id_recipe_id_pk" PRIMARY KEY("book_id","recipe_id")
);
--> statement-breakpoint
CREATE TABLE "books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "books_to_recipes" ADD CONSTRAINT "books_to_recipes_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "books_to_recipes" ADD CONSTRAINT "books_to_recipes_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;