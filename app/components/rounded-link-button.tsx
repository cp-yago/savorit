import Link from "next/link";
import BackIcon from "./icons/back-icon";
import PlusIcon from "./icons/plus";
import XIcon from "./icons/x-icon";

const icons = {
  plus: <PlusIcon />,
  x: <XIcon />,
  back: <BackIcon />,
};

interface RoundedLinkButtonProps {
  icon: "plus" | "x" | "back";
  pathOrUrl: string;
  label?: string;
  className?: string;
}

export default function RoundedLinkButton({
  label,
  icon,
  pathOrUrl,
  className,
}: RoundedLinkButtonProps) {
  return (
    <Link
      href={pathOrUrl}
      className={`${className} rounded-full bg-white border-2 text-green p-2 flex items-center shadow-md transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer`}
    >
      {icons[icon]}
      {label && <span>{label}</span>}
    </Link>
  );
}
