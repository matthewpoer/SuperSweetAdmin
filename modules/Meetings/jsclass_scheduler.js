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
SugarClass.inherit("SugarWidgetListView","SugarClass");function SugarWidgetListView(){this.init();}
SugarWidgetListView.prototype.init=function(){}
SugarWidgetListView.prototype.load=function(parentNode){this.parentNode=parentNode;this.display();}
SugarWidgetListView.prototype.display=function(){if(typeof GLOBAL_REGISTRY['result_list']=='undefined'){this.display_loading();return;}
var div=document.getElementById('list_div_win');div.style.display='block';var html='<table width="100%" cellpadding="0" cellspacing="0" border="0" class="list view">';html+='<tr>';html+='<th width="2%" nowrap="nowrap">&nbsp;</th>';html+='<th width="20%" nowrap="nowrap">'+GLOBAL_REGISTRY['meeting_strings']['LBL_NAME']+'</th>';html+='<th width="20%" nowrap="nowrap">'+GLOBAL_REGISTRY['meeting_strings']['LBL_EMAIL']+'</th>';html+='<th width="20%" nowrap="nowrap">'+GLOBAL_REGISTRY['meeting_strings']['LBL_PHONE']+'</th>';html+='<th width="18%" nowrap="nowrap">&nbsp;</th>';html+='</tr>';for(var i=0;i<GLOBAL_REGISTRY['result_list'].length;i++){var bean=GLOBAL_REGISTRY['result_list'][i];var disabled=false;var className='evenListRowS1';if(typeof(GLOBAL_REGISTRY.focus.users_arr_hash[bean.fields.id])!='undefined'){disabled=true;}
if((i%2)==0){className='oddListRowS1';}else{className='evenListRowS1';}
if(typeof(bean.fields.first_name)=='undefined'){bean.fields.first_name='';}
if(typeof(bean.fields.email1)=='undefined'||bean.fields.email1==""){bean.fields.email1='&nbsp;';}
if(typeof(bean.fields.phone_work)=='undefined'||bean.fields.phone_work==""){bean.fields.phone_work='&nbsp;';}
html+='<tr class="'+className+'">';html+='<td><img src="'+GLOBAL_REGISTRY.config['site_url']+'/index.php?entryPoint=getImage&themeName='+SUGAR.themes.theme_name+'&imageName='+bean.module+'s.gif"/></td>';html+='<td>'+bean.fields.full_name+'</td>';html+='<td>'+bean.fields.email1+'</td>';html+='<td>'+bean.fields.phone_work+'</td>';html+='<td align="right">';hidden='visible';if(!disabled){}
html+='<input type="button" class="button" onclick="this.disabled=true;SugarWidgetSchedulerAttendees.form_add_attendee('+i+');" value="'+GLOBAL_REGISTRY['meeting_strings']['LBL_ADD_BUTTON']+'"/ style="visibility: '+hidden+'"/>';html+='</td>';html+='</tr>';}
html+='</table>';this.parentNode.innerHTML=html;}
SugarWidgetListView.prototype.display_loading=function(){}
SugarClass.inherit("SugarWidgetSchedulerSearch","SugarClass");function SugarWidgetSchedulerSearch(){this.init();}
SugarWidgetSchedulerSearch.prototype.init=function(){this.form_id='scheduler_search';GLOBAL_REGISTRY['widget_element_map']=new Object();GLOBAL_REGISTRY['widget_element_map'][this.form_id]=this;}
SugarWidgetSchedulerSearch.prototype.load=function(parentNode){this.parentNode=parentNode;this.display();}
SugarWidgetSchedulerSearch.submit=function(form){var conditions=new Array();if(form.search_first_name.value!=''){conditions[conditions.length]={"name":"first_name","op":"starts_with","value":form.search_first_name.value}}
if(form.search_last_name.value!=''){conditions[conditions.length]={"name":"last_name","op":"starts_with","value":form.search_last_name.value}}
if(form.search_email.value!=''){conditions[conditions.length]={"name":"email1","op":"starts_with","value":form.search_email.value}}
var query={"modules":["Users","Contacts","Leads"],"group":"and","field_list":['id','full_name','email1','phone_work'],"conditions":conditions};global_request_registry[req_count]=[this,'display'];req_id=global_rpcClient.call_method('query',query);global_request_registry[req_id]=[GLOBAL_REGISTRY['widget_element_map'][form.id],'refresh_list'];}
SugarWidgetSchedulerSearch.prototype.refresh_list=function(rslt){GLOBAL_REGISTRY['result_list']=rslt['list'];this.list_view.display();}
SugarWidgetSchedulerSearch.prototype.display=function(){var html='<div class="schedulerInvitees"><h3>'+GLOBAL_REGISTRY['meeting_strings']['LBL_ADD_INVITEE']+'</h5><table border="0" cellpadding="0" cellspacing="0" width="100%" class="edit view">';html+='<tr><td>';html+='<form name="schedulerwidget" id="'+this.form_id+'" onsubmit="SugarWidgetSchedulerSearch.submit(this);return false;">';html+='<table width="100%" cellpadding="0" cellspacing="0" width="100%" >'
html+='<tr>';html+='<td scope="row" nowrap>'+GLOBAL_REGISTRY['meeting_strings']['LBL_FIRST_NAME']+':&nbsp;&nbsp;<input  name="search_first_name" value="" type="text" size="10"></td>';html+='<td scope="row" nowrap>'+GLOBAL_REGISTRY['meeting_strings']['LBL_LAST_NAME']+':&nbsp;&nbsp;<input  name="search_last_name" value="" type="text" size="10"></td>';html+='<td scope="row" nowrap>'+GLOBAL_REGISTRY['meeting_strings']['LBL_EMAIL']+':&nbsp;&nbsp;<input  name="search_email" type="text" value="" size="15"></td>';html+='<td valign="center"><input type="submit" class="button" value="'+GLOBAL_REGISTRY['meeting_strings']['LBL_SEARCH_BUTTON']+'" ></td></tr>';html+='</table>';html+='</form>';html+='</td></tr></table></div>';this.parentNode.innerHTML+=html;var div=document.createElement('div');div.setAttribute('id','list_div_win');div.style.overflow='auto';div.style.width='100%';div.style.height='125px';div.style.display='none';this.parentNode.appendChild(div);this.list_view=new SugarWidgetListView();this.list_view.load(div);}
SugarClass.inherit("SugarWidgetScheduler","SugarClass");function SugarWidgetScheduler(){this.init();}
SugarWidgetScheduler.prototype.init=function(){}
SugarWidgetScheduler.prototype.load=function(parentNode){this.parentNode=parentNode;this.display();}
SugarWidgetScheduler.fill_invitees=function(form){for(var i=0;i<GLOBAL_REGISTRY.focus.users_arr.length;i++){if(GLOBAL_REGISTRY.focus.users_arr[i].module=='User'){form.user_invitees.value+=GLOBAL_REGISTRY.focus.users_arr[i].fields.id+",";}else if(GLOBAL_REGISTRY.focus.users_arr[i].module=='Contact'){form.contact_invitees.value+=GLOBAL_REGISTRY.focus.users_arr[i].fields.id+",";}else if(GLOBAL_REGISTRY.focus.users_arr[i].module=='Lead'){form.lead_invitees.value+=GLOBAL_REGISTRY.focus.users_arr[i].fields.id+",";}}}
SugarWidgetScheduler.update_time=function(){if(typeof(document.EditView)=='undefined')
return;var date_start=document.EditView.date_start.value;if(date_start.length<16){return;}
var hour_start=parseInt(date_start.substring(11,13),10);var minute_start=parseInt(date_start.substring(14,16),10);var has_meridiem=/am|pm/i.test(date_start);if(has_meridiem){var meridiem=trim(date_start.substring(16));}
GLOBAL_REGISTRY.focus.fields.date_start=date_start;if(has_meridiem){GLOBAL_REGISTRY.focus.fields.time_start=hour_start+time_separator+minute_start+meridiem;}else{GLOBAL_REGISTRY.focus.fields.time_start=hour_start+time_separator+minute_start;}
GLOBAL_REGISTRY.focus.fields.duration_hours=document.EditView.duration_hours.value;GLOBAL_REGISTRY.focus.fields.duration_minutes=document.EditView.duration_minutes.value;GLOBAL_REGISTRY.focus.fields.datetime_start=SugarDateTime.mysql2jsDateTime(GLOBAL_REGISTRY.focus.fields.date_start,GLOBAL_REGISTRY.focus.fields.time_start);GLOBAL_REGISTRY.scheduler_attendees_obj.init();GLOBAL_REGISTRY.scheduler_attendees_obj.display();}
SugarWidgetScheduler.prototype.display=function(){this.parentNode.innerHTML='';var attendees=new SugarWidgetSchedulerAttendees();attendees.load(this.parentNode);var search=new SugarWidgetSchedulerSearch();search.load(this.parentNode);}
SugarClass.inherit("SugarWidgetSchedulerAttendees","SugarClass");function SugarWidgetSchedulerAttendees(){this.init();}
SugarWidgetSchedulerAttendees.prototype.init=function(){GLOBAL_REGISTRY.scheduler_attendees_obj=this;var date_start=document.EditView.date_start.value;var hour_start=parseInt(date_start.substring(11,13),10);var minute_start=parseInt(date_start.substring(14,16),10);var has_meridiem=/am|pm/i.test(date_start);if(has_meridiem){var meridiem=trim(date_start.substring(16));}
if(has_meridiem){GLOBAL_REGISTRY.focus.fields.time_start=hour_start+time_separator+minute_start+meridiem;}else{GLOBAL_REGISTRY.focus.fields.time_start=hour_start+time_separator+minute_start;}
GLOBAL_REGISTRY.focus.fields.date_start=document.EditView.date_start.value;GLOBAL_REGISTRY.focus.fields.duration_hours=document.EditView.duration_hours.value;GLOBAL_REGISTRY.focus.fields.duration_minutes=document.EditView.duration_minutes.value;GLOBAL_REGISTRY.focus.fields.datetime_start=SugarDateTime.mysql2jsDateTime(GLOBAL_REGISTRY.focus.fields.date_start,GLOBAL_REGISTRY.focus.fields.time_start);this.timeslots=new Array();this.hours=9;this.segments=4;this.start_hours_before=4;var minute_interval=15;var dtstart=GLOBAL_REGISTRY.focus.fields.datetime_start;var curdate=new Date(dtstart.getFullYear(),dtstart.getMonth(),dtstart.getDate(),dtstart.getHours()-this.start_hours_before,0);if(typeof(GLOBAL_REGISTRY.focus.fields.duration_minutes)=='undefined'){GLOBAL_REGISTRY.focus.fields.duration_minutes=0;}
GLOBAL_REGISTRY.focus.fields.datetime_end=new Date(dtstart.getFullYear(),dtstart.getMonth(),dtstart.getDate(),dtstart.getHours()+parseInt(GLOBAL_REGISTRY.focus.fields.duration_hours),dtstart.getMinutes()+parseInt(GLOBAL_REGISTRY.focus.fields.duration_minutes),0);var has_start=false;var has_end=false;for(i=0;i<this.hours*this.segments;i++){var hash=SugarDateTime.getUTCHash(curdate);var obj={"hash":hash,"date_obj":curdate};if(has_start==false&&GLOBAL_REGISTRY.focus.fields.datetime_start.getTime()<=curdate.getTime()){obj.is_start=true;has_start=true;}
if(has_end==false&&GLOBAL_REGISTRY.focus.fields.datetime_end.getTime()<=curdate.getTime()){obj.is_end=true;has_end=true;}
this.timeslots.push(obj);curdate=new Date(curdate.getFullYear(),curdate.getMonth(),curdate.getDate(),curdate.getHours(),curdate.getMinutes()+minute_interval);}}
SugarWidgetSchedulerAttendees.prototype.load=function(parentNode){this.parentNode=parentNode;this.display();}
SugarWidgetSchedulerAttendees.prototype.display=function(){var dtstart=GLOBAL_REGISTRY.focus.fields.datetime_start;var top_date=SugarDateTime.getFormattedDate(dtstart);var html='<h3>'+GLOBAL_REGISTRY['meeting_strings']['LBL_SCHEDULING_FORM_TITLE']+'</h3><table id ="schedulerTable">';html+='<tr class="schedulerTopRow">';html+='<th colspan="'+((this.hours*this.segments)+2)+'"><h4>'+top_date+'</h4></th>';html+='</tr>';html+='<tr class="schedulerTimeRow">';html+='<td>&nbsp;</td>';for(var i=0;i<(this.timeslots.length/this.segments);i++){var hours=this.timeslots[i*this.segments].date_obj.getHours();var am_pm='';if(time_reg_format.indexOf('A')>=0||time_reg_format.indexOf('a')>=0){am_pm="AM";if(hours>12){am_pm="PM";hours-=12;}
if(hours==12){am_pm="PM";}
if(hours==0){hours=12;am_pm="AM";}
if(time_reg_format.indexOf('a')>=0){am_pm=am_pm.toLowerCase();}
if(hours!=0&&hours!=12&&i!=0){am_pm="";}}
var form_hours=hours+time_separator+"00";html+='<td scope="col" colspan="'+this.segments+'">'+form_hours+am_pm+'</td>';}
html+='<td>&nbsp;</td>';html+='</tr>';html+='</table>';if(this.parentNode.childNodes.length<1)
this.parentNode.innerHTML+='<div class="schedulerDiv">'+html+'</div>';else
this.parentNode.childNodes[0].innerHTML=html;var thetable="schedulerTable";if(typeof(GLOBAL_REGISTRY)=='undefined'){return;}
if((typeof(GLOBAL_REGISTRY.focus.users_arr)=='undefined'||GLOBAL_REGISTRY.focus.users_arr.length==0)&&document.EditView.record.value==''&&typeof(GLOBAL_REGISTRY.FIRST_REMOVE)=='undefined'){GLOBAL_REGISTRY.focus.users_arr=[GLOBAL_REGISTRY.current_user];}
if(typeof GLOBAL_REGISTRY.focus.users_arr_hash=='undefined'){GLOBAL_REGISTRY.focus.users_arr_hash=new Object();}
for(var i=0;i<GLOBAL_REGISTRY.focus.users_arr.length;i++){var row=new SugarWidgetScheduleRow(this.timeslots);row.focus_bean=GLOBAL_REGISTRY.focus.users_arr[i];GLOBAL_REGISTRY.focus.users_arr_hash[GLOBAL_REGISTRY.focus.users_arr[i]['fields']['id']]=GLOBAL_REGISTRY.focus.users_arr[i];row.load(thetable);}}
SugarWidgetSchedulerAttendees.form_add_attendee=function(list_row){if(typeof(GLOBAL_REGISTRY.result_list[list_row])!='undefined'&&typeof(GLOBAL_REGISTRY.focus.users_arr_hash[GLOBAL_REGISTRY.result_list[list_row].fields.id])=='undefined'){GLOBAL_REGISTRY.focus.users_arr[GLOBAL_REGISTRY.focus.users_arr.length]=GLOBAL_REGISTRY.result_list[list_row];}
GLOBAL_REGISTRY.scheduler_attendees_obj.display();}
SugarClass.inherit("SugarWidgetScheduleRow","SugarClass");function SugarWidgetScheduleRow(timeslots){this.init(timeslots);}
SugarWidgetScheduleRow.prototype.init=function(timeslots){this.timeslots=timeslots;}
SugarWidgetScheduleRow.prototype.load=function(thetableid){this.thetableid=thetableid;var self=this;vcalClient=new SugarVCalClient();if(typeof(GLOBAL_REGISTRY['freebusy_adjusted'])=='undefined'||typeof(GLOBAL_REGISTRY['freebusy_adjusted'][this.focus_bean.fields.id])=='undefined'){global_request_registry[req_count]=[this,'display'];vcalClient.load(this.focus_bean.fields.id,req_count);req_count++;}else{this.display();}}
SugarWidgetScheduleRow.prototype.display=function(){var self=this;var tr;this.thetable=document.getElementById(this.thetableid);if(typeof(this.element)!='undefined'){if(this.element.parentNode!=null)
this.thetable.deleteRow(this.element.rowIndex);tr=document.createElement('tr');this.thetable.appendChild(tr);}else{tr=this.thetable.insertRow(this.thetable.rows.length);}
tr.className="schedulerAttendeeRow";td=document.createElement('td');tr.appendChild(td);td.scope='row';var img='<img align="absmiddle" src="index.php?entryPoint=getImage&themeName='+SUGAR.themes.theme_name+'&imageName='+self.focus_bean.module+'s.gif"/>&nbsp;';td.innerHTML=img;td.innerHTML=td.innerHTML;if(self.focus_bean.fields.full_name)
td.innerHTML+=' '+self.focus_bean.fields.full_name;else
td.innerHTML+=' '+self.focus_bean.fields.name;this.add_freebusy_nodes(tr);var td=document.createElement('td');tr.appendChild(td);td.className='schedulerAttendeeDeleteCell';td.noWrap=true;td.innerHTML='<a title="'+GLOBAL_REGISTRY['meeting_strings']['LBL_REMOVE']+'" class="listViewTdToolsS1" style="text-decoration:none;" href="javascript:SugarWidgetScheduleRow.deleteRow(\''+self.focus_bean.fields.id+'\');">&nbsp;<img src="index.php?entryPoint=getImage&themeName='+SUGAR.themes.theme_name+'&imageName=delete_inline.gif" align="absmiddle" alt="'+GLOBAL_REGISTRY['meeting_strings']['LBL_REMOVE']+'" border="0"> '+GLOBAL_REGISTRY['meeting_strings']['LBL_REMOVE']+'</a>';this.element=tr;this.element_index=this.thetable.rows.length-1;}
SugarWidgetScheduleRow.deleteRow=function(bean_id){for(var i=0;i<GLOBAL_REGISTRY.focus.users_arr.length;i++){if(GLOBAL_REGISTRY.focus.users_arr[i]['fields']['id']==bean_id){delete GLOBAL_REGISTRY.focus.users_arr_hash[GLOBAL_REGISTRY.focus.users_arr[i]['fields']['id']];GLOBAL_REGISTRY.focus.users_arr.splice(i,1);GLOBAL_REGISTRY.FIRST_REMOVE=true;GLOBAL_REGISTRY.container.root_widget.display();}}}
function DL_GetElementLeft(eElement){if(!eElement&&this){eElement=this;}
var nLeftPos=eElement.offsetLeft;var eParElement=eElement.offsetParent;while(eParElement!=null){nLeftPos+=eParElement.offsetLeft;eParElement=eParElement.offsetParent;}
return nLeftPos;}
function DL_GetElementTop(eElement){if(!eElement&&this){eElement=this;}
var nTopPos=eElement.offsetTop;var eParElement=eElement.offsetParent;while(eParElement!=null){nTopPos+=eParElement.offsetTop;eParElement=eParElement.offsetParent;}
return nTopPos;}
SugarWidgetScheduleRow.prototype.add_freebusy_nodes=function(tr,attendee){var hours=9;var segments=4;var html='';var is_loaded=false;if(typeof GLOBAL_REGISTRY['freebusy_adjusted']!='undefined'&&typeof GLOBAL_REGISTRY['freebusy_adjusted'][this.focus_bean.fields.id]!='undefined'){is_loaded=true;}
for(var i=0;i<this.timeslots.length;i++){var td=document.createElement('td');tr.appendChild(td);td.innerHTML='&nbsp;';if(typeof(this.timeslots[i]['is_start'])!='undefined'){td.className='schedulerSlotCellStartTime';}
if(typeof(this.timeslots[i]['is_end'])!='undefined'){td.className='schedulerSlotCellEndTime';}
if(is_loaded){if(typeof(GLOBAL_REGISTRY['freebusy_adjusted'][this.focus_bean.fields.id][this.timeslots[i].hash])!='undefined'){td.style.backgroundColor="#4D5EAA";if(td.className=='schedulerSlotCellStartTime'){fb_limit=1;if(typeof(GLOBAL_REGISTRY.focus.orig_users_arr_hash)!='undefined'&&typeof(GLOBAL_REGISTRY.focus.orig_users_arr_hash[this.focus_bean.fields.id])!='undefined'){fb_limit=2;}
if(GLOBAL_REGISTRY['freebusy_adjusted'][this.focus_bean.fields.id][this.timeslots[i].hash]>=fb_limit){td.style.backgroundColor="#AA4D4D";}else{td.style.backgroundColor="#4D5EAA";}}}}}}