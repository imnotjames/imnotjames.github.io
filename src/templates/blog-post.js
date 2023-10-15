import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components";

import Layout from "../components/layout"
import SEO from "../components/seo"

import {BlogPost} from "../components/blog-post";

const BlogPostPaginationUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`;

const BlogPostNavigation = ({ previous, next }) => {
    return (
        <nav>
            <BlogPostPaginationUl>
                <li>
                    {previous && (
                        <Link to={`/blog${previous.fields.slug}`} rel="prev">
                            ← {previous.frontmatter.title}
                        </Link>
                    )}
                </li>
                <li>
                    {next && (
                        <Link to={`/blog${next.fields.slug}`} rel="next">
                            {next.frontmatter.title} →
                        </Link>
                    )}
                </li>
            </BlogPostPaginationUl>
        </nav>
    )
}

export default function BlogPostTemplate(
    {
        data: {
          site: {
            siteMetadata: {
              title: siteTitle
            }
          },
          post,
          previous,
          next
        },
        location
    }
) {
  return (
    <Layout location={location} title={siteTitle}>
      <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
      <BlogPost
          frontmatter={post.frontmatter}
          slug={post.slug}
          path={`/blog${post.fields.slug}`}
          html={post.html}
        />

        <BlogPostNavigation previous={previous} next={next} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $previous: String, $next: String) {
    site {
      siteMetadata {
        title
        author
      }
    }
    post: markdownRemark(fields: { slug: { eq: $slug }, sourceName: { eq: "blog" } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
          slug
      }
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
        time: date(formatString: "HH:mm z")
      }
    }
    previous: markdownRemark(fields: { slug: { eq: $previous }, sourceName: { eq: "blog" } }) {
        id
        fields {
            slug
        }
        frontmatter {
            title
        }
    }
    next: markdownRemark(fields: { slug: { eq: $next }, sourceName: { eq: "blog" } }) {
        id
        fields {
            slug
        }
        frontmatter {
            title
        }
    }
  }
`;
