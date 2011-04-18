/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('cache',function(Y){var LANG=Y.Lang,Cache=function(){Cache.superclass.constructor.apply(this,arguments);};Y.mix(Cache,{NS:"cache",NAME:"cache",ATTRS:{max:{value:0,validator:function(value){return(LANG.isNumber(value));},setter:function(value){var entries=this._entries;if(value>0){if(entries){while(entries.length>value){entries.shift();}}}
else{this._entries=[];}
return value;}},size:{readOnly:true,getter:function(){return this._entries.length;}},uniqueKeys:{value:false,validator:function(value){return(LANG.isBoolean(value));}},entries:{readOnly:true,getter:function(){return this._entries;}}}});Y.extend(Cache,Y.Plugin.Base,{_entries:null,initializer:function(config){this.publish("add",{defaultFn:this._defAddFn});this.publish("flush",{defaultFn:this._defFlushFn});this._entries=[];},destructor:function(){this._entries=null;},_defAddFn:function(e){var entries=this._entries,max=this.get("max"),entry=e.entry;if(this.get("uniqueKeys")&&(this.retrieve(e.entry.request))){entries.shift();}
while(entries.length>=max){entries.shift();}
entries[entries.length]=entry;},_defFlushFn:function(e){this._entries=[];},_isMatch:function(request,entry){return(request===entry.request);},add:function(request,response,payload){if(this.get("entries")&&(this.get("max")>0)&&(LANG.isValue(request)||LANG.isNull(request)||LANG.isUndefined(request))){this.fire("add",{entry:{request:request,response:response,payload:payload}});}
else{}},flush:function(){this.fire("flush");},retrieve:function(request){var entries=this._entries,length=entries.length,entry=null,i=length-1;if((this.get("max")>0)&&(length>0)){this.fire("request",{request:request});for(;i>=0;i--){entry=entries[i];if(this._isMatch(request,entry)){this.fire("retrieve",{entry:entry});if(i<length-1){entries.splice(i,1);entries[entries.length]=entry;}
return entry;}}}
return null;}});Y.Cache=Cache;},'3.0.0',{requires:['plugin']});