(self.webpackChunkgatsby_starter_hoodie=self.webpackChunkgatsby_starter_hoodie||[]).push([[465],{3492:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return R}});var a=n(1333),o=n.n(a),i=n(5497),u=n.n(i),r=n(854),s=n.n(r),f=n(2093),d=n.n(f),c=n(8821),l=n.n(c),p=n(9899),m=n.n(p),x=n(6540),g=n(2568),E=n(5482),h=n(4794),z=n(6288),v=n(2912),A=n(3472),C=n.n(A),L=n(7350),b=n.n(L),w=n(3173);n(249);const _=g.default.div.withConfig({displayName:"CategoriesList__CategoriesListWrapper",componentId:"sc-10zoi1z-0"})(["margin-bottom:60px;@media (max-width:768px){padding:0 10px;}"]),I=g.default.div.withConfig({displayName:"CategoriesList__CategoriesWrapper",componentId:"sc-10zoi1z-1"})(["position:relative;top:0;transition:all 0.5s;@media (max-width:768px){padding:0 5px;}"]),y=g.default.div.withConfig({displayName:"CategoriesList__CategoriesInform",componentId:"sc-10zoi1z-2"})(["display:flex;align-items:center;color:",";& > span{margin:0 5px;}"],(e=>e.theme.colors.tertiaryText)),U=g.default.p.withConfig({displayName:"CategoriesList__Date",componentId:"sc-10zoi1z-3"})(["font-size:14.4px;"]);g.default.p.withConfig({displayName:"CategoriesList__PostCount",componentId:"sc-10zoi1z-4"})(["font-size:14.4px;"]);var N=e=>{let{categoriesList:t}=e;const{0:n,1:a}=(0,x.useState)(10),o=b()((()=>{document.documentElement.scrollHeight-document.documentElement.scrollTop<=document.documentElement.clientHeight+100&&n<t.length&&setTimeout((()=>a(n+10)),300)}),250);return(0,x.useEffect)((()=>(window.addEventListener("scroll",o),()=>{window.removeEventListener("scroll",o)})),[n,t]),(0,x.useEffect)((()=>{a(10)}),[t]),x.createElement(_,null,t.slice(0,n).map(((e,a)=>x.createElement(x.Fragment,null,x.createElement(I,null,x.createElement(v.A,{size:"bg"},x.createElement(h.Link,{to:`/categories/${C()(e.name,/\s/g,"-")}`},e.name," (",e.posts.length,")")),x.createElement(y,null,x.createElement(U,null,"Last updated on ",e.lastUpdated))),n-1!==a&&t.length-1!==a&&x.createElement(w.A,{mt:"48px",mb:"32px"})))))},T=n(698),O=n(7138),Z=n(1960);const k=g.default.div.withConfig({displayName:"categories__TagListWrapper",componentId:"sc-1fyru9a-0"})(["margin-top:20px;@media (max-width:768px){padding:0 15px;}"]);var R=e=>{let{data:t}=e;const n=t.allMarkdownRemark.nodes,a=m()(l()((e=>({...e.frontmatter,slug:e.fields.slug}))),d()("category"),l()((e=>({name:e[0].category,posts:e,lastUpdated:e[0].date}))),s()((e=>new Date(e.lastUpdated))),u()((e=>e.name)),o())(n);return x.createElement(z.A,null,x.createElement(E.A,{title:Z.title,description:Z.description,url:Z.siteUrl}),x.createElement(k,null,a.length>0&&x.createElement(v.A,{size:"sm"},"There are ",a.length," categories.")),0===a.length&&x.createElement(O.A,{name:"categories"}),x.createElement(T.A,{size:32}),x.createElement(N,{categoriesList:a}))}},882:function(e){e.exports=function(e,t,n,a){var o=-1,i=null==e?0:e.length;for(a&&i&&(n=e[++o]);++o<i;)n=t(n,e[o],o,e);return n}},1733:function(e){var t=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;e.exports=function(e){return e.match(t)||[]}},4552:function(e){e.exports=function(e){return function(t){return null==e?void 0:e[t]}}},5539:function(e,t,n){var a=n(882),o=n(828),i=n(6645),u=RegExp("['’]","g");e.exports=function(e){return function(t){return a(i(o(t).replace(u,"")),e,"")}}},4647:function(e,t,n){var a=n(4552)({"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"s"});e.exports=a},5434:function(e){var t=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;e.exports=function(e){return t.test(e)}},2225:function(e){var t="\\ud800-\\udfff",n="\\u2700-\\u27bf",a="a-z\\xdf-\\xf6\\xf8-\\xff",o="A-Z\\xc0-\\xd6\\xd8-\\xde",i="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",u="["+i+"]",r="\\d+",s="["+n+"]",f="["+a+"]",d="[^"+t+i+r+n+a+o+"]",c="(?:\\ud83c[\\udde6-\\uddff]){2}",l="[\\ud800-\\udbff][\\udc00-\\udfff]",p="["+o+"]",m="(?:"+f+"|"+d+")",x="(?:"+p+"|"+d+")",g="(?:['’](?:d|ll|m|re|s|t|ve))?",E="(?:['’](?:D|LL|M|RE|S|T|VE))?",h="(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?",z="[\\ufe0e\\ufe0f]?",v=z+h+("(?:\\u200d(?:"+["[^"+t+"]",c,l].join("|")+")"+z+h+")*"),A="(?:"+[s,c,l].join("|")+")"+v,C=RegExp([p+"?"+f+"+"+g+"(?="+[u,p,"$"].join("|")+")",x+"+"+E+"(?="+[u,p+m,"$"].join("|")+")",p+"?"+m+"+"+g,p+"+"+E,"\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])","\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",r,A].join("|"),"g");e.exports=function(e){return e.match(C)||[]}},828:function(e,t,n){var a=n(4647),o=n(3222),i=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,u=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]","g");e.exports=function(e){return(e=o(e))&&e.replace(i,a).replace(u,"")}},249:function(e,t,n){var a=n(5539)((function(e,t,n){return e+(n?"-":"")+t.toLowerCase()}));e.exports=a},6645:function(e,t,n){var a=n(1733),o=n(5434),i=n(3222),u=n(2225);e.exports=function(e,t,n){return e=i(e),void 0===(t=n?void 0:t)?o(e)?u(e):a(e):e.match(t)||[]}}}]);
//# sourceMappingURL=component---src-pages-categories-jsx-d9e4e0b1cfd2e5d529a1.js.map