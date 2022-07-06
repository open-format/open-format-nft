import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import React from "react";
import { addressSplitter } from "../../helpers/address-splitter";
import StyledLink from "../styled-link/styled-link";

type NFTInfo = {
  name?: string;
  description?: string;
  tokenId: string;
  createdBy: string;
};
interface NFTDropdownProps {
  nftDropdownProps: NFTInfo;
}

const NFTDropdown: React.FC<NFTDropdownProps> = ({ nftDropdownProps }) => {
  const { description, name, createdBy, tokenId } = nftDropdownProps;

  const contractAddress: string = addressSplitter(tokenId);
  console.log(contractAddress);

  return (
    <div className="border-[1px] mt-4 bg-slate-100 border-slate-200 rounded-lg">
      <div>
        <p className="text-gray-900 bg-white text-sm font-bold p-6">
          Description
        </p>
      </div>
      <div className="border-t bg-slate-50 border-slate-200">
        <p className="text-gray-900 text-sm font-medium pt-6 pb-2 px-6">
          By <span className=" font-extrabold">{name}</span>
        </p>
        <p className="px-6 pb-8 text-sm">{description}</p>
      </div>

      <div>
        <Disclosure as="div" key={name}>
          {({ open }) => (
            <div className="border-t divide-y border-slate-200">
              <h3>
                <Disclosure.Button className="group relative w-full p-6 bg-white flex justify-between items-center text-left">
                  <span className="text-gray-900 text-sm font-bold">
                    Details
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
                    <p className="px-6 pb-2 text-sm">Contract Address</p>
                    <StyledLink
                      openInNewTab={true}
                      href={`${process.env.NEXT_PUBLIC_POLYGON_SCAN}/address/${tokenId}`}
                      className="px-6 text-sm text-blue-500"
                    >
                      {contractAddress}
                    </StyledLink>
                  </div>

                  <div className="flex justify-between">
                    <p className="px-6 pb-2 text-sm">Token Standard</p>
                    <p className="px-6 text-sm">ERC-20</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="px-6 pb-2 text-sm">Blockchain</p>
                    <p className="px-6 text-sm">Polygon</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="px-6 pb-2 text-sm">Metadata</p>
                    <p className="px-6 text-sm">IPFS</p>
                  </div>
                </div>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default NFTDropdown;
