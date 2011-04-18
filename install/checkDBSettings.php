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





function checkDBSettings($silent=false) {
installLog("Begin DB Check Process *************");
    if(function_exists('mysqli_connect')){
        $_SESSION['mysql_type'] = 'mysqli';
    }
    if(function_exists('sqlsrv_connect')){
        $_SESSION['mssql_type'] = 'sqlsrv';
    }
    global $mod_strings;
    $errors = array();
    copyInputsIntoSession();
    
        if( trim($_SESSION['setup_db_database_name']) == '' ){
            $errors['ERR_DB_NAME'] = $mod_strings['ERR_DB_NAME'];
            installLog("ERROR::  {$errors['ERR_DB_NAME']}");
        }

        if($_SESSION['setup_db_type'] != 'oci8') {

            if( trim($_SESSION['setup_db_host_name']) == '' ){
                $errors['ERR_DB_HOSTNAME'] = $mod_strings['ERR_DB_HOSTNAME'];
                installLog("ERROR::  {$errors['ERR_DB_HOSTNAME']}");
            }
        }

        //check to see that password and retype are same, if needed
        if((isset($_SESSION['dbUSRData'])  && !empty($_SESSION['dbUSRData'])) &&
        ($_SESSION['dbUSRData']=='create' || $_SESSION['dbUSRData']=='provide'))
        {
            if( $_SESSION['setup_db_sugarsales_password'] != $_SESSION['setup_db_sugarsales_password_retype'] ){
                $errors['ERR_DBCONF_PASSWORD_MISMATCH'] = $mod_strings['ERR_DBCONF_PASSWORD_MISMATCH'];
                installLog("ERROR::  {$errors['ERR_DBCONF_PASSWORD_MISMATCH']}");
            }
        }

        // bail if the basic info isn't valid
        if( count($errors) > 0 ){
                installLog("Basic form info is INVALID, exit Process.");
            return printErrors($errors);
        }else{
            installLog("Basic form info is valid, continuing Process.");
        }

        // test the account that will talk to the db if we're not creating it
        if( $_SESSION['setup_db_sugarsales_user'] != '' && !$_SESSION['setup_db_create_sugarsales_user'] ){
        	if( $_SESSION['setup_db_type'] == 'mysql' ){
                installLog("testing with mysql");
                if(isset($_SESSION['mysql_type']) && $_SESSION['mysql_type'] == 'mysqli'){
                    installLog("MySQLI library detected");
                }

                if(isset($_SESSION['mysql_type'])){
                    $host_name = getHostPortFromString($_SESSION['setup_db_host_name']);
                    if(empty($host_name)){
                        $link = @mysqli_connect( $_SESSION['setup_db_host_name'], $_SESSION['setup_db_sugarsales_user'], $_SESSION['setup_db_sugarsales_password']);
                    }else{
                        $link = @mysqli_connect( $host_name[0], $_SESSION['setup_db_sugarsales_user'], $_SESSION['setup_db_sugarsales_password'], null, $host_name[1]);
                    }
                }else{
                $link = @mysql_connect( $_SESSION['setup_db_host_name'],
                                        $_SESSION['setup_db_sugarsales_user'],
                                        $_SESSION['setup_db_sugarsales_password'] );
                }

                if( !$link ){
                    installLog("Could not make Connection using  host: {$_SESSION['setup_db_host_name']}, usr: {$_SESSION['setup_db_sugarsales_user']}");
                    if(isset($_SESSION['mysql_type'])){
                        $errno = mysqli_connect_errno();
                        $error = mysqli_connect_error();
                    }else{
                        $errno = mysql_errno();
                        $error = mysql_error();
                    }

                    $errors['ERR_DB_LOGIN_FAILURE'] = $mod_strings['ERR_DB_LOGIN_FAILURE_MYSQL']." $errno: $error).";
                    installLog("ERROR::  {$errors['ERR_DB_LOGIN_FAILURE']}");
                }
                else{
                    installLog("Connection made using  host: {$_SESSION['setup_db_host_name']}, usr: {$_SESSION['setup_db_sugarsales_user']}");
                    if(isset($_SESSION['mysql_type'])){
                        mysqli_close($link );
                    }else{
                        mysql_close($link );
                    }
                }
            } elseif( $_SESSION['setup_db_type'] == 'mssql' ) {
                installLog("testing with mssql");
                $connect_host = "";
                $_SESSION['setup_db_host_instance'] = trim($_SESSION['setup_db_host_instance']);

                if (empty($_SESSION['setup_db_host_instance'])){
                    $connect_host = $_SESSION['setup_db_host_name'];
                }else{
                    $connect_host = $_SESSION['setup_db_host_name']. "\\" . $_SESSION['setup_db_host_instance'];
                }
                if(isset($_SESSION['mssql_type'])){
                	$connect_params = array(
						"UID"=>$_SESSION['setup_db_sugarsales_user'],
                        "PWD"=>$_SESSION['setup_db_sugarsales_password'],
                        "MultipleActiveResultSets"=>false,
                        );
                	$link = sqlsrv_connect( $connect_host  , $connect_params);
				}
                else {
                $link = @mssql_connect( $connect_host  ,
                                        $_SESSION['setup_db_sugarsales_user'],
                                        $_SESSION['setup_db_sugarsales_password'] );
                }
                if( !$link ) {
                    $errors['ERR_DB_LOGIN_FAILURE'] = $mod_strings['ERR_DB_LOGIN_FAILURE_MSSQL'];
                    installLog("ERROR::  {$errors['ERR_DB_LOGIN_FAILURE']}");
                } else {
                    installLog("Connection made using  host: {$_SESSION['setup_db_host_name']}, usr: {$_SESSION['setup_db_sugarsales_user']}");
                    if(isset($_SESSION['mssql_type'])){
                        sqlsrv_close($link );
                    }
                    else {
                        mssql_close($link );
                    }
                }
                // Bug 29855 - Check to see if given db name is valid
                if (preg_match("/[\"\'\*\/\\?\:\\<\>\-]+/i", $_SESSION['setup_db_database_name']) ) {
                    $errors['ERR_DB_MSSQL_DB_NAME'] = $mod_strings['ERR_DB_MSSQL_DB_NAME_INVALID'];
                    installLog("ERROR::  {$errors['ERR_DB_MSSQL_DB_NAME']}");
                }

            } elseif( $_SESSION['setup_db_type'] == 'oci8' ){
            }
        }

        // privileged account tests
        if( $_SESSION['setup_db_admin_user_name'] == '' ){
            $errors['ERR_DB_PRIV_USER'] = $mod_strings['ERR_DB_PRIV_USER'];
            installLog("ERROR:: {$errors['ERR_DB_PRIV_USER']}");
        }
        else {
            installLog("Testing priviliged account...");
            if( $_SESSION['setup_db_type'] == 'mysql' ){
                if(isset($_SESSION['mysql_type'])){
                    $host_name = getHostPortFromString($_SESSION['setup_db_host_name']);
                    if(empty($host_name)){
                        $link = @mysqli_connect( $_SESSION['setup_db_host_name'], $_SESSION['setup_db_admin_user_name'], $_SESSION['setup_db_admin_password']);
                    }else{
                        $link = @mysqli_connect( $host_name[0], $_SESSION['setup_db_admin_user_name'], $_SESSION['setup_db_admin_password'], null, $host_name[1]);                    
                    } 
                }else{
                $link = @mysql_connect( $_SESSION['setup_db_host_name'],
                                        $_SESSION['setup_db_admin_user_name'],
                                        $_SESSION['setup_db_admin_password'] );

                }
                if( $link ){
                    installLog("Connection made for Privileged admin account using  host: {$_SESSION['setup_db_host_name']}, usr: {$_SESSION['setup_db_admin_user_name']}");
                    // database admin credentials are valid--can continue check on stuff
                    if(isset($_SESSION['mysql_type'])){
                        $db_selected = @mysqli_select_db($link, $_SESSION['setup_db_database_name']);
                    }else{
                        $db_selected = @mysql_select_db($_SESSION['setup_db_database_name'], $link);
                    }
                    if($silent==false && $db_selected && $_SESSION['setup_db_create_database'] && (!isset($_SESSION['setup_db_drop_tables']) || !$_SESSION['setup_db_drop_tables'])){
                        $errStr = $mod_strings['ERR_DB_EXISTS_PROCEED'];
                        $errors['ERR_DB_EXISTS_PROCEED'] = $errStr;
                        installLog("ERROR:: {$errors['ERR_DB_EXISTS_PROCEED']}");
                    }
                    else if( !$db_selected && !$_SESSION['setup_db_create_database'] ){
                        $errors['ERR_DB_EXISTS_NOT'] = $mod_strings['ERR_DB_EXISTS_NOT'];
                        installLog("ERROR:: {$errors['ERR_DB_EXISTS_NOT']}");
                    }

                    // test for upgrade and inform user about the upgrade wizard
                     if( $db_selected ){
                        installLog("DB Selected, will reuse {$_SESSION['setup_db_database_name']}");
                        if(isset($_SESSION['mysql_type'])){
                            $config_query   = "SHOW TABLES LIKE 'config'";
                            $config_result  = mysqli_query($link , $config_query);
                            $config_table_exists    = (mysqli_num_rows( $config_result ) == 1);
                            mysqli_free_result( $config_result );
                            include('sugar_version.php');
                            if( !$_SESSION['setup_db_drop_tables'] && $config_table_exists ){
                                $query = "SELECT COUNT(*) FROM config WHERE category='info' AND name='sugar_version' AND VALUE LIKE '$sugar_db_version'";
                                $result = mysqli_query( $link , $query );
                                $row = mysqli_fetch_row( $result );
                                if($row[0] != 1  && $silent==false) {
                                    $errors['ERR_DB_EXISTS_WITH_CONFIG'] = $mod_strings['ERR_DB_EXISTS_WITH_CONFIG'];
                                    installLog("ERROR:: {$errors['ERR_DB_EXISTS_WITH_CONFIG']}");
                                }
                                mysqli_free_result($result);
                            }
                        }else{
                            $config_query   = "SHOW TABLES LIKE 'config'";
                            $config_result  = mysql_query( $config_query, $link );
                            $config_table_exists    = (mysql_num_rows( $config_result ) == 1);
                            mysql_free_result( $config_result );
                            include('sugar_version.php');
                            if( !$_SESSION['setup_db_drop_tables'] && $config_table_exists ){
                                $query = "SELECT COUNT(*) FROM config WHERE category='info' AND name='sugar_version' AND VALUE LIKE '$sugar_db_version'";
                                $result = mysql_query( $query, $link );
                                $row = mysql_fetch_row( $result );
                                if($row[0] != 1  && $silent==false) {
                                    $errors['ERR_DB_EXISTS_WITH_CONFIG'] = $mod_strings['ERR_DB_EXISTS_WITH_CONFIG'];
                                    installLog("ERROR:: {$errors['ERR_DB_EXISTS_WITH_CONFIG']}");
                                }
                                mysql_free_result($result);
                            }
                        }

                    }else{
                      installLog("DB not selected, will create {$_SESSION['setup_db_database_name']}");
                     }


                    // check for existing SugarCRM database user if create flag is set,
                    //user name has been given, and database has been selected (reusing db, not creating new one)
                    if($_SESSION['setup_db_create_sugarsales_user'] && $_SESSION['setup_db_sugarsales_user'] != '' && $db_selected){
                        if(isset($_SESSION['mysql_type'])){
                            $mysqli_db_selected = mysqli_select_db($link, 'mysql');
                            $user = $_SESSION['setup_db_sugarsales_user'];
                            $query = "select count(*) from user where User ='$user'";
                            $result = mysqli_query($link, $query);
                            if(!$result){
                                $errno = mysqli_connect_errno();
                                $error = mysqli_connect_error();
                                $errors['ERR_DB_ADMIN'] = $mod_strings['ERR_DB_ADMIN'].$errno. ": {$error}).";
                                installLog("ERROR:: {$errors['ERR_DB_ADMIN']}");
                            }else{
                                $row = mysqli_fetch_row($result);
                                if($row[0] == 1){
                                    $errors['ERR_DB_USER_EXISTS'] = $mod_strings['ERR_DB_USER_EXISTS'];
                                    installLog("ERROR:: {$errors['ERR_DB_USER_EXISTS']}");
                                }
                                mysqli_free_result($result);
                            }
                        }else{
                            $mysql_db_selected = mysql_select_db('mysql', $link);
                            $user = $_SESSION['setup_db_sugarsales_user'];
                            $query = "select count(*) from user where User ='$user'";
                            $result = mysql_query($query, $link);
                            if(!$result){
                                $errno = mysql_errno();
                                $error = mysql_error();
                                $errors['ERR_DB_ADMIN'] = $mod_strings['ERR_DB_ADMIN'].$errno. ": {$error}).";
                                installLog("ERROR:: {$errors['ERR_DB_ADMIN']}");
                            }else{
                                $row = mysql_fetch_row($result);
                                if($row[0] == 1){
                                    $errors['ERR_DB_USER_EXISTS'] = $mod_strings['ERR_DB_USER_EXISTS'];
                                    installLog("ERROR:: {$errors['ERR_DB_USER_EXISTS']}");
                                    //do not throw errors, reuse existing user
                                    //$_SESSION['setup_db_create_sugarsales_user'] = 0;
                                }
                                mysql_free_result($result);
                            }
                        }

                    }

                    // check mysql minimum version requirement
                    $db_version = getMysqlVersion($link);
                    if(version_compare($db_version, '4.1.2') < 0) {
                        $errors['ERR_DB_MYSQL_VERSION1'] = $mod_strings['ERR_DB_MYSQL_VERSION1'].$db_version.$mod_strings['ERR_DB_MYSQL_VERSION2'];
                        installLog("ERROR:: {$errors['ERR_DB_MYSQL_VERSION1']}");
                    }else{
                     installLog("Passed DB Version check, version is {$db_version}");
                    }

                    if(isset($_SESSION['mysql_type'])){
                        mysqli_close($link);
                    }else{
                        mysql_close($link);
                    }
                }
                else { // dblink was bad
                    if(isset($_SESSION['mysql_type'])){
                        $errno = mysqli_connect_errno();
                        $error = mysqli_connect_error();
                    }else{
                        $errno = mysql_errno();
                        $error = mysql_error();
                    }
                    $errors['ERR_DB_ADMIN'] = $mod_strings['ERR_DB_ADMIN'].$errno. ": {$error}).";
                    installLog("ERROR:: {$errors['ERR_DB_ADMIN']}");
                }

            }else if( $_SESSION['setup_db_type'] == 'mssql' ){
                installLog("Testing priviliged account...");
                $connect_host = "";
                $_SESSION['setup_db_host_instance'] = trim($_SESSION['setup_db_host_instance']);

                if (empty($_SESSION['setup_db_host_instance'])){
                    $connect_host = $_SESSION['setup_db_host_name'];
                }else{
                    $connect_host = $_SESSION['setup_db_host_name']. "\\" . $_SESSION['setup_db_host_instance'];
                }
                if(isset($_SESSION['mssql_type'])){
                    $connect_params = array(
						"UID"=>$_SESSION['setup_db_sugarsales_user'],
                        "PWD"=>$_SESSION['setup_db_sugarsales_password'],
                        "MultipleActiveResultSets"=>false,
                        );
                	$link = sqlsrv_connect( $connect_host  , $connect_params);
                }
                else {
                    $link = @mssql_connect( $connect_host  ,
                                        $_SESSION['setup_db_admin_user_name'],
                                        $_SESSION['setup_db_admin_password'] );
                }
                                 if( $link ){
                    installLog("Connection made for Privileged admin account using  host: {$_SESSION['setup_db_host_name']}, usr: {$_SESSION['setup_db_admin_user_name']}");
                    // database admin credentials are valid--can continue check on stuff
                    $tbl_exists_qry = "SELECT name FROM master..sysdatabases WHERE name = N'{$_SESSION['setup_db_database_name']}'";
                    if(isset($_SESSION['mssql_type']))
                        $res = sqlsrv_query($link,$tbl_exists_qry);
                    else
                        $res = mssql_query($tbl_exists_qry);
                    $db_exists    = false;
                    if ( isset($_SESSION['mssql_type']) && sqlsrv_fetch( $res) == 1){$db_exists = true;
                    installLog("DB Exists and selected, will reuse {$_SESSION['setup_db_database_name']}");
                    }elseif ( !isset($_SESSION['mssql_type']) && mssql_num_rows( $res) == 1){$db_exists = true;
                    installLog("DB Exists and selected, will reuse {$_SESSION['setup_db_database_name']}");
                    }else{
                        installLog("No DB Selected, will create {$_SESSION['setup_db_database_name']}");
                    }
                    if($silent==false &&  $db_exists && $_SESSION['setup_db_create_database'] && (!isset($_SESSION['setup_db_drop_tables']) || !$_SESSION['setup_db_drop_tables'])){
                        $errStr = $mod_strings['ERR_DB_EXISTS_PROCEED'];
                        $errors['ERR_DB_EXISTS_PROCEED'] = $errStr;
                        installLog("ERROR:: {$errors['ERR_DB_EXISTS_PROCEED']}");
                    }
                    else if( !$db_exists && !$_SESSION['setup_db_create_database'] ){
                        $errors['ERR_DB_EXISTS_NOT'] = $mod_strings['ERR_DB_EXISTS_NOT'];
                        installLog("ERROR:: {$errors['ERR_DB_EXISTS_NOT']}");
                    }

                    // check for existing SugarCRM database user if create flag is set,
                    //user name has been given, and database has been selected (reusing db, not creating new one)
                    if($_SESSION['setup_db_create_sugarsales_user'] && $_SESSION['setup_db_sugarsales_user'] != ''){
                        if(isset($_SESSION['mssql_type'])) {
                            $mssql_db_selected = (bool) sqlsrv_query($link,'USE master');
                            $user = $_SESSION['setup_db_sugarsales_user'];
                            $query = "select count(*) from sys.sql_logins where name ='$user'";
                            $result = sqlsrv_query($link, $query);
                            if(!$result){
                                $errors['ERR_DB_ADMIN'] = $mod_strings['ERR_DB_ADMIN'];
                                installLog("ERROR:: {$errors['ERR_DB_ADMIN']}");
                            }else{
                                $row = sqlsrv_fetch_array($result);
                                if($row[0] == 1){
                                    $errors['ERR_DB_USER_EXISTS'] = $mod_strings['ERR_DB_USER_EXISTS'];
                                    installLog("ERROR:: {$errors['ERR_DB_USER_EXISTS']}");
                                }
                                sqlsrv_free_stmt($result);
                            }
                        }
                        else {
                            $mssql_db_selected = mssql_select_db('master', $link);
                            $user = $_SESSION['setup_db_sugarsales_user'];
                            $query = "select count(*) from sys.sql_logins where name ='$user'";
                            $result = mssql_query($query, $link);
                            if(!$result){
                                $errors['ERR_DB_ADMIN'] = $mod_strings['ERR_DB_ADMIN'];
                                installLog("ERROR:: {$errors['ERR_DB_ADMIN']}");
                            }else{
                                $row = mssql_fetch_row($result);
                                if($row[0] == 1){
                                    $errors['ERR_DB_USER_EXISTS'] = $mod_strings['ERR_DB_USER_EXISTS'];
                                    installLog("ERROR:: {$errors['ERR_DB_USER_EXISTS']}");
                                }
                                mssql_free_result($result);
                            }
                        }
                    }

                    if(isset($_SESSION['mssql_type']))
                        sqlsrv_close($link);
                    else
                        mssql_close($link);

                }
                else { // dblink was bad
                    $errors['ERR_DB_ADMIN_MSSQL'] = $mod_strings['ERR_DB_ADMIN_MSSQL'].$connect_host;
                    installLog("ERROR:: {$errors['ERR_DB_ADMIN_MSSQL']}");
                }

            }else if( $_SESSION['setup_db_type'] == 'oci8' ){
            }
        } // end of privileged user tests
        if($silent){
            return $errors;
        }else{
            printErrors($errors);
        }
        installLog("End DB Check Process *************");
}

function printErrors($errors ){

global $mod_strings;
    if(count($errors) == 0){
        echo 'dbCheckPassed';
        installLog("SUCCESS:: no errors detected!");
    }else if((count($errors) == 1 && isset($errors["ERR_DB_EXISTS_PROCEED"]))  ||
    (count($errors) == 2 && isset($errors["ERR_DB_EXISTS_PROCEED"]) && isset($errors["ERR_DB_EXISTS_WITH_CONFIG"])) ){
        ///throw alert asking to overwwrite db
        echo 'preexeest';
        installLog("WARNING:: no errors detected, but DB tables will be dropped!, issuing warning to user");
    }else{
        installLog("FATAL:: errors have been detected!  User will not be allowed to continue.  Errors are as follow:");
         //print out errors
        $validationErr  = "<p><b>{$mod_strings['ERR_DBCONF_VALIDATION']}</b></p>";
        $validationErr .= '<ul>';

        foreach($errors as $key =>$erMsg){
            if($key != "ERR_DB_EXISTS_PROCEED" && $key != "ERR_DB_EXISTS_WITH_CONFIG"){
                if($_SESSION['dbUSRData'] == 'same' && $key == 'ERR_DB_ADMIN'){
                    installLog(".. {$erMsg}");
                    break;
                }
                $validationErr .= '<li class="error">' . $erMsg . '</li>';
                installLog(".. {$erMsg}");
            }
        }
        $validationErr .= '</ul>';
        $validationErr .= '</div>';

         echo $validationErr;
    }

}


function copyInputsIntoSession(){
            if(isset($_REQUEST['setup_db_type'])){$_SESSION['setup_db_type']                        = $_REQUEST['setup_db_type'];}
            if(isset($_REQUEST['setup_db_admin_user_name'])){$_SESSION['setup_db_admin_user_name']  = $_REQUEST['setup_db_admin_user_name'];}
            if(isset($_REQUEST['setup_db_admin_password'])){$_SESSION['setup_db_admin_password']    = $_REQUEST['setup_db_admin_password'];}
            if(isset($_REQUEST['setup_db_database_name'])){$_SESSION['setup_db_database_name']      = $_REQUEST['setup_db_database_name'];}
            if(isset($_REQUEST['setup_db_host_name'])){$_SESSION['setup_db_host_name']              = $_REQUEST['setup_db_host_name'];}

            if(isset($_REQUEST['setup_db_host_instance'])){
                $_SESSION['setup_db_host_instance']             = $_REQUEST['setup_db_host_instance'];
            }


            // on a silent install, copy values from $_SESSION into $_REQUEST
            if (isset($_REQUEST['goto']) && $_REQUEST['goto'] == 'SilentInstall') {
                if (isset($_SESSION['dbUSRData']) && !empty($_SESSION['dbUSRData']))
                    $_REQUEST['dbUSRData'] = $_SESSION['dbUSRData'];
                else $_REQUEST['dbUSRData'] = 'same';

                if (isset($_SESSION['setup_db_sugarsales_user']) && !empty($_SESSION['setup_db_sugarsales_user']))
                    $_REQUEST['setup_db_sugarsales_user'] = $_SESSION['setup_db_sugarsales_user'];
                else $_REQUEST['dbUSRData'] = 'same';

                $_REQUEST['setup_db_sugarsales_password'] = $_SESSION['setup_db_sugarsales_password'];
                $_REQUEST['setup_db_sugarsales_password_retype'] = $_SESSION['setup_db_sugarsales_password'];
            }

            //make sure we are creating or using provided user for app db connections
            $_SESSION['setup_db_create_sugarsales_user']  = true;//get_boolean_from_request('setup_db_create_sugarsales_user');
            if( $_SESSION['setup_db_type'] == 'oci8' ){
             //if we are in Oracle Mode, make the admin user/password same as connecting user/password
              $_SESSION['setup_db_sugarsales_user']             = $_SESSION['setup_db_admin_user_name'];
              $_SESSION['setup_db_sugarsales_password']         = $_SESSION['setup_db_admin_password'];
              $_SESSION['setup_db_sugarsales_password_retype']  = $_SESSION['setup_db_sugarsales_password'];
              $_SESSION['setup_db_create_sugarsales_user']      = false;
              $_SESSION['setup_db_create_database']             = false;

            }//elseif(isset($_SESSION['install_type'])  && !empty($_SESSION['install_type'])  && strtolower($_SESSION['install_type'])=='typical'){
            else{


                //retrieve the value from dropdown in order to know what settings the user
                //wants to use for the sugar db user.

                //use provided db admin by default
                $_SESSION['dbUSRData'] = 'same';

                if(isset($_REQUEST['dbUSRData'])  && !empty($_REQUEST['dbUSRData'])){
                    $_SESSION['dbUSRData'] = $_REQUEST['dbUSRData'];
                }


                  if($_SESSION['dbUSRData'] == 'auto'){
                    //create user automatically
                      $_SESSION['setup_db_create_sugarsales_user']          = true;
                      $_SESSION['setup_db_sugarsales_user']                 = "sugar".create_db_user_creds(5);
                      $_SESSION['setup_db_sugarsales_password']             = create_db_user_creds(10);
                      $_SESSION['setup_db_sugarsales_password_retype']      = $_SESSION['setup_db_sugarsales_password'];
                  }elseif($_SESSION['dbUSRData'] == 'provide'){
                    //use provided user info
                      $_SESSION['setup_db_create_sugarsales_user']          = false;
                      $_SESSION['setup_db_sugarsales_user']                 = $_REQUEST['setup_db_sugarsales_user'];
                      $_SESSION['setup_db_sugarsales_password']             = $_REQUEST['setup_db_sugarsales_password'];
                      $_SESSION['setup_db_sugarsales_password_retype']      = $_REQUEST['setup_db_sugarsales_password_retype'];
                  }elseif($_SESSION['dbUSRData'] == 'create'){
                    // create user with provided info
                      $_SESSION['setup_db_create_sugarsales_user']        = true;
                      $_SESSION['setup_db_sugarsales_user']               = $_REQUEST['setup_db_sugarsales_user'];
                      $_SESSION['setup_db_sugarsales_password']           = $_REQUEST['setup_db_sugarsales_password'];
                      $_SESSION['setup_db_sugarsales_password_retype']    = $_REQUEST['setup_db_sugarsales_password_retype'];
                  }else{
                   //Use the same login as provided admin user
                      $_SESSION['setup_db_create_sugarsales_user']      = false;
                      $_SESSION['setup_db_sugarsales_user']             = $_SESSION['setup_db_admin_user_name'];
                      $_SESSION['setup_db_sugarsales_password']         = $_SESSION['setup_db_admin_password'];
                      $_SESSION['setup_db_sugarsales_retype']           = $_SESSION['setup_db_admin_password'];
                  }
            }

            if(!isset($_SESSION['demoData']) || empty($_SESSION['demoData'])){
                $_SESSION['demoData'] = 'no';
            }
            if(isset($_REQUEST['demoData'])){$_SESSION['demoData'] = $_REQUEST['demoData'] ;}
            if (isset($_REQUEST['goto']) && $_REQUEST['goto'] == 'SilentInstall' && isset($SESSION['setup_db_drop_tables'])) {
                //set up for Oracle Silent Installer
                $_REQUEST['setup_db_drop_tables'] = $_SESSION['setup_db_drop_tables'] ;
            }
            if (isset($_REQUEST['setup_db_drop_tables'])
                || ((isset($_REQUEST['goto']) && $_REQUEST['goto'] == 'SilentInstall' && isset($SESSION['setup_db_drop_tables'])))
            ){
                $_SESSION['setup_db_drop_tables']       = true;
                $_SESSION['setup_db_create_database']   = false;

            }else{
                $_SESSION['setup_db_drop_tables']       = false;
                $_SESSION['setup_db_create_database']   = true;
            }
}

////    END PAGEOUTPUT
///////////////////////////////////////////////////////////////////////////////
?>
