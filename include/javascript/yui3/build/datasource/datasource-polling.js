/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('datasource-polling',function(Y){var LANG=Y.Lang,Pollable=function(){this._intervals={};};Pollable.prototype={_intervals:null,setInterval:function(msec,request,callback){var x=Y.later(msec,this,this.sendRequest,[request,callback],true);this._intervals[x.id]=x;return x.id;},clearInterval:function(id,key){id=key||id;if(this._intervals[id]){this._intervals[id].cancel();delete this._intervals[id];}},clearAllIntervals:function(){Y.each(this._intervals,this.clearInterval,this);}};Y.augment(Y.DataSource.Local,Pollable);},'3.0.0',{requires:['datasource-local']});