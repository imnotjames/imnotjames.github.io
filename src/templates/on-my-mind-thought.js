import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components";

import Layout from "../components/layout"
import SEO from "../components/seo"
import {Thought} from "../components/thought";

const ThoughtNavigationUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`;

const ThoughtNavigation = ({ previous, next }) => {
    return (
        <nav>
            <ThoughtNavigationUl>
                <li>
                    {previous && (
                        <Link to={`/on-my-mind${previous.fields.slug}`} rel="prev">
                            ← {previous.frontmatter.date}
                        </Link>
                    )}
                </li>
                <li>
                    {next && (
                        <Link to={`/on-my-mind${next.fields.slug}`} rel="next">
                            {next.frontmatter.date} →
                        </Link>
                    )}
                </li>
            </ThoughtNavigationUl>
        </nav>
    )
}

export default function ThoughtTemplate(
    {
        data: {
          site: {
            siteMetadata: {
              title: siteTitle
            }
          },
          thought,
          previous,
          next
        },
        location
    }
) {
  return (
    <Layout location={location} title={siteTitle}>
      <SEO
          title={`Thoughts on ${thought.frontmatter.date}`}
          description={thought.frontmatter.description || thought.excerpt}
        />
      <Thought
          frontmatter={thought.frontmatter}
          slug={thought.slug}
          path={`/on-my-mind${thought.fields.slug}`}
          html={thought.html}
        />

      <ThoughtNavigation previous={previous} next={next} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query ThoughtBySlug($slug: String!, $previous: String, $next: String) {
    site {
      siteMetadata {
        title
        author
      }
    }
    thought: markdownRemark(fields: { slug: { eq: $slug }, sourceName: { eq: "thoughts" } }) {
      id
      html
      excerpt
      fields {
          slug
      }
      frontmatter {
        date(formatString: "YYYY/MM/DD")
      }
    }
    previous: markdownRemark(fields: { slug: { eq: $previous }, sourceName: { eq: "thoughts" } }) {
        id
        fields {
            slug
        }
        frontmatter {
            date(formatString: "YYYY/MM/DD")
        }
    }
    next: markdownRemark(fields: { slug: { eq: $next }, sourceName: { eq: "thoughts" } }) {
        id
        fields {
            slug
        }
        frontmatter {
            date(formatString: "YYYY/MM/DD")
        }
    }
  }
`;
