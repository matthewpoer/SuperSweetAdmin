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


require_once('include/JSON.php');
require_once('include/entryPoint.php');

global $sugar_config;
$supportedExtensions = array('jpg', 'png', 'jpeg');
$json = getJSONobj();
$rmdir=true;
$returnArray = array();
if($json->decode(html_entity_decode($_REQUEST['forQuotes']))){
    $returnArray['forQuotes']="quotes";
}else{
    $returnArray['forQuotes']="company";
}
if(isset($_FILES['file_1'])){
    $uploadTmpDir=$sugar_config['tmp_dir'].'tmp_logo_'.$returnArray['forQuotes'].'_upload';
    $file_name = $uploadTmpDir . DIRECTORY_SEPARATOR .  cleanFileName(basename($_FILES['file_1']['name']));
    if(file_exists($uploadTmpDir))
       rmdir_recursive($uploadTmpDir);
    
    mkdir_recursive( $uploadTmpDir,null,true );
    if (!empty($_FILES['file_1']['error'])){
        rmdir_recursive($uploadTmpDir);
        $returnArray['data']='not_recognize';
        echo $json->encode($returnArray);
        sugar_cleanup();
        exit();
    }
    if (!move_uploaded_file($_FILES['file_1']['tmp_name'], $file_name)){
        rmdir_recursive($uploadTmpDir);
        die("Possible file upload attack!\n");
    }
}else{
    $returnArray['data']='not_recognize';
    echo $json->encode($returnArray);
    sugar_cleanup();
    exit();
}
if(file_exists($file_name) && is_file($file_name)){
    $returnArray['path']=$file_name;
    $img_size = getimagesize($file_name);
    $filetype = $img_size['mime'];
    $ext = end(explode(".", $file_name));
    if($ext === $file_name || !in_array($ext, $supportedExtensions) || ($filetype != 'image/jpeg' && $filetype != 'image/png') ||  ($filetype != 'image/jpeg' && $returnArray['forQuotes'] == 'quotes')){
        $returnArray['data']='other';
        $returnArray['path'] = '';
        
    }else{
        $test=$img_size[0]/$img_size[1];
        if (($test>10 || $test<1) && $returnArray['forQuotes'] == 'company'){
            $rmdir=false;
            $returnArray['data']='size';
        }
        if (($test>20 || $test<3)&& $returnArray['forQuotes'] == 'quotes')
            $returnArray['data']='size';
    }
    if(!empty($returnArray['data'])){
        echo $json->encode($returnArray);
    }else{
        $rmdir=false;
        $returnArray['data']='ok';
        echo $json->encode($returnArray);
    }
}else{
    $returnArray['data']='file_error';
    echo $json->encode($returnArray);
}
if($rmdir)
    rmdir_recursive($uploadTmpDir);
sugar_cleanup();
exit();
?>
