import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {BlogPostPreview} from "../components/blog-post";

export default function BlogIndex(
    {
        data: {
          site: {
            siteMetadata: {
              title: siteTitle
            }
          },
          blogPosts: {
            edges: posts
          }
        },
        location
    }
) {
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <Bio />
      <header
          style={{
            marginBottom: `32px`,
            height: `8px`,
            lineHeight: `12px`,
            borderBottom: `1px solid black`,
          }}
      >
        <h2
            style={{
              margin: 0,
              display: `inline-block`,
              fontSize: `12px`,
              lineHeight: `16px`,
              letterSpacing: `2px`,
              textTransform: `uppercase`,
              fontWeight: `bold`,
              backgroundColor: `#FFF`,
              paddingRight: `4px`,
              whiteSpace: `nowrap`,
              overflow: `hidden`,
            }}
        >
          Recent Blog Posts
        </h2>
      </header>
      {posts.map(({ node }) => {
        const postPath = `/blog${node.fields.slug}`;

        return (
          <div key={node.fields.slug}>
            <BlogPostPreview
              path={postPath}
              slug={node.fields.slug}
              frontmatter={node.frontmatter}
              excerpt={node.excerpt}
            />
          </div>
        );
      })}
    </Layout>
  )
}

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        blogPosts: allMarkdownRemark (
            filter: { fields:{ sourceName: { eq: "blog"} } }
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 3
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
