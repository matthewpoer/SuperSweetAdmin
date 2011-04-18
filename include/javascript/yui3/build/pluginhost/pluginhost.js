/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('pluginhost',function(Y){var L=Y.Lang;function PluginHost(){this._plugins={};}
PluginHost.prototype={plug:function(p,config){if(p){if(L.isFunction(p)){this._plug(p,config);}else if(L.isArray(p)){for(var i=0,ln=p.length;i<ln;i++){this.plug(p[i]);}}else{this._plug(p.fn,p.cfg);}}
return this;},unplug:function(plugin){if(plugin){this._unplug(plugin);}else{var ns;for(ns in this._plugins){if(this._plugins.hasOwnProperty(ns)){this._unplug(ns);}}}
return this;},hasPlugin:function(ns){return(this._plugins[ns]&&this[ns]);},_initPlugins:function(config){this._plugins=this._plugins||{};var classes=(this._getClasses)?this._getClasses():[this.constructor],plug=[],unplug={},constructor,i,classPlug,classUnplug,pluginClassName;for(i=classes.length-1;i>=0;i--){constructor=classes[i];classUnplug=constructor._UNPLUG;if(classUnplug){Y.mix(unplug,classUnplug,true);}
classPlug=constructor._PLUG;if(classPlug){Y.mix(plug,classPlug,true);}}
for(pluginClassName in plug){if(plug.hasOwnProperty(pluginClassName)){if(!unplug[pluginClassName]){this.plug(plug[pluginClassName]);}}}
if(config&&config.plugins){this.plug(config.plugins);}},_destroyPlugins:function(){this._unplug();},_plug:function(PluginClass,config){if(PluginClass&&PluginClass.NS){var ns=PluginClass.NS;config=config||{};config.host=this;if(this.hasPlugin(ns)){this[ns].setAttrs(config);}else{this[ns]=new PluginClass(config);this._plugins[ns]=PluginClass;}}},_unplug:function(plugin){var ns=plugin,plugins=this._plugins;if(L.isFunction(plugin)){ns=plugin.NS;if(ns&&(!plugins[ns]||plugins[ns]!==plugin)){ns=null;}}
if(ns){if(this[ns]){this[ns].destroy();delete this[ns];}
if(plugins[ns]){delete plugins[ns];}}}};PluginHost.plug=function(hostClass,plugin,config){var p,i,l,name;if(hostClass!==Y.Base){hostClass._PLUG=hostClass._PLUG||{};if(!L.isArray(plugin)){if(config){plugin={fn:plugin,cfg:config};}
plugin=[plugin];}
for(i=0,l=plugin.length;i<l;i++){p=plugin[i];name=p.NAME||p.fn.NAME;hostClass._PLUG[name]=p;}}};PluginHost.unplug=function(hostClass,plugin){var p,i,l,name;if(hostClass!==Y.Base){hostClass._UNPLUG=hostClass._UNPLUG||{};if(!L.isArray(plugin)){plugin=[plugin];}
for(i=0,l=plugin.length;i<l;i++){p=plugin[i];name=p.NAME;if(!hostClass._PLUG[name]){hostClass._UNPLUG[name]=p;}else{delete hostClass._PLUG[name];}}}};Y.namespace("Plugin").Host=PluginHost;},'3.0.0',{requires:['yui-base']});