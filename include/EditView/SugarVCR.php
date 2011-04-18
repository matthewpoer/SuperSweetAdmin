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

/*
 * Created on Jul 24, 2007
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */
 define('VCREND', '50');
 define('VCRSTART', '10');
 class SugarVCR{
 	
 	/**
 	 * records the query in the session for later retrieval
 	 */
 	function store($module, $query){
 		$_SESSION[$module .'2_QUERY'] = $query;
 	}
 	
 	/**
 	 * This function retrieves a query from the session
 	 */
 	function retrieve($module){
 		return (!empty($_SESSION[$module .'2_QUERY']) ? $_SESSION[$module .'2_QUERY'] : '');
 	}
 	
 	/**
 	 * return the start, prev, next, end
 	 */
 	function play($module, $offset){
 		//given some global offset try to determine if we have this
 		//in our array.
 		$ids = array();
 		if(!empty($_SESSION[$module.'QUERY_ARRAY']))
 			$ids = $_SESSION[$module.'QUERY_ARRAY'];
 		if(empty($ids[$offset]) || empty($ids[$offset+1]) || empty($ids[$offset-1]))
 			$ids = SugarVCR::record($module, $offset);
 		$menu = array();
 		if(!empty($ids[$offset])){
 			//return the control given this id
 			$menu['PREV'] = ($offset > 1) ? $ids[$offset-1] : '';
 			$menu['CURRENT'] = $ids[$offset];
 			$menu['NEXT'] = !empty($ids[$offset+1]) ? $ids[$offset+1] : '';
 		}
 		return $menu;
 	}
 	
 	function menu($module, $offset, $isAuditEnabled, $saveAndContinue = false ){
 		$html_text = "";
 		if($offset < 0) {
 			$offset = 0;
 		}
 		//this check if require in cases when you visit the edit view before visiting that modules list view.
 		//you can do this easily either from home or activies or sitemap.
 		$stored_vcr_query=SugarVCR::retrieve($module);
 		if(!empty($_REQUEST['record']) and !empty($stored_vcr_query) and isset($_REQUEST['offset']) and (empty($_REQUEST['isDuplicate']) or $_REQUEST['isDuplicate'] == 'false')){ // bug 15893 - only show VCR if called as an element in a set of records
 			//syncing with display offset;
	 		$offset++;
	 		$action = (!empty($_REQUEST['action']) ? $_REQUEST['action'] : 'EditView');
			//$html_text .= "<tr class='pagination'>\n";
			//$html_text .= "<td COLSPAN=\"20\" style='padding: 0px;'>\n";
	        $html_text .= "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tr>\n";
	 		
	 		$list_URL = 'index.php?action=index&module='.$module;
	 		$current_page = floor($offset / 20) * 20;
	 		$list_URL .= '&offset='.$current_page;
	 		
			$menu = SugarVCR::play($module, $offset);
			if($saveAndContinue){
				if(!empty($menu['NEXT'])){
					$return_action = 'EditView';
					$return_id = $menu['NEXT'];
					$list_URL = 'index.php?action=EditView&module='.$module.'&record='.$return_id.'&offset='.($offset+1);
					$list_link = "<button type='button' id='save_and_continue' class='button' title='{$GLOBALS['app_strings']['LBL_SAVE_AND_CONTINUE']}' onClick='this.form.action.value=\"Save\";if(check_form(\"EditView\")){sendAndRedirect(\"EditView\", \"{$GLOBALS['app_strings']['LBL_SAVING']} {$module}...\", \"$list_URL\");}'>".$GLOBALS['app_strings']['LBL_SAVE_AND_CONTINUE']."</button>";
				}else
					$list_link = "";
			}else
				$list_link = "";
	 		
	 		$previous_link = "";
	 		$next_link = "";
	 		if(!empty($menu['PREV'])) {
	 			//$previous_link = "<a href='index.php?module=$module&action=$action&offset=".($offset-1)."&record=".$menu['PREV']."' >".SugarThemeRegistry::current()->getImage("previous","alt='".$GLOBALS['app_strings']['LNK_LIST_PREVIOUS']."'  border='0' align='absmiddle'").'&nbsp;'.$GLOBALS['app_strings']['LNK_LIST_PREVIOUS']."</a>";
				$href = "index.php?module=$module&action=$action&offset=".($offset-1)."&record=".$menu['PREV'];
				$previous_link = "<button type='button' class='button' title='{$GLOBALS['app_strings']['LNK_LIST_PREVIOUS']}' onClick='document.location.href=\"$href\";'>".SugarThemeRegistry::current()->getImage("previous","alt='".$GLOBALS['app_strings']['LNK_LIST_PREVIOUS']."'  border='0' align='absmiddle'")."</button>";
	 		}
	 		else 
				$previous_link = "<button type='button' class='button' title='{$GLOBALS['app_strings']['LNK_LIST_PREVIOUS']}' disabled>".SugarThemeRegistry::current()->getImage("previous_off","alt='".$GLOBALS['app_strings']['LNK_LIST_PREVIOUS']."'  border='0' align='absmiddle'")."</button>";

	 		if(!empty($menu['NEXT'])) {
	 			//$next_link = "<a href='index.php?module=$module&action=$action&offset=".($offset+1)."&record=".$menu['NEXT']."' >".$GLOBALS['app_strings']['LNK_LIST_NEXT'].'&nbsp;'.SugarThemeRegistry::current()->getImage("next","alt='".$GLOBALS['app_strings']['LNK_LIST_NEXT']."'  border='0' align='absmiddle'")."</a>";
				$href = "index.php?module=$module&action=$action&offset=".($offset+1)."&record=".$menu['NEXT'];
				$next_link = "<button type='button' class='button' title='{$GLOBALS['app_strings']['LNK_LIST_NEXT']}' onClick='document.location.href=\"$href\";'>".SugarThemeRegistry::current()->getImage("next","alt='".$GLOBALS['app_strings']['LNK_LIST_NEXT']."'  border='0' align='absmiddle'")."</button>";
	 		}
	 		else
				$next_link = "<button type='button' class='button' title='{$GLOBALS['app_strings']['LNK_LIST_NEXT']}' disabled>".SugarThemeRegistry::current()->getImage("next_off","alt='".$GLOBALS['app_strings']['LNK_LIST_NEXT']."'  border='0' align='absmiddle'")."</button>";
	 		
	 		if(!empty($_SESSION[$module. 'total'])){
	 			$count = $offset .' '. $GLOBALS['app_strings']['LBL_LIST_OF'] . ' ' . $_SESSION[$module. 'total'];
                if(!empty($GLOBALS['sugar_config']['disable_count_query']) 
                        && ( ($_SESSION[$module. 'total']-1) % $GLOBALS['sugar_config']['list_max_entries_per_page'] == 0 ) ) {
                    $count .= '+';
                }
	 		}else{
	 			$count = $offset;
	 		}
	 		$html_text .= "<td nowrap align='right' >".$list_link."&nbsp;&nbsp;&nbsp;&nbsp;<span class='pagination'>".$previous_link."&nbsp;&nbsp;(".$count.")&nbsp;&nbsp;".$next_link."</span>&nbsp;&nbsp;</td>";
	 		
	 		
	 			
	 		$html_text .= "</tr></table>";//</td></tr>";
 		}
 		return $html_text;
 	}
 	
 	function record($module, $offset){
 		$GLOBALS['log']->debug('SUGARVCR is recording more records');
 		$start = max(0, $offset - VCRSTART);
 		$index = $start;
	    $db = DBManagerFactory::getInstance();

 		$result = $db->limitQuery(SugarVCR::retrieve($module),$start,($offset+VCREND),false);
 		$index++;

 		$ids = array();
 		while(($row = $db->fetchByAssoc($result)) != null){
 			$ids[$index] = $row['id'];
 			$index++;
 		}
 		//now that we have the array of ids, store this in the session
 		$_SESSION[$module.'QUERY_ARRAY'] = $ids;
 		return $ids;
 	}
 	
 	function recordIDs($module, $rids, $offset, $totalCount){
 		$index = $offset;
 		$index++;
 		$ids = array();
 		foreach($rids as $id){ 
 			$ids[$index] = $id;
 			$index++;	
 		}
 		//now that we have the array of ids, store this in the session
 		$_SESSION[$module.'QUERY_ARRAY'] = $ids;
 		$_SESSION[$module.'total'] = $totalCount;
 	}
 	
 	function erase($module){
 		unset($_SESSION[$module. 'QUERY_ARRAY']);
 	}
 	
 }
?>
