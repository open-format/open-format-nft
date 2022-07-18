import { NextPage } from "next";
import React from "react";
import CreateReleaseForm from "components/forms/create-release";
import Head from "next/head";

const Create: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create your very own NFT | Open Format</title>
      </Head>
      <div className="grid grid-auto lg:grid-cols-12">
        <div className="px-12 lg:col-start-4 lg:col-end-10 mt-12 col-span-6">
          <h1 className="text-4xl font-bold pb-6">Create New Item</h1>
          <CreateReleaseForm />
        </div>
      </div>
    </>
  );
};

export default Create;
