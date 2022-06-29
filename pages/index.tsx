import { ChevronRightIcon } from "@heroicons/react/solid";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Open-Format-NFT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" px-4 py-4 mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
            <div>
              <h1 className="mt-4 text-4xl font-extrabold text-black sm:mt-5 lg:mt-6">
                <span>
                  Create, release, monitise and analyse your NFT collections
                  using
                </span>{" "}
                <span className="text-indigo-400">open-format</span>
              </h1>
              <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
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
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Explore
                    </a>
                  </div>
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Create
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
            <div className="bg-white sm:max-w-md shadow-md shadow-slate-500 sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
              <div className="w-full h-56 bg-gray-200  border-transparent overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
                <img
                  src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="py-4 px-2">
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
    </>
  );
};

export default Home;
