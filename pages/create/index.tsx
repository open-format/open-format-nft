import { NextPage } from "next";
import React from "react";
import CreateReleaseForm from "components/forms/create-release";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";

const Create: NextPage = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{t("create.head.title")}</title>
      </Head>
      <div className="grid grid-auto lg:grid-cols-12">
        <div className="px-12 lg:col-start-4 lg:col-end-10 mt-12 col-span-6">
          <h1 className="text-4xl font-bold pb-6">{t("create.title")}</h1>
          <CreateReleaseForm />
        </div>
      </div>
    </>
  );
};

export default Create;
