import React from "react";
import { Link } from "gatsby";
import styled from 'styled-components';
import { MarkdownContentCss } from "./markdown";

const ThoughtArticle = styled.article`
    clear: both;
`;

const ThoughtDate = styled.h1`

`;

const ThoughtHeader = styled.header`
  font-size: 3rem;
`;

const ThoughtBody = styled.section`
    ${MarkdownContentCss};

    p:first-child img:first-child {
      float: right;
      max-width: 40%;
      margin-left: 16px;
    }
`;

function Thought ({ frontmatter, slug, html, path }) {
  if (typeof html === 'string') {
    html = html.replace(/<\/p>/g, '</p><br />');
    html = html.replace(/<\/ul>/g, '</ul><br />');

    // Such a hack but I mean maybe it'll work
    html = html.replace(/<img /g, '<img loading="lazy" ');
  }

  return (
    <ThoughtArticle>
      <ThoughtHeader>
        <ThoughtDate>
          <Link to={path}>
            {frontmatter.date || '20XX/YY/ZZ'}
          </Link>
        </ThoughtDate>
      </ThoughtHeader>
      <ThoughtBody dangerouslySetInnerHTML={{ __html: html }} />
    </ThoughtArticle>
  );
}

export {
  Thought,
}
