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
                    key={node.context.slug}
                    slug={node.context.slug}
                    path={node.path}
                    frontmatter={node.context.frontmatter}
                    excerpt={node.context.excerpt}
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
            sort: { fields: [context___frontmatter___date], order: DESC }
        ) {
            edges {
                node {
                    path
                    context {
                        excerpt
                        slug
                        frontmatter {
                            date # date(formatString: "YYYY/MM/DD")
                            time: date # time: date(formatString: "HH:mm z")
                            title
                        }
                    }
                }
            }
        }
    }
`;
