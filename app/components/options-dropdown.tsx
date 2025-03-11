"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";

// Define the types of actions
export type OptionAction =
  | { type: "link"; href: string }
  | {
      type: "dialog";
      title: string;
      description: string;
      content: React.ReactNode;
    }
  | { type: "action"; onClick: () => void };

export interface OptionItem {
  icon: React.ReactNode;
  label: string;
  action: OptionAction;
}

interface OptionsDropdownProps {
  options: OptionItem[];
  triggerButton?: React.ReactNode;
  buttonLabel?: string;
  dialogOpen?: boolean;
  setDialogOpen?: (open: boolean) => void;
}

function OptionItemComponent({
  icon,
  label,
  action,
  onSelect,
}: OptionItem & { onSelect: () => void }) {
  // For direct actions, just execute the onClick
  if ("onClick" in action) {
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

  // For links, use Next.js Link
  if ("href" in action) {
    return (
      <DropdownMenuItem asChild className="focus:bg-gray-50">
        <Link
          href={action.href}
          className="flex items-center justify-between gap-3 px-3 py-2.5 cursor-pointer rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        >
          <span>{label}</span>
          {icon}
        </Link>
      </DropdownMenuItem>
    );
  }

  // For dialog actions, we'll handle this in the parent component
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

export function OptionsDropdown({
  options,
  buttonLabel = "Opções",
  triggerButton,
  dialogOpen,
  setDialogOpen,
}: OptionsDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOptionSelect = (option: OptionItem) => {
    if ("content" in option.action) {
      setSelectedOption(option);
      if (setDialogOpen) {
        setDialogOpen(true);
      } else {
        setIsDialogOpen(true);
      }
      setIsDropdownOpen(false);
    }
  };

  const handleDialogClose = () => {
    if (setDialogOpen) {
      setDialogOpen(false);
    } else {
      setIsDialogOpen(false);
    }
    setSelectedOption(null);
  };

  // Use the external state if provided, otherwise use internal state
  const dialogIsOpen = dialogOpen !== undefined ? dialogOpen : isDialogOpen;

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          {triggerButton || (
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 font-medium text-gray-800 hover:bg-gray-100 rounded-full"
            >
              {buttonLabel}
            </Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 rounded-xl mt-2 p-1 border border-gray-200 bg-white shadow-lg animate-in fade-in-80 zoom-in-95 z-50"
        >
          <div className="border-b border-gray-100 pb-1 mb-1">
            <div className="px-3 py-2 text-sm font-medium text-gray-800">
              {buttonLabel}
            </div>
          </div>
          {options.map((option) => (
            <OptionItemComponent
              key={option.label}
              {...option}
              onSelect={() => handleOptionSelect(option)}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedOption && "content" in selectedOption.action && (
        <Dialog open={dialogIsOpen} onOpenChange={handleDialogClose}>
          <DialogContent className="sm:max-w-[425px] bg-soft-peach border-fog-gray">
            <DialogHeader>
              <DialogTitle className="font-bold">
                {selectedOption.action.title || selectedOption.label}
              </DialogTitle>
              <DialogDescription className="text-gray">
                {selectedOption.action.description || "Realize a ação desejada"}
              </DialogDescription>
            </DialogHeader>
            {selectedOption.action.content}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
