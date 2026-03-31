import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  className?: string;
};

export default function Button({
  children,
  onClick,
  size = "md",
  variant = "secondary",
  className = "",
}: ButtonProps) {

  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantStyles = {
    primary: "bg-[#A4BE7B] border-[2px] border-[#201E1F] text-black",
    secondary: "bg-[#423C3C] border-[2px] border-[#201E1F] text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`
      ${sizeStyles[size]}
      ${variantStyles[variant]}
      shadow-[3px_3px_0px_#201E1F] hover:cursor-pointer
      active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
      transition-all duration-100
      ${className}`}
    >
      {children}
    </button>
  )
}