import Link from "next/link";
import React from "react";

interface ExploreCardProps {
  description: string;
  name: string;
  creator: string;
  image: string;
  tokenId: string;
}

const ExploreCard: React.FC<ExploreCardProps> = ({
  description,
  name,
  creator,
  image,
  tokenId,
}) => {
  return (
    <Link href={`/explore/${tokenId}`}>
      <div className="cursor-pointer hover:shadow-md hover:shadow-slate-300 transition-shadow flex flex-col border-2 max-h-max rounded-lg sm:overflow-hidden">
        <img src={image} alt="" className="h-52 object-cover" />
        <div className="-m-6 flex justify-start items-center flex-col">
          <img
            src={image}
            alt=""
            className="w-12 h-12 border-2 shadow-md shadow-slate-400 border-white flex justify-center items-center overflow-hidden relative rounded-full object-cover"
          />
        </div>
        <div className="flex h-48 flex-col text-center p-2 mt-2 justify-center items-center">
          <p>{name}</p>
          <p>
            by <span className="text-blue-500">{creator}</span>
          </p>
          <p className="mt-2">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ExploreCard;
