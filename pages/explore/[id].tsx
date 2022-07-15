import { useMint, useRawRequest } from "@simpleweb/open-format-react";
import Meta from "components/meta";
import ItemActivity from "components/item-activity";
import Puchase from "components/purchase";
import { gql } from "graphql-request";
import getMetaValue from "helpers/get-meta-value";
import transformURL from "helpers/transform-url";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ethers } from "ethers";
import PolygonLogo from "components/logo/polygon-logo";
import ReactTooltip from "react-tooltip";
import { HeartIcon } from "@heroicons/react/outline";

interface Props {
  tokenId: string;
}

export default function Release({ tokenId }: Props) {
  const [isMounted, setIsMounted] = useState<boolean>(false); // Need this for the react-tooltip
  const [tooltip, showTooltip] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      if (!ethers.utils.isAddress(address)) {
        throw new Error("Wallet address not valid");
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
        <div className="grid grid-cols-12 gap-x-8">
          <div className="mt-2 col-span-12 md:col-span-4 lg:row-start-1">
            <h2 className="sr-only">NFT</h2>
            <div className="py-4">
              <div className="border rounded-lg flex flex-col border-slate-200">
                <div className="flex items-center justify-between px-4 py-6">
                  <div
                    className="cursor-pointer"
                    data-for={"network"}
                    data-tip={"Polygon"}
                    onMouseEnter={() => showTooltip(true)}
                    onMouseLeave={() => {
                      showTooltip(false);
                      setTimeout(() => showTooltip(true), 100);
                    }}
                  >
                    <PolygonLogo />
                    {isMounted && tooltip && (
                      <ReactTooltip
                        id={"network"}
                        effect={"float"}
                        type={"dark"}
                        place={"bottom"}
                      />
                    )}
                  </div>
                  <div
                    className="cursor-pointer"
                    data-for={"likes"}
                    data-tip={"Coming soon"}
                    onMouseEnter={() => showTooltip(true)}
                    onMouseLeave={() => {
                      showTooltip(false);
                      setTimeout(() => showTooltip(true), 100);
                    }}
                  >
                    <HeartIcon className="w-6 h-6 text-slate-500" />
                    {isMounted && tooltip && (
                      <ReactTooltip
                        id={"likes"}
                        effect={"float"}
                        type={"dark"}
                        place={"bottom"}
                      />
                    )}
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <img
                    src={image}
                    className="object-cover min-w-full col-span-2 row-span-2 rounded-lg"
                  />
                </div>
              </div>
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
          <div className="py-4 order-first md:order-none col-span-12 md:col-span-8">
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
          <div className="col-span-12 py-8">
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
  const id = context.query.id as string;
  const tokenId = id.toLowerCase();

  return {
    props: {
      tokenId,
    },
  };
};
