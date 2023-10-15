import React from "react";
import { Link } from "gatsby";
import styled from 'styled-components';
import { MarkdownContent } from "./markdown";

const BlogPostTimestampContainer = styled.h2`
  font-size: 16px;
  position: absolute;
  display: block;
  overflow: hidden;
  width: 100px;
  height: 1.2em;
  top: -0.2em;
  right: 0;
  margin: 0 0 1.75rem;

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

const BlogPostHeaderContainer = styled.header`
  position: relative;
  height: 8px;
  margin-bottom: 36px;
  border-bottom: 1px solid #222;
`;

const BlogPostHeaderH1 = styled.h1`
  background-color: #FFF;
  float: left;
  line-height: 14px;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding-right: 6px;
  margin: 0;,
`;

const BlogPostHeaderLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const BlogPostReadMoreLink = styled(Link)`
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
      <BlogPostHeaderContainer>
        <BlogPostHeaderH1>
          <BlogPostHeaderLink to={path}>
            {title}
          </BlogPostHeaderLink>
        </BlogPostHeaderH1>
        <BlogPostTimestamp date={date} time={time} />
      </BlogPostHeaderContainer>
  )
}

const BlogPostPreviewArticle = styled.article`
  margin-bottom: 32px;
`;

const BlogPostPreviewText = styled.p`
  padding: 0;
  margin: 0;

  line-height: 1.75rem;
`;

function BlogPostPreview ({frontmatter, path, slug, excerpt}) {
  const title = frontmatter.title || slug;

  return (
      <BlogPostPreviewArticle>
        <BlogPostHeader
            title={title}
            date={frontmatter.date}
            time={frontmatter.time}
            slug={slug}
            path={path}
        />

        <section>
          <BlogPostPreviewText
              dangerouslySetInnerHTML={{
                __html: frontmatter.description || excerpt,
              }}
          />
        </section>

        <BlogPostReadMoreLink to={path}>
          Read More
        </BlogPostReadMoreLink>
      </BlogPostPreviewArticle>
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
      <MarkdownContent content={html} />
      <footer>
      </footer>
    </article>
  );
}

export {
  BlogPostPreview,
  BlogPost,
}
