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

/**
 * TemplateHandler builds templates using SugarFields and a generic view.
 * Currently it handles EditViews and DetailViews. It creates a smarty template cached in
 * cache/modules/moduleName/view
 *
 */


class TemplateHandler {
    var $cacheDir;
    var $templateDir = 'modules/';
    var $ss;
    function TemplateHandler() {
      $this->cacheDir = $GLOBALS['sugar_config']['cache_dir'];
    }

    function loadSmarty(){
        if(empty($this->ss)){
            $this->ss = new Sugar_Smarty();
        }
    }


    /**
     * clearAll
     * Helper function to remove all .tpl files in the cache directory
     *
     */
    function clearAll() {
    	global $beanList;
		foreach($beanList as $module_dir =>$object_name){
                TemplateHandler::clearCache($module_dir);
		}
    }


    /**
     * clearCache
     * Helper function to remove cached .tpl files for a particular module
     *
     * @param String $module The module directory to clear
     * @param String $view Optional view value (DetailView, EditView, etc.)
     */
    function clearCache($module, $view=''){
        $cacheDir = create_cache_directory('modules/'. $module . '/');
        $d = dir($cacheDir);
        while($e = $d->read()){
            if(!empty($view) && $e != $view )continue;
            $end =strlen($e) - 4;
            if(is_file($cacheDir .'/' . $e) && $end > 1 && substr($e, $end) == '.tpl'){
                unlink($cacheDir .'/' . $e);
            }
        }
    }

    /**
     * Builds a template
     * This is a private function that should be called only from checkTemplate method
     *
     * @param module string module name
     * @param view string view need (eg DetailView, EditView, etc)
     * @param tpl string generic tpl to use
     * @param ajaxSave boolean parameter indicating whether or not this is coming from an Ajax call
     * @param metaDataDefs metadata definition as Array
     **/
    function buildTemplate($module, $view, $tpl, $ajaxSave, $metaDataDefs) {
        $this->loadSmarty();

        $cacheDir = create_cache_directory($this->templateDir. $module . '/');
        $file = $cacheDir . $view . '.tpl';
        $string = '{* Create Date: ' . date('Y-m-d H:i:s') . "*}\n";
        $this->ss->left_delimiter = '{{';
        $this->ss->right_delimiter = '}}';
        $this->ss->assign('module', $module);
        $this->ss->assign('built_in_buttons', array('CANCEL', 'DELETE', 'DUPLICATE', 'EDIT', 'FIND_DUPLICATES', 'SAVE', 'CONNECTOR'));
        $contents = $this->ss->fetch($tpl);
        //Insert validation and quicksearch stuff here
        if($view == 'EditView' || strpos($view,'QuickCreate') || $ajaxSave || $view == "ConvertLead") {

            global $dictionary, $beanList, $app_strings, $mod_strings;
            $mod = $beanList[$module];

            if($mod == 'aCase') {
                $mod = 'Case';
            }

            $defs = $dictionary[$mod]['fields'];
            $defs2 = array();
            //Retrieve all panel field definitions with displayParams Array field set
            $panelFields = array();

            foreach($metaDataDefs['panels'] as $panel) {
                    foreach($panel as $row) {
                            foreach($row as $entry) {
                                    if(empty($entry)) {
                                       continue;
                                    }

                                    if(is_array($entry) &&
                                       isset($entry['name']) &&
                                       isset($entry['displayParams']) &&
                                       isset($entry['displayParams']['required']) &&
                                       $entry['displayParams']['required']) {
                                       $panelFields[$entry['name']] = $entry;
                                    }

                                    if(is_array($entry)) {
                                      $defs2[$entry['name']] = $entry;
                                    } else {
                                      $defs2[$entry] = array('name' => $entry);
                                    }
                            } //foreach
                    } //foreach
            } //foreach

            foreach($panelFields as $field=>$value) {
                      $nameList = array();
                      if(!is_array($value['displayParams']['required'])) {
                         $nameList[] = $field;
                      } else {
                         foreach($value['displayParams']['required'] as $groupedField) {
                                 $nameList[] = $groupedField;
                         }
                      }

                      foreach($nameList as $x) {
                         if(isset($defs[$x]) &&
                            isset($defs[$x]['type']) &&
                            !isset($defs[$x]['required'])) {
                            $defs[$x]['required'] = true;
                         }
                      }
            } //foreach

            //Create a base class with field_name_map property
            $sugarbean = new stdClass;
            $sugarbean->field_name_map = $defs;
            $sugarbean->module_dir = $module;

            $javascript = new javascript();
            $view = $view == 'QuickCreate' ? "QuickCreate_{$module}" : $view;
            $javascript->setFormName($view);

            $javascript->setSugarBean($sugarbean);
            if ($view != "ConvertLead")
                $javascript->addAllFields('', null,true);

            $validatedFields = array();
            $javascript->addToValidateBinaryDependency('assigned_user_name', 'alpha', $javascript->buildStringToTranslateInSmarty('ERR_SQS_NO_MATCH_FIELD').': '.$javascript->buildStringToTranslateInSmarty('LBL_ASSIGNED_TO'), 'false', '', 'assigned_user_id');
            $validatedFields[] = 'assigned_user_name';
            //Add remaining validation dependency for related fields
            //1) a relate type as defined in vardefs
            //2) set in metadata layout
            //3) not have validateDepedency set to false in metadata
            //4) have id_name in vardef entry
            //5) not already been added to Array
            foreach($sugarbean->field_name_map as $name=>$def) {

               if($def['type']=='relate' &&
                  isset($defs2[$name]) &&
                  (!isset($defs2[$name]['validateDependency']) || $defs2[$name]['validateDependency'] === true) &&
                  isset($def['id_name']) &&
                  !in_array($name, $validatedFields)) {

                  if(isset($mod_strings[$def['vname']])
                        || isset($app_strings[$def['vname']])
                        || translate($def['vname'],$sugarbean->module_dir) != $def['vname']) {
                     $vname = $def['vname'];
                  }
                  else{
                     $vname = "undefined";
                  }
                  $javascript->addToValidateBinaryDependency($name, 'alpha', $javascript->buildStringToTranslateInSmarty('ERR_SQS_NO_MATCH_FIELD').': '.$javascript->buildStringToTranslateInSmarty($vname), (!empty($def['required']) ? 'true' : 'false'), '', $def['id_name']);
                  $validatedFields[] = $name;
               }
            } //foreach

            $contents .= "{literal}\n";
            $contents .= $javascript->getScript();
            $contents .= $this->createQuickSearchCode($defs, $defs2, $view, $module);
            $contents .= "{/literal}\n";
        }else if(preg_match('/^SearchForm_.+/', $view)){
            global $dictionary, $beanList, $app_strings, $mod_strings;
            $mod = $beanList[$module];

            if($mod == 'aCase') {
                $mod = 'Case';
            }

            $defs = $dictionary[$mod]['fields'];
            $contents .= '{literal}';
            $contents .= $this->createQuickSearchCode($defs, array(), $view);
            $contents .= '{/literal}';
        }//if

        //Remove all the copyright comments
        $contents = preg_replace('/\{\*[^\}]*?\*\}/', '', $contents);

        if($fh = @sugar_fopen($file, 'w')) {
            fputs($fh, $contents);
            fclose($fh);
        }


        $this->ss->left_delimiter = '{';
        $this->ss->right_delimiter = '}';
    }

    /**
     * Checks if a template exists
     *
     * @param module string module name
     * @param view string view need (eg DetailView, EditView, etc)
     */
    function checkTemplate($module, $view, $checkFormName = false, $formName='') {
        if(!empty($GLOBALS['sugar_config']['developerMode']) || !empty($_SESSION['developerMode'])){
            return false;
        }
        $view = $checkFormName ? $formName : $view;
        return file_exists($this->cacheDir . $this->templateDir . $module . '/' .$view . '.tpl');
    }

    /**
     * Retreives and displays a template
     *
     * @param module string module name
     * @param view string view need (eg DetailView, EditView, etc)
     * @param tpl string generic tpl to use
     * @param ajaxSave boolean parameter indicating whether or not this is from an Ajax operation
     * @param metaData Optional metadata definition Array
     */
    function displayTemplate($module, $view, $tpl, $ajaxSave = false, $metaDataDefs = null) {
        $this->loadSmarty();
        if(!$this->checkTemplate($module, $view)) {
            $this->buildTemplate($module, $view, $tpl, $ajaxSave, $metaDataDefs);
        }
        $file = $this->cacheDir . $this->templateDir . $module . '/' . $view . '.tpl';
        if(file_exists($file)) {
           return $this->ss->fetch($file);
        } else {
           global $app_strings;
           $GLOBALS['log']->fatal($app_strings['ERR_NO_SUCH_FILE'] .": $file");
           return $app_strings['ERR_NO_SUCH_FILE'] .": $file";
        }
    }

    /**
     * Deletes an existing template
     *
     * @param module string module name
     * @param view string view need (eg DetailView, EditView, etc)
     */
    function deleteTemplate($module, $view) {
        if(is_file($this->cacheDir . $this->templateDir . $module . '/' .$view . '.tpl')) {
            return unlink($this->cacheDir . $this->templateDir . $module . '/' .$view . '.tpl');
        }
        return false;
    }


    /**
     * createQuickSearchCode
     * This function creates the $sqs_objects array that will be used by the quicksearch Javascript
     * code.  The $sqs_objects array is wrapped in a $json->encode call.
     *
     * @param $def The vardefs.php definitions
     * @param $defs2 The Meta-Data file definitions
     *
     */
    function createQuickSearchCode($defs, $defs2, $view = '', $module='') {
        $sqs_objects = array();
        require_once('include/QuickSearchDefaults.php');
        $qsd = new QuickSearchDefaults();
        $qsd->setFormName($view);
        if(preg_match('/^SearchForm_.+/', $view)){
        	if(strpos($view, 'popup_query_form')){
        		$qsd->setFormName('popup_query_form');
            	$parsedView = 'advanced';
        	}else{
        		$qsd->setFormName('search_form');
            	$parsedView = preg_replace("/^SearchForm_/", "", $view);
        	}
            //Loop through the Meta-Data fields to see which ones need quick search support
            foreach($defs as $f) {
                $field = $f;
                $name = $qsd->form_name . '_' . $field['name'];
                if($field['type'] == 'relate' && isset($field['module']) && preg_match('/_name$|_c$/si',$name)) {
                    if(preg_match('/^(Campaigns|Teams|Users|Contacts|Accounts)$/si', $field['module'], $matches)) {

                        if($matches[0] == 'Campaigns') {
                            $sqs_objects[$name.'_'.$parsedView] = $qsd->getQSCampaigns();
                        } else if($matches[0] == 'Users'){

                            if(!empty($f['name']) && !empty($f['id_name'])) {
                                $sqs_objects[$name.'_'.$parsedView] = $qsd->getQSUser($f['name'],$f['id_name']);
                            }
                            else {
                                $sqs_objects[$name.'_'.$parsedView] = $qsd->getQSUser();
                            }
                        } else if($matches[0] == 'Campaigns') {
                            $sqs_objects[$name.'_'.$parsedView] = $qsd->getQSCampaigns();
                        } else if($matches[0] == 'Accounts') {
                            $nameKey = $name;
                            $idKey = isset($field['id_name']) ? $field['id_name'] : 'account_id';

                            //There are billingKey, shippingKey and additionalFields entries you can define in editviewdefs.php
                            //entry to allow quick search to autocomplete fields with a suffix value of the
                            //billing/shippingKey value (i.e. 'billingKey' => 'primary' in Contacts will populate
                            //primary_XXX fields with the Account's billing address values).
                            //addtionalFields are key/value pair of fields to fill from Accounts(key) to Contacts(value)
                            $billingKey = isset($f['displayParams']['billingKey']) ? $f['displayParams']['billingKey'] : null;
                            $shippingKey = isset($f['displayParams']['shippingKey']) ? $f['displayParams']['shippingKey'] : null;
                            $additionalFields = isset($f['displayParams']['additionalFields']) ? $f['displayParams']['additionalFields'] : null;
                            $sqs_objects[$name.'_'.$parsedView] = $qsd->getQSAccount($nameKey, $idKey, $billingKey, $shippingKey, $additionalFields);
                        } else if($matches[0] == 'Contacts'){
                            $sqs_objects[$name.'_'.$parsedView] = $qsd->getQSContact($field['name'], $field['id_name']);
                        }
                    } else {
                         $sqs_objects[$name.'_'.$parsedView] = $qsd->getQSParent($field['module']);
                         if(!isset($field['field_list']) && !isset($field['populate_list'])) {
                             $sqs_objects[$name.'_'.$parsedView]['populate_list'] = array($field['name'], $field['id_name']);
                             $sqs_objects[$name.'_'.$parsedView]['field_list'] = array('name', 'id');
                         } else {
                             $sqs_objects[$name.'_'.$parsedView]['populate_list'] = $field['field_list'];
                             $sqs_objects[$name.'_'.$parsedView]['field_list'] = $field['populate_list'];
                         }
                    }
                } else if($field['type'] == 'parent') {
                    $sqs_objects[$name.'_'.$parsedView] = $qsd->getQSParent();
                } //if-else
            } //foreach

            foreach ( $sqs_objects as $name => $field )
               foreach ( $field['populate_list'] as $key => $fieldname )
                    $sqs_objects[$name]['populate_list'][$key] = $sqs_objects[$name]['populate_list'][$key] . '_'.$parsedView;
        }else{
            //Loop through the Meta-Data fields to see which ones need quick search support
            foreach($defs2 as $f) {
                if(!isset($defs[$f['name']])) continue;

                $field = $defs[$f['name']];
                if ($view == "ConvertLead")
                {
                    $field['name'] = $module . $field['name'];
					if (!empty($field['id_name']))
					   $field['id_name'] = $field['name'] . "_" . $field['id_name'];
                }
				$name = $qsd->form_name . '_' . $field['name'];



                if($field['type'] == 'relate' && isset($field['module']) && (preg_match('/_name$|_c$/si',$name) || !empty($field['quicksearch']))) {
                    if(!preg_match('/_c$/si',$name) && preg_match('/^(Campaigns|Teams|Users|Contacts|Accounts)$/si', $field['module'], $matches)) {

                        if($matches[0] == 'Campaigns') {
                            $sqs_objects[$name] = $qsd->getQSCampaigns();
                        } else if($matches[0] == 'Users'){
                            if($field['name'] == 'reports_to_name') {
                                $sqs_objects[$name] = $qsd->getQSUser('reports_to_name','reports_to_id');
                            }
                            // Bug 34643 - Default what the options should be for the assigned_user_name field
                            //             and then pass thru the fields to be used in the fielddefs.
                            elseif($field['name'] == 'assigned_user_name') {
                                $sqs_objects[$name] = $qsd->getQSUser('assigned_user_name','assigned_user_id');
                            }
                            else {
                                $sqs_objects[$name] = $qsd->getQSUser($field['name'], $field['id_name']);
                            }
                        } else if($matches[0] == 'Campaigns') {
                            $sqs_objects[$name] = $qsd->getQSCampaigns();
                        } else if($matches[0] == 'Accounts') {
                            $nameKey = $name;
                            $idKey = isset($field['id_name']) ? $field['id_name'] : 'account_id';

                            //There are billingKey, shippingKey and additionalFields entries you can define in editviewdefs.php
                            //entry to allow quick search to autocomplete fields with a suffix value of the
                            //billing/shippingKey value (i.e. 'billingKey' => 'primary' in Contacts will populate
                            //primary_XXX fields with the Account's billing address values).
                            //addtionalFields are key/value pair of fields to fill from Accounts(key) to Contacts(value)
                            $billingKey = SugarArray::staticGet($f, 'displayParams.billingKey');
                            $shippingKey = SugarArray::staticGet($f, 'displayParams.shippingKey');
                            $additionalFields = SugarArray::staticGet($f, 'displayParams.additionalFields');
                            $sqs_objects[$name] = $qsd->getQSAccount($nameKey, $idKey, $billingKey, $shippingKey, $additionalFields);
                        } else if($matches[0] == 'Contacts'){
                            $sqs_objects[$name] = $qsd->getQSContact($field['name'], $field['id_name']);
                            if(preg_match('/_c$/si',$name) || !empty($field['quicksearch'])){
                                $sqs_objects[$name]['field_list'] = array('salutation', 'first_name', 'last_name', 'id');
                            }
                        }
                    } else {
                        $sqs_objects[$name] = $qsd->getQSParent($field['module']);
                        if(!isset($field['field_list']) && !isset($field['populate_list'])) {
                            $sqs_objects[$name]['populate_list'] = array($field['name'], $field['id_name']);
                            // now handle quicksearches where the column to match is not 'name' but rather specified in 'rname'
                            if (!isset($field['rname']))
                                $sqs_objects[$name]['field_list'] = array('name', 'id');
                            else
                            {
                                $sqs_objects[$name]['field_list'] = array($field['rname'], 'id');
                                $sqs_objects[$name]['order'] = $field['rname'];
                                $sqs_objects[$name]['conditions'] = array(array('name'=>$field['rname'],'op'=>'like_custom','end'=>'%','value'=>''));
                            }
                        } else {
                            $sqs_objects[$name]['populate_list'] = $field['field_list'];
                            $sqs_objects[$name]['field_list'] = $field['populate_list'];
                        }
                    }
                } //if-else
            } //foreach
        }

       //Implement QuickSearch for the field
       if(!empty($sqs_objects) && count($sqs_objects) > 0) {
           $quicksearch_js = '<script language="javascript">';
           $quicksearch_js.= 'if(typeof sqs_objects == \'undefined\'){var sqs_objects = new Array;}';
           $json = getJSONobj();
           foreach($sqs_objects as $sqsfield=>$sqsfieldArray){
               $quicksearch_js .= "sqs_objects['$sqsfield']={$json->encode($sqsfieldArray)};";
           }
           return $quicksearch_js . '</script>';
       }
       return '';
    }

}
?>