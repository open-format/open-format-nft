import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import { OpenFormatProvider } from "@simpleweb/open-format-react";
import { Toaster } from "react-hot-toast";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <OpenFormatProvider config={{ network: "mumbai" }}>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </OpenFormatProvider>
    </>
  );
};

export default MyApp;
