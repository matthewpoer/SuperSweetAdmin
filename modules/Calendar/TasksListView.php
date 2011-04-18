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

 * Description:  TODO: To be written.
 * Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
 * All Rights Reserved.
 * Contributor(s): ______________________________________..
 ********************************************************************************/





require_once('include/ListView/ListViewSmarty.php');
if(file_exists('custom/modules/Calendar/metadata/listviewdefs.php')){
	require_once('custom/modules/Calendar/metadata/listviewdefs.php');
}else{
	require_once('modules/Calendar/metadata/listviewdefs.php');
}


global $mod_strings;
global $app_strings;
global $app_list_strings;

global $urlPrefix;


global $currentModule;
global $current_language;
$current_module_strings = return_module_language($current_language, 'Tasks');


global $theme;

// clear the display columns back to default when clear query is called
if(!empty($_REQUEST['clear_query']) && $_REQUEST['clear_query'] == 'true')
    $current_user->setPreference('ListViewDisplayColumns', array(), 0, 'Calendar');

$savedDisplayColumns = $current_user->getPreference('ListViewDisplayColumns', 'Calendar'); // get user defined display columns

$json = getJSONobj();
$seedTask = new Task();

// setup listview smarty
$lv = new ListViewSmarty();

$displayColumns = array();
// check $_REQUEST if new display columns from post
if(!empty($_REQUEST['displayColumns'])) {
    foreach(explode('|', $_REQUEST['displayColumns']) as $num => $col) {
        if(!empty($listViewDefs['Tasks'][$col]))
            $displayColumns[$col] = $listViewDefs['Tasks'][$col];
    }
}
elseif(!empty($savedDisplayColumns)) { // use user defined display columns from preferences
    $displayColumns = $savedDisplayColumns;
}
else { // use columns defined in listviewdefs for default display columns
    foreach($listViewDefs['Calendar'] as $col => $params) {
        if(!empty($params['default']) && $params['default'])
            $displayColumns[$col] = $params;
    }
}
$params = array('massupdate' => false); // setup ListViewSmarty params
if(!empty($_REQUEST['orderBy'])) { // order by coming from $_REQUEST
    $params['orderBy'] = $_REQUEST['orderBy'];
    $params['overrideOrder'] = true;
    if(!empty($_REQUEST['sortOrder'])) $params['sortOrder'] = $_REQUEST['sortOrder'];
}
$params['orderBy'] = '';
$lv->displayColumns = $displayColumns;

// use the stored query if there is one
if (!isset($where)) $where = "";
require_once('modules/MySettings/StoreQuery.php');
$storeQuery = new StoreQuery();
if(!isset($_REQUEST['query'])){
    $storeQuery->loadQuery('Calendar');
    $storeQuery->populateRequest();
}else{
    $storeQuery->saveFromGet('Calendar');
}
global $timedate;

//jc: bug 14616 - dates need to specificy the end of the current date in order to get tasks
// that are scheduled to start today
$today = $timedate->getNow(true)->get_day_end_time()->asDb();
//end bug 14616

$where = "(tasks.assigned_user_id='$current_user->id' and tasks.status<>'Completed' and tasks.status<>'Deferred'";
$where .= "and (tasks.date_start is NULL or tasks.date_start <= '$today'))";

$lv->export = false;
$lv->delete = false;
$lv->select = false;
$lv->mailMerge = false;
$lv->multiSelect = false;
$lv->showMassupdateFields = false;
$lv->setup($seedTask, 'include/ListView/ListViewNoMassUpdate.tpl', $where, $params);
echo getClassicModuleTitle($current_module_strings['LBL_MODULE_NAME'], array($current_module_strings['LBL_LIST_FORM_TITLE']), false);


echo $lv->display();
//Fake Mass Update
$form = "<form action='index.php' id='MassUpdate' method='post' name='MassUpdate'><input type='hidden' id='uid' name='uid'><input name='action' type='hidden' value='index' /><input name='module' type='hidden' value='Project'></form>";
echo $form;
?>
