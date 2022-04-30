import type { GetStaticProps, NextPage } from "next";
import { sortBy, prop, map, pipe, reverse } from "ramda";
import { ListItem } from "../components/ListItem";
import Head from "next/head";
import fs from "fs";
import matter from "gray-matter";
import { Article } from "../types";
import { Layout } from "../components/Layout";

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

  const articles = pipe<any, any, any, any>(
    map(readAndParse),
    sortBy(prop("date")),
    reverse
  )(filenames);

  return {
    props: {
      articles,
    },
  };
};

const Home: NextPage<Props> = ({ articles }) => {
  return (
    <Layout>
      {articles.map((article) => (
        <ListItem key={article.slug} article={article} />
      ))}
    </Layout>
  );
};

export default Home;
