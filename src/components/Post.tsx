import { graphql } from "gatsby";
import React from "react";
import { Layout } from "./Layout";
import "../stylesheets/tailwind.src.css";

export const query = graphql`
  query GetPost($slug: String!) {
    graphcms {
      post(where: { slug: $slug }) {
        title
        content {
          html
        }
        coverImage {
          url
        }
      }
    }
  }
`;

export default ({
  data: {
    graphcms: { post },
  },
}) => {
  return (
    <Layout>
      <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
      {post.coverImage && <img src={post.coverImage.url} className="py-8" />}
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      ></div>
    </Layout>
  );
};
