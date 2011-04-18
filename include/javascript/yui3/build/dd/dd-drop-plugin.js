/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('dd-drop-plugin',function(Y){var Drop=function(config){config.node=config.host;Drop.superclass.constructor.apply(this,arguments);};Drop.NAME="dd-drop-plugin";Drop.NS="drop";Y.extend(Drop,Y.DD.Drop);Y.namespace('Plugin');Y.Plugin.Drop=Drop;},'3.0.0',{requires:['dd-drop'],skinnable:false});