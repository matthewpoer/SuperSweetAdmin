/*
 
 Modification information for LGPL compliance
 
 r56990 - 2010-06-16 13:05:36 -0700 (Wed, 16 Jun 2010) - kjing - snapshot "Mango" svn branch to a new one for GitHub sync
 
 r56989 - 2010-06-16 13:01:33 -0700 (Wed, 16 Jun 2010) - kjing - defunt "Mango" svn dev branch before github cutover
 
 r55980 - 2010-04-19 13:31:28 -0700 (Mon, 19 Apr 2010) - kjing - create Mango (6.1) based on windex
 
 r51719 - 2009-10-22 10:18:00 -0700 (Thu, 22 Oct 2009) - mitani - Converted to Build 3  tags and updated the build system
 
 r51634 - 2009-10-19 13:32:22 -0700 (Mon, 19 Oct 2009) - mitani - Windex is the branch for Sugar Sales 1.0 development
 
 r50375 - 2009-08-24 18:07:43 -0700 (Mon, 24 Aug 2009) - dwong - branch kobe2 from tokyo r50372
 
 r42807 - 2008-12-29 11:16:59 -0800 (Mon, 29 Dec 2008) - dwong - Branch from trunk/sugarcrm r42806 to branches/tokyo/sugarcrm
 
 r21575 - 2007-04-09 16:28:53 -0700 (Mon, 09 Apr 2007) - chris - Bug 12274 - SECURITY: CSRF (cross-site request forgery) fix.
 Fix back-ported to:
 Maint 451
 SecFix 451c
 Maint 450
 Portal Maint 450
 SecFix 421b
 Touched:
 ./index.php
 ./json.php
 ./json_server.php
 ./include/jsclass_async.js
 ./include/jsclass_base.js
 ./include/javascript/yui/connection.js
 ./include/jsolait/lib/jsonrpc.js
 ./include/jsolait/lib/jsonrpclite.js
 ./include/JSON.js
 ./include/JSON.php
 ./modules/Emails/Email.js
 
 r10487 - 2005-12-12 03:57:07 -0800 (Mon, 12 Dec 2005) - robert - fixed: 3478
 also changed jsonrpc on the client side so that javascript classes
 will no longer get the toJSON method added to it.
 
 
 */
Module("jsonrpclite","0.3.2",function(mod){var lang=importModule("langlite");var tokens=lang.tokens;var ObjectBuffer=Class("ObjectBuffer",function(publ,supr){publ.init=function(){this.data="";}
publ.getObjects=function(data){this.data+=data;var t=new lang.Tokenizer(this.data);var brCnt=0;var objects=[];var readCnt=0
while(!t.finished()){var n=t.next();if(n.type!=tokens.ERR){if(n.value=="{"){brCnt+=1;}else if(n.value=="}"){brCnt-=1;if(brCnt==0){var s=this.data.slice(readCnt,n.pos+1);readCnt+=s.length;objects.push(s);}}}else{break;}}
this.data=this.data.slice(readCnt);return objects;}})
var nameAllowed=function(name){return name.match(/^[a-zA-Z]\w*$/)!=null;}
var getMethodByName=function(obj,name){try{obj=obj._getMethodByName(name)}catch(e){var names=name.split(".");for(var i=0;i<names.length;i++){name=names[i];if(nameAllowed(name)){obj=obj[name];}}}
return obj;}
var Response=Class("Response",function(publ,supr){publ.init=function(id,result,error){this.id=id;this.result=result;this.error=error;}
publ._toJSON=function(){var p=[lang.objToJson(this.id),lang.objToJson(this.result),lang.objToJson(this.error)];return'{"id":'+p[0]+', "result":'+p[1]+', "error":'+p[2]+"}";}})
var Request=Class("Request",function(publ,supr){publ.init=function(id,method,params){this.id=id;this.method=method;this.params=params;}
publ._toJSON=function(){var p=[lang.objToJson(this.id),lang.objToJson(this.method),lang.objToJson(this.params)];return'{"id":'+p[0]+', "method":'+p[1]+', "params":'+p[2]+"}";}})
var Notification=Class("Notification",function(publ,supr){publ.init=function(method,params){this.method=method;this.params=params;}
publ._toJSON=function(){var p=[lang.objToJson(this.method),lang.objToJson(this.params)];return'{"method":'+p[0]+', "params":'+p[1]+"}";}})
var ResponseHandler=Class("ResponseHandler",function(publ,supr){publ.init=function(callback){this.callback=callback;}
publ.handleResponse=function(resp){this.callback(resp.result,resp.error);}})
var RPCLib=Class("RPCLib",function(publ,supr){})
var BaseConnectionHandler=Class("BaseConnectionHandler",function(publ,supr){publ.init=function(service){this.service=service;this.jsonParser=new lang.JSONParser();this.jsonParser.addLib(new RPCLib(),"rpc",[]);this.respHandlers=[];this.objBuffer=new ObjectBuffer();}
publ.addResponseHandler=function(cb){var id=1;while(this.respHandlers[""+id]){id+=1;}
id=""+id;this.respHandlers[id]=new ResponseHandler(cb);return id;}
publ.send=function(data){}
publ.sendNotify=function(name,args){var n=new Notification(name,args);n=this.jsonParser.objToJson(n);this.send(n)}
publ.sendRequest=function(name,args,callback){var id=this.addResponseHandler(callback);var r=new Request(id,name,args);r=this.jsonParser.objToJson(r);this.send(r);}
publ.sendResponse=function(id,result,error){var r=new Response(id,result,error);r=this.jsonParser.objToJson(r);this.send(r);}
publ.handleRequest=function(req){var name=req.method;var params=req.params;var id=req.id;if(this.service[name]){try{var rslt=this.service[name].apply(this.service,params);this.sendResponse(id,rslt,null)}catch(e){this.sendResponse(id,null,new ApplicationError(""+e))}}else{this.sendResponse(id,null,new MethodNotFound());}}
publ.handleNotification=function(notif){if(this.service[notif.method]){try{this.service[notif.method].apply(this.service,notif.params);}catch(e){}}}
publ.handleResponse=function(resp){var id=resp.id;var h=this.respHandlers[id];h.handleResponse(resp)
delete this.respHandlers[id]}
publ.handleData=function(data){var objs=this.objBuffer.getObjects(data);for(var i=0;i<objs.length;i++){try{var obj=this.jsonParser.jsonToObj(objs[i]);}catch(e){throw"Not well formed";}
if(obj.method!=null){if(obj.id!=null){this.handleRequest(new Request(obj.id,obj.method,obj.params));}else{this.handleNotification(new Notification(obj.method,obj.params));}}else if(obj.id!=null){this.handleResponse(new Response(obj.id,obj.result,obj.error));}else{throw"Unknown Data";}}}})
var SocketConnectionHandler=Class("SocketConnectionHandler",BaseConnectionHandler,function(publ,supr){publ.init=function(socket,localService){this.socket=socket;socket.addEventListener("connectionData",this,false);supr(this).init(localService);}
publ.handleEvent=function(evt){this.handleData(evt.data);}
publ.send=function(data){this.socket.send(data);}
publ.close=function(data){this.socket.close();}})
var HTTPConnectionHandler=Class("HTTPConnectionHandler",BaseConnectionHandler,function(publ,supr){var urllib;publ.request_id=1;publ.init=function(url,localService){urllib=importModule("urllib");this.url=url;supr(this).init(localService);}
publ.handleData=function(data){try{var obj=JSON.parse(data);}catch(e){;throw" Not well formed\n\n"+e+"\n\nResponse from server:\n\n "+data;}
if(obj.id!=null){return obj;}else{throw"Unknown Data (No id property found)";}}
publ.sendRequest=function(name,args,callback){var sync=false;if(typeof callback!="function"){args.push(callback);sync=true;}
var data=new Request(this.request_id++,name,args);data=JSON.stringify(data);if(sync){var rsp=urllib.postURL(this.url,data,[["Content-Type","text/plain"]]);rsp=this.handleData(rsp.responseText);if(rsp.error){throw rsp.error;}else{return rsp.result;}}else{var self=this;var request_id=this.request_id;urllib.postURL(this.url,data,[["Content-Type","text/plain"]],function(rsp){try{rsp=self.handleData(rsp.responseText);}catch(e){callback(request_id,null,e);return;}
callback(request_id,rsp.result,rsp.error);});}}
publ.sendNotify=function(name,args){var data=new Notification(name,args);data=this.jsonParser.objToJson(data);urllib.postURL(this.url,data,[["Content-Type","text/plain"]],function(rsp){});}})
var PeerObject=Class("PeerObject",function(publ,supr){publ.init=function(name,conn){var fn=function(){var args=[];for(var i=0;i<arguments.length;i++){args[i]=arguments[i];}
var cb=args.pop();return conn.sendRequest(name,args,cb);}
return fn;}})
var PeerNotifyObject=Class("PeerNotifyObject",function(publ,supr){publ.init=function(name,conn){var fn=function(){var args=[];for(var i=0;i<arguments.length;i++){args[i]=arguments[i];}
conn.sendNotify(name,args);}
return fn;}})
var BasePeer=Class("BasePeer",function(publ,supr){publ.init=function(conn,methodNames){this._conn=conn;this.notify=new PeerObject("notify",conn);this._add(methodNames);}
var setupPeerMethod=function(root,methodName,conn,MethClass){var names=methodName.split(".");var obj=root;for(var n=0;n<names.length-1;n++){var name=names[n];if(obj[name]){obj=obj[name];}else{obj[name]=new Object();obj=obj[name];}}
var name=names[names.length-1];if(obj[name]){}else{var mth=new MethClass(methodName,conn);obj[name]=mth;}}
publ._add=function(methodNames){for(var i=0;i<methodNames.length;i++){setupPeerMethod(this,methodNames[i],this._conn,PeerObject);setupPeerMethod(this.notify,methodNames[i],this._conn,PeerNotifyObject);}}})
mod.ServiceProxy=Class("ServiceProxy",BasePeer,function(publ,supr){publ.init=function(url,methodNames,localService){var n=url.match(/^jsonrpc:\/\/(.*:\d*)$/);if(n!=null){var hostaddr=n[1];try{var socket=createConnection();}catch(e){throw"Can't create a socket connection."}
socket.connect(hostaddr);supr(this).init(new SocketConnectionHandler(socket,localService),methodNames);}else{this.httpConn=new HTTPConnectionHandler(url,localService);supr(this).init(this.httpConn,methodNames);}}})})