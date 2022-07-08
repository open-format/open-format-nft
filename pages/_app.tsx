import "styles/globals.css";
import { OpenFormatProvider } from "@simpleweb/open-format-react";
import Footer from "components/footer";
import Header from "components/header";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
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
