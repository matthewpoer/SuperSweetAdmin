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

 * Description: view handler for step 4 of the import process
 * Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
 * All Rights Reserved.
 ********************************************************************************/
 
require_once('include/MVC/View/SugarView.php');
require_once('modules/Import/ImportFile.php');
require_once('modules/Import/ImportFileSplitter.php');
require_once('modules/Import/ImportCacheFiles.php');
require_once('modules/Import/ImportFieldSanitize.php');
require_once('modules/Import/ImportDuplicateCheck.php');

class ImportViewStep4 extends SugarView 
{	
    /** 
     * @see SugarView::display()
     */
 	public function display()
    {
        global $sugar_config;
        
        // Increase the max_execution_time since this step can take awhile
        ini_set("max_execution_time", max($sugar_config['import_max_execution_time'],3600));
        
        // stop the tracker
        TrackerManager::getInstance()->pause();
        
        // use our own error handler
        set_error_handler(array('ImportViewStep4','handleImportErrors'),E_ALL);
        
        global $mod_strings, $app_strings, $current_user, $import_bean_map;
        global $app_list_strings, $timedate;
        
        $update_only = ( isset($_REQUEST['import_type']) && $_REQUEST['import_type'] == 'update' );
        $firstrow    = unserialize(base64_decode($_REQUEST['firstrow']));
        
        // All the Look Up Caches are initialized here
        $enum_lookup_cache=array();
        
        // setup the importable fields array.
        $importable_fields = $this->bean->get_importable_fields();
        
        // loop through all request variables
        $importColumns = array();
        foreach ($_REQUEST as $name => $value) {
            // only look for var names that start with "fieldNum"
            if (strncasecmp($name, "colnum_", 7) != 0) {
                continue;
            }
            
            // pull out the column position for this field name
            $pos = substr($name, 7);
            
            if ( isset($importable_fields[$value]) ) {
                // now mark that we've seen this field
                $importColumns[$pos] = $value;
            }
        }
        
        
        // set the default locale settings
        $ifs = new ImportFieldSanitize();
        $ifs->dateformat = $_REQUEST['importlocale_dateformat'];
        $ifs->timeformat = $_REQUEST['importlocale_timeformat'];
        $ifs->timezone = $_REQUEST['importlocale_timezone'];
        $currency = new Currency();
        $currency->retrieve($_REQUEST['importlocale_currency']);
        $ifs->currency_symbol = $currency->symbol;
        $ifs->default_currency_significant_digits 
            = $_REQUEST['importlocale_default_currency_significant_digits'];
        $ifs->num_grp_sep 
            = $_REQUEST['importlocale_num_grp_sep'];
        $ifs->dec_sep = $_REQUEST['importlocale_dec_sep'];
        $ifs->default_locale_name_format 
            = $_REQUEST['importlocale_default_locale_name_format'];
        
        // Check to be sure we are getting an import file that is in the right place
        if ( realpath(dirname($_REQUEST['tmp_file']).'/') != realpath($sugar_config['upload_dir']) )
            trigger_error($mod_strings['LBL_CANNOT_OPEN'],E_USER_ERROR);
        
        // Open the import file
        $importFile = new ImportFile(
                        $_REQUEST['tmp_file'],
                        $_REQUEST['custom_delimiter'],
                        html_entity_decode($_REQUEST['custom_enclosure'],ENT_QUOTES)
                        );
        
        if ( !$importFile->fileExists() ) {
            trigger_error($mod_strings['LBL_CANNOT_OPEN'],E_USER_ERROR);
        }
        
        $fieldDefs = $this->bean->getFieldDefinitions();
        
        while ( $row = $importFile->getNextRow() ) {
            $focus = clone $this->bean;
            $focus->unPopulateDefaultValues();
            $focus->save_from_post = false;
            $focus->team_id = null;
            $ifs->createdBeans = array();
        
            $do_save = true;
            
            for ( $fieldNum = 0; $fieldNum < $_REQUEST['columncount']; $fieldNum++ ) {
                // loop if this column isn't set
                if ( !isset($importColumns[$fieldNum]) ) {
                    continue;
                }
                
                // get this field's properties
                $field           = $importColumns[$fieldNum];
                $fieldDef        = $focus->getFieldDefinition($field);
                $fieldTranslated = translate((isset($fieldDef['vname'])?$fieldDef['vname']:$fieldDef['name']),
                                        $_REQUEST['module'])." (".$fieldDef['name'].")";
                
                // Bug 37241 - Don't re-import over a field we already set during the importing of another field
                if ( !empty($focus->$field) ) {
                    continue;
                }
                
                //DETERMINE WHETHER OR NOT $fieldDef['name'] IS DATE_MODIFIED AND SET A VAR, USE DOWN BELOW
                
                // translate strings
                global $locale;
                if(empty($locale)) {
                    $locale = new Localization();
                }
                if ( isset($row[$fieldNum]) )
                    $rowValue = $locale->translateCharset(
                                    strip_tags(trim($row[$fieldNum])), 
                                    $_REQUEST['importlocale_charset'],
                                    $sugar_config['default_charset']
                                    );
                else
                    $rowValue = '';
                
                // If there is an default value then use it instead
                if ( !empty($_REQUEST[$field]) ) {
                    if ( is_array($_REQUEST[$field]) )
                        $defaultRowValue = encodeMultienumValue($_REQUEST[$field]);
                    else
                        $defaultRowValue = $_REQUEST[$field];
                    // translate default values to the date/time format for the import file               
                    if ( $fieldDef['type'] == 'date' 
                            && $ifs->dateformat != $timedate->get_date_format() )
                        $defaultRowValue = $timedate->swap_formats(
                            $defaultRowValue, $ifs->dateformat, $timedate->get_date_format());
                    if ( $fieldDef['type'] == 'time' 
                            && $ifs->timeformat != $timedate->get_time_format() )
                        $defaultRowValue = $timedate->swap_formats(
                            $defaultRowValue, $ifs->timeformat, $timedate->get_time_format());
                    if ( ($fieldDef['type'] == 'datetime' || $fieldDef['type'] == 'datetimecombo') 
                            && $ifs->dateformat.' '.$ifs->timeformat != $timedate->get_date_time_format() )
                        $defaultRowValue = $timedate->swap_formats(
                            $defaultRowValue, $ifs->dateformat.' '.$ifs->timeformat, 
                            $timedate->get_date_time_format());
                    if ( in_array($fieldDef['type'],array('currency','float','int','num'))
                            && $ifs->num_grp_sep != $current_user->getPreference('num_grp_sep') )
                        $defaultRowValue = str_replace($current_user->getPreference('num_grp_sep'),
                            $ifs->num_grp_sep,$defaultRowValue);
                    if ( in_array($fieldDef['type'],array('currency','float'))
                            && $ifs->dec_sep != $current_user->getPreference('dec_sep') )
                        $defaultRowValue = str_replace($current_user->getPreference('dec_sep'),
                            $ifs->dec_sep,$defaultRowValue);
                    $currency->retrieve('-99');
                    $user_currency_symbol = $currency->symbol;
                    if ( $fieldDef['type'] == 'currency' 
                            && $ifs->currency_symbol != $user_currency_symbol )
                        $defaultRowValue = str_replace($user_currency_symbol,
                            $ifs->currency_symbol,$defaultRowValue);
                            
                    
                    if ( empty($rowValue) ) {
                        $rowValue = $defaultRowValue;
                        unset($defaultRowValue);
                    }
                }
                
                // Bug 22705 - Don't update the First Name or Last Name value if Full Name is set
                if ( in_array($field, array('first_name','last_name')) && !empty($focus->full_name) )
                    continue;
                
                // loop if this value has not been set
                if ( !isset($rowValue) )
                    continue;
                
                // If the field is required and blank then error out
                if ( array_key_exists($field,$focus->get_import_required_fields())
                        && empty($rowValue) 
                        && $rowValue!='0') {
                    $importFile->writeError(
                        $mod_strings['LBL_REQUIRED_VALUE'],
                        $fieldTranslated,
                        'NULL'
                        );
                    $do_save = false;
                }
    
                // Handle the special case "Sync to Outlook"
                if ( $focus->object_name == "Contacts" && $field == 'sync_contact' ) {
                    $bad_names = array();
                    $returnValue = $ifs->synctooutlook(
                            $rowValue, 
                            $fieldDef, 
                            $bad_names);
                    // try the default value on fail
                    if ( !$returnValue && !empty($defaultRowValue) )
                        $returnValue = $ifs->synctooutlook(
                            $defaultRowValue, 
                            $fieldDef, 
                            $bad_names);
                    if ( !$returnValue ) {
                        $importFile->writeError(
                            $mod_strings['LBL_ERROR_SYNC_USERS'],
                            $fieldTranslated,
                            explode(",",$bad_names));
                        $do_save = 0;
                    }
                }
                
                // Handle email1 and email2 fields ( these don't have the type of email )
                if ( $field == 'email1' || $field == 'email2' ) {
                    $returnValue = $ifs->email($rowValue, $fieldDef, $focus);
                    // try the default value on fail
                    if ( !$returnValue && !empty($defaultRowValue) )
                        $returnValue = $ifs->email(
                            $defaultRowValue, 
                            $fieldDef);
                    if ( $returnValue === FALSE ) {
                        $do_save=0;
                        $importFile->writeError(
                            $mod_strings['LBL_ERROR_INVALID_EMAIL'],
                            $fieldTranslated,
                            $rowValue);
                    }
                    else {
                        $rowValue = $returnValue;
                        // check for current opt_out and invalid email settings for this email address
                        // if we find any, set them now
                        $emailres = $focus->db->query(
                            "SELECT opt_out, invalid_email FROM email_addresses 
                                WHERE email_address = '".$focus->db->quote($rowValue)."'");
                        if ( $emailrow = $focus->db->fetchByAssoc($emailres) ) {
                            $focus->email_opt_out = $emailrow['opt_out'];
                            $focus->invalid_email = $emailrow['invalid_email'];
                        }
                    }
                }
                
                // Handle splitting Full Name into First and Last Name parts
                if ( $field == 'full_name' && !empty($rowValue) ) {
                    $ifs->fullname(
                            $rowValue, 
                            $fieldDef,
                            $focus);
                }
                
                // to maintain 451 compatiblity
                if(!isset($fieldDef['module']) && $fieldDef['type']=='relate')
                    $fieldDef['module'] = ucfirst($fieldDef['table']);
    
                if(isset($fieldDef['custom_type']) && !empty($fieldDef['custom_type']))
                    $fieldDef['type'] = $fieldDef['custom_type'];
                
                // If the field is empty then there is no need to check the data
                if( !empty($rowValue) ) {  
                    switch ($fieldDef['type']) {
                    case 'enum':
                    case 'multienum':
                        if ( isset($fieldDef['type']) && $fieldDef['type'] == "multienum" ) 
                            $returnValue = $ifs->multienum($rowValue,$fieldDef);
                        else
                            $returnValue = $ifs->enum($rowValue,$fieldDef);
                        // try the default value on fail
                        if ( !$returnValue && !empty($defaultRowValue) )
                            if ( isset($fieldDef['type']) && $fieldDef['type'] == "multienum" ) 
                                $returnValue = $ifs->multienum($defaultRowValue,$fieldDef);
                            else
                                $returnValue = $ifs->enum($defaultRowValue,$fieldDef);
                        if ( $returnValue === FALSE ) {
                            $importFile->writeError(
                                $mod_strings['LBL_ERROR_NOT_IN_ENUM']
                                    . implode(",",$app_list_strings[$fieldDef['options']]),
                                $fieldTranslated,
                                $rowValue);
                            $do_save = 0;
                        }
                        else
                            $rowValue = $returnValue;
                        
                        break;
                    case 'relate':
                    case 'parent':
                        $returnValue = $ifs->relate(
                            $rowValue, 
                            $fieldDef, 
                            $focus,
                            empty($defaultRowValue));
                        if ( !$returnValue && !empty($defaultRowValue) )
                            $returnValue = $ifs->relate(
                                $defaultRowValue, 
                                $fieldDef, 
                                $focus);
                        // Bug 33623 - Set the id value found from the above method call as an importColumn
                        if ( $returnValue !== false )
                            $importColumns[] = $fieldDef['id_name'];
                        break;
                    case 'teamset':
                        $returnValue = $ifs->teamset(
                            $rowValue, 
                            $fieldDef, 
                            $focus);
                            $importColumns[] = 'team_set_id';
                            $importColumns[] = 'team_id';
                        break;
                    case 'fullname':
                        break;
                    default:
                        $fieldtype = $fieldDef['type'];
                        $returnValue = $ifs->$fieldtype($rowValue, $fieldDef, $focus);
                        // try the default value on fail
                        if ( !$returnValue && !empty($defaultRowValue) )
                            $returnValue = $ifs->$fieldtype(
                                $defaultRowValue, 
                                $fieldDef, 
                                $focus);
                        if ( !$returnValue ) {
                            $do_save=0;
                            $importFile->writeError(
                                $mod_strings['LBL_ERROR_INVALID_'.strtoupper($fieldDef['type'])],
                                $fieldTranslated,
                                $rowValue, 
                                $focus);
                        }
                        else {
                            $rowValue = $returnValue;
                        }
                    }
                }
                $focus->$field = $rowValue;
                unset($defaultRowValue);
            }
            
            // Now try to validate flex relate fields
            if ( isset($focus->field_defs['parent_name']) 
                    && isset($focus->parent_name)
                    && ($focus->field_defs['parent_name']['type'] == 'parent') ) {
                // populate values from the picker widget if the import file doesn't have them
                $parent_idField = $focus->field_defs['parent_name']['id_name'];
                if ( empty($focus->$parent_idField) && !empty($_REQUEST[$parent_idField]) )
                    $focus->$parent_idField = $_REQUEST[$parent_idField];
                $parent_typeField = $focus->field_defs['parent_name']['type_name'];
                if ( empty($focus->$parent_typeField) && !empty($_REQUEST[$parent_typeField]) )
                    $focus->$parent_typeField = $_REQUEST[$parent_typeField];
                // now validate it
                $returnValue = $ifs->parent(
                    $focus->parent_name, 
                    $focus->field_defs['parent_name'], 
                    $focus,
                    empty($_REQUEST['parent_name']));
                if ( !$returnValue && !empty($_REQUEST['parent_name']) )
                    $returnValue = $ifs->parent(
                        $_REQUEST['parent_name'], 
                        $focus->field_defs['parent_name'], 
                        $focus);
            }
            
            // check to see that the indexes being entered are unique.
            if (isset($_REQUEST['display_tabs_def']) && $_REQUEST['display_tabs_def'] != ""){
                $idc = new ImportDuplicateCheck($focus);
                if ( $idc->isADuplicateRecord(explode('&', $_REQUEST['display_tabs_def'])) ){
                    $importFile->markRowAsDuplicate();
                    $this->_undoCreatedBeans($ifs->createdBeans);
                    continue;
                }
            }
        
            // if the id was specified
            $newRecord = true;
            if ( !empty($focus->id) ) {
                $focus->id = $this->_convertId($focus->id);
        
                // check if it already exists
                $query = "SELECT * FROM {$focus->table_name} WHERE id='".$focus->db->quote($focus->id)."'";
                $result = $focus->db->query($query) 
                            or sugar_die("Error selecting sugarbean: ");
        
                $dbrow = $focus->db->fetchByAssoc($result);
        
                if (isset ($dbrow['id']) && $dbrow['id'] != -1) {
                    // if it exists but was deleted, just remove it
                    if (isset ($dbrow['deleted']) && $dbrow['deleted'] == 1 && $update_only==false) {
                        $query2 = "DELETE FROM {$focus->table_name} WHERE id='".$focus->db->quote($focus->id)."'";
                        $result2 = $focus->db->query($query2) or sugar_die($mod_strings['LBL_ERROR_DELETING_RECORD']." ".$focus->id);
                        if ($focus->hasCustomFields()) {
                            $query3 = "DELETE FROM {$focus->table_name}_cstm WHERE id_c='".$focus->db->quote($focus->id)."'";
                            $result2 = $focus->db->query($query3);
                        }
                        $focus->new_with_id = true;
                    } 
                    else {
                        if( !$update_only ) {
                            $do_save = 0;
                            $importFile->writeError($mod_strings['LBL_ID_EXISTS_ALREADY'],'ID',$focus->id);
                            $this->_undoCreatedBeans($ifs->createdBeans);
                            continue;
                        }
                        $existing_focus = clone $this->bean;
                        $newRecord = false;
                        if ( !( $existing_focus->retrieve($dbrow['id']) instanceOf SugarBean ) ) {
                            $do_save = 0;
                            $importFile->writeError($mod_strings['LBL_RECORD_CANNOT_BE_UPDATED'],'ID',$focus->id);
                            $this->_undoCreatedBeans($ifs->createdBeans);
                            continue;
                        }
                        else {
                            $newData = $focus->toArray();
                            foreach ( $newData as $focus_key => $focus_value )
                                if ( in_array($focus_key,$importColumns) )
                                    $existing_focus->$focus_key = $focus_value;
                                                   
                            $focus = $existing_focus;
                        }
                        unset($existing_focus);
                    }
                }
                else {
                    $focus->new_with_id = true;
                }
            }
        
            if ($do_save) {
                // Populate in any default values to the bean
                $focus->populateDefaultValues();
                
                if ( !isset($focus->assigned_user_id) || $focus->assigned_user_id == '' && $newRecord ) {
                    $focus->assigned_user_id = $current_user->id;
                }
                /*
                 * Bug 34854: Added all conditions besides the empty check on date modified. Currently, if
                 * we do an update to a record, it doesn't update the date_modified value.
                 * Hack note: I'm doing a to_display and back to_db on the fetched row to make sure that any truncating that happens
                 * when $focus->date_modified goes to_display and back to_db also happens on the fetched db value. Otherwise,
                 * in some cases we truncate the seconds on one and not the other, and the comparison fails when it should pass
                 */
                if ( ( !empty($focus->new_with_id) && !empty($focus->date_modified) ) ||
                     ( empty($focus->new_with_id) && $timedate->to_db($focus->date_modified) != $timedate->to_db($timedate->to_display_date_time($focus->fetched_row['date_modified'])) )
                   )
                    $focus->update_date_modified = false;

                $focus->optimistic_lock = false;
                if ( $focus->object_name == "Contacts" && isset($focus->sync_contact) ) {
                    //copy the potential sync list to another varible
                    $list_of_users=$focus->sync_contact;
                    //and set it to false for the save
                    $focus->sync_contact=false;
                } else if($focus->object_name == "User" && !empty($current_user) && $focus->is_admin && !is_admin($current_user) && is_admin_for_module($current_user, 'Users')) {
                	sugar_die($GLOBALS['mod_strings']['ERR_IMPORT_SYSTEM_ADMININSTRATOR']);
                }
                //bug# 40260 setting it true as the module in focus is involved in an import
                $focus->in_import=true;
                // call any logic needed for the module preSave
                $focus->beforeImportSave();
                
                
                $focus->save(false);
                
                // call any logic needed for the module postSave
                $focus->afterImportSave();
                
                if ( $focus->object_name == "Contacts" && isset($list_of_users) ) 
                    $focus->process_sync_to_outlook($list_of_users);
                
                // Update the created/updated counter
                $importFile->markRowAsImported($newRecord);
                
                // Add ID to User's Last Import records
                if ( $newRecord )
                    ImportFile::writeRowToLastImport(
                        $_REQUEST['import_module'],
                        ($focus->object_name == 'Case' ? 'aCase' : $focus->object_name),
                        $focus->id);
            }
            else
                $this->_undoCreatedBeans($ifs->createdBeans);
                
            unset($defaultRowValue);
        }
        
        // save mapping if requested
        if ( isset($_REQUEST['save_map_as']) && $_REQUEST['save_map_as'] != '' ) {
            $mapping_file = new ImportMap();
            if ( isset($_REQUEST['has_header']) && $_REQUEST['has_header'] == 'on') {
                $header_to_field = array ();
                foreach ($importColumns as $pos => $field_name) {
                    if (isset($firstrow[$pos]) && isset($field_name)) {
                        $header_to_field[$firstrow[$pos]] = $field_name;
                    }
                }
                $mapping_file->setMapping($header_to_field);
            } 
            else {
                $mapping_file->setMapping($importColumns);
            }
            
            // save default fields
            $defaultValues = array();
            for ( $i = 0; $i < $_REQUEST['columncount']; $i++ )
                
            if (isset($importColumns[$i]) && !empty($_REQUEST[$importColumns[$i]])) {
            	$field = $importColumns[$i];
                $fieldDef = $focus->getFieldDefinition($field);
 				if(!empty($fieldDef['custom_type']) && $fieldDef['custom_type'] == 'teamset') {
                  require_once('include/SugarFields/Fields/Teamset/SugarFieldTeamset.php');
				  $sugar_field = new SugarFieldTeamset('Teamset');
				  $teams = $sugar_field->getTeamsFromRequest($field);
				  if(isset($_REQUEST['primary_team_name_collection'])) {
				  	 $primary_index = $_REQUEST['primary_team_name_collection'];
				  }	
				  
				  //If primary_index was selected, ensure that the first Array entry is the primary team
				  if(isset($primary_index)) {
					  $count = 0;
					  $new_teams = array();	
					  foreach($teams as $id=>$name) {
					  	 if($primary_index == $count++) {
					  	 	$new_teams[$id] = $name;
					  	 	unset($teams[$id]);				  	 	
					  	 	break;
					  	 }
					  }
					  
				  	  foreach($teams as $id=>$name) {
				  		 $new_teams[$id] = $name;
				  	  }
				  	  $teams = $new_teams;						  
				  } //if
				  
				  $json = getJSONobj();
				  $defaultValues[$field] = $json->encode($teams);
 				} else {
               	  $defaultValues[$field] = $_REQUEST[$importColumns[$i]];
 				}
            }
                    
            $mapping_file->setDefaultValues($defaultValues);      
            $result = $mapping_file->save(
                $current_user->id, 
                $_REQUEST['save_map_as'], 
                $_REQUEST['import_module'], 
                $_REQUEST['source'],
                ( isset($_REQUEST['has_header']) && $_REQUEST['has_header'] == 'on'),
                $_REQUEST['custom_delimiter'],
                html_entity_decode($_REQUEST['custom_enclosure'],ENT_QUOTES)
                );
        }
        
        $importFile->writeStatus();
    }
    
    /**
     * If a bean save is not done for some reason, this method will undo any of the beans that were created
     *
     * @param array $ids ids of user_last_import records created
     */
    protected function _undoCreatedBeans(
        array $ids
        )
    {
        $focus = new UsersLastImport();
        foreach ($ids as $id)
            $focus->undoById($id);
    }
    
    /**
     * clean id's when being imported
     *
     * @param  string $string
     * @return string
     */
    protected function _convertId(
        $string
        )
    {
        return preg_replace_callback( 
            '|[^A-Za-z0-9\-]|',
            create_function(
            // single quotes are essential here,
            // or alternative escape all $ as \$
            '$matches',
            'return ord($matches[0]);'
                 ) ,
            $string);
    }
    
    /**
     * Replaces PHP error handler in Step4
     *
     * @param int    $errno
     * @param string $errstr
     * @param string $errfile
     * @param string $errline
     */
    public static function handleImportErrors(
        $errno, 
        $errstr, 
        $errfile, 
        $errline
        )
    {
        if ( !defined('E_DEPRECATED') )
            define('E_DEPRECATED','8192');
        if ( !defined('E_USER_DEPRECATED') )
            define('E_USER_DEPRECATED','16384');
        
        // check to see if current reporting level should be included based upon error_reporting() setting, if not
        // then just return
        if ( !(error_reporting() & $errno) )
            return true;
    
        switch ($errno) {
        case E_USER_ERROR:
            echo "ERROR: [$errno] $errstr on line $errline in file $errfile<br />\n";
            exit(1);
            break;
        case E_USER_WARNING:
        case E_WARNING:
            echo "WARNING: [$errno] $errstr on line $errline in file $errfile<br />\n";
            break;
        case E_USER_NOTICE:
        case E_NOTICE:
            echo "NOTICE: [$errno] $errstr on line $errline in file $errfile<br />\n";
            break;
        case E_STRICT: 
        case E_DEPRECATED:
        case E_USER_DEPRECATED:   
            // don't worry about these
            //echo "STRICT ERROR: [$errno] $errstr on line $errline in file $errfile<br />\n";
            break;
        default:
            echo "Unknown error type: [$errno] $errstr on line $errline in file $errfile<br />\n";
            break;
        }
    
        return true;
    }
}
