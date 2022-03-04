"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[294],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return d}});var r=t(7294);function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){s(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,s=function(e,n){if(null==e)return{};var t,r,s={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(s[t]=e[t]);return s}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}var i=r.createContext({}),c=function(e){var n=r.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},u=function(e){var n=c(e.components);return r.createElement(i.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},p=r.forwardRef((function(e,n){var t=e.components,s=e.mdxType,a=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=c(t),d=s,f=p["".concat(i,".").concat(d)]||p[d]||m[d]||a;return t?r.createElement(f,o(o({ref:n},u),{},{components:t})):r.createElement(f,o({ref:n},u))}));function d(e,n){var t=arguments,s=n&&n.mdxType;if("string"==typeof e||s){var a=t.length,o=new Array(a);o[0]=p;var l={};for(var i in n)hasOwnProperty.call(n,i)&&(l[i]=n[i]);l.originalType=e,l.mdxType="string"==typeof e?e:s,o[1]=l;for(var c=2;c<a;c++)o[c]=t[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}p.displayName="MDXCreateElement"},8215:function(e,n,t){t.d(n,{Z:function(){return s}});var r=t(7294);function s(e){var n=e.children,t=e.hidden,s=e.className;return r.createElement("div",{role:"tabpanel",hidden:t,className:s},n)}},9877:function(e,n,t){t.d(n,{Z:function(){return u}});var r=t(7462),s=t(7294),a=t(2389),o=t(3725),l=t(6010),i="tabItem_LplD";function c(e){var n,t,a,c=e.lazy,u=e.block,m=e.defaultValue,p=e.values,d=e.groupId,f=e.className,v=s.Children.map(e.children,(function(e){if((0,s.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),y=null!=p?p:v.map((function(e){var n=e.props;return{value:n.value,label:n.label,attributes:n.attributes}})),g=(0,o.lx)(y,(function(e,n){return e.value===n.value}));if(g.length>0)throw new Error('Docusaurus error: Duplicate values "'+g.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var b=null===m?m:null!=(n=null!=m?m:null==(t=v.find((function(e){return e.props.default})))?void 0:t.props.value)?n:null==(a=v[0])?void 0:a.props.value;if(null!==b&&!y.some((function(e){return e.value===b})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+b+'" but none of its children has the corresponding value. Available values are: '+y.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var k=(0,o.UB)(),h=k.tabGroupChoices,N=k.setTabGroupChoices,j=(0,s.useState)(b),D=j[0],E=j[1],T=[],x=(0,o.o5)().blockElementScrollPositionUntilNextRender;if(null!=d){var w=h[d];null!=w&&w!==D&&y.some((function(e){return e.value===w}))&&E(w)}var _=function(e){var n=e.currentTarget,t=T.indexOf(n),r=y[t].value;r!==D&&(x(n),E(r),null!=d&&N(d,r))},O=function(e){var n,t=null;switch(e.key){case"ArrowRight":var r=T.indexOf(e.currentTarget)+1;t=T[r]||T[0];break;case"ArrowLeft":var s=T.indexOf(e.currentTarget)-1;t=T[s]||T[T.length-1]}null==(n=t)||n.focus()};return s.createElement("div",{className:"tabs-container"},s.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":u},f)},y.map((function(e){var n=e.value,t=e.label,a=e.attributes;return s.createElement("li",(0,r.Z)({role:"tab",tabIndex:D===n?0:-1,"aria-selected":D===n,key:n,ref:function(e){return T.push(e)},onKeyDown:O,onFocus:_,onClick:_},a,{className:(0,l.Z)("tabs__item",i,null==a?void 0:a.className,{"tabs__item--active":D===n})}),null!=t?t:n)}))),c?(0,s.cloneElement)(v.filter((function(e){return e.props.value===D}))[0],{className:"margin-vert--md"}):s.createElement("div",{className:"margin-vert--md"},v.map((function(e,n){return(0,s.cloneElement)(e,{key:n,hidden:e.props.value!==D})}))))}function u(e){var n=(0,a.Z)();return s.createElement(c,(0,r.Z)({key:String(n)},e))}},8373:function(e,n,t){t.d(n,{ZP:function(){return u}});var r=t(7462),s=t(3366),a=(t(7294),t(3905)),o=t(9877),l=t(8215),i=["components"],c={toc:[]};function u(e){var n=e.components,t=(0,s.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)(o.Z,{defaultValue:"fr.json",values:[{label:"fr.json",value:"fr.json"},{label:"nl.json",value:"nl.json"},{label:"de.json",value:"de.json"}],mdxType:"Tabs"},(0,a.kt)(l.Z,{value:"fr.json",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="fr.json"',title:'"fr.json"'},'{\n  "commons":{\n    "myNestedKey":"Hello world FR",\n    "myNestedArray":[\n      "1 FR",\n      "2 FR",\n      "3 FR"\n    ]\n  },\n  "array":[\n    "1 FR",\n    "2 FR",\n    "3 FR"\n  ],\n  "simpleKey":"[FR] not setted key",\n  "Key with spaces":[\n    {\n      "test":"42 is the answer"\n    }\n  ],\n  "Missing key in DE":"present"\n}\n'))),(0,a.kt)(l.Z,{value:"nl.json",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="nl.json"',title:'"nl.json"'},'{\n  "commons":{\n    "myNestedKey":"Hello world NL",\n    "myNestedArray":[\n      "1 NL",\n      "2 NL",\n      "3 NL"\n    ]\n  },\n  "array":[\n    "1 NL",\n    "2 NL",\n    "3 NL"\n  ],\n  "simpleKey":"[NL] not setted key",\n  "Key with spaces":[\n    {\n      "test":"42 is the answer"\n    }\n  ],\n  "Missing key in DE":"present"\n}\n'))),(0,a.kt)(l.Z,{value:"de.json",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="de.json"',title:'"de.json"'},'{\n  "commons":{\n    "myNestedKey":"Hello world DE",\n    "myNestedArray":[\n      "1 DE",\n      "2 DE",\n      "3 DE"\n    ]\n  },\n  "array":[\n    "1 DE",\n    "2 DE",\n    "3 DE"\n  ],\n  "simpleKey":"[DE] not setted key",\n  "Key with spaces":[\n    {\n      "test":"42 is the answer"\n    }\n  ]\n}\n')))))}u.isMDXComponent=!0},3256:function(e,n,t){t.d(n,{ZP:function(){return i}});var r=t(7462),s=t(3366),a=(t(7294),t(3905)),o=["components"],l={toc:[]};function i(e){var n=e.components,t=(0,s.Z)(e,o);return(0,a.kt)("wrapper",(0,r.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("details",null,(0,a.kt)("summary",null,"I want as result flat JSON file(s). How can I achieve that ?"),(0,a.kt)("p",null,"Simply set option ",(0,a.kt)("inlineCode",{parentName:"p"},"keySeparator")," to ",(0,a.kt)("inlineCode",{parentName:"p"},"false")," in your ",(0,a.kt)("inlineCode",{parentName:"p"},"settings.json")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"settings.js"),", such as :"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="settings.json"',title:'"settings.json"'},'{\n  "keySeparator": false\n}\n'))))}i.isMDXComponent=!0},8280:function(e,n,t){t.r(n),t.d(n,{assets:function(){return f},contentTitle:function(){return p},default:function(){return g},frontMatter:function(){return m},metadata:function(){return d},toc:function(){return v}});var r=t(7462),s=t(3366),a=(t(7294),t(3905)),o=t(9877),l=t(8215),i=t(3256),c=t(8373),u=["components"],m={sidebar_position:2,sidebar_label:"import from_csv",title:"import from_csv",description:"Turn a csv file to i18n file(s)"},p=void 0,d={unversionedId:"commands/import/import from_csv",id:"commands/import/import from_csv",title:"import from_csv",description:"Turn a csv file to i18n file(s)",source:"@site/docs/commands/import/import from_csv.mdx",sourceDirName:"commands/import",slug:"/commands/import/import from_csv",permalink:"/i18n-tools/docs/commands/import/import from_csv",editUrl:"https://github.com/jy95/i18n-tools/edit/master/website/docs/commands/import/import from_csv.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,sidebar_label:"import from_csv",title:"import from_csv",description:"Turn a csv file to i18n file(s)"},sidebar:"tutorialSidebar",previous:{title:"import from_xlsx",permalink:"/i18n-tools/docs/commands/import/import from_xlsx"},next:{title:"Diff",permalink:"/i18n-tools/docs/commands/diff"}},f={},v=[{value:"Command",id:"command",level:2},{value:"Purpose",id:"purpose",level:2},{value:"Examples of settings",id:"examples-of-settings",level:2},{value:"FAQ",id:"faq",level:2}],y={toc:v};function g(e){var n=e.components,m=(0,s.Z)(e,u);return(0,a.kt)("wrapper",(0,r.Z)({},y,m,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Turn a csv file to i18n file(s)")),(0,a.kt)("h2",{id:"command"},"Command"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"# Display help for import from_csv\nnpx @jy95/i18n-tools import from_csv --help\n")),(0,a.kt)("h2",{id:"purpose"},"Purpose"),(0,a.kt)("p",null,"Suppose you have a ",(0,a.kt)("a",{target:"_blank",href:t(4555).Z},"csv file")," structured as :"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csv",metastring:'title="export-csv.csv"',title:'"export-csv.csv"'},"Technical Key;French translation;Dutch translation;German translation\nKey with spaces[0].test;42 is the answer;42 is the answer;42 is the answer\nMissing key in DE;present;present;\narray[0];1 FR;1 NL;1 DE\narray[1];2 FR;2 NL;2 DE\narray[2];3 FR;3 NL;3 DE\ncommons.myNestedArray[0];1 FR;1 NL;1 DE\ncommons.myNestedArray[1];2 FR;2 NL;2 DE\ncommons.myNestedArray[2];3 FR;3 NL;3 DE\ncommons.myNestedKey;Hello world FR;Hello world NL;Hello world DE\nsimpleKey;[FR] not setted key;[NL] not setted key;[DE] not setted key\n")),(0,a.kt)("p",null,"This command helps you to turn this into several i18n json files :"),(0,a.kt)(c.ZP,{mdxType:"I18NFilesTabs"}),(0,a.kt)("h2",{id:"examples-of-settings"},"Examples of settings"),(0,a.kt)(o.Z,{defaultValue:"settings1",values:[{label:"Paths",value:"settings1"},{label:"Objects/Arrays",value:"settings2"},{label:"Settings.js",value:"settings3"}],mdxType:"Tabs"},(0,a.kt)(l.Z,{value:"settings1",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'npx @jy95/i18n-tools import from_csv --settings "/absolutePath/to/settings1.json"\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="settings1.json"',title:'"settings1.json"'},'{\n   "input":"D:\\\\workspace\\\\i18n-tools\\\\test\\\\fixtures\\\\import-csv\\\\export-csv.csv",\n   "columns":"D:\\\\TEMP\\\\TEMP\\\\tests-for-import\\\\correct\\\\columns.json",\n   "locales":[\n      "FR",\n      "NL",\n      "DE"\n   ],\n   "outputDir":"D:\\\\TEMP\\\\TEMP\\\\tests-for-import",\n   "suffix":"_settings1"\n}\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="columns.json"',title:'"columns.json"'},'{\n    "technical_key":"Technical Key",\n    "locales":{\n        "FR":"French translation",\n        "NL":"Dutch translation",\n        "DE":"German translation"\n    }\n}\n'))),(0,a.kt)(l.Z,{value:"settings2",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'npx @jy95/i18n-tools import from_csv --settings "/absolutePath/to/settings2.json"\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="settings2.json"',title:'"settings2.json"'},'{\n   "input":"D:\\\\workspace\\\\i18n-tools\\\\test\\\\fixtures\\\\import-csv\\\\export-csv.csv",\n   "columns":{\n      "technical_key":"Technical Key",\n      "locales":{\n         "FR":"French translation",\n         "NL":"Dutch translation",\n         "DE":"German translation"\n      }\n   },\n   "locales":[\n      "FR",\n      "NL",\n      "DE"\n   ],\n   "outputDir":"D:\\\\TEMP\\\\TEMP\\\\tests-for-import",\n   "suffix":"_settings2"\n}\n'))),(0,a.kt)(l.Z,{value:"settings3",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'npx @jy95/i18n-tools import from_csv --settings "/absolutePath/to/settings3.js"\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="settings3.js"',title:'"settings3.js"'},'module.exports = {\n  input: "D:\\\\workspace\\\\i18n-tools\\\\test\\\\fixtures\\\\import-csv\\\\export-csv.csv",\n  columns: {\n    technical_key: "Technical Key",\n    locales: [\n      ["FR", "French translation"],\n      ["NL", "Dutch translation"],\n      ["DE", "German translation"],\n    ].reduce(\n      (prev, [locale, label]) =>\n        Object.assign(prev, {\n          [locale]: label,\n        }),\n      {}\n    ),\n  },\n  locales: ["FR", "NL", "DE"],\n  outputDir: "D:\\\\TEMP\\\\TEMP\\\\tests-for-import",\n  suffix: "_settings3",\n};\n')))),(0,a.kt)("h2",{id:"faq"},"FAQ"),(0,a.kt)(i.ZP,{mdxType:"ImportFaq"}))}g.isMDXComponent=!0},4555:function(e,n,t){n.Z=t.p+"assets/files/export-csv-61f16c92d714e9d227be95e74170289a.csv"}}]);