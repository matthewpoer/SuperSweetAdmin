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


{if $disable_layout}
<span class='required'>
{sugar_translate label="LBL_SYNC_TO_DETAILVIEW_NOTICE" module="ModuleBuilder"}
</span>
{/if}
<table id='layoutEditorButtons' cellspacing='2'>
    <tr>
    {$buttons}
	{if empty($disable_tabs)}
	<td><input type="checkbox" {if $displayAsTabs}checked="true"{/if} id="tabsCheckbox" onclick="document.forms.prepareForSave.panels_as_tabs.value=this.checked">
	   {sugar_translate label="LBL_TAB_PANELS" module="ModuleBuilder"}&nbsp;{sugar_help text=$mod.LBL_TAB_PANELS_HELP}
	</input></td>
	{/if}
	{if $view == 'editview'}
	<td><input type="checkbox" {if $syncDetailEditViews}checked="true"{/if} id="syncCheckbox" onclick="document.forms.prepareForSave.sync_detail_and_edit.value=this.checked">
	   {sugar_translate label="LBL_SYNC_TO_DETAILVIEW" module="ModuleBuilder"}&nbsp;{sugar_help text=$mod.LBL_SYNC_TO_DETAILVIEW_HELP}
	</input></td>
	{/if}
    </tr>
</table>
<div id='layoutEditor' style="width:675px;">
<input type='hidden' id='fieldwidth' value='{$fieldwidth}'>
<input type='hidden' id='maxColumns' value='{$maxColumns}'>
<input type='hidden' id='nextPanelId' value='{$nextPanelId}'>
<div id='toolbox' style='float:left; overflow-y:auto; overflow-x:hidden';>
    <h2 style='margin-bottom:20px;'>{$mod.LBL_TOOLBOX}</h2>
    
    <div id='delete'>
    {sugar_image name=Delete width=48 height=48}
    </div>

	{if ! isset($fromPortal) && ! isset($wireless) && empty($single_panel)}
    <div id='panelproxy'></div>
    {/if}
    <div id='rowproxy'></div>
    <div id='availablefields'>
    <p id='fillerproxy'></p>

    {counter name='idCount' assign='idCount' start='1'}
    {foreach from=$available_fields item='col' key='id'}
        {assign var="field" value=$col.name}
        <div class='le_field' id='{$idCount}'>
            {if ! $fromModuleBuilder && ($col.name != '(filler)')}
                <img class='le_edit' src="{sugar_getimagepath file='edit_inline.gif'}" style='float:right; cursor:pointer;' onclick="editFieldProperties('{$idCount}', '{$col.label}');" />
            {/if}
            {if isset($col.type) && ($col.type == 'address')}
                {$icon_address}
            {/if}
            {if isset($col.type) && ($col.type == 'phone')}
                {$icon_phone}
            {/if}
            {* BEGIN SUGARCRM flav=pro ONLY *}
            {if isset($field_defs.$field.calculated) && $field_defs.$field.calculated}
                <img src="{sugar_getimagepath file='SugarLogic/icon_calculated.png'}" class="right_icon" />
            {/if}
            {if isset($field_defs.$field.dependency) && $field_defs.$field.dependency}
                <img src="{sugar_getimagepath file='SugarLogic/icon_dependent.png'}" class="right_icon" />
            {/if}
            {* END SUGARCRM flav=pro ONLY *}
            <span id='le_label_{$idCount}'>
            {if !empty($translate) && !empty($col.label)}
                {eval var=$col.label assign='newLabel'}
                {if $from_mb}
                {$current_mod_strings[$newLabel]}
                {else}
                {sugar_translate label=$newLabel module=$language}
                {/if}
 			{else}
                {assign var='label' value=$col.label} 
                {if !empty($current_mod_strings[$label])}
                    {$current_mod_strings[$label]}
                {else}
                	{$label}
                {/if}
            {/if}</span>
            <span class='field_name'>{$col.name}</span>
            <span class='field_label'>{$col.label}</span>
            <span id='le_tabindex_{$idCount}' class='field_tabindex'>{$col.tabindex}</span>
        </div>
        {counter name='idCount' assign='idCount' print=false}
    {/foreach}
    </div>
</div>

<div id='panels' style='float:left; overflow-y:auto; overflow-x:hidden'>

<h3>{$layouttitle}</h3>
{foreach from=$layout item='panel' key='panelid'}

    <div class='le_panel' id='{$idCount}'>

        <div class='panel_label' id='le_panellabel_{$idCount}'>
          <span class='panel_name' id='le_panelname_{$idCount}'>
          	{capture name=panel_upper assign=panel_upper}{$panelid|upper}{/capture}
			{if $panelid eq 'default'}
          		{$mod.LBL_DEFAULT}
			{elseif $from_mb && isset($current_mod_strings.$panel_upper)}
                {$current_mod_strings.$panel_upper}
			{elseif !empty($translate)}
			    {sugar_translate label=$panelid|upper module=$language}
			{else}
			    {$panelid}
			{/if}</span>
          <span class='panel_id' id='le_panelid_{$idCount}'>{$panelid}</span>
        </div>
        {if $panelid ne 'default'}
        <img class='le_edit' src="{sugar_getimagepath file='edit_inline.gif'}" style='float:right; cursor:pointer;' onclick="editPanelProperties('{$idCount}')" />
        {/if}
        {counter name='idCount' assign='idCount' print=false}

        {foreach from=$panel item='row' key='rid'}
            <div class='le_row' id='{$idCount}'>
            {counter name='idCount' assign='idCount' print=false}

            {foreach from=$row item='col' key='cid'}
                {assign var="field" value=$col.name}
                <div class='le_field' id='{$idCount}'>
                    {if ! $fromModuleBuilder && ($col.name != '(filler)')}
                        <img class='le_edit' src="{sugar_getimagepath file='edit_inline.gif'}" 
						style='float:right; cursor:pointer;' 
						onclick="editFieldProperties('{$idCount}', '{$col.label}');" />
                    {/if}

                    {if isset($col.type) && ($col.type == 'address')}
                        {$icon_address}
                    {/if}
                    {if isset($col.type) && ($col.type == 'phone')}
                        {$icon_phone}
                    {/if}
                    {* BEGIN SUGARCRM flav=pro ONLY *}
                    {if isset($field_defs.$field.calculated) && $field_defs.$field.calculated}
                        <img src="{sugar_getimagepath file='SugarLogic/icon_calculated.png'}" class="right_icon" />
                    {/if}
                    {if isset($field_defs.$field.dependency) && $field_defs.$field.dependency}
                        <img src="{sugar_getimagepath file='SugarLogic/icon_dependent.png'}" class="right_icon" />
                    {/if}
                    {* END SUGARCRM flav=pro ONLY *}
                    <span id='le_label_{$idCount}'>
                    {eval var=$col.label assign='label'}
                    {if !empty($translate) && !empty($col.label)}
                        {sugar_translate label=$label module=$language}
                    {else}
		                {if !empty($current_mod_strings[$label])}
		                    {$current_mod_strings[$label]}
		                {elseif !empty($mod[$label])}
		                    {$mod[$label]}
		                {else}
		                	{$label}
		                {/if}
		            {/if}</span>
                    <span class='field_name'>{$col.name}</span>
                    <span class='field_label'>{$col.label}</span>
                    <span id='le_tabindex_{$idCount}' class='field_tabindex'>{$col.tabindex}</span>
                </div>
                {counter name='idCount' assign='idCount' print=false}
            {/foreach}

        </div>
    {/foreach}

    </div>
{/foreach}

</div>
<input type='hidden' id='idCount' value='{$idCount}'>
</div>

<form name='prepareForSave' id='prepareForSave' action='index.php'>
<input type='hidden' name='module' value='ModuleBuilder'>
<input type='hidden' name='view_module' value='{$view_module}'>
<input type='hidden' name='view' value='{$view}'>
<input type='hidden' name="panels_as_tabs" value='{$displayAsTabs}'>
<input type='hidden' name="sync_detail_and_edit" value='{$syncDetailEditViews}'>
<!-- BEGIN SUGARCRM flav=ent ONLY -->
{if $fromPortal}
    <input type='hidden' name='PORTAL' value='1'>
{/if}
<!-- END SUGARCRM flav=ent ONLY -->
{if $fromModuleBuilder}
    <input type='hidden' name='MB' value='1'>
    <input type='hidden' name='view_package' value='{$view_package}'>
{/if}
<input type='hidden' name='to_pdf' value='1'>
</form>
<script>
{literal}



var editPanelProperties = function (panelId, view) {
    panelId = "" + panelId;
	var key_label = document.getElementById('le_panelid_' + panelId).innerHTML.replace(/^\s+|\s+$/g,'');
	var value_label = document.getElementById('le_panelname_' + panelId).innerHTML.replace(/^\s+|\s+$/g,'');
	var params = "module=ModuleBuilder&action=editProperty&view_module=" + encodeURIComponent(ModuleBuilder.module) 
	            + (ModuleBuilder.package ?  "&view_package=" + encodeURIComponent(ModuleBuilder.package) : "")
                + "&view=" + encodeURIComponent(view) + "&id_label=le_panelname_" + encodeURIComponent(panelId) + "&name_label=label_" + encodeURIComponent(key_label.toUpperCase())
                + "&title_label=" + encodeURIComponent(SUGAR.language.get("ModuleBuilder", "LBL_LABEL_TITLE")) + "&value_label=" + encodeURIComponent(value_label);
    ModuleBuilder.getContent(params);
}; 
{/literal}
var editFieldProperties = function (idCount, label) {ldelim}
	var value_label = document.getElementById('le_label_' + idCount).innerHTML.replace(/^\s+|\s+$/g,''); 
	var value_tabindex = document.getElementById('le_tabindex_' + idCount).innerHTML.replace(/^\s+|\s+$/g,'');
	ModuleBuilder.getContent(
	  	'module=ModuleBuilder&action=editProperty'
	  + '&view_module={$view_module|escape:'url'}' + '{if $fromModuleBuilder}&view_package={$view_package}{/if}'
	  +	'&view={$view|escape:'url'}&id_label=le_label_' + encodeURIComponent(idCount) 
	  + '&name_label=label_' + encodeURIComponent(label) + '&title_label={sugar_translate label="LBL_LABEL_TITLE" module="ModuleBuilder"}' 
	  + '&value_label=' + encodeURIComponent(value_label) + '&id_tabindex=le_tabindex_' + encodeURIComponent(idCount) 
	  + '&title_tabindex={sugar_translate label="LBL_TAB_ORDER" module="ModuleBuilder"}' 
	  + '&name_tabindex=tabindex&value_tabindex=' + encodeURIComponent(value_tabindex) );
	
{rdelim}

Studio2.init();
if('{$view}'.toLowerCase() != 'editview')
    ModuleBuilder.helpSetup('layoutEditor','default'+'{$view}'.toLowerCase());
if('{$from_mb}')
    ModuleBuilder.helpUnregisterByID('saveBtn');

ModuleBuilder.MBpackage = "{$view_package}";

Studio2.requiredFields = [{$required_fields}];
{literal}
//rrs: this is for IE 7 which only supports javascript 1.6 and does not have indexOf support.
if (typeof new Array().indexOf == "undefined") {
  Array.prototype.indexOf = function (obj, start) {
    for (var i = (start || 0); i < this.length; i++) {
      if (this[i] == obj) {
        return i;
      }
    }
    return -1;
  }
}
{/literal}
ModuleBuilder.module = "{$view_module}";
ModuleBuilder.package={if $fromModuleBuilder}"{$view_package}"{else}false{/if};


ModuleBuilder.disablePopupPrompt = {if $syncDetailEditViews}{$syncDetailEditViews}{else}false{/if};
</script>