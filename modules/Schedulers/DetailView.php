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


require_once('include/DetailView/DetailView.php');

global $mod_strings;
global $app_strings;
global $timedate;

/* start standard DetailView layout process */
$GLOBALS['log']->info("Schedulers DetailView");
$focus = new Scheduler();
$focus->checkCurl();
$detailView = new DetailView();
$offset=0;
if (isset($_REQUEST['offset']) or isset($_REQUEST['record'])) {
	$result = $detailView->processSugarBean("SCHEDULER", $focus, $offset);
	if($result == null) {
	    sugar_die($app_strings['ERROR_NO_RECORD']);
	}
	$focus=$result;
} else {
	header("Location: index.php?module=Schedulers&action=index");
}
if(isset($_REQUEST['isDuplicate']) && $_REQUEST['isDuplicate'] == 'true') {
	$focus->id = "";
}

$params = array();
$params[] = "<a href='index.php?module=Schedulers&action=index'>{$mod_strings['LBL_MODULE_TITLE']}</a>";
$params[] = $focus->name;

echo getClassicModuleTitle("Schedulers", $params, true);

/* end standard DetailView layout process */

$focus->parseInterval();
$focus->setIntervalHumanReadable();


$xtpl = new XTemplate('modules/Schedulers/DetailView.html');
// custom assigns
$focus->date_time_end = empty($focus->date_time_end) ? 0 : $focus->date_time_end; // this value is often emtpy/null
if(strtotime($focus->date_time_end) < strtotime('2016-01-01 00:00:00')) {
	$xtpl->assign('DATE_TIME_END', $mod_strings['LBL_PERENNIAL']);
} elseif($focus->date_time_end != '') {
	$xtpl->assign('DATE_TIME_END', $mod_strings['LBL_PERENNIAL']);
} else {
	$xtpl->assign('DATE_TIME_END', $focus->date_time_end);
}
if($focus->last_run != '') {
	$xtpl->assign('LAST_RUN', $focus->last_run);
} else {
	$xtpl->assign('LAST_RUN', $mod_strings['LBL_NEVER']);
}
if($focus->time_from != '') {
	$xtpl->assign('TIME_FROM', $focus->time_from);
} else {
	$xtpl->assign('TIME_FROM', $mod_strings['LBL_ALWAYS']);
}
if($focus->time_to != '') {
	$xtpl->assign('TIME_TO', $focus->time_to);
} else {
	$xtpl->assign('TIME_TO', $mod_strings['LBL_ALWAYS']);
}
if($focus->catch_up == 1) {
	$xtpl->assign('CATCH_UP', $mod_strings['LBL_ALWAYS']);
} else {
	$xtpl->assign('CATCH_UP', $mod_strings['LBL_NEVER']);
}

$focus->created_by_name = get_assigned_user_name($focus->created_by);
$focus->modified_by_name = get_assigned_user_name($focus->modified_user_id);

$xtpl->assign('MOD', $mod_strings);
$xtpl->assign('APP', $app_strings);
$xtpl->assign('CREATED_BY', $focus->created_by_name);
$xtpl->assign('MODIFIED_BY', $focus->modified_by_name);
$xtpl->assign('GRIDLINE', $gridline);
$xtpl->assign('PRINT_URL', 'index.php?'.$GLOBALS['request_string']);
$xtpl->assign('ID', $focus->id);
$xtpl->assign('NAME', $focus->name);
$xtpl->assign('JOB', $focus->job);
$xtpl->assign('STATUS',  isset($app_list_strings['scheduler_status_dom'][$focus->status]) ? $app_list_strings['scheduler_status_dom'][$focus->status] : $focus->status);
$xtpl->assign('DATE_TIME_START', $focus->date_time_start);
$xtpl->assign('DATE_ENTERED', $focus->date_entered);
$xtpl->assign('DATE_MODIFIED', $focus->date_modified);
$xtpl->assign('MODIFIED_USER_ID', $focus->modified_by_name);
$xtpl->assign('CREATED_BY', $focus->created_by_name);
$xtpl->assign('JOB_INTERVAL', $focus->intervalHumanReadable);

$xtpl->parse('main');
$xtpl->out('main');

require_once('include/SubPanel/SubPanelTiles.php');
$subpanel = new SubPanelTiles($focus, 'Schedulers');
echo $subpanel->display();

//$focus->displayCronInstructions();
?>
