import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import { OpenFormatProvider } from "@simpleweb/open-format-react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <OpenFormatProvider config={{ network: "mumbai" }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </OpenFormatProvider>
    </>
  );
};

export default MyApp;
