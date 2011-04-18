/*
 Copyright (c) 2009, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.net/yui/license.txt
 version: 3.0.0
 build: 1549
 */
(function(){var GLOBAL_ENV=YUI.Env,C=YUI.config,D=C.doc,POLL_INTERVAL=C.pollInterval||40,_ready=function(e){GLOBAL_ENV._ready();};if(!GLOBAL_ENV._ready){GLOBAL_ENV._ready=function(){if(!GLOBAL_ENV.DOMReady){GLOBAL_ENV.DOMReady=true;if(D.removeEventListener){D.removeEventListener("DOMContentLoaded",_ready,false);}}};if(navigator.userAgent.match(/MSIE/)){if(self!==self.top){document.onreadystatechange=function(){if(document.readyState=='complete'){document.onreadystatechange=null;_ready();}};}else{GLOBAL_ENV._dri=setInterval(function(){try{document.documentElement.doScroll('left');clearInterval(GLOBAL_ENV._dri);GLOBAL_ENV._dri=null;_ready();}catch(ex){}},POLL_INTERVAL);}}else{D.addEventListener("DOMContentLoaded",_ready,false);}}})();YUI.add('event-base',function(Y){(function(){var GLOBAL_ENV=YUI.Env,yready=function(){Y.fire('domready');};Y.publish('domready',{fireOnce:true});if(GLOBAL_ENV.DOMReady){yready();}else{Y.before(yready,GLOBAL_ENV,"_ready");}})();(function(){var ua=Y.UA,webkitKeymap={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9,63272:46,63273:36,63275:35},resolve=function(n){try{if(n&&3==n.nodeType){n=n.parentNode;}}catch(e){return null;}
return Y.one(n);};Y.DOMEventFacade=function(ev,currentTarget,wrapper){wrapper=wrapper||{};var e=ev,ot=currentTarget,d=Y.config.doc,b=d.body,x=e.pageX,y=e.pageY,c,t;this.altKey=e.altKey;this.ctrlKey=e.ctrlKey;this.metaKey=e.metaKey;this.shiftKey=e.shiftKey;this.type=e.type;this.clientX=e.clientX;this.clientY=e.clientY;if(!x&&0!==x){x=e.clientX||0;y=e.clientY||0;if(ua.ie){x+=Math.max(d.documentElement.scrollLeft,b.scrollLeft);y+=Math.max(d.documentElement.scrollTop,b.scrollTop);}}
this._yuifacade=true;this._event=e;this.pageX=x;this.pageY=y;c=e.keyCode||e.charCode||0;if(ua.webkit&&(c in webkitKeymap)){c=webkitKeymap[c];}
this.keyCode=c;this.charCode=c;this.button=e.which||e.button;this.which=this.button;this.target=resolve(e.target||e.srcElement);this.currentTarget=resolve(ot);t=e.relatedTarget;if(!t){if(e.type=="mouseout"){t=e.toElement;}else if(e.type=="mouseover"){t=e.fromElement;}}
this.relatedTarget=resolve(t);if(e.type=="mousewheel"||e.type=="DOMMouseScroll"){this.wheelDelta=(e.detail)?(e.detail*-1):Math.round(e.wheelDelta/80)||((e.wheelDelta<0)?-1:1);}
this.stopPropagation=function(){if(e.stopPropagation){e.stopPropagation();}else{e.cancelBubble=true;}
wrapper.stopped=1;};this.stopImmediatePropagation=function(){if(e.stopImmediatePropagation){e.stopImmediatePropagation();}else{this.stopPropagation();}
wrapper.stopped=2;};this.preventDefault=function(returnValue){if(e.preventDefault){e.preventDefault();}
e.returnValue=returnValue||false;wrapper.prevented=1;};this.halt=function(immediate){if(immediate){this.stopImmediatePropagation();}else{this.stopPropagation();}
this.preventDefault();};};})();(function(){Y.Env.evt.dom_wrappers={};Y.Env.evt.dom_map={};var _eventenv=Y.Env.evt,add=YUI.Env.add,remove=YUI.Env.remove,onLoad=function(){YUI.Env.windowLoaded=true;Y.Event._load();remove(window,"load",onLoad);},onUnload=function(){Y.Event._unload();remove(window,"unload",onUnload);},EVENT_READY='domready',COMPAT_ARG='~yui|2|compat~',shouldIterate=function(o){try{return(o&&typeof o!=="string"&&Y.Lang.isNumber(o.length)&&!o.tagName&&!o.alert);}catch(ex){return false;}},Event=function(){var _loadComplete=false,_retryCount=0,_avail=[],_wrappers=_eventenv.dom_wrappers,_windowLoadKey=null,_el_events=_eventenv.dom_map;return{POLL_RETRYS:1000,POLL_INTERVAL:40,lastError:null,_interval:null,_dri:null,DOMReady:false,startInterval:function(){var E=Y.Event;if(!E._interval){E._interval=setInterval(Y.bind(E._poll,E),E.POLL_INTERVAL);}},onAvailable:function(id,fn,p_obj,p_override,checkContent,compat){var a=Y.Array(id),i,availHandle;for(i=0;i<a.length;i=i+1){_avail.push({id:a[i],fn:fn,obj:p_obj,override:p_override,checkReady:checkContent,compat:compat});}
_retryCount=this.POLL_RETRYS;setTimeout(Y.bind(Y.Event._poll,Y.Event),0);availHandle=new Y.EventHandle({_delete:function(){if(availHandle.handle){availHandle.handle.detach();return;}
var i,j;for(i=0;i<a.length;i++){for(j=0;j<_avail.length;j++){if(a[i]===_avail[j].id){_avail.splice(j,1);}}}}});return availHandle;},onContentReady:function(id,fn,p_obj,p_override,compat){return this.onAvailable(id,fn,p_obj,p_override,true,compat);},attach:function(type,fn,el,context){return Y.Event._attach(Y.Array(arguments,0,true));},_createWrapper:function(el,type,capture,compat,facade){var ek=Y.stamp(el),key='event:'+ek+type,cewrapper;if(false===facade){key+='native';}
if(capture){key+='capture';}
cewrapper=_wrappers[key];if(!cewrapper){cewrapper=Y.publish(key,{silent:true,bubbles:false,contextFn:function(){cewrapper.nodeRef=cewrapper.nodeRef||Y.one(cewrapper.el);return cewrapper.nodeRef;}});cewrapper.el=el;cewrapper.key=key;cewrapper.domkey=ek;cewrapper.type=type;cewrapper.fn=function(e){cewrapper.fire(Y.Event.getEvent(e,el,(compat||(false===facade))));};cewrapper.capture=capture;if(el==Y.config.win&&type=="load"){cewrapper.fireOnce=true;_windowLoadKey=key;}
_wrappers[key]=cewrapper;_el_events[ek]=_el_events[ek]||{};_el_events[ek][key]=cewrapper;add(el,type,cewrapper.fn,capture);}
return cewrapper;},_attach:function(args,config){var compat,E=Y.Event,handles,oEl,cewrapper,context,fireNow=false,ret,type=args[0],fn=args[1],el=args[2]||Y.config.win,facade=config&&config.facade,capture=config&&config.capture;if(args[args.length-1]===COMPAT_ARG){compat=true;}
if(!fn||!fn.call){return false;}
if(shouldIterate(el)){handles=[];Y.each(el,function(v,k){args[2]=v;handles.push(E._attach(args,config));});return new Y.EventHandle(handles);}else if(Y.Lang.isString(el)){if(compat){oEl=Y.DOM.byId(el);}else{oEl=Y.Selector.query(el);switch(oEl.length){case 0:oEl=null;break;case 1:oEl=oEl[0];break;default:args[2]=oEl;return E._attach(args,config);}}
if(oEl){el=oEl;}else{ret=this.onAvailable(el,function(){ret.handle=E._attach(args,config);},E,true,false,compat);return ret;}}
if(!el){return false;}
if(Y.Node&&el instanceof Y.Node){el=Y.Node.getDOMNode(el);}
cewrapper=this._createWrapper(el,type,capture,compat,facade);if(el==Y.config.win&&type=="load"){if(YUI.Env.windowLoaded){fireNow=true;}}
if(compat){args.pop();}
context=args[3];ret=cewrapper._on(fn,context,(args.length>4)?args.slice(4):null);if(fireNow){cewrapper.fire();}
return ret;},detach:function(type,fn,el,obj){var args=Y.Array(arguments,0,true),compat,i,l,ok,id,ce;if(args[args.length-1]===COMPAT_ARG){compat=true;}
if(type&&type.detach){return type.detach();}
if(typeof el=="string"){if(compat){el=Y.DOM.byId(el);}else{el=Y.Selector.query(el);l=el.length;if(l<1){el=null;}else if(l==1){el=el[0];}}}
if(!el){return false;}
if(shouldIterate(el)){ok=true;for(i=0,l=el.length;i<l;++i){args[2]=el[i];ok=(Y.Event.detach.apply(Y.Event,args)&&ok);}
return ok;}
if(!type||!fn||!fn.call){return this.purgeElement(el,false,type);}
id='event:'+Y.stamp(el)+type;ce=_wrappers[id];if(ce){return ce.detach(fn);}else{return false;}},getEvent:function(e,el,noFacade){var ev=e||window.event;return(noFacade)?ev:new Y.DOMEventFacade(ev,el,_wrappers['event:'+Y.stamp(el)+e.type]);},generateId:function(el){var id=el.id;if(!id){id=Y.stamp(el);el.id=id;}
return id;},_isValidCollection:shouldIterate,_load:function(e){if(!_loadComplete){_loadComplete=true;if(Y.fire){Y.fire(EVENT_READY);}
Y.Event._poll();}},_poll:function(){if(this.locked){return;}
if(Y.UA.ie&&!YUI.Env.DOMReady){this.startInterval();return;}
this.locked=true;var tryAgain=!_loadComplete,notAvail,executeItem,i,len,item,el;if(!tryAgain){tryAgain=(_retryCount>0);}
notAvail=[];executeItem=function(el,item){var context,ov=item.override;if(item.compat){if(item.override){if(ov===true){context=item.obj;}else{context=ov;}}else{context=el;}
item.fn.call(context,item.obj);}else{context=item.obj||Y.one(el);item.fn.apply(context,(Y.Lang.isArray(ov))?ov:[]);}};for(i=0,len=_avail.length;i<len;++i){item=_avail[i];if(item&&!item.checkReady){el=(item.compat)?Y.DOM.byId(item.id):Y.Selector.query(item.id,null,true);if(el){executeItem(el,item);_avail[i]=null;}else{notAvail.push(item);}}}
for(i=0,len=_avail.length;i<len;++i){item=_avail[i];if(item&&item.checkReady){el=(item.compat)?Y.DOM.byId(item.id):Y.Selector.query(item.id,null,true);if(el){if(_loadComplete||(el.get&&el.get('nextSibling'))||el.nextSibling){executeItem(el,item);_avail[i]=null;}}else{notAvail.push(item);}}}
_retryCount=(notAvail.length===0)?0:_retryCount-1;if(tryAgain){this.startInterval();}else{clearInterval(this._interval);this._interval=null;}
this.locked=false;return;},purgeElement:function(el,recurse,type){var oEl=(Y.Lang.isString(el))?Y.Selector.query(el,null,true):el,lis=this.getListeners(oEl,type),i,len,props;if(lis){for(i=0,len=lis.length;i<len;++i){props=lis[i];props.detachAll();remove(props.el,props.type,props.fn,props.capture);delete _wrappers[props.key];delete _el_events[props.domkey][props.key];}}
if(recurse&&oEl&&oEl.childNodes){for(i=0,len=oEl.childNodes.length;i<len;++i){this.purgeElement(oEl.childNodes[i],recurse,type);}}},getListeners:function(el,type){var ek=Y.stamp(el,true),evts=_el_events[ek],results=[],key=(type)?'event:'+ek+type:null;if(!evts){return null;}
if(key){if(evts[key]){results.push(evts[key]);}
key+='native';if(evts[key]){results.push(evts[key]);}}else{Y.each(evts,function(v,k){results.push(v);});}
return(results.length)?results:null;},_unload:function(e){Y.each(_wrappers,function(v,k){v.detachAll();remove(v.el,v.type,v.fn,v.capture);delete _wrappers[k];delete _el_events[v.domkey][k];});},nativeAdd:add,nativeRemove:remove};}();Y.Event=Event;if(Y.config.injected||YUI.Env.windowLoaded){onLoad();}else{add(window,"load",onLoad);}
if(Y.UA.ie){Y.on(EVENT_READY,Event._poll,Event,true);}
Y.on("unload",onUnload);Event.Custom=Y.CustomEvent;Event.Subscriber=Y.Subscriber;Event.Target=Y.EventTarget;Event.Handle=Y.EventHandle;Event.Facade=Y.EventFacade;Event._poll();})();Y.Env.evt.plugins.available={on:function(type,fn,id,o){var a=arguments.length>4?Y.Array(arguments,4,true):[];return Y.Event.onAvailable.call(Y.Event,id,fn,o,a);}};Y.Env.evt.plugins.contentready={on:function(type,fn,id,o){var a=arguments.length>4?Y.Array(arguments,4,true):[];return Y.Event.onContentReady.call(Y.Event,id,fn,o,a);}};},'3.0.0',{requires:['event-custom-base']});