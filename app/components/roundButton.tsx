import React from "react";

const icons = {
  plus: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="green"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  ),
  x: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="green"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  ),
  back: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="green"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 18l-6-6 6-6"
      />
    </svg>
  ),
};

type RoundButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  icon: "plus" | "x" | "back";
};

const RoundButton: React.FC<RoundButtonProps> = ({ label, icon, className, ...props }) => {
  return (
    <button {...props} className={`rounded-full border-2 text-green p-2 flex items-center ${className || ""}`}>
      {icons[icon]}
      {label && <span>{label}</span>}
    </button>
  );
};

export default RoundButton;
