import PlusIcon from "@/components/icons/plus";
import Link from "next/link";

interface AddFirstCardProps {
  href: string;
  title: string;
}

export default function AddFirstCard({ href, title }: AddFirstCardProps) {
  return (
    <Link href={href} className="block">
      <div className="h-55 w-40 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-1 hover-scale">
        <div className="border-2 border-fog-gray rounded-full p-2 mb-2">
          <PlusIcon />
        </div>
        <h2 className="text-sm text-center break-all">{title}</h2>
      </div>
    </Link>
  );
}
