import { GetServerSideProps } from "next";
import React from "react";
import PuchaseCard from "../../components/cards/purchase-card";
import NFTDropdown from "../../components/dropdowns/nft-dropdown";
import NftTableDropdown from "../../components/dropdowns/nft-table-dropdown";
import { useRawRequest } from "@simpleweb/open-format-react";
import { gql } from "graphql-request";

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

interface ReleasePageProps {
  tokenId: string;
}

const Release: React.FC<ReleasePageProps> = ({ tokenId }) => {
  const getTokenDataQuery = gql`
    query ($tokenId: String!) {
      token(id: $tokenId) {
        id
        properties {
          key
          value
        }
        saleData {
          salePrice
        }
      }
    }
  `;

  const { data: nftData } = useRawRequest({
    query: getTokenDataQuery,
    variables: { tokenId },
  });

  console.log(nftData);

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context);

  const tokenId = context.query.id;
  return {
    props: {
      tokenId,
    },
  };
};
