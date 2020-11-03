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
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <img src={post.coverImage.url} className="py-8" />
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      ></div>
    </Layout>
  );
};