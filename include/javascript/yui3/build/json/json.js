/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('json-parse',function(Y){var _JSON=Y.config.win.JSON,Native=(Object.prototype.toString.call(_JSON)==='[object JSON]'&&_JSON),_UNICODE_EXCEPTIONS=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,_ESCAPES=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,_VALUES=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,_BRACKETS=/(?:^|:|,)(?:\s*\[)+/g,_UNSAFE=/[^\],:{}\s]/,_escapeException=function(c){return'\\u'+('0000'+(+(c.charCodeAt(0))).toString(16)).slice(-4);},_revive=function(data,reviver){var walk=function(o,key){var k,v,value=o[key];if(value&&typeof value==='object'){for(k in value){if(value.hasOwnProperty(k)){v=walk(value,k);if(v===undefined){delete value[k];}else{value[k]=v;}}}}
return reviver.call(o,key,value);};return typeof reviver==='function'?walk({'':data},''):data;},_parse=function(s,reviver){if(typeof s==='string'){s=s.replace(_UNICODE_EXCEPTIONS,_escapeException);if(!_UNSAFE.test(s.replace(_ESCAPES,'@').replace(_VALUES,']').replace(_BRACKETS,''))){return _revive(eval('('+s+')'),reviver);}}
throw new SyntaxError('JSON.parse');};Y.namespace('JSON').parse=function(s,reviver){return Native&&Y.JSON.useNativeParse?Native.parse(s,reviver):_parse(s,reviver);};Y.JSON.useNativeParse=!!Native;},'3.0.0');YUI.add('json-stringify',function(Y){var _JSON=Y.config.win.JSON,Lang=Y.Lang,isFunction=Lang.isFunction,isObject=Lang.isObject,isArray=Lang.isArray,_toStr=Object.prototype.toString,Native=(_toStr.call(_JSON)==='[object JSON]'&&_JSON),UNDEFINED='undefined',OBJECT='object',NULL='null',STRING='string',NUMBER='number',BOOLEAN='boolean',DATE='date',_allowable={'undefined':UNDEFINED,'string':STRING,'[object String]':STRING,'number':NUMBER,'[object Number]':NUMBER,'boolean':BOOLEAN,'[object Boolean]':BOOLEAN,'[object Date]':DATE,'[object RegExp]':OBJECT},EMPTY='',OPEN_O='{',CLOSE_O='}',OPEN_A='[',CLOSE_A=']',COMMA=',',COMMA_CR=",\n",CR="\n",COLON=':',COLON_SP=': ',QUOTE='"',_SPECIAL_CHARS=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,_CHARS={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};function _type(o){var t=typeof o;return _allowable[t]||_allowable[_toStr.call(o)]||(t===OBJECT?(o?OBJECT:NULL):UNDEFINED);}
function _char(c){if(!_CHARS[c]){_CHARS[c]='\\u'+('0000'+(+(c.charCodeAt(0))).toString(16)).slice(-4);}
return _CHARS[c];}
function _string(s){return QUOTE+s.replace(_SPECIAL_CHARS,_char)+QUOTE;}
function _indent(s,space){return s.replace(/^/gm,space);}
function _stringify(o,w,space){if(o===undefined){return undefined;}
var replacer=isFunction(w)?w:null,format=_toStr.call(space).match(/String|Number/)||[],_date=Y.JSON.dateToString,stack=[],tmp,i,len;if(replacer||!isArray(w)){w=undefined;}
if(w){tmp={};for(i=0,len=w.length;i<len;++i){tmp[w[i]]=true;}
w=tmp;}
space=format[0]==='Number'?new Array(Math.min(Math.max(0,space),10)+1).join(" "):(space||EMPTY).slice(0,10);function _serialize(h,key){var value=h[key],t=_type(value),a=[],colon=space?COLON_SP:COLON,arr,i,keys,k,v;if(isObject(value)&&isFunction(value.toJSON)){value=value.toJSON(key);}else if(t===DATE){value=_date(value);}
if(isFunction(replacer)){value=replacer.call(h,key,value);}
if(value!==h[key]){t=_type(value);}
switch(t){case DATE:case OBJECT:break;case STRING:return _string(value);case NUMBER:return isFinite(value)?value+EMPTY:NULL;case BOOLEAN:return value+EMPTY;case NULL:return NULL;default:return undefined;}
for(i=stack.length-1;i>=0;--i){if(stack[i]===value){throw new Error("JSON.stringify. Cyclical reference");}}
arr=isArray(value);stack.push(value);if(arr){for(i=value.length-1;i>=0;--i){a[i]=_serialize(value,i)||NULL;}}else{keys=w||value;i=0;for(k in keys){if(keys.hasOwnProperty(k)){v=_serialize(value,k);if(v){a[i++]=_string(k)+colon+v;}}}}
stack.pop();if(space&&a.length){return arr?OPEN_A+CR+_indent(a.join(COMMA_CR),space)+CR+CLOSE_A:OPEN_O+CR+_indent(a.join(COMMA_CR),space)+CR+CLOSE_O;}else{return arr?OPEN_A+a.join(COMMA)+CLOSE_A:OPEN_O+a.join(COMMA)+CLOSE_O;}}
return _serialize({'':o},'');}
Y.mix(Y.namespace('JSON'),{useNativeStringify:!!Native,dateToString:function(d){function _zeroPad(v){return v<10?'0'+v:v;}
return d.getUTCFullYear()+'-'+
_zeroPad(d.getUTCMonth()+1)+'-'+
_zeroPad(d.getUTCDate())+'T'+
_zeroPad(d.getUTCHours())+COLON+
_zeroPad(d.getUTCMinutes())+COLON+
_zeroPad(d.getUTCSeconds())+'Z';},stringify:function(o,w,ind){return Native&&Y.JSON.useNativeStringify?Native.stringify(o,w,ind):_stringify(o,w,ind);}});},'3.0.0');YUI.add('json',function(Y){},'3.0.0',{use:['json-parse','json-stringify']});