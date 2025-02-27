"use client";

import { ActionButton } from "@/components/ActionButton";
import { useAuth, useClerk } from "@clerk/nextjs";
import { TrashIcon } from "lucide-react";

export default function DeleteUserButton() {
  const { userId } = useAuth();
  const { signOut } = useClerk();

  if (!userId) return null;

  async function handleDeleteUser() {
    try {
      console.log("deleting user", userId);

      const response = await fetch(`/api/v1/users/${userId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      console.log("data", data);

      signOut({
        redirectUrl: "/sign-in",
        sessionId: "*",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  return (
    <ActionButton
      action={handleDeleteUser}
      requireAreYouSure
      variant="ghost"
      className="flex flex-row justify-between py-4 transition-transform duration-200 ease-in-out hover:scale-101 cursor-pointer"
    >
      <h2>Deletar Conta</h2>
      <TrashIcon />
    </ActionButton>
  );
}
