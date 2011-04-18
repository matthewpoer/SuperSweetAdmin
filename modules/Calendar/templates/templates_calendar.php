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

/////////////////////////////////
// template
/////////////////////////////////
global $timedate;
function template_cal_tabs($args) {
	global $mod_strings, $sugar_version, $sugar_config;
	$tabs = array('day', 'week', 'month', 'year', 'shared');

	if($args['view'] != 'day') {
		echo '<script type="text/javascript" src="' . getJSPath('include/javascript/sugar_grp_overlib.js') . '"></script>
			<div id="overDiv" style="position:absolute; visibility:hidden; z-index:1000;"></div>';
	}

?>
<table id="cal_tabs" width="100%" border="0" cellpadding="0" cellspacing="0">
<tr>
<td>
<?php

	$time_arr = array();

	foreach($tabs as $tab) {
?>
<input type="button" <?php if($args['view'] == $tab) {?>selected="selected" <?php } ?> value=" <?php echo $mod_strings["LBL_".$args['calendar']->get_view_name($tab)]; ?> " title="<?php echo $mod_strings["LBL_".$args['calendar']->get_view_name($tab)]; ?>" onclick="window.location.href='index.php?module=Calendar&action=index&view=<?php echo $tab; ?><?php echo $args['calendar']->date_time->get_date_str(); ?>'">&nbsp;
<?php } ?>
</td>
</tr>
</table>

<?php

	}

	/////////////////////////////////
	// template
	/////////////////////////////////
	function template_cal_month_slice($args) {
?>
<?php

		template_echo_slice_date($args);
		$newargs = array();
		$cal_arr = array();
		$cal_arr['month'] = $args['slice']->start_time->month;
		$cal_arr['year'] = $args['slice']->start_time->year;
		$newargs['calendar'] = new Calendar('month', $cal_arr);
		$newargs['calendar']->show_only_current_slice = true;
		$newargs['calendar']->show_activities = false;
		$newargs['calendar']->show_week_on_month_view = false;
		template_calendar_month($newargs);
?>
<?php

	}

	/////////////////////////////////
	// template
	/////////////////////////////////
	function template_echo_slice_activities($args) {
		global $app_list_strings, $current_user, $app_strings;

		$count = 0;

		if(empty($args['slice']->acts_arr[$current_user->id])) {
			return;
		}
		foreach($args['slice']->acts_arr[$current_user->id] as $act) {
			$fields = array();
			foreach($act->sugar_bean->field_name_map as $field) {
					if(!empty($act->sugar_bean->$field['name']))
						$fields[strtoupper($field['name'])] = $act->sugar_bean->$field['name'];
			}
			
			$extra = "id=\"adspan_{$act->sugar_bean->id}\" "
					. "onmouseover=\"return SUGAR.util.getAdditionalDetails( '{$act->sugar_bean->module_dir}','{$act->sugar_bean->id}', 'adspan_{$act->sugar_bean->id}');\" "
					. "onmouseout=\"return SUGAR.util.clearAdditionalDetailsCall()\" onmouseout=\"return nd(1000);\" ";


			$count ++;
			echo '<div style="margin-top: 1px;"><table cellpadding="0" cellspacing="0"
					border="0" width="100%"><tr>';
			if($act->sugar_bean->object_name == 'Call') {
			    if ( isset($app_list_strings['call_status_dom'][$act->sugar_bean->status]) ) {
			        $callStatus = $app_list_strings['call_status_dom'][$act->sugar_bean->status];
			    }
			    else {
			        $callStatus = '';
			    }
				echo '<td>' . SugarThemeRegistry::current()->getImage('Calls','alt="'.$app_list_strings['call_status_dom'][$act->sugar_bean->status].': '.$act->sugar_bean->name.'"') . '</td>
						<td width="100%"><a ' . $extra . ' href="index.php?module=Calls&action=DetailView&record=' .
						$act->sugar_bean->id . '">' . $callStatus . ': ' . $act->sugar_bean->name . '</a></td>';
			} else if($act->sugar_bean->object_name == 'Meeting') {
				if ( isset($app_list_strings['meeting_status_dom'][$act->sugar_bean->status]) ) {
			        $meetingStatus = $app_list_strings['meeting_status_dom'][$act->sugar_bean->status];
			    }
			    else {
			        $meetingStatus = '';
			    }
				$out = '<td>' . SugarThemeRegistry::current()->getImage('Meetings','alt="'.$app_list_strings['meeting_status_dom'][$act->sugar_bean->status].': '.$act->sugar_bean->name.'"') . '</td>
						<td width="100%"><a ' . $extra . ' href="index.php?module=Meetings&action=DetailView&record=' .
						$act->sugar_bean->id . '">' . $meetingStatus . ': ' . $act->sugar_bean->name .'</a>';

				///////////////////////////////////////////////////////////////
				////	MEETING INTEGRATION
				if(method_exists($act->sugar_bean, 'hasIntegratedMeeting')) {
					if($act->sugar_bean->hasIntegratedMeeting()) {
						$out .= $act->sugar_bean->miIcon;
					}
				}
				////	END MEETING INTEGRATION
				///////////////////////////////////////////////////////////////
				$out .= "</td>";
				echo $out;

			} else if($act->sugar_bean->object_name == 'Task') {
				echo '<td>' .  SugarThemeRegistry::current()->getImage('Tasks','alt="'.$app_list_strings['task_status_dom'][$act->sugar_bean->status].': '.$act->sugar_bean->name.'"') . '</td>
						<td width="100%"><a ' . $extra . ' href="index.php?module=Tasks&action=DetailView&record=' . $act->sugar_bean->id . '">'.$app_list_strings['task_status_dom'][$fields['STATUS']].': ' . $act->sugar_bean->name . '</a></td>';
			}
			echo '</tr></table><div>';
		}
	}

	function template_echo_slice_activities_shared($args) {
		global $app_list_strings;

		global $shared_user, $timedate;
		$count = 0;
		if(empty($args['slice']->acts_arr[$shared_user->id])) {
			return;
		}

		$out = '';

		foreach($args['slice']->acts_arr[$shared_user->id] as $act) {
			$count ++;
			echo "<div style=\"margin-top: 1px;\">
			<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\">";

			if($act->sugar_bean->object_name == 'Call') {
				echo "<tr><td>" . SugarThemeRegistry::current()->getImage('Calls','alt=\"'.$app_list_strings['call_status_dom'][$act->sugar_bean->status].': '.$act->sugar_bean->name.'\"') . "</td>";

				if(empty($act->sugar_bean->name)) {
					echo "<td width=\"100%\">";
					echo $timedate->getTimePart($act->sugar_bean->date_start);
					echo "</td></tr>";
				} else {
					echo "<td width=\"100%\">
						<a href=\"index.php?module=Calls&action=DetailView&record=".
						$act->sugar_bean->id."\">".
						$app_list_strings['call_status_dom'][$act->sugar_bean->status].": ".
						$act->sugar_bean->name."<br>(".
						$timedate->getTimePart($act->sugar_bean->date_start).")</a></td></tr>";
				}
			} else if($act->sugar_bean->object_name == 'Meeting') {
				echo "<td>".
					SugarThemeRegistry::current()->getImage('Meetings','alt=\"'.$app_list_strings['meeting_status_dom'][$act->sugar_bean->status].': '.$act->sugar_bean->name.'\"');
				echo "</td>";

				if(empty($act->sugar_bean->name)) {
					echo "<td width=\"100%\">".
						$timedate->getTimePart($act->sugar_bean->date_start);
					echo "</td></tr>";
				} else {
					echo "<td width=\"100%\">
						<a href=\"index.php?module=Meetings&action=DetailView&record=".
						$act->sugar_bean->id."\">".
						$app_list_strings['meeting_status_dom'][$act->sugar_bean->status].":".
						$act->sugar_bean->name."<br>(".
						$timedate->getTimePart($act->sugar_bean->date_start).")</a>";

					// MEETING INTEGRATION
					if($act->sugar_bean->hasIntegratedMeeting()) {
						$out .= $act->sugar_bean->miIcon;
					}
					// END MEETING INTEGRATION

					$out .= "</td></tr>";
					echo $out;
				}
			} else if($act->sugar_bean->object_name == 'Task') {
				echo "<td>".
					SugarThemeRegistry::current()->getImage('Tasks','alt="'.$app_list_strings['task_status_dom'][$act->sugar_bean->status].': '.$act->sugar_bean->name.'"');
				echo "</td>";

				if(empty($act->sugar_bean->name)) {
					echo "<td width=\"100%\">".
						$timedate->getTimePart($act->sugar_bean->date_due);
					echo "</td></tr>";
				} else {
					echo "<td width=\"100%\">
						<a href=\"index.php?module=Tasks&action=DetailView&record=".
						$act->sugar_bean->id."\">".
						$app_list_strings['task_status_dom'][$act->sugar_bean->status].': '.$act->sugar_bean->name."<br>(".
						$timedate->getTimePart($act->sugar_bean->date_due).")</a></td></tr>";
				}
			}
			echo "</table></div>";
		}
	}

	/////////////////////////////////
	// template
	/////////////////////////////////
	function template_cal_day_slice($args) {
		/*
			echo "cale:".$args['calendar']->view;
			echo "cal1:".$args['calendar']->date_time->month;
			echo "cal3:".$args['slice']->date_time->month;
		*/
		if($args['calendar']->show_only_current_slice == false || $args['calendar']->date_time->month == $args['slice']->start_time->month) {
			template_echo_slice_date($args);

			if($args['calendar']->show_activities == true) {
				template_echo_slice_activities($args);
			}

		}
	}

	/////////////////////////////////
	// template
	/////////////////////////////////
	function template_calendar($args) {
		global $timedate;
		if(isset($args['size']) && $args['size'] == 'small') {
			$args['calendar']->show_activities = false;
			$args['calendar']->show_week_on_month_view = false;
		}

		$newargs = array();
		$newargs['view'] = $args['view'];
		$newargs['calendar'] = $args['calendar'];
		if(!isset($args['size']) || $args['size'] != 'small') {
			template_cal_tabs($newargs);
		}

		if(isset($_REQUEST['view']) && $_REQUEST['view'] == 'shared') {
			global $ids;
			global $current_user;
			global $mod_strings;
			global $app_list_strings, $current_language, $currentModule, $action, $app_strings;
			$current_module_strings = return_module_language($current_language, 'Calendar');

			$ids = array();
			$user_ids = $current_user->getPreference('shared_ids');
			//get list of user ids for which to display data
			if(!empty($user_ids) && count($user_ids) != 0 && !isset($_REQUEST['shared_ids'])) {
				$ids = $user_ids;
			}
			elseif(isset($_REQUEST['shared_ids']) && count($_REQUEST['shared_ids']) > 0) {
				$ids = $_REQUEST['shared_ids'];
				$current_user->setPreference('shared_ids', $_REQUEST['shared_ids']);
			} else {
				//$ids = get_user_array(false);
				//$ids = array_keys($ids);
				$ids = array($current_user->id);

			}


			//get team id for which to display user list

			$tools = '<div align="right"><a href="index.php?module='.$currentModule.'&action='.$action.'&view=shared" class="tabFormAdvLink">&nbsp;<a href="javascript: toggleDisplay(\'shared_cal_edit\');" class="tabFormAdvLink">'.SugarThemeRegistry::current()->getImage('edit', 'alt="'.$current_module_strings['LBL_EDIT'].'"  border="0"  align="absmiddle"').'&nbsp;'.$current_module_strings['LBL_EDIT'].'</a></div>';

			echo get_form_header($mod_strings['LBL_SHARED_CAL_TITLE'], $tools, false);
			if(empty($_SESSION['shared_ids']))
				$_SESSION['shared_ids'] = "";

			echo "
			<script language=\"javascript\">
			function up(name) {
				var td = document.getElementById(name+'_td');
				var obj = td.getElementsByTagName('select')[0];
				obj =(typeof obj == \"string\") ? document.getElementById(obj) : obj;
				if(obj.tagName.toLowerCase() != \"select\" && obj.length < 2)
					return false;
				var sel = new Array();

				for(i=0; i<obj.length; i++) {
					if(obj[i].selected == true) {
						sel[sel.length] = i;
					}
				}
				for(i in sel) {
					if(sel[i] != 0 && !obj[sel[i]-1].selected) {
						var tmp = new Array(obj[sel[i]-1].text, obj[sel[i]-1].value);
						obj[sel[i]-1].text = obj[sel[i]].text;
						obj[sel[i]-1].value = obj[sel[i]].value;
						obj[sel[i]].text = tmp[0];
						obj[sel[i]].value = tmp[1];
						obj[sel[i]-1].selected = true;
						obj[sel[i]].selected = false;
					}
				}
			}

			function down(name) {
				var td = document.getElementById(name+'_td');
				var obj = td.getElementsByTagName('select')[0];
				if(obj.tagName.toLowerCase() != \"select\" && obj.length < 2)
					return false;
				var sel = new Array();
				for(i=obj.length-1; i>-1; i--) {
					if(obj[i].selected == true) {
						sel[sel.length] = i;
					}
				}
				for(i in sel) {
					if(sel[i] != obj.length-1 && !obj[sel[i]+1].selected) {
						var tmp = new Array(obj[sel[i]+1].text, obj[sel[i]+1].value);
						obj[sel[i]+1].text = obj[sel[i]].text;
						obj[sel[i]+1].value = obj[sel[i]].value;
						obj[sel[i]].text = tmp[0];
						obj[sel[i]].value = tmp[1];
						obj[sel[i]+1].selected = true;
						obj[sel[i]].selected = false;
					}
				}
			}
			</script>

			<div id='shared_cal_edit' style='display: none;'>
			<form name='shared_cal' action=\"index.php\" method=\"post\" >
			<input type=\"hidden\" name=\"module\" value=\"".$currentModule."\">
			<input type=\"hidden\" name=\"action\" value=\"".$action."\">
			<input type=\"hidden\" name=\"view\" value=\"shared\">
			<input type=\"hidden\" name=\"edit\" value=\"0\">
			<table cellpadding=\"0\" cellspacing=\"3\" border=\"0\" align=\"center\">
			<tr><th valign=\"top\"  align=\"center\" colspan=\"2\">
			";

			echo $current_module_strings['LBL_SELECT_USERS'];
			echo "
			</th>
			</tr>
			<tr><td valign=\"top\">";
			echo "
            </td><td valign=\"top\">

			<table cellpadding=\"1\" cellspacing=\"1\" border=\"0\" class=\"edit view\" align=\"center\">
			<tr>
				<td valign='top' nowrap><b>".$current_module_strings['LBL_USERS']."</b></td>
				<td valign='top' id=\"shared_ids_td\"><select id=\"shared_ids\" name=\"shared_ids[]\" multiple size='3'>";

				echo get_select_options_with_id(get_user_array(false), $ids);

			echo "	</select></td>
				<td><a onclick=\"up('shared_ids');\">".SugarThemeRegistry::current()->getImage('uparrow_big', 'border="0" style="margin-bottom: 1px;" alt="'.$app_strings['LBL_SORT'].'"')."</a><br>
				<a onclick=\"down('shared_ids');\">".SugarThemeRegistry::current()->getImage('downarrow_big', 'border="0" style="margin-top: 1px;"  alt="'.$app_strings['LBL_SORT'].'"')."</a></td>
			</tr>
			<tr>";
			echo "<td align=\"right\" colspan=\"2\"><input class=\"button\" type=\"submit\" title=\"".$app_strings['LBL_SELECT_BUTTON_TITLE']."\" accessKey=\"".$app_strings['LBL_SELECT_BUTTON_KEY']."\" value=\"".$app_strings['LBL_SELECT_BUTTON_LABEL']."\" /><input class=\"button\" onClick=\"javascript: toggleDisplay('shared_cal_edit');\" type=\"button\" title=\"".$app_strings['LBL_CANCEL_BUTTON_TITLE']."\" accessKey=\"".$app_strings['LBL_CANCEL_BUTTON_KEY']."\" value=\"".$app_strings['LBL_CANCEL_BUTTON_LABEL']."\"/></td>
			</tr>
			</table>
			</td></tr>
			</table>
			</form>";

		} // end "shared" view

		echo "</div></p>";

		if(isset($_REQUEST['edit']) && $_REQUEST['edit'])
			echo " <script language=\"javascript\"> toggleDisplay('shared_cal_edit'); </script>";

		echo "
		<table id=\"daily_cal_table_outside\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"monthBox\">
		<tr>
		<td>
		  <table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"monthHeader\">
		  <tr>
		  <td width=\"1%\" nowrap>";

		if(!isset($args['size']) || $args['size'] != 'small') {
			template_get_previous_calendar($args);
		}

		echo "
		  </td>
		  <td width=\" 98 % \" align=center scope='row'>";

		if(isset( $args['size']) && $args['size'] = 'small')
		{
		?>
		<a style="text-decoration: none;"
			href="index.php?module=Calendar&action=index&view=month<?php echo $args['calendar']->date_time->get_date_str();?>">
<?php

	}
?>
<h3>
<?php template_echo_date_info($args['view'],$args['calendar']->date_time); ?>
</h3>
<?php

	if(isset($args['size']) && $args['size'] = 'small') {
		echo "</a>";
	}
?>

  </td>
  <td align="right" width="1%" nowrap><?php


	if(!isset($args['size']) || $args['size'] != 'small') {
		template_get_next_calendar($args);
	}
?> </td>
  </tr>
  </table>
</td>
</tr>
<tr>
<td class="monthCalBody">
<?php

	if($args['calendar']->view == 'month') {
		template_calendar_month($args);
	} else
		if($args['calendar']->view == 'year') {
			template_calendar_year($args);
		} else
			if($args['calendar']->view == 'shared') {

				global $current_user, $shared_user;
				$shared_args = array();
				foreach($args as $key => $val) {
					$shared_args[$key] = $val;
				}
				$shared_args['calendar'] = $args['calendar'];
				$shared_user = new User();
				foreach($ids as $member) {
					$shared_user->retrieve($member);
					$shared_args['calendar']->show_tasks = true;
					$shared_args['calendar']->add_activities($shared_user);
					$shared_args['show_link'] = 'off';
					if(($shared_user->id == $current_user->id))
						$shared_args['show_link'] = 'on';
					echo '<h5 class="calSharedUser">'.$shared_user->full_name.'</h5>';
					template_calendar_horizontal($shared_args);
				}
			} else {
				template_calendar_vertical($args);
			}
?>
</td>
</tr>
<tr>
<td>
  <table width="100%" cellspacing="0" cellpadding="0" class="monthFooter">
  <tr>
  <td width="50%"><?php template_get_previous_calendar($args); ?></td>
  <td align="right" width="50%"><?php template_get_next_calendar($args); ?></td>
  </tr>
  </table>

</td>
</tr>
</table>
<?php


}

function template_calendar_vertical($args) {
?>
  <table id="daily_cal_table" border="0" cellpadding="0" cellspacing="1" width="100%">
  <?php

	// need to change these values after we find out what activities
	// occur outside of these values
	$start_slice_idx = $args['calendar']->get_start_slice_idx();
	$end_slice_idx = $args['calendar']->get_end_slice_idx();
	$cur_slice_idx = 1;
	for($cur_slice_idx = $start_slice_idx; $cur_slice_idx <= $end_slice_idx; $cur_slice_idx ++) {
		$calendar = $args['calendar'];
		$args['slice'] = $calendar->slice_hash[$calendar->slices_arr[$cur_slice_idx]];
?>
  <tr>
  <?php template_cal_vertical_slice($args); ?>
  </tr>
  <?php

	}
?>
  </table>
<?php

}

function template_calendar_horizontal($args) {
	echo "<table id=\"daily_cal_table\" border=\"0\" cellpadding=\"0\" cellspacing=\"1\" width=\"100%\"><tr>";

	// need to change these values after we find out what activities
	// occur outside of these values
	$start_slice_idx = $args['calendar']->get_start_slice_idx();
	$end_slice_idx = $args['calendar']->get_end_slice_idx();
	$cur_slice_idx = 1;
	for($cur_slice_idx = $start_slice_idx; $cur_slice_idx <= $end_slice_idx; $cur_slice_idx ++) {
		$calendar = $args['calendar'];
		$args['slice'] = $calendar->slice_hash[$calendar->slices_arr[$cur_slice_idx]];

		template_cal_horizontal_slice($args);
	}

	echo "</tr></table>";
}

function template_cal_vertical_slice($args) {
	global $timedate;
?>
<th width="1%" id="bodytime">
<?php template_echo_slice_date($args) ; ?>

</td>
<td width="99%" id="bodyitem">

<div style="display:none;" id='<?php echo template_echo_daily_view_24_hour($args); ?>_appt'> <?php

	require_once('modules/Calls/CallFormBase.php');
	$callForm = new CallFormBase();
	echo $callForm->getFormBody('', 'Calls', 'inlineCal'.template_echo_daily_view_24_hour($args).'CallSave', $timedate->to_display_date($args['calendar']->date_time->get_mysql_date(), false), $timedate->to_display_time(template_echo_daily_view_24_hour($args).':00:00', true, false))."<br>";
?></div>

<?php template_echo_slice_activities($args); ?>
</td>
<?php

}

function template_cal_horizontal_slice($args) {
	echo "<td width=\"14%\" id=\"bodyItem\" scope='row' valign=\"top\">";

	if($args['show_link'] == 'on') {
		template_echo_slice_date($args);
	} else {
		template_echo_slice_date_nolink($args);
	}

	template_echo_slice_activities_shared($args);

	echo "</td>";
}

function template_calendar_year($args) {
	$count = 0;
?>
<table cellspacing="0" cellpadding="0" border="0" width="100%">
<tr>
    <td class="yearCalBody">
  <table id="daily_cal_table" border="0" cellpadding="0"  cellspacing="1" width="100%">
<?php


	for($i = 0; $i < 4; $i ++) {
?>
<tr>
<?php

		for($j = 0; $j < 3; $j ++) {
			$args['slice'] = $args['calendar']->slice_hash[$args['calendar']->slices_arr[$count]];
?>

<td valign="top" align="center" scope='row' class="yearCalBodyMonth"><?php template_cal_month_slice($args); ?></td>

<?php

			$count ++;
		}
?>
</tr>
<?php

	}
?>
</table>
</td>
</tr>
</table>

<?php

}

function template_calendar_month($args) {
	global $mod_strings;
?>

<table width="100%" id="daily_cal_table" border="0" cellspacing="1" cellpadding="0" >
  <?php

	// need to change these values after we find out what activities
	// occur outside of these values
	/*
	  $start_slice_idx = $args['calendar']->get_start_slice_idx();
	  $end_slice_idx = $args['calendar']->get_end_slice_idx();
	  $cur_slice_idx = 1;
	*/
	$count = 0;
	if($args['calendar']->slice_hash[$args['calendar']->slices_arr[35]]->start_time->month != $args['calendar']->date_time->month) {
		$rows = 5;
	} else {
		$rows = 6;
	}
?>
<tr class="monthCalBodyTH">
<?php


	for($i = 0; $i < 7; $i ++) {
		$first_row_slice = $args['calendar']->slice_hash[$args['calendar']->slices_arr[$i]];
?>
<th width="14%"><?php echo $first_row_slice->start_time->get_day_of_week_short(); ?></th>
<?php

	}
?>
</tr>
<?php


	if(isset($_REQUEST['view']) && $_REQUEST['view'] == 'month') {
		$height_class = "monthViewDayHeight";
	} else
		if(isset($args['size']) && $args['size'] == 'small') {
			$height_class = "";
		} else {
			$height_class = "monthViewDayHeight yearViewDayHeight";
		}

	for($i = 0; $i < $rows; $i ++) {
?>
<tr class="<?php echo $height_class; ?>">
<?php

		for($j = 0; $j < 7; $j ++) {
			$args['slice'] = $args['calendar']->slice_hash[$args['calendar']->slices_arr[$count]];
?>

<td <?php if($j==0 || $j==6) { ?>class="weekEnd"<?php } ?>><?php  template_cal_day_slice($args); ?></td>

<?php

			$count ++;
		}
?>
</tr>
<?php

	}
?>
</table>
<?php

}

function get_current_day($args) {
	global $timedate;
	$slice = $args['slice'];
	if($slice->start_time->get_mysql_date() == $timedate->nowDbDate()) {
		return true;
	}
	return false;
}

function template_echo_daily_view_hour($args) {

	$slice = $args['slice'];
	$hour = $slice->start_time->get_hour();
	return $hour;

}

function template_echo_daily_view_24_hour($args) {

	$slice = $args['slice'];
	$hour = $slice->start_time->get_24_hour();
	return $hour;

}

function template_echo_slice_date($args) {
	global $mod_strings;
    global $timedate;
	$slice = $args['slice'];

	if($slice->view != 'hour') {
		if($slice->start_time->get_day_of_week_short() == 'Sun' || $slice->start_time->get_day_of_week_short() == 'Sat') {
			echo "<a href=\"index.php?module=Calendar&action=index&view=".$slice->get_view().$slice->start_time->get_date_str()."\" ";
		} else {
			echo "<a href=\"index.php?module=Calendar&action=index&view=".$slice->get_view().$slice->start_time->get_date_str()."\" ";
		}
	}

	if($slice->view == 'day' &&($args['calendar']->view == 'week')) {
		echo ">";
		echo $slice->start_time->get_day_of_week_short();
		echo "&nbsp;";
		echo $slice->start_time->get_day();
	}
	elseif($args['calendar']->view == 'shared') {
		echo ">";
		echo $slice->start_time->get_day_of_week_short();
		echo "&nbsp;";
		echo $slice->start_time->get_day();
	} else
		if($slice->view == 'day') {
			echo ">";
			if($slice->start_time->get_month() == $args['calendar']->date_time->get_month()) {
				echo $slice->start_time->get_day();
			}
			//echo $slice->start_time->get_day();
		} else
			if($slice->view == 'month') {
				echo ">";
				echo $slice->start_time->get_month_name();
			} else
				if($slice->view == 'hour') {
					if($args['calendar']->toggle_appt == true) {
						echo '<a href="javascript:void  toggleDisplay(\''.$slice->start_time->get_24_hour().'_appt\');">';
					}
                    //Bug 13324, We are now using the users time format instead of a custom AM/PM setting
                    echo $timedate->to_display_time($slice->start_time->get_24_hour() . ":00:00", true, false);
				} else {
					sugar_die("template_echo_slice_date: view not supported");
				}

	echo "</a>";
}

function template_echo_slice_date_nolink($args) {
	global $mod_strings;
	$slice = $args['slice'];
	echo $slice->start_time->get_day_of_week_short();
	echo "&nbsp;";
	echo $slice->start_time->get_day();
}

function template_echo_date_info($view, $date_time) {
	global $current_user;
	$dateFormat = $current_user->getUserDateTimePreferences();

	if($view == 'month') {
		for($i=0; $i<strlen($dateFormat['date']); $i++) {
			switch($dateFormat['date']{$i}) {
				case "Y":
					echo " ".$date_time->year;
					break;
				case "m":
					echo " ".$date_time->get_month_name();
					break;
			}
		}
	} else
		if($view == 'week' || $view == 'shared') {
			$first_day = $date_time->get_day_by_index_this_week(0);
			$last_day = $date_time->get_day_by_index_this_week(6);

			for($i=0; $i<strlen($dateFormat['date']); $i++) {
				switch($dateFormat['date']{$i}) {
					case "Y":
						echo " ".$first_day->year;
						break;
					case "m":
						echo " ".$first_day->get_month_name();
						break;
					case "d":
						echo " ".$first_day->get_day();
						break;
				}
			}
			echo " - ";
			for($i=0; $i<strlen($dateFormat['date']); $i++) {
				switch($dateFormat['date']{$i}) {
					case "Y":
						echo " ".$last_day->year;
						break;
					case "m":
						echo " ".$last_day->get_month_name();
						break;
					case "d":
						echo " ".$last_day->get_day();
						break;
				}
			}
		} else
			if($view == 'day') {
				echo $date_time->get_day_of_week()." ";

				for($i=0; $i<strlen($dateFormat['date']); $i++) {
					switch($dateFormat['date']{$i}) {
						case "Y":
							echo " ".$date_time->year;
							break;
						case "m":
							echo " ".$date_time->get_month_name();
							break;
						case "d":
							echo " ".$date_time->get_day();
							break;
					}
				}
			} else
				if($view == 'year') {
					echo $date_time->year;
				} else {
					sugar_die("echo_date_info: date not supported");
				}
}

function template_get_next_calendar($args) {

	global $mod_strings;
?>
<a href="index.php?action=index&module=Calendar&view=<?php echo $args['calendar']->view; ?><?php echo $args['calendar']->get_next_date_str(); ?>"><?php echo $mod_strings["LBL_NEXT_".$args['calendar']->get_view_name($args['calendar']->view)]; ?>&nbsp;<?php echo SugarThemeRegistry::current()->getImage('calendar_next','alt="'. $mod_strings["LBL_NEXT_".$args['calendar']->get_view_name($args['calendar']->view)].'" align="absmiddle" border="0"'); ?></a>
<?php

}

function template_get_previous_calendar($args) {
	global $mod_strings;

?>
<a href="index.php?action=index&module=Calendar&view=<?php echo $args['calendar']->view; ?><?php echo $args['calendar']->get_previous_date_str(); ?>"><?php echo SugarThemeRegistry::current()->getImage('calendar_previous','alt="'. $mod_strings["LBL_PREVIOUS_".$args['calendar']->get_view_name($args['calendar']->view)].'" align="absmiddle" border="0"'); ?>&nbsp;&nbsp;<?php echo $mod_strings["LBL_PREVIOUS_".$args['calendar']->get_view_name($args['calendar']->view)]; ?></a>
<?php

}
?>

