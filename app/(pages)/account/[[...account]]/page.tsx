import { getCurrentUser } from "@/services/clerk";
import Image from "next/image";
import DeleteUserButton from "./components/delete-user-button";
import SignOutButton from "./components/sign-out-button";

export default async function Account() {
  const { user } = await getCurrentUser({ allData: true });
  if (!user) return;

  return (
    <div className="p-4 mt-4">
      <h1 className="ml-4 text-2xl">Conta</h1>
      <div className="flex flex-col border rounded-3xl m-4 p-4">
        <div className="flex flex-row">
          <Image
            src={user.imageUrl!}
            alt=""
            width={65}
            height={65}
            className="rounded-full"
          />
          <div className="ml-4 flex flex-col">
            <h1>{user.name}</h1>
            <p className="text-gray font-semibold text-sm">{user.email}</p>
          </div>
        </div>
        <div className="flex flex-col py-2">
          <DeleteUserButton />
          <hr className="w-5/6 my-2" />
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
