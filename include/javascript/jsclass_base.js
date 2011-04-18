/*********************************************************************************
 * SugarCRM is a customer relationship management program developed by
 * SugarCRM, Inc. Copyright (C) 2004-2011 SugarCRM Inc.
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY SUGARCRM, SUGARCRM DISCLAIMS THE WARRANTY
 * OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along with
 * this program; if not, see http://www.gnu.org/licenses or write to the Free
 * Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 * 02110-1301 USA.
 *
 * You can contact SugarCRM, Inc. headquarters at 10050 North Wolfe Road,
 * SW2-130, Cupertino, CA 95014, USA. or at email address contact@sugarcrm.com.
 *
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU Affero General Public License version 3.
 *
 * In accordance with Section 7(b) of the GNU Affero General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "Powered by
 * SugarCRM" logo. If the display of the logo is not reasonably feasible for
 * technical reasons, the Appropriate Legal Notices must display the words
 * "Powered by SugarCRM".
 ********************************************************************************/
langlite=Module("langlite","0.3.7",function(mod){mod.JSONParser=Class("JSONParser",function(publ,supr){publ.init=function(){this.libs={};}
publ.addLib=function(obj,name,exports){if(exports==null){this.libs[name]=obj;}else{for(var i=0;i<exports.length;i++){this.libs[name+"."+exports[i]]=obj[exports[i]];}}}
publ.objToJson=function(obj){if(obj==null){return"null";}else{return mod.objToJson(obj);}}})
mod.parser=new mod.JSONParser();mod.jsonToObj=function(src){return mod.parser.jsonToObj(src);}
var json_types=new Object();json_types['object']=function(obj){var v=[];for(attr in obj){if(typeof obj[attr]!="function"){v.push('"'+attr+'": '+mod.objToJson(obj[attr]));}}
return"{"+v.join(", ")+"}";}
json_types['string']=function(obj){var s='"'+obj.replace(/(["\\])/g,'\\$1')+'"';s=s.replace(/(\n)/g,"\\n");return s;}
json_types['number']=function(obj){return obj.toString();}
json_types['boolean']=function(obj){return obj.toString();}
json_types['date']=function(obj){var padd=function(s,p){s=p+s
return s.substring(s.length-p.length)}
var y=padd(obj.getUTCFullYear(),"0000");var m=padd(obj.getUTCMonth()+1,"00");var d=padd(obj.getUTCDate(),"00");var h=padd(obj.getUTCHours(),"00");var min=padd(obj.getUTCMinutes(),"00");var s=padd(obj.getUTCSeconds(),"00");var isodate=y+m+d+"T"+h+":"+min+":"+s
return'{"jsonclass":["sys.ISODate", ["'+isodate+'"]]}';}
json_types['array']=function(obj){var v=[];for(var i=0;i<obj.length;i++){v.push(mod.objToJson(obj[i]));}
return"["+v.join(", ")+"]";}
mod.objToJson=function(obj){if(typeof(obj)=='undefined')
{return'';}
if(typeof(json_types[typeof(obj)])=='undefined')
{alert('class not defined for toJSON():'+typeof(obj));}
return json_types[typeof(obj)](obj);}
mod.test=function(){try{print(mod.objToJson(['sds',-12377,-1212.1212,12,'-2312']));}catch(e){print(e.toTraceString());}}})
jsonrpclite=Module("jsonrpclite","0.3.2",function(mod){var lang=langlite
var tokens=lang.tokens;var ObjectBuffer=Class("ObjectBuffer",function(publ,supr){publ.init=function(){this.data="";}
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
function SugarClass()
{this.init();}
SugarClass.prototype.init=function(){}
SugarClass.inherit=function(className,parentClassName){var str=className+".prototype = new "+parentClassName+"();";str+=className+".prototype.constructor = "+className+";";str+=className+".superclass = "+parentClassName+".prototype;";try{eval(str);}catch(e){}}
SugarClass.inherit("SugarContainer","SugarClass");function SugarContainer(root_div)
{GLOBAL_REGISTRY.container=this;this.init(root_div);}
SugarContainer.prototype.init=function(root_div){this.root_div=root_div;SugarContainer.superclass.init.call(this);}
SugarContainer.prototype.start=function(root_widget){this.root_widget=new root_widget();this.root_widget.load(this.root_div);}
jsolait.baseURL='include/jsolait/lib';urllib=importModule('urllib');var global_request_registry=new Object();var jsolait_baseURL='include/jsolait/lib';var jsonrpc=jsonrpclite;var req_count=0;SugarClass.inherit("SugarDateTime","SugarClass");function SugarDateTime()
{this.init(root_div);}
SugarDateTime.prototype.init=function(root_div){this.root_div=root_div;}
SugarDateTime.mysql2jsDateTime=function(mysql_date,mysql_time){var match=new RegExp(date_reg_format);if(((result=match.exec(mysql_date)))==null)
{return null;}
var match2=new RegExp(time_reg_format);if((result2=match2.exec(mysql_time))==null)
{result2=[0,0,0,0];}
var match3=/^0(\d)/;if((result3=match3.exec(result2[1]))!=null)
{result2[1]=result3[1];}
if(typeof(result2[3])!='undefined')
{if(result2[3]=='pm'||result2[3]=='PM')
{if(parseInt(result2[1])!=12)
{result2[1]=parseInt(result2[1])+12;}}
else if(result2[1]==12){result2[1]=0;}}
return new Date(result[date_reg_positions['Y']],result[date_reg_positions['m']]-1,result[date_reg_positions['d']],result2[1],result2[2],0,0);}
SugarDateTime.prototype.getFormattedDate=function(date_obj){var returnDate='';var userDateFormat=GLOBAL_REGISTRY['current_user']['fields']['date_time_format']['date'];var dow=GLOBAL_REGISTRY['calendar_strings']['dom_cal_weekdays_long'][date_obj.getDay()];var month=date_obj.getMonth()+1;month=GLOBAL_REGISTRY['calendar_strings']['dom_cal_month_long'][month];returnDate=dow;for(i=0;i<5;i++){switch(userDateFormat.charAt(i)){case"Y":returnDate+=" "+date_obj.getFullYear();break;case"m":returnDate+=" "+month;break;case"d":returnDate+=" "+date_obj.getDate();break;default:}}
return returnDate;}
SugarDateTime.getFormattedDate=SugarDateTime.prototype.getFormattedDate;SugarDateTime.prototype.getFormattedDOW=function(date_obj){var hour=config.strings.mod_strings.Calendar.dow[date_obj.getDay()];}
SugarDateTime.getFormattedDOW=SugarDateTime.prototype.getFormattedDOW;SugarDateTime.getAMPM=function(date_obj){var hour=date_obj.getHour();var am_pm='AM';if(hour>12)
{hour-=12;am_pm='PM';}
else if(hour==12)
{am_pm='PM';}
else if(hour==0)
{hour=12;}
return am_pm;}
SugarDateTime.getFormattedHour=SugarDateTime.prototype.getFormattedHour;SugarDateTime.prototype.parseUTCDate=function(date_string){var match=/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/;if(((result=match.exec(date_string)))!=null)
{var new_date=new Date(Date.UTC(result[1],result[2]-1,result[3],result[4],result[5],parseInt(result[6])+time_offset));return new_date;}}
SugarDateTime.parseUTCDate=SugarDateTime.prototype.parseUTCDate;SugarDateTime.prototype.parseAdjustedDate=function(date_string,dst_start,dst_end,gmt_offset_secs){var match=/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/;dst_start_parse=match.exec(dst_start);dst_end_parse=match.exec(dst_end);if(dst_start_parse==null||dst_end_parse==null){var new_date=new Date(result[1],result[2]-1,result[3],result[4],result[5],parseInt(result[6]));new_date=new Date(new_date.getTime()+gmt_offset_secs*1000);}else{dst_start_obj=new Date(dst_start_parse[1],dst_start_parse[2]-1,dst_start_parse[3],dst_start_parse[4],dst_start_parse[5],parseInt(dst_start_parse[6]));dst_end_obj=new Date(dst_end_parse[1],dst_end_parse[2]-1,dst_end_parse[3],dst_end_parse[4],dst_end_parse[5],parseInt(dst_end_parse[6]));if(((result=match.exec(date_string)))!=null)
{var new_date=new Date(result[1],result[2]-1,result[3],result[4],result[5],parseInt(result[6]));var event_ts=new_date.getTime();var dst_start_ts=dst_start_obj.getTime();var dst_end_ts=dst_end_obj.getTime();if(((event_ts>=dst_start_ts||event_ts<dst_end_ts)&&dst_start_ts>dst_end_ts)||(event_ts>=dst_start_ts&&event_ts<dst_end_ts)){new_date=new Date(new_date.getTime()+60*60*1000);}
new_date=new Date(new_date.getTime()+gmt_offset_secs*1000);}}
return new_date;}
SugarDateTime.parseAdjustedDate=SugarDateTime.prototype.parseAdjustedDate;SugarDateTime.prototype.getUTCHash=function(startdate){var month=(startdate.getUTCMonth()<10)?"0"+startdate.getUTCMonth():""+startdate.getUTCMonth();var day=(startdate.getUTCDate()<10)?"0"+startdate.getUTCDate():""+startdate.getUTCDate();var hours=(startdate.getUTCHours()<10)?"0"+startdate.getUTCHours():""+startdate.getUTCHours();var minutes=(startdate.getUTCMinutes()<10)?"0"+startdate.getUTCMinutes():""+startdate.getUTCMinutes();return startdate.getUTCFullYear()+month+day+hours+minutes;return startdate.getUTCFullYear()+month+day+hours+minutes;}
SugarDateTime.getUTCHash=SugarDateTime.prototype.getUTCHash;