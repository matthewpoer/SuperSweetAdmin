/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('queue-promote',function(Y){Y.mix(Y.Queue.prototype,{indexOf:function(callback){return Y.Array.indexOf(this._q,callback);},promote:function(callback){var index=this.indexOf(callback);if(index>-1){this._q.unshift(this._q.splice(index,1));}},remove:function(callback){var index=this.indexOf(callback);if(index>-1){this._q.splice(index,1);}}});},'3.0.0',{requires:['yui-base']});