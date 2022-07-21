import { useRawRequest } from "@simpleweb/open-format-react";
import ItemOverview from "components/item-overview";
import Skeleton from "components/skeletonCard";
import StyledLink from "components/styled-link";
import { gql } from "graphql-request";
import getMetaValue from "helpers/get-meta-value";
import transformURL from "helpers/transform-url";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { RefObject, useEffect, useRef, useState } from "react";
import ReactTooltip from "react-tooltip";

type Token = {
  id: string;
  creator: {
    id: string;
  };
  properties: Property[];
};

export default function Releases() {
  const [isMounted, setIsMounted] = useState(false); // Need this for the react-tooltip
  const [tooltip, showTooltip] = useState(false);
  const { t } = useTranslation("common");
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const rawQuery = gql`
    query ($factory_id: String!) {
      tokens(where: { factory_id: $factory_id }) {
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

  const { data: historicTokens, isLoading } = useRawRequest({
    query: rawQuery,
    variables: { factory_id: process.env.NEXT_PUBLIC_FACTORY_ID as string },
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

  const navigation = [
    {
      name: t("explore.navigation.itemOne.name"),
      value: t("explore.navigation.itemOne.value"),
    },
    {
      name: t("explore.navigation.itemTwo.name"),
      value: t("explore.navigation.itemTwo.value"),
    },
    {
      name: t("explore.navigation.itemThree.name"),
      value: t("explore.navigation.itemThree.value"),
    },
    {
      name: t("explore.navigation.itemFour.name"),
      value: t("explore.navigation.itemFour.value"),
    },
    {
      name: t("explore.navigation.itemFive.name"),
      value: t("explore.navigation.itemFive.value"),
    },
    {
      name: t("explore.navigation.itemSix.name"),
      value: t("explore.navigation.itemSix.value"),
    },
    {
      name: t("explore.navigation.itemSeven.name"),
      value: t("explore.navigation.itemSeven.value"),
    },
    {
      name: t("explore.navigation.itemEight.name"),
      value: t("explore.navigation.itemEight.value"),
    },
  ];

  const count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
        <nav aria-label="Top">
          <div className="w-full py-6 flex items-center justify-center">
            <div className="flex items-center">
              <div className="hidden space-x-8 lg:block">
                {navigation.map((link) => (
                  <StyledLink
                    key={link.name}
                    href={""}
                    data-for={"categories"}
                    data-tip={t("tooltip.message")}
                    disabled={true}
                    className="cursor-not-allowed text-base font-medium text-slate-500 hover:text-slate-900"
                    onMouseEnter={() => showTooltip(true)}
                    onMouseLeave={() => {
                      showTooltip(false);
                      setTimeout(() => showTooltip(true), 100);
                    }}
                  >
                    {link.name}
                  </StyledLink>
                ))}
              </div>
            </div>
          </div>
          {isMounted && tooltip && (
            <ReactTooltip
              id={"categories"}
              effect={"solid"}
              type={"dark"}
              place={"bottom"}
            />
          )}
          <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
            {navigation.map((link) => (
              <StyledLink
                key={link.name}
                href={""}
                data-for={"categories-mobile"}
                data-tip={t("tooltip.message")}
                disabled={true}
                onMouseEnter={() => showTooltip(true)}
                onMouseLeave={() => {
                  showTooltip(false);
                  setTimeout(() => showTooltip(true), 100);
                }}
                className="cursor-not-allowed text-base font-medium text-slate-500 hover:text-slate-700"
              >
                {link.name}
              </StyledLink>
            ))}
          </div>
          {isMounted && tooltip && (
            <ReactTooltip
              id={"categories-mobile"}
              effect={"solid"}
              type={"dark"}
              place={"bottom"}
            />
          )}
          <hr className="divide-y"></hr>
        </nav>
        <div className="mt-12 px-6 grid grid-cols-1 gap-y-10 gap-x-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-y-4">
          {!isLoading ? (
            historicTokens.tokens.map((token: Token) => {
              return renderToken(token);
            })
          ) : (
            <>
              {count.map((val) => (
                <Skeleton key={val} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
