/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('datasource-io',function(Y){var DSIO=function(){DSIO.superclass.constructor.apply(this,arguments);};Y.mix(DSIO,{NAME:"dataSourceIO",ATTRS:{io:{value:Y.io,cloneDefaultValue:false}}});Y.extend(DSIO,Y.DataSource.Local,{initializer:function(config){this._queue={interval:null,conn:null,requests:[]};},_queue:null,_defRequestFn:function(e){var uri=this.get("source"),io=this.get("io"),request=e.request,cfg=Y.mix(e.cfg,{on:{success:function(id,response,e){this.fire("data",Y.mix({data:response},e));},failure:function(id,response,e){e.error=new Error("IO data failure");this.fire("error",Y.mix({data:response},e));this.fire("data",Y.mix({data:response},e));}},context:this,arguments:e});if(Y.Lang.isString(request)){if(cfg.method&&(cfg.method.toUpperCase()==="POST")){cfg.data=cfg.data?cfg.data+request:request;}
else{uri+=request;}}
io(uri,cfg);return e.tId;}});Y.DataSource.IO=DSIO;},'3.0.0',{requires:['datasource-local','io']});