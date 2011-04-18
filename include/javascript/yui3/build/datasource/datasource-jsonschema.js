/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('datasource-jsonschema',function(Y){var DataSourceJSONSchema=function(){DataSourceJSONSchema.superclass.constructor.apply(this,arguments);};Y.mix(DataSourceJSONSchema,{NS:"schema",NAME:"dataSourceJSONSchema",ATTRS:{schema:{}}});Y.extend(DataSourceJSONSchema,Y.Plugin.Base,{initializer:function(config){this.doBefore("_defDataFn",this._beforeDefDataFn);},_beforeDefDataFn:function(e){var data=(Y.DataSource.IO&&(this.get("host")instanceof Y.DataSource.IO)&&Y.Lang.isString(e.data.responseText))?e.data.responseText:e.data,response=Y.DataSchema.JSON.apply(this.get("schema"),data);if(!response){response={meta:{},results:data};}
this.get("host").fire("response",Y.mix({response:response},e));return new Y.Do.Halt("DataSourceJSONSchema plugin halted _defDataFn");}});Y.namespace('Plugin').DataSourceJSONSchema=DataSourceJSONSchema;},'3.0.0',{requires:['plugin','datasource-local','dataschema-json']});