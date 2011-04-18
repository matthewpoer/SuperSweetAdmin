/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('event-key',function(Y){Y.Env.evt.plugins.key={on:function(type,fn,id,spec,o){var a=Y.Array(arguments,0,true),parsed,etype,criteria,ename;parsed=spec&&spec.split(':');if(!spec||spec.indexOf(':')==-1||!parsed[1]){a[0]='key'+((parsed&&parsed[0])||'press');return Y.on.apply(Y,a);}
etype=parsed[0];criteria=(parsed[1])?parsed[1].split(/,|\+/):null;ename=(Y.Lang.isString(id)?id:Y.stamp(id))+spec;ename=ename.replace(/,/g,'_');if(!Y.getEvent(ename)){Y.on(type+etype,function(e){var passed=false,failed=false,i,crit,critInt;for(i=0;i<criteria.length;i=i+1){crit=criteria[i];critInt=parseInt(crit,10);if(Y.Lang.isNumber(critInt)){if(e.charCode===critInt){passed=true;}else{failed=true;}}else if(passed||!failed){passed=(e[crit+'Key']);failed=!passed;}}
if(passed){Y.fire(ename,e);}},id);}
a.splice(2,2);a[0]=ename;return Y.on.apply(Y,a);}};},'3.0.0',{requires:['node-base']});