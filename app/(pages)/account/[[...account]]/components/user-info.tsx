import { getCurrentUser } from "@/services/clerk";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function UserInfo() {
  const { user } = await getCurrentUser({ allData: true });

  if (!user) return null;

  return (
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
  );
}