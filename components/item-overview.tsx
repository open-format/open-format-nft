import Link from "next/link";
import React, { useEffect, useState } from "react";
import Card from "components/card";
import StyledLink from "components/styled-link";
import { addressSplitter } from "helpers/address-splitter";

interface Props {
  name: string;
  description: string;
  creator: string;
  image: string;
  tokenId: string;
  isFetched: boolean;
  isFetching: boolean;
  isFetchedAfterMount: boolean;
}

export default function ItemOverview({
  name,
  description,
  creator,
  image,
  tokenId,
  isFetched,
  isFetching,
  isFetchedAfterMount,
}: Props) {
  const [isDisplayed, setIsDisplayed] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setIsDisplayed(true);
    }, 2000);
  }, []);
  return (
    <StyledLink href={`/explore/${tokenId}`} className="cursor-pointer">
      <Card>
        {isDisplayed ? (
          <div className="relative">
            <div className="flex flex-2 border-b border-slate-300 flex-col">
              <img src={image} alt="" className="object-cover h-[400px]" />
              <img
                src={image}
                alt=""
                className="absolute left-6 top-[368px] w-16 h-16 border-2 shadow-md shadow-slate-400 border-white flex justify-center items-center overflow-hidden rounded-lg object-cover"
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
        ) : (
          <div className="animate-pulse h-[400px] bg-slate-300/50">
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
        )}
      </Card>
    </StyledLink>
  );
}
