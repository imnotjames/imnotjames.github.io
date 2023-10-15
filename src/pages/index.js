import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components";

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {BlogPostPreview} from "../components/blog-post";

const BlogIndexHeader = styled.header`
  margin-bottom: 32px;
  height: 8px;
  line-height: 12px;
  border-bottom: 1px solid black;
`;

const BlogIndexHeading = styled.h2`
  margin: 0;
  display: inline-block;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: bold;
  background-color: #FFF;
  padding-right: 4px;
  white-space: nowrap;
  overflow: hidden;
`;

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
      <BlogIndexHeader>
        <BlogIndexHeading>
          Recent Blog Posts
        </BlogIndexHeading>
      </BlogIndexHeader>
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
