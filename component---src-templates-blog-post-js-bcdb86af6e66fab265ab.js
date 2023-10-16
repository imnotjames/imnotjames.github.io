"use strict";(self.webpackChunknotjam_es=self.webpackChunknotjam_es||[]).push([[989],{8882:function(t,e,n){n.d(e,{J:function(){return x},Z:function(){return f}});var o=n(7294),i=n(1883),l=n(3350),a=n(527);const r=l.default.h2.withConfig({displayName:"blog-post__BlogPostTimestampContainer",componentId:"sc-1c33wts-0"})(["font-size:16px;position:absolute;display:block;overflow:hidden;width:100px;height:1.2em;top:-0.2em;right:0;margin:0 0 1.75rem;.date,.time{padding-left:8px;background-color:#FFF;position:absolute;right:0;transition:top 0.2s;}.date{top:0;}.time{top:100%;}&:hover,&:focus{.date{top:-100%;}.time{top:0;}}"]),s=l.default.header.withConfig({displayName:"blog-post__BlogPostHeaderContainer",componentId:"sc-1c33wts-1"})(["position:relative;height:8px;margin-bottom:36px;border-bottom:1px solid #222;"]),p=l.default.h1.withConfig({displayName:"blog-post__BlogPostHeaderH1",componentId:"sc-1c33wts-2"})(["background-color:#FFF;float:left;line-height:14px;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding-right:6px;margin:0;,"]),c=(0,l.default)(i.Link).withConfig({displayName:"blog-post__BlogPostHeaderLink",componentId:"sc-1c33wts-3"})(["text-decoration:none;&:hover{text-decoration:underline;}"]),d=(0,l.default)(i.Link).withConfig({displayName:"blog-post__BlogPostReadMoreLink",componentId:"sc-1c33wts-4"})(['text-transform:uppercase;text-decoration:none;font-size:12px;background:white;position:relative;display:block;text-align:right;&:hover:after{height:26px;font-size:26px;line-height:26px;top:-7px;width:20px;opacity:1;transition:all 0.3s,opacity 0.1s 0.05s;-moz-transition:all 0.3s,opacity 0.1s 0.05s;-ms-transition:all 0.3s,opacity 0.1s 0.05s;-webkit-transition:all 0.3s,opacity 0.1s 0.05s;-o-transition:all 0.3s,opacity 0.1s 0.05s;}&:after{height:12px;font-size:12px;line-height:12px;top:0px;left:100%;content:"\\00BB";display:inline-block;width:0px;overflow:hidden;z-index:1;text-align:right;position:absolute;opacity:0;transition:all 0.2s,opacity 0.1s;-moz-transition:all 0.2s,opacity 0.1s;-ms-transition:all 0.2s,opacity 0.1s;-webkit-transition:all 0.2s,opacity 0.1s;-o-transition:all 0.2s,opacity 0.1s;}']);function m(t){let{date:e,time:n}=t;return o.createElement(r,null,o.createElement("span",{className:"date"},e),o.createElement("span",{className:"time"},n))}function g(t){let{title:e,path:n,date:i,time:l}=t;return o.createElement(s,null,o.createElement(p,null,o.createElement(c,{to:n},e)),o.createElement(m,{date:i,time:l}))}const u=l.default.article.withConfig({displayName:"blog-post__BlogPostPreviewArticle",componentId:"sc-1c33wts-5"})(["margin-bottom:32px;"]),h=l.default.p.withConfig({displayName:"blog-post__BlogPostPreviewText",componentId:"sc-1c33wts-6"})(["padding:0;margin:0;line-height:1.75rem;"]);function f(t){let{frontmatter:e,path:n,slug:i,excerpt:l}=t;const a=e.title||i;return o.createElement(u,null,o.createElement(g,{title:a,date:e.date,time:e.time,slug:i,path:n}),o.createElement("section",null,o.createElement(h,{dangerouslySetInnerHTML:{__html:e.description||l}})),o.createElement(d,{to:n},"Read More"))}function x(t){let{frontmatter:e,slug:n,html:i,path:l}=t;const r=e.title||n;return o.createElement("article",null,o.createElement(g,{title:r,date:e.date,time:e.time,slug:n,path:l}),o.createElement(a.S,{content:i}),o.createElement("footer",null))}},527:function(t,e,n){n.d(e,{S:function(){return c},G:function(){return a}});var o,i=n(7294),l=n(3350);const a=(0,l.css)(o||(r=["\n  font-size: 1rem;\n\n  p, ul, h1, h2, h3, h4, h5, h6, blockquote {\n    margin-bottom: 1.5rem;\n  }\n\n  p:first-child + br {\n    display: none;\n  }\n\n  p {\n    line-height: 1.5rem;\n\n    code {\n      padding: 3px 6px;\n    }\n  }\n\n  h1, h2, h3, h4, h5, h6 {\n    font-size: 1.5rem;\n  }\n  \n  blockquote {\n    padding-left: 1.75rem;\n  }\n\n  ul {\n    list-style: '▶';\n    padding-left: 0.5rem;\n\n    li {\n      padding-bottom: 0.5rem;\n      padding-left: 0.5rem;\n    }\n  }\n\n  .gatsby-highlight {\n    &:before {\n      content: \"Code\";\n      display: inline-block;\n      position: absolute;\n      top: -7px;\n      left: 0;\n      text-transform: uppercase;\n      font-size: 10px;\n      line-height: 12px;\n      padding-right: 8px;\n      letter-spacing: 2px;\n\n      background: #FFF;\n    }\n\n    &[data-language]:before {\n      content: attr(data-language);\n    }\n\n    pre {\n      margin-bottom: 0;\n    }\n\n    position: relative;\n    margin-bottom: 1.75rem;\n    padding: 16px 0;\n    border-top: 1px solid #222;\n    border-bottom: 1px solid #222;\n  }\n"],s||(s=r.slice(0)),r.raw=s,o=r));var r,s;const p=l.styled.section.withConfig({displayName:"markdown__MarkdownContentContainer",componentId:"sc-hh4cxh-0"})(["",""],a),c=t=>{let{content:e}=t;return i.createElement(p,{dangerouslySetInnerHTML:{__html:e}})}},4982:function(t,e,n){n.r(e),n.d(e,{default:function(){return d}});var o=n(7294),i=n(1883),l=n(3350),a=n(3862),r=n(9357),s=n(8882);const p=l.default.ul.withConfig({displayName:"blog-post__BlogPostPaginationUl",componentId:"sc-155cdgi-0"})(["display:flex;flex-wrap:wrap;justify-content:space-between;list-style:none;padding:0;"]),c=t=>{let{previous:e,next:n}=t;return o.createElement("nav",null,o.createElement(p,null,o.createElement("li",null,e&&o.createElement(i.Link,{to:"/blog"+e.fields.slug,rel:"prev"},"← ",e.frontmatter.title)),o.createElement("li",null,n&&o.createElement(i.Link,{to:"/blog"+n.fields.slug,rel:"next"},n.frontmatter.title," →"))))};function d(t){let{data:{site:{siteMetadata:{title:e}},post:n,previous:i,next:l},location:p}=t;return o.createElement(a.Z,{location:p,title:e},o.createElement(r.Z,{title:n.frontmatter.title,description:n.frontmatter.description||n.excerpt}),o.createElement(s.J,{frontmatter:n.frontmatter,slug:n.slug,path:"/blog"+n.fields.slug,html:n.html}),o.createElement(c,{previous:i,next:l}))}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-bcdb86af6e66fab265ab.js.map