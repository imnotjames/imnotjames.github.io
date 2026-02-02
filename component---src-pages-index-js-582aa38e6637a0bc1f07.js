"use strict";(self.webpackChunknotjam_es=self.webpackChunknotjam_es||[]).push([[293],{922:function(e,t,n){n.r(t),n.d(t,{default:function(){return g}});var o=n(6540),i=n(1510),a=n(4794);const l=i.default.div.withConfig({displayName:"bio__BioContainer",componentId:"sc-3mdo7w-0"})(["margin-bottom:4.375rem;"]);var r=()=>{const{site:e}=(0,a.useStaticQuery)("287650119"),t=e.siteMetadata.social;return o.createElement(l,null,o.createElement("p",null,"I'm not ",o.createElement("i",null,"the")," James, just a James."),o.createElement("p",null,"I love retro science fiction, video games, comics, food, making things, entrepreneurship, and I'm ",o.createElement("b",null,"always")," looking to learn something new."),o.createElement("p",null,"I want to bring incredible people together to make the unbelievable into reality. If we approach problems with a thorough understanding of technology and a lot of imagination.. anything is possible."),o.createElement("p",null,"Okay?  Let's make something amazing."),o.createElement("p",null,"You can"," ",o.createElement("a",{href:`mailto:${t.email}`},"send me an email"),","," ",o.createElement("a",{href:`https://linkedin.com/in/${t.linkedin}`},"connect on LinkedIn"),","," ","or ",o.createElement("a",{href:`https://github.com/${t.github}`},"check out my Github"),"."))},s=n(6276),c=n(7528),p=n(5536);const m=i.default.header.withConfig({displayName:"pages__BlogIndexHeader",componentId:"sc-h8101x-0"})(["margin-bottom:32px;height:8px;line-height:12px;border-bottom:1px solid black;"]),d=i.default.h2.withConfig({displayName:"pages__BlogIndexHeading",componentId:"sc-h8101x-1"})(["margin:0;display:inline-block;font-size:12px;line-height:16px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;background-color:#FFF;padding-right:4px;white-space:nowrap;overflow:hidden;"]);function g(e){let{data:{site:{siteMetadata:{title:t}},blogPosts:{edges:n}},location:i}=e;return o.createElement(s.A,{location:i,title:t},o.createElement(c.A,{title:"Home"}),o.createElement(r,null),o.createElement(m,null,o.createElement(d,null,"Recent Blog Posts")),n.map((e=>{let{node:t}=e;const n=`/blog${t.fields.slug}`;return o.createElement("div",{key:t.fields.slug},o.createElement(p.r,{path:n,slug:t.fields.slug,frontmatter:t.frontmatter,excerpt:t.excerpt}))})))}},5536:function(e,t,n){n.d(t,{r:function(){return f},z:function(){return b}});var o=n(6540),i=n(4794),a=n(1510),l=n(7272);const r=a.default.h2.withConfig({displayName:"blog-post__BlogPostTimestampContainer",componentId:"sc-1c33wts-0"})(["font-size:16px;position:absolute;display:block;overflow:hidden;width:100px;height:1.2em;top:-0.2em;right:0;margin:0 0 1.75rem;.date,.time{padding-left:8px;background-color:#FFF;position:absolute;right:0;transition:top 0.2s;}.date{top:0;}.time{top:100%;}&:hover,&:focus{.date{top:-100%;}.time{top:0;}}"]),s=a.default.header.withConfig({displayName:"blog-post__BlogPostHeaderContainer",componentId:"sc-1c33wts-1"})(["position:relative;height:8px;margin-bottom:36px;border-bottom:1px solid #222;"]),c=a.default.h1.withConfig({displayName:"blog-post__BlogPostHeaderH1",componentId:"sc-1c33wts-2"})(["background-color:#FFF;float:left;line-height:14px;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding-right:6px;margin:0;,"]),p=(0,a.default)(i.Link).withConfig({displayName:"blog-post__BlogPostHeaderLink",componentId:"sc-1c33wts-3"})(["text-decoration:none;&:hover{text-decoration:underline;}"]),m=(0,a.default)(i.Link).withConfig({displayName:"blog-post__BlogPostReadMoreLink",componentId:"sc-1c33wts-4"})(['text-transform:uppercase;text-decoration:none;font-size:12px;background:white;position:relative;display:block;text-align:right;&:hover:after{height:26px;font-size:26px;line-height:26px;top:-7px;width:20px;opacity:1;transition:all 0.3s,opacity 0.1s 0.05s;-moz-transition:all 0.3s,opacity 0.1s 0.05s;-ms-transition:all 0.3s,opacity 0.1s 0.05s;-webkit-transition:all 0.3s,opacity 0.1s 0.05s;-o-transition:all 0.3s,opacity 0.1s 0.05s;}&:after{height:12px;font-size:12px;line-height:12px;top:0px;left:100%;content:"\\00BB";display:inline-block;width:0px;overflow:hidden;z-index:1;text-align:right;position:absolute;opacity:0;transition:all 0.2s,opacity 0.1s;-moz-transition:all 0.2s,opacity 0.1s;-ms-transition:all 0.2s,opacity 0.1s;-webkit-transition:all 0.2s,opacity 0.1s;-o-transition:all 0.2s,opacity 0.1s;}']);function d(e){let{date:t,time:n}=e;return o.createElement(r,null,o.createElement("span",{className:"date"},t),o.createElement("span",{className:"time"},n))}function g(e){let{title:t,path:n,date:i,time:a}=e;return o.createElement(s,null,o.createElement(c,null,o.createElement(p,{to:n},t)),o.createElement(d,{date:i,time:a}))}const h=a.default.article.withConfig({displayName:"blog-post__BlogPostPreviewArticle",componentId:"sc-1c33wts-5"})(["margin-bottom:32px;"]),u=a.default.p.withConfig({displayName:"blog-post__BlogPostPreviewText",componentId:"sc-1c33wts-6"})(["padding:0;margin:0;line-height:1.75rem;"]);function f(e){let{frontmatter:t,path:n,slug:i,excerpt:a}=e;const l=t.title||i;return o.createElement(h,null,o.createElement(g,{title:l,date:t.date,time:t.time,slug:i,path:n}),o.createElement("section",null,o.createElement(u,{dangerouslySetInnerHTML:{__html:t.description||a}})),o.createElement(m,{to:n},"Read More"))}function b(e){let{frontmatter:t,slug:n,html:i,path:a}=e;const r=t.title||n;return o.createElement("article",null,o.createElement(g,{title:r,date:t.date,time:t.time,slug:n,path:a}),o.createElement(l.h,{content:i}),o.createElement("footer",null))}},7272:function(e,t,n){n.d(t,{a:function(){return a},h:function(){return r}});var o=n(6540),i=n(1510);const a=i.css`
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
`,l=i.styled.section.withConfig({displayName:"markdown__MarkdownContentContainer",componentId:"sc-hh4cxh-0"})(["",""],a),r=e=>{let{content:t}=e;return o.createElement(l,{dangerouslySetInnerHTML:{__html:t}})}}}]);
//# sourceMappingURL=component---src-pages-index-js-582aa38e6637a0bc1f07.js.map