if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let c={};const a=e=>n(e,o),l={module:{uri:o},exports:c,require:a};s[o]=Promise.all(i.map((e=>l[e]||a(e)))).then((e=>(r(...e),c)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/_id_-3d5c0a66.js",revision:null},{url:"assets/_layout-95f0e13e.js",revision:null},{url:"assets/_layout-e893f688.css",revision:null},{url:"assets/App-6f0558f9.js",revision:null},{url:"assets/Home-cba9dc65.js",revision:null},{url:"assets/index-234403a3.js",revision:null},{url:"assets/index-5bcaaf91.css",revision:null},{url:"assets/react-35ef61ed.svg",revision:null},{url:"icons/favicon.png",revision:"8edb839dc98e4254e80ed21e275835bb"},{url:"icons/Icon-192.png",revision:"47263dbbdaeedfe6cf10b268e42ce562"},{url:"icons/Icon-512.png",revision:"1dcca581ca384187d963bd551afb42f0"},{url:"icons/Icon-maskable-192.png",revision:"47263dbbdaeedfe6cf10b268e42ce562"},{url:"icons/Icon-maskable-512.png",revision:"1dcca581ca384187d963bd551afb42f0"},{url:"index.html",revision:"3f4a5a7e5d013e79b19308cb672e6fd3"},{url:"registerSW.js",revision:"76617a197801e871dc3f3a5ad05f65bd"},{url:"svg/error.svg",revision:"76aa607441064fb9d763d74f0f114e60"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"icons/Icon-192.png",revision:"47263dbbdaeedfe6cf10b268e42ce562"},{url:"icons/Icon-512.png",revision:"1dcca581ca384187d963bd551afb42f0"},{url:"icons/Icon-maskable-192.png",revision:"47263dbbdaeedfe6cf10b268e42ce562"},{url:"icons/Icon-maskable-512.png",revision:"1dcca581ca384187d963bd551afb42f0"},{url:"manifest.webmanifest",revision:"4d463f6153ea36818b4419a3829c0336"}],{ignoreURLParametersMatching:[/.*/]}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
