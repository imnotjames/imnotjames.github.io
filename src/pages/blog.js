import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {BlogPostPreview} from "../components/blog-post";

export default function BlogIndex (
    {
        data: {
          site: {siteMetadata: {title: siteTitle}},
          posts: {edges: posts},
        },
        location
   }
) {
  return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />

        {posts.map(({ node }) => {
          const postPath = `/blog${node.fields.slug}`;

          return (
              <BlogPostPreview
                  key={node.fields.slug}
                  slug={node.fields.slug}
                  path={postPath}
                  frontmatter={node.frontmatter}
                  excerpt={node.excerpt}
              />
          );
        })}
      </Layout>
  );
}

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        posts: allMarkdownRemark (
            filter: { fields:{ sourceName: { eq: "blog"} } }
            sort: { fields: [frontmatter___date], order: DESC }
        ) {
            edges {
                node {
                    excerpt
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "YYYY/MM/DD")
                        time: date(formatString: "HH:mm z")
                        title
                    }
                }
            }
        }
    }
`;
