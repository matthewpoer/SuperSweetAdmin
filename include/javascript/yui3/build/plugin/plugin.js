/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('plugin',function(Y){function Plugin(config){Plugin.superclass.constructor.apply(this,arguments);}
Plugin.ATTRS={host:{writeOnce:true}};Plugin.NAME='plugin';Plugin.NS='plugin';Y.extend(Plugin,Y.Base,{_handles:null,initializer:function(config){this._handles=[];},destructor:function(){if(this._handles){for(var i=0,l=this._handles.length;i<l;i++){this._handles[i].detach();}}},doBefore:function(sFn,fn,context){var host=this.get("host"),handle;context=context||this;if(sFn in host){handle=Y.Do.before(fn,host,sFn,context);}else if(host.on){handle=host.on(sFn,fn,context);}
this._handles.push(handle);return handle;},doAfter:function(sFn,fn,context){var host=this.get("host"),handle;context=context||this;if(sFn in host){handle=Y.Do.after(fn,host,sFn,context);}else if(host.after){handle=host.after(sFn,fn,context);}
this._handles.push(handle);return handle;},toString:function(){return this.constructor.NAME+'['+this.constructor.NS+']';}});Y.namespace("Plugin").Base=Plugin;},'3.0.0',{requires:['base-base']});