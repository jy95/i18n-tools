"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[237],{8368:(e,t,n)=>{n.r(t),n.d(t,{default:()=>p});var a=n(7294),r=n(6010),l=n(7452),s=n(9960),i=n(2263);const c={heroBanner:"heroBanner_qdFl",buttons:"buttons_AeoN"};var m=n(7462);const o={features:"features_xdhU",featureSvg:"featureSvg__8YW"};var u=n(4996);const d=[{title:"Export",image:"/img/export.svg",description:a.createElement(a.Fragment,null,"Export i18n files into something else (xlsx, csv, ...)")},{title:"Import",image:"/img/import.svg",description:a.createElement(a.Fragment,null,"Turn a file (xlsx, csv, ...) to i18n file(s)")},{title:"Diff",image:"/img/diff.svg",description:a.createElement(a.Fragment,null,"Compare at least two i18n files and generate a report")}];function E(e){let{title:t,image:n,description:l}=e;return a.createElement("div",{className:(0,r.Z)("col col--4")},a.createElement("div",{className:"text--center"},a.createElement("img",{className:o.featureSvg,alt:t,src:(0,u.Z)(n)})),a.createElement("div",{className:"text--center padding-horiz--md"},a.createElement("h3",null,t),a.createElement("p",null,l)))}function f(){return a.createElement("section",{className:o.features},a.createElement("div",{className:"container"},a.createElement("div",{className:"row"},d.map(((e,t)=>a.createElement(E,(0,m.Z)({key:t},e)))))))}function g(){const{siteConfig:e}=(0,i.Z)();return a.createElement("header",{className:(0,r.Z)("hero hero--primary",c.heroBanner)},a.createElement("div",{className:"container"},a.createElement("h1",{className:"hero__title"},e.title),a.createElement("p",{className:"hero__subtitle"},e.tagline),a.createElement("div",{className:c.buttons},a.createElement(s.Z,{className:"button button--secondary button--lg",to:"/docs/commands"},"Discover it now \u2728"))))}function p(){const{siteConfig:e}=(0,i.Z)();return a.createElement(l.Z,{title:`${e.title}`,description:"CLI to make common operations around i18n files simpler"},a.createElement(g,null),a.createElement("main",null,a.createElement(f,null)))}}}]);