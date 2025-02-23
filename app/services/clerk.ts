"use server";
import { clerkClient } from "@clerk/nextjs/server";

const client = await clerkClient();

export async function deleteUser(userId: string): Promise<void> {
  await client.users.deleteUser(userId);
}
