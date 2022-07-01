import {
  UsersIcon,
  SearchCircleIcon,
  LightningBoltIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/solid";
import type { NextPage } from "next";
import Head from "next/head";

import classNames from "classnames";
import Resources from "../components/resources/resources";

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
      <div className="">
        <div className="relative overflow-hidden py-12">
          <div className="relative px-4 py-4 mx-auto max-w-7xl z-10">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                <div>
                  <h1 className="mt-4 text-4xl font-bold text-black sm:mt-5 lg:mt-6">
                    <span>
                      Create, release, monitise and analyse your NFT collections
                      using
                    </span>{" "}
                    <span className="text-blue-400">open-format</span>
                  </h1>
                  <p className="mt-3 text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Build your own NFT ecosystem Trustless, permissionless and
                    collaborative
                  </p>
                  <p className="mt-8 text-sm text-blue-500 uppercase tracking-wide font-semibold sm:mt-10">
                    Learn more about open format
                  </p>
                  <div className="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">
                    <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                      <div className="rounded-md shadow">
                        <a
                          href="#"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                        >
                          Explore
                        </a>
                      </div>
                      <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                        <a
                          href="#"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                        >
                          Create
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
                <div className="sm:max-w-md shadow-md shadow-slate-500 sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
                    alt=""
                    className="object-center object-cover"
                  />
                  <div className="py-4 px-2 bg-white">
                    <h3 className="mt-2 text-sm text-gray-700">
                      Woman Looking at Phone
                    </h3>
                    <p className="mt-1 text-sm text-blue-500">
                      0x2858b738580644D607af792bD0dd8430D20FF334
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-white z-0 after:content-['*'] after:absolute after:left-0 after:bottom-0 after:right-0 after:z-10 after:w-full after:h-full after:bg-gradient-to-t after:from-white after:to-white-20 ">
            <img
              className="object-cover blur-xl sm:scale-150 md:blur-lg"
              src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
              alt=""
            />
          </div>
        </div>

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
                    <a href={action.href} className="focus:outline-none">
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      {action.title}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {action.description}
                  </p>
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
        <div className="mt-12 relative px-4 py-4">
          <Resources {...{ resources }} />
        </div>
      </div>
    </>
  );
};

export default Home;
