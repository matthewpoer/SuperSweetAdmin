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




require_once('include/generic/SugarWidgets/SugarWidgetFieldvarchar.php');

class SugarWidgetFieldName extends SugarWidgetFieldVarchar
{
    
    function SugarWidgetFieldName(&$layout_manager) {
        parent::SugarWidgetFieldVarchar($layout_manager);
        $this->reporter = $this->layout_manager->getAttribute('reporter');  
    }
    
	function displayList(&$layout_def)
	{
		if(empty($layout_def['column_key']))
		{
			return $this->displayListPlain($layout_def);
		}
		
		$module = $this->reporter->all_fields[$layout_def['column_key']]['module'];
		$name = $layout_def['name'];
		$layout_def['name'] = 'id';
		$key = $this->_get_column_alias($layout_def);
		$key = strtoupper($key);
		
		if(empty($layout_def['fields'][$key]))
		{
		  $layout_def['name'] = $name;
			return $this->displayListPlain($layout_def);	
		}
		
		$record = $layout_def['fields'][$key];
		$layout_def['name'] = $name;
		global $current_user;
		if ($module == 'Users' && !is_admin($current_user))
        	$module = 'Employees';
		$str = "<a target='_blank' href=\"index.php?action=DetailView&module=$module&record=$record\">";
		$str .= $this->displayListPlain($layout_def);
		$str .= "</a>";	
		return $str;
	}

	function _get_normal_column_select($layout_def)
	{
		global $sugar_config;
		// if $this->db->dbytpe is empty, then grab dbtype value from global array "$sugar_config[dbconfig]"
		if(empty($this->db->dbType)){
			$this->db->dbType = $sugar_config['dbconfig']['db_type'];
		}
        if ( isset($this->reporter->all_fields) ) {
            $field_def = $this->reporter->all_fields[$layout_def['column_key']];
        } else {
            $field_def = array();
        }
		
		if (empty($field_def['fields']) || empty($field_def['fields'][0]) || empty($field_def['fields'][1]))
		{
			return parent::_get_column_select($layout_def);
		}
		
		//	 'fields' are the two fields to concat to create the name
		$alias = '';
		$endalias = '';
		if ( ! empty($layout_def['table_alias']))
		{
			if ($this->db->dbType == 'mysql')
			{
				$alias .= "CONCAT(CONCAT(IFNULL("
					.$layout_def['table_alias']."."
					.$field_def['fields'][0].",''),' '),"
					.$layout_def['table_alias']."."
					.$field_def['fields'][1].")";
			}
			elseif ( $this->db->dbType == 'mssql' )
			{
				$alias .= $layout_def['table_alias'] . '.' . $field_def['fields'][0] . " + ' ' + "
				. $layout_def['table_alias'] . '.' . $field_def['fields'][1]."";
			}
		}
		elseif (! empty($layout_def['name']))
		{
			$alias = $layout_def['name'];
		}
		else
		{
			$alias .= "*";
		}
		
		$alias .= $endalias;
		return $alias;
	}

	function _get_column_select($layout_def)
	{
		global $sugar_config;
		global $locale, $current_user;
			
		// if $this->db->dbytpe is empty, then grab dbtype value from global array "$sugar_config[dbconfig]"
		if(empty($this->db->dbType)){
			$this->db->dbType = $sugar_config['dbconfig']['db_type'];
		}
        if ( isset($this->reporter->all_fields) ) {
            $field_def = $this->reporter->all_fields[$layout_def['column_key']];
        } else {
            $field_def = array();
        }
		
        //	 'fields' are the two fields to concat to create the name
		$alias = '';
		$endalias = '';
        if(!isset($field_def['fields']))
        {
			$alias = $this->_get_normal_column_select($layout_def);
			return $alias;
        }
		$localeNameFormat = $locale->getLocaleFormatMacro($current_user);
		$localeNameFormat = trim(preg_replace('/s/i', '', $localeNameFormat));

		$names = array();
		$names['f'] = db_convert($layout_def['table_alias'].'.'.$field_def['fields'][0].",''","IFNULL");
		$names['l'] = $layout_def['table_alias'].'.'.$field_def['fields'][1];
		
		if (empty($field_def['fields']) || empty($field_def['fields'][0]) || empty($field_def['fields'][1]))
		{
			return parent::_get_column_select($layout_def);
		}		
		
		if ( ! empty($layout_def['table_alias']))
		{
			if ($this->db->dbType == 'mysql')
			{		
				for($i=0; $i<strlen($localeNameFormat); $i++) {
					$alias .=  array_key_exists($localeNameFormat{$i}, $names) ? $names[$localeNameFormat{$i}] : '\''.$localeNameFormat{$i}.'\'';
					if($i<strlen($localeNameFormat)-1) $alias .= ',';
				}
				if(strlen($localeNameFormat)>1)
				$alias = 'concat('.$alias.')';

			}
			elseif ( $this->db->dbType == 'mssql' )
			{
				for($i=0; $i<strlen($localeNameFormat); $i++) {
					$alias .=  array_key_exists($localeNameFormat{$i}, $names) ? $names[$localeNameFormat{$i}] : '\''.$localeNameFormat{$i}.'\'';
					if($i<strlen($localeNameFormat)-1) $alias .= ' + ';
				}
			}
		}
		elseif (! empty($layout_def['name']))
		{
			$alias = $layout_def['name'];
		}
		else
		{
			$alias .= "*";
		}
		
		$alias .= $endalias;
		return $alias;
	}

	function queryFilterIs($layout_def)
	{
		require_once('include/generic/SugarWidgets/SugarWidgetFieldid.php');
		$layout_def['name'] = 'id';
		$layout_def['type'] = 'id';
		$input_name0 = $layout_def['input_name0'];
		
		if ( is_array($layout_def['input_name0']))
		{
			$input_name0 = $layout_def['input_name0'][0];
		}
		if ($input_name0 == 'Current User') {
			global $current_user;
			$input_name0 = $current_user->id;
		}

		return SugarWidgetFieldid::_get_column_select($layout_def)."='"
			.$GLOBALS['db']->quote($input_name0)."'\n";
	}

	function queryFilteris_not($layout_def)
	{
		require_once('include/generic/SugarWidgets/SugarWidgetFieldid.php');
		$layout_def['name'] = 'id';
		$layout_def['type'] = 'id';
		$input_name0 = $layout_def['input_name0'];
		
		if ( is_array($layout_def['input_name0']))
		{
			$input_name0 = $layout_def['input_name0'][0];
		}
		if ($input_name0 == 'Current User') {
			global $current_user;
			$input_name0 = $current_user->id;
		}

		return SugarWidgetFieldid::_get_column_select($layout_def)."<>'"
			.$GLOBALS['db']->quote($input_name0)."'\n";
	}
    // $rename_columns, if true then you're coming from reports
	function queryFilterone_of(&$layout_def, $rename_columns = true)
	{
		require_once('include/generic/SugarWidgets/SugarWidgetFieldid.php');
        if($rename_columns) { // this was a hack to get reports working, sugarwidgets should not be renaming $name! 
    		$layout_def['name'] = 'id';
    		$layout_def['type'] = 'id';
        }
		$arr = array();
		
		foreach($layout_def['input_name0'] as $value)
		{
			if ($value == 'Current User') {
				global $current_user;
				array_push($arr,"'".$GLOBALS['db']->quote($current_user->id)."'");
			}
			else
				array_push($arr,"'".$GLOBALS['db']->quote($value)."'");
		}
		
		$str = implode(",",$arr);
        
		return SugarWidgetFieldid::_get_column_select($layout_def)." IN (".$str.")\n";
	}
    // $rename_columns, if true then you're coming from reports
	function queryFilternot_one_of(&$layout_def, $rename_columns = true)
	{
		require_once('include/generic/SugarWidgets/SugarWidgetFieldid.php');
        if($rename_columns) { // this was a hack to get reports working, sugarwidgets should not be renaming $name!
    		$layout_def['name'] = 'id';
    		$layout_def['type'] = 'id';
        }
		$arr = array();

		foreach($layout_def['input_name0'] as $value)
		{
			if ($value == 'Current User') {
				global $current_user;
				array_push($arr,"'".$GLOBALS['db']->quote($current_user->id)."'");
			}
			else
				array_push($arr,"'".$GLOBALS['db']->quote($value)."'");
		}

		$str = implode(",",$arr);

		return SugarWidgetFieldid::_get_column_select($layout_def)." NOT IN (".$str.")\n";
	}
	function &queryGroupBy($layout_def)
	{
        if( $this->reporter->db->dbType == 'mysql') {
         if($layout_def['name'] == 'full_name') {
             $layout_def['name'] = 'id';
             $layout_def['type'] = 'id';
             require_once('include/generic/SugarWidgets/SugarWidgetFieldid.php');
             $group_by =  SugarWidgetFieldid::_get_column_select($layout_def)."\n";
         }
         else {
            // group by clause for user name passes through here. 
//    		 $layout_def['name'] = 'name';
//    		 $layout_def['type'] = 'name';
             $group_by = $this->_get_column_select($layout_def)."\n";
         }
        }
		elseif( $this->reporter->db->dbType == 'mssql') {
			$group_by = $this->_get_column_select($layout_def);
		}
        
        return $group_by;
	}
}

?>
