"use client";
import { ActionButton } from "@/components/ActionButton";
import SignOutIcon from "@/components/icons/sign-out";
import TrashIcon from "@/components/icons/trash";
import { deleteUser } from "@/services/clerk";
import { useClerk } from "@clerk/nextjs";
import React from "react";

const Account: React.FC = () => {
  const { signOut, user } = useClerk();

  const handleSignOut = async (): Promise<{
    error: boolean;
    message: string;
  }> => {
    try {
      await signOut();
      return { error: false, message: "Signed out successfully" };
    } catch (error) {
      console.error(error);
      return { error: true, message: "Failed to sign out" };
    }
  };

  const handleDeleteUser = async (): Promise<{
    error: boolean;
    message: string;
  }> => {
    const userId = user.id;
    if (!userId) {
      return { error: true, message: "Usuário não encontrado" };
    }
    await deleteUser(userId);
    return { error: false, message: "Usuário deletado" };
  };

  return (
    <>
      <div className="p-4 mt-4">
        <h1 className="ml-4 text-2xl">Conta</h1>
        <div className="flex flex-col border rounded-3xl m-4 p-4">
          <div className="flex flex-row">
            <img
              className="rounded-full"
              src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ydE5HeGduOHF6dG1lRVdqSHJOWm43N3FUUDEifQ?width=80"
              alt=""
            />
            <div className="ml-4 flex flex-col">
              <h1>Yago Cunha</h1>
              <p className="text-gray font-semibold text-sm">
                yago.cunha123@gmail.com
              </p>
            </div>
          </div>
          <div className="flex flex-col py-2">
            <ActionButton
              action={handleDeleteUser}
              requireAreYouSure
              variant="ghost"
              className="flex flex-row justify-between py-4"
            >
              <h2>Deletar Conta</h2>
              <TrashIcon />
            </ActionButton>
            <hr className="w-5/6 my-2" />
            <button
              onClick={handleSignOut}
              className="flex flex-row justify-between px-3 py-1"
            >
              <h2>Sign out</h2>
              <SignOutIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
