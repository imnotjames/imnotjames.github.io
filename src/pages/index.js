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
        <hr />
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
            description
          }
        }
      }
    }
  }
`;
