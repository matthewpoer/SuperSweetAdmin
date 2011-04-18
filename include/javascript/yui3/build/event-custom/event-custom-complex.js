/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
YUI.add('event-custom-complex',function(Y){(function(){var FACADE,FACADE_KEYS,CEProto=Y.CustomEvent.prototype;Y.EventFacade=function(e,currentTarget){e=e||{};this.details=e.details;this.type=e.type;this.target=e.target;this.currentTarget=currentTarget;this.relatedTarget=e.relatedTarget;this.stopPropagation=function(){e.stopPropagation();};this.stopImmediatePropagation=function(){e.stopImmediatePropagation();};this.preventDefault=function(){e.preventDefault();};this.halt=function(immediate){e.halt(immediate);};};CEProto.fireComplex=function(args){var es=Y.Env._eventstack,ef,q,queue,ce,ret,events;if(es){if(this.queuable&&this.type!=es.next.type){this.log('queue '+this.type);es.queue.push([this,args]);return true;}}else{Y.Env._eventstack={id:this.id,next:this,silent:this.silent,stopped:0,prevented:0,queue:[]};es=Y.Env._eventstack;}
this.stopped=0;this.prevented=0;this.target=this.target||this.host;events=new Y.EventTarget({fireOnce:true,context:this.host});this.events=events;if(this.preventedFn){events.on('prevented',this.preventedFn);}
if(this.stoppedFn){events.on('stopped',this.stoppedFn);}
this.currentTarget=this.host||this.currentTarget;this.details=args.slice();this.log("Firing "+this.type);this._facade=null;ef=this._getFacade(args);if(Y.Lang.isObject(args[0])){args[0]=ef;}else{args.unshift(ef);}
if(this.hasSubscribers){this._procSubs(Y.merge(this.subscribers),args,ef);}
if(this.bubbles&&this.host&&this.host.bubble&&!this.stopped){es.stopped=0;es.prevented=0;ret=this.host.bubble(this);this.stopped=Math.max(this.stopped,es.stopped);this.prevented=Math.max(this.prevented,es.prevented);}
if(this.defaultFn&&!this.prevented){this.defaultFn.apply(this.host||this,args);}
this._broadcast(args);if(this.hasAfters&&!this.prevented&&this.stopped<2){this._procSubs(Y.merge(this.afters),args,ef);}
if(es.id===this.id){queue=es.queue;while(queue.length){q=queue.pop();ce=q[0];es.stopped=0;es.prevented=0;es.next=ce;ce.fire.apply(ce,q[1]);}
Y.Env._eventstack=null;}
return this.stopped?false:true;};CEProto._getFacade=function(){var ef=this._facade,o,o2,args=this.details;if(!ef){ef=new Y.EventFacade(this,this.currentTarget);}
o=args&&args[0];if(Y.Lang.isObject(o,true)){o2={};Y.mix(o2,ef,true,FACADE_KEYS);Y.mix(ef,o,true);Y.mix(ef,o2,true,FACADE_KEYS);}
ef.details=this.details;ef.target=this.target;ef.currentTarget=this.currentTarget;ef.stopped=0;ef.prevented=0;this._facade=ef;return this._facade;};CEProto.stopPropagation=function(){this.stopped=1;Y.Env._eventstack.stopped=1;this.events.fire('stopped',this);};CEProto.stopImmediatePropagation=function(){this.stopped=2;Y.Env._eventstack.stopped=2;this.events.fire('stopped',this);};CEProto.preventDefault=function(){if(this.preventable){this.prevented=1;Y.Env._eventstack.prevented=1;this.events.fire('prevented',this);}};CEProto.halt=function(immediate){if(immediate){this.stopImmediatePropagation();}else{this.stopPropagation();}
this.preventDefault();};Y.EventTarget.prototype.bubble=function(evt,args,target){var targs=this._yuievt.targets,ret=true,t,type,ce,i,bc;if(!evt||((!evt.stopped)&&targs)){for(i in targs){if(targs.hasOwnProperty(i)){t=targs[i];type=evt&&evt.type;ce=t.getEvent(type,true);if(!ce){if(t._yuievt.hasTargets){t.bubble.call(t,evt,args,target);}}else{ce.target=target||(evt&&evt.target)||this;ce.currentTarget=t;bc=ce.broadcast;ce.broadcast=false;ret=ret&&ce.fire.apply(ce,args||evt.details);ce.broadcast=bc;if(ce.stopped){break;}}}}}
return ret;};FACADE=new Y.EventFacade();FACADE_KEYS=Y.Object.keys(FACADE);})();},'3.0.0',{requires:['event-custom-base']});