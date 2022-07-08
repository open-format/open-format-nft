import React from "react";

export default function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="sm:px-4">
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-b-lg">
              <table className="min-w-full divide-y divide-gray-300">
                {children}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
