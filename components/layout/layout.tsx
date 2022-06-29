import { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

interface ILayout {
  children: ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }: ILayout) => {
  return (
    <>
      <Header />
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
