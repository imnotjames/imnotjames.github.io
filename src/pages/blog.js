import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {BlogPostPreview} from "../components/blog-post";

class BlogIndex extends React.Component {
  render() {
    const {
      site: { siteMetadata: { title: siteTitle } },
      posts: { edges: posts }
    } = this.props.data;

    return (
        <Layout location={this.props.location} title={siteTitle}>
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
    )
  }
}

export default BlogIndex

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
