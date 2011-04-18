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


class SugarSpot
{
	/**
	 * Performs the search and returns the HTML widget containing the results
	 *
	 * @param  $query   string what we are searching for
	 * @param  $modules array  modules we are searching in
	 * @param  $offset  int    search result offset
	 * @return string HTML widget
	 */
	public function searchAndDisplay(
	    $query,
	    $modules,
	    $offset = -1
	    )
	{
		$query_encoded = urlencode($query);
	    $results = $this->_performSearch($query, $modules, $offset);

		$str = '<div id="SpotResults">';

		$actions=0;
		$foundData = false;
		foreach($results as $m=>$data){
			if(empty($data['data'])){
				continue;
			}

			$foundData = true;

			$countRemaining = $data['pageData']['offsets']['total'] - count($data['data']);
			if($offset > 0) $countRemaining -= $offset;
			$more = '';
			$data['pageData']['offsets']['next']++;
			if($countRemaining > 0){
				$more = <<<EOHTML
<small class='more' onclick="DCMenu.spotZoom('$query', '$m','{$data['pageData']['offsets']['next']}' )">($countRemaining {$GLOBALS['app_strings']['LBL_SEARCH_MORE']})</small>
EOHTML;
			}

			$modDisplayString = $m;
			if(isset($GLOBALS['app_list_strings']['moduleList'][$m]))
			    $modDisplayString = $GLOBALS['app_list_strings']['moduleList'][$m];

			$str.= "<div>{$modDisplayString} $more</div>";
			$str.= '<ul>';
			foreach($data['data'] as $row){
				$name = '';
				
				if(!empty($row['NAME'])){
					$name = $row['NAME'];
				} else if(!empty($row['DOCUMENT_NAME'])) {
				    $name = $row['DOCUMENT_NAME'];
				} else {
					foreach($row as $k=>$v){
						if(strpos($k, 'NAME') !== false && !empty($row[$k])){
							$name = $v;
							break;
						}
					}

					if(empty($name))
					{
						foreach($row as $k=>$v){
							if(strpos($k, 'NAME') !== false){
								$name = $v;
								break;
							}
						}
					}
				}

				    $str .= <<<EOHTML
<li><a href="index.php?module={$data['pageData']['bean']['moduleDir']}&action=DetailView&record={$row['ID']}">$name</a></li>
EOHTML;
			}
			$str.= '</ul>';
		}

		if($foundData)
		{
			$str = <<<EOHTML
			<button onclick="document.location.href='index.php?module=Home&action=UnifiedSearch&search_form=false&advanced=false&query_string={$query_encoded}'">{$GLOBALS['app_strings']['LBL_EMAIL_SHOW_READ']}</button>
			<br><br>
			{$str}
			</div>
			<p>
			<button onclick="document.location.href='index.php?module=Home&action=UnifiedSearch&search_form=false&advanced=false&query_string={$query_encoded}'">{$GLOBALS['app_strings']['LBL_EMAIL_SHOW_READ']}</button>
EOHTML;
		} else {
			$str .= $GLOBALS['app_strings']['LBL_EMAIL_SEARCH_NO_RESULTS'];
			$str .= <<<EOHTML
			</div>
			<p>
			<button onclick="document.location.href='index.php?module=Home&action=UnifiedSearch&search_form=false&advanced=false&query_string={$query_encoded}'">{$GLOBALS['app_strings']['LBL_EMAIL_SHOW_READ']}</button>
EOHTML;

		}

		return $str;
	}

	/**
	 * Returns the array containing the $searchFields for a module
	 *
	 * @param  $moduleName string
	 * @return array
	 */
	protected static function getSearchFields(
	    $moduleName
	    )
	{
		if(file_exists("custom/modules/{$moduleName}/metadata/SearchFields.php")) {
			$searchFields = array();
		    require "custom/modules/{$moduleName}/metadata/SearchFields.php" ;
			return $searchFields;
		} else if(file_exists("modules/{$moduleName}/metadata/SearchFields.php")) {
			$searchFields = array();
		    require "modules/{$moduleName}/metadata/SearchFields.php" ;
			return $searchFields;
		} else {
			return array();
		}
	}

	/**
	 * Get count from query
	 * @param SugarBean $seed
	 * @param string $main_query
	 */
	protected function _getCount($seed, $main_query)
	{
//        $count_query = $seed->create_list_count_query($main_query);
		$result = $seed->db->query("SELECT COUNT(*) as c FROM ($main_query) main");
		$row = $seed->db->fetchByAssoc($result);
		return isset($row['c'])?$row['c']:0;
	}

	/**
	 * Performs the search
	 *
	 * @param  $query   string what we are searching for
	 * @param  $modules array  modules we are searching in
	 * @param  $offset  int    search result offset
	 * @return array
	 */
	protected function _performSearch(
	    $query,
	    $modules,
	    $offset = -1
	    )
	{
	    if(empty($query)) return array();
		$primary_module='';
		$results = array();
		require_once 'include/SearchForm/SearchForm2.php' ;
		$where = '';
        $searchEmail = preg_match('/^([^%]|%)*@([^%]|%)*$/', $query);

        $limit = ( !empty($GLOBALS['sugar_config']['max_spotresults_initial']) ? $GLOBALS['sugar_config']['max_spotresults_initial'] : 5 );
		if($offset !== -1){
			$limit = ( !empty($GLOBALS['sugar_config']['max_spotresults_more']) ? $GLOBALS['sugar_config']['max_spotresults_more'] : 20 );
		}
    	$totalCounted = empty($GLOBALS['sugar_config']['disable_count_query']);

	    foreach($modules as $moduleName){
		    if (empty($primary_module)) $primary_module=$moduleName;

			$searchFields = SugarSpot::getSearchFields($moduleName);

			if (empty($searchFields[$moduleName])) continue;

			$class = $GLOBALS['beanList'][$moduleName];
			$return_fields = array();
			$seed = new $class();
            if(!$seed->ACLAccess('ListView')) continue;

			if ($class == 'aCase') {
		            $class = 'Case';
			}
			
			foreach($searchFields[$moduleName] as $k=>$v){
				$keep = false;
				$searchFields[$moduleName][$k]['value'] = $query;

				if(!empty($GLOBALS['dictionary'][$class]['unified_search'])){
					if(empty($GLOBALS['dictionary'][$class]['fields'][$k]['unified_search'])){

						if(isset($searchFields[$moduleName][$k]['db_field'])){
							foreach($searchFields[$moduleName][$k]['db_field'] as $field){
								if(!empty($GLOBALS['dictionary'][$class]['fields'][$field]['unified_search'])){
									$keep = true;
								}
							}
						}
						if(!$keep){
							if(strpos($k,'email') === false || !$searchEmail) {
								unset($searchFields[$moduleName][$k]);
							}
						}
					}else{
					    if($GLOBALS['dictionary'][$class]['fields'][$k]['type'] == 'int' && !is_numeric($query)) {
					        unset($searchFields[$moduleName][$k]);
					    }
					}
				}else if(empty($GLOBALS['dictionary'][$class]['fields'][$k]) ){
					unset($searchFields[$moduleName][$k]);
				}else{
					switch($GLOBALS['dictionary'][$class]['fields'][$k]['type']){
						case 'id':
						case 'date':
						case 'datetime':
						case 'bool':
							unset($searchFields[$moduleName][$k]);
							break;
						case 'int':
						    if(!is_numeric($query)) {
						        unset($searchFields[$moduleName][$k]);
						        break;
						    }
					}
				}
			}

			if (empty($searchFields[$moduleName])) continue;

			if(isset($seed->field_defs['name'])) {
			    $return_fields['name'] = $seed->field_defs['name'];
			}

			foreach($seed->field_defs as $k => $v) {
			    if(isset($seed->field_defs[$k]['type']) && ($seed->field_defs[$k]['type'] == 'name') && !isset($return_fields[$k])) {
				    $return_fields[$k] = $seed->field_defs[$k];
				}
			}

			if(!isset($return_fields['name'])) {
			    // if we couldn't find any name fields, try search fields that have name in it
			    foreach($searchFields[$moduleName] as $k => $v) {
			        if(strpos($k, 'name') != -1 && isset($seed->field_defs[$k])
			            && !isset($seed->field_defs[$k]['source'])) {
				        $return_fields[$k] = $seed->field_defs[$k];
				        break;
				    }
			    }
			}

			if(!isset($return_fields['name'])) {
			    // last resort - any fields that have 'name' in their name
			    foreach($seed->field_defs as $k => $v) {
			        if(strpos($k, 'name') != -1 && isset($seed->field_defs[$k])
			            && !isset($seed->field_defs[$k]['source'])) {
				        $return_fields[$k] = $seed->field_defs[$k];
				        break;
				    }
			    }
			}

			if(!isset($return_fields['name'])) {
			    // FAIL: couldn't find id & name for the module
			    $GLOBALS['log']->error("Unable to find name for module $moduleName");
			    continue;
			}

			if(isset($return_fields['name']['fields'])) {
			    // some names are composite
			    foreach($return_fields['name']['fields'] as $field) {
			        $return_fields[$field] = $seed->field_defs[$field];
			    }
			}


			$searchForm = new SearchForm ( $seed, $moduleName ) ;
			$searchForm->setup (array ( $moduleName => array() ) , $searchFields , '' , 'saved_views' /* hack to avoid setup doing further unwanted processing */ ) ;
			$where_clauses = $searchForm->generateSearchWhere() ;
			
			if(empty($where_clauses)) {
			    continue;
			}
			if(count($where_clauses) > 1) {
			    $query_parts =  array();

			    $ret_array_start = $seed->create_new_list_query('', '', $return_fields, array(), 0, '', true, $seed, true);
                $search_keys = array_keys($searchFields[$moduleName]);

                foreach($where_clauses as $n => $clause) {
			        $allfields = $return_fields;
			        $skey = $search_keys[$n];
			        if(isset($seed->field_defs[$skey])) {
                        // Joins for foreign fields aren't produced unless the field is in result, hence the merge
			            $allfields[$skey] = $seed->field_defs[$skey];
			        }
                    $ret_array = $seed->create_new_list_query('', $clause, $allfields, array(), 0, '', true, $seed, true);
                    $query_parts[] = $ret_array_start['select'] . $ret_array['from'] . $ret_array['where'] . $ret_array['order_by'];
                }
                $main_query = "(".join(") UNION (", $query_parts).")";
			} else {
                foreach($searchFields[$moduleName] as $k=>$v){
                    if(isset($seed->field_defs[$k])) {
			            $return_fields[$k] = $seed->field_defs[$k];
                    }
			    }
			    $ret_array = $seed->create_new_list_query('', $where_clauses[0], $return_fields, array(), 0, '', true, $seed, true);
		        $main_query = $ret_array['select'] . $ret_array['from'] . $ret_array['where'] . $ret_array['order_by'];
			}

			$totalCount = null;
		    if($limit < -1) {
			    $result = $seed->db->query($main_query);
		    } else {
			    if($limit == -1) {
				    $limit = $GLOBALS['sugar_config']['list_max_entries_per_page'];
                }

                if($offset == 'end') {
		            $totalCount = $this->_getCount($seed, $main_query);
		            if($totalCount) {
                	    $offset = (floor(($totalCount -1) / $limit)) * $limit;
		            } else {
		                $offset = 0;
		            }
                }
                $result = $seed->db->limitQuery($main_query, $offset, $limit + 1);
		    }

            $data = array();
            $count = 0;
            while($count < $limit && ($row = $seed->db->fetchByAssoc($result))) {
		        $temp = clone $seed;
			    $temp->setupCustomFields($temp->module_dir);
				$temp->loadFromRow($row);
				$data[] = $temp->get_list_view_data($return_fields);
				$count++;
		    }

    		$nextOffset = -1;
    		$prevOffset = -1;
    		$endOffset = -1;

    		if($count >= $limit) {
    			$nextOffset = $offset + $limit;
    		}

    		if($offset > 0) {
    			$prevOffset = $offset - $limit;
    			if($prevOffset < 0) $prevOffset = 0;
    		}

    		if( $count >= $limit && $totalCounted){
    		    if(!isset($totalCount)) {
    			    $totalCount  = $this->_getCount($seed, $main_query);
    		    }
    		} else {
    		    $totalCount = $count + $offset;
    		}

            $pageData['offsets'] = array( 'current'=>$offset, 'next'=>$nextOffset, 'prev'=>$prevOffset, 'end'=>$endOffset, 'total'=>$totalCount, 'totalCounted'=>$totalCounted);
		    $pageData['bean'] = array('objectName' => $seed->object_name, 'moduleDir' => $seed->module_dir);

		    $results[$moduleName] = array("data" => $data, "pageData" => $pageData);
		}
        return $results;
	}

	/**
     * Function used to walk the array and find keys that map the queried string.
     * if both the pattern and module name is found the promote the string to thet top.
     */
    protected function _searchKeys(
        $item1,
        $key,
        $patterns
        )
    {
        //make the module name singular....
        if ($patterns[1][strlen($patterns[1])-1] == 's') {
            $patterns[1]=substr($patterns[1],0,(strlen($patterns[1])-1));
        }

        $module_exists = stripos($key,$patterns[1]); //primary module name.
        $pattern_exists = stripos($key,$patterns[0]); //pattern provided by the user.
        if ($module_exists !== false and $pattern_exists !== false)  {
            $GLOBALS['matching_keys']= array_merge(array(array('NAME'=>$key, 'ID'=>$key, 'VALUE'=>$item1)),$GLOBALS['matching_keys']);
        }
        else {
            if ($pattern_exists !== false) {
                $GLOBALS['matching_keys'][]=array('NAME'=>$key, 'ID'=>$key, 'VALUE'=>$item1);
            }
        }
    }
}