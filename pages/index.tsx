import {
  CurrencyDollarIcon,
  LightningBoltIcon,
  SearchCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { useRawRequest } from "@simpleweb/open-format-react";
import Features from "components/features";
import Hero from "components/hero";
import Resources from "components/resources";
import { gql } from "graphql-request";
import getMetaValue from "helpers/get-meta-value";
import transformURL from "helpers/transform-url";
import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";

const Home: NextPage = () => {
  const { t } = useTranslation("common");

  const actions = [
    {
      title: t("features.actionOne.title"),
      icon: LightningBoltIcon,
      iconForeground: "text-teal-700",
      iconBackground: "bg-teal-50",
      description: t("features.actionOne.description"),
    },
    {
      title: t("features.actionTwo.title"),
      icon: SearchCircleIcon,
      iconForeground: "text-purple-700",
      iconBackground: "bg-purple-50",
      description: t("features.actionTwo.description"),
    },
    {
      title: t("features.actionThree.title"),
      icon: UsersIcon,
      iconForeground: "text-sky-700",
      iconBackground: "bg-sky-50",
      description: t("features.actionThree.description"),
    },
    {
      title: t("features.actionFour.title"),
      icon: CurrencyDollarIcon,
      iconForeground: "text-yellow-700",
      iconBackground: "bg-yellow-50",
      description: t("features.actionFour.description"),
    },
  ];

  const resources = [
    {
      title: t("resources.resource.resourceOne.title"),
      href: t("resources.resource.resourceOne.href"),
      category: {
        name: t("resources.resource.resourceOne.category.name"),
        href: t("resources.resource.resourceOne.category.href"),
      },
      description: t("resources.resource.resourceOne.description"),
      imageUrl: t("resources.resource.resourceOne.imageUrl"),
      alt: t("resources.resource.resourceOne.alt"),
    },
    {
      title: t("resources.resource.resourceTwo.title"),
      href: t("resources.resource.resourceTwo.href"),
      category: {
        name: t("resources.resource.resourceTwo.category.name"),
        href: t("resources.resource.resourceTwo.category.href"),
      },
      description: t("resources.resource.resourceTwo.description"),
      imageUrl: t("resources.resource.resourceTwo.imageUrl"),
      alt: t("resources.resource.resourceTwo.alt"),
    },
  ];

  const token = process.env.NEXT_PUBLIC_EXAMPLE_NFT_TOKEN_ADDRESS as string;
  const rawQuery = gql`
    query ($tokenId: String!) {
      token(id: $tokenId) {
        id
        creator {
          id
        }
        saleData {
          totalSold
          maxSupply
        }
        properties {
          key
          value
        }
      }
    }
  `;

  // @TODO we will type all of this out correctly once the new version of the SDK is installed.

  const { data: exampleNft } = useRawRequest({
    query: rawQuery,
    variables: { tokenId: token as string },
  });

  const exampleNftToken = exampleNft?.token;
  const name = getMetaValue(exampleNftToken?.properties, "name") as string;
  const image = transformURL(
    getMetaValue(exampleNftToken?.properties, "image") as string
  ) as string;
  const creator = exampleNft?.token?.creator?.id as string;
  const maxSupply = exampleNft?.token?.saleData?.maxSupply;
  const totalSold = exampleNft?.token?.saleData?.totalSold;

  return (
    <>
      <Hero {...{ name, creator, image, totalSold, maxSupply, token }} />
      <Features {...{ actions }} />
      <div className="mt-12 relative px-4 py-4">
        <Resources {...{ resources }} />
      </div>
    </>
  );
};

export default Home;
