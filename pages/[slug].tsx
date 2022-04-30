import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";

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

export const getStaticProps: GetStaticProps = ({ params: { slug } }) => {
  const file = fs.readFileSync(`_posts/${slug}.mdx`, "utf-8");
  const { data: frontMatter } = matter(file);
  return {
    props: {
      ...frontMatter,
      slug,
    },
  };
};

type Props = {
  title: string;
};

const ArticlePage: NextPage<Props> = ({ title }) => {
  return (
    <div>
      <h1 className="font-display font-bold text-2xl">{title}</h1>
    </div>
  );
};

export default ArticlePage;
