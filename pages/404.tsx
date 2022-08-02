import StyledLink from "components/styled-link";
import useTranslation from "next-translate/useTranslation";
import React from "react";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-48 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-blue-500 sm:text-5xl">
            {t("four0four.title")}
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                {t("four0four.subTitle")}
              </h1>
              <p className="mt-1 text-base text-gray-500">
                {t("four0four.pointerText")}
              </p>
            </div>
            <div className="py-16 w-full sm:mx-auto sm:max-w-lg lg:ml-0">
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <StyledLink
                    href="/explore"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    {t("hero.ctaPrimary")}
                  </StyledLink>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <StyledLink
                    href="/create"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    {t("hero.ctaSecondary")}
                  </StyledLink>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
