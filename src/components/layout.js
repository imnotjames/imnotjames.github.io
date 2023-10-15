import React from "react"
import { Link } from "gatsby"
import styled, { createGlobalStyle} from 'styled-components';
import { Reset } from 'styled-reset';
import { Helmet } from 'react-helmet'
/*
-  baseFontSize: "16px",
    -  baseLineHeight: 1.75,
    -  scaleRatio: 5 / 2,
    -  googleFonts: [{
-    name: "Prociono",
    -    styles: ["400", "400i", "700", "700i", "900", "900i"]
-  }],
-  headerFontFamily: ["Prociono", "Helvetica", "serif"],
    -  bodyFontFamily: ["Prociono", "Helvetica", "serif"],
    -  bodyColor: "#222",
    -  headerWeight: 900,
    -  bodyWeight: 400,
    -  boldWeight: 700,
    -  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }) => {
    -    return {
        -      a: {
        -        color: `#222`,
            -      }
    -    }
*/
const LayoutStyle = createGlobalStyle`
  body {
    font-size: 16px;
    font-family: Prociono, Helvetica, serif;
    color: #222;
    font-weight: 400;
  }
  
  b {
    font-weight: 700;
  }
  
  a {
    color: #222;
  }

`;

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
  max-width: 50rem;
  padding: 2.625rem 1.3125rem;

  @page {
    margin: 0 0;
  }
  @media print {
    max-width: max-content;
    padding: 8mm 10mm !important;
    margin: 0 !important;
  }
`;

const LayoutHeaderHeading = styled.h1`
  line-height: 70px;
  padding-bottom: 1.75rem;
  font-size: 50px;
  font-weight: 200;
  text-transform: uppercase;
  text-align: center;
`;

const LayoutHeaderHeadingLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  margin: 0 auto;
  position: relative;
  white-space: nowrap;
  padding-right: 30px;
`;

const MyName = styled.span`
  font-size: 12px;
  position: absolute;
  top: 0;
  right: -14px;
  transform: rotate(-90deg);
`;

const LayoutNav = styled.nav`
  margin-top: 8px;
  margin-bottom: 32px;
  line-height: 6px;
  height: 6px;
  border-bottom: 1px solid black;
`;

const LayoutNavList = styled.ul`
  text-align: center;
  margin: 0;
  padding: 0;
`;

function LayoutHeader() {
  return (
    <LayoutHeaderContainer>
      <LayoutHeaderHeading>
        <LayoutHeaderHeadingLink to={`/`}>
          <span className="long-word">Definitively</span> Not
          <MyName>
            ( James )
          </MyName>
        </LayoutHeaderHeadingLink>
      </LayoutHeaderHeading>
      <LayoutNav>
        <LayoutNavList>
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
        </LayoutNavList>
      </LayoutNav>
    </LayoutHeaderContainer>
  )
}

function Layout ({ location, title, children }) {
  return (
    <LayoutContainer>
      <Reset />
      <LayoutStyle/>
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
