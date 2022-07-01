import { NextPage } from "next";
import Head from "next/head";
import ExploreCard from "../../components/cards/explore-card";
import ExploreNavigation from "../../components/navigations/explore-navigation";

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
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />
        </div>
      </div>
    </>
  );
};

export default Releases;
