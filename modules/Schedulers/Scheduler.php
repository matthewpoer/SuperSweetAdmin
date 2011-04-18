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

 * Description:
 ********************************************************************************/

class Scheduler extends SugarBean {
	// table columns
	var $id;
	var $deleted;
	var $date_entered;
	var $date_modified;
	var $modified_user_id;
	var $created_by;
	var $created_by_name;
	var $modified_by_name;
	var $name;
	var $job;
	var $date_time_start;
	var $date_time_end;
	var $job_interval;
	var $time_from;
	var $time_to;
	var $last_run;
	var $status;
	var $catch_up;
	// object attributes
	var $user;
	var $intervalParsed;
	var $intervalHumanReadable;
	var $metricsVar;
	var $metricsVal;
	var $dayInt;
	var $dayLabel;
	var $monthsInt;
	var $monthsLabel;
	var $suffixArray;
	var $datesArray;
	var $scheduledJobs;
	var $timeOutMins = 60;
	// standard SugarBean attrs
	var $table_name				= "schedulers";
	var $object_name			= "schedulers";
	var $module_dir				= "Schedulers";
	var $new_schema				= true;
	var $process_save_dates 	= true;
	var $order_by;


	function Scheduler($init=true) {
		parent::SugarBean();

		if($init) {

			$user = new User();
			$user->retrieve('1'); // Scheduler jobs run as Admin
			$this->user = $user;
		}
	}


	///////////////////////////////////////////////////////////////////////////
	////	SCHEDULER HELPER FUNCTIONS
	/**
	 * executes Scheduled job
	 */
	function fire() {
		if(empty($this->job)) { // only execute when valid
			$GLOBALS['log']->fatal('Scheduler tried to fire an empty job!!');
			return false;
		}

		$exJob = explode('::', $this->job);
		if(is_array($exJob)) {
			// instantiate a new SchedulersJob object and prep it


			$trackerManager = TrackerManager::getInstance();
			$trackerManager->pause();
			$job				= new SchedulersJob();
			$job->scheduler_id	= $this->id;
			$job->scheduler		= $this;
			$job->execute_time	= $job->handleDateFormat('now');
			$jobId = $job->save();
			$trackerManager->unPause();
			$job->retrieve($jobId);

			if($exJob[0] == 'function') {
				$GLOBALS['log']->debug('----->Scheduler found a job of type FUNCTION');
				require_once('modules/Schedulers/_AddJobsHere.php');

				$job->setJobFlag(1);

				$func = $exJob[1];
				$GLOBALS['log']->debug('----->SchedulersJob firing '.$func);

				$res = call_user_func($func);
				if($res) {
					$job->setJobFlag(2);
					$job->finishJob();
					return true;
				} else {
					$job->setJobFlag(3);
					return false;
				}
			} elseif($exJob[0] == 'url') {
				if(function_exists('curl_init')) {
					$GLOBALS['log']->debug('----->SchedulersJob found a job of type URL');
					$job->setJobFlag(1);

					$GLOBALS['log']->debug('----->SchedulersJob firing URL job: '.$exJob[1]);
					if($job->fireUrl($exJob[1])) {
						$job->setJobFlag(2);
						$job->finishJob();
						return true;
					} else {
						$job->setJobFlag(3);
						return false;
					}
				} else {
					$job->setJobFlag(4);
					return false;
				}
			}
		}
		return false;
	}

	/**
	 * flushes dead or hung jobs
	 */
	function flushDeadJobs() {
		$GLOBALS['log']->debug('-----> Scheduler flushing dead jobs');

		$lowerLimit = mktime(0, 0, 0, 1, 1, 2005); // jan 01, 2005, GMT-0
		$now = TimeDate::getInstance()->getNow()->ts; // current timestamp

		$q = "	SELECT s.id, s.name FROM schedulers s WHERE s.deleted=0 AND s.status = 'In Progress'";
		$r = $this->db->query($q);

		if($r != null) {
			while($a = $this->db->fetchByAssoc($r)) {
				$q2 = "	SELECT st.id, st.execute_time FROM schedulers_times st
						WHERE st.deleted=0
						AND st.scheduler_id = '{$a['id']}'
						ORDER BY st.execute_time DESC";
				$r2 = $this->db->query($q2);
				if($r2 != null) {
					$a2 = $this->db->fetchByAssoc($r2); // we only care about the newest
					if($a2 != null) {
						$GLOBALS['log']->debug("-----> Scheduler found [ {$a['name']} ] 'In Progress' with most recent Execute Time at [ {$a2['execute_time']} GMT-0 ]");

						$execTime = strtotime($a2['execute_time']);
						if($execTime > $lowerLimit) {
							if(($now - $execTime) >= (60 * $this->timeOutMins)) {
								$GLOBALS['log']->info("-----> Scheduler found a dead Job.  Flushing status and reseting Job");
								$q3 = "UPDATE schedulers SET status = 'Active' WHERE id = '{$a['id']}'";
								$this->db->query($q3);

								$GLOBALS['log']->info("-----> Scheduler setting Job Instance status to 'failed'");
								$q4 = "UPDATE schedulers_times SET status = 'failed' WHERE id = '{$a2['id']}';";
								$this->db->query($q4);
							} else {
								$GLOBALS['log']->debug("-----> Scheduler will wait for job to complete - not past threshold of [ ".($this->timeOutMins * 60)."secs ] - timeDiff is ".($now - $execTime)." secs");
							}
						} else {
							$GLOBALS['log']->fatal("-----> Scheduler got a bad execute time: 	[ {$a2['execute_time']} GMT-0 ]");
						}

					}
				}
			}
		} // if
	}

	/**
	 * calculates if a job is qualified to run
	 */
	function fireQualified() {
		if(empty($this->id)) { // execute only if we have an instance
			$GLOBALS['log']->fatal('Scheduler called fireQualified() in a non-instance');
			return false;
		}

		$now = TimeDate::getInstance()->getNow();
		$now = $now->setTime($now->hour, $now->min)->asDb();
		$validTimes = $this->deriveDBDateTimes($this);

		if(is_array($validTimes) && in_array($now, $validTimes)) {
			$GLOBALS['log']->debug('----->Scheduler found valid job ('.$this->name.') for time GMT('.$now.')');
			return true;
		} else {
			$GLOBALS['log']->debug('----->Scheduler did NOT find valid job ('.$this->name.') for time GMT('.$now.')');
			return false;
		}
	}

	/**
	 * Checks if any jobs qualify to run at this moment
	 */
	function checkPendingJobs() {
		$this->cleanJobLog();
		$allSchedulers = $this->get_full_list('', 'schedulers.status=\'Active\'');

		$GLOBALS['log']->info('-----> Scheduler found [ '.count($allSchedulers).' ] ACTIVE jobs');

		if(!empty($allSchedulers)) {
			foreach($allSchedulers as $focus) {
				if($focus->fireQualified()) {
					if($focus->fire()) {
						$GLOBALS['log']->debug('----->Scheduler Job completed successfully');
					} else {
						$GLOBALS['log']->fatal('----->Scheduler Job FAILED');
					}
				}
			}
		} else {
			$GLOBALS['log']->debug('----->No Schedulers found');
		}
	}

	/**
	 * This function takes a Scheduler object and uses its job_interval
	 * attribute to derive DB-standard datetime strings, as many as are
	 * qualified by its ranges.  The times are from the time of calling the
	 * script.
	 *
	 * @param	$focus		Scheduler object
	 * @return	$dateTimes	array loaded with DB datetime strings derived from
	 * 						the	 job_interval attribute
	 * @return	false		If we the Scheduler is not in scope, return false.
	 */
	function deriveDBDateTimes($focus) {
        global $timedate;
		$GLOBALS['log']->debug('----->Schedulers->deriveDBDateTimes() got an object of type: '.$focus->object_name);
		/* [min][hr][dates][mon][days] */
		$dateTimes = array();
		$ints	= explode('::', str_replace(' ','',$focus->job_interval));
		$days	= $ints[4];
		$mons	= $ints[3];
		$dates	= $ints[2];
		$hrs	= $ints[1];
		$mins	= $ints[0];
		$today	= getdate(TimeDate::getInstance()->getNow()->ts);

		// derive day part
		if($days == '*') {
			$GLOBALS['log']->debug('----->got * day');

		} elseif(strstr($days, '*/')) {
			// the "*/x" format is nonsensical for this field
			// do basically nothing.
			$theDay = str_replace('*/','',$days);
			$dayName[] = $theDay;
		} elseif($days != '*') { // got particular day(s)
			if(strstr($days, ',')) {
				$exDays = explode(',',$days);
				foreach($exDays as $k1 => $dayGroup) {
					if(strstr($dayGroup,'-')) {
						$exDayGroup = explode('-', $dayGroup); // build up range and iterate through
						for($i=$exDayGroup[0];$i<=$exDayGroup[1];$i++) {
							$dayName[] = $i;
						}
					} else { // individuals
						$dayName[] = $dayGroup;
					}
				}
			} elseif(strstr($days, '-')) {
				$exDayGroup = explode('-', $days); // build up range and iterate through
				for($i=$exDayGroup[0];$i<=$exDayGroup[1];$i++) {
					$dayName[] = $i;
				}
			} else {
				$dayName[] = $days;
			}

			// check the day to be in scope:
			if(!in_array(($today['wday']+6)%7, $dayName)) {//$dayName starts from Monday, while $today['wday'] starts from Sunday
				return false;
			}
		} else {
			return false;
		}


		// derive months part
		if($mons == '*') {
			$GLOBALS['log']->debug('----->got * months');
		} elseif(strstr($mons, '*/')) {
			$mult = str_replace('*/','',$mons);
			$startMon = $timedate->fromDb(date_time_start)->month;
			$startFrom = ($startMon % $mult);

			for($i=$startFrom;$i<=12;$i+$mult) {
				$compMons[] = $i+$mult;
				$i += $mult;
			}
			// this month is not in one of the multiplier months
			if(!in_array($today['mon'],$compMons)) {
				return false;
			}
		} elseif($mons != '*') {
			if(strstr($mons,',')) { // we have particular (groups) of months
				$exMons = explode(',',$mons);
				foreach($exMons as $k1 => $monGroup) {
					if(strstr($monGroup, '-')) { // we have a range of months
						$exMonGroup = explode('-',$monGroup);
						for($i=$exMonGroup[0];$i<=$exMonGroup[1];$i++) {
							$monName[] = $i;
						}
					} else {
						$monName[] = $monGroup;
					}
				}
			} elseif(strstr($mons, '-')) {
				$exMonGroup = explode('-', $mons);
				for($i=$exMonGroup[0];$i<=$exMonGroup[1];$i++) {
					$monName[] = $i;
				}
			} else { // one particular month
				$monName[] = $mons;
			}

			// check that particular months are in scope
			if(!in_array($today['mon'], $monName)) {
				return false;
			}
		}

		// derive dates part
		if($dates == '*') {
			$GLOBALS['log']->debug('----->got * dates');
		} elseif(strstr($dates, '*/')) {
			$mult = str_replace('*/','',$dates);
			$startDate = $timedate->fromDb($focus->date_time_start)->day;
			$startFrom = ($startDate % $mult);

			for($i=$startFrom; $i<=31; $i+$mult) {
				$dateName[] = str_pad(($i+$mult),2,'0',STR_PAD_LEFT);
				$i += $mult;
			}

			if(!in_array($today['mday'], $dateName)) {
				return false;
			}
		} elseif($dates != '*') {
			if(strstr($dates, ',')) {
				$exDates = explode(',', $dates);
				foreach($exDates as $k1 => $dateGroup) {
					if(strstr($dateGroup, '-')) {
						$exDateGroup = explode('-', $dateGroup);
						for($i=$exDateGroup[0];$i<=$exDateGroup[1];$i++) {
							$dateName[] = $i;
						}
					} else {
						$dateName[] = $dateGroup;
					}
				}
			} elseif(strstr($dates, '-')) {
				$exDateGroup = explode('-', $dates);
				for($i=$exDateGroup[0];$i<=$exDateGroup[1];$i++) {
					$dateName[] = $i;
				}
			} else {
				$dateName[] = $dates;
			}

			// check that dates are in scope
			if(!in_array($today['mday'], $dateName)) {
				return false;
			}
		}

		// derive hours part
		//$currentHour = gmdate('G');
		//$currentHour = date('G', strtotime('00:00'));
		if($hrs == '*') {
			$GLOBALS['log']->debug('----->got * hours');
			for($i=0;$i<24; $i++) {
				$hrName[]=$i;
			}
		} elseif(strstr($hrs, '*/')) {
			$mult = str_replace('*/','',$hrs);
			for($i=0; $i<24; $i) { // weird, i know
				$hrName[]=$i;
				$i += $mult;
			}
		} elseif($hrs != '*') {
			if(strstr($hrs, ',')) {
				$exHrs = explode(',',$hrs);
				foreach($exHrs as $k1 => $hrGroup) {
					if(strstr($hrGroup, '-')) {
						$exHrGroup = explode('-', $hrGroup);
						for($i=$exHrGroup[0];$i<=$exHrGroup[1];$i++) {
							$hrName[] = $i;
						}
					} else {
						$hrName[] = $hrGroup;
					}
				}
			} elseif(strstr($hrs, '-')) {
				$exHrs = explode('-', $hrs);
				for($i=$exHrs[0];$i<=$exHrs[1];$i++) {
					$hrName[] = $i;
				}
			} else {
				$hrName[] = $hrs;
			}
		}
		//_pp($hrName);
		// derive minutes
		//$currentMin = date('i');
		$currentMin = $timedate->getNow()->minute;
		if(substr($currentMin, 0, 1) == '0') {
			$currentMin = substr($currentMin, 1, 1);
		}
		if($mins == '*') {
			$GLOBALS['log']->debug('----->got * mins');
			for($i=0; $i<60; $i++) {
				if(($currentMin + $i) > 59) {
					$minName[] = ($i + $currentMin - 60);
				} else {
					$minName[] = ($i+$currentMin);
				}
			}
		} elseif(strstr($mins,'*/')) {
			$mult = str_replace('*/','',$mins);
			$startMin = $timedate->fromDb($focus->date_time_start)->minute;
			$startFrom = ($startMin % $mult);
			for($i=$startFrom; $i<=59; $i) {
				if(($currentMin + $i) > 59) {
					$minName[] = ($i + $currentMin - 60);
				} else {
					$minName[] = ($i+$currentMin);
				}
				$i += $mult;
			}

		} elseif($mins != '*') {
			if(strstr($mins, ',')) {
				$exMins = explode(',',$mins);
				foreach($exMins as $k1 => $minGroup) {
					if(strstr($minGroup, '-')) {
						$exMinGroup = explode('-', $minGroup);
						for($i=$exMinGroup[0]; $i<=$exMinGroup[1]; $i++) {
							$minName[] = $i;
						}
					} else {
						$minName[] = $minGroup;
					}
				}
			} elseif(strstr($mins, '-')) {
				$exMinGroup = explode('-', $mins);
				for($i=$exMinGroup[0]; $i<=$exMinGroup[1]; $i++) {
					$minName[] = $i;
				}
			} else {
				$minName[] = $mins;
			}
		}
		//_pp($minName);
		// prep some boundaries - these are not in GMT b/c gmt is a 24hour period, possibly bridging 2 local days
		if(empty($focus->time_from)  && empty($focus->time_to) ) {
			$timeFromTs = 0;
			$timeToTs = strtotime('+1 day');
		} else {
			$timeFromTs = strtotime($focus->time_from);	// these are now GMT (timestamps are all GMT)
			$timeToTs	= strtotime($focus->time_to);	// see above
			if($timeFromTs > $timeToTs) { // we've crossed into the next day
				$timeToTs = strtotime('+1 day '. $focus->time_to);	// also in GMT
			}
		}
		$timeToTs++;

		if(empty($focus->last_run)) {
			$lastRunTs = 0;
		} else {
			$lastRunTs = strtotime($focus->last_run . ' UTC');
		}


		/**
		 * initialize return array
		 */
		$validJobTime = array();

		global $timedate;
		$timeStartTs = strtotime($focus->date_time_start . ' UTC');
		if(!empty($focus->date_time_end)) { // do the same for date_time_end if not empty
			$dateTimeEnd = $focus->date_time_end;
		} else {
			$dateTimeEnd = $timedate->getNow()+get('+1 day')->asDb();
//			$dateTimeEnd = '2020-12-31 23:59:59'; // if empty, set it to something ridiculous
		}
		$timeEndTs = strtotime($dateTimeEnd.' UTC'); // GMT end timestamp if necessary
		$timeEndTs++;
		/*_pp('hours:'); _pp($hrName);_pp('mins:'); _pp($minName);*/
		$nowTs = $timedate->getNow()->ts;

//		_pp('currentHour: '. $currentHour);
//		_pp('timeStartTs: '.date('r',$timeStartTs));
//		_pp('timeFromTs: '.date('r',$timeFromTs));
//		_pp('timeEndTs: '.date('r',$timeEndTs));
//		_pp('timeToTs: '.date('r',$timeToTs));
//		_pp('mktime: '.date('r',mktime()));
//		_pp('timeLastRun: '.date('r',$lastRunTs));
//
//		_pp('hours: ');
//		_pp($hrName);
//		_pp('mins: ');
//		_ppd($minName);
		$hourSeen = 0;
		foreach($hrName as $kHr=>$hr) {
			$hourSeen++;
			foreach($minName as $kMin=>$min) {
				if($hourSeen == 25) {
					$theDate = TimeDate::getInstance()->asDbDate(TimeDate::getInstance()->getNow()->get('+1 day'));
				} else {
					$theDate = TimeDate::getInstance()->nowDbDate();
				}

				$tsGmt = strtotime($theDate.' '.str_pad($hr,2,'0',STR_PAD_LEFT).":".str_pad($min,2,'0',STR_PAD_LEFT).":00"); // this is LOCAL

				if( $tsGmt >= $timeStartTs ) { // start is greater than the date specified by admin
					if( $tsGmt >= $timeFromTs ) { // start is greater than the time_to spec'd by admin
                        if($tsGmt > $lastRunTs) { // start from last run, last run should not be included
                            if( $tsGmt <= $timeEndTs ) { // this is taken care of by the initial query - start is less than the date spec'd by admin
                                if( $tsGmt <= $timeToTs ) { // start is less than the time_to
                                    $validJobTime[] = $timedate->asDb($timedate->fromTimestamp($tsGmt));
                                } else {
                                    //_pp('Job Time is NOT smaller that TimeTO: '.$tsGmt .'<='. $timeToTs);
                                }
                            } else {
                                //_pp('Job Time is NOT smaller that DateTimeEnd: '.date('Y-m-d H:i:s',$tsGmt) .'<='. $dateTimeEnd); //_pp( $tsGmt .'<='. $timeEndTs );
                            }
                        }
					} else {
						//_pp('Job Time is NOT bigger that TimeFrom: '.$tsGmt .'>='. $timeFromTs);
					}
				} else {
					//_pp('Job Time is NOT Bigger than DateTimeStart: '.date('Y-m-d H:i',$tsGmt) .'>='. $dateTimeStart);
				}
			}
		}
		//_ppd($validJobTime);
		// need ascending order to compare oldest time to last_run
		sort($validJobTime);
		/**
		 * If "Execute If Missed bit is set
		 */
		if($focus->catch_up == 1) {
			if($focus->last_run == null) {
				// always "catch-up"
				$validJobTime[] = $timedate->nowDb();
			} else {
				// determine what the interval in min/hours is
				// see if last_run is in it
				// if not, add NOW
                $now = $timedate->nowDb();
				if(!empty($validJobTime) && ($focus->last_run < $validJobTime[0]) && ($now > $validJobTime[0])) {
				// cn: empty() bug 5914;
				//if(!empty) should be checked, becasue if a scheduler is defined to run every day 4pm, then after 4pm, and it runs as 4pm, the $validJobTime will be empty, and it should not catch up
				//if $focus->last_run is the the day before yesterday,  it should run yesterday and tomorrow,  but it hadn't run yesterday, then it should catch up today. But today is already filtered out when doing date check before. The catch up will not work on this occasion. If the scheduler runs at least one time on each day, I think this bug can be avoided.
					$validJobTime[] = $now;
				}
			}
		}
		return $validJobTime;
	}

	function handleIntervalType($type, $value, $mins, $hours) {
		global $mod_strings;
		/* [0]:min [1]:hour [2]:day of month [3]:month [4]:day of week */
		$days = array (	0 => $mod_strings['LBL_MON'],
						1 => $mod_strings['LBL_TUE'],
						2 => $mod_strings['LBL_WED'],
						3 => $mod_strings['LBL_THU'],
						4 => $mod_strings['LBL_FRI'],
						5 => $mod_strings['LBL_SAT'],
						6 => $mod_strings['LBL_SUN'],
						'*' => $mod_strings['LBL_ALL']);
		switch($type) {
			case 0: // minutes
				if($value == '0') {
					//return;
					return trim($mod_strings['LBL_ON_THE']).$mod_strings['LBL_HOUR_SING'];
				} elseif(!preg_match('/[^0-9]/', $hours) && !preg_match('/[^0-9]/', $value)) {
					return;

				} elseif(preg_match('/\*\//', $value)) {
					$value = str_replace('*/','',$value);
					return $value.$mod_strings['LBL_MINUTES'];
				} elseif(!preg_match('[^0-9]', $value)) {
					return $mod_strings['LBL_ON_THE'].$value.$mod_strings['LBL_MIN_MARK'];
				} else {
					return $value;
				}
			case 1: // hours
				global $current_user;
				if(preg_match('/\*\//', $value)) { // every [SOME INTERVAL] hours
					$value = str_replace('*/','',$value);
					return $value.$mod_strings['LBL_HOUR'];
				} elseif(preg_match('/[^0-9]/', $mins)) { // got a range, or multiple of mins, so we return an 'Hours' label
					return $value;
				} else {	// got a "minutes" setting, so it will be at some o'clock.
					$datef = $current_user->getUserDateTimePreferences();
					return date($datef['time'], strtotime($value.':'.str_pad($mins, 2, '0', STR_PAD_LEFT)));
				}
			case 2: // day of month
				if(preg_match('/\*/', $value)) {
					return $value;
				} else {
					return date('jS', strtotime('December '.$value));
				}

			case 3: // months
				return date('F', strtotime('2005-'.$value.'-01'));
			case 4: // days of week
				return $days[$value];
			default:
				return 'bad'; // no condition to touch this branch
		}
	}

	function setIntervalHumanReadable() {
		global $current_user;
		global $mod_strings;

		/* [0]:min [1]:hour [2]:day of month [3]:month [4]:day of week */
		$ints = $this->intervalParsed;
		$intVal = array('-', ',');
		$intSub = array($mod_strings['LBL_RANGE'], $mod_strings['LBL_AND']);
		$intInt = array(0 => $mod_strings['LBL_MINS'], 1 => $mod_strings['LBL_HOUR']);
		$tempInt = '';
		$iteration = '';

		foreach($ints['raw'] as $key => $interval) {
			if($tempInt != $iteration) {
				$tempInt .= '; ';
			}
			$iteration = $tempInt;

			if($interval != '*' && $interval != '*/1') {
				if(false !== strpos($interval, ',')) {
					$exIndiv = explode(',', $interval);
					foreach($exIndiv as $val) {
						if(false !== strpos($val, '-')) {
							$exRange = explode('-', $val);
							foreach($exRange as $valRange) {
								if($tempInt != '') {
									$tempInt .= $mod_strings['LBL_AND'];
								}
								$tempInt .= $this->handleIntervalType($key, $valRange, $ints['raw'][0], $ints['raw'][1]);
							}
						} elseif($tempInt != $iteration) {
							$tempInt .= $mod_strings['LBL_AND'];
						}
						$tempInt .= $this->handleIntervalType($key, $val, $ints['raw'][0], $ints['raw'][1]);
					}
				} elseif(false !== strpos($interval, '-')) {
					$exRange = explode('-', $interval);
					$tempInt .= $mod_strings['LBL_FROM'];
					$check = $tempInt;

					foreach($exRange as $val) {
						if($tempInt == $check) {
							$tempInt .= $this->handleIntervalType($key, $val, $ints['raw'][0], $ints['raw'][1]);
							$tempInt .= $mod_strings['LBL_RANGE'];

						} else {
							$tempInt .= $this->handleIntervalType($key, $val, $ints['raw'][0], $ints['raw'][1]);
						}
					}

				} elseif(false !== strpos($interval, '*/')) {
					$tempInt .= $mod_strings['LBL_EVERY'];
					$tempInt .= $this->handleIntervalType($key, $interval, $ints['raw'][0], $ints['raw'][1]);
				} else {
					$tempInt .= $this->handleIntervalType($key, $interval, $ints['raw'][0], $ints['raw'][1]);
				}
			}
		} // end foreach()

		if($tempInt == '') {
			$this->intervalHumanReadable = $mod_strings['LBL_OFTEN'];
		} else {
			$tempInt = trim($tempInt);
			if(';' == substr($tempInt, (strlen($tempInt)-1), strlen($tempInt))) {
				$tempInt = substr($tempInt, 0, (strlen($tempInt)-1));
			}
			$this->intervalHumanReadable = $tempInt;
		}
	}


	/* take an integer and return its suffix */
	function setStandardArraysAttributes() {
		global $mod_strings;
		global $app_list_strings; // using from month _dom list

		$suffArr = array('','st','nd','rd');
		for($i=1; $i<32; $i++) {
			if($i > 3 && $i < 21) {
				$this->suffixArray[$i] = $i."th";
			} elseif (substr($i,-1,1) < 4 && substr($i,-1,1) > 0) {
				$this->suffixArray[$i] = $i.$suffArr[substr($i,-1,1)];
			} else {
				$this->suffixArray[$i] = $i."th";
			}
			$this->datesArray[$i] = $i;
		}

		$this->dayInt = array('*',1,2,3,4,5,6,7);
		$this->dayLabel = array('*',$mod_strings['LBL_MON'],$mod_strings['LBL_TUE'],$mod_strings['LBL_WED'],$mod_strings['LBL_THU'],$mod_strings['LBL_FRI'],$mod_strings['LBL_SAT'],$mod_strings['LBL_SUN']);
		$this->monthsInt = array(0,1,2,3,4,5,6,7,8,9,10,11,12);
		$this->monthsLabel = $app_list_strings['dom_cal_month_long'];
		$this->metricsVar = array("*", "/", "-", ",");
		$this->metricsVal = array(' every ','',' thru ',' and ');
	}

	/**
	 *  takes the serialized interval string and renders it into an array
	 */
	function parseInterval() {
		global $metricsVar;
		$ws = array(' ', '\r','\t');
		$blanks = array('','','');

		$intv = $this->job_interval;
		$rawValues = explode('::', $intv);
		$rawProcessed = str_replace($ws,$blanks,$rawValues); // strip all whitespace

		$hours = $rawValues[1].':::'.$rawValues[0];
		$months = $rawValues[3].':::'.$rawValues[2];

		$intA = array (	'raw' => $rawProcessed,
						'hours' => $hours,
						'months' => $months,
						);

		$this->intervalParsed = $intA;
	}

	/**
	 * soft-deletes all job logs older than 24 hours
	 */
	function cleanJobLog() {
		$this->db->query('DELETE FROM schedulers_times WHERE date_entered < '.db_convert('\''.TimeDate::getInstance()->nowDb(), strtotime('-24 hours')).'\'', 'datetime'.'');
	}

	/**
	 * checks for cURL libraries
	 */
	function checkCurl() {
		global $mod_strings;

		if(!function_exists('curl_init')) {
			echo '
			<table cellpadding="0" cellspacing="0" width="100%" border="0" class="list view">
				<tr height="20">
					<th width="25%" colspan="2"><slot>
						'.$mod_strings['LBL_WARN_CURL_TITLE'].'
					</slot></td>
				</tr>
				<tr class="oddListRowS1" >
					<td scope="row" valign=TOP width="20%"><slot>
						'.$mod_strings['LBL_WARN_CURL'].'
					<td scope="row" valign=TOP width="80%"><slot>
						<span class=error>'.$mod_strings['LBL_WARN_NO_CURL'].'</span>
					</slot></td>
				</tr>
			</table>
			<br>';
		}
	}

	function displayCronInstructions() {
		global $mod_strings;
		global $sugar_config;
		$error = '';
		if (!isset($_SERVER['Path'])) {
            $_SERVER['Path'] = getenv('Path');
        }
        if(is_windows()) {
			if(isset($_SERVER['Path']) && !empty($_SERVER['Path'])) { // IIS IUSR_xxx may not have access to Path or it is not set
				if(!strpos($_SERVER['Path'], 'php')) {
					$error = '<em>'.$mod_strings['LBL_NO_PHP_CLI'].'</em>';
				}
			}
		} else {
			if(isset($_SERVER['Path']) && !empty($_SERVER['Path'])) { // some Linux servers do not make this available
				if(!strpos($_SERVER['PATH'], 'php')) {
					$error = '<em>'.$mod_strings['LBL_NO_PHP_CLI'].'</em>';
				}
			}
		}



		if(is_windows()) {
			echo '<br>';
			echo '
				<table cellpadding="0" cellspacing="0" width="100%" border="0" class="list view">
				<tr height="20">
					<th><slot>
						'.$mod_strings['LBL_CRON_INSTRUCTIONS_WINDOWS'].'
					</slot></th>
				</tr>
				<tr class="evenListRowS1">
					<td scope="row" valign="top" width="70%"><slot>
						'.$mod_strings['LBL_CRON_WINDOWS_DESC'].'<br>
						<b>cd '.realpath('./').'<br>
						php.exe -f cron.php</b>
					</slot></td>
				</tr>
			</table>';
		} else {
			echo '<br>';
			echo '
				<table cellpadding="0" cellspacing="0" width="100%" border="0" class="list view">
				<tr height="20">
					<th><slot>
						'.$mod_strings['LBL_CRON_INSTRUCTIONS_LINUX'].'
					</slot></th>
				</tr>
				<tr>
					<td scope="row" valign=TOP class="oddListRowS1" bgcolor="#fdfdfd" width="70%"><slot>
						'.$mod_strings['LBL_CRON_LINUX_DESC'].'<br>
						<b>*&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;
						cd '.realpath('./').'; php -f cron.php > /dev/null 2>&1</b>
						<br>'.$error.'
					</slot></td>
				</tr>
			</table>';
		}
	}

	/**
	 * Archives schedulers of the same functionality, then instantiates new
	 * ones.
	 */
	function rebuildDefaultSchedulers() {
		global $mod_strings;
		// truncate scheduler-related tables
		$this->db->query('DELETE FROM schedulers');
		$this->db->query('DELETE FROM schedulers_times');


        $sched3 = new Scheduler();
        $sched3->name               = $mod_strings['LBL_OOTB_TRACKER'];
        $sched3->job                = 'function::trimTracker';
        $sched3->date_time_start    = create_date(2005,1,1) . ' ' . create_time(0,0,1);
        $sched3->date_time_end      = create_date(2020,12,31) . ' ' . create_time(23,59,59);
        $sched3->job_interval       = '0::2::1::*::*';
        $sched3->status             = 'Active';
        $sched3->created_by         = '1';
        $sched3->modified_user_id   = '1';
        $sched3->catch_up           = '1';
        $sched3->save();
		$sched4 = new Scheduler();
		$sched4->name				= $mod_strings['LBL_OOTB_IE'];
		$sched4->job				= 'function::pollMonitoredInboxes';
		$sched4->date_time_start	= create_date(2005,1,1) . ' ' . create_time(0,0,1);
		$sched4->date_time_end		= create_date(2020,12,31) . ' ' . create_time(23,59,59);
		$sched4->job_interval		= '*::*::*::*::*';
		$sched4->status				= 'Active';
		$sched4->created_by			= '1';
		$sched4->modified_user_id	= '1';
		$sched4->catch_up			= '0';
		$sched4->save();

		$sched5 = new Scheduler();
		$sched5->name				= $mod_strings['LBL_OOTB_BOUNCE'];
		$sched5->job				= 'function::pollMonitoredInboxesForBouncedCampaignEmails';
		$sched5->date_time_start	= create_date(2005,1,1) . ' ' . create_time(0,0,1);
		$sched5->date_time_end		= create_date(2020,12,31) . ' ' . create_time(23,59,59);
		$sched5->job_interval		= '0::2-6::*::*::*';
		$sched5->status				= 'Active';
		$sched5->created_by			= '1';
		$sched5->modified_user_id	= '1';
		$sched5->catch_up			= '1';
		$sched5->save();

		$sched6 = new Scheduler();
		$sched6->name				= $mod_strings['LBL_OOTB_CAMPAIGN'];
		$sched6->job				= 'function::runMassEmailCampaign';
		$sched6->date_time_start	= create_date(2005,1,1) . ' ' . create_time(0,0,1);
		$sched6->date_time_end		= create_date(2020,12,31) . ' ' . create_time(23,59,59);
		$sched6->job_interval		= '0::2-6::*::*::*';
		$sched6->status				= 'Active';
		$sched6->created_by			= '1';
		$sched6->modified_user_id	= '1';
		$sched6->catch_up			= '1';
		$sched6->save();


        $sched7 = new Scheduler();
        $sched7->name               = $mod_strings['LBL_OOTB_PRUNE'];
        $sched7->job                = 'function::pruneDatabase';
        $sched7->date_time_start    = create_date(2005,1,1) . ' ' . create_time(0,0,1);
        $sched7->date_time_end      = create_date(2020,12,31) . ' ' . create_time(23,59,59);
        $sched7->job_interval       = '0::4::1::*::*';
        $sched7->status             = 'Inactive';
        $sched7->created_by         = '1';
        $sched7->modified_user_id   = '1';
        $sched7->catch_up           = '0';
        $sched7->save();





	}

	////	END SCHEDULER HELPER FUNCTIONS
	///////////////////////////////////////////////////////////////////////////


	///////////////////////////////////////////////////////////////////////////
	////	STANDARD SUGARBEAN OVERRIDES
	/**
	 * function overrides the one in SugarBean.php
	 */
	function create_export_query($order_by, $where, $show_deleted = 0) {
		return $this->create_new_list_query($order_by, $where,array(),array(), $show_deleted = 0);
	}

	/**
	 * function overrides the one in SugarBean.php
	 */

	/**
	 * function overrides the one in SugarBean.php
	 */
	function fill_in_additional_list_fields() {
		$this->fill_in_additional_detail_fields();
	}

	/**
	 * function overrides the one in SugarBean.php
	 */
	function fill_in_additional_detail_fields() {
    }

	/**
	 * function overrides the one in SugarBean.php
	 */
	function get_list_view_data(){
		global $mod_strings;
		$temp_array = $this->get_list_view_array();
        $temp_array["ENCODED_NAME"]=$this->name;
        $this->parseInterval();
        $this->setIntervalHumanReadable();
        $temp_array['JOB_INTERVAL'] = $this->intervalHumanReadable;
        if($this->date_time_end == '2020-12-31 23:59' || $this->date_time_end == '') {
        	$temp_array['DATE_TIME_END'] = $mod_strings['LBL_PERENNIAL'];
        }
    	$this->created_by_name = get_assigned_user_name($this->created_by);
		$this->modified_by_name = get_assigned_user_name($this->modified_user_id);
    	return $temp_array;

	}

	/**
	 * returns the bean name - overrides SugarBean's
	 */
	function get_summary_text() {
		return $this->name;
	}
	////	END STANDARD SUGARBEAN OVERRIDES
	///////////////////////////////////////////////////////////////////////////
} // end class definition
?>
