"use server";
import { getUserIdTag } from "@/features/users/db/cache";
import { createUserDb } from "@/features/users/db/users";
import { db } from "@/infra/db";
import { InsertUser, UsersTable } from "@/infra/db/schema";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { redirect } from "next/navigation";

const client = await clerkClient();

export async function deleteUser(userId: string): Promise<void> {
  await client.users.deleteUser(userId);
}

export async function syncUsers() {
  const user = await currentUser();

  if (user == null) return new Response("User not found", { status: 500 });
  if (user.fullName == null) {
    return new Response("User name missing", { status: 500 });
  }
  if (user.primaryEmailAddress?.emailAddress == null) {
    return new Response("User email missing", { status: 500 });
  }

  const dbUser = await createUserDb({
    clerkUserId: user.id,
    name: user.fullName,
    email: user.primaryEmailAddress.emailAddress,
    imageUrl: user.imageUrl,
  });

  const userSyncedClerk = await syncClerkUserMetadata(dbUser);
  console.log("RODOU syncClerkUserMetadata", userSyncedClerk);

  const { userId, sessionClaims } = await auth();
  console.log("RODOU syncUsers auth finalll", { userId, sessionClaims });
}

export async function getCurrentUser({ allData = false } = {}) {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  if (userId != null && sessionClaims.dbId == null) {
    redirect("/api/v1/clerk/syncUsers");
  }

  return {
    clerkUserId: userId,
    userId: sessionClaims?.dbId,
    user:
      allData && sessionClaims?.dbId != null
        ? await getUser(sessionClaims.dbId)
        : undefined,
    redirectToSignIn,
  };
}

export async function syncClerkUserMetadata(user: InsertUser) {
  return client.users.updateUserMetadata(user.clerkUserId, {
    publicMetadata: {
      dbId: user.id,
    },
  });
}

async function getUser(id: string) {
  "use cache";
  cacheTag(getUserIdTag(id));
  console.log("Called");

  return db.query.UsersTable.findFirst({
    where: eq(UsersTable.id, id),
  });
}
