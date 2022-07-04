import {
  UsersIcon,
  SearchCircleIcon,
  LightningBoltIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/solid";
import type { NextPage } from "next";
import Head from "next/head";
import Resources from "../components/resources/resources";
import Hero from "../components/hero/hero";
import GridList from "../components/grid-lists/grid-list";

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
    title: "open-format-documentation",
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
  return (
    <>
      <Head>
        <title>Open-Format-NFT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <GridList {...{ actions }} />
      <div className="mt-12 relative px-4 py-4">
        <Resources {...{ resources }} />
      </div>
    </>
  );
};

export default Home;
