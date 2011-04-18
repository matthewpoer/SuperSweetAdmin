/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('datasource-xmlschema',function(Y){var DataSourceXMLSchema=function(){DataSourceXMLSchema.superclass.constructor.apply(this,arguments);};Y.mix(DataSourceXMLSchema,{NS:"schema",NAME:"dataSourceXMLSchema",ATTRS:{schema:{}}});Y.extend(DataSourceXMLSchema,Y.Plugin.Base,{initializer:function(config){this.doBefore("_defDataFn",this._beforeDefDataFn);},_beforeDefDataFn:function(e){var data=(Y.DataSource.IO&&(this.get("host")instanceof Y.DataSource.IO)&&e.data.responseXML&&(e.data.responseXML.nodeType===9))?e.data.responseXML:e.data,response=Y.DataSchema.XML.apply(this.get("schema"),data);if(!response){response={meta:{},results:data};}
this.get("host").fire("response",Y.mix({response:response},e));return new Y.Do.Halt("DataSourceXMLSchema plugin halted _defDataFn");}});Y.namespace('Plugin').DataSourceXMLSchema=DataSourceXMLSchema;},'3.0.0',{requires:['plugin','datasource-local','dataschema-xml']});