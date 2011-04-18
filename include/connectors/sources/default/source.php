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


/**
 * source is the parent class of any source object.
 *
 */
abstract class source{
	/**
	 * The name of an wrapper to use if the class wants to provide an override
	 */
	public $wrapperName;
	protected $_config;
	protected $_mapping;
	protected $_field_defs;
	protected $_enable_in_wizard = true;
	protected $_enable_in_hover = false;
	protected $_has_testing_enabled = false;
	protected $_required_config_fields = array();
	protected $_required_config_fields_for_button = array();	
	
	public function __construct(){
		$this->loadConfig();
		$this->loadMapping();
		$this->loadVardefs();
 	}
 	
 	public function init(){}
 	
 	//////// CALLED FROM component.php ///////
	public function loadMapping() {
 		$mapping = array();
 		$dir = str_replace('_','/',get_class($this));
		if(file_exists("custom/modules/Connectors/connectors/sources/{$dir}/mapping.php")) {
			require("custom/modules/Connectors/connectors/sources/{$dir}/mapping.php");
		} else if(file_exists("modules/Connectors/connectors/sources/{$dir}/mapping.php")){
			require("modules/Connectors/connectors/sources/{$dir}/mapping.php");
		}
	    $this->_mapping = $mapping;	
 	} 	
 	
 	public function loadVardefs() {
		$class = get_class($this);
		$dir = str_replace('_','/',$class);
		if(file_exists("custom/modules/Connectors/connectors/sources/{$dir}/vardefs.php")) {
			require("custom/modules/Connectors/connectors/sources/{$dir}/vardefs.php");
		} else if(file_exists("modules/Connectors/connectors/sources/{$dir}/vardefs.php")){
			require("modules/Connectors/connectors/sources/{$dir}/vardefs.php");
		}
		
		$this->_field_defs = !empty($dictionary[$class]['fields']) ? $dictionary[$class]['fields'] : array();	 		
 	}
 	
 	/**
 	 * Given a parameter in a vardef field, return the list of fields that match the param and value
 	 *
 	 * @param unknown_type $param_name
 	 * @param unknown_type $param_value
 	 * @return unknown
 	 */
	public function getFieldsWithParams($param_name, $param_value) {
		if(empty($this->_field_defs)){
			$this->loadVardefs();	 		
		}
		$fields_with_param = array();
		foreach($this->_field_defs as $key => $def){
			if(!empty($def[$param_name]) && ($def[$param_name] == $param_value)){
				$fields_with_param[$key] = $def;
			}
		}
		return $fields_with_param;
 	}
 	
	public function saveConfig() {
		$config_str = "<?php\n/***CONNECTOR SOURCE***/\n";
		foreach($this->_config as $key => $val) {
			if(!empty($val)){
				$config_str .= override_value_to_string_recursive2('config', $key, $val, false);
			}
		}
		$dir = str_replace('_', '/', get_class($this));
				
	    if(!file_exists("custom/modules/Connectors/connectors/sources/{$dir}")) {
	       mkdir_recursive("custom/modules/Connectors/connectors/sources/{$dir}");
	    }
	    $fp = sugar_fopen("custom/modules/Connectors/connectors/sources/{$dir}/config.php", 'w');
		fwrite($fp, $config_str);
		fclose($fp);
 	}
 	
	public function loadConfig() {
		$config = array();
		$dir = str_replace('_','/',get_class($this));
		if(file_exists("modules/Connectors/connectors/sources/{$dir}/config.php")){
			require("modules/Connectors/connectors/sources/{$dir}/config.php");
		}
		if(file_exists("custom/modules/Connectors/connectors/sources/{$dir}/config.php")) {
			require("custom/modules/Connectors/connectors/sources/{$dir}/config.php");
		}
		$this->_config = $config;
		
		//If there are no required config fields specified, we will default them to all be required
		if(empty($this->_required_config_fields)) {
		   foreach($this->_config['properties'] as $id=>$value) {
		   	  $this->_required_config_fields[] = $id;
		   }
		}
 	}
 	
 	////////////// GETTERS and SETTERS ////////////////////
	public function getMapping(){
 		return $this->_mapping;
 	}
 	
	public function getOriginalMapping() {
 		$mapping = array();
 		$dir = str_replace('_','/',get_class($this));
		if(file_exists("modules/Connectors/connectors/sources/{$dir}/mapping.php")) {
			require("modules/Connectors/connectors/sources/{$dir}/mapping.php");
		} else if(file_exists("custom/modules/Connectors/connectors/sources/{$dir}/mapping.php")){
			require("custom/modules/Connectors/connectors/sources/{$dir}/mapping.php");
		}
		return $mapping;	
 	} 	
 	
 	public function setMapping($mapping){
 		$this->_mapping = $mapping;
 	}
 	
 	public function getFieldDefs(){
 		return $this->_field_defs;
 	}
 	
 	public function getConfig(){
 		return $this->_config;
 	}
 	
 	public function setConfig($config){
 		$this->_config = $config;
 	}
 	
 	public function setProperties($properties=array()) {
 	 	if(!empty($this->_config) && isset($this->_config['properties'])) {
 		   $this->_config['properties'] = $properties;
 		}
 	}
 	
 	public function getProperties() {
 	 	if(!empty($this->_config) && isset($this->_config['properties'])) {
 		   return $this->_config['properties'];
 		}
 		return array();
 	} 

 	public function getProperty($name){
 		$properties = $this->getProperties();
 		if(!empty($properties[$name])){
 			return $properties[$name];
 		}else{
 			return '';
 		}
 	}

 	/**
 	 * hasTestingEnabled
 	 * This method is used to indicate whether or not a data source has testing enabled so that
 	 * the administration interface may call the test method on the data source instance
 	 *
 	 * @return enabled boolean value indicating whether or not testing is enabled
 	 */
 	public function hasTestingEnabled() {
 		return $this->_has_testing_enabled;
 	}
 	
 	/**
 	 * test
 	 * This method is called from the administration interface to run a test of the service
 	 * It is up to subclasses to implement a test and set _has_testing_enabled to true so that
 	 * a test button is rendered in the administration interface
 	 * 
 	 * @return result boolean result of the test function
 	 */
    public function test() {
    	return false;
    } 
 	
    
    /**
     * isEnabledInWizard 
     * This method indicates whether or not the connector should be enabled in the wizard
     * Connectors that do not support the getList/getItem methods via API calls should 
     * set the protected class variable _enable_in_wizard to false.
     * 
     * @return $enabled boolean variable indicating whether or not the connector is enabled for the wizard
     */
    public function isEnabledInWizard() {
    	return $this->_enable_in_wizard;
    }
    
    
    /**
     * isEnabledInHover
     * This method indicates whether or not the connector should be enabled for the hover links
     * Connectors that do not provide a formatter implementation should not
     * set the protected class variable _enable_in_hover to true.
     * 
     * @return $enabled boolean variable indicating whether or not the connector is enabled for the hover links
     * 
     */
    public function isEnabledInHover() {
    	return $this->_enable_in_hover;
    }    
    
    
    /**
     * getRequiredConfigFields
     * This method returns an Array of the configuration keys that are required for the Connector.
     * Subclasses should set the class variable _required_config_fields to 
     * return an Array of keys as specified in the Connector's config.php that are required.
     * 
     * @return $fields Array of Connector config fields that are required
     */
    public function getRequiredConfigFields() {
    	return $this->_required_config_fields;
    }
    
    
    /**
     * isRequiredConfigFieldsSet
     * This method checks the configuration parameters against the required config fields
     * to see if they are set
     * 
     * @return $set boolean value indicating whether or not the required config fields are set
     */
    public function isRequiredConfigFieldsSet() {
        //Check if required fields are set
   		foreach($this->_required_config_fields as $field) {
	    	if(empty($this->_config['properties'][$field])) {
	    	   return false;
	    	}
   		}
    	return true;    	
    }
    
    
    /**
     * getRequiredConfigFieldsForButton
     * This method returns an Array of the configuration keys that are required before the
     * "Get Data" button will include the Connector.  We use it as a subset of the 
     * $this->_required_config_fields Array.
     * 
     * @return $fields Array of Connector config fields that are required to be set for the "Get Data" button to appear
     */
    public function getRequiredConfigFieldsForButton() {
    	return $this->_required_config_fields_for_button;
    }


    /**
     * isRequiredConfigFieldsForButtonSet
     * This method checks the configuration parameters against the required config fields
     * for the "Get Button" to see if they are set
     * 
     * @return $set boolean value indicating whether or not the required config fields are set
     */
    public function isRequiredConfigFieldsForButtonSet() {
        //Check if required fields for button are set
   		foreach($this->_required_config_fields_for_button as $field) {
	    	if(empty($this->_config['properties'][$field])) {
	    	   return false;
	    	}
   		}
    	return true;    	
    }    
    
    
    /**
     * Allow data sources to log information
     *
     * @param string $log_data
     */
    protected function log($log_data){
    	$name = get_class($this);
    	$property_name = $this->getProperty('name');
    	if(!empty($property_name)){
    		$name = $property_name;
    	}
    	$GLOBALS['log']->info($name. ': '.$log_data);
    }
    
 	/**
 	 * getItem
 	 * Returns an array containing a key/value pair(s) of a connector record. To be overridden by the implementation
 	 * source.
 	 * 
 	 * @param $args Array of arguments to search/filter by
 	 * @param $module String optional value of the module that the connector framework is attempting to map to
 	 * @return Array of key/value pair(s) of connector record; empty Array if no results are found
 	 */
	public abstract function getItem($args=array(), $module=null);

	
 	/**
 	 * getList
 	 * Returns a nested array containing a key/value pair(s) of a connector record. To be overridden by the 
 	 * implementation source.
 	 * 
 	 * @param $args Array of arguments to search/filter by
 	 * @param $module String optional value of the module that the connector framework is attempting to map to
 	 * @return Array of key/value pair(s) of connector record; empty Array if no results are found
 	 */	
	public abstract function getList($args=array(), $module=null);
 	
	/**
	 * Default destructor
	 *
	 */
 	public function __destruct(){}
}
?>
