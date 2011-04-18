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

 * Description: Handles getting a list of fields to duplicate check and doing the duplicate checks
 * Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
 * All Rights Reserved.
 ********************************************************************************/

class ImportDuplicateCheck
{
    /**
     * Private reference to the bean we're dealing with
     */
    private $_focus;
    
    /** 
     * Constructor
     *
     * @param object $focus bean 
     */
    public function __construct(
        &$focus
        )
    {
        $this->_focus = &$focus;
    }
    
    /**
     * Returns an array of indices for the current module
     *
     * @return array
     */
    private function _getIndexVardefs()
    {
        $indexes = $this->_focus->getIndices();
        
        if ( $this->_focus->getFieldDefinition('email1') )
            $indexes[] = array(
                'name' => 'special_idx_email1',
                'type' => 'index',
                'fields' => array('email1')
                );
        if ( $this->_focus->getFieldDefinition('email2') )
            $indexes[] = array(
                'name' => 'special_idx_email2',
                'type' => 'index',
                'fields' => array('email2')
                );
        
        return $indexes;
    }
    
    /**
     * Returns an array with an element for each index
     *
     * @return array
     */
    public function getDuplicateCheckIndexes()
    {
        $super_language_pack = sugarArrayMerge(
            return_module_language($GLOBALS['current_language'], $this->_focus->module_dir), 
            $GLOBALS['app_strings']
            );
        
        $index_array = array();
        foreach ($this->_getIndexVardefs() as $index){
            if ($index['type'] == "index"){
                $labelsArray = array();
                foreach ($index['fields'] as $field){
                    if ($field == 'deleted') continue;
                    $fieldDef = $this->_focus->getFieldDefinition($field);
                    if ( isset($fieldDef['vname']) && isset($super_language_pack[$fieldDef['vname']]) )
                        $labelsArray[$fieldDef['name']] = $super_language_pack[$fieldDef['vname']];
                    else
                        $labelsArray[$fieldDef['name']] = $fieldDef['name'];
                }
                $index_array[$index['name']] = str_replace(":", "",implode(", ",$labelsArray));
            }
        }
        
        return $index_array;
    }
    
    /**
     * Checks to see if the given bean is a duplicate based off the given indexes
     *
     * @param  array $indexlist
     * @return bool true if this bean is a duplicate or false if it isn't
     */
    public function isADuplicateRecord(
        $indexlist
        )
    {
        // loop through var def indexes and compare with selected indexes
        foreach ( $this->_getIndexVardefs() as $index ) {
            // if we get an index not in the indexlist, loop
            if ( !in_array($index['name'],$indexlist) )
                continue;
            
            // This handles the special case of duplicate email checking
            if ( $index['name'] == 'special_idx_email1' || $index['name'] == 'special_idx_email2' ) {
                $emailAddress = new SugarEmailAddress();
                $email = $index['fields'][0];
                if ( $emailAddress->getCountEmailAddressByBean(
                        $this->_focus->$email,
                        $this->_focus,
                        ($index['name'] == 'special_idx_email1')
                        ) > 0 )
                    return true;
            }
            // Adds a hook so you can define a method in the bean to handle dupe checking
            elseif ( isset($index['dupeCheckFunction']) ) {
                $functionName = substr_replace($index['dupeCheckFunction'],'',0,9);
                if ( method_exists($this->_focus,$functionName) )
                    return $this->_focus->$functionName($index);
            }
            else {
                $index_fields = array('deleted' => '0');
                foreach($index['fields'] as $field){
                    if ($field == 'deleted') 
                        continue;
                    if (!in_array($field,$index_fields))
                        if (strlen($this->_focus->$field) > 0)
                            $index_fields[$field] = $this->_focus->$field;
                }
                
                // if there are no valid fields in the index field list, loop
                if ( count($index_fields) <= 1 )
                    continue;
                
                $newfocus = loadBean($this->_focus->module_dir);
                $result = $newfocus->retrieve_by_string_fields($index_fields,true);
                
                if ( !is_null($result) )
                    return true;
            }
        }
        return false;
    }
}
 
?>
