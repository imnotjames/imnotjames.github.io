import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";

const ThoughtArticle = styled.article`
    clear: both;
`;

const ThoughtDate = styled.h1`

`;

const ThoughtHeader = styled.header`

`;

const ThoughtBody = styled.section`
    font-size: 16px;
    letter-spacing: 0.1em;

    p {
      code {
        padding: 3px 6px;
      }
    }

    p:first-child + br {
      display: none;
    }

    > br {
      font-size: 0;
      float: left;
    }

    p:first-child img:first-child {
      float: right;
      max-width: 40%;
      margin-left: 16px;
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
`;

function Thought ({ frontmatter, slug, html, path }) {
  if (typeof html === 'string') {
    html = html.replace(/<\/p>/g, '</p><br />');
    html = html.replace(/<\/ul>/g, '</ul><br />');
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
