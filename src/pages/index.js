import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {BlogPostPreview} from "../components/blog-post";

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;

    return (
      <Layout location={this.props.location} title={siteTitle}>
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
                letterSpacing: `2px`,
                textTransform: `uppercase`,
                fontWeight: `bold`,
                backgroundColor: `#FFF`,
                paddingRight: `4px`,
                whiteSpace: `nowrap`,
                overflowX: `hidden`,
              }}
          >
            Recent Blog Posts
          </h2>
        </header>
        {posts.map(({ node }) => {
          return (
            <div key={node.fields.slug}>
              <BlogPostPreview
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
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
        filter: { fields: { sourceName: { eq: "blog"} } }
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