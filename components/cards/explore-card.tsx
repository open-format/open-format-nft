import Link from "next/link";
import React from "react";

const ExploreCard: React.FC = () => {
  return (
    <Link href={"/"}>
      <div className="cursor-pointer hover:shadow-md hover:shadow-slate-300 transition-shadow flex flex-col border-2 max-h-max rounded-lg sm:overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
          alt=""
          className="h-52 object-cover"
        />
        <div className="-m-6 flex justify-start items-center flex-col">
          <img
            src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
            alt=""
            className="w-12 h-12 border-2 shadow-md shadow-slate-400 border-white flex justify-center items-center overflow-hidden relative rounded-full object-cover"
          />
        </div>
        <div className="flex h-48 flex-col text-center p-2 mt-2 justify-center items-center">
          <p>Woman holding phone</p>
          <p>
            by <span className="text-blue-500">0x2858b....0FF334</span>
          </p>
          <p className="mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            tempore sapiente nesciunt velit debitis odit illo tenetur sequi cum
            et.
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ExploreCard;
