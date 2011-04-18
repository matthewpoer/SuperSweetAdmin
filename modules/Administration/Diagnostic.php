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





global $mod_strings;
global $app_list_strings;
global $app_strings;
global $theme;

global $current_user;

if (!is_admin($current_user)) sugar_die("Unauthorized access to administration.");

global $db;
if(empty($db)) {
	
	$db = DBManagerFactory::getInstance();
}

echo getClassicModuleTitle(
        "Administration", 
        array(
            "<a href='index.php?module=Administration&action=index'>{$mod_strings['LBL_MODULE_NAME']}</a>",
           translate('LBL_DIAGNOSTIC_TITLE')
           ), 
        false
        );

global $currentModule;

$GLOBALS['log']->info("Administration Diagnostic");

$sugar_smarty = new Sugar_Smarty();
$sugar_smarty->assign("MOD", $mod_strings);
$sugar_smarty->assign("APP", $app_strings);

if($db->dbType != 'mysql') {
	$sugar_smarty->assign("NO_MYSQL_MESSAGE", "<tr><td class=\"dataLabel\"><slot><font color=red>".
										$mod_strings['LBL_DIAGNOSTIC_NO_MYSQL'].
									  "</font></slot></td></tr><tr><td>&nbsp;</td></tr>");
	$sugar_smarty->assign("MYSQL_CAPABLE", "");
	$sugar_smarty->assign("MYSQL_CAPABLE_CHECKBOXES",
				  "<script type=\"text/javascript\" language=\"Javascript\"> ".
				  "document.Diagnostic.mysql_dumps.disabled=true;".
				  "document.Diagnostic.mysql_schema.disabled=true;".
				  "document.Diagnostic.mysql_info.disabled=true;".
				  "</script>"
				  );
}
else {
	$sugar_smarty->assign("NO_MYSQL_MESSAGE", "");
	$sugar_smarty->assign("MYSQL_CAPABLE", "checked");
	$sugar_smarty->assign("MYSQL_CAPABLE_CHECKBOXES", "");
}

$sugar_smarty->assign("RETURN_MODULE", "Administration");
$sugar_smarty->assign("RETURN_ACTION", "index");

$sugar_smarty->assign("MODULE", $currentModule);
$sugar_smarty->assign("PRINT_URL", "index.php?".$GLOBALS['request_string']);


$sugar_smarty->assign("ADVANCED_SEARCH_PNG", SugarThemeRegistry::current()->getImage('advanced_search','alt="'.$app_strings['LNK_ADVANCED_SEARCH'].'"  border="0"'));
$sugar_smarty->assign("BASIC_SEARCH_PNG", SugarThemeRegistry::current()->getImage('basic_search','alt="'.$app_strings['LNK_BASIC_SEARCH'].'"  border="0"'));

$sugar_smarty->display("modules/Administration/Diagnostic.tpl");
