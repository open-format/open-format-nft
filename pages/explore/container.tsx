import Link from "next/link";
import { useState } from "react";
import ExploreCard from "../../components/cards/explore-card";

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

const Container: React.FC = () => {
  const [navigationSelected, setNavigationSelected] = useState("");
  return (
    <>
      <div className=" my-12 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">
            Explore Collections.
          </h1>
        </div>
      </div>
      <nav aria-label="Top">
        <div className="w-full py-6 flex items-center justify-center">
          <div className="flex items-center">
            <a href="#">
              <span className="sr-only">Workflow</span>
              {/* Logo goes here at some point */}
            </a>
            <div className="hidden space-x-8 lg:block">
              {navigation.map((link) => (
                <a
                  onClick={() => setNavigationSelected(link.name)}
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-slate-500 hover:text-slate-900"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-slate-500 hover:text-slate-700"
            >
              {link.name}
            </a>
          ))}
        </div>
        <hr className="divide-y"></hr>
      </nav>
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
    </>
  );
};

export default Container;
