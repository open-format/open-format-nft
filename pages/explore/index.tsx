import { useRawRequest } from "@simpleweb/open-format-react";
import ItemOverview from "components/item-overview";
import StyledLink from "components/styled-link";
import { gql } from "graphql-request";
import getMetaValue from "helpers/get-meta-value";
import transformURL from "helpers/transform-url";
import Head from "next/head";
import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";

type Token = {
  id: string;
  creator: {
    id: string;
  };
  properties: Property[];
};

const navigation = [
  { name: "Trending", href: "/" },
  { name: "Top", href: "/about" },
  { name: "Art", href: "/art" },
  { name: "Collectables", href: "/events" },
  { name: "Music", href: "/articles" },
  { name: "Photography", href: "/contribute-art" },
  { name: "Articles", href: "/contribute-audio" },
  { name: "Sports", href: "/contribute-event" },
];

export default function Releases() {
  const [isMounted, setIsMounted] = useState(false); // Need this for the react-tooltip
  const [tooltip, showTooltip] = useState(false);
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

  const {
    data: historicTokens,
    isFetchedAfterMount,
    isFetching,
    isFetched,
    isLoading,
  } = useRawRequest({
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
    // console.log({ isFetched });
    // console.log({ isFetchedAfterMount });
    // console.log({ isFetching });
    console.log({ isLoading });

    return (
      <ItemOverview
        key={`${tokenId}${name}`}
        {...{
          name,
          image,
          description,
          creator,
          tokenId,
          isFetched,
          isFetching,
          isFetchedAfterMount,
        }}
      />
    );
  }

  return (
    <>
      <Head>
        <title>Releases</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className=" my-12 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
              Explore Collections
            </h1>
          </div>
        </div>
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
                    href={""}
                    data-for={"categories"}
                    data-tip={"Coming soon"}
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
                data-tip={"Coming soon"}
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
          {historicTokens?.tokens.map((token: Token) => renderToken(token))}
        </div>
      </div>
    </>
  );
}
