import React from "react";
import { Link } from "gatsby";

export const Header = (): React.ReactElement => {
  return (
    <header className="border-b border-gray-200 my-8 pb-8">
      <h3 className="text-2xl">
        <Link to="/" className="hover:underline">
          Rob Falken
        </Link>
      </h3>
      <div className="italic text-sm">
        Tech, business, and everything in between.
      </div>
    </header>
  );
};
