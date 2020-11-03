import React from "react";
import { Layout } from "../components/Layout";
import { graphql } from "gatsby";
import SEO from "../components/seo";
import { PostExcerpt } from "../components/PostExcerpt";

export const query = graphql`
  query ListPosts {
    graphcms {
      posts {
        slug
        title
        excerpt
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const { posts } = data.graphcms;

  return (
    <Layout>
      <SEO title="Home" />
      {posts.map((post) => (
        <div key={post.slug}>
          <PostExcerpt post={post} />
        </div>
      ))}
    </Layout>
  );
};

export default IndexPage;
