import React from "react";
import LoadingSpinner from "./loading-spinner";

interface ButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  isLoading,
  ...rest
}) => {
  return (
    <button {...rest} disabled={isLoading || disabled}>
      {isLoading && <LoadingSpinner />}
      {children}
    </button>
  );
};

export default Button;
