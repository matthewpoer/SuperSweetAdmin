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
require_once('include/phpmailer/class.phpmailer.php');
require_once('include/OutboundEmail/OutboundEmail.php');


class SugarPHPMailer extends PHPMailer {
	var $oe; // OutboundEmail
	var $protocol = "tcp://";
	var $preppedForOutbound = false;
	var $disclosureEnabled;
	var $disclosureText;
	var $isHostEmpty = false;
	var $opensslOpened = true;

	/**
	 * Sole constructor
	 */
	function SugarPHPMailer() {
		global $locale;
		global $current_user;
		global $sugar_config;

		$admin = new Administration();
		$admin->retrieveSettings();

		if(isset($admin->settings['disclosure_enable']) && !empty($admin->settings['disclosure_enable'])) {
			$this->disclosureEnabled = true;
			$this->disclosureText = $admin->settings['disclosure_text'];
		}

		$this->oe = new OutboundEmail();
		$this->oe->getUserMailerSettings($current_user);

		$this->SetLanguage('en', 'include/phpmailer/language/');
		$this->PluginDir	= 'include/phpmailer/';
		$this->Mailer	 	= 'smtp';
        // cn: i18n
        $this->CharSet		= $locale->getPrecedentPreference('default_email_charset');
		$this->Encoding		= 'quoted-printable';
        $this->IsHTML(false);  // default to plain-text email
        $this->Hostname = $sugar_config['host_name'];
        $this->WordWrap		= 996;
		// cn: gmail fix
		$this->protocol = ($this->oe->mail_smtpssl == 1) ? "ssl://" : $this->protocol;

	}


	/**
	 * Prefills outbound details
	 */
	function setMailer() {
		global $current_user;

		require_once("include/OutboundEmail/OutboundEmail.php");
		$oe = new OutboundEmail();
		$oe = $oe->getUserMailerSettings($current_user, $mailer_id, $ieId);

		// ssl or tcp - keeping outside isSMTP b/c a default may inadvertantly set ssl://
		$this->protocol = ($oe->mail_smtpssl) ? "ssl://" : "tcp://";
		
		if($oe->mail_sendtype == "SMTP") 
		{
    		//Set mail send type information
    		$this->Mailer = "smtp";
    		$this->Host = $oe->mail_smtpserver;
    		$this->Port = $oe->mail_smtpport;
            if ($oe->mail_smtpssl == 1) {
            	$this->SMTPSecure = 'ssl';
            } // if
            if ($oe->mail_smtpssl == 2) {
            	$this->SMTPSecure = 'tls';
            } // if
    
    		if($oe->mail_smtpauth_req) {
    			$this->SMTPAuth = TRUE;
    			$this->Username = $oe->mail_smtpuser;
    			$this->Password = $oe->mail_smtppass;
    		}
		}
		else 
			$this->Mailer = "sendmail";
	}

	/**
	 * Prefills mailer for system
	 */
	function setMailerForSystem() {
		require_once("include/OutboundEmail/OutboundEmail.php");
		$oe = new OutboundEmail();
		$oe = $oe->getSystemMailerSettings();

		// ssl or tcp - keeping outside isSMTP b/c a default may inadvertantly set ssl://
		$this->protocol = ($oe->mail_smtpssl) ? "ssl://" : "tcp://";
		
		if($oe->mail_sendtype == "SMTP") 
		{
    		//Set mail send type information
    		$this->Mailer = "smtp";
    		$this->Host = $oe->mail_smtpserver;
    		$this->Port = $oe->mail_smtpport;
            if ($oe->mail_smtpssl == 1) {
                $this->SMTPSecure = 'ssl';
            } // if
            if ($oe->mail_smtpssl == 2) {
            	$this->SMTPSecure = 'tls';
            } // if
    		if($oe->mail_smtpauth_req) {
    			$this->SMTPAuth = TRUE;
    			$this->Username = $oe->mail_smtpuser;
    			$this->Password = $oe->mail_smtppass;
    		}		
		}
		else 
		  $this->Mailer = "sendmail";
	}

    /**
     * Attaches all fs, string, and binary attachments to the message.
     * Returns an empty string on failure.
     * @access private
     * @return string
     */
    function AttachAll() {
        // Return text of body
        $mime = array();

        // Add all attachments
        for($i = 0; $i < count($this->attachment); $i++) {
            // Check for string attachment
            $bString = $this->attachment[$i][5];
            if ($bString) {
                $string = $this->attachment[$i][0];
            } else {
				$path = $this->attachment[$i][0];
            }

			// cn: overriding parent class' method to perform encode on the following
            $filename    = $this->EncodeHeader(trim($this->attachment[$i][1]));
            $name        = $this->EncodeHeader(trim($this->attachment[$i][2]));
            $encoding    = $this->attachment[$i][3];
            $type        = $this->attachment[$i][4];
            $disposition = $this->attachment[$i][6];
            $cid         = $this->attachment[$i][7];

            $mime[] = sprintf("--%s%s", $this->boundary[1], $this->LE);
            $mime[] = sprintf("Content-Type: %s; name=\"%s\"%s", $type, $name, $this->LE);
            $mime[] = sprintf("Content-Transfer-Encoding: %s%s", $encoding, $this->LE);

            if($disposition == "inline") {
                $mime[] = sprintf("Content-ID: <%s>%s", $cid, $this->LE);
            }

            $mime[] = sprintf("Content-Disposition: %s; filename=\"%s\"%s", $disposition, $name, $this->LE.$this->LE);

            // Encode as string attachment
            if($bString) {
                $mime[] = $this->EncodeString($string, $encoding);
                if($this->IsError()) { return ""; }
                $mime[] = $this->LE.$this->LE;
            } else {
                $mime[] = $this->EncodeFile($path, $encoding);

                if($this->IsError()) {
                	return "";
                }
                $mime[] = $this->LE.$this->LE;
            }
        }
        $mime[] = sprintf("--%s--%s", $this->boundary[1], $this->LE);

        return join("", $mime);
    }

	/**
	 * handles Charset translation for all visual parts of the email.
	 * @param string charset Default = ''
	 */
	function prepForOutbound() {
		global $locale;

		if($this->preppedForOutbound == false) {
			//bug 28534. We should not set it to true to circumvent the following convertion as each email is independent.
			//$this->preppedForOutbound = true; // flag so we don't redo this
			$OBCharset = $locale->getPrecedentPreference('default_email_charset');

			// handle disclosure
			if($this->disclosureEnabled) {
				$this->Body .= "<br />&nbsp;<br />{$this->disclosureText}";
				$this->AltBody .= "\r\r{$this->disclosureText}";
			}

			// body text
			$this->Body		= from_html($locale->translateCharset(trim($this->Body), 'UTF-8', $OBCharset));
			$this->AltBody		= from_html($locale->translateCharset(trim($this->AltBody), 'UTF-8', $OBCharset));
            $subjectUTF8		= from_html(trim($this->Subject));
            $subject			= $locale->translateCharset($subjectUTF8, 'UTF-8', $OBCharset);
            $this->Subject		= $locale->translateCharset($subjectUTF8, 'UTF-8', $OBCharset);

			// HTML email RFC compliance
			if($this->ContentType == "text/html") {
				if(strpos($this->Body, '<html') === false) {
					$head=<<<eoq
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset={$OBCharset}" />
<title>{$subject}</title>
</head>
<body>
eoq;
					$this->Body = $head.$this->Body."</body></html>";
				}
			}

			// Headers /////////////////////////////////
			// the below is done in PHPMailer::CreateHeader();
			//$this->Subject			= $locale->translateCharsetMIME(trim($this->Subject), 'UTF-8', $locale->getPrecedentPreference('default_email_charset'));
			$this->FromName		= $locale->translateCharset(trim($this->FromName), 'UTF-8', $OBCharset);
			/*
			foreach($this->ReplyTo as $k => $v) {
				$this->ReplyTo[$k][1] = $locale->translateCharset(trim($v[1]), 'UTF-8', $OBCharset);
			}
			// TO: fields
			foreach($this->to as $k => $toArr) {
				$this->to[$k][1]	= $locale->translateCharset(trim($toArr[1]), 'UTF-8', $OBCharset);
			}
			// CC: fields
			foreach($this->cc as $k => $ccAddr) {
				$this->cc[$k][1]	= $locale->translateCharset(trim($ccAddr[1]), 'UTF-8', $OBCharset);
			}
			// BCC: fields
			foreach($this->bcc as $k => $bccAddr) {
				$this->bcc[$k][1]	= $locale->translateCharset(trim($bccAddr[1]), 'UTF-8', $OBCharset);
			}
			*/

		}
	}

	/**
	 * @param notes	array of note beans
	 */
	function handleAttachments($notes) {
		global $sugar_config;

        //replace references to cache/images with cid tag
        $this->Body = str_replace($GLOBALS['sugar_config']['cache_dir'].'images/','cid:',$this->Body);

		if (empty($notes)) {
				return;
		}
		// cn: bug 4864 - reusing same SugarPHPMailer class, need to clear attachments
		$this->ClearAttachments();
		require_once('include/upload_file.php');

		//Handle legacy attachments
        $fileBasePath = "{$sugar_config['upload_dir']}";
		$filePatternSearch = "{$sugar_config['upload_dir']}";
		$filePatternSearch = str_replace("/", "\/", $filePatternSearch);
		if(strpos($this->Body, "\"{$fileBasePath}")) {
			$matches = array();
			preg_match_all("/{$filePatternSearch}.+?\"/i", $this->Body, $matches);
			foreach($matches[0] as $match) {
				$filename = str_replace($fileBasePath, '', $match);
				$filename = urldecode(substr($filename, 0, -1));
				$cid = $filename;
				$file_location = clean_path(getcwd()."/{$sugar_config['upload_dir']}{$filename}");
				$mime_type = "image/".strtolower(substr($filename, strrpos($filename, ".")+1, strlen($filename)));
				if(file_exists($file_location)) {
					$this->AddEmbeddedImage($file_location, $cid, $filename, 'base64', $mime_type);
				}
			}
            //replace references to cache with cid tag
            $this->Body = str_replace($fileBasePath,'cid:',$this->Body);
		}
		
		//Handle secure embeded images.
		$noteImgRegex = "/<img[^>]*[\s]+src[^=]*=\"index.php\?entryPoint=download(\&amp;|\&)id=([^\&]*)[^>]*>/im";
        $embededImageMatches = array(); 
        preg_match_all($noteImgRegex, $this->Body, $embededImageMatches,PREG_SET_ORDER);
        
        foreach ($embededImageMatches as $singleMatch )
        {
            $fullMatch = $singleMatch[0];
            $noteId = $singleMatch[2];
            $cid = $noteId;
            $filename = $noteId;
           
            //Retrieve note for mimetype
            $tmpNote = new Note();
            $tmpNote->retrieve($noteId);
            //Replace the src part of img tag with new cid tag
            $cidRegex = "/src=\"([^\"]*)\"/im";
            $replaceMatch = preg_replace($cidRegex, "src=\"cid:$noteId\"", $fullMatch);

            //Replace the body, old tag for new tag
            $this->Body = str_replace($fullMatch, $replaceMatch, $this->Body);
            
            //Attach the file
            $file_location = clean_path(getcwd()."/{$sugar_config['upload_dir']}{$noteId}");
            
            if(file_exists($file_location)) 
					$this->AddEmbeddedImage($file_location, $cid, $filename, 'base64', $tmpNote->file_mime_type);
        }
		
		//Handle regular attachments.
		foreach($notes as $note) {
				$mime_type = 'text/plain';
				$file_location = '';
				$filename = '';

				if($note->object_name == 'Note') {
					if (! empty($note->file->temp_file_location) && is_file($note->file->temp_file_location)) {
						$file_location = $note->file->temp_file_location;
						$filename = $note->file->original_file_name;
						$mime_type = $note->file->mime_type;
					} else {
						$file_location = rawurldecode(UploadFile::get_file_path($note->filename,$note->id));
						$filename = $note->id.$note->filename;
						$mime_type = $note->file_mime_type;
					}
				} elseif($note->object_name == 'DocumentRevision') { // from Documents
					$filename = $note->id.$note->filename;
					$file_location = getcwd().'/'.$GLOBALS['sugar_config']['upload_dir'].$filename;
					$mime_type = $note->file_mime_type;
				}

				$filename = substr($filename, 36, strlen($filename)); // strip GUID	for PHPMailer class to name outbound file
				if (!$note->embed_flag) {
					$this->AddAttachment($file_location, $filename, 'base64', $mime_type);
				} // else
			}
	}

	/**
	 * overloads class.phpmailer's SetError() method so that we can log errors in sugarcrm.log
	 *
	 */
	function SetError($msg) {
		$GLOBALS['log']->fatal("SugarPHPMailer encountered an error: {$msg}");
		parent::SetError($msg);
	}
	
	function SmtpConnect() {
		$connection = parent::SmtpConnect();
		if (!$connection) {
			global $app_strings;
			if(isset($this->oe) && $this->oe->type == "system") {
				$this->SetError($app_strings['LBL_EMAIL_INVALID_SYSTEM_OUTBOUND']);
			} else {
				$this->SetError($app_strings['LBL_EMAIL_INVALID_PERSONAL_OUTBOUND']);
			} // else
		}
		return $connection;
	} // fn
	
} // end class definition
