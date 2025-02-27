import DeleteUserButton from "./components/delete-user-button";
import SignOutButton from "./components/sign-out-button";
import UserInfo from "./components/user-info";

export default function Account() {
  return (
    <div className="p-4 mt-4">
      <h1 className="ml-4 text-2xl">Conta</h1>
      <div className="flex flex-col border rounded-3xl m-4 p-4">
        <UserInfo />
        <div className="flex flex-col py-2">
          <DeleteUserButton />
          <hr className="w-5/6 my-2" />
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
