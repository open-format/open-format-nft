import React from "react";

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
      {children}
    </button>
  );
};

export default Button;
