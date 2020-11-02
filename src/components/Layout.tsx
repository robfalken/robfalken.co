import React from "react";

interface IProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: IProps): React.ReactElement => {
  return (
    <div>
      <header className="container mx-auto">Rob Falken</header>
      <main className="container mx-auto">{children}</main>
    </div>
  );
};
