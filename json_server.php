<?php if(!defined('sugarEntry') || !sugarEntry) die('Not A Valid Entry Point');
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


require_once('soap/SoapHelperFunctions.php');
$GLOBALS['log']->debug("JSON_SERVER:");
$global_registry_var_name = 'GLOBAL_REGISTRY';

///////////////////////////////////////////////////////////////////////////////
////	SUPPORTED METHODS
/*
 * ADD NEW METHODS TO THIS ARRAY:
 * then create a function called "function json_$method($request_id, &$params)"
 * where $method is the method name
 */
$SUPPORTED_METHODS = array(
	'retrieve',
	'query',
	'set_accept_status',
	'get_user_array',
	'get_objects_from_module',
	'email',
	'get_full_list'
);

/**
 * Generic retrieve for getting data from a sugarbean
 */
function json_retrieve($request_id, $params) {
	global $current_user;
	global $beanFiles,$beanList;
    $json = getJSONobj();

	$record = $params[0]['record'];

	require_once($beanFiles[$beanList[$params[0]['module']]]);
	$focus = new $beanList[$params[0]['module']];
	$focus->retrieve($record);

	// to get a simplified version of the sugarbean
	$module_arr = populateBean($focus);

	$response = array();
	$response['id'] = $request_id;
	$response['result'] = array("status"=>"success","record"=>$module_arr);
	$json_response = $json->encode($response, true);
	print $json_response;
}

function json_query($request_id, $params) {
	global $response, $sugar_config;
	global $beanFiles, $beanList;
	$json = getJSONobj();

	if($sugar_config['list_max_entries_per_page'] < 31)	// override query limits
		$sugar_config['list_max_entries_per_page'] = 31;

	$args = $params[0];

	//decode condition parameter values..
	if(is_array($args['conditions'])) {
		foreach($args['conditions'] as $key=>$condition)	{
			if(!empty($condition['value'])) {
				$where = $json->decode(utf8_encode($condition['value']));
				// cn: bug 12693 - API change due to CSRF security changes.
				$where = empty($where) ? $condition['value'] : $where;
				$args['conditions'][$key]['value'] = $where;
			}
		}
	}

	$list_return = array();

	if(! empty($args['module'])) {
		$args['modules'] = array($args['module']);
	}

	foreach($args['modules'] as $module) {
		require_once($beanFiles[$beanList[$module]]);
		$focus = new $beanList[$module];

		$query_orderby = '';
		if(!empty($args['order'])) {
			$query_orderby = $args['order'];
		}
		$query_limit = '';
		if(!empty($args['limit'])) {
			$query_limit = $args['limit'];
		}
		$query_where = construct_where($args, $focus->table_name,$module);
		$list_arr = array();
		if($focus->ACLAccess('ListView', true)) {
			$focus->ungreedy_count=false;
			$curlist = $focus->get_list($query_orderby, $query_where, 0, $query_limit, -1, 0);
			$list_return = array_merge($list_return,$curlist['list']);
		}
	}

	$app_list_strings = null;

	for($i = 0;$i < count($list_return);$i++) {
		if(isset($list_return[$i]->emailAddress) && is_object($list_return[$i]->emailAddress)) {
			$list_return[$i]->emailAddress->handleLegacyRetrieve($list_return[$i]);
		}

		$list_arr[$i]= array();
		$list_arr[$i]['fields']= array();
		$list_arr[$i]['module']= $list_return[$i]->object_name;

		foreach($args['field_list'] as $field) {
			// handle enums
			if(	(isset($list_return[$i]->field_name_map[$field]['type']) && $list_return[$i]->field_name_map[$field]['type'] == 'enum') ||
				(isset($list_return[$i]->field_name_map[$field]['custom_type']) && $list_return[$i]->field_name_map[$field]['custom_type'] == 'enum')) {

				// get fields to match enum vals
				if(empty($app_list_strings)) {
					if(isset($_SESSION['authenticated_user_language']) && $_SESSION['authenticated_user_language'] != '') $current_language = $_SESSION['authenticated_user_language'];
					else $current_language = $sugar_config['default_language'];
					$app_list_strings = return_app_list_strings_language($current_language);
				}

				// match enum vals to text vals in language pack for return
				if(!empty($app_list_strings[$list_return[$i]->field_name_map[$field]['options']])) {
					$list_return[$i]->$field = $app_list_strings[$list_return[$i]->field_name_map[$field]['options']][$list_return[$i]->$field];
				}
			}

			$list_arr[$i]['fields'][$field] = $list_return[$i]->$field;
		}
	}


	$response['id'] = $request_id;
	$response['result'] = array("list"=>$list_arr);
    $json_response = $json->encode($response, true);
	echo $json_response;
}


function json_set_accept_status($request_id, $params) {
	global $current_user;
	global $beanFiles,$beanList;
    $json = getJSONobj();
 	require_once($beanFiles[$beanList[$params[0]['module']]]);

	$focus = new $beanList[$params[0]['module']];
	$focus->id = $params[0]['record'];

	$test = $focus->set_accept_status($current_user,$params[0]['accept_status']);

	$response = array();
	$response['id'] = $request_id;
	$response['result'] = array("status"=>"success","record"=>$params[0]['record'],'accept_status'=>$params[0]['accept_status']);
	$json_response = $json->encode($response, true);
	print $json_response;
}


/**
 * retrieves Users matching passed criteria
 */
function json_get_user_array($request_id, $params) {
	$json = getJSONobj();
    $args = $params[0];

	//decode condition parameter values..
	if(is_array($args['conditions'])) {
		foreach($args['conditions'] as $key=>$condition) {
			if(!empty($condition['value'])) {
				$args['conditions'][$key]['value']=$json->decode($condition['value']);
			}
		}
	}

	$response = array();
	$response['id'] = $request_id;
	$response['result'] = array();
	$response['result']['list'] = array();

	if(showFullName()) {
		$user_array = getUserArrayFromFullName($args['conditions'][0]['value']);
	} else {
 		$user_array = get_user_array(false, "Active", $focus->assigned_user_id, false, $args['conditions'][0]['value']);
	}

	foreach($user_array as $id=>$name) {
		array_push($response['result']['list'], array('fields' => array('id' => $id, 'user_name' => $name), 'module' => 'Users'));
	}

	print $json->encode($response, true);
}

function json_get_objects_from_module($request_id, $params) {
	global $beanList, $beanFiles, $current_user;
    $json = getJSONobj();

	$module_name = $params[0]['module'];
	$offset = intval($params[0]['offset']);
	$where = $params[0]['where'];
	$max = $params[0]['max'];
	$order_by = $params[0]['order_by'];
    $using_cp = false;

    if($module_name == 'CampaignProspects'){
        $module_name = 'Prospects';
        $using_cp = true;
    }

	$class_name = $beanList[$module_name];
	require_once($beanFiles[$class_name]);
	$seed = new $class_name();
	if($where == ''){
		$where = '';
	}
	if($offset == '' || $offset == -1){
		$offset = 0;
	}
	if($max == ''){
		$max = 10;
	}

	$deleted = '0';
     if($using_cp){
     	$fields = array('id', 'first_name', 'last_name');
       $response = $seed->retrieveTargetList($where, $fields, $offset,-1,$max,$deleted);
    }else{
	  $response = $seed->get_list($order_by, $where, $offset,-1,$max,$deleted);
    }

	$list = $response['list'];
	$row_count = $response['row_count'];

	$output_list = array();
	foreach($list as $value)
	{
		$output_list[] = get_return_value($value, $module_name);
	}
	$response = array();
	$response['id'] = $request_id;

	$response['result'] = array('result_count'=>$row_count,'entry_list'=>$output_list);
	$json_response = $json->encode($response, true);
	print $json_response;
}




function json_email($request_id, $params) {
	global $response, $sugar_config;
	global $beanFiles,$beanList;
    $json = getJSONobj();

	$args = $params[0];

	if($sugar_config['list_max_entries_per_page'] < 50)	// override query limits
		$sugar_config['list_max_entries_per_page'] = 50;

	$list_return = array();

	if(! empty($args['module'])) {
		$args['modules'] = array($args['module']);
	}

	foreach($args['modules'] as $module) {
		require_once($beanFiles[$beanList[$module]]);
		$focus = new $beanList[$module];

		$query_orderby = '';
		if(!empty($args['order'])) {
			$query_orderby = $args['order'];
		}
		$query_limit = '';
		if(!empty($args['limit'])) {
			$query_limit = $args['limit'];
		}
		$query_where = construct_where($args,$focus->table_name);
		$list_arr = array();

		$curlist = $focus->get_list($query_orderby, $query_where, 0, $query_limit, -1, 0);
		$list_return = array_merge($list_return,$curlist['list']);
	}

	for($i = 0;$i < count($list_return);$i++) {
		$list_arr[$i]= array();
		$list_arr[$i]['fields']= array();
		$list_arr[$i]['module']= $list_return[$i]->object_name;

		foreach($args['field_list'] as $field) {
			$list_arr[$i]['fields'][$field] = $list_return[$i]->$field;
		}
	}

	$response['id'] = $request_id;
	$response['result'] = array("list"=>$list_arr);
	$json_response = $json->encode($response, true);
	echo $json_response;
}


function json_get_full_list($request_id, $params) {
	global $beanFiles;
	global $beanList;
	$json = getJSONobj();
    require_once($beanFiles[$beanList[$params[0]['module']]]);

	$where = str_replace('\\','', rawurldecode($params[0]['where']));
	$order = str_replace('\\','', rawurldecode($params[0]['order']));
	$focus = new $beanList[$params[0]['module']];

	$fullList = $focus->get_full_list($order, $where, '');
	$all_fields = array_merge($focus->column_fields,$focus->additional_column_fields);

	$js_fields_arr = array();

	if(isset($fullList) && !empty($fullList)) { // json error if this isn't defensive
		$i=0;
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
	}

	$fin['id'] = $request_id;
	$fin['result'] = $js_fields_arr;
	$out = $json->encode($fin, true);

	print($out);
}
////	END SUPPORTED METHODS
///////////////////////////////////////////////////////////////////////////////











// ONLY USED FOR MEETINGS
function meeting_retrieve($module,$record) {
	global $response;
	global $beanFiles,$beanList;
	//header('Content-type: text/xml');
	require_once($beanFiles[$beanList[$module]]);
	$focus = new $beanList[$module];
    $json = getJSONobj();

	if(empty($module) || empty($record))
	{
		$response['error'] = array("error_msg"=>"method: retrieve: missing module or record as parameters");
		print $json->encode($response, true);

	}

	$focus->retrieve($record);

	$GLOBALS['log']->debug("JSON_SERVER:retrieved meeting:");

	$module_arr = populateBean($focus);

	if($module == 'Meetings')
	{
		$users = $focus->get_meeting_users();
	} else if($module == 'Calls')
	{
		$users = $focus->get_call_users();
	}

	$module_arr['users_arr'] = array();

	foreach($users as $user)
	{
		array_push($module_arr['users_arr'],	populateBean($user));
	}
	$module_arr['orig_users_arr_hash'] = array();
	foreach($users as $user)
	{
	$module_arr['orig_users_arr_hash'][$user->id] = '1';
	}

	$module_arr['contacts_arr'] = array();

	$focus->load_relationships('contacts');
	$contacts=$focus->get_linked_beans('contacts','Contact');
	foreach($contacts as $contact)
	{
		array_push($module_arr['users_arr'], populateBean($contact));
	}

	return $module_arr;
}

// HAS MEETING SPECIFIC CODE:
function populateBean(&$focus) {
	$all_fields = $focus->column_fields;
	// MEETING SPECIFIC
	$all_fields = array_merge($all_fields,array('required','accept_status','name')); // need name field for contacts and users
	//$all_fields = array_merge($focus->column_fields,$focus->additional_column_fields);

	$module_arr = array();

	$module_arr['module'] = $focus->object_name;

	$module_arr['fields'] = array();

	foreach($all_fields as $field)
	{
		if(isset($focus->$field))
		{
			$focus->$field =	from_html($focus->$field);
			$focus->$field =	preg_replace("/\r\n/","<BR>",$focus->$field);
			$focus->$field =	preg_replace("/\n/","<BR>",$focus->$field);
			$module_arr['fields'][$field] = $focus->$field;
		}
	}
$GLOBALS['log']->debug("JSON_SERVER:populate bean:");
	return $module_arr;
}












function getUserJSON() {
}


function getUserConfigJSON() {
 require_once('include/TimeDate.php');
 $timedate = TimeDate::getInstance();
 global $current_user,$global_registry_var_name,$json,$sugar_config;

 if(isset($_SESSION['authenticated_user_theme']) && $_SESSION['authenticated_user_theme'] != '')
 {
	$theme = $_SESSION['authenticated_user_theme'];
 }
 else
 {
	$theme = $sugar_config['default_theme'];
 }
 $user_arr = array();
 $user_arr['theme'] = $theme;
 $user_arr['fields'] = array();
 $user_arr['module'] = 'User';
 $user_arr['fields']['id'] = $current_user->id;
 $user_arr['fields']['user_name'] = $current_user->user_name;
 $user_arr['fields']['first_name'] = $current_user->first_name;
 $user_arr['fields']['last_name'] = $current_user->last_name;
 $user_arr['fields']['email'] = $current_user->email1;
 $user_arr['fields']['gmt_offset'] = $timedate->getUserUTCOffset();
 $str = "\n".$global_registry_var_name.".current_user = ".$json->encode($user_arr, true).";\n";
return $str;

}






///////////////////////////////////////////////////////////////////////////////
////	UTILS
function authenticate() {
	global $sugar_config;

	$user_unique_key =(isset($_SESSION['unique_key'])) ? $_SESSION['unique_key'] : "";
	$server_unique_key =(isset($sugar_config['unique_key'])) ? $sugar_config['unique_key'] : "";

	if($user_unique_key != $server_unique_key) {
		$GLOBALS['log']->debug("JSON_SERVER: user_unique_key:".$user_unique_key."!=".$server_unique_key);
		session_destroy();
		return null;
	}

	if(!isset($_SESSION['authenticated_user_id'])) {
		$GLOBALS['log']->debug("JSON_SERVER: authenticated_user_id NOT SET. DESTROY");
		session_destroy();
		return null;
	}

	$current_user = new User();

	$result = $current_user->retrieve($_SESSION['authenticated_user_id']);
	$GLOBALS['log']->debug("JSON_SERVER: retrieved user from SESSION");


	if($result == null) {
		$GLOBALS['log']->debug("JSON_SERVER: could get a user from SESSION. DESTROY");
		session_destroy();
		return null;
	}

	return $result;
}

function construct_where(&$query_obj, $table='',$module=null) {
	if(! empty($table)) {
		$table .= ".";
	}
	$cond_arr = array();

	if(! is_array($query_obj['conditions'])) {
		$query_obj['conditions'] = array();
	}

	foreach($query_obj['conditions'] as $condition) {

		if ($condition['name']=='email1' or $condition['name']=='email2') {

			$email1_value=strtoupper($condition['value']);
			$email1_condition = " {$table}id in ( SELECT  er.bean_id AS id FROM email_addr_bean_rel er, " .
		         "email_addresses ea WHERE ea.id = er.email_address_id " .
		         "AND ea.deleted = 0 AND er.deleted = 0 AND er.bean_module = '{$module}' AND email_address_caps LIKE '%{$email1_value}%' )";

	         array_push($cond_arr,$email1_condition);
		}
		else {
			if($condition['op'] == 'contains') {
				$cond_arr[] = $GLOBALS['db']->quote($table.$condition['name'])." like '%".$GLOBALS['db']->quote($condition['value'])."%'";
			}
			if($condition['op'] == 'like_custom') {
				$like = '';
				if(!empty($condition['begin'])) $like .= $GLOBALS['db']->quote($condition['begin']);
				$like .= $GLOBALS['db']->quote($condition['value']);
				if(!empty($condition['end'])) $like .= $GLOBALS['db']->quote($condition['end']);
				$cond_arr[] = $GLOBALS['db']->quote($table.$condition['name'])." like '$like'";
			} else { // starts_with
				$cond_arr[] = $GLOBALS['db']->quote($table.$condition['name'])." like '".$GLOBALS['db']->quote($condition['value'])."%'";
			}
		}
	}

	if($table == 'users.') {
		$cond_arr[] = $table."status='Active'";
	}

	return implode(" {$query_obj['group']} ",$cond_arr);
}

function getAppMetaJSON() {
	global $global_registry_var_name, $sugar_config;
    $json = getJSONobj();

	$str = "\nvar ".$global_registry_var_name." = new Object();\n";
	$str .= "\n".$global_registry_var_name.".config = {\"site_url\":\"".getJavascriptSiteURL()."\"};\n";

	$str .= $global_registry_var_name.".meta = new Object();\n";
	$str .= $global_registry_var_name.".meta.modules = new Object();\n";
	$modules_arr = array('Meetings','Calls');
	$meta_modules = array();

	global $beanFiles,$beanList;
	//header('Content-type: text/xml');
	foreach($modules_arr as $module) {
		require_once($beanFiles[$beanList[$module]]);
		$focus = new $beanList[$module];
		$meta_modules[$module] = array();
		$meta_modules[$module]['field_defs'] = $focus->field_defs;
	}

	$str .= $global_registry_var_name.".meta.modules.Meetings = ". $json->encode($meta_modules['Meetings'], true)."\n";
	$str .= $global_registry_var_name.".meta.modules.Calls = ". $json->encode($meta_modules['Calls'], true)."\n";
	return $str;
}

function getFocusData() {
	global $global_registry_var_name;
    $json = getJSONobj();

	if(empty($_REQUEST['module']) )
		return '';
	elseif(empty($_REQUEST['record'] ) )
		return "\n".$global_registry_var_name.'["focus"] = {"module":"'.$_REQUEST['module'].'",users_arr:[],fields:{"id":"-1"}}'."\n";

	$module_arr = meeting_retrieve($_REQUEST['module'], $_REQUEST['record']);
	return "\n".$global_registry_var_name."['focus'] = ". $json->encode($module_arr, true).";\n";
}

function getStringsJSON() {
	//set module and application string arrays based upon selected language
	global $current_language;
	global $global_registry_var_name;
	$json = getJSONobj();

	$currentModule = 'Calendar';
	$mod_list_strings = return_mod_list_strings_language($current_language,$currentModule);
	$str = "\n".$global_registry_var_name."['calendar_strings'] =	{\"dom_cal_month_long\":". $json->encode($mod_list_strings['dom_cal_month_long']).",\"dom_cal_weekdays_long\":". $json->encode($mod_list_strings['dom_cal_weekdays_long'])."}\n";

	if(empty($_REQUEST['module']))
		$_REQUEST['module'] = 'Home';

	$currentModule = $_REQUEST['module'];
	$mod_strings = return_module_language($current_language,$currentModule);
	return $str . "\n".$global_registry_var_name."['meeting_strings'] =	". $json->encode($mod_strings, true)."\n";
}
////	END UTILS
///////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////
////	JSON SERVER HANDLER LOGIC
//ignore notices
error_reporting(E_ALL ^ E_NOTICE);
ob_start();
insert_charset_header();

if(!empty($sugar_config['session_dir'])) {
	session_save_path($sugar_config['session_dir']);
	$GLOBALS['log']->debug("JSON_SERVER:session_save_path:".$sugar_config['session_dir']);
}

session_start();
$GLOBALS['log']->debug("JSON_SERVER:session started");

$current_language = 'en_us'; // defaulting - will be set by user, then sys prefs

// create json parser
$json = getJSONobj();

// if the language is not set yet, then set it to the default language.
if(isset($_SESSION['authenticated_user_language']) && $_SESSION['authenticated_user_language'] != '') {
	$current_language = $_SESSION['authenticated_user_language'];
} else {
	$current_language = $sugar_config['default_language'];
}

$locale = new Localization();

$GLOBALS['log']->debug("JSON_SERVER: current_language:".$current_language);

// if this is a get, than this is spitting out static javascript as if it was a file
// wp: DO NOT USE THIS. Include the javascript inline using include/json_config.php
// using <script src=json_server.php></script> does not cache properly on some browsers
// resulting in 2 or more server hits per page load. Very bad for SSL.
if(strtolower($_SERVER['REQUEST_METHOD'])== 'get') {
	echo "alert('DEPRECATED API\nPlease report as a bug.');";
	/**
	 * Deprecated for security reasons.
	 *
	 * DO NOT USE.
	 *
	 *
	$current_user = authenticate();
	if(empty($current_user)) {
		$GLOBALS['log']->debug("JSON_SERVER: current_user isn't set");
		print "";
	}

	$str = '';
	$str .= getAppMetaJSON();
	$GLOBALS['log']->debug("JSON_SERVER:getAppMetaJSON");

	if($_GET['module'] != '_configonly') {
		$str .= getFocusData();
		$GLOBALS['log']->debug("JSON_SERVER: getFocusData");
		$str .= getStringsJSON();
		$GLOBALS['log']->debug("JSON_SERVER:getStringsJSON");
	}

	$str .= getUserConfigJSON();
	$GLOBALS['log']->debug("JSON_SERVER:getUserConfigJSON");
	print $str;
	 */
} else {
	// else act as a JSON-RPC server for SugarCRM
	// create result array
	$response = array();
	$response['result'] = null;
	$response['id'] = "-1";

	// authenticate user
	$current_user = authenticate();

	if(empty($current_user)) {
		$response['error'] = array("error_msg"=>"not logged in");
		print $json->encode($response, true);
		print "not logged in";
	}

	// extract request
	if(isset($GLOBALS['HTTP_RAW_POST_DATA']))
		$request = $json->decode($GLOBALS['HTTP_RAW_POST_DATA'], true);
	else
		$request = $json->decode(file_get_contents("php://input"), true);


	if(!is_array($request)) {
		$response['error'] = array("error_msg"=>"malformed request");
		print $json->encode($response, true);
	}

	// make sure required RPC fields are set
	if(empty($request['method']) || empty($request['id'])) {
		$response['error'] = array("error_msg"=>"missing parameters");
		print $json->encode($response, true);
	}

	$response['id'] = $request['id'];

	if(in_array($request['method'], $SUPPORTED_METHODS)) {
		call_user_func('json_'.$request['method'],$request['id'],$request['params']);
	} else {
		$response['error'] = array("error_msg"=>"method:".$request["method"]." not supported");
		print $json->encode($response, true);
	}
}

ob_end_flush();
sugar_cleanup();
exit();
?>