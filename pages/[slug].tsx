import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { Layout } from "../components/Layout";

export const getStaticPaths: GetStaticPaths = () => {
  const paths = fs.readdirSync("_posts").map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    return {
      params: {
        slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const file = fs.readFileSync(`_posts/${slug}.mdx`, "utf-8");
  const { data, content } = matter(file);

  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);
  console.log("html", value);

  return {
    props: {
      ...data,
      html: value,
      slug,
    },
  };
};

type Props = {
  title: string;
  html: string;
};

const ArticlePage: NextPage<Props> = ({ title, html }) => {
  return (
    <Layout>
      <h1 className="text-4xl font-display italic font-bold text-slate-700 mb-10">
        {title}
      </h1>
      <article
        className="prose prose-slate prose-headings:text-slate-700"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  );
};

export default ArticlePage;
