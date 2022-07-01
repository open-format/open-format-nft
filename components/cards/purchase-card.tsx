import { TagIcon } from "@heroicons/react/solid";
import React from "react";
import { ButtonGroup } from "../button-group/button-group";
import Button from "../buttons/button";
import { EthLogo } from "../logo/eth-logo";
import StyledLink from "../styled-link/styled-link";

const PuchaseCard: React.FC = () => {
  return (
    <>
      <h2 className="sr-only">NFT</h2>
      <div>
        <div className="flex justify-between items-center">
          <StyledLink href={"#"}>
            <a className="text-blue-500">Comic Queens</a>
          </StyledLink>
          <div className="flex">
            <ButtonGroup />
          </div>
        </div>

        <div className="py-4">
          <h1 className="font-extrabold text-3xl">Title</h1>
        </div>
        <div className="py-4">
          <p>
            Owned By{" "}
            <StyledLink href={"#"}>
              <a className="text-blue-400">0xfj65fsa...4834DS</a>
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
              0.0023
              <span className="font-normal text-sm text-gray-400">
                {" "}
                ($203.09)
              </span>
            </p>
          </div>
        </div>
        <div className="p-4 col-span-2">
          <Button className="w-full border-2 hover:shadow-md hover:transition transition bg-white rounded-md px-4 py-2 col-span-2">
            <span className="flex items-center justify-center">
              <TagIcon className="h-4  text-blue-400 mr-2" />
              <span className="text-blue-400">Mint</span>
            </span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default PuchaseCard;
