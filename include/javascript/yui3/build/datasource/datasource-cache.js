/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('datasource-cache',function(Y){var DataSourceCache=function(){DataSourceCache.superclass.constructor.apply(this,arguments);};Y.mix(DataSourceCache,{NS:"cache",NAME:"dataSourceCache",ATTRS:{}});Y.extend(DataSourceCache,Y.Cache,{initializer:function(config){this.doBefore("_defRequestFn",this._beforeDefRequestFn);this.doBefore("_defResponseFn",this._beforeDefResponseFn);},_beforeDefRequestFn:function(e){var entry=(this.retrieve(e.request))||null;if(entry&&entry.response){this.get("host").fire("response",Y.mix({response:entry.response},e));return new Y.Do.Halt("DataSourceCache plugin halted _defRequestFn");}},_beforeDefResponseFn:function(e){if(e.response&&!e.response.cached){e.response.cached=true;this.add(e.request,e.response,(e.callback&&e.callback.argument));}}});Y.namespace('Plugin').DataSourceCache=DataSourceCache;},'3.0.0',{requires:['datasource-local','cache']});