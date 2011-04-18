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

 * Description: view handler for step 3 of the import process
 * Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
 * All Rights Reserved.
 ********************************************************************************/
require_once('include/MVC/View/SugarView.php');
require_once('modules/Import/ImportFile.php');
require_once('modules/Import/ImportFileSplitter.php');
require_once('modules/Import/ImportCacheFiles.php');
require_once('modules/Import/ImportDuplicateCheck.php');

require_once('include/upload_file.php');

class ImportViewStep3 extends SugarView
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
	    $returnArray[] = $mod_strings['LBL_STEP_3_TITLE'];
    	
	    return $returnArray;
    }

 	/**
     * @see SugarView::display()
     */
 	public function display()
    {
        global $mod_strings, $app_strings, $current_user, $sugar_config, $app_list_strings, $locale;
        
        $this->ss->assign("IMPORT_MODULE", $_REQUEST['import_module']);
        $has_header = ( isset( $_REQUEST['has_header']) ? 1 : 0 );
        $sugar_config['import_max_records_per_file'] =
            ( empty($sugar_config['import_max_records_per_file'])
                ? 1000 : $sugar_config['import_max_records_per_file'] );
        
        // Clear out this user's last import
        $seedUsersLastImport = new UsersLastImport();
        $seedUsersLastImport->mark_deleted_by_user_id($current_user->id);
        ImportCacheFiles::clearCacheFiles();

        // attempt to lookup a preexisting field map
        // use the custom one if specfied to do so in step 1
        $field_map = array();
        $default_values = array();
		$ignored_fields = array();
        if ( !empty( $_REQUEST['source_id'])) {
            $mapping_file = new ImportMap();
            $mapping_file->retrieve( $_REQUEST['source_id'],false);
            $_REQUEST['source'] = $mapping_file->source;
            $has_header = $mapping_file->has_header;
            if (isset($mapping_file->delimiter))
                $_REQUEST['custom_delimiter'] = $mapping_file->delimiter;
            if (isset($mapping_file->enclosure))
                $_REQUEST['custom_enclosure'] = htmlentities($mapping_file->enclosure);
            $field_map = $mapping_file->getMapping();
			$default_values = $mapping_file->getDefaultValues();
            $this->ss->assign("MAPNAME",$mapping_file->name);
            $this->ss->assign("CHECKMAP",'checked="checked" value="on"');
        }
        else {
            // Try to see if we have a custom mapping we can use
            // based upon the where the records are coming from
            // and what module we are importing into
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
                $mapping_file = new $classname;
                if (isset($mapping_file->delimiter)) 
                    $_REQUEST['custom_delimiter'] = $mapping_file->delimiter;
                if (isset($mapping_file->enclosure)) 
                    $_REQUEST['custom_enclosure'] = htmlentities($mapping_file->enclosure);
                $ignored_fields = $mapping_file->getIgnoredFields($_REQUEST['import_module']);
                $field_map = $mapping_file->getMapping($_REQUEST['import_module']);
            }
        }

        $this->ss->assign("CUSTOM_DELIMITER",
            ( !empty($_REQUEST['custom_delimiter']) ? $_REQUEST['custom_delimiter'] : "," ));
        $this->ss->assign("CUSTOM_ENCLOSURE",
            ( !empty($_REQUEST['custom_enclosure']) ? $_REQUEST['custom_enclosure'] : "" ));

        // handle uploaded file
        $uploadFile = new UploadFile('userfile');
        if (isset($_FILES['userfile']) && $uploadFile->confirm_upload())
        {
            $uploadFile->final_move('IMPORT_'.$this->bean->object_name.'_'.$current_user->id);
            $uploadFileName = $uploadFile->get_upload_path('IMPORT_'.$this->bean->object_name.'_'.$current_user->id);
        }
        else {
            $this->_showImportError($mod_strings['LBL_IMPORT_MODULE_ERROR_NO_UPLOAD'],$_REQUEST['import_module'],'Step2');
            return;
        }

        // split file into parts
        $splitter = new ImportFileSplitter(
                $uploadFileName,
                $sugar_config['import_max_records_per_file']);
        $splitter->splitSourceFile(
                $_REQUEST['custom_delimiter'],
                html_entity_decode($_REQUEST['custom_enclosure'],ENT_QUOTES),
                $has_header
            );

        // Now parse the file and look for errors
        $importFile = new ImportFile(
                $uploadFileName,
                $_REQUEST['custom_delimiter'],
                html_entity_decode($_REQUEST['custom_enclosure'],ENT_QUOTES)
            );

        if ( !$importFile->fileExists() ) {
            $this->_showImportError($mod_strings['LBL_CANNOT_OPEN'],$_REQUEST['import_module'],'Step2');
            return;
        }

        // retrieve first 3 rows
        $rows = array();
        $system_charset = $locale->default_export_charset;
        $user_charset = $locale->getExportCharset();
        $other_charsets = 'UTF-8, UTF-7, ASCII, CP1252, EUC-JP, SJIS, eucJP-win, SJIS-win, JIS, ISO-2022-JP';
        $detectable_charsets = "UTF-8, {$user_charset}, {$system_charset}, {$other_charsets}";
        // Bug 26824 - mb_detect_encoding() thinks CP1252 is IS0-8859-1, so use that instead in the encoding list passed to the function
        $detectable_charsets = str_replace('CP1252','ISO-8859-1',$detectable_charsets);
        $charset_for_import = $user_charset; //We will set the default import charset option by user's preference.
        $able_to_detect = function_exists('mb_detect_encoding');
        for ( $i = 0; $i < 3; $i++ ) {
            $rows[$i] = $importFile->getNextRow();
            if(!empty($rows[$i]) && $able_to_detect) {
                foreach($rows[$i] as & $temp_value) {
                    $current_charset = mb_detect_encoding($temp_value, $detectable_charsets);
                    if(!empty($current_charset) && $current_charset != "UTF-8") {
                        $temp_value = $locale->translateCharset($temp_value, $current_charset);// we will use utf-8 for displaying the data on the page.
                        $charset_for_import = $current_charset;
                        //set the default import charset option according to the current_charset.
                        //If it is not utf-8, tt may be overwritten by the later one. So the uploaded file should not contain two types of charset($user_charset, $system_charset), and I think this situation will not occur.
                    }
                }
            }
        }
        $ret_field_count = $importFile->getFieldCount();

        // Bug 14689 - Parse the first data row to make sure it has non-empty data in it
        $isempty = true;
        if ( $rows[(int)$has_header] != false ) {
            foreach ( $rows[(int)$has_header] as $value ) {
                if ( strlen(trim($value)) > 0 ) {
                    $isempty = false;
                    break;
                }
            }
        }

        if ($isempty || $rows[(int)$has_header] == false) {
            $this->_showImportError($mod_strings['LBL_NO_LINES'],$_REQUEST['import_module'],'Step2');
            return;
        }

        // save first row to send to step 4
        $this->ss->assign("FIRSTROW", base64_encode(serialize($rows[0])));

        // Now build template
        $this->ss->assign("TMP_FILE", $uploadFileName );
        $this->ss->assign("FILECOUNT", $splitter->getFileCount() );
        $this->ss->assign("RECORDCOUNT", $splitter->getRecordCount() );
        $this->ss->assign("RECORDTHRESHOLD", $sugar_config['import_max_records_per_file']);
        $this->ss->assign("SOURCE", $_REQUEST['source'] );
        $this->ss->assign("TYPE", $_REQUEST['type'] );
        $this->ss->assign("DELETE_INLINE_PNG",  SugarThemeRegistry::current()->getImage('basic_search','align="absmiddle" alt="'.$app_strings['LNK_DELETE'].'" border="0"'));
        $this->ss->assign("PUBLISH_INLINE_PNG",  SugarThemeRegistry::current()->getImage('advanced_search','align="absmiddle" alt="'.$mod_strings['LBL_PUBLISH'].'" border="0"'));
        $this->ss->assign("MODULE_TITLE", $this->getModuleTitle());
        $this->ss->assign("STEP4_TITLE",
            strip_tags(str_replace("\n","",getClassicModuleTitle(
                $mod_strings['LBL_MODULE_NAME'],
                array($mod_strings['LBL_MODULE_NAME'],$mod_strings['LBL_STEP_4_TITLE']),
                false
                )))
            );
        $this->ss->assign("HEADER", $app_strings['LBL_IMPORT']." ". $mod_strings['LBL_MODULE_NAME']);

        // we export it as email_address, but import as email1
        $field_map['email_address'] = 'email1';

        // build each row; row count is determined by the the number of fields in the import file
        $columns = array();
        $mappedFields = array();

        for($field_count = 0; $field_count < $ret_field_count; $field_count++) {
            // See if we have any field map matches
            $defaultValue = "";
            // Bug 31260 - If the data rows have more columns than the header row, then just add a new header column
            if ( !isset($rows[0][$field_count]) )
                $rows[0][$field_count] = '';
            // See if we can match the import row to a field in the list of fields to import
            $firstrow_name = trim(str_replace(":","",$rows[0][$field_count]));
            if ($has_header && isset( $field_map[$firstrow_name] ) ) {
                $defaultValue = $field_map[$firstrow_name];
            }
            elseif (isset($field_map[$field_count])) {
                $defaultValue = $field_map[$field_count];
            }
            elseif (empty( $_REQUEST['source_id'])) {
                $defaultValue = trim($rows[0][$field_count]);
            }

            // build string of options
            $fields  = $this->bean->get_importable_fields();
            $options = array();
            $defaultField = '';
            foreach ( $fields as $fieldname => $properties ) {
                // get field name
                if (!empty ($properties['vname']))
					$displayname = str_replace(":","",translate($properties['vname'] ,$this->bean->module_dir));
                else
					$displayname = str_replace(":","",translate($properties['name'] ,$this->bean->module_dir));
                // see if this is required
                $req_mark  = "";
                $req_class = "";
                if ( array_key_exists($fieldname, $this->bean->get_import_required_fields()) ) {
                    $req_mark  = ' ' . $app_strings['LBL_REQUIRED_SYMBOL'];
                    $req_class = ' class="required" ';
                }
                // see if we have a match
                $selected = '';
                if ( !empty($defaultValue) && !in_array($fieldname,$mappedFields)
						&& !in_array($fieldname,$ignored_fields) ) {
                    if ( strtolower($fieldname) == strtolower($defaultValue)
                        || strtolower($fieldname) == str_replace(" ","_",strtolower($defaultValue))
                        || strtolower($displayname) == strtolower($defaultValue)
                        || strtolower($displayname) == str_replace(" ","_",strtolower($defaultValue)) ) {
                        $selected = ' selected="selected" ';
                        $defaultField = $fieldname;
                        $mappedFields[] = $fieldname;
                    }
                }
                // get field type information
                $fieldtype = '';
                if ( isset($properties['type'])
                        && isset($mod_strings['LBL_IMPORT_FIELDDEF_' . strtoupper($properties['type'])]) )
                    $fieldtype = ' [' . $mod_strings['LBL_IMPORT_FIELDDEF_' . strtoupper($properties['type'])] . '] ';
                if ( isset($properties['comment']) )
                    $fieldtype .= ' - ' . $properties['comment'];
                $options[$displayname.$fieldname] = '<option value="'.$fieldname.'" title="'. $displayname . htmlentities($fieldtype) . '"'
                    . $selected . $req_class . '>' . $displayname . $req_mark . '</option>\n';
            }

            // get default field value
            $defaultFieldHTML = '';
            if ( !empty($defaultField) ) {
                $defaultFieldHTML = getControl(
                    $_REQUEST['import_module'],
                    $defaultField,
                    $fields[$defaultField],
                    ( isset($default_values[$defaultField]) ? $default_values[$defaultField] : '' )
                    );
            }

            if ( isset($default_values[$defaultField]) )
                unset($default_values[$defaultField]);

            // Bug 27046 - Sort the column name picker alphabetically
            ksort($options);

            $columns[] = array(
                'field_choices' => implode('',$options),
                'default_field' => $defaultFieldHTML,
                'cell1'         => str_replace("&quot;",'',htmlspecialchars($rows[0][$field_count])),
                'cell2'         => str_replace("&quot;",'',htmlspecialchars($rows[1][$field_count])),
                'cell3'         => str_replace("&quot;",'',htmlspecialchars($rows[2][$field_count])),
                'show_remove'   => false,
                );
        }

        // add in extra defaulted fields if they are in the mapping record
        if ( count($default_values) > 0 ) {
            foreach ( $default_values as $field_name => $default_value ) {
                // build string of options
                $fields  = $this->bean->get_importable_fields();
                $options = array();
                $defaultField = '';
                foreach ( $fields as $fieldname => $properties ) {
                    // get field name
                    if (!empty ($properties['vname']))
                        $displayname = str_replace(":","",translate($properties['vname'] ,$this->bean->module_dir));
                    else
                        $displayname = str_replace(":","",translate($properties['name'] ,$this->bean->module_dir));
                    // see if this is required
                    $req_mark  = "";
                    $req_class = "";
                    if ( array_key_exists($fieldname, $this->bean->get_import_required_fields()) ) {
                        $req_mark  = ' ' . $app_strings['LBL_REQUIRED_SYMBOL'];
                        $req_class = ' class="required" ';
                    }
                    // see if we have a match
                    $selected = '';
                    if ( strtolower($fieldname) == strtolower($field_name)
							&& !in_array($fieldname,$mappedFields)
							&& !in_array($fieldname,$ignored_fields) ) {
                        $selected = ' selected="selected" ';
                        $defaultField = $fieldname;
                        $mappedFields[] = $fieldname;
                    }
                    // get field type information
                    $fieldtype = '';
                    if ( isset($properties['type'])
                            && isset($mod_strings['LBL_IMPORT_FIELDDEF_' . strtoupper($properties['type'])]) )
                        $fieldtype = ' [' . $mod_strings['LBL_IMPORT_FIELDDEF_' . strtoupper($properties['type'])] . '] ';
                    if ( isset($properties['comment']) )
                        $fieldtype .= ' - ' . $properties['comment'];
                    $options[$displayname.$fieldname] = '<option value="'.$fieldname.'" title="'. $displayname . $fieldtype . '"' . $selected . $req_class . '>'
                        . $displayname . $req_mark . '</option>\n';
                }

                // get default field value
                $defaultFieldHTML = '';
                if ( !empty($defaultField) ) {
                    $defaultFieldHTML = getControl(
                        $_REQUEST['import_module'],
                        $defaultField,
                        $fields[$defaultField],
                        $default_value
                        );
                }

                // Bug 27046 - Sort the column name picker alphabetically
                ksort($options);

                $columns[] = array(
                    'field_choices' => implode('',$options),
                    'default_field' => $defaultFieldHTML,
                    'show_remove'   => true,
                    );

                $ret_field_count++;
            }
        }

        $this->ss->assign("COLUMNCOUNT",$ret_field_count);
        $this->ss->assign("rows",$columns);

        // get list of valid date/time formats
        $timeFormat = $current_user->getUserDateTimePreferences();
        $timeOptions = get_select_options_with_id($sugar_config['time_formats'], $timeFormat['time']);
        $dateOptions = get_select_options_with_id($sugar_config['date_formats'], $timeFormat['date']);
        $this->ss->assign('TIMEOPTIONS', $timeOptions);
        $this->ss->assign('DATEOPTIONS', $dateOptions);
        $this->ss->assign('datetimeformat', $GLOBALS['timedate']->get_cal_date_time_format());

        // get list of valid timezones
        $userTZ = $current_user->getPreference('timezone');
        if(empty($userTZ))
            $userTZ = TimeDate::userTimezone();

        $this->ss->assign('TIMEZONE_CURRENT', $userTZ);
        $this->ss->assign('TIMEZONEOPTIONS', TimeDate::getTimezoneList());

        // get currency preference
        require_once('modules/Currencies/ListCurrency.php');
        $currency = new ListCurrency();
        $cur_id = $locale->getPrecedentPreference('currency', $current_user);
        if($cur_id) {
            $selectCurrency = $currency->getSelectOptions($cur_id);
            $this->ss->assign("CURRENCY", $selectCurrency);
        } else {
            $selectCurrency = $currency->getSelectOptions();
            $this->ss->assign("CURRENCY", $selectCurrency);
        }

        $currenciesVars = "";
        $i=0;
        foreach($locale->currencies as $id => $arrVal) {
            $currenciesVars .= "currencies[{$i}] = '{$arrVal['symbol']}';\n";
            $i++;
        }
        $currencySymbolsJs = <<<eoq
var currencies = new Object;
{$currenciesVars}
function setSymbolValue(id) {
    document.getElementById('symbol').value = currencies[id];
}
eoq;
        $this->ss->assign('currencySymbolJs', $currencySymbolsJs);


        // fill significant digits dropdown
        $significantDigits = $locale->getPrecedentPreference('default_currency_significant_digits', $current_user);
        $sigDigits = '';
        for($i=0; $i<=6; $i++) {
            if($significantDigits == $i) {
               $sigDigits .= '<option value="'.$i.'" selected="true">'.$i.'</option>';
            } else {
               $sigDigits .= '<option value="'.$i.'">'.$i.'</option>';
            }
        }

        $this->ss->assign('sigDigits', $sigDigits);

        $num_grp_sep = $current_user->getPreference('num_grp_sep');
        $dec_sep = $current_user->getPreference('dec_sep');
        $this->ss->assign("NUM_GRP_SEP",
            ( empty($num_grp_sep)
                ? $sugar_config['default_number_grouping_seperator'] : $num_grp_sep ));
        $this->ss->assign("DEC_SEP",
            ( empty($dec_sep)
                ? $sugar_config['default_decimal_seperator'] : $dec_sep ));
        $this->ss->assign('getNumberJs', $locale->getNumberJs());

        // Name display format
        $this->ss->assign('default_locale_name_format', $locale->getLocaleFormatMacro($current_user));
        $this->ss->assign('getNameJs', $locale->getNameJs());

        // Charset
        $charsetOptions = get_select_options_with_id(
            $locale->getCharsetSelect(), $charset_for_import);//wdong,  bug 25927, here we should use the charset testing results from above.
        $this->ss->assign('CHARSETOPTIONS', $charsetOptions);

        // handle building index selector
        global $dictionary, $current_language;

        require_once("include/templates/TemplateGroupChooser.php");

        $chooser_array = array();
        $chooser_array[0] = array();
        $idc = new ImportDuplicateCheck($this->bean);
        $chooser_array[1] = $idc->getDuplicateCheckIndexes();

        $chooser = new TemplateGroupChooser();
        $chooser->args['id'] = 'selected_indices';
        $chooser->args['values_array'] = $chooser_array;
        $chooser->args['left_name'] = 'choose_index';
        $chooser->args['right_name'] = 'ignore_index';
        $chooser->args['left_label'] =  $mod_strings['LBL_INDEX_USED'];
        $chooser->args['right_label'] =  $mod_strings['LBL_INDEX_NOT_USED'];
        $this->ss->assign("TAB_CHOOSER", $chooser->display());

        // show notes
        if ( $this->bean instanceof Person )
            $module_key = "LBL_CONTACTS_NOTE_";
        elseif ( $this->bean instanceof Company )
            $module_key = "LBL_ACCOUNTS_NOTE_";
        else
            $module_key = "LBL_".strtoupper($_REQUEST['import_module'])."_NOTE_";
        $notetext = '';
        for ($i = 1;isset($mod_strings[$module_key.$i]);$i++) {
            $notetext .= '<li>' . $mod_strings[$module_key.$i] . '</li>';
        }
        $this->ss->assign("NOTETEXT",$notetext);
        $this->ss->assign("HAS_HEADER",($has_header ? 'on' : 'off' ));

        // get list of required fields
        $required = array();
        foreach ( array_keys($this->bean->get_import_required_fields()) as $name ) {
            $properties = $this->bean->getFieldDefinition($name);
            if (!empty ($properties['vname']))
                $required[$name] = str_replace(":","",translate($properties['vname'] ,$this->bean->module_dir));
            else
                $required[$name] = str_replace(":","",translate($properties['name'] ,$this->bean->module_dir));
        }
        // include anything needed for quicksearch to work
        require_once("include/TemplateHandler/TemplateHandler.php");
        $quicksearch_js = TemplateHandler::createQuickSearchCode($fields,$fields,'importstep3');
        $this->ss->assign("JAVASCRIPT", $quicksearch_js . "\n" . $this->_getJS($required));

        $this->ss->assign('required_fields',implode(', ',$required));
        $this->ss->display('modules/Import/tpls/step3.tpl');
    }

    /**
     * Displays the Smarty template for an error
     *
     * @param string $message error message to show
     * @param string $module what module we were importing into
     * @param string $action what page we should go back to
     */
    protected function _showImportError(
        $message, 
        $module,
        $action = 'Step1'
        )
    {
        $ss = new Sugar_Smarty();
        
        $ss->assign("MESSAGE",$message);
        $ss->assign("ACTION",$action);
        $ss->assign("IMPORT_MODULE",$module);
        $ss->assign("MOD", $GLOBALS['mod_strings']);
        $ss->assign("SOURCE","");
        if ( isset($_REQUEST['source']) )
            $ss->assign("SOURCE", $_REQUEST['source']);
        
        echo $ss->fetch('modules/Import/tpls/error.tpl');
    }
    
    /**
     * Returns JS used in this view
     *
     * @param  array $required fields that are required for the import
     * @return string HTML output with JS code
     */
    protected function _getJS($required)
    {
        global $mod_strings;

        $print_required_array = "";
        foreach ($required as $name=>$display) {
            $print_required_array .= "required['$name'] = '". $display . "';\n";
        }

        $sqsWaitImage = SugarThemeRegistry::current()->getImageURL('sqsWait.gif');

        return <<<EOJAVASCRIPT
<script type="text/javascript">
<!--
document.getElementById('goback').onclick = function(){
    document.getElementById('importstep3').action.value = 'Step2';
    document.getElementById('importstep3').to_pdf.value = '0';
    return true;
}

document.getElementById('importnow').onclick = function(){
    // get the list of indices chosen
    var chosen_indices = '';
    var selectedOptions = document.getElementById('choose_index_td').getElementsByTagName('select')[0].options.length;
    for (i = 0; i < selectedOptions; i++)
    {
        chosen_indices += document.getElementById('choose_index_td').getElementsByTagName('select')[0].options[i].value;
        if (i != (selectedOptions - 1))
            chosen_indices += "&";
    }
    document.getElementById('importstep3').display_tabs_def.value = chosen_indices;

    // validate form
    clear_all_errors();
    var form = document.getElementById('importstep3');
    var hash = new Object();
    var required = new Object();
    $print_required_array
    var isError = false;
    for ( i = 0; i < form.length; i++ ) {
		if ( form.elements[i].name.indexOf("colnum",0) == 0) {
            if ( form.elements[i].value == "-1") {
                continue;
            }
            if ( hash[ form.elements[i].value ] == 1) {
                isError = true;
                add_error_style('importstep3',form.elements[i].name,"{$mod_strings['ERR_MULTIPLE']}");
            }
            hash[form.elements[i].value] = 1;
        }
    }

    // check for required fields
	for(var field_name in required) {
		// contacts hack to bypass errors if full_name is set
		if (field_name == 'last_name' &&
				hash['full_name'] == 1) {
			continue;
		}
		if ( hash[ field_name ] != 1 ) {
            isError = true;
            add_error_style('importstep3',form.colnum_0.name,
                "{$mod_strings['ERR_MISSING_REQUIRED_FIELDS']} " + required[field_name]);
		}
	}

    // return false if we got errors
	if (isError == true) {
		return false;
	}

    // Move on to next step
    document.getElementById('importstep3').action.value = 'Step4';
    ProcessImport.begin();
}

// handle adding new row
document.getElementById('addrow').onclick = function(){
    rownum = document.getElementById('importstep3').columncount.value;
    newrow = document.createElement("tr");

    column0 = document.getElementById('row_0_col_0').cloneNode(true);
    column0.id = 'row_' + rownum + '_col_0';
    for ( i = 0; i < column0.childNodes.length; i++ ) {
        if ( column0.childNodes[i].name == 'colnum_0' ) {
            column0.childNodes[i].name = 'colnum_' + rownum;
            column0.childNodes[i].onchange = function(){
                var module    = document.getElementById('importstep3').import_module.value;
                var fieldname = this.value;
                var matches   = /colnum_([0-9]+)/i.exec(this.name);
                var fieldnum  = matches[1];
                if ( fieldname == -1 ) {
                    document.getElementById('defaultvaluepicker_'+fieldnum).innerHTML = '';
                    return;
                }
                document.getElementById('defaultvaluepicker_'+fieldnum).innerHTML = '<img src="{$sqsWaitImage}" />'
                YAHOO.util.Connect.asyncRequest('GET', 'index.php?module=Import&action=GetControl&import_module='+module+'&field_name='+fieldname,
                    {
                        success: function(o)
                        {
                        	document.getElementById('defaultvaluepicker_'+fieldnum).innerHTML = o.responseText;
                            SUGAR.util.evalScript(o.responseText);
                            enableQS(true);
                        },
                        failure: function(o) {/*failure handler code*/}
                    });
            }
        }
    }
    newrow.appendChild(column0);

    if ( document.getElementById('row_0_header') ) {
        column1 = document.getElementById('row_0_header').cloneNode(true);
        column1.innerHTML = '&nbsp;';
        newrow.appendChild(column1);
    }

    column2 = document.getElementById('defaultvaluepicker_0').cloneNode(true);
    column2.id = 'defaultvaluepicker_' + rownum;
    newrow.appendChild(column2);

    column3 = document.createElement('td');
    column3.className = 'tabDetailViewDL';
    if ( !document.getElementById('row_0_header') ) {
        column3.colSpan = 2;
    }
    column3.innerHTML = '<input title="{$mod_strings['LBL_REMOVE_ROW']}" accessKey="" id="deleterow_' + rownum + '" class="button" type="button" value="  {$mod_strings['LBL_REMOVE_ROW']}  ">';
    newrow.appendChild(column3);

    document.getElementById('importstep3').columncount.value = parseInt(document.getElementById('importstep3').columncount.value) + 1;

    document.getElementById('row_0_col_0').parentNode.parentNode.insertBefore(newrow,this.parentNode.parentNode);

    document.getElementById('deleterow_' + rownum).onclick = function(){
        this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
    }
}

YAHOO.util.Event.onDOMReady(function(){
    var selects = document.getElementsByTagName('select');
    for (var i = 0; i < selects.length; ++i ){
        if (selects[i].name.indexOf("colnum_") != -1 ) {
            // fetch the field input control via ajax
            selects[i].onchange = function(){
                var module    = document.getElementById('importstep3').import_module.value;
                var fieldname = this.value;
                var matches   = /colnum_([0-9]+)/i.exec(this.name);
                var fieldnum  = matches[1];
                if ( fieldname == -1 ) {
                    document.getElementById('defaultvaluepicker_'+fieldnum).innerHTML = '';
                    return;
                }

                document.getElementById('defaultvaluepicker_'+fieldnum).innerHTML = '<img src="{$sqsWaitImage}" />'
                YAHOO.util.Connect.asyncRequest('GET', 'index.php?module=Import&action=GetControl&import_module='+module+'&field_name='+fieldname,
                    {
                        success: function(o)
                        {
                            document.getElementById('defaultvaluepicker_'+fieldnum).innerHTML = o.responseText;
                            SUGAR.util.evalScript(o.responseText);
                            enableQS(true);
                        },
                        failure: function(o) {/*failure handler code*/}
                    });
            }
        }
    }
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; ++i ){
        if (inputs[i].id.indexOf("deleterow_") != -1 ) {
            inputs[i].onclick = function(){
                this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
            }
        }
    }
});

document.getElementById('toggleImportOptions').onclick = function() {
    if (document.getElementById('importOptions').style.display == 'none'){
        document.getElementById('importOptions').style.display = '';
        document.getElementById('toggleImportOptions').value='  {$mod_strings['LBL_HIDE_ADVANCED_OPTIONS']}  ';
        document.getElementById('toggleImportOptions').title='{$mod_strings['LBL_HIDE_ADVANCED_OPTIONS']}';
    }
    else {
        document.getElementById('importOptions').style.display = 'none';
        document.getElementById('toggleImportOptions').value='  {$mod_strings['LBL_SHOW_ADVANCED_OPTIONS']}  ';
        document.getElementById('toggleImportOptions').title='{$mod_strings['LBL_SHOW_ADVANCED_OPTIONS']}';
    }
}

-->
</script>

EOJAVASCRIPT;
    }
}
