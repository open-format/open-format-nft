import classNames from "classnames";
import React from "react";
import StyledLink from "components/styled-link";
import useTranslation from "next-translate/useTranslation";

interface Props {
  actions: Action[];
}

export default function Features({ actions }: Props) {
  const { t } = useTranslation("common");
  return (
    <div className=" mt-24 px-4 py-4 mx-auto max-w-7xl">
      <h1 className="m-4 p-12 text-4xl text-center">{t("features.title")}</h1>
      <div className="sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 sm:gap-px">
        {actions.map((action) => (
          <div key={action.title} className="relative bg-white p-8">
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
              <h3 className="text-lg font-medium focus:outline-none">
                <div>
                  <span
                    className="absolute inset-0 shadow-md"
                    aria-hidden="true"
                  />
                  {action.title}
                </div>
              </h3>
              <p className="mt-2 text-sm text-gray-500">{action.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
