module.exports = {
  siteMetadata: {
    title: `DEFINITIVELY NOT JAMES`,
    author: `James Ward`,
    description: `WORD WORDS WORDS WORDS`,
    siteUrl: `https://notjam.es`,
    social: {
      email: `james@notjam.es`,
      twitter: `trulynotjames`,
      github: `imnotjames`,
      linkedin: `imnotjames`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/thoughts`,
        name: `thoughts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    `gatsby-transformer-json`,
    `gatsby-plugin-slug`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_separator: '<!-- end-excerpt -->',
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-emojis`,
          `gatsby-remark-normalize-paths`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true,
              prompt: {
                user: "user",
                host: "notjam.es",
                global: false,
              },
            }
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-images-native-lazy-load`,
            options: {
              loading: "lazy"
            }
          }
        ],
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-52852011-1`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `NOT JAMES`,
        short_name: `imnotjames`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#222`,
        display: `minimal-ui`,
        icon: `static/favicon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    'gatsby-plugin-remove-serviceworker',
  ],
};
