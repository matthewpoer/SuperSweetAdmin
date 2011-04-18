/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('datasource-textschema',function(Y){var DataSourceTextSchema=function(){DataSourceTextSchema.superclass.constructor.apply(this,arguments);};Y.mix(DataSourceTextSchema,{NS:"schema",NAME:"dataSourceTextSchema",ATTRS:{schema:{}}});Y.extend(DataSourceTextSchema,Y.Plugin.Base,{initializer:function(config){this.doBefore("_defDataFn",this._beforeDefDataFn);},_beforeDefDataFn:function(e){var data=(Y.DataSource.IO&&(this.get("host")instanceof Y.DataSource.IO)&&Y.Lang.isString(e.data.responseText))?e.data.responseText:e.data,response=Y.DataSchema.Text.apply(this.get("schema"),data);if(!response){response={meta:{},results:data};}
this.get("host").fire("response",Y.mix({response:response},e));return new Y.Do.Halt("DataSourceTextSchema plugin halted _defDataFn");}});Y.namespace('Plugin').DataSourceTextSchema=DataSourceTextSchema;},'3.0.0',{requires:['plugin','datasource-local','dataschema-text']});