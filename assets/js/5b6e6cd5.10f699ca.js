"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[294],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),c=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(i.Provider,{value:t},e.children)},m="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),m=c(n),d=a,f=m["".concat(i,".").concat(d)]||m[d]||p[d]||s;return n?r.createElement(f,o(o({ref:t},u),{},{components:n})):r.createElement(f,o({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,o=new Array(s);o[0]=d;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[m]="string"==typeof e?e:a,o[1]=l;for(var c=2;c<s;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5162:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(7294),a=n(6010);const s={tabItem:"tabItem_Ymn6"};function o(e){let{children:t,hidden:n,className:o}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(s.tabItem,o),hidden:n},t)}},4866:(e,t,n)=>{n.d(t,{Z:()=>N});var r=n(7462),a=n(7294),s=n(6010),o=n(2466),l=n(6550),i=n(1980),c=n(7392),u=n(12);function m(e){return function(e){return a.Children.map(e,(e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}function p(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=t??m(n);return function(e){const t=(0,c.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function d(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:n}=e;const r=(0,l.k6)(),s=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i._X)(s),(0,a.useCallback)((e=>{if(!s)return;const t=new URLSearchParams(r.location.search);t.set(s,e),r.replace({...r.location,search:t.toString()})}),[s,r])]}function y(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,s=p(e),[o,l]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!d({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:s}))),[i,c]=f({queryString:n,groupId:r}),[m,y]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,s]=(0,u.Nk)(n);return[r,(0,a.useCallback)((e=>{n&&s.set(e)}),[n,s])]}({groupId:r}),v=(()=>{const e=i??m;return d({value:e,tabValues:s})?e:null})();(0,a.useLayoutEffect)((()=>{v&&l(v)}),[v]);return{selectedValue:o,selectValue:(0,a.useCallback)((e=>{if(!d({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);l(e),c(e),y(e)}),[c,y,s]),tabValues:s}}var v=n(2389);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};function g(e){let{className:t,block:n,selectedValue:l,selectValue:i,tabValues:c}=e;const u=[],{blockElementScrollPositionUntilNextRender:m}=(0,o.o5)(),p=e=>{const t=e.currentTarget,n=u.indexOf(t),r=c[n].value;r!==l&&(m(t),i(r))},d=e=>{let t=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const n=u.indexOf(e.currentTarget)+1;t=u[n]??u[0];break}case"ArrowLeft":{const n=u.indexOf(e.currentTarget)-1;t=u[n]??u[u.length-1];break}}t?.focus()};return a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":n},t)},c.map((e=>{let{value:t,label:n,attributes:o}=e;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:l===t?0:-1,"aria-selected":l===t,key:t,ref:e=>u.push(e),onKeyDown:d,onClick:p},o,{className:(0,s.Z)("tabs__item",b.tabItem,o?.className,{"tabs__item--active":l===t})}),n??t)})))}function h(e){let{lazy:t,children:n,selectedValue:r}=e;const s=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=s.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return a.createElement("div",{className:"margin-top--md"},s.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==r}))))}function k(e){const t=y(e);return a.createElement("div",{className:(0,s.Z)("tabs-container",b.tabList)},a.createElement(g,(0,r.Z)({},e,t)),a.createElement(h,(0,r.Z)({},e,t)))}function N(e){const t=(0,v.Z)();return a.createElement(k,(0,r.Z)({key:String(t)},e))}},8373:(e,t,n)=>{n.d(t,{ZP:()=>c});var r=n(7462),a=(n(7294),n(3905)),s=n(4866),o=n(5162);const l={toc:[]},i="wrapper";function c(e){let{components:t,...n}=e;return(0,a.kt)(i,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)(s.Z,{defaultValue:"fr.json",values:[{label:"fr.json",value:"fr.json"},{label:"nl.json",value:"nl.json"},{label:"de.json",value:"de.json"}],mdxType:"Tabs"},(0,a.kt)(o.Z,{value:"fr.json",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="fr.json"',title:'"fr.json"'},'{\n  "commons":{\n    "myNestedKey":"Hello world FR",\n    "myNestedArray":[\n      "1 FR",\n      "2 FR",\n      "3 FR"\n    ]\n  },\n  "array":[\n    "1 FR",\n    "2 FR",\n    "3 FR"\n  ],\n  "simpleKey":"[FR] not setted key",\n  "Key with spaces":[\n    {\n      "test":"42 is the answer"\n    }\n  ],\n  "Missing key in DE":"present"\n}\n'))),(0,a.kt)(o.Z,{value:"nl.json",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="nl.json"',title:'"nl.json"'},'{\n  "commons":{\n    "myNestedKey":"Hello world NL",\n    "myNestedArray":[\n      "1 NL",\n      "2 NL",\n      "3 NL"\n    ]\n  },\n  "array":[\n    "1 NL",\n    "2 NL",\n    "3 NL"\n  ],\n  "simpleKey":"[NL] not setted key",\n  "Key with spaces":[\n    {\n      "test":"42 is the answer"\n    }\n  ],\n  "Missing key in DE":"present"\n}\n'))),(0,a.kt)(o.Z,{value:"de.json",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="de.json"',title:'"de.json"'},'{\n  "commons":{\n    "myNestedKey":"Hello world DE",\n    "myNestedArray":[\n      "1 DE",\n      "2 DE",\n      "3 DE"\n    ]\n  },\n  "array":[\n    "1 DE",\n    "2 DE",\n    "3 DE"\n  ],\n  "simpleKey":"[DE] not setted key",\n  "Key with spaces":[\n    {\n      "test":"42 is the answer"\n    }\n  ]\n}\n')))))}c.isMDXComponent=!0},3256:(e,t,n)=>{n.d(t,{ZP:()=>l});var r=n(7462),a=(n(7294),n(3905));const s={toc:[]},o="wrapper";function l(e){let{components:t,...n}=e;return(0,a.kt)(o,(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("details",null,(0,a.kt)("summary",null,"I want as result flat JSON file(s). How can I achieve that ?"),(0,a.kt)("p",null,"Simply set option ",(0,a.kt)("inlineCode",{parentName:"p"},"keySeparator")," to ",(0,a.kt)("inlineCode",{parentName:"p"},"false")," in your ",(0,a.kt)("inlineCode",{parentName:"p"},"settings.json")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"settings.js"),", such as :"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="settings.json"',title:'"settings.json"'},'{\n  "keySeparator": false\n}\n'))))}l.isMDXComponent=!0},8280:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>u,default:()=>v,frontMatter:()=>c,metadata:()=>m,toc:()=>d});var r=n(7462),a=(n(7294),n(3905)),s=n(4866),o=n(5162),l=n(3256),i=n(8373);const c={sidebar_position:2,sidebar_label:"import from_csv",title:"import from_csv",description:"Turn a csv file to i18n file(s)"},u=void 0,m={unversionedId:"commands/import/import from_csv",id:"commands/import/import from_csv",title:"import from_csv",description:"Turn a csv file to i18n file(s)",source:"@site/docs/commands/import/import from_csv.mdx",sourceDirName:"commands/import",slug:"/commands/import/import from_csv",permalink:"/i18n-tools/docs/commands/import/import from_csv",draft:!1,editUrl:"https://github.com/jy95/i18n-tools/edit/master/website/docs/commands/import/import from_csv.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,sidebar_label:"import from_csv",title:"import from_csv",description:"Turn a csv file to i18n file(s)"},sidebar:"tutorialSidebar",previous:{title:"import from_xlsx",permalink:"/i18n-tools/docs/commands/import/import from_xlsx"},next:{title:"Diff",permalink:"/i18n-tools/docs/commands/diff"}},p={},d=[{value:"Command",id:"command",level:2},{value:"Purpose",id:"purpose",level:2},{value:"Examples of settings",id:"examples-of-settings",level:2},{value:"FAQ",id:"faq",level:2}],f={toc:d},y="wrapper";function v(e){let{components:t,...c}=e;return(0,a.kt)(y,(0,r.Z)({},f,c,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Turn a csv file to i18n file(s)")),(0,a.kt)("h2",{id:"command"},"Command"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"# Display help for import from_csv\nnpx @jy95/i18n-tools import from_csv --help\n")),(0,a.kt)("h2",{id:"purpose"},"Purpose"),(0,a.kt)("p",null,"Suppose you have a ",(0,a.kt)("a",{target:"_blank",href:n(4555).Z},"csv file")," structured as :"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csv",metastring:'title="export-csv.csv"',title:'"export-csv.csv"'},"Technical Key;French translation;Dutch translation;German translation\nKey with spaces[0].test;42 is the answer;42 is the answer;42 is the answer\nMissing key in DE;present;present;\narray[0];1 FR;1 NL;1 DE\narray[1];2 FR;2 NL;2 DE\narray[2];3 FR;3 NL;3 DE\ncommons.myNestedArray[0];1 FR;1 NL;1 DE\ncommons.myNestedArray[1];2 FR;2 NL;2 DE\ncommons.myNestedArray[2];3 FR;3 NL;3 DE\ncommons.myNestedKey;Hello world FR;Hello world NL;Hello world DE\nsimpleKey;[FR] not setted key;[NL] not setted key;[DE] not setted key\n")),(0,a.kt)("p",null,"This command helps you to turn this into several i18n json files :"),(0,a.kt)(i.ZP,{mdxType:"I18NFilesTabs"}),(0,a.kt)("h2",{id:"examples-of-settings"},"Examples of settings"),(0,a.kt)(s.Z,{defaultValue:"settings1",values:[{label:"Paths",value:"settings1"},{label:"Objects/Arrays",value:"settings2"},{label:"Settings.js",value:"settings3"}],mdxType:"Tabs"},(0,a.kt)(o.Z,{value:"settings1",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'npx @jy95/i18n-tools import from_csv --settings "/absolutePath/to/settings1.json"\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="settings1.json"',title:'"settings1.json"'},'{\n   "input":"D:\\\\workspace\\\\i18n-tools\\\\test\\\\fixtures\\\\import-csv\\\\export-csv.csv",\n   "columns":"D:\\\\TEMP\\\\TEMP\\\\tests-for-import\\\\correct\\\\columns.json",\n   "locales":[\n      "FR",\n      "NL",\n      "DE"\n   ],\n   "outputDir":"D:\\\\TEMP\\\\TEMP\\\\tests-for-import",\n   "suffix":"_settings1"\n}\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="columns.json"',title:'"columns.json"'},'{\n    "technical_key":"Technical Key",\n    "locales":{\n        "FR":"French translation",\n        "NL":"Dutch translation",\n        "DE":"German translation"\n    }\n}\n'))),(0,a.kt)(o.Z,{value:"settings2",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'npx @jy95/i18n-tools import from_csv --settings "/absolutePath/to/settings2.json"\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="settings2.json"',title:'"settings2.json"'},'{\n   "input":"D:\\\\workspace\\\\i18n-tools\\\\test\\\\fixtures\\\\import-csv\\\\export-csv.csv",\n   "columns":{\n      "technical_key":"Technical Key",\n      "locales":{\n         "FR":"French translation",\n         "NL":"Dutch translation",\n         "DE":"German translation"\n      }\n   },\n   "locales":[\n      "FR",\n      "NL",\n      "DE"\n   ],\n   "outputDir":"D:\\\\TEMP\\\\TEMP\\\\tests-for-import",\n   "suffix":"_settings2"\n}\n'))),(0,a.kt)(o.Z,{value:"settings3",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'npx @jy95/i18n-tools import from_csv --settings "/absolutePath/to/settings3.js"\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="settings3.js"',title:'"settings3.js"'},'module.exports = {\n  input: "D:\\\\workspace\\\\i18n-tools\\\\test\\\\fixtures\\\\import-csv\\\\export-csv.csv",\n  columns: {\n    technical_key: "Technical Key",\n    locales: [\n      ["FR", "French translation"],\n      ["NL", "Dutch translation"],\n      ["DE", "German translation"],\n    ].reduce(\n      (prev, [locale, label]) =>\n        Object.assign(prev, {\n          [locale]: label,\n        }),\n      {}\n    ),\n  },\n  locales: ["FR", "NL", "DE"],\n  outputDir: "D:\\\\TEMP\\\\TEMP\\\\tests-for-import",\n  suffix: "_settings3",\n};\n')))),(0,a.kt)("h2",{id:"faq"},"FAQ"),(0,a.kt)(l.ZP,{mdxType:"ImportFaq"}))}v.isMDXComponent=!0},4555:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/files/export-csv-61f16c92d714e9d227be95e74170289a.csv"}}]);