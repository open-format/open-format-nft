import { useRawRequest } from "@simpleweb/open-format-react";
import { NextPage } from "next";
import { gql } from "graphql-request";
import Head from "next/head";
import ExploreCard from "../../components/cards/explore-card";
import ExploreNavigation from "../../components/navigations/explore-navigation";

const navigation = [
  { name: "Trending", href: "/" },
  { name: "Top", href: "/about" },
  { name: "Art", href: "/art" },
  { name: "Collectables", href: "/events" },
  { name: "Music", href: "/articles" },
  { name: "Photography", href: "/contribute-art" },
  { name: "Articles", href: "/contribute-audio" },
  { name: "Sports", href: "/contribute-event" },
];

const Releases: NextPage = () => {
  const rawQuery = gql`
    query ($factory_id: String!) {
      tokens(where: { factory_id: $factory_id }) {
        id
        creator {
          id
        }
        properties {
          key
          value
        }
        saleData {
          maxSupply
          totalSold
        }
      }
    }
  `;

  const { data: historicTokens } = useRawRequest({
    query: rawQuery,
    variables: { factory_id: process.env.NEXT_PUBLIC_FACTORY_ID as string },
  });

  console.log(historicTokens);

  return (
    <>
      <Head>
        <title>Releases</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className=" my-12 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
              Explore Collections.
            </h1>
          </div>
        </div>
        <ExploreNavigation {...{ navigation }} />
        <div className="mt-12 px-6 grid grid-cols-1 gap-y-10 gap-x-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-y-4">
          <ExploreCard
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            tempore sapiente nesciunt velit debitis odit illo tenetur sequi cum
            et."
            name="Woman holding phone"
            creator="0x2858b....0FF334"
            image="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
          />
          <ExploreCard
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            tempore sapiente nesciunt velit debitis odit illo tenetur sequi cum
            et."
            name="Woman holding phone"
            creator="0x2858b....0FF334"
            image="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
          />
          <ExploreCard
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            tempore sapiente nesciunt velit debitis odit illo tenetur sequi cum
            et."
            name="Woman holding phone"
            creator="0x2858b....0FF334"
            image="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
          />
          <ExploreCard
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            tempore sapiente nesciunt velit debitis odit illo tenetur sequi cum
            et."
            name="Woman holding phone"
            creator="0x2858b....0FF334"
            image="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
          />
          <ExploreCard
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            tempore sapiente nesciunt velit debitis odit illo tenetur sequi cum
            et."
            name="Woman holding phone"
            creator="0x2858b....0FF334"
            image="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
          />
          <ExploreCard
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            tempore sapiente nesciunt velit debitis odit illo tenetur sequi cum
            et."
            name="Woman holding phone"
            creator="0x2858b....0FF334"
            image="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
          />
          <ExploreCard
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            tempore sapiente nesciunt velit debitis odit illo tenetur sequi cum
            et."
            name="Woman holding phone"
            creator="0x2858b....0FF334"
            image="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
          />
          <ExploreCard
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            tempore sapiente nesciunt velit debitis odit illo tenetur sequi cum
            et."
            name="Woman holding phone"
            creator="0x2858b....0FF334"
            image="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
          />
        </div>
      </div>
    </>
  );
};

export default Releases;
