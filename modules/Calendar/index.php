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

global $theme, $current_language, $mod_strings;


require_once('modules/Calendar/templates/templates_calendar.php');
require_once('modules/Calendar/Calendar.php');
setlocale( LC_TIME ,$current_language);
if(!ACLController::checkAccess('Calendar', 'list', true)){
	ACLController::displayNoAccess(true);
}

echo getClassicModuleTitle($mod_strings['LBL_MODULE_NAME'], array($mod_strings['LBL_MODULE_ACTION']), false);

if ( empty($_REQUEST['view']))
{
	$_REQUEST['view'] = 'day';
}

$date_arr = array();

if ( isset($_REQUEST['ts']))
{
	$date_arr['ts'] = $_REQUEST['ts'];
}

if ( isset($_REQUEST['day']))
{

	$date_arr['day'] = $_REQUEST['day'];
}

if ( isset($_REQUEST['month']))
{
	$date_arr['month'] = $_REQUEST['month'];
}

if ( isset($_REQUEST['week']))
{
	$date_arr['week'] = $_REQUEST['week'];
}

if ( isset($_REQUEST['year']))
{
	if ($_REQUEST['year'] > 2037 || $_REQUEST['year'] < 1970)
	{
		print("Sorry, calendar cannot handle the year you requested");
		print("<br>Year must be between 1970 and 2037");
		exit;
	}
	$date_arr['year'] = $_REQUEST['year'];
}

// today adjusted for user's timezone
$args['calendar'] = new Calendar($_REQUEST['view'], $date_arr);
if ($_REQUEST['view'] == 'day' || $_REQUEST['view'] == 'week' || $_REQUEST['view'] == 'month')
{
	global $current_user;
	$args['calendar']->add_activities($current_user);
}
$args['view'] = $_REQUEST['view'];

?>
<script type="text/javascript" language="JavaScript">
<!-- Begin
function toggleDisplay(id){

	if(this.document.getElementById( id).style.display=='none'){
		this.document.getElementById( id).style.display='inline'
		if(this.document.getElementById(id+"link") != undefined){
			this.document.getElementById(id+"link").style.display='none';
		}
	}else{
		this.document.getElementById(  id).style.display='none'
		if(this.document.getElementById(id+"link") != undefined){
			this.document.getElementById(id+"link").style.display='inline';
		}
	}
}
		//  End -->
	</script>
<table width="100%" border="0" cellpadding="0" cellspacing="0" id="calendarModule">
<tr>
<td valign=top width="70%">
<?php template_calendar($args); ?>
</td>
<?php if ($_REQUEST['view'] == 'day') { ?>
<td valign=top width="30%">
<?php include("modules/Calendar/TasksListView.php") ;?>
</td>
<?php } ?>
</tr>
</table>
