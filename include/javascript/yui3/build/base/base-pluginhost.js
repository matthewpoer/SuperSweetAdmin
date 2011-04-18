/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('base-pluginhost',function(Y){var Base=Y.Base,PluginHost=Y.Plugin.Host;Y.mix(Base,PluginHost,false,null,1);Base.plug=PluginHost.plug;Base.unplug=PluginHost.unplug;},'3.0.0',{requires:['base-base','pluginhost']});