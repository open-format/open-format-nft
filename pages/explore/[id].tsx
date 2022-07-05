import { GetServerSideProps } from "next";
import React from "react";
import PuchaseCard from "../../components/cards/purchase-card";
import NFTDropdown from "../../components/dropdowns/nft-dropdown";
import NftTableDropdown from "../../components/dropdowns/nft-table-dropdown";
import { useRawRequest } from "@simpleweb/open-format-react";
import { gql } from "graphql-request";
import getMetaValue from "../../helpers/get-meta-value";
import transformURL from "../../helpers/transform-url";

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
        creator {
          id
        }
      }
    }
  `;

  const { data: nftData } = useRawRequest({
    query: getTokenDataQuery,
    variables: { tokenId },
  });

  const tokenData = nftData?.token;
  const createdBy = tokenData?.creator?.id;
  const properties = tokenData?.properties;
  const price = tokenData?.saleData?.salePrice;

  //This compponent
  const image = transformURL(getMetaValue(properties, "image") as string) ?? "";
  //NFTDropdown props
  const description = (getMetaValue(properties, "description") as string) ?? "";
  const name = (getMetaValue(properties, "name") as string) ?? "";
  //Purchase Card props

  //Prop builder
  const nftDropdownProps = {
    name,
    description,
  };

  //Prop builder
  const purchaseCardProps = {
    createdBy,
    name,
    price,
  };

  const getTransactionHistory = gql`
    query ($tokenId: String!) {
      transactions(where: { token: $tokenId }) {
        id
        from
        to
        timestamp
        token {
          saleData {
            salePrice
          }
        }
      }
    }
  `;

  const { data: transactionData } = useRawRequest({
    query: getTransactionHistory,
    variables: { tokenId },
  });

  console.log(transactionData);

  const transactions = transactionData?.transactions?.map(
    (transaction: any) => {
      return {
        event: "Minted",
        from: transaction.from,
        to: transaction.to,
        date: transaction.timestamp,
        price: transaction.token.saleData.salePrice,
      };
    }
  );
  console.log(transactions);

  return (
    <>
      <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6 lg:max-w-6xl lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="mt-2 lg:col-span-4 lg:row-start-1">
            <h2 className="sr-only">NFT</h2>
            <div>
              <img
                src={image}
                className="object-cover min-w-full lg:col-span-2 lg:row-span-2 rounded-lg"
              />
            </div>

            <NFTDropdown {...{ nftDropdownProps }} />
          </div>
          <div className="mt-2 lg:col-span-8">
            <PuchaseCard {...{ purchaseCardProps }} />
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
