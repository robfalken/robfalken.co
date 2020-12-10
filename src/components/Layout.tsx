import React, { useEffect } from "react";
import { Header } from "./Header";
import Prism from "prismjs";

interface IProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: IProps): React.ReactElement => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="border-t-2 border-orange-400">
      <div className="container max-w-3xl p-4 mx-auto">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};
