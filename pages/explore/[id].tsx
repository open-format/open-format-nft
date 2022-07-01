import { Disclosure } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  TagIcon,
} from "@heroicons/react/solid";
import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { ButtonGroup } from "../../components/button-group/button-group";
import { EthLogo } from "../../components/logo/eth-logo";
import ItemActivityTable from "../../components/tables/item-activity-table";
const product = {
  image: {
    id: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg",
    imageAlt: "Back of women's Basic Tee in black.",
    primary: true,
  },
  details: [
    {
      name: "About cosmetic queens",
    },
    {
      name: "Details",
    },
  ],
};

const Release: React.FC = () => {
  return (
    <>
      <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6 lg:max-w-6xl lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="mt-2 lg:col-span-5 lg:row-start-1">
            <h2 className="sr-only">Images</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 lg:gap-8">
              <img
                src={product.image.imageSrc}
                className={classNames(
                  product.image.primary
                    ? "lg:col-span-2 lg:row-span-2"
                    : "hidden lg:block",
                  "rounded-lg"
                )}
              />
            </div>
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
                <p className="px-6 pb-8 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Delectus vitae repellat in. Recusandae, illo nam et tenetur
                  molestiae possimus ratione.
                </p>
              </div>

              <div>
                {product.details.map((detail) => (
                  <Disclosure as="div" key={detail.name}>
                    {({ open }) => (
                      <div className="border-t divide-y border-slate-200">
                        <h3>
                          <Disclosure.Button className="group relative w-full p-6 bg-white flex justify-between items-center text-left">
                            <span className="text-gray-900 text-sm font-medium">
                              {detail.name}
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
                          <p className="p-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Laboriosam eveniet eius blanditiis non est eos
                            a molestiae facere veritatis consequatur.
                          </p>
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-2 lg:col-span-7">
            <h2 className="sr-only">NFT</h2>
            <div>
              <div className="flex justify-between items-center">
                <Link href={"#"}>
                  <a className="text-blue-500">Comic Queens</a>
                </Link>
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
                  <Link href={"#"}>
                    <a className="text-blue-400">0xfj65fsa...4834DS</a>
                  </Link>
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
                <button className="w-full border-2 hover:shadow-md hover:transition transition bg-white rounded-md px-4 py-2 col-span-2">
                  <div className="flex items-center justify-center">
                    <TagIcon className="h-4  text-blue-400 mr-2" />
                    <span className="text-blue-400">Mint</span>
                  </div>
                </button>
              </div>
            </div>
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
