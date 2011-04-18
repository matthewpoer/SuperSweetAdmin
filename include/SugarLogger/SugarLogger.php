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

 * Description:  Defines the English language pack for the base application.
 * Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
 * All Rights Reserved.
 * Contributor(s): ______________________________________..
 ********************************************************************************/
require_once('include/SugarLogger/LoggerManager.php');
require_once('include/SugarLogger/LoggerTemplate.php');
 
class SugarLogger implements LoggerTemplate
{
    /**
     * properties for the SugarLogger
     */
	private $logfile = 'sugarcrm';
	private $ext = '.log';
	private $dateFormat = '%c';
	private $logSize = '10MB';
	private $maxLogs = 10;
	private $filesuffix = "";
	private $log_dir = '.';

	
	/**
	 * used for config screen
	 */
	public static $filename_suffix = array(
	    "%m_%Y"    => "Month_Year", 
	    "%w_%m"    => "Week_Month",
	    "%m_%d_%y" => "Month_Day_Year",
	    );
	
	/**
	 * Let's us know if we've initialized the logger file
	 */
    private $initialized = false;
    
    /**
     * Logger file handle
     */
    private $fp = false;
    
    public function __get(
        $key
        )
    {
        return $this->$key;
    }
	
    /**
     * Used by the diagnostic tools to get SugarLogger log file information
     */
    public function getLogFileNameWithPath()
    {
        return $this->full_log_file;
    }
	
    /**
     * Used by the diagnostic tools to get SugarLogger log file information
     */
    public function getLogFileName()
    {
        return ltrim($this->full_log_file, "./");
    }
    
    /**
     * Constructor
     *
     * Reads the config file for logger settings
     */
    public function __construct() 
    {
        $config = SugarConfig::getInstance();
        $this->ext = $config->get('logger.file.ext', $this->ext);
        $this->logfile = $config->get('logger.file.name', $this->logfile);
        $this->dateFormat = $config->get('logger.file.dateFormat', $this->dateFormat);
        $this->logSize = $config->get('logger.file.maxSize', $this->logSize);
        $this->maxLogs = $config->get('logger.file.maxLogs', $this->maxLogs);
        $this->filesuffix = $config->get('logger.file.suffix', $this->filesuffix);
        $log_dir = $config->get('log_dir' , $this->log_dir); 
        $this->log_dir = $log_dir . (empty($log_dir)?'':'/');
        unset($config);
        $this->_doInitialization();
        LoggerManager::setLogger('default','SugarLogger');
	}
	
	/**
	 * Handles the SugarLogger initialization
	 */
    private function _doInitialization() 
    {
        $this->full_log_file = $this->log_dir . $this->logfile . $this->ext;
        $this->initialized = $this->_fileCanBeCreatedAndWrittenTo();
        $this->rollLog();
    }

    /**
	 * Checks to see if the SugarLogger file can be created and written to
	 */
    private function _fileCanBeCreatedAndWrittenTo() 
    {
        $this->_attemptToCreateIfNecessary();
        return file_exists($this->full_log_file) && is_writable($this->full_log_file);
    }

    /**
	 * Creates the SugarLogger file if it doesn't exist
	 */
    private function _attemptToCreateIfNecessary() 
    {
        if (file_exists($this->full_log_file)) {
            return;
        }
        @touch($this->full_log_file);
    }
    
    /**
     * see LoggerTemplate::log()
     */
	public function log(
	    $level,
	    $message
	    ) 
	{
        if (!$this->initialized) {
            return;
        }
		//lets get the current user id or default to -none- if it is not set yet
		$userID = (!empty($GLOBALS['current_user']->id))?$GLOBALS['current_user']->id:'-none-';

		//if we haven't opened a file pointer yet let's do that
		if (! $this->fp)$this->fp = fopen ($this->full_log_file , 'a' );

		
		// change to a string if there is just one entry
	    if ( is_array($message) && count($message) == 1 )
	        $message = array_shift($message);
	    // change to a human-readable array output if it's any other array
	    if ( is_array($message) )
		    $message = print_r($message,true);
		
		//write out to the file including the time in the dateFormat the process id , the user id , and the log level as well as the message
		fwrite($this->fp, 
		    strftime($this->dateFormat) . ' [' . getmypid () . '][' . $userID . '][' . strtoupper($level) . '] ' . $message . "\n" 
		    );
	}
	
	/**
	 * rolls the logger file to start using a new file
	 */
	private function rollLog(
	    $force = false
	    ) 
	{
        if (!$this->initialized || empty($this->logSize)) {
            return;
        }
		// lets get the number of megs we are allowed to have in the file
		$megs = substr ( $this->logSize, 0, strlen ( $this->logSize ) - 2 );
		//convert it to bytes
		$rollAt = ( int ) $megs * 1024 * 1024;
		//check if our log file is greater than that or if we are forcing the log to roll
		if ($force || filesize ( $this->full_log_file ) >= $rollAt) {
			//now lets move the logs starting at the oldest and going to the newest
			for($i = $this->maxLogs - 2; $i > 0; $i --) {
				if (file_exists ( $this->log_dir . $this->logfile . $i . $this->ext )) {
					$to = $i + 1;
					$old_name = $this->log_dir . $this->logfile . $i . $this->ext;
					$new_name = $this->log_dir . $this->logfile . $to . $this->ext;
					//nsingh- Bug 22548  Win systems fail if new file name already exists. The fix below checks for that.
					//if/else branch is necessary as suggested by someone on php-doc ( see rename function ).
					sugar_rename($old_name, $new_name);

					//rename ( $this->logfile . $i . $this->ext, $this->logfile . $to . $this->ext );
				}
			}
			//now lets move the current .log file
			sugar_rename ($this->full_log_file, $this->log_dir . $this->logfile . '1' . $this->ext);

		}
	}
	
	/**
	 * Destructor
	 *
	 * Closes the SugarLogger file handle
     */
	public function __destruct() 
	{
		if ($this->fp)
			fclose($this->fp);
	}
}
