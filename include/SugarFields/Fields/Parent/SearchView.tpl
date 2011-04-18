{*
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

*}
<select name='{{$vardef.type_name}}' tabindex="{{$tabindex}}" id='{{$vardef.type_name}}' title='{{$vardef.help}}' 
onchange='document.{{$form_name}}.{{sugarvar key='name'}}.value="";document.{{$form_name}}.parent_id.value=""; 
	{{$vardef.type_name}}changeQS(); checkParentType(document.{{$form_name}}.parent_type.value, document.{{$form_name}}.btn_{{sugarvar key='name'}});'>
{html_options options={{sugarvar key='options' string=true}} selected=$fields.parent_type.value}
</select>
{{if $displayParams.split}}
<br>
{{/if}}
{if empty({{sugarvar key='options' string=true}}[$fields.parent_type.value])}
	{assign var="keepParent" value = 0}
{else}
	{assign var="keepParent value = 1}
{/if}
<input type="text" name="{{sugarvar key='name'}}" id="{{sugarvar key='name'}}" class="sqsEnabled" tabindex="{{$tabindex}}" size="{{$displayParams.size}}" value="{{sugarvar key='value'}}" autocomplete="off"><input type="hidden" name="{{$vardef.id_name}}" id="{{$vardef.id_name}}"  {if $keepParent}value="{{sugarvar memberName='vardef.id_name' key='value'}}"{/if}>
<span class="id-ff multiple">
<button type="button" name="btn_{{sugarvar key='name'}}" tabindex="{{$tabindex}}" title="{$APP.LBL_SELECT_BUTTON_TITLE}" 
	   accessKey="{$APP.LBL_SELECT_BUTTON_KEY}" class="button{{if empty($displayParams.selectOnly)}} firstChild{{/if}}" value="{$APP.LBL_SELECT_BUTTON_LABEL}" 
	   onclick='open_popup(document.{{$form_name}}.parent_type.value, 600, 400, "", true, false, {{$displayParams.popupData}}, "single", true);'><img src="{sugar_getimagepath file="id-ff-select.png"}"></button>
{{if empty($displayParams.selectOnly)}}
<button type="button" name="btn_clr_{{sugarvar key='name'}}" tabindex="{{$tabindex}}" title="{$APP.LBL_CLEAR_BUTTON_TITLE}" accessKey="{$APP.LBL_CLEAR_BUTTON_KEY}" class="button lastChild" onclick="this.form.{{sugarvar key='name'}}.value = ''; this.form.{{sugarvar key='id_name'}}.value = '';" value="{$APP.LBL_CLEAR_BUTTON_LABEL}"><img src="{sugar_getimagepath file="id-ff-clear.png"}"></button>
{{/if}}
</span>
<script type="text/javascript">
function {{$vardef.type_name}}changeQS() {ldelim}
	new_module = document.forms["{{$form_name}}"].elements["parent_type"].value;
	if(typeof(disabledModules[new_module]) != 'undefined') {ldelim}
		sqs_objects["{{$form_name}}_{{sugarvar key='name'}}"]["disable"] = true;
		document.forms["{{$form_name}}"].elements["{{sugarvar key='name'}}"].readOnly = true;
	{rdelim} else {ldelim}
		sqs_objects["{{$form_name}}_{{sugarvar key='name'}}"]["disable"] = false;
		document.forms["{{$form_name}}"].elements["{{sugarvar key='name'}}"].readOnly = false;
	{rdelim}	
	sqs_objects["{{$form_name}}_{{sugarvar key='name'}}"]["modules"] = new Array(new_module);
    enableQS(false);
{rdelim}
</script>
{literal}
{{$displayParams.disabled_parent_types}}
{/literal}