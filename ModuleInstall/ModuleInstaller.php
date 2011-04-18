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


/*
 * ModuleInstaller - takes an installation package from files in the custom/Extension/X directories, and moves them into custom/X to install them.
 * If a directory has multiple files they are concatenated together.
 * Relevant directories (X) are Layoutdefs, Vardefs, Include (bean stuff), Language, TableDictionary (relationships)
 *
 * Installation steps that involve more than just copying files:
 * 1. installing custom fields - calls bean->custom_fields->addField
 * 2. installing relationships - calls createTableParams to build the relationship table, and createRelationshipMeta to add the relationship to the relationship table
 * 3. rebuilding the relationships - at almost the last step in install(), calls modules/Administration/RebuildRelationship.php
 * 4. repair indices - uses "modules/Administration/RepairIndex.php";
 */



require_once('include/utils/progress_bar_utils.php');

require_once('ModuleInstall/ModuleScanner.php');
define('DISABLED_PATH', 'Disabled');

class ModuleInstaller{
	var $modules = array();
	var $silent = false;
	var $base_dir  = '';
	var $modulesInPackage = array();

	function ModuleInstaller(){
		$this->ms = new ModuleScanner();
		$this->modules = get_module_dir_list();
		$this->db = & DBManagerFactory::getInstance();

	}

   /*
    * ModuleInstaller->install includes the manifest.php from the base directory it has been given. If it has been asked to do an upgrade it checks to see if there is
    * an upgrade_manifest defined in the manifest; if not it errors. It then adds the bean into the custom/Extension/application/Ext/Include/<module>.php - sets beanList, beanFiles
    * and moduleList - and then calls ModuleInstaller->merge_files('Ext/Include', 'modules.ext.php', '', true) to merge the individual module files into a combined file
    * /custom/Extension/application/Ext/Include/modules.ext.php (which now contains a list of all $beanList, $beanFiles and $moduleList for all extension modules) -
    * this file modules.ext.php is included at the end of modules.php.
    *
    * Finally it runs over a list of defined tasks; then install_beans, then install_custom_fields, then clear the Vardefs, run a RepairAndClear, then finally call rebuild_relationships.
    */
	function install($base_dir, $is_upgrade = false, $previous_version = ''){
		if(defined('TEMPLATE_URL'))SugarTemplateUtilities::disableCache();
		if(!empty($GLOBALS['sugar_config']['moduleInstaller']['packageScan'])){
			$this->ms->scanPackage($base_dir);
			if($this->ms->hasIssues()){
				$this->ms->displayIssues();
				sugar_cleanup(true);
			}
		}

		global $app_strings, $mod_strings;
		$this->base_dir = $base_dir;
		$total_steps = 5; //minimum number of steps with no tasks
		$current_step = 0;
		$tasks = array(
			'pre_execute',
			'install_copy',
			'install_images',
			'install_menus',
			'install_dcactions',
			'install_userpage',
			'install_dashlets',
			'install_administration',
			'install_connectors',
			'install_vardefs',
			'install_layoutdefs',
			'install_layoutfields',
			'install_relationships',
			'install_languages',
            'install_logichooks',
			'post_execute',
			'reset_opcodes',
		);

		$total_steps += count($tasks);
		if(file_exists($this->base_dir . '/manifest.php')){
				if(!$this->silent){
					$current_step++;
					display_progress_bar('install', $current_step, $total_steps);
					echo '<div id ="displayLoglink" ><a href="#" onclick="document.getElementById(\'displayLog\').style.display=\'\'">'
						.$app_strings['LBL_DISPLAY_LOG'].'</a> </div><div id="displayLog" style="display:none">';
				}

				include($this->base_dir . '/manifest.php');
				if($is_upgrade && !empty($previous_version)){
					//check if the upgrade path exists
					if(!empty($upgrade_manifest)){
						if(!empty($upgrade_manifest['upgrade_paths'])){
							if(!empty($upgrade_manifest['upgrade_paths'][$previous_version])){
								$installdefs = 	$upgrade_manifest['upgrade_paths'][$previous_version];
							}else{
								$errors[] = 'No Upgrade Path Found in manifest.';
								$this->abort($errors);
							}//fi
						}//fi
					}//fi
				}//fi
				$this->id_name = $installdefs['id'];
				$this->installdefs = $installdefs;
				$installed_modules = array();
				$tab_modules = array();
				if(isset($installdefs['beans'])){
					$str = "<?php \n //WARNING: The contents of this file are auto-generated\n";
					foreach($installdefs['beans'] as $bean){
						if(!empty($bean['module']) && !empty($bean['class']) && !empty($bean['path'])){
							$module = $bean['module'];
							$class = $bean['class'];
							$path = $bean['path'];

							$str .= "\$beanList['$module'] = '$class';\n";
							$str .= "\$beanFiles['$class'] = '$path';\n";
							if($bean['tab']){
								$str .= "\$moduleList[] = '$module';\n";
								$this->install_user_prefs($module, empty($bean['hide_by_default']));
								$tab_modules[] = $module;
							}else{
								$str .= "\$modules_exempt_from_availability_check['$module'] = '$module';\n";
								$str .= "\$modInvisList[] = '$module';\n";
							}
							$installed_modules[] = $module;
						}else{
							$errors[] = 'Bean array not well defined.';
							$this->abort($errors);
						}
					}
					$str.= "\n?>";
					if(!file_exists("custom/Extension/application/Ext/Include")){
						mkdir_recursive("custom/Extension/application/Ext/Include", true);
					}
					$out = sugar_fopen("custom/Extension/application/Ext/Include/$this->id_name.php", 'w');
					fwrite($out,$str);
					fclose($out);
					$this->rebuild_modules();
				}
				if(!$this->silent){
					$current_step++;
					update_progress_bar('install', $current_step, $total_steps);
				}

				foreach($tasks as $task){
					$this->$task();
					if(!$this->silent){
						$current_step++;
						update_progress_bar('install', $current_step, $total_steps);
					}
				}
				$this->install_beans($installed_modules);
				if(!$this->silent){
					$current_step++;
					update_progress_bar('install', $total_steps, $total_steps);
				}
				if(isset($installdefs['custom_fields'])){
					$this->log(translate('LBL_MI_IN_CUSTOMFIELD'));
					$this->install_custom_fields($installdefs['custom_fields']);
				}
				if(!$this->silent){
					$current_step++;
					update_progress_bar('install', $current_step, $total_steps);
					echo '</div>';
				}
				if(!$this->silent){
					$current_step++;
					update_progress_bar('install', $current_step, $total_steps);
					echo '</div>';
				}
				$selectedActions = array(
			'clearTpls',
			'clearJsFiles',
			'clearDashlets',
			'clearVardefs',
			'clearJsLangFiles',
			'rebuildAuditTables',
			'repairDatabase',
		);
				VardefManager::clearVardef();
				global $beanList, $beanFiles, $moduleList;
				if (file_exists('custom/application/Ext/Include/modules.ext.php'))
				{
				    include('custom/application/Ext/Include/modules.ext.php');
				}
				require_once("modules/Administration/upgrade_custom_relationships.php");
            	upgrade_custom_relationships($installed_modules);
				$this->rebuild_all(true);
				require_once('modules/Administration/QuickRepairAndRebuild.php');
				$rac = new RepairAndClear();
				$rac->repairAndClearAll($selectedActions, $installed_modules,true, false);
				$this->rebuild_relationships();
				UpdateSystemTabs('Add',$tab_modules);
				
				//clear the unified_search_module.php file 
	            require_once('modules/Home/UnifiedSearchAdvanced.php');
	            UnifiedSearchAdvanced::unlinkUnifiedSearchModulesFile(); 
	            				
				$this->log('<br><b>' . translate('LBL_MI_COMPLETE') . '</b>');
		}else{
			die("No \$installdefs Defined In $this->base_dir/manifest.php");
		}

	}

	function install_user_prefs($module, $hide_from_user=false){
		UserPreference::updateAllUserPrefs('display_tabs', $module, '', true, !$hide_from_user);
		UserPreference::updateAllUserPrefs('hide_tabs', $module, '', true, $hide_from_user);
		UserPreference::updateAllUserPrefs('remove_tabs', $module, '', true, $hide_from_user);
	}
	function uninstall_user_prefs($module){
		UserPreference::updateAllUserPrefs('display_tabs', $module, '', true, true);
		UserPreference::updateAllUserPrefs('hide_tabs', $module, '', true, true);
		UserPreference::updateAllUserPrefs('remove_tabs', $module, '', true, true);
	}

	function pre_execute(){
		require_once($this->base_dir . '/manifest.php');
		if(isset($this->installdefs['pre_execute']) && is_array($this->installdefs['pre_execute'])){
			foreach($this->installdefs['pre_execute'] as $includefile){
				require_once(str_replace('<basepath>', $this->base_dir, $includefile));
			}
		}
	}

	function post_execute(){
		require_once($this->base_dir . '/manifest.php');
		if(isset($this->installdefs['post_execute']) && is_array($this->installdefs['post_execute'])){
			foreach($this->installdefs['post_execute'] as $includefile){
				require_once(str_replace('<basepath>', $this->base_dir, $includefile));
			}
		}
	}

	function pre_uninstall(){
		require_once($this->base_dir . '/manifest.php');
		if(isset($this->installdefs['pre_uninstall']) && is_array($this->installdefs['pre_uninstall'])){
			foreach($this->installdefs['pre_uninstall'] as $includefile){
				require_once(str_replace('<basepath>', $this->base_dir, $includefile));
			}
		}
	}

	function post_uninstall(){
		require_once($this->base_dir . '/manifest.php');
		if(isset($this->installdefs['post_uninstall']) && is_array($this->installdefs['post_uninstall'])){
			foreach($this->installdefs['post_uninstall'] as $includefile){
				require_once(str_replace('<basepath>', $this->base_dir, $includefile));
			}
		}
	}

	/*
     * ModuleInstaller->install_copy gets the copy section of installdefs in the manifest and calls copy_path to copy each path (file or directory) to its final location
     * (specified as from and to in the manifest), replacing <basepath> by the base_dir value passed in to install.
     */
	function install_copy(){
		if(isset($this->installdefs['copy'])){
			/* BEGIN - RESTORE POINT - by MR. MILK August 31, 2005 02:22:11 PM */
			$backup_path = clean_path( remove_file_extension(urldecode(hashToFile($_REQUEST['install_file'])))."-restore" );
			/* END - RESTORE POINT - by MR. MILK August 31, 2005 02:22:18 PM */
			foreach($this->installdefs['copy'] as $cp){
				$GLOBALS['log']->debug("Copying ..." . $cp['from'].  " to " .$cp['to'] );
				/* BEGIN - RESTORE POINT - by MR. MILK August 31, 2005 02:22:11 PM */
				//$this->copy_path($cp['from'], $cp['to']);
				$this->copy_path($cp['from'], $cp['to'], $backup_path);
				/* END - RESTORE POINT - by MR. MILK August 31, 2005 02:22:18 PM */
			}
			//here we should get the module list again as we could have copied something to the modules dir
			$this->modules = get_module_dir_list();
		}
	}
	function uninstall_copy(){
		if(!empty($this->installdefs['copy'])){
					foreach($this->installdefs['copy'] as $cp){
						$cp['to'] = clean_path(str_replace('<basepath>', $this->base_dir, $cp['to']));
						$cp['from'] = clean_path(str_replace('<basepath>', $this->base_dir, $cp['from']));
						$GLOBALS['log']->debug('Unlink ' . $cp['to']);
				/* BEGIN - RESTORE POINT - by MR. MILK August 31, 2005 02:22:11 PM */
						//rmdir_recursive($cp['to']);

						$backup_path = clean_path( remove_file_extension(urldecode(hashToFile($_REQUEST['install_file'])))."-restore/".$cp['to'] );
						$this->uninstall_new_files($cp, $backup_path);
						$this->copy_path($backup_path, $cp['to'], $backup_path, true);
				/* END - RESTORE POINT - by MR. MILK August 31, 2005 02:22:18 PM */
					}
					$backup_path = clean_path( remove_file_extension(urldecode(hashToFile($_REQUEST['install_file'])))."-restore");
					if(file_exists($backup_path))
						rmdir_recursive($backup_path);
				}
	}


	/**
	 * Removes any files that were added by the loaded module. If the files already existed prior to install
	 * it will be handled by copy_path with the uninstall parameter.
	 *
	 */
	function uninstall_new_files($cp, $backup_path){
		$zip_files = $this->dir_get_files($cp['from'],$cp['from']);
		$backup_files = $this->dir_get_files($backup_path, $backup_path);
		foreach($zip_files as $k=>$v){
			//if it's not a backup then it is probably a new file but we'll check that it is not in the md5.files first
			if(!isset($backup_files[$k])){
				$to = $cp['to'] . $k;
				//if it's not a sugar file then we remove it otherwise we can't restor it
				if(!$this->ms->sugarFileExists($to)){
					$GLOBALS['log']->debug('ModuleInstaller[uninstall_new_file] deleting file ' . $to);
					if(file_exists($to)) {
					    unlink($to);
					}
				}else{
					$GLOBALS['log']->fatal('ModuleInstaller[uninstall_new_file] Could not remove file ' . $to . ' as no backup file was found to restore to');
				}
			}
		}
		//lets check if the directory is empty if it is we will delete it as well
		$files_remaining = $this->dir_file_count($cp['to']);
		if(file_exists($cp['to']) && $files_remaining == 0){
			$GLOBALS['log']->debug('ModuleInstaller[uninstall_new_file] deleting directory ' . $cp['to']);
			rmdir_recursive($cp['to']);
		}

	}


	function install_dashlets(){
        if(isset($this->installdefs['dashlets'])){
			foreach($this->installdefs['dashlets'] as $cp){
				$this->log(translate('LBL_MI_IN_DASHLETS') . $cp['name']);
				$cp['from'] = str_replace('<basepath>', $this->base_dir, $cp['from']);
				$path = 'custom/modules/Home/Dashlets/' . $cp['name'] . '/';
				$GLOBALS['log']->debug("Installing Dashlet " . $cp['name'] . "..." . $cp['from'] );
				if(!file_exists($path)){
					mkdir_recursive($path, true);
				}
				copy_recursive($cp['from'] , $path);
			}
			include('modules/Administration/RebuildDashlets.php');

		}
	}

	function uninstall_dashlets(){
        if(isset($this->installdefs['dashlets'])){
			foreach($this->installdefs['dashlets'] as $cp){
				$this->log(translate('LBL_MI_UN_DASHLETS') . $cp['name']);
				$path = 'custom/modules/Home/Dashlets/' . $cp['name'];
				$GLOBALS['log']->debug('Unlink ' .$path);
				if (file_exists($path))
					rmdir_recursive($path);
			}
			include('modules/Administration/RebuildDashlets.php');
		}
	}


	function install_images(){
        if(isset($this->installdefs['image_dir'])){
			$this->log( translate('LBL_MI_IN_IMAGES') );
			$this->copy_path($this->installdefs['image_dir'] , 'custom/themes');

		}
	}

	function install_menus(){
        if(isset($this->installdefs['menu'])){
			$this->log(translate('LBL_MI_IN_MENUS'));
			foreach($this->installdefs['menu'] as $menu){
				$menu['from'] = str_replace('<basepath>', $this->base_dir, $menu['from']);
				$GLOBALS['log']->debug("Installing Menu ..." . $menu['from'].  " for " .$menu['to_module'] );
				$path = 'custom/Extension/modules/' . $menu['to_module']. '/Ext/Menus';
				if($menu['to_module'] == 'application'){
					$path ='custom/Extension/' . $menu['to_module']. '/Ext/Menus';
				}
				if(!file_exists($path)){
					mkdir_recursive($path, true);

				}
				copy_recursive($menu['from'] , $path . '/'. $this->id_name . '.php');
			}
			$this->rebuild_menus();
		}
	}

	function uninstall_menus(){
        if(isset($this->installdefs['menu'])){
			$this->log(translate('LBL_MI_UN_MENUS'));
			foreach($this->installdefs['menu'] as $menu){
				$menu['from'] = str_replace('<basepath>', $this->base_dir, $menu['from']);
				$GLOBALS['log']->debug("Uninstalling Menu ..." . $menu['from'].  " for " .$menu['to_module'] );
				$path = 'custom/Extension/modules/' . $menu['to_module']. '/Ext/Menus';
				if($menu['to_module'] == 'application'){
					$path ='custom/Extension/' . $menu['to_module']. '/Ext/Menus';
				}
				if (sugar_is_file($path . '/'. $this->id_name . '.php', 'w'))
				{
					rmdir_recursive( $path . '/'. $this->id_name . '.php');
				}
				else if (sugar_is_file($path . '/'. DISABLED_PATH . '/'. $this->id_name . '.php', 'w'))
				{
					rmdir_recursive( $path . '/'. DISABLED_PATH . '/'. $this->id_name . '.php');
				}
			}
			$this->rebuild_menus();
		}
	}

	function install_dcactions(){
		if(isset($this->installdefs['dcaction'])){
			$this->log(translate('LBL_MI_IN_MENUS'));
			foreach($this->installdefs['dcaction'] as $action){
				$action['from'] = str_replace('<basepath>', $this->base_dir, $action['from']);
				$GLOBALS['log']->debug("Installing DCActions ..." . $action['from']);
				$path = 'custom/Extension/application/Ext/DashletContainer/Containers';
				if(!file_exists($path)){
					mkdir_recursive($path, true);
				}
				copy_recursive($action['from'] , $path . '/'. $this->id_name . '.php');
			}
			$this->rebuild_dashletcontainers();
		}
	}

	function uninstall_dcactions(){
        if(isset($this->installdefs['dcaction'])){
			$this->log(translate('LBL_MI_UN_MENUS'));
			foreach($this->installdefs['dcaction'] as $action){
				$action['from'] = str_replace('<basepath>', $this->base_dir, $action['from']);
				$GLOBALS['log']->debug("Uninstalling DCActions ..." . $action['from'] );
				$path = 'custom/Extension/application/Ext/DashletContainer/Containers';
				if (sugar_is_file($path . '/'. $this->id_name . '.php', 'w'))
				{
					rmdir_recursive( $path . '/'. $this->id_name . '.php');
				}
				else if (sugar_is_file($path . '/'. DISABLED_PATH . '/'. $this->id_name . '.php', 'w'))
				{
					rmdir_recursive( $path . '/'. DISABLED_PATH . '/'. $this->id_name . '.php');
				}
			}
			$this->rebuild_dashletcontainers();
		}
	}

	function install_administration(){
        if(isset($this->installdefs['administration'])){
			$this->log(translate('LBL_MI_IN_ADMIN'));
			foreach($this->installdefs['administration'] as $administration){
				$administration['from'] = str_replace('<basepath>', $this->base_dir, $administration['from']);
				$GLOBALS['log']->debug("Installing Administration Section ..." . $administration['from'] );
				$path = 'custom/Extension/modules/Administration/Ext/Administration';
				if(!file_exists($path)){
					mkdir_recursive($path, true);

				}
				copy_recursive($administration['from'] , $path . '/'. $this->id_name . '.php');
			}
			$this->rebuild_administration();
		}

	}
	function uninstall_administration(){
        if(isset($this->installdefs['administration'])){
			$this->log(translate('LBL_MI_UN_ADMIN'));
			foreach($this->installdefs['administration'] as $administration){
				$administration['from'] = str_replace('<basepath>', $this->base_dir, $administration['from']);
				$GLOBALS['log']->debug("Uninstalling Administration Section ..." . $administration['from'] );
				$path = 'custom/Extension/modules/Administration/Ext/Administration';
				if (sugar_is_file($path . '/'. $this->id_name . '.php', "w"))
					rmdir_recursive( $path . '/'. $this->id_name . '.php');
				else if (sugar_is_file($path . '/'. DISABLED_PATH . "/" . $this->id_name . '.php', "w"))
					rmdir_recursive( $path . '/'. DISABLED_PATH . "/" . $this->id_name . '.php');
			}
			$this->rebuild_administration();
		}
	}

	function install_connectors(){
        if(isset($this->installdefs['connectors'])){
        	foreach($this->installdefs['connectors'] as $cp){
				$this->log(translate('LBL_MI_IN_CONNECTORS') . $cp['name']);
				$dir = str_replace('_','/',$cp['name']);
				$cp['connector'] = str_replace('<basepath>', $this->base_dir, $cp['connector']);
				$source_path = 'custom/modules/Connectors/connectors/sources/' . $dir. '/';
				$GLOBALS['log']->debug("Installing Connector " . $cp['name'] . "..." . $cp['connector'] );
				if(!file_exists($source_path)){
					mkdir_recursive($source_path, true);
				}
				copy_recursive($cp['connector'] , $source_path);

				//Install optional formatter code if it is specified
				if(!empty($cp['formatter'])) {
					$cp['formatter'] = str_replace('<basepath>', $this->base_dir, $cp['formatter']);
					$formatter_path = 'custom/modules/Connectors/connectors/formatters/' . $dir. '/';
					if(!file_exists($formatter_path)){
						mkdir_recursive($formatter_path, true);
					}
					copy_recursive($cp['formatter'] , $formatter_path);
				}
			}
			require_once('include/connectors/utils/ConnectorUtils.php');
			ConnectorUtils::installSource($cp['name']);
		}

	}
	function uninstall_connectors(){
    	if(isset($this->installdefs['connectors'])){
    		foreach($this->installdefs['connectors'] as $cp){
				$this->log(translate('LBL_MI_UN_CONNECTORS') . $cp['name']);
				$dir = str_replace('_','/',$cp['name']);
				$source_path = 'custom/modules/Connectors/connectors/sources/' . $dir;
				$formatter_path = 'custom/modules/Connectors/connectors/formatters/' . $dir;
				$GLOBALS['log']->debug('Unlink ' .$source_path);
				rmdir_recursive($source_path);
				rmdir_recursive($formatter_path);
			}
			require_once('include/connectors/utils/ConnectorUtils.php');
			//ConnectorUtils::getConnectors(true);
			ConnectorUtils::uninstallSource($cp['name']);
		}
	}

	function install_userpage(){
        if(isset($this->installdefs['user_page'])){
					$this->log(translate('LBL_MI_IN_USER'));
					foreach($this->installdefs['user_page'] as $userpage){
						$userpage['from'] = str_replace('<basepath>', $this->base_dir, $userpage['from']);
						$GLOBALS['log']->debug("Installing User Page Section ..." . $userpage['from'] );
						$path = 'custom/Extension/modules/Users/Ext/UserPage';
						if(!file_exists($path)){
							mkdir_recursive($path, true);

						}
						copy_recursive($userpage['from'] , $path . '/'. $this->id_name . '.php');
					}
					$this->rebuild_userpage();
				}

	}
	function uninstall_userpage(){
            if(isset($this->installdefs['user_page'])){
					$this->log(translate('LBL_MI_UN_USER') );
					foreach($this->installdefs['user_page'] as $userpage){
						$userpage['from'] = str_replace('<basepath>', $this->base_dir, $userpage['from']);
						$GLOBALS['log']->debug("Uninstalling User Page Section ..." . $userpage['from'] );
						$path = 'custom/Extension/modules/Users/Ext/UserPage';
						rmdir_recursive( $path . '/'. $this->id_name . '.php');
					}
					$this->rebuild_userpage();
				}
	}

    /*
     * ModuleInstaller->install_vardefs uses the vardefs section of the installdefs and copies from the 'from' path (replacing <basepath> as usual) to either
     * custom/Extension/modules/<module>/Ext/Vardefs or custom/Extension/<module>/Ext/Vardefs if the 'to_module' value in the installdefs is set to 'application'.
     * Finally rebuild_vardefs() is used to merge /Ext/Vardefs into vardefs.ext.php
     */
	function install_vardefs(){
        if(isset($this->installdefs['vardefs'])){
			$this->log(translate('LBL_MI_IN_VAR') );
			foreach($this->installdefs['vardefs'] as $vardefs){
				$vardefs['from'] = str_replace('<basepath>', $this->base_dir, $vardefs['from']);
				$this->install_vardef($vardefs['from'], $vardefs['to_module'], $this->id_name);
			}
			$this->rebuild_vardefs();
		}
	}
	function uninstall_vardefs(){
        if(isset($this->installdefs['vardefs'])){
					$this->log(translate('LBL_MI_UN_VAR') );
					foreach($this->installdefs['vardefs'] as $vardefs){
						$vardefs['from'] = str_replace('<basepath>', $this->base_dir, $vardefs['from']);
						$GLOBALS['log']->debug("Uninstalling Vardefs ..." . $vardefs['from'] .  " for " .$vardefs['to_module']);
						$path = 'custom/Extension/modules/' . $vardefs['to_module']. '/Ext/Vardefs';
						if($vardefs['to_module'] == 'application'){
							$path ='custom/Extension/' . $vardefs['to_module']. '/Ext/Vardefs';
						}
						if(file_exists($path . '/'. $this->id_name . '.php'))
						{
							rmdir_recursive( $path . '/'. $this->id_name . '.php');
						}
						else if(file_exists($path . '/'. DISABLED_PATH . '/'. $this->id_name . '.php'))
						{
							rmdir_recursive($path . '/'. DISABLED_PATH . '/'. $this->id_name . '.php');
						}
						else if (file_exists($path . '/'. basename($vardefs['from'] )))
						{
							rmdir_recursive( $path . '/'. basename($vardefs['from'] ));
						}
						else if(file_exists($path . '/'. DISABLED_PATH . '/'.  basename($vardefs['from'])))
						{
							rmdir_recursive($path . '/'. DISABLED_PATH . '/'.  basename($vardefs['from']));
						}
					}
					$this->rebuild_vardefs();
				}
	}
	function install_vardef($from, $to_module){
			$GLOBALS['log']->debug("Installing Vardefs ..." . $from .  " for " .$to_module);
			$path = 'custom/Extension/modules/' . $to_module. '/Ext/Vardefs';
			if($to_module == 'application'){
				$path ='custom/Extension/' . $to_module. '/Ext/Vardefs';
			}
			if(!file_exists($path)){
				mkdir_recursive($path, true);
			}
			copy_recursive($from , $path.'/'. basename($from));
	}

	/*
     * ModuleInstaller->install_layoutdefs installs the $layout_defs variable (subpanel definitions) from Ext/Layoutdefs to the to_module location of
     * custom/Extension/modules/' . $to_module. '/Ext/Layoutdefs/<$module>.php. before calling rebuild_layoutdefs which merge_files Ext/Layoutdefs/, 'layoutdefs.ext.php'. Note that this is not used for the viewdefs in the metadata directory - they are installed through the install_copy() operation that just takes the contents of the module directory and places it in the /modules area.
     */
	function install_layoutdefs(){
        if(isset($this->installdefs['layoutdefs'])){
			$this->log(translate('LBL_MI_IN_SUBPANEL') );
			foreach($this->installdefs['layoutdefs'] as $layoutdefs){
				$layoutdefs['from'] = str_replace('<basepath>', $this->base_dir, $layoutdefs['from']);
				$this->install_layoutdef($layoutdefs['from'], $layoutdefs['to_module'], $this->id_name);
			}
			$this->rebuild_layoutdefs();
		}
	}
	function uninstall_layoutdefs(){
        if(isset($this->installdefs['layoutdefs'])){
					$this->log(translate('LBL_MI_UN_SUBPANEL') );
					foreach($this->installdefs['layoutdefs'] as $layoutdefs){
						$layoutdefs['from'] = str_replace('<basepath>', $this->base_dir, $layoutdefs['from']);
						$GLOBALS['log']->debug("Uninstalling Layoutdefs ..." . $layoutdefs['from'] .  " for " .$layoutdefs['to_module']);
						$path = 'custom/Extension/modules/' . $layoutdefs['to_module']. '/Ext/Layoutdefs';
						if($layoutdefs['to_module'] == 'application'){
							$path ='custom/Extension/' . $layoutdefs['to_module']. '/Ext/Layoutdefs';
						}
						if (file_exists($path . '/'. $this->id_name . '.php'))
						{
							rmdir_recursive( $path . '/'. $this->id_name . '.php');
						}
						else if (file_exists($path . '/'. DISABLED_PATH . '/' . $this->id_name . '.php'))
						{
							rmdir_recursive($path . '/'. DISABLED_PATH . '/' . $this->id_name . '.php');
						}
						else if (file_exists($path . '/'. basename($layoutdefs['from'] )))
						{
							rmdir_recursive( $path . '/'. basename($layoutdefs['from'] ));
						}
						else if(file_exists($path . '/'. DISABLED_PATH . '/'.  basename($layoutdefs['from'])))
						{
							rmdir_recursive($path . '/'. DISABLED_PATH . '/'.  basename($layoutdefs['from']));
						}
					}
					$this->rebuild_layoutdefs();
				}
	}
	function install_layoutdef($from, $to_module){
			$GLOBALS['log']->debug("Installing Layout Defs ..." . $from .  " for " .$to_module);
			$path = 'custom/Extension/modules/' . $to_module. '/Ext/Layoutdefs';
			if($to_module == 'application'){
				$path ='custom/Extension/' . $to_module. '/Ext/Layoutdefs';
			}
			if(!file_exists($path)){
				mkdir_recursive($path, true);
			}
			copy_recursive($from , $path.'/'. basename($from));
	}

	function install_languages()
	{
        $languages = array();
        if(isset($this->installdefs['language']))
        {
            $this->log(translate('LBL_MI_IN_LANG') );
            foreach($this->installdefs['language'] as $packs)
            {
                $modules[]=$packs['to_module'];
                $languages[$packs['language']] = $packs['language'];
				$packs['from'] = str_replace('<basepath>', $this->base_dir, $packs['from']);
				$GLOBALS['log']->debug("Installing Language Pack ..." . $packs['from']  .  " for " .$packs['to_module']);
			    $path = 'custom/Extension/modules/' . $packs['to_module']. '/Ext/Language';
				if($packs['to_module'] == 'application'){
				    $path ='custom/Extension/' . $packs['to_module']. '/Ext/Language';
				}

				if(!file_exists($path)){
				    mkdir_recursive($path, true);
                }
				copy_recursive($packs['from'] , $path.'/'.$packs['language'].'.'. $this->id_name . '.php');
			}
			$this->rebuild_languages($languages, $modules);

		}
	}

	function uninstall_languages(){
        $languages = array();
				if(isset($this->installdefs['language'])){
					$this->log(translate('LBL_MI_UN_LANG') );
					foreach($this->installdefs['language'] as $packs){
						$modules[]=$packs['to_module'];
						$languages[$packs['language']] = $packs['language'];
						$packs['from'] = str_replace('<basepath>', $this->base_dir, $packs['from']);
						$GLOBALS['log']->debug("Uninstalling Language Pack ..." . $packs['from']  .  " for " .$packs['to_module']);
						$path = 'custom/Extension/modules/' . $packs['to_module']. '/Ext/Language';
						if($packs['to_module'] == 'application'){
							$path ='custom/Extension/' . $packs['to_module']. '/Ext/Language';
						}
						if (sugar_is_file($path.'/'.$packs['language'].'.'. $this->id_name . '.php', 'w')) {
							rmdir_recursive( $path.'/'.$packs['language'].'.'. $this->id_name . '.php');
						} else if (sugar_is_file($path.'/'.DISABLED_PATH.'/'.$packs['language'].'.'. $this->id_name . '.php', 'w')) {
							rmdir_recursive($path.'/'.DISABLED_PATH.'/'.$packs['language'].'.'. $this->id_name . '.php', 'w');
						}
					}
					$this->rebuild_languages($languages, $modules);

				}
	}

    // Functions for adding and removing logic hooks from uploaded files
    // Since one class/file can be used by multiple logic hooks, I'm not going to touch the file labeled in the logic_hook entry
    /* The module hook definition should look like this:
     $installdefs = array(
     ... blah blah ...
         'logic_hooks' => array(
             array('module'      => 'Accounts',
                   'hook'        => 'after_save',
                   'order'       => 99,
                   'description' => 'Account sample logic hook',
                   'file'        => 'modules/Sample/sample_account_logic_hook_file.php',
                   'class'       => 'SampleLogicClass',
                   'function'    => 'accountAfterSave',
             ),
         ),
     ... blah blah ...
     );
     */
    function install_logichooks() {
        // Since the logic hook files get copied over with the rest of the module directory, we just need to enable them
        $this->enable_logichooks();
    }

    function uninstall_logichooks() {
        // Since the logic hook files get removed with the rest of the module directory, we just need to disable them
        $this->disable_logichooks();
    }

    function enable_logichooks() {
        if(empty($this->installdefs['logic_hooks']) || !is_array($this->installdefs['logic_hooks'])) {
           return;
        }



        foreach($this->installdefs['logic_hooks'] as $hook ) {
            check_logic_hook_file($hook['module'], $hook['hook'], array($hook['order'], $hook['description'],  $hook['file'], $hook['class'], $hook['function']));
        }
    }

    function disable_logichooks() {
        if(empty($this->installdefs['logic_hooks']) || !is_array($this->installdefs['logic_hooks'])) {
            return;
        }


        foreach($this->installdefs['logic_hooks'] as $hook ) {
            remove_logic_hook($hook['module'], $hook['hook'], array($hook['order'], $hook['description'],  $hook['file'], $hook['class'], $hook['function']));
        }
    }

/* BEGIN - RESTORE POINT - by MR. MILK August 31, 2005 02:22:18 PM */
	function copy_path($from, $to, $backup_path='', $uninstall=false){
	//function copy_path($from, $to){
/* END - RESTORE POINT - by MR. MILK August 31, 2005 02:22:18 PM */
		$to = str_replace('<basepath>', $this->base_dir, $to);

		if(!$uninstall) {
		$from = str_replace('<basepath>', $this->base_dir, $from);
		$GLOBALS['log']->debug('Copy ' . $from);
		}
		else {
			$from = str_replace('<basepath>', $backup_path, $from);
			//$GLOBALS['log']->debug('Restore ' . $from);
		}
		$from = clean_path($from);
		$to = clean_path($to);

		$dir = dirname($to);
		//there are cases where if we need to create a directory in the root directory
		if($dir == '.' && is_dir($from)){
			$dir = $to;
		}
		if(!sugar_is_dir($dir, 'instance'))
			mkdir_recursive($dir, true);
/* BEGIN - RESTORE POINT - by MR. MILK August 31, 2005 02:22:18 PM */
		if(empty($backup_path)) {
/* END - RESTORE POINT - by MR. MILK August 31, 2005 02:22:18 PM */
		if(!copy_recursive($from, $to)){
			die('Failed to copy ' . $from. ' ' . $to);
		}
/* BEGIN - RESTORE POINT - by MR. MILK August 31, 2005 02:22:18 PM */
		}
		elseif(!$this->copy_recursive_with_backup($from, $to, $backup_path, $uninstall)){
			die('Failed to copy ' . $from. ' to ' . $to);
		}
/* END - RESTORE POINT - by MR. MILK August 31, 2005 02:22:18 PM */
	}

	function install_custom_fields($fields){
		global $beanList, $beanFiles;
		include('include/modules.php');
		require_once('modules/DynamicFields/FieldCases.php');
		foreach($fields as $field){
			$installed = false;
			if(isset($beanList[ $field['module']])){
				$class = $beanList[ $field['module']];
                if(!isset($field['ext4']))$field['ext4'] = '';
                if(!isset($field['mass_update']))$field['mass_update'] = 0;
                if(!isset($field['duplicate_merge']))$field['duplicate_merge'] = 0;
                if(!isset($field['help']))$field['help'] = '';

				if(file_exists($beanFiles[$class])){
					require_once($beanFiles[$class]);
					$mod = new $class();
					$installed = true;
					$fieldObject = get_widget($field['type']);
					$fieldObject->populateFromRow($field);
					$mod->custom_fields->use_existing_labels =  true;
					$mod->custom_fields->addFieldObject($fieldObject);
				}
			}
			if(!$installed){
				$GLOBALS['log']->debug('Could not install custom field ' . $field['name'] . ' for module ' .  $field['module'] . ': Module does not exist');
			}
		}
	}

	function uninstall_custom_fields($fields){
		global $beanList, $beanFiles;
		require_once('modules/DynamicFields/DynamicField.php');
		$dyField = new DynamicField();

		foreach($fields as $field){
			$class = $beanList[ $field['module']];
			if(file_exists($beanFiles[$class])){
					require_once($beanFiles[$class]);
					$mod = new $class();
					$dyField->bean = $mod;
					$dyField->module = $field['module'];
					$dyField->deleteField($field['name']);
			}
		}
	}

        /*
     * ModuleInstaller->install_relationships calls install_relationship for every file included in the module package that defines a relationship, and then
     * writes a custom/Extension/application/Ext/TableDictionary/$module.php file containing an include_once for every relationship metadata file passed to install_relationship.
     * Next it calls install_vardef and install_layoutdef. Finally, it rebuilds the vardefs and layoutdefs (by calling merge_files as usual), and then calls merge_files to merge
     * everything in 'Ext/TableDictionary/' into 'tabledictionary.ext.php'
     */
    function install_relationships ()
    {
        if (isset ( $this->installdefs [ 'relationships' ] ))
        {
            $this->log ( translate ( 'LBL_MI_IN_RELATIONSHIPS' ) ) ;
            $str = "<?php \n //WARNING: The contents of this file are auto-generated\n" ;
            $save_table_dictionary = false ;

            if (! file_exists ( "custom/Extension/application/Ext/TableDictionary" ))
            {
                mkdir_recursive ( "custom/Extension/application/Ext/TableDictionary", true ) ;
            }

            foreach ( $this->installdefs [ 'relationships' ] as $key => $relationship )
            {
                $filename = basename ( $relationship [ 'meta_data' ] ) ;
                $this->copy_path ( $relationship [ 'meta_data' ], 'custom/metadata/' . $filename ) ;
                $this->install_relationship ( 'custom/metadata/' . $filename ) ;
                $save_table_dictionary = true ;

                if (! empty ( $relationship [ 'module_vardefs' ] ))
                {
                    $relationship [ 'module_vardefs' ] = str_replace ( '<basepath>', $this->base_dir, $relationship [ 'module_vardefs' ] ) ;
                    $this->install_vardef ( $relationship [ 'module_vardefs' ], $relationship [ 'module' ] ) ;
                }

                if (! empty ( $relationship [ 'module_layoutdefs' ] ))
                {
                    $relationship [ 'module_layoutdefs' ] = str_replace ( '<basepath>', $this->base_dir, $relationship [ 'module_layoutdefs' ] ) ;
                    $this->install_layoutdef ( $relationship [ 'module_layoutdefs' ], $relationship [ 'module' ] ) ;
                }

                $relName = strpos($filename, "MetaData") !== false ? substr($filename, 0, strlen($filename) - 12) : $filename;
                $out = sugar_fopen ( "custom/Extension/application/Ext/TableDictionary/$relName.php", 'w' ) ;
                fwrite ( $out, $str . "include('custom/metadata/$filename');\n\n?>" ) ;
                fclose ( $out ) ;
            }



            $this->rebuild_vardefs () ;
            $this->rebuild_layoutdefs () ;
            if ($save_table_dictionary)
            {
                $this->rebuild_tabledictionary () ;
            }

        }
    }

	/*
     * Install_relationship obtains a set of relationship definitions from the filename passed in as a parameter.
     * For each definition it calls db->createTableParams to build the relationships table if it does not exist,
     * and SugarBean::createRelationshipMeta to add the relationship into the 'relationships' table.
     */
	function install_relationship($file)
	{
		$_REQUEST['moduleInstaller'] = true;
		if(!file_exists($file))
		{
			$GLOBALS['log']->debug( 'File does not exists : '.$file);
			return;
		}
		include($file);
		$rel_dictionary = $dictionary;
		foreach ($rel_dictionary as $rel_name => $rel_data)
   	    {
   	        $table = ''; // table is actually optional
   	        // check if we have a table definition - not all relationships require a join table
            if ( isset( $rel_data[ 'table' ] ) )
            {
                $table = $rel_data[ 'table' ];

                if(!$this->db->tableExists($table))
                {
                    $this->db->createTableParams($table, $rel_data[ 'fields' ], $rel_data[ 'indices' ]);
                }
            }

            if(!$this->silent)
                $GLOBALS['log']->debug("Processing relationship meta for ". $rel_name."...");
            SugarBean::createRelationshipMeta($rel_name, $this->db,$table,$rel_dictionary,'');
            Relationship::delete_cache();
            if(!$this->silent)
                $GLOBALS['log']->debug( 'done<br>');
        }
	}

	function install_layoutfields() {
		 if (!empty ( $this->installdefs [ 'layoutfields' ] ))
		 {
		 	foreach ( $this->installdefs [ 'layoutfields' ] as $fieldSet )
            {
		 		if (!empty($fieldSet['additional_fields']))
		 		{
		 			$this->addFieldsToLayout($fieldSet['additional_fields']);
		 		}
            }
		 }
	}

	function uninstall_layoutfields() {
		 if (!empty ( $this->installdefs [ 'layoutfields' ] ))
		 {
		 	foreach ( $this->installdefs [ 'layoutfields' ] as $fieldSet )
            {
		 		if (!empty($fieldSet['additional_fields']))
		 		{
		 			$this->removeFieldsFromLayout($fieldSet['additional_fields']);
		 		}
            }
		 }
	}

	function uninstall_relationship($file, $rel_dictionary = null){
        if ($rel_dictionary == null)
		{
			if(!file_exists($file)){
				$GLOBALS['log']->debug( 'File does not exists : '.$file);
				return;
			}
			include($file);
			$rel_dictionary = $dictionary;
		}

		foreach ($rel_dictionary as $rel_name => $rel_data)
		{
			if (!empty($rel_data['table'])){
				$table = $rel_data['table'];
			}
			else{
				$table = ' One-to-Many ';
			}

			if ($this->db->tableExists($table) && isset($GLOBALS['mi_remove_tables']) && $GLOBALS['mi_remove_tables'])
			{
				SugarBean::removeRelationshipMeta($rel_name, $this->db,$table,$rel_dictionary,'');
				$this->db->dropTableName($table);
				if(!$this->silent) $this->log( translate('LBL_MI_UN_RELATIONSHIPS_DROP') . $table);
			}

			//Delete Layout defs
			// check to see if we have any vardef or layoutdef entries to remove - must have a relationship['module'] parameter if we do
			if (!isset($rel_data[ 'module' ]))
				$mods = array(
					$rel_data['relationships'][$rel_name]['lhs_module'],
					$rel_data['relationships'][$rel_name]['rhs_module'],
				);
			else
				$mods = array($rel_data[ 'module' ]);

			$filename = "$rel_name.php";

			foreach($mods as $mod) {
				if ($mod != 'application' )  {
					$basepath = "custom/Extension/modules/$mod/Ext/";
				} else {
					$basepath = "custom/Extension/application/Ext/";
				}

				foreach (array($filename , "custom" . $filename) as $fn) {
					//remove any vardefs
					$path = $basepath . "Vardefs/$fn" ;
					if (file_exists( $path ))
						rmdir_recursive( $path );

					//remove any layoutdefs
					$path = $basepath . "Layoutdefs/$fn" ;
					if( file_exists( $path ))
					{
						rmdir_recursive( $path );
					}
				}
			}

			foreach (array($filename , "custom" . $filename) as $fn) {
				// remove the table dictionary extension
				if ( file_exists("custom/Extension/application/Ext/TableDictionary/$fn"))
				    unlink("custom/Extension/application/Ext/TableDictionary/$fn");

				if (file_exists("custom/metadata/{$rel_name}MetaData.php"))
					unlink( "custom/metadata/{$rel_name}MetaData.php" );
			}
		}
	}

	function uninstall_relationships($include_studio_relationships = false){
		$relationships = array();

		//Find and remove studio created relationships.
		global $beanList, $beanFiles, $dictionary;
		//Load up the custom relationship definitions.
		if(file_exists('custom/application/Ext/TableDictionary/tabledictionary.ext.php')){
			include('custom/application/Ext/TableDictionary/tabledictionary.ext.php');
		}
		//Find all the relatioships/relate fields involving this module.
		$rels_to_remove = array();
		foreach($beanList as $mod => $bean) {
			VardefManager::loadVardef($mod, $bean);
			//We can skip modules that are in this package as they will be removed anyhow
			if (!in_array($mod, $this->modulesInPackage) && !empty($dictionary[$bean]) && !empty($dictionary[$bean]['fields']))
			{
				$field_defs = $dictionary[$bean]['fields'];
				foreach($field_defs as $field => $def)
				{
					//Weed out most fields first
					if (isset ($def['type']))
					{
						//Custom relationships created in the relationship editor
						if ($def['type'] == "link" && !empty($def['relationship']) && !empty($dictionary[$def['relationship']]))
						{
							$rel_name = $def['relationship'];

							$rel_def = $dictionary[$rel_name]['relationships'][$rel_name];

							//Check against mods to be removed.
							foreach($this->modulesInPackage as $removed_mod) {
								if ($rel_def['lhs_module'] == $removed_mod || $rel_def['rhs_module'] == $removed_mod )
								{
									$dictionary[$rel_name]['from_studio'] = true;
									$relationships[$rel_name] = $dictionary[$rel_name];
								}
							}
						}
						//Custom "relate" fields created in studio also need to be removed
						if ($def['type'] == 'relate' && isset($def['module'])) {
							foreach($this->modulesInPackage as $removed_mod) {
								if ($def['module'] == $removed_mod)
								{
									require_once 'modules/ModuleBuilder/Module/StudioModule.php' ;
									$studioMod = new StudioModule ( $mod );
									$studioMod->removeFieldFromLayouts( $field );
									if (isset($def['custom_module'])) {
										require_once ('modules/DynamicFields/DynamicField.php') ;
										require_once ($beanFiles [ $bean ]) ;
										$seed = new $bean ( ) ;
										$df = new DynamicField ( $mod ) ;
										$df->setup ( $seed ) ;
										//Need to load the entire field_meta_data for some field types
										$field_obj = $df->getFieldWidget($mod, $field);
										$field_obj->delete ( $df ) ;
									}
								}
							}
						}
					}
				}
			}
		}



		$this->uninstall_relationship(null, $relationships);

		if(isset($this->installdefs['relationships'])) {
			$relationships = $this->installdefs['relationships'];
			$this->log(translate('LBL_MI_UN_RELATIONSHIPS') );
			foreach($relationships as $relationship)
			{
				// remove the metadata entry
				$filename = basename ( $relationship['meta_data'] );
				$pathname = (file_exists("custom/metadata/$filename")) ? "custom/metadata/$filename" : "metadata/$filename" ;
				if(isset($GLOBALS['mi_remove_tables']) && $GLOBALS['mi_remove_tables'])
				$this->uninstall_relationship( $pathname );
				if (file_exists($pathname))
					unlink( $pathname );
			}
		}

		if (file_exists("custom/Extension/application/Ext/TableDictionary/{$this->id_name}.php"))
			unlink("custom/Extension/application/Ext/TableDictionary/{$this->id_name}.php");
		Relationship::delete_cache();
		$this->rebuild_tabledictionary();
	}




	function uninstall($base_dir){
		if(defined('TEMPLATE_URL'))SugarTemplateUtilities::disableCache();
		global $app_strings;
		$total_steps = 5; //min steps with no tasks
		$current_step = 0;
		$this->base_dir = $base_dir;
		$tasks = array(
			'pre_uninstall',
			'uninstall_relationships',
			'uninstall_copy',
			'uninstall_dcactions',
			'uninstall_menus',
			'uninstall_dashlets',
			'uninstall_userpage',
			'uninstall_administration',
			'uninstall_connectors',
			'uninstall_vardefs',
			'uninstall_layoutdefs',
			'uninstall_layoutfields',
			'uninstall_languages',
			'uninstall_logichooks',
			'post_uninstall',
		);
		$total_steps += count($tasks); //now the real number of steps
		if(file_exists($this->base_dir . '/manifest.php')){
				if(!$this->silent){
					$current_step++;
					display_progress_bar('install', $current_step, $total_steps);
					echo '<div id ="displayLoglink" ><a href="#" onclick="toggleDisplay(\'displayLog\')">'.$app_strings['LBL_DISPLAY_LOG'].'</a> </div><div id="displayLog" style="display:none">';
				}

				global $moduleList;
				include($this->base_dir . '/manifest.php');
				$this->installdefs = $installdefs;
				$this->id_name = $this->installdefs['id'];
				$installed_modules = array();
				if(isset($this->installdefs['beans'])){

					foreach($this->installdefs['beans'] as $bean){

						$installed_modules[] = $bean['module'];
						$this->uninstall_user_prefs($bean['module']);
					}
					$this->modulesInPackage = $installed_modules;
					$this->uninstall_beans($installed_modules);
					$this->uninstall_customizations($installed_modules);
					if(!$this->silent){
						$current_step++;
						update_progress_bar('install', $total_steps, $total_steps);
					}
					if (sugar_is_file("custom/Extension/application/Ext/Include/$this->id_name.php", 'w'))
						rmdir_recursive("custom/Extension/application/Ext/Include/$this->id_name.php");
					else if(sugar_is_file("custom/Extension/application/Ext/Include/" . DISABLED_PATH . "/$this->id_name.php", 'w'))
						rmdir_recursive("custom/Extension/application/Ext/Include/" . DISABLED_PATH . "/$this->id_name.php");

					$this->rebuild_modules();
				}
				if(!$this->silent){
					$current_step++;
					update_progress_bar('install', $current_step, $total_steps);
				}


				foreach($tasks as $task){
					$this->$task();
					if(!$this->silent){
						$current_step++;
						update_progress_bar('install', $current_step, $total_steps);
					}
				}
				if(isset($installdefs['custom_fields']) && (isset($GLOBALS['mi_remove_tables']) && $GLOBALS['mi_remove_tables'])){
					$this->log(translate('LBL_MI_UN_CUSTOMFIELD'));
					$this->uninstall_custom_fields($installdefs['custom_fields']);
				}
				if(!$this->silent){
					$current_step++;
					update_progress_bar('install', $current_step, $total_steps);
					echo '</div>';
				}
				//since we are passing $silent = true to rebuildAll() in that method it will set $this->silent = true, so
				//we need to save the setting to set it back after rebuildAll() completes.
				$silentBak = $this->silent;
				$this->rebuild_all(true);
				$this->silent = $silentBak;

				//#27877, If the request from MB redeploy a custom module , we will not remove the ACL actions for this package.
				if( !isset($_REQUEST['action']) || $_REQUEST['action']!='DeployPackage' ){
					$this->remove_acl_actions();
				}
				//end

				if(!$this->silent){
					$current_step++;
					update_progress_bar('install', $current_step, $total_steps);
					echo '</div>';
				}

				UpdateSystemTabs('Restore',$installed_modules);

	            //clear the unified_search_module.php file 
	            require_once('modules/Home/UnifiedSearchAdvanced.php');
	            UnifiedSearchAdvanced::unlinkUnifiedSearchModulesFile();     				
				
				$this->log('<br><b>' . translate('LBL_MI_COMPLETE') . '</b>');
				if(!$this->silent){
					update_progress_bar('install', $total_steps, $total_steps);
				}
		}else{
			die("No manifest.php Defined In $this->base_dir/manifest.php");
		}
	}

	function rebuild_languages($languages, $modules=""){
            foreach($languages as $language=>$value){
				$this->log(translate('LBL_MI_REBUILDING') . " Language...$language");
				$this->merge_files('Ext/Language/', $language.'.lang.ext.php', $language);
	            if($modules!=""){
	                foreach($modules as $module){
	                	LanguageManager::clearLanguageCache($module, $language);
	                }
	            }
			}
			sugar_cache_reset();

	}

	function rebuild_vardefs(){
            $this->log(translate('LBL_MI_REBUILDING') . " Vardefs...");
			$this->merge_files('Ext/Vardefs/', 'vardefs.ext.php');
			sugar_cache_reset();
	}

	function rebuild_layoutdefs(){
            $this->log(translate('LBL_MI_REBUILDING') . " Layoutdefs...");
			$this->merge_files('Ext/Layoutdefs/', 'layoutdefs.ext.php');

	}

	function rebuild_menus(){
            $this->log(translate('LBL_MI_REBUILDING') . " Menus...");
			$this->merge_files('Ext/Menus/', 'menu.ext.php');
	}

	function rebuild_dashletcontainers(){
            $this->log(translate('LBL_MI_REBUILDING') . " DC Actions...");
			$this->merge_files('Ext/DashletContainer/Containers/', 'dcactions.ext.php');
	}

	function rebuild_modules(){
            $this->log(translate('LBL_MI_REBUILDING') . " Modules...");
			$this->merge_files('Ext/Include/', 'modules.ext.php', '', true);
	}

	function rebuild_administration(){
            $this->log(translate('LBL_MI_REBUILDING') . " administration " . translate('LBL_MI_SECTION'));
			$this->merge_files('Ext/Administration/', 'administration.ext.php');
	}
	function rebuild_userpage(){
            $this->log(translate('LBL_MI_REBUILDING') . " User Page " . translate('LBL_MI_SECTION'));
			$this->merge_files('Ext/UserPage/', 'userpage.ext.php');
	}
	function rebuild_tabledictionary(){
            $this->log(translate('LBL_MI_REBUILDING') . " administration " . translate('LBL_MI_SECTION'));
			$this->merge_files('Ext/TableDictionary/', 'tabledictionary.ext.php');
	}

	function rebuild_relationships() {
        if(!$this->silent) echo translate('LBL_MI_REBUILDING') . ' Relationships';
		$_REQUEST['silent'] = true;
		global $beanFiles;
		include('include/modules.php');
		include("modules/Administration/RebuildRelationship.php");
	}

	function remove_acl_actions() {
		global $beanFiles, $beanList, $current_user;
		include('include/modules.php');
		include("modules/ACL/remove_actions.php");
	}

	/**
	 * Wrapper call to modules/Administration/RepairIndex.php
	 */
	function repair_indices() {
		global $current_user,$beanFiles,$dictionary;
		$this->log(translate('LBL_MI_REPAIR_INDICES'));
		$_REQUEST['silent'] = true; // local var flagging echo'd output in repair script
		$_REQUEST['mode'] = 'execute'; // flag to just go ahead and run the script
		include("modules/Administration/RepairIndex.php");
	}

	/**
	 * Rebuilds the extension files found in custom/Extension
	 * @param boolean $silent
	 */
	function rebuild_all($silent=false){
		if(defined('TEMPLATE_URL'))SugarTemplateUtilities::disableCache();
		$this->silent=$silent;
		global $sugar_config;

		//Check for new module extensions
		$this->rebuild_modules();

		$this->rebuild_languages($sugar_config['languages']);
		$this->rebuild_vardefs();
		$this->rebuild_layoutdefs();
		$this->rebuild_menus();
		$this->rebuild_dashletcontainers();
		$this->rebuild_userpage();
		$this->rebuild_administration();
		$this->rebuild_relationships();
		$this->rebuild_tabledictionary();
		//$this->repair_indices();
		$this->reset_opcodes();
		sugar_cache_reset();
	}

	/*
     * ModuleInstaller->merge_files runs over the list of all modules already installed in /modules. For each $module it reads the contents of every file in
     * custom/Extension/modules/$module/<path> (_override files last) and concatenates them to custom/modules/$module/<path>/<file>.
     * Then it does the same thing in custom/Extension/application/<path>, concatenating those files and copying the result to custom/application/<path>/<file>
     */
	function merge_files($path, $name, $filter = '', $application = false){
		if(!$application){
		$GLOBALS['log']->debug( get_class($this)."->merge_files() : merging module files in custom/Extension/modules/<module>/$path to custom/modules/<module>/$path$name");
		foreach($this->modules as $module){
				//$GLOBALS['log']->debug("Merging Files for: ".$module);
				//$GLOBALS['log']->debug("Merging Files for path: ".$path);
				$extension = "<?php \n //WARNING: The contents of this file are auto-generated\n";
				$extpath = "modules/$module/$path";
				$module_install  = 'custom/Extension/'.$extpath;
				$shouldSave = false;
				if(is_dir($module_install)){
					$dir = dir($module_install);
					$shouldSave = true;
					$override = array();
					while($entry = $dir->read()){
						if((empty($filter) || substr_count($entry, $filter) > 0) && is_file($module_install.'/'.$entry)
						  && $entry != '.' && $entry != '..' && strtolower(substr($entry, -4)) == ".php")
						{
						     if (substr($entry, 0, 9) == '_override') {
						    	$override[] = $entry;
						    } else {
							    $file = file_get_contents($module_install . '/' . $entry);
							    $GLOBALS['log']->debug(get_class($this)."->merge_files(): found {$module_install}{$entry}") ;
							    $extension .= "\n". str_replace(array('<?php', '?>', '<?PHP', '<?'), array('','', '' ,'') , $file);
						    }
						}
					}
					foreach ($override as $entry) {
                        $file = file_get_contents($module_install . '/' . $entry);
                        $extension .= "\n". str_replace(array('<?php', '?>', '<?PHP', '<?'), array('','', '' ,'') , $file);
					}
				}
				$extension .= "\n?>";

				if($shouldSave){
					if(!file_exists("custom/$extpath")){
					mkdir_recursive("custom/$extpath", true);
				}
					$out = sugar_fopen("custom/$extpath/$name", 'w');
					fwrite($out,$extension);
					fclose($out);
				}else{
					if(file_exists("custom/$extpath/$name")){
						unlink("custom/$extpath/$name");
					}
				}
			}

		}

		$GLOBALS['log']->debug("Merging application files for $name in $path");
		//Now the application stuff
		$extension = "<?php \n //WARNING: The contents of this file are auto-generated\n";
		$extpath = "application/$path";
		$module_install  = 'custom/Extension/'.$extpath;
		$shouldSave = false;
					if(is_dir($module_install)){
						$dir = dir($module_install);
						while($entry = $dir->read()){
								$shouldSave = true;
								if((empty($filter) || substr_count($entry, $filter) > 0) && is_file($module_install.'/'.$entry)
								  && $entry != '.' && $entry != '..' && strtolower(substr($entry, -4)) == ".php")
								{
									$file = file_get_contents($module_install . '/' . $entry);
									$extension .= "\n". str_replace(array('<?php', '?>', '<?PHP', '<?'), array('','', '' ,'') , $file);
								}
						}
					}
					$extension .= "\n?>";
					if($shouldSave){
						if(!file_exists("custom/$extpath")){
							mkdir_recursive("custom/$extpath", true);
						}
						$out = sugar_fopen("custom/$extpath/$name", 'w');
						fwrite($out,$extension);
						fclose($out);
					}else{
					if(file_exists("custom/$extpath/$name")){
						unlink("custom/$extpath/$name");
					}
				}

}

    /*
     * ModuleInstaller->install_beans runs through the list of beans given, instantiates each bean, calls bean->create_tables, and then calls SugarBean::createRelationshipMeta for the
     * bean/module.
     */
	function install_beans($beans){
        include('include/modules.php');
		foreach($beans as $bean){
			$this->log( translate('LBL_MI_IN_BEAN') . " $bean");
			if(isset($beanList[$bean])){
				$class = $beanList[$bean];
				if(file_exists($beanFiles[$class])){
					require_once($beanFiles[$class]);
					$mod = new $class();
					//#30273
					if(is_subclass_of($mod, 'SugarBean')  && $mod->disable_vardefs == false ){
						$GLOBALS['log']->debug( "Creating Tables Bean : $bean");
						$mod->create_tables();
						SugarBean::createRelationshipMeta($mod->getObjectName(), $mod->db,$mod->table_name,'',$mod->module_dir);
					}
				}else{
					$GLOBALS['log']->debug( "File Does Not Exist:" . $beanFiles[$class] );
				}
			}
		}
	}

		function uninstall_beans($beans){
		include('include/modules.php');
        foreach($beans as $bean){
			$this->log( translate('LBL_MI_UN_BEAN') . " $bean");
			if(isset($beanList[$bean])){
				$class = $beanList[$bean];

				if(file_exists($beanFiles[$class])){
					require_once($beanFiles[$class]);
					$mod = new $class();

					if(is_subclass_of($mod, 'SugarBean')){
						$GLOBALS['log']->debug( "Drop Tables : $bean");
						if(isset($GLOBALS['mi_remove_tables']) && $GLOBALS['mi_remove_tables'])
							$mod->drop_tables();
					}
				}else{
					$GLOBALS['log']->debug( "File Does Not Exist:" . $beanFiles[$class] );
				}
			}
		}
	}

	/**
	 * Remove any customizations made within Studio while the module was installed.
	 */
	function uninstall_customizations($beans){
        foreach($beans as $bean){
			$dirs = array(
				'custom/modules/' . $bean,
				'custom/Extension/modules/' . $bean
			);
        	foreach($dirs as $dir)
        	{
				if(is_dir($dir)){
					rmdir_recursive($dir);
				}
        	}
		}
	}

	function log($str){
		$GLOBALS['log']->debug('ModuleInstaller:'. $str);
		if(!$this->silent){
			echo $str . '<br>';
		}
	}

/* BEGIN - RESTORE POINT - by MR. MILK August 31, 2005 02:15:18 PM 	*/
function copy_recursive_with_backup( $source, $dest, $backup_path, $uninstall=false ) {
	if(is_file($source)) {
	    if($uninstall) {
		    $GLOBALS['log']->debug("Restoring ... " . $source.  " to " .$dest );
		    if(copy( $source, $dest)) {
			    if(is_writable($dest))
			    	sugar_touch( $dest, filemtime($source) );
		    	return(unlink($source));
	    	}
		    else {
		    	$GLOBALS['log']->debug( "Can't restore file: " . $source );
		    	return true;
	    	}
	    }
	    else {
			if(file_exists($dest)) {
				$rest = clean_path($backup_path."/$dest");
				if( !is_dir(dirname($rest)) )
					mkdir_recursive(dirname($rest), true);

				$GLOBALS['log']->debug("Backup ... " . $dest.  " to " .$rest );
				if(copy( $dest, $rest)) {
					if(is_writable($rest))
						sugar_touch( $rest, filemtime($dest) );
				}
				else {
					$GLOBALS['log']->debug( "Can't backup file: " . $dest );
				}
			}
			return( copy( $source, $dest ) );
		}
    }
    elseif(!is_dir($source)) {
	    if($uninstall) {
			if(is_file($dest))
				return(unlink($dest));
			else {
				//don't do anything we already cleaned up the files using uninstall_new_files
				return true;
			}
		}
		else
			return false;
	}

    if( !is_dir($dest) && !$uninstall){
        sugar_mkdir( $dest );
    }

    $status = true;

    $d = dir( $source );
    while( $f = $d->read() ){
        if( $f == "." || $f == ".." ){
            continue;
        }
        $status &= $this->copy_recursive_with_backup( "$source/$f", "$dest/$f", $backup_path, $uninstall );
    }
    $d->close();
    return( $status );
}

private function dir_get_files($path, $base_path){
	$files = array();
	if(!is_dir($path))return $files;
	$d = dir($path);
	while ($e = $d->read()){
		//ignore invisible files . .. ._MACOSX
		if(substr($e, 0, 1) == '.')continue;
		if(is_file($path . '/' . $e))$files[str_replace($base_path , '', $path . '/' . $e)] = str_replace($base_path , '', $path . '/' . $e);
		if(is_dir($path . '/' . $e))$files = array_merge($files, $this->dir_get_files($path . '/' . $e, $base_path));
	}
	$d->close();
	return $files;

}

private function dir_file_count($path){
	//if its a file then it has at least 1 file in the directory
	if(is_file($path)) return 1;
	if(!is_dir($path)) return 0;
	$d = dir($path);
	$count = 0;
	while ($e = $d->read()){
		//ignore invisible files . .. ._MACOSX
		if(substr($e, 0, 1) == '.')continue;
		if(is_file($path . '/' . $e))$count++;
		if(is_dir($path . '/' . $e))$count += $this->dir_file_count($path . '/' . $e);
	}
	$d->close();
	return $count;


}
/* END - RESTORE POINT - by MR. MILK August 31, 2005 02:15:34 PM */


	/**
	 * Static function which allows a module developer to abort their progress, pass in an array of errors and
	 * redirect back to the main module loader page
	 *
	 * @param errors	an array of error messages which will be displayed on the
	 * 					main module loader page once it is loaded.
	 */
	function abort($errors = array()){
		//set the errors onto the session so we can display them one the moduler loader page loads
		$_SESSION['MODULEINSTALLER_ERRORS'] = $errors;
		echo '<META HTTP-EQUIV="Refresh" content="0;url=index.php?module=Administration&action=UpgradeWizard&view=module">';
		die();
		//header('Location: index.php?module=Administration&action=UpgradeWizard&view=module');
	}

	/**
	 * Return the set of errors stored in the SESSION
	 *
	 * @return an array of errors
	 */
	function getErrors(){
		if(!empty($_SESSION['MODULEINSTALLER_ERRORS'])){
			$errors = $_SESSION['MODULEINSTALLER_ERRORS'];
			unset($_SESSION['MODULEINSTALLER_ERRORS']);
			return $errors;
		}
		else
			return null;
	}

	/*
     * Add any fields to the DetailView and EditView of the appropriate modules
     * Only add into deployed modules, as addFieldsToUndeployedLayouts has done this already for undeployed modules (and the admin might have edited the layouts already)
     * @param array $layoutAdditions  An array of module => fieldname
     * return null
     */
	function addFieldsToLayout($layoutAdditions) {
	require_once 'modules/ModuleBuilder/parsers/views/GridLayoutMetaDataParser.php' ;

        // these modules either lack editviews/detailviews or use custom mechanisms for the editview/detailview.
        // In either case, we don't want to attempt to add a relate field to them
        // would be better if GridLayoutMetaDataParser could handle this gracefully, so we don't have to maintain this list here
        $invalidModules = array ( 'emails' , 'kbdocuments' ) ;

        foreach ( $layoutAdditions as $deployedModuleName => $fieldName )
        {
            if ( ! in_array( strtolower ( $deployedModuleName ) , $invalidModules ) )
            {
                foreach ( array ( MB_EDITVIEW , MB_DETAILVIEW ) as $view )
                {
                    $GLOBALS [ 'log' ]->debug ( get_class ( $this ) . ": adding $fieldName to $view layout for module $deployedModuleName" ) ;
                    $parser = new GridLayoutMetaDataParser ( $view, $deployedModuleName ) ;
                    $parser->addField ( array ( 'name' => $fieldName ) ) ;
                    $parser->handleSave ( false ) ;
                }
            }
        }

	}

	function removeFieldsFromLayout($layoutAdditions) {
	require_once 'modules/ModuleBuilder/parsers/views/GridLayoutMetaDataParser.php' ;

        // these modules either lack editviews/detailviews or use custom mechanisms for the editview/detailview.
        // In either case, we don't want to attempt to add a relate field to them
        // would be better if GridLayoutMetaDataParser could handle this gracefully, so we don't have to maintain this list here
        $invalidModules = array ( 'emails' , 'kbdocuments' ) ;

        foreach ( $layoutAdditions as $deployedModuleName => $fieldName )
        {
            if ( ! in_array( strtolower ( $deployedModuleName ) , $invalidModules ) )
            {
                foreach ( array ( MB_EDITVIEW , MB_DETAILVIEW ) as $view )
                {
                    $GLOBALS [ 'log' ]->debug ( get_class ( $this ) . ": adding $fieldName to $view layout for module $deployedModuleName" ) ;
                    $parser = new GridLayoutMetaDataParser ( $view, $deployedModuleName ) ;
                    $parser->removeField ( $fieldName ) ;
                    $parser->handleSave ( false ) ;
                }
            }
        }

	}

	///////////////////
	//********** DISABLE/ENABLE FUNCTIONS
	///////////////////
	function enable($base_dir, $is_upgrade = false, $previous_version = ''){
		global $app_strings;
		$this->base_dir = $base_dir;
		$total_steps = 3; //minimum number of steps with no tasks
		$current_step = 0;
		$tasks = array(
								'enable_copy',
								'enable_menus',
								'enable_userpage',
								'enable_dashlets',
								'enable_administration',
								'enable_vardefs',
								'enable_layoutdefs',
								'enable_relationships',
								'enable_languages',
								'enable_logichooks',
								'reset_opcodes',
		);
		$total_steps += count($tasks);
		if(file_exists($this->base_dir . '/manifest.php')){
				if(!$this->silent){
					$current_step++;
					display_progress_bar('install', $current_step, $total_steps);
					echo '<div id ="displayLoglink" ><a href="#" onclick="toggleDisplay(\'displayLog\')">'.$app_strings['LBL_DISPLAY_LOG'].'</a> </div><div id="displayLog" style="display:none">';
				}

				require_once($this->base_dir . '/manifest.php');
				if($is_upgrade && !empty($previous_version)){
					//check if the upgrade path exists
					if(!empty($upgrade_manifest)){
						if(!empty($upgrade_manifest['upgrade_paths'])){
							if(!empty($upgrade_manifest['upgrade_paths'][$previous_version])){
								$installdefs = 	$upgrade_manifest['upgrade_paths'][$previous_version];
							}else{
								$errors[] = 'No Upgrade Path Found in manifest.';
								$this->abort($errors);
							}//fi
						}//fi
					}//fi
				}//fi
				$this->id_name = $installdefs['id'];
				$this->installdefs = $installdefs;
				$installed_modules = array();
				if(isset($installdefs['beans'])){
					foreach($this->installdefs['beans'] as $bean){
						$installed_modules[] = $bean['module'];
					}
					if(!file_exists("custom/Extension/application/Ext/Include")){
						mkdir_recursive("custom/Extension/application/Ext/Include", true);
					}
					if (file_exists("custom/Extension/application/Ext/Include/".DISABLED_PATH.'/'. $this->id_name . '.php'))
						rename("custom/Extension/application/Ext/Include/".DISABLED_PATH.'/'. $this->id_name . '.php',"custom/Extension/application/Ext/Include/$this->id_name.php");
					$this->rebuild_modules();
				}
				if(!$this->silent){
					$current_step++;
					update_progress_bar('install', $current_step, $total_steps);
				}

				foreach($tasks as $task){
					$this->$task();
					if(!$this->silent){
						$current_step++;
						update_progress_bar('install', $current_step, $total_steps);
					}
				}

				if(!$this->silent){
					$current_step++;
					update_progress_bar('install', $current_step, $total_steps);
					echo '</div>';
				}
				UpdateSystemTabs('Add',$installed_modules);
				$GLOBALS['log']->debug('Complete');

		}else{
			die("No \$installdefs Defined In $this->base_dir/manifest.php");
		}

	}
	function disable($base_dir){
		global $app_strings;
		$total_steps = 3; //min steps with no tasks
		$current_step = 0;
		$this->base_dir = $base_dir;
		$tasks = array(
							'disable_copy',
							'disable_menus',
							'disable_dashlets',
							'disable_userpage',
							'disable_administration',
							'disable_vardefs',
							'disable_layoutdefs',
							'disable_relationships',
							'disable_languages',
							'disable_logichooks',
							'reset_opcodes',
							);
		$total_steps += count($tasks); //now the real number of steps
		if(file_exists($this->base_dir . '/manifest.php')){
				if(!$this->silent){
					$current_step++;
					display_progress_bar('install', $current_step, $total_steps);
					echo '<div id ="displayLoglink" ><a href="#" onclick="toggleDisplay(\'displayLog\')">'.$app_strings['LBL_DISPLAY_LOG'].'</a> </div><div id="displayLog" style="display:none">';
				}

				require_once($this->base_dir . '/manifest.php');
				$this->installdefs = $installdefs;
				$this->id_name = $this->installdefs['id'];
				$installed_modules = array();
				if(isset($this->installdefs['beans'])){
					foreach($this->installdefs['beans'] as $bean){
						$installed_modules[] = $bean['module'];
					}

					mkdir_recursive("custom/Extension/application/Ext/Include/".DISABLED_PATH, true);

					//Clear any older disabled version
					if (file_exists("custom/Extension/application/Ext/Include/".DISABLED_PATH.'/'. $this->id_name . '.php'))
						rmdir_recursive("custom/Extension/application/Ext/Include/".DISABLED_PATH.'/'. $this->id_name . '.php');

					if (file_exists("custom/Extension/application/Ext/Include/$this->id_name.php"))
						rename("custom/Extension/application/Ext/Include/$this->id_name.php", "custom/Extension/application/Ext/Include/".DISABLED_PATH.'/'. $this->id_name . '.php');
					$this->rebuild_modules();
				}
				if(!$this->silent){
					$current_step++;
					update_progress_bar('install', $current_step, $total_steps);
				}
				foreach($tasks as $task){
					$this->$task();
					if(!$this->silent){
						$current_step++;
						update_progress_bar('install', $current_step, $total_steps);
					}
				}
				if(!$this->silent){
					$current_step++;
					update_progress_bar('install', $current_step, $total_steps);
					echo '</div>';
				}
			UpdateSystemTabs('Restore',$installed_modules);

		}else{
			die("No manifest.php Defined In $this->base_dir/manifest.php");
		}
	}
	function enable_vardef($to_module){
		if(isset($this->installdefs['vardefs'])){
			foreach($this->installdefs['vardefs'] as $vardefs){
			$GLOBALS['log']->debug("Enabling Vardefs ..." .$to_module);
			$path = 'custom/Extension/modules/' . $to_module. '/Ext/Vardefs';
			if($to_module == 'application'){
				$path ='custom/Extension/' . $to_module. '/Ext/Vardefs';
			}
			if(!file_exists($path)){
				mkdir_recursive($path, true);
			}
			if (file_exists($path . '/'.DISABLED_PATH.'/'. $this->id_name . '.php'))
				rename($path . '/'.DISABLED_PATH.'/'. $this->id_name . '.php',  $path . '/'. $this->id_name . '.php');
			if (file_exists($path . '/'.DISABLED_PATH.'/'. basename($vardefs['from'])))
				rename($path . '/'.DISABLED_PATH.'/'. basename($vardefs['from']),  $path . '/'. basename($vardefs['from']));
			}
		}
	}
	function enable_vardefs(){
		if(isset($this->installdefs['vardefs'])){
			foreach($this->installdefs['vardefs'] as $vardefs){
				$vardefs['from'] = str_replace('<basepath>', $this->base_dir, $vardefs['from']);
				$GLOBALS['log']->debug("Enabling Vardefs ..." . $vardefs['from'] .  " for " .$vardefs['to_module']);
				$path = 'custom/Extension/modules/' . $vardefs['to_module']. '/Ext/Vardefs';
				if($vardefs['to_module'] == 'application'){
					$path ='custom/Extension/' . $vardefs['to_module']. '/Ext/Vardefs';
				}
				if(file_exists($path . '/'.DISABLED_PATH.'/'. $this->id_name . '.php'))
					rename( $path . '/'.DISABLED_PATH.'/'. $this->id_name . '.php', $path . '/'. $this->id_name . '.php');

				if (file_exists($path . '/'.DISABLED_PATH.'/'. basename($vardefs['from'])))
					rename($path . '/'.DISABLED_PATH.'/'. basename($vardefs['from']),  $path . '/'. basename($vardefs['from']));

			}
			$this->rebuild_vardefs();
		}
	}
	function disable_vardefs(){
		$GLOBALS['log']->debug("Disabling Vardefs ".var_export($this->installdefs, true));
		if(isset($this->installdefs['vardefs'])){
			foreach($this->installdefs['vardefs'] as $vardefs){
				$vardefs['from'] = str_replace('<basepath>', $this->base_dir, $vardefs['from']);
				$GLOBALS['log']->debug("Disabling Vardefs ..." . $vardefs['from'] .  " for " .$vardefs['to_module']);
				$path = 'custom/Extension/modules/' . $vardefs['to_module']. '/Ext/Vardefs';
				if($vardefs['to_module'] == 'application'){
					$path ='custom/Extension/' . $vardefs['to_module']. '/Ext/Vardefs';
				}
				if(file_exists($path . '/'. $this->id_name . '.php')) {
					mkdir_recursive($path . '/'.DISABLED_PATH, true);
					rename( $path . '/'. $this->id_name . '.php', $path . '/'.DISABLED_PATH.'/'. $this->id_name . '.php');
				}
				if(file_exists($path . '/'. basename($vardefs['from'])))
				{
					mkdir_recursive($path . '/'.DISABLED_PATH, true);
					rename( $path . '/'. basename($vardefs['from']), $path . '/'.DISABLED_PATH.'/'.basename($vardefs['from']));
				}
			}
			$this->rebuild_vardefs();
		}
	}

	function enable_relationships(){
		if(isset($this->installdefs['relationships'])){
			$str = "<?php \n //WARNING: The contents of this file are auto-generated\n";
			$save_table_dictionary = false;
			foreach($this->installdefs['relationships'] as $relationship){
                $filename	=basename($relationship['meta_data']);

				$save_table_dictionary  = true;
				$str .= "include_once('metadata/$filename');\n";
				if (empty($relationship['module']))
				    continue;

				if(!empty($relationship['module_vardefs'])){
					$this->enable_vardef($relationship['module']);
				}
				if(!empty($relationship['module_layoutdefs'])){
					$this->enable_layoutdef($relationship['module']);
				}
			}
			$this->rebuild_vardefs();
			$this->rebuild_layoutdefs();
			if($save_table_dictionary){
				if(!file_exists("custom/Extension/application/Ext/TableDictionary")){
					mkdir_recursive("custom/Extension/application/Ext/TableDictionary", true);
				}
				if (file_exists("custom/Extension/application/Ext/TableDictionary/".DISABLED_PATH."/$this->id_name.php"))
				   rename("custom/Extension/application/Ext/TableDictionary/".DISABLED_PATH."/$this->id_name.php", "custom/Extension/application/Ext/TableDictionary/$this->id_name.php");
				$this->rebuild_tabledictionary();
			}
		}
	}

	function disable_relationships($action = 'disable'){
		if(isset($this->installdefs['relationships'])){
			foreach($this->installdefs['relationships'] as $relationship){
				$filename = basename($relationship['meta_data']);
                $relName = substr($filename, -12) == "MetaData.php" ? substr($filename,0,strlen($filename) - 12) : "";
				if (empty($relationship['module']) && empty($relName))
                	continue;

				//remove the vardefs
				if (empty($relName))
					$path = 'custom/Extension/modules/' . $relationship['module']. '/Ext/Vardefs';
				if(!empty($relationship['module']) && $relationship['module'] == 'application'){
					$path ='custom/Extension/' . $relationship['module']. '/Ext/Vardefs';
				}
				if(!empty($relationship['module_vardefs']) && file_exists($path . '/'. $this->id_name . '.php')){
					mkdir_recursive($path . '/'.DISABLED_PATH, true);
					rename( $path . '/'. $this->id_name . '.php', $path . '/'.DISABLED_PATH.'/'. $this->id_name . '.php');
				}
				//remove the layoutdefs
				if ( !empty($relationship['module']) ) {
                    $path = 'custom/Extension/modules/' . $relationship['module']. '/Ext/Layoutdefs';
                    if($relationship['module'] == 'application'){
                        $path ='custom/Extension/' . $relationship['module']. '/Ext/Layoutdefs';
                    }
				}

				if(!empty($relationship['module_layoutdefs']) && file_exists($path . '/'. $this->id_name . '.php')){
					mkdir_recursive($path . '/'.DISABLED_PATH, true);
					rename( $path . '/'. $this->id_name . '.php', $path . '/'.DISABLED_PATH.'/'. $this->id_name . '.php');
				}

			}
			if(file_exists("custom/Extension/application/Ext/TableDictionary/$this->id_name.php")){
				mkdir_recursive("custom/Extension/application/Ext/TableDictionary/".DISABLED_PATH, true);
				rename("custom/Extension/application/Ext/TableDictionary/$this->id_name.php", "custom/Extension/application/Ext/TableDictionary/".DISABLED_PATH."/$this->id_name.php");
			}
			$this->rebuild_tabledictionary();
			$this->rebuild_vardefs();
			$this->rebuild_layoutdefs();
		}
	}

	function enable_layoutdefs(){
		if(isset($this->installdefs['layoutdefs'])){
			foreach($this->installdefs['layoutdefs'] as $layoutdefs){
				$this->enable_layoutdef($layoutdefs['to_module'], $this->id_name);
			}
			$this->rebuild_layoutdefs();
		}
	}
	function enable_layoutdef($to_module){
		$GLOBALS['log']->debug("Enabling Layout Defs ..." .$to_module);
		if(isset($this->installdefs['layoutdefs'])){
			foreach($this->installdefs['layoutdefs'] as $layoutdefs){
				$path = 'custom/Extension/modules/' . $to_module. '/Ext/Layoutdefs';
				if($to_module == 'application'){
					$path ='custom/Extension/' . $to_module. '/Ext/Layoutdefs';
				}
				if (file_exists($path . '/'.DISABLED_PATH.'/'. $this->id_name . '.php'))
				{
					rename($path . '/'.DISABLED_PATH.'/'. $this->id_name . '.php',  $path . '/'. $this->id_name . '.php');
				}
				if (file_exists($path . '/'.DISABLED_PATH.'/'. basename($layoutdefs['from'])))
				{
					rename($path . '/'.DISABLED_PATH.'/'. basename($layoutdefs['from']),  $path . '/'. basename($layoutdefs['from']));
				}
			}
		}
	}

	function disable_layoutdefs(){
		if(isset($this->installdefs['layoutdefs'])){
			foreach($this->installdefs['layoutdefs'] as $layoutdefs){
				$layoutdefs['from'] = str_replace('<basepath>', $this->base_dir, $layoutdefs['from']);
				$GLOBALS['log']->debug("Disabling Layoutdefs ..." . $layoutdefs['from'] .  " for " .$layoutdefs['to_module']);
				$path = 'custom/Extension/modules/' . $layoutdefs['to_module']. '/Ext/Layoutdefs';
				if($layoutdefs['to_module'] == 'application'){
					$path ='custom/Extension/' . $layoutdefs['to_module']. '/Ext/Layoutdefs';
				}
				if (file_exists($path . '/'. $this->id_name . '.php'))
				{
					mkdir_recursive($path . '/'.DISABLED_PATH, true);
					rename( $path . '/'. $this->id_name . '.php', $path . '/'.DISABLED_PATH.'/'. $this->id_name . '.php');
				}else if (file_exists($path . '/'. basename($layoutdefs['from'])))
				{
					mkdir_recursive($path . '/'.DISABLED_PATH, true);
					rename( $path . '/'. basename($layoutdefs['from']), $path . '/'.DISABLED_PATH.'/'. basename($layoutdefs['from']));
				}
			}
			$this->rebuild_layoutdefs();
		}
	}

	function enable_menus(){
		if(isset($this->installdefs['menu'])){
			foreach($this->installdefs['menu'] as $menu){
				$menu['from'] = str_replace('<basepath>', $this->base_dir, $menu['from']);
				$GLOBALS['log']->debug("Enabling Menu ..." . $menu['from'].  " for " .$menu['to_module'] );
				$path = 'custom/Extension/modules/' . $menu['to_module']. '/Ext/Menus';
				if($menu['to_module'] == 'application'){
					$path ='custom/Extension/' . $menu['to_module']. '/Ext/Menus';
				}

				if(file_exists($path . '/'.DISABLED_PATH.'/'. $this->id_name . '.php')){
					rename($path . '/'.DISABLED_PATH.'/'. $this->id_name . '.php',  $path . '/'. $this->id_name . '.php');
				}

			}
			$this->rebuild_menus();
		}

	}

	function disable_menus(){
		if(isset($this->installdefs['menu'])){
			foreach($this->installdefs['menu'] as $menu){
				$menu['from'] = str_replace('<basepath>', $this->base_dir, $menu['from']);
				$GLOBALS['log']->debug("Disabling Menu ..." . $menu['from'].  " for " .$menu['to_module'] );
				$path = 'custom/Extension/modules/' . $menu['to_module']. '/Ext/Menus';
				if($menu['to_module'] == 'application'){
					$path ='custom/Extension/' . $menu['to_module']. '/Ext/Menus';
				}
				if (file_exists( $path . '/'. $this->id_name . '.php'))
				{
					mkdir_recursive($path . '/'.DISABLED_PATH, true);
					rename( $path . '/'. $this->id_name . '.php', $path . '/'.DISABLED_PATH.'/'. $this->id_name . '.php');
				}
			}
			$this->rebuild_menus();
		}
	}

	function enable_administration(){
		if(isset($this->installdefs['administration'])){
			foreach($this->installdefs['administration'] as $administration){
				$administration['from'] = str_replace('<basepath>', $this->base_dir, $administration['from']);
				$GLOBALS['log']->debug("Installing Administration Section ..." . $administration['from'] );
				$path = 'custom/Extension/modules/Administration/Ext/Administration';

				if(file_exists($path . '/'.DISABLED_PATH.'/'. $this->id_name . '.php')){
					rename($path . '/'.DISABLED_PATH.'/'. $this->id_name . '.php',  $path . '/'. $this->id_name . '.php');
				}
			}
			$this->rebuild_administration();
		}

	}
	function disable_administration(){
		if(isset($this->installdefs['administration'])){
			foreach($this->installdefs['administration'] as $administration){
				$administration['from'] = str_replace('<basepath>', $this->base_dir, $administration['from']);
				$GLOBALS['log']->debug("Uninstalling Administration Section ..." . $administration['from'] );
				$path = 'custom/Extension/modules/Administration/Ext/Administration';
				if (file_exists($path . '/'. $this->id_name . '.php'))
				{
					mkdir_recursive($path . '/'.DISABLED_PATH, true);
					rename( $path . '/'. $this->id_name . '.php', $path . '/'.DISABLED_PATH.'/'. $this->id_name . '.php');
				}
			}
			$this->rebuild_administration();
		}
	}

	function enable_dashlets(){
		if(isset($this->installdefs['dashlets'])){
			foreach($this->installdefs['dashlets'] as $cp){
				$cp['from'] = str_replace('<basepath>', $this->base_dir, $cp['from']);
				$path = 'custom/modules/Home/Dashlets/' . $cp['name'] . '/';
				$disabled_path = 'custom/modules/Home/'.DISABLED_PATH.'Dashlets/' . $cp['name'];
				$GLOBALS['log']->debug("Enabling Dashlet " . $cp['name'] . "..." . $cp['from'] );
				if (file_exists($disabled_path))
				{
					rename($disabled_path,  $path);
				}
			}
			include('modules/Administration/RebuildDashlets.php');

		}
	}

	function disable_dashlets(){
		if(isset($this->installdefs['dashlets'])){
					foreach($this->installdefs['dashlets'] as $cp){
						$path = 'custom/modules/Home/Dashlets/' . $cp['name'];
						$disabled_path = 'custom/modules/Home/'.DISABLED_PATH.'Dashlets/' . $cp['name'];
						$GLOBALS['log']->debug('Disabling ' .$path);
						if (file_exists($path))
						{
							mkdir_recursive('custom/modules/Home/'.DISABLED_PATH.'Dashlets/', true);
							rename( $path, $disabled_path);
						}
					}
					include('modules/Administration/RebuildDashlets.php');
				}
	}

	function enable_languages(){
		$languages = array();
		if(isset($this->installdefs['language'])){
			foreach($this->installdefs['language'] as $packs){
				$languages[$packs['language']] = $packs['language'];
				$packs['from'] = str_replace('<basepath>', $this->base_dir, $packs['from']);
				$GLOBALS['log']->debug("Installing Language Pack ..." . $packs['from']  .  " for " .$packs['to_module']);
				$path = 'custom/Extension/modules/' . $packs['to_module']. '/Ext/Language';
				if($packs['to_module'] == 'application'){
					$path ='custom/Extension/' . $packs['to_module']. '/Ext/Language';
				}

				if(!file_exists($path)){
					mkdir_recursive($path, true);
				}
				if (file_exists($path.'/'.DISABLED_PATH.'/'.$packs['language'].'.'. $this->id_name . '.php'))
				  rename($path.'/'.DISABLED_PATH.'/'.$packs['language'].'.'. $this->id_name . '.php',  $path.'/'.$packs['language'].'.'. $this->id_name . '.php');
			}
			$this->rebuild_languages($languages);
		}
	}

	function disable_languages(){
		$languages = array();
		if(isset($this->installdefs['language'])){
			foreach($this->installdefs['language'] as $packs){
				$languages[$packs['language']] = $packs['language'];
				$packs['from'] = str_replace('<basepath>', $this->base_dir, $packs['from']);
				$GLOBALS['log']->debug("Uninstalling Language Pack ..." . $packs['from']  .  " for " .$packs['to_module']);
				$path = 'custom/Extension/modules/' . $packs['to_module']. '/Ext/Language';
				if($packs['to_module'] == 'application'){
					$path ='custom/Extension/' . $packs['to_module']. '/Ext/Language';
				}
				mkdir_recursive($path . '/'.DISABLED_PATH, true);
				if (file_exists($path.'/'.$packs['language'].'.'. $this->id_name . '.php'))
				  rename($path.'/'.$packs['language'].'.'. $this->id_name . '.php', $path.'/'.DISABLED_PATH.'/'.$packs['language'].'.'. $this->id_name . '.php');

			}
			$this->rebuild_languages($languages);
		}
	}

	function enable_userpage(){
		if(isset($this->installdefs['user_page'])){
					foreach($this->installdefs['user_page'] as $userpage){
						$userpage['from'] = str_replace('<basepath>', $this->base_dir, $userpage['from']);
						$GLOBALS['log']->debug("Installing User Page Section ..." . $userpage['from'] );
						$path = 'custom/Extension/modules/Users/Ext/UserPage';
						if(file_exists($path . '/'.DISABLED_PATH.'/'. $this->id_name . '.php')){
							rename($path . '/'.DISABLED_PATH.'/'. $this->id_name . '.php',  $path . '/'. $this->id_name . '.php');
						}

					}
					$this->rebuild_userpage();
				}

	}
	function disable_userpage(){
			if(isset($this->installdefs['user_page'])){
					foreach($this->installdefs['user_page'] as $userpage){
						$userpage['from'] = str_replace('<basepath>', $this->base_dir, $userpage['from']);
						$GLOBALS['log']->debug("Uninstalling User Page Section ..." . $userpage['from'] );
						$path = 'custom/Extension/modules/Users/Ext/UserPage';
						if (file_exists( $path . '/'. $this->id_name . '.php')) {
							mkdir_recursive($path . '/'.DISABLED_PATH, true);
							rename( $path . '/'. $this->id_name . '.php', $path . '/'.DISABLED_PATH.'/'. $this->id_name . '.php');
						}
					}
					$this->rebuild_userpage();
				}
	}

	function enable_copy(){
		//copy files back onto file system. first perform md5 check to determine if anything has been modified
		//here we should just go through the files in the -restore directory and copy those back
		if(isset($GLOBALS['mi_overwrite_files']) && $GLOBALS['mi_overwrite_files']){
			if(!empty($this->installdefs['copy'])){
				foreach($this->installdefs['copy'] as $cp){
					$cp['to'] = clean_path(str_replace('<basepath>', $this->base_dir, $cp['to']));
					$backup_path = clean_path( remove_file_extension(urldecode(hashToFile($_REQUEST['install_file'])))."-restore/".$cp['to'] );

					//check if this file exists in the -restore directory
					if(file_exists($backup_path)){
						//since the file exists, then we want do an md5 of the install version and the file system version
						//if(is_file($backup_path) && md5_file($backup_path) == md5_file($cp['to'])){
							//since the files are the same then we can safely move back from the -restore
							//directory into the file system
							$GLOBALS['log']->debug("ENABLE COPY:: FROM: ".$cp['from']. " TO: ".$cp['to']);
							$this->copy_path($cp['from'], $cp['to']);
						/*}else{
							//since they are not equal then we need to prompt the user
						}*/
					}//fi
				}//rof
			}//fi
		}//fi
	}

	function disable_copy(){
		//when we disable we want to copy the -restore files back into the file system
		//but we should check the version in the module install against the version on the file system
		//if they match then we can copy the file back, but otherwise we should ask the user.

//		$GLOBALS['log']->debug('ModuleInstaller.php->disable_copy()');
		if(isset($GLOBALS['mi_overwrite_files']) && $GLOBALS['mi_overwrite_files']){
//		$GLOBALS['log']->debug('ModuleInstaller.php->disable_copy():mi_overwrite_files=true');
			if(!empty($this->installdefs['copy'])){
//				$GLOBALS['log']->debug('ModuleInstaller.php->disable_copy(): installdefs not empty');
				foreach($this->installdefs['copy'] as $cp){
					$cp['to'] = clean_path(str_replace('<basepath>', $this->base_dir, $cp['to']));
					$backup_path = clean_path( remove_file_extension(urldecode(hashToFile($_REQUEST['install_file'])))."-restore/".$cp['to'] ); // bug 16966 tyoung - replaced missing assignment to $backup_path
					//check if this file exists in the -restore directory
//					$GLOBALS['log']->debug("ModuleInstaller.php->disable_copy(): backup_path=".$backup_path);
					if(file_exists($backup_path)){
						//since the file exists, then we want do an md5 of the install version and the file system version
						$from = str_replace('<basepath>', $this->base_dir, $cp['from']);

						//if(is_file($from) && md5_file($from) == md5_file($cp['to'])){
							//since the files are the same then we can safely move back from the -restore
							//directory into the file system
							$GLOBALS['log']->debug("DISABLE COPY:: FROM: ".$backup_path. " TO: ".$cp['to']);
							$this->copy_path($backup_path, $cp['to']);
						/*}else{
							//since they are not equal then we need to prompt the user
						}*/
					}//fi
				}//rof
			}//fi
		}//fi
	}

	public function reset_opcodes()
    {
        /* Bug 39354 - added function_exists check. Not optimal fix, but safe nonetheless.
         * This is for the upgrade to 6.1 from pre 6.1, since the utils files haven't been updated to 6.1 when this is called,
         * but this file has been updated to 6.1
         */
        if(function_exists('sugar_clean_opcodes')){
            sugar_clean_opcodes();
        }
    }

}

    function UpdateSystemTabs($action, $installed_modules){
        require_once("modules/MySettings/TabController.php");
        $controller = new TabController();
        $isSystemTabsInDB = $controller->is_system_tabs_in_db();
        if ($isSystemTabsInDB && !empty($installed_modules))
        {
            global $moduleList;
            switch ($action)
            {
                case 'Restore' :
                    $currentTabs = $controller->get_system_tabs();
                    foreach ($installed_modules as $module)
                    {
                        if(in_array($module, $currentTabs)){
                            unset($currentTabs[$module]);
                        }
                    }
                    $controller->set_system_tabs($currentTabs);;
                    break;
                case 'Add' :
                    $currentTabs = $controller->get_system_tabs();
                    foreach ($installed_modules as $module)
                    {
                        if(!in_array($module, $currentTabs)){
                            $currentTabs[$module] = $module;
                        }
                    }
                    $controller->set_system_tabs($currentTabs);
                default:
                    break;
            }
        }

}


?>
