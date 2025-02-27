import { ActionButton } from "@/components/ActionButton";
import { TrashIcon } from "lucide-react";
import SignOutButton from "./components/sign-out-button";

export default function Account() {
  return (
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
            // action={handleDeleteUser}
            requireAreYouSure
            variant="ghost"
            className="flex flex-row justify-between py-4"
          >
            <h2>Deletar Conta</h2>
            <TrashIcon />
          </ActionButton>
          <hr className="w-5/6 my-2" />
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
