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


/**
 * Predefined logic hooks
 * after_ui_frame
 * after_ui_footer
 * after_save
 * before_save
 * before_retrieve
 * after_retrieve
 * process_record
 * before_delete
 * after_delete
 * before_restore
 * after_restore
 * server_roundtrip
 * before_logout
 * after_logout
 * before_login
 * after_login
 * login_failed
 *
 */
class LogicHook{

	var $bean = null;

	function LogicHook(){
	}

	/**
	 * Static Function which returns and instance of LogicHook
	 *
	 * @return unknown
	 */
	function initialize(){
		if(empty($GLOBALS['logic_hook']))
			$GLOBALS['logic_hook'] = new LogicHook();
		return $GLOBALS['logic_hook'];
	}

	function setBean(&$bean){
		$this->bean =& $bean;
		return $this;
	}

	/**
	 * Provide a means for developers to create upgrade safe business logic hooks.
	 * If the bean is null, then we assume this call was not made from a SugarBean Object and
	 * therefore we do not pass it to the method call.
	 *
	 * @param string $module_dir
	 * @param string $event
	 * @param array $arguments
	 * @param SugarBean $bean
	 */
	function call_custom_logic($module_dir, $event, $arguments = null){
		// declare the hook array variable, it will be defined in the included file.
		$hook_array = null;
        if(isset($GLOBALS['log'])){
            $GLOBALS['log']->debug("Hook called: $module_dir::$event");
        }
		if(!empty($module_dir)){
			// This will load an array of the hooks to process
			if(file_exists("custom/modules/$module_dir/logic_hooks.php")){
                if(isset($GLOBALS['log'])){
				    $GLOBALS['log']->debug('Including module specific hook file for '.$module_dir);
                }
				include("custom/modules/$module_dir/logic_hooks.php");
				$this->process_hooks($hook_array, $event, $arguments);
				$hook_array = null;
			}
		}
		// Now load the generic array if it exists.
		if(file_exists('custom/modules/logic_hooks.php')){
            if(isset($GLOBALS['log'])){
			    $GLOBALS['log']->debug('Including generic hook file');
            }
			include('custom/modules/logic_hooks.php');
			$this->process_hooks($hook_array, $event, $arguments);
		}
	}

	/**
	 * This is called from call_custom_logic and actually performs the action as defined in the
	 * logic hook. If the bean is null, then we assume this call was not made from a SugarBean Object and
	 * therefore we do not pass it to the method call.
	 *
	 * @param array $hook_array
	 * @param string $event
	 * @param array $arguments
	 * @param SugarBean $bean
	 */
	function process_hooks($hook_array, $event, $arguments){
		// Now iterate through the array for the appropriate hook
		if(!empty($hook_array[$event])){
			foreach($hook_array[$event] as $hook_details){
				if(!file_exists($hook_details[2])){
                    if(isset($GLOBALS['log'])){
					    $GLOBALS['log']->error('Unable to load custom logic file: '.$hook_details[2]);
                    }
					continue;
				}
				include_once($hook_details[2]);
				$hook_class = $hook_details[3];
				$hook_function = $hook_details[4];

				// Make a static call to the function of the specified class
				//TODO Make a factory for these classes.  Cache instances accross uses
				if($hook_class == $hook_function){
                    if(isset($GLOBALS['log'])){
					    $GLOBALS['log']->debug('Creating new instance of hook class '.$hook_class.' with parameters');
                    }
					if(!is_null($this->bean))
						$class = new $hook_class($this->bean, $event, $arguments);
					else
						$class = new $hook_class($event, $arguments);
				}else{
                    if(isset($GLOBALS['log'])){
					    $GLOBALS['log']->debug('Creating new instance of hook class '.$hook_class.' without parameters');
                    }
					$class = new $hook_class();
					if(!is_null($this->bean))
						$class->$hook_function($this->bean, $event, $arguments);
					else
						$class->$hook_function($event, $arguments);
				}
			}
		}
	}
}
?>