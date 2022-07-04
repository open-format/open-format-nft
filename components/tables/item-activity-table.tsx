import React from "react";

interface ItemActivityTableProps {
  transactions: Transaction[];
}

const ItemActivityTable: React.FC<ItemActivityTableProps> = ({
  transactions,
}) => {
  return (
    <>
      <div className="sm:px-4">
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-b-lg	">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Event
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        From
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        To
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {transactions.map((transaction) => (
                      <tr key={transaction.currentContractAddress}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Minted
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <a className="cursor-pointer" href="">
                            {transaction.price}
                          </a>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-blue-500">
                          <a className="cursor-pointer" href="">
                            {transaction.currentContractAddress}
                          </a>
                        </td>
                        <td className="cursor-pointer whitespace-nowrap px-3 py-4 text-sm text-blue-500">
                          <a className="cursor-pointer" href="">
                            {transaction.ownerId}
                          </a>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {transaction.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemActivityTable;
