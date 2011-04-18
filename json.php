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


///////////////////////////////////////////////////////////////////////////////
////	HELPER FUNCTIONS
function json_retrieve() {
	global $beanFiles,$beanList;
	require_once($beanFiles[$beanList[$_REQUEST['module']]]);

	$json = getJSONobj();
	
	$focus = new $beanList[$_REQUEST['module']];
	$focus->retrieve($_REQUEST['record']);

	$all_fields = array_merge($focus->column_fields,$focus->additional_column_fields);

	$obj = array();
	$ret = array();

	foreach($all_fields as $field) {
		if(isset($focus->$field)) {
			$obj[$field] = $focus->$field;
		}
	}

	// cn: bug 12274 - defend against CSRF
	$ret['fields'] = $obj;
	print $json->encode($ret, true);
}

function json_get_full_list() {
	global $beanFiles;
	global $beanList;

	require_once('include/utils.php');
	require_once($beanFiles[$beanList[$_REQUEST['module']]]);

	$json = getJSONobj();

	$where = str_replace('\\','', rawurldecode($_REQUEST['where']));
	$order = str_replace('\\','', rawurldecode($_REQUEST['order']));
	$focus = new $beanList[$_REQUEST['module']];
	$fullList = $focus->get_full_list($order, $where, '');
	$all_fields = array_merge($focus->column_fields,$focus->additional_column_fields);

	$js_fields_arr = array();
	
	$i=1; // js doesn't like 0 index?
	foreach($fullList as $note) {
		$js_fields_arr[$i] = array();
		
		foreach($all_fields as $field) {
			if(isset($note->$field)) {
				$note->$field = from_html($note->$field);
				$note->$field = preg_replace('/\r\n/','<BR>',$note->$field);
				$note->$field = preg_replace('/\n/','<BR>',$note->$field);
				$js_fields_arr[$i][$field] = addslashes($note->$field);
			}
		}
		$i++;
	}
	
	$out = $json->encode($js_fields_arr, true);
	print($out);
}
////	END HELPER FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

// called from another file
$GLOBALS['log'] = LoggerManager::getLogger('json.php');

$supported_functions = array('retrieve','get_full_list');
if(in_array($_REQUEST['action'],$supported_functions)) {
	call_user_func('json_'.$_REQUEST['action']);
}

?>
