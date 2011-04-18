/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('dataschema-base',function(Y){var LANG=Y.Lang,SchemaBase={apply:function(schema,data){return data;},parse:function(value,field){if(field.parser){var parser=(LANG.isFunction(field.parser))?field.parser:Y.Parsers[field.parser+''];if(parser){value=parser.call(this,value);}
else{}}
return value;}};Y.namespace("DataSchema").Base=SchemaBase;Y.namespace("Parsers");},'3.0.0',{requires:['base']});