import React from "react";
import StyledLink from "../styled-link/styled-link";
import BackgroundImage from "./background-image";
import HeroCard from "./hero-card";

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden py-12">
      <div className="relative px-4 py-4 mx-auto max-w-7xl z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
            <div>
              <h1 className="mt-4 text-4xl font-bold text-black sm:mt-5 lg:mt-6">
                <span>
                  Create, release, monetise and analyse your NFT collections
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
                    <StyledLink
                      href="/explore"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Explore
                    </StyledLink>
                  </div>
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <StyledLink
                      href="/create"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Create
                    </StyledLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HeroCard
            image="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
            creator="0x2858b738580644D607af792bD0dd8430D20FF334"
            name="Woman Looking at Phone"
          />
        </div>
      </div>
      <BackgroundImage image="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80" />
    </div>
  );
};

export default Hero;
