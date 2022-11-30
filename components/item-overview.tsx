import Card from "components/card";
import StyledLink from "components/styled-link";
import { addressSplitter } from "helpers/address-splitter";
import Image from "next/image";

interface Props {
  name: string;
  description?: string;
  creator?: string;
  image: string;
  tokenId: string;
  action?: React.ReactNode;
}

function Loading() {
  return (
    <div className="w-full h-full">
      <div className="relative overflow-hidden rounded-lg bg-white/5 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-slate-200/10 before:bg-gradient-to-r before:from-transparent before:via-slate-100/10 before:to-transparent">
        <div className="aspect-w-1 aspect-h-1 rounded-lg rounded-b-none bg-slate-900/20" />
        <div className="relative mx-6 py-6 pt-12">
          <div className="absolute top-0 left-0 transform -translate-y-1/2 w-16 h-16 border-2 shadow-md shadow-slate-400 border-white flex justify-center items-center overflow-hidden rounded-lg object-cover"></div>
          <div className="space-y-3">
            <div className="h-3 w-2/5 rounded-lg bg-slate-400/20" />
            <div className="h-3 w-4/5 rounded-lg bg-slate-400/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ItemOverview({ name, creator, image, tokenId, action }: Props) {
  return (
    <Card>
      <div className="relative">
        <div className="flex flex-2 border-b border-slate-300 flex-col">
          <div className="relative aspect-w-1 aspect-h-1">
            <StyledLink href={`/explore/${tokenId}`} className="cursor-pointer">
              <Image
                priority={true}
                blurDataURL="/images/placeholder.png"
                placeholder="blur"
                layout="fill"
                src={image}
                alt=""
                className="object-cover transform group-hover:scale-105 transition-transform ease-in-out duration-300"
              />
            </StyledLink>
          </div>
        </div>
        <div className="bg-white">
          <div className="relative flex justify-start items-center mx-6 py-6 pt-12">
            <div className="flex flex-col">
              <img
                src={image}
                alt={`${name} avatar`}
                className="absolute top-0 left-0 transform -translate-y-1/2 w-16 h-16 border-2 shadow-md shadow-slate-400 border-white flex justify-center items-center overflow-hidden rounded-lg object-cover"
              />
              <StyledLink
                href={`/explore/${tokenId}`}
                className="cursor-pointer"
              >
                <p className="font-bold">{name}</p>
              </StyledLink>
              <p className="w-full truncate">
                By{" "}
                <span title={creator} className="text-blue-500">
                  {creator && addressSplitter(creator)}
                </span>
              </p>
            </div>
          </div>
          {action && <div className="mx-6 pb-6">{action}</div>}
        </div>
      </div>
    </Card>
  );
}

ItemOverview.Loading = Loading;

export default ItemOverview;
