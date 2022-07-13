import React from "react";
import StyledLink from "components/styled-link";
import { useMint, useRawRequest } from "@simpleweb/open-format-react";
import toast from "react-hot-toast";
import Button from "./button";
import ActivityIndicator from "./activity-indicator";
import { BanIcon, TagIcon } from "@heroicons/react/solid";
import { gql } from "graphql-request";
import getMetaValue from "helpers/get-meta-value";
import transformURL from "helpers/transform-url";

function Backdrop({ image }: { image: string }) {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-white z-0 after:absolute after:left-0 after:bottom-0 after:right-0 after:z-10 after:w-full after:h-full after:bg-gradient-to-t after:from-white after:to-white-20 ">
        <img
          className="object-cover w-full blur-xl sm:scale-150 md:blur-lg"
          src={image}
          alt=""
        />
      </div>
    </>
  );
}

function Card({
  name,
  creator,
  image,
  token,
}: {
  name: string;
  creator: string;
  image: string;
  token: string;
}) {
  const { mint, isLoading: minting } = useMint();
  const submitPurchase = async (address: string) => {
    try {
      if (typeof address !== "string") {
        throw new Error("Contract address not sent");
      }

      await toast.promise(mint({ contractAddress: address }), {
        loading: "Please confirm the transaction in your wallet",
        success: "Purchase complete",
        error: "Minting error",
      });
    } catch (error) {
      console.log("handleDeploy", error);
    }
  };
  return (
    <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
      <div className="flex flex-col sm:max-w-md shadow-md  shadow-slate-500 sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
        <div className="max-h-96">
          <img src={image} alt="" className="object-cover" />
        </div>
        <div className="flex py-4 px-2 bg-white">
          <img
            src={image}
            alt=""
            className="w-12 h-12 border-2 shadow-md shadow-slate-400 border-white flex justify-center items-center overflow-hidden relative rounded-full object-cover"
          />
          <div className="pl-2 flex flex-col">
            <h2 className="text-gray-700 font-bold text-sm pr-4">{name}</h2>
            <p className="mt-1 text-sm text-blue-500">{creator}</p>
          </div>
        </div>
        <div className="p-4 col-span-2 bg-white border-t-2 border-slate-200">
          <Button
            type="button"
            isLoading={minting}
            disabled={false}
            onClick={() => submitPurchase(token)}
            className="w-full border-2 hover:shadow-md hover:transition transition bg-white rounded-md px-4 py-2 col-span-2"
          >
            {minting ? (
              // diplsay loading state whilst minting
              <>
                <ActivityIndicator className="h-5 w-5 inline mr-2 animate-spin text-blue-400" />
                <span className="text-blue-400">Loading</span>
              </>
            ) : !false ? (
              //If not loading and you are able to mint then show mint
              <>
                <TagIcon className="h-4 inline text-blue-400 mr-2" />
                <span className="text-blue-400">Mint</span>
              </>
            ) : (
              //If sold out then show to the user that all nfts are sold
              <>
                <BanIcon className="h-4 inline text-red-400 mr-2" />
                <span className="text-red-400">Sold Out</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Hero({
  image,
  name,
  token,
  creator,
}: {
  image: string;
  name: string;
  token: string;
  creator: string;
}) {
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
                <p className="mt-3 bg-transparent text-slate-900 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Build your own NFT ecosystem Trustless, permissionless and
                  collaborative
                </p>
                <StyledLink
                  openInNewTab={true}
                  href="https://openformat.simpleweb.co.uk/"
                  className="mt-8 text-sm text-blue-500 uppercase tracking-wide font-semibold sm:mt-10"
                >
                  Learn more about open format
                </StyledLink>

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
              {...{ token }}
              {...{ image }}
              {...{ creator }}
              {...{ name }}
            />
          </div>
        </div>
        <Backdrop image="/images/drip.jpeg" />
      </div>
    </>
  );
}
