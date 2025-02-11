import * as React from "react";

import { cn } from "app/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
}

function Input({ className, type, icon, ...props }: InputProps) {
  return (
    <div className="relative flex-auto">
      {icon && (
        <span className="flex items-center justify-center text-gray-500 pointer-events-none absolute inset-y-0 left-0 h-full w-10">
          {icon}
        </span>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "pl-10 border-input flex h-9 w-full min-w-0 rounded-full border bg-white pr-3 py-1 text-base shadow-xs",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
