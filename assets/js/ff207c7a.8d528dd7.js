"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[457],{3905:(e,t,r)=>{r.d(t,{Zo:()=>m,kt:()=>f});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),l=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},m=function(e){var t=l(e.components);return n.createElement(s.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,m=a(e,["components","mdxType","originalType","parentName"]),p=l(r),u=o,f=p["".concat(s,".").concat(u)]||p[u]||d[u]||i;return r?n.createElement(f,c(c({ref:t},m),{},{components:r})):n.createElement(f,c({ref:t},m))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,c=new Array(i);c[0]=u;var a={};for(var s in t)hasOwnProperty.call(t,s)&&(a[s]=t[s]);a.originalType=e,a[p]="string"==typeof e?e:o,c[1]=a;for(var l=2;l<i;l++)c[l]=r[l];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},2991:(e,t,r)=>{r.d(t,{Z:()=>b});var n=r(7294),o=r(6010),i=r(3438),c=r(9960),a=r(3919),s=r(5999);const l={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};function m(e){let{href:t,children:r}=e;return n.createElement(c.Z,{href:t,className:(0,o.Z)("card padding--lg",l.cardContainer)},r)}function p(e){let{href:t,icon:r,title:i,description:c}=e;return n.createElement(m,{href:t},n.createElement("h2",{className:(0,o.Z)("text--truncate",l.cardTitle),title:i},r," ",i),c&&n.createElement("p",{className:(0,o.Z)("text--truncate",l.cardDescription),title:c},c))}function d(e){let{item:t}=e;const r=(0,i.Wl)(t);return r?n.createElement(p,{href:r,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??(0,s.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function u(e){let{item:t}=e;const r=(0,a.Z)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",o=(0,i.xz)(t.docId??void 0);return n.createElement(p,{href:t.href,icon:r,title:t.label,description:t.description??o?.description})}function f(e){let{item:t}=e;switch(t.type){case"link":return n.createElement(u,{item:t});case"category":return n.createElement(d,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function y(e){let{className:t}=e;const r=(0,i.jA)();return n.createElement(b,{items:r.items,className:t})}function b(e){const{items:t,className:r}=e;if(!t)return n.createElement(y,e);const c=(0,i.MN)(t);return n.createElement("section",{className:(0,o.Z)("row",r)},c.map(((e,t)=>n.createElement("article",{key:t,className:"col col--6 margin-bottom--lg"},n.createElement(f,{item:e})))))}},4708:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>c,metadata:()=>s,toc:()=>m});var n=r(7462),o=(r(7294),r(3905)),i=r(2991);const c={sidebar_label:"Import commands",title:"Import commands",id:"import",description:"Turn something to i18n file(s)"},a=void 0,s={unversionedId:"commands/import/import",id:"commands/import/import",title:"Import commands",description:"Turn something to i18n file(s)",source:"@site/docs/commands/import/index.mdx",sourceDirName:"commands/import",slug:"/commands/import/",permalink:"/i18n-tools/docs/commands/import/",draft:!1,editUrl:"https://github.com/jy95/i18n-tools/edit/master/website/docs/commands/import/index.mdx",tags:[],version:"current",frontMatter:{sidebar_label:"Import commands",title:"Import commands",id:"import",description:"Turn something to i18n file(s)"},sidebar:"tutorialSidebar",previous:{title:"export to_csv",permalink:"/i18n-tools/docs/commands/export/export to_csv"},next:{title:"import from_xlsx",permalink:"/i18n-tools/docs/commands/import/import from_xlsx"}},l={},m=[],p={toc:m},d="wrapper";function u(e){let{components:t,...r}=e;return(0,o.kt)(d,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"# Display all available import commands\nnpx @jy95/i18n-tools import --help\n")),(0,o.kt)(i.Z,{mdxType:"DocCardList"}))}u.isMDXComponent=!0}}]);