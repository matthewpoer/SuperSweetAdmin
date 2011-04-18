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





$header_text = '';
global $mod_strings;
global $app_list_strings;
global $app_strings;
global $current_user;
global $current_language;
$current_module_strings = return_module_language($current_language, 'Schedulers');

$focus = new Scheduler();
$focus->checkCurl();

$where = '';
$limit = '0';
$varName = $focus->object_name; //'Scheduler'
if(!empty($_REQUEST['Schedulers_SCHEDULER_ORDER_BY'])) {
	$orderBy = $_REQUEST['Schedulers_SCHEDULER_ORDER_BY'];
} else {
	$orderBy = $focus->order_by;
}
$allowByOverride = true;

$listView = new ListView();
$listView->show_mass_update = false;  // don't want to mass delete all Schedules
$listView->force_mass_update = true;  // show checkboxes
$listView->show_mass_update_form = false; // don't want the mass update
$listView->initNewXTemplate('modules/Schedulers/ListView.html', $current_module_strings);
$listView->setHeaderTitle($current_module_strings['LBL_LIST_TITLE']);
$listView->setQuery($where, $limit, $orderBy, $varName, $allowByOverride);
$listView->xTemplateAssign("REMOVE_INLINE_PNG", SugarThemeRegistry::current()->getImage('delete_inline','align="absmiddle" alt="'.$app_strings['LNK_REMOVE'].'" border="0"'));
$listView->processListView($focus, "main", "SCHEDULER");

$focus->displayCronInstructions(); 
?>
