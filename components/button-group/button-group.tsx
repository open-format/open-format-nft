import {
  BookmarkIcon,
  DotsVerticalIcon,
  RefreshIcon,
  ShareIcon,
} from "@heroicons/react/solid";
import React from "react";

export const ButtonGroup: React.FC = () => {
  return (
    <span className="flex">
      <button
        type="button"
        className="flex justify-center items-center p-4 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <RefreshIcon className="h-5 w-5 text-slate-900" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="-ml-px flex justify-center p-4 items-center border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <ShareIcon className="h-5 w-5 text-slate-900" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="-ml-px flex justify-center items-center pl-5 pr-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <DotsVerticalIcon
          className="-ml-1 mr-2 h-5 w-5 text-slate-900"
          aria-hidden="true"
        />
      </button>
    </span>
  );
};
