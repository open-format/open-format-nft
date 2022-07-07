import classNames from "classnames";
import Link from "next/link";
import { ReactNode } from "react";

interface StyledLinkProps extends React.HTMLProps<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  openInNewTab?: boolean;
}

export default function StyledLink({
  children,
  role,
  href,
  openInNewTab,
  ...rest
}: StyledLinkProps) {
  return (
    <Link {...{ href }}>
      <a
        {...rest}
        target={openInNewTab ? "_blank" : ""}
        rel={openInNewTab ? "noopener noreferrer" : ""}
      >
        {children}
      </a>
    </Link>
  );
}
