/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('datatype-xml-parse',function(Y){var LANG=Y.Lang;Y.mix(Y.namespace("DataType.XML"),{parse:function(data){var xmlDoc=null;if(LANG.isString(data)){try{if(!LANG.isUndefined(DOMParser)){xmlDoc=new DOMParser().parseFromString(data,"text/xml");}}
catch(e){try{if(!LANG.isUndefined(ActiveXObject)){xmlDoc=new ActiveXObject("Microsoft.XMLDOM");xmlDoc.async=false;xmlDoc.loadXML(data);}}
catch(ee){}}}
if((LANG.isNull(xmlDoc))||(LANG.isNull(xmlDoc.documentElement))||(xmlDoc.documentElement.nodeName==="parsererror")){}
return xmlDoc;}});Y.namespace("Parsers").xml=Y.DataType.XML.parse;},'3.0.0');