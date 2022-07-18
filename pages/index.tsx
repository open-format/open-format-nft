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
import Head from "next/head";

const actions = [
  {
    title: "Supercharged NFTs",
    href: "#",
    icon: LightningBoltIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
    description:
      "Create data rich NFT collections with minting, selling, payment splitting and royalty functionality built in.",
  },
  {
    title: "Search, filter and sort data",
    href: "#",
    icon: SearchCircleIcon,
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
    description:
      "Use our subgraph to search, filter and sort NFT collections on open format to create unique marketplace experiences.",
  },
  {
    title: "Reward NFT holders",
    href: "#",
    icon: UsersIcon,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
    description:
      "Deposit external revenue streams into a NFT collection that is split between NFT holders.",
  },
  {
    title: "Sales Commission",
    href: "#",
    icon: CurrencyDollarIcon,
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
    description:
      "Add a commission to allow developers and external sellers to benefit from your NFT sales.",
  },
];

const resources = [
  {
    title: "Open Format documentation",
    href: "https://docs.openformat.simpleweb.co.uk/protocol-overview/overview",
    category: { name: "Documentation", href: "#" },
    description:
      "Enabling developers to build decentralised marketplaces and factories for digital assets in the metaverse.",
    imageUrl: "/images/nft-factory.png",
    alt: "",
  },
  {
    title: "Our Discord",
    href: "https://discord.com/invite/8WV52tVqbZ",
    category: { name: "Community", href: "#" },
    description:
      "Builiding a web 3 community that we can all be proud of, come say hi whatever it may be we're all here to help.",
    imageUrl: "/images/discord.jpg",
    alt: "",
  },
];

const Home: NextPage = () => {
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
      <Head>
        <title>Open Format NFT</title>
        <link rel="icon" href="/icons/logo_small.png" />
      </Head>
      {exampleNft && (
        <Hero {...{ name, creator, image, totalSold, maxSupply, token }} />
      )}
      <Features {...{ actions }} />
      <div className="mt-12 relative px-4 py-4">
        <Resources {...{ resources }} />
      </div>
    </>
  );
};

export default Home;
