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


<form name="accountsQuickCreate" id="accountsQuickCreate" method="POST" action="index.php">
<input type="hidden" name="module" value="Accounts">
<input type="hidden" name="email_id" value="{$REQUEST.email_id}">
<input type="hidden" name="case_id" value="{$REQUEST.acase_id}">
<input type="hidden" name="bug_id" value="{$REQUEST.bug_id}">
<input type="hidden" name="parent_id" value="{$REQUEST.parent_id}">
<input type="hidden" name="opportunity_id" value="{$REQUEST.opportunity_id}">
<input type="hidden" name="return_action" value="{$REQUEST.return_action}">
<input type="hidden" name="return_module" value="{$REQUEST.return_module}">
<input type="hidden" name="return_id" value="{$REQUEST.return_id}">
<input type="hidden" name="action" value='Save'>
<input type="hidden" name="is_ajax_call" value='1'>
<input type="hidden" name="to_pdf" value='1'>
<input type="hidden" name="duplicate_parent_id" value="{$REQUEST.duplicate_parent_id}">
<input id='assigned_user_id' name='assigned_user_id' type="hidden" value="{$ASSIGNED_USER_ID}" />
<table width="100%" cellpadding="0" cellspacing="0" border="0">
	<tr>
	<td align="left" style="padding-bottom: 2px;">
		<input title="{$APP.LBL_SAVE_BUTTON_TITLE}" accessKey="{$APP.LBL_SAVE_BUTTON_KEY}" class="button" type="submit" name="button" {$saveOnclick|default:"onclick=\"return check_form('AccountsQuickCreate');\""} value="  {$APP.LBL_SAVE_BUTTON_LABEL}  " >
		<input title="{$APP.LBL_CANCEL_BUTTON_TITLE}" accessKey="{$APP.LBL_CANCEL_BUTTON_KEY}" class="button" type="submit" name="button" {$cancelOnclick|default:"onclick=\"this.form.action.value='$RETURN_ACTION'; this.form.module.value='$RETURN_MODULE'; this.form.record.value='$RETURN_ID'\""} value="  {$APP.LBL_CANCEL_BUTTON_LABEL}  ">
		<input title="{$APP.LBL_FULL_FORM_BUTTON_TITLE}" accessKey="{$APP.LBL_FULL_FORM_BUTTON_KEY}" class="button" type="submit" name="button" onclick="this.form.to_pdf.value='0';this.form.action.value='EditView'; this.form.module.value='Accounts';" value="  {$APP.LBL_FULL_FORM_BUTTON_LABEL}  "></td>
	<td align="right" nowrap><span class="required">{$APP.LBL_REQUIRED_SYMBOL}</span> {$APP.NTC_REQUIRED}</td>
	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="edit view">
<tr>
<td>
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
	<tr>
	<th align="left" scope="row" colspan="4"><h4><slot>{$MOD.LBL_ACCOUNT_INFORMATION}</slot></h4></th>
	</tr>
	<tr>
	<td  scope="row"><slot>{$MOD.LBL_ACCOUNT_NAME} <span class="required">{$APP.LBL_REQUIRED_SYMBOL}</span></slot></td>
	<td  nowrap><slot><input name='name' tabindex='1' size='35' maxlength='150' type="text" value=""></slot></td>
	<td  scope="row"><slot>{$MOD.LBL_PHONE}</slot></td>
	<td ><slot><input name='phone_office' type="text" tabindex='2' size='20' maxlength='25' value=''></slot></td>
	</tr><tr>
	<td scope="row"><slot>{$MOD.LBL_WEBSITE}</slot></td>
	<td ><slot><input name='website' type="text" tabindex='1' size='28' maxlength='255' value=""></slot></td>
	<td scope="row"><slot>{$MOD.LBL_EMAIL}</slot></td>
	<td ><slot><input name='email1' type="text" tabindex='2' size='35' maxlength='100' value=''></slot></td>
	</tr>
	</table>
	</form>
<script>
	{$additionalScripts}
</script>