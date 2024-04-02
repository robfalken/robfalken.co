import { Topbar } from "@/components/Topbar";
import "./globals.css";
import type { Metadata } from "next";
import { Source_Serif_4, Oswald } from "next/font/google";

const sans = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
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
        <div className="h-0.5 bg-gradient-to-r to-orange-400 from-brand"></div>
        <Topbar />
        <div className="container mx-auto max-w-prose">{children}</div>
      </body>
    </html>
  );
}
