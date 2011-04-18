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

 require_once('include/SugarObjects/templates/person/Person.php');
  

/**
 * quicksearchQuery class, handles AJAX calls from quicksearch.js
 *
 * @copyright  2004-2007 SugarCRM Inc.
 * @license    http://www.sugarcrm.com/crm/products/sugar-professional-eula.html  SugarCRM Professional End User License
 * @since      Class available since Release 4.5.1
 */
class quicksearchQuery {
    /**
     * Internal function to construct where clauses
     */
    function constructWhere(&$query_obj, $focus) {
        $table = $focus->getTableName();
    	if (! empty($table)) {
            $table .= ".";
        }
        $cond_arr = array();
    
        if (!is_array($query_obj['conditions'])) {
            $query_obj['conditions'] = array();
        }
  
        foreach($query_obj['conditions'] as $condition) {
	   		if($condition['op'] == 'contains') {
	       		array_push($cond_arr,$GLOBALS['db']->quote($table.$condition['name'])." like '%".$GLOBALS['db']->quote($condition['value'])."%'");
	        } else if($condition['op'] == 'like_custom') {
	        	$like = '';
	           if(!empty($condition['begin'])) $like .= $GLOBALS['db']->quote($condition['begin']);
	           $like .= $GLOBALS['db']->quote($condition['value']);
	           if(!empty($condition['end'])) $like .= $GLOBALS['db']->quote($condition['end']);
	               
	           if ($focus instanceof Person){
	           		$nameFormat = $GLOBALS['locale']->getLocaleFormatMacro($GLOBALS['current_user']);
                    if ( strpos($nameFormat,'l') > strpos($nameFormat,'f') ) {
                        array_push($cond_arr,db_concat(rtrim($table,'.'),array('first_name','last_name')) . " like '$like'");
                    }
                    else {
                        array_push($cond_arr,db_concat(rtrim($table,'.'),array('last_name','first_name')) . " like '$like'");
                    }
	           }
	           else {
	           	array_push($cond_arr,$GLOBALS['db']->quote($table.$condition['name'])." like '$like'");
	           }
	        } else { // starts_with
	        	 array_push($cond_arr,$GLOBALS['db']->quote($table.$condition['name'])." like '".$GLOBALS['db']->quote($condition['value'])."%'");
	        }
	    }
	    
        $whereClause = '('.implode(" {$query_obj['group']} ",$cond_arr).')';
        
        if($table == 'users.') 
            $whereClause .= " AND {$table}status='Active'";
        
        // Need to include the default whereStatement
		if(!empty($query_obj['whereExtra'])){
            if(!empty($whereClause))$whereClause .= ' AND ';
            $whereClause .= html_entity_decode($query_obj['whereExtra'],ENT_QUOTES);
		}
		
        return $whereClause;
    }
    
    /**
     * Query a module for a list of items
     * 
     * @param array $args
     * example for querying Account module with 'a':
     * array ('modules' => array('Accounts'), // module to use
     *        'field_list' => array('name', 'id'), // fields to select
     *        'group' => 'or', // how the conditions should be combined
     *        'conditions' => array(array( // array of where conditions to use
     *                              'name' => 'name', // field 
     *                              'op' => 'like_custom', // operation
     *                              'end' => '%', // end of the query
     *                              'value' => 'a',  // query value
     *                              )
     *                        ),
     *        'order' => 'name', // order by
     *        'limit' => '30', // limit, number of records to return 
     *       )
     * @return array list of elements returned
     */
    function query($args) {
        $json = getJSONobj();
        global $sugar_config;
        global $beanFiles, $beanList;
        
        if($sugar_config['list_max_entries_per_page'] < ($args['limit'] + 1)) // override query limits
            $sugar_config['list_max_entries_per_page'] = ($args['limit'] + 1);
        
        $list_return = array();
        
        foreach($args['modules'] as $module) {
            require_once($beanFiles[$beanList[$module]]);
            $focus = new $beanList[$module];
            
            $query_orderby = '';
            if (!empty($args['order'])) {
                $query_orderby = $args['order'];
                if ($focus instanceof Person && $args['order'] == 'name') {
                	$query_orderby = 'last_name';
                }
            }
            $query_limit = '';
            if (!empty($args['limit'])) {
                $query_limit = $args['limit'];
            }

            $query_where = $this->constructWhere($args, $focus);
           
            $list_arr = array();
            if($focus->ACLAccess('ListView', true)) 
            {
                $curlist = $focus->get_list($query_orderby, $query_where, 0, $query_limit, -1, 0);
                $list_return = array_merge($list_return,$curlist['list']);
            }
        }
    	$list_arr = $this->formatResults($args, $list_return);
        return $json->encodeReal($list_arr);
    }
    
    protected function formatResults($args, $list_return){
        global $sugar_config;
        $app_list_strings = null;
        $list_arr['totalCount']=count($list_return);
        $list_arr['fields']= array();
        for($i = 0; $i < count($list_return); $i++) {
            $list_arr['fields'][$i]= array();
            $list_arr['fields'][$i]['module']= $list_return[$i]->object_name;
            $listData = $list_return[$i]->get_list_view_data();
                
            foreach($args['field_list'] as $field) {
                // handle enums
                if( (isset($list_return[$i]->field_name_map[$field]['type']) && $list_return[$i]->field_name_map[$field]['type'] == 'enum') || 
                    (isset($list_return[$i]->field_name_map[$field]['custom_type']) && $list_return[$i]->field_name_map[$field]['custom_type'] == 'enum')) {
                    
                    // get fields to match enum vals
                    if(empty($app_list_strings)) {
                        if(isset($_SESSION['authenticated_user_language']) && $_SESSION['authenticated_user_language'] != '') $current_language = $_SESSION['authenticated_user_language'];
                        else $current_language = $sugar_config['default_language'];
                        $app_list_strings = return_app_list_strings_language($current_language);
                    }
                    
                    // match enum vals to text vals in language pack for return
                    if(!empty($app_list_strings[$list_return[$i]->field_name_map[$field]['options']])) {
                        $list_return[$i]->$field = $app_list_strings[$list_return[$i]->field_name_map[$field]['options']][$list_return[$i]->$field];
                    }
                }

    			
                if (isset($listData[$field]))
    			{
                    $list_arr['fields'][$i][$field] = $listData[$field];
    			}
    			else if (isset($list_return[$i]->$field))
                {
               	    $list_arr['fields'][$i][$field] = $list_return[$i]->$field;
                }
                else {
                	$list_arr['fields'][$i][$field] = "";
                }
            }
        }
        if(is_array($list_arr['fields'])) {
            foreach ( $list_arr['fields'] as $i => $recordIn ) {
                if(!is_array($recordIn)){
                    continue;
                }
                foreach( $recordIn as $col => $dataIn ) {
                    if ( !is_scalar($dataIn) ) {
                        continue;
                    }
                    $list_arr['fields'][$i][$col] = html_entity_decode($dataIn,ENT_QUOTES,'UTF-8');
                }
            }
        }
        return $list_arr;
    }
    
    /**
     * get_contact_array
     * 
     */
    function get_contact_array($args) {
        $json = getJSONobj();
        global $sugar_config, $beanFiles, $beanList, $locale;
        
        if($sugar_config['list_max_entries_per_page'] < ($args['limit'] + 1)) // override query limits
            $sugar_config['list_max_entries_per_page'] = ($args['limit'] + 1);
        
        $list_return = array();
        
        foreach($args['modules'] as $module) {
            require_once($beanFiles[$beanList[$module]]);
            $focus = new $beanList[$module];
            
            $query_orderby = '';
            if (!empty($args['order'])) {
                $query_orderby = $args['order'];
            }
            $query_limit = '';
            if (!empty($args['limit'])) {
                $query_limit = $args['limit'];
            }
            $query_where = $this->constructWhere($args, $focus);
            $list_arr = array();
            if($focus->ACLAccess('ListView', true)) {
                $curlist = $focus->get_list($query_orderby, $query_where, 0, $query_limit, -1, 0);
                $list_return = array_merge($list_return,$curlist['list']);
            }
        }
        $list_arr['totalCount']=count($list_return);
        $list_arr['fields']= array();
        for($i = 0; $i < count($list_return); $i++) {
            $list_arr['fields'][$i]= array();
            $list_arr['fields'][$i]['module']= $list_return[$i]->object_name;
            $contactName = "";
            foreach($args['field_list'] as $field) {
                // We are overriding the contact_id param and the reports_to_id param to change to 'id'
                if(preg_match('/reports_to_id$/s',$field) || preg_match('/contact_id$/s',$field)) {  // We are overriding the reports_to_id param to change to 'id'
                    $list_arr['fields'][$i][$field] = $list_return[$i]->id;
                }
                else {
                    $list_arr['fields'][$i][$field] = $list_return[$i]->$field;
                }
            } //foreach
            
            $contactName = $locale->getLocaleFormattedName($list_arr['fields'][$i]['first_name'], 
                                                           $list_arr['fields'][$i]['last_name'],
                                                           $list_arr['fields'][$i]['salutation']);
                                                         
            $list_arr['fields'][$i][$args['field_list'][0]] = $contactName;
        } //for
       	
        $str = $json->encodeReal($list_arr); 
        return $str;    
    }
    
    /**
     * Returns the list of users, faster than using query method for Users module
     * 
     * @param array $args arguments used to construct query, see query() for example
     * 
     * @return array list of users returned
     */
    function get_user_array($args) {
        global $json;
        $json = getJSONobj();

        $response = array();
        
        if(showFullName()) { // utils.php, if system is configured to show full name
        	$user_array = getUserArrayFromFullName($args['conditions'][0]['value'], true);
        } else {
            $user_array = get_user_array(false, "Active", '', false, $args['conditions'][0]['value'],' AND portal_only=0 ',false);
        }
        $response['totalCount']=count($user_array);
        $response['fields']=array();
        $i=0;
        foreach($user_array as $id=>$name) {
            array_push($response['fields'], array('id' => (string) $id, 'user_name' => $name, 'module' => 'Users'));
            $i++;
        }
    
        return $json->encodeReal($response);
    }
    

    function externalApi($data) {
        require_once('include/externalAPI/ExternalAPIFactory.php');
        
        $api = ExternalAPIFactory::loadAPI($data['api']);

    	$json = getJSONobj();

        $listArray['fields'] = $api->searchDoc($_REQUEST['query']);
        $listArray['totalCount'] = count($listArray['fields']);
        
        $listJson = $json->encodeReal($listArray);
        
        return $listJson;
    }
}

$json = getJSONobj();
$data = $json->decode(html_entity_decode($_REQUEST['data']));
if(isset($_REQUEST['query']) && !empty($_REQUEST['query'])){
    foreach($data['conditions'] as $k=>$v){
    	if(empty($data['conditions'][$k]['value'])){
       		$data['conditions'][$k]['value']=$_REQUEST['query'];
    	}
    }
}
 
$quicksearchQuery = new quicksearchQuery();

$method = !empty($data['method']) ? $data['method'] : 'query';
if(method_exists($quicksearchQuery, $method)) {
   echo $quicksearchQuery->$method($data);
}

?>