module.exports = {
  siteMetadata: {
    title: `Rob Falken`,
    description: `Tech, business, and everything in between.`,
    author: `@robfalken`,
  },
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "GraphCMS",
        fieldName: "graphcms",
        url: process.env.GRAPHCMS_ENDPOINT,
        // HTTP headers
        headers: {
          // Learn about environment variables: https://gatsby.dev/env-vars
          // Authorization: `Bearer ${process.env.TOKEN}`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          // https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Merriweather:ital@0;1&display=swap
          "Lora:400,700",
          "Merriweather:400i,700",
        ],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
