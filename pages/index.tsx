import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import fs from "fs";
import matter from "gray-matter";

interface Props {
  posts: {
    slug: string;
    title: string;
    excerpt: string;
  }[];
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = fs.readdirSync("_posts").map((filename) => {
    const slug = filename.replace(/\.mdx?$/, "");
    const file = fs.readFileSync(`_posts/${filename}`, "utf-8");
    const { data: frontMatter } = matter(file);
    return {
      ...frontMatter,
      slug,
    };
  });

  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Rob Falken</title>
        <meta name="description" content="Rob Falken" />
        <link rel="icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" /> 
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> 
<link href="https://fonts.googleapis.com/css2?family=Kanit:wght@700&display=swap" rel="stylesheet" />

      </Head>
      <div className="flex h-full">
        <aside className="w-1/3 bg-slate-100 h-full flex justify-end">
          <div className="mt-5 mr-10">
            <img src="/avatar.png" className="w-24 rounded-full" />
            Rob Falken
          </div>
        </aside>
        <main className="flex-grow p-10">
          {posts.map((post) => (
            <div key={post.slug}>
              <h2 className="text-4xl font-bold font-display text-slate-700">{post.title}</h2>
              <div>{post.excerpt}</div>
            </div>
          ))}
        </main>
      </div>
    </>
  );
};

export default Home;
