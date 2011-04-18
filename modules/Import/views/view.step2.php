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

 * Description: view handler for step 2 of the import process
 * Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
 * All Rights Reserved.
 ********************************************************************************/

require_once('include/MVC/View/SugarView.php');

        
class ImportViewStep2 extends SugarView 
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
	protected function _getModuleTitleParams()
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
	    $returnArray[] = $mod_strings['LBL_STEP_2_TITLE'];
    	
	    return $returnArray;
    }
    
 	/** 
     * @see SugarView::display()
     */
 	public function display()
    {
        global $mod_strings, $app_list_strings, $app_strings, $current_user, $import_bean_map;
        global $import_mod_strings;
        
        $this->ss->assign("MODULE_TITLE", $this->getModuleTitle());
        $this->ss->assign("IMP", $import_mod_strings);
        $this->ss->assign("TYPE",( !empty($_REQUEST['type']) ? $_REQUEST['type'] : "import" ));
        $this->ss->assign("CUSTOM_DELIMITER",
            ( !empty($_REQUEST['custom_delimiter']) ? $_REQUEST['custom_delimiter'] : "," ));
        $this->ss->assign("CUSTOM_ENCLOSURE",htmlentities(
            ( !empty($_REQUEST['custom_enclosure']) && $_REQUEST['custom_enclosure'] != 'other' 
                ? $_REQUEST['custom_enclosure'] : 
                ( !empty($_REQUEST['custom_enclosure_other']) 
                    ? $_REQUEST['custom_enclosure_other'] : "" ) )));
        
        $this->ss->assign("IMPORT_MODULE", $_REQUEST['import_module']);
        $this->ss->assign("HEADER", $app_strings['LBL_IMPORT']." ". $mod_strings['LBL_MODULE_NAME']);
        $this->ss->assign("JAVASCRIPT", $this->_getJS());
        
        // special for importing from Outlook
        if ($_REQUEST['source'] == "outlook") {
            $this->ss->assign("SOURCE", $_REQUEST['source']);
            $this->ss->assign("SOURCE_NAME","Outlook ");
            $this->ss->assign("HAS_HEADER_CHECKED"," CHECKED");
        }
        // see if the source starts with 'custom'
        // if so, pull off the id, load that map, and get the name
        elseif ( strncasecmp("custom:",$_REQUEST['source'],7) == 0) {
            $id = substr($_REQUEST['source'],7);
            $import_map_seed = new ImportMap();
            $import_map_seed->retrieve($id, false);
        
            $this->ss->assign("SOURCE_ID", $import_map_seed->id);
            $this->ss->assign("SOURCE_NAME", $import_map_seed->name);
            $this->ss->assign("SOURCE", $import_map_seed->source);
            if (isset($import_map_seed->delimiter)) 
                $this->ss->assign("CUSTOM_DELIMITER", $import_map_seed->delimiter);
            if (isset($import_map_seed->enclosure)) 
                $this->ss->assign("CUSTOM_ENCLOSURE", htmlentities($import_map_seed->enclosure));
            if ($import_map_seed->has_header)
                $this->ss->assign("HAS_HEADER_CHECKED"," CHECKED");
        }
        else {
            $classname = 'ImportMap' . ucfirst($_REQUEST['source']);
            if ( file_exists("modules/Import/{$classname}.php") )
                require_once("modules/Import/{$classname}.php");
            elseif ( file_exists("custom/modules/Import/{$classname}.php") )
                require_once("custom/modules/Import/{$classname}.php");
            else {
                require_once("custom/modules/Import/ImportMapOther.php");
                $classname = 'ImportMapOther';
                $_REQUEST['source'] = 'other';
            }
            if ( class_exists($classname) ) {
                $import_map_seed = new $classname;
                if (isset($import_map_seed->delimiter)) 
                    $this->ss->assign("CUSTOM_DELIMITER", $import_map_seed->delimiter);
                if (isset($import_map_seed->enclosure)) 
                    $this->ss->assign("CUSTOM_ENCLOSURE", htmlentities($import_map_seed->enclosure));
                if ($import_map_seed->has_header)
                    $this->ss->assign("HAS_HEADER_CHECKED"," CHECKED");
                $this->ss->assign("SOURCE", $_REQUEST['source']);
            }
        }
        
        // add instructions for anything other than custom_delimited
        if ($_REQUEST['source'] != 'other')
        {
            $instructions = array();
            $lang_key = '';
            switch($_REQUEST['source']) {
                case "act":
                    $lang_key = "ACT";
                    break;
                case "outlook":
                    $lang_key = "OUTLOOK";
                    break;
                case "salesforce":
                    $lang_key = "SF";
                    break;
                case "tab":
                    $lang_key = "TAB";
                    break;
                case "csv":
                    $lang_key = "CUSTOM";
                    break;
                case "other":
                    break;
                default:
                    $lang_key = "CUSTOM_MAPPING_".strtoupper($import_map_seed->name);
                    break;
            }
            if ( $lang_key != '' ) {
                for ($i = 1; isset($mod_strings["LBL_{$lang_key}_NUM_$i"]);$i++) {
                    $instructions[] = array(
                        "STEP_NUM"         => $mod_strings["LBL_NUM_$i"],
                        "INSTRUCTION_STEP" => $mod_strings["LBL_{$lang_key}_NUM_$i"],
                    );
                }
                $this->ss->assign("INSTRUCTIONS_TITLE",$mod_strings["LBL_IMPORT_{$lang_key}_TITLE"]);
                $this->ss->assign("instructions",$instructions);
            }
        }
        
        $this->ss->display('modules/Import/tpls/step2.tpl');
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
document.getElementById('goback').onclick = function(){
    document.getElementById('importstep2').action.value = 'Step1';
    return true;
}

document.getElementById('gonext').onclick = function(){
    document.getElementById('importstep2').action.value = 'Step3';
    clear_all_errors();
    var isError = false;
    // be sure we specify a file to upload
    if (document.getElementById('importstep2').userfile.value == "") {
        add_error_style(document.getElementById('importstep2').name,'userfile',"{$mod_strings['ERR_MISSING_REQUIRED_FIELDS']} {$mod_strings['ERR_SELECT_FILE']}");
        isError = true;
    }
    return !isError;
}
-->
</script>

EOJAVASCRIPT;
    }
}
