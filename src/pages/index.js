import React from "react";
import { Layout } from "../components/Layout";
import { graphql, Link } from "gatsby";
import SEO from "../components/seo";
import { pipe, pluck, path } from "ramda";

export const query = graphql`
  query ListPosts {
    allMarkdownRemark {
      nodes {
        frontmatter {
          slug
          date
          title
          excerpt
        }
      }
    }
  }
`;

const getPosts = pipe(
  path(["allMarkdownRemark", "nodes"]),
  pluck("frontmatter")
);

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      {getPosts(data).map(({ slug, title, excerpt }) => (
        <div key={slug} className="mb-16">
          <Link
            to={slug}
            className="block group hover:bg-gray-100 excerpt-link"
          >
            <h2 className="my-4 text-3xl">
              <span className="fancy-link">{title}</span>
            </h2>
            <p className="group-hover:text-black">{excerpt}</p>
          </Link>
        </div>
      ))}
    </Layout>
  );
};

export default IndexPage;
