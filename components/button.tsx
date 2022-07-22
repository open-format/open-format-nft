import React from "react";
import classNames from "classnames";

type variant = "solid" | "outline";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: variant;
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}

export const BASE = "";

export const VARIANTS = {
  solid: "",
  outline: "",
};

const Button: React.FC<ButtonProps> = ({
  variant = "solid",
  children,
  disabled,
  isLoading,
  ...rest
}) => {
  return (
    <button
      {...rest}
      disabled={isLoading || disabled}
      className={classNames(BASE, VARIANTS[variant], rest.className)}
    >
      {children}
    </button>
  );
};

export default Button;
