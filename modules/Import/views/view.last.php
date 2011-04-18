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

 * Description: view handler for last step of the import process
 * Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
 * All Rights Reserved.
 ********************************************************************************/
require_once('include/MVC/View/SugarView.php');

require_once('modules/Import/ImportCacheFiles.php');

                
class ImportViewLast extends SugarView 
{	
    /**
     * @see SugarView::getMenu()
     */
    public function getMenu(
        $module = null
        )
    {
        global $mod_strings, $current_language;
        
        if ( empty($module) )
            $module = $_REQUEST['import_module'];
        
        $old_mod_strings = $mod_strings;
        $mod_strings = return_module_language($current_language, $module);
        $returnMenu = parent::getMenu($module);
        $mod_strings = $old_mod_strings;
        
        return $returnMenu;
    }
    
 	/**
     * @see SugarView::_getModuleTab()
     */
 	protected function _getModuleTab()
    {
        global $app_list_strings, $moduleTabMap;
        
 		// Need to figure out what tab this module belongs to, most modules have their own tabs, but there are exceptions.
        if ( !empty($_REQUEST['module_tab']) )
            return $_REQUEST['module_tab'];
        elseif ( isset($moduleTabMap[$_REQUEST['import_module']]) )
            return $moduleTabMap[$_REQUEST['import_module']];
        // Default anonymous pages to be under Home
        elseif ( !isset($app_list_strings['moduleList'][$_REQUEST['import_module']]) )
            return 'Home';
        else
            return $_REQUEST['import_module'];
 	}
 	
 	/**
	 * @see SugarView::_getModuleTitleParams()
	 */
	protected function _getModuleTitleParams($browserTitle = false)
	{
	    global $mod_strings, $app_list_strings;
	    
	    $iconPath = $this->getModuleTitleIconPath($this->module);
	    $returnArray = array();
	    if (!empty($iconPath) && !$browserTitle) {
	        $returnArray[] = "<a href='index.php?module={$_REQUEST['import_module']}&action=index'><img src='{$iconPath}' alt='{$app_list_strings['moduleList'][$_REQUEST['import_module']]}' title='{$app_list_strings['moduleList'][$_REQUEST['import_module']]}' align='absmiddle'></a>";
    	}
    	else {
    	    $returnArray[] = $app_list_strings['moduleList'][$_REQUEST['import_module']];
    	}
	    $returnArray[] = "<a href='index.php?module=Import&action=Step1&import_module={$_REQUEST['import_module']}'>".$mod_strings['LBL_MODULE_NAME']."</a>";
	    $returnArray[] = $mod_strings['LBL_RESULTS'];
    	
	    return $returnArray;
    }
    
 	/** 
     * @see SugarView::display()
     */
 	public function display()
    {
        global $mod_strings, $app_strings, $current_user, $sugar_config, $current_language;
        
        $this->ss->assign("IMPORT_MODULE", $_REQUEST['import_module']);
        $this->ss->assign("TYPE", $_REQUEST['type']);
        $this->ss->assign("HEADER", $app_strings['LBL_IMPORT']." ". $mod_strings['LBL_MODULE_NAME']);
        $this->ss->assign("MODULE_TITLE", $this->getModuleTitle());
        // lookup this module's $mod_strings to get the correct module name
        $module_mod_strings = 
            return_module_language($current_language, $_REQUEST['import_module']);
        $this->ss->assign("MODULENAME",$module_mod_strings['LBL_MODULE_NAME']);
        
        $this->ss->assign("JAVASCRIPT", $this->_getJS());
        
        // read status file to get totals for records imported, errors, and duplicates
        $count        = 0;
        $errorCount   = 0;
        $dupeCount    = 0;
        $createdCount = 0;
        $updatedCount = 0;
        $fp = sugar_fopen(ImportCacheFiles::getStatusFileName(),'r');
        while (( $row = fgetcsv($fp, 8192) ) !== FALSE) {
            $count         += (int) $row[0];
            $errorCount    += (int) $row[1];
            $dupeCount     += (int) $row[2];
            $createdCount  += (int) $row[3];
            $updatedCount  += (int) $row[4];
        }
        fclose($fp);
    
        $this->ss->assign("noSuccess",FALSE);
        if(($count == $errorCount) || ($dupeCount == $count)){
        	$this->ss->assign("noSuccess",TRUE);        	
        }
              
        $this->ss->assign("errorCount",$errorCount);
        $this->ss->assign("dupeCount",$dupeCount);
        $this->ss->assign("createdCount",$createdCount);
        $this->ss->assign("updatedCount",$updatedCount);
        $this->ss->assign("errorFile",ImportCacheFiles::getErrorFileName());
        $this->ss->assign("errorrecordsFile",ImportCacheFiles::getErrorRecordsFileName());
        $this->ss->assign("dupeFile",ImportCacheFiles::getDuplicateFileName());
        
        if ( $this->bean->object_name == "Prospect" ) {
            $this->ss->assign("PROSPECTLISTBUTTON", 
                $this->_addToProspectListButton());
        }
        else {
            $this->ss->assign("PROSPECTLISTBUTTON","");
        }
        
        $this->ss->display('modules/Import/tpls/last.tpl');
        
        foreach ( UsersLastImport::getBeansByImport($_REQUEST['import_module']) as $beanname ) {
            // load bean
            if ( !( $this->bean instanceof $beanname ) ) {
                $this->bean = new $beanname;
            }
            // build listview to show imported records
            require_once('include/ListView/ListViewFacade.php');
            $lvf = new ListViewFacade($this->bean, $this->bean->module_dir, 0);
        
            $params = array();
            if(!empty($_REQUEST['orderBy'])) {
                $params['orderBy'] = $_REQUEST['orderBy'];
                $params['overrideOrder'] = true;
                if(!empty($_REQUEST['sortOrder'])) $params['sortOrder'] = $_REQUEST['sortOrder'];
            }
            $beanname = ($this->bean->object_name == 'Case' ? 'aCase' : $this->bean->object_name);
            // add users_last_import joins so we only show records done in this import
            $params['custom_from']  = ', users_last_import';
            $params['custom_where'] = " AND users_last_import.assigned_user_id = '{$GLOBALS['current_user']->id}' 
                AND users_last_import.bean_type = '{$beanname}' 
                AND users_last_import.bean_id = {$this->bean->table_name}.id 
                AND users_last_import.deleted = 0 
                AND {$this->bean->table_name}.deleted = 0";
            $where = " {$this->bean->table_name}.id IN ( 
                        SELECT users_last_import.bean_id
                            FROM users_last_import
                            WHERE users_last_import.assigned_user_id = '{$GLOBALS['current_user']->id}' 
                                AND users_last_import.bean_type = '{$beanname}' 
                                AND users_last_import.deleted = 0 )";
                
            $lbl_last_imported = $mod_strings['LBL_LAST_IMPORTED'];
            $lvf->lv->mergeduplicates = false;
            $lvf->lv->showMassupdateFields = false;
            if ( $lvf->type == 2 ) {
                $lvf->template = 'include/ListView/ListViewNoMassUpdate.tpl';
            }
            $module_mod_strings = return_module_language($current_language, $this->bean->module_dir);
            $lvf->setup('', $where, $params, $module_mod_strings, 0, -1, '', strtoupper($beanname), array(), 'id');
            $lvf->display($lbl_last_imported.": ".$module_mod_strings['LBL_MODULE_NAME']);
        }
    }

    /**
     * Returns JS used in this view
     */
    private function _getJS()
    {
        return <<<EOJAVASCRIPT
<script type="text/javascript">
<!--
document.getElementById('importmore').onclick = function(){
    document.getElementById('importlast').action.value = 'Step1';
    return true;
}

document.getElementById('finished').onclick = function(){
    document.getElementById('importlast').module.value = document.getElementById('importlast').import_module.value;
    document.getElementById('importlast').action.value = 'index';
    return true;
}
-->
</script>

EOJAVASCRIPT;
    }
    /**
     * Returns a button to add this list of prospects to a Target List
     *
     * @return string html code to display button
     */
    private function _addToProspectListButton() 
    {
        global $app_strings, $sugar_version, $sugar_config, $current_user;
        
        $query = "SELECT distinct
				prospects.id,
				prospects.assigned_user_id,
				prospects.first_name,
				prospects.last_name,
				prospects.phone_work,
				prospects.title,
				email_addresses.email_address email1,
                                users.user_name as assigned_user_name
				FROM users_last_import,prospects
                                LEFT JOIN users
                                ON prospects.assigned_user_id=users.id
				LEFT JOIN email_addr_bean_rel on prospects.id = email_addr_bean_rel.bean_id and email_addr_bean_rel.bean_module='Prospect' and email_addr_bean_rel.primary_address=1 and email_addr_bean_rel.deleted=0
				LEFT JOIN email_addresses on email_addresses.id = email_addr_bean_rel.email_address_id 
										
				WHERE
				users_last_import.assigned_user_id=
					'{$current_user->id}'
				AND users_last_import.bean_type='Prospect'
				AND users_last_import.bean_id=prospects.id
				AND users_last_import.deleted=0
				AND prospects.deleted=0
			";
        
        $popup_request_data = array(
            'call_back_function' => 'set_return_and_save_background',
            'form_name' => 'DetailView',
            'field_to_name_array' => array(
                'id' => 'subpanel_id',
            ),
            'passthru_data' => array(
                'child_field' => 'notused',
                'return_url' => 'notused',
                'link_field_name' => 'notused',
                'module_name' => 'notused',
                'refresh_page'=>'1',
                'return_type'=>'addtoprospectlist',
                'parent_module'=>'ProspectLists',
                'parent_type'=>'ProspectList',
                'child_id'=>'id',
                'link_attribute'=>'prospects',
                'link_type'=>'default',	 //polymorphic or default
            )				
        );
    
        $popup_request_data['passthru_data']['query'] = urlencode($query);
    
        $json = getJSONobj();
        $encoded_popup_request_data = $json->encode($popup_request_data);	
    
        return <<<EOHTML
<script type="text/javascript" src="include/SubPanel/SubPanelTiles.js?s={$sugar_version}&c={$sugar_config['js_custom_version']}"></script>
<input align=right" type="button" name="select_button" id="select_button" class="button"
     title="{$app_strings['LBL_ADD_TO_PROSPECT_LIST_BUTTON_LABEL']}"
     accesskey="{$app_strings['LBL_ADD_TO_PROSPECT_LIST_BUTTON_KEY']}"
     value="{$app_strings['LBL_ADD_TO_PROSPECT_LIST_BUTTON_LABEL']}"
     onclick='open_popup("ProspectLists",600,400,"",true,true,$encoded_popup_request_data,"Single","true");' />
EOHTML;
    
    }
}
?>
