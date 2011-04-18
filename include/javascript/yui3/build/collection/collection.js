/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('collection',function(Y){var L=Y.Lang,Native=Array.prototype,A=Y.Array;A.lastIndexOf=(Native.lastIndexOf)?function(a,val){return a.lastIndexOf(val);}:function(a,val){for(var i=a.length-1;i>=0;i=i-1){if(a[i]===val){break;}}
return i;};A.unique=function(a,sort){var b=a.slice(),i=0,n=-1,item=null;while(i<b.length){item=b[i];while((n=b.lastIndexOf(item))!==i){b.splice(n,1);}
i+=1;}
if(sort){if(L.isNumber(b[0])){b.sort(A.numericSort);}else{b.sort();}}
return b;};A.filter=(Native.filter)?function(a,f,o){return Native.filter.call(a,f,o);}:function(a,f,o){var results=[];A.each(a,function(item,i,a){if(f.call(o,item,i,a)){results.push(item);}});return results;};A.reject=function(a,f,o){return A.filter(a,function(item,i,a){return!f.call(o,item,i,a);});};A.every=(Native.every)?function(a,f,o){return Native.every.call(a,f,o);}:function(a,f,o){var l=a.length;for(var i=0;i<l;i=i+1){if(!f.call(o,a[i],i,a)){return false;}}
return true;};A.map=(Native.map)?function(a,f,o){return Native.map.call(a,f,o);}:function(a,f,o){var results=[];A.each(a,function(item,i,a){results.push(f.call(o,item,i,a));});return results;};A.reduce=(Native.reduce)?function(a,init,f,o){return Native.reduce.call(a,function(init,item,i,a){return f.call(o,init,item,i,a);},init);}:function(a,init,f,o){var r=init;A.each(a,function(item,i,a){r=f.call(o,r,item,i,a);});return r;};A.find=function(a,f,o){var l=a.length;for(var i=0;i<l;i++){if(f.call(o,a[i],i,a)){return a[i];}}
return null;};A.grep=function(a,pattern){return A.filter(a,function(item,index){return pattern.test(item);});};A.partition=function(a,f,o){var results={matches:[],rejects:[]};A.each(a,function(item,index){var set=f.call(o,item,index,a)?results.matches:results.rejects;set.push(item);});return results;};A.zip=function(a,a2){var results=[];A.each(a,function(item,index){results.push([item,a2[index]]);});return results;};},'3.0.0');