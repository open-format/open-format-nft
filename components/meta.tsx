import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import React from "react";
import { addressSplitter } from "helpers/address-splitter";
import StyledLink from "components/styled-link";
import useTranslation from "next-translate/useTranslation";

interface Props {
  name?: string;
  description?: string;
  tokenId?: string;
  createdBy?: string;
  maxSupply?: string;
  totalSold?: string;
}

export default function Meta({
  name,
  createdBy,
  description,
  tokenId,
  totalSold,
  maxSupply,
}: Props) {
  const { t } = useTranslation("common");
  const contractAddress = tokenId && addressSplitter(tokenId);
  const creatorAddress = createdBy && addressSplitter(createdBy);
  const isExampleNftAddress =
    process.env.NEXT_PUBLIC_EXAMPLE_NFT_TOKEN_ADDRESS === tokenId;

  return (
    <div className="border rounded-md mt-4 bg-slate-100 border-slate-200">
      <div>
        <p className="text-gray-900 rounded-t-md bg-white text-sm font-bold p-6">
          {t("meta.description.title")}
        </p>
      </div>
      <div className="border-t bg-slate-50 border-slate-200">
        {isExampleNftAddress ? (
          <div className="flex justify-between">
            <p className="text-gray-900 text-sm font-medium pt-6 pb-2 px-6">
              By{" "}
            </p>
            <StyledLink
              openInNewTab={true}
              href={`${process.env.NEXT_PUBLIC_EXAMPLE_NFT_LINK}`}
              className="text-sm text-blue-500  pt-6 pb-2 px-6"
            >
              {t("meta.exampleNft.artistName")}
            </StyledLink>
          </div>
        ) : (
          <div className="flex justify-between">
            <p className="text-gray-900 text-sm font-medium pt-6 pb-2 px-6">
              By{" "}
            </p>
            <StyledLink
              openInNewTab={true}
              href={`${process.env.NEXT_PUBLIC_POLYGON_SCAN}/address/${tokenId}`}
              className="text-sm text-blue-500  pt-6 pb-2 px-6"
            >
              {creatorAddress}
            </StyledLink>
          </div>
        )}

        <p className="px-6 pb-8 text-sm italic">{description}</p>
      </div>

      <div>
        <Disclosure as="div" key={name}>
          {({ open }) => (
            <div className="border-t divide-y border-slate-200">
              <h3>
                <Disclosure.Button className="group rounded-b-md relative w-full p-6 bg-white flex justify-between items-center text-left">
                  <span className="text-gray-900 text-sm font-bold">
                    {t("meta.details.title")}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <ChevronUpIcon
                        className="block h-6 w-6 text-gray-900 group-hover:text-gray-900"
                        aria-hidden="true"
                      />
                    ) : (
                      <ChevronDownIcon
                        className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel as="div" className="bg-slate-50">
                <div className="pt-2">
                  <div className="flex justify-between">
                    <p className="px-6 pb-2 text-sm">
                      {t("meta.details.optionOne.key")}
                    </p>
                    <StyledLink
                      openInNewTab={true}
                      href={`${process.env.NEXT_PUBLIC_POLYGON_SCAN}/address/${tokenId}`}
                      className="px-6 text-sm text-blue-500"
                    >
                      {contractAddress}
                    </StyledLink>
                  </div>

                  <div className="flex justify-between">
                    <p className="px-6 pb-2 text-sm">
                      {t("meta.details.optionTwo.key")}
                    </p>
                    <p className="px-6 text-sm">
                      {t("meta.details.optionTwo.value")}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="px-6 pb-2 text-sm">
                      {t("meta.details.optionThree.key")}
                    </p>
                    <p className="px-6 text-sm">
                      {t("meta.details.optionThree.value")}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="px-6 pb-2 text-sm">
                      {t("meta.details.optionFour.key")}
                    </p>
                    <p className="px-6 text-sm">
                      {t("meta.details.optionFour.value")}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="px-6 pb-2 text-sm">
                      {t("meta.details.optionFive.key")}
                    </p>
                    <p className="px-6 text-sm">{maxSupply}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="px-6 pb-2 text-sm">
                      {t("meta.details.optionFive.key")}
                    </p>
                    <p className="px-6 text-sm">{totalSold}</p>
                  </div>
                </div>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
