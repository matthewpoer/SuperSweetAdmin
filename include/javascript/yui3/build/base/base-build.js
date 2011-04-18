/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('base-build',function(Y){var Base=Y.Base,L=Y.Lang;Base._buildCfg={aggregates:["ATTRS","_PLUG","_UNPLUG"]};Base.build=function(name,main,extensions,cfg){var build=Base.build,builtClass=build._getClass(main,cfg),aggregates=build._getAggregates(main,cfg),dynamic=builtClass._yuibuild.dynamic,i,l,val,extClass;if(dynamic){if(aggregates){for(i=0,l=aggregates.length;i<l;++i){val=aggregates[i];if(main.hasOwnProperty(val)){builtClass[val]=L.isArray(main[val])?[]:{};}}
Y.aggregate(builtClass,main,true,aggregates);}}
for(i=0,l=extensions.length;i<l;i++){extClass=extensions[i];if(aggregates){Y.aggregate(builtClass,extClass,true,aggregates);}
Y.mix(builtClass,extClass,true,null,1);builtClass._yuibuild.exts.push(extClass);}
builtClass.prototype.hasImpl=build._hasImpl;if(dynamic){builtClass.NAME=name;builtClass.prototype.constructor=builtClass;}
return builtClass;};Y.mix(Base.build,{_template:function(main){function BuiltClass(){BuiltClass.superclass.constructor.apply(this,arguments);var f=BuiltClass._yuibuild.exts,l=f.length,i;for(i=0;i<l;i++){f[i].apply(this,arguments);}
return this;}
Y.extend(BuiltClass,main);return BuiltClass;},_hasImpl:function(extClass){var classes=this._getClasses();for(var i=0,l=classes.length;i<l;i++){var cls=classes[i];if(cls._yuibuild){var exts=cls._yuibuild.exts,ll=exts.length,j;for(j=0;j<ll;j++){if(exts[j]===extClass){return true;}}}}
return false;},_getClass:function(main,cfg){var dynamic=(cfg&&false===cfg.dynamic)?false:true,builtClass=(dynamic)?Base.build._template(main):main;builtClass._yuibuild={id:null,exts:[],dynamic:dynamic};return builtClass;},_getAggregates:function(main,cfg){var aggr=[],cfgAggr=(cfg&&cfg.aggregates),c=main,classAggr;while(c&&c.prototype){classAggr=c._buildCfg&&c._buildCfg.aggregates;if(classAggr){aggr=aggr.concat(classAggr);}
c=c.superclass?c.superclass.constructor:null;}
if(cfgAggr){aggr=aggr.concat(cfgAggr);}
return aggr;}});},'3.0.0',{requires:['base-base']});