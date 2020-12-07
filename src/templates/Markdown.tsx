import React, { useEffect } from "react";
import { graphql } from "gatsby";
import Prism from "prismjs";
import { Header } from "../components/Header";

export default ({
  data: {
    markdownRemark: { html },
  },
}) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="border-t-2 border-orange-400">
      <div className="container max-w-3xl p-4 mx-auto">
        <Header />
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
      }
    }
  }
`;
