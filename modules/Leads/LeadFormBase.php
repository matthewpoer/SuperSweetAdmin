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

class LeadFormBase  {

function checkForDuplicates($prefix, $id){
	require_once('include/formbase.php');
	
	$focus = new Lead();
	if(!checkRequired($prefix, array_keys($focus->required_fields))){
		return null;
	}
	$query = '';
	$baseQuery = "select id,first_name, last_name,account_name, title  from leads where deleted!=1 and id!='$id' and (status!='Converted' or status is NULL) and ";
	if(isset($_POST[$prefix.'first_name']) && !empty($_POST[$prefix.'first_name']) && isset($_POST[$prefix.'last_name']) && !empty($_POST[$prefix.'last_name'])){
		$query = $baseQuery ." (first_name='". $_POST[$prefix.'first_name'] . "' and last_name = '". $_POST[$prefix.'last_name'] ."')";
	}else{
			$query = $baseQuery ."  last_name = '". $_POST[$prefix.'last_name'] ."'";
	}
	$rows = array();
    global $db;
	$result = $db->query($query);
	while (($row = $db->fetchByAssoc($result)) != null) {
		if(!isset($rows[$row['id']])) {
		   $rows[]=$row;
		}
	}

	$emailStr="";
	if(isset($_POST[$prefix.'email1']) && !empty($_POST[$prefix.'email1'])){
		$emailStr="'". strtoupper($_POST[$prefix.'email1']) ."'";
	}
	if(isset($_POST[$prefix.'email2']) && !empty($_POST[$prefix.'email2'])){
		if (!empty($emailStr)) $emailStr.=",";
		$emailStr="'". strtoupper($_POST[$prefix.'email2']) ."'";
	}

	if(!empty($emailStr) > 0) {
		$query = 'SELECT DISTINCT er.bean_id AS id FROM email_addr_bean_rel er, ' .
		         'email_addresses ea WHERE ea.id = er.email_address_id ' .
		         'AND ea.deleted = 0 AND er.deleted = 0 AND er.bean_module = \'Contacts\' ' .
	             'AND email_address_caps IN (' . $emailStr . ')';
		$result = $db->query($query);
		while (($row= $db->fetchByAssoc($result)) != null) {
			if(!isset($rows[$row['id']])) {
			   $query2 = "SELECT id, first_name, last_name, title FROM contacts WHERE deleted = 0 AND id = '" . $row['id'] . "'";
			   $result2 = $db->query($query2);
			   $r = $db->fetchByAssoc($result2);
			   if(isset($r['id'])) {
			   	  $rows[]=$r;
			   }
			} //if
		}
	} //if
	
    return !empty($rows) ? $rows : null;
}


function buildTableForm($rows, $mod=''){
	if(!empty($mod)){
	global $current_language;
	$mod_strings = return_module_language($current_language, $mod);
	}else global $mod_strings;
	global $app_strings;
	$cols = sizeof($rows[0]) * 2 + 1;
	$form = '<table width="100%"><tr><td>'.$mod_strings['MSG_DUPLICATE']. '</td></tr><tr><td height="20"></td></tr></table>';
	$form .= "<form action='index.php' method='post' name='dupLeads'><input type='hidden' name='selectedLead' value=''>";
	 $form .= get_form_header($mod_strings['LBL_DUPLICATE'],"", '');
	$form .= "<table width='100%' cellpadding='0' cellspacing='0'>	<tr >	<td ></td>";


	require_once('include/formbase.php');
	$form .= getPostToForm();

	if(isset($rows[0])){
		foreach ($rows[0] as $key=>$value){
			if($key != 'id'){


					$form .= "<td scope='col' >". $mod_strings[$mod_strings['db_'.$key]]. "</td>";
			}
		}
		$form .= "</tr>";
	}
	$rowColor = 'oddListRowS1';
	foreach($rows as $row){


		$form .= "<tr class='$rowColor'>";
		$form .= "<td width='1%' nowrap='nowrap' align='center'><input type='checkbox' name='selectedLeads[]' value='{$row['id']}'></td>";
		$wasSet = false;

		foreach ($row as $key=>$value){
				if($key != 'id'){

					if(!$wasSet){
						$form .= "<td scope='row'><a target='_blank' href='index.php?module=Leads&action=DetailView&record=${row['id']}'>$value</a></td>";
						$wasSet = true;
					}else{
					$form .= "<td><a target='_blank' href='index.php?module=Leads&action=DetailView&record=${row['id']}'>$value</a></td>";
		}}
		}
		if($rowColor == 'evenListRowS1'){
			$rowColor = 'oddListRowS1';
		}else{
			 $rowColor = 'evenListRowS1';
		}
		$form .= "</tr>";
	}
		$form .= "<tr ><td colspan='$cols' ></td></tr>";
	$form .= "</table><br><input type='submit' class='button' name='ContinueLead' value='${app_strings['LBL_NEXT_BUTTON_LABEL']}'></form>";
	return $form;





}
function getWideFormBody($prefix, $mod='', $formname=''){
if(!ACLController::checkAccess('Leads', 'edit', true)){
		return '';
	}
global $mod_strings;
$temp_strings = $mod_strings;
if(!empty($mod)){
	global $current_language;
	$mod_strings = return_module_language($current_language, $mod);
}
		global $app_strings;
		global $current_user;
		global $app_list_strings;
		$primary_address_country_options = get_select_options_with_id($app_list_strings['countries_dom'], '');
		$lbl_required_symbol = $app_strings['LBL_REQUIRED_SYMBOL'];
		$lbl_first_name = $mod_strings['LBL_FIRST_NAME'];
		$lbl_last_name = $mod_strings['LBL_LAST_NAME'];
		$lbl_phone = $mod_strings['LBL_OFFICE_PHONE'];
		$lbl_address =  $mod_strings['LBL_PRIMARY_ADDRESS'];
		$user_id = $current_user->id;
		$lbl_email_address = $mod_strings['LBL_EMAIL_ADDRESS'];
		$form = <<<EOQ
		<input type="hidden" name="${prefix}record" value="">
		<input type="hidden" name="${prefix}status" value="New">
		<input type="hidden" name="${prefix}assigned_user_id" value='${user_id}'>
		<table class='evenListRow' border='0' width='100%'><tr><td nowrap cospan='1'>$lbl_first_name<br><input name="${prefix}first_name" type="text" value=""></td><td colspan='1'><FONT class="required">$lbl_required_symbol</FONT>&nbsp;$lbl_last_name<br><input name='${prefix}last_name' type="text" value=""></td></tr>
		<tr><td colspan='4'><hr></td></tr>
		<tr><td nowrap colspan='1'>${mod_strings['LBL_TITLE']}<br><input name='${prefix}title' type="text" value=""></td><td nowrap colspan='1'>${mod_strings['LBL_DEPARTMENT']}<br><input name='${prefix}department' type="text" value=""></td></tr>
		<tr><td colspan='4'><hr></td></tr>
		<tr><td nowrap colspan='4'>$lbl_address<br><input type='text' name='${prefix}primary_address_street' size='80'></td></tr>
		<tr><td> ${mod_strings['LBL_CITY']}<BR><input name='${prefix}primary_address_city'  maxlength='100' value=''></td><td>${mod_strings['LBL_STATE']}<BR><input name='${prefix}primary_address_state'  maxlength='100' value=''></td><td>${mod_strings['LBL_POSTAL_CODE']}<BR><input name='${prefix}primary_address_postalcode'  maxlength='100' value=''></td><td>${mod_strings['LBL_COUNTRY']}<BR><select name='${prefix}primary_address_country' size='1'>{$primary_address_country_options}</select></td></tr>
		<tr><td colspan='4'><hr></td></tr>
		<tr><td nowrap >$lbl_phone<br><input name='${prefix}phone_work' type="text" value=""></td><td nowrap >${mod_strings['LBL_MOBILE_PHONE']}<br><input name='${prefix}phone_mobile' type="text" value=""></td><td nowrap >${mod_strings['LBL_FAX_PHONE']}<br><input name='${prefix}phone_fax' type="text" value=""></td><td nowrap >${mod_strings['LBL_HOME_PHONE']}<br><input name='${prefix}phone_home' type="text" value=""></td></tr>
		<tr><td colspan='4'><hr></td></tr>
		<tr><td nowrap colspan='1'>$lbl_email_address<br><input name='${prefix}email1' type="text" value=""></td><td nowrap colspan='1'>${mod_strings['LBL_OTHER_EMAIL_ADDRESS']}<br><input name='${prefix}email2' type="text" value=""></td></tr>
		<tr><td nowrap colspan='4'>${mod_strings['LBL_DESCRIPTION']}<br><textarea cols='80' rows='4' name='${prefix}description' ></textarea></td></tr></table>

EOQ;


$javascript = new javascript();
$javascript->setFormName($formname);
$javascript->setSugarBean(new Lead());
$javascript->addField('email1','false',$prefix);
$javascript->addField('email2','false',$prefix);
$javascript->addRequiredFields($prefix);
$form .=$javascript->getScript();
$mod_strings = $temp_strings;
return $form;
}

function getFormBody($prefix, $mod='', $formname=''){
	if(!ACLController::checkAccess('Leads', 'edit', true)){
		return '';
	}
global $mod_strings;
$temp_strings = $mod_strings;
if(!empty($mod)){
	global $current_language;
	$mod_strings = return_module_language($current_language, $mod);
}
		global $app_strings;
		global $current_user;
		$lbl_required_symbol = $app_strings['LBL_REQUIRED_SYMBOL'];
		$lbl_first_name = $mod_strings['LBL_FIRST_NAME'];
		$lbl_last_name = $mod_strings['LBL_LAST_NAME'];
		$lbl_phone = $mod_strings['LBL_PHONE'];
		$user_id = $current_user->id;
		$lbl_email_address = $mod_strings['LBL_EMAIL_ADDRESS'];
		$form = <<<EOQ
		<input type="hidden" name="${prefix}record" value="">
		<input type="hidden" name="${prefix}email2" value="">
		<input type="hidden" name="${prefix}status" value="New">
		<input type="hidden" name="${prefix}assigned_user_id" value='${user_id}'>
<p>		$lbl_first_name<br>
		<input name="${prefix}first_name" type="text" value=""><br>
		$lbl_last_name <span class="required">$lbl_required_symbol</span><br>
		<input name='${prefix}last_name' type="text" value=""><br>
		$lbl_phone<br>
		<input name='${prefix}phone_work' type="text" value=""><br>
		$lbl_email_address<br>
		<input name='${prefix}email1' type="text" value=""></p>

EOQ;


$javascript = new javascript();
$javascript->setFormName($formname);
$javascript->setSugarBean(new Lead());
$javascript->addField('email1','false',$prefix);
$javascript->addField('email2','false',$prefix);
$javascript->addRequiredFields($prefix);
$form .=$javascript->getScript();
$mod_strings = $temp_strings;
return $form;

}
function getForm($prefix, $mod='Leads'){
	if(!ACLController::checkAccess('Leads', 'edit', true)){
		return '';
	}
if(!empty($mod)){
	global $current_language;
	$mod_strings = return_module_language($current_language, $mod);
}else global $mod_strings;
global $app_strings;

$lbl_save_button_title = $app_strings['LBL_SAVE_BUTTON_TITLE'];
$lbl_save_button_key = $app_strings['LBL_SAVE_BUTTON_KEY'];
$lbl_save_button_label = $app_strings['LBL_SAVE_BUTTON_LABEL'];


$the_form = get_left_form_header($mod_strings['LBL_NEW_FORM_TITLE']);
$the_form .= <<<EOQ

		<form name="${prefix}LeadSave" onSubmit="return check_form('${prefix}LeadSave')" method="POST" action="index.php">
			<input type="hidden" name="${prefix}module" value="Leads">
			<input type="hidden" name="${prefix}action" value="Save">
EOQ;
$the_form .= $this->getFormBody($prefix, $mod, "${prefix}LeadSave");
$the_form .= <<<EOQ
		<p><input title="$lbl_save_button_title" accessKey="$lbl_save_button_key" class="button" type="submit" name="${prefix}button" value="  $lbl_save_button_label  " ></p>
		</form>

EOQ;
$the_form .= get_left_form_footer();
$the_form .= get_validate_record_js();

return $the_form;


}


function handleSave($prefix,$redirect=true, $useRequired=false, $do_save=true, $exist_lead=null){
	
            require_once('modules/Campaigns/utils.php');	
	require_once('include/formbase.php');

	

	if(empty($exist_lead)) {
        $focus = new Lead();
    }
    else {
        $focus = $exist_lead;
    }

	if($useRequired &&  !checkRequired($prefix, array_keys($focus->required_fields))){
		return null;
	}
	$focus = populateFromPost($prefix, $focus);
	if(!$focus->ACLAccess('Save')){
		ACLController::displayNoAccess(true);
		sugar_cleanup(true);
	}
	if (!isset($_POST[$prefix.'email_opt_out'])) $focus->email_opt_out = 0;
	if (!isset($_POST[$prefix.'do_not_call'])) $focus->do_not_call = 0;
    
    if($do_save) {
    	if(!empty($GLOBALS['check_notify'])) {
    		$focus->save($GLOBALS['check_notify']);
    	}
    	else {
    		$focus->save(FALSE);
    	}
    }
    
    $return_id = $focus->id;
    
	if (isset($_POST[$prefix.'prospect_id']) &&  !empty($_POST[$prefix.'prospect_id'])) {
		$prospect=new Prospect();
		$prospect->retrieve($_POST[$prefix.'prospect_id']);
		$prospect->lead_id=$focus->id;
		$prospect->save();

        //if prospect id exists, make sure we are coming from prospect detail
        if(strtolower($_POST['return_module']) =='prospects' && strtolower($_POST['return_action']) == 'detailview'){
            //create campaing_log entry

            if(isset($focus->campaign_id) && $focus->campaign_id != null){
                campaign_log_lead_entry($focus->campaign_id,$prospect, $focus,'lead');
            }
        }
	}

	///////////////////////////////////////////////////////////////////////////////
	////	INBOUND EMAIL HANDLING
	///////////////////////////////////////////////////////////////////////////////
	if(isset($_REQUEST['inbound_email_id']) && !empty($_REQUEST['inbound_email_id'])) {
		if(!isset($current_user)) {
			global $current_user;
		} 
			
		// fake this case like it's already saved.
		
		$email = new Email();
		$email->retrieve($_REQUEST['inbound_email_id']);
		$email->parent_type = 'Leads';
		$email->parent_id = $focus->id;
		$email->assigned_user_id = $current_user->id;
		$email->status = 'read';
		$email->save();
		$email->load_relationship('leads');
		$email->leads->add($focus->id);
		
		header("Location: index.php?&module=Emails&action=EditView&type=out&inbound_email_id=".$_REQUEST['inbound_email_id']."&parent_id=".$email->parent_id."&parent_type=".$email->parent_type.'&start='.$_REQUEST['start']);
		exit();
	}
	////	END INBOUND EMAIL HANDLING
	///////////////////////////////////////////////////////////////////////////////	
	
	$GLOBALS['log']->debug("Saved record with id of ".$return_id);
	if($redirect){
		handleRedirect($return_id, 'Leads');
	}else{
		return $focus;
	}
}



}


?>
