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

 * Description:  is a form helper
 * Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
 * All Rights Reserved.
 * Contributor(s): ______________________________________..
 ********************************************************************************/

/**
 * Check for null or zero for list of values
 * @param $prefix the prefix of value to be checked
 * @param $required array of value to be checked
 * @return boolean true if all values are set in the array
 */
function checkRequired($prefix, $required)
{
	foreach($required as $key)
	{
		if(!isset($_POST[$prefix.$key]) || number_empty($_POST[$prefix.$key]))
		{
			return false;
		}
	}
	return true;
}

function populateFromPost($prefix, &$focus, $skipRetrieve=false) {
	global $current_user;

	if(!empty($_REQUEST[$prefix.'record']) && !$skipRetrieve)
		$focus->retrieve($_REQUEST[$prefix.'record']);

	if(!empty($_POST['assigned_user_id']) && 
	    ($focus->assigned_user_id != $_POST['assigned_user_id']) && 
	    ($_POST['assigned_user_id'] != $current_user->id)) {
		$GLOBALS['check_notify'] = true;
	}
    require_once('include/SugarFields/SugarFieldHandler.php');
    $sfh = new SugarFieldHandler();
   
	foreach($focus->field_defs as $field=>$def) {
        if ( $field == 'id' && !empty($focus->id) ) {
            // Don't try and overwrite the ID
            continue;
        }
	    $type = !empty($def['custom_type']) ? $def['custom_type'] : $def['type'];
		$sf = $sfh->getSugarField($type);
        if($sf != null){
            $sf->save($focus, $_POST, $field, $def, $prefix);
        } else {
            $GLOBALS['log']->fatal("Field '$field' does not have a SugarField handler");
        }

/*
        if(isset($_POST[$prefix.$field])) {
			if(is_array($_POST[$prefix.$field]) && !empty($focus->field_defs[$field]['isMultiSelect'])) {
				if($_POST[$prefix.$field][0] === '' && !empty($_POST[$prefix.$field][1]) ) {
					unset($_POST[$prefix.$field][0]);
				}
				$_POST[$prefix.$field] = encodeMultienumValue($_POST[$prefix.$field]);	
			}

			$focus->$field = $_POST[$prefix.$field];
			/* 
			 * overrides the passed value for booleans.
			 * this will be fully deprecated when the change to binary booleans is complete.
			 /
			if(isset($focus->field_defs[$prefix.$field]) && $focus->field_defs[$prefix.$field]['type'] == 'bool' && isset($focus->field_defs[$prefix.$field]['options'])) {
				$opts = explode("|", $focus->field_defs[$prefix.$field]['options']);
				$bool = $_POST[$prefix.$field];

				if(is_int($bool) || ($bool === "0" || $bool === "1" || $bool === "2")) {
					// 1=on, 2=off
					$selection = ($_POST[$prefix.$field] == "0") ? 1 : 0;
				} elseif(is_bool($_POST[$prefix.$field])) {
					// true=on, false=off
					$selection = ($_POST[$prefix.$field]) ? 0 : 1;
				}
				$focus->$field = $opts[$selection];
			}
		} else if(!empty($focus->field_defs[$field]['isMultiSelect']) && !isset($_POST[$prefix.$field]) && isset($_POST[$prefix.$field . '_multiselect'])) {
			$focus->$field = '';
		}
*/
	}

	foreach($focus->additional_column_fields as $field) {
		if(isset($_POST[$prefix.$field])) {
			$value = $_POST[$prefix.$field];
			$focus->$field = $value;
		}
	}

	return $focus;
}


function getPostToForm($ignore='', $isRegularExpression=false)
{
	$fields = '';
	if(!empty($ignore) && $isRegularExpression) {
		foreach ($_POST as $key=>$value){
			if(!preg_match($ignore, $key)) {
				$fields.= "<input type='hidden' name='$key' value='$value'>\n";
			}
		}	
	} else {
		foreach ($_POST as $key=>$value){
			if($key != $ignore) {
			   $fields.= "<input type='hidden' name='$key' value='$value'>\n";
			}
		}
	}
	return $fields;
}

function getGetToForm($ignore='', $usePostAsAuthority = false)
{
	$fields = '';
	foreach ($_GET as $key=>$value)
	{
		if($key != $ignore){
			if(!$usePostAsAuthority || !isset($_POST[$key])){
				$fields.= "<input type='hidden' name='$key' value='$value'>";
			}
		}
	}
	return $fields;

}
function getAnyToForm($ignore='', $usePostAsAuthority = false)
{
	$fields = getPostToForm($ignore);
	$fields .= getGetToForm($ignore, $usePostAsAuthority);
	return $fields;

}

function handleRedirect($return_id='', $return_module='')
{
	if(isset($_REQUEST['return_url']) && $_REQUEST['return_url'] != "")
	{
		header("Location: ". $_REQUEST['return_url']);
		exit;
	}

	if(isset($_REQUEST['return_module']) && $_REQUEST['return_module'] != "")
	{
		$return_module = $_REQUEST['return_module'];
	}
	else
	{
		$return_module = $return_module;
	}
	if(isset($_REQUEST['return_action']) && $_REQUEST['return_action'] != "")
	{
	    
	   //if we are doing a "Close and Create New"
        if(isCloseAndCreateNewPressed())
        {
            $return_action = "EditView";    
            $isDuplicate = "true";        
            $status = "";
            
            // Meeting Integration
            if(isset($_REQUEST['meetingIntegrationFlag']) && $_REQUEST['meetingIntegrationFlag'] == 1) {
            	$additionalFlags = array('meetingIntegrationShowForm' => '1');
            }
            // END Meeting Integration
        } 
		// if we create a new record "Save", we want to redirect to the DetailView
		else if($_REQUEST['action'] == "Save" 
			&& $_REQUEST['return_module'] != 'Activities'
			&& $_REQUEST['return_module'] != 'Home' 
			&& $_REQUEST['return_module'] != 'Forecasts' 
			&& $_REQUEST['return_module'] != 'Calendar'
			&& $_REQUEST['return_module'] != 'MailMerge'
			) 
			{
			    $return_action = 'DetailView';
			} elseif($_REQUEST['return_module'] == 'Activities' || $_REQUEST['return_module'] == 'Calendar') {
			$return_module = $_REQUEST['module'];
			$return_action = $_REQUEST['return_action']; 
			// wp: return action needs to be set for one-click close in task list
		} 
		else 
		{
			// if we "Cancel", we go back to the list view.
			$return_action = $_REQUEST['return_action'];
		}
	}
	else
	{
		$return_action = "DetailView";
	}
	
	if(isset($_REQUEST['return_id']) && $_REQUEST['return_id'] != "")
	{
		$return_id = $_REQUEST['return_id'];
	}
    
    if (!isset($isDuplicate) || !$isDuplicate)
    {
        header("Location: index.php?action=$return_action&module=$return_module&record=$return_id&return_module=$return_module&return_action=$return_action");
    } else {
    	$standard = "action=$return_action&module=$return_module&record=$return_id&isDuplicate=true&return_module=$return_module&return_action=$return_action&status=$status";
   		$add = '';

    	if(isset($additionalFlags) && !empty($additionalFlags)) {
    		foreach($additionalFlags as $k => $v) {
    			if(!empty($add)) {
    				$add .= "&";
    			}
    			$add .= "{$k}={$v}";
    		}
    	}
    	if(!empty($add)) {
    		$add = "&" . $add;
    	}
        header("Location: index.php?{$standard}{$add}");
    }
	exit;
}

function getLikeForEachWord($fieldname, $value, $minsize=4)
{
	$value = trim($value);
	$values = explode(' ',$value);
	$ret = '';
	foreach($values as $val)
	{
		if(strlen($val) >= $minsize)
		{
			if(!empty($ret))
			{
				$ret .= ' or';
			}
			$ret .= ' '. $fieldname . ' LIKE %'.$val.'%';
		}

	}


}

function isCloseAndCreateNewPressed() {
    return isset($_REQUEST['action']) && 
           $_REQUEST['action'] == "Save" &&
           isset($_REQUEST['isSaveAndNew']) && 
           $_REQUEST['isSaveAndNew'] == 'true';	
}


?>
