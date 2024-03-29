import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import { GitHubIcon } from "../components/GitHubIcon";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <div>
          <div className="container mx-auto max-w-prose flex justify-between py-5 mb-5">
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
            <div>
              <a
                href="https://github.com/robfalken"
                className="hover:bg-slate-100 hover:text-slate-900 text-slate-800 block p-1 rounded"
              >
                <GitHubIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="container mx-auto max-w-prose">{children}</div>
      </body>
    </html>
  );
}
