const path = require('path');

async function createBlogPages(graphql, actions) {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
      `
      {
        allMarkdownRemark(
          filter: {fields: {sourceName: { eq: "blog" } } }
          sort: { fields: [ frontmatter___date ], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors
  }

  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  await createBlogPages(graphql, actions)
};
