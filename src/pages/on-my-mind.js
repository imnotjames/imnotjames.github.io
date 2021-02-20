import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {Thought} from "../components/thought";

export default function OnMyMindIndex (
    {
        data: {
          site: {siteMetadata: {title: siteTitle}},
          thoughts: {edges: thoughts},
        },
        location
   }
) {
  return (
      <Layout location={location} title={siteTitle}>
        <SEO title="What's On My Mind.." />

        {thoughts.map(({ node }) => {
          const permalinkPath = `/on-my-mind${node.fields.slug}`;

          return (
              <Thought
                  key={node.fields.slug}
                  slug={node.fields.slug}
                  path={permalinkPath}
                  frontmatter={node.frontmatter}
                  html={node.html}
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
        thoughts: allMarkdownRemark (
            filter: { fields:{ sourceName: { eq: "thoughts"} } },
            sort: { fields: [frontmatter___date], order: DESC }
        ) {
            edges {
                node {
                    html
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
