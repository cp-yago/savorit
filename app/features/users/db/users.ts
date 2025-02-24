import { db } from "@/infra/db";
import { InsertUser, UserTable } from "@/infra/db/schema";
import { eq } from "drizzle-orm";

export async function createUserDb(data: InsertUser) {
  const [newUser] = await db
    .insert(UserTable)
    .values(data)
    .returning()
    .onConflictDoUpdate({
      target: [UserTable.clerkUserId],
      set: data,
    });

  if (newUser == null) throw new Error("Failed to create user");
  return newUser;
}

export async function updateUserDb(
  { clerkUserId }: { clerkUserId: string },
  data: Partial<typeof UserTable.$inferInsert>,
) {
  const [updatedUser] = await db
    .update(UserTable)
    .set(data)
    .where(eq(UserTable.clerkUserId, clerkUserId))
    .returning();

  if (updatedUser == null) throw new Error("Failed to update user");

  return updatedUser;
}

export async function deleteUserDb({ clerkUserId }: { clerkUserId: string }) {
  const [deletedUser] = await db
    .update(UserTable)
    .set({
      deletedAt: new Date(),
      email: "redacted@deleted.com",
      name: "Deleted User",
      clerkUserId: "deleted",
      imageUrl: null,
    })
    .where(eq(UserTable.clerkUserId, clerkUserId))
    .returning();

  if (deletedUser == null) throw new Error("Failed to delete user");

  return deletedUser;
}
