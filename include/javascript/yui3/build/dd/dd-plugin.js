/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('dd-plugin',function(Y){var Drag=function(config){config.node=((Y.Widget&&config.host instanceof Y.Widget)?config.host.get('boundingBox'):config.host);Drag.superclass.constructor.apply(this,arguments);};Drag.NAME="dd-plugin";Drag.NS="dd";Y.extend(Drag,Y.DD.Drag);Y.namespace('Plugin');Y.Plugin.Drag=Drag;},'3.0.0',{skinnable:false,requires:['dd-drag'],optional:['dd-constrain','dd-proxy']});