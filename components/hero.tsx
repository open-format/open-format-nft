import React from "react";
import StyledLink from "components/styled-link";

function Backdrop({ image }: { image: string }) {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-white z-0 after:absolute after:left-0 after:bottom-0 after:right-0 after:z-10 after:w-full after:h-full after:bg-gradient-to-t after:from-white after:to-white-20 ">
      <img
        className="object-cover w-full blur-xl sm:scale-150 md:blur-lg"
        src={image}
        alt=""
      />
    </div>
  );
}

function Card({
  name,
  creator,
  image,
}: {
  name: string;
  creator: string;
  image: string;
}) {
  return (
    <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
      <div className="sm:max-w-md shadow-md shadow-slate-500 sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
        <img src={image} alt="" className="object-center object-cover" />
        <div className="py-4 px-2 bg-white">
          <div>
            <h3 className="mt-2 text-sm text-gray-700">{name}</h3>
            <p className="mt-1 text-sm text-blue-500">{creator}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <>
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
            <Card
              image="/images/drip.jpeg"
              creator="0x2858b738580644D607af792bD0dd8430D20FF334"
              name="Drip"
            />
          </div>
        </div>
        <Backdrop image="/images/drip.jpeg" />
      </div>
    </>
  );
}
