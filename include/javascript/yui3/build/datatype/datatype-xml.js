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
return xmlDoc;}});Y.namespace("Parsers").xml=Y.DataType.XML.parse;},'3.0.0');YUI.add('datatype-xml-format',function(Y){var LANG=Y.Lang;Y.mix(Y.namespace("DataType.XML"),{format:function(data){try{if(!LANG.isUndefined(XMLSerializer)){return(new XMLSerializer()).serializeToString(data);}}
catch(e){if(data&&data.xml){return data.xml;}
else{return(LANG.isValue(data)&&data.toString)?data.toString():"";}}}});},'3.0.0');YUI.add('datatype-xml',function(Y){},'3.0.0',{use:['datatype-xml-parse','datatype-xml-format']});