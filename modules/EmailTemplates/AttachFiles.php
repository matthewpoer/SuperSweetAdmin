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

 //Request object must have these property values:
 //		Module: module name, this module should have a file called TreeData.php
 //		Function: name of the function to be called in TreeData.php, the function will be called statically.
 //		PARAM prefixed properties: array of these property/values will be passed to the function as parameter.


require_once('include/JSON.php');
require_once('include/upload_file.php');

$GLOBALS['log']->debug(print_r($_FILES, true));
         $file_ext_allow = FALSE;	

if (!is_dir($GLOBALS['sugar_config']['cache_dir'].'images/'))
    mkdir_recursive($GLOBALS['sugar_config']['cache_dir'].'images/');

// cn: bug 11012 - fixed some MIME types not getting picked up.  Also changed array iterator.
$imgType = array('image/gif', 'image/png', 'image/x-png', 'image/bmp', 'image/jpeg', 'image/jpg', 'image/pjpeg');

$ret = array();

foreach($_FILES as $k => $file) {
	if(in_array(strtolower($_FILES[$k]['type']), $imgType)) {
		$dest = $GLOBALS['sugar_config']['cache_dir'].'images/'.$_FILES[$k]['name'];
		if(is_uploaded_file($_FILES[$k]['tmp_name'])) {
			move_uploaded_file($_FILES[$k]['tmp_name'], $dest);
		    $ret[] = $dest;
		}
	}
}

if (!empty($ret)) {	
	$json = getJSONobj();
	echo $json->encode($ret);	
	//return the parameters
}

?>
