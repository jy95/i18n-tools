"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[456],{4251:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"commands/commands","title":"Commands","description":"","source":"@site/docs/commands/index.mdx","sourceDirName":"commands","slug":"/commands/","permalink":"/i18n-tools/docs/commands/","draft":false,"unlisted":false,"editUrl":"https://github.com/jy95/i18n-tools/edit/master/website/docs/commands/index.mdx","tags":[],"version":"current","frontMatter":{"sidebar_label":"Commands","title":"Commands","id":"commands"},"sidebar":"tutorialSidebar","previous":{"title":"Installation","permalink":"/i18n-tools/docs/installation"},"next":{"title":"Export commands","permalink":"/i18n-tools/docs/commands/export/"}}');var s=n(4848),o=n(8453),c=n(9563);const i={sidebar_label:"Commands",title:"Commands",id:"commands"},a=void 0,l={},d=[];function m(e){const t={code:"code",pre:"pre",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"# Display all available commands\nnpx @jy95/i18n-tools --help\n"})}),"\n",(0,s.jsx)(c.A,{})]})}function u(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(m,{...e})}):m(e)}},9563:(e,t,n)=>{n.d(t,{A:()=>j});n(6540);var r=n(4164),s=n(3751),o=n(6289),c=n(1430),i=n(2887),a=n(539),l=n(9303);const d={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var m=n(4848);function u(e){let{href:t,children:n}=e;return(0,m.jsx)(o.A,{href:t,className:(0,r.A)("card padding--lg",d.cardContainer),children:n})}function p(e){let{href:t,icon:n,title:s,description:o}=e;return(0,m.jsxs)(u,{href:t,children:[(0,m.jsxs)(l.A,{as:"h2",className:(0,r.A)("text--truncate",d.cardTitle),title:s,children:[n," ",s]}),o&&(0,m.jsx)("p",{className:(0,r.A)("text--truncate",d.cardDescription),title:o,children:o})]})}function f(e){let{item:t}=e;const n=(0,s.Nr)(t),r=function(){const{selectMessage:e}=(0,c.W)();return t=>e(t,(0,a.T)({message:"1 item|{count} items",id:"theme.docs.DocCard.categoryDescription.plurals",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t}))}();return n?(0,m.jsx)(p,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??r(t.items.length)}):null}function h(e){let{item:t}=e;const n=(0,i.A)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",r=(0,s.cC)(t.docId??void 0);return(0,m.jsx)(p,{href:t.href,icon:n,title:t.label,description:t.description??r?.description})}function x(e){let{item:t}=e;switch(t.type){case"link":return(0,m.jsx)(h,{item:t});case"category":return(0,m.jsx)(f,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function g(e){let{className:t}=e;const n=(0,s.$S)();return(0,m.jsx)(j,{items:n.items,className:t})}function j(e){const{items:t,className:n}=e;if(!t)return(0,m.jsx)(g,{...e});const o=(0,s.d1)(t);return(0,m.jsx)("section",{className:(0,r.A)("row",n),children:o.map(((e,t)=>(0,m.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,m.jsx)(x,{item:e})},t)))})}},1430:(e,t,n)=>{n.d(t,{W:()=>l});var r=n(6540),s=n(797);const o=["zero","one","two","few","many","other"];function c(e){return o.filter((t=>e.includes(t)))}const i={locale:"en",pluralForms:c(["one","other"]),select:e=>1===e?"one":"other"};function a(){const{i18n:{currentLocale:e}}=(0,s.A)();return(0,r.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:c(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),i}}),[e])}function l(){const e=a();return{selectMessage:(t,n)=>function(e,t,n){const r=e.split("|");if(1===r.length)return r[0];r.length>n.pluralForms.length&&console.error(`For locale=${n.locale}, a maximum of ${n.pluralForms.length} plural forms are expected (${n.pluralForms.join(",")}), but the message contains ${r.length}: ${e}`);const s=n.select(t),o=n.pluralForms.indexOf(s);return r[Math.min(o,r.length-1)]}(n,t,e)}}},8453:(e,t,n)=>{n.d(t,{R:()=>c,x:()=>i});var r=n(6540);const s={},o=r.createContext(s);function c(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);