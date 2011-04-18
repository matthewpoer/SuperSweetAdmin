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
if(typeof(SUGAR)=="undefined")SUGAR={};if(typeof(SUGAR.themes)=="undefined")SUGAR.themes={};SUGAR.sugarHome={};SUGAR.subpanelUtils={};SUGAR.ajaxStatusClass={};SUGAR.tabChooser={};SUGAR.util={};SUGAR.savedViews={};SUGAR.dashlets={};SUGAR.unifiedSearchAdvanced={};SUGAR.searchForm={};SUGAR.language={};SUGAR.Studio={};SUGAR.contextMenu={};SUGAR.config={};var nameIndex=0;var typeIndex=1;var requiredIndex=2;var msgIndex=3;var jstypeIndex=5;var minIndex=10;var maxIndex=11;var altMsgIndex=15;var compareToIndex=7;var arrIndex=12;var operatorIndex=13;var allowblank=8;var validate=new Array();var maxHours=24;var requiredTxt='Missing Required Field:'
var invalidTxt='Invalid Value:'
var secondsSinceLoad=0;var inputsWithErrors=new Array();var tabsWithErrors=new Array();var lastSubmitTime=0;var alertList=new Array();var oldStartsWith='';function isSupportedIE(){var userAgent=navigator.userAgent.toLowerCase();if(userAgent.indexOf("msie")!=-1&&userAgent.indexOf("mac")==-1&&userAgent.indexOf("opera")==-1){var version=navigator.appVersion.match(/MSIE (.\..)/)[1];if(version>=5.5){return true;}else{return false;}}}
SUGAR.isIE=isSupportedIE();var isSafari=(navigator.userAgent.toLowerCase().indexOf('safari')!=-1);RegExp.escape=function(text){if(!arguments.callee.sRE){var specials=['/','.','*','+','?','|','(',')','[',']','{','}','\\'];arguments.callee.sRE=new RegExp('(\\'+specials.join('|\\')+')','g');}
return text.replace(arguments.callee.sRE,'\\$1');}
function addAlert(type,name,subtitle,description,time,redirect){var addIndex=alertList.length;alertList[addIndex]=new Array();alertList[addIndex]['name']=name;alertList[addIndex]['type']=type;alertList[addIndex]['subtitle']=subtitle;alertList[addIndex]['description']=description.replace(/<br>/gi,"\n").replace(/&amp;/gi,'&').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/&#039;/gi,'\'').replace(/&quot;/gi,'"');alertList[addIndex]['time']=time;alertList[addIndex]['done']=0;alertList[addIndex]['redirect']=redirect;}
function checkAlerts(){secondsSinceLoad+=1;var mj=0;var alertmsg='';for(mj=0;mj<alertList.length;mj++){if(alertList[mj]['done']==0){if(alertList[mj]['time']<secondsSinceLoad&&alertList[mj]['time']>-1){alertmsg=alertList[mj]['type']+":"+alertList[mj]['name']+"\n"+alertList[mj]['subtitle']+"\n"+alertList[mj]['description']+"\n\n";alertList[mj]['done']=1;if(alertList[mj]['redirect']==''){alert(alertmsg);}
else if(confirm(alertmsg)){window.location=alertList[mj]['redirect'];}}}}
setTimeout("checkAlerts()",1000);}
function toggleDisplay(id){if(this.document.getElementById(id).style.display=='none'){this.document.getElementById(id).style.display='';if(this.document.getElementById(id+"link")!=undefined){this.document.getElementById(id+"link").style.display='none';}
if(this.document.getElementById(id+"_anchor")!=undefined)
this.document.getElementById(id+"_anchor").innerHTML='[ - ]';}
else{this.document.getElementById(id).style.display='none'
if(this.document.getElementById(id+"link")!=undefined){this.document.getElementById(id+"link").style.display='';}
if(this.document.getElementById(id+"_anchor")!=undefined)
this.document.getElementById(id+"_anchor").innerHTML='[+]';}}
function checkAll(form,field,value){for(i=0;i<form.elements.length;i++){if(form.elements[i].name==field)
form.elements[i].checked=value;}}
function replaceAll(text,src,rep){offset=text.toLowerCase().indexOf(src.toLowerCase());while(offset!=-1){text=text.substring(0,offset)+rep+text.substring(offset+src.length,text.length);offset=text.indexOf(src,offset+rep.length+1);}
return text;}
function addForm(formname){validate[formname]=new Array();}
function addToValidate(formname,name,type,required,msg){if(typeof validate[formname]=='undefined'){addForm(formname);}
validate[formname][validate[formname].length]=new Array(name,type,required,msg);}
function addToValidateRange(formname,name,type,required,msg,min,max){addToValidate(formname,name,type,required,msg);validate[formname][validate[formname].length-1][jstypeIndex]='range'
validate[formname][validate[formname].length-1][minIndex]=min;validate[formname][validate[formname].length-1][maxIndex]=max;}
function addToValidateIsValidDate(formname,name,type,required,msg){addToValidate(formname,name,type,required,msg);validate[formname][validate[formname].length-1][jstypeIndex]='date'}
function addToValidateIsValidTime(formname,name,type,required,msg){addToValidate(formname,name,type,required,msg);validate[formname][validate[formname].length-1][jstypeIndex]='time'}
function addToValidateDateBefore(formname,name,type,required,msg,compareTo){addToValidate(formname,name,type,required,msg);validate[formname][validate[formname].length-1][jstypeIndex]='isbefore'
validate[formname][validate[formname].length-1][compareToIndex]=compareTo;}
function addToValidateDateBeforeAllowBlank(formname,name,type,required,msg,compareTo,allowBlank){addToValidate(formname,name,type,required,msg);validate[formname][validate[formname].length-1][jstypeIndex]='isbefore'
validate[formname][validate[formname].length-1][compareToIndex]=compareTo;validate[formname][validate[formname].length-1][allowblank]=allowBlank;}
function addToValidateBinaryDependency(formname,name,type,required,msg,compareTo){addToValidate(formname,name,type,required,msg);validate[formname][validate[formname].length-1][jstypeIndex]='binarydep';validate[formname][validate[formname].length-1][compareToIndex]=compareTo;}
function addToValidateComparison(formname,name,type,required,msg,compareTo){addToValidate(formname,name,type,required,msg);validate[formname][validate[formname].length-1][jstypeIndex]='comparison';validate[formname][validate[formname].length-1][compareToIndex]=compareTo;}
function addToValidateIsInArray(formname,name,type,required,msg,arr,operator){addToValidate(formname,name,type,required,msg);validate[formname][validate[formname].length-1][jstypeIndex]='in_array';validate[formname][validate[formname].length-1][arrIndex]=arr;validate[formname][validate[formname].length-1][operatorIndex]=operator;}
function addToValidateVerified(formname,name,type,required,msg,arr,operator){addToValidate(formname,name,type,required,msg);validate[formname][validate[formname].length-1][jstypeIndex]='verified';}
function addToValidateLessThan(formname,name,type,required,msg,max,max_field_msg){addToValidate(formname,name,type,required,msg);validate[formname][validate[formname].length-1][jstypeIndex]='less';validate[formname][validate[formname].length-1][maxIndex]=max;validate[formname][validate[formname].length-1][altMsgIndex]=max_field_msg;}
function addToValidateMoreThan(formname,name,type,required,msg,min){addToValidate(formname,name,type,required,msg);validate[formname][validate[formname].length-1][jstypeIndex]='more';validate[formname][validate[formname].length-1][minIndex]=min;}
function removeFromValidate(formname,name){for(i=0;i<validate[formname].length;i++)
{if(validate[formname][i][nameIndex]==name)
{validate[formname].splice(i--,1);}}}
function checkValidate(formname,name){if(validate[formname]){for(i=0;i<validate[formname].length;i++){if(validate[formname][i][nameIndex]==name){return true;}}}
return false;}
var formsWithFieldLogic=null;var formWithPrecision=null;function addToValidateFieldLogic(formId,minFieldId,maxFieldId,defaultFieldId,lenFieldId,type,msg){this.formId=document.getElementById(formId);this.min=document.getElementById(minFieldId);this.max=document.getElementById(maxFieldId);this._default=document.getElementById(defaultFieldId);this.len=document.getElementById(lenFieldId);this.msg=msg;this.type=type;}
function addToValidatePrecision(formId,valueId,precisionId){this.form=document.getElementById(formId);this.float=document.getElementById(valueId);this.precision=document.getElementById(precisionId);}
function isValidPrecision(value,precision){value=trim(value.toString());if(precision=='')
return true;if(value=='')
return true;if((precision=="0")){if(value.indexOf(".")==-1){return true;}else{return false;}}
var actualPrecision=value.substr(value.indexOf(".")+1,value.length).length;return actualPrecision==precision;}
function toDecimal(original,precision){precision=(precision==null)?2:precision;num=Math.pow(10,precision);temp=Math.round(original*num)/num;if((temp*100)%100==0)
return temp+'.00';if((temp*10)%10==0)
return temp+'0';return temp}
function isInteger(s){if(typeof s=="string"&&s=="")
return true;if(typeof num_grp_sep!='undefined'&&typeof dec_sep!='undefined')
{s=unformatNumberNoParse(s,num_grp_sep,dec_sep).toString();}
return parseFloat(s)==parseInt(s)&&!isNaN(s);}
function isNumeric(s){if(!/^-*[0-9\.]+$/.test(s)){return false}
else{return true;}}
var date_reg_positions={'Y':1,'m':2,'d':3};var date_reg_format='([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})'
function isDate(dtStr){if(dtStr.length==0){return true;}
myregexp=new RegExp(date_reg_format)
if(!myregexp.test(dtStr))
return false
m='';d='';y='';var dateParts=dtStr.match(date_reg_format);for(key in date_reg_positions){index=date_reg_positions[key];if(key=='m'){m=dateParts[index];}else if(key=='d'){d=dateParts[index];}else{y=dateParts[index];}}
var dd=new Date(y,m,0);if(y<1)
return false;if(m>12||m<1)
return false;if(d<1||d>dd.getDate())
return false;return true;}
function getDateObject(dtStr){if(dtStr.length==0){return true;}
myregexp=new RegExp(date_reg_format)
if(myregexp.exec(dtStr))var dt=myregexp.exec(dtStr)
else return false;var yr=dt[date_reg_positions['Y']];var mh=dt[date_reg_positions['m']];var dy=dt[date_reg_positions['d']];var dtar=dtStr.split(' ');if(typeof(dtar[1])!='undefined'&&isTime(dtar[1])){var t1=dtar[1].replace(/am/i,' AM');var t1=t1.replace(/pm/i,' PM');t1=t1.replace(/\./,':');date1=new Date(Date.parse(mh+'/'+dy+'/'+yr+' '+t1));}
else
{var date1=new Date();date1.setFullYear(yr);date1.setMonth(mh-1);date1.setDate(dy);}
return date1;}
function isBefore(value1,value2){var d1=getDateObject(value1);var d2=getDateObject(value2);if(typeof(d2)=='boolean'){return true;}
return d2>=d1;}
function isValidEmail(emailStr){if(emailStr.length==0){return true;}
var lastChar=emailStr.charAt(emailStr.length-1);if(!lastChar.match(/[^\.]/i)){return false;}
var firstLocalChar=emailStr.charAt(0);if(firstLocalChar.match(/\./)){return false;}
var pos=emailStr.lastIndexOf("@");var localPart=emailStr.substr(0,pos);var lastLocalChar=localPart.charAt(localPart.length-1);if(lastLocalChar.match(/\./)){return false;}
var reg=/@.*?;/g;while((results=reg.exec(emailStr))!=null){orignial=results[0];parsedResult=results[0].replace(';','::;::');emailStr=emailStr.replace(orignial,parsedResult);}
reg=/@.*?,/g;while((results=reg.exec(emailStr))!=null){orignial=results[0];var check=results[0].substr(1);if(check.indexOf('@')!=-1){parsedResult=results[0].replace(',','::;::');emailStr=emailStr.replace(orignial,parsedResult);}}
var emailArr=emailStr.split(/::;::/);for(var i=0;i<emailArr.length;i++){emailAddress=emailArr[i];if(trim(emailAddress)!=''){if(!/^\s*[\w.%+\-&'#!\$\*=\?\^_`\{\}~\/]+@([A-Z0-9-]+\.)*[A-Z0-9-]+\.[\w-]{2,}\s*$/i.test(emailAddress)&&!/^.*<[A-Z0-9._%+\-&'#!\$\*=\?\^_`\{\}~]+?@([A-Z0-9-]+\.)*[A-Z0-9-]+\.[\w-]{2,}>\s*$/i.test(emailAddress)){return false;}}}
return true;}
function isValidPhone(phoneStr){if(phoneStr.length==0){return true;}
if(!/^[0-9\-\(\)\s]+$/.test(phoneStr))
return false
return true}
function isFloat(floatStr){if(floatStr.length==0){return true;}
if(!(typeof(num_grp_sep)=='undefined'||typeof(dec_sep)=='undefined')){floatStr=unformatNumberNoParse(floatStr,num_grp_sep,dec_sep).toString();}
return/^(-)?[0-9\.]+$/.test(floatStr);}
function isDBName(str){if(str.length==0){return true;}
if(!/^[a-zA-Z][a-zA-Z\_0-9]*$/.test(str))
return false
return true}
var time_reg_format="[0-9]{1,2}\:[0-9]{2}";function isTime(timeStr){time_reg_format=time_reg_format.replace('([ap]m)','');time_reg_format=time_reg_format.replace('([AP]M)','');if(timeStr.length==0){return true;}
myregexp=new RegExp(time_reg_format)
if(!myregexp.test(timeStr))
return false
return true}
function inRange(value,min,max){if(typeof num_grp_sep!='undefined'&&typeof dec_sep!='undefined')
value=unformatNumberNoParse(value,num_grp_sep,dec_sep).toString();return value>=min&&value<=max;}
function bothExist(item1,item2){if(typeof item1=='undefined'){return false;}
if(typeof item2=='undefined'){return false;}
if((item1==''&&item2!='')||(item1!=''&&item2=='')){return false;}
return true;}
trim=YAHOO.lang.trim;function check_form(formname){if(typeof(siw)!='undefined'&&siw&&typeof(siw.selectingSomething)!='undefined'&&siw.selectingSomething)
return false;return validate_form(formname,'');}
function add_error_style(formname,input,txt,flash){if(typeof flash=="undefined")
flash=true;try{inputHandle=typeof input=="object"?input:document.forms[formname][input];style=get_current_bgcolor(inputHandle);if(txt.substring(txt.length-1)==':')
txt=txt.substring(0,txt.length-1)
requiredTxt=SUGAR.language.get('app_strings','ERR_MISSING_REQUIRED_FIELDS');invalidTxt=SUGAR.language.get('app_strings','ERR_INVALID_VALUE');nomatchTxt=SUGAR.language.get('app_strings','ERR_SQS_NO_MATCH_FIELD');matchTxt=txt.replace(requiredTxt,'').replace(invalidTxt,'').replace(nomatchTxt,'');if(inputHandle.parentNode.innerHTML.search(matchTxt)==-1){errorTextNode=document.createElement('span');errorTextNode.className='required';errorTextNode.innerHTML='<br />'+txt;if(inputHandle.parentNode.className.indexOf('x-form-field-wrap')!=-1){inputHandle.parentNode.parentNode.appendChild(errorTextNode);}
else{inputHandle.parentNode.appendChild(errorTextNode);}
if(flash)
inputHandle.style.backgroundColor="#FF0000";inputsWithErrors.push(inputHandle);}
if(flash)
{if(inputsWithErrors.length==1){for(wp=1;wp<=10;wp++){window.setTimeout('fade_error_style(style, '+wp*10+')',1000+(wp*50));}}
if(typeof(window[formname+"_tabs"])!="undefined"){var tabView=window[formname+"_tabs"];var parentDiv=YAHOO.util.Dom.getAncestorByTagName(inputHandle,"div");if(tabView.get){var tabs=tabView.get("tabs");for(var i in tabs){if(tabs[i].get("contentEl")==parentDiv||YAHOO.util.Dom.isAncestor(tabs[i].get("contentEl"),inputHandle))
{tabs[i].get("labelEl").style.color="red";if(inputsWithErrors.length==1)
tabView.selectTab(i);}}}}
window.setTimeout("inputsWithErrors["+(inputsWithErrors.length-1)+"].style.backgroundColor = null;",2000);}}catch(e){}}
function clear_all_errors(){for(var wp=0;wp<inputsWithErrors.length;wp++){if(typeof(inputsWithErrors[wp])!='undefined'&&typeof inputsWithErrors[wp].parentNode!='undefined'&&inputsWithErrors[wp].parentNode!=null){if(inputsWithErrors[wp].parentNode.className.indexOf('x-form-field-wrap')!=-1)
{inputsWithErrors[wp].parentNode.parentNode.removeChild(inputsWithErrors[wp].parentNode.parentNode.lastChild);}
else
{inputsWithErrors[wp].parentNode.removeChild(inputsWithErrors[wp].parentNode.lastChild);}}}
if(inputsWithErrors.length==0)return;if(YAHOO.util.Dom.getAncestorByTagName(inputsWithErrors[0],"form")){var formname=YAHOO.util.Dom.getAncestorByTagName(inputsWithErrors[0],"form").getAttribute("name");if(typeof(window[formname+"_tabs"])!="undefined"){var tabView=window[formname+"_tabs"];if(tabView.get){var tabs=tabView.get("tabs");for(var i in tabs){tabs[i].get("labelEl").style.color="";}}}
inputsWithErrors=new Array();}}
function get_current_bgcolor(input){if(input.currentStyle){style=input.currentStyle.backgroundColor;return style.substring(1,7);}
else{style='';styleRGB=document.defaultView.getComputedStyle(input,'').getPropertyValue("background-color");comma=styleRGB.indexOf(',');style+=dec2hex(styleRGB.substring(4,comma));commaPrevious=comma;comma=styleRGB.indexOf(',',commaPrevious+1);style+=dec2hex(styleRGB.substring(commaPrevious+2,comma));style+=dec2hex(styleRGB.substring(comma+2,styleRGB.lastIndexOf(')')));return style;}}
function hex2dec(hex){return(parseInt(hex,16));}
var hexDigit=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");function dec2hex(dec){return(hexDigit[dec>>4]+hexDigit[dec&15]);}
function fade_error_style(normalStyle,percent){errorStyle='c60c30';var r1=hex2dec(errorStyle.slice(0,2));var g1=hex2dec(errorStyle.slice(2,4));var b1=hex2dec(errorStyle.slice(4,6));var r2=hex2dec(normalStyle.slice(0,2));var g2=hex2dec(normalStyle.slice(2,4));var b2=hex2dec(normalStyle.slice(4,6));var pc=percent/100;r=Math.floor(r1+(pc*(r2-r1))+.5);g=Math.floor(g1+(pc*(g2-g1))+.5);b=Math.floor(b1+(pc*(b2-b1))+.5);for(var wp=0;wp<inputsWithErrors.length;wp++){inputsWithErrors[wp].style.backgroundColor="#"+dec2hex(r)+dec2hex(g)+dec2hex(b);}}
function isFieldTypeExceptFromEmptyCheck(fieldType)
{var results=false;var exemptList=['bool','file'];for(var i=0;i<exemptList.length;i++)
{if(fieldType==exemptList[i])
return true;}
return results;}
function validate_form(formname,startsWith){requiredTxt=SUGAR.language.get('app_strings','ERR_MISSING_REQUIRED_FIELDS');invalidTxt=SUGAR.language.get('app_strings','ERR_INVALID_VALUE');if(typeof(formname)=='undefined')
{return false;}
if(typeof(validate[formname])=='undefined')
{disableOnUnloadEditView(document.forms[formname]);return true;}
var form=document.forms[formname];var isError=false;var errorMsg="";var _date=new Date();if(_date.getTime()<(lastSubmitTime+2000)&&startsWith==oldStartsWith){return false;}
lastSubmitTime=_date.getTime();oldStartsWith=startsWith;clear_all_errors();inputsWithErrors=new Array();for(var i=0;i<validate[formname].length;i++){if(validate[formname][i][nameIndex].indexOf(startsWith)==0){if(typeof form[validate[formname][i][nameIndex]]!='undefined'){var bail=false;if(!validate[formname][i][requiredIndex]&&trim(form[validate[formname][i][nameIndex]].value)==''&&(typeof(validate[formname][i][jstypeIndex])!='undefined'&&validate[formname][i][jstypeIndex]!='binarydep'))
{continue;}
if(validate[formname][i][requiredIndex]&&!isFieldTypeExceptFromEmptyCheck(validate[formname][i][typeIndex])){if(typeof form[validate[formname][i][nameIndex]]=='undefined'||trim(form[validate[formname][i][nameIndex]].value)==""){add_error_style(formname,validate[formname][i][nameIndex],requiredTxt+' '+validate[formname][i][msgIndex]);isError=true;}}
if(!bail){switch(validate[formname][i][typeIndex]){case'email':if(!isValidEmail(trim(form[validate[formname][i][nameIndex]].value))){isError=true;add_error_style(formname,validate[formname][i][nameIndex],invalidTxt+" "+validate[formname][i][msgIndex]);}
break;case'time':if(!isTime(trim(form[validate[formname][i][nameIndex]].value))){isError=true;add_error_style(formname,validate[formname][i][nameIndex],invalidTxt+" "+validate[formname][i][msgIndex]);}break;case'date':if(!isDate(trim(form[validate[formname][i][nameIndex]].value))){isError=true;add_error_style(formname,validate[formname][i][nameIndex],invalidTxt+" "+validate[formname][i][msgIndex]);}break;case'alpha':break;case'DBName':if(!isDBName(trim(form[validate[formname][i][nameIndex]].value))){isError=true;add_error_style(formname,validate[formname][i][nameIndex],invalidTxt+" "+validate[formname][i][msgIndex]);}
break;case'alphanumeric':break;case'file':if(validate[formname][i][requiredIndex]&&typeof(form[validate[formname][i][nameIndex]+'_file'])!='undefined'&&trim(form[validate[formname][i][nameIndex]+'_file'].value)==""&&!form[validate[formname][i][nameIndex]+'_file'].disabled){isError=true;add_error_style(formname,validate[formname][i][nameIndex],requiredTxt+" "+validate[formname][i][msgIndex]);}
break;case'int':if(!isInteger(trim(form[validate[formname][i][nameIndex]].value))){isError=true;add_error_style(formname,validate[formname][i][nameIndex],invalidTxt+" "+validate[formname][i][msgIndex]);}
break;case'currency':case'float':if(!isFloat(trim(form[validate[formname][i][nameIndex]].value))){isError=true;add_error_style(formname,validate[formname][i][nameIndex],invalidTxt+" "+validate[formname][i][msgIndex]);}
break;case'teamset_mass':div_element_id=formname+'_'+form[validate[formname][i][nameIndex]].name+'_operation_div';input_elements=YAHOO.util.Selector.query('input',document.getElementById(div_element_id));primary_field_id='';validation_passed=false;replace_selected=false;for(t in input_elements){if(input_elements[t].type&&input_elements[t].type=='radio'&&input_elements[t].checked==true&&input_elements[t].value=='replace'){radio_elements=YAHOO.util.Selector.query('input[type=radio]',document.getElementById(formname+'_team_name_table'));for(x in radio_elements){if(radio_elements[x].name!='team_name_type'){primary_field_id='team_name_collection_'+radio_elements[x].value;if(radio_elements[x].checked){replace_selected=true;if(trim(document.forms[formname].elements[primary_field_id].value)!=''){validation_passed=true;break;}}else if(trim(document.forms[formname].elements[primary_field_id].value)!=''){replace_selected=true;}}}}}
if(replace_selected&&!validation_passed){add_error_style(formname,primary_field_id,SUGAR.language.get('app_strings','ERR_NO_PRIMARY_TEAM_SPECIFIED'));isError=true;}
break;case'teamset':table_element_id=formname+'_'+form[validate[formname][i][nameIndex]].name+'_table';if(document.getElementById(table_element_id)){input_elements=YAHOO.util.Selector.query('input[type=radio]',document.getElementById(table_element_id));has_primary=false;primary_field_id=form[validate[formname][i][nameIndex]].name+'_collection_0';for(t in input_elements){primary_field_id=form[validate[formname][i][nameIndex]].name+'_collection_'+input_elements[t].value;if(input_elements[t].type&&input_elements[t].type=='radio'&&input_elements[t].checked==true){if(document.forms[formname].elements[primary_field_id].value!=''){has_primary=true;}
break;}}
if(!has_primary){isError=true;field_id=form[validate[formname][i][nameIndex]].name+'_collection_'+input_elements[0].value;add_error_style(formname,field_id,SUGAR.language.get('app_strings','ERR_NO_PRIMARY_TEAM_SPECIFIED'));}}
break;case'error':isError=true;add_error_style(formname,validate[formname][i][nameIndex],validate[formname][i][msgIndex]);break;}
if(typeof validate[formname][i][jstypeIndex]!='undefined'){switch(validate[formname][i][jstypeIndex]){case'range':if(!inRange(trim(form[validate[formname][i][nameIndex]].value),validate[formname][i][minIndex],validate[formname][i][maxIndex])){isError=true;var lbl_validate_range=SUGAR.language.get('app_strings','LBL_VALIDATE_RANGE');add_error_style(formname,validate[formname][i][nameIndex],validate[formname][i][msgIndex]+" value "+form[validate[formname][i][nameIndex]].value+" "+lbl_validate_range+" ("+validate[formname][i][minIndex]+" - "+validate[formname][i][maxIndex]+") ");}
break;case'isbefore':compareTo=form[validate[formname][i][compareToIndex]];if(typeof compareTo!='undefined'){if(trim(compareTo.value)!=''||(validate[formname][i][allowblank]!='true')){date2=trim(compareTo.value);date1=trim(form[validate[formname][i][nameIndex]].value);if(trim(date1).length!=0&&!isBefore(date1,date2)){isError=true;add_error_style(formname,validate[formname][i][nameIndex],validate[formname][i][msgIndex]+"("+date1+") "+SUGAR.language.get('app_strings','MSG_IS_NOT_BEFORE')+' '+date2);}}}
break;case'less':value=unformatNumber(trim(form[validate[formname][i][nameIndex]].value),num_grp_sep,dec_sep);maximum=parseFloat(validate[formname][i][maxIndex]);if(typeof maximum!='undefined'){if(value>maximum){isError=true;add_error_style(formname,validate[formname][i][nameIndex],validate[formname][i][msgIndex]+" "+SUGAR.language.get('app_strings','MSG_IS_MORE_THAN')+' '+validate[formname][i][altMsgIndex]);}}
break;case'more':value=unformatNumber(trim(form[validate[formname][i][nameIndex]].value),num_grp_sep,dec_sep);minimum=parseFloat(validate[formname][i][minIndex]);if(typeof minimum!='undefined'){if(value<minimum){isError=true;add_error_style(formname,validate[formname][i][nameIndex],validate[formname][i][msgIndex]+" "+SUGAR.language.get('app_strings','MSG_SHOULD_BE')+' '+minimum+' '+SUGAR.language.get('app_strings','MSG_OR_GREATER'));}}
break;case'binarydep':compareTo=form[validate[formname][i][compareToIndex]];if(typeof compareTo!='undefined'){item1=trim(form[validate[formname][i][nameIndex]].value);item2=trim(compareTo.value);if(!bothExist(item1,item2)){isError=true;add_error_style(formname,validate[formname][i][nameIndex],validate[formname][i][msgIndex]);}}
break;case'comparison':compareTo=form[validate[formname][i][compareToIndex]];if(typeof compareTo!='undefined'){item1=trim(form[validate[formname][i][nameIndex]].value);item2=trim(compareTo.value);if(!bothExist(item1,item2)||item1!=item2){isError=true;add_error_style(formname,validate[formname][i][nameIndex],validate[formname][i][msgIndex]);}}
break;case'in_array':arr=eval(validate[formname][i][arrIndex]);operator=validate[formname][i][operatorIndex];item1=trim(form[validate[formname][i][nameIndex]].value);if(operator.charAt(0)=='u'){item1=item1.toUpperCase();operator=operator.substring(1);}else if(operator.charAt(0)=='l'){item1=item1.toLowerCase();operator=operator.substring(1);}
for(j=0;j<arr.length;j++){val=arr[j];if((operator=="=="&&val==item1)||(operator=="!="&&val!=item1)){isError=true;add_error_style(formname,validate[formname][i][nameIndex],invalidTxt+" "+validate[formname][i][msgIndex]);}}
break;case'verified':if(trim(form[validate[formname][i][nameIndex]].value)=='false'){isError=true;}
break;}}}}}}
if(formsWithFieldLogic){var invalidLogic=false;if(formsWithFieldLogic.min&&formsWithFieldLogic.max&&formsWithFieldLogic._default){var showErrorsOn={min:{value:'min',show:false,obj:formsWithFieldLogic.min.value},max:{value:'max',show:false,obj:formsWithFieldLogic.max.value},_default:{value:'default',show:false,obj:formsWithFieldLogic._default.value},len:{value:'len',show:false,obj:parseInt(formsWithFieldLogic.len.value,10)}};var min=(formsWithFieldLogic.min.value!='')?parseFloat(formsWithFieldLogic.min.value):'undef';var max=(formsWithFieldLogic.max.value!='')?parseFloat(formsWithFieldLogic.max.value):'undef';var _default=(formsWithFieldLogic._default.value!='')?parseFloat(formsWithFieldLogic._default.value):'undef';for(var i in showErrorsOn){if(showErrorsOn[i].value!='len'&&showErrorsOn[i].obj.length>showErrorsOn.len.obj){invalidLogic=true;showErrorsOn[i].show=true;showErrorsOn.len.show=true;}}
if(min!='undef'&&max!='undef'&&_default!='undef'){if(!inRange(_default,min,max)){invalidLogic=true;showErrorsOn.min.show=true;showErrorsOn.max.show=true;showErrorsOn._default.show=true;}}
if(min!='undef'&&max!='undef'&&min>max){invalidLogic=true;showErrorsOn.min.show=true;showErrorsOn.max.show=true;}
if(min!='undef'&&_default!='undef'&&_default<min){invalidLogic=true;showErrorsOn.min.show=true;showErrorsOn._default.show=true;}
if(max!='undef'&&_default!='undef'&&_default>max){invalidLogic=true;showErrorsOn.max.show=true;showErrorsOn._default.show=true;}
if(invalidLogic){isError=true;for(var error in showErrorsOn)
if(showErrorsOn[error].show)
add_error_style(formname,showErrorsOn[error].value,formsWithFieldLogic.msg);}
else if(!isError)
formsWithFieldLogic=null;}}
if(formWithPrecision){if(!isValidPrecision(formWithPrecision.float.value,formWithPrecision.precision.value)){isError=true;add_error_style(formname,'default',SUGAR.language.get('app_strings','ERR_COMPATIBLE_PRECISION_VALUE'));}else if(!isError){isError=false;}}
if(isError==true){var nw,ne,sw,se;if(self.pageYOffset)
{nwX=self.pageXOffset;seX=self.innerWidth;nwY=self.pageYOffset;seY=self.innerHeight;}
else if(document.documentElement&&document.documentElement.scrollTop)
{nwX=document.documentElement.scrollLeft;seX=document.documentElement.clientWidth;nwY=document.documentElement.scrollTop;seY=document.documentElement.clientHeight;}
else if(document.body)
{nwX=document.body.scrollLeft;seX=document.body.clientWidth;nwY=document.body.scrollTop;seY=document.body.clientHeight;}
var inView=true;for(var wp=0;wp<inputsWithErrors.length;wp++){var elementCoor=findElementPos(inputsWithErrors[wp]);if(!(elementCoor.x>=nwX&&elementCoor.y>=nwY&&elementCoor.x<=seX&&elementCoor.y<=seY)){inView=false;scrollToTop=elementCoor.y-75;scrollToLeft=elementCoor.x-75;}
else{break;}}
if(!inView)window.scrollTo(scrollToLeft,scrollToTop);return false;}
disableOnUnloadEditView(form);return true;}
var marked_row=new Array;function setPointer(theRow,theRowNum,theAction,theDefaultColor,thePointerColor,theMarkColor){var theCells=null;if((thePointerColor==''&&theMarkColor=='')||typeof(theRow.style)=='undefined'){return false;}
if(typeof(document.getElementsByTagName)!='undefined'){theCells=theRow.getElementsByTagName('td');}
else if(typeof(theRow.cells)!='undefined'){theCells=theRow.cells;}
else{return false;}
var rowCellsCnt=theCells.length;var domDetect=null;var currentColor=null;var newColor=null;if(typeof(window.opera)=='undefined'&&typeof(theCells[0].getAttribute)!='undefined'){currentColor=theCells[0].getAttribute('bgcolor');domDetect=true;}
else{currentColor=theCells[0].style.backgroundColor;domDetect=false;}
if(currentColor==''||(currentColor!=null&&(currentColor.toLowerCase()==theDefaultColor.toLowerCase()))){if(theAction=='over'&&thePointerColor!=''){newColor=thePointerColor;}
else if(theAction=='click'&&theMarkColor!=''){newColor=theMarkColor;marked_row[theRowNum]=true;}}
else if(currentColor!=null&&(currentColor.toLowerCase()==thePointerColor.toLowerCase())&&(typeof(marked_row[theRowNum])=='undefined'||!marked_row[theRowNum])){if(theAction=='out'){newColor=theDefaultColor;}
else if(theAction=='click'&&theMarkColor!=''){newColor=theMarkColor;marked_row[theRowNum]=true;}}
else if(currentColor!=null&&(currentColor.toLowerCase()==theMarkColor.toLowerCase())){if(theAction=='click'){newColor=(thePointerColor!='')?thePointerColor:theDefaultColor;marked_row[theRowNum]=(typeof(marked_row[theRowNum])=='undefined'||!marked_row[theRowNum])?true:null;}}
if(newColor){var c=null;if(domDetect){for(c=0;c<rowCellsCnt;c++){theCells[c].setAttribute('bgcolor',newColor,0);}}
else{for(c=0;c<rowCellsCnt;c++){theCells[c].style.backgroundColor=newColor;}}}
return true;}
function goToUrl(selObj,goToLocation){eval("document.location.href = '"+goToLocation+"pos="+selObj.options[selObj.selectedIndex].value+"'");}
var json_objects=new Object();function getXMLHTTPinstance(){var xmlhttp=false;var userAgent=navigator.userAgent.toLowerCase();if(userAgent.indexOf("msie")!=-1&&userAgent.indexOf("mac")==-1&&userAgent.indexOf("opera")==-1){var version=navigator.appVersion.match(/MSIE (.\..)/)[1];if(version>=5.5){try{xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");}
catch(e){try{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
catch(E){xmlhttp=false;}}}}
if(!xmlhttp&&typeof XMLHttpRequest!='undefined'){xmlhttp=new XMLHttpRequest();}
return xmlhttp;}
var global_xmlhttp=getXMLHTTPinstance();function http_fetch_sync(url,post_data){global_xmlhttp=getXMLHTTPinstance();var method='GET';if(typeof(post_data)!='undefined')method='POST';try{global_xmlhttp.open(method,url,false);}
catch(e){alert('message:'+e.message+":url:"+url);}
if(method=='POST'){global_xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');}
global_xmlhttp.send(post_data);if(SUGAR.util.isLoginPage(global_xmlhttp.responseText))
return false;var args={"responseText":global_xmlhttp.responseText,"responseXML":global_xmlhttp.responseXML,"request_id":typeof(request_id)!="undefined"?request_id:0};return args;}
function http_fetch_async(url,callback,request_id,post_data){var method='GET';if(typeof(post_data)!='undefined'){method='POST';}
try{global_xmlhttp.open(method,url,true);}
catch(e){alert('message:'+e.message+":url:"+url);}
if(method=='POST'){global_xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');}
global_xmlhttp.onreadystatechange=function(){if(global_xmlhttp.readyState==4){if(global_xmlhttp.status==200){if(SUGAR.util.isLoginPage(global_xmlhttp.responseText))
return false;var args={"responseText":global_xmlhttp.responseText,"responseXML":global_xmlhttp.responseXML,"request_id":request_id};callback.call(document,args);}
else{alert("There was a problem retrieving the XML data:\n"+global_xmlhttp.statusText);}}}
global_xmlhttp.send(post_data);}
function call_json_method(module,action,vars,variable_name,callback){global_xmlhttp.open("GET","index.php?entryPoint=json&module="+module+"&action="+action+"&"+vars,true);global_xmlhttp.onreadystatechange=function(){if(global_xmlhttp.readyState==4){if(global_xmlhttp.status==200){json_objects[variable_name]=JSON.parse(global_xmlhttp.responseText);var respText=JSON.parseNoSecurity(global_xmlhttp.responseText);var args={responseText:respText,responseXML:global_xmlhttp.responseXML};callback.call(document,args);}
else{alert("There was a problem retrieving the XML data:\n"+global_xmlhttp.statusText);}}}
global_xmlhttp.send(null);}
function insert_at_cursor(field,value){if(document.selection){field.focus();sel=document.selection.createRange();sel.text=value;}
else if(field.selectionStart||field.selectionStart=='0'){var start_pos=field.selectionStart;var end_pos=field.selectionEnd;field.value=field.value.substring(0,start_pos)+value+field.value.substring(end_pos,field.value.length);}
else{field.value+=value;}}
function checkParentType(type,button){if(button==null){return;}
if(typeof disabledModules!='undefined'&&typeof(disabledModules[type])!='undefined'){button.disabled='disabled';}
else{button.disabled=false;}}
function parseDate(input,format){date=input.value;format=format.replace(/%/g,'');sep=format.charAt(1);yAt=format.indexOf('Y')
if(date.match(/^\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}$/)&&yAt==4){if(date.match(/^\d{1}[\/-].*$/))date='0'+date;if(date.match(/^\d{2}[\/-]\d{1}[\/-].*$/))date=date.substring(0,3)+'0'+date.substring(3,date.length);if(date.match(/^\d{2}[\/-]\d{2}[\/-]\d{2}$/))date=date.substring(0,6)+'20'+date.substring(6,date.length);}
else if(date.match(/^\d{2,4}[\/-]\d{1,2}[\/-]\d{1,2}$/)){if(date.match(/^\d{2}[\/-].*$/))date='20'+date;if(date.match(/^\d{4}[\/-]\d{1}[\/-].*$/))date=date.substring(0,5)+'0'+date.substring(5,date.length);if(date.match(/^\d{4}[\/-]\d{2}[\/-]\d{1}$/))date=date.substring(0,8)+'0'+date.substring(8,date.length);}
else if(date.match(/^\d{4,8}$/)){digits=0;if(date.match(/^\d{8}$/))digits=8;else if(date.match(/\d{6}/))digits=6;else if(date.match(/\d{4}/))digits=4;else if(date.match(/\d{5}/))digits=5;switch(yAt){case 0:switch(digits){case 4:date='20'+date.substring(0,2)+sep+'0'+date.substring(2,3)+sep+'0'+date.substring(3,4);break;case 5:date='20'+date.substring(0,2)+sep+date.substring(2,4)+sep+'0'+date.substring(4,5);break;case 6:date='20'+date.substring(0,2)+sep+date.substring(2,4)+sep+date.substring(4,6);break;case 8:date=date.substring(0,4)+sep+date.substring(4,6)+sep+date.substring(6,8);break;}
break;case 2:switch(digits){case 4:date='0'+date.substring(0,1)+sep+'20'+date.substring(1,3)+sep+'0'+date.substring(3,4);break;case 5:date=date.substring(0,2)+sep+'20'+date.substring(2,4)+sep+'0'+date.substring(4,5);break;case 6:date=date.substring(0,2)+sep+'20'+date.substring(2,4)+sep+date.substring(4,6);break;case 8:date=date.substring(0,2)+sep+date.substring(2,6)+sep+date.substring(6,8);break;}
case 4:switch(digits){case 4:date='0'+date.substring(0,1)+sep+'0'+date.substring(1,2)+sep+'20'+date.substring(2,4);break;case 5:date='0'+date.substring(0,1)+sep+date.substring(1,3)+sep+'20'+date.substring(3,5);break;case 6:date=date.substring(0,2)+sep+date.substring(2,4)+sep+'20'+date.substring(4,6);break;case 8:date=date.substring(0,2)+sep+date.substring(2,4)+sep+date.substring(4,8);break;}
break;}}
date=date.replace(/[\/-]/g,sep);input.value=date;}
function findElementPos(obj){var x=0;var y=0;if(obj.offsetParent){while(obj.offsetParent){x+=obj.offsetLeft;y+=obj.offsetTop;obj=obj.offsetParent;}}
else if(obj.x&&obj.y){y+=obj.y
x+=obj.x}
return new coordinate(x,y);}
function getClientDim(){var nwX,nwY,seX,seY;if(self.pageYOffset)
{nwX=self.pageXOffset;seX=self.innerWidth+nwX;nwY=self.pageYOffset;seY=self.innerHeight+nwY;}
else if(document.documentElement&&document.documentElement.scrollTop)
{nwX=document.documentElement.scrollLeft;seX=document.documentElement.clientWidth+nwX;nwY=document.documentElement.scrollTop;seY=document.documentElement.clientHeight+nwY;}
else if(document.body)
{nwX=document.body.scrollLeft;seX=document.body.clientWidth+nwX;nwY=document.body.scrollTop;seY=document.body.clientHeight+nwY;}
return{'nw':new coordinate(nwX,nwY),'se':new coordinate(seX,seY)};}
function freezeEvent(e){if(e){if(e.preventDefault)e.preventDefault();e.returnValue=false;e.cancelBubble=true;if(e.stopPropagation)e.stopPropagation();return false;}}
function coordinate(_x,_y){var x=_x;var y=_y;this.add=add;this.sub=sub;this.x=x;this.y=y;function add(rh){return new position(this.x+rh.x,this.y+rh.y);}
function sub(rh){return new position(this.x+rh.x,this.y+rh.y);}}
function sendAndRetrieve(theForm,theDiv,loadingStr){function success(data){document.getElementById(theDiv).innerHTML=data.responseText;ajaxStatus.hideStatus();}
if(typeof loadingStr=='undefined')SUGAR.language.get('app_strings','LBL_LOADING');ajaxStatus.showStatus(loadingStr);YAHOO.util.Connect.setForm(theForm);var cObj=YAHOO.util.Connect.asyncRequest('POST','index.php',{success:success,failure:success});return false;}
function sendAndRedirect(theForm,loadingStr,redirect_location){function success(data){if(redirect_location){location.href=redirect_location;}
ajaxStatus.hideStatus();}
if(typeof loadingStr=='undefined')SUGAR.language.get('app_strings','LBL_LOADING');ajaxStatus.showStatus(loadingStr);YAHOO.util.Connect.setForm(theForm);var cObj=YAHOO.util.Connect.asyncRequest('POST','index.php',{success:success,failure:success});return false;}
function saveForm(theForm,theDiv,loadingStr){if(check_form(theForm)){for(i=0;i<ajaxFormArray.length;i++){if(ajaxFormArray[i]==theForm){ajaxFormArray.splice(i,1);}}
return sendAndRetrieve(theForm,loadingStr,theDiv);}
else
return false;}
function snapshotForm(theForm){var snapshotTxt='';var elemList=theForm.elements;var elem;var elemType;for(var i=0;i<elemList.length;i++){elem=elemList[i];if(typeof(elem.type)=='undefined'){continue;}
elemType=elem.type.toLowerCase();snapshotTxt=snapshotTxt+elem.name;if(elemType=='text'||elemType=='textarea'||elemType=='password'){snapshotTxt=snapshotTxt+elem.value;}
else if(elemType=='select'||elemType=='select-one'||elemType=='select-multiple'){var optionList=elem.options;for(var ii=0;ii<optionList.length;ii++){if(optionList[ii].selected){snapshotTxt=snapshotTxt+optionList[ii].value;}}}
else if(elemType=='radio'||elemType=='checkbox'){if(elem.selected){snapshotTxt=snapshotTxt+'checked';}}
else if(elemType=='hidden'){snapshotTxt=snapshotTxt+elem.value;}}
return snapshotTxt;}
function initEditView(theForm){if(SUGAR.util.ajaxCallInProgress()){window.setTimeout(function(){initEditView(theForm);},100);return;}
if(theForm.id=='popup_query_form'){return;}
if(typeof editViewSnapshots=='undefined'){editViewSnapshots=new Object();}
if(typeof SUGAR.loadedForms=='undefined'){SUGAR.loadedForms=new Object();}
if(theForm==null||theForm.id==null){return;}
editViewSnapshots[theForm.id]=snapshotForm(theForm);SUGAR.loadedForms[theForm.id]=true;}
function onUnloadEditView(theForm){var dataHasChanged=false;if(typeof editViewSnapshots=='undefined'){return;}
if(typeof theForm=='undefined'){for(var idx in editViewSnapshots){theForm=document.getElementById(idx);if(theForm==null||typeof editViewSnapshots[theForm.id]=='undefined'||editViewSnapshots[theForm.id]==null||!SUGAR.loadedForms[theForm.id]){continue;}
var snap=snapshotForm(theForm);if(editViewSnapshots[theForm.id]!=snap){dataHasChanged=true;}}}else{if(editViewSnapshots==null||typeof theForm.id=='undefined'||typeof editViewSnapshots[theForm.id]=='undefined'||editViewSnapshots[theForm.id]==null){return;}
if(editViewSnapshots[theForm.id]!=snapshotForm(theForm)){dataHasChanged=true;}}
if(dataHasChanged==true){return SUGAR.language.get('app_strings','WARN_UNSAVED_CHANGES');}else{return;}}
function disableOnUnloadEditView(theForm){if(typeof theForm=='undefined'||typeof editViewSnapshots=='undefined'||theForm==null||editViewSnapshots==null){window.onbeforeunload=null;editViewSnapshots=null;}else{if(typeof(theForm.id)!='undefined'&&typeof(editViewSnapshots[theForm.id])!='undefined'){editViewSnapshots[theForm.id]=null;}}}
function saveForms(savingStr,completeStr){index=0;theForms=ajaxFormArray;function success(data){var theForm=document.getElementById(ajaxFormArray[0]);document.getElementById('multiedit_'+theForm.id).innerHTML=data.responseText;var saveAllButton=document.getElementById('ajaxsaveall');ajaxFormArray.splice(index,1);if(saveAllButton&&ajaxFormArray.length<=1){saveAllButton.style.visibility='hidden';}
index++;if(index==theForms.length){ajaxStatus.showStatus(completeStr);window.setTimeout('ajaxStatus.hideStatus();',2000);if(saveAllButton)
saveAllButton.style.visibility='hidden';}}
if(typeof savingStr=='undefined')SUGAR.language.get('app_strings','LBL_LOADING');ajaxStatus.showStatus(savingStr);for(i=0;i<theForms.length;i++){var theForm=document.getElementById(theForms[i]);if(check_form(theForm.id)){theForm.action.value='AjaxFormSave';YAHOO.util.Connect.setForm(theForm);var cObj=YAHOO.util.Connect.asyncRequest('POST','index.php',{success:success,failure:success});}else{ajaxStatus.hideStatus();}
lastSubmitTime=lastSubmitTime-2000;}
return false;}
function sugarListView(){}
sugarListView.prototype.confirm_action=function(del){if(del==1){return confirm(SUGAR.language.get('app_strings','NTC_DELETE_CONFIRMATION_NUM')+sugarListView.get_num_selected()+SUGAR.language.get('app_strings','NTC_DELETE_SELECTED_RECORDS'));}
else{return confirm(SUGAR.language.get('app_strings','NTC_UPDATE_CONFIRMATION_NUM')+sugarListView.get_num_selected()+SUGAR.language.get('app_strings','NTC_DELETE_SELECTED_RECORDS'));}}
sugarListView.get_num_selected=function(){if(typeof document.MassUpdate!='undefined'){the_form=document.MassUpdate;for(wp=0;wp<the_form.elements.length;wp++){if(typeof the_form.elements[wp].name!='undefined'&&the_form.elements[wp].name=='selectCount[]'){return the_form.elements[wp].value;}}}
return 0;}
sugarListView.update_count=function(count,add){if(typeof document.MassUpdate!='undefined'){the_form=document.MassUpdate;for(wp=0;wp<the_form.elements.length;wp++){if(typeof the_form.elements[wp].name!='undefined'&&the_form.elements[wp].name=='selectCount[]'){if(add){the_form.elements[wp].value=parseInt(the_form.elements[wp].value,10)+count;}
else the_form.elements[wp].value=count;}}}}
sugarListView.prototype.use_external_mail_client=function(no_record_txt,module){selected_records=sugarListView.get_checks_count();if(selected_records<1){alert(no_record_txt);return false;}
if(document.MassUpdate.select_entire_list.value==1){if(totalCount>10){alert(totalCountError);return;}
select=false;}
else if(document.MassUpdate.massall.checked==true)
select=false;else
select=true;sugarListView.get_checks();var ids="";if(select){ids=document.MassUpdate.uid.value;}
else{inputs=document.MassUpdate.elements;ar=new Array();for(i=0;i<inputs.length;i++){if(inputs[i].name=='mass[]'&&inputs[i].checked&&typeof(inputs[i].value)!='function'){ar.push(inputs[i].value);}}
ids=ar.join(',');}
YAHOO.util.Connect.asyncRequest("POST","index.php?",{success:this.use_external_mail_client_callback},SUGAR.util.paramsToUrl({module:"Emails",action:"Compose",listViewExternalClient:1,action_module:module,uid:ids,to_pdf:1}));return false;}
sugarListView.prototype.use_external_mail_client_callback=function(o)
{if(o.responseText)
location.href='mailto:'+o.responseText;}
sugarListView.prototype.send_form_for_emails=function(select,currentModule,action,no_record_txt,action_module,totalCount,totalCountError){if(document.MassUpdate.select_entire_list.value==1){if(totalCount>10){alert(totalCountError);return;}
select=false;}
else if(document.MassUpdate.massall.checked==true)
select=false;else
select=true;sugarListView.get_checks();var newForm=document.createElement('form');newForm.method='post';newForm.action=action;newForm.name='newForm';newForm.id='newForm';var uidTa=document.createElement('textarea');uidTa.name='uid';uidTa.style.display='none';if(select){uidTa.value=document.MassUpdate.uid.value;}
else{inputs=document.MassUpdate.elements;ar=new Array();for(i=0;i<inputs.length;i++){if(inputs[i].name=='mass[]'&&inputs[i].checked&&typeof(inputs[i].value)!='function'){ar.push(inputs[i].value);}}
uidTa.value=ar.join(',');}
if(uidTa.value==''){alert(no_record_txt);return false;}
var selectedArray=uidTa.value.split(",");if(selectedArray.length>10){alert(totalCountError);return;}
newForm.appendChild(uidTa);var moduleInput=document.createElement('input');moduleInput.name='module';moduleInput.type='hidden';moduleInput.value=currentModule;newForm.appendChild(moduleInput);var actionInput=document.createElement('input');actionInput.name='action';actionInput.type='hidden';actionInput.value='Compose';newForm.appendChild(actionInput);if(typeof action_module!='undefined'&&action_module!=''){var actionModule=document.createElement('input');actionModule.name='action_module';actionModule.type='hidden';actionModule.value=action_module;newForm.appendChild(actionModule);}
if(typeof return_info!='undefined'&&return_info!=''){var params=return_info.split('&');if(params.length>0){for(var i=0;i<params.length;i++){if(params[i].length>0){var param_nv=params[i].split('=');if(param_nv.length==2){returnModule=document.createElement('input');returnModule.name=param_nv[0];returnModule.type='hidden';returnModule.value=param_nv[1];newForm.appendChild(returnModule);}}}}}
var isAjaxCall=document.createElement('input');isAjaxCall.name='ajaxCall';isAjaxCall.type='hidden';isAjaxCall.value=true;newForm.appendChild(isAjaxCall);var isListView=document.createElement('input');isListView.name='ListView';isListView.type='hidden';isListView.value=true;newForm.appendChild(isListView);var toPdf=document.createElement('input');toPdf.name='to_pdf';toPdf.type='hidden';toPdf.value=true;newForm.appendChild(toPdf);YAHOO.util.Connect.setForm(newForm);var callback={success:function(o){var resp=YAHOO.lang.JSON.parse(o.responseText);var quickComposePackage=new Object();quickComposePackage.composePackage=resp;quickComposePackage.fullComposeUrl='index.php?module=Emails&action=Compose&ListView=true'+'&uid='+uidTa.value+'&action_module='+action_module;SUGAR.quickCompose.init(quickComposePackage);}}
YAHOO.util.Connect.asyncRequest('POST','index.php',callback,null);document.MassUpdate.uid.value='';return false;}
sugarListView.prototype.send_form=function(select,currentModule,action,no_record_txt,action_module,return_info){if(document.MassUpdate.select_entire_list.value==1){if(sugarListView.get_checks_count()<1){alert(no_record_txt);return false;}
var href=action;if(action.indexOf('?')!=-1)
href+='&module='+currentModule;else
href+='?module='+currentModule;if(return_info)
href+=return_info;var newForm=document.createElement('form');newForm.method='post';newForm.action=href;newForm.name='newForm';newForm.id='newForm';var postTa=document.createElement('textarea');postTa.name='current_post';postTa.value=document.MassUpdate.current_query_by_page.value;postTa.style.display='none';newForm.appendChild(postTa);document.MassUpdate.parentNode.appendChild(newForm);newForm.submit();return;}
else if(document.MassUpdate.massall.checked==true)
select=false;else
select=true;sugarListView.get_checks();var newForm=document.createElement('form');newForm.method='post';newForm.action=action;newForm.name='newForm';newForm.id='newForm';var uidTa=document.createElement('textarea');uidTa.name='uid';uidTa.style.display='none';uidTa.value=document.MassUpdate.uid.value;if(uidTa.value==''){alert(no_record_txt);return false;}
newForm.appendChild(uidTa);var moduleInput=document.createElement('input');moduleInput.name='module';moduleInput.type='hidden';moduleInput.value=currentModule;newForm.appendChild(moduleInput);var actionInput=document.createElement('input');actionInput.name='action';actionInput.type='hidden';actionInput.value='index';newForm.appendChild(actionInput);if(typeof action_module!='undefined'&&action_module!=''){var actionModule=document.createElement('input');actionModule.name='action_module';actionModule.type='hidden';actionModule.value=action_module;newForm.appendChild(actionModule);}
if(typeof return_info!='undefined'&&return_info!=''){var params=return_info.split('&');if(params.length>0){for(var i=0;i<params.length;i++){if(params[i].length>0){var param_nv=params[i].split('=');if(param_nv.length==2){returnModule=document.createElement('input');returnModule.name=param_nv[0];returnModule.type='hidden';returnModule.value=param_nv[1];newForm.appendChild(returnModule);}}}}}
document.MassUpdate.parentNode.appendChild(newForm);newForm.submit();document.MassUpdate.uid.value='';return false;}
sugarListView.get_checks_count=function(){ar=new Array();if(document.MassUpdate.uid.value!=''){oldUids=document.MassUpdate.uid.value.split(',');for(uid in oldUids){if(typeof(oldUids[uid])!='function'){ar[oldUids[uid]]=1;}}}
inputs=document.MassUpdate.elements;for(i=0;i<inputs.length;i++){if(inputs[i].name=='mass[]'){ar[inputs[i].value]=(inputs[i].checked)?1:0;}}
uids=new Array();for(i in ar){if((typeof(ar[i])!='function')&&ar[i]==1){uids.push(i);}}
return uids.length;}
sugarListView.get_checks=function(){ar=new Array();if(document.MassUpdate.uid.value!=''){oldUids=document.MassUpdate.uid.value.split(',');for(uid in oldUids){if(typeof(oldUids[uid])!='function'){ar[oldUids[uid]]=1;}}}
inputs=document.MassUpdate.elements;for(i=0;i<inputs.length;i++){if(inputs[i].name=='mass[]'){ar[inputs[i].value]=(inputs[i].checked)?1:0;}}
uids=new Array();for(i in ar){if(typeof(ar[i])!='function'&&ar[i]==1){uids.push(i);}}
document.MassUpdate.uid.value=uids.join(',');if(uids.length==0)return false;return true;}
sugarListView.prototype.order_checks=function(order,orderBy,moduleString){checks=sugarListView.get_checks();eval('document.MassUpdate.'+moduleString+'.value = orderBy');document.MassUpdate.lvso.value=order;if(typeof document.MassUpdate.massupdate!='undefined'){document.MassUpdate.massupdate.value='false';}
document.MassUpdate.action.value=document.MassUpdate.return_action.value;document.MassUpdate.return_module.value='';document.MassUpdate.return_action.value='';document.MassUpdate.submit();return!checks;}
sugarListView.prototype.save_checks=function(offset,moduleString){checks=sugarListView.get_checks();eval('document.MassUpdate.'+moduleString+'.value = offset');if(typeof document.MassUpdate.massupdate!='undefined'){document.MassUpdate.massupdate.value='false';}
document.MassUpdate.action.value=document.MassUpdate.return_action.value;document.MassUpdate.return_module.value='';document.MassUpdate.return_action.value='';document.MassUpdate.submit();return!checks;}
sugarListView.prototype.check_item=function(cb,form){if(cb.checked){sugarListView.update_count(1,true);}else{sugarListView.update_count(-1,true);if(typeof form!='undefined'&&form!=null){sugarListView.prototype.updateUid(cb,form);}}}
sugarListView.prototype.updateUid=function(cb,form){if(form.name=='MassUpdate'&&form.uid&&form.uid.value&&cb.value&&form.uid.value.indexOf(cb.value)!=-1){if(form.uid.value.indexOf(','+cb.value)!=-1){form.uid.value=form.uid.value.replace(','+cb.value,'');}else if(form.uid.value.indexOf(cb.value+',')!=-1){form.uid.value=form.uid.value.replace(cb.value+',','');}else if(form.uid.value.indexOf(cb.value)!=-1){form.uid.value=form.uid.value.replace(cb.value,'');}}}
sugarListView.prototype.check_entire_list=function(form,field,value,list_count){count=0;document.MassUpdate.massall.checked=true;document.MassUpdate.massall.disabled=true;for(i=0;i<form.elements.length;i++){if(form.elements[i].name==field&&form.elements[i].disabled==false){if(form.elements[i].checked!=value)count++;form.elements[i].checked=value;form.elements[i].disabled=true;}}
document.MassUpdate.select_entire_list.value=1;sugarListView.update_count(list_count,false);}
sugarListView.prototype.check_all=function(form,field,value,pageTotal){count=0;document.MassUpdate.massall.checked=value;if(document.MassUpdate.select_entire_list&&document.MassUpdate.select_entire_list.value==1)
document.MassUpdate.massall.disabled=true;else
document.MassUpdate.massall.disabled=false;for(i=0;i<form.elements.length;i++){if(form.elements[i].name==field&&!(form.elements[i].disabled==true&&form.elements[i].checked==false)){form.elements[i].disabled=false;if(form.elements[i].checked!=value)
count++;form.elements[i].checked=value;if(!value){sugarListView.prototype.updateUid(form.elements[i],form);}}}
if(pageTotal>=0)
sugarListView.update_count(pageTotal);else if(value)
sugarListView.update_count(count,true);else
sugarListView.update_count(-1*count,true);}
sugarListView.check_all=sugarListView.prototype.check_all;sugarListView.confirm_action=sugarListView.prototype.confirm_action;sugarListView.prototype.check_boxes=function(){var inputsCount=0;var checkedCount=0;var existing_onload=window.onload;var theForm=document.MassUpdate;inputs_array=theForm.elements;if(typeof theForm.uid.value!='undefined'&&theForm.uid.value!=""){checked_items=theForm.uid.value.split(",");if(theForm.select_entire_list.value==1)
document.MassUpdate.massall.disabled=true;for(wp=0;wp<inputs_array.length;wp++){if(inputs_array[wp].name=="mass[]"){inputsCount++;if(theForm.select_entire_list.value==1){inputs_array[wp].checked=true;inputs_array[wp].disabled=true;checkedCount++;}
else{for(i in checked_items){if(inputs_array[wp].value==checked_items[i]){checkedCount++;inputs_array[wp].checked=true;}}}}}
if(theForm.select_entire_list.value==0)
sugarListView.update_count(checked_items.length);else
sugarListView.update_count(0,true);}
else{for(wp=0;wp<inputs_array.length;wp++){if(inputs_array[wp].name=="mass[]"){inputs_array[wp].checked=false;inputs_array[wp].disabled=false;}}
if(document.MassUpdate.massall){document.MassUpdate.massall.checked=false;document.MassUpdate.massall.disabled=false;}
sugarListView.update_count(0)}
if(checkedCount>0&&checkedCount==inputsCount)
document.MassUpdate.massall.checked=true;}
function check_used_email_templates(){var ids=document.MassUpdate.uid.value;var call_back={success:function(r){if(r.responseText!=''){if(!confirm(SUGAR.language.get('app_strings','NTC_TEMPLATES_IS_USED')+r.responseText)){return false;}}
document.MassUpdate.submit();return false;}};url="index.php?module=EmailTemplates&action=CheckDeletable&from=ListView&to_pdf=1&records="+ids;YAHOO.util.Connect.asyncRequest('POST',url,call_back,null);}
sugarListView.prototype.send_mass_update=function(mode,no_record_txt,del){formValid=check_form('MassUpdate');if(!formValid&&!del)return false;if(document.MassUpdate.select_entire_list&&document.MassUpdate.select_entire_list.value==1)
mode='entire';else
mode='selected';var ar=new Array();switch(mode){case'selected':for(wp=0;wp<document.MassUpdate.elements.length;wp++){var reg_for_existing_uid=new RegExp('^'+RegExp.escape(document.MassUpdate.elements[wp].value)+'[\s]*,|,[\s]*'+RegExp.escape(document.MassUpdate.elements[wp].value)+'[\s]*,|,[\s]*'+RegExp.escape(document.MassUpdate.elements[wp].value)+'$|^'+RegExp.escape(document.MassUpdate.elements[wp].value)+'$');if(typeof document.MassUpdate.elements[wp].name!='undefined'&&document.MassUpdate.elements[wp].name=='mass[]'&&document.MassUpdate.elements[wp].checked&&!reg_for_existing_uid.test(document.MassUpdate.uid.value)){ar.push(document.MassUpdate.elements[wp].value);}}
if(document.MassUpdate.uid.value!='')document.MassUpdate.uid.value+=',';document.MassUpdate.uid.value+=ar.join(',');if(document.MassUpdate.uid.value==''){alert(no_record_txt);return false;}
if(typeof(current_admin_id)!='undefined'&&document.MassUpdate.module!='undefined'&&document.MassUpdate.module.value=='Users'&&(document.MassUpdate.is_admin.value!=''||document.MassUpdate.status.value!='')){var reg_for_current_admin_id=new RegExp('^'+current_admin_id+'[\s]*,|,[\s]*'+current_admin_id+'[\s]*,|,[\s]*'+current_admin_id+'$|^'+current_admin_id+'$');if(reg_for_current_admin_id.test(document.MassUpdate.uid.value)){alert(SUGAR.language.get('Users','LBL_LAST_ADMIN_NOTICE'));return false;}}
break;case'entire':var entireInput=document.createElement('input');entireInput.name='entire';entireInput.type='hidden';entireInput.value='index';document.MassUpdate.appendChild(entireInput);if(document.MassUpdate.module!='undefined'&&document.MassUpdate.module.value=='Users'&&(document.MassUpdate.is_admin.value!=''||document.MassUpdate.status.value!='')){alert(SUGAR.language.get('Users','LBL_LAST_ADMIN_NOTICE'));return false;}
break;}
if(!sugarListView.confirm_action(del))
return false;if(del==1){var deleteInput=document.createElement('input');deleteInput.name='Delete';deleteInput.type='hidden';deleteInput.value=true;document.MassUpdate.appendChild(deleteInput);if(document.MassUpdate.module!='undefined'&&document.MassUpdate.module.value=='EmailTemplates'){check_used_email_templates();return false;}}
document.MassUpdate.submit();return false;}
sugarListView.prototype.clear_all=function(){document.MassUpdate.uid.value='';document.MassUpdate.select_entire_list.value=0;sugarListView.check_all(document.MassUpdate,'mass[]',false);document.MassUpdate.massall.checked=false;document.MassUpdate.massall.disabled=false;sugarListView.update_count(0);}
sListView=new sugarListView();function unformatNumber(n,num_grp_sep,dec_sep){var x=unformatNumberNoParse(n,num_grp_sep,dec_sep);x=x.toString();if(x.length>0){return parseFloat(x);}
return'';}
function unformatNumberNoParse(n,num_grp_sep,dec_sep){if(typeof num_grp_sep=='undefined'||typeof dec_sep=='undefined')return n;n=n?n.toString():'';if(n.length>0){if(num_grp_sep!='')
{num_grp_sep_re=new RegExp('\\'+num_grp_sep,'g');n=n.replace(num_grp_sep_re,'');}
n=n.replace(dec_sep,'.');if(typeof CurrencySymbols!='undefined'){for(var idx in CurrencySymbols){n=n.replace(CurrencySymbols[idx],'');}}
return n;}
return'';}
function formatNumber(n,num_grp_sep,dec_sep,round,precision){if(typeof num_grp_sep=='undefined'||typeof dec_sep=='undefined')return n;n=n?n.toString():'';if(n.split)n=n.split('.');else return n;if(n.length>2)return n.join('.');if(typeof round!='undefined'){if(round>0&&n.length>1){n[1]=parseFloat('0.'+n[1]);n[1]=Math.round(n[1]*Math.pow(10,round))/Math.pow(10,round);n[1]=n[1].toString().split('.')[1];}
if(round<=0){n[0]=Math.round(parseInt(n[0],10)*Math.pow(10,round))/Math.pow(10,round);n[1]='';}}
if(typeof precision!='undefined'&&precision>=0){if(n.length>1&&typeof n[1]!='undefined')n[1]=n[1].substring(0,precision);else n[1]='';if(n[1].length<precision){for(var wp=n[1].length;wp<precision;wp++)n[1]+='0';}}
regex=/(\d+)(\d{3})/;while(num_grp_sep!=''&&regex.test(n[0]))n[0]=n[0].toString().replace(regex,'$1'+num_grp_sep+'$2');return n[0]+(n.length>1&&n[1]!=''?dec_sep+n[1]:'');}
SUGAR.ajaxStatusClass=function(){};SUGAR.ajaxStatusClass.prototype.statusDiv=null;SUGAR.ajaxStatusClass.prototype.oldOnScroll=null;SUGAR.ajaxStatusClass.prototype.shown=false;SUGAR.ajaxStatusClass.prototype.positionStatus=function(){this.statusDiv.style.top=document.body.scrollTop+8+'px';statusDivRegion=YAHOO.util.Dom.getRegion(this.statusDiv);statusDivWidth=statusDivRegion.right-statusDivRegion.left;this.statusDiv.style.left=YAHOO.util.Dom.getViewportWidth()/2-statusDivWidth/2+'px';}
SUGAR.ajaxStatusClass.prototype.createStatus=function(text){statusDiv=document.createElement('div');statusDiv.className='dataLabel';statusDiv.style.background='#ffffff';statusDiv.style.color='#c60c30';statusDiv.style.position='absolute';statusDiv.style.opacity=.8;statusDiv.style.filter='alpha(opacity=80)';statusDiv.id='ajaxStatusDiv';document.body.appendChild(statusDiv);this.statusDiv=document.getElementById('ajaxStatusDiv');}
SUGAR.ajaxStatusClass.prototype.showStatus=function(text){if(!this.statusDiv){this.createStatus(text);}
else{this.statusDiv.style.display='';}
this.statusDiv.style.zIndex=20;this.statusDiv.innerHTML='&nbsp;<b>'+text+'</b>&nbsp;';this.positionStatus();if(!this.shown){this.shown=true;this.statusDiv.style.display='';if(window.onscroll)this.oldOnScroll=window.onscroll;window.onscroll=this.positionStatus;}}
SUGAR.ajaxStatusClass.prototype.hideStatus=function(text){if(!this.shown)return;this.shown=false;if(this.oldOnScroll)window.onscroll=this.oldOnScroll;else window.onscroll='';this.statusDiv.style.display='none';}
SUGAR.ajaxStatusClass.prototype.flashStatus=function(text,time){this.showStatus(text);window.setTimeout('ajaxStatus.hideStatus();',time);}
var ajaxStatus=new SUGAR.ajaxStatusClass();SUGAR.unifiedSearchAdvanced=function(){var usa_div;var usa_img;var usa_open;var usa_content;var anim_open;var anim_close;return{init:function(){SUGAR.unifiedSearchAdvanced.usa_div=document.getElementById('unified_search_advanced_div');SUGAR.unifiedSearchAdvanced.usa_img=document.getElementById('unified_search_advanced_img');if(!SUGAR.unifiedSearchAdvanced.usa_div||!SUGAR.unifiedSearchAdvanced.usa_img)return;var attributes={height:{to:300}};SUGAR.unifiedSearchAdvanced.anim_open=new YAHOO.util.Anim('unified_search_advanced_div',attributes);SUGAR.unifiedSearchAdvanced.anim_open.duration=0.75;SUGAR.unifiedSearchAdvanced.anim_close=new YAHOO.util.Anim('unified_search_advanced_div',{height:{to:0}});SUGAR.unifiedSearchAdvanced.anim_close.duration=0.75;SUGAR.unifiedSearchAdvanced.usa_img._x=YAHOO.util.Dom.getX(SUGAR.unifiedSearchAdvanced.usa_img);SUGAR.unifiedSearchAdvanced.usa_img._y=YAHOO.util.Dom.getY(SUGAR.unifiedSearchAdvanced.usa_img);SUGAR.unifiedSearchAdvanced.usa_open=false;SUGAR.unifiedSearchAdvanced.usa_content=null;YAHOO.util.Event.addListener('unified_search_advanced_img','click',SUGAR.unifiedSearchAdvanced.get_content);},get_content:function(e){if(SUGAR.unifiedSearchAdvanced.usa_content==null){ajaxStatus.showStatus(SUGAR.language.get('app_strings','LBL_LOADING'));var cObj=YAHOO.util.Connect.asyncRequest('GET','index.php?to_pdf=1&module=Home&action=UnifiedSearch&usa_form=true',{success:SUGAR.unifiedSearchAdvanced.animate,failure:SUGAR.unifiedSearchAdvanced.animate},null);}
else SUGAR.unifiedSearchAdvanced.animate();},animate:function(data){ajaxStatus.hideStatus();if(data){SUGAR.unifiedSearchAdvanced.usa_content=data.responseText;SUGAR.unifiedSearchAdvanced.usa_div.innerHTML=SUGAR.unifiedSearchAdvanced.usa_content;}
if(SUGAR.unifiedSearchAdvanced.usa_open){document.UnifiedSearch.advanced.value='false';SUGAR.unifiedSearchAdvanced.anim_close.animate();}
else{document.UnifiedSearch.advanced.value='true';SUGAR.unifiedSearchAdvanced.usa_div.style.display='';YAHOO.util.Dom.setX(SUGAR.unifiedSearchAdvanced.usa_div,SUGAR.unifiedSearchAdvanced.usa_img._x-90);YAHOO.util.Dom.setY(SUGAR.unifiedSearchAdvanced.usa_div,SUGAR.unifiedSearchAdvanced.usa_img._y+15);SUGAR.unifiedSearchAdvanced.anim_open.animate();}
SUGAR.unifiedSearchAdvanced.usa_open=!SUGAR.unifiedSearchAdvanced.usa_open;return false;},checkUsaAdvanced:function(){if(document.UnifiedSearch.advanced.value=='true'){document.UnifiedSearchAdvanced.query_string.value=document.UnifiedSearch.query_string.value;document.UnifiedSearchAdvanced.submit();return false;}
return true;}};}();if(typeof YAHOO!='undefined')YAHOO.util.Event.addListener(window,'load',SUGAR.unifiedSearchAdvanced.init);SUGAR.ui={toggleHeader:function(){var h=document.getElementById('header');if(h!=null){if(h!=null){if(h.style.display=='none'){h.style.display='';}else{h.style.display='none';}}}else{alert(SUGAR.language.get("app_strings","ERR_NO_HEADER_ID"));}}};SUGAR.util=function(){var additionalDetailsCache;var additionalDetailsCalls;var additionalDetailsRpcCall;return{getAndRemove:function(el){if(YAHOO&&YAHOO.util&&YAHOO.util.Dom)
el=YAHOO.util.Dom.get(el);else if(typeof(el)=="string")
el=document.getElementById(el);if(el&&el.parentNode)
el.parentNode.removeChild(el);return el;},paramsToUrl:function(params){url="";for(i in params){url+=i+"="+params[i]+"&";}
return url;},evalScript:function(text){if(isSafari){var waitUntilLoaded=function(){SUGAR.evalScript_waitCount--;if(SUGAR.evalScript_waitCount==0){var headElem=document.getElementsByTagName('head')[0];for(var i=0;i<SUGAR.evalScript_evalElem.length;i++){var tmpElem=document.createElement('script');tmpElem.type='text/javascript';tmpElem.text=SUGAR.evalScript_evalElem[i];headElem.appendChild(tmpElem);}}};var tmpElem=document.createElement('div');tmpElem.innerHTML=text;var results=tmpElem.getElementsByTagName('script');if(results==null){return;}
var headElem=document.getElementsByTagName('head')[0];var tmpElem=null;SUGAR.evalScript_waitCount=0;SUGAR.evalScript_evalElem=new Array();for(var i=0;i<results.length;i++){if(typeof(results[i])!='object'){continue;};tmpElem=document.createElement('script');tmpElem.type='text/javascript';if(results[i].src!=null&&results[i].src!=''){tmpElem.src=results[i].src;}else{SUGAR.evalScript_evalElem[SUGAR.evalScript_evalElem.length]=results[i].text;continue;}
tmpElem.addEventListener('load',waitUntilLoaded);SUGAR.evalScript_waitCount++;headElem.appendChild(tmpElem);}
SUGAR.evalScript_waitCount++;waitUntilLoaded();return;}
var objRegex=/<\s*script([^>]*)>((.|\s|\v|\0)*?)<\s*\/script\s*>/igm;var lastIndex=-1;var result=objRegex.exec(text);while(result&&result.index>lastIndex){lastIndex=result.index
try{var script=document.createElement('script');script.type='text/javascript';if(result[1].indexOf("src=")>-1){var srcRegex=/.*src=['"]([a-zA-Z0-9\&\/\.\?=:]*)['"].*/igm;var srcResult=result[1].replace(srcRegex,'$1');script.src=srcResult;}else{script.text=result[2];}
document.body.appendChild(script)}
catch(e){}
result=objRegex.exec(text);}},getLeftColObj:function(){leftColObj=document.getElementById('leftCol');while(leftColObj.nodeName!='TABLE'){leftColObj=leftColObj.firstChild;}
leftColTable=leftColObj;leftColTd=leftColTable.getElementsByTagName('td')[0];leftColTdRegion=YAHOO.util.Dom.getRegion(leftColTd);leftColTd.style.width=(leftColTdRegion.right-leftColTdRegion.left)+'px';return leftColTd;},fillShortcuts:function(e,shortcutContent){return;},retrieveAndFill:function(url,theDiv,postForm,callback,callbackParam,appendMode){if(typeof theDiv=='string'){try{theDiv=document.getElementById(theDiv);}
catch(e){return;}}
var success=function(data){if(typeof theDiv!='undefined'&&theDiv!=null)
{try{if(typeof appendMode!='undefined'&&appendMode)
{theDiv.innerHTML+=data.responseText;}
else
{theDiv.innerHTML=data.responseText;}}
catch(e){return;}}
if(typeof callback!='undefined'&&callback!=null)callback(callbackParam);}
if(typeof postForm=='undefined'||postForm==null){var cObj=YAHOO.util.Connect.asyncRequest('GET',url,{success:success,failure:success});}
else{YAHOO.util.Connect.setForm(postForm);var cObj=YAHOO.util.Connect.asyncRequest('POST',url,{success:success,failure:success});}},checkMaxLength:function(){var maxLength=this.getAttribute('maxlength');var currentLength=this.value.length;if(currentLength>maxLength){this.value=this.value.substring(0,maxLength);}},setMaxLength:function(){var x=document.getElementsByTagName('textarea');for(var i=0;i<x.length;i++){if(x[i].getAttribute('maxlength')){x[i].onkeyup=x[i].onchange=SUGAR.util.checkMaxLength;x[i].onkeyup();}}},getAdditionalDetails:function(bean,id,spanId){go=function(){oReturn=function(body,caption,width,theme){var _refx=25-width;return overlib(body,CAPTION,caption,STICKY,MOUSEOFF,1000,WIDTH,width,CLOSETEXT,('<img border=0 style="margin-left:2px; margin-right: 2px;" src=index.php?entryPoint=getImage&themeName='+SUGAR.themes.theme_name+'&imageName=close.gif>'),CLOSETITLE,SUGAR.language.get('app_strings','LBL_ADDITIONAL_DETAILS_CLOSE_TITLE'),CLOSECLICK,FGCLASS,'olFgClass',CGCLASS,'olCgClass',BGCLASS,'olBgClass',TEXTFONTCLASS,'olFontClass',CAPTIONFONTCLASS,'olCapFontClass',CLOSEFONTCLASS,'olCloseFontClass',REF,spanId,REFC,'LL',REFX,_refx);}
success=function(data){eval(data.responseText);SUGAR.util.additionalDetailsCache[spanId]=new Array();SUGAR.util.additionalDetailsCache[spanId]['body']=result['body'];SUGAR.util.additionalDetailsCache[spanId]['caption']=result['caption'];SUGAR.util.additionalDetailsCache[spanId]['width']=result['width'];SUGAR.util.additionalDetailsCache[spanId]['theme']=result['theme'];ajaxStatus.hideStatus();return oReturn(SUGAR.util.additionalDetailsCache[spanId]['body'],SUGAR.util.additionalDetailsCache[spanId]['caption'],SUGAR.util.additionalDetailsCache[spanId]['width'],SUGAR.util.additionalDetailsCache[spanId]['theme']);}
if(typeof SUGAR.util.additionalDetailsCache[spanId]!='undefined')
return oReturn(SUGAR.util.additionalDetailsCache[spanId]['body'],SUGAR.util.additionalDetailsCache[spanId]['caption'],SUGAR.util.additionalDetailsCache[spanId]['width'],SUGAR.util.additionalDetailsCache[spanId]['theme']);if(typeof SUGAR.util.additionalDetailsCalls[spanId]!='undefined')
return;ajaxStatus.showStatus(SUGAR.language.get('app_strings','LBL_LOADING'));url='index.php?to_pdf=1&module=Home&action=AdditionalDetailsRetrieve&bean='+bean+'&id='+id;SUGAR.util.additionalDetailsCalls[spanId]=YAHOO.util.Connect.asyncRequest('GET',url,{success:success,failure:success});return false;}
SUGAR.util.additionalDetailsRpcCall=window.setTimeout('go()',250);},clearAdditionalDetailsCall:function(){if(typeof SUGAR.util.additionalDetailsRpcCall=='number')window.clearTimeout(SUGAR.util.additionalDetailsRpcCall);},extend:function(subc,superc,overrides){subc.prototype=new superc;if(overrides){for(var i in overrides)subc.prototype[i]=overrides[i];}}};}();SUGAR.util.additionalDetailsCache=new Array();SUGAR.util.additionalDetailsCalls=new Array();if(typeof YAHOO!='undefined')YAHOO.util.Event.addListener(window,'load',SUGAR.util.setMaxLength);SUGAR.savedViews=function(){var selectedOrderBy;var selectedSortOrder;var displayColumns;var hideTabs;var columnsMeta;return{setChooser:function(){var displayColumnsDef=new Array();var hideTabsDef=new Array();var left_td=document.getElementById('display_tabs_td');if(typeof left_td=='undefined'||left_td==null)return;var right_td=document.getElementById('hide_tabs_td');var displayTabs=left_td.getElementsByTagName('select')[0];var hideTabs=right_td.getElementsByTagName('select')[0];for(i=0;i<displayTabs.options.length;i++){displayColumnsDef.push(displayTabs.options[i].value);}
if(typeof hideTabs!='undefined'){for(i=0;i<hideTabs.options.length;i++){hideTabsDef.push(hideTabs.options[i].value);}}
if(!SUGAR.savedViews.clearColumns)
document.getElementById('displayColumnsDef').value=displayColumnsDef.join('|');document.getElementById('hideTabsDef').value=hideTabsDef.join('|');},select:function(saved_search_select){for(var wp=0;wp<document.search_form.saved_search_select.options.length;wp++){if(typeof document.search_form.saved_search_select.options[wp].value!='undefined'&&document.search_form.saved_search_select.options[wp].value==saved_search_select){document.search_form.saved_search_select.selectedIndex=wp;document.search_form.ss_delete.style.display='';document.search_form.ss_update.style.display='';}}},saved_search_action:function(action,delete_lang){if(action=='delete'){if(!confirm(delete_lang))return;}
if(action=='save'){if(document.search_form.saved_search_name.value.replace(/^\s*|\s*$/g,'')==''){alert(SUGAR.language.get('app_strings','LBL_SAVED_SEARCH_ERROR'));return;}}
if(document.search_form.saved_search_action)
{document.search_form.saved_search_action.value=action;document.search_form.search_module.value=document.search_form.module.value;document.search_form.module.value='SavedSearch';document.search_form.action.value='index';}
document.search_form.submit();},shortcut_select:function(selectBox,module){selecturl='index.php?module=SavedSearch&search_module='+module+'&action=index&saved_search_select='+selectBox.options[selectBox.selectedIndex].value
if(typeof(document.getElementById('searchFormTab'))!='undefined'){selecturl=selecturl+'&searchFormTab='+document.search_form.searchFormTab.value;}
if(document.getElementById('showSSDIV')&&typeof(document.getElementById('showSSDIV')!='undefined')){selecturl=selecturl+'&showSSDIV='+document.getElementById('showSSDIV').value;}
document.location.href=selecturl;},handleForm:function(){SUGAR.tabChooser.movementCallback=function(left_side,right_side){while(document.getElementById('orderBySelect').childNodes.length!=0){document.getElementById('orderBySelect').removeChild(document.getElementById('orderBySelect').lastChild);}
var selectedIndex=0;var nodeCount=-1;for(i in left_side.childNodes){if(typeof left_side.childNodes[i].nodeName!='undefined'&&left_side.childNodes[i].nodeName.toLowerCase()=='option'&&typeof SUGAR.savedViews.columnsMeta[left_side.childNodes[i].value]!='undefined'&&typeof SUGAR.savedViews.columnsMeta[left_side.childNodes[i].value]['sortable']=='undefined'&&SUGAR.savedViews.columnsMeta[left_side.childNodes[i].value]['sortable']!=false){nodeCount++;optionNode=document.createElement('option');optionNode.value=left_side.childNodes[i].value;optionNode.innerHTML=left_side.childNodes[i].innerHTML;document.getElementById('orderBySelect').appendChild(optionNode);if(optionNode.value==SUGAR.savedViews.selectedOrderBy)
selectedIndex=nodeCount;}}
document.getElementById('orderBySelect').selectedIndex=selectedIndex;};SUGAR.tabChooser.movementCallback(document.getElementById('display_tabs_td').getElementsByTagName('select')[0]);if(document.search_form.orderBy)
document.search_form.orderBy.options.value=SUGAR.savedViews.selectedOrderBy;if(SUGAR.savedViews.selectedSortOrder=='DESC')document.getElementById('sort_order_desc_radio').checked=true;else document.getElementById('sort_order_asc_radio').checked=true;}};}();SUGAR.searchForm=function(){var url;return{searchFormSelect:function(view,previousView){var module=view.split('|')[0];var theView=view.split('|')[1];var handleDisplay=function(){document.search_form.searchFormTab.value=theView;patt=module+"(.*)SearchForm$";divId=document.search_form.getElementsByTagName('div');for(i=0;i<divId.length;i++){if(divId[i].id.match(module)==module){if(divId[i].id.match('SearchForm')=='SearchForm'){if(document.getElementById(divId[i].id).style.display==''){previousTab=divId[i].id.match(patt)[1];}
document.getElementById(divId[i].id).style.display='none';}}}
document.getElementById(module+theView+'SearchForm').style.display='';if(previousView){thepreviousView=previousView.split('|')[1];}
else{thepreviousView=previousTab;}
thepreviousView=thepreviousView.replace(/_search/,"");for(num in document.search_form.elements){if(document.search_form.elements[num]){el=document.search_form.elements[num];pattern="^(.*)_"+thepreviousView+"$";if(typeof el.type!='undefined'&&typeof el.name!='undefined'&&el.name.match(pattern)){advanced_input_name=el.name.match(pattern)[1];advanced_input_name=advanced_input_name+"_"+theView.replace(/_search/,"");if(typeof document.search_form[advanced_input_name]!='undefined')
SUGAR.searchForm.copyElement(advanced_input_name,el);}}}}
if(document.getElementById(module+theView+'SearchForm').innerHTML==''){ajaxStatus.showStatus(SUGAR.language.get('app_strings','LBL_LOADING'));var success=function(data){document.getElementById(module+theView+'SearchForm').innerHTML=data.responseText;SUGAR.util.evalScript(data.responseText);if(theView=='saved_views'){if(typeof columnsMeta!='undefined')SUGAR.savedViews.columnsMeta=columnsMeta;if(typeof selectedOrderBy!='undefined')SUGAR.savedViews.selectedOrderBy=selectedOrderBy;if(typeof selectedSortOrder!='undefined')SUGAR.savedViews.selectedSortOrder=selectedSortOrder;}
handleDisplay();enableQS(true);ajaxStatus.hideStatus();}
url='index.php?module='+module+'&action=index&search_form_only=true&to_pdf=true&search_form_view='+theView;var tpl='';if(document.getElementById('search_tpl')!=null&&typeof(document.getElementById('search_tpl'))!='undefined'){tpl=document.getElementById('search_tpl').value;if(tpl!=''){url+='&search_tpl='+tpl;}}
if(theView=='saved_views')
url+='&displayColumns='+SUGAR.savedViews.displayColumns+'&hideTabs='+SUGAR.savedViews.hideTabs+'&orderBy='+SUGAR.savedViews.selectedOrderBy+'&sortOrder='+SUGAR.savedViews.selectedSortOrder;var cObj=YAHOO.util.Connect.asyncRequest('GET',url,{success:success,failure:success});}
else{handleDisplay();}},copyElement:function(inputName,copyFromElement){switch(copyFromElement.type){case'select-one':case'text':document.search_form[inputName].value=copyFromElement.value;break;}},clear_form:function(form){var elemList=form.elements;var elem;var elemType;for(var i=0;i<elemList.length;i++){elem=elemList[i];if(typeof(elem.type)=='undefined'){continue;}
elemType=elem.type.toLowerCase();if(elemType=='text'||elemType=='textarea'||elemType=='password'){elem.value='';}
else if(elemType=='select'||elemType=='select-one'||elemType=='select-multiple'){var optionList=elem.options;for(var ii=0;ii<optionList.length;ii++){optionList[ii].selected=false;}}
else if(elemType=='radio'||elemType=='checkbox'){elem.checked=false;elem.selected=false;}
else if(elemType=='hidden'){if((elem.name.length>3&&elem.name.substring(elem.name.length-3)=='_id')||(elem.name.length>12&&elem.name.substring(elem.name.length-12)=='_id_advanced')){elem.value='';}}}
SUGAR.savedViews.clearColumns=true;}};}();SUGAR.tabChooser=function(){var object_refs=new Array();return{frozenOptions:[],movementCallback:function(left_side,right_side){},orderCallback:function(left_side,right_side){},freezeOptions:function(left_name,right_name,target){if(!SUGAR.tabChooser.frozenOptions){SUGAR.tabChooser.frozenOptions=[];}
if(!SUGAR.tabChooser.frozenOptions[left_name]){SUGAR.tabChooser.frozenOptions[left_name]=[];}
if(!SUGAR.tabChooser.frozenOptions[left_name][right_name]){SUGAR.tabChooser.frozenOptions[left_name][right_name]=[];}
if(typeof target=='array'){for(var i in target){SUGAR.tabChooser.frozenOptions[left_name][right_name][target[i]]=true;}}else{SUGAR.tabChooser.frozenOptions[left_name][right_name][target]=true;}},buildSelectHTML:function(info){var text="<select";if(typeof(info['select']['size'])!='undefined'){text+=" size=\""+info['select']['size']+"\"";}
if(typeof(info['select']['name'])!='undefined'){text+=" name=\""+info['select']['name']+"\"";}
if(typeof(info['select']['style'])!='undefined'){text+=" style=\""+info['select']['style']+"\"";}
if(typeof(info['select']['onchange'])!='undefined'){text+=" onChange=\""+info['select']['onchange']+"\"";}
if(typeof(info['select']['multiple'])!='undefined'){text+=" multiple";}
text+=">";for(i=0;i<info['options'].length;i++){option=info['options'][i];text+="<option value=\""+option['value']+"\" ";if(typeof(option['selected'])!='undefined'&&option['selected']==true){text+="SELECTED";}
text+=">"+option['text']+"</option>";}
text+="</select>";return text;},left_to_right:function(left_name,right_name,left_size,right_size){SUGAR.savedViews.clearColumns=false;var left_td=document.getElementById(left_name+'_td');var right_td=document.getElementById(right_name+'_td');var display_columns_ref=left_td.getElementsByTagName('select')[0];var hidden_columns_ref=right_td.getElementsByTagName('select')[0];var selected_left=new Array();var notselected_left=new Array();var notselected_right=new Array();var left_array=new Array();var frozen_options=SUGAR.tabChooser.frozenOptions;frozen_options=frozen_options&&frozen_options[left_name]&&frozen_options[left_name][right_name]?frozen_options[left_name][right_name]:[];for(i=0;i<display_columns_ref.options.length;i++)
{if(display_columns_ref.options[i].selected==true&&!frozen_options[display_columns_ref.options[i].value])
{selected_left[selected_left.length]={text:display_columns_ref.options[i].text,value:display_columns_ref.options[i].value};}
else
{notselected_left[notselected_left.length]={text:display_columns_ref.options[i].text,value:display_columns_ref.options[i].value};}}
for(i=0;i<hidden_columns_ref.options.length;i++)
{notselected_right[notselected_right.length]={text:hidden_columns_ref.options[i].text,value:hidden_columns_ref.options[i].value};}
var left_select_html_info=new Object();var left_options=new Array();var left_select=new Object();left_select['name']=left_name+'[]';left_select['id']=left_name;left_select['size']=left_size;left_select['multiple']='true';var right_select_html_info=new Object();var right_options=new Array();var right_select=new Object();right_select['name']=right_name+'[]';right_select['id']=right_name;right_select['size']=right_size;right_select['multiple']='true';for(i=0;i<notselected_right.length;i++){right_options[right_options.length]=notselected_right[i];}
for(i=0;i<selected_left.length;i++){right_options[right_options.length]=selected_left[i];}
for(i=0;i<notselected_left.length;i++){left_options[left_options.length]=notselected_left[i];}
left_select_html_info['options']=left_options;left_select_html_info['select']=left_select;right_select_html_info['options']=right_options;right_select_html_info['select']=right_select;right_select_html_info['style']='background: lightgrey';var left_html=this.buildSelectHTML(left_select_html_info);var right_html=this.buildSelectHTML(right_select_html_info);left_td.innerHTML=left_html;right_td.innerHTML=right_html;object_refs[left_name]=left_td.getElementsByTagName('select')[0];object_refs[right_name]=right_td.getElementsByTagName('select')[0];this.movementCallback(object_refs[left_name],object_refs[right_name]);return false;},right_to_left:function(left_name,right_name,left_size,right_size,max_left){SUGAR.savedViews.clearColumns=false;var left_td=document.getElementById(left_name+'_td');var right_td=document.getElementById(right_name+'_td');var display_columns_ref=left_td.getElementsByTagName('select')[0];var hidden_columns_ref=right_td.getElementsByTagName('select')[0];var selected_right=new Array();var notselected_right=new Array();var notselected_left=new Array();var frozen_options=SUGAR.tabChooser.frozenOptions;frozen_options=SUGAR.tabChooser.frozenOptions&&SUGAR.tabChooser.frozenOptions[right_name]&&SUGAR.tabChooser.frozenOptions[right_name][left_name]?SUGAR.tabChooser.frozenOptions[right_name][left_name]:[];for(i=0;i<hidden_columns_ref.options.length;i++)
{if(hidden_columns_ref.options[i].selected==true&&!frozen_options[hidden_columns_ref.options[i].value])
{selected_right[selected_right.length]={text:hidden_columns_ref.options[i].text,value:hidden_columns_ref.options[i].value};}
else
{notselected_right[notselected_right.length]={text:hidden_columns_ref.options[i].text,value:hidden_columns_ref.options[i].value};}}
if(max_left!=''&&(display_columns_ref.length+selected_right.length)>max_left){alert('Maximum of '+max_left+' columns can be displayed.');return;}
for(i=0;i<display_columns_ref.options.length;i++)
{notselected_left[notselected_left.length]={text:display_columns_ref.options[i].text,value:display_columns_ref.options[i].value};}
var left_select_html_info=new Object();var left_options=new Array();var left_select=new Object();left_select['name']=left_name+'[]';left_select['id']=left_name;left_select['multiple']='true';left_select['size']=left_size;var right_select_html_info=new Object();var right_options=new Array();var right_select=new Object();right_select['name']=right_name+'[]';right_select['id']=right_name;right_select['multiple']='true';right_select['size']=right_size;for(i=0;i<notselected_left.length;i++){left_options[left_options.length]=notselected_left[i];}
for(i=0;i<selected_right.length;i++){left_options[left_options.length]=selected_right[i];}
for(i=0;i<notselected_right.length;i++){right_options[right_options.length]=notselected_right[i];}
left_select_html_info['options']=left_options;left_select_html_info['select']=left_select;right_select_html_info['options']=right_options;right_select_html_info['select']=right_select;right_select_html_info['style']='background: lightgrey';var left_html=this.buildSelectHTML(left_select_html_info);var right_html=this.buildSelectHTML(right_select_html_info);left_td.innerHTML=left_html;right_td.innerHTML=right_html;object_refs[left_name]=left_td.getElementsByTagName('select')[0];object_refs[right_name]=right_td.getElementsByTagName('select')[0];this.movementCallback(object_refs[left_name],object_refs[right_name]);return false;},up:function(name,left_name,right_name){SUGAR.savedViews.clearColumns=false;var left_td=document.getElementById(left_name+'_td');var right_td=document.getElementById(right_name+'_td');var td=document.getElementById(name+'_td');var obj=td.getElementsByTagName('select')[0];obj=(typeof obj=="string")?document.getElementById(obj):obj;if(obj.tagName.toLowerCase()!="select"&&obj.length<2)
return false;var sel=new Array();for(i=0;i<obj.length;i++){if(obj[i].selected==true){sel[sel.length]=i;}}
for(i=0;i<sel.length;i++){if(sel[i]!=0&&!obj[sel[i]-1].selected){var tmp=new Array(obj[sel[i]-1].text,obj[sel[i]-1].value);obj[sel[i]-1].text=obj[sel[i]].text;obj[sel[i]-1].value=obj[sel[i]].value;obj[sel[i]].text=tmp[0];obj[sel[i]].value=tmp[1];obj[sel[i]-1].selected=true;obj[sel[i]].selected=false;}}
object_refs[left_name]=left_td.getElementsByTagName('select')[0];object_refs[right_name]=right_td.getElementsByTagName('select')[0];this.orderCallback(object_refs[left_name],object_refs[right_name]);return false;},down:function(name,left_name,right_name){SUGAR.savedViews.clearColumns=false;var left_td=document.getElementById(left_name+'_td');var right_td=document.getElementById(right_name+'_td');var td=document.getElementById(name+'_td');var obj=td.getElementsByTagName('select')[0];if(obj.tagName.toLowerCase()!="select"&&obj.length<2)
return false;var sel=new Array();for(i=obj.length-1;i>-1;i--){if(obj[i].selected==true){sel[sel.length]=i;}}
for(i=0;i<sel.length;i++){if(sel[i]!=obj.length-1&&!obj[sel[i]+1].selected){var tmp=new Array(obj[sel[i]+1].text,obj[sel[i]+1].value);obj[sel[i]+1].text=obj[sel[i]].text;obj[sel[i]+1].value=obj[sel[i]].value;obj[sel[i]].text=tmp[0];obj[sel[i]].value=tmp[1];obj[sel[i]+1].selected=true;obj[sel[i]].selected=false;}}
object_refs[left_name]=left_td.getElementsByTagName('select')[0];object_refs[right_name]=right_td.getElementsByTagName('select')[0];this.orderCallback(object_refs[left_name],object_refs[right_name]);return false;}};}();SUGAR.language=function(){return{languages:new Array(),setLanguage:function(module,data){if(!SUGAR.language.languages){}
SUGAR.language.languages[module]=data;},get:function(module,str){if(typeof SUGAR.language.languages[module]=='undefined'||typeof SUGAR.language.languages[module][str]=='undefined')
{return'undefined';}
return SUGAR.language.languages[module][str];},translate:function(module,str)
{text=this.get(module,str);return text!='undefined'?text:this.get('app_strings',str);}}}();SUGAR.contextMenu=function(){return{objects:new Object(),objectTypes:new Object(),registerObject:function(objectType,id,metaData){SUGAR.contextMenu.objects[id]=new Object();SUGAR.contextMenu.objects[id]={'objectType':objectType,'metaData':metaData};},registerObjectType:function(name,menuItems){SUGAR.contextMenu.objectTypes[name]=new Object();SUGAR.contextMenu.objectTypes[name]={'menuItems':menuItems,'objects':new Array()};},getListItemFromEventTarget:function(p_oNode){var oLI;if(p_oNode.tagName=="LI"){oLI=p_oNode;}
else{do{if(p_oNode.tagName=="LI"){oLI=p_oNode;break;}}while((p_oNode=p_oNode.parentNode));}
return oLI;},onContextMenuMove:function(){var oNode=this.contextEventTarget;var bDisabled=(oNode.tagName=="UL");var i=this.getItemGroups()[0].length-1;do{this.getItem(i).cfg.setProperty("disabled",bDisabled);}
while(i--);},onContextMenuItemClick:function(p_sType,p_aArguments,p_oItem){var oLI=SUGAR.contextMenu.getListItemFromEventTarget(this.parent.contextEventTarget);id=this.parent.contextEventTarget.parentNode.id;funct=eval(SUGAR.contextMenu.objectTypes[SUGAR.contextMenu.objects[id]['objectType']]['menuItems'][this.index]['action']);funct(this.parent.contextEventTarget,SUGAR.contextMenu.objects[id]['metaData']);},init:function(){for(var i in SUGAR.contextMenu.objects){if(typeof SUGAR.contextMenu.objectTypes[SUGAR.contextMenu.objects[i]['objectType']]['objects']=='undefined')
SUGAR.contextMenu.objectTypes[SUGAR.contextMenu.objects[i]['objectType']]['objects']=new Array();SUGAR.contextMenu.objectTypes[SUGAR.contextMenu.objects[i]['objectType']]['objects'].push(document.getElementById(i));}
for(var i in SUGAR.contextMenu.objectTypes){var oContextMenu=new YAHOO.widget.ContextMenu(i,{'trigger':SUGAR.contextMenu.objectTypes[i]['objects']});var aMainMenuItems=SUGAR.contextMenu.objectTypes[i]['menuItems'];var nMainMenuItems=aMainMenuItems.length;var oMenuItem;for(var j=0;j<nMainMenuItems;j++){oMenuItem=new YAHOO.widget.ContextMenuItem(aMainMenuItems[j].text,{helptext:aMainMenuItems[j].helptext});oMenuItem.clickEvent.subscribe(SUGAR.contextMenu.onContextMenuItemClick,oMenuItem,true);oContextMenu.addItem(oMenuItem);}
oContextMenu.moveEvent.subscribe(SUGAR.contextMenu.onContextMenuMove,oContextMenu,true);oContextMenu.keyDownEvent.subscribe(SUGAR.contextMenu.onContextMenuItemClick,oContextMenu,true);oContextMenu.render(document.body);}}};}();SUGAR.contextMenu.actions=function(){return{createNote:function(itemClicked,metaData){loc='index.php?module=Notes&action=EditView';for(i in metaData){if(i=='notes_parent_type')loc+='&parent_type='+metaData[i];else if(i!='module'&&i!='parent_type')loc+='&'+i+'='+metaData[i];}
document.location=loc;},scheduleMeeting:function(itemClicked,metaData){loc='index.php?module=Meetings&action=EditView';for(i in metaData){if(i!='module')loc+='&'+i+'='+metaData[i];}
document.location=loc;},scheduleCall:function(itemClicked,metaData){loc='index.php?module=Calls&action=EditView';for(i in metaData){if(i!='module')loc+='&'+i+'='+metaData[i];}
document.location=loc;},createContact:function(itemClicked,metaData){loc='index.php?module=Contacts&action=EditView';for(i in metaData){if(i!='module')loc+='&'+i+'='+metaData[i];}
document.location=loc;},createTask:function(itemClicked,metaData){loc='index.php?module=Tasks&action=EditView';for(i in metaData){if(i!='module')loc+='&'+i+'='+metaData[i];}
document.location=loc;},createOpportunity:function(itemClicked,metaData){loc='index.php?module=Opportunities&action=EditView';for(i in metaData){if(i!='module')loc+='&'+i+'='+metaData[i];}
document.location=loc;},createCase:function(itemClicked,metaData){loc='index.php?module=Cases&action=EditView';for(i in metaData){if(i!='module')loc+='&'+i+'='+metaData[i];}
document.location=loc;},addToFavorites:function(itemClicked,metaData){success=function(data){}
var cObj=YAHOO.util.Connect.asyncRequest('GET','index.php?to_pdf=true&module=Home&action=AddToFavorites&target_id='+metaData['id']+'&target_module='+metaData['module'],{success:success,failure:success});}};}();var popup_request_data;var close_popup;function get_popup_request_data()
{return window.document.popup_request_data;}
function get_close_popup()
{return window.document.close_popup;}
function open_popup(module_name,width,height,initial_filter,close_popup,hide_clear_button,popup_request_data,popup_mode,create,metadata)
{if(typeof(popupCount)=="undefined"||popupCount==0)
popupCount=1;window.document.popup_request_data=popup_request_data;window.document.close_popup=close_popup;width=(width==600)?800:width;height=(height==400)?800:height;URL='index.php?'
+'module='+module_name
+'&action=Popup';if(initial_filter!='')
{URL+='&query=true'+initial_filter;}
if(hide_clear_button)
{URL+='&hide_clear_button=true';}
windowName=module_name+'_popup_window'+popupCount;popupCount++;windowFeatures='width='+width
+',height='+height
+',resizable=1,scrollbars=1';if(popup_mode==''&&popup_mode=='undefined'){popup_mode='single';}
URL+='&mode='+popup_mode;if(create==''&&create=='undefined'){create='false';}
URL+='&create='+create;if(metadata!=''&&metadata!='undefined'){URL+='&metadata='+metadata;}
win=window.open(URL,windowName,windowFeatures);if(window.focus)
{win.focus();}
win.popupCount=popupCount;return win;}
var from_popup_return=false;function set_return_basic(popup_reply_data,filter)
{var form_name=popup_reply_data.form_name;var name_to_value_array=popup_reply_data.name_to_value_array;for(var the_key in name_to_value_array)
{if(the_key=='toJSON')
{}
else if(the_key.match(filter))
{var displayValue=name_to_value_array[the_key].replace(/&amp;/gi,'&').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/&#039;/gi,'\'').replace(/&quot;/gi,'"');;if(window.document.forms[form_name]&&window.document.forms[form_name].elements[the_key]){if(window.document.forms[form_name].elements[the_key].tagName=='SELECT'){var selectField=window.document.forms[form_name].elements[the_key];for(var i=0;i<selectField.options.length;i++){if(selectField.options[i].text==displayValue){selectField.options[i].selected=true;break;}}}else{window.document.forms[form_name].elements[the_key].value=displayValue;}}}}}
function set_return(popup_reply_data)
{from_popup_return=true;var form_name=popup_reply_data.form_name;var name_to_value_array=popup_reply_data.name_to_value_array;if(typeof name_to_value_array!='undefined'&&name_to_value_array['account_id'])
{var label_str='';var label_data_str='';var current_label_data_str='';for(var the_key in name_to_value_array)
{if(the_key=='toJSON')
{}
else
{var displayValue=name_to_value_array[the_key].replace(/&amp;/gi,'&').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/&#039;/gi,'\'').replace(/&quot;/gi,'"');if(window.document.forms[form_name]&&document.getElementById(the_key+'_label')&&!the_key.match(/account/)){var data_label=document.getElementById(the_key+'_label').innerHTML.replace(/\n/gi,'');label_str+=data_label+' \n';label_data_str+=data_label+' '+displayValue+'\n';if(window.document.forms[form_name].elements[the_key]){current_label_data_str+=data_label+' '+window.document.forms[form_name].elements[the_key].value+'\n';}}}}
if(label_data_str!=label_str&&current_label_data_str!=label_str){if(confirm(SUGAR.language.get('app_strings','NTC_OVERWRITE_ADDRESS_PHONE_CONFIRM')+'\n\n'+label_data_str))
{set_return_basic(popup_reply_data,/\S/);}else{set_return_basic(popup_reply_data,/account/);}}else if(label_data_str!=label_str&&current_label_data_str==label_str){set_return_basic(popup_reply_data,/\S/);}else if(label_data_str==label_str){set_return_basic(popup_reply_data,/account/);}}else{set_return_basic(popup_reply_data,/\S/);}}
function set_return_and_save(popup_reply_data)
{var form_name=popup_reply_data.form_name;var name_to_value_array=popup_reply_data.name_to_value_array;for(var the_key in name_to_value_array)
{if(the_key=='toJSON')
{}
else
{window.document.forms[form_name].elements[the_key].value=name_to_value_array[the_key];}}
window.document.forms[form_name].return_module.value=window.document.forms[form_name].module.value;window.document.forms[form_name].return_action.value='DetailView';window.document.forms[form_name].return_id.value=window.document.forms[form_name].record.value;window.document.forms[form_name].action.value='Save';window.document.forms[form_name].submit();}
function get_initial_filter_by_account(form_name)
{var account_id=window.document.forms[form_name].account_id.value;var account_name=escape(window.document.forms[form_name].account_name.value);var initial_filter="&account_id="+account_id+"&account_name="+account_name;return initial_filter;}
function copyAddress(form,fromKey,toKey){var elems=new Array("address_street","address_city","address_state","address_postalcode","address_country");var checkbox=document.getElementById(toKey+"_checkbox");if(typeof checkbox!="undefined"){if(!checkbox.checked){for(x in elems){t=toKey+"_"+elems[x];document.getElementById(t).removeAttribute('readonly');}}else{for(x in elems){f=fromKey+"_"+elems[x];t=toKey+"_"+elems[x];document.getElementById(t).value=document.getElementById(f).value;document.getElementById(t).setAttribute('readonly',true);}}}
return true;}
function check_deletable_EmailTemplate(){id=document.getElementsByName('record')[0].value;currentForm=document.getElementById('form');var call_back={success:function(r){if(r.responseText=='true'){if(!confirm(SUGAR.language.get('app_strings','NTC_TEMPLATE_IS_USED'))){return false;}}else{if(!confirm(SUGAR.language.get('app_strings','NTC_DELETE_CONFIRMATION'))){return false;}}
currentForm.return_module.value='EmailTemplates';currentForm.return_action.value='ListView';currentForm.action.value='Delete';currentForm.submit();}};url="index.php?module=EmailTemplates&action=CheckDeletable&from=DetailView&to_pdf=1&record="+id;YAHOO.util.Connect.asyncRequest('POST',url,call_back,null);}
SUGAR.image={remove_upload_imagefile:function(field_name){var field=document.getElementById('remove_imagefile_'+field_name);field.value=1;var field=document.getElementById(field_name);field.style.display="";var field=document.getElementById('img_'+field_name);field.style.display="none";var field=document.getElementById('bt_remove_'+field_name);field.style.display="none";if(document.getElementById(field_name+'_duplicate')){var field=document.getElementById(field_name+'_duplicate');field.value="";}},confirm_imagefile:function(field_name){var field=document.getElementById(field_name);var filename=field.value;var fileExtension=filename.substring(filename.lastIndexOf(".")+1);fileExtension=fileExtension.toLowerCase();if(fileExtension=="jpg"||fileExtension=="jpeg"||fileExtension=="gif"||fileExtension=="png"||fileExtension=="bmp"){}
else{field.value=null;alert(SUGAR.language.get('app_strings','LBL_UPLOAD_IMAGE_FILE_INVALID'));}},lightbox:function(image)
{if(typeof(SUGAR.image.lighboxWindow)=="undefined")
SUGAR.image.lighboxWindow=new YAHOO.widget.SimpleDialog('sugarImageViewer',{type:'message',modal:true,id:'sugarMsgWindow',close:true,title:"Alert",msg:"<img src='"+image+"'> </img>",buttons:[]});SUGAR.image.lighboxWindow.setBody("<img src='"+image+"'> </img>");SUGAR.image.lighboxWindow.render(document.body);SUGAR.image.lighboxWindow.show();SUGAR.image.lighboxWindow.center()}}
SUGAR.util.isTouchScreen=function()
{if(Get_Cookie("touchscreen")=='1'){return true;}
if((navigator.userAgent.match(/iPad/i)!=null)){return true;}
return false;}
SUGAR.util.isLoginPage=function(content)
{if(SUGAR.util.isPackageManager()){return false;}
var loginPageStart="<!DOCTYPE";if(content.substr(0,loginPageStart.length)==loginPageStart&&content.indexOf("<html>")!=-1&&content.indexOf("login_module")!=-1){window.location.href=window.location.protocol+window.location.pathname;return true;}}
SUGAR.util.isPackageManager=function(){if(typeof(document.the_form)!='undefined'&&typeof(document.the_form.language_pack_escaped)!='undefined'){return true;}else{return false;}}
SUGAR.util.ajaxCallInProgress=function(){return SUGAR_callsInProgress!=0;}
SUGAR.util.callOnChangeListers=function(field){var listeners=YAHOO.util.Event.getListeners(field,'change');if(listeners!=null){for(var i=0;i<listeners.length;i++){var l=listeners[i];l.fn.call(l.scope?l.scope:this,l.obj);}}}
SUGAR.util.closeActivityPanel={show:function(module,id,new_status,viewType,parentContainerId){if(SUGAR.util.closeActivityPanel.panel)
SUGAR.util.closeActivityPanel.panel.destroy();var singleModule=SUGAR.language.get("app_list_strings","moduleListSingular")[module];singleModule=typeof(singleModule!='undefined')?singleModule.toLowerCase():'';var closeText=SUGAR.language.get("app_strings","LBL_CLOSE_ACTIVITY_CONFIRM").replace("#module#",singleModule);SUGAR.util.closeActivityPanel.panel=new YAHOO.widget.SimpleDialog("closeActivityDialog",{width:"300px",fixedcenter:true,visible:false,draggable:false,close:true,text:closeText,constraintoviewport:true,buttons:[{text:SUGAR.language.get("app_strings","LBL_EMAIL_OK"),handler:function(){if(SUGAR.util.closeActivityPanel.panel)
SUGAR.util.closeActivityPanel.panel.hide();ajaxStatus.showStatus(SUGAR.language.get('app_strings','LBL_SAVING'));var args="action=save&id="+id+"&status="+new_status+"&module="+module;var callback={success:function(o)
{window.location.reload(true);},argument:{'parentContainerId':parentContainerId}};YAHOO.util.Connect.asyncRequest('POST','index.php',callback,args);},isDefault:true},{text:SUGAR.language.get("app_strings","LBL_EMAIL_CANCEL"),handler:function(){SUGAR.util.closeActivityPanel.panel.hide();}}]});SUGAR.util.closeActivityPanel.panel.setHeader(SUGAR.language.get("app_strings","LBL_CLOSE_ACTIVITY_HEADER"));SUGAR.util.closeActivityPanel.panel.render(document.body);SUGAR.util.closeActivityPanel.panel.show();}}// End of File include/javascript/sugar_3.js
                                
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
function Get_Cookie(name){var start=document.cookie.indexOf(name+'=');var len=start+name.length+1;if((!start)&&(name!=document.cookie.substring(0,name.length)))
return null;if(start==-1)
return null;var end=document.cookie.indexOf(';',len);if(end==-1)end=document.cookie.length;if(end==start){return'';}
return unescape(document.cookie.substring(len,end));}
function Set_Cookie(name,value,expires,path,domain,secure)
{var today=new Date();today.setTime(today.getTime());if(expires)
{expires=expires*1000*60*60*24;}
var expires_date=new Date(today.getTime()+(expires));document.cookie=name+"="+escape(value)+
((expires)?";expires="+expires_date.toGMTString():"")+
((path)?";path="+path:"")+
((domain)?";domain="+domain:"")+
((secure)?";secure":"");}
function Delete_Cookie(name,path,domain){if(Get_Cookie(name))
document.cookie=name+'='+
((path)?';path='+path:'')+
((domain)?';domain='+domain:'')+';expires=Thu, 01-Jan-1970 00:00:01 GMT';}
function get_sub_cookies(cookie){var cookies=new Array();var end='';if(cookie&&cookie!=''){end=cookie.indexOf('#')
while(end>-1){var cur=cookie.substring(0,end);cookie=cookie.substring(end+1,cookie.length);var name=cur.substring(0,cur.indexOf('='));var value=cur.substring(cur.indexOf('=')+1,cur.length);cookies[name]=value;end=cookie.indexOf('#')}}
return cookies;}
function subs_to_cookie(cookies){var cookie='';for(var i in cookies)
{if(typeof(cookies[i])!="function"){cookie+=i+'='+cookies[i]+'#';}}
return cookie;}// End of File include/javascript/cookie.js
                                
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
var menuStack=new Array();var hiddenElmStack=new Array();var currentMenu=null;var closeMenusDelay=null;var openMenusDelay=null;var delayTime=75;function eraseTimeout(tId){window.clearTimeout(tId);return null;}
function tbButtonMouseOverOrig(id){closeMenusDelay=eraseTimeout(closeMenusDelay);var menuName=id.replace(/Handle/i,'Menu');var menu=getLayer(menuName);if(currentMenu){closeAllMenus();}
popupMenu(id,menu);}
function tbButtonMouseOver(id,top,left,leftOffset){closeMenusDelay=eraseTimeout(closeMenusDelay);if(openMenusDelay==null){openMenusDelay=window.setTimeout("showMenu('"+id+"','"+top+"','"+left+"','"+leftOffset+"')",delayTime);}}
function showMenu(id,top,left,leftOffset){openMenusDelay=eraseTimeout(openMenusDelay);var menuName=id.replace(/Handle/i,'Menu');var menu=getLayer(menuName);if(currentMenu){closeAllMenus();}
popupMenu(id,menu,top,left,leftOffset);}
function showSubMenu(id){closeMenusDelay=eraseTimeout(closeMenusDelay);var menuName=id.replace(/Handle/i,'Menu');var menu=getLayer(menuName);popupSubMenu(id,menu);}
function popupMenu(handleID,menu,top,left,leftOffset){var bw=checkBrowserWidth();var menuName=handleID.replace(/Handle/i,'Menu');var menuWidth=120;var imgWidth=document.getElementById(handleID).width;if(menu){var menuHandle=getLayer(handleID);var p=menuHandle;if(left==""){var left=0;while(p&&p.tagName.toUpperCase()!='BODY'){left+=p.offsetLeft;p=p.offsetParent;}
left+=parseInt(leftOffset);}
if(left+menuWidth>bw){left=left-menuWidth+imgWidth;}
setMenuVisible(menu,left,top,false);}}
function popupSubMenu(handleID,menu){if(menu){var menuHandle=getLayer(handleID);var p=menuHandle;var top=0,left=p.offsetWidth;while(p&&p.tagName.toUpperCase()!='BODY'){top+=p.offsetTop;left+=p.offsetLeft;p=p.offsetParent;}
if(is.ie&&is.mac){top-=3;left-=10;}
setMenuVisible(menu,left,top,true);}}
function closeMenusOrig(){if(currentMenu){setMenuVisibility(currentMenu,false);}}
function closeSubMenus(handle){closeMenusDelay=eraseTimeout(closeMenusDelay);if(menuStack.length>0){for(var i=menuStack.length-1;i>=0;i--){var menu=menuStack[menuStack.length-1];if(menu.id==handle.getAttribute('parentid')){currentMenu=menu;break;}else{closeMenu(menu);menuPop();}}}}
function closeMenu(menu){setMenuVisibility(menu,false);}
function closeMenusOrig(){if(menuStack.length>0){for(var i=menuStack.length-1;i>=0;i--){var menu=menuPop();closeMenu(menu);}}
currentMenu=null;}
function closeMenus(){if(closeMenusDelay==null){closeMenusDelay=window.setTimeout("closeAllMenus()",delayTime);}}
function closeAllMenus(){closeMenusDelay=eraseTimeout(closeMenusDelay);if(menuStack.length>0){for(var i=menuStack.length-1;i>=0;i--){var menu=menuPop();closeMenu(menu);}}
currentMenu=null;}
function setMenuVisible(menu,x,y,isSubMenu){if(menu){if(isSubMenu){if(menu.getAttribute('parentid')==currentMenu.getAttribute('parentid')){menuPop();setMenuVisibility(currentMenu,false);}}else{menuPop();setMenuVisibility(currentMenu,false);}
currentMenu=menu;menuPush(menu);setMenuVisibility(menu,true,x,y);}}
function getLayer(layerid){return document.getElementById(layerid);}
function setMenuVisibility(menu,on,x,y){var parent=menu;if(menu){setLayer(menu.id,!on,x,y);if(is.ie){if(!on){if(!menu.getAttribute('parentid')){showElement("SELECT");}}else{hideElement("SELECT",x,y,menu.offsetWidth,menu.offsetHeight);}}}}
function menuPop(){if(is.ie&&(is.mac||!is.ie5_5up)){var menu=menuStack[menuStack.length-1];var newMenuStack=new Array();for(var i=0;i<menuStack.length-1;i++){newMenuStack[newMenuStack.length]=menuStack[i];}
menuStack=newMenuStack;return menu;}else{return menuStack.pop();}}
function menuPush(menu){if(is.ie&&(is.mac||!is.ie5_5up)){menuStack[menuStack.length]=menu;}else{menuStack.push(menu);}}
function checkBrowserWidth(){var windowWidth;if(is.ie){windowWidth=document.body.clientWidth;}else{windowWidth=window.innerWidth-16;}
if(windowWidth>=1000){showSB('sbContent',true,'sb');}else{showSB('sbContent',false,'sb');}
return windowWidth;}
function showSB(id,hideit,imgIdPrefix){setLayer(id,!hideit,-1,-1);setLayer(imgIdPrefix+'On',!hideit,-1,-1);setLayer(imgIdPrefix+'Off',hideit,-1,-1);}
function setLayer(id,hidden,x,y){var layer=getLayer(id);setLayerElm(layer,hidden,x,y);}
function setLayerElm(layer,hideit,x,y){if(layer&&layer.style){if(hideit){layer.style.visibility='hidden';}else{layer.style.display='block';layer.style.visibility='visible';}
if(x>=0&&x!=""){layer.style.left=x+'px';}
if(y>=0&&y!=""){layer.style.top=y+'px';}}}
function hiliteItem(menuItem,changeClass){closeMenusDelay=eraseTimeout(closeMenusDelay);if(changeClass=='yes'){if(menuItem.getAttribute('avid')=='false'){menuItem.className='menuItemHiliteX';}else{menuItem.className='menuItemHilite';}}}
function unhiliteItem(menuItem){closeMenusDelay=eraseTimeout(closeMenusDelay);if(menuItem.getAttribute('avid')=='false'){menuItem.className='menuItemX';}else{menuItem.className='menuItem';}}
function showElement(elmID){for(i=0;i<document.getElementsByTagName(elmID).length;i++){obj=document.getElementsByTagName(elmID)[i];if(!obj||!obj.offsetParent)
continue;obj.style.visibility="";}}
function showElementNew(elmID){if(hiddenElmStack.length>0){for(var i=hiddenElmStack.length-1;i>=0;i--){var obj=hiddenElmStack[hiddenElmStack.length-1];obj.style.visibility="";;hiddenElmStack.pop();}}}
function hideElement(elmID,x,y,w,h){for(i=0;i<document.getElementsByTagName(elmID).length;i++){obj=document.getElementsByTagName(elmID)[i];if(!obj||!obj.offsetParent)
continue;objLeft=obj.offsetLeft;objTop=obj.offsetTop;objParent=obj.offsetParent;while(objParent.tagName.toUpperCase()!="BODY"){objLeft+=objParent.offsetLeft;objTop+=objParent.offsetTop;if(objParent.offsetParent==null)
break;else
objParent=objParent.offsetParent;}
objTop=objTop-y;if(x>(objLeft+obj.offsetWidth)||objLeft>(x+w));else if(objTop>h);else if((y+h)<=80);else{obj.style.visibility="hidden";}}}
function Is(){var agt=navigator.userAgent.toLowerCase();this.major=parseInt(navigator.appVersion);this.minor=parseFloat(navigator.appVersion);this.nav=((agt.indexOf('mozilla')!=-1)&&(agt.indexOf('spoofer')==-1)&&(agt.indexOf('compatible')==-1)&&(agt.indexOf('opera')==-1)&&(agt.indexOf('webtv')==-1)&&(agt.indexOf('hotjava')==-1));this.nav2=(this.nav&&(this.major==2));this.nav3=(this.nav&&(this.major==3));this.nav4=(this.nav&&(this.major==4));this.nav4up=(this.nav&&(this.major>=4));this.navonly=(this.nav&&((agt.indexOf(";nav")!=-1)||(agt.indexOf("; nav")!=-1)));this.nav6=(this.nav&&(this.major==5));this.nav6up=(this.nav&&(this.major>=5));this.gecko=(agt.indexOf('gecko')!=-1);this.nav7=(this.gecko&&(this.major>=5)&&(agt.indexOf('netscape/7')!=-1));this.moz1=false;this.moz1up=false;this.moz1_1=false;this.moz1_1up=false;if(this.nav6up){myRegEx=new RegExp("rv:\\d*.\\d*.\\d*");myFind=myRegEx.exec(agt);if(myFind!=null){var strVersion=myFind.toString();strVersion=strVersion.replace(/rv:/,'');var arrVersion=strVersion.split('.');var major=parseInt(arrVersion[0]);var minor=parseInt(arrVersion[1]);if(arrVersion[2])var revision=parseInt(arrVersion[2]);this.moz1=((major==1)&&(minor==0));this.moz1up=((major==1)&&(minor>=0));this.moz1_1=((major==1)&&(minor==1));this.moz1_1up=((major==1)&&(minor>=1));}}
this.ie=((agt.indexOf("msie")!=-1)&&(agt.indexOf("opera")==-1));this.ie3=(this.ie&&(this.major<4));this.ie4=(this.ie&&(this.major==4)&&(agt.indexOf("msie 4")!=-1));this.ie4up=(this.ie&&(this.major>=4));this.ie5=(this.ie&&(this.major==4)&&(agt.indexOf("msie 5.0")!=-1));this.ie5_5=(this.ie&&(this.major==4)&&(agt.indexOf("msie 5.5")!=-1));this.ie5up=(this.ie&&!this.ie3&&!this.ie4);this.ie5_5up=(this.ie&&!this.ie3&&!this.ie4&&!this.ie5);this.ie6=(this.ie&&(this.major==4)&&(agt.indexOf("msie 6.")!=-1));this.ie6up=(this.ie&&!this.ie3&&!this.ie4&&!this.ie5&&!this.ie5_5);this.mac=(agt.indexOf("mac")!=-1);}
function runPageLoadItems(){var myVar;checkBrowserWidth();}
var is=new Is();if(is.ie){document.write('<style type="text/css">');document.write('body {font-size: x-small;}');document.write('</style>');}// End of File include/javascript/menu.js
                                
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
Calendar=function(){};Calendar.setup=function(params){YAHOO.util.Event.onDOMReady(function(){var Event=YAHOO.util.Event;var Dom=YAHOO.util.Dom;var dialog;var calendar;var showButton=params.button?params.button:params.buttonObj;var userDateFormat=params.ifFormat?params.ifFormat:(params.daFormat?params.daFormat:"m/d/Y");var inputField=params.inputField?params.inputField:params.inputFieldObj;var dateFormat=userDateFormat.substr(0,10);var date_field_delimiter=/([-.\\/])/.exec(dateFormat)[0];dateFormat=dateFormat.replace(/[^a-zA-Z]/g,'');var monthPos=dateFormat.search(/m/);var dayPos=dateFormat.search(/d/);var yearPos=dateFormat.search(/Y/);Event.on(Dom.get(showButton),"click",function(){if(!dialog){dialog=new YAHOO.widget.SimpleDialog("container_"+showButton,{visible:false,context:[showButton,"tl","bl"],buttons:[],draggable:false,close:true,zIndex:1000});dialog.setHeader(SUGAR.language.get('app_strings','LBL_MASSUPDATE_DATE'));dialog.setBody('<div id="'+showButton+'_div"></div>');dialog.render(document.body);dialog.showEvent.subscribe(function(){if(YAHOO.env.ua.ie){dialog.fireEvent("changeContent");}});Event.on(document,"click",function(e){if(!dialog)
{return;}
var el=Event.getTarget(e);var dialogEl=dialog.element;if(el!=dialogEl&&!Dom.isAncestor(dialogEl,el)&&el!=Dom.get(showButton)&&!Dom.isAncestor(Dom.get(showButton),el)){dialog.hide();calendar=null;dialog=null;}});}
if(!calendar){var navConfig={strings:{month:SUGAR.language.get('app_strings','LBL_CHOOSE_MONTH'),year:SUGAR.language.get('app_strings','LBL_ENTER_YEAR'),submit:SUGAR.language.get('app_strings','LBL_EMAIL_OK'),cancel:SUGAR.language.get('app_strings','LBL_CANCEL_BUTTON_LABEL'),invalidYear:SUGAR.language.get('app_strings','LBL_ENTER_VALID_YEAR')},monthFormat:YAHOO.widget.Calendar.SHORT,initialFocus:"year"};calendar=new YAHOO.widget.Calendar(showButton+'_div',{iframe:false,hide_blank_weeks:true,navigator:navConfig});calendar.cfg.setProperty('DATE_FIELD_DELIMITER',date_field_delimiter);calendar.cfg.setProperty('MDY_DAY_POSITION',dayPos+1);calendar.cfg.setProperty('MDY_MONTH_POSITION',monthPos+1);calendar.cfg.setProperty('MDY_YEAR_POSITION',yearPos+1);if(typeof SUGAR.language.languages['app_list_strings']!='undefined'&&SUGAR.language.languages['app_list_strings']['dom_cal_month_long']!='undefined')
{if(SUGAR.language.languages['app_list_strings']['dom_cal_month_long'].length==13)
{SUGAR.language.languages['app_list_strings']['dom_cal_month_long'].shift();}
calendar.cfg.setProperty('MONTHS_LONG',SUGAR.language.languages['app_list_strings']['dom_cal_month_long']);}
if(typeof SUGAR.language.languages['app_list_strings']!='undefined'&&typeof SUGAR.language.languages['app_list_strings']['dom_cal_day_short']!='undefined')
{if(SUGAR.language.languages['app_list_strings']['dom_cal_day_short'].length==8)
{SUGAR.language.languages['app_list_strings']['dom_cal_day_short'].shift();}
calendar.cfg.setProperty('WEEKDAYS_SHORT',SUGAR.language.languages['app_list_strings']['dom_cal_day_short']);}
calendar.selectEvent.subscribe(function(){var input=Dom.get(inputField);if(calendar.getSelectedDates().length>0){var selDate=calendar.getSelectedDates()[0];var monthVal=selDate.getMonth()+1;if(monthVal<10)
{monthVal='0'+monthVal;}
var dateVal=selDate.getDate();if(dateVal<10)
{dateVal='0'+dateVal;}
var yearVal=selDate.getFullYear();selDate='';if(monthPos==0){selDate=monthVal;}else if(dayPos==0){selDate=dateVal;}else{selDate=yearVal;}
if(monthPos==1){selDate+=date_field_delimiter+monthVal;}else if(dayPos==1){selDate+=date_field_delimiter+dateVal;}else{selDate+=date_field_delimiter+yearVal;}
if(monthPos==2){selDate+=date_field_delimiter+monthVal;}else if(dayPos==2){selDate+=date_field_delimiter+dateVal;}else{selDate+=date_field_delimiter+yearVal;}
input.value=selDate;if(params.comboObject)
{params.comboObject.update();}}else{input.value="";}
dialog.hide();SUGAR.util.callOnChangeListers(input);});calendar.renderEvent.subscribe(function(){dialog.fireEvent("changeContent");});}
var seldate=calendar.getSelectedDates();if(Dom.get(inputField).value.length>0){val=new Date(Dom.get(inputField).value);if(!isNaN(val.getTime()))
{calendar.cfg.setProperty("selected",Dom.get(inputField).value);seldate=Dom.get(inputField).value.split(date_field_delimiter);calendar.cfg.setProperty("pagedate",seldate[monthPos]+calendar.cfg.getProperty("DATE_FIELD_DELIMITER")+seldate[yearPos]);}}else if(seldate.length>0){calendar.cfg.setProperty("selected",seldate[0]);var month=seldate[0].getMonth()+1;var year=seldate[0].getFullYear();calendar.cfg.setProperty("pagedate",month+calendar.cfg.getProperty("DATE_FIELD_DELIMITER")+year);}
calendar.render();dialog.show();});});};// End of File include/javascript/calendar.js
                                

JSON=YAHOO.lang.JSON;SUGAR.quickCompose={};SUGAR.quickCompose=function(){return{parentPanel:null,dceMenuPanel:null,options:null,loadingMessgPanl:null,frameLoaded:false,resourcesLoaded:false,tinyLoaded:false,initComposePackage:function(c)
{SUGAR.email2.addressBook.initFixForDatatableSort();SUGAR.quickCompose.resourcesLoaded=true;var callback={success:function(o)
{var responseData=YAHOO.lang.JSON.parse(o.responseText);var scriptTag=document.createElement('script');scriptTag.id='quickComposeScript';scriptTag.setAttribute('type','text/javascript');if(YAHOO.env.ua.ie>0)
scriptTag.text=responseData.jsData;else
scriptTag.appendChild(document.createTextNode(responseData.jsData));document.getElementsByTagName("head")[0].appendChild(scriptTag);var divTag=document.createElement("div");divTag.innerHTML=responseData.divData;divTag.id='quickCompose';YAHOO.util.Dom.insertBefore(divTag,'footer');SUGAR.quickCompose.frameLoaded=true;SUGAR.quickCompose.initUI(c.data);}}
if(!SUGAR.quickCompose.frameLoaded)
YAHOO.util.Connect.asyncRequest('GET','index.php?entryPoint=GenerateQuickComposeFrame',callback,null);else
SUGAR.quickCompose.initUI(c.data);},initUI:function(options)
{var SQ=SUGAR.quickCompose;this.options=options;loadingMessgPanl.hide();dce_mode=(typeof this.dceMenuPanel!='undefined'&&this.dceMenuPanel!=null)?true:false;if(SQ.parentPanel!=null)
{tinyMCE.execCommand('mceRemoveControl',false,SUGAR.email2.tinyInstances.currentHtmleditor);SUGAR.email2.tinyInstances[SUGAR.email2.tinyInstances.currentHtmleditor]=null;SUGAR.email2.tinyInstances.currentHtmleditor="";SQ.parentPanel.destroy();SQ.parentPanel=null;}
theme=SUGAR.themes.theme_name;var idx=0;if(!SE.composeLayout.composeTemplate)
SE.composeLayout.composeTemplate=new YAHOO.SUGAR.Template(SE.templates['compose']);panel_modal=dce_mode?false:true;panel_width='880px';panel_constrain=dce_mode?false:true;panel_height=dce_mode?'450px':'400px';panel_shadow=dce_mode?false:true;panel_draggable=dce_mode?false:true;panel_resize=dce_mode?false:true;panel_close=dce_mode?false:true;SQ.parentPanel=new YAHOO.widget.Panel("container1",{modal:panel_modal,visible:true,constraintoviewport:panel_constrain,width:panel_width,height:panel_height,shadow:panel_shadow,draggable:panel_draggable,resize:panel_resize,close:panel_close});if(!dce_mode){SQ.parentPanel.setHeader(SUGAR.language.get('app_strings','LBL_EMAIL_QUICK_COMPOSE'));}
SQ.parentPanel.setBody("<div class='email'><div id='htmleditordiv"+idx+"'></div></div>");var composePanel=SE.composeLayout.getQuickComposeLayout(SQ.parentPanel,this.options);if(!dce_mode){var resize=new YAHOO.util.Resize('container1',{handles:['br'],autoRatio:false,minWidth:400,minHeight:350,status:false});resize.on('resize',function(args){var panelHeight=args.height;this.cfg.setProperty("height",panelHeight+"px");var layout=SE.composeLayout[SE.composeLayout.currentInstanceId];layout.set("height",panelHeight-50);layout.resize(true);SE.composeLayout.resizeEditor(SE.composeLayout.currentInstanceId);},SQ.parentPanel,true);}
YAHOO.util.Dom.setStyle("container1","z-index",1);if(!SQ.tinyLoaded)
{tinymce.dom.Event.domLoaded=true;tinyMCE.init({convert_urls:false,theme_advanced_toolbar_align:tinyConfig.theme_advanced_toolbar_align,width:tinyConfig.width,theme:tinyConfig.theme,theme_advanced_toolbar_location:tinyConfig.theme_advanced_toolbar_location,theme_advanced_buttons1:tinyConfig.theme_advanced_buttons1,theme_advanced_buttons2:tinyConfig.theme_advanced_buttons2,theme_advanced_buttons3:tinyConfig.theme_advanced_buttons3,plugins:tinyConfig.plugins,elements:tinyConfig.elements,language:tinyConfig.language,extended_valid_elements:tinyConfig.extended_valid_elements,mode:tinyConfig.mode,strict_loading_mode:true});SQ.tinyLoaded=true;}
SQ.parentPanel.show();SUGAR.email2.composeLayout.forceCloseCompose=function(o){SUGAR.quickCompose.parentPanel.hide();}
if(!dce_mode){SQ.parentPanel.center();}},init:function(o){if(typeof o.menu_id!='undefined'){this.dceMenuPanel=o.menu_id;}else{this.dceMenuPanel=null;}
loadingMessgPanl=new YAHOO.widget.SimpleDialog('loading',{width:'200px',close:true,modal:true,visible:true,fixedcenter:true,constraintoviewport:true,draggable:false});loadingMessgPanl.setHeader(SUGAR.language.get('app_strings','LBL_EMAIL_PERFORMING_TASK'));loadingMessgPanl.setBody(SUGAR.language.get('app_strings','LBL_EMAIL_ONE_MOMENT'));loadingMessgPanl.render(document.body);loadingMessgPanl.show();if(!SUGAR.quickCompose.resourcesLoaded)
this.loadResources(o);else
this.initUI(o);},loadResources:function(o)
{window.skipTinyMCEInitPhase=true;var require=["layout","element","tabview","menu","cookie","tinymce","securejson","sugarwidgets","sugarquickcompose","sugarquickcomposecss"];var loader=new YAHOO.util.YUILoader({require:require,loadOptional:true,skin:{base:'blank',defaultSkin:''},data:o,onSuccess:this.initComposePackage,allowRollup:true,base:"include/javascript/yui/build/"});loader.addModule({name:"tinymce",type:"js",varName:"TinyMCE",fullpath:"include/javascript/tiny_mce/tiny_mce.js"});loader.addModule({name:"securejson",type:"js",varName:"JSON",fullpath:"include/JSON.js"});loader.addModule({name:"sugarwidgets",type:"js",fullpath:"include/javascript/sugarwidgets/SugarYUIWidgets.js",varName:"YAHOO.SUGAR",requires:["datatable","dragdrop","treeview","tabview"]});loader.addModule({name:"sugarquickcompose",type:"js",varName:"SUGAR.email2.complexLayout",requires:["layout","sugarwidgets","tinymce"],fullpath:"include/javascript/sugar_grp_quickcomp.js"});loader.addModule({name:"sugarquickcomposecss",type:"css",fullpath:"modules/Emails/EmailUI.css"});loader.insert();}};}();// End of File include/javascript/quickCompose.js
                                
/*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
if(typeof YAHOO=="undefined"||!YAHOO){var YAHOO={};}YAHOO.namespace=function(){var A=arguments,E=null,C,B,D;for(C=0;C<A.length;C=C+1){D=(""+A[C]).split(".");E=YAHOO;for(B=(D[0]=="YAHOO")?1:0;B<D.length;B=B+1){E[D[B]]=E[D[B]]||{};E=E[D[B]];}}return E;};YAHOO.log=function(D,A,C){var B=YAHOO.widget.Logger;if(B&&B.log){return B.log(D,A,C);}else{return false;}};YAHOO.register=function(A,E,D){var I=YAHOO.env.modules,B,H,G,F,C;if(!I[A]){I[A]={versions:[],builds:[]};}B=I[A];H=D.version;G=D.build;F=YAHOO.env.listeners;B.name=A;B.version=H;B.build=G;B.versions.push(H);B.builds.push(G);B.mainClass=E;for(C=0;C<F.length;C=C+1){F[C](B);}if(E){E.VERSION=H;E.BUILD=G;}else{YAHOO.log("mainClass is undefined for module "+A,"warn");}};YAHOO.env=YAHOO.env||{modules:[],listeners:[]};YAHOO.env.getVersion=function(A){return YAHOO.env.modules[A]||null;};YAHOO.env.ua=function(){var D=function(H){var I=0;return parseFloat(H.replace(/\./g,function(){return(I++==1)?"":".";}));},G=navigator,F={ie:0,opera:0,gecko:0,webkit:0,mobile:null,air:0,caja:G.cajaVersion,secure:false,os:null},C=navigator&&navigator.userAgent,E=window&&window.location,B=E&&E.href,A;F.secure=B&&(B.toLowerCase().indexOf("https")===0);if(C){if((/windows|win32/i).test(C)){F.os="windows";}else{if((/macintosh/i).test(C)){F.os="macintosh";}}if((/KHTML/).test(C)){F.webkit=1;}A=C.match(/AppleWebKit\/([^\s]*)/);if(A&&A[1]){F.webkit=D(A[1]);if(/ Mobile\//.test(C)){F.mobile="Apple";}else{A=C.match(/NokiaN[^\/]*/);if(A){F.mobile=A[0];}}A=C.match(/AdobeAIR\/([^\s]*)/);if(A){F.air=A[0];}}if(!F.webkit){A=C.match(/Opera[\s\/]([^\s]*)/);if(A&&A[1]){F.opera=D(A[1]);A=C.match(/Opera Mini[^;]*/);if(A){F.mobile=A[0];}}else{A=C.match(/MSIE\s([^;]*)/);if(A&&A[1]){F.ie=D(A[1]);}else{A=C.match(/Gecko\/([^\s]*)/);if(A){F.gecko=1;A=C.match(/rv:([^\s\)]*)/);if(A&&A[1]){F.gecko=D(A[1]);}}}}}}return F;}();(function(){YAHOO.namespace("util","widget","example");if("undefined"!==typeof YAHOO_config){var B=YAHOO_config.listener,A=YAHOO.env.listeners,D=true,C;if(B){for(C=0;C<A.length;C++){if(A[C]==B){D=false;break;}}if(D){A.push(B);}}}})();YAHOO.lang=YAHOO.lang||{};(function(){var B=YAHOO.lang,A=Object.prototype,H="[object Array]",C="[object Function]",G="[object Object]",E=[],F=["toString","valueOf"],D={isArray:function(I){return A.toString.apply(I)===H;},isBoolean:function(I){return typeof I==="boolean";},isFunction:function(I){return(typeof I==="function")||A.toString.apply(I)===C;},isNull:function(I){return I===null;},isNumber:function(I){return typeof I==="number"&&isFinite(I);},isObject:function(I){return(I&&(typeof I==="object"||B.isFunction(I)))||false;},isString:function(I){return typeof I==="string";},isUndefined:function(I){return typeof I==="undefined";},_IEEnumFix:(YAHOO.env.ua.ie)?function(K,J){var I,M,L;for(I=0;I<F.length;I=I+1){M=F[I];L=J[M];if(B.isFunction(L)&&L!=A[M]){K[M]=L;}}}:function(){},extend:function(L,M,K){if(!M||!L){throw new Error("extend failed, please check that "+"all dependencies are included.");}var J=function(){},I;J.prototype=M.prototype;L.prototype=new J();L.prototype.constructor=L;L.superclass=M.prototype;if(M.prototype.constructor==A.constructor){M.prototype.constructor=M;}if(K){for(I in K){if(B.hasOwnProperty(K,I)){L.prototype[I]=K[I];}}B._IEEnumFix(L.prototype,K);}},augmentObject:function(M,L){if(!L||!M){throw new Error("Absorb failed, verify dependencies.");}var I=arguments,K,N,J=I[2];if(J&&J!==true){for(K=2;K<I.length;K=K+1){M[I[K]]=L[I[K]];}}else{for(N in L){if(J||!(N in M)){M[N]=L[N];}}B._IEEnumFix(M,L);}},augmentProto:function(L,K){if(!K||!L){throw new Error("Augment failed, verify dependencies.");}var I=[L.prototype,K.prototype],J;for(J=2;J<arguments.length;J=J+1){I.push(arguments[J]);}B.augmentObject.apply(this,I);},dump:function(I,N){var K,M,P=[],Q="{...}",J="f(){...}",O=", ",L=" => ";if(!B.isObject(I)){return I+"";}else{if(I instanceof Date||("nodeType" in I&&"tagName" in I)){return I;}else{if(B.isFunction(I)){return J;}}}N=(B.isNumber(N))?N:3;if(B.isArray(I)){P.push("[");for(K=0,M=I.length;K<M;K=K+1){if(B.isObject(I[K])){P.push((N>0)?B.dump(I[K],N-1):Q);}else{P.push(I[K]);}P.push(O);}if(P.length>1){P.pop();}P.push("]");}else{P.push("{");for(K in I){if(B.hasOwnProperty(I,K)){P.push(K+L);if(B.isObject(I[K])){P.push((N>0)?B.dump(I[K],N-1):Q);}else{P.push(I[K]);}P.push(O);}}if(P.length>1){P.pop();}P.push("}");}return P.join("");},substitute:function(Y,J,R){var N,M,L,U,V,X,T=[],K,O="dump",S=" ",I="{",W="}",Q,P;for(;;){N=Y.lastIndexOf(I);if(N<0){break;}M=Y.indexOf(W,N);if(N+1>=M){break;}K=Y.substring(N+1,M);U=K;X=null;L=U.indexOf(S);if(L>-1){X=U.substring(L+1);U=U.substring(0,L);}V=J[U];if(R){V=R(U,V,X);}if(B.isObject(V)){if(B.isArray(V)){V=B.dump(V,parseInt(X,10));}else{X=X||"";Q=X.indexOf(O);if(Q>-1){X=X.substring(4);}P=V.toString();if(P===G||Q>-1){V=B.dump(V,parseInt(X,10));}else{V=P;}}}else{if(!B.isString(V)&&!B.isNumber(V)){V="~-"+T.length+"-~";T[T.length]=K;}}Y=Y.substring(0,N)+V+Y.substring(M+1);}for(N=T.length-1;N>=0;N=N-1){Y=Y.replace(new RegExp("~-"+N+"-~"),"{"+T[N]+"}","g");}return Y;},trim:function(I){try{return I.replace(/^\s+|\s+$/g,"");}catch(J){return I;}},merge:function(){var L={},J=arguments,I=J.length,K;for(K=0;K<I;K=K+1){B.augmentObject(L,J[K],true);}return L;},later:function(P,J,Q,L,M){P=P||0;J=J||{};var K=Q,O=L,N,I;if(B.isString(Q)){K=J[Q];}if(!K){throw new TypeError("method undefined");}if(O&&!B.isArray(O)){O=[L];}N=function(){K.apply(J,O||E);};I=(M)?setInterval(N,P):setTimeout(N,P);return{interval:M,cancel:function(){if(this.interval){clearInterval(I);}else{clearTimeout(I);}}};},isValue:function(I){return(B.isObject(I)||B.isString(I)||B.isNumber(I)||B.isBoolean(I));}};B.hasOwnProperty=(A.hasOwnProperty)?function(I,J){return I&&I.hasOwnProperty(J);}:function(I,J){return !B.isUndefined(I[J])&&I.constructor.prototype[J]!==I[J];};D.augmentObject(B,D,true);YAHOO.util.Lang=B;B.augment=B.augmentProto;YAHOO.augment=B.augmentProto;YAHOO.extend=B.extend;})();YAHOO.register("yahoo",YAHOO,{version:"2.8.0r4",build:"2449"});
YAHOO.util.Get=function(){var M={},L=0,R=0,E=false,N=YAHOO.env.ua,S=YAHOO.lang;var J=function(W,T,X){var U=X||window,Y=U.document,Z=Y.createElement(W);for(var V in T){if(T[V]&&YAHOO.lang.hasOwnProperty(T,V)){Z.setAttribute(V,T[V]);}}return Z;};var I=function(U,V,T){var W={id:"yui__dyn_"+(R++),type:"text/css",rel:"stylesheet",href:U};if(T){S.augmentObject(W,T);}return J("link",W,V);};var P=function(U,V,T){var W={id:"yui__dyn_"+(R++),type:"text/javascript",src:U};if(T){S.augmentObject(W,T);}return J("script",W,V);};var A=function(T,U){return{tId:T.tId,win:T.win,data:T.data,nodes:T.nodes,msg:U,purge:function(){D(this.tId);}};};var B=function(T,W){var U=M[W],V=(S.isString(T))?U.win.document.getElementById(T):T;if(!V){Q(W,"target node not found: "+T);}return V;};var Q=function(W,V){var T=M[W];if(T.onFailure){var U=T.scope||T.win;T.onFailure.call(U,A(T,V));}};var C=function(W){var T=M[W];T.finished=true;if(T.aborted){var V="transaction "+W+" was aborted";Q(W,V);return;}if(T.onSuccess){var U=T.scope||T.win;T.onSuccess.call(U,A(T));}};var O=function(V){var T=M[V];if(T.onTimeout){var U=T.scope||T;T.onTimeout.call(U,A(T));}};var G=function(V,Z){var U=M[V];if(U.timer){U.timer.cancel();}if(U.aborted){var X="transaction "+V+" was aborted";Q(V,X);return;}if(Z){U.url.shift();if(U.varName){U.varName.shift();}}else{U.url=(S.isString(U.url))?[U.url]:U.url;if(U.varName){U.varName=(S.isString(U.varName))?[U.varName]:U.varName;}}var c=U.win,b=c.document,a=b.getElementsByTagName("head")[0],W;if(U.url.length===0){if(U.type==="script"&&N.webkit&&N.webkit<420&&!U.finalpass&&!U.varName){var Y=P(null,U.win,U.attributes);Y.innerHTML='YAHOO.util.Get._finalize("'+V+'");';U.nodes.push(Y);a.appendChild(Y);}else{C(V);}return;}var T=U.url[0];if(!T){U.url.shift();return G(V);}if(U.timeout){U.timer=S.later(U.timeout,U,O,V);}if(U.type==="script"){W=P(T,c,U.attributes);}else{W=I(T,c,U.attributes);}F(U.type,W,V,T,c,U.url.length);U.nodes.push(W);if(U.insertBefore){var e=B(U.insertBefore,V);if(e){e.parentNode.insertBefore(W,e);}}else{a.appendChild(W);}if((N.webkit||N.gecko)&&U.type==="css"){G(V,T);}};var K=function(){if(E){return;}E=true;for(var T in M){var U=M[T];if(U.autopurge&&U.finished){D(U.tId);delete M[T];}}E=false;};var D=function(Z){if(M[Z]){var T=M[Z],U=T.nodes,X=U.length,c=T.win.document,a=c.getElementsByTagName("head")[0],V,Y,W,b;if(T.insertBefore){V=B(T.insertBefore,Z);if(V){a=V.parentNode;}}for(Y=0;Y<X;Y=Y+1){W=U[Y];if(W.clearAttributes){W.clearAttributes();}else{for(b in W){delete W[b];}}a.removeChild(W);}T.nodes=[];}};var H=function(U,T,V){var X="q"+(L++);V=V||{};if(L%YAHOO.util.Get.PURGE_THRESH===0){K();}M[X]=S.merge(V,{tId:X,type:U,url:T,finished:false,aborted:false,nodes:[]});var W=M[X];W.win=W.win||window;W.scope=W.scope||W.win;W.autopurge=("autopurge" in W)?W.autopurge:(U==="script")?true:false;if(V.charset){W.attributes=W.attributes||{};W.attributes.charset=V.charset;}S.later(0,W,G,X);return{tId:X};};var F=function(c,X,W,U,Y,Z,b){var a=b||G;if(N.ie){X.onreadystatechange=function(){var d=this.readyState;if("loaded"===d||"complete"===d){X.onreadystatechange=null;a(W,U);}};}else{if(N.webkit){if(c==="script"){if(N.webkit>=420){X.addEventListener("load",function(){a(W,U);});}else{var T=M[W];if(T.varName){var V=YAHOO.util.Get.POLL_FREQ;T.maxattempts=YAHOO.util.Get.TIMEOUT/V;T.attempts=0;T._cache=T.varName[0].split(".");T.timer=S.later(V,T,function(j){var f=this._cache,e=f.length,d=this.win,g;for(g=0;g<e;g=g+1){d=d[f[g]];if(!d){this.attempts++;if(this.attempts++>this.maxattempts){var h="Over retry limit, giving up";T.timer.cancel();Q(W,h);}else{}return;}}T.timer.cancel();a(W,U);},null,true);}else{S.later(YAHOO.util.Get.POLL_FREQ,null,a,[W,U]);}}}}else{X.onload=function(){a(W,U);};}}};return{POLL_FREQ:10,PURGE_THRESH:20,TIMEOUT:2000,_finalize:function(T){S.later(0,null,C,T);},abort:function(U){var V=(S.isString(U))?U:U.tId;var T=M[V];if(T){T.aborted=true;}},script:function(T,U){return H("script",T,U);},css:function(T,U){return H("css",T,U);}};}();YAHOO.register("get",YAHOO.util.Get,{version:"2.8.0r4",build:"2449"});(function(){var Y=YAHOO,util=Y.util,lang=Y.lang,env=Y.env,PROV="_provides",SUPER="_supersedes",REQ="expanded",AFTER="_after";var YUI={dupsAllowed:{"yahoo":true,"get":true},info:{"root":"2.8.0r4/build/","base":"http://yui.yahooapis.com/2.8.0r4/build/","comboBase":"http://yui.yahooapis.com/combo?","skin":{"defaultSkin":"sam","base":"assets/skins/","path":"skin.css","after":["reset","fonts","grids","base"],"rollup":3},dupsAllowed:["yahoo","get"],"moduleInfo":{"animation":{"type":"js","path":"animation/animation-min.js","requires":["dom","event"]},"autocomplete":{"type":"js","path":"autocomplete/autocomplete-min.js","requires":["dom","event","datasource"],"optional":["connection","animation"],"skinnable":true},"base":{"type":"css","path":"base/base-min.css","after":["reset","fonts","grids"]},"button":{"type":"js","path":"button/button-min.js","requires":["element"],"optional":["menu"],"skinnable":true},"calendar":{"type":"js","path":"calendar/calendar-min.js","requires":["event","dom"],supersedes:["datemeth"],"skinnable":true},"carousel":{"type":"js","path":"carousel/carousel-min.js","requires":["element"],"optional":["animation"],"skinnable":true},"charts":{"type":"js","path":"charts/charts-min.js","requires":["element","json","datasource","swf"]},"colorpicker":{"type":"js","path":"colorpicker/colorpicker-min.js","requires":["slider","element"],"optional":["animation"],"skinnable":true},"connection":{"type":"js","path":"connection/connection-min.js","requires":["event"],"supersedes":["connectioncore"]},"connectioncore":{"type":"js","path":"connection/connection_core-min.js","requires":["event"],"pkg":"connection"},"container":{"type":"js","path":"container/container-min.js","requires":["dom","event"],"optional":["dragdrop","animation","connection"],"supersedes":["containercore"],"skinnable":true},"containercore":{"type":"js","path":"container/container_core-min.js","requires":["dom","event"],"pkg":"container"},"cookie":{"type":"js","path":"cookie/cookie-min.js","requires":["yahoo"]},"datasource":{"type":"js","path":"datasource/datasource-min.js","requires":["event"],"optional":["connection"]},"datatable":{"type":"js","path":"datatable/datatable-min.js","requires":["element","datasource"],"optional":["calendar","dragdrop","paginator"],"skinnable":true},datemath:{"type":"js","path":"datemath/datemath-min.js","requires":["yahoo"]},"dom":{"type":"js","path":"dom/dom-min.js","requires":["yahoo"]},"dragdrop":{"type":"js","path":"dragdrop/dragdrop-min.js","requires":["dom","event"]},"editor":{"type":"js","path":"editor/editor-min.js","requires":["menu","element","button"],"optional":["animation","dragdrop"],"supersedes":["simpleeditor"],"skinnable":true},"element":{"type":"js","path":"element/element-min.js","requires":["dom","event"],"optional":["event-mouseenter","event-delegate"]},"element-delegate":{"type":"js","path":"element-delegate/element-delegate-min.js","requires":["element"]},"event":{"type":"js","path":"event/event-min.js","requires":["yahoo"]},"event-simulate":{"type":"js","path":"event-simulate/event-simulate-min.js","requires":["event"]},"event-delegate":{"type":"js","path":"event-delegate/event-delegate-min.js","requires":["event"],"optional":["selector"]},"event-mouseenter":{"type":"js","path":"event-mouseenter/event-mouseenter-min.js","requires":["dom","event"]},"fonts":{"type":"css","path":"fonts/fonts-min.css"},"get":{"type":"js","path":"get/get-min.js","requires":["yahoo"]},"grids":{"type":"css","path":"grids/grids-min.css","requires":["fonts"],"optional":["reset"]},"history":{"type":"js","path":"history/history-min.js","requires":["event"]},"imagecropper":{"type":"js","path":"imagecropper/imagecropper-min.js","requires":["dragdrop","element","resize"],"skinnable":true},"imageloader":{"type":"js","path":"imageloader/imageloader-min.js","requires":["event","dom"]},"json":{"type":"js","path":"json/json-min.js","requires":["yahoo"]},"layout":{"type":"js","path":"layout/layout-min.js","requires":["element"],"optional":["animation","dragdrop","resize","selector"],"skinnable":true},"logger":{"type":"js","path":"logger/logger-min.js","requires":["event","dom"],"optional":["dragdrop"],"skinnable":true},"menu":{"type":"js","path":"menu/menu-min.js","requires":["containercore"],"skinnable":true},"paginator":{"type":"js","path":"paginator/paginator-min.js","requires":["element"],"skinnable":true},"profiler":{"type":"js","path":"profiler/profiler-min.js","requires":["yahoo"]},"profilerviewer":{"type":"js","path":"profilerviewer/profilerviewer-min.js","requires":["profiler","yuiloader","element"],"skinnable":true},"progressbar":{"type":"js","path":"progressbar/progressbar-min.js","requires":["element"],"optional":["animation"],"skinnable":true},"reset":{"type":"css","path":"reset/reset-min.css"},"reset-fonts-grids":{"type":"css","path":"reset-fonts-grids/reset-fonts-grids.css","supersedes":["reset","fonts","grids","reset-fonts"],"rollup":4},"reset-fonts":{"type":"css","path":"reset-fonts/reset-fonts.css","supersedes":["reset","fonts"],"rollup":2},"resize":{"type":"js","path":"resize/resize-min.js","requires":["dragdrop","element"],"optional":["animation"],"skinnable":true},"selector":{"type":"js","path":"selector/selector-min.js","requires":["yahoo","dom"]},"simpleeditor":{"type":"js","path":"editor/simpleeditor-min.js","requires":["element"],"optional":["containercore","menu","button","animation","dragdrop"],"skinnable":true,"pkg":"editor"},"slider":{"type":"js","path":"slider/slider-min.js","requires":["dragdrop"],"optional":["animation"],"skinnable":true},"storage":{"type":"js","path":"storage/storage-min.js","requires":["yahoo","event","cookie"],"optional":["swfstore"]},"stylesheet":{"type":"js","path":"stylesheet/stylesheet-min.js","requires":["yahoo"]},"swf":{"type":"js","path":"swf/swf-min.js","requires":["element"],"supersedes":["swfdetect"]},"swfdetect":{"type":"js","path":"swfdetect/swfdetect-min.js","requires":["yahoo"]},"swfstore":{"type":"js","path":"swfstore/swfstore-min.js","requires":["element","cookie","swf"]},"tabview":{"type":"js","path":"tabview/tabview-min.js","requires":["element"],"optional":["connection"],"skinnable":true},"treeview":{"type":"js","path":"treeview/treeview-min.js","requires":["event","dom"],"optional":["json","animation","calendar"],"skinnable":true},"uploader":{"type":"js","path":"uploader/uploader-min.js","requires":["element"]},"utilities":{"type":"js","path":"utilities/utilities.js","supersedes":["yahoo","event","dragdrop","animation","dom","connection","element","yahoo-dom-event","get","yuiloader","yuiloader-dom-event"],"rollup":8},"yahoo":{"type":"js","path":"yahoo/yahoo-min.js"},"yahoo-dom-event":{"type":"js","path":"yahoo-dom-event/yahoo-dom-event.js","supersedes":["yahoo","event","dom"],"rollup":3},"yuiloader":{"type":"js","path":"yuiloader/yuiloader-min.js","supersedes":["yahoo","get"]},"yuiloader-dom-event":{"type":"js","path":"yuiloader-dom-event/yuiloader-dom-event.js","supersedes":["yahoo","dom","event","get","yuiloader","yahoo-dom-event"],"rollup":5},"yuitest":{"type":"js","path":"yuitest/yuitest-min.js","requires":["logger"],"optional":["event-simulate"],"skinnable":true}}},ObjectUtil:{appendArray:function(o,a){if(a){for(var i=0;
i<a.length;i=i+1){o[a[i]]=true;}}},keys:function(o,ordered){var a=[],i;for(i in o){if(lang.hasOwnProperty(o,i)){a.push(i);}}return a;}},ArrayUtil:{appendArray:function(a1,a2){Array.prototype.push.apply(a1,a2);},indexOf:function(a,val){for(var i=0;i<a.length;i=i+1){if(a[i]===val){return i;}}return -1;},toObject:function(a){var o={};for(var i=0;i<a.length;i=i+1){o[a[i]]=true;}return o;},uniq:function(a){return YUI.ObjectUtil.keys(YUI.ArrayUtil.toObject(a));}}};YAHOO.util.YUILoader=function(o){this._internalCallback=null;this._useYahooListener=false;this.onSuccess=null;this.onFailure=Y.log;this.onProgress=null;this.onTimeout=null;this.scope=this;this.data=null;this.insertBefore=null;this.charset=null;this.varName=null;this.base=YUI.info.base;this.comboBase=YUI.info.comboBase;this.combine=false;this.root=YUI.info.root;this.timeout=0;this.ignore=null;this.force=null;this.allowRollup=true;this.filter=null;this.required={};this.moduleInfo=lang.merge(YUI.info.moduleInfo);this.rollups=null;this.loadOptional=false;this.sorted=[];this.loaded={};this.dirty=true;this.inserted={};var self=this;env.listeners.push(function(m){if(self._useYahooListener){self.loadNext(m.name);}});this.skin=lang.merge(YUI.info.skin);this._config(o);};Y.util.YUILoader.prototype={FILTERS:{RAW:{"searchExp":"-min\\.js","replaceStr":".js"},DEBUG:{"searchExp":"-min\\.js","replaceStr":"-debug.js"}},SKIN_PREFIX:"skin-",_config:function(o){if(o){for(var i in o){if(lang.hasOwnProperty(o,i)){if(i=="require"){this.require(o[i]);}else{this[i]=o[i];}}}}var f=this.filter;if(lang.isString(f)){f=f.toUpperCase();if(f==="DEBUG"){this.require("logger");}if(!Y.widget.LogWriter){Y.widget.LogWriter=function(){return Y;};}this.filter=this.FILTERS[f];}},addModule:function(o){if(!o||!o.name||!o.type||(!o.path&&!o.fullpath)){return false;}o.ext=("ext" in o)?o.ext:true;o.requires=o.requires||[];this.moduleInfo[o.name]=o;this.dirty=true;return true;},require:function(what){var a=(typeof what==="string")?arguments:what;this.dirty=true;YUI.ObjectUtil.appendArray(this.required,a);},_addSkin:function(skin,mod){var name=this.formatSkin(skin),info=this.moduleInfo,sinf=this.skin,ext=info[mod]&&info[mod].ext;if(!info[name]){this.addModule({"name":name,"type":"css","path":sinf.base+skin+"/"+sinf.path,"after":sinf.after,"rollup":sinf.rollup,"ext":ext});}if(mod){name=this.formatSkin(skin,mod);if(!info[name]){var mdef=info[mod],pkg=mdef.pkg||mod;this.addModule({"name":name,"type":"css","after":sinf.after,"path":pkg+"/"+sinf.base+skin+"/"+mod+".css","ext":ext});}}return name;},getRequires:function(mod){if(!mod){return[];}if(!this.dirty&&mod.expanded){return mod.expanded;}mod.requires=mod.requires||[];var i,d=[],r=mod.requires,o=mod.optional,info=this.moduleInfo,m;for(i=0;i<r.length;i=i+1){d.push(r[i]);m=info[r[i]];YUI.ArrayUtil.appendArray(d,this.getRequires(m));}if(o&&this.loadOptional){for(i=0;i<o.length;i=i+1){d.push(o[i]);YUI.ArrayUtil.appendArray(d,this.getRequires(info[o[i]]));}}mod.expanded=YUI.ArrayUtil.uniq(d);return mod.expanded;},getProvides:function(name,notMe){var addMe=!(notMe),ckey=(addMe)?PROV:SUPER,m=this.moduleInfo[name],o={};if(!m){return o;}if(m[ckey]){return m[ckey];}var s=m.supersedes,done={},me=this;var add=function(mm){if(!done[mm]){done[mm]=true;lang.augmentObject(o,me.getProvides(mm));}};if(s){for(var i=0;i<s.length;i=i+1){add(s[i]);}}m[SUPER]=o;m[PROV]=lang.merge(o);m[PROV][name]=true;return m[ckey];},calculate:function(o){if(o||this.dirty){this._config(o);this._setup();this._explode();if(this.allowRollup){this._rollup();}this._reduce();this._sort();this.dirty=false;}},_setup:function(){var info=this.moduleInfo,name,i,j;for(name in info){if(lang.hasOwnProperty(info,name)){var m=info[name];if(m&&m.skinnable){var o=this.skin.overrides,smod;if(o&&o[name]){for(i=0;i<o[name].length;i=i+1){smod=this._addSkin(o[name][i],name);}}else{smod=this._addSkin(this.skin.defaultSkin,name);}m.requires.push(smod);}}}var l=lang.merge(this.inserted);if(!this._sandbox){l=lang.merge(l,env.modules);}if(this.ignore){YUI.ObjectUtil.appendArray(l,this.ignore);}if(this.force){for(i=0;i<this.force.length;i=i+1){if(this.force[i] in l){delete l[this.force[i]];}}}for(j in l){if(lang.hasOwnProperty(l,j)){lang.augmentObject(l,this.getProvides(j));}}this.loaded=l;},_explode:function(){var r=this.required,i,mod;for(i in r){if(lang.hasOwnProperty(r,i)){mod=this.moduleInfo[i];if(mod){var req=this.getRequires(mod);if(req){YUI.ObjectUtil.appendArray(r,req);}}}}},_skin:function(){},formatSkin:function(skin,mod){var s=this.SKIN_PREFIX+skin;if(mod){s=s+"-"+mod;}return s;},parseSkin:function(mod){if(mod.indexOf(this.SKIN_PREFIX)===0){var a=mod.split("-");return{skin:a[1],module:a[2]};}return null;},_rollup:function(){var i,j,m,s,rollups={},r=this.required,roll,info=this.moduleInfo;if(this.dirty||!this.rollups){for(i in info){if(lang.hasOwnProperty(info,i)){m=info[i];if(m&&m.rollup){rollups[i]=m;}}}this.rollups=rollups;}for(;;){var rolled=false;for(i in rollups){if(!r[i]&&!this.loaded[i]){m=info[i];s=m.supersedes;roll=false;if(!m.rollup){continue;}var skin=(m.ext)?false:this.parseSkin(i),c=0;if(skin){for(j in r){if(lang.hasOwnProperty(r,j)){if(i!==j&&this.parseSkin(j)){c++;roll=(c>=m.rollup);if(roll){break;}}}}}else{for(j=0;j<s.length;j=j+1){if(this.loaded[s[j]]&&(!YUI.dupsAllowed[s[j]])){roll=false;break;}else{if(r[s[j]]){c++;roll=(c>=m.rollup);if(roll){break;}}}}}if(roll){r[i]=true;rolled=true;this.getRequires(m);}}}if(!rolled){break;}}},_reduce:function(){var i,j,s,m,r=this.required;for(i in r){if(i in this.loaded){delete r[i];}else{var skinDef=this.parseSkin(i);if(skinDef){if(!skinDef.module){var skin_pre=this.SKIN_PREFIX+skinDef.skin;for(j in r){if(lang.hasOwnProperty(r,j)){m=this.moduleInfo[j];var ext=m&&m.ext;if(!ext&&j!==i&&j.indexOf(skin_pre)>-1){delete r[j];}}}}}else{m=this.moduleInfo[i];s=m&&m.supersedes;if(s){for(j=0;j<s.length;j=j+1){if(s[j] in r){delete r[s[j]];}}}}}}},_onFailure:function(msg){YAHOO.log("Failure","info","loader");var f=this.onFailure;if(f){f.call(this.scope,{msg:"failure: "+msg,data:this.data,success:false});
}},_onTimeout:function(){YAHOO.log("Timeout","info","loader");var f=this.onTimeout;if(f){f.call(this.scope,{msg:"timeout",data:this.data,success:false});}},_sort:function(){var s=[],info=this.moduleInfo,loaded=this.loaded,checkOptional=!this.loadOptional,me=this;var requires=function(aa,bb){var mm=info[aa];if(loaded[bb]||!mm){return false;}var ii,rr=mm.expanded,after=mm.after,other=info[bb],optional=mm.optional;if(rr&&YUI.ArrayUtil.indexOf(rr,bb)>-1){return true;}if(after&&YUI.ArrayUtil.indexOf(after,bb)>-1){return true;}if(checkOptional&&optional&&YUI.ArrayUtil.indexOf(optional,bb)>-1){return true;}var ss=info[bb]&&info[bb].supersedes;if(ss){for(ii=0;ii<ss.length;ii=ii+1){if(requires(aa,ss[ii])){return true;}}}if(mm.ext&&mm.type=="css"&&!other.ext&&other.type=="css"){return true;}return false;};for(var i in this.required){if(lang.hasOwnProperty(this.required,i)){s.push(i);}}var p=0;for(;;){var l=s.length,a,b,j,k,moved=false;for(j=p;j<l;j=j+1){a=s[j];for(k=j+1;k<l;k=k+1){if(requires(a,s[k])){b=s.splice(k,1);s.splice(j,0,b[0]);moved=true;break;}}if(moved){break;}else{p=p+1;}}if(!moved){break;}}this.sorted=s;},toString:function(){var o={type:"YUILoader",base:this.base,filter:this.filter,required:this.required,loaded:this.loaded,inserted:this.inserted};lang.dump(o,1);},_combine:function(){this._combining=[];var self=this,s=this.sorted,len=s.length,js=this.comboBase,css=this.comboBase,target,startLen=js.length,i,m,type=this.loadType;YAHOO.log("type "+type);for(i=0;i<len;i=i+1){m=this.moduleInfo[s[i]];if(m&&!m.ext&&(!type||type===m.type)){target=this.root+m.path;target+="&";if(m.type=="js"){js+=target;}else{css+=target;}this._combining.push(s[i]);}}if(this._combining.length){YAHOO.log("Attempting to combine: "+this._combining,"info","loader");var callback=function(o){var c=this._combining,len=c.length,i,m;for(i=0;i<len;i=i+1){this.inserted[c[i]]=true;}this.loadNext(o.data);},loadScript=function(){if(js.length>startLen){YAHOO.util.Get.script(self._filter(js),{data:self._loading,onSuccess:callback,onFailure:self._onFailure,onTimeout:self._onTimeout,insertBefore:self.insertBefore,charset:self.charset,timeout:self.timeout,scope:self});}};if(css.length>startLen){YAHOO.util.Get.css(this._filter(css),{data:this._loading,onSuccess:loadScript,onFailure:this._onFailure,onTimeout:this._onTimeout,insertBefore:this.insertBefore,charset:this.charset,timeout:this.timeout,scope:self});}else{loadScript();}return;}else{this.loadNext(this._loading);}},insert:function(o,type){this.calculate(o);this._loading=true;this.loadType=type;if(this.combine){return this._combine();}if(!type){var self=this;this._internalCallback=function(){self._internalCallback=null;self.insert(null,"js");};this.insert(null,"css");return;}this.loadNext();},sandbox:function(o,type){this._config(o);if(!this.onSuccess){throw new Error("You must supply an onSuccess handler for your sandbox");}this._sandbox=true;var self=this;if(!type||type!=="js"){this._internalCallback=function(){self._internalCallback=null;self.sandbox(null,"js");};this.insert(null,"css");return;}if(!util.Connect){var ld=new YAHOO.util.YUILoader();ld.insert({base:this.base,filter:this.filter,require:"connection",insertBefore:this.insertBefore,charset:this.charset,onSuccess:function(){this.sandbox(null,"js");},scope:this},"js");return;}this._scriptText=[];this._loadCount=0;this._stopCount=this.sorted.length;this._xhr=[];this.calculate();var s=this.sorted,l=s.length,i,m,url;for(i=0;i<l;i=i+1){m=this.moduleInfo[s[i]];if(!m){this._onFailure("undefined module "+m);for(var j=0;j<this._xhr.length;j=j+1){this._xhr[j].abort();}return;}if(m.type!=="js"){this._loadCount++;continue;}url=m.fullpath;url=(url)?this._filter(url):this._url(m.path);var xhrData={success:function(o){var idx=o.argument[0],name=o.argument[2];this._scriptText[idx]=o.responseText;if(this.onProgress){this.onProgress.call(this.scope,{name:name,scriptText:o.responseText,xhrResponse:o,data:this.data});}this._loadCount++;if(this._loadCount>=this._stopCount){var v=this.varName||"YAHOO";var t="(function() {\n";var b="\nreturn "+v+";\n})();";var ref=eval(t+this._scriptText.join("\n")+b);this._pushEvents(ref);if(ref){this.onSuccess.call(this.scope,{reference:ref,data:this.data});}else{this._onFailure.call(this.varName+" reference failure");}}},failure:function(o){this.onFailure.call(this.scope,{msg:"XHR failure",xhrResponse:o,data:this.data});},scope:this,argument:[i,url,s[i]]};this._xhr.push(util.Connect.asyncRequest("GET",url,xhrData));}},loadNext:function(mname){if(!this._loading){return;}if(mname){if(mname!==this._loading){return;}this.inserted[mname]=true;if(this.onProgress){this.onProgress.call(this.scope,{name:mname,data:this.data});}}var s=this.sorted,len=s.length,i,m;for(i=0;i<len;i=i+1){if(s[i] in this.inserted){continue;}if(s[i]===this._loading){return;}m=this.moduleInfo[s[i]];if(!m){this.onFailure.call(this.scope,{msg:"undefined module "+m,data:this.data});return;}if(!this.loadType||this.loadType===m.type){this._loading=s[i];var fn=(m.type==="css")?util.Get.css:util.Get.script,url=m.fullpath,self=this,c=function(o){self.loadNext(o.data);};url=(url)?this._filter(url):this._url(m.path);if(env.ua.webkit&&env.ua.webkit<420&&m.type==="js"&&!m.varName){c=null;this._useYahooListener=true;}fn(url,{data:s[i],onSuccess:c,onFailure:this._onFailure,onTimeout:this._onTimeout,insertBefore:this.insertBefore,charset:this.charset,timeout:this.timeout,varName:m.varName,scope:self});return;}}this._loading=null;if(this._internalCallback){var f=this._internalCallback;this._internalCallback=null;f.call(this);}else{if(this.onSuccess){this._pushEvents();this.onSuccess.call(this.scope,{data:this.data});}}},_pushEvents:function(ref){var r=ref||YAHOO;if(r.util&&r.util.Event){r.util.Event._load();}},_filter:function(str){var f=this.filter;return(f)?str.replace(new RegExp(f.searchExp,"g"),f.replaceStr):str;},_url:function(path){return this._filter((this.base||"")+path);}};})();YAHOO.register("yuiloader",YAHOO.util.YUILoader,{version:"2.8.0r4",build:"2449"});
// End of File include/javascript/yui/build/yuiloader/yuiloader-min.js
                                
