/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('datasource-function',function(Y){var LANG=Y.Lang,DSFn=function(){DSFn.superclass.constructor.apply(this,arguments);};Y.mix(DSFn,{NAME:"dataSourceFunction",ATTRS:{source:{validator:LANG.isFunction}}});Y.extend(DSFn,Y.DataSource.Local,{_defRequestFn:function(e){var fn=this.get("source"),response;if(fn){try{response=fn(e.request,this,e);this.fire("data",Y.mix({data:response},e));}
catch(error){e.error=error;this.fire("error",e);}}
else{e.error=new Error("Function data failure");this.fire("error",e);}
return e.tId;}});Y.DataSource.Function=DSFn;},'3.0.0',{requires:['datasource-local']});