import { BanIcon, TagIcon } from "@heroicons/react/solid";
import { useWallet } from "@simpleweb/open-format-react";
import { ethers } from "ethers";
import React from "react";
import { soldOut } from "../../helpers/sold-out";
import useMaticPriceCalculation from "../../hooks/use-matic-price-calculation";
import { ButtonGroup } from "../button-group/button-group";
import Button from "../buttons/button";
import { EthLogo } from "../logo/eth-logo";
import StyledLink from "../styled-link/styled-link";

type PurchaseCard = {
  createdBy?: string;
  price?: string;
  name?: string;
  submitPurchase: (address: string) => Promise<void | Error>;
  tokenId: string;
  minting: boolean;
  maxSupply: string;
  totalSold: string;
};

interface PurchaseCardProps {
  purchaseCardProps: PurchaseCard;
}

const PuchaseCard: React.FC<PurchaseCardProps> = ({ purchaseCardProps }) => {
  const {
    createdBy,
    name,
    price,
    submitPurchase,
    tokenId,
    minting,
    maxSupply,
    totalSold,
  } = purchaseCardProps;
  const formattedPrice = price
    ? ethers.utils.formatEther(price.toString())
    : "";

  const convertedPrice = useMaticPriceCalculation(
    parseFloat(formattedPrice),
    "gbp",
    "£"
  );

  return (
    <>
      <h2 className="sr-only">NFT</h2>
      <div>
        <div className="flex justify-between items-center">
          <StyledLink className="text-blue-500" href={"#"}>
            {createdBy}
          </StyledLink>
          <div className="flex">
            <ButtonGroup />
          </div>
        </div>

        <div className="py-4">
          <h1 className="font-extrabold text-3xl">{name}</h1>
        </div>
        <div className="py-4">
          <p>
            Owned By{" "}
            <StyledLink
              openInNewTab={true}
              href={`${process.env.NEXT_PUBLIC_POLYGON_SCAN}/address/${createdBy}`}
              className="text-blue-500"
            >
              {createdBy}
            </StyledLink>
          </p>
        </div>
      </div>
      <div className="grid bg-slate-50 lg:grid-cols-4 border-[1px] border-b-slate-200 rounded-md">
        <div className="lg:col-span-7 p-4">
          <p>Mint Price</p>
          <div className="flex items-center">
            <EthLogo />
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
            soldOut={() => soldOut(maxSupply, totalSold)}
            onClick={() => submitPurchase(tokenId)}
            className="w-full border-2 hover:shadow-md hover:transition transition bg-white rounded-md px-4 py-2 col-span-2"
          >
            <span className="flex items-center justify-center">
              {!soldOut(maxSupply, totalSold) ? (
                <>
                  <TagIcon className="h-4  text-blue-400 mr-2" />
                  <span className="text-blue-400">Mint</span>
                </>
              ) : (
                <>
                  <BanIcon className="h-4  text-red-400 mr-2" />
                  <span className="text-red-400">Sold Out</span>
                </>
              )}
            </span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default PuchaseCard;
