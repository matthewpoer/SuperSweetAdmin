/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('yui-log',function(Y){(function(){var INSTANCE=Y,LOGEVENT='yui:log',UNDEFINED='undefined',LEVELS={debug:1,info:1,warn:1,error:1},_published;INSTANCE.log=function(msg,cat,src,silent){var Y=INSTANCE,c=Y.config,bail=false,excl,incl,m,f;if(c.debug){if(src){excl=c.logExclude;incl=c.logInclude;if(incl&&!(src in incl)){bail=1;}else if(excl&&(src in excl)){bail=1;}}
if(!bail){if(c.useBrowserConsole){m=(src)?src+': '+msg:msg;if(typeof console!=UNDEFINED&&console.log){f=(cat&&console[cat]&&(cat in LEVELS))?cat:'log';console[f](m);}else if(typeof opera!=UNDEFINED){opera.postError(m);}}
if(Y.fire&&!silent){if(!_published){Y.publish(LOGEVENT,{broadcast:2,emitFacade:1});_published=1;}
Y.fire(LOGEVENT,{msg:msg,cat:cat,src:src});}}}
return Y;};INSTANCE.message=function(){return INSTANCE.log.apply(INSTANCE,arguments);};})();},'3.0.0',{requires:['yui-base']});