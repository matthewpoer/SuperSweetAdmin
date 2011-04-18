<?php
 if(!defined('sugarEntry'))define('sugarEntry', true);
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

//change directories to where this file is located.
//this is to make sure it can find dce_config.php
chdir(realpath(dirname(__FILE__)));
 
require_once('include/entryPoint.php');

//Bug 27991 . Redirect to index.php if the request is not come from CLI. 
$sapi_type = php_sapi_name();
if (substr($sapi_type, 0, 3) != 'cgi') {
    global $sugar_config;
	if(!empty($sugar_config['site_url'])){
		header("Location: ".$sugar_config['site_url'] . "/index.php");	
	}else{
		sugar_die("Didn't find site url in your sugarcrm config file");
	}
}
//End of #27991

if(empty($current_language)) {
	$current_language = $sugar_config['default_language'];
}

$app_list_strings = return_app_list_strings_language($current_language);
$app_strings = return_application_language($current_language);

global $current_user;
$current_user = new User();
$current_user->getSystemUser();

///////////////////////////////////////////////////////////////////////////////
////	PREP FOR SCHEDULER PID
$GLOBALS['log']->debug('--------------------------------------------> at cron.php <--------------------------------------------');

$cachePath = $GLOBALS['sugar_config']['cache_dir'].'modules/Schedulers';
$pid = 'pid.php';
if(!is_dir($cachePath)) {
	mkdir_recursive($cachePath);
}
if(!is_file($cachePath.'/'.$pid)) {
	if(is_writable($cachePath)) { // the "file" does not yet exist
		write_array_to_file('timestamp', array(strtotime(date('H:i'))) , $cachePath.'/'.$pid);
		require_once($cachePath.'/'.$pid);
	} else {
		$GLOBALS['log']->fatal('Scheduler cannot write PID file.  Please check permissions on '.$cachePath);
	}
} else {
	if(is_writable($cachePath.'/'.$pid)) {
		require_once($cachePath.'/'.$pid);
	} else {
		$GLOBALS['log']->fatal('Scheduler cannot read the PID file.  Please check permissions on '.$cachePath);
	}
}
////	END PREP FOR SCHEDULER PID
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
////	EXECUTE IF VALID TIME (NOT DDOS)

if($timestamp[0] < strtotime(date('H:i'))) {
	if(is_writable($cachePath.'/'.$pid)) {
		write_array_to_file('timestamp', array(strtotime(date('H:i'))) , $cachePath.'/'.$pid);
		require('modules/Schedulers/Scheduler.php');
		$s = new Scheduler();
		$s->flushDeadJobs();
		$s->checkPendingJobs();
	} else {
		$GLOBALS['log']->fatal('Scheduler cannot write PID file.  Please check permissions on '.$cachePath);
	}
} else {
	$GLOBALS['log']->fatal('If you see a whole string of these, there is a chance someone is attacking your system.');
}
$exit_on_cleanup = true;

sugar_cleanup($exit_on_cleanup);
?>