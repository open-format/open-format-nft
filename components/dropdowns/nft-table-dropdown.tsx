import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import React from "react";
import ItemActivityTable from "../tables/item-activity-table";

interface NftTableDropdownProps {
  transactions: Transaction[];
}

const NftTableDropdown: React.FC<NftTableDropdownProps> = ({
  transactions,
}) => {
  return (
    <Disclosure defaultOpen as="div">
      {({ open }) => (
        <div className="border-[1px] rounded-md mt-12 border-slate-200">
          <h3>
            <Disclosure.Button className="group relative w-full p-6 bg-white flex justify-between items-center text-left">
              <span className="text-gray-900 text-sm font-medium">
                Item Activity
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
            <ItemActivityTable {...{ transactions }} />
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default NftTableDropdown;
