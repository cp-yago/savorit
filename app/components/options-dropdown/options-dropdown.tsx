"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OptionDialog } from "./option-dialog";
import { OptionItemComponent } from "./option-item";
import { OptionsDropdownProps } from "./types";
import { useOptionsDropdown } from "./use-options-dropdown";

export function OptionsDropdown({
  options,
  buttonLabel = "Opções",
  triggerButton,
  isDialogOpen: externalIsDialogOpen,
  setIsDialogOpen: externalSetIsDialogOpen,
  selectedOption: externalSelectedOption,
  setSelectedOption: externalSetSelectedOption,
}: OptionsDropdownProps) {
  const {
    isDropdownOpen,
    setIsDropdownOpen,
    selectedOptionItem,
    dialogOpen,
    handleOptionSelect,
    handleDialogClose,
  } = useOptionsDropdown({
    externalIsDialogOpen,
    externalSetIsDialogOpen,
    externalSelectedOption,
    externalSetSelectedOption,
    options,
  });

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

      <OptionDialog
        selectedOption={selectedOptionItem}
        isOpen={dialogOpen}
        onOpenChange={handleDialogClose}
      />
    </>
  );
} 