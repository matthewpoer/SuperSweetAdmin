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




class SugarWidgetFieldDateTime extends SugarWidgetReportField {
	var $reporter;
	var $assigned_user=null;

    function SugarWidgetFieldDateTime(&$layout_manager) {
        parent::SugarWidgetReportField($layout_manager);
        $this->reporter = $this->layout_manager->getAttribute('reporter');
    }

	// get the reporter attribute
    // deprecated, now called in the constructor
	function getReporter() {
//		$this->reporter = $this->layout_manager->getAttribute('reporter');
	}

	// get the assigned user of the report
	function getAssignedUser() {
		$json_obj = getJSONobj();

		$report_def_str = $json_obj->decode($this->reporter->report_def_str);

		if(empty($report_def_str['assigned_user_id'])) return false;

		$this->assigned_user = new User();
		$this->assigned_user->retrieve($report_def_str['assigned_user_id']);
		return true;
	}

	function queryFilterOn(& $layout_def) {
		global $timedate;

        $begin = $layout_def['input_name0'];
     	$end = $begin;
        $hasTime = $this->hasTime($begin);
        if(!$hasTime){
            $begin .= " 00:00:00";
            $end .= " 23:59:59";
        }
        
		if($this->getAssignedUser()) {
			$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), false, $this->assigned_user);
			$end = $timedate->handle_offset($end, $timedate->get_db_date_time_format(), false, $this->assigned_user);
		}

			return $this->_get_column_select($layout_def).">='".$this->reporter->db->quote($begin)."' AND ".$this->_get_column_select($layout_def)."<='".$this->reporter->db->quote($end)."'\n";
	}

	function queryFilterBefore(& $layout_def) {
		global $timedate;

        $begin = $layout_def['input_name0'];
        $hasTime = $this->hasTime($begin);
        if(!$hasTime){
            $begin .= " 00:00:00";
        }
        
		if($this->getAssignedUser()) {
			$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), false, $this->assigned_user);
		}

			return $this->_get_column_select($layout_def)."<'".$this->reporter->db->quote($begin)."'\n";

	}

	function queryFilterAfter(& $layout_def) {
		global $timedate;

        $begin = $layout_def['input_name0'];
        $hasTime = $this->hasTime($begin);
        if(!$hasTime){
            $begin .= ' 23:59:59';
        }

		if($this->getAssignedUser()) {
            $begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), false, $this->assigned_user);
		}

			return $this->_get_column_select($layout_def).">'".$this->reporter->db->quote($begin)."'\n";
	}

	function queryFilterBetween_Dates(& $layout_def) {
		global $timedate;

        $begin = $layout_def['input_name0'];
     	$end = $layout_def['input_name1'];
        $beginHasTime = $this->hasTime($begin);
        $endHasTime = $this->hasTime($end);
        if(!$beginHasTime){
            $begin .= " 00:00:00";
        }
        if(!$endHasTime){
            $end .= " 23:59:59";
        }

		if($this->getAssignedUser()) {
			$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), false, $this->assigned_user);
            $end = $timedate->handle_offset($end, $timedate->get_db_date_time_format(), false, $this->assigned_user);
		}
		

			return "(".$this->_get_column_select($layout_def).">='".$this->reporter->db->quote($begin)."' AND \n".$this->_get_column_select($layout_def)."<='".$this->reporter->db->quote($end)."')\n";
	}

	function queryFilterNot_Equals_str(& $layout_def) {
		global $timedate;

        $begin = $layout_def['input_name0'];
     	$end = $begin;
        $hasTime = $this->hasTime($begin);
        if(!$hasTime){
            $begin .= " 00:00:00";
            $end .= " 23:59:59";
        }

		if($this->getAssignedUser()) {
			$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), false, $this->assigned_user);
			$end = $timedate->handle_offset($end, $timedate->get_db_date_time_format(), false, $this->assigned_user);
		}

		if ($this->reporter->db->dbType == 'oci8') {

		} elseif ($this->reporter->db->dbType == 'mssql'){
            return "(".$this->_get_column_select($layout_def)."<'".$this->reporter->db->quote($begin)."' OR ".$this->_get_column_select($layout_def).">'".$this->reporter->db->quote($end)."')\n";

		}else{
            return "ISNULL(".$this->_get_column_select($layout_def).") OR \n(".$this->_get_column_select($layout_def)."<'".$this->reporter->db->quote($begin)."' OR ".$this->_get_column_select($layout_def).">'".$this->reporter->db->quote($end)."')\n";
        }
	}

	function queryFilterTP_yesterday(& $layout_def) {
		global $timedate, $current_user;

        $begin_timestamp = time() - 86400;

        // begin conversion (same code as queryFilterTP_today)
        $begin = gmdate($GLOBALS['timedate']->get_db_date_time_format(), $begin_timestamp);
        //kbrill bug #13884
        //$begin = $timedate->to_display_date_time($begin);
		$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), true, $this->assigned_user);

        $begin_parts = explode(' ', $begin);

        $be = $begin_parts[0] . ' 00:00:00';
        $en = $begin_parts[0] . ' 23:59:59';

        if($this->getAssignedUser()) {
            $begin = $timedate->handle_offset($be, $timedate->get_db_date_time_format(), false, $this->assigned_user);
            $end = $timedate->handle_offset($en, $timedate->get_db_date_time_format(), false, $this->assigned_user);
        }
        else{
        	$begin = $timedate->handle_offset($be, $timedate->get_db_date_time_format(), false, $current_user); // convert to GMT today relative to assigned_user
            $end = $timedate->handle_offset($en, $timedate->get_db_date_time_format(), false, $current_user);
        }

		if ($this->reporter->db->dbType == 'oci8') {

		}

		if ($this->reporter->db->dbType == 'mysql')
		{
			if (isset ($layout_def['rel_field'])) {
				$field_name = "CONCAT(".$this->_get_column_select($layout_def).",' ',".$layout_def['rel_field'].")";
			} else {
				$field_name = $this->_get_column_select($layout_def);
			}
			return $field_name.">='".$this->reporter->db->quote($begin)."' AND ".$field_name."<='".$this->reporter->db->quote($end)."'\n";
		}

		if ($this->reporter->db->dbType == 'mssql')
		{
			if (isset ($layout_def['rel_field'])) {
				$field_name = $this->_get_column_select($layout_def) . " + ' ' + " . $layout_def['rel_field'].")";
			} else {
				$field_name = $this->_get_column_select($layout_def);
			}
			return $field_name.">='".$this->reporter->db->quote($begin)."' AND ".$field_name."<='".$this->reporter->db->quote($end)."'\n";
		}
	}
	function queryFilterTP_today(& $layout_def) {
		global $timedate, $current_user;

        $begin_timestamp = time();
		$begin = gmdate($GLOBALS['timedate']->get_db_date_time_format(), $begin_timestamp); // get GMT today
		//kbrill bug #13884
        //$begin = $timedate->to_display_date_time($begin); // convert and handle offset to user's 'display' today
		$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), true, $this->assigned_user);

        $begin_parts = explode(' ', $begin);

        $be = $begin_parts[0] . ' 00:00:00';
        $en = $begin_parts[0] . ' 23:59:59';

		if($this->getAssignedUser()) {
            $begin = $timedate->handle_offset($be, $timedate->get_db_date_time_format(), false, $this->assigned_user); // convert to GMT today relative to assigned_user
            $end = $timedate->handle_offset($en, $timedate->get_db_date_time_format(), false, $this->assigned_user);
		}
		else{
			$begin = $timedate->handle_offset($be, $timedate->get_db_date_time_format(), false, $current_user); // convert to GMT today relative to assigned_user
            $end = $timedate->handle_offset($en, $timedate->get_db_date_time_format(), false, $current_user);
		}

		if ($this->reporter->db->dbType == 'oci8') {

		}elseif($this->reporter->db->dbType == 'mssql'){
            if (isset ($layout_def['rel_field'])) {
                $field_name = "(".$this->_get_column_select($layout_def)." + ' ' + ".$layout_def['rel_field'].")";
            } else {
                $field_name = $this->_get_column_select($layout_def);
            }
            return $field_name.">='".$this->reporter->db->quote($begin)."' AND ".$field_name."<='".$this->reporter->db->quote($end)."'\n";

        } else {
			if (isset ($layout_def['rel_field'])) {
				$field_name = "CONCAT(".$this->_get_column_select($layout_def).",' ',".$layout_def['rel_field'].")";
			} else {
				$field_name = $this->_get_column_select($layout_def);
			}
			return $field_name.">='".$this->reporter->db->quote($begin)."' AND ".$field_name."<='".$this->reporter->db->quote($end)."'\n";
		}
	}

	function queryFilterTP_tomorrow(& $layout_def) {
		global $timedate, $current_user;

        // get tomorrow
        $begin_timestamp =time()+ 86400;

        // begin conversion (same code as queryFilterTP_today)
        $begin = gmdate($GLOBALS['timedate']->get_db_date_time_format(), $begin_timestamp);
        //kbrill bug #13884
        //$begin = $timedate->to_display_date_time($begin);
		$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), true, $this->assigned_user);

        $begin_parts = explode(' ', $begin);

        $be = $begin_parts[0] . ' 00:00:00';
        $en = $begin_parts[0] . ' 23:59:59';

        if($this->getAssignedUser()) {
            $begin = $timedate->handle_offset($be, $timedate->get_db_date_time_format(), false, $this->assigned_user);
            $end = $timedate->handle_offset($en, $timedate->get_db_date_time_format(), false, $this->assigned_user);
        }
        else{
        	$begin = $timedate->handle_offset($be, $timedate->get_db_date_time_format(), false, $current_user);
            $end = $timedate->handle_offset($en, $timedate->get_db_date_time_format(), false, $current_user);
        }

		if ($this->reporter->db->dbType == 'oci8') {
		} else {
			return $this->_get_column_select($layout_def).">='".$this->reporter->db->quote($begin)."' AND ".$this->_get_column_select($layout_def)."<='".$this->reporter->db->quote($end)."'\n";
		}
	}

    /**
     * Get assigned or logged in user's current date and time value.
     * @param boolean $timestamp Format of return value, if set to true, return unix like timestamp , else a formatted date.
     */
	function get_users_current_date_time($timestamp=false) {
	 	global $current_user;
        global $timedate;

        $begin = TimeDate::getInstance()->nowDb();
        //kbrill bug #13884
       	//$begin = $timedate->to_display_date_time($begin,true,true,$this->assigned_user);
		$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), false, $this->assigned_user);

        if (!$timestamp) {
        	return $begin;
        } else {
        	$begin_parts = explode(' ', $begin);
        	$date_parts=explode('-', $begin_parts[0]);
        	$time_parts=explode(':', $begin_parts[1]);
        	$curr_timestamp=mktime($time_parts[0],$time_parts[1],0,$date_parts[1], $date_parts[2],$date_parts[0]);
        	return $curr_timestamp;
        }

	}
	/**
	 * Get specified date and time for a particalur day, in current user's timezone.
	 * @param int $days Adjust date by this number of days, negative values are valid.
	 * @param time string falg for desired time value, start: minimum time, end: maximum time, default: current time
	 */
	function get_db_date($days,$time) {
        global $timedate;

        $begin = date($GLOBALS['timedate']->get_db_date_time_format(), time()+(86400 * $days));  //gmt date with day adjustment applied.
        //kbrill bug #13884
        //$begin = $timedate->to_display_date_time($begin,true,true,$this->assigned_user);
		$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), false, $this->assigned_user);

        if ($time=='start') {
            $begin_parts = explode(' ', $begin);
            $be = $begin_parts[0] . ' 00:00:00';
        }
        else if ($time=='end') {
            $begin_parts = explode(' ', $begin);
            $be = $begin_parts[0] . ' 23:59:59';
        } else {
            $be=$begin;
        }

        //convert date to db format without converting to GMT.
        $begin = $timedate->handle_offset($be, $timedate->get_db_date_time_format(), false, $this->assigned_user);

        return $begin;
	}

	/**
	 * Get filter string for a date field.
	 * @param array layout_def field def for field being filtered
	 * @param string $begin start date value.
	 * @param string $end End date value.
	 */
	function get_start_end_date_filter(& $layout_def, $begin,$end) {

		if ($this->reporter->db->dbType == 'oci8') {

		}elseif($this->reporter->db->dbType == 'mssql'){
            if (isset ($layout_def['rel_field'])) {
                $field_name = "(".$this->_get_column_select($layout_def)." + ' ' + ".$layout_def['rel_field'].")";
            } else {
                $field_name = $this->_get_column_select($layout_def);
            }
            return $field_name.">='".$this->reporter->db->quote($begin)."' AND ".$field_name."<='".$this->reporter->db->quote($end)."'\n";

        } else {
			if (isset ($layout_def['rel_field'])) {
				$field_name = "CONCAT(".$this->_get_column_select($layout_def).",' ',".$layout_def['rel_field'].")";
			} else {
				$field_name = $this->_get_column_select($layout_def);
			}
			return $field_name.">='".$this->reporter->db->quote($begin)."' AND ".$field_name."<='".$this->reporter->db->quote($end)."'\n";
		}
	}

	function queryFilterTP_last_7_days(& $layout_def) {

        $begin=$this->get_db_date(-6,'start');
        $end=$this->get_db_date(0,'end');


        return $this->get_start_end_date_filter($layout_def,$begin,$end);

	}

	function queryFilterTP_next_7_days(& $layout_def) {

        $begin=$this->get_db_date(0,'start');
        $end=$this->get_db_date(6,'end');

		return $this->get_start_end_date_filter($layout_def,$begin,$end);
	}

	function queryFilterTP_last_month(& $layout_def) {

		global $timedate;
		$curr_timestamp= $this->get_users_current_date_time(true);

		//Get year and month from time stamp.
		$curr_year=date('Y',$curr_timestamp);
		$curr_month=date('m',$curr_timestamp);

		//get start date for last month and convert it to gmt and db format.
	    $begin=date($GLOBALS['timedate']->get_db_date_time_format(),strtotime("-1 month",mktime(0,0,0,$curr_month,1,$curr_year)));
        $begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), false, $this->assigned_user);

	    //get end date for last month  and convert it to gmt and db format.
        $end=date($GLOBALS['timedate']->get_db_date_time_format(),strtotime("-1 day",mktime(23,59,59,$curr_month,1,$curr_year)));
	    $end = $timedate->handle_offset($end, $timedate->get_db_date_time_format(), false, $this->assigned_user);

		return $this->get_start_end_date_filter($layout_def,$begin,$end);
	}

	function queryFilterTP_this_month(& $layout_def) {

		global $timedate;
		$curr_timestamp= $this->get_users_current_date_time(true);

		//Get year and month from time stamp.
		$curr_year=date('Y',$curr_timestamp);
		$curr_month=date('m',$curr_timestamp);

		//get start date for this month and convert it to gmt and db format.
	    $begin=date($GLOBALS['timedate']->get_db_date_time_format(),mktime(0,0,0,$curr_month,1,$curr_year));
        $begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), false, $this->assigned_user);

	    //get end date for this month  and convert it to gmt and db format.
	    //first get the first day of next month and move back by one day.
		if ($curr_month==12) {
			$curr_month=1;
			$curr_year+=1;
		} else {
			$curr_month+=1;
		}
        $end=date($GLOBALS['timedate']->get_db_date_time_format(),strtotime("-1 day",mktime(23,59,59,$curr_month,1,$curr_year)));
	    $end = $timedate->handle_offset($end, $timedate->get_db_date_time_format(), false, $this->assigned_user);


		return $this->get_start_end_date_filter($layout_def,$begin,$end);
	}

	function queryFilterTP_next_month(& $layout_def) {

		global $timedate;
		$curr_timestamp= $this->get_users_current_date_time(true);

		//Get year and month from time stamp.
		$curr_year=date('Y',$curr_timestamp);
		$curr_month=date('m',$curr_timestamp);
		if ($curr_month==12) {
			$curr_month=1;
			$curr_year+=1;
		} else {
			$curr_month+=1;
		}

		//get start date for next month and convert it to gmt and db format.
	    $begin=date($GLOBALS['timedate']->get_db_date_time_format(),mktime(0,0,0,$curr_month,1,$curr_year));
        $begin=$timedate->handle_offset($begin, $timedate->get_db_date_time_format(), false, $this->assigned_user);

	    //get end date for next month  and convert it to gmt and db format.
	    //first get first day of the month after and move back by 1 day.
		if ($curr_month==12) {
			$curr_month=1;
			$curr_year+=1;
		} else {
			$curr_month+=1;
		}
        $end=date($GLOBALS['timedate']->get_db_date_time_format(),strtotime("-1 day",(strtotime("1 month",mktime(23,59,59,$curr_month,1,$curr_year)))));
	    $end = $timedate->handle_offset($end, $timedate->get_db_date_time_format(), false, $this->assigned_user);


		return $this->get_start_end_date_filter($layout_def,$begin,$end);
	}

	function queryFilterTP_last_30_days(& $layout_def) {

        $begin=$this->get_db_date(-29,'start');
        $end=$this->get_db_date(0,'end');

        return $this->get_start_end_date_filter($layout_def,$begin,$end);
	}

	function queryFilterTP_next_30_days(& $layout_def) {
        $begin=$this->get_db_date(0,'start');
        $end=$this->get_db_date(29,'end');

        return $this->get_start_end_date_filter($layout_def,$begin,$end);
	}

	function queryFilterTP_last_quarter(& $layout_def) {
//		return "LEFT(".$this->_get_column_select($layout_def).",10) BETWEEN (current_date + interval '1' month) AND current_date";
	}

	function queryFilterTP_this_quarter(& $layout_def) {
	}

	function queryFilterTP_last_year(& $layout_def) {

		global $timedate;
		$curr_timestamp= $this->get_users_current_date_time(true);

		//Get year and month from time stamp.
		$curr_year=date('Y',$curr_timestamp);
		$curr_year-=1;

		//get start date for last year and convert it to gmt and db format.
	    $begin=date($GLOBALS['timedate']->get_db_date_time_format(),mktime(0,0,0,1,1,$curr_year));
        $begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), false, $this->assigned_user);

	    //get end date for last year  and convert it to gmt and db format.
        $end=date($GLOBALS['timedate']->get_db_date_time_format(),mktime(23,59,59,12,31,$curr_year));
	    $end = $timedate->handle_offset($end, $timedate->get_db_date_time_format(), false, $this->assigned_user);

		return $this->get_start_end_date_filter($layout_def,$begin,$end);
	}

	function queryFilterTP_this_year(& $layout_def) {
		global $timedate;
		$curr_timestamp= $this->get_users_current_date_time(true);

		//Get year and month from time stamp.
		$curr_year=date('Y',$curr_timestamp);

		//get start date for this year and convert it to gmt and db format.
	    $begin=date($GLOBALS['timedate']->get_db_date_time_format(),mktime(0,0,0,1,1,$curr_year));
        $begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), false, $this->assigned_user);

	    //get end date for this year  and convert it to gmt and db format.
        $end=date($GLOBALS['timedate']->get_db_date_time_format(),mktime(23,59,59,12,31,$curr_year));
	    $end = $timedate->handle_offset($end, $timedate->get_db_date_time_format(), false, $this->assigned_user);

		return $this->get_start_end_date_filter($layout_def,$begin,$end);
	}

	function queryFilterTP_next_year(& $layout_def) {
		global $timedate;
		$curr_timestamp= $this->get_users_current_date_time(true);

		//Get year and month from time stamp.
		$curr_year=date('Y',$curr_timestamp);
		$curr_year+=1;

		//get start date for this year and convert it to gmt and db format.
	    $begin=date($GLOBALS['timedate']->get_db_date_time_format(),mktime(0,0,0,1,1,$curr_year));
        $begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), false, $this->assigned_user);

	    //get end date for this year  and convert it to gmt and db format.
        $end=date($GLOBALS['timedate']->get_db_date_time_format(),mktime(23,59,59,12,31,$curr_year));
	    $end = $timedate->handle_offset($end, $timedate->get_db_date_time_format(), false, $this->assigned_user);

		return $this->get_start_end_date_filter($layout_def,$begin,$end);
	}

	function queryGroupBy($layout_def) {
		// i guess qualifier and column_function are the same..
		if (!empty ($layout_def['qualifier'])) {
			$func_name = 'queryGroupBy'.$layout_def['qualifier'];
			//print_r($layout_def);
			//print $func_name;
			if (method_exists($this, $func_name)) {
				return $this-> $func_name ($layout_def)." \n";
			}
		}
		return parent :: queryGroupBy($layout_def)." \n";
	}

	function queryOrderBy($layout_def) {
		// i guess qualifier and column_function are the same..
        if ($this->reporter->db->dbType == 'mssql'){
            //do nothing if this is for mssql, do not run group by

        }
		elseif (!empty ($layout_def['qualifier'])) {
			$func_name ='queryGroupBy'.$layout_def['qualifier'];
			if (method_exists($this, $func_name)) {
				return $this-> $func_name ($layout_def)."\n";
			}
		}
		$order_by = parent :: queryOrderBy($layout_def)."\n";
		return $order_by;
	}

    function displayListPlain($layout_def) {
        global $timedate;
        $content = parent:: displayListPlain($layout_def);
        // awu: this if condition happens only in Reports where group by month comes back as YYYY-mm format
        if (count(explode('-',$content)) == 2){
            return $content;
        // if date field
        }elseif(substr_count($layout_def['type'], 'date') > 0){
            // if date time field
            if(substr_count($layout_def['type'], 'time') > 0 && $this->get_time_part($content)!= false){
                $td = $timedate->to_display_date_time($content);
                return $td;
            }else{// if date only field
                $td = $timedate->to_display_date($content, false); // avoid php notice of returing by reference
                return $td;
            }
        }
    }
    function get_time_part($date_time_value) {
        $date_parts=explode(' ', $date_time_value);
        if (count($date_parts) == 2) {
            $time=$date_parts[1];
        } else {
            $time=false;
        }
        return $time;

    }
    function displayList($layout_def) {
        global $timedate;
        // i guess qualifier and column_function are the same..
        if (!empty ($layout_def['column_function'])) {
            $func_name = 'displayList'.$layout_def['column_function'];
            if (method_exists($this, $func_name)) {
                return $this-> $func_name ($layout_def);
            }
        }
        $content = parent :: displayListPlain($layout_def);
        return $timedate->to_display_date_time($content);
    }

	function querySelect(& $layout_def) {
		// i guess qualifier and column_function are the same..
		if (!empty ($layout_def['column_function'])) {
			$func_name = 'querySelect'.$layout_def['column_function'];
			if (method_exists($this, $func_name)) {
				return $this-> $func_name ($layout_def)." \n";
			}
		}
		return parent :: querySelect($layout_def)." \n";
	}
	function & displayListday(& $layout_def) {
		return parent:: displayListPlain($layout_def);
	}

	function & displayListyear(& $layout_def) {
		global $app_list_strings;
        //if ($this->reporter->db->dbType == 'oci8' || $this->reporter->db->dbType == 'mssql') {
			return parent:: displayListPlain($layout_def);
        //}
        /*else{
			$match = array();
	        if (preg_match('/(\d{4})/', $this->displayListPlain($layout_def), $match)) {
				return $match[1];
			}
	        $temp = null; // avoid notices
	        return $temp;
		}*/
	}

	function & displayListmonth(& $layout_def) {
		global $app_list_strings;
		$display = '';
		$match = array();
        if (preg_match('/(\d{4})-(\d\d)/', $this->displayListPlain($layout_def), $match)) {
			$match[2] = preg_replace('/^0/', '', $match[2]);
			$display = $app_list_strings['dom_cal_month_long'][$match[2]]." {$match[1]}";
		}
		return $display;

	}
	function querySelectmonth(& $layout_def) {
        if ($this->reporter->db->dbType == 'oci8') {
        }elseif($this->reporter->db->dbType == 'mssql') {
            //return "LEFT( ".$this->_get_column_select($layout_def).",6 ) ".$this->_get_column_alias($layout_def)." \n";
        	return "LEFT(CONVERT (varchar(20), ". $this->_get_column_select($layout_def). ",121),7)".$this->_get_column_alias($layout_def)." \n";

        } else {
            return "LEFT( ".$this->_get_column_select($layout_def).",7 ) ".$this->_get_column_alias($layout_def)." \n";
        }
	}

	function queryGroupByMonth($layout_def) {
		if ($this->reporter->db->dbType == 'oci8') {
		}elseif($this->reporter->db->dbType == 'mssql') {
            //return "LEFT(".$this->_get_column_select($layout_def).", 6) \n";
            return "LEFT(CONVERT (varchar(20), ". $this->_get_column_select($layout_def). ", 121),7) \n";

        }else {
			return "LEFT(".$this->_get_column_select($layout_def).", 7) \n";
		}
	}

	function querySelectday($layout_def) {
		if ($this->reporter->db->dbType == 'oci8') {
		}elseif($this->reporter->db->dbType == 'mssql') {
            //return "LEFT(".$this->_get_column_select($layout_def).", 6) \n";
        	return "LEFT(CONVERT (varchar(20), ". $this->_get_column_select($layout_def). ",121),10)".$this->_get_column_alias($layout_def)." \n";

        }else {
			return "LEFT(".$this->_get_column_select($layout_def).", 10)".$this->_get_column_alias($layout_def)." \n";
		}
	}

	function queryGroupByDay($layout_def) {
		if ($this->reporter->db->dbType == 'oci8') {
		}elseif($this->reporter->db->dbType == 'mssql') {
            //return "LEFT(".$this->_get_column_select($layout_def).", 6) \n";
            return "LEFT(CONVERT (varchar(20), ". $this->_get_column_select($layout_def). ", 121),10) \n";

        }else {
			return "LEFT(".$this->_get_column_select($layout_def).", 10) \n";
		}
	}


	function querySelectyear(& $layout_def) {
		if ($this->reporter->db->dbType == 'oci8') {
		}elseif($this->reporter->db->dbType == 'mssql') {
            //return "LEFT( ".$this->_get_column_select($layout_def).",5 ) ".$this->_get_column_alias($layout_def)." \n";
            return "LEFT(CONVERT (varchar(20), ". $this->_get_column_select($layout_def). ",121),4) ".$this->_get_column_alias($layout_def)." \n";

        } else {
			return "LEFT( ".$this->_get_column_select($layout_def).",4 ) ".$this->_get_column_alias($layout_def)." \n";
		}
	}

	function queryGroupByYear($layout_def) {
		if ($this->reporter->db->dbType == 'oci8') {
		}elseif($this->reporter->db->dbType == 'mssql') {
            //return "LEFT(".$this->_get_column_select($layout_def).", 5) \n";
            return "LEFT(CONVERT (varchar(20), ". $this->_get_column_select($layout_def). ",121),4) \n";

        } else {
			return "LEFT(".$this->_get_column_select($layout_def).", 4) \n";
		}
	}

	function querySelectquarter(& $layout_def) {
		if ($this->reporter->db->dbType == 'oci8') {
		}

		elseif ($this->reporter->db->dbType == 'mysql')
		{
			return "CONCAT(LEFT(".$this->_get_column_select($layout_def).", 4), '-', QUARTER(".$this->_get_column_select($layout_def).") )".$this->_get_column_alias($layout_def)."\n";
		}

		elseif ($this->reporter->db->dbType == 'mssql')
		{
			//return "LEFT(".$this->_get_column_select($layout_def).", 4) +  '-' + convert(varchar(20), DatePart(q," . $this->_get_column_select($layout_def).") ) ".$this->_get_column_alias($layout_def)."\n";
            return "LEFT(CONVERT (varchar(20), ". $this->_get_column_select($layout_def). ",121),4)+  '-' + convert(varchar(20), DatePart(q," . $this->_get_column_select($layout_def).") ) ".$this->_get_column_alias($layout_def)."\n";

		}


	}

	function displayListquarter(& $layout_def) {
		$match = array();
        if (preg_match('/(\d{4})-(\d)/', $this->displayListPlain($layout_def), $match)) {
			return "Q".$match[2]." ".$match[1];
		}
		return '';

	}

	function queryGroupByQuarter($layout_def) {
		$this->getReporter();

		if ($this->reporter->db->dbType == 'oci8') {

		}elseif ($this->reporter->db->dbType == 'mysql')
		{
			return "CONCAT(LEFT(".$this->_get_column_select($layout_def).", 4), '-', QUARTER(".$this->_get_column_select($layout_def).") )\n";
		}
		elseif ($this->reporter->db->dbType == 'mssql')
		{
			//return "LEFT(".$this->_get_column_select($layout_def).", 4) +  '-' + convert(varchar(20), DatePart(q," . $this->_get_column_select($layout_def).") )\n";
            return "LEFT(CONVERT (varchar(20), ". $this->_get_column_select($layout_def). ",121),4) +  '-' + convert(varchar(20), DatePart(q," . $this->_get_column_select($layout_def).") )\n";

		}


	}

    function displayInput(&$layout_def) {
    	global $timedate, $current_language, $app_strings;
        $home_mod_strings = return_module_language($current_language, 'Home');
        $filterTypes = array(' '                 => $app_strings['LBL_NONE'],
                             'TP_today'         => $home_mod_strings['LBL_TODAY'],
                             'TP_yesterday'     => $home_mod_strings['LBL_YESTERDAY'],
                             'TP_tomorrow'      => $home_mod_strings['LBL_TOMORROW'],
                             'TP_this_month'    => $home_mod_strings['LBL_THIS_MONTH'],
                             'TP_this_year'     => $home_mod_strings['LBL_THIS_YEAR'],
                             'TP_last_30_days'  => $home_mod_strings['LBL_LAST_30_DAYS'],
                             'TP_last_7_days'   => $home_mod_strings['LBL_LAST_7_DAYS'],
                             'TP_last_month'    => $home_mod_strings['LBL_LAST_MONTH'],
                             'TP_last_year'     => $home_mod_strings['LBL_LAST_YEAR'],
                             'TP_next_30_days'  => $home_mod_strings['LBL_NEXT_30_DAYS'],
                             'TP_next_7_days'   => $home_mod_strings['LBL_NEXT_7_DAYS'],
                             'TP_next_month'    => $home_mod_strings['LBL_NEXT_MONTH'],
                             'TP_next_year'     => $home_mod_strings['LBL_NEXT_YEAR'],
                             );

        $cal_dateformat = $timedate->get_cal_date_format();
        $str = "<select name='type_{$layout_def['name']}'>";
        $str .= get_select_options_with_id($filterTypes, (empty($layout_def['input_name0']) ? '' : $layout_def['input_name0']));
//        foreach($filterTypes as $value => $label) {
//            $str .= '<option value="' . $value . '">' . $label. '</option>';
//        }
        $str .= "</select>";


        return $str;
    }

    /**
     * @param  $date
     * @return bool false if the date is a only a date, true if the date includes time.
     */
    protected function hasTime($date)
    {
        return strlen(trim($date)) < 11 ? false : true;
    }
}
