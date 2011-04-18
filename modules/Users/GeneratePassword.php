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

 * Description:  TODO: To be written.
 * Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
 * All Rights Reserved.
 * Contributor(s): ______________________________________..
 ********************************************************************************/

    require_once('include/entryPoint.php');

    require_once('modules/Users/language/en_us.lang.php');
    global $app_strings;
    global $sugar_config;
    global $new_pwd;

  	$mod_strings=return_module_language('','Users');
  	$res=$GLOBALS['sugar_config']['passwordsetting'];
	$regexmail = "/^\w+(['\.\-\+]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+\$/";

///////////////////////////////////////////////////
///////  Retrieve user

    $usr= new user();
    if(isset( $_POST['username']) && isset($_POST['user_email'] )){
    	if ($_POST['username'] != '' && $_POST['user_email'] != ''){
	        $usr_id=$usr->retrieve_user_id($_POST['username']);
	        $usr->retrieve($usr_id);
	        if ($usr->email1 !=  $_POST['user_email']){
	            echo $mod_strings['ERR_PASSWORD_USERNAME_MISSMATCH'];
	            return;
    	    }
    	    if ($usr->portal_only || $usr->is_group){
	            echo $mod_strings['LBL_PROVIDE_USERNAME_AND_EMAIL'];
	            return;
    	    }
    	}
    	else
    	{
    		echo  $mod_strings['LBL_PROVIDE_USERNAME_AND_EMAIL'];
    		return;
    	}
    }
    else{
        if (isset($_POST['userId']) && $_POST['userId'] != ''){
            $usr->retrieve($_POST['userId']);
        }
        else{
        	if(isset( $_POST['sugar_user_name']) && isset($_POST['sugar_user_name'] )){
				$usr_id=$usr->retrieve_user_id($_POST['sugar_user_name']);
	        	$usr->retrieve($usr_id);
			}
    		else{
    			echo  $mod_strings['ERR_USER_INFO_NOT_FOUND'];
            	return;
    		}
    	}
    }

///////
///////////////////////////////////////////////////

///////////////////////////////////////////////////
///////  Check email address

	if (!preg_match($regexmail, $usr->emailAddress->getPrimaryAddress($usr))){
		echo $mod_strings['ERR_EMAIL_INCORRECT'];
		return;
	}

///////
///////////////////////////////////////////////////


	// if i need to generate a password (not a link)
    if (!isset($_POST['link'])){
	    $charBKT='';
	    //chars to select from
	    $LOWERCASE = "abcdefghijklmnpqrstuvwxyz";
	    $NUMBER = "0123456789";
	    $UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	    $SPECIAL = '~!@#$%^&*()_+=-{}|'; 
	    $condition = 0;
	    $charBKT.=$UPPERCASE.$LOWERCASE.$NUMBER;
	    $password="";

	    	$lenght='6';
	    // Create random characters for the ones that doesnt have requirements
	    for ($i=0;$i<$lenght-$condition;$i++)  // loop and create password
	       $password = $password . substr ($charBKT, rand() % strlen($charBKT), 1);

    }

///////////////////////////////////////////////////
///////  Create URL

// if i need to generate a link
if (isset($_POST['link']) && $_POST['link'] == '1'){
	global $timedate;
	$guid=create_guid();
	$url=$GLOBALS['sugar_config']['site_url']."/index.php?entryPoint=Changenewpassword&guid=$guid";
	$time_now=TimeDate::getInstance()->nowDb();
	//$q2="UPDATE `users_password_link` SET `deleted` = '1' WHERE `username` = '".$_POST['username']."'";
	//$usr->db->query($q2);
	$q = "INSERT INTO users_password_link (id, username, date_generated) VALUES('".$guid."','".$_POST['username']."',' ".$time_now."' ) ";
	$usr->db->query($q);
}
///////
///////////////////////////////////////////////////

///////  Email creation
	global $sugar_config, $current_user;
    if (isset($_POST['link']) && $_POST['link'] == '1')
    	$emailTemp_id = $res['lostpasswordtmpl'];
    else
    	$emailTemp_id = $res['generatepasswordtmpl'];

    $emailTemp = new EmailTemplate();
    $emailTemp->disable_row_level_security = true;
    if ($emailTemp->retrieve($emailTemp_id) == ''){
        echo $mod_strings['LBL_EMAIL_TEMPLATE_MISSING'];
        $new_pwd='4';
        return;}

    //replace instance variables in email templates
    $htmlBody = $emailTemp->body_html;
    $body = $emailTemp->body;
    if (isset($_POST['link']) && $_POST['link'] == '1'){
    	$htmlBody = str_replace('$contact_user_link_guid', $url, $htmlBody);
    	$body = str_replace('$contact_user_link_guid', $url, $body);
    }
    else{
    	$htmlBody = str_replace('$contact_user_user_hash', $password, $htmlBody);
    	$body = str_replace('$contact_user_user_hash', $password, $body);
    }
    // Bug 36833 - Add replacing of special value $instance_url
    $htmlBody = str_replace('$config_site_url',$sugar_config['site_url'], $htmlBody);
    $body = str_replace('$config_site_url',$sugar_config['site_url'], $body);
    
    $htmlBody = str_replace('$contact_user_user_name', $usr->user_name, $htmlBody);
    $htmlBody = str_replace('$contact_user_pwd_last_changed', TimeDate::getInstance()->nowDb(), $htmlBody);
    $body = str_replace('$contact_user_user_name', $usr->user_name, $body);
    $body = str_replace('$contact_user_pwd_last_changed', TimeDate::getInstance()->nowDb(), $body);
    $emailTemp->body_html = $htmlBody;
    $emailTemp->body = $body;
    require_once('include/SugarPHPMailer.php');

    $itemail=$usr->emailAddress->getPrimaryAddress($usr);
    //retrieve IT Admin Email
    //_ppd( $emailTemp->body_html);
    //retrieve email defaults
    $emailObj = new Email();
    $defaults = $emailObj->getSystemDefaultEmail();
    $mail = new SugarPHPMailer();
    $mail->setMailerForSystem();
    //$mail->IsHTML(true);
    $mail->From = $defaults['email'];
    $mail->FromName = $defaults['name'];
    $mail->ClearAllRecipients();
    $mail->ClearReplyTos();
    $mail->Subject=from_html($emailTemp->subject);
    if($emailTemp->text_only != 1){
        $mail->IsHTML(true);
        $mail->Body=from_html($emailTemp->body_html);
        $mail->AltBody=from_html($emailTemp->body);
    }
    else {
        $mail->Body_html=from_html($emailTemp->body_html);
        $mail->Body=from_html($emailTemp->body);
    }
    if($mail->Body == '' && $current_user->is_admin){
    	echo $app_strings['LBL_EMAIL_TEMPLATE_EDIT_PLAIN_TEXT'];
        $new_pwd='4';
    	return;}
    if($mail->Mailer == 'smtp' && $mail->Host ==''&& $current_user->is_admin){
    	echo $mod_strings['ERR_SERVER_SMTP_EMPTY'];
        $new_pwd='4';
    	return;}

    $mail->prepForOutbound();
    $hasRecipients = false;

    if (!empty($itemail)){
        if($hasRecipients){
            $mail->AddBCC($itemail);
        }else{
            $mail->AddAddress($itemail);
        }
        $hasRecipients = true;
    }
    $success = false;
    if($hasRecipients){
    	$success = @$mail->Send();
    }

    //now create email
    if($success){

        $emailObj->team_id = 1;
        $emailObj->to_addrs= '';
        $emailObj->type= 'archived';
        $emailObj->deleted = '0';
        $emailObj->name = $mail->Subject ;
        $emailObj->description = $mail->Body;
        $emailObj->description_html =null;
        $emailObj->from_addr = $mail->From;
        $emailObj->parent_type = 'User';
        $emailObj->date_sent =TimeDate::getInstance()->nowDb();
        $emailObj->modified_user_id = '1';
        $emailObj->created_by = '1';
        $emailObj->status='sent';
        $retId = $emailObj->save();
        echo '1';
        if (!isset($_POST['link'])){
	        $user_hash = strtolower(md5($password));
	        $usr->setPreference('loginexpiration','0');
	        $usr->setPreference('lockout','');
		$usr->setPreference('loginfailed','0');
		$usr->savePreferencesToDB();
	        //set new password
	        $now=TimeDate::getInstance()->nowDb();
	        $query = "UPDATE $usr->table_name SET user_hash='$user_hash', system_generated_password='1', pwd_last_changed='$now' where id='$usr->id'";
	        $usr->db->query($query, true, "Error setting new password for $usr->user_name: ");
        	echo $password;
        }
    }else{
    	$new_pwd='4';
    	if ($current_user->is_admin){
    		$email_errors=$mod_strings['ERR_EMAIL_NOT_SENT_ADMIN'];
    		if ($mail->Mailer == 'smtp')
    			$email_errors.="\n-".$mod_strings['ERR_SMTP_URL_SMTP_PORT'];
    		if ($mail->SMTPAuth)
    		 	$email_errors.="\n-".$mod_strings['ERR_SMTP_USERNAME_SMTP_PASSWORD'];
    		$email_errors.="\n-".$mod_strings['ERR_RECIPIENT_EMAIL'];
    		$email_errors.="\n-".$mod_strings['ERR_SERVER_STATUS'];
    		echo $email_errors;
    	}
    	else
    		echo $mod_strings['LBL_EMAIL_NOT_SENT'];
    }
    return;

?>
