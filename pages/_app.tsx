import "styles/globals.css";
import { OpenFormatProvider } from "@simpleweb/open-format-react";
import Footer from "components/footer";
import Header from "components/header";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";

const App = ({ Component, pageProps }: AppProps) => {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{t("app.head.title")}</title>
        <link rel="icon" href="/icons/logo_small.png" />
      </Head>
      <OpenFormatProvider
        config={{
          network: process.env.NEXT_PUBLIC_NETWORK as string,
          factory: process.env.NEXT_PUBLIC_FACTORY_ID,
          nftStorageToken: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
        }}
      >
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
