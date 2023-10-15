"use strict";(self.webpackChunknotjam_es=self.webpackChunknotjam_es||[]).push([[678],{8882:function(t,e,n){n.d(e,{J:function(){return f},Z:function(){return u}});var o=n(7294),i=n(1883),a=n(3350),l=n(9175);const r=a.default.h2.withConfig({displayName:"blog-post__BlogPostTimestampContainer",componentId:"sc-1c33wts-0"})(["font-size:16px;position:absolute;display:block;overflow:hidden;width:100px;height:1.2em;top:-0.2em;right:0;margin:0 0 ",";.date,.time{padding-left:8px;background-color:#FFF;position:absolute;right:0;transition:top 0.2s;}.date{top:0;}.time{top:100%;}&:hover,&:focus{.date{top:-100%;}.time{top:0;}}"],(0,l.qZ)(1)),s=a.default.header.withConfig({displayName:"blog-post__BlogPostHeaderContainer",componentId:"sc-1c33wts-1"})(["position:relative;height:8px;margin-bottom:36px;border-bottom:1px solid #222;"]),p=a.default.h1.withConfig({displayName:"blog-post__BlogPostHeaderH1",componentId:"sc-1c33wts-2"})(["background-color:#FFF;float:left;line-height:14px;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding-right:6px;margin:0;,"]),c=(0,a.default)(i.Link).withConfig({displayName:"blog-post__BlogPostHeaderLink",componentId:"sc-1c33wts-3"})(["text-decoration:none;&:hover{text-decoration:underline;}"]),m=(0,a.default)(i.Link).withConfig({displayName:"blog-post__BlogPostReadMoreLink",componentId:"sc-1c33wts-4"})(['text-transform:uppercase;text-decoration:none;font-size:12px;background:white;position:relative;display:block;text-align:right;&:hover:after{height:26px;font-size:26px;line-height:26px;top:-7px;width:20px;opacity:1;transition:all 0.3s,opacity 0.1s 0.05s;-moz-transition:all 0.3s,opacity 0.1s 0.05s;-ms-transition:all 0.3s,opacity 0.1s 0.05s;-webkit-transition:all 0.3s,opacity 0.1s 0.05s;-o-transition:all 0.3s,opacity 0.1s 0.05s;}&:after{height:12px;font-size:12px;line-height:12px;top:0px;left:100%;content:"\\00BB";display:inline-block;width:0px;overflow:hidden;z-index:1;text-align:right;position:absolute;opacity:0;transition:all 0.2s,opacity 0.1s;-moz-transition:all 0.2s,opacity 0.1s;-ms-transition:all 0.2s,opacity 0.1s;-webkit-transition:all 0.2s,opacity 0.1s;-o-transition:all 0.2s,opacity 0.1s;}']),d=a.default.section.withConfig({displayName:"blog-post__BlogPostContent",componentId:"sc-1c33wts-5"})(['p{code{padding:3px 6px;}}.gatsby-highlight{&:before{content:"Code";display:inline-block;position:absolute;top:-7px;left:0;text-transform:uppercase;font-size:10px;line-height:12px;padding-right:8px;letter-spacing:2px;background:#FFF;}&[data-language]:before{content:attr(data-language);}pre{margin-bottom:0;}position:relative;margin-bottom:1.75rem;padding:16px 0;border-top:1px solid #222;border-bottom:1px solid #222;}']);function g(t){let{date:e,time:n}=t;return o.createElement(r,null,o.createElement("span",{className:"date"},e),o.createElement("span",{className:"time"},n))}function h(t){let{title:e,path:n,date:i,time:a}=t;return o.createElement(s,null,o.createElement(p,null,o.createElement(c,{to:n},e)),o.createElement(g,{date:i,time:a}))}function u(t){let{frontmatter:e,path:n,slug:i,excerpt:a}=t;const l=e.title||i;return o.createElement("article",{key:i,style:{marginBottom:"32px"}},o.createElement(h,{title:l,date:e.date,time:e.time,slug:i,path:n}),o.createElement("section",null,o.createElement("p",{style:{padding:0,margin:0},dangerouslySetInnerHTML:{__html:e.description||a}})),o.createElement(m,{to:n},"Read More"))}function f(t){let{frontmatter:e,slug:n,html:i,path:a}=t;const l=e.title||n;return o.createElement("article",null,o.createElement(h,{title:l,date:e.date,time:e.time,slug:n,path:a}),o.createElement(d,{dangerouslySetInnerHTML:{__html:i}}),o.createElement("footer",null))}},3239:function(t,e,n){n.r(e),n.d(e,{default:function(){return c}});var o=n(7294),i=n(9175),a=n(1883);var l=()=>{const{site:t}=(0,a.useStaticQuery)("416808783"),e=t.siteMetadata.social;return o.createElement("div",{style:{marginBottom:(0,i.qZ)(2.5)}},o.createElement("p",null,"I'm not ",o.createElement("i",null,"the")," James, just a James."),o.createElement("p",null,"I love retro science fiction, video games, comics, food, making things, entrepreneurship, and I'm ",o.createElement("b",null,"always")," looking to learn something new."),o.createElement("p",null,"I want to bring incredible people together to make the unbelievable into reality. If we approach problems with a thorough understanding of technology and a lot of imagination.. anything is possible."),o.createElement("p",null,"Okay?  Let's make something amazing."),o.createElement("p",null,"You can"," ",o.createElement("a",{href:"mailto:"+e.email},"send me an email"),","," ",o.createElement("a",{href:"https://linkedin.com/in/"+e.linkedin},"connect on LinkedIn"),","," ",o.createElement("a",{href:"https://twitter.com/"+e.twitter},"tweet at me"),","," ","or ",o.createElement("a",{href:"https://github.com/"+e.github},"check out my Github"),"."))},r=n(8678),s=n(9357),p=n(8882);function c(t){let{data:{site:{siteMetadata:{title:e}},blogPosts:{edges:n}},location:i}=t;return o.createElement(r.Z,{location:i,title:e},o.createElement(s.Z,{title:"Home"}),o.createElement(l,null),o.createElement("header",{style:{marginBottom:"32px",height:"8px",lineHeight:"12px",borderBottom:"1px solid black"}},o.createElement("h2",{style:{margin:0,display:"inline-block",fontSize:"12px",lineHeight:"16px",letterSpacing:"2px",textTransform:"uppercase",fontWeight:"bold",backgroundColor:"#FFF",paddingRight:"4px",whiteSpace:"nowrap",overflow:"hidden"}},"Recent Blog Posts")),n.map((t=>{let{node:e}=t;const n="/blog"+e.fields.slug;return o.createElement("div",{key:e.fields.slug},o.createElement(p.Z,{path:n,slug:e.fields.slug,frontmatter:e.frontmatter,excerpt:e.excerpt}))})))}}}]);
//# sourceMappingURL=component---src-pages-index-js-17336813536dc8f16692.js.map