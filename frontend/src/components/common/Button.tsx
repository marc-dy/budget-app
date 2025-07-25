import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, variant = "primary", ...props }: ButtonProps) => {
  const baseStyles =
    "rounded px-4 py-2 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-300 hover:bg-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${
        props.className || ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
