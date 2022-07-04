import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import React from "react";

type NFTInfo = {
  imageSrc: string;
  imageAlt: string;
  name: string;
  description: string;
};
interface NFTDropdownProps {
  nftInfo: NFTInfo;
}

const NFTDropdown: React.FC<NFTDropdownProps> = ({ nftInfo }) => {
  return (
    <div className="border-[1px] mt-4 bg-slate-100 border-slate-200 rounded-lg">
      <div>
        <p className="text-gray-900 bg-white text-sm font-medium p-6">
          Description
        </p>
      </div>
      <div className="border-t bg-slate-50 border-slate-200">
        <p className="text-gray-900 text-sm font-medium pt-6 pb-2 px-6">
          By <span className=" font-extrabold">Mr Robot</span>
        </p>
        <p className="px-6 pb-8 text-sm">{nftInfo.description}</p>
      </div>

      <div>
        <Disclosure as="div" key={nftInfo.name}>
          {({ open }) => (
            <div className="border-t divide-y border-slate-200">
              <h3>
                <Disclosure.Button className="group relative w-full p-6 bg-white flex justify-between items-center text-left">
                  <span className="text-gray-900 text-sm font-medium">
                    {nftInfo.name}
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
                <p className="px-6 pb-8 text-sm">{nftInfo.description}</p>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default NFTDropdown;
