import classNames from "classnames";
import React from "react";
import StyledLink from "../styled-link/styled-link";

type HeroIcon = (props: React.ComponentProps<"svg">) => JSX.Element;

type Action = {
  title: string;
  href: string;
  icon: HeroIcon;
  iconForeground: string;
  iconBackground: string;
  description: string;
};

interface GridListProps {
  actions: Action[];
}

const GridList: React.FC<GridListProps> = ({ actions }) => {
  return (
    <div className=" mt-24 px-4 py-4 mx-auto max-w-7xl">
      <h1 className="m-4 p-12 text-4xl text-center">
        Create, release, monitise and analyse your NFT collections
      </h1>
      <div className="rounded-lg bg-gray-200 overflow-hidden  sm:grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 sm:gap-px">
        {actions.map((action, actionIdx) => (
          <div
            key={action.title}
            className={classNames(
              actionIdx === 0
                ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                : "",
              actionIdx === 1 ? "sm:rounded-tr-lg" : "",
              actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
              actionIdx === actions.length - 1
                ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                : "",
              "relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500"
            )}
          >
            <div>
              <span
                className={classNames(
                  action.iconBackground,
                  action.iconForeground,
                  "rounded-lg inline-flex p-3 ring-4 ring-white"
                )}
              >
                <action.icon className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <StyledLink className="focus:outline-none" href={action.href}>
                  <span className="absolute inset-0" aria-hidden="true" />
                  {action.title}
                </StyledLink>
              </h3>
              <p className="mt-2 text-sm text-gray-500">{action.description}</p>
            </div>
            <span
              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridList;
