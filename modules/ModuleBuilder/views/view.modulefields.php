<?php
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

require_once('modules/ModuleBuilder/MB/AjaxCompose.php');
require_once('modules/ModuleBuilder/views/view.modulefield.php');
 
class ViewModulefields extends SugarView
{
    /**
	 * @see SugarView::_getModuleTitleParams()
	 */
	protected function _getModuleTitleParams($browserTitle = false)
	{
	    global $mod_strings;
	    
    	return array(
    	   translate('LBL_MODULE_NAME','Administration'),
    	   ModuleBuilderController::getModuleTitle(),
    	   );
    }

	function display()
	{
        $smarty = new Sugar_Smarty();
        global $mod_strings;
        $bak_mod_strings=$mod_strings;
        $smarty->assign('mod_strings', $mod_strings);

        $module_name = $_REQUEST['view_module'];

        if(! isset($_REQUEST['view_package']) || $_REQUEST['view_package'] == 'studio') {
            //$this->loadPackageHelp($module_name);
            $studioClass = new stdClass;
            $studioClass->name = $module_name;
            
            global $beanList;
            $objectName = $beanList[$module_name];
            
            if($objectName == 'aCase') // Bug 17614 - renamed aCase as Case in vardefs for backwards compatibililty with 451 modules
                $objectName = 'Case';
                
            VardefManager::loadVardef($module_name, $objectName, true);
            global $dictionary;
            $f = array($mod_strings['LBL_HCUSTOM']=>array(), $mod_strings['LBL_HDEFAULT']=>array());

            // TODO: replace this section to select fields to list with the algorithm in AbstractMetaDataImplmentation::validField()
            $def = $this->cullFields($dictionary[$objectName]['fields']);
            
            foreach($dictionary[$objectName]['fields'] as $def) {
                if ($this->isValidStudioField($def))
                {
					//Custom relate fields will have a non-db source, but custom_module set
                	if(isset($def['source']) && $def['source'] == 'custom_fields' || isset($def['custom_module'])) {
                       $f[$mod_strings['LBL_HCUSTOM']][$def['name']] = $def;
                    } else {
                       $f[$mod_strings['LBL_HDEFAULT']][$def['name']] = $def;
                    }
                }
            }
            $studioClass->mbvardefs->vardefs['fields'] = $f;
            $smarty->assign('module', $studioClass);

            $package = new stdClass;
            $package->name = '';
            $smarty->assign('package', $package);
            $ajax = new AjaxCompose();
            $ajax->addCrumb($mod_strings['LBL_STUDIO'], 'ModuleBuilder.getContent("module=ModuleBuilder&action=wizard")');
            $ajax->addCrumb(translate($module_name), 'ModuleBuilder.getContent("module=ModuleBuilder&action=wizard&view_module='.$module_name.'")');
            $ajax->addCrumb($mod_strings['LBL_FIELDS'], '');
            $ajax->addSection('center', $mod_strings['LBL_EDIT_FIELDS'],$smarty->fetch('modules/ModuleBuilder/tpls/MBModule/fields.tpl'));
            $_REQUEST['field'] = '';

            echo $ajax->getJavascript();
        } else {
            require_once('modules/ModuleBuilder/MB/ModuleBuilder.php');
            $mb = new ModuleBuilder();
            $mb->getPackage($_REQUEST['view_package']);
            $package = $mb->packages[$_REQUEST['view_package']];

            $package->getModule($module_name);
            $this->module = $package->modules[$module_name];
            $this->loadPackageHelp($module_name);
            $this->module->getVardefs(true);
            $this->module->mbvardefs->vardefs['fields'] = array_reverse($this->module->mbvardefs->vardefs['fields'], true);
            $loadedFields = array();
            foreach($this->module->mbvardefs->vardefs['fields'] as $k=>$v){
                if($k != $module_name)
                    $titleLBL[$k]=translate("LBL_".strtoupper($k),'ModuleBuilder');
                else{
                    $titleLBL[$k]=$k;
                }
                foreach($v as $field => $def)
                {
                	if (isset($loadedFields[$field]))
                		unset($this->module->mbvardefs->vardefs['fields'][$k][$field]);
                	else
                	   $loadedFields[$field] = true;
                }
            }
            $this->module->mbvardefs->vardefs['fields'][$module_name] = $this->cullFields($this->module->mbvardefs->vardefs['fields'][$module_name]);
            if(file_exists($this->module->path. '/language/'.$GLOBALS['current_language'].'.lang.php')){
                include($this->module->path .'/language/'. $GLOBALS['current_language'].'.lang.php');
                $this->module->setModStrings($GLOBALS['current_language'],$mod_strings);
            }
            elseif(file_exists($this->module->path. '/language/en_us.lang.php')){
                include($this->module->path .'/language/en_us.lang.php');
                $this->module->setModStrings('en_us',$mod_strings);
            }
            $smarty->assign('title', $titleLBL);
            $smarty->assign('package', $package);
            $smarty->assign('module', $this->module);
            $smarty->assign('editLabelsMb','1'); //need to merge MB labels and studio labels. quick fix for now.


            $ajax = new AjaxCompose();
            $ajax->addCrumb($bak_mod_strings['LBL_MODULEBUILDER'], 'ModuleBuilder.main("mb")');
            $ajax->addCrumb($package->name,'ModuleBuilder.getContent("module=ModuleBuilder&action=package&package='.$package->name.'")');
            $ajax->addCrumb($module_name, 'ModuleBuilder.getContent("module=ModuleBuilder&action=module&view_package='.$package->name.'&view_module='. $module_name . '")');
            $ajax->addCrumb($bak_mod_strings['LBL_FIELDS'], '');
            $ajax->addSection('center', $bak_mod_strings["LBL_FIELDS"],$smarty->fetch('modules/ModuleBuilder/tpls/MBModule/fields.tpl'));
            $_REQUEST['field'] = '';

            echo $ajax->getJavascript();


        }
    }

    function loadPackageHelp(
        $name
        )
    {
        $this->module->help['default'] = (empty($name))?'create':'modify';
        $this->module->help['group'] = 'module';
    }

    function cullFields(
        $def
        )
    {
        if(!empty($def['parent_id']))
            unset($def['parent_id']);
        if(!empty($def['parent_type']))
            unset($def['parent_type']);
        if(!empty($def['currency_id']))
            unset($def['currency_id']);
        return $def;
    }
	
    function isValidStudioField(
        $def
        )
	{
    	if (isset($def['studio'])) {
            if (is_array($def [ 'studio' ]))
            {
    			if (isset($def['studio']['editField']) && $def['studio']['editField'] == true)
                    return true;
    			if (isset($def['studio']['required']) && $def['studio']['required'])
                    return true;
                    
    		} else
    		{
    			if ($def['studio'] == 'visible')
                    return true;
                if ($def['studio'] == 'hidden' || $def['studio'] == 'false' || !$def['studio'] )
                    return false;
            }
        }
    	if (empty($def ['source']) || $def ['source'] == 'db' || $def ['source'] == 'custom_fields')
		{
    		if ($def ['type'] != 'id' && (empty($def ['dbType']) || $def ['dbType'] != 'id'))
		  return true;
		}
		
		return false;
	}
}