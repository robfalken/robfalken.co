const path = require("path")
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const GetPosts = `
query GetPosts {
  graphcms {
    posts {
      slug
    }
  }
}`

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const { data } = await graphql(GetPosts)

  data.graphcms.posts.map(post => {
    createPage({
      path: post.slug,
      component: path.resolve("./src/components/post.js"),
      context: post,
    })
  })
}
