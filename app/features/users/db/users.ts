import { db } from "@/infra/db";
import { InsertUser, UsersTable } from "@/infra/db/schema";
import { eq } from "drizzle-orm";

export async function createUserDb(data: InsertUser) {
  const [newUser] = await db
    .insert(UsersTable)
    .values(data)
    .returning()
    .onConflictDoUpdate({
      target: [UsersTable.clerkUserId],
      set: data,
    });

  if (newUser == null) throw new Error("Failed to create user");
  return newUser;
}

export async function updateUserDb(
  { clerkUserId }: { clerkUserId: string },
  data: Partial<typeof UsersTable.$inferInsert>,
) {
  const [updatedUser] = await db
    .update(UsersTable)
    .set(data)
    .where(eq(UsersTable.clerkUserId, clerkUserId))
    .returning();

  if (updatedUser == null) throw new Error("Failed to update user");

  return updatedUser;
}

export async function deleteUserDb({ clerkUserId }: { clerkUserId: string }) {
  const [deletedUser] = await db
    .update(UsersTable)
    .set({
      deletedAt: new Date(),
      email: "redacted@deleted.com",
      name: "Deleted User",
      clerkUserId: "deleted",
      imageUrl: null,
    })
    .where(eq(UsersTable.clerkUserId, clerkUserId))
    .returning();

  if (deletedUser == null) throw new Error("Failed to delete user");

  return deletedUser;
}
