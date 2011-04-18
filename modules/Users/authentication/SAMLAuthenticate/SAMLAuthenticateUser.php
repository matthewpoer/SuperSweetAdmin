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
 * This file is where the user authentication occurs. No redirection should happen in this file.
 *
 */
require_once('modules/Users/authentication/SugarAuthenticate/SugarAuthenticateUser.php');


class SAMLAuthenticateUser extends SugarAuthenticateUser{

	/**
	 * Does the actual authentication of the user and returns an id that will be used
	 * to load the current user (loadUserOnSession)
	 *
	 * @param STRING $name
	 * @param STRING $password
	 * @return STRING id - used for loading the user
	 *
	 * Contributions by Erik Mitchell erikm@logicpd.com
	 */
	function authenticateUser($name, $password) {
		if(empty($_POST['SAMLResponse']))return parent::authenticateUser($name, $password);
		
		require 'modules/Users/authentication/SAMLAuthenticate/settings.php';
		require 'modules/Users/authentication/SAMLAuthenticate/lib/onelogin/saml.php';
		$samlresponse = new SamlResponse($_POST['SAMLResponse']);
 		$samlresponse->user_settings = get_user_settings();
  		if ($samlresponse->is_valid()){
  			$dbresult = $GLOBALS['db']->query("SELECT id, status FROM users WHERE user_name='" . $samlresponse->get_nameid() . "' AND deleted = 0");

			//user already exists use this one
			if($row = $GLOBALS['db']->fetchByAssoc($dbresult)){
				if($row['status'] != 'Inactive')
					return $row['id'];
				else
					return '';
			}else{
				return $this->createUser($samlresponse->get_nameid());
			}
  		}	
  		return '';
	}
	
	
	
	
		
	

	/**
	 * Creates a user with the given User Name and returns the id of that new user
	 * populates the user with what was set in ldapUserInfo
	 *
	 * @param STRING $name
	 * @return STRING $id
	 */
	function createUser($name){

			$user = new User();
			$user->user_name = $name;
			$user->email1 = $name;
			$user->last_name = $name;
			$user->employee_status = 'Active';
			$user->status = 'Active';
			$user->is_admin = 0;
			$user->external_auth_only = 1;
			$user->system_generated_password = 0;
			$user->save();
			return $user->id;

	}
	

	







}

?>
