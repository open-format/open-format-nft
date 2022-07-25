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
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { string } from "yup";

export default function Release() {
  const [isMounted, setIsMounted] = useState<boolean>(false); // Need this for the react-tooltip
  const [tooltip, showTooltip] = useState<boolean>(false);
  const { t } = useTranslation("common");
  const { query } = useRouter();
  const id = query.id;
  const tokenId = id as string;

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

  const { data: nftData, isFetchedAfterMount: isFreshDataAfterChanging } =
    useRawRequest({
      query: getTokenDataQuery,
      variables: { tokenId },
    });

  const getTransactionHistory = gql`
    query ($tokenId: String!) {
      transactions(
        where: { token: $tokenId }
        orderBy: timestamp
        orderDirection: desc
      ) {
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

  const { data: transactionData, isLoading } = useRawRequest({
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
      <Head>
        <title>
          {name} {t("nft.head.title")}
        </title>
      </Head>
      <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6 lg:max-w-6xl lg:px-8">
        {isFreshDataAfterChanging ? (
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
        ) : (
          <div className="flex items-center justify-center">
            <div className="flex w-10/12 flex-col bg-slate-200 items-center rounded-sm py-24">
              <h2 className="text-center">
                We are retrieving the data for this NFT, this shouldn{"'"}t take
                to long please wait....
              </h2>
              <svg
                role="status"
                className="mt-12 h-12 w-12  animate-spin items-center fill-white text-blue-500 dark:text-blue-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
