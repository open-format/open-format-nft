import React from "react";
import LoadingSpinner from "./loading-spinner";

interface ButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  isLoading?: boolean;
  soldOut?: () => boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  soldOut,
  isLoading,
  ...rest
}) => {
  return (
    <button {...rest} disabled={isLoading || (soldOut && soldOut())}>
      {isLoading && !soldOut && <LoadingSpinner />}
      {children}
    </button>
  );
};

export default Button;
