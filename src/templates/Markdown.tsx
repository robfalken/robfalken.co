import React, { useEffect } from "react";
import { graphql } from "gatsby";
import Prism from "prismjs";
import { Header } from "../components/Header";
import { ClockIcon } from "../components/ClockIcon";
import { CalendarIcon } from "../components/CalendarIcon";
import { CoverImage } from "../components/CoverImage";

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
        <div className="my-4">
          <h1 className="text-3xl">{title}</h1>
          <div className="flex items-center font-sans text-sm text-gray-600">
            <CalendarIcon className="relative w-3 h-3 mr-1 text-gray-400" />
            <div>{date}</div>
            <ClockIcon className="relative w-3 h-3 ml-5 mr-1 text-gray-400" />
            <div>{timeToRead} min read</div>
          </div>
        </div>
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
