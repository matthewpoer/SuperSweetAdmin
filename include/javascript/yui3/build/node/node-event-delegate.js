/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('node-event-delegate',function(Y){Y.Node.prototype.delegate=function(type,fn,selector){var args=Array.prototype.slice.call(arguments,3),a=[type,fn,Y.Node.getDOMNode(this),selector];a=a.concat(args);return Y.delegate.apply(Y,a);};},'3.0.0',{requires:['node-base','event-delegate','pluginhost']});