import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import { Source_Serif_4, Source_Sans_3 } from "next/font/google";
import { GitHubIcon } from "../components/GitHubIcon";
import { LinkedInIcon } from "@/components/LinkedInIcon";

const sans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  title: "Rob Falken",
  description: "Rob Falken's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <div className="h-0.5 bg-brand"></div>
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
        <div className="container mx-auto max-w-prose">{children}</div>
      </body>
    </html>
  );
}
