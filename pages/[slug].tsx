import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

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
    <div>
      <h1 className="font-display font-bold text-2xl">{title}</h1>
      <article
        className="prose prose-headings:font-display"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default ArticlePage;
