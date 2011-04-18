/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('node-event-simulate',function(Y){Y.Node.prototype.simulate=function(type,options){Y.Event.simulate(Y.Node.getDOMNode(this),type,options);};},'3.0.0',{requires:['node-base','event-simulate']});