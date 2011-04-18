/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('io-base',function(Y){var E_START='io:start',E_COMPLETE='io:complete',E_SUCCESS='io:success',E_FAILURE='io:failure',E_END='io:end',transactionId=0,_headers={'X-Requested-With':'XMLHttpRequest'},_timeout={},w=Y.config.win;function _io(uri,c,i){var f,o,m;c=c||{};o=_create(c.xdr||c.form,i);m=c.method?c.method.toUpperCase():'GET';if(c.form){if(c.form.upload){return Y.io._upload(o,uri,c);}
else{f=Y.io._serialize(c.form,c.data);if(m==='POST'){c.data=f;_setHeader('Content-Type','application/x-www-form-urlencoded');}
else if(m==='GET'){uri=_concat(uri,f);}}}
else if(c.data&&m==='GET'){uri=_concat(uri,c.data);}
if(c.xdr){if(c.xdr.use==='native'&&window.XDomainRequest||c.xdr.use==='flash'){return Y.io.xdr(uri,o,c);}
if(c.xdr.credentials){o.c.withCredentials=true;}}
o.c.onreadystatechange=function(){_readyState(o,c);};try{o.c.open(m,uri,true);}
catch(e0){if(c.xdr){return _resend(o,uri,c);}}
if(c.data&&m==='POST'){_setHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');}
_setHeaders(o.c,c.headers||{});try{o.c.send(c.data||'');}
catch(e1){if(c.xdr){return _resend(o,uri,c);}}
_ioStart(o.id,c);if(c.timeout){_startTimeout(o,c.timeout);}
return{id:o.id,abort:function(){return o.c?_ioCancel(o,'abort'):false;},isInProgress:function(){return o.c?o.c.readyState!==4&&o.c.readyState!==0:false;}}}
function _subscribe(e,c){var evt=new Y.EventTarget().publish('transaction:'+e);evt.subscribe(c.on[e],(c.context||Y),c.arguments);return evt;}
function _ioStart(id,c){var evt;c.on=c.on||{};Y.fire(E_START,id);if(c.on.start){evt=_subscribe('start',c);evt.fire(id);}}
function _ioComplete(o,c){var evt,r=o.status?{status:0,statusText:o.status}:o.c;c.on=c.on||{};Y.fire(E_COMPLETE,o.id,r);if(c.on.complete){evt=_subscribe('complete',c);evt.fire(o.id,r);}}
function _ioSuccess(o,c){var evt;c.on=c.on||{};Y.fire(E_SUCCESS,o.id,o.c);if(c.on.success){evt=_subscribe('success',c);evt.fire(o.id,o.c);}
_ioEnd(o,c);}
function _ioFailure(o,c){var evt,r=o.status?{status:0,statusText:o.status}:o.c;c.on=c.on||{};Y.fire(E_FAILURE,o.id,r);if(c.on.failure){evt=_subscribe('failure',c);evt.fire(o.id,r);}
_ioEnd(o,c);}
function _ioEnd(o,c){var evt;c.on=c.on||{};Y.fire(E_END,o.id);if(c.on.end){evt=_subscribe('end',c);evt.fire(o.id);}
_destroy(o,c.xdr?true:false);}
function _ioCancel(o,s){if(o&&o.c){o.status=s;o.c.abort();}}
function _resend(o,uri,c){var id=parseInt(o.id);_destroy(o);c.xdr.use='flash';return Y.io(uri,c,id);}
function _id(){var id=transactionId;transactionId++;return id;}
function _create(c,i){var o={};o.id=Y.Lang.isNumber(i)?i:_id();c=c||{};if(!c.use&&!c.upload){o.c=_xhr();}
else if(c.use){if(c.use==='flash'){o.c=Y.io._transport[c.use];}
else if(c.use==='native'&&window.XDomainRequest){o.c=new XDomainRequest();}
else{o.c=_xhr();}}
else{o.c={};}
return o;};function _xhr(){return w.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');}
function _concat(s,d){s+=((s.indexOf('?')==-1)?'?':'&')+d;return s;}
function _setHeader(l,v){if(v){_headers[l]=v;}
else{delete _headers[l];}}
function _setHeaders(o,h){var p;for(p in _headers){if(_headers.hasOwnProperty(p)){if(h[p]){break;}
else{h[p]=_headers[p];}}}
for(p in h){if(h.hasOwnProperty(p)){o.setRequestHeader(p,h[p]);}}}
function _startTimeout(o,timeout){_timeout[o.id]=w.setTimeout(function(){_ioCancel(o,'timeout');},timeout);}
function _clearTimeout(id){w.clearTimeout(_timeout[id]);delete _timeout[id];}
function _readyState(o,c){if(o.c.readyState===4){if(c.timeout){_clearTimeout(o.id);}
w.setTimeout(function(){_ioComplete(o,c);_handleResponse(o,c);},0);}}
function _handleResponse(o,c){var status;try{if(o.c.status&&o.c.status!==0){status=o.c.status;}
else{status=0;}}
catch(e){status=0;}
if(status>=200&&status<300||status===1223){_ioSuccess(o,c);}
else{_ioFailure(o,c);}}
function _destroy(o,transport){if(w.XMLHttpRequest&&!transport){if(o.c){o.c.onreadystatechange=null;}}
o.c=null;o=null;}
_io.start=_ioStart;_io.complete=_ioComplete;_io.success=_ioSuccess;_io.failure=_ioFailure;_io.end=_ioEnd;_io._id=_id;_io._timeout=_timeout;_io.header=_setHeader;Y.io=_io;Y.io.http=_io;},'3.0.0',{requires:['event-custom-base']});YUI.add('io-form',function(Y){Y.mix(Y.io,{_serialize:function(c,s){var eUC=encodeURIComponent,data=[],useDf=c.useDisabled||false,item=0,id=(typeof c.id==='string')?c.id:c.id.getAttribute('id'),e,f,n,v,d,i,il,j,jl,o;if(!id){id=Y.guid('io:');c.id.setAttribute('id',id);}
f=Y.config.doc.getElementById(id);for(i=0,il=f.elements.length;i<il;++i){e=f.elements[i];d=e.disabled;n=e.name;if((useDf)?n:(n&&!d)){n=encodeURIComponent(n)+'=';v=encodeURIComponent(e.value);switch(e.type){case'select-one':if(e.selectedIndex>-1){o=e.options[e.selectedIndex];data[item++]=n+eUC((o.attributes.value&&o.attributes.value.specified)?o.value:o.text);}
break;case'select-multiple':if(e.selectedIndex>-1){for(j=e.selectedIndex,jl=e.options.length;j<jl;++j){o=e.options[j];if(o.selected){data[item++]=n+eUC((o.attributes.value&&o.attributes.value.specified)?o.value:o.text);}}}
break;case'radio':case'checkbox':if(e.checked){data[item++]=n+v;}
break;case'file':case undefined:case'reset':case'button':break;case'submit':default:data[item++]=n+v;}}}
return s?data.join('&')+"&"+s:data.join('&');}},true);},'3.0.0',{requires:['io-base','node-base','node-style']});YUI.add('io-xdr',function(Y){var E_XDR_READY='io:xdrReady',_fn={},_rS={};function _swf(uri,yid){var o='<object id="yuiIoSwf" type="application/x-shockwave-flash" data="'+
uri+'" width="0" height="0">'+'<param name="movie" value="'+uri+'">'+'<param name="FlashVars" value="yid='+yid+'">'+'<param name="allowScriptAccess" value="always">'+'</object>',c=document.createElement('div');document.body.appendChild(c);c.innerHTML=o;}
function _xdr(o,c){o.c.onprogress=function(){_rS[o.id]=3;}
o.c.onload=function(){_rS[o.id]=4;Y.io.xdrResponse(o,c,'success');};o.c.onerror=function(){_rS[o.id]=4;Y.io.xdrResponse(o,c,'failure');};if(c.timeout){o.c.ontimeout=function(){_rS[o.id]=4;Y.io.xdrResponse(o,c,'timeout');};o.c.timeout=c.timeout;}}
function _data(o,isFlash,isXML){var text,xml;if(!o.status){text=isFlash?decodeURI(o.c.responseText):o.c.responseText;xml=isXML?Y.DataType.XML.parse(text):null;return{id:o.id,c:{responseText:text,responseXML:xml}};}
else{return{id:o.id,status:o.status};}}
function _abort(o,c){return c.xdr.use==='flash'?o.c.abort(o.id,c):o.c.abort();}
function _isInProgress(o,t){return(t==='flash'&&o.c)?o.c.isInProgress(o.id):_rS[o.id]!==4;}
Y.mix(Y.io,{_transport:{},xdr:function(uri,o,c){if(c.on&&c.xdr.use==='flash'){_fn[o.id]={on:c.on,context:c.context,arguments:c.arguments};c.context=null;c.form=null;o.c.send(uri,c,o.id);}
else if(window.XDomainRequest){_xdr(o,c);o.c.open(c.method||'GET',uri);o.c.send(c.data);}
return{id:o.id,abort:function(){return o.c?_abort(o,c):false;},isInProgress:function(){return o.c?_isInProgress(o,c.xdr.use):false;}}},xdrResponse:function(o,c,e){var m,fn,isFlash=c.xdr.use==='flash'?true:false,isXML=c.xdr.dataType==='xml'?true:false;c.on=c.on||{};if(isFlash){m=_fn||{};fn=m[o.id]?m[o.id]:null;if(fn){c.on=fn.on;c.context=fn.context;c.arguments=fn.arguments;}}
if(e===('abort'||'timeout')){o.status=e;}
switch(e){case'start':Y.io.start(o.id,c);break;case'success':Y.io.success(_data(o,isFlash,isXML),c);isFlash?delete m[o.id]:delete _rS[o.id];break;case'timeout':case'abort':case'failure':Y.io.failure(_data(o,isFlash,isXML),c);isFlash?delete m[o.id]:delete _rS[o.id];break;}},xdrReady:function(id){Y.fire(E_XDR_READY,id);},transport:function(o){var id=o.yid?o.yid:Y.id;_swf(o.src,id);this._transport.flash=Y.config.doc.getElementById('yuiIoSwf');}});},'3.0.0',{requires:['io-base','datatype-xml']});YUI.add('io-upload-iframe',function(Y){var w=Y.config.win;function _addData(f,s){var o=[],m=s.split('='),i,l;for(i=0,l=m.length-1;i<l;i++){o[i]=document.createElement('input');o[i].type='hidden';o[i].name=m[i].substring(m[i].lastIndexOf('&')+1);o[i].value=(i+1===l)?m[i+1]:m[i+1].substring(0,(m[i+1].lastIndexOf('&')));f.appendChild(o[i]);}
return o;}
function _removeData(f,o){var i,l;for(i=0,l=o.length;i<l;i++){f.removeChild(o[i]);}}
function _setAttrs(f,id,uri){var ie8=(document.documentMode&&document.documentMode===8)?true:false;f.setAttribute('action',uri);f.setAttribute('method','POST');f.setAttribute('target','ioupload'+id);f.setAttribute(Y.UA.ie&&!ie8?'encoding':'enctype','multipart/form-data');}
function _resetAttrs(f,a){var p;for(p in a){if(a.hasOwnProperty(a,p)){if(a[p]){f.setAttribute(p,f[p]);}
else{f.removeAttribute(p);}}}}
function _create(o,c){var i=Y.Node.create('<iframe id="ioupload'+o.id+'" name="ioupload'+o.id+'" />');i._node.style.position='absolute';i._node.style.top='-1000px';i._node.style.left='-1000px';Y.one('body').appendChild(i);Y.on("load",function(){_handle(o,c)},'#ioupload'+o.id);}
function _handle(o,c){var d=Y.one('#ioupload'+o.id).get('contentWindow.document'),b=d.one('body'),xml=(d._node.nodeType===9),p;if(c.timeout){_clearTimeout(o.id);}
if(b){p=b.query('pre:first-child');o.c.responseText=p?p.get('innerHTML'):b.get('innerHTML');}
else if(xml){o.c.responseXML=d._node;}
Y.io.complete(o,c);Y.io.end(o,c);w.setTimeout(function(){_destroy(o.id);},0);}
function _startTimeout(o,c){Y.io._timeout[o.id]=w.setTimeout(function(){var r={id:o.id,status:'timeout'};Y.io.complete(r,c);Y.io.end(r,c);},c.timeout);}
function _clearTimeout(id){w.clearTimeout(Y.io._timeout[id]);delete Y.io._timeout[id];}
function _destroy(id){Y.Event.purgeElement('#ioupload'+id,false);Y.one('body').removeChild(Y.one('#ioupload'+id));}
Y.mix(Y.io,{_upload:function(o,uri,c){var f=(typeof c.form.id==='string')?Y.config.doc.getElementById(c.form.id):c.form.id,fields,attr={action:f.getAttribute('action'),target:f.getAttribute('target')};_create(o,c);_setAttrs(f,o.id,uri);if(c.data){fields=_addData(f,c.data);}
if(c.timeout){_startTimeout(o,c);}
f.submit();Y.io.start(o.id,c);if(c.data){_removeData(f,fields);}
_resetAttrs(f,attr);return{id:o.id,abort:function(){var r={id:o.id,status:'abort'};if(Y.one('#ioupload'+o.id)){_destroy(o.id);Y.io.complete(r,c);Y.io.end(r,c);}
else{return false;}},isInProgress:function(){return Y.one('#ioupload'+o.id)?true:false;}}}});},'3.0.0',{requires:['io-base','node-base','event-base']});YUI.add('io-queue',function(Y){var _q=new Y.Queue(),_e,_activeId,_qState=1;function _queue(uri,c){var o={uri:uri,id:Y.io._id(),cfg:c};_q.add(o);if(_qState===1){_shift();}
return o;}
function _shift(){var o=_q.next();_activeId=o.id;_qState=0;Y.io(o.uri,o.cfg,o.id);}
function _unshift(o){_q.promote(o);}
function _next(id){_qState=1;if(_activeId===id&&_q.size()>0){_shift();}}
function _remove(o){_q.remove(o);}
function _start(){_qState=1;if(_q.size()>0){_shift();}}
function _stop(){_qState=0;};function _size(){return _q.size();};_e=Y.on('io:complete',function(id){_next(id);},Y.io);_queue.size=_size;_queue.start=_start;_queue.stop=_stop;_queue.promote=_unshift;_queue.remove=_remove;Y.mix(Y.io,{queue:_queue},true);},'3.0.0',{requires:['io-base','queue-promote']});YUI.add('io',function(Y){},'3.0.0',{use:['io-base','io-form','io-xdr','io-upload-iframe','io-queue']});