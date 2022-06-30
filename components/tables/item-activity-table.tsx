import React from "react";
const people = [
  {
    name: "Minted",
    title: "0x28......58b7",
    email: "03cv......51n0",
    role: "Member",
  },
  // More people...
];

const ItemActivityTable: React.FC = () => {
  return (
    <>
      <div className="sm:px-4">
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
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
                    {people.map((person) => (
                      <tr key={person.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Minted
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <a className="cursor-pointer" href="">
                            0.0023
                          </a>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-blue-500">
                          <a className="cursor-pointer" href="">
                            {person.email}
                          </a>
                        </td>
                        <td className="cursor-pointer whitespace-nowrap px-3 py-4 text-sm text-blue-500">
                          <a className="cursor-pointer" href="">
                            {person.title}
                          </a>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          19/09/2022
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
