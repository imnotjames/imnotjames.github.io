import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

import { rhythm } from "../utils/typography";

const BlogPostTimestampContainer = styled.h2`
  font-size: 16px;
  position: absolute;
  display: block;
  overflow: hidden;
  margin-bottom: ${rhythm(1)};
  width: 100px;
  height: 1.2em;
  top: -0.2em;
  right: 0;
  margin: 0;
  
  .date, .time {
    padding-left: 8px;
    background-color: #FFF;
    position: absolute;
    right: 0;
    transition: top 0.2s;
  }
  
  .date {
    top: 0;
  }
  
  .time {
    top: 100%;
  }
  
  &:hover, &:focus {
    .date {
      top: -100%;
    }
    .time {
      top: 0;
    }
  }
`;

function BlogPostTimestamp ({ date, time } ) {
  return (
      <BlogPostTimestampContainer>
        <span className={"date"}>
          {date}
        </span>
        <span className={"time"}>
          {time}
        </span>
      </BlogPostTimestampContainer>
  )
}

function BlogPostHeader ({ title, path, date, time }) {

  return (
      <header style={{
        position: "relative",
        height: `8px`,
        marginBottom: `36px`,
        borderBottom: `1px solid #222`,
      }}>
        <h1
            style={{
              backgroundColor: `#FFF`,
              float: "left",
              lineHeight: `14px`,
              fontSize: `12px`,
              letterSpacing: `2px`,
              textTransform: `uppercase`,
              paddingRight: `6px`,
              margin: 0,
            }}
        >
          <Link
              css={css`
              text-decoration: none;

              &:hover {
                text-decoration: underline;
              }
              `}
              to={path}
            >
            {title}
          </Link>
        </h1>
        <BlogPostTimestamp date={date} time={time} />
      </header>
  )
}

function BlogPostPreview ({frontmatter, path, slug, excerpt}) {
  const title = frontmatter.title || slug;

  return (
      <article
          key={slug}
          style={{
            marginBottom: `32px`,
          }}
        >
        <BlogPostHeader
            title={title}
            date={frontmatter.date}
            time={frontmatter.time}
            slug={slug}
            path={path}
        />

        <section>
          <p
              style={{
                padding: 0,
                margin: 0,
              }}
              dangerouslySetInnerHTML={{
                __html: frontmatter.description || excerpt,
              }}
          />
        </section>

        <Link
            css={css`
              text-transform: uppercase;
              text-decoration: none;
              font-size: 12px;
              background: white;

              position: relative;
              display: block;
              text-align: right;

              &:hover:after {
                height: 26px;
                font-size: 26px;
                line-height: 26px;
                top: -7px;
                width: 20px;
                opacity: 1;
                transition: all 0.3s, opacity 0.1s 0.05s;
                -moz-transition: all 0.3s, opacity 0.1s 0.05s;
                -ms-transition: all 0.3s, opacity 0.1s 0.05s;
                -webkit-transition: all 0.3s, opacity 0.1s 0.05s;
                -o-transition: all 0.3s, opacity 0.1s 0.05s;
              }

              &:after {
                height: 12px;
                font-size: 12px;
                line-height: 12px;
                top: 0px;
                left: 100%;
                content: "\\00BB";
                display: inline-block;
                width: 0px;
                overflow: hidden;
                z-index: 1;
                text-align: right;
                position: absolute;
                opacity: 0;
                transition: all 0.2s, opacity 0.1s;
                -moz-transition: all 0.2s, opacity 0.1s;
                -ms-transition: all 0.2s, opacity 0.1s;
                -webkit-transition: all 0.2s, opacity 0.1s;
                -o-transition: all 0.2s, opacity 0.1s;
              }
              `}
            to={path}
          >
          Read More
        </Link>
      </article>
  )
}

function BlogPost ({ frontmatter, slug, html, path }) {

  const title = frontmatter.title || slug;

  return (
    <article>
      <BlogPostHeader
          title={title}
          date={frontmatter.date}
          time={frontmatter.time}
          slug={slug}
          path={path}
      />
      <section
          css={css`
            p {
              code {
                padding: 3px 6px;
              }
            }

            .gatsby-highlight {
              &:before {
                content: "Code";
                display: inline-block;
                position: absolute;
                top: -7px;
                left: 0;
                text-transform: uppercase;
                font-size: 10px;
                line-height: 12px;
                padding-right: 8px;
                letter-spacing: 2px;
                
                background: #FFF;
              }

              &[data-language]:before {
                content: attr(data-language);
              }

              pre {
                margin-bottom: 0;
              }

              position: relative;       
              margin-bottom: 1.75rem;
              padding: 16px 0;
              border-top: 1px solid #222;
              border-bottom: 1px solid #222;
            }
          `}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      <footer>
      </footer>
    </article>
  );
}

export {
  BlogPostPreview,
  BlogPost,
}
