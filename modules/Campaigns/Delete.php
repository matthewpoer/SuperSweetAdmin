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

 * Description:  TODO: To be written.
 * Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
 * All Rights Reserved.
 * Contributor(s): ______________________________________..
 ********************************************************************************/

if(!isset($_REQUEST['record']))
	sugar_die("A record number must be specified to delete the campaign.");



$focus = new Campaign();
$focus->retrieve($_REQUEST['record']);

if (isset($_REQUEST['mode']) and  $_REQUEST['mode']=='Test') {
	//deletes all data associated with the test run.

	//delete from emails table.	
	if ($focus->db->dbType=='mysql') {
		
		$query="update  emails "; 
		$query.="inner join campaign_log on campaign_log.related_id = emails.id and campaign_log.campaign_id = '{$focus->id}' ";
		$query.="inner join prospect_lists on campaign_log.list_id = prospect_lists.id and prospect_lists.list_type='test' ";
		$query.="set emails.deleted=1 ";
	} elseif ($focus->db->dbType=='mssql') {
        $query="update  emails ";
        $query.="set emails.deleted=1 ";
        $query.="where id in ( ";
        $query.="select related_id from campaign_log ";
        $query.="inner join prospect_lists on campaign_log.list_id = prospect_lists.id ";
        $query.="and prospect_lists.list_type='test' ";
        $query.="and campaign_log.campaign_id = '{$focus->id}' ) ";
	} else {
	}
	$focus->db->query($query);
		
	//delete from message queue.
	if ($focus->db->dbType=='mysql') {
		$query="delete emailman.* from emailman ";
		$query.="inner join prospect_lists on emailman.list_id = prospect_lists.id and prospect_lists.list_type='test' ";
		$query.="WHERE emailman.campaign_id = '{$focus->id}' ";
	} elseif ($focus->db->dbType=='mssql') {
        $query="delete from emailman ";
        $query.="where list_id in ( ";
        $query.="       select prospect_list_id from prospect_list_campaigns ";
        $query.="       inner join prospect_lists on prospect_list_campaigns.prospect_list_id = prospect_lists.id ";
        $query.="       where prospect_lists.list_type='test' and prospect_list_campaigns.campaign_id = '{$focus->id}' ) ";
    } else {
	}
	$focus->db->query($query);

	//delete from campaign_log
	if ($focus->db->dbType=='mysql') {
		$query="update  campaign_log "; 
		$query.="inner join prospect_lists on campaign_log.list_id = prospect_lists.id and prospect_lists.list_type='test' ";
		$query.="set campaign_log.deleted=1 ";
		$query.="where campaign_log.campaign_id='{$focus->id}' ";
	} elseif ($focus->db->dbType=='mssql') {
        $query="update  campaign_log ";
        $query.="set campaign_log.deleted=1 ";
        $query.="where list_id in ( ";
        $query.="                       select id from prospect_lists ";
        $query.="                       where prospect_lists.list_type='test') ";
        $query.="and campaign_log.campaign_id='{$focus->id}' ";
	} else {
	}
	$focus->db->query($query);
} else {
	if(!$focus->ACLAccess('Delete')){
		ACLController::displayNoAccess(true);
		sugar_cleanup(true);
	}
	$focus->mark_deleted($_REQUEST['record']);
}
$return_id=!empty($_REQUEST['return_id'])?$_REQUEST['return_id']:$focus->id;
header("Location: index.php?module=".$_REQUEST['return_module']."&action=".$_REQUEST['return_action']."&record=".$return_id);
?>
