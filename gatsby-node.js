const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const express = require('express');

async function printPDF(pageName, options) {
  options = options || {};

  const publicPath = path.join(
      __dirname,
      'public',
  );

  const pdfPath = path.join(
      __dirname,
      'public',
      pageName + '.pdf',
  );

  const app = express();

  app.use(express.static(publicPath));

  const server = await app.listen(3000);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(`http://localhost:3000/${pageName}`, { waitUntil: 'networkidle0' });

  await page.pdf({
    format: 'A4',
    path: pdfPath,
    ...options
  });

  await browser.close();
  await server.close();
}

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

exports.onPostBuild = async () => {
  await printPDF('resume', { pageRanges: '1' });
};