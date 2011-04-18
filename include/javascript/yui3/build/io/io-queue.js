/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('io-queue',function(Y){var _q=new Y.Queue(),_e,_activeId,_qState=1;function _queue(uri,c){var o={uri:uri,id:Y.io._id(),cfg:c};_q.add(o);if(_qState===1){_shift();}
return o;}
function _shift(){var o=_q.next();_activeId=o.id;_qState=0;Y.io(o.uri,o.cfg,o.id);}
function _unshift(o){_q.promote(o);}
function _next(id){_qState=1;if(_activeId===id&&_q.size()>0){_shift();}}
function _remove(o){_q.remove(o);}
function _start(){_qState=1;if(_q.size()>0){_shift();}}
function _stop(){_qState=0;};function _size(){return _q.size();};_e=Y.on('io:complete',function(id){_next(id);},Y.io);_queue.size=_size;_queue.start=_start;_queue.stop=_stop;_queue.promote=_unshift;_queue.remove=_remove;Y.mix(Y.io,{queue:_queue},true);},'3.0.0',{requires:['io-base','queue-promote']});