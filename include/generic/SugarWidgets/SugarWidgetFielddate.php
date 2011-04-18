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

require_once('include/generic/SugarWidgets/SugarWidgetFielddatetime.php');

class SugarWidgetFieldDate extends SugarWidgetFieldDateTime
{
        function & displayList($layout_def)
        {
            global $timedate;
            // i guess qualifier and column_function are the same..
            if (! empty($layout_def['column_function']))
             {
                $func_name = 'displayList'.$layout_def['column_function'];
                if ( method_exists($this,$func_name))
                {
                        $display = $this->$func_name($layout_def);
                        return $display;
                }
            }
            $content = $this->displayListPlain($layout_def);
    		return $content;         
        }


function get_date_part($date_time_value){

	$date_parts=explode(' ', $date_time_value);
	if (count($date_parts) == 2) {
		$date=$date_parts[0];
	} else {
		$date=$date_time_value;
	}                
	return $date;
}

function get_db_date($days,$time) {
    global $timedate;

    $begin = date($GLOBALS['timedate']->get_db_date_time_format(), time()+(86400 * $days));  //gmt date with day adjustment applied.
//	$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), false, $this->assigned_user);
    
    if ($time=='start') {
        $begin_parts = explode(' ', $begin);
        $begin = $begin_parts[0] . ' 00:00:00';
    }
    else if ($time=='end') {
        $begin_parts = explode(' ', $begin);
        $begin = $begin_parts[0] . ' 23:59:59';
    } 
    return $begin;
}
function get_time_part($date_time_value) {
	$date_parts=explode(' ', $date_time_value);
	if (count($date_parts) == 2) {
		$time=$date_parts[1];
	} else {
		$time=$date_time_value;
	}                
	return $time;

}
 function queryFilterBefore_old(&$layout_def)
 {
  global $timedate;

			return $this->_get_column_select($layout_def)."<'".$this->reporter->db->quote($layout_def['input_name0'])."'\n";
 }

 function queryFilterAfter_old(&$layout_def)
 {
  global $timedate;

  		return $this->_get_column_select($layout_def).">'".$this->reporter->db->quote($layout_def['input_name0'])."'\n";
 }

 function queryFilterBetween_Dates_old(&$layout_def)
 {
  global $timedate;

			return "(".$this->_get_column_select($layout_def).">='".$this->reporter->db->quote($layout_def['input_name0'])."' AND \n".  $this->_get_column_select($layout_def)."<='".$this->reporter->db->quote($layout_def['input_name1'])."')\n";
 }

    function queryFilterNot_Equals_str(& $layout_def) {
        global $timedate;
        
        $begin = $layout_def['input_name0'];

        if ($this->reporter->db->dbType == 'oci8') {
        } elseif($this->reporter->db->dbType == 'mssql') {
            return "".$this->_get_column_select($layout_def)."!='".$this->reporter->db->quote($begin)."'\n";
        }else{
            return "ISNULL(".$this->_get_column_select($layout_def).") OR \n(".$this->_get_column_select($layout_def)."!='".$this->reporter->db->quote($begin)."')\n";
        }

    }
    

    function queryFilterOn(& $layout_def) {
        global $timedate;
        
        $begin = $layout_def['input_name0'];

            return $this->_get_column_select($layout_def)."='".$this->reporter->db->quote($begin)."'\n";
    }
    function queryFilterBefore(& $layout_def) {
        global $timedate;
        
        $begin = $layout_def['input_name0'];

            return $this->_get_column_select($layout_def)."<'".$this->reporter->db->quote($begin)."'\n";

    }
    
    function queryFilterAfter(& $layout_def) {
        global $timedate;

        $begin = $layout_def['input_name0'];

            return $this->_get_column_select($layout_def).">'".$this->reporter->db->quote($begin)."'\n";
    }
    function queryFilterBetween_Dates(& $layout_def) {
        global $timedate;
        
        $begin = $layout_def['input_name0'];
        $end = $layout_def['input_name1'];

            return "(".$this->_get_column_select($layout_def).">='".$this->reporter->db->quote($begin)."' AND \n".$this->_get_column_select($layout_def)."<='".$this->reporter->db->quote($end)."')\n";
    }
    
	function queryFilterTP_yesterday(& $layout_def) {
		global $timedate, $current_user;
		
        $begin_timestamp = time() - 86400;
        $begin = gmdate($GLOBALS['timedate']->get_db_date_time_format(), $begin_timestamp);
		$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), true, $this->assigned_user);

        $begin_parts = explode(' ', $begin);
        $begin = $begin_parts[0] . ' 00:00:00';
        $end = $begin_parts[0] . ' 23:59:59';
        return $this->get_start_end_date_filter($layout_def,$begin,$end);

	}
	function queryFilterTP_today(& $layout_def) {
		global $timedate, $current_user;
        
        $begin_timestamp = time();
        $begin = gmdate($GLOBALS['timedate']->get_db_date_time_format(), $begin_timestamp);
		$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), true, $this->assigned_user);
        
        $begin_parts = explode(' ', $begin);
        $begin = $begin_parts[0] . ' 00:00:00';
        $end = $begin_parts[0] . ' 23:59:59';
        return $this->get_start_end_date_filter($layout_def,$begin,$end);

	}

	function queryFilterTP_tomorrow(& $layout_def) {
		global $timedate, $current_user;

        $begin_timestamp = time() + 86400;
        $begin = gmdate($GLOBALS['timedate']->get_db_date_time_format(), $begin_timestamp);
		$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), true, $this->assigned_user);

        $begin_parts = explode(' ', $begin);
        $begin = $begin_parts[0] . ' 00:00:00';
        $end = $begin_parts[0] . ' 23:59:59';
        return $this->get_start_end_date_filter($layout_def,$begin,$end);


	}
	function queryFilterTP_last_7_days(& $layout_def) {
		global $timedate, $current_user;

        $begin_timestamp = time() - (6 * 86400);
        $begin = gmdate($GLOBALS['timedate']->get_db_date_time_format(), $begin_timestamp);
		$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), true, $this->assigned_user);
        $end_timestamp = time();
        $end = gmdate($GLOBALS['timedate']->get_db_date_time_format(), $end_timestamp);
		$end = $timedate->handle_offset($end, $timedate->get_db_date_time_format(), true, $this->assigned_user);

        $begin_parts = explode(' ', $begin);
        $begin = $begin_parts[0] . ' 00:00:00';
        $end_parts = explode(' ', $end);
        $end = $end_parts[0] . ' 23:59:59';

        return $this->get_start_end_date_filter($layout_def,$begin,$end);

	}

	function queryFilterTP_next_7_days(& $layout_def) {
		global $timedate, $current_user;

        $begin_timestamp = time();
        $begin = gmdate($GLOBALS['timedate']->get_db_date_time_format(), $begin_timestamp);
		$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), true, $this->assigned_user);
        $end_timestamp = time() + (86400*6);
        $end = gmdate($GLOBALS['timedate']->get_db_date_time_format(), $end_timestamp);
		$end = $timedate->handle_offset($end, $timedate->get_db_date_time_format(), true, $this->assigned_user);

        $begin_parts = explode(' ', $begin);
        $begin = $begin_parts[0] . ' 00:00:00';
        $end_parts = explode(' ', $end);
        $end = $end_parts[0] . ' 23:59:59';

        return $this->get_start_end_date_filter($layout_def,$begin,$end);
	}

	function queryFilterTP_last_month(& $layout_def) {

		global $timedate;

        $begin_timestamp = time();
        $begin = gmdate($GLOBALS['timedate']->get_db_date_time_format(), $begin_timestamp);
		$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), true, $this->assigned_user);

        $begin_parts = explode(' ', $begin);
        $curr_date = explode('-',$begin_parts[0]);

		//Get year and month from time stamp.
		$curr_year=$curr_date[0];
		$curr_month=$curr_date[1];

		//get start date for last month and convert it to gmt and db format.
	    $begin=date($GLOBALS['timedate']->get_db_date_time_format(),strtotime("-1 month",mktime(0,0,0,$curr_month,1,$curr_year)));

	    //get end date for last month  and convert it to gmt and db format.
        $end=date($GLOBALS['timedate']->get_db_date_time_format(),strtotime("-1 day",mktime(23,59,59,$curr_month,1,$curr_year)));
		return $this->get_start_end_date_filter($layout_def,$begin,$end);
	}

	function queryFilterTP_this_month(& $layout_def) {

		global $timedate;

        $begin_timestamp = time();
        $begin = gmdate($GLOBALS['timedate']->get_db_date_time_format(), $begin_timestamp);
		$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), true, $this->assigned_user);

        $begin_parts = explode(' ', $begin);
        $curr_date = explode('-',$begin_parts[0]);

		//Get year and month from time stamp.
		$curr_year=$curr_date[0];
		$curr_month=$curr_date[1];

		//get start date for this month and convert it to gmt and db format.
	    $begin=date($GLOBALS['timedate']->get_db_date_time_format(),mktime(0,0,0,$curr_month,1,$curr_year));

	    //get end date for this month  and convert it to gmt and db format.
	    //first get the first day of next month and move back by one day.
		if ($curr_month==12) {
			$curr_month=1;
			$curr_year+=1;
		} else {
			$curr_month+=1;
		}
        $end=date($GLOBALS['timedate']->get_db_date_time_format(),strtotime("-1 day",mktime(23,59,59,$curr_month,1,$curr_year)));
		return $this->get_start_end_date_filter($layout_def,$begin,$end);
	}

	function queryFilterTP_next_month(& $layout_def) {
		global $timedate;

        $begin_timestamp = time();
        $begin = gmdate($GLOBALS['timedate']->get_db_date_time_format(), $begin_timestamp);
		$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), true, $this->assigned_user);

        $begin_parts = explode(' ', $begin);
        $curr_date = explode('-',$begin_parts[0]);

		//Get year and month from time stamp.
		$curr_year=$curr_date[0];
		$curr_month=$curr_date[1];

		if ($curr_month==12) {
			$curr_month=1;
			$curr_year+=1;
		} else {
			$curr_month+=1;
		}

		//get start date for next month and convert it to gmt and db format.
	    $begin=date($GLOBALS['timedate']->get_db_date_time_format(),mktime(0,0,0,$curr_month,1,$curr_year));
        $end=date($GLOBALS['timedate']->get_db_date_time_format(),strtotime("-1 day",(strtotime("1 month",mktime(23,59,59,$curr_month,1,$curr_year)))));

		return $this->get_start_end_date_filter($layout_def,$begin,$end);
	}

	function queryFilterTP_last_30_days(& $layout_def) {
		global $timedate;

        $begin_timestamp = time() - (29 * 86400);
        $begin = gmdate($GLOBALS['timedate']->get_db_date_time_format(), $begin_timestamp);
		$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), true, $this->assigned_user);
        $end_timestamp = time();
        $end = gmdate($GLOBALS['timedate']->get_db_date_time_format(), $end_timestamp);
		$end = $timedate->handle_offset($end, $timedate->get_db_date_time_format(), true, $this->assigned_user);

        $begin_parts = explode(' ', $begin);
        $begin = $begin_parts[0] . ' 00:00:00';
        $end_parts = explode(' ', $end);
        $end = $end_parts[0] . ' 23:59:59';
        
        return $this->get_start_end_date_filter($layout_def,$begin,$end);
	}

	function queryFilterTP_next_30_days(& $layout_def) {
		global $timedate;

        $begin_timestamp = time();
        $begin = gmdate($GLOBALS['timedate']->get_db_date_time_format(), $begin_timestamp);
		$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), true, $this->assigned_user);
        $end_timestamp = time() + (29 * 86400);
        $end = gmdate($GLOBALS['timedate']->get_db_date_time_format(), $end_timestamp);
		$end = $timedate->handle_offset($end, $timedate->get_db_date_time_format(), true, $this->assigned_user);

        $begin_parts = explode(' ', $begin);
        $begin = $begin_parts[0] . ' 00:00:00';
        $end_parts = explode(' ', $end);
        $end = $end_parts[0] . ' 23:59:59';

        return $this->get_start_end_date_filter($layout_def,$begin,$end);
	}


	function queryFilterTP_this_quarter(& $layout_def) {
	}

	function queryFilterTP_last_year(& $layout_def) {

		global $timedate;

        $begin_timestamp = time();
        $begin = gmdate($GLOBALS['timedate']->get_db_date_time_format(), $begin_timestamp);
		$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), true, $this->assigned_user);

        $begin_parts = explode(' ', $begin);
        $curr_date = explode('-',$begin_parts[0]);

		//Get year and month from time stamp.
		$curr_year=$curr_date[0]-1;

		//get start date for last year and convert it to gmt and db format.
	    $begin=date($GLOBALS['timedate']->get_db_date_time_format(),mktime(0,0,0,1,1,$curr_year));

	    //get end date for last year  and convert it to gmt and db format.
        $end=date($GLOBALS['timedate']->get_db_date_time_format(),mktime(23,59,59,12,31,$curr_year));

		return $this->get_start_end_date_filter($layout_def,$begin,$end);
	}

	function queryFilterTP_this_year(& $layout_def) {
		global $timedate;
        $begin_timestamp = time();
        $begin = gmdate($GLOBALS['timedate']->get_db_date_time_format(), $begin_timestamp);
		$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), true, $this->assigned_user);

        $begin_parts = explode(' ', $begin);
        $curr_date = explode('-',$begin_parts[0]);

		//Get year and month from time stamp.
		$curr_year=$curr_date[0];

		//get start date for this year and convert it to gmt and db format.
	    $begin=date($GLOBALS['timedate']->get_db_date_time_format(),mktime(0,0,0,1,1,$curr_year));

	    //get end date for this year  and convert it to gmt and db format.
        $end=date($GLOBALS['timedate']->get_db_date_time_format(),mktime(23,59,59,12,31,$curr_year));

		return $this->get_start_end_date_filter($layout_def,$begin,$end);
	}

	function queryFilterTP_next_year(& $layout_def) {
		global $timedate;
        $begin_timestamp = time();
        $begin = gmdate($GLOBALS['timedate']->get_db_date_time_format(), $begin_timestamp);
		$begin = $timedate->handle_offset($begin, $timedate->get_db_date_time_format(), true, $this->assigned_user);

        $begin_parts = explode(' ', $begin);
        $curr_date = explode('-',$begin_parts[0]);

		//Get year and month from time stamp.
		$curr_year=$curr_date[0]+1;


		//get start date for this year and convert it to gmt and db format.
	    $begin=date($GLOBALS['timedate']->get_db_date_time_format(),mktime(0,0,0,1,1,$curr_year));

	    //get end date for this year  and convert it to gmt and db format.
        $end=date($GLOBALS['timedate']->get_db_date_time_format(),mktime(23,59,59,12,31,$curr_year));

		return $this->get_start_end_date_filter($layout_def,$begin,$end);
	}

	
    
}

?>
