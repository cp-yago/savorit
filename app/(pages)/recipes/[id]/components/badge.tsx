import InstagramIcon from "@/components/icons/instagram";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface SocialMediaBadgeProps {
  sourceUrl?: string;
}

export default function SocialMediaBadge({ sourceUrl }: SocialMediaBadgeProps) {
  return (
    <Link href={sourceUrl || "#"} target="_blank">
      <Badge className="w-30 bg-soft-pink rounded-full border-1 border-black py-1 transition-transform duration-100 ease-in-out hover:scale-102 hover:shadow-lg cursor-pointer">
        <InstagramIcon />
        <span className="text-xsm">instagram.com</span>
      </Badge>
    </Link>
  );
}
