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
      <div className="py-6">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
