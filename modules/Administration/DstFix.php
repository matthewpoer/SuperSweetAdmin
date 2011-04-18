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


global $app_strings;
global $app_list_strings;
global $mod_strings;
global $theme;
global $currentModule;
global $gridline;
global $timedate;
global $current_user;
global $db;

if ($db->dbType == 'oci8') {
	echo "<BR>";
	echo "<p>".$mod_strings['ERR_NOT_FOR_ORACLE']."</p>";
	echo "<BR>";
	sugar_die('');
}
if ($db->dbType == 'mssql') {
    echo "<BR>";
    echo "<p>".$mod_strings['ERR_NOT_FOR_MSSQL']."</p>";
    echo "<BR>";
    sugar_die('');
}



$display = '';
if(empty($db)) {

	$db = DBManagerFactory::getInstance();
}

// check if this fix has been applied already
$qDone = "SELECT * FROM versions WHERE name = 'DST Fix'";
$rDone = $db->query($qDone);
$rowsDone = $db->getRowCount($rDone);
if($rowsDone > 0) {
	$done = true;
} else {
	$done = false;
}

// some inits:
$disabled = 'DISABLED';
$confirmed = 'false';

// apply the fix
if(!empty($_REQUEST['confirmed']) && $_REQUEST['confirmed'] == true) {
	// blowaway vCal server cache
	$qvCal = "TRUNCATE vcals";
	$rvCal = $db->query($qvCal);

	// disable refresh double-ups
	$rDblCheck = $db->query($qDone);
	$rowsDblCheck = $db->getRowCount($rDblCheck);
	if($rowsDblCheck < 1) {

		// majed's sql generation
		$tables = array(
			'calls'=>array(
						'date_start'=>'time_start',
					),
			'meetings'=>array(
						'date_start'=>'time_start',
					),
			'tasks'=>array(
						'date_due'=>'time_due',
					),
			'project_task'=>array(
						'date_due'=>'time_due',
					),
			'email_marketing'=>array(
						'date_start'=>'time_start',
					),
			'emailman'=>array(
						'send_date_time'=>'datetime',
					)
		);

		$zone = $_REQUEST['server_timezone'];
		$startyear = 2004;
		$maxyear = 2014;
		$date_modified = $timedate->nowDb();
		$display = '';

		foreach($tables as $table_name =>$table) {

			//$display .=  '<B>'. $table_name . '</b><BR>';
			$year = $startyear;

			for($year = $startyear; $year <= $maxyear; $year++) {
				$range = $timedate->getDSTRange($year,$timezones[$zone]);
				$startDateTime = explode(' ',$range['start']);
				$endDateTime = explode(' ',$range['end']);

				if($range) {
					if( strtotime($range['start']) < strtotime($range['end'])) {
						foreach($table as $date=>$time) {
							$interval='PLUSMINUS INTERVAL 3600 second';
							if($time != 'datetime'){
								if ( ( $db->dbType == 'mysql' ) or ( $db->dbType == 'oci8' ) )
								{
									$field = "CONCAT($table_name.$date,' ', $table_name.$time)";
								}
								if ( $db->dbType == 'mssql' )
								{
									$field = "$table_name.$date + ' ' + $table_name.$time";
								}
								$updateBase= "UPDATE  $table_name SET date_modified='$date_modified', $table_name.$date=LEFT($field $interval,10),";
								$updateBase .= " $table_name.$time=RIGHT($field $interval,8)";

							}else{
								$field = "$table_name.$date";
								$updateBase = "UPDATE $table_name SET  date_modified='$date_modified', $table_name.$date = $table_name.$date $interval";
							}
							//BEGIN DATE MODIFIED IN DST WITH DATE OUT DST
							$update = str_replace('PLUSMINUS', '+', $updateBase);
							$queryInDST = $update ."
											WHERE
											$table_name.date_modified >= '{$range['start']}' AND $table_name.date_modified < '{$range['end']}'
											AND ( $field < '{$range['start']}'  OR $field >= '{$range['end']}' )";

							$result = $db->query($queryInDST);
							$count = $db->getAffectedRowCount();
							//$display .= "$year - Records updated with date modified in DST with date out of DST: $count <br>";
							//BEGIN DATE MODIFIED OUT DST WITH DATE IN DST
							$update = str_replace('PLUSMINUS', '-', $updateBase);
							$queryOutDST =  $update ."
											WHERE
											( $table_name.date_modified < '{$range['start']}' OR $table_name.date_modified >= '{$range['end']}' )
											AND $field >= '{$range['start']}' AND $field < '{$range['end']}' ";

							$result = $db->query($queryOutDST);
							$count = $db->getAffectedRowCount();
							//$display .= "$year - Records updated with date modified out of DST with date in DST: $count <br>";
						}
					}else{

						foreach($table as $date=>$time){
							$interval='PLUSMINUS INTERVAL 3600 second';
							if($time != 'datetime'){

								if ( ( $this->db->dbType == 'mysql' ) or ( $this->db->dbType == 'oci8' ) )
								{
									$field = "CONCAT($table_name.$date,' ', $table_name.$time)";
								}
								if ( $this->db->dbType == 'mssql' )
								{
									$field = "$table_name.$date + ' ' + $table_name.$time";
								}
									$updateBase= "UPDATE  $table_name SET $table_name.$date=LEFT($field $interval,10),";
									$updateBase .= " $table_name.$time=RIGHT($field $interval,8)";

							}else{
								$field = "$table_name.$date";
								$updateBase = "UPDATE $table_name SET $table_name.$date = $table_name.$date $interval";
							}


							//BEGIN DATE MODIFIED IN DST WITH DATE OUT OF DST
							$update = str_replace('PLUSMINUS', '+', $updateBase);
							$queryInDST =  $update ."
											WHERE
											($table_name.date_modified >= '{$range['start']}' OR $table_name.date_modified < '{$range['end']}' )
											AND $field < '{$range['start']}'  AND $field >= '{$range['end']}'";

							$result = $db->query($queryInDST);
							$count = $db->getAffectedRowCount();
							//$display .= "$year - Records updated with date modified in DST with date out of DST: $count <br>";

							//BEGIN DATE MODIFIED OUT DST WITH DATE IN DST
							$update = str_replace('PLUSMINUS', '-', $updateBase);
							$queryOutDST =  $update ."
											WHERE
											($table_name.date_modified < '{$range['start']}' AND $table_name.date_modified >= '{$range['end']}' )
											 AND
											 ($field >= '{$range['start']}' OR $field < '{$range['end']}' )";



						}

						$result = $db->query($queryOutDST);
						$count = $db->getAffectedRowCount();
						//$display .= "$year - Records updated with date modified out of DST with date in DST: $count <br>";
					}
				}
			} // end outer forloop
		}// end foreach loop


	}
	$display .= "<br><b>".$mod_strings['LBL_DST_FIX_DONE_DESC']."</b>";
} elseif(!$done) {  // show primary screen
	$disabled = "";
	$confirmed = 'true';
	require_once('include/timezone/timezones.php');
	global $timezones;
	$timezoneOptions = '';
	ksort($timezones);
	if(!isset($defaultServerZone)){
		$defaultServerZone = TimeDate::guessTimezone(0);
	}
	foreach($timezones as $key => $value) {
		if(!empty($value['dstOffset'])) {
			$dst = " (+DST)";
		} else {
			$dst = "";
		}
		if($key == $defaultServerZone){
			$selected = 'selected';
		}else{
			$selected = '';
		}
		$gmtOffset = ($value['gmtOffset'] / 60);
		if(!strstr($gmtOffset,'-')) {
			$gmtOffset = "+".$gmtOffset;
		}
		$timezoneOptions .= "<option value='$key'".$selected.">".str_replace(array('_','North'), array(' ', 'N.'),$key). " (GMT".$gmtOffset.") ".$dst."</option>";
	}

	// descriptions and assumptions
	$display = "

		<tr>
			<td width=\"20%\" class=\"tabDetailViewDL2\" nowrap align='right'><slot>
				".$mod_strings['LBL_DST_FIX_TARGET']."
			</slot></td>
			<td class=\"tabDetailViewDF2\"><slot>
				".$mod_strings['LBL_APPLY_DST_FIX_DESC']."
			</slot></td>
		</tr>
		<tr>
			<td width=\"20%\" class=\"tabDetailViewDL2\" nowrap align='right'><slot>
				".$mod_strings['LBL_DST_BEFORE']."
			</slot></td>
			<td class=\"tabDetailViewDF2\"><slot>
				".$mod_strings['LBL_DST_BEFORE_DESC']."
			</slot></td>
		</tr>
		<tr>
			<td width=\"20%\" class=\"tabDetailViewDL2\" nowrap align='right'><slot>
				".$mod_strings['LBL_DST_FIX_CONFIRM']."
			</slot></td>
			<td class=\"tabDetailViewDF2\"><slot>
				".$mod_strings['LBL_DST_FIX_CONFIRM_DESC']."
			</slot></td>
		</tr>
		<tr>
			<td width=\"20%\" class=\"tabDetailViewDL2\" nowrap align='right'><slot>

			</slot></td>
			<td class=\"tabDetailViewDF2\"><slot>
				<table cellpadding='0' cellspacing='0' border='0'>
					<tr>
						<td class=\"tabDetailViewDF2\"><slot>
							<b>".$mod_strings['LBL_DST_CURRENT_SERVER_TIME']."</b>
						</td>
						<td class=\"tabDetailViewDF2\"><slot>
							".$timedate->to_display_time($timedate->nowDb(), true, false)."
						</td>
					<tr>
					</tr>
						<td class=\"tabDetailViewDF2\"><slot>
							<b>".$mod_strings['LBL_DST_CURRENT_SERVER_TIME_ZONE']."</b>
						</td>
						<td class=\"tabDetailViewDF2\"><slot>
							".date("T")."<br>
						</td>
					</tr>
					<tr>
						<td class=\"tabDetailViewDF2\"><slot>
							<b>".$mod_strings['LBL_DST_CURRENT_SERVER_TIME_ZONE_LOCALE']."</b>
						</td>
						<td class=\"tabDetailViewDF2\"><slot>
							<select name='server_timezone'>".$timezoneOptions."</select><br>
						</td>
					</tr>
				</table>
			</slot></td>
		</tr>";
} else { // fix has been applied - don't want to allow a 2nd pass
	$display = $mod_strings['LBL_DST_FIX_DONE_DESC'];
	$disabled = 'DISABLED';
	$confirmed = 'false';
}

if(!empty($_POST['upgrade'])){
	// enter row in versions table
	$qDst = "INSERT INTO versions VALUES ('".create_guid()."', 0, '".$timedate->nowDB()."', '".$timedate->nowDB()."', '".$current_user->id."', '".$current_user->id."', 'DST Fix', '3.5.1b', '3.5.1b')";
	$qRes = $db->query($qDst);
	// record server's time zone locale for future upgrades
	$qSTZ = "INSERT INTO config VALUES ('Update', 'server_timezone', '".$_REQUEST['server_timezone']."')";
	$rSTZ = $db->query($qSTZ);
	if(empty($_REQUEST['confirmed']) || $_REQUEST['confirmed'] == 'false') {
		$display = $mod_strings['LBL_DST_FIX_DONE_DESC'];
		$disabled = 'DISABLED';
		$confirmed = 'false';
	}
	unset($_SESSION['GMTO']);
}



echo getClassicModuleTitle($mod_strings['LBL_MODULE_NAME'], array($mod_strings['LBL_APPLY_DST_FIX']), true);

if(empty($disabled)){
?>
<h2>Step 1:</h2>
<table cellspacing="<?php echo $gridline;?>" class="other view">
<tr>
    <td scope="row" width="20%">
        <slot><?php echo $mod_strings['LBL_DST_FIX_USER']; ?></slot>
    </td>
    <td>
        <slot>
            <?php echo $mod_strings['LBL_DST_FIX_USER_TZ']; ?><br>
            <input type='button' class='button' value='<?php echo $mod_strings['LBL_DST_SET_USER_TZ']; ?>' onclick='document.location.href="index.php?module=Administration&action=updateTimezonePrefs"'>
        </slot>
    </td>
</tr>
</table>
<?php }?>
<p>
<form name='DstFix' action='index.php' method='POST'>
<input type='hidden' name='module' value='Administration'>
<input type='hidden' name='action' value='DstFix'>
<?php
if(empty($disabled)){
	echo "<h2>Step 2:</h2>";
}
?>
<table cellspacing="<?php echo $gridline;?>" class="other view">
<?php
echo $display;
 if(empty($disabled)){
    ?>
<tr>
    <td scope="row" width="20%">
        <slot><?php echo $mod_strings['LBL_DST_UPGRADE']; ?></slot>
    </td>
    <td>
        <slot>
            <input type='checkbox' name='confirmed' value='true' checked="checked" />
            <?php echo $mod_strings['LBL_DST_APPLY_FIX']; ?>
        </slot>
    </td>
</tr>
<?php } ?>
<tr>
    <td scope="row" width="20%"></td>
    <td>
        <slot>
<?php
if(empty($disabled)){
echo "<input ".$disabled." title='".$mod_strings['LBL_APPLY_DST_FIX']."' accessKey='".$app_strings['LBL_SAVE_BUTTON_KEY']."' class=\"button\" onclick=\"this.form.action.value='DstFix';\" type=\"submit\" name=\"upgrade\" value='".$mod_strings['LBL_APPLY_DST_FIX']."' >";
}else{
echo "<input title='".$app_strings['LBL_DONE_BUTTON_TITLE']."' accessKey='".$app_strings['LBL_DONE_BUTTON_KEY']."' class=\"button\" onclick=\"this.form.action.value='Upgrade'; this.form.module.value='Administration';\" type=\"submit\" name=\"done\" value='".$app_strings['LBL_DONE_BUTTON_LABEL']."'>";
}
?>
        </slot>
    </td>
</tr>
</table>
</form>
