import React, { useEffect } from "react";
import { graphql } from "gatsby";
import Prism from "prismjs";
import { Header } from "../components/Header";
import { CoverImage } from "../components/CoverImage";

export default ({
  data: {
    markdownRemark: {
      html,
      frontmatter: { image, title },
    },
  },
}) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="border-t-2 border-orange-400">
      <CoverImage image={image} />
      <div className="container max-w-3xl p-4 mx-auto">
        <Header />
        <h1 className="my-4 text-3xl">{title}</h1>
        <main dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
};

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        image {
          publicURL
        }
      }
    }
  }
`;
