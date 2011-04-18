/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('yui-later',function(Y){(function(){var L=Y.Lang,later=function(when,o,fn,data,periodic){when=when||0;o=o||{};var m=fn,d=Y.Array(data),f,r;if(L.isString(fn)){m=o[fn];}
if(!m){}
f=function(){m.apply(o,d);};r=(periodic)?setInterval(f,when):setTimeout(f,when);return{id:r,interval:periodic,cancel:function(){if(this.interval){clearInterval(r);}else{clearTimeout(r);}}};};Y.later=later;L.later=later;})();},'3.0.0',{requires:['yui-base']});