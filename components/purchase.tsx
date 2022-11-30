import {
  BanIcon,
  DotsVerticalIcon,
  LightningBoltIcon,
  RefreshIcon,
  ShareIcon,
  TagIcon,
} from "@heroicons/react/outline";
import { useWallet } from "@simpleweb/open-format-react";
import classNames from "classnames";
import ActivityIndicator from "components/activity-indicator";
import Button from "components/button";
import StyledLink from "components/styled-link";
import { ethers } from "ethers";
import { addressSplitter } from "helpers/address-splitter";
import useMaticPriceCalculation from "hooks/useMaticPriceCalculation";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import PolygonLogo from "./logo/polygon-logo";

interface Props {
  createdBy?: string;
  price?: string;
  name?: string;
  submitPurchase: (address: string) => Promise<void | Error>;
  tokenId?: string;
  minting?: boolean;
  maxSupply?: string;
  totalSold?: string;
}

export default function Puchase({
  createdBy,
  name,
  price,
  submitPurchase,
  tokenId,
  minting,
  totalSold,
  maxSupply,
}: Props) {
  const [isMounted, setIsMounted] = useState(false); // Need this for the react-tooltip
  const [tooltip, showTooltip] = useState(false);
  const { isConnected } = useWallet();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const formattedPrice = price
    ? ethers.utils.formatEther(price.toString())
    : "";
  const { t } = useTranslation("common");
  const convertedPrice = useMaticPriceCalculation(parseFloat(formattedPrice));
  const soldOut =
    maxSupply && totalSold && parseInt(maxSupply) === parseInt(totalSold);
  const isExampleNftAddress =
    process.env.NEXT_PUBLIC_EXAMPLE_NFT_TOKEN_ADDRESS === tokenId;

  return (
    <>
      <h2 className="sr-only">{t("purchases.srHeading")}</h2>
      <div>
        <div className="flex justify-between items-center pb-6">
          <h1 className="font-extrabold text-2xl md:text-3xl">{name}</h1>
          <span className="flex">
            <button
              type="button"
              className="flex cursor-not-allowed justify-center items-center p-4 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 "
              data-for={"buttons"}
              data-tip={t("tooltip.message")}
              onMouseOver={() => showTooltip(true)}
              onMouseLeave={() => {
                showTooltip(false);
                setTimeout(() => showTooltip(true), 100);
              }}
            >
              <RefreshIcon
                className="h-5 w-5 text-slate-900"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              className="cursor-not-allowed -ml-px flex justify-center p-4 items-center border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 "
              data-for={"buttons"}
              data-tip={t("tooltip.message")}
              onMouseOver={() => showTooltip(true)}
              onMouseLeave={() => {
                showTooltip(false);
                setTimeout(() => showTooltip(true), 100);
              }}
            >
              <ShareIcon
                className="h-5 w-5 text-slate-900"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              className="cursor-not-allowed -ml-px flex justify-center items-center pl-5 pr-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1"
              data-for={"buttons"}
              data-tip={t("tooltip.message")}
              onMouseOver={() => showTooltip(true)}
              onMouseLeave={() => {
                showTooltip(false);
                setTimeout(() => showTooltip(true), 100);
              }}
            >
              <DotsVerticalIcon
                className="-ml-1 mr-2 h-5 w-5 text-slate-900"
                aria-hidden="true"
              />
            </button>
            {isMounted && tooltip && (
              <ReactTooltip
                id={"buttons"}
                effect={"float"}
                type={"dark"}
                place={"bottom"}
              />
            )}
          </span>
        </div>

        <div className="py-4">
          {isExampleNftAddress ? (
            <>
              <p className="inline">{t("purchases.exampleNft.heading")} </p>

              <StyledLink
                openInNewTab={true}
                href={`${process.env.NEXT_PUBLIC_EXAMPLE_NFT_LINK}`}
                className="text-blue-500"
              >
                {t("purchases.exampleNft.owner")}
              </StyledLink>
            </>
          ) : (
            <p>
              {t("purchases.nft.heading")}{" "}
              <StyledLink
                openInNewTab={true}
                href={`${process.env.NEXT_PUBLIC_POLYGON_SCAN}/address/${createdBy}`}
                className="text-blue-500 w-full truncate"
              >
                {createdBy && addressSplitter(createdBy)}
              </StyledLink>
            </p>
          )}
        </div>
      </div>
      <div className="grid bg-slate-50 lg:grid-cols-4 border border-b-slate-200 rounded-md">
        <div className="lg:col-span-7 p-4">
          <p>{t("purchases.cardHeading")}</p>
          <div className="flex items-center pt-2">
            <PolygonLogo />

            <p className="ml-2 text-2xl font-bold">
              {formattedPrice}
              <span className="font-normal text-sm text-gray-400">
                {" "}
                {convertedPrice}
              </span>
            </p>
          </div>
        </div>
        <div className="p-4 col-span-2">
          <Button
            type="button"
            isLoading={minting}
            disabled={!isConnected || soldOut || minting}
            onClick={() => tokenId && submitPurchase(tokenId)}
            className={classNames(
              {
                "cursor-not-allowed opacity-60 bg-slate-300 disabled:shadow-none":
                  !isConnected,
              },
              {
                "cursor-not-allowed opacity-60 bg-slate-300 disabled:shadow-none":
                  minting,
              },
              {
                "cursor-not-allowed opacity-60 bg-slate-300 disabled:shadow-none":
                  soldOut,
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
                <span className="text-red-400 opacity-60 ">
                  {t("purchases.mintingButtonState.soldOut")}
                </span>
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
