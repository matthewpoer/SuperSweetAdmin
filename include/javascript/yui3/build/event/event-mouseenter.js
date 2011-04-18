/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('event-mouseenter',function(Y){var Event=Y.Event,Lang=Y.Lang,plugins=Y.Env.evt.plugins,listeners={},eventConfig={on:function(type,fn,el){var args=Y.Array(arguments,0,true),element=el,availHandle;if(Lang.isString(el)){element=Y.all(el);if(element.size()===0){availHandle=Event.onAvailable(el,function(){availHandle.handle=Y.on.apply(Y,args);},Event,true,false);return availHandle;}}
var sDOMEvent=(type==="mouseenter")?"mouseover":"mouseout",sEventName=type+":"+Y.stamp(element)+sDOMEvent,listener=listeners[sEventName],domEventHandle,ceHandle,nListeners;if(!listener){domEventHandle=Y.on(sDOMEvent,Y.rbind(Event._fireMouseEnter,Y,sEventName),element);Y.after(function(sub){if(domEventHandle.sub==sub){delete listeners[sEventName];Y.detachAll(sEventName);}},domEventHandle.evt,"_delete");listener={};listener.handle=domEventHandle;listeners[sEventName]=listener;}
nListeners=listener.count;listener.count=nListeners?(nListeners+1):1;args[0]=sEventName;args.splice(2,1);ceHandle=Y.on.apply(Y,args);Y.after(function(){listener.count=(listener.count-1);if(listener.count===0){listener.handle.detach();}},ceHandle,"detach");return ceHandle;}};Event._fireMouseEnter=function(e,eventName){var relatedTarget=e.relatedTarget,currentTarget=e.currentTarget;if(currentTarget!==relatedTarget&&!currentTarget.contains(relatedTarget)){Y.publish(eventName,{contextFn:function(){return currentTarget;}});Y.fire(eventName,e);}};plugins.mouseenter=eventConfig;plugins.mouseleave=eventConfig;},'3.0.0',{requires:['node-base']});