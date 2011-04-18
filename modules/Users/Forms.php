<?php
if(!defined('sugarEntry') || !sugarEntry) die('Not A Valid Entry Point');
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

/*********************************************************************************

 * Description:  Contains a variety of utility functions used to display UI
 * components such as form headers and footers.  Intended to be modified on a per
 * theme basis.
 * Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
 * All Rights Reserved.
 * Contributor(s): ______________________________________..
 ********************************************************************************/

/**
 * Create javascript to validate the data entered into a record.
 * Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
 * All Rights Reserved.
 * Contributor(s): ______________________________________..
 */
function user_get_validate_record_js () {
global $mod_strings;
global $app_strings;

$lbl_email = $mod_strings['LBL_EMAIL'];	
$lbl_last_name = $mod_strings['LBL_LIST_LAST_NAME'];
$lbl_password = $mod_strings['LBL_LIST_PASSWORD'];
$lbl_user_name = $mod_strings['LBL_LIST_USER_NAME'];
$err_missing_required_fields = $app_strings['ERR_MISSING_REQUIRED_FIELDS'];
$err_invalid_required_fields = $app_strings['ERR_INVALID_REQUIRED_FIELDS'];
//$err_invalid_email_address = $app_strings['ERR_INVALID_EMAIL_ADDRESS'];
$err_self_reporting = $app_strings['ERR_SELF_REPORTING'];
$err_password_mismatch = $mod_strings['ERR_PASSWORD_MISMATCH'];
$err_password_missing = $mod_strings['ERR_INVALID_PASSWORD'];

$the_script  = <<<EOQ

<script type="text/javascript" language="Javascript">
function verify_data(form)
{
    // handles any errors in the email widget
    var isError = !check_form("EditView");
	
    if (trim(form.last_name.value) == "") {
		add_error_style('EditView',form.last_name.name,
            '{$app_strings['ERR_MISSING_REQUIRED_FIELDS']} {$mod_strings['LBL_LIST_NAME']}' );
        isError = true;
	}
	if (trim(form.sugar_user_name.value) == "") {
		add_error_style('EditView',form.sugar_user_name.name,
            '{$app_strings['ERR_MISSING_REQUIRED_FIELDS']} {$mod_strings['LBL_USER_NAME']}' );
        isError = true;
	}
	
    if (document.getElementById("required_password").value=='1' 
	        && document.getElementById("new_password").value == "") {
		add_error_style('EditView',form.new_password.name,
            '{$app_strings['ERR_MISSING_REQUIRED_FIELDS']} {$mod_strings['LBL_NEW_PASSWORD']}' );
        isError = true;
	}
	
 	if (isError == true) {
        return false;
    }
		
	if (document.EditView.return_id.value != '' && (document.EditView.return_id.value == form.reports_to_id.value)) {
		alert('$err_self_reporting');
		return false;
	}
	
	if (document.EditView.dec_sep.value != '' && (document.EditView.dec_sep.value == "'")) {
		alert("{$app_strings['ERR_NO_SINGLE_QUOTE']} {$mod_strings['LBL_DECIMAL_SEP']}");
		return false;
	}

	if (document.EditView.num_grp_sep.value != '' && (document.EditView.num_grp_sep.value == "'")) {
		alert("{$app_strings['ERR_NO_SINGLE_QUOTE']} {$mod_strings['LBL_NUMBER_GROUPING_SEP']}");
		return false;
	}

	if (document.EditView.num_grp_sep.value == document.EditView.dec_sep.value) {
		alert("{$app_strings['ERR_DECIMAL_SEP_EQ_THOUSANDS_SEP']}");
		return false;
	}
	if( document.getElementById("portal_only") && document.getElementById("portal_only")=='1' &&
		typeof(document.getElementById("new_password")) != "undefined" && typeof(document.getElementById("new_password").value) != "undefined") {
		if(document.getElementById("new_password").value != '' || document.getElementById("confirm_pwd").value != '') {
			if(document.getElementById("new_password").value != document.getElementById("confirm_pwd").value) {
				alert('$err_password_mismatch');
				return false;
			}
		}
	}
		
	return true;
}
</script>

EOQ;

return $the_script;
}

function user_get_chooser_js()
{
$the_script  = <<<EOQ

<script type="text/javascript" language="Javascript">
<!--  to hide script contents from old browsers

function set_chooser()
{



var display_tabs_def = '';
var hide_tabs_def = '';
var remove_tabs_def = '';

var display_td = document.getElementById('display_tabs_td');
var hide_td    = document.getElementById('hide_tabs_td');
var remove_td  = document.getElementById('remove_tabs_td');

var display_ref = display_td.getElementsByTagName('select')[0];

for(i=0; i < display_ref.options.length ;i++)
{
         display_tabs_def += "display_tabs[]="+display_ref.options[i].value+"&";
}

if(hide_td != null)
{
	var hide_ref = hide_td.getElementsByTagName('select')[0];
    
    for(i=0; i < hide_ref.options.length ;i++)
	{
         hide_tabs_def += "hide_tabs[]="+hide_ref.options[i].value+"&";
	}
}

if(remove_td != null)
{
    var remove_ref = remove_td.getElementsByTagName('select')[0];
    
    for(i=0; i < remove_ref.options.length ;i++)
	{
         remove_tabs_def += "remove_tabs[]="+remove_ref.options[i].value+"&";
	}
	
}

document.EditView.display_tabs_def.value = display_tabs_def;
document.EditView.hide_tabs_def.value = hide_tabs_def;
document.EditView.remove_tabs_def.value = remove_tabs_def;



}
// end hiding contents from old browsers  -->
</script>
EOQ;

return $the_script;
}

function user_get_confsettings_js() {
  global $mod_strings;
  global $app_strings;

  $lbl_last_name = $mod_strings['LBL_MAIL_FROMADDRESS'];
  $err_missing_required_fields = $app_strings['ERR_MISSING_REQUIRED_FIELDS'];

  return <<<EOQ

<script type="text/javascript" language="Javascript">
<!--  to hide script contents from old browsers

function add_checks(f) {
  return true;
}

// end hiding contents from old browsers  -->
</script>

EOQ;
}



?>
