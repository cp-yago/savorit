import { deleteUserDb } from "@/features/users/db/users";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

type DeleteUserParams = {
  id: string;
};

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<DeleteUserParams> },
) {
  try {
    const { id: clerkUserId } = await params;

    if (!clerkUserId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    await deleteUserDb({ clerkUserId });

    const client = await clerkClient();
    await client.users.deleteUser(clerkUserId);

    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error deleting user" });
  }
}
