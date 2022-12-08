import { useRawRequest } from "@simpleweb/open-format-react";
import classNames from "classnames";
import ItemOverview from "components/item-overview";
import { gql } from "graphql-request";
import getMetaValue from "helpers/get-meta-value";
import transformURL from "helpers/transform-url";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CATEGORIES } from "../../constants";

export default function Releases() {
  const [categoryIndex, setCategoryIndex] = useState<number>(0);
  const { t } = useTranslation("common");
  const { push } = useRouter();

  const rawQuery = gql`
    query ($factory_id: String!, $releaseType: String) {
      tokens(
        where: {
          factory_id: $factory_id
          release_type_contains_nocase: $releaseType
        }
      ) {
        id
        creator {
          id
        }
        properties {
          key
          value
        }
      }
    }
  `;

  const {
    data: historicTokens,
    isLoading,
    refetch,
  } = useRawRequest<HistoricTokens, Error>({
    query: rawQuery,
    variables: {
      factory_id: process.env.NEXT_PUBLIC_FACTORY_ID as string,
      releaseType: categoryIndex !== 0 ? CATEGORIES[categoryIndex] : "",
    },
  });

  function renderToken(token: Token) {
    const description = getMetaValue(token.properties, "description") as string;

    const name = getMetaValue(token.properties, "name") as string;
    const image = transformURL(
      getMetaValue(token.properties, "image") as string
    ) as string;

    const creator = token.creator.id as string;
    const tokenId = token.id;

    return (
      <ItemOverview
        key={`${tokenId}${name}`}
        {...{
          name,
          image,
          description,
          creator,
          tokenId,
        }}
      />
    );
  }

  function renderPlaceholders() {
    return Array.from({ length: 12 }).map((_, index) => (
      <ItemOverview.Loading key={`skeleton-${index}`} />
    ));
  }

  useEffect(() => {
    refetch();
  }, [categoryIndex]);

  function handleCategoryChange(index: number) {
    setCategoryIndex(index);
  }

  const noResults = historicTokens && !historicTokens.tokens.length;

  return (
    <>
      <Head>
        <title>{t("explore.head.title")}</title>
      </Head>
      <div>
        <div className=" my-12 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
              {t("explore.title")}
            </h1>
          </div>
        </div>
        <nav>
          <ul className="flex justify-between w-[50%] mx-auto">
            {CATEGORIES.map((type, i) => (
              <li
                className={classNames(
                  { "text-blue-500": categoryIndex === i },
                  "font-semibold cursor-pointer hover:text-gray-500"
                )}
                key={i}
                onClick={() => handleCategoryChange(i)}
              >
                {type}
              </li>
            ))}
          </ul>
        </nav>
        {noResults ? (
          <div className="flex m-5 items-center justify-center flex-col space-y-5">
            <div className="flex flex-col justify-center items-center">
              <span className="text-2xl font-bold">
                {t("explore.notFound.title")}
              </span>
              <span>{t("explore.notFound.subtitle")}</span>
            </div>
            <button
              onClick={() => push("/create")}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
"
            >
              {t("create.title")}
            </button>
          </div>
        ) : (
          <div className="mt-12 px-6 grid grid-cols-1 gap-y-10 gap-x-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-y-4">
            {!isLoading
              ? historicTokens?.tokens.map((token: Token) => {
                  return renderToken(token);
                })
              : renderPlaceholders()}
          </div>
        )}
      </div>
    </>
  );
}
