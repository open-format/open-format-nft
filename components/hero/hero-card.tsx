import React from "react";

interface HeroCardProps {
  name: string;
  creator: string;
  image: string;
}

const HeroCard: React.FC<HeroCardProps> = ({ name, creator, image }) => {
  return (
    <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
      <div className="sm:max-w-md shadow-md shadow-slate-500 sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
        <img src={image} alt="" className="object-center object-cover" />
        <div className="py-4 px-2 bg-white">
          <h3 className="mt-2 text-sm text-gray-700">{name}</h3>
          <p className="mt-1 text-sm text-blue-500">{creator}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
