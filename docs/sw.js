if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let t={};const o=e=>i(e,l),u={module:{uri:l},exports:t,require:o};s[l]=Promise.all(n.map((e=>u[e]||o(e)))).then((e=>(r(...e),t)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/_id_-8273ba61.js",revision:null},{url:"assets/_layout-2ad89eae.js",revision:null},{url:"assets/_layout-e893f688.css",revision:null},{url:"assets/App-df924369.js",revision:null},{url:"assets/Home-c6db09a5.js",revision:null},{url:"assets/index-bc90a83a.css",revision:null},{url:"assets/index-ec89d58c.js",revision:null},{url:"index.html",revision:"9c84add2ce02727de57e64132fc0b0a6"},{url:"registerSW.js",revision:"dd44163f74bc2b1990caa4d9d99a474a"},{url:"manifest.webmanifest",revision:"d5041d3c2c160e6056b0b5ab7aee2aa3"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
