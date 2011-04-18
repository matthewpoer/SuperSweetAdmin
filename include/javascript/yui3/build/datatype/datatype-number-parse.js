/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('datatype-number-parse',function(Y){var LANG=Y.Lang;Y.mix(Y.namespace("DataType.Number"),{parse:function(data){var number=(data===null)?data:+data;if(LANG.isNumber(number)){return number;}
else{return null;}}});Y.namespace("Parsers").number=Y.DataType.Number.parse;},'3.0.0');