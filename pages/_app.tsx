import "styles/globals.css";
import { OpenFormatProvider } from "@simpleweb/open-format-react";
import Footer from "components/footer";
import Header from "components/header";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Open Format NFT</title>
        <link rel="icon" href="/icons/logo_small.png" />
      </Head>
      <OpenFormatProvider config={{ network: "mumbai" }}>
        <Header />
        <main>
          <Toaster />
          <Component {...pageProps} />
        </main>
        <Footer />
      </OpenFormatProvider>
    </>
  );
};

export default App;
