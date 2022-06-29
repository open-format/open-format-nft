import { ReactNode } from "react";

interface ILayout {
  children: ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }: ILayout) => {
  return (
    <div className="mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-8">
      <main>{children}</main>
    </div>
  );
};

export default Layout;
