import { ReactNode } from "react";

// Define the types of actions
export type OptionAction =
  | { type: "link"; href: string }
  | {
      type: "dialog";
      title: string;
      description: string;
      content: ReactNode;
      open?: boolean;
      onOpenChange?: (open: boolean) => void;
    }
  | { type: "action"; onClick: () => void };

export interface OptionItem {
  icon: ReactNode;
  label: string;
  action: OptionAction;
}

export interface OptionsDropdownProps {
  options: OptionItem[];
  triggerButton?: ReactNode;
  buttonLabel?: string;
  isDialogOpen?: boolean;
  setIsDialogOpen?: (open: boolean) => void;
  selectedOption?: string | null;
  setSelectedOption?: (option: string | null) => void;
}
