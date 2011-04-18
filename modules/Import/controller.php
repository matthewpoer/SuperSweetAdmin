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

 * Description: Controller for the Import module
 * Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
 * All Rights Reserved.
 ********************************************************************************/

require_once("modules/Import/Forms.php");
require_once("include/MVC/Controller/SugarController.php");

class ImportController extends SugarController
{
    /**
     * @see SugarController::loadBean()
     */
    public function loadBean()
    {
        global $mod_strings;
        
        $this->bean = loadBean($_REQUEST['import_module']);
        if ( $this->bean ) {
            if ( !$this->bean->importable )
                $this->bean = false;
            elseif ( $_REQUEST['import_module'] == 'Users' && !is_admin($GLOBALS['current_user']) )
                $this->bean = false;
            elseif ( $this->bean->bean_implements('ACL')){
                if(!ACLController::checkAccess($this->bean->module_dir, 'import', true)){
                    ACLController::displayNoAccess();
                    sugar_die('');
                }
            }
        }
        
        if ( !$this->bean ) {
            $_REQUEST['message'] = $mod_strings['LBL_ERROR_IMPORTS_NOT_SET_UP'];
            $this->view = 'error';
        }
        else
            $GLOBALS['FOCUS'] = $this->bean;
    }
    
    function action_index()
    {
        $this->action_Step1();
    }
    
	function action_Step1()
    {
		$this->view = 'step1';
    }
    
    function action_Step2()
    {
		$this->view = 'step2';
    }
    
    function action_Step3()
    {
		$this->view = 'step3';
    }
    
    function action_Step4()
    {
		$this->view = 'step4';
    }
    
    function action_Last()
    {
		$this->view = 'last';
    }
    
    function action_Undo()
    {
		$this->view = 'undo';
    }
    
    function action_Error()
    {
		$this->view = 'error';
    }
    
    function action_GetControl()
    {
        echo getControl($_REQUEST['import_module'],$_REQUEST['field_name']);
        exit;
    }
}
?>