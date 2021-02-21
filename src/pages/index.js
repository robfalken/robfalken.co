import React from "react";
import { Layout } from "../components/Layout";
import { graphql, Link } from "gatsby";
import SEO from "../components/seo";
import { pipe, path } from "ramda";
import { PostTitle } from "../components/PostTitle";

export const query = graphql`
  query ListPosts {
    allMarkdownRemark(filter: { frontmatter: { listed: { ne: false } } }) {
      nodes {
        timeToRead
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

const getPosts = pipe(path(["allMarkdownRemark", "nodes"]));

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      {getPosts(data).map(
        ({ timeToRead, frontmatter: { slug, date, title, excerpt } }) => (
          <div key={slug} className="mb-16">
            <Link
              to={slug}
              className="block group hover:bg-gray-100 excerpt-link"
            >
              <PostTitle timeToRead={timeToRead} date={date}>
                <h2 className="text-3xl">
                  <span className="fancy-link">{title}</span>
                </h2>
              </PostTitle>
              <p className="group-hover:text-black">{excerpt}</p>
            </Link>
          </div>
        )
      )}
    </Layout>
  );
};

export default IndexPage;
