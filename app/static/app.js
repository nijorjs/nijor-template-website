!function(){"use strict";function n(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function e(n,e){for(var t=0;t<e.length;t++){var o=e[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}function t(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}Object.prototype.getAttributes=function(){for(var n,e=[],t=[],o=0,r=this.attributes,i=r.length;o<i;o++)n=r[o],e.push(n.nodeName),t.push(n.nodeValue);e.push("innerContent"),t.push(this.innerHTML);var u=t,c={};return e.forEach((function(n,e){return c[n]=u[e]})),c};var o=function(){function e(t){n(this,e),this.template=t}return t(e,[{key:"init",value:function(n){this.name=n}},{key:"run",value:function(){var n=this,e=new RegExp("(<".concat(this.name,"[^>]+>|<").concat(this.name,">)"));document.querySelectorAll(this.name).forEach((function(t){t.innerHTML="";var o=t.getAttributes();t.parentElement.innerHTML=t.parentElement.innerHTML.replace(e,n.template(o))}))}}]),e}(),r=new o((()=>{try{return'<div n-scope="be4RvPLVpXG8"><h1 n-scope="be4RvPLVpXG8" onclick="fn_HQ2OPZ3HdnfjqIiegBqP()" ondblclick="fn_AYeJBWslQmwZBl()">Nijor</h1></div>'}finally{setTimeout((()=>{}),3)}})),i=new o((()=>{try{return'<div n-scope="WH1urYSrq9C3pcYMTnq"><p n-scope="WH1urYSrq9C3pcYMTnq">Nijor</p></div>'}finally{setTimeout((()=>{}),3)}}));r.init("header"),i.init("footer");var u=new o((()=>{try{return document.body.style.backgroundColor="rgb(0, 0, 0, 0.918)",'<header n-scope="CJuicjgZ85eJ5"></header><div id="n-routes" n-scope="CJuicjgZ85eJ5"></div><footer n-scope="CJuicjgZ85eJ5"></footer>'}finally{setTimeout((()=>{r.run(),i.run()}),3)}})),c=new o((()=>{try{return'<div n-scope="v7q6jYUUnkyl"><img src="/images/logo.svg" n-scope="v7q6jYUUnkyl"><p n-scope="v7q6jYUUnkyl">Edit src directory to edit this page.</p><a n-scope="v7q6jYUUnkyl" onclick="(function(){try{history.pushState(null,null,\'/hello\');history.pushState(null,null,\'/hello\');history.back();}catch(e){window.location.href=\'/hello\';}})()"><button n-scope="v7q6jYUUnkyl">Hello World!</button></a></div>'}finally{setTimeout((()=>{}),3)}})),l=new o((()=>{try{return'<div n-scope="0H38fW"><h1 n-scope="0H38fW">Hello World from Nijor!</h1><a n-scope="0H38fW" onclick="(function(){try{history.pushState(null,null,\'/\');history.pushState(null,null,\'/\');history.back();}catch(e){window.location.href=\'/\';}})()"><button n-scope="0H38fW">Home</button></a><p n-scope="0H38fW">For help refer to our <a href="https://github.com/JapiAxom/nijor" style="color:#0066f6;" n-scope="0H38fW">Github Repo</a>.</p></div>'}finally{setTimeout((()=>{}),3)}})),a={"/":function(){},"*":function(){}},s=new(function(){function e(t){n(this,e),this.routesDiv=t}return t(e,[{key:"add",value:function(n,e){this.url=n,a[n]=function(){e()}}},{key:"render",value:function(n,e){var t=this;this.url=n,a[n]=function(){document.querySelector(t.routesDiv).innerHTML="<app></app>",e.init("app"),e.run()}}},{key:"extend",value:function(n,e){}},{key:"route",value:function(n){try{n.init("app"),n.run()}catch(n){}var e=window.location.pathname;try{a[e]()}catch(n){a["*"]()}window.onpopstate=function(){var n=window.location.pathname;try{a[n]()}catch(n){a["*"]()}}}}]),e}())("#n-routes");s.render("/",c),s.render("/hello",l),s.route(u)}();
