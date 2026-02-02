"use strict";(self.webpackChunknotjam_es=self.webpackChunknotjam_es||[]).push([[10],{1242:function(t,e,n){n.r(e),n.d(e,{default:function(){return r}});var o=n(6540),a=n(6276),i=n(7528),l=n(5372);function r(t){let{data:{site:{siteMetadata:{title:e}},thoughts:{edges:n}},location:r}=t;return o.createElement(a.A,{location:r,title:e},o.createElement(i.A,{title:"What's On My Mind.."}),n.map((t=>{let{node:e}=t;const n=`/on-my-mind${e.fields.slug}`;return o.createElement(l.o,{key:e.fields.slug,slug:e.fields.slug,path:n,frontmatter:e.frontmatter,html:e.html})})))}},5372:function(t,e,n){n.d(e,{o:function(){return c}});var o=n(6540),a=n(4794),i=n(1510),l=n(7272);const r=i.default.article.withConfig({displayName:"thought__ThoughtArticle",componentId:"sc-en1bdp-0"})(["clear:both;"]),d=i.default.h1.withConfig({displayName:"thought__ThoughtDate",componentId:"sc-en1bdp-1"})([""]),h=i.default.header.withConfig({displayName:"thought__ThoughtHeader",componentId:"sc-en1bdp-2"})(["font-size:3rem;"]),s=i.default.section.withConfig({displayName:"thought__ThoughtBody",componentId:"sc-en1bdp-3"})(["",";p:first-child img:first-child{float:right;max-width:40%;margin-left:16px;}"],l.a);function c(t){let{frontmatter:e,slug:n,html:i,path:l}=t;return"string"==typeof i&&(i=i.replace(/<\/p>/g,"</p><br />"),i=i.replace(/<\/ul>/g,"</ul><br />"),i=i.replace(/<img /g,'<img loading="lazy" ')),o.createElement(r,null,o.createElement(h,null,o.createElement(d,null,o.createElement(a.Link,{to:l},e.date||"20XX/YY/ZZ"))),o.createElement(s,{dangerouslySetInnerHTML:{__html:i}}))}},7272:function(t,e,n){n.d(e,{a:function(){return i},h:function(){return r}});var o=n(6540),a=n(1510);const i=a.css`
  font-size: 1rem;

  p, ul, h1, h2, h3, h4, h5, h6, blockquote {
    margin-bottom: 1.5rem;
  }

  p:first-child + br {
    display: none;
  }

  p {
    line-height: 1.5rem;

    code {
      padding: 3px 6px;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: 1.5rem;
  }
  
  blockquote {
    padding-left: 1.75rem;
  }

  ul {
    list-style: '▶';
    padding-left: 0.5rem;

    li {
      padding-bottom: 0.5rem;
      padding-left: 0.5rem;
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
`,l=a.styled.section.withConfig({displayName:"markdown__MarkdownContentContainer",componentId:"sc-hh4cxh-0"})(["",""],i),r=t=>{let{content:e}=t;return o.createElement(l,{dangerouslySetInnerHTML:{__html:e}})}}}]);
//# sourceMappingURL=component---src-pages-on-my-mind-js-c95bb654aed725799f14.js.map