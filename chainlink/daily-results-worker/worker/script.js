!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){function n(e){const t=new Date,n=t.getFullYear(),r=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"][t.getMonth()];let o=String(t.getDate()-1);o=o.length<2?"0"+o:o;return`${n}-${r}-${o}`}addEventListener("fetch",e=>{e.respondWith(async function(e){const t=function(e,t){const n=[];for(let r=0;r<e.length;++r)n.push(t(e[r]));return n}(await async function(e){const t=[API_URL,PATH,n(e),"?key="+SPORTSDATA_KEY].join(""),r=await fetch(new Request(t),{"Content-Type":"application/json;charset=UTF-8"});return await r.json()}(e),e=>function(e){const t=e.HomeTeam,n=e.AwayTeam,r=e.HomeTeamScore,o=e.AwayTeamScore,[a,u]=r>o?[t,n]:[n,t];return{home:t,away:n,loser:u,winner:a,score:[Math.max(r,o),Math.min(r,o)]}}(e.Game));return new Response(JSON.stringify({data:t}),{headers:{"content-type":"application/json"}})}(e.request))})}]);