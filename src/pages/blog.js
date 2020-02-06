import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {BlogPostPreview} from "../components/blog-post";

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allSitePage.edges;

    return (
        <Layout location={this.props.location} title={siteTitle}>
          <SEO title="All posts" />

          {posts.map(({ node }) => {
            return (
                <BlogPostPreview
                    key={node.parent.fields.slug}
                    slug={node.parent.fields.slug}
                    path={node.path}
                    frontmatter={node.parent.frontmatter}
                    excerpt={node.parent.excerpt}
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
        allSitePage (
            filter: { context: { sourceName: { eq: "blog"} } }
            sort: { fields: [context___postDate], order: DESC }
        ) {
            edges {
                node {
                    path
                    parent {
                        ... on MarkdownRemark {
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
        }
    }
`;
