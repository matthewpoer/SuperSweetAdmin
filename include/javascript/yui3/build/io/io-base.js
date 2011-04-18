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
_io.start=_ioStart;_io.complete=_ioComplete;_io.success=_ioSuccess;_io.failure=_ioFailure;_io.end=_ioEnd;_io._id=_id;_io._timeout=_timeout;_io.header=_setHeader;Y.io=_io;Y.io.http=_io;},'3.0.0',{requires:['event-custom-base']});