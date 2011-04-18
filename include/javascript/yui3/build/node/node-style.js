/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('node-style',function(Y){(function(Y){var methods=['getStyle','getComputedStyle','setStyle','setStyles'];Y.Node.importMethod(Y.DOM,methods);Y.NodeList.importMethod(Y.Node.prototype,methods);})(Y);},'3.0.0',{requires:['dom-style','node-base']});