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
 * Portions created by SugarCRM are Copyright(C) SugarCRM, Inc.
 * All Rights Reserved.
 * Contributor(s): ______________________________________..
 ********************************************************************************/
if (!defined('SUGAR_PHPUNIT_RUNNER')) {
    session_regenerate_id(false); 
}
global $mod_strings;
$authController->login($_REQUEST['user_name'], $_REQUEST['user_password']);
// authController will set the authenticated_user_id session variable
if(isset($_SESSION['authenticated_user_id'])) {
	// Login is successful
	if ( $_SESSION['hasExpiredPassword'] == '1' && $_REQUEST['action'] != 'Save') {
		$GLOBALS['module'] = 'Users';
        $GLOBALS['action'] = 'ChangePassword';
        ob_clean();
        header("Location: index.php?module=Users&action=ChangePassword");
        sugar_cleanup(true);
    }
    global $record;
    global $current_user;
    global $sugar_config;
    
    
    $GLOBALS['module'] = !empty($_REQUEST['login_module']) ? '?module='.$_REQUEST['login_module'] : '?module='.( !empty($sugar_config['default_module']) ? $sugar_config['default_module'] : 'Home' );
    $GLOBALS['action'] = !empty($_REQUEST['login_action']) ? '&action='.$_REQUEST['login_action'] : '&action='.( !empty($sugar_config['default_action']) ? $sugar_config['default_action'] : 'index' );
    $GLOBALS['record']= !empty($_REQUEST['login_record']) ? '&record='.$_REQUEST['login_record'] : '';
    
	// awu: $module is somehow undefined even though the super globals is set, so we set the local variable here
	$module = $GLOBALS['module'];
	$action = $GLOBALS['action'];
	$record = $GLOBALS['record'];
     
    global $current_user;
    //C.L. Added $hasHistory check to respect the login_XXX settings if they are set
    $hasHistory = (!empty($_REQUEST['login_module']) 
        || !empty($_REQUEST['login_action']) 
        || !empty($_REQUEST['login_record']) 
        || !empty($sugar_config['default_module']) 
        || !empty($sugar_config['default_action']) 
        );
    if(isset($current_user) && !$hasHistory){
	    $modListHeader = query_module_access_list($current_user);
	    //try to get the user's tabs
	    $tempList = $modListHeader;
	    $idx = array_shift($tempList);
	    if(!empty($modListHeader[$idx])){
	    	$module = '?module='.$modListHeader[$idx];
	    	$action = '&action=index';
	    	$record = '';
	    }
    }

} else {
	// Login has failed
	$module ="?module=Users";
    $action="&action=Login";
    $record="";
}

// construct redirect url
$url = 'Location: index.php'.$module.$action.$record;

//adding this for bug: 21712.
$GLOBALS['app']->headerDisplayed = true;
if (!defined('SUGAR_PHPUNIT_RUNNER')) {
    sugar_cleanup();
    header($url);
}