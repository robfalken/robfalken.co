import React from "react";
import { Header } from "./Header";

interface IProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: IProps): React.ReactElement => {
  return (
    <div className="border-t-2 border-orange-400">
      <div className="container mx-auto max-w-3xl p-4">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};
