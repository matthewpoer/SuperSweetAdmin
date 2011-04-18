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
<span>
{if $noSuccess}
	<p>{$MOD.LBL_FAILURE}</p>
{else}
	<p>{$MOD.LBL_SUCCESS}</p>
{/if}
{if $createdCount > 0}
<b>{$createdCount}</b>&nbsp;{$MOD.LBL_SUCCESSFULLY_IMPORTED}<br />
{/if}
{if $updatedCount > 0}
<b>{$updatedCount}</b>&nbsp;{$MOD.LBL_UPDATE_SUCCESSFULLY}<br />
{/if}
{if $errorCount > 0}
<b>{$errorCount}</b>&nbsp;{$MOD.LBL_RECORDS_SKIPPED_DUE_TO_ERROR}<br />
<a href="{$errorFile}" target='_blank'>{$MOD.LNK_ERROR_LIST}</a><br />
<a href ="{$errorrecordsFile}" target='_blank'>{$MOD.LNK_RECORDS_SKIPPED_DUE_TO_ERROR}</a><br />
{/if}
{if $dupeCount > 0}
<b>{$dupeCount}</b>&nbsp;{$MOD.LBL_DUPLICATES}<br />
<a href ="{$dupeFile}" target='_blank'>{$MOD.LNK_DUPLICATE_LIST}</a><br />
{/if}

<form name="importlast" id="importlast" method="POST" action="index.php">
<input type="hidden" name="module" value="Import">
<input type="hidden" name="action" value="Undo">
<input type="hidden" name="import_module" value="{$IMPORT_MODULE}">

<br />
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
    <td align="left" style="padding-bottom: 2px;">
{if !$noSuccess}
    <input title="{$MOD.LBL_UNDO_LAST_IMPORT}" accessKey="" class="button"
        type="submit" name="undo" id="undo" value="  {$MOD.LBL_UNDO_LAST_IMPORT}  ">
{/if}
    <input title="{$MOD.LBL_IMPORT_MORE}" accessKey="" class="button" type="submit"
            name="importmore" id="importmore" value="  {$MOD.LBL_IMPORT_MORE}  ">
        <input title="{$MOD.LBL_FINISHED}{$MODULENAME}" accessKey="" class="button" type="submit" 
            name="finished" id="finished" value="  {$MOD.LBL_IMPORT_COMPLETE}  ">
        {$PROSPECTLISTBUTTON}
    </td>
</tr>
</table>
</form>
{if $PROSPECTLISTBUTTON != ''}
<form name="DetailView">
    <input type="hidden" name="module" value="Prospects">
    <input type="hidden" name="record" value="id">
</form>
{/if}
{$JAVASCRIPT}
