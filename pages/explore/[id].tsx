import { Disclosure } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  TagIcon,
} from "@heroicons/react/solid";
import React from "react";
import { ButtonGroup } from "../../components/button-group/button-group";
import PuchaseCard from "../../components/cards/purchase-card";
import NFTDropdown from "../../components/dropdowns/nft-dropdown";
import { EthLogo } from "../../components/logo/eth-logo";
import StyledLink from "../../components/styled-link/styled-link";
import ItemActivityTable from "../../components/tables/item-activity-table";

const product = {
  image: {
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg",
    imageAlt: "Back of women's Basic Tee in black.",
  },
  details: [
    {
      name: "About cosmetic queens",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam eveniet eius blanditiis non est eos a molestiae facere veritatis consequatur.",
    },
    {
      name: "Details",
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam eveniet eius blanditiis non est eos a molestiae facere veritatis consequatur.",
    },
  ],
};

const Release: React.FC = () => {
  return (
    <>
      <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6 lg:max-w-6xl lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="mt-2 lg:col-span-5 lg:row-start-1">
            <h2 className="sr-only">NFT</h2>
            <div>
              <img
                src={product.image.imageSrc}
                className="lg:col-span-2 lg:row-span-2 rounded-lg"
              />
            </div>
            <NFTDropdown {...{ product }} />
          </div>
          <div className="mt-2 lg:col-span-7">
            <PuchaseCard />
          </div>
          <div className="col-span-12">
            <Disclosure as="div">
              {({ open }) => (
                <div className="border-[1px] rounded-md mt-12 border-slate-200">
                  <h3>
                    <Disclosure.Button className="group relative w-full p-6 bg-white flex justify-between items-center text-left">
                      <span className="text-gray-900 text-sm font-medium">
                        Item Activity
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
                    <ItemActivityTable />
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          </div>
        </div>
      </div>
    </>
  );
};

export default Release;
