import Link from "next/link";
import React from "react";
import Card from "components/card";
import StyledLink from "components/styled-link";
import { addressSplitter } from "helpers/address-splitter";

interface Props {
  name: string;
  description: string;
  creator: string;
  image: string;
  tokenId: string;
}

export default function ItemOverview({
  name,
  description,
  creator,
  image,
  tokenId,
}: Props) {
  return (
    <StyledLink href={`/explore/${tokenId}`} className="cursor-pointer">
      <Card>
        <div className="flex flex-col">
          <img src={image} alt="" className="h-52 object-cover" />
          <div className="-m-6 flex justify-start items-center flex-col">
            <img
              src={image}
              alt=""
              className="w-12 h-12 border-2 shadow-md shadow-slate-400 border-white flex justify-center items-center overflow-hidden relative rounded-full object-cover"
            />
          </div>
          <div className="flex h-48 flex-col text-center p-2 sm:-12 md:p-8 lg:p-8 mt-2 justify-center items-center">
            <p className="pb-4">{name}</p>
            <p className="w-full truncate">
              by{" "}
              <span title={creator} className="text-blue-500">
                {addressSplitter(creator)}
              </span>
            </p>
            <p className="mt-2 w-full truncate">{description}</p>
          </div>
        </div>
      </Card>
    </StyledLink>
  );
}
