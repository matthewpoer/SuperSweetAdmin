/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('get',function(Y){(function(){var ua=Y.UA,L=Y.Lang,TYPE_JS="text/javascript",TYPE_CSS="text/css",STYLESHEET="stylesheet";Y.Get=function(){var queues={},qidx=0,purging=false,_node=function(type,attr,win){var w=win||Y.config.win,d=w.document,n=d.createElement(type),i;for(i in attr){if(attr[i]&&attr.hasOwnProperty(i)){n.setAttribute(i,attr[i]);}}
return n;},_linkNode=function(url,win,attributes){var o={id:Y.guid(),type:TYPE_CSS,rel:STYLESHEET,href:url};if(attributes){Y.mix(o,attributes);}
return _node("link",o,win);},_scriptNode=function(url,win,attributes){var o={id:Y.guid(),type:TYPE_JS,src:url};if(attributes){Y.mix(o,attributes);}
return _node("script",o,win);},_purge=function(tId){var q=queues[tId],n,l,d,h,s,i,node,attr;if(q){n=q.nodes;l=n.length;d=q.win.document;h=d.getElementsByTagName("head")[0];if(q.insertBefore){s=_get(q.insertBefore,tId);if(s){h=s.parentNode;}}
for(i=0;i<l;i=i+1){node=n[i];if(node.clearAttributes){node.clearAttributes();}else{for(attr in node){delete node[attr];}}
h.removeChild(node);}}
q.nodes=[];},_returnData=function(q,msg,result){return{tId:q.tId,win:q.win,data:q.data,nodes:q.nodes,msg:msg,statusText:result,purge:function(){_purge(this.tId);}};},_end=function(id,msg,result){var q=queues[id],sc;if(q&&q.onEnd){sc=q.context||q;q.onEnd.call(sc,_returnData(q,msg,result));}},_fail=function(id,msg){var q=queues[id],sc;if(q.timer){clearTimeout(q.timer);}
if(q.onFailure){sc=q.context||q;q.onFailure.call(sc,_returnData(q,msg));}
_end(id,msg,'failure');},_get=function(nId,tId){var q=queues[tId],n=(L.isString(nId))?q.win.document.getElementById(nId):nId;if(!n){_fail(tId,"target node not found: "+nId);}
return n;},_finish=function(id){var q=queues[id],msg,sc;if(q.timer){clearTimeout(q.timer);}
q.finished=true;if(q.aborted){msg="transaction "+id+" was aborted";_fail(id,msg);return;}
if(q.onSuccess){sc=q.context||q;q.onSuccess.call(sc,_returnData(q));}
_end(id,msg,'OK');},_timeout=function(id){var q=queues[id],sc;if(q.onTimeout){sc=q.context||q;q.onTimeout.call(sc,_returnData(q));}
_end(id,'timeout','timeout');},_next=function(id,loaded){var q=queues[id],msg,w,d,h,n,url,s;if(q.timer){clearTimeout(q.timer);}
if(q.aborted){msg="transaction "+id+" was aborted";_fail(id,msg);return;}
if(loaded){q.url.shift();if(q.varName){q.varName.shift();}}else{q.url=(L.isString(q.url))?[q.url]:q.url;if(q.varName){q.varName=(L.isString(q.varName))?[q.varName]:q.varName;}}
w=q.win;d=w.document;h=d.getElementsByTagName("head")[0];if(q.url.length===0){_finish(id);return;}
url=q.url[0];if(!url){q.url.shift();return _next(id);}
if(q.timeout){q.timer=setTimeout(function(){_timeout(id);},q.timeout);}
if(q.type==="script"){n=_scriptNode(url,w,q.attributes);}else{n=_linkNode(url,w,q.attributes);}
_track(q.type,n,id,url,w,q.url.length);q.nodes.push(n);if(q.insertBefore){s=_get(q.insertBefore,id);if(s){s.parentNode.insertBefore(n,s);}}else{h.appendChild(n);}
if((ua.webkit||ua.gecko)&&q.type==="css"){_next(id,url);}},_autoPurge=function(){if(purging){return;}
purging=true;var i,q;for(i in queues){if(queues.hasOwnProperty(i)){q=queues[i];if(q.autopurge&&q.finished){_purge(q.tId);delete queues[i];}}}
purging=false;},_queue=function(type,url,opts){opts=opts||{};var id="q"+(qidx++),q,thresh=opts.purgethreshold||Y.Get.PURGE_THRESH;if(qidx%thresh===0){_autoPurge();}
queues[id]=Y.merge(opts,{tId:id,type:type,url:url,finished:false,nodes:[]});q=queues[id];q.win=q.win||Y.config.win;q.context=q.context||q;q.autopurge=("autopurge"in q)?q.autopurge:(type==="script")?true:false;if(opts.charset){q.attributes=q.attributes||{};q.attributes.charset=opts.charset;}
setTimeout(function(){_next(id);},0);return{tId:id};},_track=function(type,n,id,url,win,qlength,trackfn){var f=trackfn||_next;if(ua.ie){n.onreadystatechange=function(){var rs=this.readyState;if("loaded"===rs||"complete"===rs){n.onreadystatechange=null;f(id,url);}};}else if(ua.webkit){if(type==="script"){n.addEventListener("load",function(){f(id,url);});}}else{n.onload=function(){f(id,url);};n.onerror=function(e){_fail(id,e+": "+url);};}};return{PURGE_THRESH:20,_finalize:function(id){setTimeout(function(){_finish(id);},0);},abort:function(o){var id=(L.isString(o))?o:o.tId,q=queues[id];if(q){q.aborted=true;}},script:function(url,opts){return _queue("script",url,opts);},css:function(url,opts){return _queue("css",url,opts);}};}();})();},'3.0.0');