import React from "react";
import PuchaseCard from "../../components/cards/purchase-card";
import NFTDropdown from "../../components/dropdowns/nft-dropdown";
import NftTableDropdown from "../../components/dropdowns/nft-table-dropdown";

const nftInfo = {
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg",
  imageAlt: "Back of women's Basic Tee in black.",
  name: "About cosmetic queens",
  description:
    " Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam eveniet eius blanditiis non est eos a molestiae facere veritatis consequatur.",
};

const transactions = [
  {
    event: "Minted",
    currentContractAddress: "0x28......58b7",
    ownerId: "03cv......51n0",
    price: "0.0023",
    date: "01/07/2022",
  },
  // More transactions from query...
];

const Release: React.FC = () => {
  return (
    <>
      <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6 lg:max-w-6xl lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="mt-2 lg:col-span-5 lg:row-start-1">
            <h2 className="sr-only">NFT</h2>
            <div>
              <img
                src={nftInfo.imageSrc}
                className="lg:col-span-2 lg:row-span-2 rounded-lg"
              />
            </div>
            <NFTDropdown {...{ nftInfo }} />
          </div>
          <div className="mt-2 lg:col-span-7">
            <PuchaseCard
              createdBy="03cv......51n0"
              name="cosmic galaxy"
              price="0.0023"
            />
          </div>
          <div className="col-span-12">
            <NftTableDropdown {...{ transactions }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Release;
