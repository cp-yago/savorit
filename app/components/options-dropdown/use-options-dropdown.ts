import { useState } from "react";
import { OptionItem } from "./types";

interface UseOptionsDropdownProps {
  externalIsDialogOpen?: boolean;
  externalSetIsDialogOpen?: (open: boolean) => void;
  externalSelectedOption?: string | null;
  externalSetSelectedOption?: (option: string | null) => void;
  options: OptionItem[];
}

export function useOptionsDropdown({
  externalIsDialogOpen,
  externalSetIsDialogOpen,
  externalSelectedOption,
  externalSetSelectedOption,
  options,
}: UseOptionsDropdownProps) {
  // Internal state for when external state is not provided
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [internalSelectedOption, setInternalSelectedOption] =
    useState<OptionItem | null>(null);
  const [internalIsDialogOpen, setInternalIsDialogOpen] = useState(false);

  // Use external state if provided, otherwise use internal state
  const dialogOpen =
    externalIsDialogOpen !== undefined
      ? externalIsDialogOpen
      : internalIsDialogOpen;
  const setDialogOpen = externalSetIsDialogOpen || setInternalIsDialogOpen;

  // Find the selected option item based on the selected option label
  const selectedOptionItem = externalSelectedOption
    ? options.find((option) => option.label === externalSelectedOption) || null
    : internalSelectedOption;

  // Set the selected option item, using external state if provided
  const setSelectedOptionItem = (option: OptionItem | null) => {
    if (externalSetSelectedOption) {
      externalSetSelectedOption(option ? option.label : null);
    } else {
      setInternalSelectedOption(option);
    }
  };

  // Handle option selection
  const handleOptionSelect = (option: OptionItem) => {
    if ("content" in option.action) {
      setSelectedOptionItem(option);
      setDialogOpen(true);
      setIsDropdownOpen(false);
    } else if ("onClick" in option.action) {
      option.action.onClick();
      setIsDropdownOpen(false);
    }
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedOptionItem(null);
  };

  return {
    isDropdownOpen,
    setIsDropdownOpen,
    selectedOptionItem,
    dialogOpen,
    handleOptionSelect,
    handleDialogClose,
  };
}
