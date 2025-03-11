import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa";

type RoundButtonIconType = "plus" | "back";

const icons: Record<RoundButtonIconType, React.ReactNode> = {
  plus: <FaPlus />,
  back: <FaArrowLeft />,
};

interface RoundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: RoundButtonIconType;
}

export default function RoundButtonWithIcon({
  icon,
  className,
  ...props
}: RoundButtonProps) {
  return (
    <Button
      variant="ghost"
      className={`w-10 h-10 text-green-500 bg-white rounded-full flex items-center justify-center border-2 border-fog-gray hover-scale focus:outline-none focus:ring-0 focus:border-fog-gray ${className || ""}`}
      {...props}
    >
      {icons[icon]}
    </Button>
  );
}
