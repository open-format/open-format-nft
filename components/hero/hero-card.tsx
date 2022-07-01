import React from "react";

const HeroCard: React.FC = () => {
  return (
    <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
      <div className="sm:max-w-md shadow-md shadow-slate-500 sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
          alt=""
          className="object-center object-cover"
        />
        <div className="py-4 px-2 bg-white">
          <h3 className="mt-2 text-sm text-gray-700">Woman Looking at Phone</h3>
          <p className="mt-1 text-sm text-blue-500">
            0x2858b738580644D607af792bD0dd8430D20FF334
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
