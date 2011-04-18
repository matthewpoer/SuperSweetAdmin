/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('datasource-get',function(Y){var DSGet=function(){DSGet.superclass.constructor.apply(this,arguments);};Y.mix(DSGet,{NAME:"dataSourceGet",ATTRS:{get:{value:Y.Get,cloneDefaultValue:false},asyncMode:{value:"allowAll"},scriptCallbackParam:{value:"callback"},generateRequestCallback:{value:function(self,id){return"&"+self.get("scriptCallbackParam")+"=YUI.Env.DataSource.callbacks["+id+"]";}}},callbacks:[],_tId:0});Y.extend(DSGet,Y.DataSource.Local,{_defRequestFn:function(e){var uri=this.get("source"),get=this.get("get"),id=DSGet._tId++,self=this;YUI.Env.DataSource.callbacks[id]=Y.rbind(function(response){if((self.get("asyncMode")!=="ignoreStaleResponses")||(id===DSGet.callbacks.length-1)){self.fire("data",Y.mix({data:response},e));}
else{}
delete DSGet.callbacks[id];},this,id);uri+=e.request+this.get("generateRequestCallback")(this,id);get.script(uri,{autopurge:true,onFailure:Y.bind(function(e){e.error=new Error("Script node data failure");this.fire("error",e);},this,e)});return e.tId;}});Y.DataSource.Get=DSGet;YUI.namespace("Env.DataSource.callbacks");},'3.0.0',{requires:['datasource-local','get']});