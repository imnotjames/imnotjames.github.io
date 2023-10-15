import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components";

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundTitle = styled.h1`
  height: 50vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
`;

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
      <NotFoundTitle>
        page not found
      </NotFoundTitle>
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
