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

$dictionary['Meeting'] = array('table' => 'meetings',
	'unified_search' => true, 'unified_search_default_enabled' => true,
	'comment' => 'Meeting activities'
                               ,'fields' => array (
  'name' =>
  array (
    'name' => 'name',
    'vname' => 'LBL_SUBJECT',
    'required' => true,
    'type' => 'name',
    'dbType' => 'varchar',
	'unified_search' => true,
    'len' => '50',
    'comment' => 'Meeting name',
    'importable' => 'required',
  ),
  'accept_status' => array (
    'name' => 'accept_status',
    'vname' => 'LBL_SUBJECT',
    'type' => 'varchar',
    'dbType' => 'varchar',
    'len' => '20',
    'source'=>'non-db',
  ),
  'location' =>
  array (
    'name' => 'location',
    'vname' => 'LBL_LOCATION',
    'type' => 'varchar',
    'len' => '50',
    'comment' => 'Meeting location'
  ),
  'password' =>
  array (
    'name' => 'password',
    'vname' => 'LBL_PASSWORD',
    'type' => 'varchar',
    'len' => '50',
    'comment' => 'Meeting password',
    'studio' => 'false',
  ),
  'join_url' =>
  array (
    'name' => 'join_url',
    'vname' => 'LBL_URL',
    'type' => 'varchar',
    'len' => '200',
    'comment' => 'Join URL',
    'studio' => 'false',
    'reportable' => false,
  ),
  'host_url' =>
  array (
    'name' => 'host_url',
    'vname' => 'LBL_URL',
    'type' => 'varchar',
    'len' => '400',
    'comment' => 'Host URL',
    'studio' => 'false',
    'reportable' => false,
  ),
  'displayed_url' =>
  array (
    'name' => 'displayed_url',
    'vname' => 'LBL_URL',
    'type' => 'url',
    'len' => '400',
    'comment' => 'Meeting URL',
    'studio' => 'false',
  ),
  'creator' =>
  array (
    'name' => 'creator',
    'vname' => 'LBL_CREATOR',
    'type' => 'varchar',
    'len' => '50',
    'comment' => 'Meeting creator',
    'studio' => 'false',
  ),
  'external_id' =>
  array (
    'name' => 'external_id',
    'vname' => 'LBL_EXTERNALID',
    'type' => 'varchar',
    'len' => '50',
    'comment' => 'Meeting ID for external app API',
    'studio' => 'false',
   ),
  'duration_hours' =>
  array (
    'name' => 'duration_hours',
    'vname' => 'LBL_DURATION_HOURS',
    'type' => 'int',
    'len' => '2',
    'comment' => 'Duration (hours)',
    'importable' => 'required',
    'required' => true,
  ),
  'duration_minutes' =>
  array (
    'name' => 'duration_minutes',
    'vname' => 'LBL_DURATION_MINUTES',
    'type' => 'int',
    'group'=>'duration_hours',
    'function' => array('name'=>'getDurationMinutesOptions', 'returns'=>'html', 'include'=>'modules/Calls/CallHelper.php'),
    'len' => '2',
    'comment' => 'Duration (minutes)'
  ),
  'date_start' =>
  array (
    'name' => 'date_start',
    'vname' => 'LBL_DATE',
    'type' => 'datetimecombo',
    'dbType' => 'datetime',
    'comment' => 'Date of start of meeting',
    'importable' => 'required',
    'required' => true,
    'enable_range_search' => true,
  ),

  'date_end' =>
  array (
    'name' => 'date_end',
    'vname' => 'LBL_DATE_END',
    'type' => 'datetime',
    'massupdate'=>false,
    'comment' => 'Date meeting ends',
    'enable_range_search' => true,
  ),
  'parent_type' =>
  array (
    'name' => 'parent_type',
    'vname'=>'LBL_LIST_RELATED_TO',
    'type' =>'parent_type',
    'dbType' => 'varchar',
    'group'=>'parent_name',
    'len' => 100,
    'comment' => 'Module meeting is associated with'
  ),
  'status' =>
  array (
    'name' => 'status',
    'vname' => 'LBL_STATUS',
    'type' => 'enum',
    'len' => 100,
    'options' => 'meeting_status_dom',
    'comment' => 'Meeting status (ex: Planned, Held, Not held)',
    'default' => 'Planned',
  ),
  'type' =>
   array (
     'name' => 'type',
     'vname' => 'LBL_TYPE',
     'type' => 'enum',
     'len' => 255,
     'function' => 'getMeetingsExternalApiDropDown',
     'comment' => 'Meeting type (ex: WebEx, Other)',
     'options' => 'eapm_list',
     'default'	=> 'Sugar',
     'massupdate' => false,
   	 'studio' => 'false',
   ),
  // Bug 24170 - Added only to allow the sidequickcreate form to work correctly
  'direction' =>
  array (
    'name' => 'direction',
    'vname' => 'LBL_DIRECTION',
    'type' => 'enum',
    'len' => 100,
    'options' => 'call_direction_dom',
    'comment' => 'Indicates whether call is inbound or outbound',
    'source' => 'non-db',
    'importable' => 'false',
    'massupdate'=>false,
    'reportable'=>false,
	'studio' => 'false',
  ),
  'parent_id' =>
  array (
    'name' => 'parent_id',
    'vname'=>'LBL_LIST_RELATED_TO',
    'type' => 'id',
    'group'=>'parent_name',
    'reportable'=>false,
    'comment' => 'ID of item indicated by parent_type'
  ),
  'reminder_checked'=>array(
    'name' => 'reminder_checked',
    'vname' => 'LBL_REMINDER',
    'type' => 'bool',
    'source' => 'non-db',
    'comment' => 'checkbox indicating whether or not the reminder value is set (Meta-data only)',
    'massupdate'=>false,
   ),

  'reminder_time' =>
  array (
    'name' => 'reminder_time',
    'vname' => 'LBL_REMINDER_TIME',
    'type' => 'int',
    'function' => array('name'=>'getReminderTime', 'returns'=>'html', 'include'=>'modules/Calls/CallHelper.php', 'onListView'=>true ),
    'reportable' => false,
    'default'=>-1,
    'comment' => 'Specifies when a reminder alert should be issued; -1 means no alert; otherwise the number of seconds prior to the start'
  ),
   'outlook_id' =>
  array (
    'name' => 'outlook_id',
    'vname' => 'LBL_OUTLOOK_ID',
    'type' => 'varchar',
    'len' => '255',
    'reportable' => false,
    'comment' => 'When the Sugar Plug-in for Microsoft Outlook syncs an Outlook appointment, this is the Outlook appointment item ID'
  ),

  'contact_name' =>
  array (
    'name' => 'contact_name',
    'rname' => 'last_name',
    'db_concat_fields'=> array(0=>'first_name', 1=>'last_name'),
    'id_name' => 'contact_id',
    'massupdate' => false,
    'vname' => 'LBL_CONTACT_NAME',
    'type' => 'relate',
    'link'=>'contacts',
    'table' => 'contacts',
    'isnull' => 'true',
    'module' => 'Contacts',
    'join_name' => 'contacts',
    'dbType' => 'varchar',
    'source'=>'non-db',
    'len' => 36,
  	'studio' => 'false',
	),

  'contacts' =>
  array (
  	'name' => 'contacts',
    'type' => 'link',
    'relationship' => 'meetings_contacts',
    'source'=>'non-db',
		'vname'=>'LBL_CONTACTS',
  ),
   'parent_name'=>
 	array(
		'name'=> 'parent_name',
		'parent_type'=>'record_type_display' ,
		'type_name'=>'parent_type',
		'id_name'=>'parent_id',
		'vname'=>'LBL_LIST_RELATED_TO',
		'type'=>'parent',
		'group'=>'parent_name',
		'source'=>'non-db',
		'options'=> 'parent_type_display',
		),
  'users' =>
  array (
  	'name' => 'users',
    'type' => 'link',
    'relationship' => 'meetings_users',
    'source'=>'non-db',
		'vname'=>'LBL_USERS',
  ),
  'accounts' =>
  array (
  	'name' => 'accounts',
    'type' => 'link',
    'relationship' => 'account_meetings',
    'source'=>'non-db',
		'vname'=>'LBL_ACCOUNT',
  ),
  'leads' =>
  array (
    'name' => 'leads',
    'type' => 'link',
    'relationship' => 'meetings_leads',
    'source'=>'non-db',
        'vname'=>'LBL_LEADS',
  ),
  'opportunity' =>
  array (
  	'name' => 'opportunity',
    'type' => 'link',
    'relationship' => 'opportunity_meetings',
    'source'=>'non-db',
		'vname'=>'LBL_OPPORTUNITY',
  ),
  'case' =>
  array (
  	'name' => 'case',
    'type' => 'link',
    'relationship' => 'case_meetings',
    'source'=>'non-db',
		'vname'=>'LBL_CASE',
  ),
    'notes' =>
  array (
  	'name' => 'notes',
    'type' => 'link',
    'relationship' => 'meetings_notes',
    'module'=>'Notes',
    'bean_name'=>'Note',
    'source'=>'non-db',
		'vname'=>'LBL_NOTES',
  ),
	'contact_id' => array(
		'name' => 'contact_id',
		'type' => 'id',
		'source' => 'non-db',
	),
),
 'relationships' => array (
	  'meetings_assigned_user' =>
   array('lhs_module'=> 'Users', 'lhs_table'=> 'users', 'lhs_key' => 'id',
   'rhs_module'=> 'Meetings', 'rhs_table'=> 'meetings', 'rhs_key' => 'assigned_user_id',
   'relationship_type'=>'one-to-many')

   ,'meetings_modified_user' =>
   array('lhs_module'=> 'Users', 'lhs_table'=> 'users', 'lhs_key' => 'id',
   'rhs_module'=> 'Meetings', 'rhs_table'=> 'meetings', 'rhs_key' => 'modified_user_id',
   'relationship_type'=>'one-to-many')

   ,'meetings_created_by' =>
   array('lhs_module'=> 'Users', 'lhs_table'=> 'users', 'lhs_key' => 'id',
   'rhs_module'=> 'Meetings', 'rhs_table'=> 'meetings', 'rhs_key' => 'created_by',
   'relationship_type'=>'one-to-many')

	,'meetings_notes' => array('lhs_module'=> 'Meetings', 'lhs_table'=> 'meetings', 'lhs_key' => 'id',
							  'rhs_module'=> 'Notes', 'rhs_table'=> 'notes', 'rhs_key' => 'parent_id',
							  'relationship_type'=>'one-to-many', 'relationship_role_column'=>'parent_type',
							  'relationship_role_column_value'=>'Meetings')
	)

                                                      , 'indices' => array (
       array('name' =>'idx_mtg_name', 'type'=>'index', 'fields'=>array('name')),
       array('name' =>'idx_meet_par_del', 'type'=>'index', 'fields'=>array('parent_id','parent_type','deleted')),
       array('name' => 'idx_meet_stat_del', 'type' => 'index', 'fields'=> array('assigned_user_id', 'status', 'deleted')),

                                                   )
//This enables optimistic locking for Saves From EditView
	,'optimistic_locking'=>true,
                            );

VardefManager::createVardef('Meetings','Meeting', array('default', 'assignable',
));
?>
