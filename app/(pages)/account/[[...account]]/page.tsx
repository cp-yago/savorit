import { ActionButton } from "@/components/ActionButton";
import SignOutIcon from "@/components/icons/sign-out";
import { TrashIcon } from "lucide-react";

export default function Account() {
  // const { signOut, user } = useClerk();

  // async function handleSignOut() {
  //   return
  // };

  return (
    // <Suspense fallback={<div>Loading...</div>}>
    //   <h1>Teste</h1>
    // </Suspense>
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
          <button
            // onClick={handleSignOut}
            className="flex flex-row justify-between px-3 py-1"
          >
            <h2>Sign out</h2>
            <SignOutIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
