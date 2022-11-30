import { OpenFormatProvider } from "@simpleweb/open-format-react";
import Footer from "components/footer";
import Header from "components/header";
import useTranslation from "next-translate/useTranslation";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import "styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{t("app.head.title")}</title>
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
