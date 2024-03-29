import createWithMDX from "@next/mdx";

const withMDX = createWithMDX();

/** @type {import('next').NextConfig} */
export default withMDX({
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["mdx", "tsx"],
  // Optionally, add any other Next.js config below
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
});
