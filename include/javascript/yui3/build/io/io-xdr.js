/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('io-xdr',function(Y){var E_XDR_READY='io:xdrReady',_fn={},_rS={};function _swf(uri,yid){var o='<object id="yuiIoSwf" type="application/x-shockwave-flash" data="'+
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
switch(e){case'start':Y.io.start(o.id,c);break;case'success':Y.io.success(_data(o,isFlash,isXML),c);isFlash?delete m[o.id]:delete _rS[o.id];break;case'timeout':case'abort':case'failure':Y.io.failure(_data(o,isFlash,isXML),c);isFlash?delete m[o.id]:delete _rS[o.id];break;}},xdrReady:function(id){Y.fire(E_XDR_READY,id);},transport:function(o){var id=o.yid?o.yid:Y.id;_swf(o.src,id);this._transport.flash=Y.config.doc.getElementById('yuiIoSwf');}});},'3.0.0',{requires:['io-base','datatype-xml']});