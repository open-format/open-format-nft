import { useMint, useRawRequest } from "@simpleweb/open-format-react";
import Meta from "components/meta";
import ItemActivity from "components/item-activity";
import Puchase from "components/purchase";
import { gql } from "graphql-request";
import getMetaValue from "helpers/get-meta-value";
import transformURL from "helpers/transform-url";
import { GetServerSideProps } from "next";
import React from "react";
import toast from "react-hot-toast";

interface Props {
  tokenId: string;
}

export default function Release({ tokenId }: Props) {
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
          totalSold
          maxSupply
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

  const { mint, isLoading: minting } = useMint();
  const submitPurchase = async (address: string) => {
    try {
      if (typeof address !== "string") {
        throw new Error("Contract address not sent");
      }

      await toast.promise(mint({ contractAddress: address }), {
        loading: "Please confirm the transaction in your wallet",
        success: "Purchase complete",
        error: "Minting error",
      });
    } catch (error) {
      console.log("handleDeploy", error);
    }
  };

  const tokenData = nftData?.token;
  const createdBy = tokenData?.creator?.id;
  const properties = tokenData?.properties;
  const maxSupply = nftData?.token?.saleData?.maxSupply;
  const totalSold = nftData?.token?.saleData?.totalSold;
  const price = tokenData?.saleData?.salePrice;
  const image = transformURL(getMetaValue(properties, "image") as string) ?? "";
  const description = (getMetaValue(properties, "description") as string) ?? "";
  const name = getMetaValue(properties, "name") as string;

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

            <Meta
              {...{
                name,
                createdBy,
                description,
                tokenId,
                totalSold,
                maxSupply,
              }}
            />
          </div>
          <div className="mt-2 lg:col-span-8">
            <Puchase
              {...{
                createdBy,
                name,
                price,
                submitPurchase,
                tokenId,
                minting,
                totalSold,
                maxSupply,
              }}
            />
          </div>
          <div className="col-span-12">
            <ItemActivity
              transactions={transactionData?.transactions?.map(
                (transaction: RawTransaction) => {
                  return {
                    event: "Minted",
                    from: transaction.from,
                    to: transaction.to,
                    date: transaction.timestamp,
                    price: transaction.token.saleData.salePrice,
                  };
                }
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tokenId = context.query.id;
  return {
    props: {
      tokenId,
    },
  };
};
