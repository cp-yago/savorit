"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OptionItem } from "./types";

interface OptionDialogProps {
  selectedOption: OptionItem | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OptionDialog({ selectedOption, isOpen, onOpenChange }: OptionDialogProps) {
  if (!selectedOption || !("content" in selectedOption.action)) {
    return null;
  }

  const { action } = selectedOption;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white border-fog-gray">
        <DialogHeader>
          <DialogTitle className="font-bold">
            {selectedOption.label}
          </DialogTitle>
          <DialogDescription className="text-gray">
            {action.description || "Realize a ação desejada"}
          </DialogDescription>
        </DialogHeader>
        {action.content}
      </DialogContent>
    </Dialog>
  );
} 