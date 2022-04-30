import type { GetStaticProps, NextPage } from "next";
import { sortBy, prop, map, pipe } from "ramda";
import { ListItem } from "../components/ListItem";
import Head from "next/head";
import fs from "fs";
import matter from "gray-matter";
import { Article } from "../types";

interface Props {
  articles: Article[];
}

export const getStaticProps: GetStaticProps = async () => {
  const filenames = fs.readdirSync("_posts");

  const readAndParse = (filename: string) => {
    const slug = filename.replace(/\.mdx?$/, "");
    const file = fs.readFileSync(`_posts/${filename}`, "utf-8");
    const { data } = matter(file);
    return {
      ...data,
      slug,
    };
  };

  const articles = pipe(map(readAndParse), sortBy(prop("date")))(filenames);

  return {
    props: {
      articles,
    },
  };
};

const Home: NextPage<Props> = ({ articles }) => {
  return (
    <>
      <Head>
        <title>Rob Falken</title>
        <meta name="description" content="Rob Falken" />
        <link rel="icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;1,400&family=Orelega+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex">
        <div className="flex-grow bg-slate-100" />
        <div className="container h-screen flex">
          <aside className="w-1/3 bg-slate-100 h-full flex justify-end">
            <div className="mt-5 mr-10">
              <img src="/avatar.png" className="w-24 rounded-full" />
              Rob Falken
            </div>
          </aside>
          <main className="flex-grow p-10">
            {articles.map((article) => (
              <ListItem key={article.slug} article={article} />
            ))}
          </main>
        </div>
        <div className="flex-grow" />
      </div>
    </>
  );
};

export default Home;
