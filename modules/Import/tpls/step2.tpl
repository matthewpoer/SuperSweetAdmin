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
{$MODULE_TITLE}
<form enctype="multipart/form-data" name="importstep2" method="POST" action="index.php" id="importstep2">
<input type="hidden" name="module" value="Import">
<input type="hidden" name="custom_delimiter" value="{$CUSTOM_DELIMITER}">
<input type="hidden" name="custom_enclosure" value="{$CUSTOM_ENCLOSURE}">
<input type="hidden" name="type" value="{$TYPE}">
<input type="hidden" name="source" value="{$SOURCE}">
<input type="hidden" name="source_id" value="{$SOURCE_ID}">
<input type="hidden" name="action" value="Step3">
<input type="hidden" name="import_module" value="{$IMPORT_MODULE}">
{foreach from=$instructions key=key item=item name=instructions}
{if $smarty.foreach.instructions.first}          
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
	<td align="left"><p>{$INSTRUCTIONS_TITLE}</p></td>
</tr>
<tr>
	<td>
	<table width="50%">
{/if}
	<tr>
		<td valign="top"><b>{$item.STEP_NUM}</b></td>
		<td>{$item.INSTRUCTION_STEP}</td>
	</tr>
{if $smarty.foreach.instructions.last}
    </table>
	</td>
</tr>
</table>
{/if}
{/foreach}

<br>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="edit view">
<tr>
<td>
	<table border="0" cellspacing="0" cellpadding="0" width="100%">
	<tr>
	<td align="left" scope="row" colspan="4">{$MOD.LBL_SELECT_FILE}</td>
	</tr>
	<tr>
	<td scope="row">
	<input type="hidden" />
	<input size="60" name="userfile" type="file"/>
	</td>
	</tr>
	<tr>
	<td scope="row">
	{$MOD.LBL_HAS_HEADER}&nbsp;<input class="checkBox" value='on' type="checkbox" name="has_header"{$HAS_HEADER_CHECKED}>
	</td>
	</tr>
	</table>


</td>
</tr>
</table>

<br>
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
	<td align="left">
        <input title="{$MOD.LBL_BACK}" accessKey="" class="button" type="submit" name="button" value="  {$MOD.LBL_BACK}  " id="goback">&nbsp;
	    <input title="{$MOD.LBL_NEXT}" accessKey="" class="button" type="submit" name="button" value="  {$MOD.LBL_NEXT}  " id="gonext">
    </td>
</tr>
</table>

</form>
{$JAVASCRIPT}
