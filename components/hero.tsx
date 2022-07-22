import React from "react";
import StyledLink from "components/styled-link";
import { useMint, useWallet } from "@simpleweb/open-format-react";
import toast from "react-hot-toast";
import Button from "./button";
import ActivityIndicator from "./activity-indicator";
import { BanIcon, PlayIcon, TagIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { addressSplitter } from "helpers/address-splitter";
import classNames from "classnames";
import { LightningBoltIcon } from "@heroicons/react/outline";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Skeleton from "./skeletonCard";

function Backdrop({ image }: { image: string }) {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-white z-0 after:absolute after:left-0 after:bottom-0 after:right-0 after:z-10 after:w-full after:h-full after:bg-gradient-to-t after:from-white after:to-white-20 ">
        <Image
          layout="fill"
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
  maxSupply,
  totalSold,
}: {
  name?: string;
  creator?: string;
  image?: string;
  token?: string;
  maxSupply?: string;
  totalSold?: string;
}) {
  const { mint, isLoading: minting } = useMint();
  const router = useRouter();
  const { isConnected } = useWallet();
  const { t } = useTranslation("common");
  const soldOut =
    maxSupply && totalSold && parseInt(maxSupply) === parseInt(totalSold);
  const isReady = !isConnected || !minting || !soldOut;

  const submitPurchase = async (address: string) => {
    try {
      if (!ethers.utils.isAddress(address)) {
        throw new Error("Wallet address not valid");
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
      {!image ? (
        <div className="flex flex-col sm:max-w-md shadow-md rounded-lg shadow-slate-500 sm:w-full sm:mx-auto sm:overflow-hidden">
          <Skeleton />
        </div>
      ) : (
        <div className="flex flex-col sm:max-w-md shadow-md rounded-lg shadow-slate-500 sm:w-full sm:mx-auto sm:overflow-hidden">
          <Image
            alt=""
            height={450}
            width={350}
            blurDataURL="/images/drip.jpeg"
            placeholder="blur"
            src={image}
            className={"object-fit cursor-pointer"}
          />

          <div className="py-4 px-2 flex justify-start items-center bg-white">
            <img
              onClick={() => router.push(`/explore/${token}`)}
              src={image}
              alt=""
              className={
                "object-fit border-2 cursor-pointer rounded-md h-16 w-16 shadow-md shadow-slate-400 border-white"
              }
            />

            <div className="px-2">
              <h2 className="text-gray-700 font-bold text-sm pr-4">{name}</h2>
              <StyledLink
                href={`${process.env.NEXT_PUBLIC_POLYGON_SCAN}/address/${token}/`}
                className="mt-1 text-sm text-blue-500"
              >
                {creator && addressSplitter(creator)}
              </StyledLink>
            </div>
          </div>
          <div className="p-4 col-span-2 bg-white border-t-2 border-slate-200">
            <Button
              type="button"
              isLoading={minting}
              disabled={false}
              onClick={() => token && submitPurchase(token)}
              className={classNames(
                {
                  "cursor-not-allowed opacity-60 bg-slate-300 hover:shadow-none":
                    !isReady,
                },
                "w-full border-2 hover:shadow-md hover:transition transition bg-white rounded-md px-4 py-2 col-span-2"
              )}
            >
              {!isConnected ? (
                <>
                  <LightningBoltIcon className="h-4 inline text-slate-700 mr-2" />
                  <span className="text-slate-800 opacity-60 font-bold">
                    {t("purchases.mintingButtonState.notConnected")}
                  </span>
                </>
              ) : minting ? (
                <>
                  <ActivityIndicator className="h-5 w-5 inline mr-2 animate-spin text-blue-400" />
                  <span className="text-blue-400">
                    {t("purchases.mintingButtonState.loading")}
                  </span>
                </>
              ) : !soldOut ? (
                <>
                  <TagIcon className="h-4 inline text-blue-400 mr-2" />
                  <span className="text-blue-400">
                    {t("purchases.mintingButtonState.initial")}
                  </span>
                </>
              ) : (
                <>
                  <BanIcon className="h-4 inline text-red-400 mr-2" />
                  <span className="text-red-400 opacity-60 bg-slate-300">
                    {t("purchases.mintingButtonState.soldOut")}
                  </span>
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Hero({
  image,
  name,
  token,
  creator,
  maxSupply,
  totalSold,
}: {
  image?: string;
  name?: string;
  token?: string;
  creator?: string;
  maxSupply?: string;
  totalSold?: string;
}) {
  const { t } = useTranslation("common");
  return (
    <>
      <div className="relative overflow-hidden py-12">
        <div className="relative px-4 py-4 mx-auto max-w-7xl z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
              <div className="flex flex-col">
                <h1 className="mt-4 text-4xl font-bold text-black sm:mt-5 lg:mt-6">
                  <span>{t("hero.title")}</span>{" "}
                  <span className=" text-blue-500">
                    {t("hero.titleBoldColor")}
                  </span>
                </h1>
                <p className="mt-3 bg-transparent text-slate-900 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  {t("hero.subTitle")}
                </p>
                <StyledLink
                  openInNewTab={true}
                  href="https://openformat.simpleweb.co.uk/"
                  className="text-sm text-blue-500 uppercase tracking-wide font-semibold sm:mt-10"
                >
                  <div className="flex justify-start sm:justify-center md:justify-center lg:justify-start pt-4 sm:pt-2 items-center">
                    <PlayIcon className="w-6 mr-2 inline" />
                    {t("hero.playIconCopy")}
                  </div>
                </StyledLink>

                <div className="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">
                  <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <StyledLink
                        href="/explore"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                      >
                        {t("hero.ctaPrimary")}
                      </StyledLink>
                    </div>
                    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                      <StyledLink
                        href="/create"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                      >
                        {t("hero.ctaSecondary")}
                      </StyledLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Card
              {...{ totalSold }}
              {...{ maxSupply }}
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
