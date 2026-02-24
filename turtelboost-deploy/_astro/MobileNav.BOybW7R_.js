import{c as r,j as e}from"./createLucideIcon.BVGEjM5v.js";import{r as n}from"./index.CGw6F0hf.js";/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],i=r("menu",o);/**
 * @license lucide-react v0.575.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],h=r("x",c),d=[{href:"/",label:"Start"},{href:"/leistungen",label:"Leistungen"},{href:"/preise",label:"Preise"},{href:"/ueber-uns",label:"Über uns"},{href:"/galerie",label:"Galerie"},{href:"/blog",label:"Blog"},{href:"/faq",label:"FAQ"},{href:"/kontakt",label:"Kontakt"}];function p({currentPath:s}){const[a,l]=n.useState(!1);return e.jsxs("div",{className:"lg:hidden",children:[e.jsx("button",{onClick:()=>l(!a),className:"p-2 rounded-lg hover:bg-gray-100 transition-colors","aria-label":a?"Menü schließen":"Menü öffnen",children:a?e.jsx(h,{className:"w-6 h-6"}):e.jsx(i,{className:"w-6 h-6"})}),a&&e.jsx("div",{className:"absolute top-full left-0 right-0 bg-white border-t shadow-lg z-50",children:e.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-1",children:[d.map(t=>e.jsx("a",{href:t.href,className:`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${s===t.href?"text-primary-600 bg-primary-50":"text-gray-700 hover:bg-gray-50"}`,onClick:()=>l(!1),children:t.label},t.href)),e.jsx("a",{href:"/anmeldung",className:"block mt-3 px-4 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-500 text-white text-sm font-semibold text-center",onClick:()=>l(!1),children:"Jetzt anmelden"})]})})]})}export{p as default};
