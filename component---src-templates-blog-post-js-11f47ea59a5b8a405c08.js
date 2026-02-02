"use strict";(self.webpackChunknotjam_es=self.webpackChunknotjam_es||[]).push([[751],{5536:function(t,e,n){n.d(e,{r:function(){return f},z:function(){return x}});var o=n(6540),i=n(4794),l=n(1510),a=n(7272);const r=l.default.h2.withConfig({displayName:"blog-post__BlogPostTimestampContainer",componentId:"sc-1c33wts-0"})(["font-size:16px;position:absolute;display:block;overflow:hidden;width:100px;height:1.2em;top:-0.2em;right:0;margin:0 0 1.75rem;.date,.time{padding-left:8px;background-color:#FFF;position:absolute;right:0;transition:top 0.2s;}.date{top:0;}.time{top:100%;}&:hover,&:focus{.date{top:-100%;}.time{top:0;}}"]),s=l.default.header.withConfig({displayName:"blog-post__BlogPostHeaderContainer",componentId:"sc-1c33wts-1"})(["position:relative;height:8px;margin-bottom:36px;border-bottom:1px solid #222;"]),p=l.default.h1.withConfig({displayName:"blog-post__BlogPostHeaderH1",componentId:"sc-1c33wts-2"})(["background-color:#FFF;float:left;line-height:14px;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding-right:6px;margin:0;,"]),c=(0,l.default)(i.Link).withConfig({displayName:"blog-post__BlogPostHeaderLink",componentId:"sc-1c33wts-3"})(["text-decoration:none;&:hover{text-decoration:underline;}"]),d=(0,l.default)(i.Link).withConfig({displayName:"blog-post__BlogPostReadMoreLink",componentId:"sc-1c33wts-4"})(['text-transform:uppercase;text-decoration:none;font-size:12px;background:white;position:relative;display:block;text-align:right;&:hover:after{height:26px;font-size:26px;line-height:26px;top:-7px;width:20px;opacity:1;transition:all 0.3s,opacity 0.1s 0.05s;-moz-transition:all 0.3s,opacity 0.1s 0.05s;-ms-transition:all 0.3s,opacity 0.1s 0.05s;-webkit-transition:all 0.3s,opacity 0.1s 0.05s;-o-transition:all 0.3s,opacity 0.1s 0.05s;}&:after{height:12px;font-size:12px;line-height:12px;top:0px;left:100%;content:"\\00BB";display:inline-block;width:0px;overflow:hidden;z-index:1;text-align:right;position:absolute;opacity:0;transition:all 0.2s,opacity 0.1s;-moz-transition:all 0.2s,opacity 0.1s;-ms-transition:all 0.2s,opacity 0.1s;-webkit-transition:all 0.2s,opacity 0.1s;-o-transition:all 0.2s,opacity 0.1s;}']);function m(t){let{date:e,time:n}=t;return o.createElement(r,null,o.createElement("span",{className:"date"},e),o.createElement("span",{className:"time"},n))}function g(t){let{title:e,path:n,date:i,time:l}=t;return o.createElement(s,null,o.createElement(p,null,o.createElement(c,{to:n},e)),o.createElement(m,{date:i,time:l}))}const u=l.default.article.withConfig({displayName:"blog-post__BlogPostPreviewArticle",componentId:"sc-1c33wts-5"})(["margin-bottom:32px;"]),h=l.default.p.withConfig({displayName:"blog-post__BlogPostPreviewText",componentId:"sc-1c33wts-6"})(["padding:0;margin:0;line-height:1.75rem;"]);function f(t){let{frontmatter:e,path:n,slug:i,excerpt:l}=t;const a=e.title||i;return o.createElement(u,null,o.createElement(g,{title:a,date:e.date,time:e.time,slug:i,path:n}),o.createElement("section",null,o.createElement(h,{dangerouslySetInnerHTML:{__html:e.description||l}})),o.createElement(d,{to:n},"Read More"))}function x(t){let{frontmatter:e,slug:n,html:i,path:l}=t;const r=e.title||n;return o.createElement("article",null,o.createElement(g,{title:r,date:e.date,time:e.time,slug:n,path:l}),o.createElement(a.h,{content:i}),o.createElement("footer",null))}},6093:function(t,e,n){n.r(e),n.d(e,{default:function(){return d}});var o=n(6540),i=n(4794),l=n(1510),a=n(6276),r=n(7528),s=n(5536);const p=l.default.ul.withConfig({displayName:"blog-post__BlogPostPaginationUl",componentId:"sc-155cdgi-0"})(["display:flex;flex-wrap:wrap;justify-content:space-between;list-style:none;padding:0;"]),c=t=>{let{previous:e,next:n}=t;return o.createElement("nav",null,o.createElement(p,null,o.createElement("li",null,e&&o.createElement(i.Link,{to:`/blog${e.fields.slug}`,rel:"prev"},"← ",e.frontmatter.title)),o.createElement("li",null,n&&o.createElement(i.Link,{to:`/blog${n.fields.slug}`,rel:"next"},n.frontmatter.title," →"))))};function d(t){let{data:{site:{siteMetadata:{title:e}},post:n,previous:i,next:l},location:p}=t;return o.createElement(a.A,{location:p,title:e},o.createElement(r.A,{title:n.frontmatter.title,description:n.frontmatter.description||n.excerpt}),o.createElement(s.z,{frontmatter:n.frontmatter,slug:n.slug,path:`/blog${n.fields.slug}`,html:n.html}),o.createElement(c,{previous:i,next:l}))}},7272:function(t,e,n){n.d(e,{a:function(){return l},h:function(){return r}});var o=n(6540),i=n(1510);const l=i.css`
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
`,a=i.styled.section.withConfig({displayName:"markdown__MarkdownContentContainer",componentId:"sc-hh4cxh-0"})(["",""],l),r=t=>{let{content:e}=t;return o.createElement(a,{dangerouslySetInnerHTML:{__html:e}})}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-11f47ea59a5b8a405c08.js.map