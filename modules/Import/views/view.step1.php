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

 * Description: view handler for step 1 of the import process
 * Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
 * All Rights Reserved.
 ********************************************************************************/
require_once('include/MVC/View/SugarView.php');

        
class ImportViewStep1 extends SugarView 
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
	    $returnArray[] = $mod_strings['LBL_STEP_1_TITLE'];
    	
	    return $returnArray;
    }
    
 	/** 
     * @see SugarView::display()
     */
 	public function display()
    {
        global $mod_strings, $app_strings, $current_user;
        global $sugar_config;
        
        $this->ss->assign("MODULE_TITLE", $this->getModuleTitle());
        $this->ss->assign("DELETE_INLINE_PNG",  SugarThemeRegistry::current()->getImage('delete_inline','align="absmiddle" alt="'.$app_strings['LNK_DELETE'].'" border="0"'));
        $this->ss->assign("PUBLISH_INLINE_PNG",  SugarThemeRegistry::current()->getImage('publish_inline','align="absmiddle" alt="'.$mod_strings['LBL_PUBLISH'].'" border="0"'));
        $this->ss->assign("UNPUBLISH_INLINE_PNG",  SugarThemeRegistry::current()->getImage('unpublish_inline','align="absmiddle" alt="'.$mod_strings['LBL_UNPUBLISH'].'" border="0"'));
        $this->ss->assign("IMPORT_MODULE", $_REQUEST['import_module']);
        $this->ss->assign("JAVASCRIPT", $this->_getJS());
        
        
        // handle publishing and deleting import maps
        if (isset($_REQUEST['delete_map_id'])) {
            $import_map = new ImportMap();
            $import_map->mark_deleted($_REQUEST['delete_map_id']);
        }
        
        if (isset($_REQUEST['publish']) ) {
            $import_map = new ImportMap();
            $result = 0;
        
            $import_map = $import_map->retrieve($_REQUEST['import_map_id'], false);
        
            if ($_REQUEST['publish'] == 'yes') {
                $result = $import_map->mark_published($current_user->id,true);
                if (!$result) {
                    $this->ss->assign("ERROR",$mod_strings['LBL_ERROR_UNABLE_TO_PUBLISH']);
                }
            }
            elseif ( $_REQUEST['publish'] == 'no') {
                // if you don't own this importmap, you do now!
                // unless you have a map by the same name
                $result = $import_map->mark_published($current_user->id,false);
                if (!$result) {
                    $this->ss->assign("ERROR",$mod_strings['LBL_ERROR_UNABLE_TO_UNPUBLISH']);
                }
            }
        
        }
        
        // trigger showing other software packages
        $this->ss->assign("show_salesforce",false);
        $this->ss->assign("show_outlook",false);
        $this->ss->assign("show_act",false);
        switch ($_REQUEST['import_module']) {
            case "Prospects":
                break;
            case "Accounts":
                $this->ss->assign("show_salesforce",true);
                $this->ss->assign("show_act",true);
                break;
            case "Contacts":
                $this->ss->assign("show_salesforce",true);
                $this->ss->assign("show_outlook",true);
                $this->ss->assign("show_act",true);
                break;
            default:
                $this->ss->assign("show_salesforce",true);
                break;
        }
        
        // show any custom mappings
        if (sugar_is_dir('custom/modules/Import') && $dir = opendir('custom/modules/Import')) {
            while (($file = readdir('custom/modules/Import')) !== false) {
                if ($file == ".." 
                        || $file == "."
                        || $file == ".svn"
                        || $file == "CVS" 
                        || $file == "Attic"
                        || !sugar_is_dir("./$dirPath".$file)
                        || sugar_is_file("modules/Import/{$file}")
                        )
                    continue;
                require_once("custom/modules/Import/{$file}");
                $classname = str_replace('.php','',$file);
                $mappingClass = new $classname;
                $custom_mappings[] = $mappingClass->name;
            }
        }
        
        
        // get user defined import maps
        $this->ss->assign('is_admin',is_admin($current_user));
        $import_map_seed = new ImportMap();
        $custom_imports_arr = $import_map_seed->retrieve_all_by_string_fields(
            array(
                'assigned_user_id' => $current_user->id,
                'is_published'     => 'no',
                'module'           => $_REQUEST['import_module'],
                )
            );
        
        if ( count($custom_imports_arr) ) {
            $custom = array();
            foreach ( $custom_imports_arr as $import) {
                $custom[] = array(
                    "IMPORT_NAME" => $import->name,
                    "IMPORT_ID"   => $import->id,
                    );
            }
            $this->ss->assign('custom_imports',$custom);
        }
        
        // get globally defined import maps
        $published_imports_arr = $import_map_seed->retrieve_all_by_string_fields(
            array(
                'is_published' => 'yes',
                'module'       => $_REQUEST['import_module'],
                )
            );
        
        if ( count($published_imports_arr) ) {
            $published = array();
            foreach ( $published_imports_arr as $import) {
                $published[] = array(
                    "IMPORT_NAME" => $import->name,
                    "IMPORT_ID"   => $import->id,
                    );
            }
            $this->ss->assign('published_imports',$published);
        }
        
        $this->ss->display('modules/Import/tpls/step1.tpl');
    }
    
    /**
     * Returns JS used in this view
     */
    private function _getJS()
    {
        global $mod_strings;
        
        return <<<EOJAVASCRIPT
<script type="text/javascript">
<!--
document.getElementById('custom_enclosure').onchange = function()
{
    document.getElementById('importstep1').custom_enclosure_other.style.display = ( this.value == 'other' ? '' : 'none' );
}

document.getElementById('gonext').onclick = function()
{
    clear_all_errors();
    var sourceSelected = false;
    var typeSelected = false;
    var isError = false;
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; ++i ){ 
        if ( !sourceSelected && inputs[i].name == 'source' ){
            if (inputs[i].checked) {
                sourceSelected = true;
                if ( inputs[i].value == 'other' && document.getElementById('importstep1').custom_delimiter.value == '' ) {
                    add_error_style('importstep1','custom_delimiter',"{$mod_strings['ERR_MISSING_REQUIRED_FIELDS']} {$mod_strings['LBL_CUSTOM_DELIMITER']}");
                    isError = true;
                }
            }
        }
        if ( !typeSelected && inputs[i].name == 'type' ){
            if (inputs[i].checked) {
                typeSelected = true;
            }
        }
    }
    if ( !sourceSelected ) {
        add_error_style('importstep1','source\'][\'' + (document.getElementById('importstep1').source.length - 1) + '',"{$mod_strings['ERR_MISSING_REQUIRED_FIELDS']} {$mod_strings['LBL_WHAT_IS']}");
        isError = true;
    }
    if ( !typeSelected ) {
        add_error_style('importstep1','type\'][\'1',"{$mod_strings['ERR_MISSING_REQUIRED_FIELDS']} {$mod_strings['LBL_IMPORT_TYPE']}");
        isError = true;
    }
    return !isError;
}

YAHOO.util.Event.onDOMReady(function()
{ 
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; ++i ){ 
        if (inputs[i].name == 'source' ) {
            inputs[i].onclick = function() 
            {
                parentRow = this.parentNode.parentNode;
                switch(this.value) {
                case 'other':
                    enclosureRow = document.getElementById('customEnclosure').parentNode.removeChild(document.getElementById('customEnclosure'));
                    parentRow.parentNode.insertBefore(enclosureRow, document.getElementById('customDelimiter').nextSibling);
                    document.getElementById('customDelimiter').style.display = '';
                    document.getElementById('customEnclosure').style.display = '';
                    break;
                case 'tab': case 'csv':
                    enclosureRow = document.getElementById('customEnclosure').parentNode.removeChild(document.getElementById('customEnclosure'));
                    parentRow.parentNode.insertBefore(enclosureRow, parentRow.nextSibling);
                    document.getElementById('customDelimiter').style.display = 'none';
                    document.getElementById('customEnclosure').style.display = '';
                    break;
                default:
                    document.getElementById('customDelimiter').style.display = 'none';
                    document.getElementById('customEnclosure').style.display = 'none';
                }
            }
        }
    }
});
-->
</script>

EOJAVASCRIPT;
    }
}

?>
