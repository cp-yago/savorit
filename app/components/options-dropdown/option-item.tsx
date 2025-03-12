"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { OptionItem } from "./types";

interface OptionItemComponentProps extends OptionItem {
  onSelect: () => void;
}

// Component for action items (onClick)
function ActionItem({ label, icon, action, onSelect }: OptionItemComponentProps) {
  if (!("onClick" in action)) return null;

  return (
    <DropdownMenuItem
      className="flex items-center justify-between gap-3 px-3 py-2.5 cursor-pointer rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
      onClick={() => {
        action.onClick();
        onSelect();
      }}
    >
      <span>{label}</span>
      {icon}
    </DropdownMenuItem>
  );
}

// Component for link items
function LinkItem({ label, icon, action, onSelect }: OptionItemComponentProps) {
  if (!("href" in action)) return null;

  return (
    <DropdownMenuItem asChild className="focus:bg-gray-50">
      <Link
        href={action.href}
        className="flex items-center justify-between gap-3 px-3 py-2.5 cursor-pointer rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        onClick={onSelect}
      >
        <span>{label}</span>
        {icon}
      </Link>
    </DropdownMenuItem>
  );
}

// Component for dialog items
function DialogItem({ label, icon, onSelect }: OptionItemComponentProps) {
  return (
    <DropdownMenuItem
      className="flex items-center justify-between gap-3 px-3 py-2.5 cursor-pointer rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-50"
      onClick={onSelect}
    >
      <span>{label}</span>
      {icon}
    </DropdownMenuItem>
  );
}

// Main component that renders the appropriate item based on action type
export function OptionItemComponent(props: OptionItemComponentProps) {
  const { action } = props;

  if ("onClick" in action) {
    return <ActionItem {...props} />;
  }

  if ("href" in action) {
    return <LinkItem {...props} />;
  }

  if ("content" in action) {
    return <DialogItem {...props} />;
  }

  return null;
} 