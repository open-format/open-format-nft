import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import React from "react";
const product = {
  name: "Basic Tee",
  price: "$35",
  rating: 3.9,
  reviewCount: 512,
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Women", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  image: {
    id: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg",
    imageAlt: "Back of women's Basic Tee in black.",
    primary: true,
  },

  colors: [
    { name: "Black", bgColor: "bg-gray-900", selectedColor: "ring-gray-900" },
    {
      name: "Heather Grey",
      bgColor: "bg-gray-400",
      selectedColor: "ring-gray-400",
    },
  ],
  sizes: [
    { name: "XXS", inStock: true },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: false },
  ],
  description: `
    The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.
    Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.
  `,
  details: [
    "Only the best materials",
    "Ethically and locally made",
    "Pre-washed and pre-shrunk",
    "Machine wash cold with similar colors",
  ],
};
const prodTwo = {
  name: "Zip Tote Basket",
  price: "$140",
  rating: 4,
  images: [
    {
      id: 1,
      name: "Angled view",
      src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    // More images...
  ],

  details: [
    {
      name: "About cosmetic queens",
      items: [
        "Multiple strap configurations",
        "Spacious interior with top zip",
        "Leather handle and tabs",
        "Interior dividers",
        "Stainless strap loops",
        "Double stitched construction",
        "Water-resistant",
      ],
    },
    {
      name: "Details",
      items: [
        "Multiple strap configurations",
        "Spacious interior with top zip",
        "Leather handle and tabs",
        "Interior dividers",
        "Stainless strap loops",
        "Double stitched construction",
        "Water-resistant",
      ],
    },

    // More sections...
  ],
};

const Release: React.FC = () => {
  return (
    <>
      <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6 lg:max-w-5xl lg:px-8">
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
            <div className="border-2 mt-4 bg-slate-100 border-slate-200 rounded-lg">
              <div>
                <p className="text-gray-900 bg-white text-sm font-medium p-6">
                  Description
                </p>
              </div>
              <div className="border-t bg-slate-50 border-slate-200">
                <p className="text-gray-900 text-sm font-medium p-6">
                  By <span className=" font-extrabold">Mr Robot</span>
                </p>
              </div>

              <div>
                {prodTwo.details.map((detail) => (
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
            <h2 className="sr-only">Images</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 lg:gap-8">
              <p>Description</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Release;
