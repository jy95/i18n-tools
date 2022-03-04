"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[836],{3905:function(e,t,n){n.d(t,{Zo:function(){return f},kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},f=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,f=l(e,["components","mdxType","originalType","parentName"]),u=s(n),d=o,h=u["".concat(c,".").concat(d)]||u[d]||p[d]||a;return n?r.createElement(h,i(i({ref:t},f),{},{components:n})):r.createElement(h,i({ref:t},f))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=u;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},3584:function(e,t,n){n.r(t),n.d(t,{assets:function(){return f},contentTitle:function(){return c},default:function(){return d},frontMatter:function(){return l},metadata:function(){return s},toc:function(){return p}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],l={sidebar_position:3,sidebar_label:"FAQ"},c="FAQ",s={unversionedId:"faq",id:"faq",title:"FAQ",description:"How do I apply the replace changes listed by the JSON output of diff command ?",source:"@site/docs/faq.md",sourceDirName:".",slug:"/faq",permalink:"/i18n-tools/docs/faq",editUrl:"https://github.com/jy95/i18n-tools/edit/master/website/docs/faq.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,sidebar_label:"FAQ"},sidebar:"tutorialSidebar",previous:{title:"Diff",permalink:"/i18n-tools/docs/commands/diff"}},f={},p=[{value:"How do I apply the replace changes listed by the JSON output of diff command ?",id:"how-do-i-apply-the-replace-changes-listed-by-the-json-output-of-diff-command-",level:2}],u={toc:p};function d(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"faq"},"FAQ"),(0,a.kt)("h2",{id:"how-do-i-apply-the-replace-changes-listed-by-the-json-output-of-diff-command-"},"How do I apply the replace changes listed by the JSON output of diff command ?"),(0,a.kt)("p",null,"Simply with a Nodejs script :"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const _ = require('lodash');\nconst path = require('path');\nconst fs = require('fs').promises;\n\ntry {\n    // TODO replace with path to your file in develop or whatever branch\n    let originalFilePath = path.resolve(__dirname, \"fr.json\");\n    let jsonData = await fs.readFile(originalFilePath, 'utf8');\n    let currentObj = JSON.parse(jsonData);\n\n    // TODO replace with path to the file generated by diff command\n    let changesFilePath = path.resolve(__dirname, \"diff_fr.json\");\n    let jsonData2 = await fs.readFile(changesFilePath, 'utf8');\n    let changesFile = JSON.parse(jsonData2);\n    let changes = changesFile.changes;\n\n    // Proper variable for that\n    let result = Object.assign({}, currentObj);\n\n    // Add changed values\n    // (Feel free to edit the file generated by diff command if you want to override some changes)\n    for(let modifiedField of changes.filter(c => [\"REPLACED\"].includes(c.type)) ) {\n        _.set(result, modifiedField.key, modifiedField.newValue);\n    }\n\n    // write result\n    // TODO Add a path for destination\n    await fs.writeFile(\"\", JSON.stringify(result, null, 4));\n\n} catch(err) {\n    console.warn(\"Something bad happend\");\n    console.error(err);\n    process.exit(1);\n}\n")))}d.isMDXComponent=!0}}]);