import React from "react";

interface InstagramIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const InstagramIcon: React.FC<InstagramIconProps> = ({
  width = 24,
  height = 24,
  fill = "currentColor",
  className = "w-6 h-6",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    className={className}
  >
    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm4.75-.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
  </svg>
);

export default InstagramIcon;
