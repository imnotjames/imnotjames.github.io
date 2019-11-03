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

class BlogPostTimestamp extends React.Component {
  render() {
    const { date, time } = this.props;

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
}

class BlogPostHeader extends React.Component {
  render() {
    const { title, slug, date, time } = this.props;

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
            <Link style={{
              textDecoration: `none`,
              color: `inherit`,
            }} to={slug}>
              {title}
            </Link>
          </h1>
          <BlogPostTimestamp date={date} time={time} />
        </header>
    )
  }
}

class BlogPostPreview extends React.Component {
  render() {
    const {frontmatter, slug, excerpt} = this.props;
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

          <Link to={slug}>Read More</Link>
        </article>
    )
  }
}

class BlogPost extends React.Component {
  render() {
    const { frontmatter, slug, html } = this.props;

    const title = frontmatter.title || slug;

    return (
      <article>
        <BlogPostHeader
            title={title}
            date={frontmatter.date}
            time={frontmatter.time}
            slug={slug}
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
}

export {
  BlogPostPreview,
  BlogPost,
}