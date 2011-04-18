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
require_once('include/externalAPI/ExternalAPIFactory.php');

class UploadFile 
{
	var $field_name;
	var $stored_file_name;
	var $original_file_name;
	var $temp_file_location;
	var $use_soap = false;
	var $file;
	var $file_ext;
	
	function UploadFile ($field_name) {
		// $field_name is the name of your passed file selector field in your form
		// i.e., for Emails, it is "email_attachmentX" where X is 0-9
		$this->field_name = $field_name;
        // Bug 28408 -  Add automatic creation of upload cache directory if it doesn't exist
		if ( !is_dir($GLOBALS['sugar_config']['upload_dir']) ) 
            create_cache_directory(str_replace($GLOBALS['sugar_config']['cache_dir'],'',$GLOBALS['sugar_config']['upload_dir']));
	}

	function set_for_soap($filename, $file) {
		$this->stored_file_name = $filename;
		$this->use_soap = true;
		$this->file = $file;
	}

	/**
	 * wrapper for this::get_file_path()
	 * @param string stored_file_name File name in filesystem
	 * @param string bean_id note bean ID
	 * @return string path with file name
	 */
	function get_url($stored_file_name,$bean_id) {
		global $sugar_config;
		return UploadFile::get_file_path($stored_file_name,$bean_id);
	}
	
	/**
	 * builds a URL path for an anchor tag 
	 * @param string stored_file_name File name in filesystem
	 * @param string bean_id note bean ID
	 * @return string path with file name
	 */
	function get_file_path($stored_file_name,$bean_id) {
		global $sugar_config;
		global $locale;
        
        // if the parameters are empty strings, just return back the upload_dir
		if ( empty($bean_id) && empty($stored_file_name) )
            return $sugar_config['upload_dir'];
            
		if (file_exists($sugar_config['upload_dir'] . $bean_id . rawurlencode($stored_file_name))){
			if (!rename($sugar_config['upload_dir'] . $bean_id . rawurlencode($stored_file_name),
				   $sugar_config['upload_dir'] . $bean_id)){
				$GLOBALS['log']->fatal("unable to rename file in {$sugar_config['upload_dir']}");
			}
		}
		else if (file_exists($sugar_config['upload_dir'] . $bean_id . urlencode($stored_file_name))){
			if (!rename($sugar_config['upload_dir'] . $bean_id . urlencode($stored_file_name),
				   $sugar_config['upload_dir'] . $bean_id)){
				$GLOBALS['log']->fatal("unable to rename file in {$sugar_config['upload_dir']}");
			}
		} 
		else if (file_exists($sugar_config['upload_dir'] . $bean_id . $stored_file_name)){
			if (!rename($sugar_config['upload_dir'] . $bean_id . $stored_file_name,
				   $sugar_config['upload_dir'] . $bean_id)){
				$GLOBALS['log']->fatal("unable to rename file in {$sugar_config['upload_dir']}");
			}
		}
		else if (file_exists($sugar_config['upload_dir'] . $bean_id . $locale->translateCharset( $stored_file_name, 'UTF-8', $locale->getExportCharset() ))){
			if (!rename($sugar_config['upload_dir'] . $bean_id . $locale->translateCharset( $stored_file_name, 'UTF-8', $locale->getExportCharset() ), 
						$sugar_config['upload_dir'] . $bean_id)){
				$GLOBALS['log']->fatal("unable to rename file in {$sugar_config['upload_dir']}");
			}
		}		
				
		return $sugar_config['upload_dir'] . $bean_id;
	}

	/**
	 * duplicates an already uploaded file in the filesystem.
	 * @param string old_id ID of original note
	 * @param string new_id ID of new (copied) note
	 * @param string filename Filename of file (deprecated)
	 */
	function duplicate_file($old_id, $new_id, $file_name) {
		global $sugar_config;

		// current file system (GUID)
		$source = $sugar_config['upload_dir'] . $old_id;
		
		if(!file_exists($source)) {
			// old-style file system (GUID.filename.extension)
			$oldStyleSource = $source.$file_name;
			if(file_exists($oldStyleSource)) {
				// change to new style
				if(copy($oldStyleSource, $source)) {
					// delete the old
					if(!unlink($oldStyleSource)) {
						$GLOBALS['log']->warn("upload_file could not unlink [ {$oldStyleSource} ]");
					}
				} else {
					$GLOBALS['log']->warn("upload_file could not copy [ {$oldStyleSource} ] to [ {$source} ]");
				}
			}
		}
		
		$destination = $sugar_config['upload_dir'] . $new_id;
		if(!copy($source, $destination)) {
			$GLOBALS['log']->warn("upload_file could not copy [ {$source} ] to [ {$destination} ]");
		}
	}

	/**
	 * standard PHP file-upload security measures. all variables accessed in a global context
	 * @return bool True on success
	 */
	function confirm_upload() {
		global $sugar_config;

		if(!is_uploaded_file($_FILES[$this->field_name]['tmp_name'])) {
			return false;
		} elseif($_FILES[$this->field_name]['size'] > $sugar_config['upload_maxsize']) {
			die("ERROR: uploaded file was too big: max filesize: {$sugar_config['upload_maxsize']}");
		}

		if(!is_writable($sugar_config['upload_dir'])) {
			die("ERROR: cannot write to directory: {$sugar_config['upload_dir']} for uploads");
		}

		$this->mime_type =$this->getMime($_FILES[$this->field_name]);
		$this->stored_file_name = $this->create_stored_filename();
		$this->temp_file_location = $_FILES[$this->field_name]['tmp_name'];

		return true;
	}

	function getMimeSoap($filename){

		if( function_exists( 'ext2mime' ) )
		{
			$mime = ext2mime($filename);
		}
		else
		{
			$mime = ' application/octet-stream';
		}
		return $mime;

	}
	function getMime(&$_FILES_element)
	{

		$filename = $_FILES_element['name'];

		if( $_FILES_element['type'] )
		{
			$mime = $_FILES_element['type'];
		}
		elseif( function_exists( 'mime_content_type' ) )
		{
			$mime = mime_content_type( $_FILES_element['tmp_name'] );
		}
		elseif( function_exists( 'ext2mime' ) )
		{
			$mime = ext2mime( $_FILES_element['name'] );
		}
		else
		{
			$mime = ' application/octet-stream';
		}
		return $mime;
	}

	/**
	 * gets note's filename
	 * @return string
	 */
	function get_stored_file_name() {
		return $this->stored_file_name;
	}

	/**
	 * creates a file's name for preparation for saving
	 * @return string
	 */
	function create_stored_filename() {
		global $sugar_config;
		
		if(!$this->use_soap) {
			$stored_file_name = $_FILES[$this->field_name]['name'];
			$this->original_file_name = $stored_file_name;
			
			/**
			 * cn: bug 8056 - windows filesystems and IIS do not like utf8.  we are forced to urlencode() to ensure that
			 * the file is linkable from the browser.  this will stay broken until we move to a db-storage system
			 */
			if(is_windows()) {
				// create a non UTF-8 name encoding
				// 176 + 36 char guid = windows' maximum filename length
				$end = (strlen($stored_file_name) > 176) ? 176 : strlen($stored_file_name);
				$stored_file_name = substr($stored_file_name, 0, $end);
				$this->original_file_name = $_FILES[$this->field_name]['name'];
			}
		} else {
			$stored_file_name = $this->stored_file_name;
			$this->original_file_name = $stored_file_name;
		}
		
        $ext_pos = strrpos($stored_file_name, ".");
        if($ext_pos !== false)
			$this->file_ext = substr($stored_file_name, $ext_pos + 1);
        // cn: bug 6347 - fix file extension detection 
        foreach($sugar_config['upload_badext'] as $badExt) {
            if(strtolower($this->file_ext) == strtolower($badExt)) {
                $stored_file_name .= ".txt";
                $this->file_ext="txt";
                break; // no need to look for more
            }
        }
		return $stored_file_name;
	}

	/**
	 * moves uploaded temp file to permanent save location
	 * @param string bean_id ID of parent bean
	 * @return bool True on success
	 */
	function final_move($bean_id) {
		global $sugar_config;

        $destination = clean_path($this->get_upload_path($bean_id));
        if($this->use_soap) {
        	$fp = sugar_fopen($destination, 'wb');
        	if(!fwrite($fp, $this->file)){
        		die("ERROR: can't save file to $destination");
        	}
        	fclose($fp);
		} else {
			if(!move_uploaded_file($_FILES[$this->field_name]['tmp_name'], $destination)) {
				die("ERROR: can't move_uploaded_file to $destination. You should try making the directory writable by the webserver");
			}
		}
		return true;
	}
	
	function upload_doc(&$bean, $bean_id, $doc_type, $file_name, $mime_type){
        
		if(!empty($doc_type)&&$doc_type!='Sugar') {
			global $sugar_config;
	        $destination = clean_path($this->get_upload_path($bean_id));
	        sugar_rename($destination, str_replace($bean_id, $bean_id.'_'.$file_name, $destination));
	        $new_destination = clean_path($this->get_upload_path($bean_id.'_'.$file_name));
	                    
		    try{
                $this->api = ExternalAPIFactory::loadAPI($doc_type);

                if ( isset($this->api) && $this->api !== false ) {
                    $result = $this->api->uploadDoc(
                        $bean,
                        $new_destination,
                        $file_name,
                        $mime_type
                        );
                } else {
                    $result['success'] = FALSE;
                    // FIXME: Translate
                    $GLOBALS['log']->error("Could not load the requested API (".$doc_type.")");
                    $result['errorMessage'] = 'Could not find a proper API';
                }
                unlink($new_destination);
            }catch(Exception $e){
                $result['success'] = FALSE;
                $result['errorMessage'] = $e->getMessage();
                $GLOBALS['log']->error("Caught exception: (".$e->getMessage().") ");
            }
            if ( !$result['success'] ) {
                sugar_rename($new_destination, str_replace($bean_id.'_'.$file_name, $bean_id, $new_destination));
                $bean->doc_type = 'Sugar';
                // FIXME: Translate
                if ( ! is_array($_SESSION['user_error_message']) ) 
                    $_SESSION['user_error_message'] = array(); 

                $error_message = isset($result['errorMessage']) ? $result['errorMessage'] : $GLOBALS['app_strings']['ERR_EXTERNAL_API_SAVE_FAIL'];
                $_SESSION['user_error_message'][] = $error_message;

            }
        }
	}

	/**
	 * returns the path with file name to save an uploaded file
	 * @param string bean_id ID of the parent bean
	 * @return string
	 */
	function get_upload_path($bean_id) {
		global $sugar_config;
		$file_name = $bean_id;
		
		// cn: bug 8056 - mbcs filename in urlencoding > 212 chars in Windows fails
		$end = (strlen($file_name) > 212) ? 212 : strlen($file_name);
		$ret_file_name = substr($file_name, 0, $end);
		
		return $sugar_config['upload_dir'].$ret_file_name;
	}

	/**
	 * deletes a file
	 * @param string bean_id ID of the parent bean
	 * @param string file_name File's name
	 */
	function unlink_file($bean_id,$file_name) {
		global $sugar_config;
        return unlink($sugar_config['upload_dir'].$bean_id.$file_name);
    }
}
?>
