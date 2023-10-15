import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components';
import { Helmet } from 'react-helmet'

import { rhythm } from "../utils/typography"

const NavigationItem = styled.li`
list-style: none;
display: inline-block;
text-transform: uppercase;
font-weight: bold;
letter-spacing: 2px;
font-size: 12px;
line-height: 12px;
margin: 0;

a {
  background-color: #FFF;
  margin: 0 1em;
  padding: 0 0.8em;
  
  color: #222;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
}
`;

const LayoutHeaderContainer = styled.header`
  position: relative;
  margin-top: -42px;
  
  @media print {
    display: none;
  }
`;

const LayoutContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(30)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};

  @page {
    margin: 0 0;
  }
  @media print {
    max-width: max-content;
    padding: 8mm 10mm !important;
    margin: 0 !important;
  }
`;

function LayoutHeader() {
  return (
    <LayoutHeaderContainer>
      <h1
          className="title"
          style={{
            lineHeight: `70px`,
            fontSize: `50px`,
            fontWeight: 200,
            textTransform: `uppercase`,
            textAlign: `center`,
          }}
      >
        <Link
            to={`/`}
            style={{
              textDecoration: `none`,
              color: `inherit`,
              margin: `0 auto`,
              position: `relative`,
              whiteSpace: `nowrap`,
              paddingRight: `30px`,
            }}
        >
          <span className="long-word">Definitively</span> Not
          <span
              className="my-name"
              style={{
                fontSize: `12px`,
                position: `absolute`,
                top: '0',
                right: `-14px`,
                transform: "rotate(-90deg)"
              }}
          >
            ( James )
          </span>
        </Link>
      </h1>
      <nav
          style={{
            marginTop: `8px`,
            marginBottom: `32px`,
            lineHeight: `6px`,
            height: `6px`,
            borderBottom: `1px solid black`,
          }}
        >
        <ul
            style={{
              textAlign: `center`,
              margin: 0,
              padding: 0,
            }}
          >
          <NavigationItem>
            <Link to={`/blog/`}>
              Blog
            </Link>
          </NavigationItem>

          <NavigationItem>
            <Link to={`/resume/`}>
              Resume
            </Link>
          </NavigationItem>

          <NavigationItem>
            <Link to={`/lets-chat/`}>
              Let's Chat
            </Link>
          </NavigationItem>

          <NavigationItem>
            <Link to={`/on-my-mind/`}>
              On My Mind..
            </Link>
          </NavigationItem>
        </ul>
      </nav>
    </LayoutHeaderContainer>
  )
}

function Layout ({ location, title, children }) {
  return (
    <LayoutContainer>
      <Helmet defer={false}>
        <meta http-equiv="Permissions-Policy" content="interest-cohort=()" />
      </Helmet>
      <LayoutHeader
          location={location}
          title={title}
        />
      <main>{children}</main>
    </LayoutContainer>
  );
}

export default Layout
