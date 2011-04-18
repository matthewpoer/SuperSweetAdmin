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

var req;
var target;
var flexContentOld = "";
var forcePreview = false;
var inCompose = false;

/* globals for Callback functions */
var email; // AjaxObject.showEmailPreview
var ieId;
var ieName;
var focusFolder;
var meta; // AjaxObject.showEmailPreview
var sendType;
var targetDiv;
var urlBase = 'index.php';
var urlStandard = 'sugar_body_only=true&to_pdf=true&module=Emails&action=EmailUIAjax';

var lazyLoadFolder = null;// End of File modules/Emails/javascript/vars.js
                                
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
if(typeof(SUGAR.collection)=="undefined"){SUGAR.collection=function(form_name,field_name,module,popupData){this.more_status=false;this.form=form_name;this.field=field_name;this.field_element_name=this.form+'_'+this.field;this.module=module;this.fields_count=0;this.extra_fields_count=0;this.first=true;this.primary_field="";this.cloneField=new Array();this.sqs_clone="";this.secondaries_values=new Array();this.update_fields=new Object();this.show_more_image=true;};SUGAR.collection.prototype={remove:function(num){var radio_els=this.get_radios();var div_el;if(radio_els.length==1){div_el=document.getElementById(this.field_element_name+'_input_div_'+num);var input_els=div_el.getElementsByTagName('input');input_els[0].value='';input_els[1].value='';if(this.primary_field){div_el=document.getElementById(this.field_element_name+'_radio_div_'+num);radio_els=div_el.getElementsByTagName('input');radio_els[0].checked=false;}}else{div_el=document.getElementById(this.field_element_name+'_input_div_'+num);if(!div_el)
div_el=document.getElementById(this.field_element_name+'_radio_div_'+num);var tr_to_remove=document.getElementById('lineFields_'+this.field_element_name+'_'+num);div_el.parentNode.parentNode.parentNode.removeChild(tr_to_remove);var div_id='lineFields_'+this.field_element_name+'_'+num;if(typeof sqs_objects[div_id.replace("_field_","_")]!='undefined'){delete(sqs_objects[div_id.replace("_field_","_")]);}
var checked=false;for(var k=0;k<radio_els.length;k++){if(radio_els[k].checked){checked=true;}}
var primary_checked=document.forms[this.form].elements[this.field+"_allowed_to_check"];var allowed_to_check=true;if(primary_checked&&primary_checked.value=='false'){allowed_to_check=false;}
if(/EditView/.test(this.form)&&!checked&&typeof radio_els[0]!='undefined'&&allowed_to_check){radio_els[0].checked=true;this.changePrimary(true);this.js_more();this.js_more();}
if(radio_els.length==1){this.more_status=false;if(document.getElementById('more_'+this.field_element_name)&&document.getElementById('more_'+this.field_element_name).style.display!='none'){document.getElementById('more_'+this.field_element_name).style.display='none';}
this.show_arrow_label(false);this.js_more();}else{this.js_more();this.js_more();}}},get_radios:function(){return YAHOO.util.Selector.query('input[name^=primary]',document.getElementById(this.field_element_name+'_table'));},add:function(values){this.fields_count++;var Field0=this.init_clone(values);this.cloneField[1].appendChild(Field0);enableQS(true);this.changePrimary(false);if(document.getElementById('more_'+this.field_element_name)&&document.getElementById('more_'+this.field_element_name).style.display=='none'){document.getElementById('more_'+this.field_element_name).style.display='';}
if(!this.is_expanded()){this.js_more();this.show_arrow_label(true);}},add_secondaries:function(){clone_id=this.form+'_'+this.field+'_collection_0';if(typeof sqs_objects=='undefined'||typeof sqs_objects[clone_id]=='undefined'){setTimeout('collection["'+this.field_element_name+'"].add_secondaries();',1000);}else if(typeof document.getElementById(this.form+'_'+this.field+'_collection_0')=='undefined'){setTimeout('collection["'+this.field_element_name+'"].add_secondaries();',1000);}else{this.create_clone();enableQS();this.changePrimary(true);for(key in this.secondaries_values){if(isInteger(key)){this.add(this.secondaries_values[key]);}}
this.js_more();this.js_more();}
initEditView(document.forms[this.form]);},init_clone:function(values){if(typeof this.cloneField[0]=='undefined'){return;}
if(typeof values=="undefined"){values=new Array();values['name']="";values['id']="";}
var count=this.fields_count;Field0=SUGAR.isIE?SUGAR.collection.safe_clone(this.cloneField[0],true):this.cloneField[0].cloneNode(true);Field0.id="lineFields_"+this.field_element_name+"_"+count;for(var ii=0;ii<Field0.childNodes.length;ii++){if(typeof(Field0.childNodes[ii].tagName)!='undefined'&&Field0.childNodes[ii].tagName=="TD"){for(var jj=0;jj<Field0.childNodes[ii].childNodes.length;jj++){currentNode=Field0.childNodes[ii].childNodes[jj];this.process_node(Field0.childNodes[ii],currentNode,values);}}}
return Field0;},process_node:function(parentNode,currentNode,values){if(parentNode.className=='td_extra_field'){if(parentNode.id){parentNode.id='';}
var toreplace=this.field+"_collection_extra_0";var re=new RegExp(toreplace,'g');parentNode.innerHTML=parentNode.innerHTML.replace(re,this.field+"_collection_extra_"+this.fields_count);}else if(currentNode.tagName&&currentNode.tagName=='SPAN'){currentNode.id=/_input/.test(currentNode.id)?this.field_element_name+'_input_div_'+this.fields_count:this.field_element_name+'_radio_div_'+this.fields_count;if(/_input/.test(currentNode.id)){currentNode.name='teamset_div';}
var input_els=currentNode.getElementsByTagName('input');for(var x=0;x<input_els.length;x++){if(input_els[x].tagName&&input_els[x].tagName=='INPUT'){this.process_node(parentNode,input_els[x],values);}}}else if(currentNode.name){var toreplace=this.field+"_collection_0";var re=new RegExp(toreplace,'g');var name=currentNode.name;var new_name=name.replace(re,this.field+"_collection_"+this.fields_count);switch(name){case toreplace:var sqs_id=this.form+'_'+new_name;if(typeof this.sqs_clone!='undefined'){var sqs_clone=YAHOO.lang.JSON.stringify(this.sqs_clone);eval('sqs_objects[sqs_id]='+sqs_clone);for(var pop_field in sqs_objects[sqs_id]['populate_list']){if(typeof sqs_objects[sqs_id]['populate_list'][pop_field]=='string'){sqs_objects[sqs_id]['populate_list'][pop_field]=sqs_objects[sqs_id]['populate_list'][pop_field].replace(RegExp('_0','g'),"_"+this.fields_count);}}
for(var req_field in sqs_objects[sqs_id]['required_list']){if(typeof sqs_objects[sqs_id]['required_list'][req_field]=='string'){sqs_objects[sqs_id]['required_list'][req_field]=sqs_objects[sqs_id]['required_list'][req_field].replace(RegExp('_0','g'),"_"+this.fields_count);}}}
currentNode.name=new_name;currentNode.id=new_name;currentNode.value=values['name'];break;case"id_"+toreplace:currentNode.name=new_name.replace(RegExp('_0','g'),"_"+this.fields_count);currentNode.id=new_name.replace(RegExp('_0','g'),"_"+this.fields_count);currentNode.value=values['id'];break;case"btn_"+toreplace:currentNode.name=new_name;currentNode.attributes['onclick'].value=currentNode.attributes['onclick'].value.replace(re,this.field+"_collection_"+this.fields_count);currentNode.attributes['onclick'].value=currentNode.attributes['onclick'].value.replace(RegExp(this.field+"_collection_extra_0",'g'),this.field+"_collection_extra_"+this.fields_count);break;case"allow_new_value_"+toreplace:currentNode.name=new_name;currentNode.id=new_name;break;case"remove_"+toreplace:currentNode.name=new_name;currentNode.id=new_name;currentNode.setAttribute('collection_id',this.field_element_name);currentNode.setAttribute('remove_id',this.fields_count);currentNode.onclick=function(){collection[this.getAttribute('collection_id')].remove(this.getAttribute('remove_id'));};break;case"primary_"+this.field+"_collection":currentNode.id=new_name;currentNode.value=this.fields_count;currentNode.checked=false;currentNode.setAttribute('defaultChecked','');break;default:alert(toreplace+'|'+currentNode.name+'|'+name+'|'+new_name);break;}}},js_more:function(val){if(this.show_more_image){var more_=document.getElementById('more_img_'+this.field_element_name);var arrow=document.getElementById('arrow_'+this.field);var radios=this.get_radios();if(this.more_status==false){more_.src="index.php?entryPoint=getImage&themeName="+SUGAR.themes.theme_name+"&imageName=advanced_search.gif";this.more_status=true;var hidden_count=0;for(var k=0;k<radios.length;k++){if(radios[k].type&&radios[k].type=='radio'){if(radios[k].checked){radios[k].parentNode.parentNode.parentNode.style.display='';}else{radios[k].parentNode.parentNode.parentNode.style.display='none';hidden_count++;}}}
if(hidden_count==radios.length){radios[0].parentNode.parentNode.parentNode.style.display='';}
arrow.value='hide';}else{more_.src="index.php?entryPoint=getImage&themeName="+SUGAR.themes.theme_name+"&imageName=basic_search.gif";this.more_status=false;for(var k=0;k<radios.length;k++){if(isInteger(k)){radios[k].parentNode.parentNode.parentNode.style.display='';}}
arrow.value='show';}
var more_div=document.getElementById('more_div_'+this.field_element_name);if(more_div){more_div.innerHTML=arrow.value=='show'?SUGAR.language.get('app_strings','LBL_HIDE'):SUGAR.language.get('app_strings','LBL_SHOW');}}},create_clone:function(){var oneField=document.getElementById('lineFields_'+this.field_element_name+'_0');this.cloneField[0]=SUGAR.isIE?SUGAR.collection.safe_clone(oneField,true):oneField.cloneNode(true);this.cloneField[1]=oneField.parentNode;this.more_status=true;var clone_id=this.form+'_'+this.field+'_collection_0';if(typeof sqs_objects[clone_id]!='undefined'){var clone=YAHOO.lang.JSON.stringify(sqs_objects[clone_id]);eval('this.sqs_clone='+clone);}},validateTemSet:function(formname,fieldname){var table_element_id=formname+'_'+fieldname+'_table';if(document.getElementById(table_element_id)){var input_elements=YAHOO.util.Selector.query('input[type=radio]',document.getElementById(table_element_id));var has_primary=false;var primary_field_id=fieldname+'_collection_0';for(t in input_elements){primary_field_id=fieldname+'_collection_'+input_elements[t].value;if(input_elements[t].type&&input_elements[t].type=='radio'&&input_elements[t].checked==true){if(document.forms[formname].elements[primary_field_id].value!=''){has_primary=true;}
break;}}
if(!has_primary){return false;}
return true;}
return true;},getTeamIdsfromUI:function(formname,fieldname){var team_ids=new Array();var table_element_id=formname+'_'+fieldname+'_table';if(document.getElementById(table_element_id)){input_elements=YAHOO.util.Selector.query('input[type=hidden]',document.getElementById(table_element_id));for(t=0;t<input_elements.length;t++){if(input_elements[t].id.match("id_"+fieldname+"_collection_")!=null){team_ids.push(input_elements[t].value);}}}
return team_ids;},getPrimaryTeamidsFromUI:function(formname,fieldname){var table_element_id=formname+'_'+fieldname+'_table';if(document.getElementById(table_element_id)){var input_elements=YAHOO.util.Selector.query('input[type=radio]',document.getElementById(table_element_id));for(t in input_elements){var primary_field_id='id_'+document.forms[formname][fieldname].name+'_collection_'+input_elements[t].value;if(input_elements[t].type&&input_elements[t].type=='radio'&&input_elements[t].checked==true){if(document.forms[formname].elements[primary_field_id].value!=''){return document.forms[formname].elements[primary_field_id].value;}}}}
return'';},changePrimary:function(noAdd){var old_primary=this.primary_field;var radios=this.get_radios();for(var k=0;k<radios.length;k++){var qs_id=radios[k].id.replace('primary_','');if(radios[k].checked){this.primary_field=qs_id;}else{qs_id=qs_id+'_'+k;}
qs_id=this.form+'_'+qs_id;if(typeof sqs_objects[qs_id]!='undefined'&&sqs_objects[qs_id]['primary_field_list']){for(var ii=0;ii<sqs_objects[qs_id]['primary_field_list'].length;ii++){if(radios[k].checked&&qs_id!=old_primary){sqs_objects[qs_id]['field_list'].push(sqs_objects[qs_id]['primary_field_list'][ii]);sqs_objects[qs_id]['populate_list'].push(sqs_objects[qs_id]['primary_populate_list'][ii]);}else if(old_primary==qs_id&&!radios[k].checked){sqs_objects[qs_id]['field_list'].pop();sqs_objects[qs_id]['populate_list'].pop();}}}}
if(noAdd){enableQS(false);}
this.first=false;},js_more_detail:function(id){var more_img=document.getElementById('more_img_'+id);if(more_img.style.display=='inline'){more_img.src="index.php?entryPoint=getImage&themeName="+SUGAR.themes.theme_name+"&imageName=advanced_search.gif";}else{more_img.src="index.php?entryPoint=getImage&themeName="+SUGAR.themes.theme_name+"&imageName=basic_search.gif";}},replace_first:function(values){for(var i=0;i<=this.fields_count;i++){var div_el=document.getElementById(this.field_element_name+'_input_div_'+i);if(div_el){var name_field=document.getElementById(this.field+"_collection_"+i);var id_field=document.getElementById("id_"+this.field+"_collection_"+i);name_field.value=values['name'];id_field.value=values['id'];break;}}},clean_up:function(){var divsToClean=new Array();var isFirstFieldEmpty=false;var divCount=0;for(var i=0;i<=this.fields_count;i++){var div_el=document.getElementById(this.field_element_name+'_input_div_'+i);if(div_el){input_els=div_el.getElementsByTagName('input');for(var x=0;x<input_els.length;x++){if(input_els[x].id&&input_els[x].id==(this.field+'_collection_'+i)&&trim(input_els[x].value)==''){if(divCount==0){isFirstFieldEmpty=true;}else{divsToClean.push(i);}}}
divCount++;}}
for(var j=0;j<divsToClean.length;j++){this.remove(divsToClean[j]);}
return isFirstFieldEmpty;},show_arrow_label:function(show){var more_div=document.getElementById('more_div_'+this.field_element_name);if(more_div){more_div.style.display=show?'':'none';}},is_expanded:function(){var more_div=document.getElementById('more_div_'+this.field_element_name);if(more_div){return more_div.style.display=='';}
return false;}}
SUGAR.collection.safe_clone=function(e,recursive)
{if(e.nodeName=="#text")
{return document.createTextNode(e.data);}
if(!e.tagName)return false;var newNode=document.createElement(e.tagName);if(!newNode)return false;var properties=['class','style','name','type','valign','border','width','height','top','bottom','left','right','scope','row','columns','src','href','className','align','nowrap'];for(var i in properties)
{if(e[properties[i]])
{if((properties[i]!='style'||!SUGAR.isIE)&&(properties[i]!='href'||e.tagName=='a'||e.tagName=='iframe'))
newNode[properties[i]]=e[properties[i]];}}
if(recursive)
{for(var i in e.childNodes)
{if(e.childNodes[i].nodeName&&(!e.className||e.className!="yui-ac-container"))
{var child=SUGAR.collection.safe_clone(e.childNodes[i],true);if(child)newNode.appendChild(child);}}}
return newNode;}}// End of File include/SugarFields/Fields/Collection/SugarFieldCollection.js
                                
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

SUGAR.email2 = {
    cache : new Object(),
    o : null, // holder for reference to AjaxObject's return object (used in composeDraft())
    reGUID : new RegExp(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/i),
    templates : {},
    tinyInstances : {
        currentHtmleditor : ''
    },

    /**
     * preserves hits from email server
     */ 
    _setDetailCache : function(ret) {
        if(ret.meta) {
            var compKey = ret.meta.mbox + ret.meta.uid;

            if(!SUGAR.email2.cache[compKey]) {
                SUGAR.email2.cache[compKey] = ret;
            }
        }
    },

    autoSetLayout : function() {
    	var c = document.getElementById('container');
        var tHeight = YAHOO.util.Dom.getViewportHeight() - YAHOO.util.Dom.getY(c) - 35;
        //Ensure a minimum height.
        tHeight = Math.max(tHeight, 550);
        c.style.height = tHeight + "px";
        SUGAR.email2.complexLayout.set('height', tHeight);
        SUGAR.email2.complexLayout.set('width', YAHOO.util.Dom.getViewportWidth() - 40);
        SUGAR.email2.complexLayout.render();
        SUGAR.email2.listViewLayout.resizePreview();        
    }
};

/**
 * Shows overlay progress message
 */
function overlayModal(title, body) {
    overlay(title, body);
}
function overlay(reqtitle, body, type, additconfig) {
    var config = { };
    if (typeof(additconfig) == "object") {
        var config = additconfig;
    }
    config.type = type;
    config.title = reqtitle;
    config.msg = body;
    YAHOO.SUGAR.MessageBox.show(config);
};

function hideOverlay() {
	YAHOO.SUGAR.MessageBox.hide();
};
// End of File modules/Emails/javascript/EmailUIShared.js
                                
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


if (typeof console == "undefined")
	console = { log: function(o) {alert(o)} };

var AjaxObject = {
	ret : '',
	currentRequestObject : null,
	//timeout : 30000, // 30 second timeout default
	timeout : 9999999999, // 30 second timeout default
	forceAbort : false,
	trail : new Array(),

	/**
	 */
	_reset : function() {
		this.timeout = 30000;
		this.forceAbort = false;
	},

	folderRenameCleanup : function() {
		SUGAR.email2.folders.setSugarFolders();
	},

	fullSyncCleanup : function(o) {
		this.folders.checkMailCleanup(o);
		SUGAR.email2.settings.settingsDialog.hide();
	},

	/**
	 */
	composeCache : function(o) {
		var idx = SUGAR.email2.composeLayout.currentInstanceId; // post instance increment
		// get email templates and user signatures
		var ret = JSON.parse(o.responseText);

		SUGAR.email2.composeLayout.emailTemplates = ret.emailTemplates;
		SUGAR.email2.composeLayout.signatures = ret.signatures;
		SUGAR.email2.composeLayout.fromAccounts = ret.fromAccounts;

		SUGAR.email2.composeLayout.setComposeOptions(idx);

		//Set the error array so we can notify the user when they try to hit send if any errors
		//are present.  We will also notify them now (after hitting compose button).
		SUGAR.email2.composeLayout.outboundAccountErrors = ret.errorArray;


		//if error element is returning an array, then check the length to make sure we have error messages
		if (typeof(ret.errorArray)=='object' && ret.errorArray instanceof Array && ret.errorArray.length > 0){
			//add error messages for display
			for(i in ret.errorArray)
				overlay(app_strings.LBL_EMAIL_ERROR_DESC, ret.errorArray[i], 'alert');
		}else if (typeof(ret.errorArray)=='object' && ret.errorArray!=null && ret.errorArray!='' ) {
			//if error element is returning an object, and the object value is not empty or null, then display error message
			for(i in ret.errorArray)
				overlay(app_strings.LBL_EMAIL_ERROR_DESC, ret.errorArray[i], 'alert');
		}

		//YUI bug with IE6 - Wont restore visibility property for nested select elements.
		if(SUGAR.isIE) {
			var overlayPanel = YAHOO.SUGAR.MessageBox.panel;
			if(overlayPanel) {
			  overlayPanel.subscribe('hide',function() { YAHOO.util.Dom.setStyle('addressFrom' + idx,'visibility','');});
			}
		}
	},


	handleDeleteSignature : function(o) {
		hideOverlay();
		var ret = JSON.parse(o.responseText);
		SUGAR.email2.composeLayout.signatures = ret.signatures;
    	var field = document.getElementById('signature_id');
		SUGAR.email2.util.emptySelectOptions(field);

		for(var i in ret.signatures) { // iterate through assoc array
			var opt = new Option(ret.signatures[i], i);
			field.options.add(opt);
		}
		setSigEditButtonVisibility();
	},

	/**
	 */
	handleDeleteReturn : function(o) {
		// force refresh ListView
		hideOverlay();
		if(document.getElementById('focusEmailMbox')) {
			YAHOO.namespace('frameFolders').selectednode = SUGAR.email2.folders.getNodeFromMboxPath(document.getElementById('focusEmailMbox').innerHTML);
		}

		// need to display success message before calling next async call?
		document.getElementById(this.target).innerHTML = o.responseText;
	},

	/**
	 */
    handleFailure : function(o) {
		// Failure handler
		overlay('Exception occurred...', o.statusText, 'alert');
		if(document.getElementById('saveButton')) {
			document.getElementById('saveButton').disabled = false;
		}
	},

	handleReplyForward : function(o) {
		var a = JSON.parse(o.responseText);
		globalA = a;
		var idx = SUGAR.email2.composeLayout.currentInstanceId;

		document.getElementById('email_id' + idx).value = a.uid;
		document.getElementById('emailSubject' + idx).value = a.name;
		document.getElementById('addressTO' + idx).value = a.from;
		document.getElementById('uid' + idx).value = a.uid;
		if(a.cc) {
			document.getElementById('addressCC' + idx).value = a.cc;
			SE.composeLayout.showHiddenAddress('cc', idx);
		}

		if(a.type) {
			document.getElementById('type' + idx).value = a.type;
		}

		// apply attachment values
		SUGAR.email2.composeLayout.loadAttachments(a.attachments);

		setTimeout("callbackReplyForward.finish(globalA);", 500);
	},

	handleReplyForwardForDraft : function(o) {
		var a = JSON.parse(o.responseText);
		globalA = a;
		var idx = SUGAR.email2.composeLayout.currentInstanceId;

		document.getElementById('email_id' + idx).value = a.uid;
		document.getElementById('emailSubject' + idx).value = a.name;
		document.getElementById('addressTO' + idx).value = a.to;

		if(a.cc) {
			document.getElementById('addressCC' + idx).value = a.cc;
			SUGAR.email2.composeLayout.showHiddenAddress('cc',idx);
		}

		if(a.bcc) {
			document.getElementById('addressBCC' + idx).value = a.bcc;
			SUGAR.email2.composeLayout.showHiddenAddress('bcc',idx);
		}


		if(a.type) {
			document.getElementById('type' + idx).value = a.type;
		}


		// apply attachment values
		SUGAR.email2.composeLayout.loadAttachments(a.attachments);

		setTimeout("callbackReplyForward.finish(globalA);", 500);
	},

	/**
	 */
	handleSuccess : function(o) {
		document.getElementById(this.target).innerHTML = o.responseText;
		hideOverlay();
	},

	/**
	 */
	ieDeleteSuccess : function(o) {
		hideOverlay();

		var ret = JSON.parse(o.responseText);

		SUGAR.email2.accounts.refreshInboundAccountTable();
		alert(app_strings.LBL_EMAIL_IE_DELETE_SUCCESSFUL);
		SUGAR.email2.accounts.rebuildFolderList();

	},

	/**
	 */
	ieSaveSuccess : function(o) {
		document.getElementById('saveButton').disabled = false;
		var a = JSON.parse(o.responseText);
		if (a) {
			if(a.error) {
				overlay(app_strings.LBL_EMAIL_ERROR_DESC, app_strings.LBL_EMAIL_ERROR_CHECK_IE_SETTINGS, 'alert');
				SUGAR.email2.accounts.ieAccountError(SUGAR.email2.accounts.errorStyle);
			} else {
				resp = JSON.parse(o.responseText);
				SUGAR.email2.accounts.refreshInboundAccountTable();
				SUGAR.email2.accounts.refreshOuboundAccountTable();
				SUGAR.email2.folders.startEmailCheckOneAccount(resp.id, true);
				SUGAR.email2.accounts.inboundAccountEditDialog.hide();
			}
		} else {
		     hideOverlay();
		     overlay(app_strings.LBL_EMAIL_ERROR_DESC, app_strings.LBL_EMAIL_ERROR_SAVE_ACCOUNT, 'alert');
		}

	},

	/**
	 */
	loadAttachments : function(o) {
		var result = JSON.parse(o.responseText);

		SUGAR.email2.composeLayout.loadAttachments(result);
	},

	/**
	 */
	loadSignature : function(o) {
		var ret = JSON.parse(o.responseText);
		SUGAR.email2.signatures[ret.id] = ret.signature_html;
		SUGAR.email2.composeLayout.setSignature(SUGAR.email2.signatures.targetInstance);
	},

	/**
	 * Follow up to mark email read|unread|flagged
	 */
	markEmailCleanup : function(o) {
		var ret = JSON.parse(o.responseText);
		if (!ret['status']) {
        	hideOverlay();
			overlay(app_strings.LBL_EMAIL_ERROR_DESC, ret['message'], 'alert');
		} else {
			SUGAR.email2.contextMenus.markEmailCleanup();
		} // else
	},

	/**
	 */
	rebuildShowFolders : function(o) {
		var t = JSON.parse(o.responseText);
		var show = document.getElementById('ieAccountListShow');

		SUGAR.email2.util.emptySelectOptions(show);

		for(i=0; i<t.length; i++) { // iterate through assoc array
			var opt = new Option(t[i].text, t[i].value, t[i].selected);
			opt.selected = t[i].selected;
			show.options.add(opt);
		}

		SUGAR.email2.accounts.renderTree();
	},
	/**
	 */
	saveListViewSortOrderPart2 : function() {
		// create the JSON string the func expects
		focusFolderPath = '[ "Home", "' + ieName + '"';

		var f = new String(focusFolder);
		var fEx = f.split('.');

		for(i=0; i<fEx.length; i++) {
			focusFolderPath += ', "' + fEx[i] +'"'
		}

		focusFolderPath += ']';

		YAHOO.namespace('frameFolders').selectednode = SUGAR.email2.folders.getNodeFromMboxPath(focusFolderPath);
		SUGAR.email2.listView.populateListFrame(YAHOO.namespace('frameFolders').selectednode, ieId, 'true');
	},

	/**
	 *
	 */
	sendEmailCleanUp : function(o) {
		hideOverlay();
		var ret = JSON.parse(o.responseText);
		if (ret) {
		  SUGAR.email2.composeLayout.forceCloseCompose(ret.composeLayoutId);
		  //SUGAR.email2.addressBook.showContactMatches(ret.possibleMatches);
		} else if (o.responseText) {
		  overlay(mod_strings.LBL_SEND_EMAIL_FAIL_TITLE, o.responseText, 'alert');
		}

		if (typeof(SE.grid) != 'undefined')
			SE.listView.refreshGrid();
		//Disabled while address book is disabled

		//If this call back was initiated by quick compose from a Detail View page, refresh the
		//history subpanel.  If it was initiated by quickcreate from shortcut bar, then
		//close the shortcut bar menu
		if ( (typeof(action_sugar_grp1) != 'undefined')) {
			if(action_sugar_grp1 == 'DetailView') {
				showSubPanel('history',null,true);
		  	} else if(action_sugar_grp1 == 'quickcreate') {
		  		closeEmailOverlay();
		  	}
		}

	},

	ieSendSuccess : function(o) {
		hideOverlay();
		overlay(app_strings.LBL_EMAIL_TEST_OUTBOUND_SETTINGS_SENT, app_strings.LBL_EMAIL_TEST_NOTIFICATION_SENT, 'plain');
	},

	/**
	 */
	settingsFolderRefresh : function(o) {
		//SUGAR.email2.accounts.rebuildFolderList(); // refresh frameFolder
		var ret = JSON.parse(o.responseText);
		var user = document.getElementById('userFolders');

		SUGAR.email2.util.emptySelectOptions(user);

		for(i=0; i<ret.userFolders.length; i++) {
			var display = ret.userFolders[i].name;
			var value = ret.userFolders[i].id;
			var selected = (ret.userFolders[i].selected != "") ? true : false;
			var opt = new Option(display, value, selected);
			opt.selected = selected;
			user.options.add(opt);
		}
	},

	/**
	 */
	startRequest : function(callback, args, forceAbort) {
		if(this.currentRequestObject != null) {
			if(this.forceAbort == true) {
				YAHOO.util.Connect.abort(this.currentRequestObject, null, false);
			}
		}
		this.currentRequestObject = YAHOO.util.Connect.asyncRequest('POST', "./index.php", callback, args);
		this._reset();
	},

	requestInProgress : function() {
		return (YAHOO.util.Connect.isCallInProgress(this.currentRequestObject));
	},

	/**
	 */
	updateFolderSubscriptions : function() {
		SUGAR.email2.folders.lazyLoadSettings(); // refresh view in Settings overlay
		SUGAR.email2.folders.setSugarFolders(1000);// refresh view in TreeView
		hideOverlay();
	},

	/**
	 */
	updateFrameFolder : function() {
		SUGAR.email2.folders.checkEmailAccounts();
	},

	/**
	 */
	updateUserPrefs : function(o) {
		SUGAR.email2.userPrefs = JSON.parse(o.responseText);
		SUGAR.email2.folders.startCheckTimer(); // starts the auto-check interval
	},

	/**
	 */
	uploadAttachmentSuccessful : function(o) {
		// clear out field
		document.getElementById('email_attachment').value = '';

		var ret = JSON.parse(o.responseText);
		var idx = SUGAR.email2.composeLayout.currentInstanceId;
		var overall = document.getElementById('addedFiles' + idx);
		var index = overall.childNodes.length;
		var out =
			"<div id='email_attachment_bucket" + idx + index + "'>" +
				// remove button
				"<img src='index.php?entryPoint=getImage&themeName=" + SUGAR.themes.theme_name + "&imageName=minus.gif' " +
					"style='cursor:pointer' align='absmiddle' onclick='SUGAR.email2.composeLayout.deleteUploadAttachment(\"" +
					idx + index + "\",\"" + ret.guid + ret.name + "\");'/>" +
				// file icon
				"<img src='index.php?entryPoint=getImage&themeName=" + SUGAR.themes.theme_name + "&imageName=attachment.gif' " +
					"id='email_attachmentImage'" + idx + index + "align='absmiddle' />" +
				// hidden id field
				"<input type='hidden' value='" + ret.guid + ret.name + "' name='email_attachment" + index + "' id='email_attachment" + idx + index + "' />" +
				// file name
				((ret.nameForDisplay != null) ? ret.nameForDisplay + "&nbsp;" : ret.name + "&nbsp;") +
				"<br/>" +
			"</div>";
		overall.innerHTML += out;
		if(SUGAR.email2.util.isIe()) {
			document.getElementById('addedFiles' + idx).innerHTML = document.getElementById('addedFiles' + idx).innerHTML;
		}

		// hide popup
		SUGAR.email2.addFileDialog.hide();
		// focus attachments
		SUGAR.email2.composeLayout.showAttachmentPanel(idx);
	}
};


///////////////////////////////////////////////////////////////////////////
////	PER MODULE CALLBACK OBJECTS
AjaxObject.accounts = {
	saveOutboundCleanup : function(o) {
		SUGAR.email2.accounts.refreshOuboundAccountTable();
		SUGAR.email2.accounts.outboundDialog.hide();
		var id = o.responseText;
		SUGAR.email2.accounts.newAddedOutboundId = id;
		},
	saveDefaultOutboundCleanup: function(o){

	},
	callbackEditOutbound : {
		success	: function(o)
		{
			var ret = JSON.parse(o.responseText);
			// show overlay
			SUGAR.email2.accounts.showAddSmtp();

			// fill values
			document.getElementById("mail_id").value = ret.id;
			document.getElementById("type").value = ret.type;
			document.getElementById("mail_sendtype").value = ret.mail_sendtype;
			document.getElementById("mail_name").value = ret.name;
			document.getElementById("mail_smtpserver").value = ret.mail_smtpserver;
			document.getElementById("outboundEmailForm").mail_smtptype.value = ret.mail_smtptype;
			document.getElementById("mail_smtpport").value = ret.mail_smtpport;
			document.getElementById("mail_smtpuser").value = ret.mail_smtpuser;
			//document.getElementById("mail_smtppass").value = ret.mail_smtppass;
			document.getElementById("mail_smtpauth_req").checked = (ret.mail_smtpauth_req == 1) ? true : false;
			SUGAR.email2.accounts.smtp_authenticate_field_display();
			document.getElementById("mail_smtpssl").options[ret.mail_smtpssl].selected = true;

            if(ret.type == 'system-override') {
			     SUGAR.email2.accounts.toggleOutboundAccountDisabledFields(true);
			     SUGAR.email2.accounts.changeEmailScreenDisplay(ret.mail_smtptype,true);
            }
            else {
			     SUGAR.email2.accounts.toggleOutboundAccountDisabledFields(false);
			     SUGAR.email2.accounts.changeEmailScreenDisplay(ret.mail_smtptype,false);
            }


		},
		failure	: AjaxObject.handleFailure,
		timeout	: AjaxObject.timeout,
		scope	: AjaxObject
	},
	callbackDeleteOutbound : {
		success	: function(o) {
		    var ret = JSON.parse(o.responseText);
		    if(ret.is_error)
		    {
		        if(confirm(ret.error_message))
                {
                    overlay(app_strings.LBL_EMAIL_IE_DELETE, app_strings.LBL_EMAIL_ONE_MOMENT);
                    AjaxObject.startRequest(AjaxObject.accounts.callbackDeleteOutbound, urlStandard + "&emailUIAction=deleteOutbound&confirm=true&outbound_email=" + ret.outbound_email);
                }
                else
                    hideOverlay();
		    }
		    else
		    {
			     hideOverlay();
			     SUGAR.email2.accounts.refreshOuboundAccountTable();
		    }
		},

		failure	: AjaxObject.handleFailure,
		timeout	: AjaxObject.timeout,
		scope	: AjaxObject
	},

	callbackCheckMailProgress : {
	   success : function(o) {
	       if (typeof(SUGAR.email2.accounts.totalMsgCount) == "undefined") {
	           SUGAR.email2.accounts.totalMsgCount = -1;
	       }

	       //Check for server timeout / errors
	       var ret = JSON.parse(o.responseText);
	       var done = false;

	       if (typeof(o.responseText) == 'undefined' || o.responseText == "" || ret == false) {
	           hideOverlay();
	           overlay(app_strings.LBL_EMAIL_ERROR_DESC, app_strings.LBL_EMAIL_ERROR_TIMEOUT, 'alert');
	           SUGAR.email2.accounts.totalMsgCount = -1;
               //SUGAR.email2.folders.rebuildFolders();
               done = true;
	       }

	       var currIeId = ret['ieid'];


	       var serverCount = ret.count;

	       if (ret['status'] == 'done') {
	           for(i=0; i < SUGAR.email2.accounts.ieIds.length; i++) {
	               if (i == SUGAR.email2.accounts.ieIds.length - 1) {
	                   //We are all done
	                   done = true;
	                   break;
	               } else if (SUGAR.email2.accounts.ieIds[i] == currIeId) {
	                   //Go to next account
	                   currIeId = SUGAR.email2.accounts.ieIds[i+1];
	                   ret.count = 0;
	                   SUGAR.email2.accounts.totalMsgCount = -1;
	                   break;
	               }
	           }
	       }
	       else if (ret.mbox && ret.totalcount && ret.count) {
	           SUGAR.email2.accounts.totalMsgCount = ret.totalcount;
	           if (ret.count >= ret.totalcount) {
	               serverCount = 0;
	           }
	       } else if (SUGAR.email2.accounts.totalMsgCount < 0 && ret.totalcount) {
	           SUGAR.email2.accounts.totalMsgCount = ret.totalcount;
	       } else {
		       hideOverlay();
               overlay(app_strings.LBL_EMAIL_ERROR_DESC, app_strings.LBL_EMAIL_ERROR_TIMEOUT, 'alert');
               SUGAR.email2.accounts.totalMsgCount = -1;
               done = true;
		   }

	       if (done) {
	           SUGAR.email2.accounts.totalMsgCount = -1;
	           hideOverlay();
	           SUGAR.email2.folders.rebuildFolders();
	           SE.listView.refreshGrid();
	       } else if (SUGAR.email2.accounts.totalMsgCount < 0) {
               YAHOO.SUGAR.MessageBox.updateProgress(0, mod_strings.LBL_CHECKING_ACCOUNT + ' '+ (i + 2) + ' '+ mod_strings.LBL_OF + ' ' + SUGAR.email2.accounts.ieIds.length);
               AjaxObject.startRequest(AjaxObject.accounts.callbackCheckMailProgress, urlStandard +
                                '&emailUIAction=checkEmailProgress&ieId=' + currIeId + "&currentCount=0&synch=" + ret.synch);
           } else {
               YAHOO.SUGAR.MessageBox.updateProgress((ret.count / SUGAR.email2.accounts.totalMsgCount) * 100,
                   app_strings.LBL_EMAIL_DOWNLOAD_STATUS.replace(/\[\[count\]\]/, ret.count).replace(/\[\[total\]\]/, SUGAR.email2.accounts.totalMsgCount));
	           AjaxObject.startRequest(AjaxObject.accounts.callbackCheckMailProgress, urlStandard +
                   '&emailUIAction=checkEmailProgress&ieId=' + currIeId + "&currentCount=" + serverCount +
                   '&mbox=' + ret.mbox + '&synch=' + ret.synch + '&totalcount=' + SUGAR.email2.accounts.totalMsgCount);
	       }
	   },
	   failure : AjaxObject.handleFailure,
       timeout : AjaxObject.timeout,
       scope   : AjaxObject
	}
};

///////////////////////////////////////////////////////////////////////////////
////	COMPOSE LAYOUT
AjaxObject.composeLayout = {
	/**
	 * Populates the record id
	 */
	saveDraftCleanup : function(o) {
		hideOverlay();
		var ret = JSON.parse(o.responseText);
		if(ret)
		  SUGAR.email2.composeLayout.forceCloseCompose(ret.composeLayoutId);
		else if (o.responseText)
		  overlay(mod_strings.LBL_ERROR_SAVING_DRAFT, o.responseText, 'alert');
	}
};

AjaxObject.composeLayout.callback = {
	saveDraft : {
		success	: AjaxObject.composeLayout.saveDraftCleanup,
		failure	: AjaxObject.handleFailure,
		timeout	: AjaxObject.timeout,
		scope	: AjaxObject
	}
};

AjaxObject.detailView = {
	/**
	 * Pops-up a printable view of an email
	 */
	displayPrintable : function(o) {
		var ret = JSON.parse(o.responseText);
		var displayTemplate = new YAHOO.SUGAR.Template(SUGAR.email2.templates['viewPrintable']);
		// 2 below must be in global context
		meta = ret.meta;
		meta['panelId'] = SUGAR.email2.util.getPanelId();
		email = ret.meta.email;
		if (typeof(email.cc) == 'undefined') {
		  email.cc = "";
		}

		var out = displayTemplate.exec({
			'app_strings'	: app_strings,
			'theme'			: theme,
			'idx'			: 'Preview',
			'meta'			: meta,
			'email'			: meta.email
		});

		// open popup window
		var popup = window.open('modules/Emails/templates/_blank.html', 'printwin' ,
		    'scrollbars=yes,menubar=no,height=600,width=800,resizable=yes,toolbar=no,location=no,status=no');

		popup.document.write(out);
		popup.document.close();
	},

	/**
	 * Takes formatted response and creates a modal pop-over containing a title and content
	 */
	displayView : function(o) {
		var SED = SUGAR.email2.detailView;
		var ret = JSON.parse(o.responseText);

		if(!SED.viewDialog) {
			SED.viewDialog = new YAHOO.widget.Dialog("viewDialog", {
				modal:true,
            	visible:true,
            	fixedcenter:true,
            	constraintoviewport: true,
				shadow	: true
			});
            SED.viewDialog.renderEvent.subscribe(function() {
            	var content = this.body.firstChild;
            	var viewH = YAHOO.util.Dom.getViewportHeight();
            	if (content) {
            		this.body.style.overflow = "auto";
            		this.body.style.width = "800px";
            		this.body.style.height = (viewH - 75 > content.clientHeight ? (content.clientHeight) : (viewH - 75)) + "px";
            	}
            }, SED.viewDialog);
		} // end lazy load
		SED.viewDialog.setHeader(ret.title);
		SED.viewDialog.setBody(ret.html);
		SED.viewDialog.render();
		SED.viewDialog.show();
	},

	/**
	 * Generates a modal popup to populate with the contents of bean's full EditView
	 */
	showQuickCreateForm : function(o) {
		var SED = SUGAR.email2.detailView;
		var ret = JSON.parse(o.responseText);

		if(!SED.quickCreateDialog) {
			SED.quickCreateDialog = new YAHOO.widget.Dialog("quickCreate", {
				modal:true,
				visible:true,
            	fixedcenter:true,
            	constraintoviewport: true,
				shadow	: true
			});

            SED.quickCreateDialog.renderEvent.subscribe(function() {
            	var viewH = YAHOO.util.Dom.getViewportHeight();
            	var contH = 0;
            	for (var i in this.body.childNodes) {
            		if (this.body.childNodes[i].clientHeight) {
            			contH += this.body.childNodes[i].clientHeight;
            		} else if (this.body.childNodes[i].offsetHeight) {
            			contH += this.body.childNodes[i].offsetHeight;
            		} // if
            	}
        		this.body.style.width = "800px";
        		this.body.style.height = (viewH - 75 > contH ? (contH + 10) : (viewH - 75)) + "px";
        		this.body.style.overflow = "auto";
            }, SED.quickCreateDialog);

            SED.quickCreateDialog.hideEvent.subscribe(function(){
				var qsFields = YAHOO.util.Dom.getElementsByClassName('.sqsEnabled', null, this.body);
				/*for(var qsField in qsFields){
					if (typeof QSFieldsArray[qsFields[qsField].id] != 'undefined')
					Ext.getCmp('combobox_'+qsFields[qsField].id).destroy();
				}*/
			});
            SED.quickCreateDialog.setHeader(app_strings.LBL_EMAIL_QUICK_CREATE);
		} // end lazy load
		if (ret.html) {
			ret.html = ret.html.replace('<script type="text/javascript" src="include/SugarEmailAddress/SugarEmailAddress.js"></script>', "");
		}
		SED.quickCreateDialog.setBody(ret.html ? ret.html : "&nbsp;");
		SED.quickCreateDialog.render();
		SUGAR.util.evalScript(ret.html + '<script language="javascript">enableQS(true);</script>');

		SED.quickCreateDialog.ieId = ret.ieId;
		SED.quickCreateDialog.uid = ret.uid;
        SED.quickCreateDialog.mbox = ret.mbox;
        SED.quickCreateDialog.qcmodule = ret.module;

        SED.quickCreateDialog.show();

		var editForm = document.getElementById('form_EmailQCView_' + ret.module);
		if (editForm) {
		  editForm.module.value = 'Emails';
		  var count = SUGAR.EmailAddressWidget.count[ret.module] ? SUGAR.EmailAddressWidget.count[ret.module] : 0;
		  var tableId = YAHOO.util.Dom.getElementsByClassName('emailaddresses', 'table', editForm)[0].id;
		  var instId = ret.module + count;
		  SED.quickCreateEmailsToAdd = ret.emailAddress;
		  SED.quickCreateEmailCallback = function(instId, tableId) {
			  var eaw = SUGAR.EmailAddressWidget.instances[instId];
			  if (typeof(eaw) == "undefined")
				  window.setTimeout("SUGAR.email2.detailView.quickCreateEmailCallback('"
					  	+ instId + "','" + tableId + "');", 100);
			  eaw.prefillEmailAddresses(tableId, SUGAR.email2.detailView.quickCreateEmailsToAdd);
		  }
		  window.setTimeout("SUGAR.email2.detailView.quickCreateEmailCallback('"
				  	+ instId + "','" + tableId + "');", 100);
		}
	},

	saveQuickCreateForm : function(o) {
	    hideOverlay();
		SUGAR.email2.detailView.quickCreateDialog.hide();
		validate['EditView'] = [ ];
	},

	saveQuickCreateFormAndReply : function(o) {
	    hideOverlay();
	    var ret = JSON.parse(o.responseText);
        SUGAR.email2.detailView.quickCreateDialog.hide();
        var qcd = SUGAR.email2.detailView.quickCreateDialog;
        var type = (qcd.qcmodule == 'Cases') ? 'replyCase' : 'reply';
        if (ret) {
            var emailID = ret.id;
            SUGAR.email2.composeLayout.c0_replyForwardEmail(null, ret.id, 'sugar::Emails', type);
        } else {
            SUGAR.email2.composeLayout.c0_replyForwardEmail(qcd.ieId, qcd.uid, qcd.mbox, type);
        }
        //Cean the validate cache to prevent errors on the next call
        validate['EditView'] = [ ];
    },

	saveQuickCreateFormAndAddToAddressBook : function(o) {
	   hideOverlay();
		SUGAR.email2.detailView.quickCreateDialog.hide();
		SUGAR.email2.complexLayout.findPanel('contactsTab').show();
		validate['EditView'] = [ ];
	},

	handleAssignmentDialogAssignAction : function() {


	    var assign_user_id = window.document.forms['Distribute'].elements['assigned_user_id'].value;

	    var dist = 'direct';
	    var users = false;
	    var rules = false;
	    var get = "";
	    var found_teams = false;
	    var warning_message = mod_strings.LBL_WARN_NO_USERS;
	    if(!found_teams && assign_user_id == '' )
	    {
	        alert(warning_message);
	        return;
	    }

	    var emailUids = SUGAR.email2.listView.getUidsFromSelection();
	    var uids = "";
	    for(i=0; i<emailUids.length; i++) {
	        if(uids != '') {
	            uids += app_strings.LBL_EMAIL_DELIMITER;
	        }
	        uids += emailUids[i];
	    }

	    var row = SUGAR.email2.grid.getSelectedRows()[0];
	    var data = SUGAR.email2.grid.getRecord(row).getData();
	    var ieid = data.ieId;
	    var mbox = data.mbox;
	    AjaxObject.startRequest(callbackAssignmentAction, urlStandard + '&emailUIAction=' + "doAssignmentAssign&uids=" + uids + "&ieId=" + ieid + "&folder=" + mbox + "&distribute_method=" + dist + "&users=" +assign_user_id + get);
	    SUGAR.email2.contextMenus.assignToDialogue.hide();
	    overlay('Assignment', app_strings.LBL_EMAIL_ONE_MOMENT);

	},

	handleAssignmentDialogDeleteAction : function() {
		// TO pass list of UIDS/emailIds
		var uids = SUGAR.email2.listView.getUidsFromSelection();
		var row = SUGAR.email2.grid.getSelections()[0];
		var ieid = row.data.ieId;
	    var mbox = row.data.mbox;
        AjaxObject.startRequest(callbackAssignmentAction, urlStandard + '&emailUIAction=' + "doAssignmentDelete&uids=" + uids + "&ieId=" + ieId + "&folder=" + mbox);
        SUGAR.email2.contextMenus.assignmentDialog.hide();
		overlay(app_strings.LBL_EMAIL_PERFORMING_TASK, app_strings.LBL_EMAIL_ONE_MOMENT);

		// AJAX Call

	},

	showEmailDetailView : function(o) {
        hideOverlay();
        var SED = SUGAR.email2.detailView;
		var ret = JSON.parse(o.responseText);

		if(!SED.quickCreateDialog) {
			SED.quickCreateDialog = new YAHOO.widget.Dialog("emailDetailDialog", {
				modal:true,
				visible:true,
            	//fixedcenter:true,
            	constraintoviewport: true,
            	draggable: true,
				autofillheight: "body",
				shadow	: true
			});
			SED.quickCreateDialog.renderEvent.subscribe(function() {
            	var viewHeight = YAHOO.util.Dom.getViewportHeight();
            	var contH = 0;
            	for (var i in this.body.childNodes) {
            		if (this.body.childNodes[i].offsetHeight)
            			contH += this.body.childNodes[i].offsetHeight;
            	}
        		this.body.style.overflow = "auto";
        		this.body.style.width = "800px";
        		this.body.style.height = (viewHeight - 75 > contH ? (contH + 10) : (viewHeight - 75)) + "px";
        		this.center();
            }, SED.quickCreateDialog);
		}
		SED.quickCreateDialog.setHeader(app_strings.LBL_EMAIL_RECORD);
		SED.quickCreateDialog.setBody(ret.html);
		SED.quickCreateDialog.render();
        SUGAR.util.evalScript(ret.html);
        SED.quickCreateDialog.show();
	},

	showAssignmentDialogWithData : function(o) {
        var SEC = SUGAR.email2.contextMenus;
		hideOverlay();
        var ret = JSON.parse(o.responseText);
        if (!SEC.assignmentDialog) {
	        SEC.assignmentDialog = new YAHOO.widget.Dialog("assignmentDialog", {
	        	visible:false,
            	fixedcenter:true,
            	constraintoviewport: true,
	        	modal   : true
	        });
	        SEC.assignmentDialog.setBody("");
	        SEC.assignmentDialog.setHeader(app_strings.LBL_EMAIL_ASSIGNMENT);
	        SEC.assignmentDialog.renderEvent.subscribe(function() {
            	var iev = YAHOO.util.Dom.get("Distribute");
            	if (iev) {
            		this.body.style.width = "700px";
            	}
            },  SEC.assignmentDialog);
	        SEC.assignmentDialog.render();
        }
        SEC.assignmentDialog.setBody(ret);
        SEC.assignmentDialog.render();
        validate = [];
        SEC.assignmentDialog.show();
        SUGAR.util.evalScript(ret);
	},

	showImportForm : function(o) {
		var SED = SUGAR.email2.detailView;
		var ret = JSON.parse(o.responseText);

        document.getElementById('quickCreateContent').innerHTML = "";
        hideOverlay();
        if (!ret) {
            return false;
        }

        if(!SED.importDialog) {
            SED.importDialog = new YAHOO.widget.Dialog("importDialog", {
            	modal:true,
            	visible:false,
            	fixedcenter:true,
            	constraintoviewport: true,
                buttons : [{
                	text: app_strings.LBL_EMAIL_ARCHIVE_TO_SUGAR, isDefault: true, handler: function(){
                		AjaxObject.detailView.getImportAction(SED.importDialog.ret); }
                }]//,
                //scroll : true
            });
            SED.importDialog.setHeader(app_strings.LBL_EMAIL_IMPORT_SETTINGS);
            SED.importDialog.setBody("");
            SED.importDialog.hideEvent.subscribe(function(){
            	for(var i in QSFieldsArray) {
            		if (QSFieldsArray[i] != null && typeof(QSFieldsArray[i]) == "object") {
	            		QSFieldsArray[i].destroy();
	            		delete QSFieldsArray[i];
            		}
            		if (QSProcessedFieldsArray[i]) {
            			QSProcessedFieldsArray[i] = false;
            		} // if
				}
            });
            SED.importDialog.renderEvent.subscribe(function() {
            	var iev = YAHOO.util.Dom.get("ImportEditView");
            	if (iev) {
            		//this.body.style.height = (iev.clientHeight + 10) + "px";
            		this.body.style.width = "600px";
            	}
            }, SED.importDialog);
            SED.importDialog.render();
        } // end lazy load
        SED.importDialog.setBody(ret.html);
        SED.importDialog.ret = ret;
        SUGAR.util.evalScript(ret.html);
        SED.importDialog.render();
        validate = [];
        SED.importDialog.show();
        SED.importDialog.focusFirstButton();
    },
    getImportAction : function(ret) {
        if (!check_form('ImportEditView')) return false;
        if (!SUGAR.collection.prototype.validateTemSet('ImportEditView', 'team_name')) {
        	alert(mod_strings.LBL_EMAILS_NO_PRIMARY_TEAM_SPECIFIED);
        	return false;
        } // if
		var get = "";
        var editView = document.getElementById('ImportEditView');
        if (editView.assigned_user_id != null) {
            get = get + "&user_id=" + editView.assigned_user_id.value
            //var user_id = editView.assigned_user_id.value;
        }
        var parent_id = editView.parent_id.value;
        var parent_type = editView.parent_type.value;
        var row = SUGAR.email2.grid.getSelectedRows()[0];
        row = SUGAR.email2.grid.getRecord(row);
        var data = row.getData();
        var ieId = data.ieId;
        var mbox = data.mbox;
        var serverDelete = editView.serverDelete.checked;
        var emailUids = SUGAR.email2.listView.getUidsFromSelection();
        var uids = "";
        for(i=0; i<emailUids.length; i++) {
            if(uids != '') {
                uids += app_strings.LBL_EMAIL_DELIMITER;
            }
            uids += emailUids[i];
        }

        var action = 'importEmail&uid=';
        if (ret.move) {
            action = 'moveEmails';
            action = action + '&sourceFolder=' + ret['srcFolder'];
            action = action + '&sourceIeId=' + ret['srcIeId'];
            action = action + '&destinationFolder=' + ret['dstFolder'];
            action = action + '&destinationIeId=' + ret['dstIeId'];
            action = action + '&emailUids=';
        }
        if (action.search(/importEmail/) != -1) {
            overlay(app_strings.LBL_EMAIL_IMPORTING_EMAIL, app_strings.LBL_EMAIL_ONE_MOMENT);
        } else {
            overlay("Moving Email(s)", app_strings.LBL_EMAIL_ONE_MOMENT);
        }

        AjaxObject.startRequest(callbackStatusForImport, urlStandard + '&emailUIAction=' + action + uids + "&ieId=" + ieId + "&mbox=" + mbox +
        get + "&parent_id=" + parent_id + "&parent_type=" + parent_type + '&delete=' + serverDelete);
        SUGAR.email2.detailView.importDialog.hide();
        document.getElementById('importDialogContent').innerHTML = "";

    },
    showRelateForm : function(o) {
        var SED = SUGAR.email2.detailView;
    	var ret = JSON.parse(o.responseText);
        document.getElementById('quickCreateContent').innerHTML = "";
        hideOverlay();
        if (!ret) {
            return false;
        }
        dialog_loaded = true;

        if(!SED.relateDialog) {
            SED.relateDialog = new YAHOO.widget.Dialog('relateDialog', {
				modal:true,
				visible:true,
            	fixedcenter:true,
            	width: '800px',
            	constraintoviewport: true,
				buttons : [{
                	text: app_strings.LBL_EMAIL_RELATE_TO, isDefault: true, handler: function(){
    					if (!check_form('RelateEditView')) return false;
    					var get = "";
    	                var editView = document.getElementById('RelateEditView');
    	                var parent_id = editView.parent_id.value;
    	                var parent_type = editView.parent_type.value;
    	                var row = SUGAR.email2.grid.getSelectedRows()[0];
    	                row  = SUGAR.email2.grid.getRecord(row);
    	                var ieId = row.getData().ieId;
    	                var mbox = row.getData().mbox;
    	                var emailUids = SUGAR.email2.listView.getUidsFromSelection();
    	                var uids = "";
    	                for(i=0; i<emailUids.length; i++) {
    	                    if(uids != '') {
    	                        uids += app_strings.LBL_EMAIL_DELIMITER;
    	                    }
    	                    uids += emailUids[i];
    	                }
    	                overlay(app_strings.LBL_EMAIL_PERFORMING_TASK, app_strings.LBL_EMAIL_ONE_MOMENT);
    	                AjaxObject.startRequest(callbackStatusForImport, urlStandard + '&emailUIAction=relateEmails&uid=' + uids
    	                    + "&ieId=" + ieId + "&mbox=" + mbox + "&parent_id=" + parent_id + "&parent_type=" + parent_type);
    	                SED.relateDialog.hide();
    	                document.getElementById('relateDialogContent').innerHTML = "";
	                }
                }]
			});

            SED.relateDialog.hideEvent.subscribe(function(){
            	if (QSFieldsArray['ImportEditView_parent_name'] != null) {
            		QSFieldsArray['ImportEditView_parent_name'].destroy();
            		delete QSFieldsArray['ImportEditView_parent_name'];
            	} // if
				if (QSProcessedFieldsArray['ImportEditView_parent_name']) {
					QSProcessedFieldsArray['ImportEditView_parent_name'] = false;
				} // if
            });

            SED.relateDialog.renderEvent.subscribe(function() {
            	var viewPortHeight = YAHOO.util.Dom.getViewportHeight();
            	var contH = 0;
            	for (var i in this.body.childNodes) {
            		if (this.body.childNodes[i].clientHeight)
            			contH += this.body.childNodes[i].clientHeight;
            	}
            }, SED.relateDialog);
            SED.relateDialog.setHeader(app_strings.LBL_EMAIL_RELATE_EMAIL);
		} // end lazy load

        SED.relateDialog.setBody(ret.html);
        SED.relateDialog.render();
        SUGAR.util.evalScript(ret.html);
        SED.relateDialog.show();
    }
};
/**
 * DetailView callbacks
 */
AjaxObject.detailView.callback = {
	emailDetail : {
		success	: function(o) {
			SUGAR.email2.o = o;
			var ret = JSON.parse(o.responseText);
			SUGAR.email2.detailView.consumeMetaDetail(ret);
		},
		argument: [targetDiv],
		failure	: AjaxObject.handleFailure,
		timeout	: 0,
		scope	: AjaxObject
	},
	emailPreview : {
		success	: function(o) {
			SUGAR.email2.o = o;
			var ret = JSON.parse(o.responseText);
			SUGAR.email2.detailView.consumeMetaPreview(ret);
		},
		failure	: AjaxObject.handleFailure,
		timeout	: 0,
		scope	: AjaxObject
	},
	viewPrint : {
		success	: AjaxObject.detailView.displayPrintable,
		failure	: AjaxObject.handleFailure,
		timeout	: AjaxObject.timeout,
		scope	: AjaxObject
	},
	viewRaw : {
		success	: AjaxObject.detailView.displayView,
		failure	: AjaxObject.handleFailure,
		timeout	: AjaxObject.timeout,
		scope	: AjaxObject
	}
};





AjaxObject.folders = {
	/**
	 * check-mail post actions
	 */
	checkMailCleanup : function(o) {
		hideOverlay();
		AjaxObject.folders.rebuildFolders(o); // rebuild TreeView

		// refresh focus ListView
		SE.listView.refreshGrid();
		SUGAR.email2.folders.startCheckTimer(); // resets the timer
	},

	/**
	 */
	rebuildFolders : function(o) {
		hideOverlay();

		var data = JSON.parse(o.responseText);

		email2treeinit(SUGAR.email2.tree, data.tree_data, 'frameFolders', data.param);
		SUGAR.email2.folders.setSugarFolders();
	}
};
AjaxObject.folders.callback = {
	checkMail : {
		success	: AjaxObject.folders.checkMailCleanup,
		failure	: AjaxObject.handleFailure,
		timeout	: 600000, // 5 mins
		scope	: AjaxObject
	}
}

AjaxObject.rules = {
	loadRulesForSettings : function(o) {
		document.getElementById("rulesListCell").innerHTML = o.responseText;
		// assume we have the class we need
		SUGAR.routing.getStrings();
		SUGAR.routing.getDependentDropdowns();
	}
};
////	END PER MODULE CALLBACK OBJECTS
///////////////////////////////////////////////////////////////////////////


var callback = {
	success	: AjaxObject.handleSuccess,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackAccount = {
	success	: AjaxObject.ieSaveSuccess,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackAccountDelete = {
	success	: AjaxObject.ieDeleteSuccess,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackOutboundTest = {
	success	: AjaxObject.ieSendSuccess,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};



var callbackTeamInfoForSettings = {
success : function (o) {
	var data = JSON.parse(o.responseText);
	document.getElementById('EditViewGroupFolderTeamTD').innerHTML = data.defaultgroupfolder;
},
failure	: AjaxObject.handleFailure,
timeout	: AjaxObject.timeout,
scope	: AjaxObject

};

var callbackStatusForImport = {
success : function (o) {
	hideOverlay();
	if (o.responseText != "")  {
		var statusString = "";
		var data = JSON.parse(o.responseText);
		for(i=0; i<data.length; i++) {
			statusString = statusString + data[i] + '<br/>';
		}
		overlay(SUGAR.language.get('Emails','LBL_IMPORT_STATUS_TITLE'), statusString, 'alert');
	}
	SE.listView.refreshGrid();

},
failure	: AjaxObject.handleFailure,
timeout	: AjaxObject.timeout,
scope	: AjaxObject

};
var callbackComposeCache = {
	success	: AjaxObject.composeCache,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackDelete = {
	success	: AjaxObject.handleDeleteReturn,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackEmailDetailMultiple = {
	success	: function(o) {
		hideOverlay();
		var retMulti = JSON.parse(o.responseText);
		var ret = new Object();

		for(var i=0; i<retMulti.length; i++) {
			ret = retMulti[i];

			SUGAR.email2._setDetailCache(ret);
			SUGAR.email2.detailView.populateDetailView(ret.meta.uid, ret.meta.mbox, ret.meta.ieId, true, SUGAR.email2.innerLayout);
		}
	},
	failure	: AjaxObject.handleFailure,
	timeout	: 0,
	scope	: AjaxObject
};
var callbackListViewSortOrderChange = {
	success	: AjaxObject.saveListViewSortOrderPart2,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject,
	argument	: [ieId, ieName, focusFolder]
};
var callbackEmptyTrash = {
	success	: function(o) {
		hideOverlay();
		AjaxObject.folderRenameCleanup;
	},
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackClearCacheFiles = {
	success	: function(o) {
		hideOverlay();
	},
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackFolderRename = {
	success	: function(o) {hideOverlay();SUGAR.email2.folders.rebuildFolders();},
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackFolderDelete = {
	success	: function(o) {
		var ret = JSON.parse(o.responseText);
		if (ret.status) {
		    if (ret.folder_id) {
		        var node = SUGAR.email2.folders.getNodeFromId(ret.folder_id);
		        if(node)
		        	SUGAR.email2.tree.removeNode(node, true);
		    } else if (ret.ieId && ret.mbox) {
		        var node = SUGAR.email2.folders.getNodeFromIeIdAndMailbox(ret.ieId, ret.mbox);
		        if(node)
		        	SUGAR.email2.tree.removeNode(node, true);
		    }
			hideOverlay();
			//SUGAR.email2.folders.loadSettingFolder();
		} else {
			hideOverlay();
			overlay(app_strings.LBL_EMAIL_ERROR_DESC, ret.errorMessage, 'alert');
		} // else
	},
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackFolderSave = {
	success	: function(o) {
		var ret = JSON.parse(o.responseText);

		switch(ret.action) {
			case 'newFolderSave':
				SUGAR.email2.folders.rebuildFolders();
			break;
		}
	},
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackFolderSubscriptions = {
	success	: AjaxObject.updateFolderSubscriptions,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackFolderUpdate = {
	success	: AjaxObject.updateFrameFolder,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackFolders = {
	success	: AjaxObject.folders.rebuildFolders,
	//success : void(true),
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackFullSync = {
	success	: AjaxObject.fullSyncCleanup,
	failure	: AjaxObject.handleFailure,
	timeout	: 9999999999999,
	scope	: AjaxObject
};
var callbackGeneric = {
	success	: function() {
		hideOverlay();
	},
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackIeAccountRetrieve = {
	success	: function(o) {
		// return JSON encoding
		hideOverlay();
		SUGAR.email2.accounts.fillIeAccount(o.responseText);
		SUGAR.email2.accounts.showEditInboundAccountDialogue(false);
	},
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackImportOneEmail = {
	success :  AjaxObject.detailView.showImportForm,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackRelateEmail = {
    success : AjaxObject.detailView.showRelateForm,
    failure : AjaxObject.handleFailure,
    timeout : AjaxObject.timeout,
    scope   : AjaxObject
}
var callbackEmailDetailView = {
    success : AjaxObject.detailView.showEmailDetailView,
    failure : AjaxObject.handleFailure,
    timeout : AjaxObject.timeout,
    scope   : AjaxObject
}
var callbackAssignmentDialog = {
	success :  AjaxObject.detailView.showAssignmentDialogWithData,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackAssignmentAction = {
	success :  function(o) {
		SE.listView.refreshGrid();
		hideOverlay();
		if(o.responseText != '') {
	       overlay('Assignment action result', o.responseText, 'alert');
	    } // if
	} ,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackMoveEmails = {
	success :  function(o) {
	    SE.listView.refreshGrid();
		hideOverlay();
		if(o.responseText != '') {
	       overlay(app_strings.LBL_EMAIL_ERROR_DESC, o.responseText, 'alert');
	    } // if
	} ,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackLoadAttachments = {
	success	: AjaxObject.loadAttachments,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackLoadRules = {
	success	: AjaxObject.rules.loadRulesForSettings,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackLoadSignature = {
	success	: AjaxObject.loadSignature,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackDeleteSignature = {
	success	: AjaxObject.handleDeleteSignature,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
/*var callbackMoveEmails = {
    success : function(o) { SUGAR.email2.listView.moveEmailsCleanup(o) },
    failure : AjaxObject.handleFailure,
    timeout : AjaxObject.timeout,
    scope   : AjaxObject
}*/
var callbackOutboundSave = {
	success	: AjaxObject.accounts.saveOutboundCleanup,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackDefaultOutboundSave = {
	success	: AjaxObject.accounts.saveDefaultOutboundCleanup,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackQuickCreate = {
	success	: AjaxObject.detailView.showQuickCreateForm,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackQuickCreateSave = {
	success	: AjaxObject.detailView.saveQuickCreateForm,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackQuickCreateSaveAndAddToAddressBook = {
	success	: AjaxObject.detailView.saveQuickCreateFormAndAddToAddressBook,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackQuickCreateSaveAndReply = {
    success : AjaxObject.detailView.saveQuickCreateFormAndReply,
    failure : AjaxObject.handleFailure,
    timeout : AjaxObject.timeout,
    scope   : AjaxObject
}
var callbackQuickCreateSaveAndReplyCase = {
    success : AjaxObject.detailView.saveQuickCreateFormAndReplyCase,
    failure : AjaxObject.handleFailure,
    timeout : AjaxObject.timeout,
    scope   : AjaxObject
}
var callbackRebuildShowAccountList = {
	success	: AjaxObject.rebuildShowFolders,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};

var callbackRefreshSugarFolders = {
	success	: function(o) {
		var t = JSON.parse(o.responseText);
		SUGAR.email2.folders.setSugarFoldersEnd(t);
	},
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackReplyForward = {
	success	: AjaxObject.handleReplyForward,
	finish : function(a, retryCount) {
		if (typeof(retryCount) == 'undefined') {
			retryCount = 0;
		} else {
			retryCount++;
		}
		var idx = SUGAR.email2.composeLayout.currentInstanceId;
		var t = tinyMCE.getInstanceById('htmleditor' + idx);
        try {
			var html = t.getContent();

            if (a.type != 'draft') {
    			if(SUGAR.email2.userPrefs.signatures.signature_prepend == 'true') {
    				html += "&nbsp;<div><hr></div>" + a.description;
    			} else {
    				html =  "&nbsp;<div><hr></div>" + a.description + html;
    			}
            }else {
                html = a.description;
            }

			t.setContent(html);//

		} catch(e) {
			if (retryCount < 5) {
				setTimeout("callbackReplyForward.finish(globalA, " + retryCount + ");", 500);
				return;
			}
		}
		var tabArray = SUGAR.email2.innerLayout.get("tabs");
		if (tabArray != null && tabArray.length > 0) {
			for (i = 0 ; i < tabArray.length ; i++) {
				var tabObject = tabArray[i];
				if (tabObject.get("id") == ("composeTab" + idx)) {
					var tabLabel = a.name;
			        if (tabLabel != null && tabLabel.length > 25) {
			        	tabLabel = tabLabel.substring(0, 25) + "...";
			        } // if
					tabObject.get("labelEl").firstChild.data = tabLabel;
					break;
				}
			}
		}

		//SUGAR.email2.innerLayout.regions.center.getPanel('composeLayout' + idx).setTitle(a.name);
		if (a.parent_name != null && a.parent_name != "") {
			document.getElementById('data_parent_name' + idx).value = a.parent_name;
		}
		if (a.parent_type != null && a.parent_type != "") {
			document.getElementById('data_parent_type' + idx).value = a.parent_type;
		}
		if (a.parent_id != null && a.parent_id != "") {
			document.getElementById('data_parent_id' + idx).value = a.parent_id;
		}
		if (a.fromAccounts.status) {
			var addressFrom = document.getElementById('addressFrom' + idx);
	        SUGAR.email2.util.emptySelectOptions(addressFrom);
	        var fromAccountOpts = a.fromAccounts.data;
	        for(i=0; i<fromAccountOpts.length; i++) {
	              var key = fromAccountOpts[i].value;
	              var display = fromAccountOpts[i].text;
	              var opt = new Option(display, key);
	              if (fromAccountOpts[i].selected) {
	              	opt.selected = true;
	              }
	              addressFrom.options.add(opt);
	        }
		} // if
		hideOverlay();

	},
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject,
	argument	: [sendType]
};
var callbackSendEmail = {
	success	: AjaxObject.sendEmailCleanUp,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackSettings = {
	success	: AjaxObject.updateUserPrefs,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackSettingsFolderRefresh = {
	success	: AjaxObject.settingsFolderRefresh,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackLoadSettingFolder = {
	success	: function(o) {
		AjaxObject.settingsFolderRefresh(o);
		SUGAR.email2.accounts.rebuildFolderList(); // refresh frameFolder
	},
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject

};
var callbackUploadAttachment = {
	success	: AjaxObject.uploadAttachmentSuccessful,
	upload	: AjaxObject.uploadAttachmentSuccessful,
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};
var callbackUserPrefs = {
	success	: function(o) {
		SUGAR.email2.userPrefs = JSON.parse(o.responseText);
	},
	failure	: AjaxObject.handleFailure,
	timeout	: AjaxObject.timeout,
	scope	: AjaxObject
};

var callbackContextmenus = {
	markUnread : {
		success : AjaxObject.markEmailCleanup,
		failure : AjaxObject.handleFailure,
		timeout : AjaxObject.timeout,
		scope   : AjaxObject
	}
};

var callbackCheckEmail2 = {
	success : function(o) {
		var ret = JSON.parse(o.responseText);
		overlay(app_strings.LBL_EMAIL_CHECKING_NEW, ret.text);


	},
	failure : AjaxObject.handleFailure,
	timeout : AjaxObject.timeout,
	scope	: AjaxObject
}// End of File modules/Emails/javascript/ajax.js
                                
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

function gridInit() {
	if(SUGAR.email2.grid) {
		SUGAR.email2.grid.destroy();
	}
	
	e2Grid = {
		init : function() {
		
			var Ck = YAHOO.util.Cookie;
			var widths = [ 10, 10, 150, 250, 175, 125 ];

			if (Ck.get("EmailGridWidths")) {
				for (var i=0; i < widths.length; i++) {
					widths[i] = Ck.getSub("EmailGridWidths", i+ "", Number);
				}
			} else {
				for (var i=0; i < widths.length; i++) {
					Ck.setSub("EmailGridWidths", i + "", widths[i], {expires: SUGAR.email2.nextYear});
				}
			}
			
			// changes "F" to an icon
			function flaggedIcon(cell, record, column, value) {
				if(value != "") {
					cell.innerHTML = "<span style='color: #f00; font-weight:bold;'>!</span>";
				}
			}
			// changes "A" to replied icon
			function repliedIcon(cell, record, column, value) {
				if(value != "") {
					cell.innerHTML = "<img src='index.php?entryPoint=getImage&themeName="+SUGAR.themes.theme_name+"&imageName=export.gif' class='image' border='0' width='10' align='absmiddle'>";
				}
			}
	        function attachIcon(cell, record, column, value) {
				if(value == "1") {
					cell.innerHTML = "<img src='index.php?entryPoint=getImage&themeName="+SUGAR.themes.theme_name+"&imageName=attachment.gif' class='image' border='0' width='10' align='absmiddle'>";
				}
			}

			var colModel = 
				[
					{
						label: "<img src='index.php?entryPoint=getImage&themeName="+SUGAR.themes.theme_name+"&imageName=attachment.gif' class='image' border='0' width='10' align='absmiddle'>", 
						width: 10, 
						sortable: false, 
						fixed: true,
						resizeable: true,
						formatter: attachIcon,
						key: 'hasAttach'
					}, 
				    {
						label: "<span style='color: #f00; font-weight:bold;'>!</span>", 
						width: widths[0], 
						sortable: true, 
						fixed: true,
						resizeable: true,
						formatter: flaggedIcon,
						key: 'flagged'
					}, 
					{
						label: "<img src='index.php?entryPoint=getImage&themeName="+SUGAR.themes.theme_name+"&imageName=export.gif' class='image' border='0' width='10' align='absmiddle'>", 
						width: widths[1], 
						sortable: true, 
						fixed: true,
						resizeable: true,
						formatter: repliedIcon,
						key: 'status'
					},
					{
						label: app_strings.LBL_EMAIL_FROM, 
						width: widths[2],
						sortable: true,
						resizeable: true,
						key: 'from'
					}, 
					{
						label: app_strings.LBL_EMAIL_SUBJECT,
						width: widths[3], 
						sortable: true,
						resizeable: true,
						key: 'subject'
					}, 
					{
						label: mod_strings.LBL_LIST_DATE,
						width: widths[4], 
						sortable: true,
						resizeable: true,
                        key: 'date'
					}, 
					{
						label: app_strings.LBL_EMAIL_TO,
						width: widths[5], 
						sortable: false,
						resizeable: true,
                        key: 'to_addrs'
					}, 
					{
						label: 'uid',
						hidden: true,
                        key: 'uid'
					}, 
					{
						label: 'mbox',
						hidden: true,
                        key: 'mbox'
					}, 
					{
						label: 'ieId',
						hidden: true,
                        key: 'ieId'
					}, 
					{	
						label: 'site_url',
						hidden: true,
                        key: 'site_url'
					},
					{	label: 'seen',
						hidden: true,
                        key: 'seen'
					},
					{	label: 'type',
						hidden: true,
                        key: 'type'
					}
				];
			
			var dataModel = new YAHOO.util.DataSource(urlBase + "?", {
				responseType: YAHOO.util.DataSource.TYPE_JSON,
				responseSchema: {
				    resultsList: 'Email',
		            fields: ['flagged', 'status', 'from', 'subject', 'date','to_addrs', 'uid', 'mbox', 'ieId', 'site_url', 'seen', 'type', 'AssignedTo','hasAttach'],
		            metaFields: {total: 'TotalCount', unread:"UnreadCount", fromCache: "FromCache"}
				}
		    });
			var params = {
					to_pdf : "true",
					module : "Emails",
					action : "EmailUIAjax",
					emailUIAction : "getMessageList",
					mbox : "INBOX",
					ieId : "",
					forceRefresh : "false"
			};
			if(lazyLoadFolder != null) {
				params['mbox'] = lazyLoadFolder.folder;
				params['ieId'] = lazyLoadFolder.ieId;
				//Check if the folder is a Sugar Folder
				var test = new String(lazyLoadFolder.folder);
				if(test.match(/SUGAR\./)) {
					params['emailUIAction'] = 'getMessageListSugarFolders';
					params['mbox'] = test.substr(6);
				}
			}
			//dataModel.initPaging(urlBase, SUGAR.email2.userPrefs.emailSettings.showNumInList);
	
			// create the Grid
			var grid = SUGAR.email2.grid = new YAHOO.SUGAR.SelectionGrid('emailGrid', colModel, dataModel, {
				MSG_EMPTY: SUGAR.language.get("Emails", "LBL_EMPTY_FOLDER"),
				dynamicData: true,
				paginator: new YAHOO.widget.Paginator({ 
					rowsPerPage:parseInt(SUGAR.email2.userPrefs.emailSettings.showNumInList),  
					containers : ["dt-pag-nav"],
					template: "<div class='pagination'>{FirstPageLink} {PreviousPageLink} {PageLinks} {NextPageLink} {LastPageLink}</div>",
					firstPageLinkLabel: 	"<button class='button'><div class='paginator-start'/></button>",
					previousPageLinkLabel: 	"<button class='button'><div class='paginator-previous'/></button>",
					nextPageLinkLabel: 		"<button class='button'><div class='paginator-next'/></button>",
					lastPageLinkLabel: 		"<button class='button'><div class='paginator-end'/></button>"
				}),
				initialRequest:SUGAR.util.paramsToUrl(params),
				width:  "800px",
				height: "400px"
			});

			initRowDD();

			//Override Paging request construction
			grid.set("generateRequest", function(oState, oSelf) {
	            oState = oState || {pagination:null, sortedBy:null};
	            var sort = (oState.sortedBy) ? oState.sortedBy.key : oSelf.getColumnSet().keys[1].getKey();
	            var dir = (oState.sortedBy && oState.sortedBy.dir === YAHOO.widget.DataTable.CLASS_DESC) ? "desc" : "asc";
	            var startIndex = (oState.pagination) ? oState.pagination.recordOffset : 0;
	            var results = (oState.pagination) ? oState.pagination.rowsPerPage : null;
	            // Build the request 
	            var ret = 
		            SUGAR.util.paramsToUrl(oSelf.params) + 
		            "&sort=" + sort +
	                "&dir=" + dir +
	                "&start=" + startIndex +
	                ((results !== null) ? "&limit=" + results : "");
	            return  ret;
	        });
			
			
			grid.handleDataReturnPayload = function(oRequest, oResponse, oPayload) { 
				oPayload = oPayload || { };
				
				oPayload.totalRecords = oResponse.meta.total;
				oPayload.unreadRecords = oResponse.meta.unread;
				
		        var tabObject = SE.innerLayout.get("tabs")[0];
		        var mboxTitle = "";
		        if (this.params.mbox != null) {
		        	mboxTitle = this.params.mbox;
		        }
		        var tabtext = mboxTitle + " (" + oResponse.meta.total + " " + app_strings.LBL_EMAIL_MESSAGES + " )";
		        tabObject.get("labelEl").firstChild.data = tabtext;
		        
		        if (SE.tree) {
			        var node = SE.tree.getNodeByProperty('id', this.params.ieId) || SE.tree.getNodeByProperty('origText', this.params.mbox);
			        if (node) {
				        node.data.unseen = oResponse.meta.unread;
				        SE.accounts.renderTree();
			        }
		        }
				return oPayload; 
			}
			
			var resize = grid.resizeGrid = function () {
				SUGAR.email2.grid.set("width",  SUGAR.email2.grid.get("element").parentNode.clientWidth + "px");
				SUGAR.email2.grid.set("height", (SUGAR.email2.grid.get("element").parentNode.clientHeight - 47) + "px");
			}
			grid.convertDDRows = function() {
				var rowEl = this.getFirstTrEl();
				while (rowEl != null) {
					new this.DDRow(this, this.getRecord(rowEl), rowEl);
					rowEl = this.getNextTrEl(rowEl);
				}
			}
			
			
			grid.on("columnResizeEvent", function(o) {
				//Find the index of the column
				var colSet = SUGAR.email2.grid.getColumnSet().flat;
				for (var i=0; i < colSet.length; i++) {
					if (o.column == colSet[i]) {
						//Store it in the cookie
						Ck.setSub("EmailGridWidths", i + "", o.width, {expires: SUGAR.email2.nextYear});
					}
				}
				//this.resizeGrid();
			}, null, grid); 
			
			grid.on("postRenderEvent", function() {this.convertDDRows()}, null, grid);
			grid.on("rowClickEvent", SUGAR.email2.listView.handleClick);  
			grid.on("rowDblclickEvent", SUGAR.email2.listView.getEmail);  
			grid.render();
			SUGAR.email2.listViewLayout.on("render", resize);
			resize();
			
			//Setup the default load parameters
			SUGAR.email2.grid.params = params;
			
			grid.on('postRenderEvent', SUGAR.email2.listView.setEmailListStyles);
			dataModel.subscribe("requestEvent", grid.disable, grid, true);
			dataModel.subscribe("responseParseEvent", grid.undisable, grid, true);
		}
	};
	e2Grid.init();
};


function initRowDD() {
	var sg = SUGAR.email2.grid,
	Dom = YAHOO.util.Dom;
	sg.DDRow = function(oDataTable, oRecord, elTr) {
		if(oDataTable && oRecord && elTr) {
			this.ddtable = oDataTable;
	        this.table = oDataTable.getTableEl();
	        this.row = oRecord;
	        this.rowEl = elTr;
	        this.newIndex = null;
	        this.init(elTr);
	        this.initFrame(); // Needed for DDProxy
	        this.invalidHandleTypes = {};
	    }	
	};
	
	YAHOO.extend(sg.DDRow, YAHOO.util.DDProxy, {
	    _resizeProxy: function() {
	        this.constructor.superclass._resizeProxy.apply(this, arguments);
	        var dragEl = this.getDragEl(),
	            el = this.getEl();
	        var xy = Dom.getXY(el);
	        
	        Dom.setStyle(dragEl, 'height', this.rowEl.offsetHeight + "px");
	        Dom.setStyle(dragEl, 'width', (parseInt(Dom.getStyle(dragEl, 'width'),10) + 4) + 'px');
	        Dom.setXY(dragEl, [xy[0] - 100, xy[1] - 20] );
	        Dom.setStyle(dragEl, 'display', "");
	    },
	    
	    startDrag: function(x, y) { 
	    	//Check if we should be dragging a set of rows rather than just the one.
	    	var selectedRows = this.ddtable.getSelectedRows();
	    	var iSelected = false;
	    	for (var i in selectedRows) {
	    		if (this.rowEl.id == selectedRows[i]) {
	    			iSelected = true;
	    			break
	    		}
	    	}
	    	if (iSelected) {
	    		this.rows = [];
	    		for (var i in selectedRows) {
	    			this.rows[i] = this.ddtable.getRecord(selectedRows[i]);
		    	}
	    	} else {
	    		this.rows = [this.row];
	    		this.ddtable.unselectAllRows();
	    		this.ddtable.selectRow(this.row);
	    	}
	    	
	    	//Initialize the dragable proxy
	    	var dragEl = this.getDragEl(); 
	        var clickEl = this.getEl(); 
	        Dom.setStyle(clickEl, "opacity", "0.25"); 
	        dragEl.innerHTML = "<table><tr>" + clickEl.innerHTML + "</tr></table>"; 
	    	Dom.addClass(dragEl, "yui-dt-liner");
	    	Dom.setStyle(dragEl, "opacity", "0.5"); 
	        Dom.setStyle(dragEl, "height", (clickEl.clientHeight - 2) + "px");
	        Dom.setStyle(dragEl, "backgroundColor", Dom.getStyle(clickEl, "backgroundColor")); 
	  	    Dom.setStyle(dragEl, "border", "2px solid gray"); 
	    },
	    
	    clickValidator: function(e) {
	    	if (this.row.getData()[0] == " ")
	    		return false;
	        var target = YAHOO.util.Event.getTarget(e);
	    	return ( this.isValidHandleChild(target) && 
	    			(this.id == this.handleElId || this.DDM.handleWasClicked(target, this.id)) );
	    },
	    /**
	     * This funciton checks that the target of the drag is a table row in this
	     * DDGroup and simply moves the sourceEL to that location as a preview.
	     */
	    onDragOver: function(ev, id) {
	    	var node = SUGAR.email2.tree.getNodeByElement(Dom.get(id));
	    	if (node && node != this.targetNode) {
	    		this.targetNode = node;
	    		SUGAR.email2.folders.unhighliteAll();
	    		node.highlight();
	    	}
	    },
	    
	    onDragOut: function(e, id) {
	    	if (this.targetNode) {
	    		SUGAR.email2.folders.unhighliteAll();
	    		this.targetNode = false;
	    	}
	    },
	    endDrag: function() {
	    	Dom.setStyle(this.getEl(), "opacity", "");
	    	Dom.setStyle(this.getDragEl(), "display", "none"); 
	    	if (this.targetNode) {
	    		SUGAR.email2.folders.handleDrop(this.rows, this.targetNode);
	    	}
	    	SUGAR.email2.folders.unhighliteAll();
	    	this.rows = null;
	    }
	});
}

function AddressSearchGridInit() {
    function moduleIcon(elCell, oRecord, oColumn, oData) {
    	elCell.innerHTML = "<img src='index.php?entryPoint=getImage&themeName="+SUGAR.themes.theme_name+"&imageName=" + oData + ".gif' class='image' border='0' width='16' align='absmiddle'>";
    };
    function selectionCheckBox(elCell, oRecord, oColumn, oData) {
        elCell.innerHTML =  '<input type="checkbox" onclick="SUGAR.email2.addressBook.grid.toggleSelectCheckbox(\'' + oRecord.getId() + '\', this.checked);">';
    };
    var checkHeader = '<input type="checkbox" ';
    if (SUGAR.email2.util.isIe()) {
        checkHeader += 'style="top:-5px" ';
    }
    checkHeader += 'onclick="SUGAR.email2.addressBook.grid.toggleSelectAll(this.checked);">';
    var colModel = 
	    [{
	    	label: checkHeader,
            width: 30,
            formatter: selectionCheckBox,
            key: 'bean_id'
        },
	    {
        	label: mod_strings.LBL_LIST_TYPE,
	        width: 25,
	        formatter: moduleIcon,
	        key: 'bean_module'
        },
	    {
        	label: app_strings.LBL_EMAIL_ADDRESS_BOOK_NAME, 
	        width: 180,
	        sortable: true,
	        key: 'name'
	    }, 
	    {
	    	label: app_strings.LBL_EMAIL_ADDRESS_BOOK_EMAIL_ADDR,
	        width: 300, 
	        sortable: true,
	        key: 'email'
	    }];
    
    var dataModel = new YAHOO.util.DataSource(urlBase + "?", {
		responseType: YAHOO.util.XHRDataSource.TYPE_JSON,
        responseSchema: {
            resultsList: 'Person',
            fields: ['name', 'email', 'bean_id', 'bean_module'],
		    metaFields: {total: 'TotalCount'}
    	},
        //enable sorting on the server accross all data
        remoteSort: true
    });
    dataModel.params = {
		to_pdf		: true,
		module		: "Emails",
		action		: "EmailUIAjax",
		emailUIAction:"getAddressSearchResults"
    }
    var rb = document.getElementById('hasRelatedBean').checked;
	if (rb) {
		var idx = SUGAR.email2.composeLayout.currentInstanceId;
		var relatedBeanId = document.getElementById('data_parent_id' + idx).value;
		var relatedBeanType = document.getElementById('data_parent_type' + idx).value;
		dataModel.params['related_bean_id'] = relatedBeanId;
		dataModel.params['related_bean_type'] = relatedBeanType;
		dataModel.params['person'] = document.getElementById('input_searchPerson').value;
	}
    SUGAR.email2.addressBook.addressBookDataModel = dataModel;
    
    var grid = SUGAR.email2.addressBook.grid = new YAHOO.widget.ScrollingDataTable("addrSearchGrid", colModel, dataModel, {
    	MSG_EMPTY: "&nbsp;", //SUGAR.language.get("Emails", "LBL_EMPTY_FOLDER"),
		dynamicData: true,
		paginator: new YAHOO.widget.Paginator({ 
			rowsPerPage: 25,  
			containers : ["dt-pag-nav-addressbook"],
			template: "<div class='pagination'>{FirstPageLink} {PreviousPageLink} {PageLinks} {NextPageLink} {LastPageLink}</div>",
					firstPageLinkLabel: 	"<button class='button'><div class='paginator-start'/></button>",
					previousPageLinkLabel: 	"<button class='button'><div class='paginator-previous'/></button>",
					nextPageLinkLabel: 		"<button class='button'><div class='paginator-next'/></button>",
					lastPageLinkLabel: 		"<button class='button'><div class='paginator-end'/></button>"
		}),
		initialRequest:SUGAR.util.paramsToUrl(dataModel.params),
		width:  "560px",
		height: "250px"
    });
	//Override Paging request construction
	grid.set("generateRequest", function(oState, oSelf) {
        oState = oState || {pagination:null, sortedBy:null};
        var sort = (oState.sortedBy) ? oState.sortedBy.key : oSelf.getColumnSet().keys[0].getKey();
        var dir = (oState.sortedBy && oState.sortedBy.dir === YAHOO.widget.DataTable.CLASS_DESC) ? "desc" : "asc";
        var startIndex = (oState.pagination) ? oState.pagination.recordOffset : 0;
        var results = (oState.pagination) ? oState.pagination.rowsPerPage : null;
        // Build the request 
        var ret = 
            SUGAR.util.paramsToUrl(oSelf.getDataSource().params) + 
            "&sort=" + sort + "&dir=" + dir + "&start=" + startIndex +
            ((results !== null) ? "&limit=" + results : "");
        return  ret;
    });
    
	grid.handleDataReturnPayload = function(oRequest, oResponse, oPayload) { 
		oPayload = oPayload || { };
		oPayload.totalRecords = oResponse.meta.total;
		return oPayload; 
	}
	
	grid.clickToggleSelect= function(args) {
		var isIE = (args.event.target == null);
		var targetElement = isIE ? args.event.srcElement : args.event.target;
		if(targetElement.type == null || targetElement.type != 'checkbox') {
			SUGAR.email2.addressBook.grid.toggleSelect(args.target.id);
		}
	}
	
	grid.reSelectRowsOnRender = function (){
	    var rows = SUGAR.email2.addressBook.grid.getRecordSet().getRecords();
        for (var i = 0; i < rows.length; i++) 
        {
        	var emailAddress = rows[i].getData("email");
            var alreadyAdded = SUGAR.email2.addressBook.doesEmailAdddressExistInResultTable(emailAddress);
            if(alreadyAdded)
            {
                rows[i].setData("selected",  true);
        		SUGAR.email2.addressBook.grid.selectRow(rows[i]);
            }
            else
            {
                rows[i].setData("selected",  false);
                SUGAR.email2.addressBook.grid.unselectRow(rows[i]);
            }
        }
	}
	grid.subscribe("rowMouseoverEvent", grid.onEventHighlightRow); 
	grid.subscribe("rowMouseoutEvent", grid.onEventUnhighlightRow); 
	grid.subscribe("rowClickEvent", grid.clickToggleSelect);
    grid.subscribe("postRenderEvent", grid.reSelectRowsOnRender);
    
    grid.render();
    dataModel.subscribe("requestEvent", grid.disable, grid, true);
    dataModel.subscribe("responseParseEvent", grid.undisable, grid, true);
    
    grid.toggleSelectCheckbox = function(id,checked){
        var row = SUGAR.email2.addressBook.grid.getRecord(id);
        row.setData("checked",checked);
    };
    grid.toggleSelect = function(id, checked) {
        var row = SUGAR.email2.addressBook.grid.getRecord(id);
    	checked = row.getData("selected");
        if (!checked)
        {
            SUGAR.email2.addressBook.grid.selectRow(row);
            SE.addressBook.insertContactRowToResultTable(id,null)
        } else 
        {
            SUGAR.email2.addressBook.grid.unselectRow(row);
            SE.addressBook.removeRowFromGridResults(id,row.getData("email"));
        }
        row.setData("selected", !checked);
    };
    
    grid.toggleSelectAll = function(checked) {
        rows = SUGAR.email2.addressBook.grid.getRecordSet().getRecords();
        for (var i = 0; i < rows.length; i++) {
			if (typeof(rows[i]) != "undefined")
				rows[i].setData("checked",  checked);
        }
        var checkBoxes = SUGAR.email2.addressBook.grid.get("element").getElementsByTagName('input');
        for (var i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].checked = checked;
        }
    };
    
    //Initialize the grid result table.
    AddressSearchResultsGridInit();
}



/**
*  Initalize the results table for the address book selection.
*
*/
function AddressSearchResultsGridInit()
{
    
    /* Full name sort funciton to compare by last name if available */
    var fullNameSort = function(a, b, desc) {
        // Deal with empty values
        if(!YAHOO.lang.isValue(a))
            return (!YAHOO.lang.isValue(b)) ? 0 : 1;
        else if(!YAHOO.lang.isValue(b))
            return -1;

        var aNames = a.getData("name").split(' ');
        var bNames = b.getData("name").split(' ');

        var aSortField = (aNames.length == 2) ? aNames[1] : a.getData("name");
        var bSortField = (bNames.length == 2) ? bNames[1] : b.getData("name");

        return YAHOO.util.Sort.compare(aSortField,bSortField, desc);

    };
    
    var typeDdOptions = [app_strings.LBL_EMAIL_ADDRESS_BOOK_ADD_TO.replace(/:$/,'') ,
                         app_strings.LBL_EMAIL_ADDRESS_BOOK_ADD_CC.replace(/:$/,''),
                         app_strings.LBL_EMAIL_ADDRESS_BOOK_ADD_BCC.replace(/:$/,'')]; 
              
    var ColumnDefs = [{key:'type',label:app_strings.LBL_EMAIL_ADDRESS_BOOK_ADRRESS_TYPE, width: 60, sortable: true, editor: new YAHOO.widget.RadioCellEditor({radioOptions:typeDdOptions,disableBtns:true})},
                     {key:'name',label:app_strings.LBL_EMAIL_ACCOUNTS_NAME,width: 280,sortable: true, sortOptions:{sortFunction:fullNameSort}}];
     
     var myDataSource = new YAHOO.util.DataSource([]); 
	 myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSARRAY; 
	 myDataSource.responseSchema = { 
	            fields: ["name","type","email_address","display_email_address","bean_id","idx"] 
	        }; 								   
    
	 var gridResults = SUGAR.email2.addressBook.gridResults = new YAHOO.widget.ScrollingDataTable("addrSearchResultGrid", ColumnDefs, myDataSource, {
                        width:  "350px",height: "250px", MSG_EMPTY: "&nbsp;"});
    
     var highlightEditableCell = function(oArgs) {
            var elCell = oArgs.target;
            if(YAHOO.util.Dom.hasClass(elCell, "yui-dt-editable")) {
                this.highlightCell(elCell);
            }
        };
      
     gridResults.subscribe("cellMouseoverEvent", highlightEditableCell);
     gridResults.subscribe("cellMouseoutEvent", gridResults.onEventUnhighlightCell);
     gridResults.subscribe("cellClickEvent", gridResults.onEventShowCellEditor);
     gridResults.subscribe("rowMouseoverEvent", gridResults.onEventHighlightRow); 
	 gridResults.subscribe("rowMouseoutEvent", gridResults.onEventUnhighlightRow); 
     
     //Setup the context menus
     var onContextMenuClick = function(p_sType, p_aArgs, p_myDataTable) { 
	     var task = p_aArgs[1]; 
	     if(task) 
	     { 
	         var elRow = this.contextEventTarget; 
	         elRow = p_myDataTable.getTrEl(elRow); 
	 
	         if(elRow) 
	         { 
	             switch(task.index) 
	             { 
	                 case 0:     
	                     var oRecord = p_myDataTable.getRecord(elRow); 
	                     p_myDataTable.deleteRow(elRow);  
	                     SUGAR.email2.addressBook.grid.reSelectRowsOnRender();    
	             } 
	         } 
	     } 
	 };
     var contextMenu = new YAHOO.widget.ContextMenu("contextmenu", 
	                {trigger:gridResults.getTbodyEl()}); 
	 contextMenu.addItem(app_strings.LBL_EMAIL_DELETE); 
	 contextMenu.render("addrSearchResultGrid"); 
	 contextMenu.clickEvent.subscribe(onContextMenuClick, gridResults); 
}
// End of File modules/Emails/javascript/grid.js
                                
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

 (function() {
	var sw = YAHOO.SUGAR,
		Event = YAHOO.util.Event,
		Connect = YAHOO.util.Connect,
	    Dom = YAHOO.util.Dom
	    SE = SUGAR.email2;

///////////////////////////////////////////////////////////////////////////////
////    ADDRESS BOOK
SE.addressBook = {
    _contactCache : new Array(), // cache of contacts
    _dd : new Array(), // filtered list, same format as _contactCache
    _ddLists : new Array(), // list of Lists
    _dd_mlUsed : new Array(), // contacts in mailing list edit view column1
    _dd_mlAvailable : new Array(), // contacts in mailing list edit view column2
    clickBubble : true, // hack to get around onclick event bubbling
	relatedBeanId : '',
	relatedBeanType : '',
	idx : 0,

    itemSpacing : 'white-space:nowrap; padding:2px;',
    reGUID : SE.reGUID,



    /**
    *  YUI bug fix 2527707.  Causes nested datatable's in <tables> to cause 404 errors whens earching.
    */
    initFixForDatatableSort: function () {
        //Workaround for YUI bug 2527707: http://yuilibrary.com/projects/yui2/ticket/913efafad48ce433199f3e72e4847b18, should be removed when YUI 2.8+ is used
        YAHOO.widget.DataTable.prototype.getColumn = function(column) {
            var oColumn = this._oColumnSet.getColumn(column);

            if(!oColumn) {
                // Validate TD element
                var elCell = column.nodeName.toLowerCase() != "th" ? this.getTdEl(column) : false;
                if(elCell) {
                    oColumn = this._oColumnSet.getColumn(elCell.cellIndex);
                }
                // Validate TH element
                else {
                    elCell = this.getThEl(column);
                    if(elCell) {
                        // Find by TH el ID
                        var allColumns = this._oColumnSet.flat;
                        for(var i=0, len=allColumns.length; i<len; i++) {
                            if(allColumns[i].getThEl().id === elCell.id) {
                                oColumn = allColumns[i];
                            }
                        }
                    }
                }
            }

            return oColumn;
        };
    },

    cancelEdit : function() {
        if(this.editContactDialog)
            this.editContactDialog.hide();
        if(this.editMailingListDialog)
            this.editMailingListDialog.hide();
    },

    /**
     * Clears filter form
     */
    clear : function() {
        var t = document.getElementById('contactsFilter');
        t.value = '';
        this.filter(t);
    },

    /**
     * handle context-menu Compose-to call
     * @param string type 'contacts' or 'lists'
     */
    composeTo : function(type, waited) {
        var activePanel = SUGAR.email2.innerLayout.get("activeTab").get("id")
        if (activePanel.substring(0, 10) != "composeTab") {
            SE.composeLayout.c0_composeNewEmail();
            setTimeout("SE.addressBook.composeTo('" + type + "', true);");
	        SE.contextMenus.contactsContextMenu.hide();
            return;
        }
        var idx = activePanel.substring(10);
        var rows = [ ];
        var id = '';
        // determine if we have a selection to work with
        if(type == 'contacts') {
            var ids = SE.contactView.getSelectedRows();
            for (var i in ids) {
            	rows[i] = SE.contactView.getRecord(ids[i]);
            }
            removeHiddenNodes(rows, SE.contactView);
        } 
		else { return; }

        if(rows.length > 0) {
            SE.composeLayout.handleDrop(
                (type == 'contacts') ? SE.contactView : SE.emailListsView, 
                null, rows, 'addressTO' + idx );
        } else {
            alert(app_strings.LBL_EMAIL_MENU_MAKE_SELECTION);
        }
    },

    editContact : function() {
        SE.contextMenus.contactsContextMenu.hide();
        var element = SE.contactView.getSelectedNodes()[0];
        var elementId = "";
        if (element.className.indexOf('address-contact') > -1) {
            elementId = element.id;
        } else if (element.className.indexOf('address-exp-contact') > -1) {
            elementId = element.id.substring(2);
        }
    },
    

    /**
     * Filters contact entries based on user input
     */
    filter : function(inputEl) {
        var ret = new Object();
        var re = new RegExp(inputEl.value, "gi");

        for(var i in this._contactCache) {
            if(this._contactCache[i].name.match(re)) {
                ret[i] = this._contactCache[i];
            }
        }

        this.buildContactList(ret);
    },

    fullForm : function(id, module) {
        document.location = "index.php?return_module=Emails&return_action=index&module=" + module + "&action=EditView&record=" + id;
    },

    /**
     * returns a formatted email address from the addressBook cache
     */
    getFormattedAddress : function(id) {
        var o = this._contactCache[id];
        var primaryEmail = '';

        for(var i=0; i<o.email.length; i++) {
            var currentEmail = o.email[i].email_address;

            if(o.email[i].primary_address == 1) {
                primaryEmail = o.email[i].email_address;
            }
        }

        var finalEmail = (primaryEmail == "") ? currentEmail : primaryEmail;
        var name = new String(o.name);
        var finalName = name.replace(/(<([^>]+)>)/ig, "").replace(/&#039;/gi,'\'');
        var ret = finalName + " <" + finalEmail.replace(/&#039;/gi,'\'') + ">";

        return ret;
    },
    
    /**
     * Sets up async call to query for matching contacts, users, etc.
     */
    searchContacts : function() {
        var fn = document.getElementById('input_searchField').value;
        var pe = document.getElementById('input_searchPerson').value;
        
        var rb = document.getElementById('hasRelatedBean').checked;
        if (rb) {
			var idx = this.idx;
        	var relatedBeanId = document.getElementById('data_parent_id' + idx).value;
        	var relatedBeanType = document.getElementById('data_parent_type' + idx).value;
        	this.addressBookDataModel.params['related_bean_id'] = relatedBeanId;
        	this.addressBookDataModel.params['related_bean_type'] = relatedBeanType;
        } else {
        	this.addressBookDataModel.params['related_bean_id'] = '';
        }
        
        this.addressBookDataModel.params['search_field'] = fn;
        this.addressBookDataModel.params['person'] = pe;
        this.addressBookDataModel.params['emailUIAction'] = 'getAddressSearchResults';
        this.grid._oDataSource = this.addressBookDataModel;
        this.grid.getDataSource().sendRequest(SUGAR.util.paramsToUrl(this.addressBookDataModel.params),  this.grid.onDataReturnInitializeTable, this.grid);
    },
    
    /**
     * Clear Search Crieteria For Addressbook
     */
    clearAddressBookSearch : function() {
        document.getElementById('input_searchField').value = "";
        document.getElementById('input_searchPerson').selectedIndex = 0;
    },
    
    /**
     * Opens modal select window to add contacts to addressbook
     */
    selectContactsDialogue : function(destId) {
        if(!this.contactsDialogue) {
        	var dlg = this.contactsDialogue = new YAHOO.widget.Dialog("contactsDialogue", {
            	modal:true,
            	visible:false,
            	draggable: false,
            	constraintoviewport: true,
                width   : 980,
                buttons : [{text: app_strings.LBL_EMAIL_ADDRESS_BOOK_ADD, isDefault: true, handler: this.populateEmailAddressFieldsFromResultTable},
                           {text: app_strings.LBL_EMAIL_ADDRESS_BOOK_CLEAR, isDefault: true, handler: this.clearAllEmailAddressFieldsFromResultTable} ]
            });
        	dlg.setHeader(app_strings.LBL_EMAIL_ADDRESS_BOOK_SELECT_TITLE);
        	
        	var body = SUGAR.util.getAndRemove("contactsDialogueHTML");
        	dlg.setBody(body.innerHTML);
        	dlg.renderEvent.subscribe(function() {
            	var iev = YAHOO.util.Dom.get("contactsDialogueBody");
            	if (iev && !SUGAR.isIE) {
            		this.body.style.width = "950px";
            	}
            }, dlg);
            	     
            
        	dlg.beforeRenderEvent.subscribe(function() { 
        		var dd = new YAHOO.util.DDProxy(dlg.element); 
        		dd.setHandleElId(dlg.header); 
        		dd.on('endDragEvent', function() { 
        			dlg.show(); 
        		}); 
        	}, dlg, true); 
        	dlg.render();
        	
        	var tp = new YAHOO.widget.TabView("contactsSearchTabs");
			
        	var tabContent = SUGAR.util.getAndRemove("searchForm");
        	tp.addTab(new YAHOO.widget.Tab({
				label: app_strings.LBL_EMAIL_ADDRESS_BOOK_TITLE,
				scroll : true,
				content : tabContent.innerHTML,
				id : "addressSearchTab",
				active : true
			}));
			
        	var addListenerFields = ['input_searchPerson','input_searchField' ]
        	YAHOO.util.Event.addListener(addListenerFields,"keydown", function(e){
        		if (e.keyCode == 13) {
        			YAHOO.util.Event.stopEvent(e);
        			SUGAR.email2.addressBook.searchContacts();
        		}
        	});

        	this.contactsDialogue.render();
        	dlg.center();
        }
        //Quick Compose does not have an innerLayout component and will always be referenced with ix 0.
        if (typeof(SUGAR.email2.innerLayout) == 'undefined')
            var idx = 0;
        else
        {
            var activePanel = SUGAR.email2.innerLayout.get("activeTab").get("id");
            var idx = activePanel.substring(10);
        }
        SE.addressBook.idx = idx;
        
		var relatedBeanId;
        if ((hasRelatedBeanId = document.getElementById('data_parent_id' + idx).value) != '') {
        	document.getElementById('relatedBeanColumn').style.display = '';
        	var relatedBeanName = document.getElementById('data_parent_name' + idx).value;
		   	var relatedBeanType = document.getElementById('data_parent_type' + idx).value;
		   	relatedBeanId = document.getElementById('data_parent_id' + idx).value;
		   	document.getElementById('relatedBeanInfo').innerHTML = ' ' + relatedBeanType + ' <b>' + relatedBeanName + '</b>';
		   	SE.addressBook.relatedBeanType = relatedBeanType;
	    } else {
	    	document.getElementById('relatedBeanColumn').style.display = 'none';
	    	document.getElementById('hasRelatedBean').checked = false;
	    }
	    
	    if (!SE.addressBook.grid) 
	    {
	    	if (hasRelatedBeanId) {
	    		document.getElementById('hasRelatedBean').checked = true;
	    	}
	        AddressSearchGridInit();
			SE.addressBook.relatedBeanId = relatedBeanId;
	    } 
	    else
	    {
	    	if (typeof(relatedBeanId) != 'undefined' && relatedBeanId != SE.addressBook.relatedBeanId)
	    	{
	    		SE.addressBook.relatedBeanId = relatedBeanId;
	    		document.getElementById('hasRelatedBean').checked = true;
	    	}
	    	if (document.getElementById('hasRelatedBean').checked == true)
	    	{
	    		SE.addressBook.addressBookDataModel.params['related_bean_id'] = relatedBeanId;
	       		SE.addressBook.addressBookDataModel.params['related_bean_type'] = relatedBeanType;
	    	} else {
	    		SE.addressBook.addressBookDataModel.params['related_bean_id'] = '';
	       		SE.addressBook.addressBookDataModel.params['related_bean_type'] = '';
	    	}
	       	SE.addressBook.addressBookDataModel.params['search_field'] = document.getElementById('input_searchField').value;;
			SE.addressBook.addressBookDataModel.params['person'] = document.getElementById('input_searchPerson').value;
    		SE.addressBook.grid.getDataSource().sendRequest(SUGAR.util.paramsToUrl(SE.addressBook.addressBookDataModel.params),  SE.addressBook.grid.onDataReturnInitializeTable, SE.addressBook.grid);
	    }
	    
	    //Remove any lingering rows in the result set table if the module was closed.
	    SE.addressBook.gridResults.deleteRows(0, SUGAR.email2.addressBook.gridResults.getRecordSet().getLength());
	    //Repopulate
	    SE.addressBook.populateResulstTableEmailAddresses();
	    
        this.contactsDialogue.show();
    },
    /**
    *  Clear all email addresses from result table.
    *
    */
    clearAllEmailAddressFieldsFromResultTable: function () {
        SUGAR.email2.addressBook.gridResults.deleteRows(0, SUGAR.email2.addressBook.gridResults.getRecordSet().getLength());
        //Unhighlight any rows currently selected if the emails were cleared.
        SUGAR.email2.addressBook.grid.toggleSelectAll(false);
        SUGAR.email2.addressBook.grid.reSelectRowsOnRender();
    },
    /**
    *  Take all email address listed in the compose tab To|Cc|Bcc fields and re-populates the 
    *  results table.  This function is called when the address book is displayed.
    */
    populateResulstTableEmailAddresses: function () {
      
        var idx = SE.addressBook.idx;
        var emailFields = ['to','cc','bcc'];
        
        for(var k=0;k<emailFields.length;k++)
        {
            var elKey = 'address' + emailFields[k].toUpperCase() + idx;
            var allEmails = document.getElementById(elKey).value;
            if(allEmails == '')
                continue;
            
            var formatedEmails = SE.composeLayout._getEmailArrayFromString(allEmails);
            
    		for (var i=0; i<formatedEmails.length; i++)
    		{
    		    var t_name = formatedEmails[i].name;
    		    var t_emailAddr = formatedEmails[i].email_address;
    		    var displayEmail = t_name + ' <' + t_emailAddr + '>';
    		    if(t_name == '')
    		        t_name = displayEmail = t_emailAddr;
                
    		    var addressType = SE.addressBook.translateAddresType(emailFields[k],true);
                SUGAR.email2.addressBook.gridResults.addRow({'type':addressType,'name':t_name,'email_address': t_emailAddr,
                    'display_email_address': displayEmail,'bean_id': -1,'idx' : SE.addressBook.idx});
    		}
        }  
    },
 
    /**
    * Checks all entries in the result table against a particular email address, returning true
    * if the email address is found, false otherwise.
    */
    doesEmailAdddressExistInResultTable: function(emailAddress)
    {
        if(trim(emailAddress) == '')
            return false;   
            
        var emailAddressFound = false;
        var contacts = SE.addressBook.gridResults.getRecordSet().getRecords();
        for (var i=0; i < contacts.length; i++) 
        {
            var data = SE.addressBook.gridResults.getRecord(contacts[i]).getData();
            //If we are adding to cc or bcc fields, make them visible.
            if(data.email_address == emailAddress)    
            {
                emailAddressFound = true;
                break;
            }
        }
        
        return emailAddressFound;
    },
    /**
    *  Takes all email addresses that the users wishes to add from the address book and populates the To 
    *  fields on the compose tab. 
    */
    populateEmailAddressFieldsFromResultTable: function()
    {
        //Clear the fields first, all email addresses are stored in the address book
        var idx = SE.addressBook.idx;
        var emailFields = ['to','cc','bcc'];    
        for(var k=0;k<emailFields.length;k++)
        {
            var elKey = 'address' + emailFields[k].toUpperCase() + idx;
            document.getElementById(elKey).value = "";
        }
        
        var contacts = SE.addressBook.gridResults.getRecordSet().getRecords();
        for (var i=0; i < contacts.length; i++) 
        {
            var data = SE.addressBook.gridResults.getRecord(contacts[i]).getData();
            
            var addressTypeKey = SE.addressBook.translateAddresType(data.type,false);
            //If we are adding to cc or bcc fields, make them visible.
            if(addressTypeKey =='cc' || addressTypeKey =='bcc')    
                SE.composeLayout.showHiddenAddress(addressTypeKey,data.idx);
            //Construct the target id
            var target_id = 'address' + addressTypeKey.toUpperCase() + data.idx
           
            var target = document.getElementById(target_id);
            target.value = SE.addressBook.smartAddEmailAddressToComposeField(target.value, data.display_email_address);
        }
        
        //Delete all rows from the result set table
        SUGAR.email2.addressBook.gridResults.deleteRows(0, SUGAR.email2.addressBook.gridResults.getRecordSet().getLength());
        
        //Hide the dialogue
        SE.addressBook.contactsDialogue.hide()
    },
    /**
    *  Insert contacts into the result table.
    */
    insertContactToResultTable : function(event,address_type) {
    
        var contactsDialogue = SE.addressBook.contactsDialogue;
        var contacts = SE.addressBook.grid.getSelectedRows();
        
        var rows = SUGAR.email2.addressBook.grid.getRecordSet().getRecords();
        for (var i = 0; i < rows.length; i++) 
        {
			if (typeof(rows[i]) != "undefined" && rows[i].getData().checked )
			{
			    var recId = SE.addressBook.grid.getRecord(rows[i]).getId();
                SE.addressBook.insertContactRowToResultTable(recId,address_type);
                SUGAR.email2.addressBook.grid.selectRow(rows[i]);
                rows[i].setData("selected",true);
			}
        }
        var checkBoxes = SUGAR.email2.addressBook.grid.get("element").getElementsByTagName('input');
        for (var i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].checked = false;
        }
    },
    /**
    *
    */
    insertContactRowToResultTable : function(rowId, addressType) {
        var data = SE.addressBook.grid.getRecord(rowId).getData();
        if(SE.addressBook.doesGridResultsEntryExist(data.email) )
                return;
        var name = data.name.replace(/&#039;/gi,'\'').replace(/&quot;/gi,'"');
        var ea = name + ' <' + data.email.replace(/&#039;/gi,'\'') + '>';
        if(addressType == null)
            addressType = app_strings.LBL_EMAIL_ADDRESS_BOOK_ADD_TO.replace(/:$/,''); //Default to To when using the plus icon.
        SUGAR.email2.addressBook.gridResults.addRow({'type':addressType,'name':name,'email_address': data.email,'display_email_address': ea,'bean_id': data.bean_id,'idx' : SE.addressBook.idx});
    },
    /**
    * Remove a row from the gridsResult table.
    */
    removeRowFromGridResults : function(rowId,emailAddress)
    {
        var contacts = SE.addressBook.gridResults.getRecordSet().getRecords();
        for (var i=0; i < contacts.length; i++) 
        {
            var rec = SE.addressBook.gridResults.getRecord(contacts[i]);
            var data = rec.getData();
            if(data.email_address == emailAddress)
            {
                SUGAR.email2.addressBook.gridResults.deleteRow(rec.getId());
                break;
            }
        }
        
       SUGAR.email2.addressBook.toggleSearchRowIcon(rowId,true);
    },
    /**
    * Translates between the addressType To|Cc|Bcc labels/keys.  
    */
    translateAddresType: function(addressType,fromKey)
    {
        var displayTo = app_strings.LBL_EMAIL_ADDRESS_BOOK_ADD_TO.replace(/:$/,'');
        var displayCc = app_strings.LBL_EMAIL_ADDRESS_BOOK_ADD_CC.replace(/:$/,'');
        var displayBcc = app_strings.LBL_EMAIL_ADDRESS_BOOK_ADD_BCC.replace(/:$/,''); 
        var mappingObject = {};
        
        if(fromKey)
            mappingObject = {'to':displayTo, 'cc':displayCc, 'bcc':displayBcc};
        else
        {
            mappingObject[displayTo] = 'to'; //Cant use object literal with variable variable.
            mappingObject[displayCc] = 'cc';
            mappingObject[displayBcc] = 'bcc';
        }
            
        return typeof(mappingObject[addressType]) != 'undefined' ? mappingObject[addressType] : '';
          
    },
    /**
    *
    */
    toggleSearchRowIcon : function(rowId,show) 
    {
        if(show)
        {
            var idToShow = rowId + '_add_img';
            var idToHide = rowId + '_rm_img';
        }
        else
        {
            var idToShow = rowId + '_rm_img';
            var idToHide = rowId + '_add_img';
        }


        Dom.addClass(idToHide, "yui-hidden");
        Dom.removeClass(idToShow, "yui-hidden");
    },
    /**
    * Determine if an entry has already been added to the grid results table to prevent duplicates.
    */
    doesGridResultsEntryExist: function(emailAddrs)
    {
        
        var contactExists = false;
        var contacts = SE.addressBook.gridResults.getRecordSet().getRecords();
        for (var i=0; i < contacts.length; i++) 
        {
            var data = SE.addressBook.gridResults.getRecord(contacts[i]).getData();
            if(data.email_address == emailAddrs)
            {
                contactExists = true;
                break;
            }
        }
        return contactExists;
    },
    
    /**
     * adds an email address to a string, but first checks if it exists
     * @param string concat The string we are appending email addresses to
     * @param string addr Email address to add
     * @return string
     */
    smartAddEmailAddressToComposeField : function(concat, addr) {
        var re = new RegExp(addr);

        if(!concat.match(re)) {
            if(concat != "") {
                concat += "; " + addr;
            } else {
                concat = addr;
            }
        }

        return concat;
    }
};
////    END ADDRESS BOOK
///////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////
////    AUTOCOMPLETE
/**
 * Auto-complete object
 */
SE.autoComplete = {
    config : {
        delimChar : [";", ","],
        useShadow :    false,
        useIFrame : false,
        typeAhead : true,
        prehighlightClassName : "yui-ac-prehighlight",
        queryDelay : 0
    },
    instances : new Array(),

    /**
     * Parses an addressBook entry looking for primary address.  If not found, it will return the last found address.
     * @param object Contact from AddressBook
     * @return string
     */
    getPrimaryAddress : function(contact) {
        var address = app_strings.LBL_EMAIL_ADDRESS_BOOK_NOT_FOUND;

        for(var eIndex in contact.email) {
            address = contact.email[eIndex].email_address;
            if(contact.email[eIndex].primary_address == 1) {
                return contact.email[eIndex].email_address;
            }
        }
        return address;
    },
    

    /**
     * initializes autocomplete widgets for a given compose view
     * @param int idx
     */
    init : function(idx) {
        var ds = new YAHOO.widget.DS_JSArray(this.returnDataSource(SE.addressBook._contactCache), {
            "queryMatchContains" : false,
            "queryMatchSubset" : true
        });

        this.instances[idx] = {
            to : null,
            cc : null,
            bcc : null
        };

   
        // instantiate the autoComplete widgets
        this.instances[idx]['to'] = new YAHOO.widget.AutoComplete('addressTO'+idx, "addressToAC"+idx, ds, this.config);
        this.instances[idx]['cc'] = new YAHOO.widget.AutoComplete('addressCC'+idx, "addressCcAC"+idx, ds, this.config);
        this.instances[idx]['bcc'] = new YAHOO.widget.AutoComplete('addressBCC'+idx, "addressBccAC"+idx, ds, this.config);

        // enable hiding of interfering textareas
        this.instances[idx]['to'].containerExpandEvent.subscribe(SE.autoComplete.toggleTextareaHide);
        this.instances[idx]['cc'].containerExpandEvent.subscribe(SE.autoComplete.toggleTextareaHide);
        this.instances[idx]['bcc'].containerExpandEvent.subscribe(SE.autoComplete.toggleTextareaHide);

        // enable reshowing of hidden textareas
        this.instances[idx]['to'].containerCollapseEvent.subscribe(SE.autoComplete.toggleTextareaShow);
        this.instances[idx]['cc'].containerCollapseEvent.subscribe(SE.autoComplete.toggleTextareaShow);
        this.instances[idx]['bcc'].containerCollapseEvent.subscribe(SE.autoComplete.toggleTextareaShow);

        // enable refreshes of contact lists
        this.instances[idx]['to'].textboxFocusEvent.subscribe(SE.autoComplete.refreshDataSource);
        this.instances[idx]['cc'].textboxFocusEvent.subscribe(SE.autoComplete.refreshDataSource);
        this.instances[idx]['bcc'].textboxFocusEvent.subscribe(SE.autoComplete.refreshDataSource);
    },

    refreshDataSource : function(sType, aArgs) {
        var textBoxId = aArgs[0].getInputEl().id; // "addressTo0"
        var idx;
        var refresh = SE.autoComplete.returnDataSource(SE.addressBook._contactCache);

        if(textBoxId.indexOf("addressTO") > -1 || textBoxId.indexOf("addressCC") > -1) {
            idx = textBoxId.substr(9);
        } else {
            idx = textBoxId.substr(10);
        }

        SE.autoComplete.instances[idx]['to'].dataSource.data = refresh;
        SE.autoComplete.instances[idx]['cc'].dataSource.data = refresh;
        SE.autoComplete.instances[idx]['bcc'].dataSource.data = refresh;
    },

    /**
     * Parses AddressBook entries to return an appropriate DataSource array for YUI.autoComplete
     */
    returnDataSource : function(contacts) {
        var ret = new Array();
        for(var id in contacts) {
            if (contacts[id].name) {
	            var primary = this.getPrimaryAddress(contacts[id]);
	
	            ret[ret.length] = contacts[id].name.replace(/<[\/]*b>/gi, '') + " <" + primary + ">";
	            //ret[ret.length] = contacts[id].name + " <" + primary + ">";
	
	            for(var emailIndex in contacts[id].email) {
	                ret[ret.length] = contacts[id].email[emailIndex].email_address;
	            }
            }
        }

        return ret;
    },

    /**
     * Hides address textareas to prevent autocomplete dropdown from being obscured
     */
    toggleTextareaHide : function(sType, aArgs) {
        var textBoxId = aArgs[0]._oTextbox.id; // "addressTo0"
        var type = "";
        var idx = -1;

        if(textBoxId.indexOf("addressTO") > -1) {
            type = "to";
        } else if(textBoxId.indexOf("addressCC") > -1) {
            type = "cc";
        }
        idx = textBoxId.substr(9);

        // follow through if not BCC
        if(type != "") {
            var cc = document.getElementById("addressCC" + idx);
            var bcc = document.getElementById("addressBCC" + idx);

            switch(type) {
                case "to":
                    cc.style.visibility = 'hidden';
                case "cc":
                    bcc.style.visibility = 'hidden';
                break;
            }
        }
    },

    /**
     * Redisplays the textareas after an address is commited
     */
    toggleTextareaShow : function(sType, aArgs) {
        var textBoxId = aArgs[0]._oTextbox.id; // "addressTo0"
        var type = "";
        var idx = -1;

        if(textBoxId.indexOf("addressTO") > -1) {
            type = "to";
        } else if(textBoxId.indexOf("addressCC") > -1) {
            type = "cc";
        }
        idx = textBoxId.substr(9);

        // follow through if not BCC
        if(type != "") {
            document.getElementById("addressCC" + idx).style.visibility = 'visible';
            document.getElementById("addressBCC" + idx).style.visibility = 'visible';
        }
    }
};

////    END AUTOCOMPLETE
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
////    COMPOSE & SEND
/**
 * expands the options sidebar
 */
SE.composeLayout = {
    currentInstanceId : 0,
    ccHidden : true,
    bccHidden : true,
    outboundAccountErrors : null,
    loadedTinyInstances : {}, //Tracks which tinyMCE editors have initalized with html content.

    showAddressDetails : function(e) {
    	var linkElement = document.getElementById("More"+e.id);
    	var spanElement = document.getElementById("Detail"+e.id);
    	var emailAddressList = e.value;
    	if(e.value.length > 96) 
    	{
        	var resultArray = SE.composeLayout._getEmailArrayFromString(emailAddressList);
            var displayArray = [];
    		for (var i=0; i<resultArray.length; i++)
    		{
    		    var t_name = resultArray[i].name;
    		    var t_emailAddr = resultArray[i].email_address;
    		    if(t_name == '')
    		       displayArray.push('<br/>&lt;' + t_emailAddr + '&gt;');
    		    else
    		       displayArray.push(t_name + '<br/>&lt;' + t_emailAddr + '&gt;');     
    		}
        		
            var result = displayArray.join('<br/>');
        	// Display
            linkElement.style.display = "inline";
            linkElement.style.height="10px";
            linkElement.style.overflow="visible";
            spanElement.innerHTML = result;
    	} 
    	else 
    		linkElement.style.display = "none";
    	
	},

   /**
    *  Given a string of email address, return an array containing the name portion (if available)
    *  and email portion.
    */
    _getEmailArrayFromString : function (emailAddressList){
      
        var reg = /@.*?;/g;
        while ((results = reg.exec(emailAddressList)) != null) 
        {
            orignial = results[0];
            parsedResult = results[0].replace(';', ':::::');
            emailAddressList = emailAddressList.replace (orignial, parsedResult);
        }

        reg = /@.*?,/g;
        while ((results = reg.exec(emailAddressList)) != null) 
        {
            orignial = results[0];
            parsedResult = results[0].replace(',', ':::::');
            emailAddressList = emailAddressList.replace (orignial, parsedResult);
        }
        //Administrator <johndoe@som.com>  ;1@somwhe.com;2@somwherecomplex.com,3@somwherecomplex.com;4@somwherecomplex.com,5@somwherecomplex.com,
        var emailArr = emailAddressList.split(":::::");
        var resultsArray = [];
        var newArr = [];
        for (var i=0; i<emailArr.length; i++) 
        {
            var rposition = emailArr[i].indexOf('<');
            var lposition = emailArr[i].indexOf('>');

            if(trim(emailArr[i]) != '')
            {
                if(rposition != -1 && lposition != -1)
                {
                    var t_name = emailArr[i].substr(0, rposition-1);
                    var t_emailAddr = emailArr[i].substr(rposition+1, (lposition-1 - rposition) );
                    resultsArray.push({'name':t_name, 'email_address': t_emailAddr});
                }
                else
                {
                    resultsArray.push({'name':'', 'email_address': emailArr[i]});
                }
            }
        }
        return resultsArray;  
    },
    ///////////////////////////////////////////////////////////////////////////
    ////    COMPOSE FLOW
    /**
     * Prepare bucket DIV and yui-ext tab panels
     */
    _0_yui : function() {
        var idx = this.currentInstanceId;

        var composeTab = new YAHOO.SUGAR.ClosableTab({
        		label: mod_strings.LNK_NEW_SEND_EMAIL,
				scroll : true,
				content : "<div id='htmleditordiv" + idx + "'/>",
				id : "composeTab" + idx,
				closeMsg: app_strings.LBL_EMAIL_CONFIRM_CLOSE,
				active : true
        }, SE.innerLayout);
        SE.innerLayout.addTab(composeTab);
        
        // get template engine with template
        if (!SE.composeLayout.composeTemplate) {
        	SE.composeLayout.composeTemplate = new YAHOO.SUGAR.Template(SE.templates['compose']);
        }
        
        // create Tab inner layout
        var composePanel =  this.getComposeLayout();
        composePanel.getUnitByPosition("right").collapse();
        composePanel.autoSize();
       
    },
	/**
     * Generate the quick compose layout
	 * @method getQuickComposeLayout
	 * @param {Pannel} parentPanel Parent pannel
	 * @param {Object} o Options
	 * @return {} none
	 **/
    getQuickComposeLayout : function (parentPanel,o) {
    	 var idx = SE.composeLayout.currentInstanceId;

    	 //Before rendering the parent pannel we need to initalize the grid layout
    	 parentPanel.beforeRenderEvent.subscribe(function() {
    	 	
    	 	YAHOO.util.Event.onAvailable('htmleditordiv' + idx, function() {
    	 		SE.composeLayout._createComposeLayout(idx);
    	 		SE.composeLayout[idx].set('height', 350);
	        	SE.composeLayout[idx].render();
           });
        });

     	 //Wait until the Compose Layout has rendered, then add the 
     	 //options tab and perform the tiny initialization.
         parentPanel.renderEvent.subscribe(function() {
    	 	
    	 	YAHOO.util.Event.onAvailable('htmleditordiv' + idx, function() {
     		SE.composeLayout._initComposeOptionTabs(idx);
     		SE.composeLayout[idx].getUnitByPosition("right").collapse();
     		//Initialize tinyMCE
     		if (!SUGAR.util.isTouchScreen())
     		    SE.composeLayout._1_tiny();
     		//Init templates and address book
     		SE.composeLayout._2_final();

            SE.composeLayout.quickCreateComposePackage(o);	

    	 	});
    	 });
    	   	
	    //Check if we have the div override for the shortcut bar
        if(typeof o.menu_id != 'undefined') {
		   parentPanel.render(o.menu_id);    
	    } else {
		   parentPanel.render(document.body); 
	    }
        
        return SE.composeLayout[idx];
    },
    /**
     * Fill in all fields into the quick compose layout.
	 * @method quickCreateComposePackage
	 * @param {Object} o Options
	 * @return {} none
	 **/
    quickCreateComposePackage: function(o)
    {
        //If we have a compose package fill in defaults.
        if (typeof(o.composePackage) != 'undefined')
        {
            composePackage = o.composePackage; //Set the compose data object
            //Hijack this method called by composePackage as it's not need for quick creates.
            SE.composeLayout.c0_composeNewEmail = function(){};
            SE.composeLayout.composePackage(); //Fill in defaults.
        }
    },
    getComposeLayout : function() {
        var idx = SE.composeLayout.currentInstanceId;
      
       	this._createComposeLayout(idx); 
        SE.composeLayout[idx].render();
        this._initComposeOptionTabs(idx);
        
        return SE.composeLayout[idx];
        },
        
        /**
        *	Create the layout manager for the compose window.
        */
        _createComposeLayout : function(idx)
        {
        	SE.composeLayout[idx] = new YAHOO.widget.Layout('htmleditordiv' + idx, {
        	parent: SE.complexLayout,
        	border:true,
            hideOnLayout: true,
            height: 400,
			units: [{
					position: "center",
	                animate: false,
	                scroll: false,
	                split:true,
	                body: 	
	                	SE.composeLayout.composeTemplate.exec({
	                        'app_strings':app_strings,
	                        'mod_strings':mod_strings,
	                        'theme': theme,
	                        'linkbeans_options' : linkBeans,
	                        'idx' : SE.composeLayout.currentInstanceId
	                	})
	            },{
	            	position: "right",
				    scroll:true,
				    collapse: true,
				    collapsed: true,
				    resize: true,
				    border:true,
				    animate: false,
				    width:'230',
				    body: "<div class='composeRightTabs' id='composeRightTabs" + idx + "'/>",
				    titlebar: true,
				    split: true,
				    header: app_strings.LBL_EMAIL_OPTIONS
	            }]
	        });
        },
        
        /**
        *  Create compose tab which will populate the 'right' container in the compose window.
        */
        _initComposeOptionTabs : function(idx) 
        {
	        var cTabs = new YAHOO.widget.TabView("composeRightTabs" + idx);
	        var tab = new YAHOO.widget.Tab({ 
				label: app_strings.LBL_EMAIL_ATTACHMENT,
				scroll : true,
				content : SUGAR.util.getAndRemove("divAttachments" + idx).innerHTML,
				id : "divAttachments" + idx,
				active : true
			});
	
	        tab.layout = SE.composeLayout[idx];

     	   tab.on("activeChange", function(o){ 
        		if (o.newValue) {
        			this.layout.getUnitByPosition("right").set("header", app_strings.LBL_EMAIL_ATTACHMENT);
        		}
       		});

        	cTabs.addTab(tab);

	        tab = new YAHOO.widget.Tab({ 
				label: app_strings.LBL_EMAIL_OPTIONS,
				scroll : true,
				content : SUGAR.util.getAndRemove("divOptions" + idx).innerHTML,
				id : "divOptions" + idx,
				active : false
			});
		
	        tab.layout = SE.composeLayout[idx];
	        tab.on("activeChange", function(o){ 
	        	if (o.newValue) {
	        		this.layout.getUnitByPosition("right").set("header", app_strings.LBL_EMAIL_OPTIONS);
	        	}
	        });
        	cTabs.addTab(tab);
        
	        SE.composeLayout[idx].autoSize = function() {
	        	var pEl = this.get("element").parentNode.parentNode.parentNode;
	        	this.set("height", pEl.clientHeight-30);
	        	this.render();
	        }
        
        	SE.composeLayout[idx].rightTabs = cTabs;
    },
    isParentTypeValid : function(idx) {
		var parentTypeValue = document.getElementById('data_parent_type' + idx).value;
		var parentNameValue = document.getElementById('data_parent_name' + idx).value;
		if (trim(parentTypeValue) == ""){
			alert(mod_strings.LBL_ERROR_SELECT_MODULE);
			return false;
		} // if
		return true;
    },
    
    isParentTypeAndNameValid : function(idx) {
		var parentTypeValue = document.getElementById('data_parent_type' + idx).value;
		var parentNameValue = document.getElementById('data_parent_name' + idx).value;
		var parentIdValue = document.getElementById('data_parent_id' + idx).value;
		if ((trim(parentTypeValue) != "" && trim(parentNameValue) == "") || 
			(trim(parentTypeValue) != "" && trim(parentNameValue) != "" && parentIdValue == "")){
				alert(mod_strings.LBL_ERROR_SELECT_MODULE_SELECT);
			return false;
		} // if
		return true;
    },

    callopenpopupForEmail2 : function(idx,options) {
        
        var formName = 'emailCompose' + idx;
        
        if(typeof(options) != 'undefined' && typeof(options.form_name) != 'undefined')
            formName = options.form_name;   
            
		var parentTypeValue = document.getElementById('data_parent_type' + idx).value;
		var parentNameValue = document.getElementById('data_parent_name' + idx).value;
		if (!SE.composeLayout.isParentTypeValid(idx)) {
			return;
		} // if
		open_popup(document.getElementById('data_parent_type' + idx).value,600,400,'&tree=ProductsProd',true,false,
		{
			call_back_function:"SE.composeLayout.popupAddEmail",
			form_name:formName,
			field_to_name_array:{
				id:'data_parent_id' + idx,
				name:'data_parent_name' + idx,
				email1:'email1'}
		}); 	
	},    
	
	popupAddEmail : function(o)
	{
		var nameKey = "data_parent_name" + SE.composeLayout.currentInstanceId;
		var data = o.name_to_value_array;
		if (typeof (data[nameKey]) != "undefined" && data[nameKey] != "" 
			&& typeof (data["email1"]) != "undefined" && data["email1"] != "" && data["email1"] != "undefined")
        {
        	var target = Dom.get("addressTO" + SE.composeLayout.currentInstanceId);
        	target.value = SE.addressBook.smartAddEmailAddressToComposeField(target.value, data[nameKey] + "<" + data.email1 + ">");
        }
		set_return(o);
	},
    /**
     * Prepare TinyMCE
     */
    _1_tiny : function() {
        var idx = SE.composeLayout.currentInstanceId;
        var elId = SE.tinyInstances.currentHtmleditor = 'htmleditor' + idx;
        SE.tinyInstances[elId] = { };
        SE.tinyInstances[elId].ready = false;
        var t = tinyMCE.getInstanceById(elId);

        if(typeof(t) == 'undefined')  {
            tinyMCE.execCommand('mceAddControl', false, elId);
            YAHOO.util.Event.onAvailable(elId + "_parent", function() {
            	SE.composeLayout.resizeEditor(idx);
                setTimeout("SUGAR.email2.composeLayout.setSignature('" + idx + "')", 1000);
            }, this);
        }
    },
    
    resizeEditor : function(idx)
    {
    	var cof = Dom.get('composeOverFrame' + idx);
        var head = Dom.get('composeHeaderTable' + idx);
        var targetHeight = cof.clientHeight - head.clientHeight;
    	var instance =  tinyMCE.get(SE.tinyInstances.currentHtmleditor);                
    	
    	var parentEl = Dom.get(instance.editorId + '_parent');
    	var toolbar = Dom.getElementsByClassName("mceFirst", "tr", parentEl)[0];
    	var contentEl  = instance.contentAreaContainer;
        var iFrame = contentEl.firstChild;
        var tinMceToolbarOffset = 18;
        iFrame.style.height = (targetHeight - toolbar.offsetHeight - tinMceToolbarOffset)  + "px";
    },

    /**
     * Initializes d&d, auto-complete, email templates
     */
    _2_final : function() {
        var idx = SE.composeLayout.currentInstanceId;

        if(this.emailTemplates) {
            this.setComposeOptions(idx);
        } else {
            //populate email template cache
            AjaxObject.target = '';
            AjaxObject.startRequest(callbackComposeCache, urlStandard + "&emailUIAction=fillComposeCache");
        }

        // handle drop targets for addressBook
       var to =  new YAHOO.util.DDTarget('addressTO' +idx, 'addressBookDD', {notifyDrop:this.handleDrop});
       var cc =  new YAHOO.util.DDTarget('addressCC' +idx, 'addressBookDD', {notifyDrop:this.handleDrop});
       var bcc = new YAHOO.util.DDTarget('addressBCC'+idx, 'addressBookDD', {notifyDrop:this.handleDrop});
       to.notifyDrop = cc.notifyDrop = bcc.notifyDrop = this.handleDrop;

        // auto-complete setup
        SE.autoComplete.init(idx);

        // set focus on to:
        document.getElementById("addressTO" + idx).focus();
    },

	/**
     * hide tinyMCE tool bar if send email as plaintext is checked
     */
    renderTinyMCEToolBar : function (idx, hide) {
    	if (hide) {
    		document.getElementById('htmleditor' + idx + '_toolbar1').style.display = 'none';
    	} else {
    		document.getElementById('htmleditor' + idx + '_toolbar1').style.display = '';
    	}
    },

    c1_composeEmail : function(isReplyForward, retry) {
        if (!retry) {
            this._0_yui();
        }
        if (typeof(tinyMCE) == 'undefined' || typeof(tinyMCE.settings) == 'undefined'){
            setTimeout("SE.composeLayout.c1_composeEmail(" + isReplyForward + ", true);", 500);
        } else {
	        this._1_tiny();
	        this._2_final();
	
	        if(isReplyForward) {
	            this.replyForwardEmailStage2();
	        }
        }
    },

    /**
     * takes draft info and prepopulates
     */
    c0_composeDraft : function() {
        this.getNewInstanceId();
        inCompose = true;
        document.getElementById('_blank').innerHTML = '';
        var idx = SE.composeLayout.currentInstanceId;
		SE.composeLayout.draftObject = new Object();
		SE.composeLayout.draftObject.id = idx;
		SE.composeLayout.draftObject.isDraft = true;
        SE.composeLayout.currentInstanceId = idx;
        SE.tinyInstances.currentHtmleditor = 'htmleditor' + SE.composeLayout.currentInstanceId;
        SE.tinyInstances[SE.tinyInstances.currentHtmleditor] = new Object();
        SE.tinyInstances[SE.tinyInstances.currentHtmleditor].ready = false;

        SE.composeLayout._0_yui();
        SE.composeLayout._1_tiny();

        // final touches
        SE.composeLayout._2_final();

        /* Draft-specific final processing. Need a delay to allow Tiny to render before calling setText() */
        setTimeout("AjaxObject.handleReplyForwardForDraft(SE.o);", 1000);
    },

    /**
     * Strip & Prep editor hidden fields
     */
    c0_composeNewEmail : function() {
        this.getNewInstanceId();
        this.c1_composeEmail(false);
    },

    /**
     * Sends async request to get the compose view.
     * Requests come from "reply" or "forwards"
     */
    c0_replyForwardEmail : function(ieId, uid, mbox, type) {
        SE.composeLayout.replyForwardObj = new Object();
        SE.composeLayout.replyForwardObj.ieId = ieId;
        SE.composeLayout.replyForwardObj.uid = uid;
        SE.composeLayout.replyForwardObj.mbox = mbox;
        SE.composeLayout.replyForwardObj.type = type;

        if(mbox == 'sugar::Emails') {
            SE.composeLayout.replyForwardObj.sugarEmail = true;
        }

        SE.composeLayout.getNewInstanceId();
        SE.composeLayout.c1_composeEmail(true);
    },
    ////    END COMPOSE FLOW
    ///////////////////////////////////////////////////////////////////////////

    /**
     * Called when a contact, email, or mailinglist is dropped
     * into one of the compose fields.
     */
    handleDrop : function (source, event, data, target) {
        var nodes;
        if (!target) {
            target = event.getTarget();
            if (data.single) {
                data.nodes = [data.nodes];
            }
            nodes = data.nodes;
        } else {
            target = document.getElementById(target);
            nodes = data;
        }
        
        if (target.id.indexOf('address') > -1) {
            // dropped onto email to/cc/bcc field
            for(var i in nodes) {
            	var node = nodes[i].getData();
            	var email = "";
                if (node[1].indexOf('contact') > -1) {
                    email = SE.addressBook.getFormattedAddress(node[0]);
                } else if (node[1].indexOf('address-email') > -1){
                    email = node[3].replace(/&nbsp;/gi, '');
                    email = email.replace('&lt;', '<').replace('&gt;', '>');
                    var tr = source.getTrEl(nodes[i]);
                    while (tr && !Dom.hasClass(tr, "address-contact")) {
                    	tr = source.getPreviousTrEl(tr);
                    }
                    var CID = source.getRecord(tr).getData()[0];
                    var o = SE.addressBook._contactCache[CID];
                    var name = new String(o.name);
                    var finalName = name.replace(/(<([^>]+)>)/ig, "");
                    email = finalName + email;
                }
                target.value = SE.addressBook.smartAddEmailAddressToComposeField(target.value, email);              
            }
        }
    },


    /*/////////////////////////////////////////////////////////////////////////////
    ///    EMAIL TEMPLATE CODE
     */
    applyEmailTemplate : function (idx, id) {
    	        
        //bug #20680
        var box_title = mod_strings.LBL_EMAILTEMPLATE_MESSAGE_SHOW_TITLE;
		var box_msg = mod_strings.LBL_EMAILTEMPLATE_MESSAGE_SHOW_MSG;
		var box_none_msg = mod_strings.LBL_EMAILTEMPLATE_MESSAGE_CLEAR_MSG;
		//Bug #6224
		var to_addr = document.getElementById('addressTO'+idx);
		if (to_addr.value.search(/[^;,]{6,}[;,][^;,]{6,}/) != -1) {
			box_title = mod_strings.LBL_EMAILTEMPLATE_MESSAGE_WARNING_TITLE;
			box_msg = mod_strings.LBL_EMAILTEMPLATE_MESSAGE_MULTIPLE_RECIPIENTS + '<br /><br />' + box_msg;
		}
		
		// id is selected index of email template drop-down
		if(id == '' || id == "0") {
			YAHOO.SUGAR.MessageBox.show({
	           title:box_title,
	           msg: box_none_msg,
	           type: 'confirm',
	           fn: function(btn){
	           		if(btn=='no'){return;};	           		
	           		SUGAR.email2.composeLayout.processNoneResult(idx, id);},
	           modal:true,
	           scope:this
	       });
	       return;
		} 
	
		YAHOO.SUGAR.MessageBox.show({
           title:box_title,
           msg: box_msg,
           type: 'confirm',
           fn: function(btn){
           		if(btn=='no'){return;};
           		SUGAR.email2.composeLayout.processResult(idx, id);},
           modal:true,
           scope:this
       });
    },
    
    processNoneResult : function(idx, id) {
        var tiny = SE.util.getTiny('htmleditor' + idx);
        var tinyHTML = tiny.getContent();
        var openTag = '<div><span><span>';
        var htmllow = tinyHTML.toLowerCase();
        var start = htmllow.indexOf(openTag);
		if (start > -1) {
	        tinyHTML = tinyHTML.substr(start);
	        tiny.setContent(tinyHTML);
		} else {
        	tiny.setContent('');
		}    	
    },
	
	processResult : function(idx , id){
        call_json_method('EmailTemplates','retrieve','record='+id,'email_template_object', this.appendEmailTemplateJSON);

        // get attachments if any
        AjaxObject.target = '';
        AjaxObject.startRequest(callbackLoadAttachments, urlStandard + "&emailUIAction=getTemplateAttachments&parent_id=" + id);
    },

    appendEmailTemplateJSON : function() {
        var idx = SE.composeLayout.currentInstanceId; // post increment

        // query based on template, contact_id0,related_to
        //jchi 09/10/2008 refix #7743
        if(json_objects['email_template_object']['fields']['subject'] != '' ) { // cn: bug 7743, don't stomp populated Subject Line
            document.getElementById('emailSubject' + idx).value = decodeURI(encodeURI(json_objects['email_template_object']['fields']['subject']));
        }

        var text = decodeURI(encodeURI(json_objects['email_template_object']['fields']['body_html'])).replace(/<BR>/ig, '\n').replace(/<br>/gi, "\n").replace(/&amp;/gi,'&').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/&#039;/gi,'\'').replace(/&quot;/gi,'"');

        // cn: bug 14361 - text-only templates don't fill compose screen
        if(text == '') {
            text = decodeURI(encodeURI(json_objects['email_template_object']['fields']['body'])).replace(/<BR>/ig, '\n').replace(/<br>/gi, "\n").replace(/&amp;/gi,'&').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/&#039;/gi,'\'').replace(/&quot;/gi,'"').replace(/\r\n/gi,"<br/>");
        }

        var tiny = SE.util.getTiny('htmleditor' + idx);
        var tinyHTML = tiny.getContent();
        var openTag = '<div><span><span>';
        var closeTag = '</span></span></div>';
        var htmllow = tinyHTML.toLowerCase();
        var start = htmllow.indexOf(openTag);
		if (start > -1) {
	        var htmlPart2 = tinyHTML.substr(start);
	        tinyHTML = text + htmlPart2;
	        tiny.setContent(tinyHTML);
		} else {
        	tiny.setContent(text);
		}
    },

    /**
     * Writes out the signature in the email editor
     */
    setSignature : function(idx) {
        if (!tinyMCE)
            return false;
        var hide = document.getElementById('setEditor' + idx).checked;
        SE.composeLayout.renderTinyMCEToolBar(idx,hide);
        //wait for signatures to load before trying to set them
        if (!SE.composeLayout.signatures) {
            setTimeout("SE.composeLayout.setSignature(" + idx + ");", 1000);
			return;
        }
            
        if(idx) {
            var sel = document.getElementById('signatures' + idx);
        } else {
            var sel = document.getElementById('signature_id');
            idx = SE.tinyInstances.currentHtmleditor;
        }
        
        //Ensure that the tinyMCE html has been rendered.
        if(typeof(SE.composeLayout.loadedTinyInstances[idx]) != 'undefined' && SE.composeLayout.loadedTinyInstances[idx] == false) {
            setTimeout("SE.composeLayout.setSignature(" + idx + ");",1000);
		    return;
		}
            
        var signature = '';

        try {
            signature = sel.options[sel.selectedIndex].value;
        } catch(e) {

        }

        var openTag = '<div><span><span>';
        var closeTag = '</span></span></div>';
        var t = SE.util.getTiny('htmleditor' + idx);
        //IE 6 Hack
        if(typeof(t) != 'undefined')
        {
            t.contentDocument = t.contentWindow.document;
            var html = t.getContent();
        }
        else
            var html = '';
            
        var htmllow = html.toLowerCase();
        var start = htmllow.indexOf(openTag);
        var end = htmllow.indexOf(closeTag) + closeTag.length;

        // selected "none" - remove signature from email
        if(signature == '') {
            if (start > -1) {
                var htmlPart1 = html.substr(0, start);
                var htmlPart2 = html.substr(end, html.length);
    
                html = htmlPart1 + htmlPart2;
                t.setContent(html);
            }
            SE.signatures.lastAttemptedLoad = '';
            return false;
        }

        if(!SE.signatures.lastAttemptedLoad) // lazy load place holder
            SE.signatures.lastAttemptedLoad = '';

        SE.signatures.lastAttemptedLoad = signature;

        if(typeof(SE.signatures[signature]) == 'undefined') {
            //lazy load
            SE.signatures.lastAttemptedLoad = ''; // reset this flag for recursion
            SE.signatures.targetInstance = (idx) ? idx : "";
            AjaxObject.target = '';
            AjaxObject.startRequest(callbackLoadSignature, urlStandard + "&emailUIAction=getSignature&id="+signature);
        } else {
            var newSignature = this.prepareSignature(SE.signatures[signature]);

            // clear out old signature
            if(SE.signatures.lastAttemptedLoad && start > -1) {
                var htmlPart1 = html.substr(0, start);
                var htmlPart2 = html.substr(end, html.length);

                html = htmlPart1 + htmlPart2;
            }
            
            // [pre|ap]pend
			start = html.indexOf('<div><hr></div>');
            if(SE.userPrefs.signatures.signature_prepend == 'true' && start > -1) {
				var htmlPart1 = html.substr(0, start);
				var htmlPart2 = html.substr(start, html.length);
                var newHtml = htmlPart1 + openTag + newSignature + closeTag + htmlPart2;
            } else if(SUGAR.email2.userPrefs.signatures.signature_prepend == 'true') {
            	var newHtml = '<br/>' + openTag + newSignature + closeTag + html;
            } else {
                var newHtml = html + openTag + newSignature + closeTag;
            }
            //tinyMCE.setContent(newHtml);
            t.setContent(newHtml);
        }
    },

    prepareSignature : function(str) {
        var signature = new String(str);

        signature = signature.replace(/&lt;/gi, '<');
        signature = signature.replace(/&gt;/gi, '>');

        return signature;
    },


    showAttachmentPanel : function(idx) {
    	var east = SE.composeLayout[idx].getUnitByPosition("right");
    	var tabs = SE.composeLayout[idx].rightTabs;
    	east.expand();
        tabs.set("activeTab", tabs.getTab(0));
    },

    /**
     * expands sidebar and displays options panel
     */
    showOptionsPanel : function(idx) {
    	var east = SE.composeLayout[idx].getUnitByPosition("right");
    	var tabs = SE.composeLayout[idx].rightTabs;
    	east.expand();
        tabs.set("activeTab", tabs.getTab(1));
    },

    /**
     * Selects the Contacts tab
     */
    showContactsPanel : function() {
        SE.complexLayout.regions.west.showPanel("contactsTab");
    },

    /**
     * Generates fields for Select Document
     */
    addDocumentField : function(idx) {
        var basket = document.getElementById('addedDocuments' + idx);
        if(basket) {
            var index = (basket.childNodes.length / 7) - 1;
            if(index < 0)
                index = 0;
        } else {
            index = 0;
        }

        var test = document.getElementById('documentId' + idx + index);

        while(test != null) {
            index++;
            test = document.getElementById('documentId' + idx + index);
        }
        
        var documentCup = document.createElement("div");
        documentCup.id = 'documentCup' + idx + index;
        documentCup.innerHTML = "<input type='hidden' name='document" + idx + index + "' id='document" + idx + index + "' />" +
                // document id field
                "<input type='hidden' name='documentId" + idx + index + "' id='documentId" + idx + index + "' />" +
                // document name field
                "<input value='' size='15' disabled='true' type='text' name='documentName" + idx + index + "' id='documentName" + idx + index + "' />" +
                // select button
                "<button class='button firstChild' type='button' name='documentSelect" + idx + index + "' id='documentSelect" + idx + index + "'" + 
                    "onclick='SE.composeLayout.selectDocument(\"" + index + "\");' value='" + app_strings.LBL_EMAIL_SELECT + "'>" +
                "<img src='index.php?entryPoint=getImage&themeName=" + SUGAR.themes.theme_name + "&imageName=id-ff-select.png' ></button>" +
                // remove button
                "<button class='button lastChild' type='button' name='documentRemove" + idx + index + "' id='documentRemove" + idx + index + "'" + 
                    "onclick='SE.composeLayout.deleteDocumentField(\"documentCup" + idx + index + "\");' value='" + app_strings.LBL_EMAIL_REMOVE + "'>" + 
                 "<img src='index.php?entryPoint=getImage&themeName=" + SUGAR.themes.theme_name + "&imageName=id-ff-clear.png' ></button>" +   
                "<br/>";
        
        basket.appendChild(documentCup);
        //basket.innerHTML += out;
        return index;
    },

    /**
     * Makes async call to save a draft of the email
     * @param int Instance index
     */
    saveDraft : function(tinyInstance) {
        this.sendEmail(tinyInstance, true);
    },

    selectDocument : function(target) {
        URL="index.php?module=Emails&action=PopupDocuments&to_pdf=true&target=" + target;
        windowName = 'selectDocument';
        windowFeatures = 'width=800' + ',height=600' + ',resizable=1,scrollbars=1';

        win = window.open(URL, windowName, windowFeatures);
        if(window.focus) {
            // put the focus on the popup if the browser supports the focus() method
            win.focus();
        }
    },

    /**
     * Modal popup for file attachment dialogue
     */
    addFileField : function() {
    	if(!SE.addFileDialog){ // lazy initialize the dialog and only create it once
            SE.addFileDialog = new YAHOO.widget.Dialog("addFileDialog", {
            	modal:true,
            	visible:false,
            	fixedcenter:true,
            	constraintoviewport: true,
                scroll: true,
                keylisteners : new YAHOO.util.KeyListener(document, { keys:27 }, { 
                	fn:function(){SE.addFileDialog.hide();}
                })
            });
            SE.addFileDialog.setHeader(app_strings.LBL_EMAIL_ATTACHMENTS);
            SE.addFileDialog.render();
           // SE.addFileDialog.addKeyListener(27, , SE.addFileDialog);
        }
    	Dom.removeClass("addFileDialog", "yui-hidden");
        
        SE.addFileDialog.show();
    },

    /**
     * Async upload of file to temp dir
     */
    uploadAttachment : function() {
        if(document.getElementById('email_attachment').value != "") {
            var formObject = document.getElementById('uploadAttachment');
            YAHOO.util.Connect.setForm(formObject, true, true);
            AjaxObject.target = '';
            AjaxObject.startRequest(callbackUploadAttachment, null);
        } else {
            alert(app_strings.LBL_EMAIL_ERROR_NO_FILE);
        }
    },

    /**
     * Adds a SugarDocument to an outbound email.  Action occurs in a popup window displaying a ListView from the Documents module
     * @param string target in focus compose layout
     */
    setDocument : function(idx, target, documentId, documentName, docRevId) {
        // fields are named/id'd [fieldName][instanceId][index]
        var addedDocs = document.getElementById("addedDocuments" + idx);
        var docId = document.getElementById('documentId' + idx + target);
        var docName = document.getElementById('documentName' + idx + target);
        var docRevisionId = document.getElementById('document' + idx + target);
        docId.value = documentId;
        docName.value = documentName;
        docRevisionId.value = docRevId;
    },

    /**
     * Removes the bucket div containing the document input fields
     */
    deleteDocumentField : function(documentCup) {
        var f0 = document.getElementById(documentCup);
        f0.parentNode.removeChild(f0);
    },

    /**
     * Removes a Template Attachment field
     * @param int
     * @param int
     */
    deleteTemplateAttachmentField : function(idx, index) {
        // create not-in-array values for removal filtering
        var r = document.getElementById("templateAttachmentsRemove" + idx).value;

        if(r != "") {
            r += "::";
        }

        r += document.getElementById('templateAttachmentId' + idx + index).value;
        document.getElementById("templateAttachmentsRemove" + idx).value = r;

        var target = 'templateAttachmentCup' + idx + index;
        d =  document.getElementById(target);
        d.parentNode.removeChild(d);
    },

    /**
     * Async removal of uploaded temp file
     * @param string index Should be a concatenation of idx and index
     * @param string
     */
    deleteUploadAttachment : function(index, file) {
        var d = document.getElementById('email_attachment_bucket' + index);
        d.parentNode.removeChild(d);

        // make async call to delete cached file
        AjaxObject.target = '';
        AjaxObject.startRequest(null, urlStandard + "&emailUIAction=removeUploadedAttachment&file="+file);
    },

    /**
     * Attaches files coming from Email Templates
     */
    addTemplateAttachmentField : function(idx) {
        // expose title
        document.getElementById('templateAttachmentsTitle' + idx).style.display = 'block';

        var basket = document.getElementById('addedTemplateAttachments' + idx);

        if(basket) {
            var index = basket.childNodes.length;
            if(index < 0)
                index = 0;
        } else {
            index = 0;
        }

        var out = "<div id='templateAttachmentCup" + idx + index + "'>" +
				// remove button	
				"<img src='index.php?entryPoint=getImage&themeName=" + SUGAR.themes.theme_name + "&imageName=minus.gif' " +
					"style='cursor:pointer' align='absmiddle' onclick='SUGAR.email2.composeLayout.deleteTemplateAttachmentField(\"" + 
					idx + "\",\"" + index + "\");'/>" +
				// file icon
				"<img src='index.php?entryPoint=getImage&themeName=" + SUGAR.themes.theme_name + "&imageName=attachment.gif' " + "align='absmiddle' />" +
				// templateAttachment field
				"<input type='hidden' value='" + "' name='templateAttachment" + idx + index + "' id='templateAttachment" + idx + index + "' />" +
				// docId field
				"<input type='hidden' value='" + "' name='templateAttachmentId" + idx + index + "' id='templateAttachmentId" + idx + index + "' />" +
				// file name
				"<span id='templateAttachmentName"  + idx + index + "'" + ">&nbsp;</span>" + 
				"<br id='br" + index + "></br>" + 
				"<br id='brdoc" + index + "></br>" + 
			"</div>";
		basket.innerHTML = basket.innerHTML + out;
     
        return index;
    },

    /**
     * Sends one email via async call
     * @param int idx Editor instance ID
     * @param bool isDraft
     */
    sendEmail : function(idx, isDraft) {
        
        //If the outbound account has an error message associate with it, alert the user and refuse to continue.
        var obAccountID = document.getElementById('addressFrom' + idx).value;
        
        if( typeof(SUGAR.email2.composeLayout.outboundAccountErrors[obAccountID]) != 'undefined' )
        {
            overlay(app_strings.LBL_EMAIL_ERROR_DESC, SUGAR.email2.composeLayout.outboundAccountErrors[obAccountID], 'alert');
            return false;
        }
        
        
        var form = document.getElementById('emailCompose' + idx);
        var composeOptionsFormName = "composeOptionsForm" + idx;
        var t = SE.util.getTiny(SE.tinyInstances.currentHtmleditor);
        var html = t.getContent();
        var subj = document.getElementById('emailSubject' + idx).value;
        var to = trim(document.getElementById('addressTO' + idx).value);
        var cc = trim(document.getElementById('addressCC' + idx).value);
        var bcc = trim(document.getElementById('addressBCC' + idx).value);
        var email_id = document.getElementById('email_id' + idx).value;
        var composeType = document.getElementById('composeType').value;
        var parent_type = document.getElementById("parent_type").value;
        var parent_id = document.getElementById("parent_id").value;
        
        var el_uid = document.getElementById("uid");
        var uid = (el_uid == null) ? '' : el_uid.value;
        
      	var el_ieId = document.getElementById("ieId");
        var ieId = (el_ieId == null) ? '' : el_ieId.value;
        
        var el_mbox = document.getElementById("mbox");
        var mbox = (el_mbox == null) ? '' : el_mbox.value;
        
        if (!isValidEmail(to) || !isValidEmail(cc) || !isValidEmail(bcc)) {
			alert(app_strings.LBL_EMAIL_COMPOSE_INVALID_ADDRESS);
        	return false;
        }

        if (!SE.composeLayout.isParentTypeAndNameValid(idx)) {
        	return;
        } // if
		var parentTypeValue = document.getElementById('data_parent_type' + idx).value;
		var parentIdValue = document.getElementById('data_parent_id' + idx).value;
        parent_id = parentIdValue;
        parent_type = parentTypeValue;

        var in_draft = (document.getElementById('type' + idx).value == 'draft') ? true : false;
        // baseline viability check

        if(to == "" && cc == '' && bcc == '' && !isDraft) {
            alert(app_strings.LBL_EMAIL_COMPOSE_ERR_NO_RECIPIENTS);
            return false;
        } else if(subj == '' && !isDraft) {
            if(!confirm(app_strings.LBL_EMAIL_COMPOSE_NO_SUBJECT)) {
                return false;
            } else {
                subj = app_strings.LBL_EMAIL_COMPOSE_NO_SUBJECT_LITERAL;
            }
        } else if(html == '' && !isDraft) {
            if(!confirm(app_strings.LBL_EMAIL_COMPOSE_NO_BODY)) {
                return false; 
            }
        }

        SE.util.clearHiddenFieldValues('emailCompose' + idx);
		document.getElementById('data_parent_id' + idx).value = parentIdValue;
		var title = (isDraft) ? app_strings.LBL_EMAIL_SAVE_DRAFT : app_strings.LBL_EMAIL_SENDING_EMAIL;
        overlay(title, app_strings.LBL_EMAIL_ONE_MOMENT);
        html = html.replace(/&lt;/ig, "sugarLessThan");       
        html = html.replace(/&gt;/ig, "sugarGreaterThan");
        
        form.sendDescription.value = html;
        form.sendSubject.value = subj;
        form.sendTo.value = to;
        form.sendCc.value = cc;
        form.sendBcc.value = bcc;
        form.email_id.value = email_id;
        form.composeType.value = composeType;
        form.composeLayoutId.value = 'composeLayout' + idx;
        form.setEditor.value = (document.getElementById('setEditor' + idx).checked == false) ? 1 : 0;
        form.saveToSugar.value = 1;
        form.fromAccount.value = document.getElementById('addressFrom' + idx).value;
        form.parent_type.value = parent_type;
        form.parent_id.value = parent_id;
        form.uid.value = uid;
        form.ieId.value = ieId;
        form.mbox.value = mbox;

        // email attachments
        var addedFiles = document.getElementById('addedFiles' + idx);
        if(addedFiles) {
            for(i=0; i<addedFiles.childNodes.length; i++) {
                var bucket = addedFiles.childNodes[i];

                for(j=0; j<bucket.childNodes.length; j++) {
                    var node = bucket.childNodes[j];
                    var nName = new String(node.name);

                    if(node.type == 'hidden' && nName.match(/email_attachment/)) {
                        if(form.attachments.value != '') {
                            form.attachments.value += "::";
                        }
                        form.attachments.value += node.value;
                    }
                }
            }
        }

        // sugar documents
        var addedDocs = document.getElementById('addedDocuments' + idx);
        if(addedDocs) {
            for(i=0; i<addedDocs.childNodes.length; i++) {
                var cNode = addedDocs.childNodes[i];
                for(j=0; j<cNode.childNodes.length; j++) {
                    var node = cNode.childNodes[j];
                    var nName = new String(node.name);
                    if(node.type == 'hidden' && nName.match(/documentId/)) {
                        if(form.documents.value != '') {
                            form.documents.value += "::";
                        }
                        form.documents.value += node.value;
                    }
                }
            }
        }

        // template attachments
        var addedTemplateAttachments = document.getElementById('addedTemplateAttachments' + idx);
        if(addedTemplateAttachments) {
            for(i=0; i<addedTemplateAttachments.childNodes.length; i++) {
                var cNode = addedTemplateAttachments.childNodes[i];
                for(j=0; j<cNode.childNodes.length; j++) {
                    var node = cNode.childNodes[j];
                    var nName = new String(node.name);
                    if(node.type == 'hidden' && nName.match(/templateAttachmentId/)) {
                        if(form.templateAttachments.value != "") {
                            form.templateAttachments.value += "::";
                        }
                        form.templateAttachments.value += node.value;
                    }
                }
            }
        }

        // remove attachments
        form.templateAttachmentsRemove.value = document.getElementById("templateAttachmentsRemove" + idx).value;

        YAHOO.util.Connect.setForm(form);

        AjaxObject.target = 'frameFlex';

        // sending a draft email
        if(!isDraft && in_draft) {
            // remove row
            SE.listView.removeRowByUid(email_id);
        }

        var sendCallback = (isDraft) ? AjaxObject.composeLayout.callback.saveDraft : callbackSendEmail;
        var emailUiAction = (isDraft) ? "&emailUIAction=sendEmail&saveDraft=true" : "&emailUIAction=sendEmail";

        AjaxObject.startRequest(sendCallback, urlStandard + emailUiAction);
    },

    /**
     * Handles clicking the email address link from a given view
     */
    composePackage : function() {
        if(composePackage != null) {
            SE.composeLayout.c0_composeNewEmail();
            
            
            if(composePackage.to_email_addrs) {
                document.getElementById("addressTO" + SE.composeLayout.currentInstanceId).value = composePackage.to_email_addrs;
            } // if
            if (composePackage.subject != null && composePackage.subject.length > 0) {
            	document.getElementById("emailSubject" + SE.composeLayout.currentInstanceId).value = composePackage.subject;
            }
            
            //If no parent fields are set in the composePackage, ensure they are cleared.
            var parentFields = ['parent_type','parent_name','parent_id'];
            for(var i=0;i<parentFields.length;i++)
            {
                if ( typeof(composePackage[parentFields[i]]) == 'undefined' )
                    composePackage[parentFields[i]] = "";
            }
                 
            document.getElementById("parent_type").value = composePackage.parent_type;
            document.getElementById('data_parent_type' + SE.composeLayout.currentInstanceId).value = composePackage.parent_type;
            document.getElementById("parent_id").value = composePackage.parent_id;
            document.getElementById('data_parent_id' + SE.composeLayout.currentInstanceId).value = composePackage.parent_id;
            document.getElementById('data_parent_name' + SE.composeLayout.currentInstanceId).value = composePackage.parent_name;  
                
            if(composePackage.email_id != null && composePackage.email_id.length > 0) {
                document.getElementById("email_id" + SE.composeLayout.currentInstanceId).value = composePackage.email_id;
            } // if
            if (composePackage.body != null && composePackage.body.length > 0) {
		        var tiny = SE.util.getTiny('htmleditor' + SE.composeLayout.currentInstanceId);
		        SE.composeLayout.loadedTinyInstances[SE.composeLayout.currentInstanceId] = false;
        		setTimeout("SE.composeLayout.setContentOnThisTiny();", 3000);
            } // if
            if (composePackage.attachments != null) {
				SE.composeLayout.loadAttachments(composePackage.attachments);            	
            } // if
            
            if (composePackage.fromAccounts != null && composePackage.fromAccounts.status) {
				var addressFrom = document.getElementById('addressFrom' + SE.composeLayout.currentInstanceId);
		        SE.util.emptySelectOptions(addressFrom);
		        var fromAccountOpts = composePackage.fromAccounts.data;
		        for(i=0; i<fromAccountOpts.length; i++) {
		              var key = fromAccountOpts[i].value;
		              var display = fromAccountOpts[i].text;
		              var opt = new Option(display, key);
		              if (fromAccountOpts[i].selected) {
		              	opt.selected = true;
		              }
		              addressFrom.options.add(opt);
		        }			
            	
            } // if
        } // if
    },

    setContentOnThisTiny : function() {
    	var tiny = SE.util.getTiny('htmleditor' + SE.composeLayout.currentInstanceId);
        var tinyHTML = tiny.getContent();
        composePackage.body = decodeURI(encodeURI(composePackage.body));
        // cn: bug 14361 - text-only templates don't fill compose screen
        if(composePackage.body == '') {
            composePackage.body = decodeURI(encodeURI(composePackage.body)).replace(/<BR>/ig, '\n').replace(/<br>/gi, "\n").replace(/&amp;/gi,'&').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>').replace(/&#039;/gi,'\'').replace(/&quot;/gi,'"');
        } // if
        //Flag determines if we should clear the tiny contents or just append
        if (typeof(composePackage.clearBody) != 'undefined' && composePackage.clearBody)
            SE.composeLayout.tinyHTML = '';
        else
            SE.composeLayout.tinyHTML = tinyHTML + composePackage.body;		        
    	
         tiny.setContent(SE.composeLayout.tinyHTML);
         //Indicate that the contents has been loaded successfully.
         SE.composeLayout.loadedTinyInstances[SE.composeLayout.currentInstanceId] = true;
    },
    /**
     * Confirms closure of a compose screen if "x" is clicked
     */
    confirmClose : function(panel) {
        if(confirm(app_strings.LBL_EMAIL_CONFIRM_CLOSE)) {
            SE.composeLayout.closeCompose(panel.id);
            return true;
        } else {
            return false;
        }
    },

    /**
     * forces close of a compose screen
     */
    forceCloseCompose : function(id) {
    	SE.composeLayout.closeCompose(id);
    	
    	// handle flow back to originating view
        if(composePackage) {
            // check if it's a module we need to return to
            if(composePackage.return_module && composePackage.return_action && composePackage.return_id) {
                if(confirm(app_strings.LBL_EMAIL_RETURN_TO_VIEW)) {
                    var url = "index.php?module=" + composePackage.return_module + "&action=" + composePackage.return_action + "&record=" + composePackage.return_id;
                    window.location = url;
                }
            }
        }
    },

    /**
     * closes the editor that just sent email
     * @param string id ID of composeLayout tab
     */
    closeCompose : function(id) {
        // destroy tinyMCE instance
        var idx = id.substr(13, id.length);
        var instanceId = "htmleditor" + idx;
        tinyMCE.execCommand('mceRemoveControl', false, instanceId);

        // nullify DOM and namespace values.
        inCompose = false;
        SE.composeLayout[idx] = null;
        SE.tinyInstances[instanceId] = null;
        var tabsArray = SE.innerLayout.get("tabs");
        for (i = 0 ; i < tabsArray.length ; i++) {
        	if (tabsArray[i].get("id") == ('composeTab' + idx)) {
        		tabsArray[i].close();
        		break;
        	}
        }
        //SE.innerLayout.getTab(idx).close();
    },

    /**
    *  Enable the quick search for the compose relate field or search tab
    */
    enableQuickSearchRelate: function(idx,overides){
        
        if(typeof overides != 'undefined')
        {
            var newModuleID = overides['moduleSelectField']; //data_parent_type_search
            var newModule = document.getElementById(newModuleID).value; 
            var formName = overides['formName'];
            var fieldName = overides['fieldName'];
            var fieldId = overides['fieldId'];
            var fullName = formName + "_" + fieldName;
            var postBlurFunction = null;
        }
        else
        {
            var newModule = document.getElementById('data_parent_type'+idx).value;
            var formName = 'emailCompose'+idx;
            var fieldName = 'data_parent_name'+idx;
            var fieldId = 'data_parent_id'+idx;
            var fullName = formName + "_" + fieldName;
            var postBlurFunction = "SE.composeLayout.qsAddAddress";
        }
        
        if(typeof sqs_objects == 'undefined')
            window['sqs_objects'] = new Array;
            
        window['sqs_objects'][fullName] = {
            form:formName,
			method:"query",
			modules:[newModule],
			group:"or",
            field_list:["name","id", "email1"],populate_list:[fieldName,fieldId],required_list:[fieldId],
            conditions:[{name:"name",op:"like_custom",end:"%",value:""}],
			post_onblur_function: postBlurFunction,
            order:"name","limit":"30","no_match_text":"No Match"};
                                
        
        if(typeof QSProcessedFieldsArray != 'undefined')
        	QSProcessedFieldsArray[fullName] = false;
        if (typeof(QSFieldsArray) != 'undefined' && typeof(QSFieldsArray[fullName]) != 'undefined') {
        	QSFieldsArray[fullName].destroy();
        	delete QSFieldsArray[fullName];
        }
        if (Dom.get(fullName + "_results")) {
        	Dom.get(fullName + "_results").parentNode.removeChild(Dom.get(fullName + "_results"));
        }
            
        enableQS(false);
    },
    
	qsAddAddress : function(o) {
        if (o.name != "" && o.email1 != "")
        {
        	var target = Dom.get("addressTO" + SE.composeLayout.currentInstanceId);
        	target.value = SE.addressBook.smartAddEmailAddressToComposeField(target.value, o.name + "<" + o.email1 + ">");
        }
    },
    /**
     * Returns a new instance ID, 0-index
     */
    getNewInstanceId : function() {
        this.currentInstanceId = this.currentInstanceId + 1;
        return this.currentInstanceId;
    },

    /**
     * Takes an array of objects that contain the filename and GUID of a Note (attachment or Sugar Document) and applies the values to the compose screen.  Valid use-cases are applying an EmailTemplate or resuming a Draft Email.
     */
    loadAttachments : function(result) {
        var idx = SE.composeLayout.currentInstanceId;

        if(typeof(result) == 'object') {
        	//jchi #20680. Clean the former template attachments;
        	var basket = document.getElementById('addedTemplateAttachments' + idx);
			if(basket.innerHTML != ''){
				confirm(mod_strings.LBL_CHECK_ATTACHMENTS, mod_strings.LBL_HAS_ATTACHMENTS, function(btn){
					if (btn != 'yes'){
						basket.innerHTML = '';
					}
				});
			}
            for(i in result) {
                if(typeof result[i] == 'object') {
                    var index = SE.composeLayout.addTemplateAttachmentField(idx);
                    var bean = result[i];
                    document.getElementById('templateAttachmentId' + idx + index).value = bean['id'];
                    document.getElementById('templateAttachmentName' + idx + index).innerHTML += bean['filename'];
                }
            }
        }
    },

    /**
     * fills drop-down values for email templates and signatures
     */
    setComposeOptions : function(idx) {
        // send from accounts
        var addressFrom = document.getElementById('addressFrom' + idx);
        
        if (addressFrom.options.length <= 0) {
        	SE.util.emptySelectOptions(addressFrom);
	        var fromAccountOpts = SE.composeLayout.fromAccounts;
	        for (id = 0 ; id < fromAccountOpts.length ; id++) {
	              var key = fromAccountOpts[id].value;
	              var display = fromAccountOpts[id].text;
	              var is_default = false;
	              if(key == SUGAR.default_inbound_accnt_id)
	              	is_default = true;
	              var opt = new Option(display, key);
	              addressFrom.options.add(opt);
	              addressFrom.options[id].selected = is_default; //Safari bug new Option(x,y,true) does not work.
	        }
        }

        // email templates
        var et = document.getElementById('email_template' + idx);
        SE.util.emptySelectOptions(et);

        for(var key in this.emailTemplates) { // iterate through assoc array
            var display = this.emailTemplates[key];
            var opt = new Option(display, key);
            et.options.add(opt);
        }

        // signatures
        var sigs = document.getElementById('signatures' + idx);
        SE.util.emptySelectOptions(sigs);

        for(var key in this.signatures) { // iterate through assoc array
            var display = this.signatures[key];
            var opt = new Option(display, key);

            if(key == SE.userPrefs.signatures.signature_default) {
                opt.selected = true;
            }

            sigs.options.add(opt);
        }

        // html/plain email?
        var htmlEmail = document.getElementById('setEditor' + idx);
        if(SE.userPrefs.emailSettings.sendPlainText == 1) {
            htmlEmail.checked = true;
        } else {
        	htmlEmail.checked = false;
        }

        SE.tinyInstances[SE.tinyInstances.currentHtmleditor].ready = true;
    },

    /**
     * After compose screen is rendered, async call to get email body from Sugar
     */
    replyForwardEmailStage2 : function() {
        SE.util.clearHiddenFieldValues('emailUIForm');
        overlay(app_strings.LBL_EMAIL_RETRIEVING_MESSAGE, app_strings.LBL_EMAIL_ONE_MOMENT);

        var ieId = SE.composeLayout.replyForwardObj.ieId;
        var uid = SE.composeLayout.replyForwardObj.uid;
        var mbox = SE.composeLayout.replyForwardObj.mbox;
        var type = SE.composeLayout.replyForwardObj.type;
        var idx = SE.composeLayout.currentInstanceId;

        var sugarEmail = (SE.composeLayout.replyForwardObj.sugarEmail) ? '&sugarEmail=true' : "";

        document.getElementById('emailSubject' + idx).value = type;
        document.getElementById('emailUIAction').value = 'composeEmail';
        document.getElementById('composeType').value = type;
        document.getElementById('ieId').value = ieId;
        document.getElementById('uid').value = uid;
        document.getElementById('mbox').value = mbox;
		document.getElementById('setEditor' + idx).checked = SE.userPrefs.emailSettings.sendPlainText == 1 ? true : false;
        var formObject = document.getElementById('emailUIForm');
        YAHOO.util.Connect.setForm(formObject);

        var sendType = type;
        AjaxObject.startRequest(callbackReplyForward, urlStandard + "&composeType=" + type + sugarEmail);
    },
    
    /**
    *  Show the hidden cc or bcc fields
    */
    showHiddenAddress: function(addrType,idx){

    	Dom.removeClass(addrType+"_tr"+idx, "yui-hidden");
    	Dom.addClass(addrType+"_span"+idx, "yui-hidden");
		Dom.addClass("bcc_cc_sep"+idx, "yui-hidden");
		this[addrType+'Hidden'+idx] = false;
		
		//After bcc or cc is added, move options below last addr field
		Dom.insertAfter("add_addr_options_tr"+idx, 'bcc_tr'+idx);
		
		//If both cc and bcc hidden, remove the empty row containing text.
		if( ( typeof(this['ccHidden'+idx]) != 'undefined' && typeof(this['bccHidden'+idx]) != 'undefined')
			   && ( this['ccHidden'+idx]  == false && this['bccHidden'+idx] == false) )
			Dom.addClass("add_addr_options_tr"+idx, "yui-hidden");	
		
		SE.composeLayout.resizeEditor(idx);
    },
    /**
    *  Hide the cc and bcc fields if they were shown.
    */
    hideHiddenAddresses: function(idx){
        
        var addrTypes = ['cc','bcc'];
        for(var i = 0;i<addrTypes.length;i++)
        {
            Dom.addClass(addrTypes[i] + "_tr"+idx, "yui-hidden");
            Dom.removeClass(addrTypes[i] + "_span"+idx, "yui-hidden");
            this[addrTypes[i] + 'Hidden'+idx] = true
        }
        
        Dom.removeClass("bcc_cc_sep"+idx, "yui-hidden");
        Dom.removeClass("add_addr_options_tr"+idx, "yui-hidden");
        Dom.insertBefore("add_addr_options_tr"+idx, 'bcc_tr'+idx);
    }
};

////    END SE.composeLayout
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
////    SE.util
SE.util = {
    /**
     * Cleans serialized UID lists of duplicates
     * @param string
     * @return string
     */
    cleanUids : function(str) {
        var seen = new Object();
        var clean = "";
        var arr = new String(str).split(",");

        for(var i=0; i<arr.length; i++) {
            if(seen[arr[i]]) {
                continue;
            }

            clean += (clean != "") ? "," : "";
            clean += arr[i];
            seen[arr[i]] = true;
        }

        return clean;
    },

    /**
     * Clears hidden field values
     * @param string id ID of form element to clear
     */
    clearHiddenFieldValues : function(id) {
        var form = document.getElementById(id);

        for(i=0; i<form.elements.length; i++) {
            if(form.elements[i].type == 'hidden') {
                var e = form.elements[i];
                if(e.name != 'action' && e.name != 'module' && e.name != 'to_pdf') {
                    e.value = '';
                }
            }
        }
    },

    /**
     * Reduces a SELECT drop-down to 0 items to prepare for new ones
     */
    emptySelectOptions : function(el) {
        if(el) {
            for(i=el.childNodes.length - 1; i >= 0; i--) {
                if(el.childNodes[i]) {
                    el.removeChild(el.childNodes[i]);
                }
            }
        }
    },

    /**
     * Returns the MBOX path in the manner php_imap expects:
     * ie: INBOX.DEBUG.test
     * @param string str Current serialized value, Home.personal.test.INBOX.DEBUG.test
     */
    generateMboxPath : function(str) {
        var ex = str.split("::");

        /* we have a serialized MBOX path */
        if(ex.length > 1) {
            var start = false;
            var ret = '';
            for(var i=0; i<ex.length; i++) {
                if(ex[i] == 'INBOX') {
                    start = true;
                }

                if(start == true) {
                    if(ret != "") {
                        ret += ".";
                    }
                    ret += ex[i];
                }
            }
        } else {
            /* we have a Sugar folder GUID - do nothing */
            return str;
        }

        return ret;
    },

    /**
     * returns a SUGAR GUID by navigating the DOM tree a few moves backwards
     * @param HTMLElement el
     * @return string GUID of found element or empty on failure
     */
    getGuidFromElement : function(el) {
        var GUID = '';
        var iterations = 4;
        var passedEl = el;

        // upwards
        for(var i=0; i<iterations; i++) {
            if(el) {
                if(el.id.match(SE.reGUID)) {
                    return el.id;
                } else {
                    el = el.parentNode;
                }
            }
        }

        return GUID;
    },

    /**
     * Returns the ID value for the current in-focus, active panel (in the innerLayout, not complexLayout)
     * @return string
     */
    getPanelId : function() {
        return SE.innerLayout.get("activeTab").id ? SE.innerLayout.get("activeTab").id : "Preview";
    },
    
    /**
     * wrapper to handle weirdness with IE
     * @param string instanceId
     * @return tinyMCE Controller object
     */
    getTiny : function(instanceId) {
        if(instanceId == '') {
            return null;
        }

        var t = tinyMCE.getInstanceById(instanceId);

        if(this.isIe()) {
            this.sleep(200);
            YAHOO.util.Event.onContentReady(instanceId, function(t) { return t; });
        }
        return t;
    },

    /**
     * Simple check for MSIE browser
     * @return bool
     */
    isIe : function() {
        var nav = new String(navigator.appVersion);
        if(nav.match(/MSIE/)) {
            return true;
        }
        return false;
    },

    /**
     * Recursively removes an element from the DOM
     * @param HTMLElement
     */
    removeElementRecursive : function(el) {
        this.emptySelectOptions(el);
    },
    
    /**
     * Fakes a sleep
     * @param int
     */
    sleep : function(secs) {
        setTimeout("void(0);", secs);
    },
    
    /**
     * Converts a <select> element to an Ext.form.combobox
     */
     convertSelect : function(select) {
       alert('in convertSelect');
       if (typeof(select) == "string") {
           select = document.getElementById(select);
       }
     },
     
     findChildNode : function (parent, property, value) {
    	 for (i in parent.children) {
    		 var child = parent.children[i];
    		 if (child.data[property] && child.data[property] == value || child[property] && child[property] == value)
    			 return child;
    		 var searchChild = SE.util.findChildNode(child, property, value);
    		 if (searchChild) 
    			 return searchChild;
    	 }
    	 return false;
     },
     
     cascadeNodes : function (parent, fn, scope, args) {
    	 for (i in parent.children) {
    		 var child = parent.children[i];
    		 var s = scope ? scope : child;
    		 var a = args ? args : child;
        	 fn.call(s, a);
    		 SE.util.cascadeNodes(child, fn, scope, args);
    	 }
     }
};


////    END UTIL
///////////////////////////////////////////////////////////////////////////////


})();//End namespace// End of File modules/Emails/javascript/EmailUICompose.js
                                
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

SUGAR.email2.templates['compose'] = '<div id="composeLayout{idx}" class="ylayout-inactive-content"></div>' +
'<div id="composeOverFrame{idx}" style="height:100%;width:100%">' +
'	<form id="emailCompose{idx}" name="ComposeEditView{idx}" action="index.php" method="POST">' +
'		<input type="hidden" id="email_id{idx}" name="email_id" value="">' +
'		<input type="hidden" id="uid{idx}" name="uid" value="">' +
'		<input type="hidden" id="ieId{idx}" name="ieId" value="">' +
'		<input type="hidden" id="mbox{idx}" name="mbox" value="">' +
'		<input type="hidden" id="type{idx}" name="type" value="">' +
'		<input type="hidden" id="composeLayoutId" name="composeLayoutId" value="shouldNotSeeMe">' +
'		<input type="hidden" id="composeType" name="composeType">' +
'		<input type="hidden" id="fromAccount" name="fromAccount">' +
'		<input type="hidden" id="sendSubject" name="sendSubject">' +
'		<input type="hidden" id="sendDescription" name="sendDescription">' +
'		<input type="hidden" id="sendTo" name="sendTo">' +
'		<input type="hidden" id="sendBcc" name="sendBcc">' +
'		<input type="hidden" id="sendCc" name="sendCc">' +
'		<input type="hidden" id="setEditor" name="setEditor">' +
'		<input type="hidden" id="saveToSugar" name="saveToSugar">' +
'		<input type="hidden" id="parent_id" name="parent_id">' +
'		<input type="hidden" id="parent_type" name="parent_type">' +
'		<input type="hidden" id="attachments" name="attachments">' +
'		<input type="hidden" id="documents" name="documents">' +
'		<input type="hidden" id="outbound_email{idx}" name="outbound_email">' +
'		<input type="hidden" id="templateAttachments" name="templateAttachments">' +
'		<input type="hidden" id="templateAttachmentsRemove{idx}" name="templateAttachmentsRemove">' +
'		<table id="composeHeaderTable{idx}" cellpadding="0" cellspacing="0" border="0" width="100%" class="list">' +
'			<tr>' +
'				<th><table cellpadding="0" cellspacing="0" border="0"><tbody><tr ><td style="padding: 0px !important;margin:0px; !important" >' +
'					<button type="button" class="button" onclick="SUGAR.email2.composeLayout.sendEmail({idx}, false);"><img src="index.php?entryPoint=getImage&themeName='+SUGAR.themes.theme_name+'&imageName=icon_email_send.gif" align="absmiddle" border="0"> {app_strings.LBL_EMAIL_SEND}</button>' +
'					<button type="button" class="button" onclick="SUGAR.email2.composeLayout.saveDraft({idx}, false);"><img src="index.php?entryPoint=getImage&themeName='+SUGAR.themes.theme_name+'&imageName=icon_email_save.gif" align="absmiddle" border="0"> {app_strings.LBL_EMAIL_SAVE_DRAFT}</button>' +
'					<button type="button" class="button" onclick="SUGAR.email2.composeLayout.showAttachmentPanel({idx}, false);"><img src="index.php?entryPoint=getImage&themeName='+SUGAR.themes.theme_name+'&imageName=icon_email_attach.gif" align="absmiddle" border="0"> {app_strings.LBL_EMAIL_ATTACHMENT}</button>' +
'					<button type="button" class="button" onclick="SUGAR.email2.composeLayout.showOptionsPanel({idx}, false);"><img src="index.php?entryPoint=getImage&themeName='+SUGAR.themes.theme_name+'&imageName=icon_email_options.gif" align="absmiddle" border="0"> {app_strings.LBL_EMAIL_OPTIONS}</button>' +
'</td><td style="padding: 0px !important;margin:0px; !important">&nbsp;&nbsp;{mod_strings.LBL_EMAIL_RELATE}:&nbsp;&nbsp;<select class="select" id="data_parent_type{idx}" onchange="document.getElementById(\'data_parent_name{idx}\').value=\'\';document.getElementById(\'data_parent_id{idx}\').value=\'\'; SUGAR.email2.composeLayout.enableQuickSearchRelate(\'{idx}\');" name="data_parent_type{idx}">{linkbeans_options}</select>' + 
'&nbsp;</td><td style="padding: 0px !important;margin:0px; !important"><input id="data_parent_id{idx}" name="data_parent_id{idx}" type="hidden" value="">' +
'<input class="sqsEnabled" id="data_parent_name{idx}" name="data_parent_name{idx}" type="text" value="">&nbsp;<button type="button" class="button" onclick="SUGAR.email2.composeLayout.callopenpopupForEmail2({idx});"><img src="index.php?entryPoint=getImage&themeName=default&imageName=id-ff-select.png" align="absmiddle" border="0"></button>' +
'			</td></tr></tbody></table></th>'     +
'			</tr>' +
'			<tr>' +
'				<td>' +
'					<div style="margin:5px;">' +
'					<table cellpadding="4" cellspacing="0" border="0" width="100%">' +
'						<tr>' +
'							<td class="emailUILabel" NOWRAP >' +
'								{app_strings.LBL_EMAIL_FROM}:' +
'							</td>' +
'							<td class="emailUIField" NOWRAP>' +
'								<div>' +
'									&nbsp;&nbsp;<select style="width: 500px;" class="ac_input" id="addressFrom{idx}" name="addressFrom{idx}"></select>' +
'								</div>' +
'							</td>' +
'						</tr>' +
'						<tr>' +
'							<td class="emailUILabel" NOWRAP>' +
'								<button class="button" type="button" onclick="SUGAR.email2.addressBook.selectContactsDialogue(\'addressTO{idx}\')">' + 
'                                   {app_strings.LBL_EMAIL_TO}:' +
'                               </button>' + 
'							</td>' +
'							<td class="emailUIField" NOWRAP>' +
'								<div class="ac_autocomplete">' +
'									&nbsp;&nbsp;<input class="ac_input" type="text" size="96" id="addressTO{idx}" name="addressTO{idx}" onkeyup="SE.composeLayout.showAddressDetails(this);">' +
'									<span class="rolloverEmail"> <a id="MoreaddressTO{idx}" href="#" style="display: none;">+<span id="DetailaddressTO{idx}">&nbsp;</span></a> </span>' +
'									<div class="ac_container" id="addressToAC{idx}"></div>' +
'								</div>' +
'							</td>' +
'						</tr>' +
'						<tr id="add_addr_options_tr{idx}">' +
'							<td class="emailUILabel" NOWRAP>&nbsp;</td><td class="emailUIField" valign="top" NOWRAP>&nbsp;&nbsp;<span id="cc_span{idx}"><a href="#" onclick="SE.composeLayout.showHiddenAddress(\'cc\',\'{idx}\');">{mod_strings.LBL_ADD_CC}</a></span><span id="bcc_cc_sep{idx}">&nbsp;{mod_strings.LBL_ADD_CC_BCC_SEP}&nbsp;</span><span id="bcc_span{idx}"><a href="#" onclick="SE.composeLayout.showHiddenAddress(\'bcc\',\'{idx}\');">{mod_strings.LBL_ADD_BCC}</a></span></td>'+
'						</tr>'+
'						<tr class="yui-hidden" id="cc_tr{idx}">' +
'							<td class="emailUILabel" NOWRAP>' +
'                               <button class="button" type="button" onclick="SUGAR.email2.addressBook.selectContactsDialogue(\'addressCC{idx}\')">' + 
'								{app_strings.LBL_EMAIL_CC}:' +
'                               </button>' + 
'							</td>' +
'							<td class="emailUIField" NOWRAP>' +
'								<div class="ac_autocomplete">' +
'									&nbsp;&nbsp;<input class="ac_input" type="text" size="96" id="addressCC{idx}" name="addressCC{idx}" onkeyup="SE.composeLayout.showAddressDetails(this);">' +
'									<span class="rolloverEmail"> <a id="MoreaddressCC{idx}" href="#"  style="display: none;">+<span id="DetailaddressCC{idx}">&nbsp;</span></a> </span>' + 
'									<div class="ac_container" id="addressCcAC{idx}"></div>' +
'								</div>' +
'							</td>' +
'						</tr>' +
'						<tr class="yui-hidden" id="bcc_tr{idx}">' +
'							<td class="emailUILabel" NOWRAP>' +
'                               <button class="button" type="button" onclick="SUGAR.email2.addressBook.selectContactsDialogue(\'addressBCC{idx}\')">' + 
'                               {app_strings.LBL_EMAIL_BCC}:' +
'                               </button>' + 
'							</td>' +
'							<td class="emailUIField" NOWRAP>' +
'								<div class="ac_autocomplete">' +
'									&nbsp;&nbsp;<input class="ac_input" type="text" size="96" id="addressBCC{idx}" name="addressBCC{idx}" onkeyup="SE.composeLayout.showAddressDetails(this);">' +
'									<span class="rolloverEmail"> <a id="MoreaddressBCC{idx}" href="#" style="display: none;">+<span id="DetailaddressBCC{idx}">&nbsp;</span></a> </span>' +
'									<div class="ac_container" id="addressBccAC{idx}"></div>' +
'								</div>' +
'							</td>' +
'						</tr>' +
'						<tr>' +
'							<td class="emailUILabel" NOWRAP width="1%">' +
'								{app_strings.LBL_EMAIL_SUBJECT}:' +
'							</td>' +
'							<td class="emailUIField" NOWRAP width="99%">' +
'								<div class="ac_autocomplete">' +
'									&nbsp;&nbsp;<input class="ac_input" type="text" size="96" id="emailSubject{idx}" name="subject{idx}" value="">' +
'								</div>' +
'							</td>' +
'						</tr>' +
'					</table>' +
'					</div>' +
'				</td>'	 +
'			</tr>' +
'		</table>' +
'		<textarea id="htmleditor{idx}" name="htmleditor{idx}" style="width:100%; height: 100px;"></textarea>' +
'		<div id="divAttachments{idx}" class="ylayout-inactive-content">' +
'			<div style="padding:5px;">' +
'				<table cellpadding="2" cellspacing="0" border="0">' +
'					<tr>' +
'						<th>' +
'							<b>{app_strings.LBL_EMAIL_ATTACHMENTS}</b>' +
'							<br />' +
'							&nbsp;' +
'						</th>' +
'					</tr>' +
'					<tr>' +
'						<td>' +
'							<input type="button" name="add_file_button" onclick="SUGAR.email2.composeLayout.addFileField();" value="{mod_strings.LBL_ADD_FILE}" class="button" />' +
'							<div id="addedFiles{idx}" name="addedFiles{idx}"></div>' +
'						</td>' +
'					</tr>' +
'					<tr>' +
'						<td>' +
'							&nbsp;' +
'							<br />' +
'							&nbsp;' +
'						</td>' +
'					</tr>' +
'					<tr>' +
'						<th>' +
'							<b>{app_strings.LBL_EMAIL_ATTACHMENTS2}</b>' +
'							<br />' +
'							&nbsp;' +
'						</th>' +
'					</tr>' +
'					<tr>' +
'						<td>' +
'							<input type="button" name="add_document_button" onclick="SUGAR.email2.composeLayout.addDocumentField({idx});" value="{mod_strings.LBL_ADD_DOCUMENT}" class="button" />' +
'							<div id="addedDocuments{idx}"></div>' + //<input name="document{idx}0" id="document{idx}0" type="hidden" /><input name="documentId{idx}0" id="documentId{idx}0" type="hidden" /><input name="documentName{idx}0" id="documentName{idx}0" disabled size="30" type="text" /><input type="button" id="documentSelect{idx}0" onclick="SUGAR.email2.selectDocument({idx}0, this);" class="button" value="{app_strings.LBL_EMAIL_SELECT}" /><input type="button" id="documentRemove{idx}0" onclick="SUGAR.email2.deleteDocumentField({idx}0, this);" class="button" value="{app_strings.LBL_EMAIL_REMOVE}" /><br /></div>' +
'						</td>' +
'					</tr>' +
'					<tr>' +
'						<td>' +
'							&nbsp;' +
'							<br />' +
'							&nbsp;' +
'						</td>' +
'					</tr>' +
'					<tr>' +
'						<th>' +
'							<div id="templateAttachmentsTitle{idx}" style="display:none"><b>{app_strings.LBL_EMAIL_ATTACHMENTS3}</b></div>' +
'							<br />' +
'							&nbsp;' +
'						</th>' +
'					</tr>' +
'					<tr>' +
'						<td>' +
'							<div id="addedTemplateAttachments{idx}"></div>' +
'						</td>' +
'					</tr>' +
'				</table>' +
'			</div>' +
'		</div>' +
'	</form>' +
'		<div id="divOptions{idx}" class="ylayout-inactive-content"' +
'             <div style="padding:5px;">' +
'			<form name="composeOptionsForm{idx}" id="composeOptionsForm{idx}">' + 
'				<table border="0" width="100%">' +
'					<tr>' +
'						<td NOWRAP style="padding:2px;">' +
'							<b>{app_strings.LBL_EMAIL_TEMPLATES}:</b>' +
'						</td>' +
'					</tr>' +
'					<tr>' +
'						<td NOWRAP style="padding:2px;">' +
'							<select name="email_template{idx}" id="email_template{idx}"  onchange="SUGAR.email2.composeLayout.applyEmailTemplate(\'{idx}\', this.options[this.selectedIndex].value);"></select>' +
'						</td>' +
'					</tr>' +
'				</table>' +
'				<br />' +
'				<table border="0" width="100%">' +
'					<tr>' +
'						<td NOWRAP style="padding:2px;">' +
'							<b>{app_strings.LBL_EMAIL_SIGNATURES}:</b>' +
'						</td>' +
'					</tr>' +
'					<tr>' +
'						<td NOWRAP style="padding:2px;">' +
'							<select name="signatures{idx}" id="signatures{idx}" onchange="SUGAR.email2.composeLayout.setSignature(\'{idx}\');"></select>' +
'						</td>' +
'					</tr>' +
'				</table>' +
'				<table border="0" width="100%">' +
'					<tr>' +
'						<td NOWRAP style="padding:2px;">' +
'							<input type="checkbox" id="setEditor{idx}" name="setEditor{idx}" value="1" onclick="SUGAR.email2.composeLayout.renderTinyMCEToolBar(\'{idx}\', this.checked);"/>&nbsp;' +
'							<b>{mod_strings.LBL_SEND_IN_PLAIN_TEXT}</b>' +
'						</td>' +
'					</tr>' +
'				</table>' +
'         </form>' +
'			</div> ' +
'		</div>' +
'</div>';
// End of File modules/Emails/javascript/composeEmailTemplate.js
                                
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

/**
  Complex layout init
 */
function complexLayoutInit() {
	var se = SUGAR.email2;
	var Dom = YAHOO.util.Dom;
	se.e2Layout = {
    	getInnerLayout : function(rows) {
        	se.listViewLayout = new YAHOO.widget.Layout('listViewDiv', {
            	parent: se.complexLayout,  
	    		border:true,
	            hideOnLayout: true,
	            height: 400,
				units: [{
					position: "center",
				    scroll:false, // grid should autoScroll itself
				    split:true,
				    body: "<div id='emailGrid'></div><div id='dt-pag-nav'></div> "
				},{
					position: "bottom",
				    scroll:true,
				    collapse: false,
				    resize: true,
				    useShim:true,
				    height:'250',
				    body: "<div id='listBottom' />"
				},{
				    position: "right",
				    scroll:true,
				    collapse: false,
				    resize: true,
				    useShim:true,
				    width:'250',
				    body: "<div id='listRight' />",
				    titlebar: false //,header: "right"
				}]
            });
        	se.complexLayout.on("render", function(){
        		var height = SUGAR.email2.innerLayout.get("element").clientHeight - 30;
				SUGAR.email2.innerLayout.get("activeTab").get("contentEl").parentNode.style.height = height + "px";
				SUGAR.email2.listViewLayout.set("height", height);
				SUGAR.email2.listViewLayout.render();
        	});
            se.listViewLayout.render();
            //CSS hack for now
            se.listViewLayout.get("element").parentNode.parentNode.style.padding = "0px"
            var rp = se.listViewLayout.resizePreview = function() {
            	var pre = Dom.get("displayEmailFramePreview");
            	if (pre) {
            		var parent = Dom.getAncestorByClassName(pre, "yui-layout-bd");
            		pre.style.height = (parent.clientHeight - pre.offsetTop) + "px";
            	}
            };
            se.listViewLayout.getUnitByPosition("bottom").on("heightChange", se.autoSetLayout);
            se.listViewLayout.getUnitByPosition("right").on("endResize", se.autoSetLayout);
            se.e2Layout.setPreviewPanel(rows);
            se.previewLayout = se.listViewLayout;
            return se.listViewLayout;
        },
        
        getInnerLayout2Rows : function() {
            return this.getInnerLayout(true);
        },
        getInnerLayout2Columns : function() {
            return this.getInnerLayout(false);
        },
        
        init : function(){
            // initialize state manager, we will use cookies
//                Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
        	var viewHeight = document.documentElement ? document.documentElement.clientHeight : self.innerHeight;
        	se.complexLayout = new YAHOO.widget.Layout("container", {
        		border:true,
                hideOnLayout: true,
                height: Dom.getViewportHeight() - (document.getElementById('header').clientHeight ) - 65,
                width: Dom.getViewportWidth() - 40,
                units: [{
                	position: "center",
                    scroll:false,
                    body: "<div id='emailtabs'></div>"
                },
                {
                	position: "left",
                	scroll: true,
                	body: "<div id='lefttabs'></div>",
                    collapse: true,
                    width: 210,
                    minWidth: 100,
                    resize:true,
                    useShim:true,
                    titlebar: true,
                    header: "&nbsp;"
                },
                {
                    header: Dom.get('footerLinks').innerHTML,
					position: 'bottom',
					id: 'mbfooter',
					height: 22,
					border: false
                }]
            });
        	se.complexLayout.render();
        	var tp = se.innerLayout = new YAHOO.widget.TabView("emailtabs");
			tp.addTab(new YAHOO.widget.Tab({ 
				label: "Inbox",
				scroll : true,
				content : "<div id='listViewDiv'/>",
				id : "center",
				active : true
			}));
        	var centerEl = se.complexLayout.getUnitByPosition('center').get('wrap');
			tp.appendTo(centerEl);
			//CSS hack for now
			tp.get("element").style.borderRight = "1px solid #666"
			
			var listV =  this.getInnerLayout2Rows();
			listV.set("height", tp.get("element").clientHeight - 25);
			listV.render();
                
            se.leftTabs = new YAHOO.widget.TabView("lefttabs");
            var folderTab = new YAHOO.widget.Tab({ 
				label: app_strings.LBL_EMAIL_FOLDERS_SHORT,
				scroll : true,
				content : "<div id='emailtree'/>",
				id : "tree",
				active : true
			});
            folderTab.on("activeChange", function(o){ 
            	if (o.newValue) {
            		se.complexLayout.getUnitByPosition("left").set("header", app_strings.LBL_EMAIL_FOLDERS);
            	}
            });
            se.leftTabs.addTab(folderTab);
            
            var tabContent = SUGAR.util.getAndRemove("searchTab");
            var searchTab = new YAHOO.widget.Tab({ 
				label: app_strings.LBL_EMAIL_SEARCH_SHORT,
				scroll : true,
				content : tabContent.innerHTML,
				id : tabContent.id
			});
            searchTab.on("activeChange", function(o){ 
            	if (o.newValue) 
            	{
            		se.complexLayout.getUnitByPosition("left").set("header", app_strings.LBL_EMAIL_SEARCH);
            	   //Setup the calendars if needed
	               Calendar.setup ({inputField : "searchDateFrom", ifFormat : calFormat, showsTime : false, button : "searchDateFrom_trigger", singleClick : true, step : 1, weekNumbers:false});
	               Calendar.setup ({inputField : "searchDateTo", ifFormat : calFormat, showsTime : false, button : "searchDateTo_trigger", singleClick : true, step : 1, weekNumbers:false});
                   
	               //Initalize sqs object for assigned user name 
	               se.e2Layout.initSQSObject('advancedSearchForm','assigned_user_name');  
	               
	               //Attach event handler for when the relate module option is selected for the correct sqs object
	               var parentSearchArgs = {'formName':'advancedSearchForm','fieldName':'data_parent_name_search',
	                                        'moduleSelectField':'data_parent_type_search','fieldId':'data_parent_id_search'};
	               YAHOO.util.Event.addListener('data_parent_type_search', 'change',function(){ 
	                   SUGAR.email2.composeLayout.enableQuickSearchRelate(null,parentSearchArgs) });
	               
	               //If enter key is pressed, perform search
	               var  addKeyPressFields = ['searchSubject','searchFrom','searchTo','data_parent_name_search','searchDateTo','searchDateFrom','attachmentsSearch','assigned_user_name'];
	               for(var i=0; i < addKeyPressFields.length;i++)
	               {
    	               YAHOO.util.Event.addListener(window.document.forms['advancedSearchForm'].elements[addKeyPressFields[i]],"keydown", function(e){
                    		if (e.keyCode == 13) {
                    			YAHOO.util.Event.stopEvent(e);
                    			SUGAR.email2.search.searchAdvanced();
                    		}
            	       });
	               }
				   //Initiate quick search for the search tab.  Do this only when the tab is selected rather than onDomLoad for perf. gains.
	               enableQS(true);
	               //Clear parent values if selecting another parent type.
	               YAHOO.util.Event.addListener('data_parent_type_search','change', 
	                   function(){ 
	                       document.getElementById('data_parent_id_search').value =''; 
	                       document.getElementById('data_parent_name_search').value =''; 
	                   });
            	
            	}
            });
            se.leftTabs.addTab(searchTab);
            
            var resizeTabBody = function() {
            	var height = SUGAR.email2.leftTabs.get("element").clientHeight - 30;
				SUGAR.email2.leftTabs.get("activeTab").get("contentEl").parentNode.style.height = height + "px";
            }
            resizeTabBody();
            se.complexLayout.on("render", resizeTabBody);
            se.leftTabs.on("activeTabChange", resizeTabBody);
			//hack to allow left pane scroll bar to fully show
          	var lefttabsDiv = document.getElementById('lefttabs');
			var lefttabsDivParent = Dom.getAncestorBy(lefttabsDiv);
			var lefttabsDivGParent = Dom.getAncestorBy(lefttabsDivParent);
			lefttabsDivParent.style.width = lefttabsDivGParent.offsetWidth - 10 + "px";
          
        },
        initSQSObject: function(formName,fieldName)
        {
            var fullFieldName = formName + '_' + fieldName; //SQS Convention
            var resultName = fullFieldName + '_' + 'results';
            
            if (QSFieldsArray[fullFieldName] != null) 
            {
                QSFieldsArray[fullFieldName].destroy();
                delete QSFieldsArray[fullFieldName];
            }
            if (QSProcessedFieldsArray[fullFieldName])
            QSProcessedFieldsArray[fullFieldName] = false;

            if( Dom.get(resultName) )
            {
                var obj = document.getElementById(resultName);
                obj.parentNode.removeChild(obj);
            }
        },
        setPreviewPanel: function(rows) {
        	if (rows) {
            	SUGAR.email2.listViewLayout.getUnitByPosition("right").set("width", 0);
            	SUGAR.email2.listViewLayout.getUnitByPosition("bottom").set("height", 250);
            	Dom.get("listRight").innerHTML = "";
            	Dom.get("listBottom").innerHTML = "<div id='_blank' />";
            } else {
            	SUGAR.email2.listViewLayout.getUnitByPosition("bottom").set("height", 0);
            	SUGAR.email2.listViewLayout.getUnitByPosition("right").set("width", 250);
            	Dom.get("listBottom").innerHTML = "";
            	Dom.get("listRight").innerHTML = "<div id='_blank' />";
            }
        }
    };
	se.e2Layout.init();
}

var myBufferedListenerObject = new Object();
myBufferedListenerObject.refit = function() {
    if(SUGAR.email2.grid) {
        SUGAR.email2.grid.autoSize();
    }
}
// End of File modules/Emails/javascript/complexLayout.js
                                
