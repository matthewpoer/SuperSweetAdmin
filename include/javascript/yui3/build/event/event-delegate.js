/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('event-delegate',function(Y){var Event=Y.Event,Lang=Y.Lang,delegates={},specialTypes={mouseenter:"mouseover",mouseleave:"mouseout"},resolveTextNode=function(n){try{if(n&&3==n.nodeType){return n.parentNode;}}catch(e){}
return n;},delegateHandler=function(delegateKey,e,el){var target=resolveTextNode((e.target||e.srcElement)),tests=delegates[delegateKey],spec,ename,matched,fn,ev;var getMatch=function(el,selector,container){var returnVal;if(!el||el===container){returnVal=false;}
else{returnVal=Y.Selector.test(el,selector)?el:getMatch(el.parentNode,selector,container);}
return returnVal;};for(spec in tests){if(tests.hasOwnProperty(spec)){ename=tests[spec];fn=tests.fn;matched=null;if(Y.Selector.test(target,spec,el)){matched=target;}
else if(Y.Selector.test(target,((spec.replace(/,/gi," *,"))+" *"),el)){matched=getMatch(target,spec,el);}
if(matched){if(!ev){ev=new Y.DOMEventFacade(e,el);ev.container=ev.currentTarget;}
ev.currentTarget=Y.Node.get(matched);Y.publish(ename,{contextFn:function(){return ev.currentTarget;}});if(fn){fn(ev,ename);}
else{Y.fire(ename,ev);}}}}},attach=function(type,key,element){var focusMethods={focus:Event._attachFocus,blur:Event._attachBlur},attachFn=focusMethods[type],args=[type,function(e){delegateHandler(key,(e||window.event),element);},element];if(attachFn){return attachFn(args,{capture:true,facade:false});}
else{return Event._attach(args,{facade:false});}},sanitize=Y.cached(function(str){return str.replace(/[|,:]/g,'~');});Y.Env.evt.plugins.delegate={on:function(type,fn,el,delegateType,spec){var args=Y.Array(arguments,0,true);args.splice(3,1);args[0]=delegateType;return Y.delegate.apply(Y,args);}};Event.delegate=function(type,fn,el,spec){if(!spec){return false;}
var args=Y.Array(arguments,0,true),element=el,availHandle;if(Lang.isString(el)){element=Y.Selector.query(el,null,true);if(!element){availHandle=Event.onAvailable(el,function(){availHandle.handle=Event.delegate.apply(Event,args);},Event,true,false);return availHandle;}}
element=Y.Node.getDOMNode(element);var guid=Y.stamp(element),ename='delegate:'+guid+type+sanitize(spec),delegateKey=type+guid,delegate=delegates[delegateKey],domEventHandle,ceHandle,listeners;if(!delegate){delegate={};if(specialTypes[type]){if(!Event._fireMouseEnter){return false;}
type=specialTypes[type];delegate.fn=Event._fireMouseEnter;}
domEventHandle=attach(type,delegateKey,element);Y.after(function(sub){if(domEventHandle.sub==sub){delete delegates[delegateKey];Y.detachAll(ename);}},domEventHandle.evt,"_delete");delegate.handle=domEventHandle;delegates[delegateKey]=delegate;}
listeners=delegate.listeners;delegate.listeners=listeners?(listeners+1):1;delegate[spec]=ename;args[0]=ename;args.splice(2,2);ceHandle=Y.on.apply(Y,args);Y.after(function(){delegate.listeners=(delegate.listeners-1);if(delegate.listeners===0){delegate.handle.detach();}},ceHandle,"detach");return ceHandle;};Y.delegate=Event.delegate;},'3.0.0',{requires:['node-base']});