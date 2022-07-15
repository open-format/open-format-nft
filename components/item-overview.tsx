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
        <div className="relative">
          <div className="flex flex-col">
            <img src={image} alt="" className="object-cover max-h-96" />
            <img
              src={image}
              alt=""
              className="absolute left-6 top-[350px] w-16 h-16 border-2 shadow-md shadow-slate-400 border-white flex justify-center items-center overflow-hidden rounded-lg object-cover"
            />

            <div className="pt-10 p-4">
              <div className="flex justify-start items-center">
                <div className="flex pl-2 flex-col">
                  <p className="font-bold">{name}</p>
                  <p className="w-full truncate">
                    By{" "}
                    <span title={creator} className="text-blue-500">
                      {addressSplitter(creator)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </StyledLink>
  );
}
