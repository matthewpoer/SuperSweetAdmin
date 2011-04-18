/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('datatype-xml-format',function(Y){var LANG=Y.Lang;Y.mix(Y.namespace("DataType.XML"),{format:function(data){try{if(!LANG.isUndefined(XMLSerializer)){return(new XMLSerializer()).serializeToString(data);}}
catch(e){if(data&&data.xml){return data.xml;}
else{return(LANG.isValue(data)&&data.toString)?data.toString():"";}}}});},'3.0.0');