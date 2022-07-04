import React, { Dispatch, SetStateAction } from "react";
import StyledLink from "../styled-link/styled-link";

type NavItem = {
  name: string;
  href: string;
};

interface ExploreNavigationProps {
  navigation: NavItem[];
}

const ExploreNavigation: React.FC<ExploreNavigationProps> = ({
  navigation,
}) => {
  return (
    <nav aria-label="Top">
      <div className="w-full py-6 flex items-center justify-center">
        <div className="flex items-center">
          <a href="#">
            <span className="sr-only">Workflow</span>
          </a>
          <div className="hidden space-x-8 lg:block">
            {navigation.map((link) => (
              <StyledLink
                key={link.name}
                href={link.href}
                className="text-base font-medium text-slate-500 hover:text-slate-900"
              >
                {link.name}
              </StyledLink>
            ))}
          </div>
        </div>
      </div>
      <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
        {navigation.map((link) => (
          <StyledLink
            key={link.name}
            href={link.href}
            className="text-base font-medium text-slate-500 hover:text-slate-700"
          >
            {link.name}
          </StyledLink>
        ))}
      </div>
      <hr className="divide-y"></hr>
    </nav>
  );
};

export default ExploreNavigation;
