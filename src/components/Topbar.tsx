import React from "react";
import Image from "next/image";
import { GitHubIcon } from "../components/GitHubIcon";
import { LinkedInIcon } from "@/components/LinkedInIcon";

export const Topbar: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto max-w-prose flex justify-between items-center py-5 mb-5">
        <div>
          <a href="/" className="font-bold text-sm hover:underline">
            <Image
              src="/robfalken.png"
              alt="Rob Falken"
              width={32}
              height={32}
              className="rounded inline"
            />
          </a>
        </div>
        <div className="flex">
          <a
            href="https://github.com/robfalken"
            className="hover:bg-zinc-100 hover:text-zinc-800 text-zinc-300 block p-1 rounded"
          >
            <GitHubIcon />
          </a>
          <a
            href="https://linkedin.com/in/robertfalken"
            className="hover:bg-sky-100 hover:text-sky-800 text-zinc-300 block p-1 rounded"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </div>
  );
};
