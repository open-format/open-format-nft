import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import StyledLink from "components/styled-link";
import Table from "components/table";
import dayjs from "dayjs";
import { ethers } from "ethers";
import useTranslation from "next-translate/useTranslation";
import React from "react";

interface Props {
  transactions?: Transaction[];
}

export default function ItemActivity({ transactions }: Props) {
  const { t } = useTranslation("common");
  return (
    <Disclosure defaultOpen as="div">
      {({ open }) => (
        <div className="border rounded-md border-slate-200">
          <h3>
            <Disclosure.Button className="group rounded-md relative w-full p-6 bg-white flex justify-between items-center text-left">
              <span className="text-gray-900 text-sm font-medium">
                {t("itemActivity.title")}
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
            <Table>
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    {t("itemActivity.tdOne")}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {t("itemActivity.tdTwo")}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {t("itemActivity.tdThree")}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {t("itemActivity.tdFive")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {transactions?.map((transaction, index) => (
                  <tr key={`${transaction.from}${index}`}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {t("itemActivity.event")}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <a className="cursor-pointer" href="">
                        {ethers.utils.formatEther(transaction.price.toString())}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-blue-500">
                      <StyledLink
                        openInNewTab={true}
                        href={`${process.env.NEXT_PUBLIC_POLYGON_SCAN}/address/${transaction.from}`}
                      >
                        {transaction.from}
                      </StyledLink>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {dayjs(parseInt(transaction.date) * 1000).format(
                        "DD/MM/YYYY"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
