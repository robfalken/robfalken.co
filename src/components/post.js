import { graphql } from "gatsby"
import React from "react"

export const query = graphql`
  query GetPost($slug: String!) {
    graphcms {
      post(where: { slug: $slug }) {
        title
        content {
          html
        }
      }
    }
  }
`

export default ({
  data: {
    graphcms: { post },
  },
}) => {
  return (
    <div>
      <div>{post.title}</div>
      <div dangerouslySetInnerHTML={{ __html: post.content.html }}></div>
    </div>
  )
}
