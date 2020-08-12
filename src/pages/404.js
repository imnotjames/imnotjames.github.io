import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default function NotFoundPage (
    {
      data: {
        site: {
          siteMetadata: {
            title: siteTitle
          }
        }
      },
      location
    }
) {
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1 style={{textAlign: "center"}}>
        (page not found)
      </h1>
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
  }
`;
