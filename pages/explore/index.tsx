import { useRawRequest } from "@simpleweb/open-format-react";
import { NextPage } from "next";
import { gql } from "graphql-request";
import Head from "next/head";
import ExploreCard from "../../components/cards/explore-card";
import ExploreNavigation from "../../components/navigations/explore-navigation";
import getMetaValue from "../../helpers/get-meta-value";
import transformURL from "../../helpers/transform-url";

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

const Releases: NextPage = () => {
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

  const { data: historicTokens } = useRawRequest({
    query: rawQuery,
    variables: { factory_id: process.env.NEXT_PUBLIC_FACTORY_ID as string },
  });

  type Token = {
    id: string;
    creator: {
      id: string;
    };
    properties: Property[];
  };

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
              Explore Collections.
            </h1>
          </div>
        </div>
        <ExploreNavigation {...{ navigation }} />
        <div className="mt-12 px-6 grid grid-cols-1 gap-y-10 gap-x-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-y-4">
          {historicTokens?.tokens.map((token: Token) => {
            const description = getMetaValue(
              token.properties,
              "description"
            ) as string;
            const name = getMetaValue(token.properties, "name") as string;
            const image = transformURL(
              getMetaValue(token.properties, "image") as string
            ) as string;
            const creator = token.creator.id as string;
            const tokenId = token.id;

            return (
              <ExploreCard
                {...{ tokenId }}
                key={token.id}
                {...{ description }}
                {...{ name }}
                {...{ creator }}
                {...{ image }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Releases;
