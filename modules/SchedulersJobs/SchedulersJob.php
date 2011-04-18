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




class SchedulersJob extends SugarBean {
	// schema attributes
	var $id = '';
	var $deleted = '';
	var $date_entered = '';
	var $date_modified = '';
	var $scheduler_id = '';
	var $execute_time = '';
	var $status;
	// standard SugarBean child attrs
	var $table_name		= "schedulers_times";
	var $object_name		= "SchedulersJob";
	var $module_dir		= "SchedulersJobs";
	var $new_schema		= true;
	var $process_save_dates = true;
	// related fields
	var $job_name;	// the Scheduler's 'name' field
	var $job;		// the Scheduler's 'job' field
	// object specific attributes
	var $user; // User object
	var $scheduler; // Scheduler parent

	/**
	 * Sole constructor.
	 */
	function SchedulersJob($init=true) {
		parent::SugarBean();

		if($init) {

			$user = new User();
			$user->retrieve('1'); // Scheduler jobs run as Admin
			$this->user = $user;
		}

	}

	///////////////////////////////////////////////////////////////////////////
	////	SCHEDULERSJOB HELPER FUNCTIONS

	function fireSelf($id) {

		$sched = new Scheduler();
		$sched->retrieve($id);

		$exJob = explode('::', $sched->job);

		if(is_array($exJob)) {
			$this->scheduler_id	= $sched->id;
			$this->scheduler		= $sched;
			$this->execute_time	= $this->handleDateFormat('now');
			$this->save();

			if($exJob[0] == 'function') {
				$GLOBALS['log']->debug('----->Scheduler found a job of type FUNCTION');
				require_once('modules/Schedulers/_AddJobsHere.php');

				$this->setJobFlag(1);

				$func = $exJob[1];
				$GLOBALS['log']->debug('----->SchedulersJob firing '.$func);

				$res = call_user_func($func);
				if($res) {
					$this->setJobFlag(2);
					$this->finishJob();
					return true;
				} else {
					$this->setJobFlag(3);
					return false;
				}
			} elseif($exJob[0] == 'url') {
				if(function_exists('curl_init')) {
					$GLOBALS['log']->debug('----->SchedulersJob found a job of type URL');
					$this->setJobFlag(1);

					$GLOBALS['log']->debug('----->SchedulersJob firing URL job: '.$exJob[1]);
					if($this->fireUrl($exJob[1])) {
						$this->setJobFlag(2);
						$this->finishJob();
						return true;
					} else {
						$this->setJobFlag(3);
						return false;
					}
				} else {
					$this->setJobFlag(4);
					return false;
				}
			}
		}
		return false;
	}

	/**
	 * handles some date/time foramtting
	 * @param string time Time (usually "now")
	 * @param object user User, usually admin (id = '1')
	 * @return string formatted time.
	 */
	function handleDateFormat($time, $user=null) {
		$timedate = TimeDate::getInstance();

		// get proper user
		$user = (empty($user)) ? $this->user : $user;
		$dbTime = $timedate->nowDb();

		$ret = $timedate->to_display_date_time($dbTime, true, true, $user);
		return $ret;
	}

	function setJobFlag($flag) {
		$trackerManager = TrackerManager::getInstance();
		$trackerManager->pause();
		$status = array (0 => 'ready', 1 => 'in progress', 2 => 'completed', 3 => 'failed', 4 => 'no curl');
		$statusScheduler = array (0 => 'Active', 1 => 'In Progress', 2 => 'Active', 3 => 'Active', 4 => 'Active');
		$GLOBALS['log']->info('-----> SchedulersJob setting Job flag: '.$status[$flag].' AND setting Scheduler status to: '.$statusScheduler[$flag]);

		$time = $this->handleDateFormat('now');
		$this->status = $status[$flag];
		$this->scheduler->retrieve($this->scheduler_id);
		$this->scheduler->status = $statusScheduler[$flag];
		$this->scheduler->save();
		$this->save();
		$this->retrieve($this->id);
		$trackerManager->unPause();
	}

	/**
	 * This function takes a job_id, and updates schedulers last_run as well as
	 * soft delete the job instance from schedulers_times
	 * @return	boolean		Success
	 */
	function finishJob() {
		$trackerManager = TrackerManager::getInstance();
		$trackerManager->pause();
		$GLOBALS['log']->debug('----->SchedulersJob updating Job Status and finishing Job execution.');
		$this->scheduler->retrieve($this->scheduler->id);
		$this->scheduler->last_run = TimeDate::getInstance()->nowDb();
		$this->scheduler->save();
		$trackerManager->unPause();
	}

	/**
	 * This function takes a passed URL and cURLs it to fake multi-threading with another httpd instance
	 * @param	$job		String in URI-clean format
	 * @param	$timeout	Int value in secs for cURL to timeout. 30 default.
	 */
	//TODO: figure out what error is thrown when no more apache instances can be spun off
	function fireUrl($job, $timeout=30) {
		// cURL inits
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $job); // set url
		curl_setopt($ch, CURLOPT_FAILONERROR, true); // silent failure (code >300);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // do not follow location(); inits - we always use the current
		curl_setopt($ch, CURLOPT_FORBID_REUSE, 1);
		curl_setopt($ch, CURLOPT_DNS_USE_GLOBAL_CACHE, false);  // not thread-safe
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // return into a variable to continue program execution
		curl_setopt($ch, CURLOPT_TIMEOUT, $timeout); // never times out - bad idea?
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5); // 5 secs for connect timeout
		curl_setopt($ch, CURLOPT_FRESH_CONNECT, true);  // open brand new conn
		curl_setopt($ch, CURLOPT_HEADER, true); // do not return header info with result
		curl_setopt($ch, CURLOPT_NOPROGRESS, true); // do not have progress bar
		$urlparts = parse_url($job);
		if(empty($urlparts['port'])) {
		    if($urlparts['scheme'] == 'https'){
				$urlparts['port'] = 443;
			} else {
				$urlparts['port'] = 80;
			}
		}
		curl_setopt($ch, CURLOPT_PORT, $urlparts['port']); // set port as reported by Server
		//TODO make the below configurable
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); // most customers will not have Certificate Authority account
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // most customers will not have Certificate Authority account

		if(constant('PHP_VERSION') > '5.0.0') {
			curl_setopt($ch, CURLOPT_NOSIGNAL, true); // ignore any cURL signals to PHP (for multi-threading)
		}
		$result = curl_exec($ch);
		$cInfo = curl_getinfo($ch);	//url,content_type,header_size,request_size,filetime,http_code
									//ssl_verify_result,total_time,namelookup_time,connect_time
									//pretransfer_time,size_upload,size_download,speed_download,
									//speed_upload,download_content_length,upload_content_length
									//starttransfer_time,redirect_time
		curl_close($ch);

		if($result !== FALSE && $cInfo['http_code'] < 400) {
			$GLOBALS['log']->debug('----->Firing was successful: ('.$job.') at '.$this->handleDateFormat('now'));
			$GLOBALS['log']->debug('----->WTIH RESULT: '.strip_tags($result).' AND '.strip_tags(print_r($cInfo, true)));
			return true;
		} else {
			$GLOBALS['log']->fatal('Job errored: ('.$job.') at '.$this->handleDateFormat('now'));
			return false;
		}
	}
	////	END SCHEDULERSJOB HELPER FUNCTIONS
	///////////////////////////////////////////////////////////////////////////


	///////////////////////////////////////////////////////////////////////////
	////	STANDARD SUGARBEAN OVERRIDES
	/**
	 * This function gets DB data and preps it for ListViews
	 */
	function get_list_view_data(){
		global $mod_strings;

		$temp_array = $this->get_list_view_array();
		$temp_array['JOB_NAME'] = $this->job_name;
		$temp_array['JOB']		= $this->job;

    	return $temp_array;
	}

	/** method stub for future customization
	 *
	 */
	function fill_in_additional_list_fields() {
		$this->fill_in_additional_detail_fields();
	}

	function fill_in_additional_detail_fields() {
		// get the Job Name and Job fields from schedulers table
//		$q = "SELECT name, job FROM schedulers WHERE id = '".$this->job_id."'";
//		$result = $this->db->query($q);
//		$row = $this->db->fetchByAssoc($result);
//		$this->job_name = $row['name'];
//		$this->job = $row['job'];
//		$GLOBALS['log']->info('Assigned Name('.$this->job_name.') and Job('.$this->job.') to Job');
//
//		$this->created_by_name = get_assigned_user_name($this->created_by);
//		$this->modified_by_name = get_assigned_user_name($this->modified_user_id);

    }

	/**
	 * returns the bean name - overrides SugarBean's
	 */
	function get_summary_text() {
        if(isset($this->name))
		return $this->name;
	}

	/**
	 * function overrides the one in SugarBean.php
	 */

}  // end class Job
?>
