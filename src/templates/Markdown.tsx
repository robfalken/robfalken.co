import React, { useEffect } from "react";
import { graphql } from "gatsby";
import Prism from "prismjs";
import { Header } from "../components/Header";
import { CoverImage } from "../components/CoverImage";
import { PostTitle } from "../components/PostTitle";

export default ({
  data: {
    markdownRemark: {
      timeToRead,
      html,
      frontmatter: { image, title, date },
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
        <PostTitle date={date} timeToRead={timeToRead}>
          <h1 className="text-3xl">{title}</h1>
        </PostTitle>
        <main dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
};

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      timeToRead
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
