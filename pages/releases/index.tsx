import { NextPage } from "next";
import Head from "next/head";
import Container from "./container";

const Releases: NextPage = () => {
  return (
    <>
      <Head>
        <title>Releases</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Container />
      </div>
    </>
  );
};

export default Releases;
