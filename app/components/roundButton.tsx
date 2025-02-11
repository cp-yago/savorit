import React from "react";

const icons = {
    plus: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="green" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

    ),
    x: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="green" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>

    ),
}

type RoundButtonProps = {
    label?: string;
    icon: "plus" | "x";
}

const RoundButton: React.FC<RoundButtonProps> = ({ label, icon }) => {
    return (
        <button className="rounded-full border-2 text-green p-2 flex items-center">
            {icons[icon]}
            <span>{label}</span>
        </button>
    );
}

export default RoundButton;