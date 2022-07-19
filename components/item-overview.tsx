import Link from "next/link";
import React, { useEffect, useState } from "react";
import Card from "components/card";
import StyledLink from "components/styled-link";
import { addressSplitter } from "helpers/address-splitter";
import classNames from "classnames";

interface Props {
  name: string;
  description: string;
  creator: string;
  image: string;
  tokenId: string;
}

export default function ItemOverview({ name, creator, image, tokenId }: Props) {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const [iconIsLoaded, setIconIsLoaded] = useState(false);

  return (
    <StyledLink href={`/explore/${tokenId}`} className="cursor-pointer">
      <Card>
        <div className="relative min-h-[440px]">
          <div className="flex flex-2 border-b border-slate-300 flex-col">
            <img
              onLoad={() => setImageIsLoaded(true)}
              src={image}
              alt=""
              className={classNames(
                {
                  "animate-pulse bg-slate-100/50": !imageIsLoaded,
                },
                "object-cover h-[400px]"
              )}
            />
            <img
              onLoad={() => setIconIsLoaded(true)}
              src={image}
              alt=""
              className={classNames(
                {
                  "animate-pulse bg-slate-100/50": !iconIsLoaded,
                },
                "absolute left-6 top-[368px] w-16 h-16 border-2 shadow-md shadow-slate-400 border-white flex justify-center items-center overflow-hidden rounded-lg object-cover"
              )}
            />
          </div>
          <div className="pt-12 p-4">
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
      </Card>
    </StyledLink>
  );
}
