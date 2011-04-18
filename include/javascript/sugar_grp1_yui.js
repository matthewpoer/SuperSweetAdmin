/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
if(typeof YAHOO=="undefined"||!YAHOO){var YAHOO={};}YAHOO.namespace=function(){var A=arguments,E=null,C,B,D;for(C=0;C<A.length;C=C+1){D=(""+A[C]).split(".");E=YAHOO;for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){E[D[B]]=E[D[B]]||{};E=E[D[B]];}}return E;};YAHOO.log=function(D,A,C){var B=YAHOO.widget.Logger;if(B&&B.log){return B.log(D,A,C);}else{return false;}};YAHOO.register=function(A,E,D){var I=YAHOO.env.modules,B,H,G,F,C;if(!I[A]){I[A]={versions:[],builds:[]};}B=I[A];H=D.version;G=D.build;F=YAHOO.env.listeners;B.name=A;B.version=H;B.build=G;B.versions.push(H);B.builds.push(G);B.mainClass=E;for(C=0;C<F.length;C=C+1){F[C](B);}if(E){E.VERSION=H;E.BUILD=G;}else{YAHOO.log("mainClass is undefined for module "+A,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(A){return YAHOO.env.modules[A]||null;};YAHOO.env.ua=function(){var D=function(H){var I=0;return parseFloat(H.replace(/\./g,function(){return(I++==1)?"":".";}));},G=navigator,F={ie:0,opera:0,gecko:0,webkit:0,mobile:null,air:0,caja:G.cajaVersion,secure:false,os:null},C=navigator&&navigator.userAgent,E=window&&window.location,B=E&&E.href,A;F.secure=B&&(B.toLowerCase().indexOf("https")===0);if(C){if((/windows|win32/i).test(C)){F.os="windows";}else{if((/macintosh/i).test(C)){F.os="macintosh";}}if((/KHTML/).test(C)){F.webkit=1;}A=C.match(/AppleWebKit\/([^\s]*)/);if(A&&A[1]){F.webkit=D(A[1]);if(/ Mobile\//.test(C)){F.mobile="Apple";}else{A=C.match(/NokiaN[^\/]*/);if(A){F.mobile=A[0];}}A=C.match(/AdobeAIR\/([^\s]*)/);if(A){F.air=A[0];}}if(!F.webkit){A=C.match(/Opera[\s\/]([^\s]*)/);if(A&&A[1]){F.opera=D(A[1]);A=C.match(/Opera Mini[^;]*/);if(A){F.mobile=A[0];}}else{A=C.match(/MSIE\s([^;]*)/);if(A&&A[1]){F.ie=D(A[1]);}else{A=C.match(/Gecko\/([^\s]*)/);if(A){F.gecko=1;A=C.match(/rv:([^\s\)]*)/);if(A&&A[1]){F.gecko=D(A[1]);}}}}}}return F;}();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;if(B){for(C=0;C<A.length;C++){if(A[C]==B){D=false;break;}}if(D){A.push(B);}}}})();YAHOO.lang=YAHOO.lang||{};(function(){var B=YAHOO.lang,A=Object.prototype,H="[object Array]",C="[object Function]",G="[object Object]",E=[],F=["toString","valueOf"],D={isArray:function(I){return A.toString.apply(I)===H;},isBoolean:function(I){return typeof I==="boolean";},isFunction:function(I){return(typeof I==="function")||A.toString.apply(I)===C;},isNull:function(I){return I===null;},isNumber:function(I){return typeof I==="number"&&isFinite(I);},isObject:function(I){return(I&&(typeof I==="object"||B.isFunction(I)))||false;},isString:function(I){return typeof I==="string";},isUndefined:function(I){return typeof I==="undefined";},_IEEnumFix:(YAHOO.env.ua.ie)?function(K,J){var I,M,L;for(I=0;I<F.length;I=I+1){M=F[I];L=J[M];if(B.isFunction(L)&&L!=A[M]){K[M]=L;}}}:function(){},extend:function(L,M,K){if(!M||!L){throw new Error("extend failed, please check that "+"all dependencies are included.");}var J=function(){},I;J.prototype=M.prototype;L.prototype=new J();L.prototype.constructor=L;L.superclass=M.prototype;if(M.prototype.constructor==A.constructor){M.prototype.constructor=M;}if(K){for(I in K){if(B.hasOwnProperty(K,I)){L.prototype[I]=K[I];}}B._IEEnumFix(L.prototype,K);}},augmentObject:function(M,L){if(!L||!M){throw new Error("Absorb failed, verify dependencies.");}var I=arguments,K,N,J=I[2];if(J&&J!==true){for(K=2;K<I.length;K=K+1){M[I[K]]=L[I[K]];}}else{for(N in L){if(J||!(N in M)){M[N]=L[N];}}B._IEEnumFix(M,L);}},augmentProto:function(L,K){if(!K||!L){throw new Error("Augment failed, verify dependencies.");}var I=[L.prototype,K.prototype],J;for(J=2;J<arguments.length;J=J+1){I.push(arguments[J]);}B.augmentObject.apply(this,I);},dump:function(I,N){var K,M,P=[],Q="{...}",J="f(){...}",O=", ",L=" => ";if(!B.isObject(I)){return I+"";}else{if(I instanceof Date||("nodeType" in I&&"tagName" in I)){return I;}else{if(B.isFunction(I)){return J;}}}N=(B.isNumber(N))?N:3;if(B.isArray(I)){P.push("[");for(K=0,M=I.length;K<M;K=K+1){if(B.isObject(I[K])){P.push((N>0)?B.dump(I[K],N-1):Q);}else{P.push(I[K]);}P.push(O);}if(P.length>1){P.pop();}P.push("]");}else{P.push("{");for(K in I){if(B.hasOwnProperty(I,K)){P.push(K+L);if(B.isObject(I[K])){P.push((N>0)?B.dump(I[K],N-1):Q);}else{P.push(I[K]);}P.push(O);}}if(P.length>1){P.pop();}P.push("}");}return P.join("");},substitute:function(Y,J,R){var N,M,L,U,V,X,T=[],K,O="dump",S=" ",I="{",W="}",Q,P;for(;;){N=Y.lastIndexOf(I);if(N<0){break;}M=Y.indexOf(W,N);if(N+1>=M){break;}K=Y.substring(N+1,M);U=K;X=null;L=U.indexOf(S);if(L>-1){X=U.substring(L+1);U=U.substring(0,L);}V=J[U];if(R){V=R(U,V,X);}if(B.isObject(V)){if(B.isArray(V)){V=B.dump(V,parseInt(X,10));}else{X=X||"";Q=X.indexOf(O);if(Q>-1){X=X.substring(4);}P=V.toString();if(P===G||Q>-1){V=B.dump(V,parseInt(X,10));}else{V=P;}}}else{if(!B.isString(V)&&!B.isNumber(V)){V="~-"+T.length+"-~";T[T.length]=K;}}Y=Y.substring(0,N)+V+Y.substring(M+1);}for(N=T.length-1;N>=0;N=N-1){Y=Y.replace(new RegExp("~-"+N+"-~"),"{"+T[N]+"}","g");}return Y;},trim:function(I){try{return I.replace(/^\s+|\s+$/g,"");}catch(J){return I;}},merge:function(){var L={},J=arguments,I=J.length,K;for(K=0;K<I;K=K+1){B.augmentObject(L,J[K],true);}return L;},later:function(P,J,Q,L,M){P=P||0;J=J||{};var K=Q,O=L,N,I;if(B.isString(Q)){K=J[Q];}if(!K){throw new TypeError("method undefined");}if(O&&!B.isArray(O)){O=[L];}N=function(){K.apply(J,O||E);};I=(M)?setInterval(N,P):setTimeout(N,P);return{interval:M,cancel:function(){if(this.interval){clearInterval(I);}else{clearTimeout(I);}}};},isValue:function(I){return(B.isObject(I)||B.isString(I)||B.isNumber(I)||B.isBoolean(I));}};B.hasOwnProperty=(A.hasOwnProperty)?function(I,J){return I&&I.hasOwnProperty(J);}:function(I,J){return !B.isUndefined(I[J])&&I.constructor.prototype[J]!==I[J];};D.augmentObject(B,D,true);YAHOO.util.Lang=B;B.augment=B.augmentProto;YAHOO.augment=B.augmentProto;YAHOO.extend=B.extend;})();YAHOO.register("yahoo",YAHOO,{version:"2.8.0r4",build:"2449"});
// End of File include/javascript/yui/build/yahoo/yahoo-min.js
                                
/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
(function(){YAHOO.env._id_counter=YAHOO.env._id_counter||0;var E=YAHOO.util,L=YAHOO.lang,m=YAHOO.env.ua,A=YAHOO.lang.trim,d={},h={},N=/^t(?:able|d|h)$/i,X=/color$/i,K=window.document,W=K.documentElement,e="ownerDocument",n="defaultView",v="documentElement",t="compatMode",b="offsetLeft",P="offsetTop",u="offsetParent",Z="parentNode",l="nodeType",C="tagName",O="scrollLeft",i="scrollTop",Q="getBoundingClientRect",w="getComputedStyle",a="currentStyle",M="CSS1Compat",c="BackCompat",g="class",F="className",J="",B=" ",s="(?:^|\\s)",k="(?= |$)",U="g",p="position",f="fixed",V="relative",j="left",o="top",r="medium",q="borderLeftWidth",R="borderTopWidth",D=m.opera,I=m.webkit,H=m.gecko,T=m.ie;E.Dom={CUSTOM_ATTRIBUTES:(!W.hasAttribute)?{"for":"htmlFor","class":F}:{"htmlFor":"for","className":g},DOT_ATTRIBUTES:{},get:function(z){var AB,x,AA,y,Y,G;if(z){if(z[l]||z.item){return z;}if(typeof z==="string"){AB=z;z=K.getElementById(z);G=(z)?z.attributes:null;if(z&&G&&G.id&&G.id.value===AB){return z;}else{if(z&&K.all){z=null;x=K.all[AB];for(y=0,Y=x.length;y<Y;++y){if(x[y].id===AB){return x[y];}}}}return z;}if(YAHOO.util.Element&&z instanceof YAHOO.util.Element){z=z.get("element");}if("length" in z){AA=[];for(y=0,Y=z.length;y<Y;++y){AA[AA.length]=E.Dom.get(z[y]);}return AA;}return z;}return null;},getComputedStyle:function(G,Y){if(window[w]){return G[e][n][w](G,null)[Y];}else{if(G[a]){return E.Dom.IE_ComputedStyle.get(G,Y);}}},getStyle:function(G,Y){return E.Dom.batch(G,E.Dom._getStyle,Y);},_getStyle:function(){if(window[w]){return function(G,y){y=(y==="float")?y="cssFloat":E.Dom._toCamel(y);var x=G.style[y],Y;if(!x){Y=G[e][n][w](G,null);if(Y){x=Y[y];}}return x;};}else{if(W[a]){return function(G,y){var x;switch(y){case"opacity":x=100;try{x=G.filters["DXImageTransform.Microsoft.Alpha"].opacity;}catch(z){try{x=G.filters("alpha").opacity;}catch(Y){}}return x/100;case"float":y="styleFloat";default:y=E.Dom._toCamel(y);x=G[a]?G[a][y]:null;return(G.style[y]||x);}};}}}(),setStyle:function(G,Y,x){E.Dom.batch(G,E.Dom._setStyle,{prop:Y,val:x});},_setStyle:function(){if(T){return function(Y,G){var x=E.Dom._toCamel(G.prop),y=G.val;if(Y){switch(x){case"opacity":if(L.isString(Y.style.filter)){Y.style.filter="alpha(opacity="+y*100+")";if(!Y[a]||!Y[a].hasLayout){Y.style.zoom=1;}}break;case"float":x="styleFloat";default:Y.style[x]=y;}}else{}};}else{return function(Y,G){var x=E.Dom._toCamel(G.prop),y=G.val;if(Y){if(x=="float"){x="cssFloat";}Y.style[x]=y;}else{}};}}(),getXY:function(G){return E.Dom.batch(G,E.Dom._getXY);},_canPosition:function(G){return(E.Dom._getStyle(G,"display")!=="none"&&E.Dom._inDoc(G));},_getXY:function(){if(K[v][Q]){return function(y){var z,Y,AA,AF,AE,AD,AC,G,x,AB=Math.floor,AG=false;if(E.Dom._canPosition(y)){AA=y[Q]();AF=y[e];z=E.Dom.getDocumentScrollLeft(AF);Y=E.Dom.getDocumentScrollTop(AF);AG=[AB(AA[j]),AB(AA[o])];if(T&&m.ie<8){AE=2;AD=2;AC=AF[t];if(m.ie===6){if(AC!==c){AE=0;AD=0;}}if((AC===c)){G=S(AF[v],q);x=S(AF[v],R);if(G!==r){AE=parseInt(G,10);}if(x!==r){AD=parseInt(x,10);}}AG[0]-=AE;AG[1]-=AD;}if((Y||z)){AG[0]+=z;AG[1]+=Y;}AG[0]=AB(AG[0]);AG[1]=AB(AG[1]);}else{}return AG;};}else{return function(y){var x,Y,AA,AB,AC,z=false,G=y;if(E.Dom._canPosition(y)){z=[y[b],y[P]];x=E.Dom.getDocumentScrollLeft(y[e]);Y=E.Dom.getDocumentScrollTop(y[e]);AC=((H||m.webkit>519)?true:false);while((G=G[u])){z[0]+=G[b];z[1]+=G[P];if(AC){z=E.Dom._calcBorders(G,z);}}if(E.Dom._getStyle(y,p)!==f){G=y;while((G=G[Z])&&G[C]){AA=G[i];AB=G[O];if(H&&(E.Dom._getStyle(G,"overflow")!=="visible")){z=E.Dom._calcBorders(G,z);}if(AA||AB){z[0]-=AB;z[1]-=AA;}}z[0]+=x;z[1]+=Y;}else{if(D){z[0]-=x;z[1]-=Y;}else{if(I||H){z[0]+=x;z[1]+=Y;}}}z[0]=Math.floor(z[0]);z[1]=Math.floor(z[1]);}else{}return z;};}}(),getX:function(G){var Y=function(x){return E.Dom.getXY(x)[0];};return E.Dom.batch(G,Y,E.Dom,true);},getY:function(G){var Y=function(x){return E.Dom.getXY(x)[1];};return E.Dom.batch(G,Y,E.Dom,true);},setXY:function(G,x,Y){E.Dom.batch(G,E.Dom._setXY,{pos:x,noRetry:Y});},_setXY:function(G,z){var AA=E.Dom._getStyle(G,p),y=E.Dom.setStyle,AD=z.pos,Y=z.noRetry,AB=[parseInt(E.Dom.getComputedStyle(G,j),10),parseInt(E.Dom.getComputedStyle(G,o),10)],AC,x;if(AA=="static"){AA=V;y(G,p,AA);}AC=E.Dom._getXY(G);if(!AD||AC===false){return false;}if(isNaN(AB[0])){AB[0]=(AA==V)?0:G[b];}if(isNaN(AB[1])){AB[1]=(AA==V)?0:G[P];}if(AD[0]!==null){y(G,j,AD[0]-AC[0]+AB[0]+"px");}if(AD[1]!==null){y(G,o,AD[1]-AC[1]+AB[1]+"px");}if(!Y){x=E.Dom._getXY(G);if((AD[0]!==null&&x[0]!=AD[0])||(AD[1]!==null&&x[1]!=AD[1])){E.Dom._setXY(G,{pos:AD,noRetry:true});}}},setX:function(Y,G){E.Dom.setXY(Y,[G,null]);},setY:function(G,Y){E.Dom.setXY(G,[null,Y]);},getRegion:function(G){var Y=function(x){var y=false;if(E.Dom._canPosition(x)){y=E.Region.getRegion(x);}else{}return y;};return E.Dom.batch(G,Y,E.Dom,true);},getClientWidth:function(){return E.Dom.getViewportWidth();},getClientHeight:function(){return E.Dom.getViewportHeight();},getElementsByClassName:function(AB,AF,AC,AE,x,AD){AF=AF||"*";AC=(AC)?E.Dom.get(AC):null||K;if(!AC){return[];}var Y=[],G=AC.getElementsByTagName(AF),z=E.Dom.hasClass;for(var y=0,AA=G.length;y<AA;++y){if(z(G[y],AB)){Y[Y.length]=G[y];}}if(AE){E.Dom.batch(Y,AE,x,AD);}return Y;},hasClass:function(Y,G){return E.Dom.batch(Y,E.Dom._hasClass,G);},_hasClass:function(x,Y){var G=false,y;if(x&&Y){y=E.Dom._getAttribute(x,F)||J;if(Y.exec){G=Y.test(y);}else{G=Y&&(B+y+B).indexOf(B+Y+B)>-1;}}else{}return G;},addClass:function(Y,G){return E.Dom.batch(Y,E.Dom._addClass,G);},_addClass:function(x,Y){var G=false,y;if(x&&Y){y=E.Dom._getAttribute(x,F)||J;if(!E.Dom._hasClass(x,Y)){E.Dom.setAttribute(x,F,A(y+B+Y));G=true;}}else{}return G;},removeClass:function(Y,G){return E.Dom.batch(Y,E.Dom._removeClass,G);},_removeClass:function(y,x){var Y=false,AA,z,G;if(y&&x){AA=E.Dom._getAttribute(y,F)||J;E.Dom.setAttribute(y,F,AA.replace(E.Dom._getClassRegex(x),J));z=E.Dom._getAttribute(y,F);if(AA!==z){E.Dom.setAttribute(y,F,A(z));Y=true;if(E.Dom._getAttribute(y,F)===""){G=(y.hasAttribute&&y.hasAttribute(g))?g:F;
y.removeAttribute(G);}}}else{}return Y;},replaceClass:function(x,Y,G){return E.Dom.batch(x,E.Dom._replaceClass,{from:Y,to:G});},_replaceClass:function(y,x){var Y,AB,AA,G=false,z;if(y&&x){AB=x.from;AA=x.to;if(!AA){G=false;}else{if(!AB){G=E.Dom._addClass(y,x.to);}else{if(AB!==AA){z=E.Dom._getAttribute(y,F)||J;Y=(B+z.replace(E.Dom._getClassRegex(AB),B+AA)).split(E.Dom._getClassRegex(AA));Y.splice(1,0,B+AA);E.Dom.setAttribute(y,F,A(Y.join(J)));G=true;}}}}else{}return G;},generateId:function(G,x){x=x||"yui-gen";var Y=function(y){if(y&&y.id){return y.id;}var z=x+YAHOO.env._id_counter++;if(y){if(y[e]&&y[e].getElementById(z)){return E.Dom.generateId(y,z+x);}y.id=z;}return z;};return E.Dom.batch(G,Y,E.Dom,true)||Y.apply(E.Dom,arguments);},isAncestor:function(Y,x){Y=E.Dom.get(Y);x=E.Dom.get(x);var G=false;if((Y&&x)&&(Y[l]&&x[l])){if(Y.contains&&Y!==x){G=Y.contains(x);}else{if(Y.compareDocumentPosition){G=!!(Y.compareDocumentPosition(x)&16);}}}else{}return G;},inDocument:function(G,Y){return E.Dom._inDoc(E.Dom.get(G),Y);},_inDoc:function(Y,x){var G=false;if(Y&&Y[C]){x=x||Y[e];G=E.Dom.isAncestor(x[v],Y);}else{}return G;},getElementsBy:function(Y,AF,AB,AD,y,AC,AE){AF=AF||"*";AB=(AB)?E.Dom.get(AB):null||K;if(!AB){return[];}var x=[],G=AB.getElementsByTagName(AF);for(var z=0,AA=G.length;z<AA;++z){if(Y(G[z])){if(AE){x=G[z];break;}else{x[x.length]=G[z];}}}if(AD){E.Dom.batch(x,AD,y,AC);}return x;},getElementBy:function(x,G,Y){return E.Dom.getElementsBy(x,G,Y,null,null,null,true);},batch:function(x,AB,AA,z){var y=[],Y=(z)?AA:window;x=(x&&(x[C]||x.item))?x:E.Dom.get(x);if(x&&AB){if(x[C]||x.length===undefined){return AB.call(Y,x,AA);}for(var G=0;G<x.length;++G){y[y.length]=AB.call(Y,x[G],AA);}}else{return false;}return y;},getDocumentHeight:function(){var Y=(K[t]!=M||I)?K.body.scrollHeight:W.scrollHeight,G=Math.max(Y,E.Dom.getViewportHeight());return G;},getDocumentWidth:function(){var Y=(K[t]!=M||I)?K.body.scrollWidth:W.scrollWidth,G=Math.max(Y,E.Dom.getViewportWidth());return G;},getViewportHeight:function(){var G=self.innerHeight,Y=K[t];if((Y||T)&&!D){G=(Y==M)?W.clientHeight:K.body.clientHeight;}return G;},getViewportWidth:function(){var G=self.innerWidth,Y=K[t];if(Y||T){G=(Y==M)?W.clientWidth:K.body.clientWidth;}return G;},getAncestorBy:function(G,Y){while((G=G[Z])){if(E.Dom._testElement(G,Y)){return G;}}return null;},getAncestorByClassName:function(Y,G){Y=E.Dom.get(Y);if(!Y){return null;}var x=function(y){return E.Dom.hasClass(y,G);};return E.Dom.getAncestorBy(Y,x);},getAncestorByTagName:function(Y,G){Y=E.Dom.get(Y);if(!Y){return null;}var x=function(y){return y[C]&&y[C].toUpperCase()==G.toUpperCase();};return E.Dom.getAncestorBy(Y,x);},getPreviousSiblingBy:function(G,Y){while(G){G=G.previousSibling;if(E.Dom._testElement(G,Y)){return G;}}return null;},getPreviousSibling:function(G){G=E.Dom.get(G);if(!G){return null;}return E.Dom.getPreviousSiblingBy(G);},getNextSiblingBy:function(G,Y){while(G){G=G.nextSibling;if(E.Dom._testElement(G,Y)){return G;}}return null;},getNextSibling:function(G){G=E.Dom.get(G);if(!G){return null;}return E.Dom.getNextSiblingBy(G);},getFirstChildBy:function(G,x){var Y=(E.Dom._testElement(G.firstChild,x))?G.firstChild:null;return Y||E.Dom.getNextSiblingBy(G.firstChild,x);},getFirstChild:function(G,Y){G=E.Dom.get(G);if(!G){return null;}return E.Dom.getFirstChildBy(G);},getLastChildBy:function(G,x){if(!G){return null;}var Y=(E.Dom._testElement(G.lastChild,x))?G.lastChild:null;return Y||E.Dom.getPreviousSiblingBy(G.lastChild,x);},getLastChild:function(G){G=E.Dom.get(G);return E.Dom.getLastChildBy(G);},getChildrenBy:function(Y,y){var x=E.Dom.getFirstChildBy(Y,y),G=x?[x]:[];E.Dom.getNextSiblingBy(x,function(z){if(!y||y(z)){G[G.length]=z;}return false;});return G;},getChildren:function(G){G=E.Dom.get(G);if(!G){}return E.Dom.getChildrenBy(G);},getDocumentScrollLeft:function(G){G=G||K;return Math.max(G[v].scrollLeft,G.body.scrollLeft);},getDocumentScrollTop:function(G){G=G||K;return Math.max(G[v].scrollTop,G.body.scrollTop);},insertBefore:function(Y,G){Y=E.Dom.get(Y);G=E.Dom.get(G);if(!Y||!G||!G[Z]){return null;}return G[Z].insertBefore(Y,G);},insertAfter:function(Y,G){Y=E.Dom.get(Y);G=E.Dom.get(G);if(!Y||!G||!G[Z]){return null;}if(G.nextSibling){return G[Z].insertBefore(Y,G.nextSibling);}else{return G[Z].appendChild(Y);}},getClientRegion:function(){var x=E.Dom.getDocumentScrollTop(),Y=E.Dom.getDocumentScrollLeft(),y=E.Dom.getViewportWidth()+Y,G=E.Dom.getViewportHeight()+x;return new E.Region(x,y,G,Y);},setAttribute:function(Y,G,x){E.Dom.batch(Y,E.Dom._setAttribute,{attr:G,val:x});},_setAttribute:function(x,Y){var G=E.Dom._toCamel(Y.attr),y=Y.val;if(x&&x.setAttribute){if(E.Dom.DOT_ATTRIBUTES[G]){x[G]=y;}else{G=E.Dom.CUSTOM_ATTRIBUTES[G]||G;x.setAttribute(G,y);}}else{}},getAttribute:function(Y,G){return E.Dom.batch(Y,E.Dom._getAttribute,G);},_getAttribute:function(Y,G){var x;G=E.Dom.CUSTOM_ATTRIBUTES[G]||G;if(Y&&Y.getAttribute){x=Y.getAttribute(G,2);}else{}return x;},_toCamel:function(Y){var x=d;function G(y,z){return z.toUpperCase();}return x[Y]||(x[Y]=Y.indexOf("-")===-1?Y:Y.replace(/-([a-z])/gi,G));},_getClassRegex:function(Y){var G;if(Y!==undefined){if(Y.exec){G=Y;}else{G=h[Y];if(!G){Y=Y.replace(E.Dom._patterns.CLASS_RE_TOKENS,"\\$1");G=h[Y]=new RegExp(s+Y+k,U);}}}return G;},_patterns:{ROOT_TAG:/^body|html$/i,CLASS_RE_TOKENS:/([\.\(\)\^\$\*\+\?\|\[\]\{\}\\])/g},_testElement:function(G,Y){return G&&G[l]==1&&(!Y||Y(G));},_calcBorders:function(x,y){var Y=parseInt(E.Dom[w](x,R),10)||0,G=parseInt(E.Dom[w](x,q),10)||0;if(H){if(N.test(x[C])){Y=0;G=0;}}y[0]+=G;y[1]+=Y;return y;}};var S=E.Dom[w];if(m.opera){E.Dom[w]=function(Y,G){var x=S(Y,G);if(X.test(G)){x=E.Dom.Color.toRGB(x);}return x;};}if(m.webkit){E.Dom[w]=function(Y,G){var x=S(Y,G);if(x==="rgba(0, 0, 0, 0)"){x="transparent";}return x;};}if(m.ie&&m.ie>=8&&K.documentElement.hasAttribute){E.Dom.DOT_ATTRIBUTES.type=true;}})();YAHOO.util.Region=function(C,D,A,B){this.top=C;this.y=C;this[1]=C;this.right=D;this.bottom=A;this.left=B;this.x=B;this[0]=B;
this.width=this.right-this.left;this.height=this.bottom-this.top;};YAHOO.util.Region.prototype.contains=function(A){return(A.left>=this.left&&A.right<=this.right&&A.top>=this.top&&A.bottom<=this.bottom);};YAHOO.util.Region.prototype.getArea=function(){return((this.bottom-this.top)*(this.right-this.left));};YAHOO.util.Region.prototype.intersect=function(E){var C=Math.max(this.top,E.top),D=Math.min(this.right,E.right),A=Math.min(this.bottom,E.bottom),B=Math.max(this.left,E.left);if(A>=C&&D>=B){return new YAHOO.util.Region(C,D,A,B);}else{return null;}};YAHOO.util.Region.prototype.union=function(E){var C=Math.min(this.top,E.top),D=Math.max(this.right,E.right),A=Math.max(this.bottom,E.bottom),B=Math.min(this.left,E.left);return new YAHOO.util.Region(C,D,A,B);};YAHOO.util.Region.prototype.toString=function(){return("Region {"+"top: "+this.top+", right: "+this.right+", bottom: "+this.bottom+", left: "+this.left+", height: "+this.height+", width: "+this.width+"}");};YAHOO.util.Region.getRegion=function(D){var F=YAHOO.util.Dom.getXY(D),C=F[1],E=F[0]+D.offsetWidth,A=F[1]+D.offsetHeight,B=F[0];return new YAHOO.util.Region(C,E,A,B);};YAHOO.util.Point=function(A,B){if(YAHOO.lang.isArray(A)){B=A[1];A=A[0];}YAHOO.util.Point.superclass.constructor.call(this,B,A,B,A);};YAHOO.extend(YAHOO.util.Point,YAHOO.util.Region);(function(){var B=YAHOO.util,A="clientTop",F="clientLeft",J="parentNode",K="right",W="hasLayout",I="px",U="opacity",L="auto",D="borderLeftWidth",G="borderTopWidth",P="borderRightWidth",V="borderBottomWidth",S="visible",Q="transparent",N="height",E="width",H="style",T="currentStyle",R=/^width|height$/,O=/^(\d[.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz|%){1}?/i,M={get:function(X,Z){var Y="",a=X[T][Z];if(Z===U){Y=B.Dom.getStyle(X,U);}else{if(!a||(a.indexOf&&a.indexOf(I)>-1)){Y=a;}else{if(B.Dom.IE_COMPUTED[Z]){Y=B.Dom.IE_COMPUTED[Z](X,Z);}else{if(O.test(a)){Y=B.Dom.IE.ComputedStyle.getPixel(X,Z);}else{Y=a;}}}}return Y;},getOffset:function(Z,e){var b=Z[T][e],X=e.charAt(0).toUpperCase()+e.substr(1),c="offset"+X,Y="pixel"+X,a="",d;if(b==L){d=Z[c];if(d===undefined){a=0;}a=d;if(R.test(e)){Z[H][e]=d;if(Z[c]>d){a=d-(Z[c]-d);}Z[H][e]=L;}}else{if(!Z[H][Y]&&!Z[H][e]){Z[H][e]=b;}a=Z[H][Y];}return a+I;},getBorderWidth:function(X,Z){var Y=null;if(!X[T][W]){X[H].zoom=1;}switch(Z){case G:Y=X[A];break;case V:Y=X.offsetHeight-X.clientHeight-X[A];break;case D:Y=X[F];break;case P:Y=X.offsetWidth-X.clientWidth-X[F];break;}return Y+I;},getPixel:function(Y,X){var a=null,b=Y[T][K],Z=Y[T][X];Y[H][K]=Z;a=Y[H].pixelRight;Y[H][K]=b;return a+I;},getMargin:function(Y,X){var Z;if(Y[T][X]==L){Z=0+I;}else{Z=B.Dom.IE.ComputedStyle.getPixel(Y,X);}return Z;},getVisibility:function(Y,X){var Z;while((Z=Y[T])&&Z[X]=="inherit"){Y=Y[J];}return(Z)?Z[X]:S;},getColor:function(Y,X){return B.Dom.Color.toRGB(Y[T][X])||Q;},getBorderColor:function(Y,X){var Z=Y[T],a=Z[X]||Z.color;return B.Dom.Color.toRGB(B.Dom.Color.toHex(a));}},C={};C.top=C.right=C.bottom=C.left=C[E]=C[N]=M.getOffset;C.color=M.getColor;C[G]=C[P]=C[V]=C[D]=M.getBorderWidth;C.marginTop=C.marginRight=C.marginBottom=C.marginLeft=M.getMargin;C.visibility=M.getVisibility;C.borderColor=C.borderTopColor=C.borderRightColor=C.borderBottomColor=C.borderLeftColor=M.getBorderColor;B.Dom.IE_COMPUTED=C;B.Dom.IE_ComputedStyle=M;})();(function(){var C="toString",A=parseInt,B=RegExp,D=YAHOO.util;D.Dom.Color={KEYWORDS:{black:"000",silver:"c0c0c0",gray:"808080",white:"fff",maroon:"800000",red:"f00",purple:"800080",fuchsia:"f0f",green:"008000",lime:"0f0",olive:"808000",yellow:"ff0",navy:"000080",blue:"00f",teal:"008080",aqua:"0ff"},re_RGB:/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,re_hex:/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,re_hex3:/([0-9A-F])/gi,toRGB:function(E){if(!D.Dom.Color.re_RGB.test(E)){E=D.Dom.Color.toHex(E);}if(D.Dom.Color.re_hex.exec(E)){E="rgb("+[A(B.$1,16),A(B.$2,16),A(B.$3,16)].join(", ")+")";}return E;},toHex:function(H){H=D.Dom.Color.KEYWORDS[H]||H;if(D.Dom.Color.re_RGB.exec(H)){var G=(B.$1.length===1)?"0"+B.$1:Number(B.$1),F=(B.$2.length===1)?"0"+B.$2:Number(B.$2),E=(B.$3.length===1)?"0"+B.$3:Number(B.$3);H=[G[C](16),F[C](16),E[C](16)].join("");}if(H.length<6){H=H.replace(D.Dom.Color.re_hex3,"$1$1");}if(H!=="transparent"&&H.indexOf("#")<0){H="#"+H;}return H.toLowerCase();}};}());YAHOO.register("dom",YAHOO.util.Dom,{version:"2.8.0r4",build:"2449"});// End of File include/javascript/yui/build/dom/dom-min.js
                                
/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
YAHOO.util.CustomEvent=function(D,C,B,A,E){this.type=D;this.scope=C||window;this.silent=B;this.fireOnce=E;this.fired=false;this.firedWith=null;this.signature=A||YAHOO.util.CustomEvent.LIST;this.subscribers=[];if(!this.silent){}var F="_YUICEOnSubscribe";if(D!==F){this.subscribeEvent=new YAHOO.util.CustomEvent(F,this,true);}this.lastError=null;};YAHOO.util.CustomEvent.LIST=0;YAHOO.util.CustomEvent.FLAT=1;YAHOO.util.CustomEvent.prototype={subscribe:function(B,C,D){if(!B){throw new Error("Invalid callback for subscriber to '"+this.type+"'");}if(this.subscribeEvent){this.subscribeEvent.fire(B,C,D);}var A=new YAHOO.util.Subscriber(B,C,D);if(this.fireOnce&&this.fired){this.notify(A,this.firedWith);}else{this.subscribers.push(A);}},unsubscribe:function(D,F){if(!D){return this.unsubscribeAll();}var E=false;for(var B=0,A=this.subscribers.length;B<A;++B){var C=this.subscribers[B];if(C&&C.contains(D,F)){this._delete(B);E=true;}}return E;},fire:function(){this.lastError=null;var H=[],A=this.subscribers.length;var D=[].slice.call(arguments,0),C=true,F,B=false;if(this.fireOnce){if(this.fired){return true;}else{this.firedWith=D;}}this.fired=true;if(!A&&this.silent){return true;}if(!this.silent){}var E=this.subscribers.slice();for(F=0;F<A;++F){var G=E[F];if(!G){B=true;}else{C=this.notify(G,D);if(false===C){if(!this.silent){}break;}}}return(C!==false);},notify:function(F,C){var B,H=null,E=F.getScope(this.scope),A=YAHOO.util.Event.throwErrors;if(!this.silent){}if(this.signature==YAHOO.util.CustomEvent.FLAT){if(C.length>0){H=C[0];}try{B=F.fn.call(E,H,F.obj);}catch(G){this.lastError=G;if(A){throw G;}}}else{try{B=F.fn.call(E,this.type,C,F.obj);}catch(D){this.lastError=D;if(A){throw D;}}}return B;},unsubscribeAll:function(){var A=this.subscribers.length,B;for(B=A-1;B>-1;B--){this._delete(B);}this.subscribers=[];return A;},_delete:function(A){var B=this.subscribers[A];if(B){delete B.fn;delete B.obj;}this.subscribers.splice(A,1);},toString:function(){return"CustomEvent: "+"'"+this.type+"', "+"context: "+this.scope;}};YAHOO.util.Subscriber=function(A,B,C){this.fn=A;this.obj=YAHOO.lang.isUndefined(B)?null:B;this.overrideContext=C;};YAHOO.util.Subscriber.prototype.getScope=function(A){if(this.overrideContext){if(this.overrideContext===true){return this.obj;}else{return this.overrideContext;}}return A;};YAHOO.util.Subscriber.prototype.contains=function(A,B){if(B){return(this.fn==A&&this.obj==B);}else{return(this.fn==A);}};YAHOO.util.Subscriber.prototype.toString=function(){return"Subscriber { obj: "+this.obj+", overrideContext: "+(this.overrideContext||"no")+" }";};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var G=false,H=[],J=[],A=0,E=[],B=0,C={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9},D=YAHOO.env.ua.ie,F="focusin",I="focusout";return{POLL_RETRYS:500,POLL_INTERVAL:40,EL:0,TYPE:1,FN:2,WFN:3,UNLOAD_OBJ:3,ADJ_SCOPE:4,OBJ:5,OVERRIDE:6,CAPTURE:7,lastError:null,isSafari:YAHOO.env.ua.webkit,webkit:YAHOO.env.ua.webkit,isIE:D,_interval:null,_dri:null,_specialTypes:{focusin:(D?"focusin":"focus"),focusout:(D?"focusout":"blur")},DOMReady:false,throwErrors:false,startInterval:function(){if(!this._interval){this._interval=YAHOO.lang.later(this.POLL_INTERVAL,this,this._tryPreloadAttach,null,true);}},onAvailable:function(Q,M,O,P,N){var K=(YAHOO.lang.isString(Q))?[Q]:Q;for(var L=0;L<K.length;L=L+1){E.push({id:K[L],fn:M,obj:O,overrideContext:P,checkReady:N});}A=this.POLL_RETRYS;this.startInterval();},onContentReady:function(N,K,L,M){this.onAvailable(N,K,L,M,true);},onDOMReady:function(){this.DOMReadyEvent.subscribe.apply(this.DOMReadyEvent,arguments);},_addListener:function(M,K,V,P,T,Y){if(!V||!V.call){return false;}if(this._isValidCollection(M)){var W=true;for(var Q=0,S=M.length;Q<S;++Q){W=this.on(M[Q],K,V,P,T)&&W;}return W;}else{if(YAHOO.lang.isString(M)){var O=this.getEl(M);if(O){M=O;}else{this.onAvailable(M,function(){YAHOO.util.Event._addListener(M,K,V,P,T,Y);});return true;}}}if(!M){return false;}if("unload"==K&&P!==this){J[J.length]=[M,K,V,P,T];return true;}var L=M;if(T){if(T===true){L=P;}else{L=T;}}var N=function(Z){return V.call(L,YAHOO.util.Event.getEvent(Z,M),P);};var X=[M,K,V,N,L,P,T,Y];var R=H.length;H[R]=X;try{this._simpleAdd(M,K,N,Y);}catch(U){this.lastError=U;this.removeListener(M,K,V);return false;}return true;},_getType:function(K){return this._specialTypes[K]||K;},addListener:function(M,P,L,N,O){var K=((P==F||P==I)&&!YAHOO.env.ua.ie)?true:false;return this._addListener(M,this._getType(P),L,N,O,K);},addFocusListener:function(L,K,M,N){return this.on(L,F,K,M,N);},removeFocusListener:function(L,K){return this.removeListener(L,F,K);},addBlurListener:function(L,K,M,N){return this.on(L,I,K,M,N);},removeBlurListener:function(L,K){return this.removeListener(L,I,K);},removeListener:function(L,K,R){var M,P,U;K=this._getType(K);if(typeof L=="string"){L=this.getEl(L);}else{if(this._isValidCollection(L)){var S=true;for(M=L.length-1;M>-1;M--){S=(this.removeListener(L[M],K,R)&&S);}return S;}}if(!R||!R.call){return this.purgeElement(L,false,K);}if("unload"==K){for(M=J.length-1;M>-1;M--){U=J[M];if(U&&U[0]==L&&U[1]==K&&U[2]==R){J.splice(M,1);return true;}}return false;}var N=null;var O=arguments[3];if("undefined"===typeof O){O=this._getCacheIndex(H,L,K,R);}if(O>=0){N=H[O];}if(!L||!N){return false;}var T=N[this.CAPTURE]===true?true:false;try{this._simpleRemove(L,K,N[this.WFN],T);}catch(Q){this.lastError=Q;return false;}delete H[O][this.WFN];delete H[O][this.FN];H.splice(O,1);return true;},getTarget:function(M,L){var K=M.target||M.srcElement;return this.resolveTextNode(K);},resolveTextNode:function(L){try{if(L&&3==L.nodeType){return L.parentNode;}}catch(K){}return L;},getPageX:function(L){var K=L.pageX;if(!K&&0!==K){K=L.clientX||0;if(this.isIE){K+=this._getScrollLeft();}}return K;},getPageY:function(K){var L=K.pageY;if(!L&&0!==L){L=K.clientY||0;if(this.isIE){L+=this._getScrollTop();}}return L;},getXY:function(K){return[this.getPageX(K),this.getPageY(K)];},getRelatedTarget:function(L){var K=L.relatedTarget;if(!K){if(L.type=="mouseout"){K=L.toElement;
}else{if(L.type=="mouseover"){K=L.fromElement;}}}return this.resolveTextNode(K);},getTime:function(M){if(!M.time){var L=new Date().getTime();try{M.time=L;}catch(K){this.lastError=K;return L;}}return M.time;},stopEvent:function(K){this.stopPropagation(K);this.preventDefault(K);},stopPropagation:function(K){if(K.stopPropagation){K.stopPropagation();}else{K.cancelBubble=true;}},preventDefault:function(K){if(K.preventDefault){K.preventDefault();}else{K.returnValue=false;}},getEvent:function(M,K){var L=M||window.event;if(!L){var N=this.getEvent.caller;while(N){L=N.arguments[0];if(L&&Event==L.constructor){break;}N=N.caller;}}return L;},getCharCode:function(L){var K=L.keyCode||L.charCode||0;if(YAHOO.env.ua.webkit&&(K in C)){K=C[K];}return K;},_getCacheIndex:function(M,P,Q,O){for(var N=0,L=M.length;N<L;N=N+1){var K=M[N];if(K&&K[this.FN]==O&&K[this.EL]==P&&K[this.TYPE]==Q){return N;}}return -1;},generateId:function(K){var L=K.id;if(!L){L="yuievtautoid-"+B;++B;K.id=L;}return L;},_isValidCollection:function(L){try{return(L&&typeof L!=="string"&&L.length&&!L.tagName&&!L.alert&&typeof L[0]!=="undefined");}catch(K){return false;}},elCache:{},getEl:function(K){return(typeof K==="string")?document.getElementById(K):K;},clearCache:function(){},DOMReadyEvent:new YAHOO.util.CustomEvent("DOMReady",YAHOO,0,0,1),_load:function(L){if(!G){G=true;var K=YAHOO.util.Event;K._ready();K._tryPreloadAttach();}},_ready:function(L){var K=YAHOO.util.Event;if(!K.DOMReady){K.DOMReady=true;K.DOMReadyEvent.fire();K._simpleRemove(document,"DOMContentLoaded",K._ready);}},_tryPreloadAttach:function(){if(E.length===0){A=0;if(this._interval){this._interval.cancel();this._interval=null;}return;}if(this.locked){return;}if(this.isIE){if(!this.DOMReady){this.startInterval();return;}}this.locked=true;var Q=!G;if(!Q){Q=(A>0&&E.length>0);}var P=[];var R=function(T,U){var S=T;if(U.overrideContext){if(U.overrideContext===true){S=U.obj;}else{S=U.overrideContext;}}U.fn.call(S,U.obj);};var L,K,O,N,M=[];for(L=0,K=E.length;L<K;L=L+1){O=E[L];if(O){N=this.getEl(O.id);if(N){if(O.checkReady){if(G||N.nextSibling||!Q){M.push(O);E[L]=null;}}else{R(N,O);E[L]=null;}}else{P.push(O);}}}for(L=0,K=M.length;L<K;L=L+1){O=M[L];R(this.getEl(O.id),O);}A--;if(Q){for(L=E.length-1;L>-1;L--){O=E[L];if(!O||!O.id){E.splice(L,1);}}this.startInterval();}else{if(this._interval){this._interval.cancel();this._interval=null;}}this.locked=false;},purgeElement:function(O,P,R){var M=(YAHOO.lang.isString(O))?this.getEl(O):O;var Q=this.getListeners(M,R),N,K;if(Q){for(N=Q.length-1;N>-1;N--){var L=Q[N];this.removeListener(M,L.type,L.fn);}}if(P&&M&&M.childNodes){for(N=0,K=M.childNodes.length;N<K;++N){this.purgeElement(M.childNodes[N],P,R);}}},getListeners:function(M,K){var P=[],L;if(!K){L=[H,J];}else{if(K==="unload"){L=[J];}else{K=this._getType(K);L=[H];}}var R=(YAHOO.lang.isString(M))?this.getEl(M):M;for(var O=0;O<L.length;O=O+1){var T=L[O];if(T){for(var Q=0,S=T.length;Q<S;++Q){var N=T[Q];if(N&&N[this.EL]===R&&(!K||K===N[this.TYPE])){P.push({type:N[this.TYPE],fn:N[this.FN],obj:N[this.OBJ],adjust:N[this.OVERRIDE],scope:N[this.ADJ_SCOPE],index:Q});}}}}return(P.length)?P:null;},_unload:function(R){var L=YAHOO.util.Event,O,N,M,Q,P,S=J.slice(),K;for(O=0,Q=J.length;O<Q;++O){M=S[O];if(M){K=window;if(M[L.ADJ_SCOPE]){if(M[L.ADJ_SCOPE]===true){K=M[L.UNLOAD_OBJ];}else{K=M[L.ADJ_SCOPE];}}M[L.FN].call(K,L.getEvent(R,M[L.EL]),M[L.UNLOAD_OBJ]);S[O]=null;}}M=null;K=null;J=null;if(H){for(N=H.length-1;N>-1;N--){M=H[N];if(M){L.removeListener(M[L.EL],M[L.TYPE],M[L.FN],N);}}M=null;}L._simpleRemove(window,"unload",L._unload);},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var K=document.documentElement,L=document.body;if(K&&(K.scrollTop||K.scrollLeft)){return[K.scrollTop,K.scrollLeft];}else{if(L){return[L.scrollTop,L.scrollLeft];}else{return[0,0];}}},regCE:function(){},_simpleAdd:function(){if(window.addEventListener){return function(M,N,L,K){M.addEventListener(N,L,(K));};}else{if(window.attachEvent){return function(M,N,L,K){M.attachEvent("on"+N,L);};}else{return function(){};}}}(),_simpleRemove:function(){if(window.removeEventListener){return function(M,N,L,K){M.removeEventListener(N,L,(K));};}else{if(window.detachEvent){return function(L,M,K){L.detachEvent("on"+M,K);};}else{return function(){};}}}()};}();(function(){var EU=YAHOO.util.Event;EU.on=EU.addListener;EU.onFocus=EU.addFocusListener;EU.onBlur=EU.addBlurListener;
/* DOMReady: based on work by: Dean Edwards/John Resig/Matthias Miller/Diego Perini */
if(EU.isIE){if(self!==self.top){document.onreadystatechange=function(){if(document.readyState=="complete"){document.onreadystatechange=null;EU._ready();}};}else{YAHOO.util.Event.onDOMReady(YAHOO.util.Event._tryPreloadAttach,YAHOO.util.Event,true);var n=document.createElement("p");EU._dri=setInterval(function(){try{n.doScroll("left");clearInterval(EU._dri);EU._dri=null;EU._ready();n=null;}catch(ex){}},EU.POLL_INTERVAL);}}else{if(EU.webkit&&EU.webkit<525){EU._dri=setInterval(function(){var rs=document.readyState;if("loaded"==rs||"complete"==rs){clearInterval(EU._dri);EU._dri=null;EU._ready();}},EU.POLL_INTERVAL);}else{EU._simpleAdd(document,"DOMContentLoaded",EU._ready);}}EU._simpleAdd(window,"load",EU._load);EU._simpleAdd(window,"unload",EU._unload);EU._tryPreloadAttach();})();}YAHOO.util.EventProvider=function(){};YAHOO.util.EventProvider.prototype={__yui_events:null,__yui_subscribers:null,subscribe:function(A,C,F,E){this.__yui_events=this.__yui_events||{};var D=this.__yui_events[A];if(D){D.subscribe(C,F,E);}else{this.__yui_subscribers=this.__yui_subscribers||{};var B=this.__yui_subscribers;if(!B[A]){B[A]=[];}B[A].push({fn:C,obj:F,overrideContext:E});}},unsubscribe:function(C,E,G){this.__yui_events=this.__yui_events||{};var A=this.__yui_events;if(C){var F=A[C];if(F){return F.unsubscribe(E,G);}}else{var B=true;for(var D in A){if(YAHOO.lang.hasOwnProperty(A,D)){B=B&&A[D].unsubscribe(E,G);}}return B;}return false;},unsubscribeAll:function(A){return this.unsubscribe(A);
},createEvent:function(B,G){this.__yui_events=this.__yui_events||{};var E=G||{},D=this.__yui_events,F;if(D[B]){}else{F=new YAHOO.util.CustomEvent(B,E.scope||this,E.silent,YAHOO.util.CustomEvent.FLAT,E.fireOnce);D[B]=F;if(E.onSubscribeCallback){F.subscribeEvent.subscribe(E.onSubscribeCallback);}this.__yui_subscribers=this.__yui_subscribers||{};var A=this.__yui_subscribers[B];if(A){for(var C=0;C<A.length;++C){F.subscribe(A[C].fn,A[C].obj,A[C].overrideContext);}}}return D[B];},fireEvent:function(B){this.__yui_events=this.__yui_events||{};var D=this.__yui_events[B];if(!D){return null;}var A=[];for(var C=1;C<arguments.length;++C){A.push(arguments[C]);}return D.fire.apply(D,A);},hasEvent:function(A){if(this.__yui_events){if(this.__yui_events[A]){return true;}}return false;}};(function(){var A=YAHOO.util.Event,C=YAHOO.lang;YAHOO.util.KeyListener=function(D,I,E,F){if(!D){}else{if(!I){}else{if(!E){}}}if(!F){F=YAHOO.util.KeyListener.KEYDOWN;}var G=new YAHOO.util.CustomEvent("keyPressed");this.enabledEvent=new YAHOO.util.CustomEvent("enabled");this.disabledEvent=new YAHOO.util.CustomEvent("disabled");if(C.isString(D)){D=document.getElementById(D);}if(C.isFunction(E)){G.subscribe(E);}else{G.subscribe(E.fn,E.scope,E.correctScope);}function H(O,N){if(!I.shift){I.shift=false;}if(!I.alt){I.alt=false;}if(!I.ctrl){I.ctrl=false;}if(O.shiftKey==I.shift&&O.altKey==I.alt&&O.ctrlKey==I.ctrl){var J,M=I.keys,L;if(YAHOO.lang.isArray(M)){for(var K=0;K<M.length;K++){J=M[K];L=A.getCharCode(O);if(J==L){G.fire(L,O);break;}}}else{L=A.getCharCode(O);if(M==L){G.fire(L,O);}}}}this.enable=function(){if(!this.enabled){A.on(D,F,H);this.enabledEvent.fire(I);}this.enabled=true;};this.disable=function(){if(this.enabled){A.removeListener(D,F,H);this.disabledEvent.fire(I);}this.enabled=false;};this.toString=function(){return"KeyListener ["+I.keys+"] "+D.tagName+(D.id?"["+D.id+"]":"");};};var B=YAHOO.util.KeyListener;B.KEYDOWN="keydown";B.KEYUP="keyup";B.KEY={ALT:18,BACK_SPACE:8,CAPS_LOCK:20,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,META:224,NUM_LOCK:144,PAGE_DOWN:34,PAGE_UP:33,PAUSE:19,PRINTSCREEN:44,RIGHT:39,SCROLL_LOCK:145,SHIFT:16,SPACE:32,TAB:9,UP:38};})();YAHOO.register("event",YAHOO.util.Event,{version:"2.8.0r4",build:"2449"});// End of File include/javascript/yui/build/event/event-min.js
                                
/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
YAHOO.widget.LogMsg=function(A){this.msg=this.time=this.category=this.source=this.sourceDetail=null;if(A&&(A.constructor==Object)){for(var B in A){if(A.hasOwnProperty(B)){this[B]=A[B];}}}};YAHOO.widget.LogWriter=function(A){if(!A){YAHOO.log("Could not instantiate LogWriter due to invalid source.","error","LogWriter");return;}this._source=A;};YAHOO.widget.LogWriter.prototype.toString=function(){return"LogWriter "+this._sSource;};YAHOO.widget.LogWriter.prototype.log=function(A,B){YAHOO.widget.Logger.log(A,B,this._source);};YAHOO.widget.LogWriter.prototype.getSource=function(){return this._source;};YAHOO.widget.LogWriter.prototype.setSource=function(A){if(!A){YAHOO.log("Could not set source due to invalid source.","error",this.toString());return;}else{this._source=A;}};YAHOO.widget.LogWriter.prototype._source=null;if(!YAHOO.widget.Logger){YAHOO.widget.Logger={loggerEnabled:true,_browserConsoleEnabled:false,categories:["info","warn","error","time","window"],sources:["global"],_stack:[],maxStackEntries:2500,_startTime:new Date().getTime(),_lastTime:null,_windowErrorsHandled:false,_origOnWindowError:null};YAHOO.widget.Logger.log=function(B,F,G){if(this.loggerEnabled){if(!F){F="info";}else{F=F.toLocaleLowerCase();if(this._isNewCategory(F)){this._createNewCategory(F);}}var C="global";var A=null;if(G){var D=G.indexOf(" ");if(D>0){C=G.substring(0,D);A=G.substring(D,G.length);}else{C=G;}if(this._isNewSource(C)){this._createNewSource(C);}}var H=new Date();var J=new YAHOO.widget.LogMsg({msg:B,time:H,category:F,source:C,sourceDetail:A});var I=this._stack;var E=this.maxStackEntries;if(E&&!isNaN(E)&&(I.length>=E)){I.shift();}I.push(J);this.newLogEvent.fire(J);if(this._browserConsoleEnabled){this._printToBrowserConsole(J);}return true;}else{return false;}};YAHOO.widget.Logger.reset=function(){this._stack=[];this._startTime=new Date().getTime();this.loggerEnabled=true;this.log("Logger reset");this.logResetEvent.fire();};YAHOO.widget.Logger.getStack=function(){return this._stack;};YAHOO.widget.Logger.getStartTime=function(){return this._startTime;};YAHOO.widget.Logger.disableBrowserConsole=function(){YAHOO.log("Logger output to the function console.log() has been disabled.");this._browserConsoleEnabled=false;};YAHOO.widget.Logger.enableBrowserConsole=function(){this._browserConsoleEnabled=true;YAHOO.log("Logger output to the function console.log() has been enabled.");};YAHOO.widget.Logger.handleWindowErrors=function(){if(!YAHOO.widget.Logger._windowErrorsHandled){if(window.error){YAHOO.widget.Logger._origOnWindowError=window.onerror;}window.onerror=YAHOO.widget.Logger._onWindowError;YAHOO.widget.Logger._windowErrorsHandled=true;YAHOO.log("Logger handling of window.onerror has been enabled.");}else{YAHOO.log("Logger handling of window.onerror had already been enabled.");}};YAHOO.widget.Logger.unhandleWindowErrors=function(){if(YAHOO.widget.Logger._windowErrorsHandled){if(YAHOO.widget.Logger._origOnWindowError){window.onerror=YAHOO.widget.Logger._origOnWindowError;YAHOO.widget.Logger._origOnWindowError=null;}else{window.onerror=null;}YAHOO.widget.Logger._windowErrorsHandled=false;YAHOO.log("Logger handling of window.onerror has been disabled.");}else{YAHOO.log("Logger handling of window.onerror had already been disabled.");}};YAHOO.widget.Logger.categoryCreateEvent=new YAHOO.util.CustomEvent("categoryCreate",this,true);YAHOO.widget.Logger.sourceCreateEvent=new YAHOO.util.CustomEvent("sourceCreate",this,true);YAHOO.widget.Logger.newLogEvent=new YAHOO.util.CustomEvent("newLog",this,true);YAHOO.widget.Logger.logResetEvent=new YAHOO.util.CustomEvent("logReset",this,true);YAHOO.widget.Logger._createNewCategory=function(A){this.categories.push(A);this.categoryCreateEvent.fire(A);};YAHOO.widget.Logger._isNewCategory=function(B){for(var A=0;A<this.categories.length;A++){if(B==this.categories[A]){return false;}}return true;};YAHOO.widget.Logger._createNewSource=function(A){this.sources.push(A);this.sourceCreateEvent.fire(A);};YAHOO.widget.Logger._isNewSource=function(A){if(A){for(var B=0;B<this.sources.length;B++){if(A==this.sources[B]){return false;}}return true;}};YAHOO.widget.Logger._printToBrowserConsole=function(C){if(window.console&&console.log){var E=C.category;var D=C.category.substring(0,4).toUpperCase();var G=C.time;var F;if(G.toLocaleTimeString){F=G.toLocaleTimeString();}else{F=G.toString();}var H=G.getTime();var B=(YAHOO.widget.Logger._lastTime)?(H-YAHOO.widget.Logger._lastTime):0;YAHOO.widget.Logger._lastTime=H;var A=F+" ("+B+"ms): "+C.source+": ";if(YAHOO.env.ua.webkit){A+=C.msg;}console.log(A,C.msg);}};YAHOO.widget.Logger._onWindowError=function(A,C,B){try{YAHOO.widget.Logger.log(A+" ("+C+", line "+B+")","window");if(YAHOO.widget.Logger._origOnWindowError){YAHOO.widget.Logger._origOnWindowError();}}catch(D){return false;}};YAHOO.widget.Logger.log("Logger initialized");}(function(){var C=YAHOO.widget.Logger,D=YAHOO.util,E=D.Dom,A=D.Event,G=document;function B(I,H){I=G.createElement(I);if(H){for(var J in H){if(H.hasOwnProperty(J)){I[J]=H[J];}}}return I;}function F(I,H){this._sName=F._index;F._index++;this._init.apply(this,arguments);if(this.autoRender!==false){this.render();}}YAHOO.lang.augmentObject(F,{_index:0,ENTRY_TEMPLATE:(function(){return B("pre",{className:"yui-log-entry"});})(),VERBOSE_TEMPLATE:"<p><span class='{category}'>{label}</span> {totalTime}ms (+{elapsedTime}) {localTime}:</p><p>{sourceAndDetail}</p><p>{message}</p>",BASIC_TEMPLATE:"<p><span class='{category}'>{label}</span> {totalTime}ms (+{elapsedTime}) {localTime}: {sourceAndDetail}: {message}</p>"});F.prototype={logReaderEnabled:true,width:null,height:null,top:null,left:null,right:null,bottom:null,fontSize:null,footerEnabled:true,verboseOutput:true,entryFormat:null,newestOnTop:true,outputBuffer:100,thresholdMax:500,thresholdMin:100,isCollapsed:false,isPaused:false,draggable:true,toString:function(){return"LogReader instance"+this._sName;},pause:function(){this.isPaused=true;this._timeout=null;this.logReaderEnabled=false;if(this._btnPause){this._btnPause.value="Resume";
}},resume:function(){this.isPaused=false;this.logReaderEnabled=true;this._printBuffer();if(this._btnPause){this._btnPause.value="Pause";}},render:function(){if(this.rendered){return;}this._initContainerEl();this._initHeaderEl();this._initConsoleEl();this._initFooterEl();this._initCategories();this._initSources();this._initDragDrop();C.newLogEvent.subscribe(this._onNewLog,this);C.logResetEvent.subscribe(this._onReset,this);C.categoryCreateEvent.subscribe(this._onCategoryCreate,this);C.sourceCreateEvent.subscribe(this._onSourceCreate,this);this.rendered=true;this._filterLogs();},destroy:function(){A.purgeElement(this._elContainer,true);this._elContainer.innerHTML="";this._elContainer.parentNode.removeChild(this._elContainer);this.rendered=false;},hide:function(){this._elContainer.style.display="none";},show:function(){this._elContainer.style.display="block";},collapse:function(){this._elConsole.style.display="none";if(this._elFt){this._elFt.style.display="none";}this._btnCollapse.value="Expand";this.isCollapsed=true;},expand:function(){this._elConsole.style.display="block";if(this._elFt){this._elFt.style.display="block";}this._btnCollapse.value="Collapse";this.isCollapsed=false;},getCheckbox:function(H){return this._filterCheckboxes[H];},getCategories:function(){return this._categoryFilters;},showCategory:function(I){var K=this._categoryFilters;if(K.indexOf){if(K.indexOf(I)>-1){return;}}else{for(var H=0;H<K.length;H++){if(K[H]===I){return;}}}this._categoryFilters.push(I);this._filterLogs();var J=this.getCheckbox(I);if(J){J.checked=true;}},hideCategory:function(I){var K=this._categoryFilters;for(var H=0;H<K.length;H++){if(I==K[H]){K.splice(H,1);break;}}this._filterLogs();var J=this.getCheckbox(I);if(J){J.checked=false;}},getSources:function(){return this._sourceFilters;},showSource:function(H){var K=this._sourceFilters;if(K.indexOf){if(K.indexOf(H)>-1){return;}}else{for(var I=0;I<K.length;I++){if(H==K[I]){return;}}}K.push(H);this._filterLogs();var J=this.getCheckbox(H);if(J){J.checked=true;}},hideSource:function(H){var K=this._sourceFilters;for(var I=0;I<K.length;I++){if(H==K[I]){K.splice(I,1);break;}}this._filterLogs();var J=this.getCheckbox(H);if(J){J.checked=false;}},clearConsole:function(){this._timeout=null;this._buffer=[];this._consoleMsgCount=0;var H=this._elConsole;H.innerHTML="";},setTitle:function(H){this._title.innerHTML=this.html2Text(H);},getLastTime:function(){return this._lastTime;},formatMsg:function(I){var H=this.entryFormat||(this.verboseOutput?F.VERBOSE_TEMPLATE:F.BASIC_TEMPLATE),J={category:I.category,label:I.category.substring(0,4).toUpperCase(),sourceAndDetail:I.sourceDetail?I.source+" "+I.sourceDetail:I.source,message:this.html2Text(I.msg||I.message||"")};if(I.time&&I.time.getTime){J.localTime=I.time.toLocaleTimeString?I.time.toLocaleTimeString():I.time.toString();J.elapsedTime=I.time.getTime()-this.getLastTime();J.totalTime=I.time.getTime()-C.getStartTime();}var K=F.ENTRY_TEMPLATE.cloneNode(true);if(this.verboseOutput){K.className+=" yui-log-verbose";}K.innerHTML=H.replace(/\{(\w+)\}/g,function(L,M){return(M in J)?J[M]:"";});return K;},html2Text:function(H){if(H){H+="";return H.replace(/&/g,"&#38;").replace(/</g,"&#60;").replace(/>/g,"&#62;");}return"";},_sName:null,_buffer:null,_consoleMsgCount:0,_lastTime:null,_timeout:null,_filterCheckboxes:null,_categoryFilters:null,_sourceFilters:null,_elContainer:null,_elHd:null,_elCollapse:null,_btnCollapse:null,_title:null,_elConsole:null,_elFt:null,_elBtns:null,_elCategoryFilters:null,_elSourceFilters:null,_btnPause:null,_btnClear:null,_init:function(H,I){this._buffer=[];this._filterCheckboxes={};this._lastTime=C.getStartTime();if(I&&(I.constructor==Object)){for(var J in I){if(I.hasOwnProperty(J)){this[J]=I[J];}}}this._elContainer=E.get(H);YAHOO.log("LogReader initialized",null,this.toString());},_initContainerEl:function(){if(!this._elContainer||!/div$/i.test(this._elContainer.tagName)){this._elContainer=G.body.insertBefore(B("div"),G.body.firstChild);E.addClass(this._elContainer,"yui-log-container");}E.addClass(this._elContainer,"yui-log");var J=this._elContainer.style,H=["width","right","top","fontSize"],K,I;for(I=H.length-1;I>=0;--I){K=H[I];if(this[K]){J[K]=this[K];}}if(this.left){J.left=this.left;J.right="auto";}if(this.bottom){J.bottom=this.bottom;J.top="auto";}if(YAHOO.env.ua.opera){G.body.style+="";}},_initHeaderEl:function(){if(this._elHd){A.purgeElement(this._elHd,true);this._elHd.innerHTML="";}this._elHd=B("div",{id:"yui-log-hd"+this._sName,className:"yui-log-hd"});this._elCollapse=B("div",{className:"yui-log-btns"});this._btnCollapse=B("input",{type:"button",className:"yui-log-button",value:"Collapse"});A.on(this._btnCollapse,"click",this._onClickCollapseBtn,this);this._title=B("h4",{innerHTML:"Logger Console"});this._elCollapse.appendChild(this._btnCollapse);this._elHd.appendChild(this._elCollapse);this._elHd.appendChild(this._title);this._elContainer.appendChild(this._elHd);},_initConsoleEl:function(){if(this._elConsole){A.purgeElement(this._elConsole,true);this._elConsole.innerHTML="";}this._elConsole=B("div",{className:"yui-log-bd"});if(this.height){this._elConsole.style.height=this.height;}this._elContainer.appendChild(this._elConsole);},_initFooterEl:function(){if(this.footerEnabled){if(this._elFt){A.purgeElement(this._elFt,true);this._elFt.innerHTML="";}this._elFt=B("div",{className:"yui-log-ft"});this._elBtns=B("div",{className:"yui-log-btns"});this._btnPause=B("input",{type:"button",className:"yui-log-button",value:"Pause"});A.on(this._btnPause,"click",this._onClickPauseBtn,this);this._btnClear=B("input",{type:"button",className:"yui-log-button",value:"Clear"});A.on(this._btnClear,"click",this._onClickClearBtn,this);this._elCategoryFilters=B("div",{className:"yui-log-categoryfilters"});this._elSourceFilters=B("div",{className:"yui-log-sourcefilters"});this._elBtns.appendChild(this._btnPause);this._elBtns.appendChild(this._btnClear);this._elFt.appendChild(this._elBtns);this._elFt.appendChild(this._elCategoryFilters);
this._elFt.appendChild(this._elSourceFilters);this._elContainer.appendChild(this._elFt);}},_initDragDrop:function(){if(D.DD&&this.draggable&&this._elHd){var H=new D.DD(this._elContainer);H.setHandleElId(this._elHd.id);this._elHd.style.cursor="move";}},_initCategories:function(){this._categoryFilters=[];var J=C.categories;for(var H=0;H<J.length;H++){var I=J[H];this._categoryFilters.push(I);if(this._elCategoryFilters){this._createCategoryCheckbox(I);}}},_initSources:function(){this._sourceFilters=[];var J=C.sources;for(var I=0;I<J.length;I++){var H=J[I];this._sourceFilters.push(H);if(this._elSourceFilters){this._createSourceCheckbox(H);}}},_createCategoryCheckbox:function(K){if(this._elFt){var J=B("span",{className:"yui-log-filtergrp"}),H=B("input",{id:"yui-log-filter-"+K+this._sName,className:"yui-log-filter-"+K,type:"checkbox",category:K}),I=B("label",{htmlFor:H.id,className:K,innerHTML:K});A.on(H,"click",this._onCheckCategory,this);this._filterCheckboxes[K]=H;J.appendChild(H);J.appendChild(I);this._elCategoryFilters.appendChild(J);H.checked=true;}},_createSourceCheckbox:function(H){if(this._elFt){var K=B("span",{className:"yui-log-filtergrp"}),I=B("input",{id:"yui-log-filter-"+H+this._sName,className:"yui-log-filter-"+H,type:"checkbox",source:H}),J=B("label",{htmlFor:I.id,className:H,innerHTML:H});A.on(I,"click",this._onCheckSource,this);this._filterCheckboxes[H]=I;K.appendChild(I);K.appendChild(J);this._elSourceFilters.appendChild(K);I.checked=true;}},_filterLogs:function(){if(this._elConsole!==null){this.clearConsole();this._printToConsole(C.getStack());}},_printBuffer:function(){this._timeout=null;if(this._elConsole!==null){var I=this.thresholdMax;I=(I&&!isNaN(I))?I:500;if(this._consoleMsgCount<I){var H=[];for(var J=0;J<this._buffer.length;J++){H[J]=this._buffer[J];}this._buffer=[];this._printToConsole(H);}else{this._filterLogs();}if(!this.newestOnTop){this._elConsole.scrollTop=this._elConsole.scrollHeight;}}},_printToConsole:function(P){var I=P.length,T=G.createDocumentFragment(),W=[],X=this.thresholdMin,J=this._sourceFilters.length,U=this._categoryFilters.length,R,O,N,M,S;if(isNaN(X)||(X>this.thresholdMax)){X=0;}R=(I>X)?(I-X):0;for(O=R;O<I;O++){var L=false,Q=false,V=P[O],H=V.source,K=V.category;for(N=0;N<J;N++){if(H==this._sourceFilters[N]){Q=true;break;}}if(Q){for(N=0;N<U;N++){if(K==this._categoryFilters[N]){L=true;break;}}}if(L){if(this._consoleMsgCount===0){this._lastTime=V.time.getTime();}M=this.formatMsg(V);if(typeof M==="string"){W[W.length]=M;}else{T.insertBefore(M,this.newestOnTop?T.firstChild||null:null);}this._consoleMsgCount++;this._lastTime=V.time.getTime();}}if(W.length){W.splice(0,0,this._elConsole.innerHTML);this._elConsole.innerHTML=this.newestOnTop?W.reverse().join(""):W.join("");}else{if(T.firstChild){this._elConsole.insertBefore(T,this.newestOnTop?this._elConsole.firstChild||null:null);}}},_onCategoryCreate:function(K,J,H){var I=J[0];H._categoryFilters.push(I);if(H._elFt){H._createCategoryCheckbox(I);}},_onSourceCreate:function(K,J,H){var I=J[0];H._sourceFilters.push(I);if(H._elFt){H._createSourceCheckbox(I);}},_onCheckCategory:function(H,I){var J=this.category;if(!this.checked){I.hideCategory(J);}else{I.showCategory(J);}},_onCheckSource:function(H,I){var J=this.source;if(!this.checked){I.hideSource(J);}else{I.showSource(J);}},_onClickCollapseBtn:function(H,I){if(!I.isCollapsed){I.collapse();}else{I.expand();}},_onClickPauseBtn:function(H,I){if(!I.isPaused){I.pause();}else{I.resume();}},_onClickClearBtn:function(H,I){I.clearConsole();},_onNewLog:function(K,J,H){var I=J[0];H._buffer.push(I);if(H.logReaderEnabled===true&&H._timeout===null){H._timeout=setTimeout(function(){H._printBuffer();},H.outputBuffer);}},_onReset:function(J,I,H){H._filterLogs();}};YAHOO.widget.LogReader=F;})();YAHOO.register("logger",YAHOO.widget.Logger,{version:"2.8.0r4",build:"2449"});// End of File include/javascript/yui/build/logger/logger-min.js
                                
/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
(function(){var B=YAHOO.util;var A=function(D,C,E,F){if(!D){}this.init(D,C,E,F);};A.NAME="Anim";A.prototype={toString:function(){var C=this.getEl()||{};var D=C.id||C.tagName;return(this.constructor.NAME+": "+D);},patterns:{noNegatives:/width|height|opacity|padding/i,offsetAttribute:/^((width|height)|(top|left))$/,defaultUnit:/width|height|top$|bottom$|left$|right$/i,offsetUnit:/\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i},doMethod:function(C,E,D){return this.method(this.currentFrame,E,D-E,this.totalFrames);},setAttribute:function(C,F,E){var D=this.getEl();if(this.patterns.noNegatives.test(C)){F=(F>0)?F:0;}if(C in D&&!("style" in D&&C in D.style)){D[C]=F;}else{B.Dom.setStyle(D,C,F+E);}},getAttribute:function(C){var E=this.getEl();var G=B.Dom.getStyle(E,C);if(G!=="auto"&&!this.patterns.offsetUnit.test(G)){return parseFloat(G);}var D=this.patterns.offsetAttribute.exec(C)||[];var H=!!(D[3]);var F=!!(D[2]);if("style" in E){if(F||(B.Dom.getStyle(E,"position")=="absolute"&&H)){G=E["offset"+D[0].charAt(0).toUpperCase()+D[0].substr(1)];}else{G=0;}}else{if(C in E){G=E[C];}}return G;},getDefaultUnit:function(C){if(this.patterns.defaultUnit.test(C)){return"px";}return"";},setRuntimeAttribute:function(D){var I;var E;var F=this.attributes;this.runtimeAttributes[D]={};var H=function(J){return(typeof J!=="undefined");};if(!H(F[D]["to"])&&!H(F[D]["by"])){return false;}I=(H(F[D]["from"]))?F[D]["from"]:this.getAttribute(D);if(H(F[D]["to"])){E=F[D]["to"];}else{if(H(F[D]["by"])){if(I.constructor==Array){E=[];for(var G=0,C=I.length;G<C;++G){E[G]=I[G]+F[D]["by"][G]*1;}}else{E=I+F[D]["by"]*1;}}}this.runtimeAttributes[D].start=I;this.runtimeAttributes[D].end=E;this.runtimeAttributes[D].unit=(H(F[D].unit))?F[D]["unit"]:this.getDefaultUnit(D);return true;},init:function(E,J,I,C){var D=false;var F=null;var H=0;E=B.Dom.get(E);this.attributes=J||{};this.duration=!YAHOO.lang.isUndefined(I)?I:1;this.method=C||B.Easing.easeNone;this.useSeconds=true;this.currentFrame=0;this.totalFrames=B.AnimMgr.fps;this.setEl=function(M){E=B.Dom.get(M);};this.getEl=function(){return E;};this.isAnimated=function(){return D;};this.getStartTime=function(){return F;};this.runtimeAttributes={};this.animate=function(){if(this.isAnimated()){return false;}this.currentFrame=0;this.totalFrames=(this.useSeconds)?Math.ceil(B.AnimMgr.fps*this.duration):this.duration;if(this.duration===0&&this.useSeconds){this.totalFrames=1;}B.AnimMgr.registerElement(this);return true;};this.stop=function(M){if(!this.isAnimated()){return false;}if(M){this.currentFrame=this.totalFrames;this._onTween.fire();}B.AnimMgr.stop(this);};var L=function(){this.onStart.fire();this.runtimeAttributes={};for(var M in this.attributes){this.setRuntimeAttribute(M);}D=true;H=0;F=new Date();};var K=function(){var O={duration:new Date()-this.getStartTime(),currentFrame:this.currentFrame};O.toString=function(){return("duration: "+O.duration+", currentFrame: "+O.currentFrame);};this.onTween.fire(O);var N=this.runtimeAttributes;for(var M in N){this.setAttribute(M,this.doMethod(M,N[M].start,N[M].end),N[M].unit);}H+=1;};var G=function(){var M=(new Date()-F)/1000;var N={duration:M,frames:H,fps:H/M};N.toString=function(){return("duration: "+N.duration+", frames: "+N.frames+", fps: "+N.fps);};D=false;H=0;this.onComplete.fire(N);};this._onStart=new B.CustomEvent("_start",this,true);this.onStart=new B.CustomEvent("start",this);this.onTween=new B.CustomEvent("tween",this);this._onTween=new B.CustomEvent("_tween",this,true);this.onComplete=new B.CustomEvent("complete",this);this._onComplete=new B.CustomEvent("_complete",this,true);this._onStart.subscribe(L);this._onTween.subscribe(K);this._onComplete.subscribe(G);}};B.Anim=A;})();YAHOO.util.AnimMgr=new function(){var C=null;var B=[];var A=0;this.fps=1000;this.delay=1;this.registerElement=function(F){B[B.length]=F;A+=1;F._onStart.fire();this.start();};this.unRegister=function(G,F){F=F||E(G);if(!G.isAnimated()||F===-1){return false;}G._onComplete.fire();B.splice(F,1);A-=1;if(A<=0){this.stop();}return true;};this.start=function(){if(C===null){C=setInterval(this.run,this.delay);}};this.stop=function(H){if(!H){clearInterval(C);for(var G=0,F=B.length;G<F;++G){this.unRegister(B[0],0);}B=[];C=null;A=0;}else{this.unRegister(H);}};this.run=function(){for(var H=0,F=B.length;H<F;++H){var G=B[H];if(!G||!G.isAnimated()){continue;}if(G.currentFrame<G.totalFrames||G.totalFrames===null){G.currentFrame+=1;if(G.useSeconds){D(G);}G._onTween.fire();}else{YAHOO.util.AnimMgr.stop(G,H);}}};var E=function(H){for(var G=0,F=B.length;G<F;++G){if(B[G]===H){return G;}}return -1;};var D=function(G){var J=G.totalFrames;var I=G.currentFrame;var H=(G.currentFrame*G.duration*1000/G.totalFrames);var F=(new Date()-G.getStartTime());var K=0;if(F<G.duration*1000){K=Math.round((F/H-1)*G.currentFrame);}else{K=J-(I+1);}if(K>0&&isFinite(K)){if(G.currentFrame+K>=J){K=J-(I+1);}G.currentFrame+=K;}};this._queue=B;this._getIndex=E;};YAHOO.util.Bezier=new function(){this.getPosition=function(E,D){var F=E.length;var C=[];for(var B=0;B<F;++B){C[B]=[E[B][0],E[B][1]];}for(var A=1;A<F;++A){for(B=0;B<F-A;++B){C[B][0]=(1-D)*C[B][0]+D*C[parseInt(B+1,10)][0];C[B][1]=(1-D)*C[B][1]+D*C[parseInt(B+1,10)][1];}}return[C[0][0],C[0][1]];};};(function(){var A=function(F,E,G,H){A.superclass.constructor.call(this,F,E,G,H);};A.NAME="ColorAnim";A.DEFAULT_BGCOLOR="#fff";var C=YAHOO.util;YAHOO.extend(A,C.Anim);var D=A.superclass;var B=A.prototype;B.patterns.color=/color$/i;B.patterns.rgb=/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i;B.patterns.hex=/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;B.patterns.hex3=/^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i;B.patterns.transparent=/^transparent|rgba\(0, 0, 0, 0\)$/;B.parseColor=function(E){if(E.length==3){return E;}var F=this.patterns.hex.exec(E);if(F&&F.length==4){return[parseInt(F[1],16),parseInt(F[2],16),parseInt(F[3],16)];}F=this.patterns.rgb.exec(E);if(F&&F.length==4){return[parseInt(F[1],10),parseInt(F[2],10),parseInt(F[3],10)];}F=this.patterns.hex3.exec(E);if(F&&F.length==4){return[parseInt(F[1]+F[1],16),parseInt(F[2]+F[2],16),parseInt(F[3]+F[3],16)];
}return null;};B.getAttribute=function(E){var G=this.getEl();if(this.patterns.color.test(E)){var I=YAHOO.util.Dom.getStyle(G,E);var H=this;if(this.patterns.transparent.test(I)){var F=YAHOO.util.Dom.getAncestorBy(G,function(J){return !H.patterns.transparent.test(I);});if(F){I=C.Dom.getStyle(F,E);}else{I=A.DEFAULT_BGCOLOR;}}}else{I=D.getAttribute.call(this,E);}return I;};B.doMethod=function(F,J,G){var I;if(this.patterns.color.test(F)){I=[];for(var H=0,E=J.length;H<E;++H){I[H]=D.doMethod.call(this,F,J[H],G[H]);}I="rgb("+Math.floor(I[0])+","+Math.floor(I[1])+","+Math.floor(I[2])+")";}else{I=D.doMethod.call(this,F,J,G);}return I;};B.setRuntimeAttribute=function(F){D.setRuntimeAttribute.call(this,F);if(this.patterns.color.test(F)){var H=this.attributes;var J=this.parseColor(this.runtimeAttributes[F].start);var G=this.parseColor(this.runtimeAttributes[F].end);if(typeof H[F]["to"]==="undefined"&&typeof H[F]["by"]!=="undefined"){G=this.parseColor(H[F].by);for(var I=0,E=J.length;I<E;++I){G[I]=J[I]+G[I];}}this.runtimeAttributes[F].start=J;this.runtimeAttributes[F].end=G;}};C.ColorAnim=A;})();
/*
TERMS OF USE - EASING EQUATIONS
Open source under the BSD License.
Copyright 2001 Robert Penner All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of the author nor the names of contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
YAHOO.util.Easing={easeNone:function(B,A,D,C){return D*B/C+A;},easeIn:function(B,A,D,C){return D*(B/=C)*B+A;},easeOut:function(B,A,D,C){return -D*(B/=C)*(B-2)+A;},easeBoth:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B+A;}return -D/2*((--B)*(B-2)-1)+A;},easeInStrong:function(B,A,D,C){return D*(B/=C)*B*B*B+A;},easeOutStrong:function(B,A,D,C){return -D*((B=B/C-1)*B*B*B-1)+A;},easeBothStrong:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B*B*B+A;}return -D/2*((B-=2)*B*B*B-2)+A;},elasticIn:function(C,A,G,F,B,E){if(C==0){return A;}if((C/=F)==1){return A+G;}if(!E){E=F*0.3;}if(!B||B<Math.abs(G)){B=G;var D=E/4;}else{var D=E/(2*Math.PI)*Math.asin(G/B);}return -(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A;},elasticOut:function(C,A,G,F,B,E){if(C==0){return A;}if((C/=F)==1){return A+G;}if(!E){E=F*0.3;}if(!B||B<Math.abs(G)){B=G;var D=E/4;}else{var D=E/(2*Math.PI)*Math.asin(G/B);}return B*Math.pow(2,-10*C)*Math.sin((C*F-D)*(2*Math.PI)/E)+G+A;},elasticBoth:function(C,A,G,F,B,E){if(C==0){return A;}if((C/=F/2)==2){return A+G;}if(!E){E=F*(0.3*1.5);}if(!B||B<Math.abs(G)){B=G;var D=E/4;}else{var D=E/(2*Math.PI)*Math.asin(G/B);}if(C<1){return -0.5*(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A;}return B*Math.pow(2,-10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E)*0.5+G+A;},backIn:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158;}return E*(B/=D)*B*((C+1)*B-C)+A;},backOut:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158;}return E*((B=B/D-1)*B*((C+1)*B+C)+1)+A;},backBoth:function(B,A,E,D,C){if(typeof C=="undefined"){C=1.70158;}if((B/=D/2)<1){return E/2*(B*B*(((C*=(1.525))+1)*B-C))+A;}return E/2*((B-=2)*B*(((C*=(1.525))+1)*B+C)+2)+A;},bounceIn:function(B,A,D,C){return D-YAHOO.util.Easing.bounceOut(C-B,0,D,C)+A;},bounceOut:function(B,A,D,C){if((B/=C)<(1/2.75)){return D*(7.5625*B*B)+A;}else{if(B<(2/2.75)){return D*(7.5625*(B-=(1.5/2.75))*B+0.75)+A;}else{if(B<(2.5/2.75)){return D*(7.5625*(B-=(2.25/2.75))*B+0.9375)+A;}}}return D*(7.5625*(B-=(2.625/2.75))*B+0.984375)+A;},bounceBoth:function(B,A,D,C){if(B<C/2){return YAHOO.util.Easing.bounceIn(B*2,0,D,C)*0.5+A;}return YAHOO.util.Easing.bounceOut(B*2-C,0,D,C)*0.5+D*0.5+A;}};(function(){var A=function(H,G,I,J){if(H){A.superclass.constructor.call(this,H,G,I,J);}};A.NAME="Motion";var E=YAHOO.util;YAHOO.extend(A,E.ColorAnim);var F=A.superclass;var C=A.prototype;C.patterns.points=/^points$/i;C.setAttribute=function(G,I,H){if(this.patterns.points.test(G)){H=H||"px";F.setAttribute.call(this,"left",I[0],H);F.setAttribute.call(this,"top",I[1],H);}else{F.setAttribute.call(this,G,I,H);}};C.getAttribute=function(G){if(this.patterns.points.test(G)){var H=[F.getAttribute.call(this,"left"),F.getAttribute.call(this,"top")];}else{H=F.getAttribute.call(this,G);}return H;};C.doMethod=function(G,K,H){var J=null;if(this.patterns.points.test(G)){var I=this.method(this.currentFrame,0,100,this.totalFrames)/100;J=E.Bezier.getPosition(this.runtimeAttributes[G],I);}else{J=F.doMethod.call(this,G,K,H);}return J;};C.setRuntimeAttribute=function(P){if(this.patterns.points.test(P)){var H=this.getEl();var J=this.attributes;var G;var L=J["points"]["control"]||[];var I;var M,O;if(L.length>0&&!(L[0] instanceof Array)){L=[L];}else{var K=[];for(M=0,O=L.length;M<O;++M){K[M]=L[M];}L=K;}if(E.Dom.getStyle(H,"position")=="static"){E.Dom.setStyle(H,"position","relative");}if(D(J["points"]["from"])){E.Dom.setXY(H,J["points"]["from"]);
}else{E.Dom.setXY(H,E.Dom.getXY(H));}G=this.getAttribute("points");if(D(J["points"]["to"])){I=B.call(this,J["points"]["to"],G);var N=E.Dom.getXY(this.getEl());for(M=0,O=L.length;M<O;++M){L[M]=B.call(this,L[M],G);}}else{if(D(J["points"]["by"])){I=[G[0]+J["points"]["by"][0],G[1]+J["points"]["by"][1]];for(M=0,O=L.length;M<O;++M){L[M]=[G[0]+L[M][0],G[1]+L[M][1]];}}}this.runtimeAttributes[P]=[G];if(L.length>0){this.runtimeAttributes[P]=this.runtimeAttributes[P].concat(L);}this.runtimeAttributes[P][this.runtimeAttributes[P].length]=I;}else{F.setRuntimeAttribute.call(this,P);}};var B=function(G,I){var H=E.Dom.getXY(this.getEl());G=[G[0]-H[0]+I[0],G[1]-H[1]+I[1]];return G;};var D=function(G){return(typeof G!=="undefined");};E.Motion=A;})();(function(){var D=function(F,E,G,H){if(F){D.superclass.constructor.call(this,F,E,G,H);}};D.NAME="Scroll";var B=YAHOO.util;YAHOO.extend(D,B.ColorAnim);var C=D.superclass;var A=D.prototype;A.doMethod=function(E,H,F){var G=null;if(E=="scroll"){G=[this.method(this.currentFrame,H[0],F[0]-H[0],this.totalFrames),this.method(this.currentFrame,H[1],F[1]-H[1],this.totalFrames)];}else{G=C.doMethod.call(this,E,H,F);}return G;};A.getAttribute=function(E){var G=null;var F=this.getEl();if(E=="scroll"){G=[F.scrollLeft,F.scrollTop];}else{G=C.getAttribute.call(this,E);}return G;};A.setAttribute=function(E,H,G){var F=this.getEl();if(E=="scroll"){F.scrollLeft=H[0];F.scrollTop=H[1];}else{C.setAttribute.call(this,E,H,G);}};B.Scroll=D;})();YAHOO.register("animation",YAHOO.util.Anim,{version:"2.8.0r4",build:"2449"});// End of File include/javascript/yui/build/animation/animation-min.js
                                
/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
YAHOO.util.Connect={_msxml_progid:["Microsoft.XMLHTTP","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"],_http_headers:{},_has_http_headers:false,_use_default_post_header:true,_default_post_header:"application/x-www-form-urlencoded; charset=UTF-8",_default_form_header:"application/x-www-form-urlencoded",_use_default_xhr_header:true,_default_xhr_header:"XMLHttpRequest",_has_default_headers:true,_default_headers:{},_poll:{},_timeOut:{},_polling_interval:50,_transaction_id:0,startEvent:new YAHOO.util.CustomEvent("start"),completeEvent:new YAHOO.util.CustomEvent("complete"),successEvent:new YAHOO.util.CustomEvent("success"),failureEvent:new YAHOO.util.CustomEvent("failure"),abortEvent:new YAHOO.util.CustomEvent("abort"),_customEvents:{onStart:["startEvent","start"],onComplete:["completeEvent","complete"],onSuccess:["successEvent","success"],onFailure:["failureEvent","failure"],onUpload:["uploadEvent","upload"],onAbort:["abortEvent","abort"]},setProgId:function(A){this._msxml_progid.unshift(A);},setDefaultPostHeader:function(A){if(typeof A=="string"){this._default_post_header=A;}else{if(typeof A=="boolean"){this._use_default_post_header=A;}}},setDefaultXhrHeader:function(A){if(typeof A=="string"){this._default_xhr_header=A;}else{this._use_default_xhr_header=A;}},setPollingInterval:function(A){if(typeof A=="number"&&isFinite(A)){this._polling_interval=A;}},createXhrObject:function(F){var D,A,B;try{A=new XMLHttpRequest();D={conn:A,tId:F,xhr:true};}catch(C){for(B=0;B<this._msxml_progid.length;++B){try{A=new ActiveXObject(this._msxml_progid[B]);D={conn:A,tId:F,xhr:true};break;}catch(E){}}}finally{return D;}},getConnectionObject:function(A){var C,D=this._transaction_id;try{if(!A){C=this.createXhrObject(D);}else{C={tId:D};if(A==="xdr"){C.conn=this._transport;C.xdr=true;}else{if(A==="upload"){C.upload=true;}}}if(C){this._transaction_id++;}}catch(B){}return C;},asyncRequest:function(G,D,F,A){var E,C,B=(F&&F.argument)?F.argument:null;if(this._isFileUpload){C="upload";}else{if(F.xdr){C="xdr";}}E=this.getConnectionObject(C);if(!E){return null;}else{if(F&&F.customevents){this.initCustomEvents(E,F);}if(this._isFormSubmit){if(this._isFileUpload){this.uploadFile(E,F,D,A);return E;}if(G.toUpperCase()=="GET"){if(this._sFormData.length!==0){D+=((D.indexOf("?")==-1)?"?":"&")+this._sFormData;}}else{if(G.toUpperCase()=="POST"){A=A?this._sFormData+"&"+A:this._sFormData;}}}if(G.toUpperCase()=="GET"&&(F&&F.cache===false)){D+=((D.indexOf("?")==-1)?"?":"&")+"rnd="+new Date().valueOf().toString();}if(this._use_default_xhr_header){if(!this._default_headers["X-Requested-With"]){this.initHeader("X-Requested-With",this._default_xhr_header,true);}}if((G.toUpperCase()==="POST"&&this._use_default_post_header)&&this._isFormSubmit===false){this.initHeader("Content-Type",this._default_post_header);}if(E.xdr){this.xdr(E,G,D,F,A);return E;}E.conn.open(G,D,true);if(this._has_default_headers||this._has_http_headers){this.setHeader(E);}this.handleReadyState(E,F);E.conn.send(A||"");if(this._isFormSubmit===true){this.resetFormState();}this.startEvent.fire(E,B);if(E.startEvent){E.startEvent.fire(E,B);}return E;}},initCustomEvents:function(A,C){var B;for(B in C.customevents){if(this._customEvents[B][0]){A[this._customEvents[B][0]]=new YAHOO.util.CustomEvent(this._customEvents[B][1],(C.scope)?C.scope:null);A[this._customEvents[B][0]].subscribe(C.customevents[B]);}}},handleReadyState:function(C,D){var B=this,A=(D&&D.argument)?D.argument:null;if(D&&D.timeout){this._timeOut[C.tId]=window.setTimeout(function(){B.abort(C,D,true);},D.timeout);}this._poll[C.tId]=window.setInterval(function(){if(C.conn&&C.conn.readyState===4){window.clearInterval(B._poll[C.tId]);delete B._poll[C.tId];if(D&&D.timeout){window.clearTimeout(B._timeOut[C.tId]);delete B._timeOut[C.tId];}B.completeEvent.fire(C,A);if(C.completeEvent){C.completeEvent.fire(C,A);}B.handleTransactionResponse(C,D);}},this._polling_interval);},handleTransactionResponse:function(B,I,D){var E,A,G=(I&&I.argument)?I.argument:null,C=(B.r&&B.r.statusText==="xdr:success")?true:false,H=(B.r&&B.r.statusText==="xdr:failure")?true:false,J=D;try{if((B.conn.status!==undefined&&B.conn.status!==0)||C){E=B.conn.status;}else{if(H&&!J){E=0;}else{E=13030;}}}catch(F){E=13030;}if((E>=200&&E<300)||E===1223||C){A=B.xdr?B.r:this.createResponseObject(B,G);if(I&&I.success){if(!I.scope){I.success(A);}else{I.success.apply(I.scope,[A]);}}this.successEvent.fire(A);if(B.successEvent){B.successEvent.fire(A);}}else{switch(E){case 12002:case 12029:case 12030:case 12031:case 12152:case 13030:A=this.createExceptionObject(B.tId,G,(D?D:false));if(I&&I.failure){if(!I.scope){I.failure(A);}else{I.failure.apply(I.scope,[A]);}}break;default:A=(B.xdr)?B.response:this.createResponseObject(B,G);if(I&&I.failure){if(!I.scope){I.failure(A);}else{I.failure.apply(I.scope,[A]);}}}this.failureEvent.fire(A);if(B.failureEvent){B.failureEvent.fire(A);}}this.releaseObject(B);A=null;},createResponseObject:function(A,G){var D={},I={},E,C,F,B;try{C=A.conn.getAllResponseHeaders();F=C.split("\n");for(E=0;E<F.length;E++){B=F[E].indexOf(":");if(B!=-1){I[F[E].substring(0,B)]=YAHOO.lang.trim(F[E].substring(B+2));}}}catch(H){}D.tId=A.tId;D.status=(A.conn.status==1223)?204:A.conn.status;D.statusText=(A.conn.status==1223)?"No Content":A.conn.statusText;D.getResponseHeader=I;D.getAllResponseHeaders=C;D.responseText=A.conn.responseText;D.responseXML=A.conn.responseXML;if(G){D.argument=G;}return D;},createExceptionObject:function(H,D,A){var F=0,G="communication failure",C=-1,B="transaction aborted",E={};E.tId=H;if(A){E.status=C;E.statusText=B;}else{E.status=F;E.statusText=G;}if(D){E.argument=D;}return E;},initHeader:function(A,D,C){var B=(C)?this._default_headers:this._http_headers;B[A]=D;if(C){this._has_default_headers=true;}else{this._has_http_headers=true;}},setHeader:function(A){var B;if(this._has_default_headers){for(B in this._default_headers){if(YAHOO.lang.hasOwnProperty(this._default_headers,B)){A.conn.setRequestHeader(B,this._default_headers[B]);}}}if(this._has_http_headers){for(B in this._http_headers){if(YAHOO.lang.hasOwnProperty(this._http_headers,B)){A.conn.setRequestHeader(B,this._http_headers[B]);
}}this._http_headers={};this._has_http_headers=false;}},resetDefaultHeaders:function(){this._default_headers={};this._has_default_headers=false;},abort:function(E,G,A){var D,B=(G&&G.argument)?G.argument:null;E=E||{};if(E.conn){if(E.xhr){if(this.isCallInProgress(E)){E.conn.abort();window.clearInterval(this._poll[E.tId]);delete this._poll[E.tId];if(A){window.clearTimeout(this._timeOut[E.tId]);delete this._timeOut[E.tId];}D=true;}}else{if(E.xdr){E.conn.abort(E.tId);D=true;}}}else{if(E.upload){var C="yuiIO"+E.tId;var F=document.getElementById(C);if(F){YAHOO.util.Event.removeListener(F,"load");document.body.removeChild(F);if(A){window.clearTimeout(this._timeOut[E.tId]);delete this._timeOut[E.tId];}D=true;}}else{D=false;}}if(D===true){this.abortEvent.fire(E,B);if(E.abortEvent){E.abortEvent.fire(E,B);}this.handleTransactionResponse(E,G,true);}return D;},isCallInProgress:function(A){A=A||{};if(A.xhr&&A.conn){return A.conn.readyState!==4&&A.conn.readyState!==0;}else{if(A.xdr&&A.conn){return A.conn.isCallInProgress(A.tId);}else{if(A.upload===true){return document.getElementById("yuiIO"+A.tId)?true:false;}else{return false;}}}},releaseObject:function(A){if(A&&A.conn){A.conn=null;A=null;}}};(function(){var G=YAHOO.util.Connect,H={};function D(I){var J='<object id="YUIConnectionSwf" type="application/x-shockwave-flash" data="'+I+'" width="0" height="0">'+'<param name="movie" value="'+I+'">'+'<param name="allowScriptAccess" value="always">'+"</object>",K=document.createElement("div");document.body.appendChild(K);K.innerHTML=J;}function B(L,I,J,M,K){H[parseInt(L.tId)]={"o":L,"c":M};if(K){M.method=I;M.data=K;}L.conn.send(J,M,L.tId);}function E(I){D(I);G._transport=document.getElementById("YUIConnectionSwf");}function C(){G.xdrReadyEvent.fire();}function A(J,I){if(J){G.startEvent.fire(J,I.argument);if(J.startEvent){J.startEvent.fire(J,I.argument);}}}function F(J){var K=H[J.tId].o,I=H[J.tId].c;if(J.statusText==="xdr:start"){A(K,I);return;}J.responseText=decodeURI(J.responseText);K.r=J;if(I.argument){K.r.argument=I.argument;}this.handleTransactionResponse(K,I,J.statusText==="xdr:abort"?true:false);delete H[J.tId];}G.xdr=B;G.swf=D;G.transport=E;G.xdrReadyEvent=new YAHOO.util.CustomEvent("xdrReady");G.xdrReady=C;G.handleXdrResponse=F;})();(function(){var D=YAHOO.util.Connect,F=YAHOO.util.Event;D._isFormSubmit=false;D._isFileUpload=false;D._formNode=null;D._sFormData=null;D._submitElementValue=null;D.uploadEvent=new YAHOO.util.CustomEvent("upload"),D._hasSubmitListener=function(){if(F){F.addListener(document,"click",function(J){var I=F.getTarget(J),H=I.nodeName.toLowerCase();if((H==="input"||H==="button")&&(I.type&&I.type.toLowerCase()=="submit")){D._submitElementValue=encodeURIComponent(I.name)+"="+encodeURIComponent(I.value);}});return true;}return false;}();function G(T,O,J){var S,I,R,P,W,Q=false,M=[],V=0,L,N,K,U,H;this.resetFormState();if(typeof T=="string"){S=(document.getElementById(T)||document.forms[T]);}else{if(typeof T=="object"){S=T;}else{return;}}if(O){this.createFrame(J?J:null);this._isFormSubmit=true;this._isFileUpload=true;this._formNode=S;return;}for(L=0,N=S.elements.length;L<N;++L){I=S.elements[L];W=I.disabled;R=I.name;if(!W&&R){R=encodeURIComponent(R)+"=";P=encodeURIComponent(I.value);switch(I.type){case"select-one":if(I.selectedIndex>-1){H=I.options[I.selectedIndex];M[V++]=R+encodeURIComponent((H.attributes.value&&H.attributes.value.specified)?H.value:H.text);}break;case"select-multiple":if(I.selectedIndex>-1){for(K=I.selectedIndex,U=I.options.length;K<U;++K){H=I.options[K];if(H.selected){M[V++]=R+encodeURIComponent((H.attributes.value&&H.attributes.value.specified)?H.value:H.text);}}}break;case"radio":case"checkbox":if(I.checked){M[V++]=R+P;}break;case"file":case undefined:case"reset":case"button":break;case"submit":if(Q===false){if(this._hasSubmitListener&&this._submitElementValue){M[V++]=this._submitElementValue;}Q=true;}break;default:M[V++]=R+P;}}}this._isFormSubmit=true;this._sFormData=M.join("&");this.initHeader("Content-Type",this._default_form_header);return this._sFormData;}function C(){this._isFormSubmit=false;this._isFileUpload=false;this._formNode=null;this._sFormData="";}function B(H){var I="yuiIO"+this._transaction_id,J;if(YAHOO.env.ua.ie){J=document.createElement('<iframe id="'+I+'" name="'+I+'" />');if(typeof H=="boolean"){J.src="javascript:false";}}else{J=document.createElement("iframe");J.id=I;J.name=I;}J.style.position="absolute";J.style.top="-1000px";J.style.left="-1000px";document.body.appendChild(J);}function E(H){var K=[],I=H.split("&"),J,L;for(J=0;J<I.length;J++){L=I[J].indexOf("=");if(L!=-1){K[J]=document.createElement("input");K[J].type="hidden";K[J].name=decodeURIComponent(I[J].substring(0,L));K[J].value=decodeURIComponent(I[J].substring(L+1));this._formNode.appendChild(K[J]);}}return K;}function A(K,V,L,J){var Q="yuiIO"+K.tId,R="multipart/form-data",T=document.getElementById(Q),M=(document.documentMode&&document.documentMode===8)?true:false,W=this,S=(V&&V.argument)?V.argument:null,U,P,I,O,H,N;H={action:this._formNode.getAttribute("action"),method:this._formNode.getAttribute("method"),target:this._formNode.getAttribute("target")};this._formNode.setAttribute("action",L);this._formNode.setAttribute("method","POST");this._formNode.setAttribute("target",Q);if(YAHOO.env.ua.ie&&!M){this._formNode.setAttribute("encoding",R);}else{this._formNode.setAttribute("enctype",R);}if(J){U=this.appendPostData(J);}this._formNode.submit();this.startEvent.fire(K,S);if(K.startEvent){K.startEvent.fire(K,S);}if(V&&V.timeout){this._timeOut[K.tId]=window.setTimeout(function(){W.abort(K,V,true);},V.timeout);}if(U&&U.length>0){for(P=0;P<U.length;P++){this._formNode.removeChild(U[P]);}}for(I in H){if(YAHOO.lang.hasOwnProperty(H,I)){if(H[I]){this._formNode.setAttribute(I,H[I]);}else{this._formNode.removeAttribute(I);}}}this.resetFormState();N=function(){if(V&&V.timeout){window.clearTimeout(W._timeOut[K.tId]);delete W._timeOut[K.tId];}W.completeEvent.fire(K,S);if(K.completeEvent){K.completeEvent.fire(K,S);
}O={tId:K.tId,argument:V.argument};try{O.responseText=T.contentWindow.document.body?T.contentWindow.document.body.innerHTML:T.contentWindow.document.documentElement.textContent;O.responseXML=T.contentWindow.document.XMLDocument?T.contentWindow.document.XMLDocument:T.contentWindow.document;}catch(X){}if(V&&V.upload){if(!V.scope){V.upload(O);}else{V.upload.apply(V.scope,[O]);}}W.uploadEvent.fire(O);if(K.uploadEvent){K.uploadEvent.fire(O);}F.removeListener(T,"load",N);setTimeout(function(){document.body.removeChild(T);W.releaseObject(K);},100);};F.addListener(T,"load",N);}D.setForm=G;D.resetFormState=C;D.createFrame=B;D.appendPostData=E;D.uploadFile=A;})();YAHOO.register("connection",YAHOO.util.Connect,{version:"2.8.0r4",build:"2449"});// End of File include/javascript/yui/build/connection/connection-min.js
                                
/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
if(!YAHOO.util.DragDropMgr){YAHOO.util.DragDropMgr=function(){var A=YAHOO.util.Event,B=YAHOO.util.Dom;return{useShim:false,_shimActive:false,_shimState:false,_debugShim:false,_createShim:function(){var C=document.createElement("div");C.id="yui-ddm-shim";if(document.body.firstChild){document.body.insertBefore(C,document.body.firstChild);}else{document.body.appendChild(C);}C.style.display="none";C.style.backgroundColor="red";C.style.position="absolute";C.style.zIndex="99999";B.setStyle(C,"opacity","0");this._shim=C;A.on(C,"mouseup",this.handleMouseUp,this,true);A.on(C,"mousemove",this.handleMouseMove,this,true);A.on(window,"scroll",this._sizeShim,this,true);},_sizeShim:function(){if(this._shimActive){var C=this._shim;C.style.height=B.getDocumentHeight()+"px";C.style.width=B.getDocumentWidth()+"px";C.style.top="0";C.style.left="0";}},_activateShim:function(){if(this.useShim){if(!this._shim){this._createShim();}this._shimActive=true;var C=this._shim,D="0";if(this._debugShim){D=".5";}B.setStyle(C,"opacity",D);this._sizeShim();C.style.display="block";}},_deactivateShim:function(){this._shim.style.display="none";this._shimActive=false;},_shim:null,ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initialized:false,locked:false,interactionInfo:null,init:function(){this.initialized=true;},POINT:0,INTERSECT:1,STRICT_INTERSECT:2,mode:0,_execOnAll:function(E,D){for(var F in this.ids){for(var C in this.ids[F]){var G=this.ids[F][C];if(!this.isTypeOfDD(G)){continue;}G[E].apply(G,D);}}},_onLoad:function(){this.init();A.on(document,"mouseup",this.handleMouseUp,this,true);A.on(document,"mousemove",this.handleMouseMove,this,true);A.on(window,"unload",this._onUnload,this,true);A.on(window,"resize",this._onResize,this,true);},_onResize:function(C){this._execOnAll("resetConstraints",[]);},lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isLocked:function(){return this.locked;},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:1000,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,fromTimeout:false,regDragDrop:function(D,C){if(!this.initialized){this.init();}if(!this.ids[C]){this.ids[C]={};}this.ids[C][D.id]=D;},removeDDFromGroup:function(E,C){if(!this.ids[C]){this.ids[C]={};}var D=this.ids[C];if(D&&D[E.id]){delete D[E.id];}},_remove:function(E){for(var D in E.groups){if(D){var C=this.ids[D];if(C&&C[E.id]){delete C[E.id];}}}delete this.handleIds[E.id];},regHandle:function(D,C){if(!this.handleIds[D]){this.handleIds[D]={};}this.handleIds[D][C]=C;},isDragDrop:function(C){return(this.getDDById(C))?true:false;},getRelated:function(H,D){var G=[];for(var F in H.groups){for(var E in this.ids[F]){var C=this.ids[F][E];if(!this.isTypeOfDD(C)){continue;}if(!D||C.isTarget){G[G.length]=C;}}}return G;},isLegalTarget:function(G,F){var D=this.getRelated(G,true);for(var E=0,C=D.length;E<C;++E){if(D[E].id==F.id){return true;}}return false;},isTypeOfDD:function(C){return(C&&C.__ygDragDrop);},isHandle:function(D,C){return(this.handleIds[D]&&this.handleIds[D][C]);},getDDById:function(D){for(var C in this.ids){if(this.ids[C][D]){return this.ids[C][D];}}return null;},handleMouseDown:function(E,D){this.currentTarget=YAHOO.util.Event.getTarget(E);this.dragCurrent=D;var C=D.getEl();this.startX=YAHOO.util.Event.getPageX(E);this.startY=YAHOO.util.Event.getPageY(E);this.deltaX=this.startX-C.offsetLeft;this.deltaY=this.startY-C.offsetTop;this.dragThreshMet=false;this.clickTimeout=setTimeout(function(){var F=YAHOO.util.DDM;F.startDrag(F.startX,F.startY);F.fromTimeout=true;},this.clickTimeThresh);},startDrag:function(C,E){if(this.dragCurrent&&this.dragCurrent.useShim){this._shimState=this.useShim;this.useShim=true;}this._activateShim();clearTimeout(this.clickTimeout);var D=this.dragCurrent;if(D&&D.events.b4StartDrag){D.b4StartDrag(C,E);D.fireEvent("b4StartDragEvent",{x:C,y:E});}if(D&&D.events.startDrag){D.startDrag(C,E);D.fireEvent("startDragEvent",{x:C,y:E});}this.dragThreshMet=true;},handleMouseUp:function(C){if(this.dragCurrent){clearTimeout(this.clickTimeout);if(this.dragThreshMet){if(this.fromTimeout){this.fromTimeout=false;this.handleMouseMove(C);}this.fromTimeout=false;this.fireEvents(C,true);}else{}this.stopDrag(C);this.stopEvent(C);}},stopEvent:function(C){if(this.stopPropagation){YAHOO.util.Event.stopPropagation(C);}if(this.preventDefault){YAHOO.util.Event.preventDefault(C);}},stopDrag:function(E,D){var C=this.dragCurrent;if(C&&!D){if(this.dragThreshMet){if(C.events.b4EndDrag){C.b4EndDrag(E);C.fireEvent("b4EndDragEvent",{e:E});}if(C.events.endDrag){C.endDrag(E);C.fireEvent("endDragEvent",{e:E});}}if(C.events.mouseUp){C.onMouseUp(E);C.fireEvent("mouseUpEvent",{e:E});}}if(this._shimActive){this._deactivateShim();if(this.dragCurrent&&this.dragCurrent.useShim){this.useShim=this._shimState;this._shimState=false;}}this.dragCurrent=null;this.dragOvers={};},handleMouseMove:function(F){var C=this.dragCurrent;if(C){if(YAHOO.util.Event.isIE&&!F.button){this.stopEvent(F);return this.handleMouseUp(F);}else{if(F.clientX<0||F.clientY<0){}}if(!this.dragThreshMet){var E=Math.abs(this.startX-YAHOO.util.Event.getPageX(F));var D=Math.abs(this.startY-YAHOO.util.Event.getPageY(F));if(E>this.clickPixelThresh||D>this.clickPixelThresh){this.startDrag(this.startX,this.startY);}}if(this.dragThreshMet){if(C&&C.events.b4Drag){C.b4Drag(F);C.fireEvent("b4DragEvent",{e:F});}if(C&&C.events.drag){C.onDrag(F);C.fireEvent("dragEvent",{e:F});}if(C){this.fireEvents(F,false);}}this.stopEvent(F);}},fireEvents:function(V,L){var a=this.dragCurrent;if(!a||a.isLocked()||a.dragOnly){return;}var N=YAHOO.util.Event.getPageX(V),M=YAHOO.util.Event.getPageY(V),P=new YAHOO.util.Point(N,M),K=a.getTargetCoord(P.x,P.y),F=a.getDragEl(),E=["out","over","drop","enter"],U=new YAHOO.util.Region(K.y,K.x+F.offsetWidth,K.y+F.offsetHeight,K.x),I=[],D={},Q=[],c={outEvts:[],overEvts:[],dropEvts:[],enterEvts:[]};for(var S in this.dragOvers){var d=this.dragOvers[S];if(!this.isTypeOfDD(d)){continue;
}if(!this.isOverTarget(P,d,this.mode,U)){c.outEvts.push(d);}I[S]=true;delete this.dragOvers[S];}for(var R in a.groups){if("string"!=typeof R){continue;}for(S in this.ids[R]){var G=this.ids[R][S];if(!this.isTypeOfDD(G)){continue;}if(G.isTarget&&!G.isLocked()&&G!=a){if(this.isOverTarget(P,G,this.mode,U)){D[R]=true;if(L){c.dropEvts.push(G);}else{if(!I[G.id]){c.enterEvts.push(G);}else{c.overEvts.push(G);}this.dragOvers[G.id]=G;}}}}}this.interactionInfo={out:c.outEvts,enter:c.enterEvts,over:c.overEvts,drop:c.dropEvts,point:P,draggedRegion:U,sourceRegion:this.locationCache[a.id],validDrop:L};for(var C in D){Q.push(C);}if(L&&!c.dropEvts.length){this.interactionInfo.validDrop=false;if(a.events.invalidDrop){a.onInvalidDrop(V);a.fireEvent("invalidDropEvent",{e:V});}}for(S=0;S<E.length;S++){var Y=null;if(c[E[S]+"Evts"]){Y=c[E[S]+"Evts"];}if(Y&&Y.length){var H=E[S].charAt(0).toUpperCase()+E[S].substr(1),X="onDrag"+H,J="b4Drag"+H,O="drag"+H+"Event",W="drag"+H;if(this.mode){if(a.events[J]){a[J](V,Y,Q);a.fireEvent(J+"Event",{event:V,info:Y,group:Q});}if(a.events[W]){a[X](V,Y,Q);a.fireEvent(O,{event:V,info:Y,group:Q});}}else{for(var Z=0,T=Y.length;Z<T;++Z){if(a.events[J]){a[J](V,Y[Z].id,Q[0]);a.fireEvent(J+"Event",{event:V,info:Y[Z].id,group:Q[0]});}if(a.events[W]){a[X](V,Y[Z].id,Q[0]);a.fireEvent(O,{event:V,info:Y[Z].id,group:Q[0]});}}}}}},getBestMatch:function(E){var G=null;var D=E.length;if(D==1){G=E[0];}else{for(var F=0;F<D;++F){var C=E[F];if(this.mode==this.INTERSECT&&C.cursorIsOver){G=C;break;}else{if(!G||!G.overlap||(C.overlap&&G.overlap.getArea()<C.overlap.getArea())){G=C;}}}}return G;},refreshCache:function(D){var F=D||this.ids;for(var C in F){if("string"!=typeof C){continue;}for(var E in this.ids[C]){var G=this.ids[C][E];if(this.isTypeOfDD(G)){var H=this.getLocation(G);if(H){this.locationCache[G.id]=H;}else{delete this.locationCache[G.id];}}}}},verifyEl:function(D){try{if(D){var C=D.offsetParent;if(C){return true;}}}catch(E){}return false;},getLocation:function(H){if(!this.isTypeOfDD(H)){return null;}var F=H.getEl(),K,E,D,M,L,N,C,J,G;try{K=YAHOO.util.Dom.getXY(F);}catch(I){}if(!K){return null;}E=K[0];D=E+F.offsetWidth;M=K[1];L=M+F.offsetHeight;N=M-H.padding[0];C=D+H.padding[1];J=L+H.padding[2];G=E-H.padding[3];return new YAHOO.util.Region(N,C,J,G);},isOverTarget:function(K,C,E,F){var G=this.locationCache[C.id];if(!G||!this.useCache){G=this.getLocation(C);this.locationCache[C.id]=G;}if(!G){return false;}C.cursorIsOver=G.contains(K);var J=this.dragCurrent;if(!J||(!E&&!J.constrainX&&!J.constrainY)){return C.cursorIsOver;}C.overlap=null;if(!F){var H=J.getTargetCoord(K.x,K.y);var D=J.getDragEl();F=new YAHOO.util.Region(H.y,H.x+D.offsetWidth,H.y+D.offsetHeight,H.x);}var I=F.intersect(G);if(I){C.overlap=I;return(E)?true:C.cursorIsOver;}else{return false;}},_onUnload:function(D,C){this.unregAll();},unregAll:function(){if(this.dragCurrent){this.stopDrag();this.dragCurrent=null;}this._execOnAll("unreg",[]);this.ids={};},elementCache:{},getElWrapper:function(D){var C=this.elementCache[D];if(!C||!C.el){C=this.elementCache[D]=new this.ElementWrapper(YAHOO.util.Dom.get(D));}return C;},getElement:function(C){return YAHOO.util.Dom.get(C);},getCss:function(D){var C=YAHOO.util.Dom.get(D);return(C)?C.style:null;},ElementWrapper:function(C){this.el=C||null;this.id=this.el&&C.id;this.css=this.el&&C.style;},getPosX:function(C){return YAHOO.util.Dom.getX(C);},getPosY:function(C){return YAHOO.util.Dom.getY(C);},swapNode:function(E,C){if(E.swapNode){E.swapNode(C);}else{var F=C.parentNode;var D=C.nextSibling;if(D==E){F.insertBefore(E,C);}else{if(C==E.nextSibling){F.insertBefore(C,E);}else{E.parentNode.replaceChild(C,E);F.insertBefore(E,D);}}}},getScroll:function(){var E,C,F=document.documentElement,D=document.body;if(F&&(F.scrollTop||F.scrollLeft)){E=F.scrollTop;C=F.scrollLeft;}else{if(D){E=D.scrollTop;C=D.scrollLeft;}else{}}return{top:E,left:C};},getStyle:function(D,C){return YAHOO.util.Dom.getStyle(D,C);},getScrollTop:function(){return this.getScroll().top;},getScrollLeft:function(){return this.getScroll().left;},moveToEl:function(C,E){var D=YAHOO.util.Dom.getXY(E);YAHOO.util.Dom.setXY(C,D);},getClientHeight:function(){return YAHOO.util.Dom.getViewportHeight();},getClientWidth:function(){return YAHOO.util.Dom.getViewportWidth();},numericSort:function(D,C){return(D-C);},_timeoutCount:0,_addListeners:function(){var C=YAHOO.util.DDM;if(YAHOO.util.Event&&document){C._onLoad();}else{if(C._timeoutCount>2000){}else{setTimeout(C._addListeners,10);if(document&&document.body){C._timeoutCount+=1;}}}},handleWasClicked:function(C,E){if(this.isHandle(E,C.id)){return true;}else{var D=C.parentNode;while(D){if(this.isHandle(E,D.id)){return true;}else{D=D.parentNode;}}}return false;}};}();YAHOO.util.DDM=YAHOO.util.DragDropMgr;YAHOO.util.DDM._addListeners();}(function(){var A=YAHOO.util.Event;var B=YAHOO.util.Dom;YAHOO.util.DragDrop=function(E,C,D){if(E){this.init(E,C,D);}};YAHOO.util.DragDrop.prototype={events:null,on:function(){this.subscribe.apply(this,arguments);},id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isTarget:true,padding:null,dragOnly:false,useShim:false,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,deltaX:0,deltaY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,cursorIsOver:false,overlap:null,b4StartDrag:function(C,D){},startDrag:function(C,D){},b4Drag:function(C){},onDrag:function(C){},onDragEnter:function(C,D){},b4DragOver:function(C){},onDragOver:function(C,D){},b4DragOut:function(C){},onDragOut:function(C,D){},b4DragDrop:function(C){},onDragDrop:function(C,D){},onInvalidDrop:function(C){},b4EndDrag:function(C){},endDrag:function(C){},b4MouseDown:function(C){},onMouseDown:function(C){},onMouseUp:function(C){},onAvailable:function(){},getEl:function(){if(!this._domRef){this._domRef=B.get(this.id);
}return this._domRef;},getDragEl:function(){return B.get(this.dragElId);},init:function(F,C,D){this.initTarget(F,C,D);A.on(this._domRef||this.id,"mousedown",this.handleMouseDown,this,true);for(var E in this.events){this.createEvent(E+"Event");}},initTarget:function(E,C,D){this.config=D||{};this.events={};this.DDM=YAHOO.util.DDM;this.groups={};if(typeof E!=="string"){this._domRef=E;E=B.generateId(E);}this.id=E;this.addToGroup((C)?C:"default");this.handleElId=E;A.onAvailable(E,this.handleOnAvailable,this,true);this.setDragElId(E);this.invalidHandleTypes={A:"A"};this.invalidHandleIds={};this.invalidHandleClasses=[];this.applyConfig();},applyConfig:function(){this.events={mouseDown:true,b4MouseDown:true,mouseUp:true,b4StartDrag:true,startDrag:true,b4EndDrag:true,endDrag:true,drag:true,b4Drag:true,invalidDrop:true,b4DragOut:true,dragOut:true,dragEnter:true,b4DragOver:true,dragOver:true,b4DragDrop:true,dragDrop:true};if(this.config.events){for(var C in this.config.events){if(this.config.events[C]===false){this.events[C]=false;}}}this.padding=this.config.padding||[0,0,0,0];this.isTarget=(this.config.isTarget!==false);this.maintainOffset=(this.config.maintainOffset);this.primaryButtonOnly=(this.config.primaryButtonOnly!==false);this.dragOnly=((this.config.dragOnly===true)?true:false);this.useShim=((this.config.useShim===true)?true:false);},handleOnAvailable:function(){this.available=true;this.resetConstraints();this.onAvailable();},setPadding:function(E,C,F,D){if(!C&&0!==C){this.padding=[E,E,E,E];}else{if(!F&&0!==F){this.padding=[E,C,E,C];}else{this.padding=[E,C,F,D];}}},setInitPosition:function(F,E){var G=this.getEl();if(!this.DDM.verifyEl(G)){if(G&&G.style&&(G.style.display=="none")){}else{}return;}var D=F||0;var C=E||0;var H=B.getXY(G);this.initPageX=H[0]-D;this.initPageY=H[1]-C;this.lastPageX=H[0];this.lastPageY=H[1];this.setStartPosition(H);},setStartPosition:function(D){var C=D||B.getXY(this.getEl());this.deltaSetXY=null;this.startPageX=C[0];this.startPageY=C[1];},addToGroup:function(C){this.groups[C]=true;this.DDM.regDragDrop(this,C);},removeFromGroup:function(C){if(this.groups[C]){delete this.groups[C];}this.DDM.removeDDFromGroup(this,C);},setDragElId:function(C){this.dragElId=C;},setHandleElId:function(C){if(typeof C!=="string"){C=B.generateId(C);}this.handleElId=C;this.DDM.regHandle(this.id,C);},setOuterHandleElId:function(C){if(typeof C!=="string"){C=B.generateId(C);}A.on(C,"mousedown",this.handleMouseDown,this,true);this.setHandleElId(C);this.hasOuterHandles=true;},unreg:function(){A.removeListener(this.id,"mousedown",this.handleMouseDown);this._domRef=null;this.DDM._remove(this);},isLocked:function(){return(this.DDM.isLocked()||this.locked);},handleMouseDown:function(J,I){var D=J.which||J.button;if(this.primaryButtonOnly&&D>1){return;}if(this.isLocked()){return;}var C=this.b4MouseDown(J),F=true;if(this.events.b4MouseDown){F=this.fireEvent("b4MouseDownEvent",J);}var E=this.onMouseDown(J),H=true;if(this.events.mouseDown){H=this.fireEvent("mouseDownEvent",J);}if((C===false)||(E===false)||(F===false)||(H===false)){return;}this.DDM.refreshCache(this.groups);var G=new YAHOO.util.Point(A.getPageX(J),A.getPageY(J));if(!this.hasOuterHandles&&!this.DDM.isOverTarget(G,this)){}else{if(this.clickValidator(J)){this.setStartPosition();this.DDM.handleMouseDown(J,this);this.DDM.stopEvent(J);}else{}}},clickValidator:function(D){var C=YAHOO.util.Event.getTarget(D);return(this.isValidHandleChild(C)&&(this.id==this.handleElId||this.DDM.handleWasClicked(C,this.id)));},getTargetCoord:function(E,D){var C=E-this.deltaX;var F=D-this.deltaY;if(this.constrainX){if(C<this.minX){C=this.minX;}if(C>this.maxX){C=this.maxX;}}if(this.constrainY){if(F<this.minY){F=this.minY;}if(F>this.maxY){F=this.maxY;}}C=this.getTick(C,this.xTicks);F=this.getTick(F,this.yTicks);return{x:C,y:F};},addInvalidHandleType:function(C){var D=C.toUpperCase();this.invalidHandleTypes[D]=D;},addInvalidHandleId:function(C){if(typeof C!=="string"){C=B.generateId(C);}this.invalidHandleIds[C]=C;},addInvalidHandleClass:function(C){this.invalidHandleClasses.push(C);},removeInvalidHandleType:function(C){var D=C.toUpperCase();delete this.invalidHandleTypes[D];},removeInvalidHandleId:function(C){if(typeof C!=="string"){C=B.generateId(C);}delete this.invalidHandleIds[C];},removeInvalidHandleClass:function(D){for(var E=0,C=this.invalidHandleClasses.length;E<C;++E){if(this.invalidHandleClasses[E]==D){delete this.invalidHandleClasses[E];}}},isValidHandleChild:function(F){var E=true;var H;try{H=F.nodeName.toUpperCase();}catch(G){H=F.nodeName;}E=E&&!this.invalidHandleTypes[H];E=E&&!this.invalidHandleIds[F.id];for(var D=0,C=this.invalidHandleClasses.length;E&&D<C;++D){E=!B.hasClass(F,this.invalidHandleClasses[D]);}return E;},setXTicks:function(F,C){this.xTicks=[];this.xTickSize=C;var E={};for(var D=this.initPageX;D>=this.minX;D=D-C){if(!E[D]){this.xTicks[this.xTicks.length]=D;E[D]=true;}}for(D=this.initPageX;D<=this.maxX;D=D+C){if(!E[D]){this.xTicks[this.xTicks.length]=D;E[D]=true;}}this.xTicks.sort(this.DDM.numericSort);},setYTicks:function(F,C){this.yTicks=[];this.yTickSize=C;var E={};for(var D=this.initPageY;D>=this.minY;D=D-C){if(!E[D]){this.yTicks[this.yTicks.length]=D;E[D]=true;}}for(D=this.initPageY;D<=this.maxY;D=D+C){if(!E[D]){this.yTicks[this.yTicks.length]=D;E[D]=true;}}this.yTicks.sort(this.DDM.numericSort);},setXConstraint:function(E,D,C){this.leftConstraint=parseInt(E,10);this.rightConstraint=parseInt(D,10);this.minX=this.initPageX-this.leftConstraint;this.maxX=this.initPageX+this.rightConstraint;if(C){this.setXTicks(this.initPageX,C);}this.constrainX=true;},clearConstraints:function(){this.constrainX=false;this.constrainY=false;this.clearTicks();},clearTicks:function(){this.xTicks=null;this.yTicks=null;this.xTickSize=0;this.yTickSize=0;},setYConstraint:function(C,E,D){this.topConstraint=parseInt(C,10);this.bottomConstraint=parseInt(E,10);this.minY=this.initPageY-this.topConstraint;this.maxY=this.initPageY+this.bottomConstraint;if(D){this.setYTicks(this.initPageY,D);
}this.constrainY=true;},resetConstraints:function(){if(this.initPageX||this.initPageX===0){var D=(this.maintainOffset)?this.lastPageX-this.initPageX:0;var C=(this.maintainOffset)?this.lastPageY-this.initPageY:0;this.setInitPosition(D,C);}else{this.setInitPosition();}if(this.constrainX){this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize);}if(this.constrainY){this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize);}},getTick:function(I,F){if(!F){return I;}else{if(F[0]>=I){return F[0];}else{for(var D=0,C=F.length;D<C;++D){var E=D+1;if(F[E]&&F[E]>=I){var H=I-F[D];var G=F[E]-I;return(G>H)?F[D]:F[E];}}return F[F.length-1];}}},toString:function(){return("DragDrop "+this.id);}};YAHOO.augment(YAHOO.util.DragDrop,YAHOO.util.EventProvider);})();YAHOO.util.DD=function(C,A,B){if(C){this.init(C,A,B);}};YAHOO.extend(YAHOO.util.DD,YAHOO.util.DragDrop,{scroll:true,autoOffset:function(C,B){var A=C-this.startPageX;var D=B-this.startPageY;this.setDelta(A,D);},setDelta:function(B,A){this.deltaX=B;this.deltaY=A;},setDragElPos:function(C,B){var A=this.getDragEl();this.alignElWithMouse(A,C,B);},alignElWithMouse:function(C,G,F){var E=this.getTargetCoord(G,F);if(!this.deltaSetXY){var H=[E.x,E.y];YAHOO.util.Dom.setXY(C,H);var D=parseInt(YAHOO.util.Dom.getStyle(C,"left"),10);var B=parseInt(YAHOO.util.Dom.getStyle(C,"top"),10);this.deltaSetXY=[D-E.x,B-E.y];}else{YAHOO.util.Dom.setStyle(C,"left",(E.x+this.deltaSetXY[0])+"px");YAHOO.util.Dom.setStyle(C,"top",(E.y+this.deltaSetXY[1])+"px");}this.cachePosition(E.x,E.y);var A=this;setTimeout(function(){A.autoScroll.call(A,E.x,E.y,C.offsetHeight,C.offsetWidth);},0);},cachePosition:function(B,A){if(B){this.lastPageX=B;this.lastPageY=A;}else{var C=YAHOO.util.Dom.getXY(this.getEl());this.lastPageX=C[0];this.lastPageY=C[1];}},autoScroll:function(J,I,E,K){if(this.scroll){var L=this.DDM.getClientHeight();var B=this.DDM.getClientWidth();var N=this.DDM.getScrollTop();var D=this.DDM.getScrollLeft();var H=E+I;var M=K+J;var G=(L+N-I-this.deltaY);var F=(B+D-J-this.deltaX);var C=40;var A=(document.all)?80:30;if(H>L&&G<C){window.scrollTo(D,N+A);}if(I<N&&N>0&&I-N<C){window.scrollTo(D,N-A);}if(M>B&&F<C){window.scrollTo(D+A,N);}if(J<D&&D>0&&J-D<C){window.scrollTo(D-A,N);}}},applyConfig:function(){YAHOO.util.DD.superclass.applyConfig.call(this);this.scroll=(this.config.scroll!==false);},b4MouseDown:function(A){this.setStartPosition();this.autoOffset(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A));},b4Drag:function(A){this.setDragElPos(YAHOO.util.Event.getPageX(A),YAHOO.util.Event.getPageY(A));},toString:function(){return("DD "+this.id);}});YAHOO.util.DDProxy=function(C,A,B){if(C){this.init(C,A,B);this.initFrame();}};YAHOO.util.DDProxy.dragElId="ygddfdiv";YAHOO.extend(YAHOO.util.DDProxy,YAHOO.util.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){var B=this,A=document.body;if(!A||!A.firstChild){setTimeout(function(){B.createFrame();},50);return;}var F=this.getDragEl(),E=YAHOO.util.Dom;if(!F){F=document.createElement("div");F.id=this.dragElId;var D=F.style;D.position="absolute";D.visibility="hidden";D.cursor="move";D.border="2px solid #aaa";D.zIndex=999;D.height="25px";D.width="25px";var C=document.createElement("div");E.setStyle(C,"height","100%");E.setStyle(C,"width","100%");E.setStyle(C,"background-color","#ccc");E.setStyle(C,"opacity","0");F.appendChild(C);A.insertBefore(F,A.firstChild);}},initFrame:function(){this.createFrame();},applyConfig:function(){YAHOO.util.DDProxy.superclass.applyConfig.call(this);this.resizeFrame=(this.config.resizeFrame!==false);this.centerFrame=(this.config.centerFrame);this.setDragElId(this.config.dragElId||YAHOO.util.DDProxy.dragElId);},showFrame:function(E,D){var C=this.getEl();var A=this.getDragEl();var B=A.style;this._resizeProxy();if(this.centerFrame){this.setDelta(Math.round(parseInt(B.width,10)/2),Math.round(parseInt(B.height,10)/2));}this.setDragElPos(E,D);YAHOO.util.Dom.setStyle(A,"visibility","visible");},_resizeProxy:function(){if(this.resizeFrame){var H=YAHOO.util.Dom;var B=this.getEl();var C=this.getDragEl();var G=parseInt(H.getStyle(C,"borderTopWidth"),10);var I=parseInt(H.getStyle(C,"borderRightWidth"),10);var F=parseInt(H.getStyle(C,"borderBottomWidth"),10);var D=parseInt(H.getStyle(C,"borderLeftWidth"),10);if(isNaN(G)){G=0;}if(isNaN(I)){I=0;}if(isNaN(F)){F=0;}if(isNaN(D)){D=0;}var E=Math.max(0,B.offsetWidth-I-D);var A=Math.max(0,B.offsetHeight-G-F);H.setStyle(C,"width",E+"px");H.setStyle(C,"height",A+"px");}},b4MouseDown:function(B){this.setStartPosition();var A=YAHOO.util.Event.getPageX(B);var C=YAHOO.util.Event.getPageY(B);this.autoOffset(A,C);},b4StartDrag:function(A,B){this.showFrame(A,B);},b4EndDrag:function(A){YAHOO.util.Dom.setStyle(this.getDragEl(),"visibility","hidden");},endDrag:function(D){var C=YAHOO.util.Dom;var B=this.getEl();var A=this.getDragEl();C.setStyle(A,"visibility","");C.setStyle(B,"visibility","hidden");YAHOO.util.DDM.moveToEl(B,A);C.setStyle(A,"visibility","hidden");C.setStyle(B,"visibility","");},toString:function(){return("DDProxy "+this.id);}});YAHOO.util.DDTarget=function(C,A,B){if(C){this.initTarget(C,A,B);}};YAHOO.extend(YAHOO.util.DDTarget,YAHOO.util.DragDrop,{toString:function(){return("DDTarget "+this.id);}});YAHOO.register("dragdrop",YAHOO.util.DragDropMgr,{version:"2.8.0r4",build:"2449"});// End of File include/javascript/yui/build/dragdrop/dragdrop-min.js
                                
/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
(function(){YAHOO.util.Config=function(D){if(D){this.init(D);}};var B=YAHOO.lang,C=YAHOO.util.CustomEvent,A=YAHOO.util.Config;A.CONFIG_CHANGED_EVENT="configChanged";A.BOOLEAN_TYPE="boolean";A.prototype={owner:null,queueInProgress:false,config:null,initialConfig:null,eventQueue:null,configChangedEvent:null,init:function(D){this.owner=D;this.configChangedEvent=this.createEvent(A.CONFIG_CHANGED_EVENT);this.configChangedEvent.signature=C.LIST;this.queueInProgress=false;this.config={};this.initialConfig={};this.eventQueue=[];},checkBoolean:function(D){return(typeof D==A.BOOLEAN_TYPE);},checkNumber:function(D){return(!isNaN(D));},fireEvent:function(D,F){var E=this.config[D];if(E&&E.event){E.event.fire(F);}},addProperty:function(E,D){E=E.toLowerCase();this.config[E]=D;D.event=this.createEvent(E,{scope:this.owner});D.event.signature=C.LIST;D.key=E;if(D.handler){D.event.subscribe(D.handler,this.owner);}this.setProperty(E,D.value,true);if(!D.suppressEvent){this.queueProperty(E,D.value);}},getConfig:function(){var D={},F=this.config,G,E;for(G in F){if(B.hasOwnProperty(F,G)){E=F[G];if(E&&E.event){D[G]=E.value;}}}return D;},getProperty:function(D){var E=this.config[D.toLowerCase()];if(E&&E.event){return E.value;}else{return undefined;}},resetProperty:function(D){D=D.toLowerCase();var E=this.config[D];if(E&&E.event){if(this.initialConfig[D]&&!B.isUndefined(this.initialConfig[D])){this.setProperty(D,this.initialConfig[D]);return true;}}else{return false;}},setProperty:function(E,G,D){var F;E=E.toLowerCase();if(this.queueInProgress&&!D){this.queueProperty(E,G);return true;}else{F=this.config[E];if(F&&F.event){if(F.validator&&!F.validator(G)){return false;}else{F.value=G;if(!D){this.fireEvent(E,G);this.configChangedEvent.fire([E,G]);}return true;}}else{return false;}}},queueProperty:function(S,P){S=S.toLowerCase();var R=this.config[S],K=false,J,G,H,I,O,Q,F,M,N,D,L,T,E;if(R&&R.event){if(!B.isUndefined(P)&&R.validator&&!R.validator(P)){return false;}else{if(!B.isUndefined(P)){R.value=P;}else{P=R.value;}K=false;J=this.eventQueue.length;for(L=0;L<J;L++){G=this.eventQueue[L];if(G){H=G[0];I=G[1];if(H==S){this.eventQueue[L]=null;this.eventQueue.push([S,(!B.isUndefined(P)?P:I)]);K=true;break;}}}if(!K&&!B.isUndefined(P)){this.eventQueue.push([S,P]);}}if(R.supercedes){O=R.supercedes.length;for(T=0;T<O;T++){Q=R.supercedes[T];F=this.eventQueue.length;for(E=0;E<F;E++){M=this.eventQueue[E];if(M){N=M[0];D=M[1];if(N==Q.toLowerCase()){this.eventQueue.push([N,D]);this.eventQueue[E]=null;break;}}}}}return true;}else{return false;}},refireEvent:function(D){D=D.toLowerCase();var E=this.config[D];if(E&&E.event&&!B.isUndefined(E.value)){if(this.queueInProgress){this.queueProperty(D);}else{this.fireEvent(D,E.value);}}},applyConfig:function(D,G){var F,E;if(G){E={};for(F in D){if(B.hasOwnProperty(D,F)){E[F.toLowerCase()]=D[F];}}this.initialConfig=E;}for(F in D){if(B.hasOwnProperty(D,F)){this.queueProperty(F,D[F]);}}},refresh:function(){var D;for(D in this.config){if(B.hasOwnProperty(this.config,D)){this.refireEvent(D);}}},fireQueue:function(){var E,H,D,G,F;this.queueInProgress=true;for(E=0;E<this.eventQueue.length;E++){H=this.eventQueue[E];if(H){D=H[0];G=H[1];F=this.config[D];F.value=G;this.eventQueue[E]=null;this.fireEvent(D,G);}}this.queueInProgress=false;this.eventQueue=[];},subscribeToConfigEvent:function(D,E,G,H){var F=this.config[D.toLowerCase()];if(F&&F.event){if(!A.alreadySubscribed(F.event,E,G)){F.event.subscribe(E,G,H);}return true;}else{return false;}},unsubscribeFromConfigEvent:function(D,E,G){var F=this.config[D.toLowerCase()];if(F&&F.event){return F.event.unsubscribe(E,G);}else{return false;}},toString:function(){var D="Config";if(this.owner){D+=" ["+this.owner.toString()+"]";}return D;},outputEventQueue:function(){var D="",G,E,F=this.eventQueue.length;for(E=0;E<F;E++){G=this.eventQueue[E];if(G){D+=G[0]+"="+G[1]+", ";}}return D;},destroy:function(){var E=this.config,D,F;for(D in E){if(B.hasOwnProperty(E,D)){F=E[D];F.event.unsubscribeAll();F.event=null;}}this.configChangedEvent.unsubscribeAll();this.configChangedEvent=null;this.owner=null;this.config=null;this.initialConfig=null;this.eventQueue=null;}};A.alreadySubscribed=function(E,H,I){var F=E.subscribers.length,D,G;if(F>0){G=F-1;do{D=E.subscribers[G];if(D&&D.obj==I&&D.fn==H){return true;}}while(G--);}return false;};YAHOO.lang.augmentProto(A,YAHOO.util.EventProvider);}());(function(){YAHOO.widget.Module=function(R,Q){if(R){this.init(R,Q);}else{}};var F=YAHOO.util.Dom,D=YAHOO.util.Config,N=YAHOO.util.Event,M=YAHOO.util.CustomEvent,G=YAHOO.widget.Module,I=YAHOO.env.ua,H,P,O,E,A={"BEFORE_INIT":"beforeInit","INIT":"init","APPEND":"append","BEFORE_RENDER":"beforeRender","RENDER":"render","CHANGE_HEADER":"changeHeader","CHANGE_BODY":"changeBody","CHANGE_FOOTER":"changeFooter","CHANGE_CONTENT":"changeContent","DESTROY":"destroy","BEFORE_SHOW":"beforeShow","SHOW":"show","BEFORE_HIDE":"beforeHide","HIDE":"hide"},J={"VISIBLE":{key:"visible",value:true,validator:YAHOO.lang.isBoolean},"EFFECT":{key:"effect",suppressEvent:true,supercedes:["visible"]},"MONITOR_RESIZE":{key:"monitorresize",value:true},"APPEND_TO_DOCUMENT_BODY":{key:"appendtodocumentbody",value:false}};G.IMG_ROOT=null;G.IMG_ROOT_SSL=null;G.CSS_MODULE="yui-module";G.CSS_HEADER="hd";G.CSS_BODY="bd";G.CSS_FOOTER="ft";G.RESIZE_MONITOR_SECURE_URL="javascript:false;";G.RESIZE_MONITOR_BUFFER=1;G.textResizeEvent=new M("textResize");G.forceDocumentRedraw=function(){var Q=document.documentElement;if(Q){Q.className+=" ";Q.className=YAHOO.lang.trim(Q.className);}};function L(){if(!H){H=document.createElement("div");H.innerHTML=('<div class="'+G.CSS_HEADER+'"></div>'+'<div class="'+G.CSS_BODY+'"></div><div class="'+G.CSS_FOOTER+'"></div>');P=H.firstChild;O=P.nextSibling;E=O.nextSibling;}return H;}function K(){if(!P){L();}return(P.cloneNode(false));}function B(){if(!O){L();}return(O.cloneNode(false));}function C(){if(!E){L();}return(E.cloneNode(false));}G.prototype={constructor:G,element:null,header:null,body:null,footer:null,id:null,imageRoot:G.IMG_ROOT,initEvents:function(){var Q=M.LIST;
this.beforeInitEvent=this.createEvent(A.BEFORE_INIT);this.beforeInitEvent.signature=Q;this.initEvent=this.createEvent(A.INIT);this.initEvent.signature=Q;this.appendEvent=this.createEvent(A.APPEND);this.appendEvent.signature=Q;this.beforeRenderEvent=this.createEvent(A.BEFORE_RENDER);this.beforeRenderEvent.signature=Q;this.renderEvent=this.createEvent(A.RENDER);this.renderEvent.signature=Q;this.changeHeaderEvent=this.createEvent(A.CHANGE_HEADER);this.changeHeaderEvent.signature=Q;this.changeBodyEvent=this.createEvent(A.CHANGE_BODY);this.changeBodyEvent.signature=Q;this.changeFooterEvent=this.createEvent(A.CHANGE_FOOTER);this.changeFooterEvent.signature=Q;this.changeContentEvent=this.createEvent(A.CHANGE_CONTENT);this.changeContentEvent.signature=Q;this.destroyEvent=this.createEvent(A.DESTROY);this.destroyEvent.signature=Q;this.beforeShowEvent=this.createEvent(A.BEFORE_SHOW);this.beforeShowEvent.signature=Q;this.showEvent=this.createEvent(A.SHOW);this.showEvent.signature=Q;this.beforeHideEvent=this.createEvent(A.BEFORE_HIDE);this.beforeHideEvent.signature=Q;this.hideEvent=this.createEvent(A.HIDE);this.hideEvent.signature=Q;},platform:function(){var Q=navigator.userAgent.toLowerCase();if(Q.indexOf("windows")!=-1||Q.indexOf("win32")!=-1){return"windows";}else{if(Q.indexOf("macintosh")!=-1){return"mac";}else{return false;}}}(),browser:function(){var Q=navigator.userAgent.toLowerCase();if(Q.indexOf("opera")!=-1){return"opera";}else{if(Q.indexOf("msie 7")!=-1){return"ie7";}else{if(Q.indexOf("msie")!=-1){return"ie";}else{if(Q.indexOf("safari")!=-1){return"safari";}else{if(Q.indexOf("gecko")!=-1){return"gecko";}else{return false;}}}}}}(),isSecure:function(){if(window.location.href.toLowerCase().indexOf("https")===0){return true;}else{return false;}}(),initDefaultConfig:function(){this.cfg.addProperty(J.VISIBLE.key,{handler:this.configVisible,value:J.VISIBLE.value,validator:J.VISIBLE.validator});this.cfg.addProperty(J.EFFECT.key,{suppressEvent:J.EFFECT.suppressEvent,supercedes:J.EFFECT.supercedes});this.cfg.addProperty(J.MONITOR_RESIZE.key,{handler:this.configMonitorResize,value:J.MONITOR_RESIZE.value});this.cfg.addProperty(J.APPEND_TO_DOCUMENT_BODY.key,{value:J.APPEND_TO_DOCUMENT_BODY.value});},init:function(V,U){var S,W;this.initEvents();this.beforeInitEvent.fire(G);this.cfg=new D(this);if(this.isSecure){this.imageRoot=G.IMG_ROOT_SSL;}if(typeof V=="string"){S=V;V=document.getElementById(V);if(!V){V=(L()).cloneNode(false);V.id=S;}}this.id=F.generateId(V);this.element=V;W=this.element.firstChild;if(W){var R=false,Q=false,T=false;do{if(1==W.nodeType){if(!R&&F.hasClass(W,G.CSS_HEADER)){this.header=W;R=true;}else{if(!Q&&F.hasClass(W,G.CSS_BODY)){this.body=W;Q=true;}else{if(!T&&F.hasClass(W,G.CSS_FOOTER)){this.footer=W;T=true;}}}}}while((W=W.nextSibling));}this.initDefaultConfig();F.addClass(this.element,G.CSS_MODULE);if(U){this.cfg.applyConfig(U,true);}if(!D.alreadySubscribed(this.renderEvent,this.cfg.fireQueue,this.cfg)){this.renderEvent.subscribe(this.cfg.fireQueue,this.cfg,true);}this.initEvent.fire(G);},initResizeMonitor:function(){var R=(I.gecko&&this.platform=="windows");if(R){var Q=this;setTimeout(function(){Q._initResizeMonitor();},0);}else{this._initResizeMonitor();}},_initResizeMonitor:function(){var Q,S,U;function W(){G.textResizeEvent.fire();}if(!I.opera){S=F.get("_yuiResizeMonitor");var V=this._supportsCWResize();if(!S){S=document.createElement("iframe");if(this.isSecure&&G.RESIZE_MONITOR_SECURE_URL&&I.ie){S.src=G.RESIZE_MONITOR_SECURE_URL;}if(!V){U=["<html><head><script ",'type="text/javascript">',"window.onresize=function(){window.parent.","YAHOO.widget.Module.textResizeEvent.","fire();};<","/script></head>","<body></body></html>"].join("");S.src="data:text/html;charset=utf-8,"+encodeURIComponent(U);}S.id="_yuiResizeMonitor";S.title="Text Resize Monitor";S.style.position="absolute";S.style.visibility="hidden";var R=document.body,T=R.firstChild;if(T){R.insertBefore(S,T);}else{R.appendChild(S);}S.style.backgroundColor="transparent";S.style.borderWidth="0";S.style.width="2em";S.style.height="2em";S.style.left="0";S.style.top=(-1*(S.offsetHeight+G.RESIZE_MONITOR_BUFFER))+"px";S.style.visibility="visible";if(I.webkit){Q=S.contentWindow.document;Q.open();Q.close();}}if(S&&S.contentWindow){G.textResizeEvent.subscribe(this.onDomResize,this,true);if(!G.textResizeInitialized){if(V){if(!N.on(S.contentWindow,"resize",W)){N.on(S,"resize",W);}}G.textResizeInitialized=true;}this.resizeMonitor=S;}}},_supportsCWResize:function(){var Q=true;if(I.gecko&&I.gecko<=1.8){Q=false;}return Q;},onDomResize:function(S,R){var Q=-1*(this.resizeMonitor.offsetHeight+G.RESIZE_MONITOR_BUFFER);this.resizeMonitor.style.top=Q+"px";this.resizeMonitor.style.left="0";},setHeader:function(R){var Q=this.header||(this.header=K());if(R.nodeName){Q.innerHTML="";Q.appendChild(R);}else{Q.innerHTML=R;}if(this._rendered){this._renderHeader();}this.changeHeaderEvent.fire(R);this.changeContentEvent.fire();},appendToHeader:function(R){var Q=this.header||(this.header=K());Q.appendChild(R);this.changeHeaderEvent.fire(R);this.changeContentEvent.fire();},setBody:function(R){var Q=this.body||(this.body=B());if(R.nodeName){Q.innerHTML="";Q.appendChild(R);}else{Q.innerHTML=R;}if(this._rendered){this._renderBody();}this.changeBodyEvent.fire(R);this.changeContentEvent.fire();},appendToBody:function(R){var Q=this.body||(this.body=B());Q.appendChild(R);this.changeBodyEvent.fire(R);this.changeContentEvent.fire();},setFooter:function(R){var Q=this.footer||(this.footer=C());if(R.nodeName){Q.innerHTML="";Q.appendChild(R);}else{Q.innerHTML=R;}if(this._rendered){this._renderFooter();}this.changeFooterEvent.fire(R);this.changeContentEvent.fire();},appendToFooter:function(R){var Q=this.footer||(this.footer=C());Q.appendChild(R);this.changeFooterEvent.fire(R);this.changeContentEvent.fire();},render:function(S,Q){var T=this;function R(U){if(typeof U=="string"){U=document.getElementById(U);}if(U){T._addToParent(U,T.element);T.appendEvent.fire();}}this.beforeRenderEvent.fire();
if(!Q){Q=this.element;}if(S){R(S);}else{if(!F.inDocument(this.element)){return false;}}this._renderHeader(Q);this._renderBody(Q);this._renderFooter(Q);this._rendered=true;this.renderEvent.fire();return true;},_renderHeader:function(Q){Q=Q||this.element;if(this.header&&!F.inDocument(this.header)){var R=Q.firstChild;if(R){Q.insertBefore(this.header,R);}else{Q.appendChild(this.header);}}},_renderBody:function(Q){Q=Q||this.element;if(this.body&&!F.inDocument(this.body)){if(this.footer&&F.isAncestor(Q,this.footer)){Q.insertBefore(this.body,this.footer);}else{Q.appendChild(this.body);}}},_renderFooter:function(Q){Q=Q||this.element;if(this.footer&&!F.inDocument(this.footer)){Q.appendChild(this.footer);}},destroy:function(){var Q;if(this.element){N.purgeElement(this.element,true);Q=this.element.parentNode;}if(Q){Q.removeChild(this.element);}this.element=null;this.header=null;this.body=null;this.footer=null;G.textResizeEvent.unsubscribe(this.onDomResize,this);this.cfg.destroy();this.cfg=null;this.destroyEvent.fire();},show:function(){this.cfg.setProperty("visible",true);},hide:function(){this.cfg.setProperty("visible",false);},configVisible:function(R,Q,S){var T=Q[0];if(T){this.beforeShowEvent.fire();F.setStyle(this.element,"display","block");this.showEvent.fire();}else{this.beforeHideEvent.fire();F.setStyle(this.element,"display","none");this.hideEvent.fire();}},configMonitorResize:function(S,R,T){var Q=R[0];if(Q){this.initResizeMonitor();}else{G.textResizeEvent.unsubscribe(this.onDomResize,this,true);this.resizeMonitor=null;}},_addToParent:function(Q,R){if(!this.cfg.getProperty("appendtodocumentbody")&&Q===document.body&&Q.firstChild){Q.insertBefore(R,Q.firstChild);}else{Q.appendChild(R);}},toString:function(){return"Module "+this.id;}};YAHOO.lang.augmentProto(G,YAHOO.util.EventProvider);}());(function(){YAHOO.widget.Overlay=function(P,O){YAHOO.widget.Overlay.superclass.constructor.call(this,P,O);};var I=YAHOO.lang,M=YAHOO.util.CustomEvent,G=YAHOO.widget.Module,N=YAHOO.util.Event,F=YAHOO.util.Dom,D=YAHOO.util.Config,K=YAHOO.env.ua,B=YAHOO.widget.Overlay,H="subscribe",E="unsubscribe",C="contained",J,A={"BEFORE_MOVE":"beforeMove","MOVE":"move"},L={"X":{key:"x",validator:I.isNumber,suppressEvent:true,supercedes:["iframe"]},"Y":{key:"y",validator:I.isNumber,suppressEvent:true,supercedes:["iframe"]},"XY":{key:"xy",suppressEvent:true,supercedes:["iframe"]},"CONTEXT":{key:"context",suppressEvent:true,supercedes:["iframe"]},"FIXED_CENTER":{key:"fixedcenter",value:false,supercedes:["iframe","visible"]},"WIDTH":{key:"width",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"HEIGHT":{key:"height",suppressEvent:true,supercedes:["context","fixedcenter","iframe"]},"AUTO_FILL_HEIGHT":{key:"autofillheight",supercedes:["height"],value:"body"},"ZINDEX":{key:"zindex",value:null},"CONSTRAIN_TO_VIEWPORT":{key:"constraintoviewport",value:false,validator:I.isBoolean,supercedes:["iframe","x","y","xy"]},"IFRAME":{key:"iframe",value:(K.ie==6?true:false),validator:I.isBoolean,supercedes:["zindex"]},"PREVENT_CONTEXT_OVERLAP":{key:"preventcontextoverlap",value:false,validator:I.isBoolean,supercedes:["constraintoviewport"]}};B.IFRAME_SRC="javascript:false;";B.IFRAME_OFFSET=3;B.VIEWPORT_OFFSET=10;B.TOP_LEFT="tl";B.TOP_RIGHT="tr";B.BOTTOM_LEFT="bl";B.BOTTOM_RIGHT="br";B.PREVENT_OVERLAP_X={"tltr":true,"blbr":true,"brbl":true,"trtl":true};B.PREVENT_OVERLAP_Y={"trbr":true,"tlbl":true,"bltl":true,"brtr":true};B.CSS_OVERLAY="yui-overlay";B.CSS_HIDDEN="yui-overlay-hidden";B.CSS_IFRAME="yui-overlay-iframe";B.STD_MOD_RE=/^\s*?(body|footer|header)\s*?$/i;B.windowScrollEvent=new M("windowScroll");B.windowResizeEvent=new M("windowResize");B.windowScrollHandler=function(P){var O=N.getTarget(P);if(!O||O===window||O===window.document){if(K.ie){if(!window.scrollEnd){window.scrollEnd=-1;}clearTimeout(window.scrollEnd);window.scrollEnd=setTimeout(function(){B.windowScrollEvent.fire();},1);}else{B.windowScrollEvent.fire();}}};B.windowResizeHandler=function(O){if(K.ie){if(!window.resizeEnd){window.resizeEnd=-1;}clearTimeout(window.resizeEnd);window.resizeEnd=setTimeout(function(){B.windowResizeEvent.fire();},100);}else{B.windowResizeEvent.fire();}};B._initialized=null;if(B._initialized===null){N.on(window,"scroll",B.windowScrollHandler);N.on(window,"resize",B.windowResizeHandler);B._initialized=true;}B._TRIGGER_MAP={"windowScroll":B.windowScrollEvent,"windowResize":B.windowResizeEvent,"textResize":G.textResizeEvent};YAHOO.extend(B,G,{CONTEXT_TRIGGERS:[],init:function(P,O){B.superclass.init.call(this,P);this.beforeInitEvent.fire(B);F.addClass(this.element,B.CSS_OVERLAY);if(O){this.cfg.applyConfig(O,true);}if(this.platform=="mac"&&K.gecko){if(!D.alreadySubscribed(this.showEvent,this.showMacGeckoScrollbars,this)){this.showEvent.subscribe(this.showMacGeckoScrollbars,this,true);}if(!D.alreadySubscribed(this.hideEvent,this.hideMacGeckoScrollbars,this)){this.hideEvent.subscribe(this.hideMacGeckoScrollbars,this,true);}}this.initEvent.fire(B);},initEvents:function(){B.superclass.initEvents.call(this);var O=M.LIST;this.beforeMoveEvent=this.createEvent(A.BEFORE_MOVE);this.beforeMoveEvent.signature=O;this.moveEvent=this.createEvent(A.MOVE);this.moveEvent.signature=O;},initDefaultConfig:function(){B.superclass.initDefaultConfig.call(this);var O=this.cfg;O.addProperty(L.X.key,{handler:this.configX,validator:L.X.validator,suppressEvent:L.X.suppressEvent,supercedes:L.X.supercedes});O.addProperty(L.Y.key,{handler:this.configY,validator:L.Y.validator,suppressEvent:L.Y.suppressEvent,supercedes:L.Y.supercedes});O.addProperty(L.XY.key,{handler:this.configXY,suppressEvent:L.XY.suppressEvent,supercedes:L.XY.supercedes});O.addProperty(L.CONTEXT.key,{handler:this.configContext,suppressEvent:L.CONTEXT.suppressEvent,supercedes:L.CONTEXT.supercedes});O.addProperty(L.FIXED_CENTER.key,{handler:this.configFixedCenter,value:L.FIXED_CENTER.value,validator:L.FIXED_CENTER.validator,supercedes:L.FIXED_CENTER.supercedes});O.addProperty(L.WIDTH.key,{handler:this.configWidth,suppressEvent:L.WIDTH.suppressEvent,supercedes:L.WIDTH.supercedes});
O.addProperty(L.HEIGHT.key,{handler:this.configHeight,suppressEvent:L.HEIGHT.suppressEvent,supercedes:L.HEIGHT.supercedes});O.addProperty(L.AUTO_FILL_HEIGHT.key,{handler:this.configAutoFillHeight,value:L.AUTO_FILL_HEIGHT.value,validator:this._validateAutoFill,supercedes:L.AUTO_FILL_HEIGHT.supercedes});O.addProperty(L.ZINDEX.key,{handler:this.configzIndex,value:L.ZINDEX.value});O.addProperty(L.CONSTRAIN_TO_VIEWPORT.key,{handler:this.configConstrainToViewport,value:L.CONSTRAIN_TO_VIEWPORT.value,validator:L.CONSTRAIN_TO_VIEWPORT.validator,supercedes:L.CONSTRAIN_TO_VIEWPORT.supercedes});O.addProperty(L.IFRAME.key,{handler:this.configIframe,value:L.IFRAME.value,validator:L.IFRAME.validator,supercedes:L.IFRAME.supercedes});O.addProperty(L.PREVENT_CONTEXT_OVERLAP.key,{value:L.PREVENT_CONTEXT_OVERLAP.value,validator:L.PREVENT_CONTEXT_OVERLAP.validator,supercedes:L.PREVENT_CONTEXT_OVERLAP.supercedes});},moveTo:function(O,P){this.cfg.setProperty("xy",[O,P]);},hideMacGeckoScrollbars:function(){F.replaceClass(this.element,"show-scrollbars","hide-scrollbars");},showMacGeckoScrollbars:function(){F.replaceClass(this.element,"hide-scrollbars","show-scrollbars");},_setDomVisibility:function(O){F.setStyle(this.element,"visibility",(O)?"visible":"hidden");var P=B.CSS_HIDDEN;if(O){F.removeClass(this.element,P);}else{F.addClass(this.element,P);}},configVisible:function(R,O,X){var Q=O[0],S=F.getStyle(this.element,"visibility"),Y=this.cfg.getProperty("effect"),V=[],U=(this.platform=="mac"&&K.gecko),g=D.alreadySubscribed,W,P,f,c,b,a,d,Z,T;if(S=="inherit"){f=this.element.parentNode;while(f.nodeType!=9&&f.nodeType!=11){S=F.getStyle(f,"visibility");if(S!="inherit"){break;}f=f.parentNode;}if(S=="inherit"){S="visible";}}if(Y){if(Y instanceof Array){Z=Y.length;for(c=0;c<Z;c++){W=Y[c];V[V.length]=W.effect(this,W.duration);}}else{V[V.length]=Y.effect(this,Y.duration);}}if(Q){if(U){this.showMacGeckoScrollbars();}if(Y){if(Q){if(S!="visible"||S===""){this.beforeShowEvent.fire();T=V.length;for(b=0;b<T;b++){P=V[b];if(b===0&&!g(P.animateInCompleteEvent,this.showEvent.fire,this.showEvent)){P.animateInCompleteEvent.subscribe(this.showEvent.fire,this.showEvent,true);}P.animateIn();}}}}else{if(S!="visible"||S===""){this.beforeShowEvent.fire();this._setDomVisibility(true);this.cfg.refireEvent("iframe");this.showEvent.fire();}else{this._setDomVisibility(true);}}}else{if(U){this.hideMacGeckoScrollbars();}if(Y){if(S=="visible"){this.beforeHideEvent.fire();T=V.length;for(a=0;a<T;a++){d=V[a];if(a===0&&!g(d.animateOutCompleteEvent,this.hideEvent.fire,this.hideEvent)){d.animateOutCompleteEvent.subscribe(this.hideEvent.fire,this.hideEvent,true);}d.animateOut();}}else{if(S===""){this._setDomVisibility(false);}}}else{if(S=="visible"||S===""){this.beforeHideEvent.fire();this._setDomVisibility(false);this.hideEvent.fire();}else{this._setDomVisibility(false);}}}},doCenterOnDOMEvent:function(){var O=this.cfg,P=O.getProperty("fixedcenter");if(O.getProperty("visible")){if(P&&(P!==C||this.fitsInViewport())){this.center();}}},fitsInViewport:function(){var S=B.VIEWPORT_OFFSET,Q=this.element,T=Q.offsetWidth,R=Q.offsetHeight,O=F.getViewportWidth(),P=F.getViewportHeight();return((T+S<O)&&(R+S<P));},configFixedCenter:function(S,Q,T){var U=Q[0],P=D.alreadySubscribed,R=B.windowResizeEvent,O=B.windowScrollEvent;if(U){this.center();if(!P(this.beforeShowEvent,this.center)){this.beforeShowEvent.subscribe(this.center);}if(!P(R,this.doCenterOnDOMEvent,this)){R.subscribe(this.doCenterOnDOMEvent,this,true);}if(!P(O,this.doCenterOnDOMEvent,this)){O.subscribe(this.doCenterOnDOMEvent,this,true);}}else{this.beforeShowEvent.unsubscribe(this.center);R.unsubscribe(this.doCenterOnDOMEvent,this);O.unsubscribe(this.doCenterOnDOMEvent,this);}},configHeight:function(R,P,S){var O=P[0],Q=this.element;F.setStyle(Q,"height",O);this.cfg.refireEvent("iframe");},configAutoFillHeight:function(T,S,P){var V=S[0],Q=this.cfg,U="autofillheight",W="height",R=Q.getProperty(U),O=this._autoFillOnHeightChange;Q.unsubscribeFromConfigEvent(W,O);G.textResizeEvent.unsubscribe(O);this.changeContentEvent.unsubscribe(O);if(R&&V!==R&&this[R]){F.setStyle(this[R],W,"");}if(V){V=I.trim(V.toLowerCase());Q.subscribeToConfigEvent(W,O,this[V],this);G.textResizeEvent.subscribe(O,this[V],this);this.changeContentEvent.subscribe(O,this[V],this);Q.setProperty(U,V,true);}},configWidth:function(R,O,S){var Q=O[0],P=this.element;F.setStyle(P,"width",Q);this.cfg.refireEvent("iframe");},configzIndex:function(Q,O,R){var S=O[0],P=this.element;if(!S){S=F.getStyle(P,"zIndex");if(!S||isNaN(S)){S=0;}}if(this.iframe||this.cfg.getProperty("iframe")===true){if(S<=0){S=1;}}F.setStyle(P,"zIndex",S);this.cfg.setProperty("zIndex",S,true);if(this.iframe){this.stackIframe();}},configXY:function(Q,P,R){var T=P[0],O=T[0],S=T[1];this.cfg.setProperty("x",O);this.cfg.setProperty("y",S);this.beforeMoveEvent.fire([O,S]);O=this.cfg.getProperty("x");S=this.cfg.getProperty("y");this.cfg.refireEvent("iframe");this.moveEvent.fire([O,S]);},configX:function(Q,P,R){var O=P[0],S=this.cfg.getProperty("y");this.cfg.setProperty("x",O,true);this.cfg.setProperty("y",S,true);this.beforeMoveEvent.fire([O,S]);O=this.cfg.getProperty("x");S=this.cfg.getProperty("y");F.setX(this.element,O,true);this.cfg.setProperty("xy",[O,S],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([O,S]);},configY:function(Q,P,R){var O=this.cfg.getProperty("x"),S=P[0];this.cfg.setProperty("x",O,true);this.cfg.setProperty("y",S,true);this.beforeMoveEvent.fire([O,S]);O=this.cfg.getProperty("x");S=this.cfg.getProperty("y");F.setY(this.element,S,true);this.cfg.setProperty("xy",[O,S],true);this.cfg.refireEvent("iframe");this.moveEvent.fire([O,S]);},showIframe:function(){var P=this.iframe,O;if(P){O=this.element.parentNode;if(O!=P.parentNode){this._addToParent(O,P);}P.style.display="block";}},hideIframe:function(){if(this.iframe){this.iframe.style.display="none";}},syncIframe:function(){var O=this.iframe,Q=this.element,S=B.IFRAME_OFFSET,P=(S*2),R;if(O){O.style.width=(Q.offsetWidth+P+"px");
O.style.height=(Q.offsetHeight+P+"px");R=this.cfg.getProperty("xy");if(!I.isArray(R)||(isNaN(R[0])||isNaN(R[1]))){this.syncPosition();R=this.cfg.getProperty("xy");}F.setXY(O,[(R[0]-S),(R[1]-S)]);}},stackIframe:function(){if(this.iframe){var O=F.getStyle(this.element,"zIndex");if(!YAHOO.lang.isUndefined(O)&&!isNaN(O)){F.setStyle(this.iframe,"zIndex",(O-1));}}},configIframe:function(R,Q,S){var O=Q[0];function T(){var V=this.iframe,W=this.element,X;if(!V){if(!J){J=document.createElement("iframe");if(this.isSecure){J.src=B.IFRAME_SRC;}if(K.ie){J.style.filter="alpha(opacity=0)";J.frameBorder=0;}else{J.style.opacity="0";}J.style.position="absolute";J.style.border="none";J.style.margin="0";J.style.padding="0";J.style.display="none";J.tabIndex=-1;J.className=B.CSS_IFRAME;}V=J.cloneNode(false);V.id=this.id+"_f";X=W.parentNode;var U=X||document.body;this._addToParent(U,V);this.iframe=V;}this.showIframe();this.syncIframe();this.stackIframe();if(!this._hasIframeEventListeners){this.showEvent.subscribe(this.showIframe);this.hideEvent.subscribe(this.hideIframe);this.changeContentEvent.subscribe(this.syncIframe);this._hasIframeEventListeners=true;}}function P(){T.call(this);this.beforeShowEvent.unsubscribe(P);this._iframeDeferred=false;}if(O){if(this.cfg.getProperty("visible")){T.call(this);}else{if(!this._iframeDeferred){this.beforeShowEvent.subscribe(P);this._iframeDeferred=true;}}}else{this.hideIframe();if(this._hasIframeEventListeners){this.showEvent.unsubscribe(this.showIframe);this.hideEvent.unsubscribe(this.hideIframe);this.changeContentEvent.unsubscribe(this.syncIframe);this._hasIframeEventListeners=false;}}},_primeXYFromDOM:function(){if(YAHOO.lang.isUndefined(this.cfg.getProperty("xy"))){this.syncPosition();this.cfg.refireEvent("xy");this.beforeShowEvent.unsubscribe(this._primeXYFromDOM);}},configConstrainToViewport:function(P,O,Q){var R=O[0];if(R){if(!D.alreadySubscribed(this.beforeMoveEvent,this.enforceConstraints,this)){this.beforeMoveEvent.subscribe(this.enforceConstraints,this,true);}if(!D.alreadySubscribed(this.beforeShowEvent,this._primeXYFromDOM)){this.beforeShowEvent.subscribe(this._primeXYFromDOM);}}else{this.beforeShowEvent.unsubscribe(this._primeXYFromDOM);this.beforeMoveEvent.unsubscribe(this.enforceConstraints,this);}},configContext:function(U,T,Q){var X=T[0],R,O,V,S,P,W=this.CONTEXT_TRIGGERS;if(X){R=X[0];O=X[1];V=X[2];S=X[3];P=X[4];if(W&&W.length>0){S=(S||[]).concat(W);}if(R){if(typeof R=="string"){this.cfg.setProperty("context",[document.getElementById(R),O,V,S,P],true);}if(O&&V){this.align(O,V,P);}if(this._contextTriggers){this._processTriggers(this._contextTriggers,E,this._alignOnTrigger);}if(S){this._processTriggers(S,H,this._alignOnTrigger);this._contextTriggers=S;}}}},_alignOnTrigger:function(P,O){this.align();},_findTriggerCE:function(O){var P=null;if(O instanceof M){P=O;}else{if(B._TRIGGER_MAP[O]){P=B._TRIGGER_MAP[O];}}return P;},_processTriggers:function(S,U,R){var Q,T;for(var P=0,O=S.length;P<O;++P){Q=S[P];T=this._findTriggerCE(Q);if(T){T[U](R,this,true);}else{this[U](Q,R);}}},align:function(P,W,S){var V=this.cfg.getProperty("context"),T=this,O,Q,U;function R(Z,a){var Y=null,X=null;switch(P){case B.TOP_LEFT:Y=a;X=Z;break;case B.TOP_RIGHT:Y=a-Q.offsetWidth;X=Z;break;case B.BOTTOM_LEFT:Y=a;X=Z-Q.offsetHeight;break;case B.BOTTOM_RIGHT:Y=a-Q.offsetWidth;X=Z-Q.offsetHeight;break;}if(Y!==null&&X!==null){if(S){Y+=S[0];X+=S[1];}T.moveTo(Y,X);}}if(V){O=V[0];Q=this.element;T=this;if(!P){P=V[1];}if(!W){W=V[2];}if(!S&&V[4]){S=V[4];}if(Q&&O){U=F.getRegion(O);switch(W){case B.TOP_LEFT:R(U.top,U.left);break;case B.TOP_RIGHT:R(U.top,U.right);break;case B.BOTTOM_LEFT:R(U.bottom,U.left);break;case B.BOTTOM_RIGHT:R(U.bottom,U.right);break;}}}},enforceConstraints:function(P,O,Q){var S=O[0];var R=this.getConstrainedXY(S[0],S[1]);this.cfg.setProperty("x",R[0],true);this.cfg.setProperty("y",R[1],true);this.cfg.setProperty("xy",R,true);},_getConstrainedPos:function(X,P){var T=this.element,R=B.VIEWPORT_OFFSET,Z=(X=="x"),Y=(Z)?T.offsetWidth:T.offsetHeight,S=(Z)?F.getViewportWidth():F.getViewportHeight(),c=(Z)?F.getDocumentScrollLeft():F.getDocumentScrollTop(),b=(Z)?B.PREVENT_OVERLAP_X:B.PREVENT_OVERLAP_Y,O=this.cfg.getProperty("context"),U=(Y+R<S),W=this.cfg.getProperty("preventcontextoverlap")&&O&&b[(O[1]+O[2])],V=c+R,a=c+S-Y-R,Q=P;if(P<V||P>a){if(W){Q=this._preventOverlap(X,O[0],Y,S,c);}else{if(U){if(P<V){Q=V;}else{if(P>a){Q=a;}}}else{Q=V;}}}return Q;},_preventOverlap:function(X,W,Y,U,b){var Z=(X=="x"),T=B.VIEWPORT_OFFSET,S=this,Q=((Z)?F.getX(W):F.getY(W))-b,O=(Z)?W.offsetWidth:W.offsetHeight,P=Q-T,R=(U-(Q+O))-T,c=false,V=function(){var d;if((S.cfg.getProperty(X)-b)>Q){d=(Q-Y);}else{d=(Q+O);}S.cfg.setProperty(X,(d+b),true);return d;},a=function(){var e=((S.cfg.getProperty(X)-b)>Q)?R:P,d;if(Y>e){if(c){V();}else{V();c=true;d=a();}}return d;};a();return this.cfg.getProperty(X);},getConstrainedX:function(O){return this._getConstrainedPos("x",O);},getConstrainedY:function(O){return this._getConstrainedPos("y",O);},getConstrainedXY:function(O,P){return[this.getConstrainedX(O),this.getConstrainedY(P)];},center:function(){var R=B.VIEWPORT_OFFSET,S=this.element.offsetWidth,Q=this.element.offsetHeight,P=F.getViewportWidth(),T=F.getViewportHeight(),O,U;if(S<P){O=(P/2)-(S/2)+F.getDocumentScrollLeft();}else{O=R+F.getDocumentScrollLeft();}if(Q<T){U=(T/2)-(Q/2)+F.getDocumentScrollTop();}else{U=R+F.getDocumentScrollTop();}this.cfg.setProperty("xy",[parseInt(O,10),parseInt(U,10)]);this.cfg.refireEvent("iframe");if(K.webkit){this.forceContainerRedraw();}},syncPosition:function(){var O=F.getXY(this.element);this.cfg.setProperty("x",O[0],true);this.cfg.setProperty("y",O[1],true);this.cfg.setProperty("xy",O,true);},onDomResize:function(Q,P){var O=this;B.superclass.onDomResize.call(this,Q,P);setTimeout(function(){O.syncPosition();O.cfg.refireEvent("iframe");O.cfg.refireEvent("context");},0);},_getComputedHeight:(function(){if(document.defaultView&&document.defaultView.getComputedStyle){return function(P){var O=null;
if(P.ownerDocument&&P.ownerDocument.defaultView){var Q=P.ownerDocument.defaultView.getComputedStyle(P,"");if(Q){O=parseInt(Q.height,10);}}return(I.isNumber(O))?O:null;};}else{return function(P){var O=null;if(P.style.pixelHeight){O=P.style.pixelHeight;}return(I.isNumber(O))?O:null;};}})(),_validateAutoFillHeight:function(O){return(!O)||(I.isString(O)&&B.STD_MOD_RE.test(O));},_autoFillOnHeightChange:function(R,P,Q){var O=this.cfg.getProperty("height");if((O&&O!=="auto")||(O===0)){this.fillHeight(Q);}},_getPreciseHeight:function(P){var O=P.offsetHeight;if(P.getBoundingClientRect){var Q=P.getBoundingClientRect();O=Q.bottom-Q.top;}return O;},fillHeight:function(R){if(R){var P=this.innerElement||this.element,O=[this.header,this.body,this.footer],V,W=0,X=0,T=0,Q=false;for(var U=0,S=O.length;U<S;U++){V=O[U];if(V){if(R!==V){X+=this._getPreciseHeight(V);}else{Q=true;}}}if(Q){if(K.ie||K.opera){F.setStyle(R,"height",0+"px");}W=this._getComputedHeight(P);if(W===null){F.addClass(P,"yui-override-padding");W=P.clientHeight;F.removeClass(P,"yui-override-padding");}T=Math.max(W-X,0);F.setStyle(R,"height",T+"px");if(R.offsetHeight!=T){T=Math.max(T-(R.offsetHeight-T),0);}F.setStyle(R,"height",T+"px");}}},bringToTop:function(){var S=[],R=this.element;function V(Z,Y){var b=F.getStyle(Z,"zIndex"),a=F.getStyle(Y,"zIndex"),X=(!b||isNaN(b))?0:parseInt(b,10),W=(!a||isNaN(a))?0:parseInt(a,10);if(X>W){return -1;}else{if(X<W){return 1;}else{return 0;}}}function Q(Y){var X=F.hasClass(Y,B.CSS_OVERLAY),W=YAHOO.widget.Panel;if(X&&!F.isAncestor(R,Y)){if(W&&F.hasClass(Y,W.CSS_PANEL)){S[S.length]=Y.parentNode;}else{S[S.length]=Y;}}}F.getElementsBy(Q,"DIV",document.body);S.sort(V);var O=S[0],U;if(O){U=F.getStyle(O,"zIndex");if(!isNaN(U)){var T=false;if(O!=R){T=true;}else{if(S.length>1){var P=F.getStyle(S[1],"zIndex");if(!isNaN(P)&&(U==P)){T=true;}}}if(T){this.cfg.setProperty("zindex",(parseInt(U,10)+2));}}}},destroy:function(){if(this.iframe){this.iframe.parentNode.removeChild(this.iframe);}this.iframe=null;B.windowResizeEvent.unsubscribe(this.doCenterOnDOMEvent,this);B.windowScrollEvent.unsubscribe(this.doCenterOnDOMEvent,this);G.textResizeEvent.unsubscribe(this._autoFillOnHeightChange);if(this._contextTriggers){this._processTriggers(this._contextTriggers,E,this._alignOnTrigger);}B.superclass.destroy.call(this);},forceContainerRedraw:function(){var O=this;F.addClass(O.element,"yui-force-redraw");setTimeout(function(){F.removeClass(O.element,"yui-force-redraw");},0);},toString:function(){return"Overlay "+this.id;}});}());(function(){YAHOO.widget.OverlayManager=function(G){this.init(G);};var D=YAHOO.widget.Overlay,C=YAHOO.util.Event,E=YAHOO.util.Dom,B=YAHOO.util.Config,F=YAHOO.util.CustomEvent,A=YAHOO.widget.OverlayManager;A.CSS_FOCUSED="focused";A.prototype={constructor:A,overlays:null,initDefaultConfig:function(){this.cfg.addProperty("overlays",{suppressEvent:true});this.cfg.addProperty("focusevent",{value:"mousedown"});},init:function(I){this.cfg=new B(this);this.initDefaultConfig();if(I){this.cfg.applyConfig(I,true);}this.cfg.fireQueue();var H=null;this.getActive=function(){return H;};this.focus=function(J){var K=this.find(J);if(K){K.focus();}};this.remove=function(K){var M=this.find(K),J;if(M){if(H==M){H=null;}var L=(M.element===null&&M.cfg===null)?true:false;if(!L){J=E.getStyle(M.element,"zIndex");M.cfg.setProperty("zIndex",-1000,true);}this.overlays.sort(this.compareZIndexDesc);this.overlays=this.overlays.slice(0,(this.overlays.length-1));M.hideEvent.unsubscribe(M.blur);M.destroyEvent.unsubscribe(this._onOverlayDestroy,M);M.focusEvent.unsubscribe(this._onOverlayFocusHandler,M);M.blurEvent.unsubscribe(this._onOverlayBlurHandler,M);if(!L){C.removeListener(M.element,this.cfg.getProperty("focusevent"),this._onOverlayElementFocus);M.cfg.setProperty("zIndex",J,true);M.cfg.setProperty("manager",null);}if(M.focusEvent._managed){M.focusEvent=null;}if(M.blurEvent._managed){M.blurEvent=null;}if(M.focus._managed){M.focus=null;}if(M.blur._managed){M.blur=null;}}};this.blurAll=function(){var K=this.overlays.length,J;if(K>0){J=K-1;do{this.overlays[J].blur();}while(J--);}};this._manageBlur=function(J){var K=false;if(H==J){E.removeClass(H.element,A.CSS_FOCUSED);H=null;K=true;}return K;};this._manageFocus=function(J){var K=false;if(H!=J){if(H){H.blur();}H=J;this.bringToTop(H);E.addClass(H.element,A.CSS_FOCUSED);K=true;}return K;};var G=this.cfg.getProperty("overlays");if(!this.overlays){this.overlays=[];}if(G){this.register(G);this.overlays.sort(this.compareZIndexDesc);}},_onOverlayElementFocus:function(I){var G=C.getTarget(I),H=this.close;if(H&&(G==H||E.isAncestor(H,G))){this.blur();}else{this.focus();}},_onOverlayDestroy:function(H,G,I){this.remove(I);},_onOverlayFocusHandler:function(H,G,I){this._manageFocus(I);},_onOverlayBlurHandler:function(H,G,I){this._manageBlur(I);},_bindFocus:function(G){var H=this;if(!G.focusEvent){G.focusEvent=G.createEvent("focus");G.focusEvent.signature=F.LIST;G.focusEvent._managed=true;}else{G.focusEvent.subscribe(H._onOverlayFocusHandler,G,H);}if(!G.focus){C.on(G.element,H.cfg.getProperty("focusevent"),H._onOverlayElementFocus,null,G);G.focus=function(){if(H._manageFocus(this)){if(this.cfg.getProperty("visible")&&this.focusFirst){this.focusFirst();}this.focusEvent.fire();}};G.focus._managed=true;}},_bindBlur:function(G){var H=this;if(!G.blurEvent){G.blurEvent=G.createEvent("blur");G.blurEvent.signature=F.LIST;G.focusEvent._managed=true;}else{G.blurEvent.subscribe(H._onOverlayBlurHandler,G,H);}if(!G.blur){G.blur=function(){if(H._manageBlur(this)){this.blurEvent.fire();}};G.blur._managed=true;}G.hideEvent.subscribe(G.blur);},_bindDestroy:function(G){var H=this;G.destroyEvent.subscribe(H._onOverlayDestroy,G,H);},_syncZIndex:function(G){var H=E.getStyle(G.element,"zIndex");if(!isNaN(H)){G.cfg.setProperty("zIndex",parseInt(H,10));}else{G.cfg.setProperty("zIndex",0);}},register:function(G){var J=false,H,I;if(G instanceof D){G.cfg.addProperty("manager",{value:this});this._bindFocus(G);this._bindBlur(G);this._bindDestroy(G);
this._syncZIndex(G);this.overlays.push(G);this.bringToTop(G);J=true;}else{if(G instanceof Array){for(H=0,I=G.length;H<I;H++){J=this.register(G[H])||J;}}}return J;},bringToTop:function(M){var I=this.find(M),L,G,J;if(I){J=this.overlays;J.sort(this.compareZIndexDesc);G=J[0];if(G){L=E.getStyle(G.element,"zIndex");if(!isNaN(L)){var K=false;if(G!==I){K=true;}else{if(J.length>1){var H=E.getStyle(J[1].element,"zIndex");if(!isNaN(H)&&(L==H)){K=true;}}}if(K){I.cfg.setProperty("zindex",(parseInt(L,10)+2));}}J.sort(this.compareZIndexDesc);}}},find:function(G){var K=G instanceof D,I=this.overlays,M=I.length,J=null,L,H;if(K||typeof G=="string"){for(H=M-1;H>=0;H--){L=I[H];if((K&&(L===G))||(L.id==G)){J=L;break;}}}return J;},compareZIndexDesc:function(J,I){var H=(J.cfg)?J.cfg.getProperty("zIndex"):null,G=(I.cfg)?I.cfg.getProperty("zIndex"):null;if(H===null&&G===null){return 0;}else{if(H===null){return 1;}else{if(G===null){return -1;}else{if(H>G){return -1;}else{if(H<G){return 1;}else{return 0;}}}}}},showAll:function(){var H=this.overlays,I=H.length,G;for(G=I-1;G>=0;G--){H[G].show();}},hideAll:function(){var H=this.overlays,I=H.length,G;for(G=I-1;G>=0;G--){H[G].hide();}},toString:function(){return"OverlayManager";}};}());(function(){YAHOO.widget.Tooltip=function(P,O){YAHOO.widget.Tooltip.superclass.constructor.call(this,P,O);};var E=YAHOO.lang,N=YAHOO.util.Event,M=YAHOO.util.CustomEvent,C=YAHOO.util.Dom,J=YAHOO.widget.Tooltip,H=YAHOO.env.ua,G=(H.ie&&(H.ie<=6||document.compatMode=="BackCompat")),F,I={"PREVENT_OVERLAP":{key:"preventoverlap",value:true,validator:E.isBoolean,supercedes:["x","y","xy"]},"SHOW_DELAY":{key:"showdelay",value:200,validator:E.isNumber},"AUTO_DISMISS_DELAY":{key:"autodismissdelay",value:5000,validator:E.isNumber},"HIDE_DELAY":{key:"hidedelay",value:250,validator:E.isNumber},"TEXT":{key:"text",suppressEvent:true},"CONTAINER":{key:"container"},"DISABLED":{key:"disabled",value:false,suppressEvent:true},"XY_OFFSET":{key:"xyoffset",value:[0,25],suppressEvent:true}},A={"CONTEXT_MOUSE_OVER":"contextMouseOver","CONTEXT_MOUSE_OUT":"contextMouseOut","CONTEXT_TRIGGER":"contextTrigger"};J.CSS_TOOLTIP="yui-tt";function K(Q,O){var P=this.cfg,R=P.getProperty("width");if(R==O){P.setProperty("width",Q);}}function D(P,O){if("_originalWidth" in this){K.call(this,this._originalWidth,this._forcedWidth);}var Q=document.body,U=this.cfg,T=U.getProperty("width"),R,S;if((!T||T=="auto")&&(U.getProperty("container")!=Q||U.getProperty("x")>=C.getViewportWidth()||U.getProperty("y")>=C.getViewportHeight())){S=this.element.cloneNode(true);S.style.visibility="hidden";S.style.top="0px";S.style.left="0px";Q.appendChild(S);R=(S.offsetWidth+"px");Q.removeChild(S);S=null;U.setProperty("width",R);U.refireEvent("xy");this._originalWidth=T||"";this._forcedWidth=R;}}function B(P,O,Q){this.render(Q);}function L(){N.onDOMReady(B,this.cfg.getProperty("container"),this);}YAHOO.extend(J,YAHOO.widget.Overlay,{init:function(P,O){J.superclass.init.call(this,P);this.beforeInitEvent.fire(J);C.addClass(this.element,J.CSS_TOOLTIP);if(O){this.cfg.applyConfig(O,true);}this.cfg.queueProperty("visible",false);this.cfg.queueProperty("constraintoviewport",true);this.setBody("");this.subscribe("changeContent",D);this.subscribe("init",L);this.subscribe("render",this.onRender);this.initEvent.fire(J);},initEvents:function(){J.superclass.initEvents.call(this);var O=M.LIST;this.contextMouseOverEvent=this.createEvent(A.CONTEXT_MOUSE_OVER);this.contextMouseOverEvent.signature=O;this.contextMouseOutEvent=this.createEvent(A.CONTEXT_MOUSE_OUT);this.contextMouseOutEvent.signature=O;this.contextTriggerEvent=this.createEvent(A.CONTEXT_TRIGGER);this.contextTriggerEvent.signature=O;},initDefaultConfig:function(){J.superclass.initDefaultConfig.call(this);this.cfg.addProperty(I.PREVENT_OVERLAP.key,{value:I.PREVENT_OVERLAP.value,validator:I.PREVENT_OVERLAP.validator,supercedes:I.PREVENT_OVERLAP.supercedes});this.cfg.addProperty(I.SHOW_DELAY.key,{handler:this.configShowDelay,value:200,validator:I.SHOW_DELAY.validator});this.cfg.addProperty(I.AUTO_DISMISS_DELAY.key,{handler:this.configAutoDismissDelay,value:I.AUTO_DISMISS_DELAY.value,validator:I.AUTO_DISMISS_DELAY.validator});this.cfg.addProperty(I.HIDE_DELAY.key,{handler:this.configHideDelay,value:I.HIDE_DELAY.value,validator:I.HIDE_DELAY.validator});this.cfg.addProperty(I.TEXT.key,{handler:this.configText,suppressEvent:I.TEXT.suppressEvent});this.cfg.addProperty(I.CONTAINER.key,{handler:this.configContainer,value:document.body});this.cfg.addProperty(I.DISABLED.key,{handler:this.configContainer,value:I.DISABLED.value,supressEvent:I.DISABLED.suppressEvent});this.cfg.addProperty(I.XY_OFFSET.key,{value:I.XY_OFFSET.value.concat(),supressEvent:I.XY_OFFSET.suppressEvent});},configText:function(P,O,Q){var R=O[0];if(R){this.setBody(R);}},configContainer:function(Q,P,R){var O=P[0];if(typeof O=="string"){this.cfg.setProperty("container",document.getElementById(O),true);}},_removeEventListeners:function(){var R=this._context,O,Q,P;if(R){O=R.length;if(O>0){P=O-1;do{Q=R[P];N.removeListener(Q,"mouseover",this.onContextMouseOver);N.removeListener(Q,"mousemove",this.onContextMouseMove);N.removeListener(Q,"mouseout",this.onContextMouseOut);}while(P--);}}},configContext:function(T,P,U){var S=P[0],V,O,R,Q;if(S){if(!(S instanceof Array)){if(typeof S=="string"){this.cfg.setProperty("context",[document.getElementById(S)],true);}else{this.cfg.setProperty("context",[S],true);}S=this.cfg.getProperty("context");}this._removeEventListeners();this._context=S;V=this._context;if(V){O=V.length;if(O>0){Q=O-1;do{R=V[Q];N.on(R,"mouseover",this.onContextMouseOver,this);N.on(R,"mousemove",this.onContextMouseMove,this);N.on(R,"mouseout",this.onContextMouseOut,this);}while(Q--);}}}},onContextMouseMove:function(P,O){O.pageX=N.getPageX(P);O.pageY=N.getPageY(P);},onContextMouseOver:function(Q,P){var O=this;if(O.title){P._tempTitle=O.title;O.title="";}if(P.fireEvent("contextMouseOver",O,Q)!==false&&!P.cfg.getProperty("disabled")){if(P.hideProcId){clearTimeout(P.hideProcId);
P.hideProcId=null;}N.on(O,"mousemove",P.onContextMouseMove,P);P.showProcId=P.doShow(Q,O);}},onContextMouseOut:function(Q,P){var O=this;if(P._tempTitle){O.title=P._tempTitle;P._tempTitle=null;}if(P.showProcId){clearTimeout(P.showProcId);P.showProcId=null;}if(P.hideProcId){clearTimeout(P.hideProcId);P.hideProcId=null;}P.fireEvent("contextMouseOut",O,Q);P.hideProcId=setTimeout(function(){P.hide();},P.cfg.getProperty("hidedelay"));},doShow:function(R,O){var T=this.cfg.getProperty("xyoffset"),P=T[0],S=T[1],Q=this;if(H.opera&&O.tagName&&O.tagName.toUpperCase()=="A"){S+=12;}return setTimeout(function(){var U=Q.cfg.getProperty("text");if(Q._tempTitle&&(U===""||YAHOO.lang.isUndefined(U)||YAHOO.lang.isNull(U))){Q.setBody(Q._tempTitle);}else{Q.cfg.refireEvent("text");}Q.moveTo(Q.pageX+P,Q.pageY+S);if(Q.cfg.getProperty("preventoverlap")){Q.preventOverlap(Q.pageX,Q.pageY);}N.removeListener(O,"mousemove",Q.onContextMouseMove);Q.contextTriggerEvent.fire(O);Q.show();Q.hideProcId=Q.doHide();},this.cfg.getProperty("showdelay"));},doHide:function(){var O=this;return setTimeout(function(){O.hide();},this.cfg.getProperty("autodismissdelay"));},preventOverlap:function(S,R){var O=this.element.offsetHeight,Q=new YAHOO.util.Point(S,R),P=C.getRegion(this.element);P.top-=5;P.left-=5;P.right+=5;P.bottom+=5;if(P.contains(Q)){this.cfg.setProperty("y",(R-O-5));}},onRender:function(S,R){function T(){var W=this.element,V=this.underlay;if(V){V.style.width=(W.offsetWidth+6)+"px";V.style.height=(W.offsetHeight+1)+"px";}}function P(){C.addClass(this.underlay,"yui-tt-shadow-visible");if(H.ie){this.forceUnderlayRedraw();}}function O(){C.removeClass(this.underlay,"yui-tt-shadow-visible");}function U(){var X=this.underlay,W,V,Z,Y;if(!X){W=this.element;V=YAHOO.widget.Module;Z=H.ie;Y=this;if(!F){F=document.createElement("div");F.className="yui-tt-shadow";}X=F.cloneNode(false);W.appendChild(X);this.underlay=X;this._shadow=this.underlay;P.call(this);this.subscribe("beforeShow",P);this.subscribe("hide",O);if(G){window.setTimeout(function(){T.call(Y);},0);this.cfg.subscribeToConfigEvent("width",T);this.cfg.subscribeToConfigEvent("height",T);this.subscribe("changeContent",T);V.textResizeEvent.subscribe(T,this,true);this.subscribe("destroy",function(){V.textResizeEvent.unsubscribe(T,this);});}}}function Q(){U.call(this);this.unsubscribe("beforeShow",Q);}if(this.cfg.getProperty("visible")){U.call(this);}else{this.subscribe("beforeShow",Q);}},forceUnderlayRedraw:function(){var O=this;C.addClass(O.underlay,"yui-force-redraw");setTimeout(function(){C.removeClass(O.underlay,"yui-force-redraw");},0);},destroy:function(){this._removeEventListeners();J.superclass.destroy.call(this);},toString:function(){return"Tooltip "+this.id;}});}());(function(){YAHOO.widget.Panel=function(V,U){YAHOO.widget.Panel.superclass.constructor.call(this,V,U);};var S=null;var E=YAHOO.lang,F=YAHOO.util,A=F.Dom,T=F.Event,M=F.CustomEvent,K=YAHOO.util.KeyListener,I=F.Config,H=YAHOO.widget.Overlay,O=YAHOO.widget.Panel,L=YAHOO.env.ua,P=(L.ie&&(L.ie<=6||document.compatMode=="BackCompat")),G,Q,C,D={"SHOW_MASK":"showMask","HIDE_MASK":"hideMask","DRAG":"drag"},N={"CLOSE":{key:"close",value:true,validator:E.isBoolean,supercedes:["visible"]},"DRAGGABLE":{key:"draggable",value:(F.DD?true:false),validator:E.isBoolean,supercedes:["visible"]},"DRAG_ONLY":{key:"dragonly",value:false,validator:E.isBoolean,supercedes:["draggable"]},"UNDERLAY":{key:"underlay",value:"shadow",supercedes:["visible"]},"MODAL":{key:"modal",value:false,validator:E.isBoolean,supercedes:["visible","zindex"]},"KEY_LISTENERS":{key:"keylisteners",suppressEvent:true,supercedes:["visible"]},"STRINGS":{key:"strings",supercedes:["close"],validator:E.isObject,value:{close:"Close"}}};O.CSS_PANEL="yui-panel";O.CSS_PANEL_CONTAINER="yui-panel-container";O.FOCUSABLE=["a","button","select","textarea","input","iframe"];function J(V,U){if(!this.header&&this.cfg.getProperty("draggable")){this.setHeader("&#160;");}}function R(V,U,W){var Z=W[0],X=W[1],Y=this.cfg,a=Y.getProperty("width");if(a==X){Y.setProperty("width",Z);}this.unsubscribe("hide",R,W);}function B(V,U){var Y,X,W;if(P){Y=this.cfg;X=Y.getProperty("width");if(!X||X=="auto"){W=(this.element.offsetWidth+"px");Y.setProperty("width",W);this.subscribe("hide",R,[(X||""),W]);}}}YAHOO.extend(O,H,{init:function(V,U){O.superclass.init.call(this,V);this.beforeInitEvent.fire(O);A.addClass(this.element,O.CSS_PANEL);this.buildWrapper();if(U){this.cfg.applyConfig(U,true);}this.subscribe("showMask",this._addFocusHandlers);this.subscribe("hideMask",this._removeFocusHandlers);this.subscribe("beforeRender",J);this.subscribe("render",function(){this.setFirstLastFocusable();this.subscribe("changeContent",this.setFirstLastFocusable);});this.subscribe("show",this.focusFirst);this.initEvent.fire(O);},_onElementFocus:function(Z){if(S===this){var Y=T.getTarget(Z),X=document.documentElement,V=(Y!==X&&Y!==window);if(V&&Y!==this.element&&Y!==this.mask&&!A.isAncestor(this.element,Y)){try{if(this.firstElement){this.firstElement.focus();}else{if(this._modalFocus){this._modalFocus.focus();}else{this.innerElement.focus();}}}catch(W){try{if(V&&Y!==document.body){Y.blur();}}catch(U){}}}}},_addFocusHandlers:function(V,U){if(!this.firstElement){if(L.webkit||L.opera){if(!this._modalFocus){this._createHiddenFocusElement();}}else{this.innerElement.tabIndex=0;}}this.setTabLoop(this.firstElement,this.lastElement);T.onFocus(document.documentElement,this._onElementFocus,this,true);S=this;},_createHiddenFocusElement:function(){var U=document.createElement("button");U.style.height="1px";U.style.width="1px";U.style.position="absolute";U.style.left="-10000em";U.style.opacity=0;U.tabIndex=-1;this.innerElement.appendChild(U);this._modalFocus=U;},_removeFocusHandlers:function(V,U){T.removeFocusListener(document.documentElement,this._onElementFocus,this);if(S==this){S=null;}},focusFirst:function(W,U,Y){var V=this.firstElement;if(U&&U[1]){T.stopEvent(U[1]);}if(V){try{V.focus();}catch(X){}}},focusLast:function(W,U,Y){var V=this.lastElement;
if(U&&U[1]){T.stopEvent(U[1]);}if(V){try{V.focus();}catch(X){}}},setTabLoop:function(X,Z){var V=this.preventBackTab,W=this.preventTabOut,U=this.showEvent,Y=this.hideEvent;if(V){V.disable();U.unsubscribe(V.enable,V);Y.unsubscribe(V.disable,V);V=this.preventBackTab=null;}if(W){W.disable();U.unsubscribe(W.enable,W);Y.unsubscribe(W.disable,W);W=this.preventTabOut=null;}if(X){this.preventBackTab=new K(X,{shift:true,keys:9},{fn:this.focusLast,scope:this,correctScope:true});V=this.preventBackTab;U.subscribe(V.enable,V,true);Y.subscribe(V.disable,V,true);}if(Z){this.preventTabOut=new K(Z,{shift:false,keys:9},{fn:this.focusFirst,scope:this,correctScope:true});W=this.preventTabOut;U.subscribe(W.enable,W,true);Y.subscribe(W.disable,W,true);}},getFocusableElements:function(U){U=U||this.innerElement;var X={};for(var W=0;W<O.FOCUSABLE.length;W++){X[O.FOCUSABLE[W]]=true;}function V(Y){if(Y.focus&&Y.type!=="hidden"&&!Y.disabled&&X[Y.tagName.toLowerCase()]){return true;}return false;}return A.getElementsBy(V,null,U);},setFirstLastFocusable:function(){this.firstElement=null;this.lastElement=null;var U=this.getFocusableElements();this.focusableElements=U;if(U.length>0){this.firstElement=U[0];this.lastElement=U[U.length-1];}if(this.cfg.getProperty("modal")){this.setTabLoop(this.firstElement,this.lastElement);}},initEvents:function(){O.superclass.initEvents.call(this);var U=M.LIST;this.showMaskEvent=this.createEvent(D.SHOW_MASK);this.showMaskEvent.signature=U;this.hideMaskEvent=this.createEvent(D.HIDE_MASK);this.hideMaskEvent.signature=U;this.dragEvent=this.createEvent(D.DRAG);this.dragEvent.signature=U;},initDefaultConfig:function(){O.superclass.initDefaultConfig.call(this);this.cfg.addProperty(N.CLOSE.key,{handler:this.configClose,value:N.CLOSE.value,validator:N.CLOSE.validator,supercedes:N.CLOSE.supercedes});this.cfg.addProperty(N.DRAGGABLE.key,{handler:this.configDraggable,value:(F.DD)?true:false,validator:N.DRAGGABLE.validator,supercedes:N.DRAGGABLE.supercedes});this.cfg.addProperty(N.DRAG_ONLY.key,{value:N.DRAG_ONLY.value,validator:N.DRAG_ONLY.validator,supercedes:N.DRAG_ONLY.supercedes});this.cfg.addProperty(N.UNDERLAY.key,{handler:this.configUnderlay,value:N.UNDERLAY.value,supercedes:N.UNDERLAY.supercedes});this.cfg.addProperty(N.MODAL.key,{handler:this.configModal,value:N.MODAL.value,validator:N.MODAL.validator,supercedes:N.MODAL.supercedes});this.cfg.addProperty(N.KEY_LISTENERS.key,{handler:this.configKeyListeners,suppressEvent:N.KEY_LISTENERS.suppressEvent,supercedes:N.KEY_LISTENERS.supercedes});this.cfg.addProperty(N.STRINGS.key,{value:N.STRINGS.value,handler:this.configStrings,validator:N.STRINGS.validator,supercedes:N.STRINGS.supercedes});},configClose:function(X,V,Y){var Z=V[0],W=this.close,U=this.cfg.getProperty("strings");if(Z){if(!W){if(!C){C=document.createElement("a");C.className="container-close";C.href="#";}W=C.cloneNode(true);this.innerElement.appendChild(W);W.innerHTML=(U&&U.close)?U.close:"&#160;";T.on(W,"click",this._doClose,this,true);this.close=W;}else{W.style.display="block";}}else{if(W){W.style.display="none";}}},_doClose:function(U){T.preventDefault(U);this.hide();},configDraggable:function(V,U,W){var X=U[0];if(X){if(!F.DD){this.cfg.setProperty("draggable",false);return;}if(this.header){A.setStyle(this.header,"cursor","move");this.registerDragDrop();}this.subscribe("beforeShow",B);}else{if(this.dd){this.dd.unreg();}if(this.header){A.setStyle(this.header,"cursor","auto");}this.unsubscribe("beforeShow",B);}},configUnderlay:function(d,c,Z){var b=(this.platform=="mac"&&L.gecko),e=c[0].toLowerCase(),V=this.underlay,W=this.element;function X(){var f=false;if(!V){if(!Q){Q=document.createElement("div");Q.className="underlay";}V=Q.cloneNode(false);this.element.appendChild(V);this.underlay=V;if(P){this.sizeUnderlay();this.cfg.subscribeToConfigEvent("width",this.sizeUnderlay);this.cfg.subscribeToConfigEvent("height",this.sizeUnderlay);this.changeContentEvent.subscribe(this.sizeUnderlay);YAHOO.widget.Module.textResizeEvent.subscribe(this.sizeUnderlay,this,true);}if(L.webkit&&L.webkit<420){this.changeContentEvent.subscribe(this.forceUnderlayRedraw);}f=true;}}function a(){var f=X.call(this);if(!f&&P){this.sizeUnderlay();}this._underlayDeferred=false;this.beforeShowEvent.unsubscribe(a);}function Y(){if(this._underlayDeferred){this.beforeShowEvent.unsubscribe(a);this._underlayDeferred=false;}if(V){this.cfg.unsubscribeFromConfigEvent("width",this.sizeUnderlay);this.cfg.unsubscribeFromConfigEvent("height",this.sizeUnderlay);this.changeContentEvent.unsubscribe(this.sizeUnderlay);this.changeContentEvent.unsubscribe(this.forceUnderlayRedraw);YAHOO.widget.Module.textResizeEvent.unsubscribe(this.sizeUnderlay,this,true);this.element.removeChild(V);this.underlay=null;}}switch(e){case"shadow":A.removeClass(W,"matte");A.addClass(W,"shadow");break;case"matte":if(!b){Y.call(this);}A.removeClass(W,"shadow");A.addClass(W,"matte");break;default:if(!b){Y.call(this);}A.removeClass(W,"shadow");A.removeClass(W,"matte");break;}if((e=="shadow")||(b&&!V)){if(this.cfg.getProperty("visible")){var U=X.call(this);if(!U&&P){this.sizeUnderlay();}}else{if(!this._underlayDeferred){this.beforeShowEvent.subscribe(a);this._underlayDeferred=true;}}}},configModal:function(V,U,X){var W=U[0];if(W){if(!this._hasModalityEventListeners){this.subscribe("beforeShow",this.buildMask);this.subscribe("beforeShow",this.bringToTop);this.subscribe("beforeShow",this.showMask);this.subscribe("hide",this.hideMask);H.windowResizeEvent.subscribe(this.sizeMask,this,true);this._hasModalityEventListeners=true;}}else{if(this._hasModalityEventListeners){if(this.cfg.getProperty("visible")){this.hideMask();this.removeMask();}this.unsubscribe("beforeShow",this.buildMask);this.unsubscribe("beforeShow",this.bringToTop);this.unsubscribe("beforeShow",this.showMask);this.unsubscribe("hide",this.hideMask);H.windowResizeEvent.unsubscribe(this.sizeMask,this);this._hasModalityEventListeners=false;}}},removeMask:function(){var V=this.mask,U;if(V){this.hideMask();U=V.parentNode;
if(U){U.removeChild(V);}this.mask=null;}},configKeyListeners:function(X,U,a){var W=U[0],Z,Y,V;if(W){if(W instanceof Array){Y=W.length;for(V=0;V<Y;V++){Z=W[V];if(!I.alreadySubscribed(this.showEvent,Z.enable,Z)){this.showEvent.subscribe(Z.enable,Z,true);}if(!I.alreadySubscribed(this.hideEvent,Z.disable,Z)){this.hideEvent.subscribe(Z.disable,Z,true);this.destroyEvent.subscribe(Z.disable,Z,true);}}}else{if(!I.alreadySubscribed(this.showEvent,W.enable,W)){this.showEvent.subscribe(W.enable,W,true);}if(!I.alreadySubscribed(this.hideEvent,W.disable,W)){this.hideEvent.subscribe(W.disable,W,true);this.destroyEvent.subscribe(W.disable,W,true);}}}},configStrings:function(V,U,W){var X=E.merge(N.STRINGS.value,U[0]);this.cfg.setProperty(N.STRINGS.key,X,true);},configHeight:function(X,V,Y){var U=V[0],W=this.innerElement;A.setStyle(W,"height",U);this.cfg.refireEvent("iframe");},_autoFillOnHeightChange:function(X,V,W){O.superclass._autoFillOnHeightChange.apply(this,arguments);if(P){var U=this;setTimeout(function(){U.sizeUnderlay();},0);}},configWidth:function(X,U,Y){var W=U[0],V=this.innerElement;A.setStyle(V,"width",W);this.cfg.refireEvent("iframe");},configzIndex:function(V,U,X){O.superclass.configzIndex.call(this,V,U,X);if(this.mask||this.cfg.getProperty("modal")===true){var W=A.getStyle(this.element,"zIndex");if(!W||isNaN(W)){W=0;}if(W===0){this.cfg.setProperty("zIndex",1);}else{this.stackMask();}}},buildWrapper:function(){var W=this.element.parentNode,U=this.element,V=document.createElement("div");V.className=O.CSS_PANEL_CONTAINER;V.id=U.id+"_c";if(W){W.insertBefore(V,U);}V.appendChild(U);this.element=V;this.innerElement=U;A.setStyle(this.innerElement,"visibility","inherit");},sizeUnderlay:function(){var V=this.underlay,U;if(V){U=this.element;V.style.width=U.offsetWidth+"px";V.style.height=U.offsetHeight+"px";}},registerDragDrop:function(){var V=this;if(this.header){if(!F.DD){return;}var U=(this.cfg.getProperty("dragonly")===true);this.dd=new F.DD(this.element.id,this.id,{dragOnly:U});if(!this.header.id){this.header.id=this.id+"_h";}this.dd.startDrag=function(){var X,Z,W,c,b,a;if(YAHOO.env.ua.ie==6){A.addClass(V.element,"drag");}if(V.cfg.getProperty("constraintoviewport")){var Y=H.VIEWPORT_OFFSET;X=V.element.offsetHeight;Z=V.element.offsetWidth;W=A.getViewportWidth();c=A.getViewportHeight();b=A.getDocumentScrollLeft();a=A.getDocumentScrollTop();if(X+Y<c){this.minY=a+Y;this.maxY=a+c-X-Y;}else{this.minY=a+Y;this.maxY=a+Y;}if(Z+Y<W){this.minX=b+Y;this.maxX=b+W-Z-Y;}else{this.minX=b+Y;this.maxX=b+Y;}this.constrainX=true;this.constrainY=true;}else{this.constrainX=false;this.constrainY=false;}V.dragEvent.fire("startDrag",arguments);};this.dd.onDrag=function(){V.syncPosition();V.cfg.refireEvent("iframe");if(this.platform=="mac"&&YAHOO.env.ua.gecko){this.showMacGeckoScrollbars();}V.dragEvent.fire("onDrag",arguments);};this.dd.endDrag=function(){if(YAHOO.env.ua.ie==6){A.removeClass(V.element,"drag");}V.dragEvent.fire("endDrag",arguments);V.moveEvent.fire(V.cfg.getProperty("xy"));};this.dd.setHandleElId(this.header.id);this.dd.addInvalidHandleType("INPUT");this.dd.addInvalidHandleType("SELECT");this.dd.addInvalidHandleType("TEXTAREA");}},buildMask:function(){var U=this.mask;if(!U){if(!G){G=document.createElement("div");G.className="mask";G.innerHTML="&#160;";}U=G.cloneNode(true);U.id=this.id+"_mask";document.body.insertBefore(U,document.body.firstChild);this.mask=U;if(YAHOO.env.ua.gecko&&this.platform=="mac"){A.addClass(this.mask,"block-scrollbars");}this.stackMask();}},hideMask:function(){if(this.cfg.getProperty("modal")&&this.mask){this.mask.style.display="none";A.removeClass(document.body,"masked");this.hideMaskEvent.fire();}},showMask:function(){if(this.cfg.getProperty("modal")&&this.mask){A.addClass(document.body,"masked");this.sizeMask();this.mask.style.display="block";this.showMaskEvent.fire();}},sizeMask:function(){if(this.mask){var V=this.mask,W=A.getViewportWidth(),U=A.getViewportHeight();if(V.offsetHeight>U){V.style.height=U+"px";}if(V.offsetWidth>W){V.style.width=W+"px";}V.style.height=A.getDocumentHeight()+"px";V.style.width=A.getDocumentWidth()+"px";}},stackMask:function(){if(this.mask){var U=A.getStyle(this.element,"zIndex");if(!YAHOO.lang.isUndefined(U)&&!isNaN(U)){A.setStyle(this.mask,"zIndex",U-1);}}},render:function(U){return O.superclass.render.call(this,U,this.innerElement);},_renderHeader:function(U){U=U||this.innerElement;O.superclass._renderHeader.call(this,U);},_renderBody:function(U){U=U||this.innerElement;O.superclass._renderBody.call(this,U);},_renderFooter:function(U){U=U||this.innerElement;O.superclass._renderFooter.call(this,U);},destroy:function(){H.windowResizeEvent.unsubscribe(this.sizeMask,this);this.removeMask();if(this.close){T.purgeElement(this.close);}O.superclass.destroy.call(this);},forceUnderlayRedraw:function(){var U=this.underlay;A.addClass(U,"yui-force-redraw");setTimeout(function(){A.removeClass(U,"yui-force-redraw");},0);},toString:function(){return"Panel "+this.id;}});}());(function(){YAHOO.widget.Dialog=function(J,I){YAHOO.widget.Dialog.superclass.constructor.call(this,J,I);};var B=YAHOO.util.Event,G=YAHOO.util.CustomEvent,E=YAHOO.util.Dom,A=YAHOO.widget.Dialog,F=YAHOO.lang,H={"BEFORE_SUBMIT":"beforeSubmit","SUBMIT":"submit","MANUAL_SUBMIT":"manualSubmit","ASYNC_SUBMIT":"asyncSubmit","FORM_SUBMIT":"formSubmit","CANCEL":"cancel"},C={"POST_METHOD":{key:"postmethod",value:"async"},"POST_DATA":{key:"postdata",value:null},"BUTTONS":{key:"buttons",value:"none",supercedes:["visible"]},"HIDEAFTERSUBMIT":{key:"hideaftersubmit",value:true}};A.CSS_DIALOG="yui-dialog";function D(){var L=this._aButtons,J,K,I;if(F.isArray(L)){J=L.length;if(J>0){I=J-1;do{K=L[I];if(YAHOO.widget.Button&&K instanceof YAHOO.widget.Button){K.destroy();}else{if(K.tagName.toUpperCase()=="BUTTON"){B.purgeElement(K);B.purgeElement(K,false);}}}while(I--);}}}YAHOO.extend(A,YAHOO.widget.Panel,{form:null,initDefaultConfig:function(){A.superclass.initDefaultConfig.call(this);this.callback={success:null,failure:null,argument:null};
this.cfg.addProperty(C.POST_METHOD.key,{handler:this.configPostMethod,value:C.POST_METHOD.value,validator:function(I){if(I!="form"&&I!="async"&&I!="none"&&I!="manual"){return false;}else{return true;}}});this.cfg.addProperty(C.POST_DATA.key,{value:C.POST_DATA.value});this.cfg.addProperty(C.HIDEAFTERSUBMIT.key,{value:C.HIDEAFTERSUBMIT.value});this.cfg.addProperty(C.BUTTONS.key,{handler:this.configButtons,value:C.BUTTONS.value,supercedes:C.BUTTONS.supercedes});},initEvents:function(){A.superclass.initEvents.call(this);var I=G.LIST;this.beforeSubmitEvent=this.createEvent(H.BEFORE_SUBMIT);this.beforeSubmitEvent.signature=I;this.submitEvent=this.createEvent(H.SUBMIT);this.submitEvent.signature=I;this.manualSubmitEvent=this.createEvent(H.MANUAL_SUBMIT);this.manualSubmitEvent.signature=I;this.asyncSubmitEvent=this.createEvent(H.ASYNC_SUBMIT);this.asyncSubmitEvent.signature=I;this.formSubmitEvent=this.createEvent(H.FORM_SUBMIT);this.formSubmitEvent.signature=I;this.cancelEvent=this.createEvent(H.CANCEL);this.cancelEvent.signature=I;},init:function(J,I){A.superclass.init.call(this,J);this.beforeInitEvent.fire(A);E.addClass(this.element,A.CSS_DIALOG);this.cfg.setProperty("visible",false);if(I){this.cfg.applyConfig(I,true);}this.showEvent.subscribe(this.focusFirst,this,true);this.beforeHideEvent.subscribe(this.blurButtons,this,true);this.subscribe("changeBody",this.registerForm);this.initEvent.fire(A);},doSubmit:function(){var P=YAHOO.util.Connect,Q=this.form,K=false,N=false,R,M,L,I;switch(this.cfg.getProperty("postmethod")){case"async":R=Q.elements;M=R.length;if(M>0){L=M-1;do{if(R[L].type=="file"){K=true;break;}}while(L--);}if(K&&YAHOO.env.ua.ie&&this.isSecure){N=true;}I=this._getFormAttributes(Q);P.setForm(Q,K,N);var J=this.cfg.getProperty("postdata");var O=P.asyncRequest(I.method,I.action,this.callback,J);this.asyncSubmitEvent.fire(O);break;case"form":Q.submit();this.formSubmitEvent.fire();break;case"none":case"manual":this.manualSubmitEvent.fire();break;}},_getFormAttributes:function(K){var I={method:null,action:null};if(K){if(K.getAttributeNode){var J=K.getAttributeNode("action");var L=K.getAttributeNode("method");if(J){I.action=J.value;}if(L){I.method=L.value;}}else{I.action=K.getAttribute("action");I.method=K.getAttribute("method");}}I.method=(F.isString(I.method)?I.method:"POST").toUpperCase();I.action=F.isString(I.action)?I.action:"";return I;},registerForm:function(){var I=this.element.getElementsByTagName("form")[0];if(this.form){if(this.form==I&&E.isAncestor(this.element,this.form)){return;}else{B.purgeElement(this.form);this.form=null;}}if(!I){I=document.createElement("form");I.name="frm_"+this.id;this.body.appendChild(I);}if(I){this.form=I;B.on(I,"submit",this._submitHandler,this,true);}},_submitHandler:function(I){B.stopEvent(I);this.submit();this.form.blur();},setTabLoop:function(I,J){I=I||this.firstButton;J=this.lastButton||J;A.superclass.setTabLoop.call(this,I,J);},setFirstLastFocusable:function(){A.superclass.setFirstLastFocusable.call(this);var J,I,K,L=this.focusableElements;this.firstFormElement=null;this.lastFormElement=null;if(this.form&&L&&L.length>0){I=L.length;for(J=0;J<I;++J){K=L[J];if(this.form===K.form){this.firstFormElement=K;break;}}for(J=I-1;J>=0;--J){K=L[J];if(this.form===K.form){this.lastFormElement=K;break;}}}},configClose:function(J,I,K){A.superclass.configClose.apply(this,arguments);},_doClose:function(I){B.preventDefault(I);this.cancel();},configButtons:function(S,R,M){var N=YAHOO.widget.Button,U=R[0],K=this.innerElement,T,P,J,Q,O,I,L;D.call(this);this._aButtons=null;if(F.isArray(U)){O=document.createElement("span");O.className="button-group";Q=U.length;this._aButtons=[];this.defaultHtmlButton=null;for(L=0;L<Q;L++){T=U[L];if(N){J=new N({label:T.text});J.appendTo(O);P=J.get("element");if(T.isDefault){J.addClass("default");this.defaultHtmlButton=P;}if(F.isFunction(T.handler)){J.set("onclick",{fn:T.handler,obj:this,scope:this});}else{if(F.isObject(T.handler)&&F.isFunction(T.handler.fn)){J.set("onclick",{fn:T.handler.fn,obj:((!F.isUndefined(T.handler.obj))?T.handler.obj:this),scope:(T.handler.scope||this)});}}this._aButtons[this._aButtons.length]=J;}else{P=document.createElement("button");P.setAttribute("type","button");if(T.isDefault){P.className="default";this.defaultHtmlButton=P;}P.innerHTML=T.text;if(F.isFunction(T.handler)){B.on(P,"click",T.handler,this,true);}else{if(F.isObject(T.handler)&&F.isFunction(T.handler.fn)){B.on(P,"click",T.handler.fn,((!F.isUndefined(T.handler.obj))?T.handler.obj:this),(T.handler.scope||this));}}O.appendChild(P);this._aButtons[this._aButtons.length]=P;}T.htmlButton=P;if(L===0){this.firstButton=P;}if(L==(Q-1)){this.lastButton=P;}}this.setFooter(O);I=this.footer;if(E.inDocument(this.element)&&!E.isAncestor(K,I)){K.appendChild(I);}this.buttonSpan=O;}else{O=this.buttonSpan;I=this.footer;if(O&&I){I.removeChild(O);this.buttonSpan=null;this.firstButton=null;this.lastButton=null;this.defaultHtmlButton=null;}}this.changeContentEvent.fire();},getButtons:function(){return this._aButtons||null;},focusFirst:function(K,I,M){var J=this.firstFormElement;if(I&&I[1]){B.stopEvent(I[1]);}if(J){try{J.focus();}catch(L){}}else{if(this.defaultHtmlButton){this.focusDefaultButton();}else{this.focusFirstButton();}}},focusLast:function(K,I,M){var N=this.cfg.getProperty("buttons"),J=this.lastFormElement;if(I&&I[1]){B.stopEvent(I[1]);}if(N&&F.isArray(N)){this.focusLastButton();}else{if(J){try{J.focus();}catch(L){}}}},_getButton:function(J){var I=YAHOO.widget.Button;if(I&&J&&J.nodeName&&J.id){J=I.getButton(J.id)||J;}return J;},focusDefaultButton:function(){var I=this._getButton(this.defaultHtmlButton);if(I){try{I.focus();}catch(J){}}},blurButtons:function(){var N=this.cfg.getProperty("buttons"),K,M,J,I;if(N&&F.isArray(N)){K=N.length;if(K>0){I=(K-1);do{M=N[I];if(M){J=this._getButton(M.htmlButton);if(J){try{J.blur();}catch(L){}}}}while(I--);}}},focusFirstButton:function(){var L=this.cfg.getProperty("buttons"),K,I;if(L&&F.isArray(L)){K=L[0];if(K){I=this._getButton(K.htmlButton);
if(I){try{I.focus();}catch(J){}}}}},focusLastButton:function(){var M=this.cfg.getProperty("buttons"),J,L,I;if(M&&F.isArray(M)){J=M.length;if(J>0){L=M[(J-1)];if(L){I=this._getButton(L.htmlButton);if(I){try{I.focus();}catch(K){}}}}}},configPostMethod:function(J,I,K){this.registerForm();},validate:function(){return true;},submit:function(){if(this.validate()){if(this.beforeSubmitEvent.fire()){this.doSubmit();this.submitEvent.fire();if(this.cfg.getProperty("hideaftersubmit")){this.hide();}return true;}else{return false;}}else{return false;}},cancel:function(){this.cancelEvent.fire();this.hide();},getData:function(){var Y=this.form,J,R,U,L,S,P,O,I,V,K,W,Z,N,a,M,X,T;function Q(c){var b=c.tagName.toUpperCase();return((b=="INPUT"||b=="TEXTAREA"||b=="SELECT")&&c.name==L);}if(Y){J=Y.elements;R=J.length;U={};for(X=0;X<R;X++){L=J[X].name;S=E.getElementsBy(Q,"*",Y);P=S.length;if(P>0){if(P==1){S=S[0];O=S.type;I=S.tagName.toUpperCase();switch(I){case"INPUT":if(O=="checkbox"){U[L]=S.checked;}else{if(O!="radio"){U[L]=S.value;}}break;case"TEXTAREA":U[L]=S.value;break;case"SELECT":V=S.options;K=V.length;W=[];for(T=0;T<K;T++){Z=V[T];if(Z.selected){M=Z.attributes.value;W[W.length]=(M&&M.specified)?Z.value:Z.text;}}U[L]=W;break;}}else{O=S[0].type;switch(O){case"radio":for(T=0;T<P;T++){N=S[T];if(N.checked){U[L]=N.value;break;}}break;case"checkbox":W=[];for(T=0;T<P;T++){a=S[T];if(a.checked){W[W.length]=a.value;}}U[L]=W;break;}}}}}return U;},destroy:function(){D.call(this);this._aButtons=null;var I=this.element.getElementsByTagName("form"),J;if(I.length>0){J=I[0];if(J){B.purgeElement(J);if(J.parentNode){J.parentNode.removeChild(J);}this.form=null;}}A.superclass.destroy.call(this);},toString:function(){return"Dialog "+this.id;}});}());(function(){YAHOO.widget.SimpleDialog=function(E,D){YAHOO.widget.SimpleDialog.superclass.constructor.call(this,E,D);};var C=YAHOO.util.Dom,B=YAHOO.widget.SimpleDialog,A={"ICON":{key:"icon",value:"none",suppressEvent:true},"TEXT":{key:"text",value:"",suppressEvent:true,supercedes:["icon"]}};B.ICON_BLOCK="blckicon";B.ICON_ALARM="alrticon";B.ICON_HELP="hlpicon";B.ICON_INFO="infoicon";B.ICON_WARN="warnicon";B.ICON_TIP="tipicon";B.ICON_CSS_CLASSNAME="yui-icon";B.CSS_SIMPLEDIALOG="yui-simple-dialog";YAHOO.extend(B,YAHOO.widget.Dialog,{initDefaultConfig:function(){B.superclass.initDefaultConfig.call(this);this.cfg.addProperty(A.ICON.key,{handler:this.configIcon,value:A.ICON.value,suppressEvent:A.ICON.suppressEvent});this.cfg.addProperty(A.TEXT.key,{handler:this.configText,value:A.TEXT.value,suppressEvent:A.TEXT.suppressEvent,supercedes:A.TEXT.supercedes});},init:function(E,D){B.superclass.init.call(this,E);this.beforeInitEvent.fire(B);C.addClass(this.element,B.CSS_SIMPLEDIALOG);this.cfg.queueProperty("postmethod","manual");if(D){this.cfg.applyConfig(D,true);}this.beforeRenderEvent.subscribe(function(){if(!this.body){this.setBody("");}},this,true);this.initEvent.fire(B);},registerForm:function(){B.superclass.registerForm.call(this);this.form.innerHTML+='<input type="hidden" name="'+this.id+'" value=""/>';},configIcon:function(K,J,H){var D=J[0],E=this.body,F=B.ICON_CSS_CLASSNAME,L,I,G;if(D&&D!="none"){L=C.getElementsByClassName(F,"*",E);if(L.length===1){I=L[0];G=I.parentNode;if(G){G.removeChild(I);I=null;}}if(D.indexOf(".")==-1){I=document.createElement("span");I.className=(F+" "+D);I.innerHTML="&#160;";}else{I=document.createElement("img");I.src=(this.imageRoot+D);I.className=F;}if(I){E.insertBefore(I,E.firstChild);}}},configText:function(E,D,F){var G=D[0];if(G){this.setBody(G);this.cfg.refireEvent("icon");}},toString:function(){return"SimpleDialog "+this.id;}});}());(function(){YAHOO.widget.ContainerEffect=function(E,H,G,D,F){if(!F){F=YAHOO.util.Anim;}this.overlay=E;this.attrIn=H;this.attrOut=G;this.targetElement=D||E.element;this.animClass=F;};var B=YAHOO.util.Dom,C=YAHOO.util.CustomEvent,A=YAHOO.widget.ContainerEffect;A.FADE=function(D,F){var G=YAHOO.util.Easing,I={attributes:{opacity:{from:0,to:1}},duration:F,method:G.easeIn},E={attributes:{opacity:{to:0}},duration:F,method:G.easeOut},H=new A(D,I,E,D.element);H.handleUnderlayStart=function(){var K=this.overlay.underlay;if(K&&YAHOO.env.ua.ie){var J=(K.filters&&K.filters.length>0);if(J){B.addClass(D.element,"yui-effect-fade");}}};H.handleUnderlayComplete=function(){var J=this.overlay.underlay;if(J&&YAHOO.env.ua.ie){B.removeClass(D.element,"yui-effect-fade");}};H.handleStartAnimateIn=function(K,J,L){B.addClass(L.overlay.element,"hide-select");if(!L.overlay.underlay){L.overlay.cfg.refireEvent("underlay");}L.handleUnderlayStart();L.overlay._setDomVisibility(true);B.setStyle(L.overlay.element,"opacity",0);};H.handleCompleteAnimateIn=function(K,J,L){B.removeClass(L.overlay.element,"hide-select");if(L.overlay.element.style.filter){L.overlay.element.style.filter=null;}L.handleUnderlayComplete();L.overlay.cfg.refireEvent("iframe");L.animateInCompleteEvent.fire();};H.handleStartAnimateOut=function(K,J,L){B.addClass(L.overlay.element,"hide-select");L.handleUnderlayStart();};H.handleCompleteAnimateOut=function(K,J,L){B.removeClass(L.overlay.element,"hide-select");if(L.overlay.element.style.filter){L.overlay.element.style.filter=null;}L.overlay._setDomVisibility(false);B.setStyle(L.overlay.element,"opacity",1);L.handleUnderlayComplete();L.overlay.cfg.refireEvent("iframe");L.animateOutCompleteEvent.fire();};H.init();return H;};A.SLIDE=function(F,D){var I=YAHOO.util.Easing,L=F.cfg.getProperty("x")||B.getX(F.element),K=F.cfg.getProperty("y")||B.getY(F.element),M=B.getClientWidth(),H=F.element.offsetWidth,J={attributes:{points:{to:[L,K]}},duration:D,method:I.easeIn},E={attributes:{points:{to:[(M+25),K]}},duration:D,method:I.easeOut},G=new A(F,J,E,F.element,YAHOO.util.Motion);G.handleStartAnimateIn=function(O,N,P){P.overlay.element.style.left=((-25)-H)+"px";P.overlay.element.style.top=K+"px";};G.handleTweenAnimateIn=function(Q,P,R){var S=B.getXY(R.overlay.element),O=S[0],N=S[1];if(B.getStyle(R.overlay.element,"visibility")=="hidden"&&O<L){R.overlay._setDomVisibility(true);
}R.overlay.cfg.setProperty("xy",[O,N],true);R.overlay.cfg.refireEvent("iframe");};G.handleCompleteAnimateIn=function(O,N,P){P.overlay.cfg.setProperty("xy",[L,K],true);P.startX=L;P.startY=K;P.overlay.cfg.refireEvent("iframe");P.animateInCompleteEvent.fire();};G.handleStartAnimateOut=function(O,N,R){var P=B.getViewportWidth(),S=B.getXY(R.overlay.element),Q=S[1];R.animOut.attributes.points.to=[(P+25),Q];};G.handleTweenAnimateOut=function(P,O,Q){var S=B.getXY(Q.overlay.element),N=S[0],R=S[1];Q.overlay.cfg.setProperty("xy",[N,R],true);Q.overlay.cfg.refireEvent("iframe");};G.handleCompleteAnimateOut=function(O,N,P){P.overlay._setDomVisibility(false);P.overlay.cfg.setProperty("xy",[L,K]);P.animateOutCompleteEvent.fire();};G.init();return G;};A.prototype={init:function(){this.beforeAnimateInEvent=this.createEvent("beforeAnimateIn");this.beforeAnimateInEvent.signature=C.LIST;this.beforeAnimateOutEvent=this.createEvent("beforeAnimateOut");this.beforeAnimateOutEvent.signature=C.LIST;this.animateInCompleteEvent=this.createEvent("animateInComplete");this.animateInCompleteEvent.signature=C.LIST;this.animateOutCompleteEvent=this.createEvent("animateOutComplete");this.animateOutCompleteEvent.signature=C.LIST;this.animIn=new this.animClass(this.targetElement,this.attrIn.attributes,this.attrIn.duration,this.attrIn.method);this.animIn.onStart.subscribe(this.handleStartAnimateIn,this);this.animIn.onTween.subscribe(this.handleTweenAnimateIn,this);this.animIn.onComplete.subscribe(this.handleCompleteAnimateIn,this);this.animOut=new this.animClass(this.targetElement,this.attrOut.attributes,this.attrOut.duration,this.attrOut.method);this.animOut.onStart.subscribe(this.handleStartAnimateOut,this);this.animOut.onTween.subscribe(this.handleTweenAnimateOut,this);this.animOut.onComplete.subscribe(this.handleCompleteAnimateOut,this);},animateIn:function(){this.beforeAnimateInEvent.fire();this.animIn.animate();},animateOut:function(){this.beforeAnimateOutEvent.fire();this.animOut.animate();},handleStartAnimateIn:function(E,D,F){},handleTweenAnimateIn:function(E,D,F){},handleCompleteAnimateIn:function(E,D,F){},handleStartAnimateOut:function(E,D,F){},handleTweenAnimateOut:function(E,D,F){},handleCompleteAnimateOut:function(E,D,F){},toString:function(){var D="ContainerEffect";if(this.overlay){D+=" ["+this.overlay.toString()+"]";}return D;}};YAHOO.lang.augmentProto(A,YAHOO.util.EventProvider);})();YAHOO.register("container",YAHOO.widget.Module,{version:"2.8.0r4",build:"2449"});// End of File include/javascript/yui/build/container/container-min.js
                                
/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
(function(){var A=YAHOO.util;A.Selector={_foundCache:[],_regexCache:{},_re:{nth:/^(?:([-]?\d*)(n){1}|(odd|even)$)*([-+]?\d*)$/,attr:/(\[.*\])/g,urls:/^(?:href|src)/},document:window.document,attrAliases:{},shorthand:{"\\#(-?[_a-z]+[-\\w]*)":"[id=$1]","\\.(-?[_a-z]+[-\\w]*)":"[class~=$1]"},operators:{"=":function(B,C){return B===C;},"!=":function(B,C){return B!==C;},"~=":function(B,D){var C=" ";return(C+B+C).indexOf((C+D+C))>-1;},"|=":function(B,C){return B===C||B.slice(0,C.length+1)===C+"-";},"^=":function(B,C){return B.indexOf(C)===0;},"$=":function(B,C){return B.slice(-C.length)===C;},"*=":function(B,C){return B.indexOf(C)>-1;},"":function(B,C){return B;}},pseudos:{"root":function(B){return B===B.ownerDocument.documentElement;},"nth-child":function(B,C){return A.Selector._getNth(B,C);},"nth-last-child":function(B,C){return A.Selector._getNth(B,C,null,true);},"nth-of-type":function(B,C){return A.Selector._getNth(B,C,B.tagName);},"nth-last-of-type":function(B,C){return A.Selector._getNth(B,C,B.tagName,true);},"first-child":function(B){return A.Selector._getChildren(B.parentNode)[0]===B;},"last-child":function(C){var B=A.Selector._getChildren(C.parentNode);return B[B.length-1]===C;},"first-of-type":function(B,C){return A.Selector._getChildren(B.parentNode,B.tagName)[0];},"last-of-type":function(C,D){var B=A.Selector._getChildren(C.parentNode,C.tagName);return B[B.length-1];},"only-child":function(C){var B=A.Selector._getChildren(C.parentNode);return B.length===1&&B[0]===C;},"only-of-type":function(B){return A.Selector._getChildren(B.parentNode,B.tagName).length===1;},"empty":function(B){return B.childNodes.length===0;},"not":function(B,C){return !A.Selector.test(B,C);},"contains":function(B,D){var C=B.innerText||B.textContent||"";return C.indexOf(D)>-1;},"checked":function(B){return B.checked===true;}},test:function(F,D){F=A.Selector.document.getElementById(F)||F;if(!F){return false;}var C=D?D.split(","):[];if(C.length){for(var E=0,B=C.length;E<B;++E){if(A.Selector._test(F,C[E])){return true;}}return false;}return A.Selector._test(F,D);},_test:function(D,G,F,E){F=F||A.Selector._tokenize(G).pop()||{};if(!D.tagName||(F.tag!=="*"&&D.tagName!==F.tag)||(E&&D._found)){return false;}if(F.attributes.length){var B,H,C=A.Selector._re.urls;if(!D.attributes||!D.attributes.length){return false;}for(var I=0,K;K=F.attributes[I++];){H=(C.test(K[0]))?2:0;B=D.getAttribute(K[0],H);if(B===null||B===undefined){return false;}if(A.Selector.operators[K[1]]&&!A.Selector.operators[K[1]](B,K[2])){return false;}}}if(F.pseudos.length){for(var I=0,J=F.pseudos.length;I<J;++I){if(A.Selector.pseudos[F.pseudos[I][0]]&&!A.Selector.pseudos[F.pseudos[I][0]](D,F.pseudos[I][1])){return false;}}}return(F.previous&&F.previous.combinator!==",")?A.Selector._combinators[F.previous.combinator](D,F):true;},filter:function(E,D){E=E||[];var G,C=[],H=A.Selector._tokenize(D);if(!E.item){for(var F=0,B=E.length;F<B;++F){if(!E[F].tagName){G=A.Selector.document.getElementById(E[F]);if(G){E[F]=G;}else{}}}}C=A.Selector._filter(E,A.Selector._tokenize(D)[0]);return C;},_filter:function(E,G,H,D){var C=H?null:[],I=A.Selector._foundCache;for(var F=0,B=E.length;F<B;F++){if(!A.Selector._test(E[F],"",G,D)){continue;}if(H){return E[F];}if(D){if(E[F]._found){continue;}E[F]._found=true;I[I.length]=E[F];}C[C.length]=E[F];}return C;},query:function(C,D,E){var B=A.Selector._query(C,D,E);return B;},_query:function(H,M,N,F){var P=(N)?null:[],E;if(!H){return P;}var D=H.split(",");if(D.length>1){var O;for(var I=0,J=D.length;I<J;++I){O=A.Selector._query(D[I],M,N,true);P=N?O:P.concat(O);}A.Selector._clearFoundCache();return P;}if(M&&!M.nodeName){M=A.Selector.document.getElementById(M);if(!M){return P;}}M=M||A.Selector.document;if(M.nodeName!=="#document"){A.Dom.generateId(M);H=M.tagName+"#"+M.id+" "+H;E=M;M=M.ownerDocument;}var L=A.Selector._tokenize(H);var K=L[A.Selector._getIdTokenIndex(L)],B=[],C,G=L.pop()||{};if(K){C=A.Selector._getId(K.attributes);}if(C){E=E||A.Selector.document.getElementById(C);if(E&&(M.nodeName==="#document"||A.Dom.isAncestor(M,E))){if(A.Selector._test(E,null,K)){if(K===G){B=[E];}else{if(K.combinator===" "||K.combinator===">"){M=E;}}}}else{return P;}}if(M&&!B.length){B=M.getElementsByTagName(G.tag);}if(B.length){P=A.Selector._filter(B,G,N,F);}return P;},_clearFoundCache:function(){var E=A.Selector._foundCache;for(var C=0,B=E.length;C<B;++C){try{delete E[C]._found;}catch(D){E[C].removeAttribute("_found");}}E=[];},_getRegExp:function(D,B){var C=A.Selector._regexCache;B=B||"";if(!C[D+B]){C[D+B]=new RegExp(D,B);}return C[D+B];},_getChildren:function(){if(document.documentElement.children&&document.documentElement.children.tags){return function(C,B){return(B)?C.children.tags(B):C.children||[];};}else{return function(F,C){var E=[],G=F.childNodes;for(var D=0,B=G.length;D<B;++D){if(G[D].tagName){if(!C||G[D].tagName===C){E.push(G[D]);}}}return E;};}}(),_combinators:{" ":function(C,B){while((C=C.parentNode)){if(A.Selector._test(C,"",B.previous)){return true;}}return false;},">":function(C,B){return A.Selector._test(C.parentNode,null,B.previous);},"+":function(D,C){var B=D.previousSibling;while(B&&B.nodeType!==1){B=B.previousSibling;}if(B&&A.Selector._test(B,null,C.previous)){return true;}return false;},"~":function(D,C){var B=D.previousSibling;while(B){if(B.nodeType===1&&A.Selector._test(B,null,C.previous)){return true;}B=B.previousSibling;}return false;}},_getNth:function(C,L,N,G){A.Selector._re.nth.test(L);var K=parseInt(RegExp.$1,10),B=RegExp.$2,H=RegExp.$3,I=parseInt(RegExp.$4,10)||0,M=[],E;var J=A.Selector._getChildren(C.parentNode,N);if(H){K=2;E="+";B="n";I=(H==="odd")?1:0;}else{if(isNaN(K)){K=(B)?1:0;}}if(K===0){if(G){I=J.length-I+1;}if(J[I-1]===C){return true;}else{return false;}}else{if(K<0){G=!!G;K=Math.abs(K);}}if(!G){for(var D=I-1,F=J.length;D<F;D+=K){if(D>=0&&J[D]===C){return true;}}}else{for(var D=J.length-I,F=J.length;D>=0;D-=K){if(D<F&&J[D]===C){return true;}}}return false;},_getId:function(C){for(var D=0,B=C.length;D<B;++D){if(C[D][0]=="id"&&C[D][1]==="="){return C[D][2];
}}},_getIdTokenIndex:function(D){for(var C=0,B=D.length;C<B;++C){if(A.Selector._getId(D[C].attributes)){return C;}}return -1;},_patterns:{tag:/^((?:-?[_a-z]+[\w-]*)|\*)/i,attributes:/^\[([a-z]+\w*)+([~\|\^\$\*!=]=?)?['"]?([^\]]*?)['"]?\]/i,pseudos:/^:([-\w]+)(?:\(['"]?(.+)['"]?\))*/i,combinator:/^\s*([>+~]|\s)\s*/},_tokenize:function(B){var D={},H=[],I,G=false,F=A.Selector._patterns,C;B=A.Selector._replaceShorthand(B);do{G=false;for(var E in F){if(YAHOO.lang.hasOwnProperty(F,E)){if(E!="tag"&&E!="combinator"){D[E]=D[E]||[];}if((C=F[E].exec(B))){G=true;if(E!="tag"&&E!="combinator"){if(E==="attributes"&&C[1]==="id"){D.id=C[3];}D[E].push(C.slice(1));}else{D[E]=C[1];}B=B.replace(C[0],"");if(E==="combinator"||!B.length){D.attributes=A.Selector._fixAttributes(D.attributes);D.pseudos=D.pseudos||[];D.tag=D.tag?D.tag.toUpperCase():"*";H.push(D);D={previous:D};}}}}}while(G);return H;},_fixAttributes:function(C){var D=A.Selector.attrAliases;C=C||[];for(var E=0,B=C.length;E<B;++E){if(D[C[E][0]]){C[E][0]=D[C[E][0]];}if(!C[E][1]){C[E][1]="";}}return C;},_replaceShorthand:function(C){var D=A.Selector.shorthand;var E=C.match(A.Selector._re.attr);if(E){C=C.replace(A.Selector._re.attr,"REPLACED_ATTRIBUTE");}for(var G in D){if(YAHOO.lang.hasOwnProperty(D,G)){C=C.replace(A.Selector._getRegExp(G,"gi"),D[G]);}}if(E){for(var F=0,B=E.length;F<B;++F){C=C.replace("REPLACED_ATTRIBUTE",E[F]);}}return C;}};if(YAHOO.env.ua.ie&&YAHOO.env.ua.ie<8){A.Selector.attrAliases["class"]="className";A.Selector.attrAliases["for"]="htmlFor";}})();YAHOO.register("selector",YAHOO.util.Selector,{version:"2.8.0r4",build:"2449"});// End of File include/javascript/yui/build/selector/selector-min.js
                                

/* Copyright (c) 2006 Yahoo! Inc. All rights reserved. */

/**
 * @class a YAHOO.util.DDProxy implementation. During the drag over event, the
 * dragged element is inserted before the dragged-over element.
 *
 * @extends YAHOO.util.DDProxy
 * @constructor
 * @param {String} id the id of the linked element
 * @param {String} sGroup the group of related DragDrop objects
 */
function ygDDList(id, sGroup) {

	if (id) {
		this.init(id, sGroup);
		this.initFrame();
		//this.logger = new ygLogger("ygDDList");
	}

	var s = this.getDragEl().style;
	s.borderColor = "transparent";
	s.backgroundColor = "#f6f5e5";
	s.opacity = 0.76;
	s.filter = "alpha(opacity=76)";
}

ygDDList.prototype = new YAHOO.util.DDProxy();

ygDDList.prototype.borderDiv = null;
ygDDList.prototype.originalDisplayProperties = Array();

ygDDList.prototype.startDrag = function(x, y) {
	//this.logger.debug(this.id + " startDrag");

	var dragEl = this.getDragEl();
	var clickEl = this.getEl();

	dragEl.innerHTML = clickEl.innerHTML;
	dragElObjects = dragEl.getElementsByTagName('object');

	
	dragEl.className = clickEl.className;
	dragEl.style.color = clickEl.style.color;
	dragEl.style.border = "1px solid #aaa";

	// save the style of the object 
	clickElRegion = YAHOO.util.Dom.getRegion(clickEl);
	
	this.borderDiv = document.createElement('div'); // create a div to display border
	this.borderDiv.style.height = (clickElRegion.bottom - clickElRegion.top) + 'px';
	this.borderDiv.style.border = '2px dashed #cccccc';
	
	for(i in clickEl.childNodes) { // hide contents of the target elements contents
		if(typeof clickEl.childNodes[i].style != 'undefined') {
			this.originalDisplayProperties[i] = clickEl.childNodes[i].style.display;
			clickEl.childNodes[i].style.display = 'none';
		}

	}
	clickEl.appendChild(this.borderDiv);
};

ygDDList.prototype.endDrag = function(e) {
	// disable moving the linked element
	var clickEl = this.getEl();

	clickEl.removeChild(this.borderDiv); // remove border div
	
	for(i in clickEl.childNodes) { // show target elements contents
		if(typeof clickEl.childNodes[i].style != 'undefined') {
			clickEl.childNodes[i].style.display = this.originalDisplayProperties[i];
		}
	}
	
	if(this.clickHeight) 
	    clickEl.style.height = this.clickHeight;
	else 
		clickEl.style.height = '';
	
	if(this.clickBorder) 
	    clickEl.style.border = this.clickBorder;
	else 
		clickEl.style.border = '';
		
	dragEl = this.getDragEl();
	dragEl.innerHTML = '';

	this.afterEndDrag(e);
};

ygDDList.prototype.afterEndDrag = function(e) {

}

ygDDList.prototype.onDrag = function(e, id) {
    
};

ygDDList.prototype.onDragOver = function(e, id) {
	// this.logger.debug(this.id.toString() + " onDragOver " + id);
	var el;
        
    if ("string" == typeof id) {
        el = YAHOO.util.DDM.getElement(id);
    } else { 
        el = YAHOO.util.DDM.getBestMatch(id).getEl();
    }
    
	dragEl = this.getDragEl();
	elRegion = YAHOO.util.Dom.getRegion(el);
	    
//    this.logger.debug('id: ' + el.id);
//    this.logger.debug('size: ' + (elRegion.bottom - elRegion.top));
//    this.logger.debug('getPosY: ' + YAHOO.util.DDM.getPosY(el));
	var mid = YAHOO.util.DDM.getPosY(el) + (Math.floor((elRegion.bottom - elRegion.top) / 2));
//    this.logger.debug('mid: ' + mid);
    	
//    this.logger.debug(YAHOO.util.DDM.getPosY(dragEl) + " <  " + mid);
//    this.logger.debug("Y: " + YAHOO.util.Event.getPageY(e));
	
	if (YAHOO.util.DDM.getPosY(dragEl) < mid ) { // insert on top triggering item
		var el2 = this.getEl();
		var p = el.parentNode;
		p.insertBefore(el2, el);
	}
	if (YAHOO.util.DDM.getPosY(dragEl) >= mid ) { // insert below triggered item
		var el2 = this.getEl();
		var p = el.parentNode;
		p.insertBefore(el2, el.nextSibling);
	}
};

ygDDList.prototype.onDragEnter = function(e, id) {
	// this.logger.debug(this.id.toString() + " onDragEnter " + id);
	// this.getDragEl().style.border = "1px solid #449629";
};

ygDDList.prototype.onDragOut = function(e, id) {
    // I need to know when we are over nothing
	// this.getDragEl().style.border = "1px solid #964428";
}

/////////////////////////////////////////////////////////////////////////////

function ygDDListBoundary(id, sGroup) {
	if (id) {
		this.init(id, sGroup);
		//this.logger = new ygLogger("ygDDListBoundary");
		this.isBoundary = true;
	}
}

ygDDListBoundary.prototype = new YAHOO.util.DDTarget();
// End of File include/javascript/yui/ygDDList.js
                                
/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
(function(){var lang=YAHOO.lang,util=YAHOO.util,Ev=util.Event;util.DataSourceBase=function(oLiveData,oConfigs){if(oLiveData===null||oLiveData===undefined){return;}this.liveData=oLiveData;this._oQueue={interval:null,conn:null,requests:[]};this.responseSchema={};if(oConfigs&&(oConfigs.constructor==Object)){for(var sConfig in oConfigs){if(sConfig){this[sConfig]=oConfigs[sConfig];}}}var maxCacheEntries=this.maxCacheEntries;if(!lang.isNumber(maxCacheEntries)||(maxCacheEntries<0)){maxCacheEntries=0;}this._aIntervals=[];this.createEvent("cacheRequestEvent");this.createEvent("cacheResponseEvent");this.createEvent("requestEvent");this.createEvent("responseEvent");this.createEvent("responseParseEvent");this.createEvent("responseCacheEvent");this.createEvent("dataErrorEvent");this.createEvent("cacheFlushEvent");var DS=util.DataSourceBase;this._sName="DataSource instance"+DS._nIndex;DS._nIndex++;};var DS=util.DataSourceBase;lang.augmentObject(DS,{TYPE_UNKNOWN:-1,TYPE_JSARRAY:0,TYPE_JSFUNCTION:1,TYPE_XHR:2,TYPE_JSON:3,TYPE_XML:4,TYPE_TEXT:5,TYPE_HTMLTABLE:6,TYPE_SCRIPTNODE:7,TYPE_LOCAL:8,ERROR_DATAINVALID:"Invalid data",ERROR_DATANULL:"Null data",_nIndex:0,_nTransactionId:0,_getLocationValue:function(field,context){var locator=field.locator||field.key||field,xmldoc=context.ownerDocument||context,result,res,value=null;try{if(!lang.isUndefined(xmldoc.evaluate)){result=xmldoc.evaluate(locator,context,xmldoc.createNSResolver(!context.ownerDocument?context.documentElement:context.ownerDocument.documentElement),0,null);while(res=result.iterateNext()){value=res.textContent;}}else{xmldoc.setProperty("SelectionLanguage","XPath");result=context.selectNodes(locator)[0];value=result.value||result.text||null;}return value;}catch(e){}},issueCallback:function(callback,params,error,scope){if(lang.isFunction(callback)){callback.apply(scope,params);}else{if(lang.isObject(callback)){scope=callback.scope||scope||window;var callbackFunc=callback.success;if(error){callbackFunc=callback.failure;}if(callbackFunc){callbackFunc.apply(scope,params.concat([callback.argument]));}}}},parseString:function(oData){if(!lang.isValue(oData)){return null;}var string=oData+"";if(lang.isString(string)){return string;}else{return null;}},parseNumber:function(oData){if(!lang.isValue(oData)||(oData==="")){return null;}var number=oData*1;if(lang.isNumber(number)){return number;}else{return null;}},convertNumber:function(oData){return DS.parseNumber(oData);},parseDate:function(oData){var date=null;if(!(oData instanceof Date)){date=new Date(oData);}else{return oData;}if(date instanceof Date){return date;}else{return null;}},convertDate:function(oData){return DS.parseDate(oData);}});DS.Parser={string:DS.parseString,number:DS.parseNumber,date:DS.parseDate};DS.prototype={_sName:null,_aCache:null,_oQueue:null,_aIntervals:null,maxCacheEntries:0,liveData:null,dataType:DS.TYPE_UNKNOWN,responseType:DS.TYPE_UNKNOWN,responseSchema:null,useXPath:false,toString:function(){return this._sName;},getCachedResponse:function(oRequest,oCallback,oCaller){var aCache=this._aCache;if(this.maxCacheEntries>0){if(!aCache){this._aCache=[];}else{var nCacheLength=aCache.length;if(nCacheLength>0){var oResponse=null;this.fireEvent("cacheRequestEvent",{request:oRequest,callback:oCallback,caller:oCaller});for(var i=nCacheLength-1;i>=0;i--){var oCacheElem=aCache[i];if(this.isCacheHit(oRequest,oCacheElem.request)){oResponse=oCacheElem.response;this.fireEvent("cacheResponseEvent",{request:oRequest,response:oResponse,callback:oCallback,caller:oCaller});if(i<nCacheLength-1){aCache.splice(i,1);this.addToCache(oRequest,oResponse);}oResponse.cached=true;break;}}return oResponse;}}}else{if(aCache){this._aCache=null;}}return null;},isCacheHit:function(oRequest,oCachedRequest){return(oRequest===oCachedRequest);},addToCache:function(oRequest,oResponse){var aCache=this._aCache;if(!aCache){return;}while(aCache.length>=this.maxCacheEntries){aCache.shift();}var oCacheElem={request:oRequest,response:oResponse};aCache[aCache.length]=oCacheElem;this.fireEvent("responseCacheEvent",{request:oRequest,response:oResponse});},flushCache:function(){if(this._aCache){this._aCache=[];this.fireEvent("cacheFlushEvent");}},setInterval:function(nMsec,oRequest,oCallback,oCaller){if(lang.isNumber(nMsec)&&(nMsec>=0)){var oSelf=this;var nId=setInterval(function(){oSelf.makeConnection(oRequest,oCallback,oCaller);},nMsec);this._aIntervals.push(nId);return nId;}else{}},clearInterval:function(nId){var tracker=this._aIntervals||[];for(var i=tracker.length-1;i>-1;i--){if(tracker[i]===nId){tracker.splice(i,1);clearInterval(nId);}}},clearAllIntervals:function(){var tracker=this._aIntervals||[];for(var i=tracker.length-1;i>-1;i--){clearInterval(tracker[i]);}tracker=[];},sendRequest:function(oRequest,oCallback,oCaller){var oCachedResponse=this.getCachedResponse(oRequest,oCallback,oCaller);if(oCachedResponse){DS.issueCallback(oCallback,[oRequest,oCachedResponse],false,oCaller);return null;}return this.makeConnection(oRequest,oCallback,oCaller);},makeConnection:function(oRequest,oCallback,oCaller){var tId=DS._nTransactionId++;this.fireEvent("requestEvent",{tId:tId,request:oRequest,callback:oCallback,caller:oCaller});var oRawResponse=this.liveData;this.handleResponse(oRequest,oRawResponse,oCallback,oCaller,tId);return tId;},handleResponse:function(oRequest,oRawResponse,oCallback,oCaller,tId){this.fireEvent("responseEvent",{tId:tId,request:oRequest,response:oRawResponse,callback:oCallback,caller:oCaller});var xhr=(this.dataType==DS.TYPE_XHR)?true:false;var oParsedResponse=null;var oFullResponse=oRawResponse;if(this.responseType===DS.TYPE_UNKNOWN){var ctype=(oRawResponse&&oRawResponse.getResponseHeader)?oRawResponse.getResponseHeader["Content-Type"]:null;if(ctype){if(ctype.indexOf("text/xml")>-1){this.responseType=DS.TYPE_XML;}else{if(ctype.indexOf("application/json")>-1){this.responseType=DS.TYPE_JSON;}else{if(ctype.indexOf("text/plain")>-1){this.responseType=DS.TYPE_TEXT;}}}}else{if(YAHOO.lang.isArray(oRawResponse)){this.responseType=DS.TYPE_JSARRAY;
}else{if(oRawResponse&&oRawResponse.nodeType&&(oRawResponse.nodeType===9||oRawResponse.nodeType===1||oRawResponse.nodeType===11)){this.responseType=DS.TYPE_XML;}else{if(oRawResponse&&oRawResponse.nodeName&&(oRawResponse.nodeName.toLowerCase()=="table")){this.responseType=DS.TYPE_HTMLTABLE;}else{if(YAHOO.lang.isObject(oRawResponse)){this.responseType=DS.TYPE_JSON;}else{if(YAHOO.lang.isString(oRawResponse)){this.responseType=DS.TYPE_TEXT;}}}}}}}switch(this.responseType){case DS.TYPE_JSARRAY:if(xhr&&oRawResponse&&oRawResponse.responseText){oFullResponse=oRawResponse.responseText;}try{if(lang.isString(oFullResponse)){var parseArgs=[oFullResponse].concat(this.parseJSONArgs);if(lang.JSON){oFullResponse=lang.JSON.parse.apply(lang.JSON,parseArgs);}else{if(window.JSON&&JSON.parse){oFullResponse=JSON.parse.apply(JSON,parseArgs);}else{if(oFullResponse.parseJSON){oFullResponse=oFullResponse.parseJSON.apply(oFullResponse,parseArgs.slice(1));}else{while(oFullResponse.length>0&&(oFullResponse.charAt(0)!="{")&&(oFullResponse.charAt(0)!="[")){oFullResponse=oFullResponse.substring(1,oFullResponse.length);}if(oFullResponse.length>0){var arrayEnd=Math.max(oFullResponse.lastIndexOf("]"),oFullResponse.lastIndexOf("}"));oFullResponse=oFullResponse.substring(0,arrayEnd+1);oFullResponse=eval("("+oFullResponse+")");}}}}}}catch(e1){}oFullResponse=this.doBeforeParseData(oRequest,oFullResponse,oCallback);oParsedResponse=this.parseArrayData(oRequest,oFullResponse);break;case DS.TYPE_JSON:if(xhr&&oRawResponse&&oRawResponse.responseText){oFullResponse=oRawResponse.responseText;}try{if(lang.isString(oFullResponse)){var parseArgs=[oFullResponse].concat(this.parseJSONArgs);if(lang.JSON){oFullResponse=lang.JSON.parse.apply(lang.JSON,parseArgs);}else{if(window.JSON&&JSON.parse){oFullResponse=JSON.parse.apply(JSON,parseArgs);}else{if(oFullResponse.parseJSON){oFullResponse=oFullResponse.parseJSON.apply(oFullResponse,parseArgs.slice(1));}else{while(oFullResponse.length>0&&(oFullResponse.charAt(0)!="{")&&(oFullResponse.charAt(0)!="[")){oFullResponse=oFullResponse.substring(1,oFullResponse.length);}if(oFullResponse.length>0){var objEnd=Math.max(oFullResponse.lastIndexOf("]"),oFullResponse.lastIndexOf("}"));oFullResponse=oFullResponse.substring(0,objEnd+1);oFullResponse=eval("("+oFullResponse+")");}}}}}}catch(e){}oFullResponse=this.doBeforeParseData(oRequest,oFullResponse,oCallback);oParsedResponse=this.parseJSONData(oRequest,oFullResponse);break;case DS.TYPE_HTMLTABLE:if(xhr&&oRawResponse.responseText){var el=document.createElement("div");el.innerHTML=oRawResponse.responseText;oFullResponse=el.getElementsByTagName("table")[0];}oFullResponse=this.doBeforeParseData(oRequest,oFullResponse,oCallback);oParsedResponse=this.parseHTMLTableData(oRequest,oFullResponse);break;case DS.TYPE_XML:if(xhr&&oRawResponse.responseXML){oFullResponse=oRawResponse.responseXML;}oFullResponse=this.doBeforeParseData(oRequest,oFullResponse,oCallback);oParsedResponse=this.parseXMLData(oRequest,oFullResponse);break;case DS.TYPE_TEXT:if(xhr&&lang.isString(oRawResponse.responseText)){oFullResponse=oRawResponse.responseText;}oFullResponse=this.doBeforeParseData(oRequest,oFullResponse,oCallback);oParsedResponse=this.parseTextData(oRequest,oFullResponse);break;default:oFullResponse=this.doBeforeParseData(oRequest,oFullResponse,oCallback);oParsedResponse=this.parseData(oRequest,oFullResponse);break;}oParsedResponse=oParsedResponse||{};if(!oParsedResponse.results){oParsedResponse.results=[];}if(!oParsedResponse.meta){oParsedResponse.meta={};}if(!oParsedResponse.error){oParsedResponse=this.doBeforeCallback(oRequest,oFullResponse,oParsedResponse,oCallback);this.fireEvent("responseParseEvent",{request:oRequest,response:oParsedResponse,callback:oCallback,caller:oCaller});this.addToCache(oRequest,oParsedResponse);}else{oParsedResponse.error=true;this.fireEvent("dataErrorEvent",{request:oRequest,response:oRawResponse,callback:oCallback,caller:oCaller,message:DS.ERROR_DATANULL});}oParsedResponse.tId=tId;DS.issueCallback(oCallback,[oRequest,oParsedResponse],oParsedResponse.error,oCaller);},doBeforeParseData:function(oRequest,oFullResponse,oCallback){return oFullResponse;},doBeforeCallback:function(oRequest,oFullResponse,oParsedResponse,oCallback){return oParsedResponse;},parseData:function(oRequest,oFullResponse){if(lang.isValue(oFullResponse)){var oParsedResponse={results:oFullResponse,meta:{}};return oParsedResponse;}return null;},parseArrayData:function(oRequest,oFullResponse){if(lang.isArray(oFullResponse)){var results=[],i,j,rec,field,data;if(lang.isArray(this.responseSchema.fields)){var fields=this.responseSchema.fields;for(i=fields.length-1;i>=0;--i){if(typeof fields[i]!=="object"){fields[i]={key:fields[i]};}}var parsers={},p;for(i=fields.length-1;i>=0;--i){p=(typeof fields[i].parser==="function"?fields[i].parser:DS.Parser[fields[i].parser+""])||fields[i].converter;if(p){parsers[fields[i].key]=p;}}var arrType=lang.isArray(oFullResponse[0]);for(i=oFullResponse.length-1;i>-1;i--){var oResult={};rec=oFullResponse[i];if(typeof rec==="object"){for(j=fields.length-1;j>-1;j--){field=fields[j];data=arrType?rec[j]:rec[field.key];if(parsers[field.key]){data=parsers[field.key].call(this,data);}if(data===undefined){data=null;}oResult[field.key]=data;}}else{if(lang.isString(rec)){for(j=fields.length-1;j>-1;j--){field=fields[j];data=rec;if(parsers[field.key]){data=parsers[field.key].call(this,data);}if(data===undefined){data=null;}oResult[field.key]=data;}}}results[i]=oResult;}}else{results=oFullResponse;}var oParsedResponse={results:results};return oParsedResponse;}return null;},parseTextData:function(oRequest,oFullResponse){if(lang.isString(oFullResponse)){if(lang.isString(this.responseSchema.recordDelim)&&lang.isString(this.responseSchema.fieldDelim)){var oParsedResponse={results:[]};var recDelim=this.responseSchema.recordDelim;var fieldDelim=this.responseSchema.fieldDelim;if(oFullResponse.length>0){var newLength=oFullResponse.length-recDelim.length;if(oFullResponse.substr(newLength)==recDelim){oFullResponse=oFullResponse.substr(0,newLength);
}if(oFullResponse.length>0){var recordsarray=oFullResponse.split(recDelim);for(var i=0,len=recordsarray.length,recIdx=0;i<len;++i){var bError=false,sRecord=recordsarray[i];if(lang.isString(sRecord)&&(sRecord.length>0)){var fielddataarray=recordsarray[i].split(fieldDelim);var oResult={};if(lang.isArray(this.responseSchema.fields)){var fields=this.responseSchema.fields;for(var j=fields.length-1;j>-1;j--){try{var data=fielddataarray[j];if(lang.isString(data)){if(data.charAt(0)=='"'){data=data.substr(1);}if(data.charAt(data.length-1)=='"'){data=data.substr(0,data.length-1);}var field=fields[j];var key=(lang.isValue(field.key))?field.key:field;if(!field.parser&&field.converter){field.parser=field.converter;}var parser=(typeof field.parser==="function")?field.parser:DS.Parser[field.parser+""];if(parser){data=parser.call(this,data);}if(data===undefined){data=null;}oResult[key]=data;}else{bError=true;}}catch(e){bError=true;}}}else{oResult=fielddataarray;}if(!bError){oParsedResponse.results[recIdx++]=oResult;}}}}}return oParsedResponse;}}return null;},parseXMLResult:function(result){var oResult={},schema=this.responseSchema;try{for(var m=schema.fields.length-1;m>=0;m--){var field=schema.fields[m];var key=(lang.isValue(field.key))?field.key:field;var data=null;if(this.useXPath){data=YAHOO.util.DataSource._getLocationValue(field,result);}else{var xmlAttr=result.attributes.getNamedItem(key);if(xmlAttr){data=xmlAttr.value;}else{var xmlNode=result.getElementsByTagName(key);if(xmlNode&&xmlNode.item(0)){var item=xmlNode.item(0);data=(item)?((item.text)?item.text:(item.textContent)?item.textContent:null):null;if(!data){var datapieces=[];for(var j=0,len=item.childNodes.length;j<len;j++){if(item.childNodes[j].nodeValue){datapieces[datapieces.length]=item.childNodes[j].nodeValue;}}if(datapieces.length>0){data=datapieces.join("");}}}}}if(data===null){data="";}if(!field.parser&&field.converter){field.parser=field.converter;}var parser=(typeof field.parser==="function")?field.parser:DS.Parser[field.parser+""];if(parser){data=parser.call(this,data);}if(data===undefined){data=null;}oResult[key]=data;}}catch(e){}return oResult;},parseXMLData:function(oRequest,oFullResponse){var bError=false,schema=this.responseSchema,oParsedResponse={meta:{}},xmlList=null,metaNode=schema.metaNode,metaLocators=schema.metaFields||{},i,k,loc,v;try{if(this.useXPath){for(k in metaLocators){oParsedResponse.meta[k]=YAHOO.util.DataSource._getLocationValue(metaLocators[k],oFullResponse);}}else{metaNode=metaNode?oFullResponse.getElementsByTagName(metaNode)[0]:oFullResponse;if(metaNode){for(k in metaLocators){if(lang.hasOwnProperty(metaLocators,k)){loc=metaLocators[k];v=metaNode.getElementsByTagName(loc)[0];if(v){v=v.firstChild.nodeValue;}else{v=metaNode.attributes.getNamedItem(loc);if(v){v=v.value;}}if(lang.isValue(v)){oParsedResponse.meta[k]=v;}}}}}xmlList=(schema.resultNode)?oFullResponse.getElementsByTagName(schema.resultNode):null;}catch(e){}if(!xmlList||!lang.isArray(schema.fields)){bError=true;}else{oParsedResponse.results=[];for(i=xmlList.length-1;i>=0;--i){var oResult=this.parseXMLResult(xmlList.item(i));oParsedResponse.results[i]=oResult;}}if(bError){oParsedResponse.error=true;}else{}return oParsedResponse;},parseJSONData:function(oRequest,oFullResponse){var oParsedResponse={results:[],meta:{}};if(lang.isObject(oFullResponse)&&this.responseSchema.resultsList){var schema=this.responseSchema,fields=schema.fields,resultsList=oFullResponse,results=[],metaFields=schema.metaFields||{},fieldParsers=[],fieldPaths=[],simpleFields=[],bError=false,i,len,j,v,key,parser,path;var buildPath=function(needle){var path=null,keys=[],i=0;if(needle){needle=needle.replace(/\[(['"])(.*?)\1\]/g,function(x,$1,$2){keys[i]=$2;return".@"+(i++);}).replace(/\[(\d+)\]/g,function(x,$1){keys[i]=parseInt($1,10)|0;return".@"+(i++);}).replace(/^\./,"");if(!/[^\w\.\$@]/.test(needle)){path=needle.split(".");for(i=path.length-1;i>=0;--i){if(path[i].charAt(0)==="@"){path[i]=keys[parseInt(path[i].substr(1),10)];}}}else{}}return path;};var walkPath=function(path,origin){var v=origin,i=0,len=path.length;for(;i<len&&v;++i){v=v[path[i]];}return v;};path=buildPath(schema.resultsList);if(path){resultsList=walkPath(path,oFullResponse);if(resultsList===undefined){bError=true;}}else{bError=true;}if(!resultsList){resultsList=[];}if(!lang.isArray(resultsList)){resultsList=[resultsList];}if(!bError){if(schema.fields){var field;for(i=0,len=fields.length;i<len;i++){field=fields[i];key=field.key||field;parser=((typeof field.parser==="function")?field.parser:DS.Parser[field.parser+""])||field.converter;path=buildPath(key);if(parser){fieldParsers[fieldParsers.length]={key:key,parser:parser};}if(path){if(path.length>1){fieldPaths[fieldPaths.length]={key:key,path:path};}else{simpleFields[simpleFields.length]={key:key,path:path[0]};}}else{}}for(i=resultsList.length-1;i>=0;--i){var r=resultsList[i],rec={};if(r){for(j=simpleFields.length-1;j>=0;--j){rec[simpleFields[j].key]=(r[simpleFields[j].path]!==undefined)?r[simpleFields[j].path]:r[j];}for(j=fieldPaths.length-1;j>=0;--j){rec[fieldPaths[j].key]=walkPath(fieldPaths[j].path,r);}for(j=fieldParsers.length-1;j>=0;--j){var p=fieldParsers[j].key;rec[p]=fieldParsers[j].parser(rec[p]);if(rec[p]===undefined){rec[p]=null;}}}results[i]=rec;}}else{results=resultsList;}for(key in metaFields){if(lang.hasOwnProperty(metaFields,key)){path=buildPath(metaFields[key]);if(path){v=walkPath(path,oFullResponse);oParsedResponse.meta[key]=v;}}}}else{oParsedResponse.error=true;}oParsedResponse.results=results;}else{oParsedResponse.error=true;}return oParsedResponse;},parseHTMLTableData:function(oRequest,oFullResponse){var bError=false;var elTable=oFullResponse;var fields=this.responseSchema.fields;var oParsedResponse={results:[]};if(lang.isArray(fields)){for(var i=0;i<elTable.tBodies.length;i++){var elTbody=elTable.tBodies[i];for(var j=elTbody.rows.length-1;j>-1;j--){var elRow=elTbody.rows[j];var oResult={};for(var k=fields.length-1;k>-1;k--){var field=fields[k];var key=(lang.isValue(field.key))?field.key:field;
var data=elRow.cells[k].innerHTML;if(!field.parser&&field.converter){field.parser=field.converter;}var parser=(typeof field.parser==="function")?field.parser:DS.Parser[field.parser+""];if(parser){data=parser.call(this,data);}if(data===undefined){data=null;}oResult[key]=data;}oParsedResponse.results[j]=oResult;}}}else{bError=true;}if(bError){oParsedResponse.error=true;}else{}return oParsedResponse;}};lang.augmentProto(DS,util.EventProvider);util.LocalDataSource=function(oLiveData,oConfigs){this.dataType=DS.TYPE_LOCAL;if(oLiveData){if(YAHOO.lang.isArray(oLiveData)){this.responseType=DS.TYPE_JSARRAY;}else{if(oLiveData.nodeType&&oLiveData.nodeType==9){this.responseType=DS.TYPE_XML;}else{if(oLiveData.nodeName&&(oLiveData.nodeName.toLowerCase()=="table")){this.responseType=DS.TYPE_HTMLTABLE;oLiveData=oLiveData.cloneNode(true);}else{if(YAHOO.lang.isString(oLiveData)){this.responseType=DS.TYPE_TEXT;}else{if(YAHOO.lang.isObject(oLiveData)){this.responseType=DS.TYPE_JSON;}}}}}}else{oLiveData=[];this.responseType=DS.TYPE_JSARRAY;}util.LocalDataSource.superclass.constructor.call(this,oLiveData,oConfigs);};lang.extend(util.LocalDataSource,DS);lang.augmentObject(util.LocalDataSource,DS);util.FunctionDataSource=function(oLiveData,oConfigs){this.dataType=DS.TYPE_JSFUNCTION;oLiveData=oLiveData||function(){};util.FunctionDataSource.superclass.constructor.call(this,oLiveData,oConfigs);};lang.extend(util.FunctionDataSource,DS,{scope:null,makeConnection:function(oRequest,oCallback,oCaller){var tId=DS._nTransactionId++;this.fireEvent("requestEvent",{tId:tId,request:oRequest,callback:oCallback,caller:oCaller});var oRawResponse=(this.scope)?this.liveData.call(this.scope,oRequest,this):this.liveData(oRequest);if(this.responseType===DS.TYPE_UNKNOWN){if(YAHOO.lang.isArray(oRawResponse)){this.responseType=DS.TYPE_JSARRAY;}else{if(oRawResponse&&oRawResponse.nodeType&&oRawResponse.nodeType==9){this.responseType=DS.TYPE_XML;}else{if(oRawResponse&&oRawResponse.nodeName&&(oRawResponse.nodeName.toLowerCase()=="table")){this.responseType=DS.TYPE_HTMLTABLE;}else{if(YAHOO.lang.isObject(oRawResponse)){this.responseType=DS.TYPE_JSON;}else{if(YAHOO.lang.isString(oRawResponse)){this.responseType=DS.TYPE_TEXT;}}}}}}this.handleResponse(oRequest,oRawResponse,oCallback,oCaller,tId);return tId;}});lang.augmentObject(util.FunctionDataSource,DS);util.ScriptNodeDataSource=function(oLiveData,oConfigs){this.dataType=DS.TYPE_SCRIPTNODE;oLiveData=oLiveData||"";util.ScriptNodeDataSource.superclass.constructor.call(this,oLiveData,oConfigs);};lang.extend(util.ScriptNodeDataSource,DS,{getUtility:util.Get,asyncMode:"allowAll",scriptCallbackParam:"callback",generateRequestCallback:function(id){return"&"+this.scriptCallbackParam+"=YAHOO.util.ScriptNodeDataSource.callbacks["+id+"]";},doBeforeGetScriptNode:function(sUri){return sUri;},makeConnection:function(oRequest,oCallback,oCaller){var tId=DS._nTransactionId++;this.fireEvent("requestEvent",{tId:tId,request:oRequest,callback:oCallback,caller:oCaller});if(util.ScriptNodeDataSource._nPending===0){util.ScriptNodeDataSource.callbacks=[];util.ScriptNodeDataSource._nId=0;}var id=util.ScriptNodeDataSource._nId;util.ScriptNodeDataSource._nId++;var oSelf=this;util.ScriptNodeDataSource.callbacks[id]=function(oRawResponse){if((oSelf.asyncMode!=="ignoreStaleResponses")||(id===util.ScriptNodeDataSource.callbacks.length-1)){if(oSelf.responseType===DS.TYPE_UNKNOWN){if(YAHOO.lang.isArray(oRawResponse)){oSelf.responseType=DS.TYPE_JSARRAY;}else{if(oRawResponse.nodeType&&oRawResponse.nodeType==9){oSelf.responseType=DS.TYPE_XML;}else{if(oRawResponse.nodeName&&(oRawResponse.nodeName.toLowerCase()=="table")){oSelf.responseType=DS.TYPE_HTMLTABLE;}else{if(YAHOO.lang.isObject(oRawResponse)){oSelf.responseType=DS.TYPE_JSON;}else{if(YAHOO.lang.isString(oRawResponse)){oSelf.responseType=DS.TYPE_TEXT;}}}}}}oSelf.handleResponse(oRequest,oRawResponse,oCallback,oCaller,tId);}else{}delete util.ScriptNodeDataSource.callbacks[id];};util.ScriptNodeDataSource._nPending++;var sUri=this.liveData+oRequest+this.generateRequestCallback(id);sUri=this.doBeforeGetScriptNode(sUri);this.getUtility.script(sUri,{autopurge:true,onsuccess:util.ScriptNodeDataSource._bumpPendingDown,onfail:util.ScriptNodeDataSource._bumpPendingDown});return tId;}});lang.augmentObject(util.ScriptNodeDataSource,DS);lang.augmentObject(util.ScriptNodeDataSource,{_nId:0,_nPending:0,callbacks:[]});util.XHRDataSource=function(oLiveData,oConfigs){this.dataType=DS.TYPE_XHR;this.connMgr=this.connMgr||util.Connect;oLiveData=oLiveData||"";util.XHRDataSource.superclass.constructor.call(this,oLiveData,oConfigs);};lang.extend(util.XHRDataSource,DS,{connMgr:null,connXhrMode:"allowAll",connMethodPost:false,connTimeout:0,makeConnection:function(oRequest,oCallback,oCaller){var oRawResponse=null;var tId=DS._nTransactionId++;this.fireEvent("requestEvent",{tId:tId,request:oRequest,callback:oCallback,caller:oCaller});var oSelf=this;var oConnMgr=this.connMgr;var oQueue=this._oQueue;var _xhrSuccess=function(oResponse){if(oResponse&&(this.connXhrMode=="ignoreStaleResponses")&&(oResponse.tId!=oQueue.conn.tId)){return null;}else{if(!oResponse){this.fireEvent("dataErrorEvent",{request:oRequest,response:null,callback:oCallback,caller:oCaller,message:DS.ERROR_DATANULL});DS.issueCallback(oCallback,[oRequest,{error:true}],true,oCaller);return null;}else{if(this.responseType===DS.TYPE_UNKNOWN){var ctype=(oResponse.getResponseHeader)?oResponse.getResponseHeader["Content-Type"]:null;if(ctype){if(ctype.indexOf("text/xml")>-1){this.responseType=DS.TYPE_XML;}else{if(ctype.indexOf("application/json")>-1){this.responseType=DS.TYPE_JSON;}else{if(ctype.indexOf("text/plain")>-1){this.responseType=DS.TYPE_TEXT;}}}}}this.handleResponse(oRequest,oResponse,oCallback,oCaller,tId);}}};var _xhrFailure=function(oResponse){this.fireEvent("dataErrorEvent",{request:oRequest,response:oResponse,callback:oCallback,caller:oCaller,message:DS.ERROR_DATAINVALID});if(lang.isString(this.liveData)&&lang.isString(oRequest)&&(this.liveData.lastIndexOf("?")!==this.liveData.length-1)&&(oRequest.indexOf("?")!==0)){}oResponse=oResponse||{};
oResponse.error=true;DS.issueCallback(oCallback,[oRequest,oResponse],true,oCaller);return null;};var _xhrCallback={success:_xhrSuccess,failure:_xhrFailure,scope:this};if(lang.isNumber(this.connTimeout)){_xhrCallback.timeout=this.connTimeout;}if(this.connXhrMode=="cancelStaleRequests"){if(oQueue.conn){if(oConnMgr.abort){oConnMgr.abort(oQueue.conn);oQueue.conn=null;}else{}}}if(oConnMgr&&oConnMgr.asyncRequest){var sLiveData=this.liveData;var isPost=this.connMethodPost;var sMethod=(isPost)?"POST":"GET";var sUri=(isPost||!lang.isValue(oRequest))?sLiveData:sLiveData+oRequest;var sRequest=(isPost)?oRequest:null;if(this.connXhrMode!="queueRequests"){oQueue.conn=oConnMgr.asyncRequest(sMethod,sUri,_xhrCallback,sRequest);}else{if(oQueue.conn){var allRequests=oQueue.requests;allRequests.push({request:oRequest,callback:_xhrCallback});if(!oQueue.interval){oQueue.interval=setInterval(function(){if(oConnMgr.isCallInProgress(oQueue.conn)){return;}else{if(allRequests.length>0){sUri=(isPost||!lang.isValue(allRequests[0].request))?sLiveData:sLiveData+allRequests[0].request;sRequest=(isPost)?allRequests[0].request:null;oQueue.conn=oConnMgr.asyncRequest(sMethod,sUri,allRequests[0].callback,sRequest);allRequests.shift();}else{clearInterval(oQueue.interval);oQueue.interval=null;}}},50);}}else{oQueue.conn=oConnMgr.asyncRequest(sMethod,sUri,_xhrCallback,sRequest);}}}else{DS.issueCallback(oCallback,[oRequest,{error:true}],true,oCaller);}return tId;}});lang.augmentObject(util.XHRDataSource,DS);util.DataSource=function(oLiveData,oConfigs){oConfigs=oConfigs||{};var dataType=oConfigs.dataType;if(dataType){if(dataType==DS.TYPE_LOCAL){lang.augmentObject(util.DataSource,util.LocalDataSource);return new util.LocalDataSource(oLiveData,oConfigs);}else{if(dataType==DS.TYPE_XHR){lang.augmentObject(util.DataSource,util.XHRDataSource);return new util.XHRDataSource(oLiveData,oConfigs);}else{if(dataType==DS.TYPE_SCRIPTNODE){lang.augmentObject(util.DataSource,util.ScriptNodeDataSource);return new util.ScriptNodeDataSource(oLiveData,oConfigs);}else{if(dataType==DS.TYPE_JSFUNCTION){lang.augmentObject(util.DataSource,util.FunctionDataSource);return new util.FunctionDataSource(oLiveData,oConfigs);}}}}}if(YAHOO.lang.isString(oLiveData)){lang.augmentObject(util.DataSource,util.XHRDataSource);return new util.XHRDataSource(oLiveData,oConfigs);}else{if(YAHOO.lang.isFunction(oLiveData)){lang.augmentObject(util.DataSource,util.FunctionDataSource);return new util.FunctionDataSource(oLiveData,oConfigs);}else{lang.augmentObject(util.DataSource,util.LocalDataSource);return new util.LocalDataSource(oLiveData,oConfigs);}}};lang.augmentObject(util.DataSource,DS);})();YAHOO.util.Number={format:function(B,E){if(!isFinite(+B)){return"";}B=!isFinite(+B)?0:+B;E=YAHOO.lang.merge(YAHOO.util.Number.format.defaults,(E||{}));var C=B<0,F=Math.abs(B),A=E.decimalPlaces,I=E.thousandsSeparator,H,G,D;if(A<0){H=F-(F%1)+"";D=H.length+A;if(D>0){H=Number("."+H).toFixed(D).slice(2)+new Array(H.length-D+1).join("0");}else{H="0";}}else{H=F<1&&F>=0.5&&!A?"1":F.toFixed(A);}if(F>1000){G=H.split(/\D/);D=G[0].length%3||3;G[0]=G[0].slice(0,D)+G[0].slice(D).replace(/(\d{3})/g,I+"$1");H=G.join(E.decimalSeparator);}H=E.prefix+H+E.suffix;return C?E.negativeFormat.replace(/#/,H):H;}};YAHOO.util.Number.format.defaults={decimalSeparator:".",decimalPlaces:null,thousandsSeparator:"",prefix:"",suffix:"",negativeFormat:"-#"};(function(){var A=function(C,E,D){if(typeof D==="undefined"){D=10;}for(;parseInt(C,10)<D&&D>1;D/=10){C=E.toString()+C;}return C.toString();};var B={formats:{a:function(D,C){return C.a[D.getDay()];},A:function(D,C){return C.A[D.getDay()];},b:function(D,C){return C.b[D.getMonth()];},B:function(D,C){return C.B[D.getMonth()];},C:function(C){return A(parseInt(C.getFullYear()/100,10),0);},d:["getDate","0"],e:["getDate"," "],g:function(C){return A(parseInt(B.formats.G(C)%100,10),0);},G:function(E){var F=E.getFullYear();var D=parseInt(B.formats.V(E),10);var C=parseInt(B.formats.W(E),10);if(C>D){F++;}else{if(C===0&&D>=52){F--;}}return F;},H:["getHours","0"],I:function(D){var C=D.getHours()%12;return A(C===0?12:C,0);},j:function(G){var F=new Date(""+G.getFullYear()+"/1/1 GMT");var D=new Date(""+G.getFullYear()+"/"+(G.getMonth()+1)+"/"+G.getDate()+" GMT");var C=D-F;var E=parseInt(C/60000/60/24,10)+1;return A(E,0,100);},k:["getHours"," "],l:function(D){var C=D.getHours()%12;return A(C===0?12:C," ");},m:function(C){return A(C.getMonth()+1,0);},M:["getMinutes","0"],p:function(D,C){return C.p[D.getHours()>=12?1:0];},P:function(D,C){return C.P[D.getHours()>=12?1:0];},s:function(D,C){return parseInt(D.getTime()/1000,10);},S:["getSeconds","0"],u:function(C){var D=C.getDay();return D===0?7:D;},U:function(F){var C=parseInt(B.formats.j(F),10);var E=6-F.getDay();var D=parseInt((C+E)/7,10);return A(D,0);},V:function(F){var E=parseInt(B.formats.W(F),10);var C=(new Date(""+F.getFullYear()+"/1/1")).getDay();var D=E+(C>4||C<=1?0:1);if(D===53&&(new Date(""+F.getFullYear()+"/12/31")).getDay()<4){D=1;}else{if(D===0){D=B.formats.V(new Date(""+(F.getFullYear()-1)+"/12/31"));}}return A(D,0);},w:"getDay",W:function(F){var C=parseInt(B.formats.j(F),10);var E=7-B.formats.u(F);var D=parseInt((C+E)/7,10);return A(D,0,10);},y:function(C){return A(C.getFullYear()%100,0);},Y:"getFullYear",z:function(E){var D=E.getTimezoneOffset();var C=A(parseInt(Math.abs(D/60),10),0);var F=A(Math.abs(D%60),0);return(D>0?"-":"+")+C+F;},Z:function(C){var D=C.toString().replace(/^.*:\d\d( GMT[+-]\d+)? \(?([A-Za-z ]+)\)?\d*$/,"$2").replace(/[a-z ]/g,"");if(D.length>4){D=B.formats.z(C);}return D;},"%":function(C){return"%";}},aggregates:{c:"locale",D:"%m/%d/%y",F:"%Y-%m-%d",h:"%b",n:"\n",r:"locale",R:"%H:%M",t:"\t",T:"%H:%M:%S",x:"locale",X:"locale"},format:function(G,F,D){F=F||{};if(!(G instanceof Date)){return YAHOO.lang.isValue(G)?G:"";}var H=F.format||"%m/%d/%Y";if(H==="YYYY/MM/DD"){H="%Y/%m/%d";}else{if(H==="DD/MM/YYYY"){H="%d/%m/%Y";}else{if(H==="MM/DD/YYYY"){H="%m/%d/%Y";}}}D=D||"en";if(!(D in YAHOO.util.DateLocale)){if(D.replace(/-[a-zA-Z]+$/,"") in YAHOO.util.DateLocale){D=D.replace(/-[a-zA-Z]+$/,"");
}else{D="en";}}var J=YAHOO.util.DateLocale[D];var C=function(L,K){var M=B.aggregates[K];return(M==="locale"?J[K]:M);};var E=function(L,K){var M=B.formats[K];if(typeof M==="string"){return G[M]();}else{if(typeof M==="function"){return M.call(G,G,J);}else{if(typeof M==="object"&&typeof M[0]==="string"){return A(G[M[0]](),M[1]);}else{return K;}}}};while(H.match(/%[cDFhnrRtTxX]/)){H=H.replace(/%([cDFhnrRtTxX])/g,C);}var I=H.replace(/%([aAbBCdegGHIjklmMpPsSuUVwWyYzZ%])/g,E);C=E=undefined;return I;}};YAHOO.namespace("YAHOO.util");YAHOO.util.Date=B;YAHOO.util.DateLocale={a:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],A:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],b:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],B:["January","February","March","April","May","June","July","August","September","October","November","December"],c:"%a %d %b %Y %T %Z",p:["AM","PM"],P:["am","pm"],r:"%I:%M:%S %p",x:"%d/%m/%y",X:"%T"};YAHOO.util.DateLocale["en"]=YAHOO.lang.merge(YAHOO.util.DateLocale,{});YAHOO.util.DateLocale["en-US"]=YAHOO.lang.merge(YAHOO.util.DateLocale["en"],{c:"%a %d %b %Y %I:%M:%S %p %Z",x:"%m/%d/%Y",X:"%I:%M:%S %p"});YAHOO.util.DateLocale["en-GB"]=YAHOO.lang.merge(YAHOO.util.DateLocale["en"],{r:"%l:%M:%S %P %Z"});YAHOO.util.DateLocale["en-AU"]=YAHOO.lang.merge(YAHOO.util.DateLocale["en"]);})();YAHOO.register("datasource",YAHOO.util.DataSource,{version:"2.8.0r4",build:"2449"});// End of File include/javascript/yui/build/datasource/datasource-min.js
                                
/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
(function(){var l=YAHOO.lang,isFunction=l.isFunction,isObject=l.isObject,isArray=l.isArray,_toStr=Object.prototype.toString,Native=(YAHOO.env.ua.caja?window:this).JSON,_UNICODE_EXCEPTIONS=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,_ESCAPES=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,_VALUES=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,_BRACKETS=/(?:^|:|,)(?:\s*\[)+/g,_UNSAFE=/^[\],:{}\s]*$/,_SPECIAL_CHARS=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,_CHARS={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},UNDEFINED="undefined",OBJECT="object",NULL="null",STRING="string",NUMBER="number",BOOLEAN="boolean",DATE="date",_allowable={"undefined":UNDEFINED,"string":STRING,"[object String]":STRING,"number":NUMBER,"[object Number]":NUMBER,"boolean":BOOLEAN,"[object Boolean]":BOOLEAN,"[object Date]":DATE,"[object RegExp]":OBJECT},EMPTY="",OPEN_O="{",CLOSE_O="}",OPEN_A="[",CLOSE_A="]",COMMA=",",COMMA_CR=",\n",CR="\n",COLON=":",COLON_SP=": ",QUOTE='"';Native=_toStr.call(Native)==="[object JSON]"&&Native;function _char(c){if(!_CHARS[c]){_CHARS[c]="\\u"+("0000"+(+(c.charCodeAt(0))).toString(16)).slice(-4);}return _CHARS[c];}function _revive(data,reviver){var walk=function(o,key){var k,v,value=o[key];if(value&&typeof value==="object"){for(k in value){if(l.hasOwnProperty(value,k)){v=walk(value,k);if(v===undefined){delete value[k];}else{value[k]=v;}}}}return reviver.call(o,key,value);};return typeof reviver==="function"?walk({"":data},""):data;}function _prepare(s){return s.replace(_UNICODE_EXCEPTIONS,_char);}function _isSafe(str){return l.isString(str)&&_UNSAFE.test(str.replace(_ESCAPES,"@").replace(_VALUES,"]").replace(_BRACKETS,""));}function _parse(s,reviver){s=_prepare(s);if(_isSafe(s)){return _revive(eval("("+s+")"),reviver);}throw new SyntaxError("JSON.parse");}function _type(o){var t=typeof o;return _allowable[t]||_allowable[_toStr.call(o)]||(t===OBJECT?(o?OBJECT:NULL):UNDEFINED);}function _string(s){return QUOTE+s.replace(_SPECIAL_CHARS,_char)+QUOTE;}function _indent(s,space){return s.replace(/^/gm,space);}function _stringify(o,w,space){if(o===undefined){return undefined;}var replacer=isFunction(w)?w:null,format=_toStr.call(space).match(/String|Number/)||[],_date=YAHOO.lang.JSON.dateToString,stack=[],tmp,i,len;if(replacer||!isArray(w)){w=undefined;}if(w){tmp={};for(i=0,len=w.length;i<len;++i){tmp[w[i]]=true;}w=tmp;}space=format[0]==="Number"?new Array(Math.min(Math.max(0,space),10)+1).join(" "):(space||EMPTY).slice(0,10);function _serialize(h,key){var value=h[key],t=_type(value),a=[],colon=space?COLON_SP:COLON,arr,i,keys,k,v;if(isObject(value)&&isFunction(value.toJSON)){value=value.toJSON(key);}else{if(t===DATE){value=_date(value);}}if(isFunction(replacer)){value=replacer.call(h,key,value);}if(value!==h[key]){t=_type(value);}switch(t){case DATE:case OBJECT:break;case STRING:return _string(value);case NUMBER:return isFinite(value)?value+EMPTY:NULL;case BOOLEAN:return value+EMPTY;case NULL:return NULL;default:return undefined;}for(i=stack.length-1;i>=0;--i){if(stack[i]===value){throw new Error("JSON.stringify. Cyclical reference");}}arr=isArray(value);stack.push(value);if(arr){for(i=value.length-1;i>=0;--i){a[i]=_serialize(value,i)||NULL;}}else{keys=w||value;i=0;for(k in keys){if(keys.hasOwnProperty(k)){v=_serialize(value,k);if(v){a[i++]=_string(k)+colon+v;}}}}stack.pop();if(space&&a.length){return arr?OPEN_A+CR+_indent(a.join(COMMA_CR),space)+CR+CLOSE_A:OPEN_O+CR+_indent(a.join(COMMA_CR),space)+CR+CLOSE_O;}else{return arr?OPEN_A+a.join(COMMA)+CLOSE_A:OPEN_O+a.join(COMMA)+CLOSE_O;}}return _serialize({"":o},"");}YAHOO.lang.JSON={useNativeParse:!!Native,useNativeStringify:!!Native,isSafe:function(s){return _isSafe(_prepare(s));},parse:function(s,reviver){return Native&&YAHOO.lang.JSON.useNativeParse?Native.parse(s,reviver):_parse(s,reviver);},stringify:function(o,w,space){return Native&&YAHOO.lang.JSON.useNativeStringify?Native.stringify(o,w,space):_stringify(o,w,space);},dateToString:function(d){function _zeroPad(v){return v<10?"0"+v:v;}return d.getUTCFullYear()+"-"+_zeroPad(d.getUTCMonth()+1)+"-"+_zeroPad(d.getUTCDate())+"T"+_zeroPad(d.getUTCHours())+COLON+_zeroPad(d.getUTCMinutes())+COLON+_zeroPad(d.getUTCSeconds())+"Z";},stringToDate:function(str){var m=str.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))?Z$/);if(m){var d=new Date();d.setUTCFullYear(m[1],m[2]-1,m[3]);d.setUTCHours(m[4],m[5],m[6],(m[7]||0));return d;}return str;}};YAHOO.lang.JSON.isValid=YAHOO.lang.JSON.isSafe;})();YAHOO.register("json",YAHOO.lang.JSON,{version:"2.8.0r4",build:"2449"});// End of File include/javascript/yui/build/json/json-min.js
                                
/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
YAHOO.widget.DS_JSArray=YAHOO.util.LocalDataSource;YAHOO.widget.DS_JSFunction=YAHOO.util.FunctionDataSource;YAHOO.widget.DS_XHR=function(B,A,D){var C=new YAHOO.util.XHRDataSource(B,D);C._aDeprecatedSchema=A;return C;};YAHOO.widget.DS_ScriptNode=function(B,A,D){var C=new YAHOO.util.ScriptNodeDataSource(B,D);C._aDeprecatedSchema=A;return C;};YAHOO.widget.DS_XHR.TYPE_JSON=YAHOO.util.DataSourceBase.TYPE_JSON;YAHOO.widget.DS_XHR.TYPE_XML=YAHOO.util.DataSourceBase.TYPE_XML;YAHOO.widget.DS_XHR.TYPE_FLAT=YAHOO.util.DataSourceBase.TYPE_TEXT;YAHOO.widget.AutoComplete=function(G,B,J,C){if(G&&B&&J){if(J&&YAHOO.lang.isFunction(J.sendRequest)){this.dataSource=J;}else{return;}this.key=0;var D=J.responseSchema;if(J._aDeprecatedSchema){var K=J._aDeprecatedSchema;if(YAHOO.lang.isArray(K)){if((J.responseType===YAHOO.util.DataSourceBase.TYPE_JSON)||(J.responseType===YAHOO.util.DataSourceBase.TYPE_UNKNOWN)){D.resultsList=K[0];this.key=K[1];D.fields=(K.length<3)?null:K.slice(1);}else{if(J.responseType===YAHOO.util.DataSourceBase.TYPE_XML){D.resultNode=K[0];this.key=K[1];D.fields=K.slice(1);}else{if(J.responseType===YAHOO.util.DataSourceBase.TYPE_TEXT){D.recordDelim=K[0];D.fieldDelim=K[1];}}}J.responseSchema=D;}}if(YAHOO.util.Dom.inDocument(G)){if(YAHOO.lang.isString(G)){this._sName="instance"+YAHOO.widget.AutoComplete._nIndex+" "+G;this._elTextbox=document.getElementById(G);}else{this._sName=(G.id)?"instance"+YAHOO.widget.AutoComplete._nIndex+" "+G.id:"instance"+YAHOO.widget.AutoComplete._nIndex;this._elTextbox=G;}YAHOO.util.Dom.addClass(this._elTextbox,"yui-ac-input");}else{return;}if(YAHOO.util.Dom.inDocument(B)){if(YAHOO.lang.isString(B)){this._elContainer=document.getElementById(B);}else{this._elContainer=B;}if(this._elContainer.style.display=="none"){}var E=this._elContainer.parentNode;var A=E.tagName.toLowerCase();if(A=="div"){YAHOO.util.Dom.addClass(E,"yui-ac");}else{}}else{return;}if(this.dataSource.dataType===YAHOO.util.DataSourceBase.TYPE_LOCAL){this.applyLocalFilter=true;}if(C&&(C.constructor==Object)){for(var I in C){if(I){this[I]=C[I];}}}this._initContainerEl();this._initProps();this._initListEl();this._initContainerHelperEls();var H=this;var F=this._elTextbox;YAHOO.util.Event.addListener(F,"keyup",H._onTextboxKeyUp,H);YAHOO.util.Event.addListener(F,"keydown",H._onTextboxKeyDown,H);YAHOO.util.Event.addListener(F,"focus",H._onTextboxFocus,H);YAHOO.util.Event.addListener(F,"blur",H._onTextboxBlur,H);YAHOO.util.Event.addListener(B,"mouseover",H._onContainerMouseover,H);YAHOO.util.Event.addListener(B,"mouseout",H._onContainerMouseout,H);YAHOO.util.Event.addListener(B,"click",H._onContainerClick,H);YAHOO.util.Event.addListener(B,"scroll",H._onContainerScroll,H);YAHOO.util.Event.addListener(B,"resize",H._onContainerResize,H);YAHOO.util.Event.addListener(F,"keypress",H._onTextboxKeyPress,H);YAHOO.util.Event.addListener(window,"unload",H._onWindowUnload,H);this.textboxFocusEvent=new YAHOO.util.CustomEvent("textboxFocus",this);this.textboxKeyEvent=new YAHOO.util.CustomEvent("textboxKey",this);this.dataRequestEvent=new YAHOO.util.CustomEvent("dataRequest",this);this.dataReturnEvent=new YAHOO.util.CustomEvent("dataReturn",this);this.dataErrorEvent=new YAHOO.util.CustomEvent("dataError",this);this.containerPopulateEvent=new YAHOO.util.CustomEvent("containerPopulate",this);this.containerExpandEvent=new YAHOO.util.CustomEvent("containerExpand",this);this.typeAheadEvent=new YAHOO.util.CustomEvent("typeAhead",this);this.itemMouseOverEvent=new YAHOO.util.CustomEvent("itemMouseOver",this);this.itemMouseOutEvent=new YAHOO.util.CustomEvent("itemMouseOut",this);this.itemArrowToEvent=new YAHOO.util.CustomEvent("itemArrowTo",this);this.itemArrowFromEvent=new YAHOO.util.CustomEvent("itemArrowFrom",this);this.itemSelectEvent=new YAHOO.util.CustomEvent("itemSelect",this);this.unmatchedItemSelectEvent=new YAHOO.util.CustomEvent("unmatchedItemSelect",this);this.selectionEnforceEvent=new YAHOO.util.CustomEvent("selectionEnforce",this);this.containerCollapseEvent=new YAHOO.util.CustomEvent("containerCollapse",this);this.textboxBlurEvent=new YAHOO.util.CustomEvent("textboxBlur",this);this.textboxChangeEvent=new YAHOO.util.CustomEvent("textboxChange",this);F.setAttribute("autocomplete","off");YAHOO.widget.AutoComplete._nIndex++;}else{}};YAHOO.widget.AutoComplete.prototype.dataSource=null;YAHOO.widget.AutoComplete.prototype.applyLocalFilter=null;YAHOO.widget.AutoComplete.prototype.queryMatchCase=false;YAHOO.widget.AutoComplete.prototype.queryMatchContains=false;YAHOO.widget.AutoComplete.prototype.queryMatchSubset=false;YAHOO.widget.AutoComplete.prototype.minQueryLength=1;YAHOO.widget.AutoComplete.prototype.maxResultsDisplayed=10;YAHOO.widget.AutoComplete.prototype.queryDelay=0.2;YAHOO.widget.AutoComplete.prototype.typeAheadDelay=0.5;YAHOO.widget.AutoComplete.prototype.queryInterval=500;YAHOO.widget.AutoComplete.prototype.highlightClassName="yui-ac-highlight";YAHOO.widget.AutoComplete.prototype.prehighlightClassName=null;YAHOO.widget.AutoComplete.prototype.delimChar=null;YAHOO.widget.AutoComplete.prototype.autoHighlight=true;YAHOO.widget.AutoComplete.prototype.typeAhead=false;YAHOO.widget.AutoComplete.prototype.animHoriz=false;YAHOO.widget.AutoComplete.prototype.animVert=true;YAHOO.widget.AutoComplete.prototype.animSpeed=0.3;YAHOO.widget.AutoComplete.prototype.forceSelection=false;YAHOO.widget.AutoComplete.prototype.allowBrowserAutocomplete=true;YAHOO.widget.AutoComplete.prototype.alwaysShowContainer=false;YAHOO.widget.AutoComplete.prototype.useIFrame=false;YAHOO.widget.AutoComplete.prototype.useShadow=false;YAHOO.widget.AutoComplete.prototype.suppressInputUpdate=false;YAHOO.widget.AutoComplete.prototype.resultTypeList=true;YAHOO.widget.AutoComplete.prototype.queryQuestionMark=true;YAHOO.widget.AutoComplete.prototype.autoSnapContainer=true;YAHOO.widget.AutoComplete.prototype.toString=function(){return"AutoComplete "+this._sName;};YAHOO.widget.AutoComplete.prototype.getInputEl=function(){return this._elTextbox;};YAHOO.widget.AutoComplete.prototype.getContainerEl=function(){return this._elContainer;
};YAHOO.widget.AutoComplete.prototype.isFocused=function(){return this._bFocused;};YAHOO.widget.AutoComplete.prototype.isContainerOpen=function(){return this._bContainerOpen;};YAHOO.widget.AutoComplete.prototype.getListEl=function(){return this._elList;};YAHOO.widget.AutoComplete.prototype.getListItemMatch=function(A){if(A._sResultMatch){return A._sResultMatch;}else{return null;}};YAHOO.widget.AutoComplete.prototype.getListItemData=function(A){if(A._oResultData){return A._oResultData;}else{return null;}};YAHOO.widget.AutoComplete.prototype.getListItemIndex=function(A){if(YAHOO.lang.isNumber(A._nItemIndex)){return A._nItemIndex;}else{return null;}};YAHOO.widget.AutoComplete.prototype.setHeader=function(B){if(this._elHeader){var A=this._elHeader;if(B){A.innerHTML=B;A.style.display="";}else{A.innerHTML="";A.style.display="none";}}};YAHOO.widget.AutoComplete.prototype.setFooter=function(B){if(this._elFooter){var A=this._elFooter;if(B){A.innerHTML=B;A.style.display="";}else{A.innerHTML="";A.style.display="none";}}};YAHOO.widget.AutoComplete.prototype.setBody=function(A){if(this._elBody){var B=this._elBody;YAHOO.util.Event.purgeElement(B,true);if(A){B.innerHTML=A;B.style.display="";}else{B.innerHTML="";B.style.display="none";}this._elList=null;}};YAHOO.widget.AutoComplete.prototype.generateRequest=function(B){var A=this.dataSource.dataType;if(A===YAHOO.util.DataSourceBase.TYPE_XHR){if(!this.dataSource.connMethodPost){B=(this.queryQuestionMark?"?":"")+(this.dataSource.scriptQueryParam||"query")+"="+B+(this.dataSource.scriptQueryAppend?("&"+this.dataSource.scriptQueryAppend):"");}else{B=(this.dataSource.scriptQueryParam||"query")+"="+B+(this.dataSource.scriptQueryAppend?("&"+this.dataSource.scriptQueryAppend):"");}}else{if(A===YAHOO.util.DataSourceBase.TYPE_SCRIPTNODE){B="&"+(this.dataSource.scriptQueryParam||"query")+"="+B+(this.dataSource.scriptQueryAppend?("&"+this.dataSource.scriptQueryAppend):"");}}return B;};YAHOO.widget.AutoComplete.prototype.sendQuery=function(B){this._bFocused=true;var A=(this.delimChar)?this._elTextbox.value+B:B;this._sendQuery(A);};YAHOO.widget.AutoComplete.prototype.snapContainer=function(){var A=this._elTextbox,B=YAHOO.util.Dom.getXY(A);B[1]+=YAHOO.util.Dom.get(A).offsetHeight+2;YAHOO.util.Dom.setXY(this._elContainer,B);};YAHOO.widget.AutoComplete.prototype.expandContainer=function(){this._toggleContainer(true);};YAHOO.widget.AutoComplete.prototype.collapseContainer=function(){this._toggleContainer(false);};YAHOO.widget.AutoComplete.prototype.clearList=function(){var B=this._elList.childNodes,A=B.length-1;for(;A>-1;A--){B[A].style.display="none";}};YAHOO.widget.AutoComplete.prototype.getSubsetMatches=function(E){var D,C,A;for(var B=E.length;B>=this.minQueryLength;B--){A=this.generateRequest(E.substr(0,B));this.dataRequestEvent.fire(this,D,A);C=this.dataSource.getCachedResponse(A);if(C){return this.filterResults.apply(this.dataSource,[E,C,C,{scope:this}]);}}return null;};YAHOO.widget.AutoComplete.prototype.preparseRawResponse=function(C,B,A){var D=((this.responseStripAfter!=="")&&(B.indexOf))?B.indexOf(this.responseStripAfter):-1;if(D!=-1){B=B.substring(0,D);}return B;};YAHOO.widget.AutoComplete.prototype.filterResults=function(K,M,Q,L){if(L&&L.argument&&L.argument.query){K=L.argument.query;}if(K&&K!==""){Q=YAHOO.widget.AutoComplete._cloneObject(Q);var I=L.scope,P=this,C=Q.results,N=[],B=I.maxResultsDisplayed,J=(P.queryMatchCase||I.queryMatchCase),A=(P.queryMatchContains||I.queryMatchContains);for(var D=0,H=C.length;D<H;D++){var F=C[D];var E=null;if(YAHOO.lang.isString(F)){E=F;}else{if(YAHOO.lang.isArray(F)){E=F[0];}else{if(this.responseSchema.fields){var O=this.responseSchema.fields[0].key||this.responseSchema.fields[0];E=F[O];}else{if(this.key){E=F[this.key];}}}}if(YAHOO.lang.isString(E)){var G=(J)?E.indexOf(decodeURIComponent(K)):E.toLowerCase().indexOf(decodeURIComponent(K).toLowerCase());if((!A&&(G===0))||(A&&(G>-1))){N.push(F);}}if(H>B&&N.length===B){break;}}Q.results=N;}else{}return Q;};YAHOO.widget.AutoComplete.prototype.handleResponse=function(C,A,B){if((this instanceof YAHOO.widget.AutoComplete)&&this._sName){this._populateList(C,A,B);}};YAHOO.widget.AutoComplete.prototype.doBeforeLoadData=function(C,A,B){return true;};YAHOO.widget.AutoComplete.prototype.formatResult=function(B,D,A){var C=(A)?A:"";return C;};YAHOO.widget.AutoComplete.prototype.doBeforeExpandContainer=function(D,A,C,B){return true;};YAHOO.widget.AutoComplete.prototype.destroy=function(){var B=this.toString();var A=this._elTextbox;var D=this._elContainer;this.textboxFocusEvent.unsubscribeAll();this.textboxKeyEvent.unsubscribeAll();this.dataRequestEvent.unsubscribeAll();this.dataReturnEvent.unsubscribeAll();this.dataErrorEvent.unsubscribeAll();this.containerPopulateEvent.unsubscribeAll();this.containerExpandEvent.unsubscribeAll();this.typeAheadEvent.unsubscribeAll();this.itemMouseOverEvent.unsubscribeAll();this.itemMouseOutEvent.unsubscribeAll();this.itemArrowToEvent.unsubscribeAll();this.itemArrowFromEvent.unsubscribeAll();this.itemSelectEvent.unsubscribeAll();this.unmatchedItemSelectEvent.unsubscribeAll();this.selectionEnforceEvent.unsubscribeAll();this.containerCollapseEvent.unsubscribeAll();this.textboxBlurEvent.unsubscribeAll();this.textboxChangeEvent.unsubscribeAll();YAHOO.util.Event.purgeElement(A,true);YAHOO.util.Event.purgeElement(D,true);D.innerHTML="";for(var C in this){if(YAHOO.lang.hasOwnProperty(this,C)){this[C]=null;}}};YAHOO.widget.AutoComplete.prototype.textboxFocusEvent=null;YAHOO.widget.AutoComplete.prototype.textboxKeyEvent=null;YAHOO.widget.AutoComplete.prototype.dataRequestEvent=null;YAHOO.widget.AutoComplete.prototype.dataReturnEvent=null;YAHOO.widget.AutoComplete.prototype.dataErrorEvent=null;YAHOO.widget.AutoComplete.prototype.containerPopulateEvent=null;YAHOO.widget.AutoComplete.prototype.containerExpandEvent=null;YAHOO.widget.AutoComplete.prototype.typeAheadEvent=null;YAHOO.widget.AutoComplete.prototype.itemMouseOverEvent=null;YAHOO.widget.AutoComplete.prototype.itemMouseOutEvent=null;
YAHOO.widget.AutoComplete.prototype.itemArrowToEvent=null;YAHOO.widget.AutoComplete.prototype.itemArrowFromEvent=null;YAHOO.widget.AutoComplete.prototype.itemSelectEvent=null;YAHOO.widget.AutoComplete.prototype.unmatchedItemSelectEvent=null;YAHOO.widget.AutoComplete.prototype.selectionEnforceEvent=null;YAHOO.widget.AutoComplete.prototype.containerCollapseEvent=null;YAHOO.widget.AutoComplete.prototype.textboxBlurEvent=null;YAHOO.widget.AutoComplete.prototype.textboxChangeEvent=null;YAHOO.widget.AutoComplete._nIndex=0;YAHOO.widget.AutoComplete.prototype._sName=null;YAHOO.widget.AutoComplete.prototype._elTextbox=null;YAHOO.widget.AutoComplete.prototype._elContainer=null;YAHOO.widget.AutoComplete.prototype._elContent=null;YAHOO.widget.AutoComplete.prototype._elHeader=null;YAHOO.widget.AutoComplete.prototype._elBody=null;YAHOO.widget.AutoComplete.prototype._elFooter=null;YAHOO.widget.AutoComplete.prototype._elShadow=null;YAHOO.widget.AutoComplete.prototype._elIFrame=null;YAHOO.widget.AutoComplete.prototype._bFocused=false;YAHOO.widget.AutoComplete.prototype._oAnim=null;YAHOO.widget.AutoComplete.prototype._bContainerOpen=false;YAHOO.widget.AutoComplete.prototype._bOverContainer=false;YAHOO.widget.AutoComplete.prototype._elList=null;YAHOO.widget.AutoComplete.prototype._nDisplayedItems=0;YAHOO.widget.AutoComplete.prototype._sCurQuery=null;YAHOO.widget.AutoComplete.prototype._sPastSelections="";YAHOO.widget.AutoComplete.prototype._sInitInputValue=null;YAHOO.widget.AutoComplete.prototype._elCurListItem=null;YAHOO.widget.AutoComplete.prototype._elCurPrehighlightItem=null;YAHOO.widget.AutoComplete.prototype._bItemSelected=false;YAHOO.widget.AutoComplete.prototype._nKeyCode=null;YAHOO.widget.AutoComplete.prototype._nDelayID=-1;YAHOO.widget.AutoComplete.prototype._nTypeAheadDelayID=-1;YAHOO.widget.AutoComplete.prototype._iFrameSrc="javascript:false;";YAHOO.widget.AutoComplete.prototype._queryInterval=null;YAHOO.widget.AutoComplete.prototype._sLastTextboxValue=null;YAHOO.widget.AutoComplete.prototype._initProps=function(){var B=this.minQueryLength;if(!YAHOO.lang.isNumber(B)){this.minQueryLength=1;}var E=this.maxResultsDisplayed;if(!YAHOO.lang.isNumber(E)||(E<1)){this.maxResultsDisplayed=10;}var F=this.queryDelay;if(!YAHOO.lang.isNumber(F)||(F<0)){this.queryDelay=0.2;}var C=this.typeAheadDelay;if(!YAHOO.lang.isNumber(C)||(C<0)){this.typeAheadDelay=0.2;}var A=this.delimChar;if(YAHOO.lang.isString(A)&&(A.length>0)){this.delimChar=[A];}else{if(!YAHOO.lang.isArray(A)){this.delimChar=null;}}var D=this.animSpeed;if((this.animHoriz||this.animVert)&&YAHOO.util.Anim){if(!YAHOO.lang.isNumber(D)||(D<0)){this.animSpeed=0.3;}if(!this._oAnim){this._oAnim=new YAHOO.util.Anim(this._elContent,{},this.animSpeed);}else{this._oAnim.duration=this.animSpeed;}}if(this.forceSelection&&A){}};YAHOO.widget.AutoComplete.prototype._initContainerHelperEls=function(){if(this.useShadow&&!this._elShadow){var A=document.createElement("div");A.className="yui-ac-shadow";A.style.width=0;A.style.height=0;this._elShadow=this._elContainer.appendChild(A);}if(this.useIFrame&&!this._elIFrame){var B=document.createElement("iframe");B.src=this._iFrameSrc;B.frameBorder=0;B.scrolling="no";B.style.position="absolute";B.style.width=0;B.style.height=0;B.style.padding=0;B.tabIndex=-1;B.role="presentation";B.title="Presentational iframe shim";this._elIFrame=this._elContainer.appendChild(B);}};YAHOO.widget.AutoComplete.prototype._initContainerEl=function(){YAHOO.util.Dom.addClass(this._elContainer,"yui-ac-container");if(!this._elContent){var C=document.createElement("div");C.className="yui-ac-content";C.style.display="none";this._elContent=this._elContainer.appendChild(C);var B=document.createElement("div");B.className="yui-ac-hd";B.style.display="none";this._elHeader=this._elContent.appendChild(B);var D=document.createElement("div");D.className="yui-ac-bd";this._elBody=this._elContent.appendChild(D);var A=document.createElement("div");A.className="yui-ac-ft";A.style.display="none";this._elFooter=this._elContent.appendChild(A);}else{}};YAHOO.widget.AutoComplete.prototype._initListEl=function(){var C=this.maxResultsDisplayed,A=this._elList||document.createElement("ul"),B;while(A.childNodes.length<C){B=document.createElement("li");B.style.display="none";B._nItemIndex=A.childNodes.length;A.appendChild(B);}if(!this._elList){var D=this._elBody;YAHOO.util.Event.purgeElement(D,true);D.innerHTML="";this._elList=D.appendChild(A);}this._elBody.style.display="";};YAHOO.widget.AutoComplete.prototype._focus=function(){var A=this;setTimeout(function(){try{A._elTextbox.focus();}catch(B){}},0);};YAHOO.widget.AutoComplete.prototype._enableIntervalDetection=function(){var A=this;if(!A._queryInterval&&A.queryInterval){A._queryInterval=setInterval(function(){A._onInterval();},A.queryInterval);}};YAHOO.widget.AutoComplete.prototype.enableIntervalDetection=YAHOO.widget.AutoComplete.prototype._enableIntervalDetection;YAHOO.widget.AutoComplete.prototype._onInterval=function(){var A=this._elTextbox.value;var B=this._sLastTextboxValue;if(A!=B){this._sLastTextboxValue=A;this._sendQuery(A);}};YAHOO.widget.AutoComplete.prototype._clearInterval=function(){if(this._queryInterval){clearInterval(this._queryInterval);this._queryInterval=null;}};YAHOO.widget.AutoComplete.prototype._isIgnoreKey=function(A){if((A==9)||(A==13)||(A==16)||(A==17)||(A>=18&&A<=20)||(A==27)||(A>=33&&A<=35)||(A>=36&&A<=40)||(A>=44&&A<=45)||(A==229)){return true;}return false;};YAHOO.widget.AutoComplete.prototype._sendQuery=function(D){if(this.minQueryLength<0){this._toggleContainer(false);return;}if(this.delimChar){var A=this._extractQuery(D);D=A.query;this._sPastSelections=A.previous;}if((D&&(D.length<this.minQueryLength))||(!D&&this.minQueryLength>0)){if(this._nDelayID!=-1){clearTimeout(this._nDelayID);}this._toggleContainer(false);return;}D=encodeURIComponent(D);this._nDelayID=-1;if(this.dataSource.queryMatchSubset||this.queryMatchSubset){var C=this.getSubsetMatches(D);if(C){this.handleResponse(D,C,{query:D});return;
}}if(this.dataSource.responseStripAfter){this.dataSource.doBeforeParseData=this.preparseRawResponse;}if(this.applyLocalFilter){this.dataSource.doBeforeCallback=this.filterResults;}var B=this.generateRequest(D);this.dataRequestEvent.fire(this,D,B);this.dataSource.sendRequest(B,{success:this.handleResponse,failure:this.handleResponse,scope:this,argument:{query:D}});};YAHOO.widget.AutoComplete.prototype._populateListItem=function(B,A,C){B.innerHTML=this.formatResult(A,C,B._sResultMatch);};YAHOO.widget.AutoComplete.prototype._populateList=function(K,F,C){if(this._nTypeAheadDelayID!=-1){clearTimeout(this._nTypeAheadDelayID);}K=(C&&C.query)?C.query:K;var H=this.doBeforeLoadData(K,F,C);if(H&&!F.error){this.dataReturnEvent.fire(this,K,F.results);if(this._bFocused){var M=decodeURIComponent(K);this._sCurQuery=M;this._bItemSelected=false;var R=F.results,A=Math.min(R.length,this.maxResultsDisplayed),J=(this.dataSource.responseSchema.fields)?(this.dataSource.responseSchema.fields[0].key||this.dataSource.responseSchema.fields[0]):0;if(A>0){if(!this._elList||(this._elList.childNodes.length<A)){this._initListEl();}this._initContainerHelperEls();var I=this._elList.childNodes;for(var Q=A-1;Q>=0;Q--){var P=I[Q],E=R[Q];if(this.resultTypeList){var B=[];B[0]=(YAHOO.lang.isString(E))?E:E[J]||E[this.key];var L=this.dataSource.responseSchema.fields;if(YAHOO.lang.isArray(L)&&(L.length>1)){for(var N=1,S=L.length;N<S;N++){B[B.length]=E[L[N].key||L[N]];}}else{if(YAHOO.lang.isArray(E)){B=E;}else{if(YAHOO.lang.isString(E)){B=[E];}else{B[1]=E;}}}E=B;}P._sResultMatch=(YAHOO.lang.isString(E))?E:(YAHOO.lang.isArray(E))?E[0]:(E[J]||"");P._oResultData=E;this._populateListItem(P,E,M);P.style.display="";}if(A<I.length){var G;for(var O=I.length-1;O>=A;O--){G=I[O];G.style.display="none";}}this._nDisplayedItems=A;this.containerPopulateEvent.fire(this,K,R);if(this.autoHighlight){var D=this._elList.firstChild;this._toggleHighlight(D,"to");this.itemArrowToEvent.fire(this,D);this._typeAhead(D,K);}else{this._toggleHighlight(this._elCurListItem,"from");}H=this._doBeforeExpandContainer(this._elTextbox,this._elContainer,K,R);this._toggleContainer(H);}else{this._toggleContainer(false);}return;}}else{this.dataErrorEvent.fire(this,K,F);}};YAHOO.widget.AutoComplete.prototype._doBeforeExpandContainer=function(D,A,C,B){if(this.autoSnapContainer){this.snapContainer();}return this.doBeforeExpandContainer(D,A,C,B);};YAHOO.widget.AutoComplete.prototype._clearSelection=function(){var A=(this.delimChar)?this._extractQuery(this._elTextbox.value):{previous:"",query:this._elTextbox.value};this._elTextbox.value=A.previous;this.selectionEnforceEvent.fire(this,A.query);};YAHOO.widget.AutoComplete.prototype._textMatchesOption=function(){var A=null;for(var B=0;B<this._nDisplayedItems;B++){var C=this._elList.childNodes[B];var D=(""+C._sResultMatch).toLowerCase();if(D==this._sCurQuery.toLowerCase()){A=C;break;}}return(A);};YAHOO.widget.AutoComplete.prototype._typeAhead=function(B,D){if(!this.typeAhead||(this._nKeyCode==8)){return;}var A=this,C=this._elTextbox;if(C.setSelectionRange||C.createTextRange){this._nTypeAheadDelayID=setTimeout(function(){var F=C.value.length;A._updateValue(B);var G=C.value.length;A._selectText(C,F,G);var E=C.value.substr(F,G);A.typeAheadEvent.fire(A,D,E);},(this.typeAheadDelay*1000));}};YAHOO.widget.AutoComplete.prototype._selectText=function(D,A,B){if(D.setSelectionRange){D.setSelectionRange(A,B);}else{if(D.createTextRange){var C=D.createTextRange();C.moveStart("character",A);C.moveEnd("character",B-D.value.length);C.select();}else{D.select();}}};YAHOO.widget.AutoComplete.prototype._extractQuery=function(H){var C=this.delimChar,F=-1,G,E,B=C.length-1,D;for(;B>=0;B--){G=H.lastIndexOf(C[B]);if(G>F){F=G;}}if(C[B]==" "){for(var A=C.length-1;A>=0;A--){if(H[F-1]==C[A]){F--;break;}}}if(F>-1){E=F+1;while(H.charAt(E)==" "){E+=1;}D=H.substring(0,E);H=H.substr(E);}else{D="";}return{previous:D,query:H};};YAHOO.widget.AutoComplete.prototype._toggleContainerHelpers=function(D){var E=this._elContent.offsetWidth+"px";var B=this._elContent.offsetHeight+"px";if(this.useIFrame&&this._elIFrame){var C=this._elIFrame;if(D){C.style.width=E;C.style.height=B;C.style.padding="";}else{C.style.width=0;C.style.height=0;C.style.padding=0;}}if(this.useShadow&&this._elShadow){var A=this._elShadow;if(D){A.style.width=E;A.style.height=B;}else{A.style.width=0;A.style.height=0;}}};YAHOO.widget.AutoComplete.prototype._toggleContainer=function(I){var D=this._elContainer;if(this.alwaysShowContainer&&this._bContainerOpen){return;}if(!I){this._toggleHighlight(this._elCurListItem,"from");this._nDisplayedItems=0;this._sCurQuery=null;if(this._elContent.style.display=="none"){return;}}var A=this._oAnim;if(A&&A.getEl()&&(this.animHoriz||this.animVert)){if(A.isAnimated()){A.stop(true);}var G=this._elContent.cloneNode(true);D.appendChild(G);G.style.top="-9000px";G.style.width="";G.style.height="";G.style.display="";var F=G.offsetWidth;var C=G.offsetHeight;var B=(this.animHoriz)?0:F;var E=(this.animVert)?0:C;A.attributes=(I)?{width:{to:F},height:{to:C}}:{width:{to:B},height:{to:E}};if(I&&!this._bContainerOpen){this._elContent.style.width=B+"px";this._elContent.style.height=E+"px";}else{this._elContent.style.width=F+"px";this._elContent.style.height=C+"px";}D.removeChild(G);G=null;var H=this;var J=function(){A.onComplete.unsubscribeAll();if(I){H._toggleContainerHelpers(true);H._bContainerOpen=I;H.containerExpandEvent.fire(H);}else{H._elContent.style.display="none";H._bContainerOpen=I;H.containerCollapseEvent.fire(H);}};this._toggleContainerHelpers(false);this._elContent.style.display="";A.onComplete.subscribe(J);A.animate();}else{if(I){this._elContent.style.display="";this._toggleContainerHelpers(true);this._bContainerOpen=I;this.containerExpandEvent.fire(this);}else{this._toggleContainerHelpers(false);this._elContent.style.display="none";this._bContainerOpen=I;this.containerCollapseEvent.fire(this);}}};YAHOO.widget.AutoComplete.prototype._toggleHighlight=function(A,C){if(A){var B=this.highlightClassName;
if(this._elCurListItem){YAHOO.util.Dom.removeClass(this._elCurListItem,B);this._elCurListItem=null;}if((C=="to")&&B){YAHOO.util.Dom.addClass(A,B);this._elCurListItem=A;}}};YAHOO.widget.AutoComplete.prototype._togglePrehighlight=function(B,C){var A=this.prehighlightClassName;if(this._elCurPrehighlightItem){YAHOO.util.Dom.removeClass(this._elCurPrehighlightItem,A);}if(B==this._elCurListItem){return;}if((C=="mouseover")&&A){YAHOO.util.Dom.addClass(B,A);this._elCurPrehighlightItem=B;}else{YAHOO.util.Dom.removeClass(B,A);}};YAHOO.widget.AutoComplete.prototype._updateValue=function(C){if(!this.suppressInputUpdate){var F=this._elTextbox;var E=(this.delimChar)?(this.delimChar[0]||this.delimChar):null;var B=C._sResultMatch;var D="";if(E){D=this._sPastSelections;D+=B+E;if(E!=" "){D+=" ";}}else{D=B;}F.value=D;if(F.type=="textarea"){F.scrollTop=F.scrollHeight;}var A=F.value.length;this._selectText(F,A,A);this._elCurListItem=C;}};YAHOO.widget.AutoComplete.prototype._selectItem=function(A){this._bItemSelected=true;this._updateValue(A);this._sPastSelections=this._elTextbox.value;this._clearInterval();this.itemSelectEvent.fire(this,A,A._oResultData);this._toggleContainer(false);};YAHOO.widget.AutoComplete.prototype._jumpSelection=function(){if(this._elCurListItem){this._selectItem(this._elCurListItem);}else{this._toggleContainer(false);}};YAHOO.widget.AutoComplete.prototype._moveSelection=function(G){if(this._bContainerOpen){var H=this._elCurListItem,D=-1;if(H){D=H._nItemIndex;}var E=(G==40)?(D+1):(D-1);if(E<-2||E>=this._nDisplayedItems){return;}if(H){this._toggleHighlight(H,"from");this.itemArrowFromEvent.fire(this,H);}if(E==-1){if(this.delimChar){this._elTextbox.value=this._sPastSelections+this._sCurQuery;}else{this._elTextbox.value=this._sCurQuery;}return;}if(E==-2){this._toggleContainer(false);return;}var F=this._elList.childNodes[E],B=this._elContent,C=YAHOO.util.Dom.getStyle(B,"overflow"),I=YAHOO.util.Dom.getStyle(B,"overflowY"),A=((C=="auto")||(C=="scroll")||(I=="auto")||(I=="scroll"));if(A&&(E>-1)&&(E<this._nDisplayedItems)){if(G==40){if((F.offsetTop+F.offsetHeight)>(B.scrollTop+B.offsetHeight)){B.scrollTop=(F.offsetTop+F.offsetHeight)-B.offsetHeight;}else{if((F.offsetTop+F.offsetHeight)<B.scrollTop){B.scrollTop=F.offsetTop;}}}else{if(F.offsetTop<B.scrollTop){this._elContent.scrollTop=F.offsetTop;}else{if(F.offsetTop>(B.scrollTop+B.offsetHeight)){this._elContent.scrollTop=(F.offsetTop+F.offsetHeight)-B.offsetHeight;}}}}this._toggleHighlight(F,"to");this.itemArrowToEvent.fire(this,F);if(this.typeAhead){this._updateValue(F);}}};YAHOO.widget.AutoComplete.prototype._onContainerMouseover=function(A,C){var D=YAHOO.util.Event.getTarget(A);var B=D.nodeName.toLowerCase();while(D&&(B!="table")){switch(B){case"body":return;case"li":if(C.prehighlightClassName){C._togglePrehighlight(D,"mouseover");}else{C._toggleHighlight(D,"to");}C.itemMouseOverEvent.fire(C,D);break;case"div":if(YAHOO.util.Dom.hasClass(D,"yui-ac-container")){C._bOverContainer=true;return;}break;default:break;}D=D.parentNode;if(D){B=D.nodeName.toLowerCase();}}};YAHOO.widget.AutoComplete.prototype._onContainerMouseout=function(A,C){var D=YAHOO.util.Event.getTarget(A);var B=D.nodeName.toLowerCase();while(D&&(B!="table")){switch(B){case"body":return;case"li":if(C.prehighlightClassName){C._togglePrehighlight(D,"mouseout");}else{C._toggleHighlight(D,"from");}C.itemMouseOutEvent.fire(C,D);break;case"ul":C._toggleHighlight(C._elCurListItem,"to");break;case"div":if(YAHOO.util.Dom.hasClass(D,"yui-ac-container")){C._bOverContainer=false;return;}break;default:break;}D=D.parentNode;if(D){B=D.nodeName.toLowerCase();}}};YAHOO.widget.AutoComplete.prototype._onContainerClick=function(A,C){var D=YAHOO.util.Event.getTarget(A);var B=D.nodeName.toLowerCase();while(D&&(B!="table")){switch(B){case"body":return;case"li":C._toggleHighlight(D,"to");C._selectItem(D);return;default:break;}D=D.parentNode;if(D){B=D.nodeName.toLowerCase();}}};YAHOO.widget.AutoComplete.prototype._onContainerScroll=function(A,B){B._focus();};YAHOO.widget.AutoComplete.prototype._onContainerResize=function(A,B){B._toggleContainerHelpers(B._bContainerOpen);};YAHOO.widget.AutoComplete.prototype._onTextboxKeyDown=function(A,B){var C=A.keyCode;if(B._nTypeAheadDelayID!=-1){clearTimeout(B._nTypeAheadDelayID);}switch(C){case 9:if(!YAHOO.env.ua.opera&&(navigator.userAgent.toLowerCase().indexOf("mac")==-1)||(YAHOO.env.ua.webkit>420)){if(B._elCurListItem){if(B.delimChar&&(B._nKeyCode!=C)){if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);}}B._selectItem(B._elCurListItem);}else{B._toggleContainer(false);}}break;case 13:if(!YAHOO.env.ua.opera&&(navigator.userAgent.toLowerCase().indexOf("mac")==-1)||(YAHOO.env.ua.webkit>420)){if(B._elCurListItem){if(B._nKeyCode!=C){if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);}}B._selectItem(B._elCurListItem);}else{B._toggleContainer(false);}}break;case 27:B._toggleContainer(false);return;case 39:B._jumpSelection();break;case 38:if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);B._moveSelection(C);}break;case 40:if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);B._moveSelection(C);}break;default:B._bItemSelected=false;B._toggleHighlight(B._elCurListItem,"from");B.textboxKeyEvent.fire(B,C);break;}if(C===18){B._enableIntervalDetection();}B._nKeyCode=C;};YAHOO.widget.AutoComplete.prototype._onTextboxKeyPress=function(A,B){var C=A.keyCode;if(YAHOO.env.ua.opera||(navigator.userAgent.toLowerCase().indexOf("mac")!=-1)&&(YAHOO.env.ua.webkit<420)){switch(C){case 9:if(B._bContainerOpen){if(B.delimChar){YAHOO.util.Event.stopEvent(A);}if(B._elCurListItem){B._selectItem(B._elCurListItem);}else{B._toggleContainer(false);}}break;case 13:if(B._bContainerOpen){YAHOO.util.Event.stopEvent(A);if(B._elCurListItem){B._selectItem(B._elCurListItem);}else{B._toggleContainer(false);}}break;default:break;}}else{if(C==229){B._enableIntervalDetection();}}};YAHOO.widget.AutoComplete.prototype._onTextboxKeyUp=function(A,C){var B=this.value;C._initProps();var D=A.keyCode;if(C._isIgnoreKey(D)){return;
}if(C._nDelayID!=-1){clearTimeout(C._nDelayID);}C._nDelayID=setTimeout(function(){C._sendQuery(B);},(C.queryDelay*1000));};YAHOO.widget.AutoComplete.prototype._onTextboxFocus=function(A,B){if(!B._bFocused){B._elTextbox.setAttribute("autocomplete","off");B._bFocused=true;B._sInitInputValue=B._elTextbox.value;B.textboxFocusEvent.fire(B);}};YAHOO.widget.AutoComplete.prototype._onTextboxBlur=function(A,C){if(!C._bOverContainer||(C._nKeyCode==9)){if(!C._bItemSelected){var B=C._textMatchesOption();if(!C._bContainerOpen||(C._bContainerOpen&&(B===null))){if(C.forceSelection){C._clearSelection();}else{C.unmatchedItemSelectEvent.fire(C,C._sCurQuery);}}else{if(C.forceSelection){C._selectItem(B);}}}C._clearInterval();C._bFocused=false;if(C._sInitInputValue!==C._elTextbox.value){C.textboxChangeEvent.fire(C);}C.textboxBlurEvent.fire(C);C._toggleContainer(false);}else{C._focus();}};YAHOO.widget.AutoComplete.prototype._onWindowUnload=function(A,B){if(B&&B._elTextbox&&B.allowBrowserAutocomplete){B._elTextbox.setAttribute("autocomplete","on");}};YAHOO.widget.AutoComplete.prototype.doBeforeSendQuery=function(A){return this.generateRequest(A);};YAHOO.widget.AutoComplete.prototype.getListItems=function(){var C=[],B=this._elList.childNodes;for(var A=B.length-1;A>=0;A--){C[A]=B[A];}return C;};YAHOO.widget.AutoComplete._cloneObject=function(D){if(!YAHOO.lang.isValue(D)){return D;}var F={};if(YAHOO.lang.isFunction(D)){F=D;}else{if(YAHOO.lang.isArray(D)){var E=[];for(var C=0,B=D.length;C<B;C++){E[C]=YAHOO.widget.AutoComplete._cloneObject(D[C]);}F=E;}else{if(YAHOO.lang.isObject(D)){for(var A in D){if(YAHOO.lang.hasOwnProperty(D,A)){if(YAHOO.lang.isValue(D[A])&&YAHOO.lang.isObject(D[A])||YAHOO.lang.isArray(D[A])){F[A]=YAHOO.widget.AutoComplete._cloneObject(D[A]);}else{F[A]=D[A];}}}}else{F=D;}}}return F;};YAHOO.register("autocomplete",YAHOO.widget.AutoComplete,{version:"2.8.0r4",build:"2449"});// End of File include/javascript/yui/build/autocomplete/autocomplete-min.js
                                
/*********************************************************************************
 * SugarCRM is a customer relationship management program developed by
 * SugarCRM, Inc. Copyright (C) 2004-2011 SugarCRM Inc.
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY SUGARCRM, SUGARCRM DISCLAIMS THE WARRANTY
 * OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along with
 * this program; if not, see http://www.gnu.org/licenses or write to the Free
 * Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 * 02110-1301 USA.
 *
 * You can contact SugarCRM, Inc. headquarters at 10050 North Wolfe Road,
 * SW2-130, Cupertino, CA 95014, USA. or at email address contact@sugarcrm.com.
 *
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU Affero General Public License version 3.
 *
 * In accordance with Section 7(b) of the GNU Affero General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "Powered by
 * SugarCRM" logo. If the display of the logo is not reasonably feasible for
 * technical reasons, the Appropriate Legal Notices must display the words
 * "Powered by SugarCRM".
 ********************************************************************************/
function enableQS(noReload){YAHOO.util.Event.onDOMReady(function(){if(typeof sqs_objects=='undefined'){return;}
var Dom=YAHOO.util.Dom;var qsFields=Dom.getElementsByClassName('sqsEnabled');for(qsField in qsFields){if(typeof qsFields[qsField]=='function'||typeof qsFields[qsField].id=='undefined'){continue;}
form_id=qsFields[qsField].form.getAttribute('id');if(typeof form_id=='object'&&qsFields[qsField].form.getAttribute('real_id')){form_id=qsFields[qsField].form.getAttribute('real_id');}
qs_index_id=form_id+'_'+qsFields[qsField].name;if(typeof sqs_objects[qs_index_id]=='undefined'){qs_index_id=qsFields[qsField].name;if(typeof sqs_objects[qs_index_id]=='undefined'){continue;}}
if(QSProcessedFieldsArray[qs_index_id]){continue;}
var qs_obj=sqs_objects[qs_index_id];var loaded=false;if(!document.forms[qs_obj.form]){continue;}
if(!document.forms[qs_obj.form].elements[qsFields[qsField].id].readOnly&&qs_obj['disable']!=true){combo_id=qs_obj.form+'_'+qsFields[qsField].id;if(Dom.get(combo_id+"_results")){loaded=true}
if(!loaded){QSProcessedFieldsArray[qs_index_id]=true;qsFields[qsField].form_id=form_id;var sqs=sqs_objects[qs_index_id];var resultDiv=document.createElement('div');resultDiv.id=combo_id+"_results";Dom.insertAfter(resultDiv,qsFields[qsField]);var fields=qs_obj.field_list.slice();fields[fields.length]="module";var ds=new YAHOO.util.DataSource("index.php?",{responseType:YAHOO.util.XHRDataSource.TYPE_JSON,responseSchema:{resultsList:'fields',total:'totalCount',fields:fields,metaNode:"fields",metaFields:{total:'totalCount',fields:"fields"}},connMethodPost:true});var forceSelect=!((qsFields[qsField].form&&typeof(qsFields[qsField].form)=='object'&&qsFields[qsField].form.name=='search_form')||qsFields[qsField].className.match('sqsNoAutofill')!=null);var search=new YAHOO.widget.AutoComplete(qsFields[qsField],resultDiv,ds,{typeAhead:forceSelect,forceSelection:forceSelect,fields:fields,sqs:sqs,animSpeed:0.25,qs_obj:qs_obj,inputElement:qsFields[qsField],generateRequest:function(sQuery){var out=SUGAR.util.paramsToUrl({to_pdf:'true',module:'Home',action:'quicksearchQuery',data:encodeURIComponent(YAHOO.lang.JSON.stringify(this.sqs)),query:sQuery});return out;},setFields:function(data,filter){this.updateFields(data,filter);},updateFields:function(data,filter){for(var i in this.fields){for(var key in this.qs_obj.field_list){if(this.fields[i]==this.qs_obj.field_list[key]&&document.forms[this.qs_obj.form].elements[this.qs_obj.populate_list[key]]&&this.qs_obj.populate_list[key].match(filter)){var displayValue=data[i].replace(/&amp;/gi,'&').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/&#039;/gi,'\'').replace(/&quot;/gi,'"');document.forms[this.qs_obj.form].elements[this.qs_obj.populate_list[key]].value=displayValue;}}}},clearFields:function(){for(var key in this.qs_obj.field_list){if(document.forms[this.qs_obj.form].elements[this.qs_obj.populate_list[key]]){document.forms[this.qs_obj.form].elements[this.qs_obj.populate_list[key]].value="";}}
this.oldValue="";}});if(/^(billing_|shipping_)?account_name$/.exec(qsFields[qsField].name))
{search.clearFields=function(){};search.setFields=function(data,filter)
{var label_str='';var label_data_str='';var current_label_data_str='';var label_data_hash=new Array();for(var i in this.fields){for(var key in this.qs_obj.field_list){if(this.fields[i]==this.qs_obj.field_list[key]&&document.forms[this.qs_obj.form].elements[this.qs_obj.populate_list[key]]&&document.getElementById(this.qs_obj.populate_list[key]+'_label')&&this.qs_obj.populate_list[key].match(filter)){var displayValue=data[i].replace(/&amp;/gi,'&').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/&#039;/gi,'\'').replace(/&quot;/gi,'"');var data_label=document.getElementById(this.qs_obj.populate_list[key]+'_label').innerHTML.replace(/\n/gi,'');label_and_data=data_label+' '+displayValue;if(document.forms[this.qs_obj.form].elements[this.qs_obj.populate_list[key]]&&!label_data_hash[data_label])
{label_str+=data_label+' \n';label_data_str+=label_and_data+'\n';label_data_hash[data_label]=true;current_label_data_str+=data_label+' '+document.forms[this.qs_obj.form].elements[this.qs_obj.populate_list[key]].value+'\n';}}}}
if(label_str!=current_label_data_str&&current_label_data_str!=label_data_str){module_key=(typeof document.forms[form_id].elements['module']!='undefined')?document.forms[form_id].elements['module'].value:'app_strings';warning_label=SUGAR.language.translate(module_key,'NTC_OVERWRITE_ADDRESS_PHONE_CONFIRM')+'\n\n'+label_data_str;if(!confirm(warning_label))
{this.updateFields(data,/account_id/);}else{if(Dom.get('shipping_checkbox'))
{if(this.inputElement.id=='shipping_account_name')
{filter=Dom.get('shipping_checkbox').checked?/(account_id|office_phone)/:filter;}else if(this.inputElement.id=='billing_account_name'){filter=Dom.get('shipping_checkbox').checked?filter:/(account_id|office_phone|billing)/;}}else if(Dom.get('alt_checkbox')){filter=Dom.get('alt_checkbox').checked?filter:/^(?!alt)/;}
this.updateFields(data,filter);}}else{this.updateFields(data,filter);}};}
if(typeof(SUGAR.config.quicksearch_querydelay)!='undefined'){search.queryDelay=SUGAR.config.quicksearch_querydelay;}
search.itemSelectEvent.subscribe(function(e,args){var data=args[2];var fields=this.fields;this.setFields(data,/\S/);if(typeof(this.qs_obj['post_onblur_function'])!='undefined'){collection_extended=new Array();for(var i in fields){for(var key in this.qs_obj.field_list){if(fields[i]==this.qs_obj.field_list[key]){collection_extended[this.qs_obj.field_list[key]]=data[i];}}}
eval(this.qs_obj['post_onblur_function']+'(collection_extended, this.qs_obj.id)');}});search.textboxFocusEvent.subscribe(function(){this.oldValue=this.getInputEl().value;});search.selectionEnforceEvent.subscribe(function(e,args){if(this.oldValue!=args[1]){this.clearFields();}else{this.getInputEl().value=this.oldValue;}});search.dataReturnEvent.subscribe(function(e,args){if(this.getInputEl().value.length==0&&args[2].length>0){var data=[];for(var key in this.qs_obj.field_list){data[data.length]=args[2][0][this.qs_obj.field_list[key]];}
this.getInputEl().value=data[this.key];this.itemSelectEvent.fire(this,"",data);}});search.typeAheadEvent.subscribe(function(e,args){this.getInputEl().value=this.getInputEl().value.replace(/&amp;/gi,'&').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/&#039;/gi,'\'').replace(/&quot;/gi,'"');});if(typeof QSFieldsArray[combo_id]=='undefined'&&qsFields[qsField].id){QSFieldsArray[combo_id]=search;}}}}});}
function registerSingleSmartInputListener(input){if((c=input.className)&&(c.indexOf("sqsEnabled")!=-1)){enableQS(true);}}
if(typeof QSFieldsArray=='undefined'){QSFieldsArray=new Array();QSProcessedFieldsArray=new Array();}// End of File include/javascript/quicksearch.js
                                
/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
(function(){var K=YAHOO.env.ua,C=YAHOO.util.Dom,Z=YAHOO.util.Event,H=YAHOO.lang,T="DIV",P="hd",M="bd",O="ft",X="LI",A="disabled",D="mouseover",F="mouseout",U="mousedown",G="mouseup",V="click",B="keydown",N="keyup",I="keypress",L="clicktohide",S="position",Q="dynamic",Y="showdelay",J="selected",E="visible",W="UL",R="MenuManager";YAHOO.widget.MenuManager=function(){var l=false,d={},o={},h={},c={"click":"clickEvent","mousedown":"mouseDownEvent","mouseup":"mouseUpEvent","mouseover":"mouseOverEvent","mouseout":"mouseOutEvent","keydown":"keyDownEvent","keyup":"keyUpEvent","keypress":"keyPressEvent","focus":"focusEvent","focusin":"focusEvent","blur":"blurEvent","focusout":"blurEvent"},i=null;function b(r){var p,q;if(r&&r.tagName){switch(r.tagName.toUpperCase()){case T:p=r.parentNode;if((C.hasClass(r,P)||C.hasClass(r,M)||C.hasClass(r,O))&&p&&p.tagName&&p.tagName.toUpperCase()==T){q=p;}else{q=r;}break;case X:q=r;break;default:p=r.parentNode;if(p){q=b(p);}break;}}return q;}function e(t){var p=Z.getTarget(t),q=b(p),u=true,w=t.type,x,r,s,z,y;if(q){r=q.tagName.toUpperCase();if(r==X){s=q.id;if(s&&h[s]){z=h[s];y=z.parent;}}else{if(r==T){if(q.id){y=d[q.id];}}}}if(y){x=c[w];if(w=="click"&&(K.gecko&&y.platform!="mac")&&t.button>0){u=false;}if(u&&z&&!z.cfg.getProperty(A)){z[x].fire(t);}if(u){y[x].fire(t,z);}}else{if(w==U){for(var v in o){if(H.hasOwnProperty(o,v)){y=o[v];if(y.cfg.getProperty(L)&&!(y instanceof YAHOO.widget.MenuBar)&&y.cfg.getProperty(S)==Q){y.hide();if(K.ie&&p.focus){p.setActive();}}else{if(y.cfg.getProperty(Y)>0){y._cancelShowDelay();}if(y.activeItem){y.activeItem.blur();y.activeItem.cfg.setProperty(J,false);y.activeItem=null;}}}}}}}function n(q,p,r){if(d[r.id]){this.removeMenu(r);}}function k(q,p){var r=p[1];if(r){i=r;}}function f(q,p){i=null;}function a(r,q){var p=q[0],s=this.id;if(p){o[s]=this;}else{if(o[s]){delete o[s];}}}function j(q,p){m(this);}function m(q){var p=q.id;if(p&&h[p]){if(i==q){i=null;}delete h[p];q.destroyEvent.unsubscribe(j);}}function g(q,p){var s=p[0],r;if(s instanceof YAHOO.widget.MenuItem){r=s.id;if(!h[r]){h[r]=s;s.destroyEvent.subscribe(j);}}}return{addMenu:function(q){var p;if(q instanceof YAHOO.widget.Menu&&q.id&&!d[q.id]){d[q.id]=q;if(!l){p=document;Z.on(p,D,e,this,true);Z.on(p,F,e,this,true);Z.on(p,U,e,this,true);Z.on(p,G,e,this,true);Z.on(p,V,e,this,true);Z.on(p,B,e,this,true);Z.on(p,N,e,this,true);Z.on(p,I,e,this,true);Z.onFocus(p,e,this,true);Z.onBlur(p,e,this,true);l=true;}q.cfg.subscribeToConfigEvent(E,a);q.destroyEvent.subscribe(n,q,this);q.itemAddedEvent.subscribe(g);q.focusEvent.subscribe(k);q.blurEvent.subscribe(f);}},removeMenu:function(s){var q,p,r;if(s){q=s.id;if((q in d)&&(d[q]==s)){p=s.getItems();if(p&&p.length>0){r=p.length-1;do{m(p[r]);}while(r--);}delete d[q];if((q in o)&&(o[q]==s)){delete o[q];}if(s.cfg){s.cfg.unsubscribeFromConfigEvent(E,a);}s.destroyEvent.unsubscribe(n,s);s.itemAddedEvent.unsubscribe(g);s.focusEvent.unsubscribe(k);s.blurEvent.unsubscribe(f);}}},hideVisible:function(){var p;for(var q in o){if(H.hasOwnProperty(o,q)){p=o[q];if(!(p instanceof YAHOO.widget.MenuBar)&&p.cfg.getProperty(S)==Q){p.hide();}}}},getVisible:function(){return o;},getMenus:function(){return d;},getMenu:function(q){var p;if(q in d){p=d[q];}return p;},getMenuItem:function(q){var p;if(q in h){p=h[q];}return p;},getMenuItemGroup:function(t){var q=C.get(t),p,v,u,r,s;if(q&&q.tagName&&q.tagName.toUpperCase()==W){v=q.firstChild;if(v){p=[];do{r=v.id;if(r){u=this.getMenuItem(r);if(u){p[p.length]=u;}}}while((v=v.nextSibling));if(p.length>0){s=p;}}}return s;},getFocusedMenuItem:function(){return i;},getFocusedMenu:function(){var p;if(i){p=i.parent.getRoot();}return p;},toString:function(){return R;}};}();})();(function(){var AM=YAHOO.lang,Aq="Menu",G="DIV",K="div",Am="id",AH="SELECT",e="xy",R="y",Ax="UL",L="ul",AJ="first-of-type",k="LI",h="OPTGROUP",Az="OPTION",Ah="disabled",AY="none",y="selected",At="groupindex",i="index",O="submenu",Au="visible",AX="hidedelay",Ac="position",AD="dynamic",C="static",An=AD+","+C,Q="url",M="#",V="target",AU="maxheight",T="topscrollbar",x="bottomscrollbar",d="_",P=T+d+Ah,E=x+d+Ah,b="mousemove",Av="showdelay",c="submenuhidedelay",AF="iframe",w="constraintoviewport",A4="preventcontextoverlap",AO="submenualignment",Z="autosubmenudisplay",AC="clicktohide",g="container",j="scrollincrement",Aj="minscrollheight",A2="classname",Ag="shadow",Ar="keepopen",A0="hd",D="hastitle",p="context",u="",Ak="mousedown",Ae="keydown",Ao="height",U="width",AQ="px",Ay="effect",AE="monitorresize",AW="display",AV="block",J="visibility",z="absolute",AS="zindex",l="yui-menu-body-scrolled",AK="&#32;",A1=" ",Ai="mouseover",H="mouseout",AR="itemAdded",n="itemRemoved",AL="hidden",s="yui-menu-shadow",AG=s+"-visible",m=s+A1+AG;YAHOO.widget.Menu=function(A6,A5){if(A5){this.parent=A5.parent;this.lazyLoad=A5.lazyLoad||A5.lazyload;this.itemData=A5.itemData||A5.itemdata;}YAHOO.widget.Menu.superclass.constructor.call(this,A6,A5);};function B(A6){var A5=false;if(AM.isString(A6)){A5=(An.indexOf((A6.toLowerCase()))!=-1);}return A5;}var f=YAHOO.util.Dom,AA=YAHOO.util.Event,Aw=YAHOO.widget.Module,AB=YAHOO.widget.Overlay,r=YAHOO.widget.Menu,A3=YAHOO.widget.MenuManager,F=YAHOO.util.CustomEvent,As=YAHOO.env.ua,Ap,AT=false,Ad,Ab=[["mouseOverEvent",Ai],["mouseOutEvent",H],["mouseDownEvent",Ak],["mouseUpEvent","mouseup"],["clickEvent","click"],["keyPressEvent","keypress"],["keyDownEvent",Ae],["keyUpEvent","keyup"],["focusEvent","focus"],["blurEvent","blur"],["itemAddedEvent",AR],["itemRemovedEvent",n]],AZ={key:Au,value:false,validator:AM.isBoolean},AP={key:w,value:true,validator:AM.isBoolean,supercedes:[AF,"x",R,e]},AI={key:A4,value:true,validator:AM.isBoolean,supercedes:[w]},S={key:Ac,value:AD,validator:B,supercedes:[Au,AF]},A={key:AO,value:["tl","tr"]},t={key:Z,value:true,validator:AM.isBoolean,suppressEvent:true},Y={key:Av,value:250,validator:AM.isNumber,suppressEvent:true},q={key:AX,value:0,validator:AM.isNumber,suppressEvent:true},v={key:c,value:250,validator:AM.isNumber,suppressEvent:true},o={key:AC,value:true,validator:AM.isBoolean,suppressEvent:true},AN={key:g,suppressEvent:true},Af={key:j,value:1,validator:AM.isNumber,supercedes:[AU],suppressEvent:true},N={key:Aj,value:90,validator:AM.isNumber,supercedes:[AU],suppressEvent:true},X={key:AU,value:0,validator:AM.isNumber,supercedes:[AF],suppressEvent:true},W={key:A2,value:null,validator:AM.isString,suppressEvent:true},a={key:Ah,value:false,validator:AM.isBoolean,suppressEvent:true},I={key:Ag,value:true,validator:AM.isBoolean,suppressEvent:true,supercedes:[Au]},Al={key:Ar,value:false,validator:AM.isBoolean};
function Aa(A5){Ad=AA.getTarget(A5);}YAHOO.lang.extend(r,AB,{CSS_CLASS_NAME:"yuimenu",ITEM_TYPE:null,GROUP_TITLE_TAG_NAME:"h6",OFF_SCREEN_POSITION:"-999em",_useHideDelay:false,_bHandledMouseOverEvent:false,_bHandledMouseOutEvent:false,_aGroupTitleElements:null,_aItemGroups:null,_aListElements:null,_nCurrentMouseX:0,_bStopMouseEventHandlers:false,_sClassName:null,lazyLoad:false,itemData:null,activeItem:null,parent:null,srcElement:null,init:function(A7,A6){this._aItemGroups=[];this._aListElements=[];this._aGroupTitleElements=[];if(!this.ITEM_TYPE){this.ITEM_TYPE=YAHOO.widget.MenuItem;}var A5;if(AM.isString(A7)){A5=f.get(A7);}else{if(A7.tagName){A5=A7;}}if(A5&&A5.tagName){switch(A5.tagName.toUpperCase()){case G:this.srcElement=A5;if(!A5.id){A5.setAttribute(Am,f.generateId());}r.superclass.init.call(this,A5);this.beforeInitEvent.fire(r);break;case AH:this.srcElement=A5;r.superclass.init.call(this,f.generateId());this.beforeInitEvent.fire(r);break;}}else{r.superclass.init.call(this,A7);this.beforeInitEvent.fire(r);}if(this.element){f.addClass(this.element,this.CSS_CLASS_NAME);this.initEvent.subscribe(this._onInit);this.beforeRenderEvent.subscribe(this._onBeforeRender);this.renderEvent.subscribe(this._onRender);this.beforeShowEvent.subscribe(this._onBeforeShow);this.hideEvent.subscribe(this._onHide);this.showEvent.subscribe(this._onShow);this.beforeHideEvent.subscribe(this._onBeforeHide);this.mouseOverEvent.subscribe(this._onMouseOver);this.mouseOutEvent.subscribe(this._onMouseOut);this.clickEvent.subscribe(this._onClick);this.keyDownEvent.subscribe(this._onKeyDown);this.keyPressEvent.subscribe(this._onKeyPress);this.blurEvent.subscribe(this._onBlur);if(!AT){AA.onFocus(document,Aa);AT=true;}if((As.gecko&&As.gecko<1.9)||As.webkit){this.cfg.subscribeToConfigEvent(R,this._onYChange);}if(A6){this.cfg.applyConfig(A6,true);}A3.addMenu(this);this.initEvent.fire(r);}},_initSubTree:function(){var A6=this.srcElement,A5,A8,BB,BC,BA,A9,A7;if(A6){A5=(A6.tagName&&A6.tagName.toUpperCase());if(A5==G){BC=this.body.firstChild;if(BC){A8=0;BB=this.GROUP_TITLE_TAG_NAME.toUpperCase();do{if(BC&&BC.tagName){switch(BC.tagName.toUpperCase()){case BB:this._aGroupTitleElements[A8]=BC;break;case Ax:this._aListElements[A8]=BC;this._aItemGroups[A8]=[];A8++;break;}}}while((BC=BC.nextSibling));if(this._aListElements[0]){f.addClass(this._aListElements[0],AJ);}}}BC=null;if(A5){switch(A5){case G:BA=this._aListElements;A9=BA.length;if(A9>0){A7=A9-1;do{BC=BA[A7].firstChild;if(BC){do{if(BC&&BC.tagName&&BC.tagName.toUpperCase()==k){this.addItem(new this.ITEM_TYPE(BC,{parent:this}),A7);}}while((BC=BC.nextSibling));}}while(A7--);}break;case AH:BC=A6.firstChild;do{if(BC&&BC.tagName){switch(BC.tagName.toUpperCase()){case h:case Az:this.addItem(new this.ITEM_TYPE(BC,{parent:this}));break;}}}while((BC=BC.nextSibling));break;}}}},_getFirstEnabledItem:function(){var A5=this.getItems(),A9=A5.length,A8,A7;for(var A6=0;A6<A9;A6++){A8=A5[A6];if(A8&&!A8.cfg.getProperty(Ah)&&A8.element.style.display!=AY){A7=A8;break;}}return A7;},_addItemToGroup:function(BA,BB,BF){var BD,BG,A8,BE,A9,A6,A7,BC;function A5(BH,BI){return(BH[BI]||A5(BH,(BI+1)));}if(BB instanceof this.ITEM_TYPE){BD=BB;BD.parent=this;}else{if(AM.isString(BB)){BD=new this.ITEM_TYPE(BB,{parent:this});}else{if(AM.isObject(BB)){BB.parent=this;BD=new this.ITEM_TYPE(BB.text,BB);}}}if(BD){if(BD.cfg.getProperty(y)){this.activeItem=BD;}BG=AM.isNumber(BA)?BA:0;A8=this._getItemGroup(BG);if(!A8){A8=this._createItemGroup(BG);}if(AM.isNumber(BF)){A9=(BF>=A8.length);if(A8[BF]){A8.splice(BF,0,BD);}else{A8[BF]=BD;}BE=A8[BF];if(BE){if(A9&&(!BE.element.parentNode||BE.element.parentNode.nodeType==11)){this._aListElements[BG].appendChild(BE.element);}else{A6=A5(A8,(BF+1));if(A6&&(!BE.element.parentNode||BE.element.parentNode.nodeType==11)){this._aListElements[BG].insertBefore(BE.element,A6.element);}}BE.parent=this;this._subscribeToItemEvents(BE);this._configureSubmenu(BE);this._updateItemProperties(BG);this.itemAddedEvent.fire(BE);this.changeContentEvent.fire();BC=BE;}}else{A7=A8.length;A8[A7]=BD;BE=A8[A7];if(BE){if(!f.isAncestor(this._aListElements[BG],BE.element)){this._aListElements[BG].appendChild(BE.element);}BE.element.setAttribute(At,BG);BE.element.setAttribute(i,A7);BE.parent=this;BE.index=A7;BE.groupIndex=BG;this._subscribeToItemEvents(BE);this._configureSubmenu(BE);if(A7===0){f.addClass(BE.element,AJ);}this.itemAddedEvent.fire(BE);this.changeContentEvent.fire();BC=BE;}}}return BC;},_removeItemFromGroupByIndex:function(A8,A6){var A7=AM.isNumber(A8)?A8:0,A9=this._getItemGroup(A7),BB,BA,A5;if(A9){BB=A9.splice(A6,1);BA=BB[0];if(BA){this._updateItemProperties(A7);if(A9.length===0){A5=this._aListElements[A7];if(this.body&&A5){this.body.removeChild(A5);}this._aItemGroups.splice(A7,1);this._aListElements.splice(A7,1);A5=this._aListElements[0];if(A5){f.addClass(A5,AJ);}}this.itemRemovedEvent.fire(BA);this.changeContentEvent.fire();}}return BA;},_removeItemFromGroupByValue:function(A8,A5){var BA=this._getItemGroup(A8),BB,A9,A7,A6;if(BA){BB=BA.length;A9=-1;if(BB>0){A6=BB-1;do{if(BA[A6]==A5){A9=A6;break;}}while(A6--);if(A9>-1){A7=this._removeItemFromGroupByIndex(A8,A9);}}}return A7;},_updateItemProperties:function(A6){var A7=this._getItemGroup(A6),BA=A7.length,A9,A8,A5;if(BA>0){A5=BA-1;do{A9=A7[A5];if(A9){A8=A9.element;A9.index=A5;A9.groupIndex=A6;A8.setAttribute(At,A6);A8.setAttribute(i,A5);f.removeClass(A8,AJ);}}while(A5--);if(A8){f.addClass(A8,AJ);}}},_createItemGroup:function(A7){var A5,A6;if(!this._aItemGroups[A7]){this._aItemGroups[A7]=[];A5=document.createElement(L);this._aListElements[A7]=A5;A6=this._aItemGroups[A7];}return A6;},_getItemGroup:function(A7){var A5=AM.isNumber(A7)?A7:0,A8=this._aItemGroups,A6;if(A5 in A8){A6=A8[A5];}return A6;},_configureSubmenu:function(A5){var A6=A5.cfg.getProperty(O);if(A6){this.cfg.configChangedEvent.subscribe(this._onParentMenuConfigChange,A6,true);this.renderEvent.subscribe(this._onParentMenuRender,A6,true);}},_subscribeToItemEvents:function(A5){A5.destroyEvent.subscribe(this._onMenuItemDestroy,A5,this);
A5.cfg.configChangedEvent.subscribe(this._onMenuItemConfigChange,A5,this);},_onVisibleChange:function(A7,A6){var A5=A6[0];if(A5){f.addClass(this.element,Au);}else{f.removeClass(this.element,Au);}},_cancelHideDelay:function(){var A5=this.getRoot()._hideDelayTimer;if(A5){A5.cancel();}},_execHideDelay:function(){this._cancelHideDelay();var A5=this.getRoot();A5._hideDelayTimer=AM.later(A5.cfg.getProperty(AX),this,function(){if(A5.activeItem){if(A5.hasFocus()){A5.activeItem.focus();}A5.clearActiveItem();}if(A5==this&&!(this instanceof YAHOO.widget.MenuBar)&&this.cfg.getProperty(Ac)==AD){this.hide();}});},_cancelShowDelay:function(){var A5=this.getRoot()._showDelayTimer;if(A5){A5.cancel();}},_execSubmenuHideDelay:function(A7,A6,A5){A7._submenuHideDelayTimer=AM.later(50,this,function(){if(this._nCurrentMouseX>(A6+10)){A7._submenuHideDelayTimer=AM.later(A5,A7,function(){this.hide();});}else{A7.hide();}});},_disableScrollHeader:function(){if(!this._bHeaderDisabled){f.addClass(this.header,P);this._bHeaderDisabled=true;}},_disableScrollFooter:function(){if(!this._bFooterDisabled){f.addClass(this.footer,E);this._bFooterDisabled=true;}},_enableScrollHeader:function(){if(this._bHeaderDisabled){f.removeClass(this.header,P);this._bHeaderDisabled=false;}},_enableScrollFooter:function(){if(this._bFooterDisabled){f.removeClass(this.footer,E);this._bFooterDisabled=false;}},_onMouseOver:function(BH,BA){var BI=BA[0],BE=BA[1],A5=AA.getTarget(BI),A9=this.getRoot(),BG=this._submenuHideDelayTimer,A6,A8,BD,A7,BC,BB;var BF=function(){if(this.parent.cfg.getProperty(y)){this.show();}};if(!this._bStopMouseEventHandlers){if(!this._bHandledMouseOverEvent&&(A5==this.element||f.isAncestor(this.element,A5))){if(this._useHideDelay){this._cancelHideDelay();}this._nCurrentMouseX=0;AA.on(this.element,b,this._onMouseMove,this,true);if(!(BE&&f.isAncestor(BE.element,AA.getRelatedTarget(BI)))){this.clearActiveItem();}if(this.parent&&BG){BG.cancel();this.parent.cfg.setProperty(y,true);A6=this.parent.parent;A6._bHandledMouseOutEvent=true;A6._bHandledMouseOverEvent=false;}this._bHandledMouseOverEvent=true;this._bHandledMouseOutEvent=false;}if(BE&&!BE.handledMouseOverEvent&&!BE.cfg.getProperty(Ah)&&(A5==BE.element||f.isAncestor(BE.element,A5))){A8=this.cfg.getProperty(Av);BD=(A8>0);if(BD){this._cancelShowDelay();}A7=this.activeItem;if(A7){A7.cfg.setProperty(y,false);}BC=BE.cfg;BC.setProperty(y,true);if(this.hasFocus()||A9._hasFocus){BE.focus();A9._hasFocus=false;}if(this.cfg.getProperty(Z)){BB=BC.getProperty(O);if(BB){if(BD){A9._showDelayTimer=AM.later(A9.cfg.getProperty(Av),BB,BF);}else{BB.show();}}}BE.handledMouseOverEvent=true;BE.handledMouseOutEvent=false;}}},_onMouseOut:function(BD,A7){var BE=A7[0],BB=A7[1],A8=AA.getRelatedTarget(BE),BC=false,BA,A9,A5,A6;if(!this._bStopMouseEventHandlers){if(BB&&!BB.cfg.getProperty(Ah)){BA=BB.cfg;A9=BA.getProperty(O);if(A9&&(A8==A9.element||f.isAncestor(A9.element,A8))){BC=true;}if(!BB.handledMouseOutEvent&&((A8!=BB.element&&!f.isAncestor(BB.element,A8))||BC)){if(!BC){BB.cfg.setProperty(y,false);if(A9){A5=this.cfg.getProperty(c);A6=this.cfg.getProperty(Av);if(!(this instanceof YAHOO.widget.MenuBar)&&A5>0&&A6>=A5){this._execSubmenuHideDelay(A9,AA.getPageX(BE),A5);}else{A9.hide();}}}BB.handledMouseOutEvent=true;BB.handledMouseOverEvent=false;}}if(!this._bHandledMouseOutEvent&&((A8!=this.element&&!f.isAncestor(this.element,A8))||BC)){if(this._useHideDelay){this._execHideDelay();}AA.removeListener(this.element,b,this._onMouseMove);this._nCurrentMouseX=AA.getPageX(BE);this._bHandledMouseOutEvent=true;this._bHandledMouseOverEvent=false;}}},_onMouseMove:function(A6,A5){if(!this._bStopMouseEventHandlers){this._nCurrentMouseX=AA.getPageX(A6);}},_onClick:function(BG,A7){var BH=A7[0],BB=A7[1],BD=false,A9,BE,A6,A5,BA,BC,BF;var A8=function(){A6=this.getRoot();if(A6 instanceof YAHOO.widget.MenuBar||A6.cfg.getProperty(Ac)==C){A6.clearActiveItem();}else{A6.hide();}};if(BB){if(BB.cfg.getProperty(Ah)){AA.preventDefault(BH);A8.call(this);}else{A9=BB.cfg.getProperty(O);BA=BB.cfg.getProperty(Q);if(BA){BC=BA.indexOf(M);BF=BA.length;if(BC!=-1){BA=BA.substr(BC,BF);BF=BA.length;if(BF>1){A5=BA.substr(1,BF);BE=YAHOO.widget.MenuManager.getMenu(A5);if(BE){BD=(this.getRoot()===BE.getRoot());}}else{if(BF===1){BD=true;}}}}if(BD&&!BB.cfg.getProperty(V)){AA.preventDefault(BH);if(As.webkit){BB.focus();}else{BB.focusEvent.fire();}}if(!A9&&!this.cfg.getProperty(Ar)){A8.call(this);}}}},_onKeyDown:function(BK,BE){var BH=BE[0],BG=BE[1],BD,BI,A6,BA,BL,A5,BO,A9,BJ,A8,BF,BN,BB,BC;if(this._useHideDelay){this._cancelHideDelay();}function A7(){this._bStopMouseEventHandlers=true;AM.later(10,this,function(){this._bStopMouseEventHandlers=false;});}if(BG&&!BG.cfg.getProperty(Ah)){BI=BG.cfg;A6=this.parent;switch(BH.keyCode){case 38:case 40:BL=(BH.keyCode==38)?BG.getPreviousEnabledSibling():BG.getNextEnabledSibling();if(BL){this.clearActiveItem();BL.cfg.setProperty(y,true);BL.focus();if(this.cfg.getProperty(AU)>0){A5=this.body;BO=A5.scrollTop;A9=A5.offsetHeight;BJ=this.getItems();A8=BJ.length-1;BF=BL.element.offsetTop;if(BH.keyCode==40){if(BF>=(A9+BO)){A5.scrollTop=BF-A9;}else{if(BF<=BO){A5.scrollTop=0;}}if(BL==BJ[A8]){A5.scrollTop=BL.element.offsetTop;}}else{if(BF<=BO){A5.scrollTop=BF-BL.element.offsetHeight;}else{if(BF>=(BO+A9)){A5.scrollTop=BF;}}if(BL==BJ[0]){A5.scrollTop=0;}}BO=A5.scrollTop;BN=A5.scrollHeight-A5.offsetHeight;if(BO===0){this._disableScrollHeader();this._enableScrollFooter();}else{if(BO==BN){this._enableScrollHeader();this._disableScrollFooter();}else{this._enableScrollHeader();this._enableScrollFooter();}}}}AA.preventDefault(BH);A7();break;case 39:BD=BI.getProperty(O);if(BD){if(!BI.getProperty(y)){BI.setProperty(y,true);}BD.show();BD.setInitialFocus();BD.setInitialSelection();}else{BA=this.getRoot();if(BA instanceof YAHOO.widget.MenuBar){BL=BA.activeItem.getNextEnabledSibling();if(BL){BA.clearActiveItem();BL.cfg.setProperty(y,true);BD=BL.cfg.getProperty(O);if(BD){BD.show();BD.setInitialFocus();}else{BL.focus();}}}}AA.preventDefault(BH);
A7();break;case 37:if(A6){BB=A6.parent;if(BB instanceof YAHOO.widget.MenuBar){BL=BB.activeItem.getPreviousEnabledSibling();if(BL){BB.clearActiveItem();BL.cfg.setProperty(y,true);BD=BL.cfg.getProperty(O);if(BD){BD.show();BD.setInitialFocus();}else{BL.focus();}}}else{this.hide();A6.focus();}}AA.preventDefault(BH);A7();break;}}if(BH.keyCode==27){if(this.cfg.getProperty(Ac)==AD){this.hide();if(this.parent){this.parent.focus();}else{BC=this._focusedElement;if(BC&&BC.focus){try{BC.focus();}catch(BM){}}}}else{if(this.activeItem){BD=this.activeItem.cfg.getProperty(O);if(BD&&BD.cfg.getProperty(Au)){BD.hide();this.activeItem.focus();}else{this.activeItem.blur();this.activeItem.cfg.setProperty(y,false);}}}AA.preventDefault(BH);}},_onKeyPress:function(A7,A6){var A5=A6[0];if(A5.keyCode==40||A5.keyCode==38){AA.preventDefault(A5);}},_onBlur:function(A6,A5){if(this._hasFocus){this._hasFocus=false;}},_onYChange:function(A6,A5){var A8=this.parent,BA,A7,A9;if(A8){BA=A8.parent.body.scrollTop;if(BA>0){A9=(this.cfg.getProperty(R)-BA);f.setY(this.element,A9);A7=this.iframe;if(A7){f.setY(A7,A9);}this.cfg.setProperty(R,A9,true);}}},_onScrollTargetMouseOver:function(BB,BE){var BD=this._bodyScrollTimer;if(BD){BD.cancel();}this._cancelHideDelay();var A7=AA.getTarget(BB),A9=this.body,A8=this.cfg.getProperty(j),A5,A6;function BC(){var BF=A9.scrollTop;if(BF<A5){A9.scrollTop=(BF+A8);this._enableScrollHeader();}else{A9.scrollTop=A5;this._bodyScrollTimer.cancel();this._disableScrollFooter();}}function BA(){var BF=A9.scrollTop;if(BF>0){A9.scrollTop=(BF-A8);this._enableScrollFooter();}else{A9.scrollTop=0;this._bodyScrollTimer.cancel();this._disableScrollHeader();}}if(f.hasClass(A7,A0)){A6=BA;}else{A5=A9.scrollHeight-A9.offsetHeight;A6=BC;}this._bodyScrollTimer=AM.later(10,this,A6,null,true);},_onScrollTargetMouseOut:function(A7,A5){var A6=this._bodyScrollTimer;if(A6){A6.cancel();}this._cancelHideDelay();},_onInit:function(A6,A5){this.cfg.subscribeToConfigEvent(Au,this._onVisibleChange);var A7=!this.parent,A8=this.lazyLoad;if(((A7&&!A8)||(A7&&(this.cfg.getProperty(Au)||this.cfg.getProperty(Ac)==C))||(!A7&&!A8))&&this.getItemGroups().length===0){if(this.srcElement){this._initSubTree();}if(this.itemData){this.addItems(this.itemData);}}else{if(A8){this.cfg.fireQueue();}}},_onBeforeRender:function(A8,A7){var A9=this.element,BC=this._aListElements.length,A6=true,BB=0,A5,BA;if(BC>0){do{A5=this._aListElements[BB];if(A5){if(A6){f.addClass(A5,AJ);A6=false;}if(!f.isAncestor(A9,A5)){this.appendToBody(A5);}BA=this._aGroupTitleElements[BB];if(BA){if(!f.isAncestor(A9,BA)){A5.parentNode.insertBefore(BA,A5);}f.addClass(A5,D);}}BB++;}while(BB<BC);}},_onRender:function(A6,A5){if(this.cfg.getProperty(Ac)==AD){if(!this.cfg.getProperty(Au)){this.positionOffScreen();}}},_onBeforeShow:function(A7,A6){var A9,BC,A8,BA=this.cfg.getProperty(g);if(this.lazyLoad&&this.getItemGroups().length===0){if(this.srcElement){this._initSubTree();}if(this.itemData){if(this.parent&&this.parent.parent&&this.parent.parent.srcElement&&this.parent.parent.srcElement.tagName.toUpperCase()==AH){A9=this.itemData.length;for(BC=0;BC<A9;BC++){if(this.itemData[BC].tagName){this.addItem((new this.ITEM_TYPE(this.itemData[BC])));}}}else{this.addItems(this.itemData);}}A8=this.srcElement;if(A8){if(A8.tagName.toUpperCase()==AH){if(f.inDocument(A8)){this.render(A8.parentNode);}else{this.render(BA);}}else{this.render();}}else{if(this.parent){this.render(this.parent.element);}else{this.render(BA);}}}var BB=this.parent,A5;if(!BB&&this.cfg.getProperty(Ac)==AD){this.cfg.refireEvent(e);}if(BB){A5=BB.parent.cfg.getProperty(AO);this.cfg.setProperty(p,[BB.element,A5[0],A5[1]]);this.align();}},getConstrainedY:function(BH){var BS=this,BO=BS.cfg.getProperty(p),BV=BS.cfg.getProperty(AU),BR,BG={"trbr":true,"tlbl":true,"bltl":true,"brtr":true},BA=(BO&&BG[BO[1]+BO[2]]),BC=BS.element,BW=BC.offsetHeight,BQ=AB.VIEWPORT_OFFSET,BL=f.getViewportHeight(),BP=f.getDocumentScrollTop(),BM=(BS.cfg.getProperty(Aj)+BQ<BL),BU,BD,BJ,BK,BF=false,BE,A7,BI=BP+BQ,A9=BP+BL-BW-BQ,A5=BH;var BB=function(){var BX;if((BS.cfg.getProperty(R)-BP)>BJ){BX=(BJ-BW);}else{BX=(BJ+BK);}BS.cfg.setProperty(R,(BX+BP),true);return BX;};var A8=function(){if((BS.cfg.getProperty(R)-BP)>BJ){return(A7-BQ);}else{return(BE-BQ);}};var BN=function(){var BX;if((BS.cfg.getProperty(R)-BP)>BJ){BX=(BJ+BK);}else{BX=(BJ-BC.offsetHeight);}BS.cfg.setProperty(R,(BX+BP),true);};var A6=function(){BS._setScrollHeight(this.cfg.getProperty(AU));BS.hideEvent.unsubscribe(A6);};var BT=function(){var Ba=A8(),BX=(BS.getItems().length>0),BZ,BY;if(BW>Ba){BZ=BX?BS.cfg.getProperty(Aj):BW;if((Ba>BZ)&&BX){BR=Ba;}else{BR=BV;}BS._setScrollHeight(BR);BS.hideEvent.subscribe(A6);BN();if(Ba<BZ){if(BF){BB();}else{BB();BF=true;BY=BT();}}}else{if(BR&&(BR!==BV)){BS._setScrollHeight(BV);BS.hideEvent.subscribe(A6);BN();}}return BY;};if(BH<BI||BH>A9){if(BM){if(BS.cfg.getProperty(A4)&&BA){BD=BO[0];BK=BD.offsetHeight;BJ=(f.getY(BD)-BP);BE=BJ;A7=(BL-(BJ+BK));BT();A5=BS.cfg.getProperty(R);}else{if(!(BS instanceof YAHOO.widget.MenuBar)&&BW>=BL){BU=(BL-(BQ*2));if(BU>BS.cfg.getProperty(Aj)){BS._setScrollHeight(BU);BS.hideEvent.subscribe(A6);BN();A5=BS.cfg.getProperty(R);}}else{if(BH<BI){A5=BI;}else{if(BH>A9){A5=A9;}}}}}else{A5=BQ+BP;}}return A5;},_onHide:function(A6,A5){if(this.cfg.getProperty(Ac)===AD){this.positionOffScreen();}},_onShow:function(BD,BB){var A5=this.parent,A7,A8,BA,A6;function A9(BF){var BE;if(BF.type==Ak||(BF.type==Ae&&BF.keyCode==27)){BE=AA.getTarget(BF);if(BE!=A7.element||!f.isAncestor(A7.element,BE)){A7.cfg.setProperty(Z,false);AA.removeListener(document,Ak,A9);AA.removeListener(document,Ae,A9);}}}function BC(BF,BE,BG){this.cfg.setProperty(U,u);this.hideEvent.unsubscribe(BC,BG);}if(A5){A7=A5.parent;if(!A7.cfg.getProperty(Z)&&(A7 instanceof YAHOO.widget.MenuBar||A7.cfg.getProperty(Ac)==C)){A7.cfg.setProperty(Z,true);AA.on(document,Ak,A9);AA.on(document,Ae,A9);}if((this.cfg.getProperty("x")<A7.cfg.getProperty("x"))&&(As.gecko&&As.gecko<1.9)&&!this.cfg.getProperty(U)){A8=this.element;
BA=A8.offsetWidth;A8.style.width=BA+AQ;A6=(BA-(A8.offsetWidth-BA))+AQ;this.cfg.setProperty(U,A6);this.hideEvent.subscribe(BC,A6);}}if(this===this.getRoot()&&this.cfg.getProperty(Ac)===AD){this._focusedElement=Ad;this.focus();}},_onBeforeHide:function(A7,A6){var A5=this.activeItem,A9=this.getRoot(),BA,A8;if(A5){BA=A5.cfg;BA.setProperty(y,false);A8=BA.getProperty(O);if(A8){A8.hide();}}if(As.ie&&this.cfg.getProperty(Ac)===AD&&this.parent){A9._hasFocus=this.hasFocus();}if(A9==this){A9.blur();}},_onParentMenuConfigChange:function(A6,A5,A9){var A7=A5[0][0],A8=A5[0][1];switch(A7){case AF:case w:case AX:case Av:case c:case AC:case Ay:case A2:case j:case AU:case Aj:case AE:case Ag:case A4:case Ar:A9.cfg.setProperty(A7,A8);break;case AO:if(!(this.parent.parent instanceof YAHOO.widget.MenuBar)){A9.cfg.setProperty(A7,A8);}break;}},_onParentMenuRender:function(A6,A5,BB){var A8=BB.parent.parent,A7=A8.cfg,A9={constraintoviewport:A7.getProperty(w),xy:[0,0],clicktohide:A7.getProperty(AC),effect:A7.getProperty(Ay),showdelay:A7.getProperty(Av),hidedelay:A7.getProperty(AX),submenuhidedelay:A7.getProperty(c),classname:A7.getProperty(A2),scrollincrement:A7.getProperty(j),maxheight:A7.getProperty(AU),minscrollheight:A7.getProperty(Aj),iframe:A7.getProperty(AF),shadow:A7.getProperty(Ag),preventcontextoverlap:A7.getProperty(A4),monitorresize:A7.getProperty(AE),keepopen:A7.getProperty(Ar)},BA;if(!(A8 instanceof YAHOO.widget.MenuBar)){A9[AO]=A7.getProperty(AO);}BB.cfg.applyConfig(A9);if(!this.lazyLoad){BA=this.parent.element;if(this.element.parentNode==BA){this.render();}else{this.render(BA);}}},_onMenuItemDestroy:function(A7,A6,A5){this._removeItemFromGroupByValue(A5.groupIndex,A5);},_onMenuItemConfigChange:function(A7,A6,A5){var A9=A6[0][0],BA=A6[0][1],A8;switch(A9){case y:if(BA===true){this.activeItem=A5;}break;case O:A8=A6[0][1];if(A8){this._configureSubmenu(A5);}break;}},configVisible:function(A7,A6,A8){var A5,A9;if(this.cfg.getProperty(Ac)==AD){r.superclass.configVisible.call(this,A7,A6,A8);}else{A5=A6[0];A9=f.getStyle(this.element,AW);f.setStyle(this.element,J,Au);if(A5){if(A9!=AV){this.beforeShowEvent.fire();f.setStyle(this.element,AW,AV);this.showEvent.fire();}}else{if(A9==AV){this.beforeHideEvent.fire();f.setStyle(this.element,AW,AY);this.hideEvent.fire();}}}},configPosition:function(A7,A6,BA){var A9=this.element,A8=A6[0]==C?C:z,BB=this.cfg,A5;f.setStyle(A9,Ac,A8);if(A8==C){f.setStyle(A9,AW,AV);BB.setProperty(Au,true);}else{f.setStyle(A9,J,AL);}if(A8==z){A5=BB.getProperty(AS);if(!A5||A5===0){BB.setProperty(AS,1);}}},configIframe:function(A6,A5,A7){if(this.cfg.getProperty(Ac)==AD){r.superclass.configIframe.call(this,A6,A5,A7);}},configHideDelay:function(A6,A5,A7){var A8=A5[0];this._useHideDelay=(A8>0);},configContainer:function(A6,A5,A8){var A7=A5[0];if(AM.isString(A7)){this.cfg.setProperty(g,f.get(A7),true);}},_clearSetWidthFlag:function(){this._widthSetForScroll=false;this.cfg.unsubscribeFromConfigEvent(U,this._clearSetWidthFlag);},_setScrollHeight:function(BG){var BC=BG,BB=false,BH=false,A8,A9,BF,A6,BE,BI,A5,BD,BA,A7;if(this.getItems().length>0){A8=this.element;A9=this.body;BF=this.header;A6=this.footer;BE=this._onScrollTargetMouseOver;BI=this._onScrollTargetMouseOut;A5=this.cfg.getProperty(Aj);if(BC>0&&BC<A5){BC=A5;}f.setStyle(A9,Ao,u);f.removeClass(A9,l);A9.scrollTop=0;BH=((As.gecko&&As.gecko<1.9)||As.ie);if(BC>0&&BH&&!this.cfg.getProperty(U)){BA=A8.offsetWidth;A8.style.width=BA+AQ;A7=(BA-(A8.offsetWidth-BA))+AQ;this.cfg.unsubscribeFromConfigEvent(U,this._clearSetWidthFlag);this.cfg.setProperty(U,A7);this._widthSetForScroll=true;this.cfg.subscribeToConfigEvent(U,this._clearSetWidthFlag);}if(BC>0&&(!BF&&!A6)){this.setHeader(AK);this.setFooter(AK);BF=this.header;A6=this.footer;f.addClass(BF,T);f.addClass(A6,x);A8.insertBefore(BF,A9);A8.appendChild(A6);}BD=BC;if(BF&&A6){BD=(BD-(BF.offsetHeight+A6.offsetHeight));}if((BD>0)&&(A9.offsetHeight>BC)){f.addClass(A9,l);f.setStyle(A9,Ao,(BD+AQ));if(!this._hasScrollEventHandlers){AA.on(BF,Ai,BE,this,true);AA.on(BF,H,BI,this,true);AA.on(A6,Ai,BE,this,true);AA.on(A6,H,BI,this,true);this._hasScrollEventHandlers=true;}this._disableScrollHeader();this._enableScrollFooter();BB=true;}else{if(BF&&A6){if(this._widthSetForScroll){this._widthSetForScroll=false;this.cfg.unsubscribeFromConfigEvent(U,this._clearSetWidthFlag);this.cfg.setProperty(U,u);}this._enableScrollHeader();this._enableScrollFooter();if(this._hasScrollEventHandlers){AA.removeListener(BF,Ai,BE);AA.removeListener(BF,H,BI);AA.removeListener(A6,Ai,BE);AA.removeListener(A6,H,BI);this._hasScrollEventHandlers=false;}A8.removeChild(BF);A8.removeChild(A6);this.header=null;this.footer=null;BB=true;}}if(BB){this.cfg.refireEvent(AF);this.cfg.refireEvent(Ag);}}},_setMaxHeight:function(A6,A5,A7){this._setScrollHeight(A7);this.renderEvent.unsubscribe(this._setMaxHeight);},configMaxHeight:function(A6,A5,A7){var A8=A5[0];if(this.lazyLoad&&!this.body&&A8>0){this.renderEvent.subscribe(this._setMaxHeight,A8,this);}else{this._setScrollHeight(A8);}},configClassName:function(A7,A6,A8){var A5=A6[0];if(this._sClassName){f.removeClass(this.element,this._sClassName);}f.addClass(this.element,A5);this._sClassName=A5;},_onItemAdded:function(A6,A5){var A7=A5[0];if(A7){A7.cfg.setProperty(Ah,true);}},configDisabled:function(A7,A6,BA){var A9=A6[0],A5=this.getItems(),BB,A8;if(AM.isArray(A5)){BB=A5.length;if(BB>0){A8=BB-1;do{A5[A8].cfg.setProperty(Ah,A9);}while(A8--);}if(A9){this.clearActiveItem(true);f.addClass(this.element,Ah);this.itemAddedEvent.subscribe(this._onItemAdded);}else{f.removeClass(this.element,Ah);this.itemAddedEvent.unsubscribe(this._onItemAdded);}}},configShadow:function(BD,A7,BC){var BB=function(){var BG=this.element,BF=this._shadow;if(BF&&BG){if(BF.style.width&&BF.style.height){BF.style.width=u;BF.style.height=u;}BF.style.width=(BG.offsetWidth+6)+AQ;BF.style.height=(BG.offsetHeight+1)+AQ;}};var BE=function(){this.element.appendChild(this._shadow);};var A9=function(){f.addClass(this._shadow,AG);};var BA=function(){f.removeClass(this._shadow,AG);
};var A6=function(){var BG=this._shadow,BF;if(!BG){BF=this.element;if(!Ap){Ap=document.createElement(K);Ap.className=m;}BG=Ap.cloneNode(false);BF.appendChild(BG);this._shadow=BG;this.beforeShowEvent.subscribe(A9);this.beforeHideEvent.subscribe(BA);if(As.ie){AM.later(0,this,function(){BB.call(this);this.syncIframe();});this.cfg.subscribeToConfigEvent(U,BB);this.cfg.subscribeToConfigEvent(Ao,BB);this.cfg.subscribeToConfigEvent(AU,BB);this.changeContentEvent.subscribe(BB);Aw.textResizeEvent.subscribe(BB,this,true);this.destroyEvent.subscribe(function(){Aw.textResizeEvent.unsubscribe(BB,this);});}this.cfg.subscribeToConfigEvent(AU,BE);}};var A8=function(){if(this._shadow){BE.call(this);if(As.ie){BB.call(this);}}else{A6.call(this);}this.beforeShowEvent.unsubscribe(A8);};var A5=A7[0];if(A5&&this.cfg.getProperty(Ac)==AD){if(this.cfg.getProperty(Au)){if(this._shadow){BE.call(this);if(As.ie){BB.call(this);}}else{A6.call(this);}}else{this.beforeShowEvent.subscribe(A8);}}},initEvents:function(){r.superclass.initEvents.call(this);var A6=Ab.length-1,A7,A5;do{A7=Ab[A6];A5=this.createEvent(A7[1]);A5.signature=F.LIST;this[A7[0]]=A5;}while(A6--);},positionOffScreen:function(){var A6=this.iframe,A7=this.element,A5=this.OFF_SCREEN_POSITION;A7.style.top=u;A7.style.left=u;if(A6){A6.style.top=A5;A6.style.left=A5;}},getRoot:function(){var A7=this.parent,A6,A5;if(A7){A6=A7.parent;A5=A6?A6.getRoot():this;}else{A5=this;}return A5;},toString:function(){var A6=Aq,A5=this.id;if(A5){A6+=(A1+A5);}return A6;},setItemGroupTitle:function(BA,A9){var A8,A7,A6,A5;if(AM.isString(BA)&&BA.length>0){A8=AM.isNumber(A9)?A9:0;A7=this._aGroupTitleElements[A8];if(A7){A7.innerHTML=BA;}else{A7=document.createElement(this.GROUP_TITLE_TAG_NAME);A7.innerHTML=BA;this._aGroupTitleElements[A8]=A7;}A6=this._aGroupTitleElements.length-1;do{if(this._aGroupTitleElements[A6]){f.removeClass(this._aGroupTitleElements[A6],AJ);A5=A6;}}while(A6--);if(A5!==null){f.addClass(this._aGroupTitleElements[A5],AJ);}this.changeContentEvent.fire();}},addItem:function(A5,A6){return this._addItemToGroup(A6,A5);},addItems:function(A9,A8){var BB,A5,BA,A6,A7;if(AM.isArray(A9)){BB=A9.length;A5=[];for(A6=0;A6<BB;A6++){BA=A9[A6];if(BA){if(AM.isArray(BA)){A5[A5.length]=this.addItems(BA,A6);}else{A5[A5.length]=this._addItemToGroup(A8,BA);}}}if(A5.length){A7=A5;}}return A7;},insertItem:function(A5,A6,A7){return this._addItemToGroup(A7,A5,A6);},removeItem:function(A5,A7){var A8,A6;if(!AM.isUndefined(A5)){if(A5 instanceof YAHOO.widget.MenuItem){A8=this._removeItemFromGroupByValue(A7,A5);}else{if(AM.isNumber(A5)){A8=this._removeItemFromGroupByIndex(A7,A5);}}if(A8){A8.destroy();A6=A8;}}return A6;},getItems:function(){var A8=this._aItemGroups,A6,A7,A5=[];if(AM.isArray(A8)){A6=A8.length;A7=((A6==1)?A8[0]:(Array.prototype.concat.apply(A5,A8)));}return A7;},getItemGroups:function(){return this._aItemGroups;},getItem:function(A6,A7){var A8,A5;if(AM.isNumber(A6)){A8=this._getItemGroup(A7);if(A8){A5=A8[A6];}}return A5;},getSubmenus:function(){var A6=this.getItems(),BA=A6.length,A5,A7,A9,A8;if(BA>0){A5=[];for(A8=0;A8<BA;A8++){A9=A6[A8];if(A9){A7=A9.cfg.getProperty(O);if(A7){A5[A5.length]=A7;}}}}return A5;},clearContent:function(){var A9=this.getItems(),A6=A9.length,A7=this.element,A8=this.body,BD=this.header,A5=this.footer,BC,BB,BA;if(A6>0){BA=A6-1;do{BC=A9[BA];if(BC){BB=BC.cfg.getProperty(O);if(BB){this.cfg.configChangedEvent.unsubscribe(this._onParentMenuConfigChange,BB);this.renderEvent.unsubscribe(this._onParentMenuRender,BB);}this.removeItem(BC,BC.groupIndex);}}while(BA--);}if(BD){AA.purgeElement(BD);A7.removeChild(BD);}if(A5){AA.purgeElement(A5);A7.removeChild(A5);}if(A8){AA.purgeElement(A8);A8.innerHTML=u;}this.activeItem=null;this._aItemGroups=[];this._aListElements=[];this._aGroupTitleElements=[];this.cfg.setProperty(U,null);},destroy:function(){this.clearContent();this._aItemGroups=null;this._aListElements=null;this._aGroupTitleElements=null;r.superclass.destroy.call(this);},setInitialFocus:function(){var A5=this._getFirstEnabledItem();if(A5){A5.focus();}},setInitialSelection:function(){var A5=this._getFirstEnabledItem();if(A5){A5.cfg.setProperty(y,true);}},clearActiveItem:function(A7){if(this.cfg.getProperty(Av)>0){this._cancelShowDelay();}var A5=this.activeItem,A8,A6;if(A5){A8=A5.cfg;if(A7){A5.blur();this.getRoot()._hasFocus=true;}A8.setProperty(y,false);A6=A8.getProperty(O);if(A6){A6.hide();}this.activeItem=null;}},focus:function(){if(!this.hasFocus()){this.setInitialFocus();}},blur:function(){var A5;if(this.hasFocus()){A5=A3.getFocusedMenuItem();if(A5){A5.blur();}}},hasFocus:function(){return(A3.getFocusedMenu()==this.getRoot());},_doItemSubmenuSubscribe:function(A6,A5,A8){var A9=A5[0],A7=A9.cfg.getProperty(O);if(A7){A7.subscribe.apply(A7,A8);}},_doSubmenuSubscribe:function(A6,A5,A8){var A7=this.cfg.getProperty(O);if(A7){A7.subscribe.apply(A7,A8);}},subscribe:function(){r.superclass.subscribe.apply(this,arguments);r.superclass.subscribe.call(this,AR,this._doItemSubmenuSubscribe,arguments);var A5=this.getItems(),A9,A8,A6,A7;if(A5){A9=A5.length;if(A9>0){A7=A9-1;do{A8=A5[A7];A6=A8.cfg.getProperty(O);if(A6){A6.subscribe.apply(A6,arguments);}else{A8.cfg.subscribeToConfigEvent(O,this._doSubmenuSubscribe,arguments);}}while(A7--);}}},unsubscribe:function(){r.superclass.unsubscribe.apply(this,arguments);r.superclass.unsubscribe.call(this,AR,this._doItemSubmenuSubscribe,arguments);var A5=this.getItems(),A9,A8,A6,A7;if(A5){A9=A5.length;if(A9>0){A7=A9-1;do{A8=A5[A7];A6=A8.cfg.getProperty(O);if(A6){A6.unsubscribe.apply(A6,arguments);}else{A8.cfg.unsubscribeFromConfigEvent(O,this._doSubmenuSubscribe,arguments);}}while(A7--);}}},initDefaultConfig:function(){r.superclass.initDefaultConfig.call(this);var A5=this.cfg;A5.addProperty(AZ.key,{handler:this.configVisible,value:AZ.value,validator:AZ.validator});A5.addProperty(AP.key,{handler:this.configConstrainToViewport,value:AP.value,validator:AP.validator,supercedes:AP.supercedes});A5.addProperty(AI.key,{value:AI.value,validator:AI.validator,supercedes:AI.supercedes});
A5.addProperty(S.key,{handler:this.configPosition,value:S.value,validator:S.validator,supercedes:S.supercedes});A5.addProperty(A.key,{value:A.value,suppressEvent:A.suppressEvent});A5.addProperty(t.key,{value:t.value,validator:t.validator,suppressEvent:t.suppressEvent});A5.addProperty(Y.key,{value:Y.value,validator:Y.validator,suppressEvent:Y.suppressEvent});A5.addProperty(q.key,{handler:this.configHideDelay,value:q.value,validator:q.validator,suppressEvent:q.suppressEvent});A5.addProperty(v.key,{value:v.value,validator:v.validator,suppressEvent:v.suppressEvent});A5.addProperty(o.key,{value:o.value,validator:o.validator,suppressEvent:o.suppressEvent});A5.addProperty(AN.key,{handler:this.configContainer,value:document.body,suppressEvent:AN.suppressEvent});A5.addProperty(Af.key,{value:Af.value,validator:Af.validator,supercedes:Af.supercedes,suppressEvent:Af.suppressEvent});A5.addProperty(N.key,{value:N.value,validator:N.validator,supercedes:N.supercedes,suppressEvent:N.suppressEvent});A5.addProperty(X.key,{handler:this.configMaxHeight,value:X.value,validator:X.validator,suppressEvent:X.suppressEvent,supercedes:X.supercedes});A5.addProperty(W.key,{handler:this.configClassName,value:W.value,validator:W.validator,supercedes:W.supercedes});A5.addProperty(a.key,{handler:this.configDisabled,value:a.value,validator:a.validator,suppressEvent:a.suppressEvent});A5.addProperty(I.key,{handler:this.configShadow,value:I.value,validator:I.validator});A5.addProperty(Al.key,{value:Al.value,validator:Al.validator});}});})();(function(){YAHOO.widget.MenuItem=function(AS,AR){if(AS){if(AR){this.parent=AR.parent;this.value=AR.value;this.id=AR.id;}this.init(AS,AR);}};var x=YAHOO.util.Dom,j=YAHOO.widget.Module,AB=YAHOO.widget.Menu,c=YAHOO.widget.MenuItem,AK=YAHOO.util.CustomEvent,k=YAHOO.env.ua,AQ=YAHOO.lang,AL="text",O="#",Q="-",L="helptext",n="url",AH="target",A="emphasis",N="strongemphasis",b="checked",w="submenu",H="disabled",B="selected",P="hassubmenu",U="checked-disabled",AI="hassubmenu-disabled",AD="hassubmenu-selected",T="checked-selected",q="onclick",J="classname",AJ="",i="OPTION",v="OPTGROUP",K="LI",AE="href",r="SELECT",X="DIV",AN='<em class="helptext">',a="<em>",I="</em>",W="<strong>",y="</strong>",Y="preventcontextoverlap",h="obj",AG="scope",t="none",V="visible",E=" ",m="MenuItem",AA="click",D="show",M="hide",S="li",AF='<a href="#"></a>',p=[["mouseOverEvent","mouseover"],["mouseOutEvent","mouseout"],["mouseDownEvent","mousedown"],["mouseUpEvent","mouseup"],["clickEvent",AA],["keyPressEvent","keypress"],["keyDownEvent","keydown"],["keyUpEvent","keyup"],["focusEvent","focus"],["blurEvent","blur"],["destroyEvent","destroy"]],o={key:AL,value:AJ,validator:AQ.isString,suppressEvent:true},s={key:L,supercedes:[AL],suppressEvent:true},G={key:n,value:O,suppressEvent:true},AO={key:AH,suppressEvent:true},AP={key:A,value:false,validator:AQ.isBoolean,suppressEvent:true,supercedes:[AL]},d={key:N,value:false,validator:AQ.isBoolean,suppressEvent:true,supercedes:[AL]},l={key:b,value:false,validator:AQ.isBoolean,suppressEvent:true,supercedes:[H,B]},F={key:w,suppressEvent:true,supercedes:[H,B]},AM={key:H,value:false,validator:AQ.isBoolean,suppressEvent:true,supercedes:[AL,B]},f={key:B,value:false,validator:AQ.isBoolean,suppressEvent:true},u={key:q,suppressEvent:true},AC={key:J,value:null,validator:AQ.isString,suppressEvent:true},z={key:"keylistener",value:null,suppressEvent:true},C=null,e={};var Z=function(AU,AT){var AR=e[AU];if(!AR){e[AU]={};AR=e[AU];}var AS=AR[AT];if(!AS){AS=AU+Q+AT;AR[AT]=AS;}return AS;};var g=function(AR){x.addClass(this.element,Z(this.CSS_CLASS_NAME,AR));x.addClass(this._oAnchor,Z(this.CSS_LABEL_CLASS_NAME,AR));};var R=function(AR){x.removeClass(this.element,Z(this.CSS_CLASS_NAME,AR));x.removeClass(this._oAnchor,Z(this.CSS_LABEL_CLASS_NAME,AR));};c.prototype={CSS_CLASS_NAME:"yuimenuitem",CSS_LABEL_CLASS_NAME:"yuimenuitemlabel",SUBMENU_TYPE:null,_oAnchor:null,_oHelpTextEM:null,_oSubmenu:null,_oOnclickAttributeValue:null,_sClassName:null,constructor:c,index:null,groupIndex:null,parent:null,element:null,srcElement:null,value:null,browser:j.prototype.browser,id:null,init:function(AR,Ab){if(!this.SUBMENU_TYPE){this.SUBMENU_TYPE=AB;}this.cfg=new YAHOO.util.Config(this);this.initDefaultConfig();var AX=this.cfg,AY=O,AT,Aa,AZ,AS,AV,AU,AW;if(AQ.isString(AR)){this._createRootNodeStructure();AX.queueProperty(AL,AR);}else{if(AR&&AR.tagName){switch(AR.tagName.toUpperCase()){case i:this._createRootNodeStructure();AX.queueProperty(AL,AR.text);AX.queueProperty(H,AR.disabled);this.value=AR.value;this.srcElement=AR;break;case v:this._createRootNodeStructure();AX.queueProperty(AL,AR.label);AX.queueProperty(H,AR.disabled);this.srcElement=AR;this._initSubTree();break;case K:AZ=x.getFirstChild(AR);if(AZ){AY=AZ.getAttribute(AE,2);AS=AZ.getAttribute(AH);AV=AZ.innerHTML;}this.srcElement=AR;this.element=AR;this._oAnchor=AZ;AX.setProperty(AL,AV,true);AX.setProperty(n,AY,true);AX.setProperty(AH,AS,true);this._initSubTree();break;}}}if(this.element){AU=(this.srcElement||this.element).id;if(!AU){AU=this.id||x.generateId();this.element.id=AU;}this.id=AU;x.addClass(this.element,this.CSS_CLASS_NAME);x.addClass(this._oAnchor,this.CSS_LABEL_CLASS_NAME);AW=p.length-1;do{Aa=p[AW];AT=this.createEvent(Aa[1]);AT.signature=AK.LIST;this[Aa[0]]=AT;}while(AW--);if(Ab){AX.applyConfig(Ab);}AX.fireQueue();}},_createRootNodeStructure:function(){var AR,AS;if(!C){C=document.createElement(S);C.innerHTML=AF;}AR=C.cloneNode(true);AR.className=this.CSS_CLASS_NAME;AS=AR.firstChild;AS.className=this.CSS_LABEL_CLASS_NAME;this.element=AR;this._oAnchor=AS;},_initSubTree:function(){var AX=this.srcElement,AT=this.cfg,AV,AU,AS,AR,AW;if(AX.childNodes.length>0){if(this.parent.lazyLoad&&this.parent.srcElement&&this.parent.srcElement.tagName.toUpperCase()==r){AT.setProperty(w,{id:x.generateId(),itemdata:AX.childNodes});}else{AV=AX.firstChild;AU=[];do{if(AV&&AV.tagName){switch(AV.tagName.toUpperCase()){case X:AT.setProperty(w,AV);break;case i:AU[AU.length]=AV;break;}}}while((AV=AV.nextSibling));
AS=AU.length;if(AS>0){AR=new this.SUBMENU_TYPE(x.generateId());AT.setProperty(w,AR);for(AW=0;AW<AS;AW++){AR.addItem((new AR.ITEM_TYPE(AU[AW])));}}}}},configText:function(Aa,AT,AV){var AS=AT[0],AU=this.cfg,AY=this._oAnchor,AR=AU.getProperty(L),AZ=AJ,AW=AJ,AX=AJ;if(AS){if(AR){AZ=AN+AR+I;}if(AU.getProperty(A)){AW=a;AX=I;}if(AU.getProperty(N)){AW=W;AX=y;}AY.innerHTML=(AW+AS+AX+AZ);}},configHelpText:function(AT,AS,AR){this.cfg.refireEvent(AL);},configURL:function(AT,AS,AR){var AV=AS[0];if(!AV){AV=O;}var AU=this._oAnchor;if(k.opera){AU.removeAttribute(AE);}AU.setAttribute(AE,AV);},configTarget:function(AU,AT,AS){var AR=AT[0],AV=this._oAnchor;if(AR&&AR.length>0){AV.setAttribute(AH,AR);}else{AV.removeAttribute(AH);}},configEmphasis:function(AT,AS,AR){var AV=AS[0],AU=this.cfg;if(AV&&AU.getProperty(N)){AU.setProperty(N,false);}AU.refireEvent(AL);},configStrongEmphasis:function(AU,AT,AS){var AR=AT[0],AV=this.cfg;if(AR&&AV.getProperty(A)){AV.setProperty(A,false);}AV.refireEvent(AL);},configChecked:function(AT,AS,AR){var AV=AS[0],AU=this.cfg;if(AV){g.call(this,b);}else{R.call(this,b);}AU.refireEvent(AL);if(AU.getProperty(H)){AU.refireEvent(H);}if(AU.getProperty(B)){AU.refireEvent(B);}},configDisabled:function(AT,AS,AR){var AV=AS[0],AW=this.cfg,AU=AW.getProperty(w),AX=AW.getProperty(b);if(AV){if(AW.getProperty(B)){AW.setProperty(B,false);}g.call(this,H);if(AU){g.call(this,AI);}if(AX){g.call(this,U);}}else{R.call(this,H);if(AU){R.call(this,AI);}if(AX){R.call(this,U);}}},configSelected:function(AT,AS,AR){var AX=this.cfg,AW=this._oAnchor,AV=AS[0],AY=AX.getProperty(b),AU=AX.getProperty(w);if(k.opera){AW.blur();}if(AV&&!AX.getProperty(H)){g.call(this,B);if(AU){g.call(this,AD);}if(AY){g.call(this,T);}}else{R.call(this,B);if(AU){R.call(this,AD);}if(AY){R.call(this,T);}}if(this.hasFocus()&&k.opera){AW.focus();}},_onSubmenuBeforeHide:function(AU,AT){var AV=this.parent,AR;function AS(){AV._oAnchor.blur();AR.beforeHideEvent.unsubscribe(AS);}if(AV.hasFocus()){AR=AV.parent;AR.beforeHideEvent.subscribe(AS);}},configSubmenu:function(AY,AT,AW){var AV=AT[0],AU=this.cfg,AS=this.parent&&this.parent.lazyLoad,AX,AZ,AR;if(AV){if(AV instanceof AB){AX=AV;AX.parent=this;AX.lazyLoad=AS;}else{if(AQ.isObject(AV)&&AV.id&&!AV.nodeType){AZ=AV.id;AR=AV;AR.lazyload=AS;AR.parent=this;AX=new this.SUBMENU_TYPE(AZ,AR);AU.setProperty(w,AX,true);}else{AX=new this.SUBMENU_TYPE(AV,{lazyload:AS,parent:this});AU.setProperty(w,AX,true);}}if(AX){AX.cfg.setProperty(Y,true);g.call(this,P);if(AU.getProperty(n)===O){AU.setProperty(n,(O+AX.id));}this._oSubmenu=AX;if(k.opera){AX.beforeHideEvent.subscribe(this._onSubmenuBeforeHide);}}}else{R.call(this,P);if(this._oSubmenu){this._oSubmenu.destroy();}}if(AU.getProperty(H)){AU.refireEvent(H);}if(AU.getProperty(B)){AU.refireEvent(B);}},configOnClick:function(AT,AS,AR){var AU=AS[0];if(this._oOnclickAttributeValue&&(this._oOnclickAttributeValue!=AU)){this.clickEvent.unsubscribe(this._oOnclickAttributeValue.fn,this._oOnclickAttributeValue.obj);this._oOnclickAttributeValue=null;}if(!this._oOnclickAttributeValue&&AQ.isObject(AU)&&AQ.isFunction(AU.fn)){this.clickEvent.subscribe(AU.fn,((h in AU)?AU.obj:this),((AG in AU)?AU.scope:null));this._oOnclickAttributeValue=AU;}},configClassName:function(AU,AT,AS){var AR=AT[0];if(this._sClassName){x.removeClass(this.element,this._sClassName);}x.addClass(this.element,AR);this._sClassName=AR;},_dispatchClickEvent:function(){var AT=this,AS,AR;if(!AT.cfg.getProperty(H)){AS=x.getFirstChild(AT.element);if(k.ie){AS.fireEvent(q);}else{if((k.gecko&&k.gecko>=1.9)||k.opera||k.webkit){AR=document.createEvent("HTMLEvents");AR.initEvent(AA,true,true);}else{AR=document.createEvent("MouseEvents");AR.initMouseEvent(AA,true,true,window,0,0,0,0,0,false,false,false,false,0,null);}AS.dispatchEvent(AR);}}},_createKeyListener:function(AU,AT,AW){var AV=this,AS=AV.parent;var AR=new YAHOO.util.KeyListener(AS.element.ownerDocument,AW,{fn:AV._dispatchClickEvent,scope:AV,correctScope:true});if(AS.cfg.getProperty(V)){AR.enable();}AS.subscribe(D,AR.enable,null,AR);AS.subscribe(M,AR.disable,null,AR);AV._keyListener=AR;AS.unsubscribe(D,AV._createKeyListener,AW);},configKeyListener:function(AT,AS){var AV=AS[0],AU=this,AR=AU.parent;if(AU._keyData){AR.unsubscribe(D,AU._createKeyListener,AU._keyData);AU._keyData=null;}if(AU._keyListener){AR.unsubscribe(D,AU._keyListener.enable);AR.unsubscribe(M,AU._keyListener.disable);AU._keyListener.disable();AU._keyListener=null;}if(AV){AU._keyData=AV;AR.subscribe(D,AU._createKeyListener,AV,AU);}},initDefaultConfig:function(){var AR=this.cfg;AR.addProperty(o.key,{handler:this.configText,value:o.value,validator:o.validator,suppressEvent:o.suppressEvent});AR.addProperty(s.key,{handler:this.configHelpText,supercedes:s.supercedes,suppressEvent:s.suppressEvent});AR.addProperty(G.key,{handler:this.configURL,value:G.value,suppressEvent:G.suppressEvent});AR.addProperty(AO.key,{handler:this.configTarget,suppressEvent:AO.suppressEvent});AR.addProperty(AP.key,{handler:this.configEmphasis,value:AP.value,validator:AP.validator,suppressEvent:AP.suppressEvent,supercedes:AP.supercedes});AR.addProperty(d.key,{handler:this.configStrongEmphasis,value:d.value,validator:d.validator,suppressEvent:d.suppressEvent,supercedes:d.supercedes});AR.addProperty(l.key,{handler:this.configChecked,value:l.value,validator:l.validator,suppressEvent:l.suppressEvent,supercedes:l.supercedes});AR.addProperty(AM.key,{handler:this.configDisabled,value:AM.value,validator:AM.validator,suppressEvent:AM.suppressEvent});AR.addProperty(f.key,{handler:this.configSelected,value:f.value,validator:f.validator,suppressEvent:f.suppressEvent});AR.addProperty(F.key,{handler:this.configSubmenu,supercedes:F.supercedes,suppressEvent:F.suppressEvent});AR.addProperty(u.key,{handler:this.configOnClick,suppressEvent:u.suppressEvent});AR.addProperty(AC.key,{handler:this.configClassName,value:AC.value,validator:AC.validator,suppressEvent:AC.suppressEvent});AR.addProperty(z.key,{handler:this.configKeyListener,value:z.value,suppressEvent:z.suppressEvent});
},getNextSibling:function(){var AR=function(AX){return(AX.nodeName.toLowerCase()==="ul");},AV=this.element,AU=x.getNextSibling(AV),AT,AS,AW;if(!AU){AT=AV.parentNode;AS=x.getNextSiblingBy(AT,AR);if(AS){AW=AS;}else{AW=x.getFirstChildBy(AT.parentNode,AR);}AU=x.getFirstChild(AW);}return YAHOO.widget.MenuManager.getMenuItem(AU.id);},getNextEnabledSibling:function(){var AR=this.getNextSibling();return(AR.cfg.getProperty(H)||AR.element.style.display==t)?AR.getNextEnabledSibling():AR;},getPreviousSibling:function(){var AR=function(AX){return(AX.nodeName.toLowerCase()==="ul");},AV=this.element,AU=x.getPreviousSibling(AV),AT,AS,AW;if(!AU){AT=AV.parentNode;AS=x.getPreviousSiblingBy(AT,AR);if(AS){AW=AS;}else{AW=x.getLastChildBy(AT.parentNode,AR);}AU=x.getLastChild(AW);}return YAHOO.widget.MenuManager.getMenuItem(AU.id);},getPreviousEnabledSibling:function(){var AR=this.getPreviousSibling();return(AR.cfg.getProperty(H)||AR.element.style.display==t)?AR.getPreviousEnabledSibling():AR;},focus:function(){var AU=this.parent,AT=this._oAnchor,AR=AU.activeItem;function AS(){try{if(!(k.ie&&!document.hasFocus())){if(AR){AR.blurEvent.fire();}AT.focus();this.focusEvent.fire();}}catch(AV){}}if(!this.cfg.getProperty(H)&&AU&&AU.cfg.getProperty(V)&&this.element.style.display!=t){AQ.later(0,this,AS);}},blur:function(){var AR=this.parent;if(!this.cfg.getProperty(H)&&AR&&AR.cfg.getProperty(V)){AQ.later(0,this,function(){try{this._oAnchor.blur();this.blurEvent.fire();}catch(AS){}},0);}},hasFocus:function(){return(YAHOO.widget.MenuManager.getFocusedMenuItem()==this);},destroy:function(){var AT=this.element,AS,AR,AV,AU;if(AT){AS=this.cfg.getProperty(w);if(AS){AS.destroy();}AR=AT.parentNode;if(AR){AR.removeChild(AT);this.destroyEvent.fire();}AU=p.length-1;do{AV=p[AU];this[AV[0]].unsubscribeAll();}while(AU--);this.cfg.configChangedEvent.unsubscribeAll();}},toString:function(){var AS=m,AR=this.id;if(AR){AS+=(E+AR);}return AS;}};AQ.augmentProto(c,YAHOO.util.EventProvider);})();(function(){var B="xy",C="mousedown",F="ContextMenu",J=" ";YAHOO.widget.ContextMenu=function(L,K){YAHOO.widget.ContextMenu.superclass.constructor.call(this,L,K);};var I=YAHOO.util.Event,E=YAHOO.env.ua,G=YAHOO.widget.ContextMenu,A={"TRIGGER_CONTEXT_MENU":"triggerContextMenu","CONTEXT_MENU":(E.opera?C:"contextmenu"),"CLICK":"click"},H={key:"trigger",suppressEvent:true};function D(L,K,M){this.cfg.setProperty(B,M);this.beforeShowEvent.unsubscribe(D,M);}YAHOO.lang.extend(G,YAHOO.widget.Menu,{_oTrigger:null,_bCancelled:false,contextEventTarget:null,triggerContextMenuEvent:null,init:function(L,K){G.superclass.init.call(this,L);this.beforeInitEvent.fire(G);if(K){this.cfg.applyConfig(K,true);}this.initEvent.fire(G);},initEvents:function(){G.superclass.initEvents.call(this);this.triggerContextMenuEvent=this.createEvent(A.TRIGGER_CONTEXT_MENU);this.triggerContextMenuEvent.signature=YAHOO.util.CustomEvent.LIST;},cancel:function(){this._bCancelled=true;},_removeEventHandlers:function(){var K=this._oTrigger;if(K){I.removeListener(K,A.CONTEXT_MENU,this._onTriggerContextMenu);if(E.opera){I.removeListener(K,A.CLICK,this._onTriggerClick);}}},_onTriggerClick:function(L,K){if(L.ctrlKey){I.stopEvent(L);}},_onTriggerContextMenu:function(M,K){var L;if(!(M.type==C&&!M.ctrlKey)){this.contextEventTarget=I.getTarget(M);this.triggerContextMenuEvent.fire(M);if(!this._bCancelled){I.stopEvent(M);YAHOO.widget.MenuManager.hideVisible();L=I.getXY(M);if(!YAHOO.util.Dom.inDocument(this.element)){this.beforeShowEvent.subscribe(D,L);}else{this.cfg.setProperty(B,L);}this.show();}this._bCancelled=false;}},toString:function(){var L=F,K=this.id;if(K){L+=(J+K);}return L;},initDefaultConfig:function(){G.superclass.initDefaultConfig.call(this);this.cfg.addProperty(H.key,{handler:this.configTrigger,suppressEvent:H.suppressEvent});},destroy:function(){this._removeEventHandlers();G.superclass.destroy.call(this);},configTrigger:function(L,K,N){var M=K[0];if(M){if(this._oTrigger){this._removeEventHandlers();}this._oTrigger=M;I.on(M,A.CONTEXT_MENU,this._onTriggerContextMenu,this,true);if(E.opera){I.on(M,A.CLICK,this._onTriggerClick,this,true);}}else{this._removeEventHandlers();}}});}());YAHOO.widget.ContextMenuItem=YAHOO.widget.MenuItem;(function(){var D=YAHOO.lang,N="static",M="dynamic,"+N,A="disabled",F="selected",B="autosubmenudisplay",G="submenu",C="visible",Q=" ",H="submenutoggleregion",P="MenuBar";YAHOO.widget.MenuBar=function(T,S){YAHOO.widget.MenuBar.superclass.constructor.call(this,T,S);};function O(T){var S=false;if(D.isString(T)){S=(M.indexOf((T.toLowerCase()))!=-1);}return S;}var R=YAHOO.util.Event,L=YAHOO.widget.MenuBar,K={key:"position",value:N,validator:O,supercedes:[C]},E={key:"submenualignment",value:["tl","bl"]},J={key:B,value:false,validator:D.isBoolean,suppressEvent:true},I={key:H,value:false,validator:D.isBoolean};D.extend(L,YAHOO.widget.Menu,{init:function(T,S){if(!this.ITEM_TYPE){this.ITEM_TYPE=YAHOO.widget.MenuBarItem;}L.superclass.init.call(this,T);this.beforeInitEvent.fire(L);if(S){this.cfg.applyConfig(S,true);}this.initEvent.fire(L);},CSS_CLASS_NAME:"yuimenubar",SUBMENU_TOGGLE_REGION_WIDTH:20,_onKeyDown:function(U,T,Y){var S=T[0],Z=T[1],W,X,V;if(Z&&!Z.cfg.getProperty(A)){X=Z.cfg;switch(S.keyCode){case 37:case 39:if(Z==this.activeItem&&!X.getProperty(F)){X.setProperty(F,true);}else{V=(S.keyCode==37)?Z.getPreviousEnabledSibling():Z.getNextEnabledSibling();if(V){this.clearActiveItem();V.cfg.setProperty(F,true);W=V.cfg.getProperty(G);if(W){W.show();W.setInitialFocus();}else{V.focus();}}}R.preventDefault(S);break;case 40:if(this.activeItem!=Z){this.clearActiveItem();X.setProperty(F,true);Z.focus();}W=X.getProperty(G);if(W){if(W.cfg.getProperty(C)){W.setInitialSelection();W.setInitialFocus();}else{W.show();W.setInitialFocus();}}R.preventDefault(S);break;}}if(S.keyCode==27&&this.activeItem){W=this.activeItem.cfg.getProperty(G);if(W&&W.cfg.getProperty(C)){W.hide();this.activeItem.focus();}else{this.activeItem.cfg.setProperty(F,false);this.activeItem.blur();}R.preventDefault(S);}},_onClick:function(e,Y,b){L.superclass._onClick.call(this,e,Y,b);
var d=Y[1],T=true,S,f,U,W,Z,a,c,V;var X=function(){if(a.cfg.getProperty(C)){a.hide();}else{a.show();}};if(d&&!d.cfg.getProperty(A)){f=Y[0];U=R.getTarget(f);W=this.activeItem;Z=this.cfg;if(W&&W!=d){this.clearActiveItem();}d.cfg.setProperty(F,true);a=d.cfg.getProperty(G);if(a){S=d.element;c=YAHOO.util.Dom.getX(S);V=c+(S.offsetWidth-this.SUBMENU_TOGGLE_REGION_WIDTH);if(Z.getProperty(H)){if(R.getPageX(f)>V){X();R.preventDefault(f);T=false;}}else{X();}}}return T;},configSubmenuToggle:function(U,T){var S=T[0];if(S){this.cfg.setProperty(B,false);}},toString:function(){var T=P,S=this.id;if(S){T+=(Q+S);}return T;},initDefaultConfig:function(){L.superclass.initDefaultConfig.call(this);var S=this.cfg;S.addProperty(K.key,{handler:this.configPosition,value:K.value,validator:K.validator,supercedes:K.supercedes});S.addProperty(E.key,{value:E.value,suppressEvent:E.suppressEvent});S.addProperty(J.key,{value:J.value,validator:J.validator,suppressEvent:J.suppressEvent});S.addProperty(I.key,{value:I.value,validator:I.validator,handler:this.configSubmenuToggle});}});}());YAHOO.widget.MenuBarItem=function(B,A){YAHOO.widget.MenuBarItem.superclass.constructor.call(this,B,A);};YAHOO.lang.extend(YAHOO.widget.MenuBarItem,YAHOO.widget.MenuItem,{init:function(B,A){if(!this.SUBMENU_TYPE){this.SUBMENU_TYPE=YAHOO.widget.Menu;}YAHOO.widget.MenuBarItem.superclass.init.call(this,B);var C=this.cfg;if(A){C.applyConfig(A,true);}C.fireQueue();},CSS_CLASS_NAME:"yuimenubaritem",CSS_LABEL_CLASS_NAME:"yuimenubaritemlabel",toString:function(){var A="MenuBarItem";if(this.cfg&&this.cfg.getProperty("text")){A+=(": "+this.cfg.getProperty("text"));}return A;}});YAHOO.register("menu",YAHOO.widget.Menu,{version:"2.8.0r4",build:"2449"});// End of File include/javascript/yui/build/menu/menu-min.js
                                
/*********************************************************************************
 * SugarCRM is a customer relationship management program developed by
 * SugarCRM, Inc. Copyright (C) 2004-2011 SugarCRM Inc.
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY SUGARCRM, SUGARCRM DISCLAIMS THE WARRANTY
 * OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along with
 * this program; if not, see http://www.gnu.org/licenses or write to the Free
 * Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 * 02110-1301 USA.
 *
 * You can contact SugarCRM, Inc. headquarters at 10050 North Wolfe Road,
 * SW2-130, Cupertino, CA 95014, USA. or at email address contact@sugarcrm.com.
 *
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU Affero General Public License version 3.
 *
 * In accordance with Section 7(b) of the GNU Affero General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "Powered by
 * SugarCRM" logo. If the display of the logo is not reasonably feasible for
 * technical reasons, the Appropriate Legal Notices must display the words
 * "Powered by SugarCRM".
 ********************************************************************************/
SUGAR_callsInProgress=0;YAHOO.util.Connect.completeEvent.subscribe(function(event,data){SUGAR_callsInProgress--;if(SUGAR.util.isLoginPage(data[0].conn.responseText))
return false;});YAHOO.util.Connect.startEvent.subscribe(function(event,data)
{SUGAR_callsInProgress++;});// End of File include/javascript/sugar_connection_event_listener.js
                                
/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
(function () {

    /**
    * Config is a utility used within an Object to allow the implementer to
    * maintain a list of local configuration properties and listen for changes 
    * to those properties dynamically using CustomEvent. The initial values are 
    * also maintained so that the configuration can be reset at any given point 
    * to its initial state.
    * @namespace YAHOO.util
    * @class Config
    * @constructor
    * @param {Object} owner The owner Object to which this Config Object belongs
    */
    YAHOO.util.Config = function (owner) {

        if (owner) {
            this.init(owner);
        }


    };


    var Lang = YAHOO.lang,
        CustomEvent = YAHOO.util.CustomEvent,
        Config = YAHOO.util.Config;


    /**
     * Constant representing the CustomEvent type for the config changed event.
     * @property YAHOO.util.Config.CONFIG_CHANGED_EVENT
     * @private
     * @static
     * @final
     */
    Config.CONFIG_CHANGED_EVENT = "configChanged";
    
    /**
     * Constant representing the boolean type string
     * @property YAHOO.util.Config.BOOLEAN_TYPE
     * @private
     * @static
     * @final
     */
    Config.BOOLEAN_TYPE = "boolean";
    
    Config.prototype = {
     
        /**
        * Object reference to the owner of this Config Object
        * @property owner
        * @type Object
        */
        owner: null,
        
        /**
        * Boolean flag that specifies whether a queue is currently 
        * being executed
        * @property queueInProgress
        * @type Boolean
        */
        queueInProgress: false,
        
        /**
        * Maintains the local collection of configuration property objects and 
        * their specified values
        * @property config
        * @private
        * @type Object
        */ 
        config: null,
        
        /**
        * Maintains the local collection of configuration property objects as 
        * they were initially applied.
        * This object is used when resetting a property.
        * @property initialConfig
        * @private
        * @type Object
        */ 
        initialConfig: null,
        
        /**
        * Maintains the local, normalized CustomEvent queue
        * @property eventQueue
        * @private
        * @type Object
        */ 
        eventQueue: null,
        
        /**
        * Custom Event, notifying subscribers when Config properties are set 
        * (setProperty is called without the silent flag
        * @event configChangedEvent
        */
        configChangedEvent: null,
    
        /**
        * Initializes the configuration Object and all of its local members.
        * @method init
        * @param {Object} owner The owner Object to which this Config 
        * Object belongs
        */
        init: function (owner) {
    
            this.owner = owner;
    
            this.configChangedEvent = 
                this.createEvent(Config.CONFIG_CHANGED_EVENT);
    
            this.configChangedEvent.signature = CustomEvent.LIST;
            this.queueInProgress = false;
            this.config = {};
            this.initialConfig = {};
            this.eventQueue = [];
        
        },
        
        /**
        * Validates that the value passed in is a Boolean.
        * @method checkBoolean
        * @param {Object} val The value to validate
        * @return {Boolean} true, if the value is valid
        */ 
        checkBoolean: function (val) {
            return (typeof val == Config.BOOLEAN_TYPE);
        },
        
        /**
        * Validates that the value passed in is a number.
        * @method checkNumber
        * @param {Object} val The value to validate
        * @return {Boolean} true, if the value is valid
        */
        checkNumber: function (val) {
            return (!isNaN(val));
        },
        
        /**
        * Fires a configuration property event using the specified value. 
        * @method fireEvent
        * @private
        * @param {String} key The configuration property's name
        * @param {value} Object The value of the correct type for the property
        */ 
        fireEvent: function ( key, value ) {
            var property = this.config[key];
        
            if (property && property.event) {
                property.event.fire(value);
            } 
        },
        
        /**
        * Adds a property to the Config Object's private config hash.
        * @method addProperty
        * @param {String} key The configuration property's name
        * @param {Object} propertyObject The Object containing all of this 
        * property's arguments
        */
        addProperty: function ( key, propertyObject ) {
            key = key.toLowerCase();
        
            this.config[key] = propertyObject;
        
            propertyObject.event = this.createEvent(key, { scope: this.owner });
            propertyObject.event.signature = CustomEvent.LIST;
            
            
            propertyObject.key = key;
        
            if (propertyObject.handler) {
                propertyObject.event.subscribe(propertyObject.handler, 
                    this.owner);
            }
        
            this.setProperty(key, propertyObject.value, true);
            
            if (! propertyObject.suppressEvent) {
                this.queueProperty(key, propertyObject.value);
            }
            
        },
        
        /**
        * Returns a key-value configuration map of the values currently set in  
        * the Config Object.
        * @method getConfig
        * @return {Object} The current config, represented in a key-value map
        */
        getConfig: function () {
        
            var cfg = {},
                currCfg = this.config,
                prop,
                property;
                
            for (prop in currCfg) {
                if (Lang.hasOwnProperty(currCfg, prop)) {
                    property = currCfg[prop];
                    if (property && property.event) {
                        cfg[prop] = property.value;
                    }
                }
            }

            return cfg;
        },
        
        /**
        * Returns the value of specified property.
        * @method getProperty
        * @param {String} key The name of the property
        * @return {Object}  The value of the specified property
        */
        getProperty: function (key) {
            var property = this.config[key.toLowerCase()];
            if (property && property.event) {
                return property.value;
            } else {
                return undefined;
            }
        },
        
        /**
        * Resets the specified property's value to its initial value.
        * @method resetProperty
        * @param {String} key The name of the property
        * @return {Boolean} True is the property was reset, false if not
        */
        resetProperty: function (key) {
    
            key = key.toLowerCase();
        
            var property = this.config[key];
    
            if (property && property.event) {
    
                if (this.initialConfig[key] && 
                    !Lang.isUndefined(this.initialConfig[key])) {
    
                    this.setProperty(key, this.initialConfig[key]);

                    return true;
    
                }
    
            } else {
    
                return false;
            }
    
        },
        
        /**
        * Sets the value of a property. If the silent property is passed as 
        * true, the property's event will not be fired.
        * @method setProperty
        * @param {String} key The name of the property
        * @param {String} value The value to set the property to
        * @param {Boolean} silent Whether the value should be set silently, 
        * without firing the property event.
        * @return {Boolean} True, if the set was successful, false if it failed.
        */
        setProperty: function (key, value, silent) {
        
            var property;
        
            key = key.toLowerCase();
        
            if (this.queueInProgress && ! silent) {
                // Currently running through a queue... 
                this.queueProperty(key,value);
                return true;
    
            } else {
                property = this.config[key];
                if (property && property.event) {
                    if (property.validator && !property.validator(value)) {
                        return false;
                    } else {
                        property.value = value;
                        if (! silent) {
                            this.fireEvent(key, value);
                            this.configChangedEvent.fire([key, value]);
                        }
                        return true;
                    }
                } else {
                    return false;
                }
            }
        },
        
        /**
        * Sets the value of a property and queues its event to execute. If the 
        * event is already scheduled to execute, it is
        * moved from its current position to the end of the queue.
        * @method queueProperty
        * @param {String} key The name of the property
        * @param {String} value The value to set the property to
        * @return {Boolean}  true, if the set was successful, false if 
        * it failed.
        */ 
        queueProperty: function (key, value) {
        
            key = key.toLowerCase();
        
            var property = this.config[key],
                foundDuplicate = false,
                iLen,
                queueItem,
                queueItemKey,
                queueItemValue,
                sLen,
                supercedesCheck,
                qLen,
                queueItemCheck,
                queueItemCheckKey,
                queueItemCheckValue,
                i,
                s,
                q;
                                
            if (property && property.event) {
    
                if (!Lang.isUndefined(value) && property.validator && 
                    !property.validator(value)) { // validator
                    return false;
                } else {
        
                    if (!Lang.isUndefined(value)) {
                        property.value = value;
                    } else {
                        value = property.value;
                    }
        
                    foundDuplicate = false;
                    iLen = this.eventQueue.length;
        
                    for (i = 0; i < iLen; i++) {
                        queueItem = this.eventQueue[i];
        
                        if (queueItem) {
                            queueItemKey = queueItem[0];
                            queueItemValue = queueItem[1];

                            if (queueItemKey == key) {
    
                                /*
                                    found a dupe... push to end of queue, null 
                                    current item, and break
                                */
    
                                this.eventQueue[i] = null;
    
                                this.eventQueue.push(
                                    [key, (!Lang.isUndefined(value) ? 
                                    value : queueItemValue)]);
    
                                foundDuplicate = true;
                                break;
                            }
                        }
                    }
                    
                    // this is a refire, or a new property in the queue
    
                    if (! foundDuplicate && !Lang.isUndefined(value)) { 
                        this.eventQueue.push([key, value]);
                    }
                }
        
                if (property.supercedes) {

                    sLen = property.supercedes.length;

                    for (s = 0; s < sLen; s++) {

                        supercedesCheck = property.supercedes[s];
                        qLen = this.eventQueue.length;

                        for (q = 0; q < qLen; q++) {
                            queueItemCheck = this.eventQueue[q];

                            if (queueItemCheck) {
                                queueItemCheckKey = queueItemCheck[0];
                                queueItemCheckValue = queueItemCheck[1];

                                if (queueItemCheckKey == 
                                    supercedesCheck.toLowerCase() ) {

                                    this.eventQueue.push([queueItemCheckKey, 
                                        queueItemCheckValue]);

                                    this.eventQueue[q] = null;
                                    break;

                                }
                            }
                        }
                    }
                }


                return true;
            } else {
                return false;
            }
        },
        
        /**
        * Fires the event for a property using the property's current value.
        * @method refireEvent
        * @param {String} key The name of the property
        */
        refireEvent: function (key) {
    
            key = key.toLowerCase();
        
            var property = this.config[key];
    
            if (property && property.event && 
    
                !Lang.isUndefined(property.value)) {
    
                if (this.queueInProgress) {
    
                    this.queueProperty(key);
    
                } else {
    
                    this.fireEvent(key, property.value);
    
                }
    
            }
        },
        
        /**
        * Applies a key-value Object literal to the configuration, replacing  
        * any existing values, and queueing the property events.
        * Although the values will be set, fireQueue() must be called for their 
        * associated events to execute.
        * @method applyConfig
        * @param {Object} userConfig The configuration Object literal
        * @param {Boolean} init  When set to true, the initialConfig will 
        * be set to the userConfig passed in, so that calling a reset will 
        * reset the properties to the passed values.
        */
        applyConfig: function (userConfig, init) {
        
            var sKey,
                oConfig;

            if (init) {
                oConfig = {};
                for (sKey in userConfig) {
                    if (Lang.hasOwnProperty(userConfig, sKey)) {
                        oConfig[sKey.toLowerCase()] = userConfig[sKey];
                    }
                }
                this.initialConfig = oConfig;
            }

            for (sKey in userConfig) {
                if (Lang.hasOwnProperty(userConfig, sKey)) {
                    this.queueProperty(sKey, userConfig[sKey]);
                }
            }
        },
        
        /**
        * Refires the events for all configuration properties using their 
        * current values.
        * @method refresh
        */
        refresh: function () {

            var prop;

            for (prop in this.config) {
                if (Lang.hasOwnProperty(this.config, prop)) {
                    this.refireEvent(prop);
                }
            }
        },
        
        /**
        * Fires the normalized list of queued property change events
        * @method fireQueue
        */
        fireQueue: function () {
        
            var i, 
                queueItem,
                key,
                value,
                property;
        
            this.queueInProgress = true;
            for (i = 0;i < this.eventQueue.length; i++) {
                queueItem = this.eventQueue[i];
                if (queueItem) {
        
                    key = queueItem[0];
                    value = queueItem[1];
                    property = this.config[key];

                    property.value = value;

                    // Clear out queue entry, to avoid it being 
                    // re-added to the queue by any queueProperty/supercedes
                    // calls which are invoked during fireEvent
                    this.eventQueue[i] = null;

                    this.fireEvent(key,value);
                }
            }
            
            this.queueInProgress = false;
            this.eventQueue = [];
        },
        
        /**
        * Subscribes an external handler to the change event for any 
        * given property. 
        * @method subscribeToConfigEvent
        * @param {String} key The property name
        * @param {Function} handler The handler function to use subscribe to 
        * the property's event
        * @param {Object} obj The Object to use for scoping the event handler 
        * (see CustomEvent documentation)
        * @param {Boolean} overrideContext Optional. If true, will override
        * "this" within the handler to map to the scope Object passed into the
        * method.
        * @return {Boolean} True, if the subscription was successful, 
        * otherwise false.
        */ 
        subscribeToConfigEvent: function (key, handler, obj, overrideContext) {
    
            var property = this.config[key.toLowerCase()];
    
            if (property && property.event) {
                if (!Config.alreadySubscribed(property.event, handler, obj)) {
                    property.event.subscribe(handler, obj, overrideContext);
                }
                return true;
            } else {
                return false;
            }
    
        },
        
        /**
        * Unsubscribes an external handler from the change event for any 
        * given property. 
        * @method unsubscribeFromConfigEvent
        * @param {String} key The property name
        * @param {Function} handler The handler function to use subscribe to 
        * the property's event
        * @param {Object} obj The Object to use for scoping the event 
        * handler (see CustomEvent documentation)
        * @return {Boolean} True, if the unsubscription was successful, 
        * otherwise false.
        */
        unsubscribeFromConfigEvent: function (key, handler, obj) {
            var property = this.config[key.toLowerCase()];
            if (property && property.event) {
                return property.event.unsubscribe(handler, obj);
            } else {
                return false;
            }
        },
        
        /**
        * Returns a string representation of the Config object
        * @method toString
        * @return {String} The Config object in string format.
        */
        toString: function () {
            var output = "Config";
            if (this.owner) {
                output += " [" + this.owner.toString() + "]";
            }
            return output;
        },
        
        /**
        * Returns a string representation of the Config object's current 
        * CustomEvent queue
        * @method outputEventQueue
        * @return {String} The string list of CustomEvents currently queued 
        * for execution
        */
        outputEventQueue: function () {

            var output = "",
                queueItem,
                q,
                nQueue = this.eventQueue.length;
              
            for (q = 0; q < nQueue; q++) {
                queueItem = this.eventQueue[q];
                if (queueItem) {
                    output += queueItem[0] + "=" + queueItem[1] + ", ";
                }
            }
            return output;
        },

        /**
        * Sets all properties to null, unsubscribes all listeners from each 
        * property's change event and all listeners from the configChangedEvent.
        * @method destroy
        */
        destroy: function () {

            var oConfig = this.config,
                sProperty,
                oProperty;


            for (sProperty in oConfig) {
            
                if (Lang.hasOwnProperty(oConfig, sProperty)) {

                    oProperty = oConfig[sProperty];

                    oProperty.event.unsubscribeAll();
                    oProperty.event = null;

                }
            
            }
            
            this.configChangedEvent.unsubscribeAll();
            
            this.configChangedEvent = null;
            this.owner = null;
            this.config = null;
            this.initialConfig = null;
            this.eventQueue = null;
        
        }

    };
    
    
    
    /**
    * Checks to determine if a particular function/Object pair are already 
    * subscribed to the specified CustomEvent
    * @method YAHOO.util.Config.alreadySubscribed
    * @static
    * @param {YAHOO.util.CustomEvent} evt The CustomEvent for which to check 
    * the subscriptions
    * @param {Function} fn The function to look for in the subscribers list
    * @param {Object} obj The execution scope Object for the subscription
    * @return {Boolean} true, if the function/Object pair is already subscribed 
    * to the CustomEvent passed in
    */
    Config.alreadySubscribed = function (evt, fn, obj) {
    
        var nSubscribers = evt.subscribers.length,
            subsc,
            i;

        if (nSubscribers > 0) {
            i = nSubscribers - 1;
            do {
                subsc = evt.subscribers[i];
                if (subsc && subsc.obj == obj && subsc.fn == fn) {
                    return true;
                }
            }
            while (i--);
        }

        return false;

    };

    YAHOO.lang.augmentProto(Config, YAHOO.util.EventProvider);

}());
/**
* The datemath module provides utility methods for basic JavaScript Date object manipulation and 
* comparison. 
* 
* @module datemath
*/

/**
* YAHOO.widget.DateMath is used for simple date manipulation. The class is a static utility
* used for adding, subtracting, and comparing dates.
* @namespace YAHOO.widget
* @class DateMath
*/
YAHOO.widget.DateMath = {
    /**
    * Constant field representing Day
    * @property DAY
    * @static
    * @final
    * @type String
    */
    DAY : "D",

    /**
    * Constant field representing Week
    * @property WEEK
    * @static
    * @final
    * @type String
    */
    WEEK : "W",

    /**
    * Constant field representing Year
    * @property YEAR
    * @static
    * @final
    * @type String
    */
    YEAR : "Y",

    /**
    * Constant field representing Month
    * @property MONTH
    * @static
    * @final
    * @type String
    */
    MONTH : "M",

    /**
    * Constant field representing one day, in milliseconds
    * @property ONE_DAY_MS
    * @static
    * @final
    * @type Number
    */
    ONE_DAY_MS : 1000*60*60*24,
    
    /**
     * Constant field representing the date in first week of January
     * which identifies the first week of the year.
     * <p>
     * In the U.S, Jan 1st is normally used based on a Sunday start of week.
     * ISO 8601, used widely throughout Europe, uses Jan 4th, based on a Monday start of week.
     * </p>
     * @property WEEK_ONE_JAN_DATE
     * @static
     * @type Number
     */
    WEEK_ONE_JAN_DATE : 1,

    /**
    * Adds the specified amount of time to the this instance.
    * @method add
    * @param {Date} date The JavaScript Date object to perform addition on
    * @param {String} field The field constant to be used for performing addition.
    * @param {Number} amount The number of units (measured in the field constant) to add to the date.
    * @return {Date} The resulting Date object
    */
    add : function(date, field, amount) {
        var d = new Date(date.getTime());
        switch (field) {
            case this.MONTH:
                var newMonth = date.getMonth() + amount;
                var years = 0;

                if (newMonth < 0) {
                    while (newMonth < 0) {
                        newMonth += 12;
                        years -= 1;
                    }
                } else if (newMonth > 11) {
                    while (newMonth > 11) {
                        newMonth -= 12;
                        years += 1;
                    }
                }

                d.setMonth(newMonth);
                d.setFullYear(date.getFullYear() + years);
                break;
            case this.DAY:
                this._addDays(d, amount);
                // d.setDate(date.getDate() + amount);
                break;
            case this.YEAR:
                d.setFullYear(date.getFullYear() + amount);
                break;
            case this.WEEK:
                this._addDays(d, (amount * 7));
                // d.setDate(date.getDate() + (amount * 7));
                break;
        }
        return d;
    },

    /**
     * Private helper method to account for bug in Safari 2 (webkit < 420)
     * when Date.setDate(n) is called with n less than -128 or greater than 127.
     * <p>
     * Fix approach and original findings are available here:
     * http://brianary.blogspot.com/2006/03/safari-date-bug.html
     * </p>
     * @method _addDays
     * @param {Date} d JavaScript date object
     * @param {Number} nDays The number of days to add to the date object (can be negative)
     * @private
     */
    _addDays : function(d, nDays) {
        if (YAHOO.env.ua.webkit && YAHOO.env.ua.webkit < 420) {
            if (nDays < 0) {
                // Ensure we don't go below -128 (getDate() is always 1 to 31, so we won't go above 127)
                for(var min = -128; nDays < min; nDays -= min) {
                    d.setDate(d.getDate() + min);
                }
            } else {
                // Ensure we don't go above 96 + 31 = 127
                for(var max = 96; nDays > max; nDays -= max) {
                    d.setDate(d.getDate() + max);
                }
            }
            // nDays should be remainder between -128 and 96
        }
        d.setDate(d.getDate() + nDays);
    },

    /**
    * Subtracts the specified amount of time from the this instance.
    * @method subtract
    * @param {Date} date The JavaScript Date object to perform subtraction on
    * @param {Number} field The this field constant to be used for performing subtraction.
    * @param {Number} amount The number of units (measured in the field constant) to subtract from the date.
    * @return {Date} The resulting Date object
    */
    subtract : function(date, field, amount) {
        return this.add(date, field, (amount*-1));
    },

    /**
    * Determines whether a given date is before another date on the calendar.
    * @method before
    * @param {Date} date  The Date object to compare with the compare argument
    * @param {Date} compareTo The Date object to use for the comparison
    * @return {Boolean} true if the date occurs before the compared date; false if not.
    */
    before : function(date, compareTo) {
        var ms = compareTo.getTime();
        if (date.getTime() < ms) {
            return true;
        } else {
            return false;
        }
    },

    /**
    * Determines whether a given date is after another date on the calendar.
    * @method after
    * @param {Date} date  The Date object to compare with the compare argument
    * @param {Date} compareTo The Date object to use for the comparison
    * @return {Boolean} true if the date occurs after the compared date; false if not.
    */
    after : function(date, compareTo) {
        var ms = compareTo.getTime();
        if (date.getTime() > ms) {
            return true;
        } else {
            return false;
        }
    },

    /**
    * Determines whether a given date is between two other dates on the calendar.
    * @method between
    * @param {Date} date  The date to check for
    * @param {Date} dateBegin The start of the range
    * @param {Date} dateEnd  The end of the range
    * @return {Boolean} true if the date occurs between the compared dates; false if not.
    */
    between : function(date, dateBegin, dateEnd) {
        if (this.after(date, dateBegin) && this.before(date, dateEnd)) {
            return true;
        } else {
            return false;
        }
    },
    
    /**
    * Retrieves a JavaScript Date object representing January 1 of any given year.
    * @method getJan1
    * @param {Number} calendarYear  The calendar year for which to retrieve January 1
    * @return {Date} January 1 of the calendar year specified.
    */
    getJan1 : function(calendarYear) {
        return this.getDate(calendarYear,0,1);
    },

    /**
    * Calculates the number of days the specified date is from January 1 of the specified calendar year.
    * Passing January 1 to this function would return an offset value of zero.
    * @method getDayOffset
    * @param {Date} date The JavaScript date for which to find the offset
    * @param {Number} calendarYear The calendar year to use for determining the offset
    * @return {Number} The number of days since January 1 of the given year
    */
    getDayOffset : function(date, calendarYear) {
        var beginYear = this.getJan1(calendarYear); // Find the start of the year. This will be in week 1.
        
        // Find the number of days the passed in date is away from the calendar year start
        var dayOffset = Math.ceil((date.getTime()-beginYear.getTime()) / this.ONE_DAY_MS);
        return dayOffset;
    },

    /**
    * Calculates the week number for the given date. Can currently support standard
    * U.S. week numbers, based on Jan 1st defining the 1st week of the year, and 
    * ISO8601 week numbers, based on Jan 4th defining the 1st week of the year.
    * 
    * @method getWeekNumber
    * @param {Date} date The JavaScript date for which to find the week number
    * @param {Number} firstDayOfWeek The index of the first day of the week (0 = Sun, 1 = Mon ... 6 = Sat).
    * Defaults to 0
    * @param {Number} janDate The date in the first week of January which defines week one for the year
    * Defaults to the value of YAHOO.widget.DateMath.WEEK_ONE_JAN_DATE, which is 1 (Jan 1st). 
    * For the U.S, this is normally Jan 1st. ISO8601 uses Jan 4th to define the first week of the year.
    * 
    * @return {Number} The number of the week containing the given date.
    */
    getWeekNumber : function(date, firstDayOfWeek, janDate) {

        // Setup Defaults
        firstDayOfWeek = firstDayOfWeek || 0;
        janDate = janDate || this.WEEK_ONE_JAN_DATE;

        var targetDate = this.clearTime(date),
            startOfWeek,
            endOfWeek;

        if (targetDate.getDay() === firstDayOfWeek) { 
            startOfWeek = targetDate;
        } else {
            startOfWeek = this.getFirstDayOfWeek(targetDate, firstDayOfWeek);
        }

        var startYear = startOfWeek.getFullYear();

        // DST shouldn't be a problem here, math is quicker than setDate();
        endOfWeek = new Date(startOfWeek.getTime() + 6*this.ONE_DAY_MS);

        var weekNum;
        if (startYear !== endOfWeek.getFullYear() && endOfWeek.getDate() >= janDate) {
            // If years don't match, endOfWeek is in Jan. and if the 
            // week has WEEK_ONE_JAN_DATE in it, it's week one by definition.
            weekNum = 1;
        } else {
            // Get the 1st day of the 1st week, and 
            // find how many days away we are from it.
            var weekOne = this.clearTime(this.getDate(startYear, 0, janDate)),
                weekOneDayOne = this.getFirstDayOfWeek(weekOne, firstDayOfWeek);

            // Round days to smoothen out 1 hr DST diff
            var daysDiff  = Math.round((targetDate.getTime() - weekOneDayOne.getTime())/this.ONE_DAY_MS);

            // Calc. Full Weeks
            var rem = daysDiff % 7;
            var weeksDiff = (daysDiff - rem)/7;
            weekNum = weeksDiff + 1;
        }
        return weekNum;
    },

    /**
     * Get the first day of the week, for the give date. 
     * @param {Date} dt The date in the week for which the first day is required.
     * @param {Number} startOfWeek The index for the first day of the week, 0 = Sun, 1 = Mon ... 6 = Sat (defaults to 0)
     * @return {Date} The first day of the week
     */
    getFirstDayOfWeek : function (dt, startOfWeek) {
        startOfWeek = startOfWeek || 0;
        var dayOfWeekIndex = dt.getDay(),
            dayOfWeek = (dayOfWeekIndex - startOfWeek + 7) % 7;

        return this.subtract(dt, this.DAY, dayOfWeek);
    },

    /**
    * Determines if a given week overlaps two different years.
    * @method isYearOverlapWeek
    * @param {Date} weekBeginDate The JavaScript Date representing the first day of the week.
    * @return {Boolean} true if the date overlaps two different years.
    */
    isYearOverlapWeek : function(weekBeginDate) {
        var overlaps = false;
        var nextWeek = this.add(weekBeginDate, this.DAY, 6);
        if (nextWeek.getFullYear() != weekBeginDate.getFullYear()) {
            overlaps = true;
        }
        return overlaps;
    },

    /**
    * Determines if a given week overlaps two different months.
    * @method isMonthOverlapWeek
    * @param {Date} weekBeginDate The JavaScript Date representing the first day of the week.
    * @return {Boolean} true if the date overlaps two different months.
    */
    isMonthOverlapWeek : function(weekBeginDate) {
        var overlaps = false;
        var nextWeek = this.add(weekBeginDate, this.DAY, 6);
        if (nextWeek.getMonth() != weekBeginDate.getMonth()) {
            overlaps = true;
        }
        return overlaps;
    },

    /**
    * Gets the first day of a month containing a given date.
    * @method findMonthStart
    * @param {Date} date The JavaScript Date used to calculate the month start
    * @return {Date}  The JavaScript Date representing the first day of the month
    */
    findMonthStart : function(date) {
        var start = this.getDate(date.getFullYear(), date.getMonth(), 1);
        return start;
    },

    /**
    * Gets the last day of a month containing a given date.
    * @method findMonthEnd
    * @param {Date} date The JavaScript Date used to calculate the month end
    * @return {Date}  The JavaScript Date representing the last day of the month
    */
    findMonthEnd : function(date) {
        var start = this.findMonthStart(date);
        var nextMonth = this.add(start, this.MONTH, 1);
        var end = this.subtract(nextMonth, this.DAY, 1);
        return end;
    },

    /**
    * Clears the time fields from a given date, effectively setting the time to 12 noon.
    * @method clearTime
    * @param {Date} date The JavaScript Date for which the time fields will be cleared
    * @return {Date}  The JavaScript Date cleared of all time fields
    */
    clearTime : function(date) {
        date.setHours(12,0,0,0);
        return date;
    },

    /**
     * Returns a new JavaScript Date object, representing the given year, month and date. Time fields (hr, min, sec, ms) on the new Date object
     * are set to 0. The method allows Date instances to be created with the a year less than 100. "new Date(year, month, date)" implementations 
     * set the year to 19xx if a year (xx) which is less than 100 is provided.
     * <p>
     * <em>NOTE:</em>Validation on argument values is not performed. It is the caller's responsibility to ensure
     * arguments are valid as per the ECMAScript-262 Date object specification for the new Date(year, month[, date]) constructor.
     * </p>
     * @method getDate
     * @param {Number} y Year.
     * @param {Number} m Month index from 0 (Jan) to 11 (Dec).
     * @param {Number} d (optional) Date from 1 to 31. If not provided, defaults to 1.
     * @return {Date} The JavaScript date object with year, month, date set as provided.
     */
    getDate : function(y, m, d) {
        var dt = null;
        if (YAHOO.lang.isUndefined(d)) {
            d = 1;
        }
        if (y >= 100) {
            dt = new Date(y, m, d);
        } else {
            dt = new Date();
            dt.setFullYear(y);
            dt.setMonth(m);
            dt.setDate(d);
            dt.setHours(0,0,0,0);
        }
        return dt;
    }
};
/**
* The Calendar component is a UI control that enables users to choose one or more dates from a graphical calendar presented in a one-month or
* multi-month interface. Calendars are generated entirely via script and can be navigated without any page refreshes.
* @module    calendar
* @title    Calendar
* @namespace  YAHOO.widget
* @requires  yahoo,dom,event
*/
(function(){

    var Dom = YAHOO.util.Dom,
        Event = YAHOO.util.Event,
        Lang = YAHOO.lang,
        DateMath = YAHOO.widget.DateMath;

/**
* Calendar is the base class for the Calendar widget. In its most basic
* implementation, it has the ability to render a calendar widget on the page
* that can be manipulated to select a single date, move back and forth between
* months and years.
* <p>To construct the placeholder for the calendar widget, the code is as
* follows:
*   <xmp>
*       <div id="calContainer"></div>
*   </xmp>
* </p>
* <p>
* <strong>NOTE: As of 2.4.0, the constructor's ID argument is optional.</strong>
* The Calendar can be constructed by simply providing a container ID string, 
* or a reference to a container DIV HTMLElement (the element needs to exist 
* in the document).
* 
* E.g.:
*   <xmp>
*       var c = new YAHOO.widget.Calendar("calContainer", configOptions);
*   </xmp>
* or:
*   <xmp>
*       var containerDiv = YAHOO.util.Dom.get("calContainer");
*       var c = new YAHOO.widget.Calendar(containerDiv, configOptions);
*   </xmp>
* </p>
* <p>
* If not provided, the ID will be generated from the container DIV ID by adding an "_t" suffix.
* For example if an ID is not provided, and the container's ID is "calContainer", the Calendar's ID will be set to "calContainer_t".
* </p>
* 
* @namespace YAHOO.widget
* @class Calendar
* @constructor
* @param {String} id optional The id of the table element that will represent the Calendar widget. As of 2.4.0, this argument is optional.
* @param {String | HTMLElement} container The id of the container div element that will wrap the Calendar table, or a reference to a DIV element which exists in the document.
* @param {Object} config optional The configuration object containing the initial configuration values for the Calendar.
*/
function Calendar(id, containerId, config) {
    this.init.apply(this, arguments);
}

/**
* The path to be used for images loaded for the Calendar
* @property YAHOO.widget.Calendar.IMG_ROOT
* @static
* @deprecated   You can now customize images by overriding the calclose, calnavleft and calnavright default CSS classes for the close icon, left arrow and right arrow respectively
* @type String
*/
Calendar.IMG_ROOT = null;

/**
* Type constant used for renderers to represent an individual date (M/D/Y)
* @property YAHOO.widget.Calendar.DATE
* @static
* @final
* @type String
*/
Calendar.DATE = "D";

/**
* Type constant used for renderers to represent an individual date across any year (M/D)
* @property YAHOO.widget.Calendar.MONTH_DAY
* @static
* @final
* @type String
*/
Calendar.MONTH_DAY = "MD";

/**
* Type constant used for renderers to represent a weekday
* @property YAHOO.widget.Calendar.WEEKDAY
* @static
* @final
* @type String
*/
Calendar.WEEKDAY = "WD";

/**
* Type constant used for renderers to represent a range of individual dates (M/D/Y-M/D/Y)
* @property YAHOO.widget.Calendar.RANGE
* @static
* @final
* @type String
*/
Calendar.RANGE = "R";

/**
* Type constant used for renderers to represent a month across any year
* @property YAHOO.widget.Calendar.MONTH
* @static
* @final
* @type String
*/
Calendar.MONTH = "M";

/**
* Constant that represents the total number of date cells that are displayed in a given month
* @property YAHOO.widget.Calendar.DISPLAY_DAYS
* @static
* @final
* @type Number
*/
Calendar.DISPLAY_DAYS = 42;

/**
* Constant used for halting the execution of the remainder of the render stack
* @property YAHOO.widget.Calendar.STOP_RENDER
* @static
* @final
* @type String
*/
Calendar.STOP_RENDER = "S";

/**
* Constant used to represent short date field string formats (e.g. Tu or Feb)
* @property YAHOO.widget.Calendar.SHORT
* @static
* @final
* @type String
*/
Calendar.SHORT = "short";

/**
* Constant used to represent long date field string formats (e.g. Monday or February)
* @property YAHOO.widget.Calendar.LONG
* @static
* @final
* @type String
*/
Calendar.LONG = "long";

/**
* Constant used to represent medium date field string formats (e.g. Mon)
* @property YAHOO.widget.Calendar.MEDIUM
* @static
* @final
* @type String
*/
Calendar.MEDIUM = "medium";

/**
* Constant used to represent single character date field string formats (e.g. M, T, W)
* @property YAHOO.widget.Calendar.ONE_CHAR
* @static
* @final
* @type String
*/
Calendar.ONE_CHAR = "1char";

/**
* The set of default Config property keys and values for the Calendar.
*
* <p>
* NOTE: This property is made public in order to allow users to change 
* the default values of configuration properties. Users should not 
* modify the key string, unless they are overriding the Calendar implementation
* </p>
*
* <p>
* The property is an object with key/value pairs, the key being the 
* uppercase configuration property name and the value being an object 
* literal with a key string property, and a value property, specifying the 
* default value of the property. To override a default value, you can set
* the value property, for example, <code>YAHOO.widget.Calendar.DEFAULT_CONFIG.MULTI_SELECT.value = true;</code>
* 
* @property YAHOO.widget.Calendar.DEFAULT_CONFIG
* @static
* @type Object
*/

Calendar.DEFAULT_CONFIG = {
    YEAR_OFFSET : {key:"year_offset", value:0, supercedes:["pagedate", "selected", "mindate","maxdate"]},
    TODAY : {key:"today", value:new Date(), supercedes:["pagedate"]}, 
    PAGEDATE : {key:"pagedate", value:null},
    SELECTED : {key:"selected", value:[]},
    TITLE : {key:"title", value:""},
    CLOSE : {key:"close", value:false},
    IFRAME : {key:"iframe", value:(YAHOO.env.ua.ie && YAHOO.env.ua.ie <= 6) ? true : false},
    MINDATE : {key:"mindate", value:null},
    MAXDATE : {key:"maxdate", value:null},
    MULTI_SELECT : {key:"multi_select", value:false},
    START_WEEKDAY : {key:"start_weekday", value:0},
    SHOW_WEEKDAYS : {key:"show_weekdays", value:true},
    SHOW_WEEK_HEADER : {key:"show_week_header", value:false},
    SHOW_WEEK_FOOTER : {key:"show_week_footer", value:false},
    HIDE_BLANK_WEEKS : {key:"hide_blank_weeks", value:false},
    NAV_ARROW_LEFT: {key:"nav_arrow_left", value:null} ,
    NAV_ARROW_RIGHT : {key:"nav_arrow_right", value:null} ,
    MONTHS_SHORT : {key:"months_short", value:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]},
    MONTHS_LONG: {key:"months_long", value:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]},
    WEEKDAYS_1CHAR: {key:"weekdays_1char", value:["S", "M", "T", "W", "T", "F", "S"]},
    WEEKDAYS_SHORT: {key:"weekdays_short", value:["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]},
    WEEKDAYS_MEDIUM: {key:"weekdays_medium", value:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]},
    WEEKDAYS_LONG: {key:"weekdays_long", value:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]},
    LOCALE_MONTHS:{key:"locale_months", value:"long"},
    LOCALE_WEEKDAYS:{key:"locale_weekdays", value:"short"},
    DATE_DELIMITER:{key:"date_delimiter", value:","},
    DATE_FIELD_DELIMITER:{key:"date_field_delimiter", value:"/"},
    DATE_RANGE_DELIMITER:{key:"date_range_delimiter", value:"-"},
    MY_MONTH_POSITION:{key:"my_month_position", value:1},
    MY_YEAR_POSITION:{key:"my_year_position", value:2},
    MD_MONTH_POSITION:{key:"md_month_position", value:1},
    MD_DAY_POSITION:{key:"md_day_position", value:2},
    MDY_MONTH_POSITION:{key:"mdy_month_position", value:1},
    MDY_DAY_POSITION:{key:"mdy_day_position", value:2},
    MDY_YEAR_POSITION:{key:"mdy_year_position", value:3},
    MY_LABEL_MONTH_POSITION:{key:"my_label_month_position", value:1},
    MY_LABEL_YEAR_POSITION:{key:"my_label_year_position", value:2},
    MY_LABEL_MONTH_SUFFIX:{key:"my_label_month_suffix", value:" "},
    MY_LABEL_YEAR_SUFFIX:{key:"my_label_year_suffix", value:""},
    NAV: {key:"navigator", value: null},
    STRINGS : { 
        key:"strings",
        value: {
            previousMonth : "Previous Month",
            nextMonth : "Next Month",
            close: "Close"
        },
        supercedes : ["close", "title"]
    }
};

/**
* The set of default Config property keys and values for the Calendar
* @property YAHOO.widget.Calendar._DEFAULT_CONFIG
* @deprecated Made public. See the public DEFAULT_CONFIG property for details
* @final
* @static
* @private
* @type Object
*/
Calendar._DEFAULT_CONFIG = Calendar.DEFAULT_CONFIG;

var DEF_CFG = Calendar.DEFAULT_CONFIG;

/**
* The set of Custom Event types supported by the Calendar
* @property YAHOO.widget.Calendar._EVENT_TYPES
* @final
* @static
* @private
* @type Object
*/
Calendar._EVENT_TYPES = {
    BEFORE_SELECT : "beforeSelect", 
    SELECT : "select",
    BEFORE_DESELECT : "beforeDeselect",
    DESELECT : "deselect",
    CHANGE_PAGE : "changePage",
    BEFORE_RENDER : "beforeRender",
    RENDER : "render",
    BEFORE_DESTROY : "beforeDestroy",
    DESTROY : "destroy",
    RESET : "reset",
    CLEAR : "clear",
    BEFORE_HIDE : "beforeHide",
    HIDE : "hide",
    BEFORE_SHOW : "beforeShow",
    SHOW : "show",
    BEFORE_HIDE_NAV : "beforeHideNav",
    HIDE_NAV : "hideNav",
    BEFORE_SHOW_NAV : "beforeShowNav",
    SHOW_NAV : "showNav",
    BEFORE_RENDER_NAV : "beforeRenderNav",
    RENDER_NAV : "renderNav"
};

/**
* The set of default style constants for the Calendar
* @property YAHOO.widget.Calendar.STYLES
* @static
* @type Object An object with name/value pairs for the class name identifier/value.
*/
Calendar.STYLES = {
    CSS_ROW_HEADER: "calrowhead",
    CSS_ROW_FOOTER: "calrowfoot",
    CSS_CELL : "calcell",
    CSS_CELL_SELECTOR : "selector",
    CSS_CELL_SELECTED : "selected",
    CSS_CELL_SELECTABLE : "selectable",
    CSS_CELL_RESTRICTED : "restricted",
    CSS_CELL_TODAY : "today",
    CSS_CELL_OOM : "oom",
    CSS_CELL_OOB : "previous",
    CSS_HEADER : "calheader",
    CSS_HEADER_TEXT : "calhead",
    CSS_BODY : "calbody",
    CSS_WEEKDAY_CELL : "calweekdaycell",
    CSS_WEEKDAY_ROW : "calweekdayrow",
    CSS_FOOTER : "calfoot",
    CSS_CALENDAR : "yui-calendar",
    CSS_SINGLE : "single",
    CSS_CONTAINER : "yui-calcontainer",
    CSS_NAV_LEFT : "calnavleft",
    CSS_NAV_RIGHT : "calnavright",
    CSS_NAV : "calnav",
    CSS_CLOSE : "calclose",
    CSS_CELL_TOP : "calcelltop",
    CSS_CELL_LEFT : "calcellleft",
    CSS_CELL_RIGHT : "calcellright",
    CSS_CELL_BOTTOM : "calcellbottom",
    CSS_CELL_HOVER : "calcellhover",
    CSS_CELL_HIGHLIGHT1 : "highlight1",
    CSS_CELL_HIGHLIGHT2 : "highlight2",
    CSS_CELL_HIGHLIGHT3 : "highlight3",
    CSS_CELL_HIGHLIGHT4 : "highlight4",
    CSS_WITH_TITLE: "withtitle",
    CSS_FIXED_SIZE: "fixedsize",
    CSS_LINK_CLOSE: "link-close"
};

/**
* The set of default style constants for the Calendar
* @property YAHOO.widget.Calendar._STYLES
* @deprecated Made public. See the public STYLES property for details
* @final
* @static
* @private
* @type Object
*/
Calendar._STYLES = Calendar.STYLES;

Calendar.prototype = {

    /**
    * The configuration object used to set up the calendars various locale and style options.
    * @property Config
    * @private
    * @deprecated Configuration properties should be set by calling Calendar.cfg.setProperty.
    * @type Object
    */
    Config : null,

    /**
    * The parent CalendarGroup, only to be set explicitly by the parent group
    * @property parent
    * @type CalendarGroup
    */ 
    parent : null,

    /**
    * The index of this item in the parent group
    * @property index
    * @type Number
    */
    index : -1,

    /**
    * The collection of calendar table cells
    * @property cells
    * @type HTMLTableCellElement[]
    */
    cells : null,

    /**
    * The collection of calendar cell dates that is parallel to the cells collection. The array contains dates field arrays in the format of [YYYY, M, D].
    * @property cellDates
    * @type Array[](Number[])
    */
    cellDates : null,

    /**
    * The id that uniquely identifies this Calendar.
    * @property id
    * @type String
    */
    id : null,

    /**
    * The unique id associated with the Calendar's container
    * @property containerId
    * @type String
    */
    containerId: null,

    /**
    * The DOM element reference that points to this calendar's container element. The calendar will be inserted into this element when the shell is rendered.
    * @property oDomContainer
    * @type HTMLElement
    */
    oDomContainer : null,

    /**
    * A Date object representing today's date.
    * @deprecated Use the "today" configuration property
    * @property today
    * @type Date
    */
    today : null,

    /**
    * The list of render functions, along with required parameters, used to render cells. 
    * @property renderStack
    * @type Array[]
    */
    renderStack : null,

    /**
    * A copy of the initial render functions created before rendering.
    * @property _renderStack
    * @private
    * @type Array
    */
    _renderStack : null,

    /**
    * A reference to the CalendarNavigator instance created for this Calendar.
    * Will be null if the "navigator" configuration property has not been set
    * @property oNavigator
    * @type CalendarNavigator
    */
    oNavigator : null,

    /**
    * The private list of initially selected dates.
    * @property _selectedDates
    * @private
    * @type Array
    */
    _selectedDates : null,

    /**
    * A map of DOM event handlers to attach to cells associated with specific CSS class names
    * @property domEventMap
    * @type Object
    */
    domEventMap : null,

    /**
     * Protected helper used to parse Calendar constructor/init arguments.
     *
     * As of 2.4.0, Calendar supports a simpler constructor 
     * signature. This method reconciles arguments
     * received in the pre 2.4.0 and 2.4.0 formats.
     * 
     * @protected
     * @method _parseArgs
     * @param {Array} Function "arguments" array
     * @return {Object} Object with id, container, config properties containing
     * the reconciled argument values.
     **/
    _parseArgs : function(args) {
        /*
           2.4.0 Constructors signatures

           new Calendar(String)
           new Calendar(HTMLElement)
           new Calendar(String, ConfigObject)
           new Calendar(HTMLElement, ConfigObject)

           Pre 2.4.0 Constructor signatures

           new Calendar(String, String)
           new Calendar(String, HTMLElement)
           new Calendar(String, String, ConfigObject)
           new Calendar(String, HTMLElement, ConfigObject)
         */
        var nArgs = {id:null, container:null, config:null};

        if (args && args.length && args.length > 0) {
            switch (args.length) {
                case 1:
                    nArgs.id = null;
                    nArgs.container = args[0];
                    nArgs.config = null;
                    break;
                case 2:
                    if (Lang.isObject(args[1]) && !args[1].tagName && !(args[1] instanceof String)) {
                        nArgs.id = null;
                        nArgs.container = args[0];
                        nArgs.config = args[1];
                    } else {
                        nArgs.id = args[0];
                        nArgs.container = args[1];
                        nArgs.config = null;
                    }
                    break;
                default: // 3+
                    nArgs.id = args[0];
                    nArgs.container = args[1];
                    nArgs.config = args[2];
                    break;
            }
        } else {
        }
        return nArgs;
    },

    /**
    * Initializes the Calendar widget.
    * @method init
    *
    * @param {String} id optional The id of the table element that will represent the Calendar widget. As of 2.4.0, this argument is optional.
    * @param {String | HTMLElement} container The id of the container div element that will wrap the Calendar table, or a reference to a DIV element which exists in the document.
    * @param {Object} config optional The configuration object containing the initial configuration values for the Calendar.
    */
    init : function(id, container, config) {
        // Normalize 2.4.0, pre 2.4.0 args
        var nArgs = this._parseArgs(arguments);

        id = nArgs.id;
        container = nArgs.container;
        config = nArgs.config;

        this.oDomContainer = Dom.get(container);

        if (!this.oDomContainer.id) {
            this.oDomContainer.id = Dom.generateId();
        }
        if (!id) {
            id = this.oDomContainer.id + "_t";
        }

        this.id = id;
        this.containerId = this.oDomContainer.id;

        this.initEvents();

        /**
        * The Config object used to hold the configuration variables for the Calendar
        * @property cfg
        * @type YAHOO.util.Config
        */
        this.cfg = new YAHOO.util.Config(this);

        /**
        * The local object which contains the Calendar's options
        * @property Options
        * @type Object
        */
        this.Options = {};

        /**
        * The local object which contains the Calendar's locale settings
        * @property Locale
        * @type Object
        */
        this.Locale = {};

        this.initStyles();

        Dom.addClass(this.oDomContainer, this.Style.CSS_CONTAINER);
        Dom.addClass(this.oDomContainer, this.Style.CSS_SINGLE);

        this.cellDates = [];
        this.cells = [];
        this.renderStack = [];
        this._renderStack = [];

        this.setupConfig();

        if (config) {
            this.cfg.applyConfig(config, true);
        }

        this.cfg.fireQueue();

        this.today = this.cfg.getProperty("today");
    },

    /**
    * Default Config listener for the iframe property. If the iframe config property is set to true, 
    * renders the built-in IFRAME shim if the container is relatively or absolutely positioned.
    * 
    * @method configIframe
    */
    configIframe : function(type, args, obj) {
        var useIframe = args[0];
    
        if (!this.parent) {
            if (Dom.inDocument(this.oDomContainer)) {
                if (useIframe) {
                    var pos = Dom.getStyle(this.oDomContainer, "position");
                    
                    if (pos == "absolute" || pos == "relative") {
                        
                        if (!Dom.inDocument(this.iframe)) {
                            this.iframe = document.createElement("iframe");
                            this.iframe.src = "javascript:false;";
    
                            Dom.setStyle(this.iframe, "opacity", "0");
    
                            if (YAHOO.env.ua.ie && YAHOO.env.ua.ie <= 6) {
                                Dom.addClass(this.iframe, this.Style.CSS_FIXED_SIZE);
                            }
    
                            this.oDomContainer.insertBefore(this.iframe, this.oDomContainer.firstChild);
                        }
                    }
                } else {
                    if (this.iframe) {
                        if (this.iframe.parentNode) {
                            this.iframe.parentNode.removeChild(this.iframe);
                        }
                        this.iframe = null;
                    }
                }
            }
        }
    },

    /**
    * Default handler for the "title" property
    * @method configTitle
    */
    configTitle : function(type, args, obj) {
        var title = args[0];

        // "" disables title bar
        if (title) {
            this.createTitleBar(title);
        } else {
            var close = this.cfg.getProperty(DEF_CFG.CLOSE.key);
            if (!close) {
                this.removeTitleBar();
            } else {
                this.createTitleBar("&#160;");
            }
        }
    },
    
    /**
    * Default handler for the "close" property
    * @method configClose
    */
    configClose : function(type, args, obj) {
        var close = args[0],
            title = this.cfg.getProperty(DEF_CFG.TITLE.key);
    
        if (close) {
            if (!title) {
                this.createTitleBar("&#160;");
            }
            this.createCloseButton();
        } else {
            this.removeCloseButton();
            if (!title) {
                this.removeTitleBar();
            }
        }
    },

    /**
    * Initializes Calendar's built-in CustomEvents
    * @method initEvents
    */
    initEvents : function() {

        var defEvents = Calendar._EVENT_TYPES,
            CE = YAHOO.util.CustomEvent,
            cal = this; // To help with minification

        /**
        * Fired before a date selection is made
        * @event beforeSelectEvent
        */
        cal.beforeSelectEvent = new CE(defEvents.BEFORE_SELECT); 

        /**
        * Fired when a date selection is made
        * @event selectEvent
        * @param {Array} Array of Date field arrays in the format [YYYY, MM, DD].
        */
        cal.selectEvent = new CE(defEvents.SELECT);

        /**
        * Fired before a date or set of dates is deselected
        * @event beforeDeselectEvent
        */
        cal.beforeDeselectEvent = new CE(defEvents.BEFORE_DESELECT);

        /**
        * Fired when a date or set of dates is deselected
        * @event deselectEvent
        * @param {Array} Array of Date field arrays in the format [YYYY, MM, DD].
        */
        cal.deselectEvent = new CE(defEvents.DESELECT);
    
        /**
        * Fired when the Calendar page is changed
        * @event changePageEvent
        * @param {Date} prevDate The date before the page was changed
        * @param {Date} newDate The date after the page was changed
        */
        cal.changePageEvent = new CE(defEvents.CHANGE_PAGE);
    
        /**
        * Fired before the Calendar is rendered
        * @event beforeRenderEvent
        */
        cal.beforeRenderEvent = new CE(defEvents.BEFORE_RENDER);
    
        /**
        * Fired when the Calendar is rendered
        * @event renderEvent
        */
        cal.renderEvent = new CE(defEvents.RENDER);

        /**
        * Fired just before the Calendar is to be destroyed
        * @event beforeDestroyEvent
        */
        cal.beforeDestroyEvent = new CE(defEvents.BEFORE_DESTROY);

        /**
        * Fired after the Calendar is destroyed. This event should be used
        * for notification only. When this event is fired, important Calendar instance
        * properties, dom references and event listeners have already been 
        * removed/dereferenced, and hence the Calendar instance is not in a usable 
        * state.
        *
        * @event destroyEvent
        */
        cal.destroyEvent = new CE(defEvents.DESTROY);

        /**
        * Fired when the Calendar is reset
        * @event resetEvent
        */
        cal.resetEvent = new CE(defEvents.RESET);

        /**
        * Fired when the Calendar is cleared
        * @event clearEvent
        */
        cal.clearEvent = new CE(defEvents.CLEAR);

        /**
        * Fired just before the Calendar is to be shown
        * @event beforeShowEvent
        */
        cal.beforeShowEvent = new CE(defEvents.BEFORE_SHOW);

        /**
        * Fired after the Calendar is shown
        * @event showEvent
        */
        cal.showEvent = new CE(defEvents.SHOW);

        /**
        * Fired just before the Calendar is to be hidden
        * @event beforeHideEvent
        */
        cal.beforeHideEvent = new CE(defEvents.BEFORE_HIDE);

        /**
        * Fired after the Calendar is hidden
        * @event hideEvent
        */
        cal.hideEvent = new CE(defEvents.HIDE);

        /**
        * Fired just before the CalendarNavigator is to be shown
        * @event beforeShowNavEvent
        */
        cal.beforeShowNavEvent = new CE(defEvents.BEFORE_SHOW_NAV);
    
        /**
        * Fired after the CalendarNavigator is shown
        * @event showNavEvent
        */
        cal.showNavEvent = new CE(defEvents.SHOW_NAV);
    
        /**
        * Fired just before the CalendarNavigator is to be hidden
        * @event beforeHideNavEvent
        */
        cal.beforeHideNavEvent = new CE(defEvents.BEFORE_HIDE_NAV);
    
        /**
        * Fired after the CalendarNavigator is hidden
        * @event hideNavEvent
        */
        cal.hideNavEvent = new CE(defEvents.HIDE_NAV);

        /**
        * Fired just before the CalendarNavigator is to be rendered
        * @event beforeRenderNavEvent
        */
        cal.beforeRenderNavEvent = new CE(defEvents.BEFORE_RENDER_NAV);

        /**
        * Fired after the CalendarNavigator is rendered
        * @event renderNavEvent
        */
        cal.renderNavEvent = new CE(defEvents.RENDER_NAV);

        cal.beforeSelectEvent.subscribe(cal.onBeforeSelect, this, true);
        cal.selectEvent.subscribe(cal.onSelect, this, true);
        cal.beforeDeselectEvent.subscribe(cal.onBeforeDeselect, this, true);
        cal.deselectEvent.subscribe(cal.onDeselect, this, true);
        cal.changePageEvent.subscribe(cal.onChangePage, this, true);
        cal.renderEvent.subscribe(cal.onRender, this, true);
        cal.resetEvent.subscribe(cal.onReset, this, true);
        cal.clearEvent.subscribe(cal.onClear, this, true);
    },

    /**
    * The default event handler for clicks on the "Previous Month" navigation UI
    *
    * @method doPreviousMonthNav
    * @param {DOMEvent} e The DOM event
    * @param {Calendar} cal A reference to the calendar
    */
    doPreviousMonthNav : function(e, cal) {
        Event.preventDefault(e);
        // previousMonth invoked in a timeout, to allow
        // event to bubble up, with correct target. Calling
        // previousMonth, will call render which will remove 
        // HTML which generated the event, resulting in an 
        // invalid event target in certain browsers.
        setTimeout(function() {
            cal.previousMonth();
            var navs = Dom.getElementsByClassName(cal.Style.CSS_NAV_LEFT, "a", cal.oDomContainer);
            if (navs && navs[0]) {
                try {
                    navs[0].focus();
                } catch (ex) {
                    // ignore
                }
            }
        }, 0);
    },

    /**
     * The default event handler for clicks on the "Next Month" navigation UI
     *
     * @method doNextMonthNav
     * @param {DOMEvent} e The DOM event
     * @param {Calendar} cal A reference to the calendar
     */
    doNextMonthNav : function(e, cal) {
        Event.preventDefault(e);
        setTimeout(function() {
            cal.nextMonth();
            var navs = Dom.getElementsByClassName(cal.Style.CSS_NAV_RIGHT, "a", cal.oDomContainer);
            if (navs && navs[0]) {
                try {
                    navs[0].focus();
                } catch (ex) {
                    // ignore
                }
            }
        }, 0);
    },

    /**
    * The default event handler for date cell selection. Currently attached to 
    * the Calendar's bounding box, referenced by it's <a href="#property_oDomContainer">oDomContainer</a> property.
    *
    * @method doSelectCell
    * @param {DOMEvent} e The DOM event
    * @param {Calendar} cal A reference to the calendar
    */
    doSelectCell : function(e, cal) {
        var cell, d, date, index;

        var target = Event.getTarget(e),
            tagName = target.tagName.toLowerCase(),
            defSelector = false;

        while (tagName != "td" && !Dom.hasClass(target, cal.Style.CSS_CELL_SELECTABLE)) {

            if (!defSelector && tagName == "a" && Dom.hasClass(target, cal.Style.CSS_CELL_SELECTOR)) {
                defSelector = true;
            }

            target = target.parentNode;
            tagName = target.tagName.toLowerCase();

            if (target == this.oDomContainer || tagName == "html") {
                return;
            }
        }

        if (defSelector) {
            // Stop link href navigation for default renderer
            Event.preventDefault(e);
        }
    
        cell = target;

        if (Dom.hasClass(cell, cal.Style.CSS_CELL_SELECTABLE)) {
            index = cal.getIndexFromId(cell.id);
            if (index > -1) {
                d = cal.cellDates[index];
                if (d) {
                    date = DateMath.getDate(d[0],d[1]-1,d[2]);
                
                    var link;

                    if (cal.Options.MULTI_SELECT) {
                        link = cell.getElementsByTagName("a")[0];
                        if (link) {
                            link.blur();
                        }

                        var cellDate = cal.cellDates[index];
                        var cellDateIndex = cal._indexOfSelectedFieldArray(cellDate);

                        if (cellDateIndex > -1) { 
                            cal.deselectCell(index);
                        } else {
                            cal.selectCell(index);
                        } 

                    } else {
                        link = cell.getElementsByTagName("a")[0];
                        if (link) {
                            link.blur();
                        }
                        cal.selectCell(index);
                    }
                }
            }
        }
    },

    /**
    * The event that is executed when the user hovers over a cell
    * @method doCellMouseOver
    * @param {DOMEvent} e The event
    * @param {Calendar} cal A reference to the calendar passed by the Event utility
    */
    doCellMouseOver : function(e, cal) {
        var target;
        if (e) {
            target = Event.getTarget(e);
        } else {
            target = this;
        }

        while (target.tagName && target.tagName.toLowerCase() != "td") {
            target = target.parentNode;
            if (!target.tagName || target.tagName.toLowerCase() == "html") {
                return;
            }
        }

        if (Dom.hasClass(target, cal.Style.CSS_CELL_SELECTABLE)) {
            Dom.addClass(target, cal.Style.CSS_CELL_HOVER);
        }
    },

    /**
    * The event that is executed when the user moves the mouse out of a cell
    * @method doCellMouseOut
    * @param {DOMEvent} e The event
    * @param {Calendar} cal A reference to the calendar passed by the Event utility
    */
    doCellMouseOut : function(e, cal) {
        var target;
        if (e) {
            target = Event.getTarget(e);
        } else {
            target = this;
        }

        while (target.tagName && target.tagName.toLowerCase() != "td") {
            target = target.parentNode;
            if (!target.tagName || target.tagName.toLowerCase() == "html") {
                return;
            }
        }

        if (Dom.hasClass(target, cal.Style.CSS_CELL_SELECTABLE)) {
            Dom.removeClass(target, cal.Style.CSS_CELL_HOVER);
        }
    },

    setupConfig : function() {

        var cfg = this.cfg;

        /**
        * The date to use to represent "Today".
        *
        * @config today
        * @type Date
        * @default The client side date (new Date()) when the Calendar is instantiated.
        */
        cfg.addProperty(DEF_CFG.TODAY.key, { value: new Date(DEF_CFG.TODAY.value.getTime()), supercedes:DEF_CFG.TODAY.supercedes, handler:this.configToday, suppressEvent:true } );

        /**
        * The month/year representing the current visible Calendar date (mm/yyyy)
        * @config pagedate
        * @type String | Date
        * @default Today's date
        */
        cfg.addProperty(DEF_CFG.PAGEDATE.key, { value: DEF_CFG.PAGEDATE.value || new Date(DEF_CFG.TODAY.value.getTime()), handler:this.configPageDate } );

        /**
        * The date or range of dates representing the current Calendar selection
        * @config selected
        * @type String
        * @default []
        */
        cfg.addProperty(DEF_CFG.SELECTED.key, { value:DEF_CFG.SELECTED.value.concat(), handler:this.configSelected } );

        /**
        * The title to display above the Calendar's month header
        * @config title
        * @type String
        * @default ""
        */
        cfg.addProperty(DEF_CFG.TITLE.key, { value:DEF_CFG.TITLE.value, handler:this.configTitle } );

        /**
        * Whether or not a close button should be displayed for this Calendar
        * @config close
        * @type Boolean
        * @default false
        */
        cfg.addProperty(DEF_CFG.CLOSE.key, { value:DEF_CFG.CLOSE.value, handler:this.configClose } );

        /**
        * Whether or not an iframe shim should be placed under the Calendar to prevent select boxes from bleeding through in Internet Explorer 6 and below.
        * This property is enabled by default for IE6 and below. It is disabled by default for other browsers for performance reasons, but can be 
        * enabled if required.
        * 
        * @config iframe
        * @type Boolean
        * @default true for IE6 and below, false for all other browsers
        */
        cfg.addProperty(DEF_CFG.IFRAME.key, { value:DEF_CFG.IFRAME.value, handler:this.configIframe, validator:cfg.checkBoolean } );

        /**
        * The minimum selectable date in the current Calendar (mm/dd/yyyy)
        * @config mindate
        * @type String | Date
        * @default null
        */
        cfg.addProperty(DEF_CFG.MINDATE.key, { value:DEF_CFG.MINDATE.value, handler:this.configMinDate } );

        /**
        * The maximum selectable date in the current Calendar (mm/dd/yyyy)
        * @config maxdate
        * @type String | Date
        * @default null
        */
        cfg.addProperty(DEF_CFG.MAXDATE.key, { value:DEF_CFG.MAXDATE.value, handler:this.configMaxDate } );

        // Options properties
    
        /**
        * True if the Calendar should allow multiple selections. False by default.
        * @config MULTI_SELECT
        * @type Boolean
        * @default false
        */
        cfg.addProperty(DEF_CFG.MULTI_SELECT.key, { value:DEF_CFG.MULTI_SELECT.value, handler:this.configOptions, validator:cfg.checkBoolean } );

        /**
        * The weekday the week begins on. Default is 0 (Sunday = 0, Monday = 1 ... Saturday = 6).
        * @config START_WEEKDAY
        * @type number
        * @default 0
        */
        cfg.addProperty(DEF_CFG.START_WEEKDAY.key, { value:DEF_CFG.START_WEEKDAY.value, handler:this.configOptions, validator:cfg.checkNumber  } );
    
        /**
        * True if the Calendar should show weekday labels. True by default.
        * @config SHOW_WEEKDAYS
        * @type Boolean
        * @default true
        */
        cfg.addProperty(DEF_CFG.SHOW_WEEKDAYS.key, { value:DEF_CFG.SHOW_WEEKDAYS.value, handler:this.configOptions, validator:cfg.checkBoolean  } );
    
        /**
        * True if the Calendar should show week row headers. False by default.
        * @config SHOW_WEEK_HEADER
        * @type Boolean
        * @default false
        */
        cfg.addProperty(DEF_CFG.SHOW_WEEK_HEADER.key, { value:DEF_CFG.SHOW_WEEK_HEADER.value, handler:this.configOptions, validator:cfg.checkBoolean } );
    
        /**
        * True if the Calendar should show week row footers. False by default.
        * @config SHOW_WEEK_FOOTER
        * @type Boolean
        * @default false
        */ 
        cfg.addProperty(DEF_CFG.SHOW_WEEK_FOOTER.key,{ value:DEF_CFG.SHOW_WEEK_FOOTER.value, handler:this.configOptions, validator:cfg.checkBoolean } );
    
        /**
        * True if the Calendar should suppress weeks that are not a part of the current month. False by default.
        * @config HIDE_BLANK_WEEKS
        * @type Boolean
        * @default false
        */ 
        cfg.addProperty(DEF_CFG.HIDE_BLANK_WEEKS.key, { value:DEF_CFG.HIDE_BLANK_WEEKS.value, handler:this.configOptions, validator:cfg.checkBoolean } );
        
        /**
        * The image that should be used for the left navigation arrow.
        * @config NAV_ARROW_LEFT
        * @type String
        * @deprecated You can customize the image by overriding the default CSS class for the left arrow - "calnavleft"  
        * @default null
        */ 
        cfg.addProperty(DEF_CFG.NAV_ARROW_LEFT.key, { value:DEF_CFG.NAV_ARROW_LEFT.value, handler:this.configOptions } );
    
        /**
        * The image that should be used for the right navigation arrow.
        * @config NAV_ARROW_RIGHT
        * @type String
        * @deprecated You can customize the image by overriding the default CSS class for the right arrow - "calnavright"
        * @default null
        */ 
        cfg.addProperty(DEF_CFG.NAV_ARROW_RIGHT.key, { value:DEF_CFG.NAV_ARROW_RIGHT.value, handler:this.configOptions } );
    
        // Locale properties
    
        /**
        * The short month labels for the current locale.
        * @config MONTHS_SHORT
        * @type String[]
        * @default ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        */
        cfg.addProperty(DEF_CFG.MONTHS_SHORT.key, { value:DEF_CFG.MONTHS_SHORT.value, handler:this.configLocale } );
        
        /**
        * The long month labels for the current locale.
        * @config MONTHS_LONG
        * @type String[]
        * @default ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        */ 
        cfg.addProperty(DEF_CFG.MONTHS_LONG.key,  { value:DEF_CFG.MONTHS_LONG.value, handler:this.configLocale } );

        /**
        * The 1-character weekday labels for the current locale.
        * @config WEEKDAYS_1CHAR
        * @type String[]
        * @default ["S", "M", "T", "W", "T", "F", "S"]
        */ 
        cfg.addProperty(DEF_CFG.WEEKDAYS_1CHAR.key, { value:DEF_CFG.WEEKDAYS_1CHAR.value, handler:this.configLocale } );
        
        /**
        * The short weekday labels for the current locale.
        * @config WEEKDAYS_SHORT
        * @type String[]
        * @default ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
        */ 
        cfg.addProperty(DEF_CFG.WEEKDAYS_SHORT.key, { value:DEF_CFG.WEEKDAYS_SHORT.value, handler:this.configLocale } );
        
        /**
        * The medium weekday labels for the current locale.
        * @config WEEKDAYS_MEDIUM
        * @type String[]
        * @default ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        */ 
        cfg.addProperty(DEF_CFG.WEEKDAYS_MEDIUM.key, { value:DEF_CFG.WEEKDAYS_MEDIUM.value, handler:this.configLocale } );
        
        /**
        * The long weekday labels for the current locale.
        * @config WEEKDAYS_LONG
        * @type String[]
        * @default ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        */ 
        cfg.addProperty(DEF_CFG.WEEKDAYS_LONG.key, { value:DEF_CFG.WEEKDAYS_LONG.value, handler:this.configLocale } );

        /**
        * Refreshes the locale values used to build the Calendar.
        * @method refreshLocale
        * @private
        */
        var refreshLocale = function() {
            cfg.refireEvent(DEF_CFG.LOCALE_MONTHS.key);
            cfg.refireEvent(DEF_CFG.LOCALE_WEEKDAYS.key);
        };
    
        cfg.subscribeToConfigEvent(DEF_CFG.START_WEEKDAY.key, refreshLocale, this, true);
        cfg.subscribeToConfigEvent(DEF_CFG.MONTHS_SHORT.key, refreshLocale, this, true);
        cfg.subscribeToConfigEvent(DEF_CFG.MONTHS_LONG.key, refreshLocale, this, true);
        cfg.subscribeToConfigEvent(DEF_CFG.WEEKDAYS_1CHAR.key, refreshLocale, this, true);
        cfg.subscribeToConfigEvent(DEF_CFG.WEEKDAYS_SHORT.key, refreshLocale, this, true);
        cfg.subscribeToConfigEvent(DEF_CFG.WEEKDAYS_MEDIUM.key, refreshLocale, this, true);
        cfg.subscribeToConfigEvent(DEF_CFG.WEEKDAYS_LONG.key, refreshLocale, this, true);
       
        /**
        * The setting that determines which length of month labels should be used. Possible values are "short" and "long".
        * @config LOCALE_MONTHS
        * @type String
        * @default "long"
        */ 
        cfg.addProperty(DEF_CFG.LOCALE_MONTHS.key, { value:DEF_CFG.LOCALE_MONTHS.value, handler:this.configLocaleValues } );
        
        /**
        * The setting that determines which length of weekday labels should be used. Possible values are "1char", "short", "medium", and "long".
        * @config LOCALE_WEEKDAYS
        * @type String
        * @default "short"
        */ 
        cfg.addProperty(DEF_CFG.LOCALE_WEEKDAYS.key, { value:DEF_CFG.LOCALE_WEEKDAYS.value, handler:this.configLocaleValues } );

        /**
        * The positive or negative year offset from the Gregorian calendar year (assuming a January 1st rollover) to 
        * be used when displaying and parsing dates. NOTE: All JS Date objects returned by methods, or expected as input by
        * methods will always represent the Gregorian year, in order to maintain date/month/week values. 
        *
        * @config YEAR_OFFSET
        * @type Number
        * @default 0
        */
        cfg.addProperty(DEF_CFG.YEAR_OFFSET.key, { value:DEF_CFG.YEAR_OFFSET.value, supercedes:DEF_CFG.YEAR_OFFSET.supercedes, handler:this.configLocale  } );
    
        /**
        * The value used to delimit individual dates in a date string passed to various Calendar functions.
        * @config DATE_DELIMITER
        * @type String
        * @default ","
        */ 
        cfg.addProperty(DEF_CFG.DATE_DELIMITER.key,  { value:DEF_CFG.DATE_DELIMITER.value, handler:this.configLocale } );
    
        /**
        * The value used to delimit date fields in a date string passed to various Calendar functions.
        * @config DATE_FIELD_DELIMITER
        * @type String
        * @default "/"
        */ 
        cfg.addProperty(DEF_CFG.DATE_FIELD_DELIMITER.key, { value:DEF_CFG.DATE_FIELD_DELIMITER.value, handler:this.configLocale } );
    
        /**
        * The value used to delimit date ranges in a date string passed to various Calendar functions.
        * @config DATE_RANGE_DELIMITER
        * @type String
        * @default "-"
        */
        cfg.addProperty(DEF_CFG.DATE_RANGE_DELIMITER.key, { value:DEF_CFG.DATE_RANGE_DELIMITER.value, handler:this.configLocale } );
    
        /**
        * The position of the month in a month/year date string
        * @config MY_MONTH_POSITION
        * @type Number
        * @default 1
        */
        cfg.addProperty(DEF_CFG.MY_MONTH_POSITION.key, { value:DEF_CFG.MY_MONTH_POSITION.value, handler:this.configLocale, validator:cfg.checkNumber } );
    
        /**
        * The position of the year in a month/year date string
        * @config MY_YEAR_POSITION
        * @type Number
        * @default 2
        */
        cfg.addProperty(DEF_CFG.MY_YEAR_POSITION.key, { value:DEF_CFG.MY_YEAR_POSITION.value, handler:this.configLocale, validator:cfg.checkNumber } );
    
        /**
        * The position of the month in a month/day date string
        * @config MD_MONTH_POSITION
        * @type Number
        * @default 1
        */
        cfg.addProperty(DEF_CFG.MD_MONTH_POSITION.key, { value:DEF_CFG.MD_MONTH_POSITION.value, handler:this.configLocale, validator:cfg.checkNumber } );
    
        /**
        * The position of the day in a month/year date string
        * @config MD_DAY_POSITION
        * @type Number
        * @default 2
        */
        cfg.addProperty(DEF_CFG.MD_DAY_POSITION.key,  { value:DEF_CFG.MD_DAY_POSITION.value, handler:this.configLocale, validator:cfg.checkNumber } );
    
        /**
        * The position of the month in a month/day/year date string
        * @config MDY_MONTH_POSITION
        * @type Number
        * @default 1
        */
        cfg.addProperty(DEF_CFG.MDY_MONTH_POSITION.key, { value:DEF_CFG.MDY_MONTH_POSITION.value, handler:this.configLocale, validator:cfg.checkNumber } );
    
        /**
        * The position of the day in a month/day/year date string
        * @config MDY_DAY_POSITION
        * @type Number
        * @default 2
        */
        cfg.addProperty(DEF_CFG.MDY_DAY_POSITION.key, { value:DEF_CFG.MDY_DAY_POSITION.value, handler:this.configLocale, validator:cfg.checkNumber } );
    
        /**
        * The position of the year in a month/day/year date string
        * @config MDY_YEAR_POSITION
        * @type Number
        * @default 3
        */
        cfg.addProperty(DEF_CFG.MDY_YEAR_POSITION.key, { value:DEF_CFG.MDY_YEAR_POSITION.value, handler:this.configLocale, validator:cfg.checkNumber } );
        
        /**
        * The position of the month in the month year label string used as the Calendar header
        * @config MY_LABEL_MONTH_POSITION
        * @type Number
        * @default 1
        */
        cfg.addProperty(DEF_CFG.MY_LABEL_MONTH_POSITION.key, { value:DEF_CFG.MY_LABEL_MONTH_POSITION.value, handler:this.configLocale, validator:cfg.checkNumber } );
    
        /**
        * The position of the year in the month year label string used as the Calendar header
        * @config MY_LABEL_YEAR_POSITION
        * @type Number
        * @default 2
        */
        cfg.addProperty(DEF_CFG.MY_LABEL_YEAR_POSITION.key, { value:DEF_CFG.MY_LABEL_YEAR_POSITION.value, handler:this.configLocale, validator:cfg.checkNumber } );
        
        /**
        * The suffix used after the month when rendering the Calendar header
        * @config MY_LABEL_MONTH_SUFFIX
        * @type String
        * @default " "
        */
        cfg.addProperty(DEF_CFG.MY_LABEL_MONTH_SUFFIX.key, { value:DEF_CFG.MY_LABEL_MONTH_SUFFIX.value, handler:this.configLocale } );
        
        /**
        * The suffix used after the year when rendering the Calendar header
        * @config MY_LABEL_YEAR_SUFFIX
        * @type String
        * @default ""
        */
        cfg.addProperty(DEF_CFG.MY_LABEL_YEAR_SUFFIX.key, { value:DEF_CFG.MY_LABEL_YEAR_SUFFIX.value, handler:this.configLocale } );

        /**
        * Configuration for the Month/Year CalendarNavigator UI which allows the user to jump directly to a 
        * specific Month/Year without having to scroll sequentially through months.
        * <p>
        * Setting this property to null (default value) or false, will disable the CalendarNavigator UI.
        * </p>
        * <p>
        * Setting this property to true will enable the CalendarNavigatior UI with the default CalendarNavigator configuration values.
        * </p>
        * <p>
        * This property can also be set to an object literal containing configuration properties for the CalendarNavigator UI.
        * The configuration object expects the the following case-sensitive properties, with the "strings" property being a nested object.
        * Any properties which are not provided will use the default values (defined in the CalendarNavigator class).
        * </p>
        * <dl>
        * <dt>strings</dt>
        * <dd><em>Object</em> :  An object with the properties shown below, defining the string labels to use in the Navigator's UI
        *     <dl>
        *         <dt>month</dt><dd><em>String</em> : The string to use for the month label. Defaults to "Month".</dd>
        *         <dt>year</dt><dd><em>String</em> : The string to use for the year label. Defaults to "Year".</dd>
        *         <dt>submit</dt><dd><em>String</em> : The string to use for the submit button label. Defaults to "Okay".</dd>
        *         <dt>cancel</dt><dd><em>String</em> : The string to use for the cancel button label. Defaults to "Cancel".</dd>
        *         <dt>invalidYear</dt><dd><em>String</em> : The string to use for invalid year values. Defaults to "Year needs to be a number".</dd>
        *     </dl>
        * </dd>
        * <dt>monthFormat</dt><dd><em>String</em> : The month format to use. Either YAHOO.widget.Calendar.LONG, or YAHOO.widget.Calendar.SHORT. Defaults to YAHOO.widget.Calendar.LONG</dd>
        * <dt>initialFocus</dt><dd><em>String</em> : Either "year" or "month" specifying which input control should get initial focus. Defaults to "year"</dd>
        * </dl>
        * <p>E.g.</p>
        * <pre>
        * var navConfig = {
        *   strings: {
        *    month:"Calendar Month",
        *    year:"Calendar Year",
        *    submit: "Submit",
        *    cancel: "Cancel",
        *    invalidYear: "Please enter a valid year"
        *   },
        *   monthFormat: YAHOO.widget.Calendar.SHORT,
        *   initialFocus: "month"
        * }
        * </pre>
        * @config navigator
        * @type {Object|Boolean}
        * @default null
        */
        cfg.addProperty(DEF_CFG.NAV.key, { value:DEF_CFG.NAV.value, handler:this.configNavigator } );

        /**
         * The map of UI strings which the Calendar UI uses.
         *
         * @config strings
         * @type {Object}
         * @default An object with the properties shown below:
         *     <dl>
         *         <dt>previousMonth</dt><dd><em>String</em> : The string to use for the "Previous Month" navigation UI. Defaults to "Previous Month".</dd>
         *         <dt>nextMonth</dt><dd><em>String</em> : The string to use for the "Next Month" navigation UI. Defaults to "Next Month".</dd>
         *         <dt>close</dt><dd><em>String</em> : The string to use for the close button label. Defaults to "Close".</dd>
         *     </dl>
         */
        cfg.addProperty(DEF_CFG.STRINGS.key, { 
            value:DEF_CFG.STRINGS.value,
            handler:this.configStrings,
            validator: function(val) {
                return Lang.isObject(val);
            },
            supercedes:DEF_CFG.STRINGS.supercedes
        });
    },

    /**
    * The default handler for the "strings" property
    * @method configStrings
    */
    configStrings : function(type, args, obj) {
        var val = Lang.merge(DEF_CFG.STRINGS.value, args[0]);
        this.cfg.setProperty(DEF_CFG.STRINGS.key, val, true);
    },

    /**
    * The default handler for the "pagedate" property
    * @method configPageDate
    */
    configPageDate : function(type, args, obj) {
        this.cfg.setProperty(DEF_CFG.PAGEDATE.key, this._parsePageDate(args[0]), true);
    },

    /**
    * The default handler for the "mindate" property
    * @method configMinDate
    */
    configMinDate : function(type, args, obj) {
        var val = args[0];
        if (Lang.isString(val)) {
            val = this._parseDate(val);
            this.cfg.setProperty(DEF_CFG.MINDATE.key, DateMath.getDate(val[0],(val[1]-1),val[2]));
        }
    },

    /**
    * The default handler for the "maxdate" property
    * @method configMaxDate
    */
    configMaxDate : function(type, args, obj) {
        var val = args[0];
        if (Lang.isString(val)) {
            val = this._parseDate(val);
            this.cfg.setProperty(DEF_CFG.MAXDATE.key, DateMath.getDate(val[0],(val[1]-1),val[2]));
        }
    },

    /**
    * The default handler for the "today" property
    * @method configToday
    */
    configToday : function(type, args, obj) {
        // Only do this for initial set. Changing the today property after the initial
        // set, doesn't affect pagedate
        var val = args[0];
        if (Lang.isString(val)) {
            val = this._parseDate(val);
        }
        var today = DateMath.clearTime(val);
        if (!this.cfg.initialConfig[DEF_CFG.PAGEDATE.key]) {
            this.cfg.setProperty(DEF_CFG.PAGEDATE.key, today);
        }
        this.today = today;
        this.cfg.setProperty(DEF_CFG.TODAY.key, today, true);
    },

    /**
    * The default handler for the "selected" property
    * @method configSelected
    */
    configSelected : function(type, args, obj) {
        var selected = args[0],
            cfgSelected = DEF_CFG.SELECTED.key;
        
        if (selected) {
            if (Lang.isString(selected)) {
                this.cfg.setProperty(cfgSelected, this._parseDates(selected), true);
            } 
        }
        if (! this._selectedDates) {
            this._selectedDates = this.cfg.getProperty(cfgSelected);
        }
    },
    
    /**
    * The default handler for all configuration options properties
    * @method configOptions
    */
    configOptions : function(type, args, obj) {
        this.Options[type.toUpperCase()] = args[0];
    },

    /**
    * The default handler for all configuration locale properties
    * @method configLocale
    */
    configLocale : function(type, args, obj) {
        this.Locale[type.toUpperCase()] = args[0];

        this.cfg.refireEvent(DEF_CFG.LOCALE_MONTHS.key);
        this.cfg.refireEvent(DEF_CFG.LOCALE_WEEKDAYS.key);
    },
    
    /**
    * The default handler for all configuration locale field length properties
    * @method configLocaleValues
    */
    configLocaleValues : function(type, args, obj) {

        type = type.toLowerCase();

        var val = args[0],
            cfg = this.cfg,
            Locale = this.Locale;

        switch (type) {
            case DEF_CFG.LOCALE_MONTHS.key:
                switch (val) {
                    case Calendar.SHORT:
                        Locale.LOCALE_MONTHS = cfg.getProperty(DEF_CFG.MONTHS_SHORT.key).concat();
                        break;
                    case Calendar.LONG:
                        Locale.LOCALE_MONTHS = cfg.getProperty(DEF_CFG.MONTHS_LONG.key).concat();
                        break;
                }
                break;
            case DEF_CFG.LOCALE_WEEKDAYS.key:
                switch (val) {
                    case Calendar.ONE_CHAR:
                        Locale.LOCALE_WEEKDAYS = cfg.getProperty(DEF_CFG.WEEKDAYS_1CHAR.key).concat();
                        break;
                    case Calendar.SHORT:
                        Locale.LOCALE_WEEKDAYS = cfg.getProperty(DEF_CFG.WEEKDAYS_SHORT.key).concat();
                        break;
                    case Calendar.MEDIUM:
                        Locale.LOCALE_WEEKDAYS = cfg.getProperty(DEF_CFG.WEEKDAYS_MEDIUM.key).concat();
                        break;
                    case Calendar.LONG:
                        Locale.LOCALE_WEEKDAYS = cfg.getProperty(DEF_CFG.WEEKDAYS_LONG.key).concat();
                        break;
                }
                
                var START_WEEKDAY = cfg.getProperty(DEF_CFG.START_WEEKDAY.key);
    
                if (START_WEEKDAY > 0) {
                    for (var w=0; w < START_WEEKDAY; ++w) {
                        Locale.LOCALE_WEEKDAYS.push(Locale.LOCALE_WEEKDAYS.shift());
                    }
                }
                break;
        }
    },

    /**
     * The default handler for the "navigator" property
     * @method configNavigator
     */
    configNavigator : function(type, args, obj) {
        var val = args[0];
        if (YAHOO.widget.CalendarNavigator && (val === true || Lang.isObject(val))) {
            if (!this.oNavigator) {
                this.oNavigator = new YAHOO.widget.CalendarNavigator(this);
                // Cleanup DOM Refs/Events before innerHTML is removed.
                this.beforeRenderEvent.subscribe(function () {
                    if (!this.pages) {
                        this.oNavigator.erase();
                    }
                }, this, true);
            }
        } else {
            if (this.oNavigator) {
                this.oNavigator.destroy();
                this.oNavigator = null;
            }
        }
    },

    /**
    * Defines the style constants for the Calendar
    * @method initStyles
    */
    initStyles : function() {

        var defStyle = Calendar.STYLES;

        this.Style = {
            /**
            * @property Style.CSS_ROW_HEADER
            */
            CSS_ROW_HEADER: defStyle.CSS_ROW_HEADER,
            /**
            * @property Style.CSS_ROW_FOOTER
            */
            CSS_ROW_FOOTER: defStyle.CSS_ROW_FOOTER,
            /**
            * @property Style.CSS_CELL
            */
            CSS_CELL : defStyle.CSS_CELL,
            /**
            * @property Style.CSS_CELL_SELECTOR
            */
            CSS_CELL_SELECTOR : defStyle.CSS_CELL_SELECTOR,
            /**
            * @property Style.CSS_CELL_SELECTED
            */
            CSS_CELL_SELECTED : defStyle.CSS_CELL_SELECTED,
            /**
            * @property Style.CSS_CELL_SELECTABLE
            */
            CSS_CELL_SELECTABLE : defStyle.CSS_CELL_SELECTABLE,
            /**
            * @property Style.CSS_CELL_RESTRICTED
            */
            CSS_CELL_RESTRICTED : defStyle.CSS_CELL_RESTRICTED,
            /**
            * @property Style.CSS_CELL_TODAY
            */
            CSS_CELL_TODAY : defStyle.CSS_CELL_TODAY,
            /**
            * @property Style.CSS_CELL_OOM
            */
            CSS_CELL_OOM : defStyle.CSS_CELL_OOM,
            /**
            * @property Style.CSS_CELL_OOB
            */
            CSS_CELL_OOB : defStyle.CSS_CELL_OOB,
            /**
            * @property Style.CSS_HEADER
            */
            CSS_HEADER : defStyle.CSS_HEADER,
            /**
            * @property Style.CSS_HEADER_TEXT
            */
            CSS_HEADER_TEXT : defStyle.CSS_HEADER_TEXT,
            /**
            * @property Style.CSS_BODY
            */
            CSS_BODY : defStyle.CSS_BODY,
            /**
            * @property Style.CSS_WEEKDAY_CELL
            */
            CSS_WEEKDAY_CELL : defStyle.CSS_WEEKDAY_CELL,
            /**
            * @property Style.CSS_WEEKDAY_ROW
            */
            CSS_WEEKDAY_ROW : defStyle.CSS_WEEKDAY_ROW,
            /**
            * @property Style.CSS_FOOTER
            */
            CSS_FOOTER : defStyle.CSS_FOOTER,
            /**
            * @property Style.CSS_CALENDAR
            */
            CSS_CALENDAR : defStyle.CSS_CALENDAR,
            /**
            * @property Style.CSS_SINGLE
            */
            CSS_SINGLE : defStyle.CSS_SINGLE,
            /**
            * @property Style.CSS_CONTAINER
            */
            CSS_CONTAINER : defStyle.CSS_CONTAINER,
            /**
            * @property Style.CSS_NAV_LEFT
            */
            CSS_NAV_LEFT : defStyle.CSS_NAV_LEFT,
            /**
            * @property Style.CSS_NAV_RIGHT
            */
            CSS_NAV_RIGHT : defStyle.CSS_NAV_RIGHT,
            /**
            * @property Style.CSS_NAV
            */
            CSS_NAV : defStyle.CSS_NAV,
            /**
            * @property Style.CSS_CLOSE
            */
            CSS_CLOSE : defStyle.CSS_CLOSE,
            /**
            * @property Style.CSS_CELL_TOP
            */
            CSS_CELL_TOP : defStyle.CSS_CELL_TOP,
            /**
            * @property Style.CSS_CELL_LEFT
            */
            CSS_CELL_LEFT : defStyle.CSS_CELL_LEFT,
            /**
            * @property Style.CSS_CELL_RIGHT
            */
            CSS_CELL_RIGHT : defStyle.CSS_CELL_RIGHT,
            /**
            * @property Style.CSS_CELL_BOTTOM
            */
            CSS_CELL_BOTTOM : defStyle.CSS_CELL_BOTTOM,
            /**
            * @property Style.CSS_CELL_HOVER
            */
            CSS_CELL_HOVER : defStyle.CSS_CELL_HOVER,
            /**
            * @property Style.CSS_CELL_HIGHLIGHT1
            */
            CSS_CELL_HIGHLIGHT1 : defStyle.CSS_CELL_HIGHLIGHT1,
            /**
            * @property Style.CSS_CELL_HIGHLIGHT2
            */
            CSS_CELL_HIGHLIGHT2 : defStyle.CSS_CELL_HIGHLIGHT2,
            /**
            * @property Style.CSS_CELL_HIGHLIGHT3
            */
            CSS_CELL_HIGHLIGHT3 : defStyle.CSS_CELL_HIGHLIGHT3,
            /**
            * @property Style.CSS_CELL_HIGHLIGHT4
            */
            CSS_CELL_HIGHLIGHT4 : defStyle.CSS_CELL_HIGHLIGHT4,
            /**
             * @property Style.CSS_WITH_TITLE
             */
            CSS_WITH_TITLE : defStyle.CSS_WITH_TITLE,
             /**
             * @property Style.CSS_FIXED_SIZE
             */
            CSS_FIXED_SIZE : defStyle.CSS_FIXED_SIZE,
             /**
             * @property Style.CSS_LINK_CLOSE
             */
            CSS_LINK_CLOSE : defStyle.CSS_LINK_CLOSE
        };
    },

    /**
    * Builds the date label that will be displayed in the calendar header or
    * footer, depending on configuration.
    * @method buildMonthLabel
    * @return {String} The formatted calendar month label
    */
    buildMonthLabel : function() {
        return this._buildMonthLabel(this.cfg.getProperty(DEF_CFG.PAGEDATE.key));
    },

    /**
     * Helper method, to format a Month Year string, given a JavaScript Date, based on the 
     * Calendar localization settings
     * 
     * @method _buildMonthLabel
     * @private
     * @param {Date} date
     * @return {String} Formated month, year string
     */
    _buildMonthLabel : function(date) {
        var monthLabel  = this.Locale.LOCALE_MONTHS[date.getMonth()] + this.Locale.MY_LABEL_MONTH_SUFFIX,
            yearLabel = (date.getFullYear() + this.Locale.YEAR_OFFSET) + this.Locale.MY_LABEL_YEAR_SUFFIX;

        if (this.Locale.MY_LABEL_MONTH_POSITION == 2 || this.Locale.MY_LABEL_YEAR_POSITION == 1) {
            return yearLabel + monthLabel;
        } else {
            return monthLabel + yearLabel;
        }
    },
    
    /**
    * Builds the date digit that will be displayed in calendar cells
    * @method buildDayLabel
    * @param {Date} workingDate The current working date
    * @return {String} The formatted day label
    */
    buildDayLabel : function(workingDate) {
        return workingDate.getDate();
    },
    
    /**
     * Creates the title bar element and adds it to Calendar container DIV
     * 
     * @method createTitleBar
     * @param {String} strTitle The title to display in the title bar
     * @return The title bar element
     */
    createTitleBar : function(strTitle) {
        var tDiv = Dom.getElementsByClassName(YAHOO.widget.CalendarGroup.CSS_2UPTITLE, "div", this.oDomContainer)[0] || document.createElement("div");
        tDiv.className = YAHOO.widget.CalendarGroup.CSS_2UPTITLE;
        tDiv.innerHTML = strTitle;
        this.oDomContainer.insertBefore(tDiv, this.oDomContainer.firstChild);
    
        Dom.addClass(this.oDomContainer, this.Style.CSS_WITH_TITLE);
    
        return tDiv;
    },
    
    /**
     * Removes the title bar element from the DOM
     * 
     * @method removeTitleBar
     */
    removeTitleBar : function() {
        var tDiv = Dom.getElementsByClassName(YAHOO.widget.CalendarGroup.CSS_2UPTITLE, "div", this.oDomContainer)[0] || null;
        if (tDiv) {
            Event.purgeElement(tDiv);
            this.oDomContainer.removeChild(tDiv);
        }
        Dom.removeClass(this.oDomContainer, this.Style.CSS_WITH_TITLE);
    },
    
    /**
     * Creates the close button HTML element and adds it to Calendar container DIV
     * 
     * @method createCloseButton
     * @return The close HTML element created
     */
    createCloseButton : function() {
        var cssClose = YAHOO.widget.CalendarGroup.CSS_2UPCLOSE,
            cssLinkClose = this.Style.CSS_LINK_CLOSE,
            DEPR_CLOSE_PATH = "us/my/bn/x_d.gif",
            
            lnk = Dom.getElementsByClassName(cssLinkClose, "a", this.oDomContainer)[0],
            strings = this.cfg.getProperty(DEF_CFG.STRINGS.key),
            closeStr = (strings && strings.close) ? strings.close : "";

        if (!lnk) {
            lnk = document.createElement("a");
            Event.addListener(lnk, "click", function(e, cal) {
                cal.hide(); 
                Event.preventDefault(e);
            }, this);
        }

        lnk.href = "#";
        lnk.className = cssLinkClose;

        if (Calendar.IMG_ROOT !== null) {
            var img = Dom.getElementsByClassName(cssClose, "img", lnk)[0] || document.createElement("img");
            img.src = Calendar.IMG_ROOT + DEPR_CLOSE_PATH;
            img.className = cssClose;
            lnk.appendChild(img);
        } else {
            lnk.innerHTML = '<span class="' + cssClose + ' ' + this.Style.CSS_CLOSE + '">' + closeStr + '</span>';
        }
        this.oDomContainer.appendChild(lnk);

        return lnk;
    },
    
    /**
     * Removes the close button HTML element from the DOM
     * 
     * @method removeCloseButton
     */
    removeCloseButton : function() {
        var btn = Dom.getElementsByClassName(this.Style.CSS_LINK_CLOSE, "a", this.oDomContainer)[0] || null;
        if (btn) {
            Event.purgeElement(btn);
            this.oDomContainer.removeChild(btn);
        }
    },

    /**
    * Renders the calendar header.
    * @method renderHeader
    * @param {Array} html The current working HTML array
    * @return {Array} The current working HTML array
    */
    renderHeader : function(html) {


        var colSpan = 7,
            DEPR_NAV_LEFT = "us/tr/callt.gif",
            DEPR_NAV_RIGHT = "us/tr/calrt.gif",
            cfg = this.cfg,
            pageDate = cfg.getProperty(DEF_CFG.PAGEDATE.key),
            strings= cfg.getProperty(DEF_CFG.STRINGS.key),
            prevStr = (strings && strings.previousMonth) ?  strings.previousMonth : "",
            nextStr = (strings && strings.nextMonth) ? strings.nextMonth : "",
            monthLabel;

        if (cfg.getProperty(DEF_CFG.SHOW_WEEK_HEADER.key)) {
            colSpan += 1;
        }
    
        if (cfg.getProperty(DEF_CFG.SHOW_WEEK_FOOTER.key)) {
            colSpan += 1;
        }

        html[html.length] = "<thead>";
        html[html.length] =  "<tr>";
        html[html.length] =   '<th colspan="' + colSpan + '" class="' + this.Style.CSS_HEADER_TEXT + '">';
        html[html.length] =    '<div class="' + this.Style.CSS_HEADER + '">';

        var renderLeft, renderRight = false;

        if (this.parent) {
            if (this.index === 0) {
                renderLeft = true;
            }
            if (this.index == (this.parent.cfg.getProperty("pages") -1)) {
                renderRight = true;
            }
        } else {
            renderLeft = true;
            renderRight = true;
        }

        if (renderLeft) {
            monthLabel  = this._buildMonthLabel(DateMath.subtract(pageDate, DateMath.MONTH, 1));

            var leftArrow = cfg.getProperty(DEF_CFG.NAV_ARROW_LEFT.key);
            // Check for deprecated customization - If someone set IMG_ROOT, but didn't set NAV_ARROW_LEFT, then set NAV_ARROW_LEFT to the old deprecated value
            if (leftArrow === null && Calendar.IMG_ROOT !== null) {
                leftArrow = Calendar.IMG_ROOT + DEPR_NAV_LEFT;
            }
            var leftStyle = (leftArrow === null) ? "" : ' style="background-image:url(' + leftArrow + ')"';
            html[html.length] = '<a class="' + this.Style.CSS_NAV_LEFT + '"' + leftStyle + ' href="#">' + prevStr + ' (' + monthLabel + ')' + '</a>';
        }

        var lbl = this.buildMonthLabel();
        var cal = this.parent || this;
        if (cal.cfg.getProperty("navigator")) {
            lbl = "<a class=\"" + this.Style.CSS_NAV + "\" href=\"#\">" + lbl + "</a>";
        }
        html[html.length] = lbl;

        if (renderRight) {
            monthLabel  = this._buildMonthLabel(DateMath.add(pageDate, DateMath.MONTH, 1));

            var rightArrow = cfg.getProperty(DEF_CFG.NAV_ARROW_RIGHT.key);
            if (rightArrow === null && Calendar.IMG_ROOT !== null) {
                rightArrow = Calendar.IMG_ROOT + DEPR_NAV_RIGHT;
            }
            var rightStyle = (rightArrow === null) ? "" : ' style="background-image:url(' + rightArrow + ')"';
            html[html.length] = '<a class="' + this.Style.CSS_NAV_RIGHT + '"' + rightStyle + ' href="#">' + nextStr + ' (' + monthLabel + ')' + '</a>';
        }

        html[html.length] = '</div>\n</th>\n</tr>';

        if (cfg.getProperty(DEF_CFG.SHOW_WEEKDAYS.key)) {
            html = this.buildWeekdays(html);
        }
        
        html[html.length] = '</thead>';
    
        return html;
    },
    
    /**
    * Renders the Calendar's weekday headers.
    * @method buildWeekdays
    * @param {Array} html The current working HTML array
    * @return {Array} The current working HTML array
    */
    buildWeekdays : function(html) {

        html[html.length] = '<tr class="' + this.Style.CSS_WEEKDAY_ROW + '">';

        if (this.cfg.getProperty(DEF_CFG.SHOW_WEEK_HEADER.key)) {
            html[html.length] = '<th>&#160;</th>';
        }

        for(var i=0;i < this.Locale.LOCALE_WEEKDAYS.length; ++i) {
            html[html.length] = '<th class="' + this.Style.CSS_WEEKDAY_CELL + '">' + this.Locale.LOCALE_WEEKDAYS[i] + '</th>';
        }

        if (this.cfg.getProperty(DEF_CFG.SHOW_WEEK_FOOTER.key)) {
            html[html.length] = '<th>&#160;</th>';
        }

        html[html.length] = '</tr>';

        return html;
    },
    
    /**
    * Renders the calendar body.
    * @method renderBody
    * @param {Date} workingDate The current working Date being used for the render process
    * @param {Array} html The current working HTML array
    * @return {Array} The current working HTML array
    */
    renderBody : function(workingDate, html) {

        var startDay = this.cfg.getProperty(DEF_CFG.START_WEEKDAY.key);

        this.preMonthDays = workingDate.getDay();
        if (startDay > 0) {
            this.preMonthDays -= startDay;
        }
        if (this.preMonthDays < 0) {
            this.preMonthDays += 7;
        }

        this.monthDays = DateMath.findMonthEnd(workingDate).getDate();
        this.postMonthDays = Calendar.DISPLAY_DAYS-this.preMonthDays-this.monthDays;


        workingDate = DateMath.subtract(workingDate, DateMath.DAY, this.preMonthDays);
    
        var weekNum,
            weekClass,
            weekPrefix = "w",
            cellPrefix = "_cell",
            workingDayPrefix = "wd",
            dayPrefix = "d",
            cellRenderers,
            renderer,
            t = this.today,
            cfg = this.cfg,
            todayYear = t.getFullYear(),
            todayMonth = t.getMonth(),
            todayDate = t.getDate(),
            useDate = cfg.getProperty(DEF_CFG.PAGEDATE.key),
            hideBlankWeeks = cfg.getProperty(DEF_CFG.HIDE_BLANK_WEEKS.key),
            showWeekFooter = cfg.getProperty(DEF_CFG.SHOW_WEEK_FOOTER.key),
            showWeekHeader = cfg.getProperty(DEF_CFG.SHOW_WEEK_HEADER.key),
            mindate = cfg.getProperty(DEF_CFG.MINDATE.key),
            maxdate = cfg.getProperty(DEF_CFG.MAXDATE.key),
            yearOffset = this.Locale.YEAR_OFFSET;

        if (mindate) {
            mindate = DateMath.clearTime(mindate);
        }
        if (maxdate) {
            maxdate = DateMath.clearTime(maxdate);
        }

        html[html.length] = '<tbody class="m' + (useDate.getMonth()+1) + ' ' + this.Style.CSS_BODY + '">';

        var i = 0,
            tempDiv = document.createElement("div"),
            cell = document.createElement("td");

        tempDiv.appendChild(cell);

        var cal = this.parent || this;

        for (var r=0;r<6;r++) {
            weekNum = DateMath.getWeekNumber(workingDate, startDay);
            weekClass = weekPrefix + weekNum;

            // Local OOM check for performance, since we already have pagedate
            if (r !== 0 && hideBlankWeeks === true && workingDate.getMonth() != useDate.getMonth()) {
                break;
            } else {
                html[html.length] = '<tr class="' + weekClass + '">';

                if (showWeekHeader) { html = this.renderRowHeader(weekNum, html); }

                for (var d=0; d < 7; d++){ // Render actual days

                    cellRenderers = [];

                    this.clearElement(cell);
                    cell.className = this.Style.CSS_CELL;
                    cell.id = this.id + cellPrefix + i;

                    if (workingDate.getDate()  == todayDate && 
                        workingDate.getMonth()  == todayMonth &&
                        workingDate.getFullYear() == todayYear) {
                        cellRenderers[cellRenderers.length]=cal.renderCellStyleToday;
                    }

                    var workingArray = [workingDate.getFullYear(),workingDate.getMonth()+1,workingDate.getDate()];
                    this.cellDates[this.cellDates.length] = workingArray; // Add this date to cellDates

                    // Local OOM check for performance, since we already have pagedate
                    if (workingDate.getMonth() != useDate.getMonth()) {
                        cellRenderers[cellRenderers.length]=cal.renderCellNotThisMonth;
                    } else {
                        Dom.addClass(cell, workingDayPrefix + workingDate.getDay());
                        Dom.addClass(cell, dayPrefix + workingDate.getDate());

                        for (var s=0;s<this.renderStack.length;++s) {

                            renderer = null;

                            var rArray = this.renderStack[s],
                                type = rArray[0],
                                month,
                                day,
                                year;

                            switch (type) {
                                case Calendar.DATE:
                                    month = rArray[1][1];
                                    day = rArray[1][2];
                                    year = rArray[1][0];

                                    if (workingDate.getMonth()+1 == month && workingDate.getDate() == day && workingDate.getFullYear() == year) {
                                        renderer = rArray[2];
                                        this.renderStack.splice(s,1);
                                    }
                                    break;
                                case Calendar.MONTH_DAY:
                                    month = rArray[1][0];
                                    day = rArray[1][1];

                                    if (workingDate.getMonth()+1 == month && workingDate.getDate() == day) {
                                        renderer = rArray[2];
                                        this.renderStack.splice(s,1);
                                    }
                                    break;
                                case Calendar.RANGE:
                                    var date1 = rArray[1][0],
                                        date2 = rArray[1][1],
                                        d1month = date1[1],
                                        d1day = date1[2],
                                        d1year = date1[0],
                                        d1 = DateMath.getDate(d1year, d1month-1, d1day),
                                        d2month = date2[1],
                                        d2day = date2[2],
                                        d2year = date2[0],
                                        d2 = DateMath.getDate(d2year, d2month-1, d2day);

                                    if (workingDate.getTime() >= d1.getTime() && workingDate.getTime() <= d2.getTime()) {
                                        renderer = rArray[2];

                                        if (workingDate.getTime()==d2.getTime()) { 
                                            this.renderStack.splice(s,1);
                                        }
                                    }
                                    break;
                                case Calendar.WEEKDAY:
                                    var weekday = rArray[1][0];
                                    if (workingDate.getDay()+1 == weekday) {
                                        renderer = rArray[2];
                                    }
                                    break;
                                case Calendar.MONTH:
                                    month = rArray[1][0];
                                    if (workingDate.getMonth()+1 == month) {
                                        renderer = rArray[2];
                                    }
                                    break;
                            }

                            if (renderer) {
                                cellRenderers[cellRenderers.length]=renderer;
                            }
                        }

                    }

                    if (this._indexOfSelectedFieldArray(workingArray) > -1) {
                        cellRenderers[cellRenderers.length]=cal.renderCellStyleSelected; 
                    }

                    if ((mindate && (workingDate.getTime() < mindate.getTime())) ||
                        (maxdate && (workingDate.getTime() > maxdate.getTime()))
                    ) {
                        cellRenderers[cellRenderers.length]=cal.renderOutOfBoundsDate;
                    } else {
                        cellRenderers[cellRenderers.length]=cal.styleCellDefault;
                        cellRenderers[cellRenderers.length]=cal.renderCellDefault; 
                    }

                    for (var x=0; x < cellRenderers.length; ++x) {
                        if (cellRenderers[x].call(cal, workingDate, cell) == Calendar.STOP_RENDER) {
                            break;
                        }
                    }

                    workingDate.setTime(workingDate.getTime() + DateMath.ONE_DAY_MS);
                    // Just in case we crossed DST/Summertime boundaries
                    workingDate = DateMath.clearTime(workingDate);

                    if (i >= 0 && i <= 6) {
                        Dom.addClass(cell, this.Style.CSS_CELL_TOP);
                    }
                    if ((i % 7) === 0) {
                        Dom.addClass(cell, this.Style.CSS_CELL_LEFT);
                    }
                    if (((i+1) % 7) === 0) {
                        Dom.addClass(cell, this.Style.CSS_CELL_RIGHT);
                    }

                    var postDays = this.postMonthDays; 
                    if (hideBlankWeeks && postDays >= 7) {
                        var blankWeeks = Math.floor(postDays/7);
                        for (var p=0;p<blankWeeks;++p) {
                            postDays -= 7;
                        }
                    }
                    
                    if (i >= ((this.preMonthDays+postDays+this.monthDays)-7)) {
                        Dom.addClass(cell, this.Style.CSS_CELL_BOTTOM);
                    }
    
                    html[html.length] = tempDiv.innerHTML;
                    i++;
                }
    
                if (showWeekFooter) { html = this.renderRowFooter(weekNum, html); }
    
                html[html.length] = '</tr>';
            }
        }
    
        html[html.length] = '</tbody>';
    
        return html;
    },
    
    /**
    * Renders the calendar footer. In the default implementation, there is
    * no footer.
    * @method renderFooter
    * @param {Array} html The current working HTML array
    * @return {Array} The current working HTML array
    */
    renderFooter : function(html) { return html; },
    
    /**
    * Renders the calendar after it has been configured. The render() method has a specific call chain that will execute
    * when the method is called: renderHeader, renderBody, renderFooter.
    * Refer to the documentation for those methods for information on 
    * individual render tasks.
    * @method render
    */
    render : function() {
        this.beforeRenderEvent.fire();

        // Find starting day of the current month
        var workingDate = DateMath.findMonthStart(this.cfg.getProperty(DEF_CFG.PAGEDATE.key));

        this.resetRenderers();
        this.cellDates.length = 0;

        Event.purgeElement(this.oDomContainer, true);

        var html = [];

        html[html.length] = '<table cellSpacing="0" class="' + this.Style.CSS_CALENDAR + ' y' + (workingDate.getFullYear() + this.Locale.YEAR_OFFSET) +'" id="' + this.id + '">';
        html = this.renderHeader(html);
        html = this.renderBody(workingDate, html);
        html = this.renderFooter(html);
        html[html.length] = '</table>';

        this.oDomContainer.innerHTML = html.join("\n");

        this.applyListeners();
        this.cells = Dom.getElementsByClassName(this.Style.CSS_CELL, "td", this.id);
    
        this.cfg.refireEvent(DEF_CFG.TITLE.key);
        this.cfg.refireEvent(DEF_CFG.CLOSE.key);
        this.cfg.refireEvent(DEF_CFG.IFRAME.key);

        this.renderEvent.fire();
    },

    /**
    * Applies the Calendar's DOM listeners to applicable elements.
    * @method applyListeners
    */
    applyListeners : function() {
        var root = this.oDomContainer,
            cal = this.parent || this,
            anchor = "a",
            click = "click";

        var linkLeft = Dom.getElementsByClassName(this.Style.CSS_NAV_LEFT, anchor, root),
            linkRight = Dom.getElementsByClassName(this.Style.CSS_NAV_RIGHT, anchor, root);

        if (linkLeft && linkLeft.length > 0) {
            this.linkLeft = linkLeft[0];
            Event.addListener(this.linkLeft, click, this.doPreviousMonthNav, cal, true);
        }

        if (linkRight && linkRight.length > 0) {
            this.linkRight = linkRight[0];
            Event.addListener(this.linkRight, click, this.doNextMonthNav, cal, true);
        }

        if (cal.cfg.getProperty("navigator") !== null) {
            this.applyNavListeners();
        }

        if (this.domEventMap) {
            var el,elements;
            for (var cls in this.domEventMap) { 
                if (Lang.hasOwnProperty(this.domEventMap, cls)) {
                    var items = this.domEventMap[cls];
    
                    if (! (items instanceof Array)) {
                        items = [items];
                    }
    
                    for (var i=0;i<items.length;i++) {
                        var item = items[i];
                        elements = Dom.getElementsByClassName(cls, item.tag, this.oDomContainer);
    
                        for (var c=0;c<elements.length;c++) {
                            el = elements[c];
                             Event.addListener(el, item.event, item.handler, item.scope, item.correct );
                        }
                    }
                }
            }
        }

        Event.addListener(this.oDomContainer, "click", this.doSelectCell, this);
        Event.addListener(this.oDomContainer, "mouseover", this.doCellMouseOver, this);
        Event.addListener(this.oDomContainer, "mouseout", this.doCellMouseOut, this);
    },

    applyNavListeners : function() {
        var calParent = this.parent || this,
            cal = this,
            navBtns = Dom.getElementsByClassName(this.Style.CSS_NAV, "a", this.oDomContainer);

        if (navBtns.length > 0) {

            Event.addListener(navBtns, "click", function (e, obj) {
                var target = Event.getTarget(e);
                // this == navBtn
                if (this === target || Dom.isAncestor(this, target)) {
                    Event.preventDefault(e);
                }
                var navigator = calParent.oNavigator;
                if (navigator) {
                    var pgdate = cal.cfg.getProperty("pagedate");
                    navigator.setYear(pgdate.getFullYear() + cal.Locale.YEAR_OFFSET);
                    navigator.setMonth(pgdate.getMonth());
                    navigator.show();
                }
            });
        }
    },

    /**
    * Retrieves the Date object for the specified Calendar cell
    * @method getDateByCellId
    * @param {String} id The id of the cell
    * @return {Date} The Date object for the specified Calendar cell
    */
    getDateByCellId : function(id) {
        var date = this.getDateFieldsByCellId(id);
        return (date) ? DateMath.getDate(date[0],date[1]-1,date[2]) : null;
    },
    
    /**
    * Retrieves the Date object for the specified Calendar cell
    * @method getDateFieldsByCellId
    * @param {String} id The id of the cell
    * @return {Array} The array of Date fields for the specified Calendar cell
    */
    getDateFieldsByCellId : function(id) {
        id = this.getIndexFromId(id);
        return (id > -1) ? this.cellDates[id] : null;
    },

    /**
     * Find the Calendar's cell index for a given date.
     * If the date is not found, the method returns -1.
     * <p>
     * The returned index can be used to lookup the cell HTMLElement  
     * using the Calendar's cells array or passed to selectCell to select 
     * cells by index. 
     * </p>
     *
     * See <a href="#cells">cells</a>, <a href="#selectCell">selectCell</a>.
     *
     * @method getCellIndex
     * @param {Date} date JavaScript Date object, for which to find a cell index.
     * @return {Number} The index of the date in Calendars cellDates/cells arrays, or -1 if the date 
     * is not on the curently rendered Calendar page.
     */
    getCellIndex : function(date) {
        var idx = -1;
        if (date) {
            var m = date.getMonth(),
                y = date.getFullYear(),
                d = date.getDate(),
                dates = this.cellDates;

            for (var i = 0; i < dates.length; ++i) {
                var cellDate = dates[i];
                if (cellDate[0] === y && cellDate[1] === m+1 && cellDate[2] === d) {
                    idx = i;
                    break;
                }
            }
        }
        return idx;
    },

    /**
     * Given the id used to mark each Calendar cell, this method
     * extracts the index number from the id.
     * 
     * @param {String} strId The cell id
     * @return {Number} The index of the cell, or -1 if id does not contain an index number
     */
    getIndexFromId : function(strId) {
        var idx = -1,
            li = strId.lastIndexOf("_cell");

        if (li > -1) {
            idx = parseInt(strId.substring(li + 5), 10);
        }

        return idx;
    },
    
    // BEGIN BUILT-IN TABLE CELL RENDERERS
    
    /**
    * Renders a cell that falls before the minimum date or after the maximum date.
    * widget class.
    * @method renderOutOfBoundsDate
    * @param {Date}     workingDate  The current working Date object being used to generate the calendar
    * @param {HTMLTableCellElement} cell   The current working cell in the calendar
    * @return {String} YAHOO.widget.Calendar.STOP_RENDER if rendering should stop with this style, null or nothing if rendering
    *   should not be terminated
    */
    renderOutOfBoundsDate : function(workingDate, cell) {
        Dom.addClass(cell, this.Style.CSS_CELL_OOB);
        cell.innerHTML = workingDate.getDate();
        return Calendar.STOP_RENDER;
    },

    /**
    * Renders the row header for a week.
    * @method renderRowHeader
    * @param {Number} weekNum The week number of the current row
    * @param {Array} cell The current working HTML array
    */
    renderRowHeader : function(weekNum, html) {
        html[html.length] = '<th class="' + this.Style.CSS_ROW_HEADER + '">' + weekNum + '</th>';
        return html;
    },

    /**
    * Renders the row footer for a week.
    * @method renderRowFooter
    * @param {Number} weekNum The week number of the current row
    * @param {Array} cell The current working HTML array
    */
    renderRowFooter : function(weekNum, html) {
        html[html.length] = '<th class="' + this.Style.CSS_ROW_FOOTER + '">' + weekNum + '</th>';
        return html;
    },
    
    /**
    * Renders a single standard calendar cell in the calendar widget table.
    * All logic for determining how a standard default cell will be rendered is 
    * encapsulated in this method, and must be accounted for when extending the
    * widget class.
    * @method renderCellDefault
    * @param {Date}     workingDate  The current working Date object being used to generate the calendar
    * @param {HTMLTableCellElement} cell   The current working cell in the calendar
    */
    renderCellDefault : function(workingDate, cell) {
        cell.innerHTML = '<a href="#" class="' + this.Style.CSS_CELL_SELECTOR + '">' + this.buildDayLabel(workingDate) + "</a>";
    },
    
    /**
    * Styles a selectable cell.
    * @method styleCellDefault
    * @param {Date}     workingDate  The current working Date object being used to generate the calendar
    * @param {HTMLTableCellElement} cell   The current working cell in the calendar
    */
    styleCellDefault : function(workingDate, cell) {
        Dom.addClass(cell, this.Style.CSS_CELL_SELECTABLE);
    },
    
    
    /**
    * Renders a single standard calendar cell using the CSS hightlight1 style
    * @method renderCellStyleHighlight1
    * @param {Date}     workingDate  The current working Date object being used to generate the calendar
    * @param {HTMLTableCellElement} cell   The current working cell in the calendar
    */
    renderCellStyleHighlight1 : function(workingDate, cell) {
        Dom.addClass(cell, this.Style.CSS_CELL_HIGHLIGHT1);
    },
    
    /**
    * Renders a single standard calendar cell using the CSS hightlight2 style
    * @method renderCellStyleHighlight2
    * @param {Date}     workingDate  The current working Date object being used to generate the calendar
    * @param {HTMLTableCellElement} cell   The current working cell in the calendar
    */
    renderCellStyleHighlight2 : function(workingDate, cell) {
        Dom.addClass(cell, this.Style.CSS_CELL_HIGHLIGHT2);
    },
    
    /**
    * Renders a single standard calendar cell using the CSS hightlight3 style
    * @method renderCellStyleHighlight3
    * @param {Date}     workingDate  The current working Date object being used to generate the calendar
    * @param {HTMLTableCellElement} cell   The current working cell in the calendar
    */
    renderCellStyleHighlight3 : function(workingDate, cell) {
        Dom.addClass(cell, this.Style.CSS_CELL_HIGHLIGHT3);
    },
    
    /**
    * Renders a single standard calendar cell using the CSS hightlight4 style
    * @method renderCellStyleHighlight4
    * @param {Date}     workingDate  The current working Date object being used to generate the calendar
    * @param {HTMLTableCellElement} cell   The current working cell in the calendar
    */
    renderCellStyleHighlight4 : function(workingDate, cell) {
        Dom.addClass(cell, this.Style.CSS_CELL_HIGHLIGHT4);
    },
    
    /**
    * Applies the default style used for rendering today's date to the current calendar cell
    * @method renderCellStyleToday
    * @param {Date}     workingDate  The current working Date object being used to generate the calendar
    * @param {HTMLTableCellElement} cell   The current working cell in the calendar
    */
    renderCellStyleToday : function(workingDate, cell) {
        Dom.addClass(cell, this.Style.CSS_CELL_TODAY);
    },

    /**
    * Applies the default style used for rendering selected dates to the current calendar cell
    * @method renderCellStyleSelected
    * @param {Date}     workingDate  The current working Date object being used to generate the calendar
    * @param {HTMLTableCellElement} cell   The current working cell in the calendar
    * @return {String} YAHOO.widget.Calendar.STOP_RENDER if rendering should stop with this style, null or nothing if rendering
    *   should not be terminated
    */
    renderCellStyleSelected : function(workingDate, cell) {
        Dom.addClass(cell, this.Style.CSS_CELL_SELECTED);
    },
    
    /**
    * Applies the default style used for rendering dates that are not a part of the current
    * month (preceding or trailing the cells for the current month)
    * @method renderCellNotThisMonth
    * @param {Date}     workingDate  The current working Date object being used to generate the calendar
    * @param {HTMLTableCellElement} cell   The current working cell in the calendar
    * @return {String} YAHOO.widget.Calendar.STOP_RENDER if rendering should stop with this style, null or nothing if rendering
    *   should not be terminated
    */
    renderCellNotThisMonth : function(workingDate, cell) {
        Dom.addClass(cell, this.Style.CSS_CELL_OOM);
        cell.innerHTML=workingDate.getDate();
        return Calendar.STOP_RENDER;
    },
    
    /**
    * Renders the current calendar cell as a non-selectable "black-out" date using the default
    * restricted style.
    * @method renderBodyCellRestricted
    * @param {Date}     workingDate  The current working Date object being used to generate the calendar
    * @param {HTMLTableCellElement} cell   The current working cell in the calendar
    * @return {String} YAHOO.widget.Calendar.STOP_RENDER if rendering should stop with this style, null or nothing if rendering
    *   should not be terminated
    */
    renderBodyCellRestricted : function(workingDate, cell) {
        Dom.addClass(cell, this.Style.CSS_CELL);
        Dom.addClass(cell, this.Style.CSS_CELL_RESTRICTED);
        cell.innerHTML=workingDate.getDate();
        return Calendar.STOP_RENDER;
    },
    
    // END BUILT-IN TABLE CELL RENDERERS
    
    // BEGIN MONTH NAVIGATION METHODS

    /**
    * Adds the designated number of months to the current calendar month, and sets the current
    * calendar page date to the new month.
    * @method addMonths
    * @param {Number} count The number of months to add to the current calendar
    */
    addMonths : function(count) {
        var cfgPageDate = DEF_CFG.PAGEDATE.key,

        prevDate = this.cfg.getProperty(cfgPageDate),
        newDate = DateMath.add(prevDate, DateMath.MONTH, count);

        this.cfg.setProperty(cfgPageDate, newDate);
        this.resetRenderers();
        this.changePageEvent.fire(prevDate, newDate);
    },

    /**
    * Subtracts the designated number of months from the current calendar month, and sets the current
    * calendar page date to the new month.
    * @method subtractMonths
    * @param {Number} count The number of months to subtract from the current calendar
    */
    subtractMonths : function(count) {
        this.addMonths(-1*count);
    },

    /**
    * Adds the designated number of years to the current calendar, and sets the current
    * calendar page date to the new month.
    * @method addYears
    * @param {Number} count The number of years to add to the current calendar
    */
    addYears : function(count) {
        var cfgPageDate = DEF_CFG.PAGEDATE.key,

        prevDate = this.cfg.getProperty(cfgPageDate),
        newDate = DateMath.add(prevDate, DateMath.YEAR, count);

        this.cfg.setProperty(cfgPageDate, newDate);
        this.resetRenderers();
        this.changePageEvent.fire(prevDate, newDate);
    },

    /**
    * Subtcats the designated number of years from the current calendar, and sets the current
    * calendar page date to the new month.
    * @method subtractYears
    * @param {Number} count The number of years to subtract from the current calendar
    */
    subtractYears : function(count) {
        this.addYears(-1*count);
    },

    /**
    * Navigates to the next month page in the calendar widget.
    * @method nextMonth
    */
    nextMonth : function() {
        this.addMonths(1);
    },
    
    /**
    * Navigates to the previous month page in the calendar widget.
    * @method previousMonth
    */
    previousMonth : function() {
        this.addMonths(-1);
    },
    
    /**
    * Navigates to the next year in the currently selected month in the calendar widget.
    * @method nextYear
    */
    nextYear : function() {
        this.addYears(1);
    },
    
    /**
    * Navigates to the previous year in the currently selected month in the calendar widget.
    * @method previousYear
    */
    previousYear : function() {
        this.addYears(-1);
    },

    // END MONTH NAVIGATION METHODS
    
    // BEGIN SELECTION METHODS
    
    /**
    * Resets the calendar widget to the originally selected month and year, and 
    * sets the calendar to the initial selection(s).
    * @method reset
    */
    reset : function() {
        this.cfg.resetProperty(DEF_CFG.SELECTED.key);
        this.cfg.resetProperty(DEF_CFG.PAGEDATE.key);
        this.resetEvent.fire();
    },
    
    /**
    * Clears the selected dates in the current calendar widget and sets the calendar
    * to the current month and year.
    * @method clear
    */
    clear : function() {
        this.cfg.setProperty(DEF_CFG.SELECTED.key, []);
        this.cfg.setProperty(DEF_CFG.PAGEDATE.key, new Date(this.today.getTime()));
        this.clearEvent.fire();
    },
    
    /**
    * Selects a date or a collection of dates on the current calendar. This method, by default,
    * does not call the render method explicitly. Once selection has completed, render must be 
    * called for the changes to be reflected visually.
    *
    * Any dates which are OOB (out of bounds, not selectable) will not be selected and the array of 
    * selected dates passed to the selectEvent will not contain OOB dates.
    * 
    * If all dates are OOB, the no state change will occur; beforeSelect and select events will not be fired.
    *
    * @method select
    * @param {String/Date/Date[]} date The date string of dates to select in the current calendar. Valid formats are
    *        individual date(s) (12/24/2005,12/26/2005) or date range(s) (12/24/2005-1/1/2006).
    *        Multiple comma-delimited dates can also be passed to this method (12/24/2005,12/11/2005-12/13/2005).
    *        This method can also take a JavaScript Date object or an array of Date objects.
    * @return {Date[]}   Array of JavaScript Date objects representing all individual dates that are currently selected.
    */
    select : function(date) {

        var aToBeSelected = this._toFieldArray(date),
            validDates = [],
            selected = [],
            cfgSelected = DEF_CFG.SELECTED.key;

        
        for (var a=0; a < aToBeSelected.length; ++a) {
            var toSelect = aToBeSelected[a];

            if (!this.isDateOOB(this._toDate(toSelect))) {

                if (validDates.length === 0) {
                    this.beforeSelectEvent.fire();
                    selected = this.cfg.getProperty(cfgSelected);
                }
                validDates.push(toSelect);

                if (this._indexOfSelectedFieldArray(toSelect) == -1) { 
                    selected[selected.length] = toSelect;
                }
            }
        }


        if (validDates.length > 0) {
            if (this.parent) {
                this.parent.cfg.setProperty(cfgSelected, selected);
            } else {
                this.cfg.setProperty(cfgSelected, selected);
            }
            this.selectEvent.fire(validDates);
        }

        return this.getSelectedDates();
    },
    
    /**
    * Selects a date on the current calendar by referencing the index of the cell that should be selected.
    * This method is used to easily select a single cell (usually with a mouse click) without having to do
    * a full render. The selected style is applied to the cell directly.
    *
    * If the cell is not marked with the CSS_CELL_SELECTABLE class (as is the case by default for out of month 
    * or out of bounds cells), it will not be selected and in such a case beforeSelect and select events will not be fired.
    * 
    * @method selectCell
    * @param {Number} cellIndex The index of the cell to select in the current calendar. 
    * @return {Date[]} Array of JavaScript Date objects representing all individual dates that are currently selected.
    */
    selectCell : function(cellIndex) {

        var cell = this.cells[cellIndex],
            cellDate = this.cellDates[cellIndex],
            dCellDate = this._toDate(cellDate),
            selectable = Dom.hasClass(cell, this.Style.CSS_CELL_SELECTABLE);


        if (selectable) {
    
            this.beforeSelectEvent.fire();
    
            var cfgSelected = DEF_CFG.SELECTED.key;
            var selected = this.cfg.getProperty(cfgSelected);
    
            var selectDate = cellDate.concat();
    
            if (this._indexOfSelectedFieldArray(selectDate) == -1) {
                selected[selected.length] = selectDate;
            }
            if (this.parent) {
                this.parent.cfg.setProperty(cfgSelected, selected);
            } else {
                this.cfg.setProperty(cfgSelected, selected);
            }
            this.renderCellStyleSelected(dCellDate,cell);
            this.selectEvent.fire([selectDate]);
    
            this.doCellMouseOut.call(cell, null, this);  
        }
    
        return this.getSelectedDates();
    },
    
    /**
    * Deselects a date or a collection of dates on the current calendar. This method, by default,
    * does not call the render method explicitly. Once deselection has completed, render must be 
    * called for the changes to be reflected visually.
    * 
    * The method will not attempt to deselect any dates which are OOB (out of bounds, and hence not selectable) 
    * and the array of deselected dates passed to the deselectEvent will not contain any OOB dates.
    * 
    * If all dates are OOB, beforeDeselect and deselect events will not be fired.
    * 
    * @method deselect
    * @param {String/Date/Date[]} date The date string of dates to deselect in the current calendar. Valid formats are
    *        individual date(s) (12/24/2005,12/26/2005) or date range(s) (12/24/2005-1/1/2006).
    *        Multiple comma-delimited dates can also be passed to this method (12/24/2005,12/11/2005-12/13/2005).
    *        This method can also take a JavaScript Date object or an array of Date objects. 
    * @return {Date[]}   Array of JavaScript Date objects representing all individual dates that are currently selected.
    */
    deselect : function(date) {

        var aToBeDeselected = this._toFieldArray(date),
            validDates = [],
            selected = [],
            cfgSelected = DEF_CFG.SELECTED.key;


        for (var a=0; a < aToBeDeselected.length; ++a) {
            var toDeselect = aToBeDeselected[a];
    
            if (!this.isDateOOB(this._toDate(toDeselect))) {
    
                if (validDates.length === 0) {
                    this.beforeDeselectEvent.fire();
                    selected = this.cfg.getProperty(cfgSelected);
                }
    
                validDates.push(toDeselect);
    
                var index = this._indexOfSelectedFieldArray(toDeselect);
                if (index != -1) { 
                    selected.splice(index,1);
                }
            }
        }
    
    
        if (validDates.length > 0) {
            if (this.parent) {
                this.parent.cfg.setProperty(cfgSelected, selected);
            } else {
                this.cfg.setProperty(cfgSelected, selected);
            }
            this.deselectEvent.fire(validDates);
        }
    
        return this.getSelectedDates();
    },
    
    /**
    * Deselects a date on the current calendar by referencing the index of the cell that should be deselected.
    * This method is used to easily deselect a single cell (usually with a mouse click) without having to do
    * a full render. The selected style is removed from the cell directly.
    * 
    * If the cell is not marked with the CSS_CELL_SELECTABLE class (as is the case by default for out of month 
    * or out of bounds cells), the method will not attempt to deselect it and in such a case, beforeDeselect and 
    * deselect events will not be fired.
    * 
    * @method deselectCell
    * @param {Number} cellIndex The index of the cell to deselect in the current calendar. 
    * @return {Date[]} Array of JavaScript Date objects representing all individual dates that are currently selected.
    */
    deselectCell : function(cellIndex) {
        var cell = this.cells[cellIndex],
            cellDate = this.cellDates[cellIndex],
            cellDateIndex = this._indexOfSelectedFieldArray(cellDate);

        var selectable = Dom.hasClass(cell, this.Style.CSS_CELL_SELECTABLE);

        if (selectable) {

            this.beforeDeselectEvent.fire();

            var selected = this.cfg.getProperty(DEF_CFG.SELECTED.key),
                dCellDate = this._toDate(cellDate),
                selectDate = cellDate.concat();

            if (cellDateIndex > -1) {
                if (this.cfg.getProperty(DEF_CFG.PAGEDATE.key).getMonth() == dCellDate.getMonth() &&
                    this.cfg.getProperty(DEF_CFG.PAGEDATE.key).getFullYear() == dCellDate.getFullYear()) {
                    Dom.removeClass(cell, this.Style.CSS_CELL_SELECTED);
                }
                selected.splice(cellDateIndex, 1);
            }

            if (this.parent) {
                this.parent.cfg.setProperty(DEF_CFG.SELECTED.key, selected);
            } else {
                this.cfg.setProperty(DEF_CFG.SELECTED.key, selected);
            }

            this.deselectEvent.fire([selectDate]);
        }

        return this.getSelectedDates();
    },

    /**
    * Deselects all dates on the current calendar.
    * @method deselectAll
    * @return {Date[]}  Array of JavaScript Date objects representing all individual dates that are currently selected.
    *      Assuming that this function executes properly, the return value should be an empty array.
    *      However, the empty array is returned for the sake of being able to check the selection status
    *      of the calendar.
    */
    deselectAll : function() {
        this.beforeDeselectEvent.fire();
        
        var cfgSelected = DEF_CFG.SELECTED.key,
            selected = this.cfg.getProperty(cfgSelected),
            count = selected.length,
            sel = selected.concat();

        if (this.parent) {
            this.parent.cfg.setProperty(cfgSelected, []);
        } else {
            this.cfg.setProperty(cfgSelected, []);
        }
        
        if (count > 0) {
            this.deselectEvent.fire(sel);
        }
    
        return this.getSelectedDates();
    },
    
    // END SELECTION METHODS
    
    // BEGIN TYPE CONVERSION METHODS
    
    /**
    * Converts a date (either a JavaScript Date object, or a date string) to the internal data structure
    * used to represent dates: [[yyyy,mm,dd],[yyyy,mm,dd]].
    * @method _toFieldArray
    * @private
    * @param {String/Date/Date[]} date The date string of dates to deselect in the current calendar. Valid formats are
    *        individual date(s) (12/24/2005,12/26/2005) or date range(s) (12/24/2005-1/1/2006).
    *        Multiple comma-delimited dates can also be passed to this method (12/24/2005,12/11/2005-12/13/2005).
    *        This method can also take a JavaScript Date object or an array of Date objects. 
    * @return {Array[](Number[])} Array of date field arrays
    */
    _toFieldArray : function(date) {
        var returnDate = [];
    
        if (date instanceof Date) {
            returnDate = [[date.getFullYear(), date.getMonth()+1, date.getDate()]];
        } else if (Lang.isString(date)) {
            returnDate = this._parseDates(date);
        } else if (Lang.isArray(date)) {
            for (var i=0;i<date.length;++i) {
                var d = date[i];
                returnDate[returnDate.length] = [d.getFullYear(),d.getMonth()+1,d.getDate()];
            }
        }
        
        return returnDate;
    },
    
    /**
    * Converts a date field array [yyyy,mm,dd] to a JavaScript Date object. The date field array
    * is the format in which dates are as provided as arguments to selectEvent and deselectEvent listeners.
    * 
    * @method toDate
    * @param {Number[]} dateFieldArray The date field array to convert to a JavaScript Date.
    * @return {Date} JavaScript Date object representing the date field array.
    */
    toDate : function(dateFieldArray) {
        return this._toDate(dateFieldArray);
    },
    
    /**
    * Converts a date field array [yyyy,mm,dd] to a JavaScript Date object.
    * @method _toDate
    * @private
    * @deprecated Made public, toDate 
    * @param {Number[]}  dateFieldArray The date field array to convert to a JavaScript Date.
    * @return {Date} JavaScript Date object representing the date field array
    */
    _toDate : function(dateFieldArray) {
        if (dateFieldArray instanceof Date) {
            return dateFieldArray;
        } else {
            return DateMath.getDate(dateFieldArray[0],dateFieldArray[1]-1,dateFieldArray[2]);
        }
    },
    
    // END TYPE CONVERSION METHODS 
    
    // BEGIN UTILITY METHODS
    
    /**
    * Determines if 2 field arrays are equal.
    * @method _fieldArraysAreEqual
    * @private
    * @param {Number[]} array1 The first date field array to compare
    * @param {Number[]} array2 The first date field array to compare
    * @return {Boolean} The boolean that represents the equality of the two arrays
    */
    _fieldArraysAreEqual : function(array1, array2) {
        var match = false;
    
        if (array1[0]==array2[0]&&array1[1]==array2[1]&&array1[2]==array2[2]) {
            match=true; 
        }
    
        return match;
    },
    
    /**
    * Gets the index of a date field array [yyyy,mm,dd] in the current list of selected dates.
    * @method _indexOfSelectedFieldArray
    * @private
    * @param {Number[]}  find The date field array to search for
    * @return {Number}   The index of the date field array within the collection of selected dates.
    *        -1 will be returned if the date is not found.
    */
    _indexOfSelectedFieldArray : function(find) {
        var selected = -1,
            seldates = this.cfg.getProperty(DEF_CFG.SELECTED.key);
    
        for (var s=0;s<seldates.length;++s) {
            var sArray = seldates[s];
            if (find[0]==sArray[0]&&find[1]==sArray[1]&&find[2]==sArray[2]) {
                selected = s;
                break;
            }
        }
    
        return selected;
    },
    
    /**
    * Determines whether a given date is OOM (out of month).
    * @method isDateOOM
    * @param {Date} date The JavaScript Date object for which to check the OOM status
    * @return {Boolean} true if the date is OOM
    */
    isDateOOM : function(date) {
        return (date.getMonth() != this.cfg.getProperty(DEF_CFG.PAGEDATE.key).getMonth());
    },
    
    /**
    * Determines whether a given date is OOB (out of bounds - less than the mindate or more than the maxdate).
    *
    * @method isDateOOB
    * @param {Date} date The JavaScript Date object for which to check the OOB status
    * @return {Boolean} true if the date is OOB
    */
    isDateOOB : function(date) {
        var minDate = this.cfg.getProperty(DEF_CFG.MINDATE.key),
            maxDate = this.cfg.getProperty(DEF_CFG.MAXDATE.key),
            dm = DateMath;
        
        if (minDate) {
            minDate = dm.clearTime(minDate);
        } 
        if (maxDate) {
            maxDate = dm.clearTime(maxDate);
        }
    
        var clearedDate = new Date(date.getTime());
        clearedDate = dm.clearTime(clearedDate);
    
        return ((minDate && clearedDate.getTime() < minDate.getTime()) || (maxDate && clearedDate.getTime() > maxDate.getTime()));
    },
    
    /**
     * Parses a pagedate configuration property value. The value can either be specified as a string of form "mm/yyyy" or a Date object 
     * and is parsed into a Date object normalized to the first day of the month. If no value is passed in, the month and year from today's date are used to create the Date object 
     * @method _parsePageDate
     * @private
     * @param {Date|String} date Pagedate value which needs to be parsed
     * @return {Date} The Date object representing the pagedate
     */
    _parsePageDate : function(date) {
        var parsedDate;

        if (date) {
            if (date instanceof Date) {
                parsedDate = DateMath.findMonthStart(date);
            } else {
                var month, year, aMonthYear;
                aMonthYear = date.split(this.cfg.getProperty(DEF_CFG.DATE_FIELD_DELIMITER.key));
                month = parseInt(aMonthYear[this.cfg.getProperty(DEF_CFG.MY_MONTH_POSITION.key)-1], 10)-1;
                year = parseInt(aMonthYear[this.cfg.getProperty(DEF_CFG.MY_YEAR_POSITION.key)-1], 10) - this.Locale.YEAR_OFFSET;

                parsedDate = DateMath.getDate(year, month, 1);
            }
        } else {
            parsedDate = DateMath.getDate(this.today.getFullYear(), this.today.getMonth(), 1);
        }
        return parsedDate;
    },
    
    // END UTILITY METHODS
    
    // BEGIN EVENT HANDLERS
    
    /**
    * Event executed before a date is selected in the calendar widget.
    * @deprecated Event handlers for this event should be susbcribed to beforeSelectEvent.
    */
    onBeforeSelect : function() {
        if (this.cfg.getProperty(DEF_CFG.MULTI_SELECT.key) === false) {
            if (this.parent) {
                this.parent.callChildFunction("clearAllBodyCellStyles", this.Style.CSS_CELL_SELECTED);
                this.parent.deselectAll();
            } else {
                this.clearAllBodyCellStyles(this.Style.CSS_CELL_SELECTED);
                this.deselectAll();
            }
        }
    },
    
    /**
    * Event executed when a date is selected in the calendar widget.
    * @param {Array} selected An array of date field arrays representing which date or dates were selected. Example: [ [2006,8,6],[2006,8,7],[2006,8,8] ]
    * @deprecated Event handlers for this event should be susbcribed to selectEvent.
    */
    onSelect : function(selected) { },
    
    /**
    * Event executed before a date is deselected in the calendar widget.
    * @deprecated Event handlers for this event should be susbcribed to beforeDeselectEvent.
    */
    onBeforeDeselect : function() { },
    
    /**
    * Event executed when a date is deselected in the calendar widget.
    * @param {Array} selected An array of date field arrays representing which date or dates were deselected. Example: [ [2006,8,6],[2006,8,7],[2006,8,8] ]
    * @deprecated Event handlers for this event should be susbcribed to deselectEvent.
    */
    onDeselect : function(deselected) { },
    
    /**
    * Event executed when the user navigates to a different calendar page.
    * @deprecated Event handlers for this event should be susbcribed to changePageEvent.
    */
    onChangePage : function() {
        this.render();
    },

    /**
    * Event executed when the calendar widget is rendered.
    * @deprecated Event handlers for this event should be susbcribed to renderEvent.
    */
    onRender : function() { },

    /**
    * Event executed when the calendar widget is reset to its original state.
    * @deprecated Event handlers for this event should be susbcribed to resetEvemt.
    */
    onReset : function() { this.render(); },

    /**
    * Event executed when the calendar widget is completely cleared to the current month with no selections.
    * @deprecated Event handlers for this event should be susbcribed to clearEvent.
    */
    onClear : function() { this.render(); },
    
    /**
    * Validates the calendar widget. This method has no default implementation
    * and must be extended by subclassing the widget.
    * @return Should return true if the widget validates, and false if
    * it doesn't.
    * @type Boolean
    */
    validate : function() { return true; },
    
    // END EVENT HANDLERS
    
    // BEGIN DATE PARSE METHODS
    
    /**
    * Converts a date string to a date field array
    * @private
    * @param {String} sDate   Date string. Valid formats are mm/dd and mm/dd/yyyy.
    * @return    A date field array representing the string passed to the method
    * @type Array[](Number[])
    */
    _parseDate : function(sDate) {
        var aDate = sDate.split(this.Locale.DATE_FIELD_DELIMITER),
            rArray;

        if (aDate.length == 2) {
            rArray = [aDate[this.Locale.MD_MONTH_POSITION-1],aDate[this.Locale.MD_DAY_POSITION-1]];
            rArray.type = Calendar.MONTH_DAY;
        } else {
            rArray = [aDate[this.Locale.MDY_YEAR_POSITION-1] - this.Locale.YEAR_OFFSET, aDate[this.Locale.MDY_MONTH_POSITION-1],aDate[this.Locale.MDY_DAY_POSITION-1]];
            rArray.type = Calendar.DATE;
        }

        for (var i=0;i<rArray.length;i++) {
            rArray[i] = parseInt(rArray[i], 10);
        }
    
        return rArray;
    },
    
    /**
    * Converts a multi or single-date string to an array of date field arrays
    * @private
    * @param {String} sDates  Date string with one or more comma-delimited dates. Valid formats are mm/dd, mm/dd/yyyy, mm/dd/yyyy-mm/dd/yyyy
    * @return       An array of date field arrays
    * @type Array[](Number[])
    */
    _parseDates : function(sDates) {
        var aReturn = [],
            aDates = sDates.split(this.Locale.DATE_DELIMITER);
        
        for (var d=0;d<aDates.length;++d) {
            var sDate = aDates[d];
    
            if (sDate.indexOf(this.Locale.DATE_RANGE_DELIMITER) != -1) {
                // This is a range
                var aRange = sDate.split(this.Locale.DATE_RANGE_DELIMITER),
                    dateStart = this._parseDate(aRange[0]),
                    dateEnd = this._parseDate(aRange[1]),
                    fullRange = this._parseRange(dateStart, dateEnd);

                aReturn = aReturn.concat(fullRange);
            } else {
                // This is not a range
                var aDate = this._parseDate(sDate);
                aReturn.push(aDate);
            }
        }
        return aReturn;
    },
    
    /**
    * Converts a date range to the full list of included dates
    * @private
    * @param {Number[]} startDate Date field array representing the first date in the range
    * @param {Number[]} endDate  Date field array representing the last date in the range
    * @return       An array of date field arrays
    * @type Array[](Number[])
    */
    _parseRange : function(startDate, endDate) {
        var dCurrent = DateMath.add(DateMath.getDate(startDate[0],startDate[1]-1,startDate[2]),DateMath.DAY,1),
            dEnd     = DateMath.getDate(endDate[0],  endDate[1]-1,  endDate[2]),
            results = [];

        results.push(startDate);
        while (dCurrent.getTime() <= dEnd.getTime()) {
            results.push([dCurrent.getFullYear(),dCurrent.getMonth()+1,dCurrent.getDate()]);
            dCurrent = DateMath.add(dCurrent,DateMath.DAY,1);
        }
        return results;
    },
    
    // END DATE PARSE METHODS
    
    // BEGIN RENDERER METHODS
    
    /**
    * Resets the render stack of the current calendar to its original pre-render value.
    */
    resetRenderers : function() {
        this.renderStack = this._renderStack.concat();
    },
    
    /**
     * Removes all custom renderers added to the Calendar through the addRenderer, addMonthRenderer and 
     * addWeekdayRenderer methods. Calendar's render method needs to be called after removing renderers 
     * to re-render the Calendar without custom renderers applied.
     */
    removeRenderers : function() {
        this._renderStack = [];
        this.renderStack = [];
    },

    /**
    * Clears the inner HTML, CSS class and style information from the specified cell.
    * @method clearElement
    * @param {HTMLTableCellElement} cell The cell to clear
    */ 
    clearElement : function(cell) {
        cell.innerHTML = "&#160;";
        cell.className="";
    },
    
    /**
    * Adds a renderer to the render stack. The function reference passed to this method will be executed
    * when a date cell matches the conditions specified in the date string for this renderer.
    * @method addRenderer
    * @param {String} sDates  A date string to associate with the specified renderer. Valid formats
    *         include date (12/24/2005), month/day (12/24), and range (12/1/2004-1/1/2005)
    * @param {Function} fnRender The function executed to render cells that match the render rules for this renderer.
    */
    addRenderer : function(sDates, fnRender) {
        var aDates = this._parseDates(sDates);
        for (var i=0;i<aDates.length;++i) {
            var aDate = aDates[i];
        
            if (aDate.length == 2) { // this is either a range or a month/day combo
                if (aDate[0] instanceof Array) { // this is a range
                    this._addRenderer(Calendar.RANGE,aDate,fnRender);
                } else { // this is a month/day combo
                    this._addRenderer(Calendar.MONTH_DAY,aDate,fnRender);
                }
            } else if (aDate.length == 3) {
                this._addRenderer(Calendar.DATE,aDate,fnRender);
            }
        }
    },
    
    /**
    * The private method used for adding cell renderers to the local render stack.
    * This method is called by other methods that set the renderer type prior to the method call.
    * @method _addRenderer
    * @private
    * @param {String} type  The type string that indicates the type of date renderer being added.
    *         Values are YAHOO.widget.Calendar.DATE, YAHOO.widget.Calendar.MONTH_DAY, YAHOO.widget.Calendar.WEEKDAY,
    *         YAHOO.widget.Calendar.RANGE, YAHOO.widget.Calendar.MONTH
    * @param {Array}  aDates  An array of dates used to construct the renderer. The format varies based
    *         on the renderer type
    * @param {Function} fnRender The function executed to render cells that match the render rules for this renderer.
    */
    _addRenderer : function(type, aDates, fnRender) {
        var add = [type,aDates,fnRender];
        this.renderStack.unshift(add); 
        this._renderStack = this.renderStack.concat();
    },

    /**
    * Adds a month to the render stack. The function reference passed to this method will be executed
    * when a date cell matches the month passed to this method.
    * @method addMonthRenderer
    * @param {Number} month  The month (1-12) to associate with this renderer
    * @param {Function} fnRender The function executed to render cells that match the render rules for this renderer.
    */
    addMonthRenderer : function(month, fnRender) {
        this._addRenderer(Calendar.MONTH,[month],fnRender);
    },

    /**
    * Adds a weekday to the render stack. The function reference passed to this method will be executed
    * when a date cell matches the weekday passed to this method.
    * @method addWeekdayRenderer
    * @param {Number} weekday  The weekday (Sunday = 1, Monday = 2 ... Saturday = 7) to associate with this renderer
    * @param {Function} fnRender The function executed to render cells that match the render rules for this renderer.
    */
    addWeekdayRenderer : function(weekday, fnRender) {
        this._addRenderer(Calendar.WEEKDAY,[weekday],fnRender);
    },

    // END RENDERER METHODS
    
    // BEGIN CSS METHODS
    
    /**
    * Removes all styles from all body cells in the current calendar table.
    * @method clearAllBodyCellStyles
    * @param {style} style The CSS class name to remove from all calendar body cells
    */
    clearAllBodyCellStyles : function(style) {
        for (var c=0;c<this.cells.length;++c) {
            Dom.removeClass(this.cells[c],style);
        }
    },
    
    // END CSS METHODS
    
    // BEGIN GETTER/SETTER METHODS
    /**
    * Sets the calendar's month explicitly
    * @method setMonth
    * @param {Number} month  The numeric month, from 0 (January) to 11 (December)
    */
    setMonth : function(month) {
        var cfgPageDate = DEF_CFG.PAGEDATE.key,
            current = this.cfg.getProperty(cfgPageDate);
        current.setMonth(parseInt(month, 10));
        this.cfg.setProperty(cfgPageDate, current);
    },

    /**
    * Sets the calendar's year explicitly.
    * @method setYear
    * @param {Number} year  The numeric 4-digit year
    */
    setYear : function(year) {
        var cfgPageDate = DEF_CFG.PAGEDATE.key,
            current = this.cfg.getProperty(cfgPageDate);

        current.setFullYear(parseInt(year, 10) - this.Locale.YEAR_OFFSET);
        this.cfg.setProperty(cfgPageDate, current);
    },

    /**
    * Gets the list of currently selected dates from the calendar.
    * @method getSelectedDates
    * @return {Date[]} An array of currently selected JavaScript Date objects.
    */
    getSelectedDates : function() {
        var returnDates = [],
            selected = this.cfg.getProperty(DEF_CFG.SELECTED.key);

        for (var d=0;d<selected.length;++d) {
            var dateArray = selected[d];

            var date = DateMath.getDate(dateArray[0],dateArray[1]-1,dateArray[2]);
            returnDates.push(date);
        }

        returnDates.sort( function(a,b) { return a-b; } );
        return returnDates;
    },

    /// END GETTER/SETTER METHODS ///
    
    /**
    * Hides the Calendar's outer container from view.
    * @method hide
    */
    hide : function() {
        if (this.beforeHideEvent.fire()) {
            this.oDomContainer.style.display = "none";
            this.hideEvent.fire();
        }
    },

    /**
    * Shows the Calendar's outer container.
    * @method show
    */
    show : function() {
        if (this.beforeShowEvent.fire()) {
            this.oDomContainer.style.display = "block";
            this.showEvent.fire();
        }
    },

    /**
    * Returns a string representing the current browser.
    * @deprecated As of 2.3.0, environment information is available in YAHOO.env.ua
    * @see YAHOO.env.ua
    * @property browser
    * @type String
    */
    browser : (function() {
                var ua = navigator.userAgent.toLowerCase();
                      if (ua.indexOf('opera')!=-1) { // Opera (check first in case of spoof)
                         return 'opera';
                      } else if (ua.indexOf('msie 7')!=-1) { // IE7
                         return 'ie7';
                      } else if (ua.indexOf('msie') !=-1) { // IE
                         return 'ie';
                      } else if (ua.indexOf('safari')!=-1) { // Safari (check before Gecko because it includes "like Gecko")
                         return 'safari';
                      } else if (ua.indexOf('gecko') != -1) { // Gecko
                         return 'gecko';
                      } else {
                         return false;
                      }
                })(),
    /**
    * Returns a string representation of the object.
    * @method toString
    * @return {String} A string representation of the Calendar object.
    */
    toString : function() {
        return "Calendar " + this.id;
    },

    /**
     * Destroys the Calendar instance. The method will remove references
     * to HTML elements, remove any event listeners added by the Calendar,
     * and destroy the Config and CalendarNavigator instances it has created.
     *
     * @method destroy
     */
    destroy : function() {

        if (this.beforeDestroyEvent.fire()) {
            var cal = this;

            // Child objects
            if (cal.navigator) {
                cal.navigator.destroy();
            }

            if (cal.cfg) {
                cal.cfg.destroy();
            }

            // DOM event listeners
            Event.purgeElement(cal.oDomContainer, true);

            // Generated markup/DOM - Not removing the container DIV since we didn't create it.
            Dom.removeClass(cal.oDomContainer, cal.Style.CSS_WITH_TITLE);
            Dom.removeClass(cal.oDomContainer, cal.Style.CSS_CONTAINER);
            Dom.removeClass(cal.oDomContainer, cal.Style.CSS_SINGLE);
            cal.oDomContainer.innerHTML = "";

            // JS-to-DOM references
            cal.oDomContainer = null;
            cal.cells = null;

            this.destroyEvent.fire();
        }
    }
};

YAHOO.widget.Calendar = Calendar;

/**
* @namespace YAHOO.widget
* @class Calendar_Core
* @extends YAHOO.widget.Calendar
* @deprecated The old Calendar_Core class is no longer necessary.
*/
YAHOO.widget.Calendar_Core = YAHOO.widget.Calendar;

YAHOO.widget.Cal_Core = YAHOO.widget.Calendar;

})();
(function() {

    var Dom = YAHOO.util.Dom,
        DateMath = YAHOO.widget.DateMath,
        Event = YAHOO.util.Event,
        Lang = YAHOO.lang,
        Calendar = YAHOO.widget.Calendar;

/**
* YAHOO.widget.CalendarGroup is a special container class for YAHOO.widget.Calendar. This class facilitates
* the ability to have multi-page calendar views that share a single dataset and are
* dependent on each other.
*
* The calendar group instance will refer to each of its elements using a 0-based index.
* For example, to construct the placeholder for a calendar group widget with id "cal1" and
* containerId of "cal1Container", the markup would be as follows:
*   <xmp>
*       <div id="cal1Container_0"></div>
*       <div id="cal1Container_1"></div>
*   </xmp>
* The tables for the calendars ("cal1_0" and "cal1_1") will be inserted into those containers.
*
* <p>
* <strong>NOTE: As of 2.4.0, the constructor's ID argument is optional.</strong>
* The CalendarGroup can be constructed by simply providing a container ID string, 
* or a reference to a container DIV HTMLElement (the element needs to exist 
* in the document).
* 
* E.g.:
*   <xmp>
*       var c = new YAHOO.widget.CalendarGroup("calContainer", configOptions);
*   </xmp>
* or:
*   <xmp>
*       var containerDiv = YAHOO.util.Dom.get("calContainer");
*       var c = new YAHOO.widget.CalendarGroup(containerDiv, configOptions);
*   </xmp>
* </p>
* <p>
* If not provided, the ID will be generated from the container DIV ID by adding an "_t" suffix.
* For example if an ID is not provided, and the container's ID is "calContainer", the CalendarGroup's ID will be set to "calContainer_t".
* </p>
* 
* @namespace YAHOO.widget
* @class CalendarGroup
* @constructor
* @param {String} id optional The id of the table element that will represent the CalendarGroup widget. As of 2.4.0, this argument is optional.
* @param {String | HTMLElement} container The id of the container div element that will wrap the CalendarGroup table, or a reference to a DIV element which exists in the document.
* @param {Object} config optional The configuration object containing the initial configuration values for the CalendarGroup.
*/
function CalendarGroup(id, containerId, config) {
    if (arguments.length > 0) {
        this.init.apply(this, arguments);
    }
}

/**
* The set of default Config property keys and values for the CalendarGroup.
* 
* <p>
* NOTE: This property is made public in order to allow users to change 
* the default values of configuration properties. Users should not 
* modify the key string, unless they are overriding the Calendar implementation
* </p>
*
* @property YAHOO.widget.CalendarGroup.DEFAULT_CONFIG
* @static
* @type Object An object with key/value pairs, the key being the 
* uppercase configuration property name and the value being an objec 
* literal with a key string property, and a value property, specifying the 
* default value of the property 
*/

/**
* The set of default Config property keys and values for the CalendarGroup
* @property YAHOO.widget.CalendarGroup._DEFAULT_CONFIG
* @deprecated Made public. See the public DEFAULT_CONFIG property for details
* @private
* @static
* @type Object
*/
CalendarGroup.DEFAULT_CONFIG = CalendarGroup._DEFAULT_CONFIG = Calendar.DEFAULT_CONFIG;
CalendarGroup.DEFAULT_CONFIG.PAGES = {key:"pages", value:2};

var DEF_CFG = CalendarGroup.DEFAULT_CONFIG;

CalendarGroup.prototype = {

    /**
    * Initializes the calendar group. All subclasses must call this method in order for the
    * group to be initialized properly.
    * @method init
    * @param {String} id optional The id of the table element that will represent the CalendarGroup widget. As of 2.4.0, this argument is optional.
    * @param {String | HTMLElement} container The id of the container div element that will wrap the CalendarGroup table, or a reference to a DIV element which exists in the document.
    * @param {Object} config optional The configuration object containing the initial configuration values for the CalendarGroup.
    */
    init : function(id, container, config) {

        // Normalize 2.4.0, pre 2.4.0 args
        var nArgs = this._parseArgs(arguments);

        id = nArgs.id;
        container = nArgs.container;
        config = nArgs.config;

        this.oDomContainer = Dom.get(container);

        if (!this.oDomContainer.id) {
            this.oDomContainer.id = Dom.generateId();
        }
        if (!id) {
            id = this.oDomContainer.id + "_t";
        }

        /**
        * The unique id associated with the CalendarGroup
        * @property id
        * @type String
        */
        this.id = id;

        /**
        * The unique id associated with the CalendarGroup container
        * @property containerId
        * @type String
        */
        this.containerId = this.oDomContainer.id;

        this.initEvents();
        this.initStyles();

        /**
        * The collection of Calendar pages contained within the CalendarGroup
        * @property pages
        * @type YAHOO.widget.Calendar[]
        */
        this.pages = [];

        Dom.addClass(this.oDomContainer, CalendarGroup.CSS_CONTAINER);
        Dom.addClass(this.oDomContainer, CalendarGroup.CSS_MULTI_UP);

        /**
        * The Config object used to hold the configuration variables for the CalendarGroup
        * @property cfg
        * @type YAHOO.util.Config
        */
        this.cfg = new YAHOO.util.Config(this);

        /**
        * The local object which contains the CalendarGroup's options
        * @property Options
        * @type Object
        */
        this.Options = {};

        /**
        * The local object which contains the CalendarGroup's locale settings
        * @property Locale
        * @type Object
        */
        this.Locale = {};

        this.setupConfig();

        if (config) {
            this.cfg.applyConfig(config, true);
        }

        this.cfg.fireQueue();

        // OPERA HACK FOR MISWRAPPED FLOATS
        if (YAHOO.env.ua.opera){
            this.renderEvent.subscribe(this._fixWidth, this, true);
            this.showEvent.subscribe(this._fixWidth, this, true);
        }

    },

    setupConfig : function() {

        var cfg = this.cfg;

        /**
        * The number of pages to include in the CalendarGroup. This value can only be set once, in the CalendarGroup's constructor arguments.
        * @config pages
        * @type Number
        * @default 2
        */
        cfg.addProperty(DEF_CFG.PAGES.key, { value:DEF_CFG.PAGES.value, validator:cfg.checkNumber, handler:this.configPages } );

        /**
        * The positive or negative year offset from the Gregorian calendar year (assuming a January 1st rollover) to 
        * be used when displaying or parsing dates.  NOTE: All JS Date objects returned by methods, or expected as input by
        * methods will always represent the Gregorian year, in order to maintain date/month/week values.
        *
        * @config year_offset
        * @type Number
        * @default 0
        */
        cfg.addProperty(DEF_CFG.YEAR_OFFSET.key, { value:DEF_CFG.YEAR_OFFSET.value, handler: this.delegateConfig, supercedes:DEF_CFG.YEAR_OFFSET.supercedes, suppressEvent:true } );

        /**
        * The date to use to represent "Today".
        *
        * @config today
        * @type Date
        * @default Today's date
        */
        cfg.addProperty(DEF_CFG.TODAY.key, { value: new Date(DEF_CFG.TODAY.value.getTime()), supercedes:DEF_CFG.TODAY.supercedes, handler: this.configToday, suppressEvent:false } );

        /**
        * The month/year representing the current visible Calendar date (mm/yyyy)
        * @config pagedate
        * @type String | Date
        * @default Today's date
        */
        cfg.addProperty(DEF_CFG.PAGEDATE.key, { value: DEF_CFG.PAGEDATE.value || new Date(DEF_CFG.TODAY.value.getTime()), handler:this.configPageDate } );

        /**
        * The date or range of dates representing the current Calendar selection
        *
        * @config selected
        * @type String
        * @default []
        */
        cfg.addProperty(DEF_CFG.SELECTED.key, { value:[], handler:this.configSelected } );

        /**
        * The title to display above the CalendarGroup's month header
        * @config title
        * @type String
        * @default ""
        */
        cfg.addProperty(DEF_CFG.TITLE.key, { value:DEF_CFG.TITLE.value, handler:this.configTitle } );

        /**
        * Whether or not a close button should be displayed for this CalendarGroup
        * @config close
        * @type Boolean
        * @default false
        */
        cfg.addProperty(DEF_CFG.CLOSE.key, { value:DEF_CFG.CLOSE.value, handler:this.configClose } );

        /**
        * Whether or not an iframe shim should be placed under the Calendar to prevent select boxes from bleeding through in Internet Explorer 6 and below.
        * This property is enabled by default for IE6 and below. It is disabled by default for other browsers for performance reasons, but can be 
        * enabled if required.
        * 
        * @config iframe
        * @type Boolean
        * @default true for IE6 and below, false for all other browsers
        */
        cfg.addProperty(DEF_CFG.IFRAME.key, { value:DEF_CFG.IFRAME.value, handler:this.configIframe, validator:cfg.checkBoolean } );

        /**
        * The minimum selectable date in the current Calendar (mm/dd/yyyy)
        * @config mindate
        * @type String | Date
        * @default null
        */
        cfg.addProperty(DEF_CFG.MINDATE.key, { value:DEF_CFG.MINDATE.value, handler:this.delegateConfig } );

        /**
        * The maximum selectable date in the current Calendar (mm/dd/yyyy)
        * @config maxdate
        * @type String | Date
        * @default null
        */
        cfg.addProperty(DEF_CFG.MAXDATE.key, { value:DEF_CFG.MAXDATE.value, handler:this.delegateConfig  } );

        // Options properties

        /**
        * True if the Calendar should allow multiple selections. False by default.
        * @config MULTI_SELECT
        * @type Boolean
        * @default false
        */
        cfg.addProperty(DEF_CFG.MULTI_SELECT.key, { value:DEF_CFG.MULTI_SELECT.value, handler:this.delegateConfig, validator:cfg.checkBoolean } );

        /**
        * The weekday the week begins on. Default is 0 (Sunday).
        * @config START_WEEKDAY
        * @type number
        * @default 0
        */ 
        cfg.addProperty(DEF_CFG.START_WEEKDAY.key, { value:DEF_CFG.START_WEEKDAY.value, handler:this.delegateConfig, validator:cfg.checkNumber  } );
        
        /**
        * True if the Calendar should show weekday labels. True by default.
        * @config SHOW_WEEKDAYS
        * @type Boolean
        * @default true
        */ 
        cfg.addProperty(DEF_CFG.SHOW_WEEKDAYS.key, { value:DEF_CFG.SHOW_WEEKDAYS.value, handler:this.delegateConfig, validator:cfg.checkBoolean } );
        
        /**
        * True if the Calendar should show week row headers. False by default.
        * @config SHOW_WEEK_HEADER
        * @type Boolean
        * @default false
        */ 
        cfg.addProperty(DEF_CFG.SHOW_WEEK_HEADER.key,{ value:DEF_CFG.SHOW_WEEK_HEADER.value, handler:this.delegateConfig, validator:cfg.checkBoolean } );
        
        /**
        * True if the Calendar should show week row footers. False by default.
        * @config SHOW_WEEK_FOOTER
        * @type Boolean
        * @default false
        */
        cfg.addProperty(DEF_CFG.SHOW_WEEK_FOOTER.key,{ value:DEF_CFG.SHOW_WEEK_FOOTER.value, handler:this.delegateConfig, validator:cfg.checkBoolean } );
        
        /**
        * True if the Calendar should suppress weeks that are not a part of the current month. False by default.
        * @config HIDE_BLANK_WEEKS
        * @type Boolean
        * @default false
        */  
        cfg.addProperty(DEF_CFG.HIDE_BLANK_WEEKS.key,{ value:DEF_CFG.HIDE_BLANK_WEEKS.value, handler:this.delegateConfig, validator:cfg.checkBoolean } );
        
        /**
        * The image that should be used for the left navigation arrow.
        * @config NAV_ARROW_LEFT
        * @type String
        * @deprecated You can customize the image by overriding the default CSS class for the left arrow - "calnavleft"
        * @default null
        */  
        cfg.addProperty(DEF_CFG.NAV_ARROW_LEFT.key, { value:DEF_CFG.NAV_ARROW_LEFT.value, handler:this.delegateConfig } );
        
        /**
        * The image that should be used for the right navigation arrow.
        * @config NAV_ARROW_RIGHT
        * @type String
        * @deprecated You can customize the image by overriding the default CSS class for the right arrow - "calnavright"
        * @default null
        */  
        cfg.addProperty(DEF_CFG.NAV_ARROW_RIGHT.key, { value:DEF_CFG.NAV_ARROW_RIGHT.value, handler:this.delegateConfig } );
    
        // Locale properties
        
        /**
        * The short month labels for the current locale.
        * @config MONTHS_SHORT
        * @type String[]
        * @default ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        */
        cfg.addProperty(DEF_CFG.MONTHS_SHORT.key, { value:DEF_CFG.MONTHS_SHORT.value, handler:this.delegateConfig } );
        
        /**
        * The long month labels for the current locale.
        * @config MONTHS_LONG
        * @type String[]
        * @default ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        */  
        cfg.addProperty(DEF_CFG.MONTHS_LONG.key,  { value:DEF_CFG.MONTHS_LONG.value, handler:this.delegateConfig } );
        
        /**
        * The 1-character weekday labels for the current locale.
        * @config WEEKDAYS_1CHAR
        * @type String[]
        * @default ["S", "M", "T", "W", "T", "F", "S"]
        */  
        cfg.addProperty(DEF_CFG.WEEKDAYS_1CHAR.key, { value:DEF_CFG.WEEKDAYS_1CHAR.value, handler:this.delegateConfig } );
        
        /**
        * The short weekday labels for the current locale.
        * @config WEEKDAYS_SHORT
        * @type String[]
        * @default ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
        */  
        cfg.addProperty(DEF_CFG.WEEKDAYS_SHORT.key, { value:DEF_CFG.WEEKDAYS_SHORT.value, handler:this.delegateConfig } );
        
        /**
        * The medium weekday labels for the current locale.
        * @config WEEKDAYS_MEDIUM
        * @type String[]
        * @default ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        */  
        cfg.addProperty(DEF_CFG.WEEKDAYS_MEDIUM.key, { value:DEF_CFG.WEEKDAYS_MEDIUM.value, handler:this.delegateConfig } );
        
        /**
        * The long weekday labels for the current locale.
        * @config WEEKDAYS_LONG
        * @type String[]
        * @default ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        */  
        cfg.addProperty(DEF_CFG.WEEKDAYS_LONG.key, { value:DEF_CFG.WEEKDAYS_LONG.value, handler:this.delegateConfig } );
    
        /**
        * The setting that determines which length of month labels should be used. Possible values are "short" and "long".
        * @config LOCALE_MONTHS
        * @type String
        * @default "long"
        */
        cfg.addProperty(DEF_CFG.LOCALE_MONTHS.key, { value:DEF_CFG.LOCALE_MONTHS.value, handler:this.delegateConfig } );
    
        /**
        * The setting that determines which length of weekday labels should be used. Possible values are "1char", "short", "medium", and "long".
        * @config LOCALE_WEEKDAYS
        * @type String
        * @default "short"
        */ 
        cfg.addProperty(DEF_CFG.LOCALE_WEEKDAYS.key, { value:DEF_CFG.LOCALE_WEEKDAYS.value, handler:this.delegateConfig } );
    
        /**
        * The value used to delimit individual dates in a date string passed to various Calendar functions.
        * @config DATE_DELIMITER
        * @type String
        * @default ","
        */
        cfg.addProperty(DEF_CFG.DATE_DELIMITER.key,  { value:DEF_CFG.DATE_DELIMITER.value, handler:this.delegateConfig } );
    
        /**
        * The value used to delimit date fields in a date string passed to various Calendar functions.
        * @config DATE_FIELD_DELIMITER
        * @type String
        * @default "/"
        */ 
        cfg.addProperty(DEF_CFG.DATE_FIELD_DELIMITER.key,{ value:DEF_CFG.DATE_FIELD_DELIMITER.value, handler:this.delegateConfig } );
    
        /**
        * The value used to delimit date ranges in a date string passed to various Calendar functions.
        * @config DATE_RANGE_DELIMITER
        * @type String
        * @default "-"
        */
        cfg.addProperty(DEF_CFG.DATE_RANGE_DELIMITER.key,{ value:DEF_CFG.DATE_RANGE_DELIMITER.value, handler:this.delegateConfig } );
    
        /**
        * The position of the month in a month/year date string
        * @config MY_MONTH_POSITION
        * @type Number
        * @default 1
        */
        cfg.addProperty(DEF_CFG.MY_MONTH_POSITION.key, { value:DEF_CFG.MY_MONTH_POSITION.value, handler:this.delegateConfig, validator:cfg.checkNumber } );
        
        /**
        * The position of the year in a month/year date string
        * @config MY_YEAR_POSITION
        * @type Number
        * @default 2
        */ 
        cfg.addProperty(DEF_CFG.MY_YEAR_POSITION.key, { value:DEF_CFG.MY_YEAR_POSITION.value, handler:this.delegateConfig, validator:cfg.checkNumber } );
        
        /**
        * The position of the month in a month/day date string
        * @config MD_MONTH_POSITION
        * @type Number
        * @default 1
        */ 
        cfg.addProperty(DEF_CFG.MD_MONTH_POSITION.key, { value:DEF_CFG.MD_MONTH_POSITION.value, handler:this.delegateConfig, validator:cfg.checkNumber } );
        
        /**
        * The position of the day in a month/year date string
        * @config MD_DAY_POSITION
        * @type Number
        * @default 2
        */ 
        cfg.addProperty(DEF_CFG.MD_DAY_POSITION.key,  { value:DEF_CFG.MD_DAY_POSITION.value, handler:this.delegateConfig, validator:cfg.checkNumber } );
        
        /**
        * The position of the month in a month/day/year date string
        * @config MDY_MONTH_POSITION
        * @type Number
        * @default 1
        */ 
        cfg.addProperty(DEF_CFG.MDY_MONTH_POSITION.key, { value:DEF_CFG.MDY_MONTH_POSITION.value, handler:this.delegateConfig, validator:cfg.checkNumber } );
        
        /**
        * The position of the day in a month/day/year date string
        * @config MDY_DAY_POSITION
        * @type Number
        * @default 2
        */ 
        cfg.addProperty(DEF_CFG.MDY_DAY_POSITION.key, { value:DEF_CFG.MDY_DAY_POSITION.value, handler:this.delegateConfig, validator:cfg.checkNumber } );
        
        /**
        * The position of the year in a month/day/year date string
        * @config MDY_YEAR_POSITION
        * @type Number
        * @default 3
        */ 
        cfg.addProperty(DEF_CFG.MDY_YEAR_POSITION.key, { value:DEF_CFG.MDY_YEAR_POSITION.value, handler:this.delegateConfig, validator:cfg.checkNumber } );
    
        /**
        * The position of the month in the month year label string used as the Calendar header
        * @config MY_LABEL_MONTH_POSITION
        * @type Number
        * @default 1
        */
        cfg.addProperty(DEF_CFG.MY_LABEL_MONTH_POSITION.key, { value:DEF_CFG.MY_LABEL_MONTH_POSITION.value, handler:this.delegateConfig, validator:cfg.checkNumber } );
    
        /**
        * The position of the year in the month year label string used as the Calendar header
        * @config MY_LABEL_YEAR_POSITION
        * @type Number
        * @default 2
        */
        cfg.addProperty(DEF_CFG.MY_LABEL_YEAR_POSITION.key, { value:DEF_CFG.MY_LABEL_YEAR_POSITION.value, handler:this.delegateConfig, validator:cfg.checkNumber } );

        /**
        * The suffix used after the month when rendering the Calendar header
        * @config MY_LABEL_MONTH_SUFFIX
        * @type String
        * @default " "
        */
        cfg.addProperty(DEF_CFG.MY_LABEL_MONTH_SUFFIX.key, { value:DEF_CFG.MY_LABEL_MONTH_SUFFIX.value, handler:this.delegateConfig } );
        
        /**
        * The suffix used after the year when rendering the Calendar header
        * @config MY_LABEL_YEAR_SUFFIX
        * @type String
        * @default ""
        */
        cfg.addProperty(DEF_CFG.MY_LABEL_YEAR_SUFFIX.key, { value:DEF_CFG.MY_LABEL_YEAR_SUFFIX.value, handler:this.delegateConfig } );

        /**
        * Configuration for the Month Year Navigation UI. By default it is disabled
        * @config NAV
        * @type Object
        * @default null
        */
        cfg.addProperty(DEF_CFG.NAV.key, { value:DEF_CFG.NAV.value, handler:this.configNavigator } );

        /**
         * The map of UI strings which the CalendarGroup UI uses.
         *
         * @config strings
         * @type {Object}
         * @default An object with the properties shown below:
         *     <dl>
         *         <dt>previousMonth</dt><dd><em>String</em> : The string to use for the "Previous Month" navigation UI. Defaults to "Previous Month".</dd>
         *         <dt>nextMonth</dt><dd><em>String</em> : The string to use for the "Next Month" navigation UI. Defaults to "Next Month".</dd>
         *         <dt>close</dt><dd><em>String</em> : The string to use for the close button label. Defaults to "Close".</dd>
         *     </dl>
         */
        cfg.addProperty(DEF_CFG.STRINGS.key, { 
            value:DEF_CFG.STRINGS.value, 
            handler:this.configStrings, 
            validator: function(val) {
                return Lang.isObject(val);
            },
            supercedes: DEF_CFG.STRINGS.supercedes
        });
    },

    /**
    * Initializes CalendarGroup's built-in CustomEvents
    * @method initEvents
    */
    initEvents : function() {

        var me = this,
            strEvent = "Event",
            CE = YAHOO.util.CustomEvent;

        /**
        * Proxy subscriber to subscribe to the CalendarGroup's child Calendars' CustomEvents
        * @method sub
        * @private
        * @param {Function} fn The function to subscribe to this CustomEvent
        * @param {Object} obj The CustomEvent's scope object
        * @param {Boolean} bOverride Whether or not to apply scope correction
        */
        var sub = function(fn, obj, bOverride) {
            for (var p=0;p<me.pages.length;++p) {
                var cal = me.pages[p];
                cal[this.type + strEvent].subscribe(fn, obj, bOverride);
            }
        };

        /**
        * Proxy unsubscriber to unsubscribe from the CalendarGroup's child Calendars' CustomEvents
        * @method unsub
        * @private
        * @param {Function} fn The function to subscribe to this CustomEvent
        * @param {Object} obj The CustomEvent's scope object
        */
        var unsub = function(fn, obj) {
            for (var p=0;p<me.pages.length;++p) {
                var cal = me.pages[p];
                cal[this.type + strEvent].unsubscribe(fn, obj);
            }
        };

        var defEvents = Calendar._EVENT_TYPES;

        /**
        * Fired before a date selection is made
        * @event beforeSelectEvent
        */
        me.beforeSelectEvent = new CE(defEvents.BEFORE_SELECT);
        me.beforeSelectEvent.subscribe = sub; me.beforeSelectEvent.unsubscribe = unsub;

        /**
        * Fired when a date selection is made
        * @event selectEvent
        * @param {Array} Array of Date field arrays in the format [YYYY, MM, DD].
        */
        me.selectEvent = new CE(defEvents.SELECT); 
        me.selectEvent.subscribe = sub; me.selectEvent.unsubscribe = unsub;

        /**
        * Fired before a date or set of dates is deselected
        * @event beforeDeselectEvent
        */
        me.beforeDeselectEvent = new CE(defEvents.BEFORE_DESELECT); 
        me.beforeDeselectEvent.subscribe = sub; me.beforeDeselectEvent.unsubscribe = unsub;

        /**
        * Fired when a date or set of dates has been deselected
        * @event deselectEvent
        * @param {Array} Array of Date field arrays in the format [YYYY, MM, DD].
        */
        me.deselectEvent = new CE(defEvents.DESELECT); 
        me.deselectEvent.subscribe = sub; me.deselectEvent.unsubscribe = unsub;
        
        /**
        * Fired when the Calendar page is changed
        * @event changePageEvent
        */
        me.changePageEvent = new CE(defEvents.CHANGE_PAGE); 
        me.changePageEvent.subscribe = sub; me.changePageEvent.unsubscribe = unsub;

        /**
        * Fired before the Calendar is rendered
        * @event beforeRenderEvent
        */
        me.beforeRenderEvent = new CE(defEvents.BEFORE_RENDER);
        me.beforeRenderEvent.subscribe = sub; me.beforeRenderEvent.unsubscribe = unsub;
    
        /**
        * Fired when the Calendar is rendered
        * @event renderEvent
        */
        me.renderEvent = new CE(defEvents.RENDER);
        me.renderEvent.subscribe = sub; me.renderEvent.unsubscribe = unsub;
    
        /**
        * Fired when the Calendar is reset
        * @event resetEvent
        */
        me.resetEvent = new CE(defEvents.RESET); 
        me.resetEvent.subscribe = sub; me.resetEvent.unsubscribe = unsub;
    
        /**
        * Fired when the Calendar is cleared
        * @event clearEvent
        */
        me.clearEvent = new CE(defEvents.CLEAR);
        me.clearEvent.subscribe = sub; me.clearEvent.unsubscribe = unsub;

        /**
        * Fired just before the CalendarGroup is to be shown
        * @event beforeShowEvent
        */
        me.beforeShowEvent = new CE(defEvents.BEFORE_SHOW);
    
        /**
        * Fired after the CalendarGroup is shown
        * @event showEvent
        */
        me.showEvent = new CE(defEvents.SHOW);
    
        /**
        * Fired just before the CalendarGroup is to be hidden
        * @event beforeHideEvent
        */
        me.beforeHideEvent = new CE(defEvents.BEFORE_HIDE);
    
        /**
        * Fired after the CalendarGroup is hidden
        * @event hideEvent
        */
        me.hideEvent = new CE(defEvents.HIDE);

        /**
        * Fired just before the CalendarNavigator is to be shown
        * @event beforeShowNavEvent
        */
        me.beforeShowNavEvent = new CE(defEvents.BEFORE_SHOW_NAV);
    
        /**
        * Fired after the CalendarNavigator is shown
        * @event showNavEvent
        */
        me.showNavEvent = new CE(defEvents.SHOW_NAV);
    
        /**
        * Fired just before the CalendarNavigator is to be hidden
        * @event beforeHideNavEvent
        */
        me.beforeHideNavEvent = new CE(defEvents.BEFORE_HIDE_NAV);

        /**
        * Fired after the CalendarNavigator is hidden
        * @event hideNavEvent
        */
        me.hideNavEvent = new CE(defEvents.HIDE_NAV);

        /**
        * Fired just before the CalendarNavigator is to be rendered
        * @event beforeRenderNavEvent
        */
        me.beforeRenderNavEvent = new CE(defEvents.BEFORE_RENDER_NAV);

        /**
        * Fired after the CalendarNavigator is rendered
        * @event renderNavEvent
        */
        me.renderNavEvent = new CE(defEvents.RENDER_NAV);

        /**
        * Fired just before the CalendarGroup is to be destroyed
        * @event beforeDestroyEvent
        */
        me.beforeDestroyEvent = new CE(defEvents.BEFORE_DESTROY);

        /**
        * Fired after the CalendarGroup is destroyed. This event should be used
        * for notification only. When this event is fired, important CalendarGroup instance
        * properties, dom references and event listeners have already been 
        * removed/dereferenced, and hence the CalendarGroup instance is not in a usable 
        * state.
        *
        * @event destroyEvent
        */
        me.destroyEvent = new CE(defEvents.DESTROY);
    },
    
    /**
    * The default Config handler for the "pages" property
    * @method configPages
    * @param {String} type The CustomEvent type (usually the property name)
    * @param {Object[]} args The CustomEvent arguments. For configuration handlers, args[0] will equal the newly applied value for the property.
    * @param {Object} obj The scope object. For configuration handlers, this will usually equal the owner.
    */
    configPages : function(type, args, obj) {
        var pageCount = args[0],
            cfgPageDate = DEF_CFG.PAGEDATE.key,
            sep = "_",
            caldate,
            firstPageDate = null,
            groupCalClass = "groupcal",
            firstClass = "first-of-type",
            lastClass = "last-of-type";

        for (var p=0;p<pageCount;++p) {
            var calId = this.id + sep + p,
                calContainerId = this.containerId + sep + p,
                childConfig = this.cfg.getConfig();

            childConfig.close = false;
            childConfig.title = false;
            childConfig.navigator = null;

            if (p > 0) {
                caldate = new Date(firstPageDate);
                this._setMonthOnDate(caldate, caldate.getMonth() + p);
                childConfig.pageDate = caldate;
            }

            var cal = this.constructChild(calId, calContainerId, childConfig);

            Dom.removeClass(cal.oDomContainer, this.Style.CSS_SINGLE);
            Dom.addClass(cal.oDomContainer, groupCalClass);

            if (p===0) {
                firstPageDate = cal.cfg.getProperty(cfgPageDate);
                Dom.addClass(cal.oDomContainer, firstClass);
            }
    
            if (p==(pageCount-1)) {
                Dom.addClass(cal.oDomContainer, lastClass);
            }
    
            cal.parent = this;
            cal.index = p; 
    
            this.pages[this.pages.length] = cal;
        }
    },
    
    /**
    * The default Config handler for the "pagedate" property
    * @method configPageDate
    * @param {String} type The CustomEvent type (usually the property name)
    * @param {Object[]} args The CustomEvent arguments. For configuration handlers, args[0] will equal the newly applied value for the property.
    * @param {Object} obj The scope object. For configuration handlers, this will usually equal the owner.
    */
    configPageDate : function(type, args, obj) {
        var val = args[0],
            firstPageDate;

        var cfgPageDate = DEF_CFG.PAGEDATE.key;
        
        for (var p=0;p<this.pages.length;++p) {
            var cal = this.pages[p];
            if (p === 0) {
                firstPageDate = cal._parsePageDate(val);
                cal.cfg.setProperty(cfgPageDate, firstPageDate);
            } else {
                var pageDate = new Date(firstPageDate);
                this._setMonthOnDate(pageDate, pageDate.getMonth() + p);
                cal.cfg.setProperty(cfgPageDate, pageDate);
            }
        }
    },
    
    /**
    * The default Config handler for the CalendarGroup "selected" property
    * @method configSelected
    * @param {String} type The CustomEvent type (usually the property name)
    * @param {Object[]} args The CustomEvent arguments. For configuration handlers, args[0] will equal the newly applied value for the property.
    * @param {Object} obj The scope object. For configuration handlers, this will usually equal the owner.
    */
    configSelected : function(type, args, obj) {
        var cfgSelected = DEF_CFG.SELECTED.key;
        this.delegateConfig(type, args, obj);
        var selected = (this.pages.length > 0) ? this.pages[0].cfg.getProperty(cfgSelected) : []; 
        this.cfg.setProperty(cfgSelected, selected, true);
    },

    
    /**
    * Delegates a configuration property to the CustomEvents associated with the CalendarGroup's children
    * @method delegateConfig
    * @param {String} type The CustomEvent type (usually the property name)
    * @param {Object[]} args The CustomEvent arguments. For configuration handlers, args[0] will equal the newly applied value for the property.
    * @param {Object} obj The scope object. For configuration handlers, this will usually equal the owner.
    */
    delegateConfig : function(type, args, obj) {
        var val = args[0];
        var cal;
    
        for (var p=0;p<this.pages.length;p++) {
            cal = this.pages[p];
            cal.cfg.setProperty(type, val);
        }
    },

    /**
    * Adds a function to all child Calendars within this CalendarGroup.
    * @method setChildFunction
    * @param {String}  fnName  The name of the function
    * @param {Function}  fn   The function to apply to each Calendar page object
    */
    setChildFunction : function(fnName, fn) {
        var pageCount = this.cfg.getProperty(DEF_CFG.PAGES.key);
    
        for (var p=0;p<pageCount;++p) {
            this.pages[p][fnName] = fn;
        }
    },

    /**
    * Calls a function within all child Calendars within this CalendarGroup.
    * @method callChildFunction
    * @param {String}  fnName  The name of the function
    * @param {Array}  args  The arguments to pass to the function
    */
    callChildFunction : function(fnName, args) {
        var pageCount = this.cfg.getProperty(DEF_CFG.PAGES.key);

        for (var p=0;p<pageCount;++p) {
            var page = this.pages[p];
            if (page[fnName]) {
                var fn = page[fnName];
                fn.call(page, args);
            }
        } 
    },

    /**
    * Constructs a child calendar. This method can be overridden if a subclassed version of the default
    * calendar is to be used.
    * @method constructChild
    * @param {String} id   The id of the table element that will represent the calendar widget
    * @param {String} containerId The id of the container div element that will wrap the calendar table
    * @param {Object} config  The configuration object containing the Calendar's arguments
    * @return {YAHOO.widget.Calendar} The YAHOO.widget.Calendar instance that is constructed
    */
    constructChild : function(id,containerId,config) {
        var container = document.getElementById(containerId);
        if (! container) {
            container = document.createElement("div");
            container.id = containerId;
            this.oDomContainer.appendChild(container);
        }
        return new Calendar(id,containerId,config);
    },
    
    /**
    * Sets the calendar group's month explicitly. This month will be set into the first
    * page of the multi-page calendar, and all other months will be iterated appropriately.
    * @method setMonth
    * @param {Number} month  The numeric month, from 0 (January) to 11 (December)
    */
    setMonth : function(month) {
        month = parseInt(month, 10);
        var currYear;

        var cfgPageDate = DEF_CFG.PAGEDATE.key;

        for (var p=0; p<this.pages.length; ++p) {
            var cal = this.pages[p];
            var pageDate = cal.cfg.getProperty(cfgPageDate);
            if (p === 0) {
                currYear = pageDate.getFullYear();
            } else {
                pageDate.setFullYear(currYear);
            }
            this._setMonthOnDate(pageDate, month+p); 
            cal.cfg.setProperty(cfgPageDate, pageDate);
        }
    },

    /**
    * Sets the calendar group's year explicitly. This year will be set into the first
    * page of the multi-page calendar, and all other months will be iterated appropriately.
    * @method setYear
    * @param {Number} year  The numeric 4-digit year
    */
    setYear : function(year) {
    
        var cfgPageDate = DEF_CFG.PAGEDATE.key;
    
        year = parseInt(year, 10);
        for (var p=0;p<this.pages.length;++p) {
            var cal = this.pages[p];
            var pageDate = cal.cfg.getProperty(cfgPageDate);
    
            if ((pageDate.getMonth()+1) == 1 && p>0) {
                year+=1;
            }
            cal.setYear(year);
        }
    },

    /**
    * Calls the render function of all child calendars within the group.
    * @method render
    */
    render : function() {
        this.renderHeader();
        for (var p=0;p<this.pages.length;++p) {
            var cal = this.pages[p];
            cal.render();
        }
        this.renderFooter();
    },

    /**
    * Selects a date or a collection of dates on the current calendar. This method, by default,
    * does not call the render method explicitly. Once selection has completed, render must be 
    * called for the changes to be reflected visually.
    * @method select
    * @param    {String/Date/Date[]}    date    The date string of dates to select in the current calendar. Valid formats are
    *                               individual date(s) (12/24/2005,12/26/2005) or date range(s) (12/24/2005-1/1/2006).
    *                               Multiple comma-delimited dates can also be passed to this method (12/24/2005,12/11/2005-12/13/2005).
    *                               This method can also take a JavaScript Date object or an array of Date objects.
    * @return {Date[]} Array of JavaScript Date objects representing all individual dates that are currently selected.
    */
    select : function(date) {
        for (var p=0;p<this.pages.length;++p) {
            var cal = this.pages[p];
            cal.select(date);
        }
        return this.getSelectedDates();
    },

    /**
    * Selects dates in the CalendarGroup based on the cell index provided. This method is used to select cells without having to do a full render. The selected style is applied to the cells directly.
    * The value of the MULTI_SELECT Configuration attribute will determine the set of dates which get selected. 
    * <ul>
    *    <li>If MULTI_SELECT is false, selectCell will select the cell at the specified index for only the last displayed Calendar page.</li>
    *    <li>If MULTI_SELECT is true, selectCell will select the cell at the specified index, on each displayed Calendar page.</li>
    * </ul>
    * @method selectCell
    * @param {Number} cellIndex The index of the cell to be selected. 
    * @return {Date[]} Array of JavaScript Date objects representing all individual dates that are currently selected.
    */
    selectCell : function(cellIndex) {
        for (var p=0;p<this.pages.length;++p) {
            var cal = this.pages[p];
            cal.selectCell(cellIndex);
        }
        return this.getSelectedDates();
    },
    
    /**
    * Deselects a date or a collection of dates on the current calendar. This method, by default,
    * does not call the render method explicitly. Once deselection has completed, render must be 
    * called for the changes to be reflected visually.
    * @method deselect
    * @param {String/Date/Date[]} date The date string of dates to deselect in the current calendar. Valid formats are
    *        individual date(s) (12/24/2005,12/26/2005) or date range(s) (12/24/2005-1/1/2006).
    *        Multiple comma-delimited dates can also be passed to this method (12/24/2005,12/11/2005-12/13/2005).
    *        This method can also take a JavaScript Date object or an array of Date objects. 
    * @return {Date[]}   Array of JavaScript Date objects representing all individual dates that are currently selected.
    */
    deselect : function(date) {
        for (var p=0;p<this.pages.length;++p) {
            var cal = this.pages[p];
            cal.deselect(date);
        }
        return this.getSelectedDates();
    },
    
    /**
    * Deselects all dates on the current calendar.
    * @method deselectAll
    * @return {Date[]}  Array of JavaScript Date objects representing all individual dates that are currently selected.
    *      Assuming that this function executes properly, the return value should be an empty array.
    *      However, the empty array is returned for the sake of being able to check the selection status
    *      of the calendar.
    */
    deselectAll : function() {
        for (var p=0;p<this.pages.length;++p) {
            var cal = this.pages[p];
            cal.deselectAll();
        }
        return this.getSelectedDates();
    },

    /**
    * Deselects dates in the CalendarGroup based on the cell index provided. This method is used to select cells without having to do a full render. The selected style is applied to the cells directly.
    * deselectCell will deselect the cell at the specified index on each displayed Calendar page.
    *
    * @method deselectCell
    * @param {Number} cellIndex The index of the cell to deselect. 
    * @return {Date[]} Array of JavaScript Date objects representing all individual dates that are currently selected.
    */
    deselectCell : function(cellIndex) {
        for (var p=0;p<this.pages.length;++p) {
            var cal = this.pages[p];
            cal.deselectCell(cellIndex);
        }
        return this.getSelectedDates();
    },

    /**
    * Resets the calendar widget to the originally selected month and year, and 
    * sets the calendar to the initial selection(s).
    * @method reset
    */
    reset : function() {
        for (var p=0;p<this.pages.length;++p) {
            var cal = this.pages[p];
            cal.reset();
        }
    },

    /**
    * Clears the selected dates in the current calendar widget and sets the calendar
    * to the current month and year.
    * @method clear
    */
    clear : function() {
        for (var p=0;p<this.pages.length;++p) {
            var cal = this.pages[p];
            cal.clear();
        }

        this.cfg.setProperty(DEF_CFG.SELECTED.key, []);
        this.cfg.setProperty(DEF_CFG.PAGEDATE.key, new Date(this.pages[0].today.getTime()));
        this.render();
    },

    /**
    * Navigates to the next month page in the calendar widget.
    * @method nextMonth
    */
    nextMonth : function() {
        for (var p=0;p<this.pages.length;++p) {
            var cal = this.pages[p];
            cal.nextMonth();
        }
    },
    
    /**
    * Navigates to the previous month page in the calendar widget.
    * @method previousMonth
    */
    previousMonth : function() {
        for (var p=this.pages.length-1;p>=0;--p) {
            var cal = this.pages[p];
            cal.previousMonth();
        }
    },
    
    /**
    * Navigates to the next year in the currently selected month in the calendar widget.
    * @method nextYear
    */
    nextYear : function() {
        for (var p=0;p<this.pages.length;++p) {
            var cal = this.pages[p];
            cal.nextYear();
        }
    },

    /**
    * Navigates to the previous year in the currently selected month in the calendar widget.
    * @method previousYear
    */
    previousYear : function() {
        for (var p=0;p<this.pages.length;++p) {
            var cal = this.pages[p];
            cal.previousYear();
        }
    },

    /**
    * Gets the list of currently selected dates from the calendar.
    * @return   An array of currently selected JavaScript Date objects.
    * @type Date[]
    */
    getSelectedDates : function() { 
        var returnDates = [];
        var selected = this.cfg.getProperty(DEF_CFG.SELECTED.key);
        for (var d=0;d<selected.length;++d) {
            var dateArray = selected[d];

            var date = DateMath.getDate(dateArray[0],dateArray[1]-1,dateArray[2]);
            returnDates.push(date);
        }

        returnDates.sort( function(a,b) { return a-b; } );
        return returnDates;
    },

    /**
    * Adds a renderer to the render stack. The function reference passed to this method will be executed
    * when a date cell matches the conditions specified in the date string for this renderer.
    * @method addRenderer
    * @param {String} sDates  A date string to associate with the specified renderer. Valid formats
    *         include date (12/24/2005), month/day (12/24), and range (12/1/2004-1/1/2005)
    * @param {Function} fnRender The function executed to render cells that match the render rules for this renderer.
    */
    addRenderer : function(sDates, fnRender) {
        for (var p=0;p<this.pages.length;++p) {
            var cal = this.pages[p];
            cal.addRenderer(sDates, fnRender);
        }
    },

    /**
    * Adds a month to the render stack. The function reference passed to this method will be executed
    * when a date cell matches the month passed to this method.
    * @method addMonthRenderer
    * @param {Number} month  The month (1-12) to associate with this renderer
    * @param {Function} fnRender The function executed to render cells that match the render rules for this renderer.
    */
    addMonthRenderer : function(month, fnRender) {
        for (var p=0;p<this.pages.length;++p) {
            var cal = this.pages[p];
            cal.addMonthRenderer(month, fnRender);
        }
    },

    /**
    * Adds a weekday to the render stack. The function reference passed to this method will be executed
    * when a date cell matches the weekday passed to this method.
    * @method addWeekdayRenderer
    * @param {Number} weekday  The weekday (1-7) to associate with this renderer. 1=Sunday, 2=Monday etc.
    * @param {Function} fnRender The function executed to render cells that match the render rules for this renderer.
    */
    addWeekdayRenderer : function(weekday, fnRender) {
        for (var p=0;p<this.pages.length;++p) {
            var cal = this.pages[p];
            cal.addWeekdayRenderer(weekday, fnRender);
        }
    },

    /**
     * Removes all custom renderers added to the CalendarGroup through the addRenderer, addMonthRenderer and 
     * addWeekRenderer methods. CalendarGroup's render method needs to be called to after removing renderers 
     * to see the changes applied.
     * 
     * @method removeRenderers
     */
    removeRenderers : function() {
        this.callChildFunction("removeRenderers");
    },

    /**
    * Renders the header for the CalendarGroup.
    * @method renderHeader
    */
    renderHeader : function() {
        // EMPTY DEFAULT IMPL
    },

    /**
    * Renders a footer for the 2-up calendar container. By default, this method is
    * unimplemented.
    * @method renderFooter
    */
    renderFooter : function() {
        // EMPTY DEFAULT IMPL
    },

    /**
    * Adds the designated number of months to the current calendar month, and sets the current
    * calendar page date to the new month.
    * @method addMonths
    * @param {Number} count The number of months to add to the current calendar
    */
    addMonths : function(count) {
        this.callChildFunction("addMonths", count);
    },
    
    /**
    * Subtracts the designated number of months from the current calendar month, and sets the current
    * calendar page date to the new month.
    * @method subtractMonths
    * @param {Number} count The number of months to subtract from the current calendar
    */
    subtractMonths : function(count) {
        this.callChildFunction("subtractMonths", count);
    },

    /**
    * Adds the designated number of years to the current calendar, and sets the current
    * calendar page date to the new month.
    * @method addYears
    * @param {Number} count The number of years to add to the current calendar
    */
    addYears : function(count) {
        this.callChildFunction("addYears", count);
    },

    /**
    * Subtcats the designated number of years from the current calendar, and sets the current
    * calendar page date to the new month.
    * @method subtractYears
    * @param {Number} count The number of years to subtract from the current calendar
    */
    subtractYears : function(count) {
        this.callChildFunction("subtractYears", count);
    },

    /**
     * Returns the Calendar page instance which has a pagedate (month/year) matching the given date. 
     * Returns null if no match is found.
     * 
     * @method getCalendarPage
     * @param {Date} date The JavaScript Date object for which a Calendar page is to be found.
     * @return {Calendar} The Calendar page instance representing the month to which the date 
     * belongs.
     */
    getCalendarPage : function(date) {
        var cal = null;
        if (date) {
            var y = date.getFullYear(),
                m = date.getMonth();

            var pages = this.pages;
            for (var i = 0; i < pages.length; ++i) {
                var pageDate = pages[i].cfg.getProperty("pagedate");
                if (pageDate.getFullYear() === y && pageDate.getMonth() === m) {
                    cal = pages[i];
                    break;
                }
            }
        }
        return cal;
    },

    /**
    * Sets the month on a Date object, taking into account year rollover if the month is less than 0 or greater than 11.
    * The Date object passed in is modified. It should be cloned before passing it into this method if the original value needs to be maintained
    * @method _setMonthOnDate
    * @private
    * @param {Date} date The Date object on which to set the month index
    * @param {Number} iMonth The month index to set
    */
    _setMonthOnDate : function(date, iMonth) {
        // Bug in Safari 1.3, 2.0 (WebKit build < 420), Date.setMonth does not work consistently if iMonth is not 0-11
        if (YAHOO.env.ua.webkit && YAHOO.env.ua.webkit < 420 && (iMonth < 0 || iMonth > 11)) {
            var newDate = DateMath.add(date, DateMath.MONTH, iMonth-date.getMonth());
            date.setTime(newDate.getTime());
        } else {
            date.setMonth(iMonth);
        }
    },
    
    /**
     * Fixes the width of the CalendarGroup container element, to account for miswrapped floats
     * @method _fixWidth
     * @private
     */
    _fixWidth : function() {
        var w = 0;
        for (var p=0;p<this.pages.length;++p) {
            var cal = this.pages[p];
            w += cal.oDomContainer.offsetWidth;
        }
        if (w > 0) {
            this.oDomContainer.style.width = w + "px";
        }
    },
    
    /**
    * Returns a string representation of the object.
    * @method toString
    * @return {String} A string representation of the CalendarGroup object.
    */
    toString : function() {
        return "CalendarGroup " + this.id;
    },

    /**
     * Destroys the CalendarGroup instance. The method will remove references
     * to HTML elements, remove any event listeners added by the CalendarGroup.
     * 
     * It will also destroy the Config and CalendarNavigator instances created by the 
     * CalendarGroup and the individual Calendar instances created for each page.
     *
     * @method destroy
     */
    destroy : function() {

        if (this.beforeDestroyEvent.fire()) {

            var cal = this;
    
            // Child objects
            if (cal.navigator) {
                cal.navigator.destroy();
            }
    
            if (cal.cfg) {
                cal.cfg.destroy();
            }
    
            // DOM event listeners
            Event.purgeElement(cal.oDomContainer, true);
    
            // Generated markup/DOM - Not removing the container DIV since we didn't create it.
            Dom.removeClass(cal.oDomContainer, CalendarGroup.CSS_CONTAINER);
            Dom.removeClass(cal.oDomContainer, CalendarGroup.CSS_MULTI_UP);
            
            for (var i = 0, l = cal.pages.length; i < l; i++) {
                cal.pages[i].destroy();
                cal.pages[i] = null;
            }
    
            cal.oDomContainer.innerHTML = "";
    
            // JS-to-DOM references
            cal.oDomContainer = null;
    
            this.destroyEvent.fire();
        }
    }
};

/**
* CSS class representing the container for the calendar
* @property YAHOO.widget.CalendarGroup.CSS_CONTAINER
* @static
* @final
* @type String
*/
CalendarGroup.CSS_CONTAINER = "yui-calcontainer";

/**
* CSS class representing the container for the calendar
* @property YAHOO.widget.CalendarGroup.CSS_MULTI_UP
* @static
* @final
* @type String
*/
CalendarGroup.CSS_MULTI_UP = "multi";

/**
* CSS class representing the title for the 2-up calendar
* @property YAHOO.widget.CalendarGroup.CSS_2UPTITLE
* @static
* @final
* @type String
*/
CalendarGroup.CSS_2UPTITLE = "title";

/**
* CSS class representing the close icon for the 2-up calendar
* @property YAHOO.widget.CalendarGroup.CSS_2UPCLOSE
* @static
* @final
* @deprecated Along with Calendar.IMG_ROOT and NAV_ARROW_LEFT, NAV_ARROW_RIGHT configuration properties.
*     Calendar's <a href="YAHOO.widget.Calendar.html#Style.CSS_CLOSE">Style.CSS_CLOSE</a> property now represents the CSS class used to render the close icon
* @type String
*/
CalendarGroup.CSS_2UPCLOSE = "close-icon";

YAHOO.lang.augmentProto(CalendarGroup, Calendar, "buildDayLabel",
                                                 "buildMonthLabel",
                                                 "renderOutOfBoundsDate",
                                                 "renderRowHeader",
                                                 "renderRowFooter",
                                                 "renderCellDefault",
                                                 "styleCellDefault",
                                                 "renderCellStyleHighlight1",
                                                 "renderCellStyleHighlight2",
                                                 "renderCellStyleHighlight3",
                                                 "renderCellStyleHighlight4",
                                                 "renderCellStyleToday",
                                                 "renderCellStyleSelected",
                                                 "renderCellNotThisMonth",
                                                 "renderBodyCellRestricted",
                                                 "initStyles",
                                                 "configTitle",
                                                 "configClose",
                                                 "configIframe",
                                                 "configStrings",
                                                 "configToday",
                                                 "configNavigator",
                                                 "createTitleBar",
                                                 "createCloseButton",
                                                 "removeTitleBar",
                                                 "removeCloseButton",
                                                 "hide",
                                                 "show",
                                                 "toDate",
                                                 "_toDate",
                                                 "_parseArgs",
                                                 "browser");

YAHOO.widget.CalGrp = CalendarGroup;
YAHOO.widget.CalendarGroup = CalendarGroup;

/**
* @class YAHOO.widget.Calendar2up
* @extends YAHOO.widget.CalendarGroup
* @deprecated The old Calendar2up class is no longer necessary, since CalendarGroup renders in a 2up view by default.
*/
YAHOO.widget.Calendar2up = function(id, containerId, config) {
    this.init(id, containerId, config);
};

YAHOO.extend(YAHOO.widget.Calendar2up, CalendarGroup);

/**
* @deprecated The old Calendar2up class is no longer necessary, since CalendarGroup renders in a 2up view by default.
*/
YAHOO.widget.Cal2up = YAHOO.widget.Calendar2up;

})();
/**
 * The CalendarNavigator is used along with a Calendar/CalendarGroup to 
 * provide a Month/Year popup navigation control, allowing the user to navigate 
 * to a specific month/year in the Calendar/CalendarGroup without having to 
 * scroll through months sequentially
 *
 * @namespace YAHOO.widget
 * @class CalendarNavigator
 * @constructor
 * @param {Calendar|CalendarGroup} cal The instance of the Calendar or CalendarGroup to which this CalendarNavigator should be attached.
 */
YAHOO.widget.CalendarNavigator = function(cal) {
    this.init(cal);
};

(function() {
    // Setup static properties (inside anon fn, so that we can use shortcuts)
    var CN = YAHOO.widget.CalendarNavigator;

    /**
     * YAHOO.widget.CalendarNavigator.CLASSES contains constants
     * for the class values applied to the CalendarNaviatgator's 
     * DOM elements
     * @property YAHOO.widget.CalendarNavigator.CLASSES
     * @type Object
     * @static
     */
    CN.CLASSES = {
        /**
         * Class applied to the Calendar Navigator's bounding box
         * @property YAHOO.widget.CalendarNavigator.CLASSES.NAV
         * @type String
         * @static
         */
        NAV :"yui-cal-nav",
        /**
         * Class applied to the Calendar/CalendarGroup's bounding box to indicate
         * the Navigator is currently visible
         * @property YAHOO.widget.CalendarNavigator.CLASSES.NAV_VISIBLE
         * @type String
         * @static
         */
        NAV_VISIBLE: "yui-cal-nav-visible",
        /**
         * Class applied to the Navigator mask's bounding box
         * @property YAHOO.widget.CalendarNavigator.CLASSES.MASK
         * @type String
         * @static
         */
        MASK : "yui-cal-nav-mask",
        /**
         * Class applied to the year label/control bounding box
         * @property YAHOO.widget.CalendarNavigator.CLASSES.YEAR
         * @type String
         * @static
         */
        YEAR : "yui-cal-nav-y",
        /**
         * Class applied to the month label/control bounding box
         * @property YAHOO.widget.CalendarNavigator.CLASSES.MONTH
         * @type String
         * @static
         */
        MONTH : "yui-cal-nav-m",
        /**
         * Class applied to the submit/cancel button's bounding box
         * @property YAHOO.widget.CalendarNavigator.CLASSES.BUTTONS
         * @type String
         * @static
         */
        BUTTONS : "yui-cal-nav-b",
        /**
         * Class applied to buttons wrapping element
         * @property YAHOO.widget.CalendarNavigator.CLASSES.BUTTON
         * @type String
         * @static
         */
        BUTTON : "yui-cal-nav-btn",
        /**
         * Class applied to the validation error area's bounding box
         * @property YAHOO.widget.CalendarNavigator.CLASSES.ERROR
         * @type String
         * @static
         */
        ERROR : "yui-cal-nav-e",
        /**
         * Class applied to the year input control
         * @property YAHOO.widget.CalendarNavigator.CLASSES.YEAR_CTRL
         * @type String
         * @static
         */
        YEAR_CTRL : "yui-cal-nav-yc",
        /**
         * Class applied to the month input control
         * @property YAHOO.widget.CalendarNavigator.CLASSES.MONTH_CTRL
         * @type String
         * @static
         */
        MONTH_CTRL : "yui-cal-nav-mc",
        /**
         * Class applied to controls with invalid data (e.g. a year input field with invalid an year)
         * @property YAHOO.widget.CalendarNavigator.CLASSES.INVALID
         * @type String
         * @static
         */
        INVALID : "yui-invalid",
        /**
         * Class applied to default controls
         * @property YAHOO.widget.CalendarNavigator.CLASSES.DEFAULT
         * @type String
         * @static
         */
        DEFAULT : "yui-default"
    };

    /**
     * Object literal containing the default configuration values for the CalendarNavigator
     * The configuration object is expected to follow the format below, with the properties being
     * case sensitive.
     * <dl>
     * <dt>strings</dt>
     * <dd><em>Object</em> :  An object with the properties shown below, defining the string labels to use in the Navigator's UI
     *     <dl>
     *         <dt>month</dt><dd><em>String</em> : The string to use for the month label. Defaults to "Month".</dd>
     *         <dt>year</dt><dd><em>String</em> : The string to use for the year label. Defaults to "Year".</dd>
     *         <dt>submit</dt><dd><em>String</em> : The string to use for the submit button label. Defaults to "Okay".</dd>
     *         <dt>cancel</dt><dd><em>String</em> : The string to use for the cancel button label. Defaults to "Cancel".</dd>
     *         <dt>invalidYear</dt><dd><em>String</em> : The string to use for invalid year values. Defaults to "Year needs to be a number".</dd>
     *     </dl>
     * </dd>
     * <dt>monthFormat</dt><dd><em>String</em> : The month format to use. Either YAHOO.widget.Calendar.LONG, or YAHOO.widget.Calendar.SHORT. Defaults to YAHOO.widget.Calendar.LONG</dd>
     * <dt>initialFocus</dt><dd><em>String</em> : Either "year" or "month" specifying which input control should get initial focus. Defaults to "year"</dd>
     * </dl>
     * @property DEFAULT_CONFIG
     * @type Object
     * @static
     */
    CN.DEFAULT_CONFIG = {
        strings : {
            month: "Month",
            year: "Year",
            submit: "Okay",
            cancel: "Cancel",
            invalidYear : "Year needs to be a number"
        },
        monthFormat: YAHOO.widget.Calendar.LONG,
        initialFocus: "year"
    };
    
    /**
     * Object literal containing the default configuration values for the CalendarNavigator
     * @property _DEFAULT_CFG
     * @protected
     * @deprecated Made public. See the public DEFAULT_CONFIG property
     * @type Object
     * @static
     */
    CN._DEFAULT_CFG = CN.DEFAULT_CONFIG;


    /**
     * The suffix added to the Calendar/CalendarGroup's ID, to generate
     * a unique ID for the Navigator and it's bounding box.
     * @property YAHOO.widget.CalendarNavigator.ID_SUFFIX
     * @static
     * @type String
     * @final
     */
    CN.ID_SUFFIX = "_nav";
    /**
     * The suffix added to the Navigator's ID, to generate
     * a unique ID for the month control.
     * @property YAHOO.widget.CalendarNavigator.MONTH_SUFFIX
     * @static
     * @type String 
     * @final
     */
    CN.MONTH_SUFFIX = "_month";
    /**
     * The suffix added to the Navigator's ID, to generate
     * a unique ID for the year control.
     * @property YAHOO.widget.CalendarNavigator.YEAR_SUFFIX
     * @static
     * @type String
     * @final
     */
    CN.YEAR_SUFFIX = "_year";
    /**
     * The suffix added to the Navigator's ID, to generate
     * a unique ID for the error bounding box.
     * @property YAHOO.widget.CalendarNavigator.ERROR_SUFFIX
     * @static
     * @type String
     * @final
     */
    CN.ERROR_SUFFIX = "_error";
    /**
     * The suffix added to the Navigator's ID, to generate
     * a unique ID for the "Cancel" button.
     * @property YAHOO.widget.CalendarNavigator.CANCEL_SUFFIX
     * @static
     * @type String
     * @final
     */
    CN.CANCEL_SUFFIX = "_cancel";
    /**
     * The suffix added to the Navigator's ID, to generate
     * a unique ID for the "Submit" button.
     * @property YAHOO.widget.CalendarNavigator.SUBMIT_SUFFIX
     * @static
     * @type String
     * @final
     */
    CN.SUBMIT_SUFFIX = "_submit";

    /**
     * The number of digits to which the year input control is to be limited.
     * @property YAHOO.widget.CalendarNavigator.YR_MAX_DIGITS
     * @static
     * @type Number
     */
    CN.YR_MAX_DIGITS = 4;

    /**
     * The amount by which to increment the current year value,
     * when the arrow up/down key is pressed on the year control
     * @property YAHOO.widget.CalendarNavigator.YR_MINOR_INC
     * @static
     * @type Number
     */
    CN.YR_MINOR_INC = 1;

    /**
     * The amount by which to increment the current year value,
     * when the page up/down key is pressed on the year control
     * @property YAHOO.widget.CalendarNavigator.YR_MAJOR_INC
     * @static
     * @type Number
     */
    CN.YR_MAJOR_INC = 10;

    /**
     * Artificial delay (in ms) between the time the Navigator is hidden
     * and the Calendar/CalendarGroup state is updated. Allows the user
     * the see the Calendar/CalendarGroup page changing. If set to 0
     * the Calendar/CalendarGroup page will be updated instantly
     * @property YAHOO.widget.CalendarNavigator.UPDATE_DELAY
     * @static
     * @type Number
     */
    CN.UPDATE_DELAY = 50;

    /**
     * Regular expression used to validate the year input
     * @property YAHOO.widget.CalendarNavigator.YR_PATTERN
     * @static
     * @type RegExp
     */
    CN.YR_PATTERN = /^\d+$/;
    /**
     * Regular expression used to trim strings
     * @property YAHOO.widget.CalendarNavigator.TRIM
     * @static
     * @type RegExp
     */
    CN.TRIM = /^\s*(.*?)\s*$/;
})();

YAHOO.widget.CalendarNavigator.prototype = {

    /**
     * The unique ID for this CalendarNavigator instance
     * @property id
     * @type String
     */
    id : null,

    /**
     * The Calendar/CalendarGroup instance to which the navigator belongs
     * @property cal
     * @type {Calendar|CalendarGroup}
     */
    cal : null,

    /**
     * Reference to the HTMLElement used to render the navigator's bounding box
     * @property navEl
     * @type HTMLElement
     */
    navEl : null,

    /**
     * Reference to the HTMLElement used to render the navigator's mask
     * @property maskEl
     * @type HTMLElement
     */
    maskEl : null,

    /**
     * Reference to the HTMLElement used to input the year
     * @property yearEl
     * @type HTMLElement
     */
    yearEl : null,

    /**
     * Reference to the HTMLElement used to input the month
     * @property monthEl
     * @type HTMLElement
     */
    monthEl : null,

    /**
     * Reference to the HTMLElement used to display validation errors
     * @property errorEl
     * @type HTMLElement
     */
    errorEl : null,

    /**
     * Reference to the HTMLElement used to update the Calendar/Calendar group
     * with the month/year values
     * @property submitEl
     * @type HTMLElement
     */
    submitEl : null,
    
    /**
     * Reference to the HTMLElement used to hide the navigator without updating the 
     * Calendar/Calendar group
     * @property cancelEl
     * @type HTMLElement
     */
    cancelEl : null,

    /** 
     * Reference to the first focusable control in the navigator (by default monthEl)
     * @property firstCtrl
     * @type HTMLElement
     */
    firstCtrl : null,
    
    /** 
     * Reference to the last focusable control in the navigator (by default cancelEl)
     * @property lastCtrl
     * @type HTMLElement
     */
    lastCtrl : null,

    /**
     * The document containing the Calendar/Calendar group instance
     * @protected
     * @property _doc
     * @type HTMLDocument
     */
    _doc : null,

    /**
     * Internal state property for the current year displayed in the navigator
     * @protected
     * @property _year
     * @type Number
     */
    _year: null,
    
    /**
     * Internal state property for the current month index displayed in the navigator
     * @protected
     * @property _month
     * @type Number
     */
    _month: 0,

    /**
     * Private internal state property which indicates whether or not the 
     * Navigator has been rendered.
     * @private
     * @property __rendered
     * @type Boolean
     */
    __rendered: false,

    /**
     * Init lifecycle method called as part of construction
     * 
     * @method init
     * @param {Calendar} cal The instance of the Calendar or CalendarGroup to which this CalendarNavigator should be attached
     */
    init : function(cal) {
        var calBox = cal.oDomContainer;

        this.cal = cal;
        this.id = calBox.id + YAHOO.widget.CalendarNavigator.ID_SUFFIX;
        this._doc = calBox.ownerDocument;

        /**
         * Private flag, to identify IE Quirks
         * @private
         * @property __isIEQuirks
         */
        var ie = YAHOO.env.ua.ie;
        this.__isIEQuirks = (ie && ((ie <= 6) || (this._doc.compatMode == "BackCompat")));
    },

    /**
     * Displays the navigator and mask, updating the input controls to reflect the 
     * currently set month and year. The show method will invoke the render method
     * if the navigator has not been renderered already, allowing for lazy rendering
     * of the control.
     * 
     * The show method will fire the Calendar/CalendarGroup's beforeShowNav and showNav events
     * 
     * @method show
     */
    show : function() {
        var CLASSES = YAHOO.widget.CalendarNavigator.CLASSES;

        if (this.cal.beforeShowNavEvent.fire()) {
            if (!this.__rendered) {
                this.render();
            }
            this.clearErrors();

            this._updateMonthUI();
            this._updateYearUI();
            this._show(this.navEl, true);

            this.setInitialFocus();
            this.showMask();

            YAHOO.util.Dom.addClass(this.cal.oDomContainer, CLASSES.NAV_VISIBLE);
            this.cal.showNavEvent.fire();
        }
    },

    /**
     * Hides the navigator and mask
     * 
     * The show method will fire the Calendar/CalendarGroup's beforeHideNav event and hideNav events
     * @method hide
     */
    hide : function() {
        var CLASSES = YAHOO.widget.CalendarNavigator.CLASSES;

        if (this.cal.beforeHideNavEvent.fire()) {
            this._show(this.navEl, false);
            this.hideMask();
            YAHOO.util.Dom.removeClass(this.cal.oDomContainer, CLASSES.NAV_VISIBLE);
            this.cal.hideNavEvent.fire();
        }
    },
    

    /**
     * Displays the navigator's mask element
     * 
     * @method showMask
     */
    showMask : function() {
        this._show(this.maskEl, true);
        if (this.__isIEQuirks) {
            this._syncMask();
        }
    },

    /**
     * Hides the navigator's mask element
     * 
     * @method hideMask
     */
    hideMask : function() {
        this._show(this.maskEl, false);
    },

    /**
     * Returns the current month set on the navigator
     * 
     * Note: This may not be the month set in the UI, if 
     * the UI contains an invalid value.
     * 
     * @method getMonth
     * @return {Number} The Navigator's current month index
     */
    getMonth: function() {
        return this._month;
    },

    /**
     * Returns the current year set on the navigator
     * 
     * Note: This may not be the year set in the UI, if 
     * the UI contains an invalid value.
     * 
     * @method getYear
     * @return {Number} The Navigator's current year value
     */
    getYear: function() {
        return this._year;
    },

    /**
     * Sets the current month on the Navigator, and updates the UI
     * 
     * @method setMonth
     * @param {Number} nMonth The month index, from 0 (Jan) through 11 (Dec).
     */
    setMonth : function(nMonth) {
        if (nMonth >= 0 && nMonth < 12) {
            this._month = nMonth;
        }
        this._updateMonthUI();
    },

    /**
     * Sets the current year on the Navigator, and updates the UI. If the 
     * provided year is invalid, it will not be set.
     * 
     * @method setYear
     * @param {Number} nYear The full year value to set the Navigator to.
     */
    setYear : function(nYear) {
        var yrPattern = YAHOO.widget.CalendarNavigator.YR_PATTERN;
        if (YAHOO.lang.isNumber(nYear) && yrPattern.test(nYear+"")) {
            this._year = nYear;
        }
        this._updateYearUI();
    },

    /**
     * Renders the HTML for the navigator, adding it to the 
     * document and attaches event listeners if it has not 
     * already been rendered.
     * 
     * @method render
     */
    render: function() {
        this.cal.beforeRenderNavEvent.fire();
        if (!this.__rendered) {
            this.createNav();
            this.createMask();
            this.applyListeners();
            this.__rendered = true;
        }
        this.cal.renderNavEvent.fire();
    },

    /**
     * Creates the navigator's containing HTMLElement, it's contents, and appends 
     * the containg element to the Calendar/CalendarGroup's container.
     * 
     * @method createNav
     */
    createNav : function() {
        var NAV = YAHOO.widget.CalendarNavigator;
        var doc = this._doc;

        var d = doc.createElement("div");
        d.className = NAV.CLASSES.NAV;

        var htmlBuf = this.renderNavContents([]);

        d.innerHTML = htmlBuf.join('');
        this.cal.oDomContainer.appendChild(d);

        this.navEl = d;

        this.yearEl = doc.getElementById(this.id + NAV.YEAR_SUFFIX);
        this.monthEl = doc.getElementById(this.id + NAV.MONTH_SUFFIX);
        this.errorEl = doc.getElementById(this.id + NAV.ERROR_SUFFIX);
        this.submitEl = doc.getElementById(this.id + NAV.SUBMIT_SUFFIX);
        this.cancelEl = doc.getElementById(this.id + NAV.CANCEL_SUFFIX);

        if (YAHOO.env.ua.gecko && this.yearEl && this.yearEl.type == "text") {
            // Avoid XUL error on focus, select [ https://bugzilla.mozilla.org/show_bug.cgi?id=236791, 
            // supposedly fixed in 1.8.1, but there are reports of it still being around for methods other than blur ]
            this.yearEl.setAttribute("autocomplete", "off");
        }

        this._setFirstLastElements();
    },

    /**
     * Creates the Mask HTMLElement and appends it to the Calendar/CalendarGroups
     * container.
     * 
     * @method createMask
     */
    createMask : function() {
        var C = YAHOO.widget.CalendarNavigator.CLASSES;

        var d = this._doc.createElement("div");
        d.className = C.MASK;

        this.cal.oDomContainer.appendChild(d);
        this.maskEl = d;
    },

    /**
     * Used to set the width/height of the mask in pixels to match the Calendar Container.
     * Currently only used for IE6 or IE in quirks mode. The other A-Grade browser are handled using CSS (width/height 100%).
     * <p>
     * The method is also registered as an HTMLElement resize listener on the Calendars container element.
     * </p>
     * @protected
     * @method _syncMask
     */
    _syncMask : function() {
        var c = this.cal.oDomContainer;
        if (c && this.maskEl) {
            var r = YAHOO.util.Dom.getRegion(c);
            YAHOO.util.Dom.setStyle(this.maskEl, "width", r.right - r.left + "px");
            YAHOO.util.Dom.setStyle(this.maskEl, "height", r.bottom - r.top + "px");
        }
    },

    /**
     * Renders the contents of the navigator
     * 
     * @method renderNavContents
     * 
     * @param {Array} html The HTML buffer to append the HTML to.
     * @return {Array} A reference to the buffer passed in.
     */
    renderNavContents : function(html) {
        var NAV = YAHOO.widget.CalendarNavigator,
            C = NAV.CLASSES,
            h = html; // just to use a shorter name

        h[h.length] = '<div class="' + C.MONTH + '">';
        this.renderMonth(h);
        h[h.length] = '</div>';
        h[h.length] = '<div class="' + C.YEAR + '">';
        this.renderYear(h);
        h[h.length] = '</div>';
        h[h.length] = '<div class="' + C.BUTTONS + '">';
        this.renderButtons(h);
        h[h.length] = '</div>';
        h[h.length] = '<div class="' + C.ERROR + '" id="' + this.id + NAV.ERROR_SUFFIX + '"></div>';

        return h;
    },

    /**
     * Renders the month label and control for the navigator
     * 
     * @method renderNavContents
     * @param {Array} html The HTML buffer to append the HTML to.
     * @return {Array} A reference to the buffer passed in.
     */
    renderMonth : function(html) {
        var NAV = YAHOO.widget.CalendarNavigator,
            C = NAV.CLASSES;

        var id = this.id + NAV.MONTH_SUFFIX,
            mf = this.__getCfg("monthFormat"),
            months = this.cal.cfg.getProperty((mf == YAHOO.widget.Calendar.SHORT) ? "MONTHS_SHORT" : "MONTHS_LONG"),
            h = html;

        if (months && months.length > 0) {
            h[h.length] = '<label for="' + id + '">';
            h[h.length] = this.__getCfg("month", true);
            h[h.length] = '</label>';
            h[h.length] = '<select name="' + id + '" id="' + id + '" class="' + C.MONTH_CTRL + '">';
            for (var i = 0; i < months.length; i++) {
                h[h.length] = '<option value="' + i + '">';
                h[h.length] = months[i];
                h[h.length] = '</option>';
            }
            h[h.length] = '</select>';
        }
        return h;
    },

    /**
     * Renders the year label and control for the navigator
     * 
     * @method renderYear
     * @param {Array} html The HTML buffer to append the HTML to.
     * @return {Array} A reference to the buffer passed in.
     */
    renderYear : function(html) {
        var NAV = YAHOO.widget.CalendarNavigator,
            C = NAV.CLASSES;

        var id = this.id + NAV.YEAR_SUFFIX,
            size = NAV.YR_MAX_DIGITS,
            h = html;

        h[h.length] = '<label for="' + id + '">';
        h[h.length] = this.__getCfg("year", true);
        h[h.length] = '</label>';
        h[h.length] = '<input type="text" name="' + id + '" id="' + id + '" class="' + C.YEAR_CTRL + '" maxlength="' + size + '"/>';
        return h;
    },

    /**
     * Renders the submit/cancel buttons for the navigator
     * 
     * @method renderButton
     * @return {String} The HTML created for the Button UI
     */
    renderButtons : function(html) {
        var C = YAHOO.widget.CalendarNavigator.CLASSES;
        var h = html;

        h[h.length] = '<span class="' + C.BUTTON + ' ' + C.DEFAULT + '">';
        h[h.length] = '<button type="button" id="' + this.id + '_submit' + '">';
        h[h.length] = this.__getCfg("submit", true);
        h[h.length] = '</button>';
        h[h.length] = '</span>';
        h[h.length] = '<span class="' + C.BUTTON +'">';
        h[h.length] = '<button type="button" id="' + this.id + '_cancel' + '">';
        h[h.length] = this.__getCfg("cancel", true);
        h[h.length] = '</button>';
        h[h.length] = '</span>';

        return h;
    },

    /**
     * Attaches DOM event listeners to the rendered elements
     * <p>
     * The method will call applyKeyListeners, to setup keyboard specific 
     * listeners
     * </p>
     * @method applyListeners
     */
    applyListeners : function() {
        var E = YAHOO.util.Event;

        function yearUpdateHandler() {
            if (this.validate()) {
                this.setYear(this._getYearFromUI());
            }
        }

        function monthUpdateHandler() {
            this.setMonth(this._getMonthFromUI());
        }

        E.on(this.submitEl, "click", this.submit, this, true);
        E.on(this.cancelEl, "click", this.cancel, this, true);
        E.on(this.yearEl, "blur", yearUpdateHandler, this, true);
        E.on(this.monthEl, "change", monthUpdateHandler, this, true);

        if (this.__isIEQuirks) {
            YAHOO.util.Event.on(this.cal.oDomContainer, "resize", this._syncMask, this, true);
        }

        this.applyKeyListeners();
    },

    /**
     * Removes/purges DOM event listeners from the rendered elements
     * 
     * @method purgeListeners
     */
    purgeListeners : function() {
        var E = YAHOO.util.Event;
        E.removeListener(this.submitEl, "click", this.submit);
        E.removeListener(this.cancelEl, "click", this.cancel);
        E.removeListener(this.yearEl, "blur");
        E.removeListener(this.monthEl, "change");
        if (this.__isIEQuirks) {
            E.removeListener(this.cal.oDomContainer, "resize", this._syncMask);
        }

        this.purgeKeyListeners();
    },

    /**
     * Attaches DOM listeners for keyboard support. 
     * Tab/Shift-Tab looping, Enter Key Submit on Year element,
     * Up/Down/PgUp/PgDown year increment on Year element
     * <p>
     * NOTE: MacOSX Safari 2.x doesn't let you tab to buttons and 
     * MacOSX Gecko does not let you tab to buttons or select controls,
     * so for these browsers, Tab/Shift-Tab looping is limited to the 
     * elements which can be reached using the tab key.
     * </p>
     * @method applyKeyListeners
     */
    applyKeyListeners : function() {
        var E = YAHOO.util.Event,
            ua = YAHOO.env.ua;

        // IE/Safari 3.1 doesn't fire keypress for arrow/pg keys (non-char keys)
        var arrowEvt = (ua.ie || ua.webkit) ? "keydown" : "keypress";

        // - IE/Safari 3.1 doesn't fire keypress for non-char keys
        // - Opera doesn't allow us to cancel keydown or keypress for tab, but 
        //   changes focus successfully on keydown (keypress is too late to change focus - opera's already moved on).
        var tabEvt = (ua.ie || ua.opera || ua.webkit) ? "keydown" : "keypress";

        // Everyone likes keypress for Enter (char keys) - whoo hoo!
        E.on(this.yearEl, "keypress", this._handleEnterKey, this, true);

        E.on(this.yearEl, arrowEvt, this._handleDirectionKeys, this, true);
        E.on(this.lastCtrl, tabEvt, this._handleTabKey, this, true);
        E.on(this.firstCtrl, tabEvt, this._handleShiftTabKey, this, true);
    },

    /**
     * Removes/purges DOM listeners for keyboard support
     *
     * @method purgeKeyListeners
     */
    purgeKeyListeners : function() {
        var E = YAHOO.util.Event,
            ua = YAHOO.env.ua;

        var arrowEvt = (ua.ie || ua.webkit) ? "keydown" : "keypress";
        var tabEvt = (ua.ie || ua.opera || ua.webkit) ? "keydown" : "keypress";

        E.removeListener(this.yearEl, "keypress", this._handleEnterKey);
        E.removeListener(this.yearEl, arrowEvt, this._handleDirectionKeys);
        E.removeListener(this.lastCtrl, tabEvt, this._handleTabKey);
        E.removeListener(this.firstCtrl, tabEvt, this._handleShiftTabKey);
    },

    /**
     * Updates the Calendar/CalendarGroup's pagedate with the currently set month and year if valid.
     * <p>
     * If the currently set month/year is invalid, a validation error will be displayed and the 
     * Calendar/CalendarGroup's pagedate will not be updated.
     * </p>
     * @method submit
     */
    submit : function() {
        if (this.validate()) {
            this.hide();

            this.setMonth(this._getMonthFromUI());
            this.setYear(this._getYearFromUI());

            var cal = this.cal;

            // Artificial delay, just to help the user see something changed
            var delay = YAHOO.widget.CalendarNavigator.UPDATE_DELAY;
            if (delay > 0) {
                var nav = this;
                window.setTimeout(function(){ nav._update(cal); }, delay);
            } else {
                this._update(cal);
            }
        }
    },

    /**
     * Updates the Calendar rendered state, based on the state of the CalendarNavigator
     * @method _update
     * @param cal The Calendar instance to update
     * @protected
     */
    _update : function(cal) {
        var date = YAHOO.widget.DateMath.getDate(this.getYear() - cal.cfg.getProperty("YEAR_OFFSET"), this.getMonth(), 1);
        cal.cfg.setProperty("pagedate", date);
        cal.render();
    },

    /**
     * Hides the navigator and mask, without updating the Calendar/CalendarGroup's state
     * 
     * @method cancel
     */
    cancel : function() {
        this.hide();
    },

    /**
     * Validates the current state of the UI controls
     * 
     * @method validate
     * @return {Boolean} true, if the current UI state contains valid values, false if not
     */
    validate : function() {
        if (this._getYearFromUI() !== null) {
            this.clearErrors();
            return true;
        } else {
            this.setYearError();
            this.setError(this.__getCfg("invalidYear", true));
            return false;
        }
    },

    /**
     * Displays an error message in the Navigator's error panel
     * @method setError
     * @param {String} msg The error message to display
     */
    setError : function(msg) {
        if (this.errorEl) {
            this.errorEl.innerHTML = msg;
            this._show(this.errorEl, true);
        }
    },

    /**
     * Clears the navigator's error message and hides the error panel
     * @method clearError 
     */
    clearError : function() {
        if (this.errorEl) {
            this.errorEl.innerHTML = "";
            this._show(this.errorEl, false);
        }
    },

    /**
     * Displays the validation error UI for the year control
     * @method setYearError
     */
    setYearError : function() {
        YAHOO.util.Dom.addClass(this.yearEl, YAHOO.widget.CalendarNavigator.CLASSES.INVALID);
    },

    /**
     * Removes the validation error UI for the year control
     * @method clearYearError
     */
    clearYearError : function() {
        YAHOO.util.Dom.removeClass(this.yearEl, YAHOO.widget.CalendarNavigator.CLASSES.INVALID);
    },

    /**
     * Clears all validation and error messages in the UI
     * @method clearErrors
     */
    clearErrors : function() {
        this.clearError();
        this.clearYearError();
    },

    /**
     * Sets the initial focus, based on the configured value
     * @method setInitialFocus
     */
    setInitialFocus : function() {
        var el = this.submitEl,
            f = this.__getCfg("initialFocus");

        if (f && f.toLowerCase) {
            f = f.toLowerCase();
            if (f == "year") {
                el = this.yearEl;
                try {
                    this.yearEl.select();
                } catch (selErr) {
                    // Ignore;
                }
            } else if (f == "month") {
                el = this.monthEl;
            }
        }

        if (el && YAHOO.lang.isFunction(el.focus)) {
            try {
                el.focus();
            } catch (focusErr) {
                // TODO: Fall back if focus fails?
            }
        }
    },

    /**
     * Removes all renderered HTML elements for the Navigator from
     * the DOM, purges event listeners and clears (nulls) any property
     * references to HTML references
     * @method erase
     */
    erase : function() {
        if (this.__rendered) {
            this.purgeListeners();

            // Clear out innerHTML references
            this.yearEl = null;
            this.monthEl = null;
            this.errorEl = null;
            this.submitEl = null;
            this.cancelEl = null;
            this.firstCtrl = null;
            this.lastCtrl = null;
            if (this.navEl) {
                this.navEl.innerHTML = "";
            }

            var p = this.navEl.parentNode;
            if (p) {
                p.removeChild(this.navEl);
            }
            this.navEl = null;

            var pm = this.maskEl.parentNode;
            if (pm) {
                pm.removeChild(this.maskEl);
            }
            this.maskEl = null;
            this.__rendered = false;
        }
    },

    /**
     * Destroys the Navigator object and any HTML references
     * @method destroy
     */
    destroy : function() {
        this.erase();
        this._doc = null;
        this.cal = null;
        this.id = null;
    },

    /**
     * Protected implementation to handle how UI elements are 
     * hidden/shown.
     *
     * @method _show
     * @protected
     */
    _show : function(el, bShow) {
        if (el) {
            YAHOO.util.Dom.setStyle(el, "display", (bShow) ? "block" : "none");
        }
    },

    /**
     * Returns the month value (index), from the month UI element
     * @protected
     * @method _getMonthFromUI
     * @return {Number} The month index, or 0 if a UI element for the month
     * is not found
     */
    _getMonthFromUI : function() {
        if (this.monthEl) {
            return this.monthEl.selectedIndex;
        } else {
            return 0; // Default to Jan
        }
    },

    /**
     * Returns the year value, from the Navitator's year UI element
     * @protected
     * @method _getYearFromUI
     * @return {Number} The year value set in the UI, if valid. null is returned if 
     * the UI does not contain a valid year value.
     */
    _getYearFromUI : function() {
        var NAV = YAHOO.widget.CalendarNavigator;

        var yr = null;
        if (this.yearEl) {
            var value = this.yearEl.value;
            value = value.replace(NAV.TRIM, "$1");

            if (NAV.YR_PATTERN.test(value)) {
                yr = parseInt(value, 10);
            }
        }
        return yr;
    },

    /**
     * Updates the Navigator's year UI, based on the year value set on the Navigator object
     * @protected
     * @method _updateYearUI
     */
    _updateYearUI : function() {
        if (this.yearEl && this._year !== null) {
            this.yearEl.value = this._year;
        }
    },

    /**
     * Updates the Navigator's month UI, based on the month value set on the Navigator object
     * @protected
     * @method _updateMonthUI
     */
    _updateMonthUI : function() {
        if (this.monthEl) {
            this.monthEl.selectedIndex = this._month;
        }
    },

    /**
     * Sets up references to the first and last focusable element in the Navigator's UI
     * in terms of tab order (Naviagator's firstEl and lastEl properties). The references
     * are used to control modality by looping around from the first to the last control
     * and visa versa for tab/shift-tab navigation.
     * <p>
     * See <a href="#applyKeyListeners">applyKeyListeners</a>
     * </p>
     * @protected
     * @method _setFirstLastElements
     */
    _setFirstLastElements : function() {
        this.firstCtrl = this.monthEl;
        this.lastCtrl = this.cancelEl;

        // Special handling for MacOSX.
        // - Safari 2.x can't focus on buttons
        // - Gecko can't focus on select boxes or buttons
        if (this.__isMac) {
            if (YAHOO.env.ua.webkit && YAHOO.env.ua.webkit < 420){
                this.firstCtrl = this.monthEl;
                this.lastCtrl = this.yearEl;
            }
            if (YAHOO.env.ua.gecko) {
                this.firstCtrl = this.yearEl;
                this.lastCtrl = this.yearEl;
            }
        }
    },

    /**
     * Default Keyboard event handler to capture Enter 
     * on the Navigator's year control (yearEl)
     * 
     * @method _handleEnterKey
     * @protected
     * @param {Event} e The DOM event being handled
     */
    _handleEnterKey : function(e) {
        var KEYS = YAHOO.util.KeyListener.KEY;

        if (YAHOO.util.Event.getCharCode(e) == KEYS.ENTER) {
            YAHOO.util.Event.preventDefault(e);
            this.submit();
        }
    },

    /**
     * Default Keyboard event handler to capture up/down/pgup/pgdown
     * on the Navigator's year control (yearEl).
     * 
     * @method _handleDirectionKeys
     * @protected
     * @param {Event} e The DOM event being handled
     */
    _handleDirectionKeys : function(e) {
        var E = YAHOO.util.Event,
            KEYS = YAHOO.util.KeyListener.KEY,
            NAV = YAHOO.widget.CalendarNavigator;

        var value = (this.yearEl.value) ? parseInt(this.yearEl.value, 10) : null;
        if (isFinite(value)) {
            var dir = false;
            switch(E.getCharCode(e)) {
                case KEYS.UP:
                    this.yearEl.value = value + NAV.YR_MINOR_INC;
                    dir = true;
                    break;
                case KEYS.DOWN:
                    this.yearEl.value = Math.max(value - NAV.YR_MINOR_INC, 0);
                    dir = true;
                    break;
                case KEYS.PAGE_UP:
                    this.yearEl.value = value + NAV.YR_MAJOR_INC;
                    dir = true;
                    break;
                case KEYS.PAGE_DOWN:
                    this.yearEl.value = Math.max(value - NAV.YR_MAJOR_INC, 0);
                    dir = true;
                    break;
                default:
                    break;
            }
            if (dir) {
                E.preventDefault(e);
                try {
                    this.yearEl.select();
                } catch(err) {
                    // Ignore
                }
            }
        }
    },

    /**
     * Default Keyboard event handler to capture Tab 
     * on the last control (lastCtrl) in the Navigator.
     * 
     * @method _handleTabKey
     * @protected
     * @param {Event} e The DOM event being handled
     */
    _handleTabKey : function(e) {
        var E = YAHOO.util.Event,
            KEYS = YAHOO.util.KeyListener.KEY;

        if (E.getCharCode(e) == KEYS.TAB && !e.shiftKey) {
            try {
                E.preventDefault(e);
                this.firstCtrl.focus();
            } catch (err) {
                // Ignore - mainly for focus edge cases
            }
        }
    },

    /**
     * Default Keyboard event handler to capture Shift-Tab 
     * on the first control (firstCtrl) in the Navigator.
     * 
     * @method _handleShiftTabKey
     * @protected
     * @param {Event} e The DOM event being handled
     */
    _handleShiftTabKey : function(e) {
        var E = YAHOO.util.Event,
            KEYS = YAHOO.util.KeyListener.KEY;

        if (e.shiftKey && E.getCharCode(e) == KEYS.TAB) {
            try {
                E.preventDefault(e);
                this.lastCtrl.focus();
            } catch (err) {
                // Ignore - mainly for focus edge cases
            }
        }
    },

    /**
     * Retrieve Navigator configuration values from 
     * the parent Calendar/CalendarGroup's config value.
     * <p>
     * If it has not been set in the user provided configuration, the method will 
     * return the default value of the configuration property, as set in DEFAULT_CONFIG
     * </p>
     * @private
     * @method __getCfg
     * @param {String} Case sensitive property name.
     * @param {Boolean} true, if the property is a string property, false if not.
     * @return The value of the configuration property
     */
    __getCfg : function(prop, bIsStr) {
        var DEF_CFG = YAHOO.widget.CalendarNavigator.DEFAULT_CONFIG;
        var cfg = this.cal.cfg.getProperty("navigator");

        if (bIsStr) {
            return (cfg !== true && cfg.strings && cfg.strings[prop]) ? cfg.strings[prop] : DEF_CFG.strings[prop];
        } else {
            return (cfg !== true && cfg[prop]) ? cfg[prop] : DEF_CFG[prop];
        }
    },

    /**
     * Private flag, to identify MacOS
     * @private
     * @property __isMac
     */
    __isMac : (navigator.userAgent.toLowerCase().indexOf("macintosh") != -1)

};
YAHOO.register("calendar", YAHOO.widget.Calendar, {version: "2.8.0r4", build: "2449"});
// End of File include/javascript/yui/build/calendar/calendar.js
                                
