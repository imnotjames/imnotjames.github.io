"use strict";(self.webpackChunknotjam_es=self.webpackChunknotjam_es||[]).push([[547],{5144:function(t,e,n){n.r(e),n.d(e,{default:function(){return s}});var o=n(6540),l=n(4794),a=n(1510),i=n(6276),r=n(7528),d=n(5372);const m=a.default.ul.withConfig({displayName:"on-my-mind-thought__ThoughtNavigationUl",componentId:"sc-5xs9vp-0"})(["display:flex;flex-wrap:wrap;justify-content:space-between;list-style:none;padding:0;"]),c=t=>{let{previous:e,next:n}=t;return o.createElement("nav",null,o.createElement(m,null,o.createElement("li",null,e&&o.createElement(l.Link,{to:`/on-my-mind${e.fields.slug}`,rel:"prev"},"← ",e.frontmatter.date)),o.createElement("li",null,n&&o.createElement(l.Link,{to:`/on-my-mind${n.fields.slug}`,rel:"next"},n.frontmatter.date," →"))))};function s(t){let{data:{site:{siteMetadata:{title:e}},thought:n,previous:l,next:a},location:m}=t;return o.createElement(i.A,{location:m,title:e},o.createElement(r.A,{title:`Thoughts on ${n.frontmatter.date}`,description:n.frontmatter.description||n.excerpt}),o.createElement(d.o,{frontmatter:n.frontmatter,slug:n.slug,path:`/on-my-mind${n.fields.slug}`,html:n.html}),o.createElement(c,{previous:l,next:a}))}},5372:function(t,e,n){n.d(e,{o:function(){return s}});var o=n(6540),l=n(4794),a=n(1510),i=n(7272);const r=a.default.article.withConfig({displayName:"thought__ThoughtArticle",componentId:"sc-en1bdp-0"})(["clear:both;"]),d=a.default.h1.withConfig({displayName:"thought__ThoughtDate",componentId:"sc-en1bdp-1"})([""]),m=a.default.header.withConfig({displayName:"thought__ThoughtHeader",componentId:"sc-en1bdp-2"})(["font-size:3rem;"]),c=a.default.section.withConfig({displayName:"thought__ThoughtBody",componentId:"sc-en1bdp-3"})(["",";p:first-child img:first-child{float:right;max-width:40%;margin-left:16px;}"],i.a);function s(t){let{frontmatter:e,slug:n,html:a,path:i}=t;return"string"==typeof a&&(a=a.replace(/<\/p>/g,"</p><br />"),a=a.replace(/<\/ul>/g,"</ul><br />"),a=a.replace(/<img /g,'<img loading="lazy" ')),o.createElement(r,null,o.createElement(m,null,o.createElement(d,null,o.createElement(l.Link,{to:i},e.date||"20XX/YY/ZZ"))),o.createElement(c,{dangerouslySetInnerHTML:{__html:a}}))}},7272:function(t,e,n){n.d(e,{a:function(){return a},h:function(){return r}});var o=n(6540),l=n(1510);const a=l.css`
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
`,i=l.styled.section.withConfig({displayName:"markdown__MarkdownContentContainer",componentId:"sc-hh4cxh-0"})(["",""],a),r=t=>{let{content:e}=t;return o.createElement(i,{dangerouslySetInnerHTML:{__html:e}})}}}]);
//# sourceMappingURL=component---src-templates-on-my-mind-thought-js-47e79d2f3cd66f2f117a.js.map