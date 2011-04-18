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
require_once('include/formbase.php');
require_once('include/SugarTinyMCE.php');



global $mod_strings;
global $app_strings;


$rawsource = false;
//-----------begin replacing text input tags that have been marked with text area tags
//get array of text areas strings to process
$bodyHTML = html_entity_decode($_REQUEST['body_html'],ENT_QUOTES);

while (strpos($bodyHTML, "ta_replace") !== false){

	//define the marker edges of the sub string to process (opening and closing tag brackets)
	$marker = strpos($bodyHTML, "ta_replace");
	$start_border = strpos($bodyHTML, "input", $marker) - 1;// to account for opening '<' char;
	$end_border = strpos($bodyHTML, '>', $start_border); //get the closing tag after marker ">"; 

	//extract the input tag string 
	$working_str = substr($bodyHTML, $marker-3, $end_border-($marker-3) );

	//replace input markup with text areas markups 
	$new_str = str_replace('input','textarea',$working_str);
	$new_str = str_replace("type='text'", ' ', $new_str);
	$new_str = $new_str . '> </textarea';

	//replace the marker with generic term
	$new_str = str_replace('ta_replace', 'sugarslot', $new_str);

	//merge the processed string back into bodyhtml string
	$bodyHTML = str_replace($working_str , $new_str, $bodyHTML);
}

//replace the request html value with the processed bodyHTML
$bodyHTML = htmlentities($bodyHTML,ENT_QUOTES);
$_REQUEST['body_html'] = $bodyHTML;
//<<<----------end replacing marked text inputs with text area tags

if(!empty($_REQUEST['body_html'])){
  $dir_path = "{$GLOBALS['sugar_config']['cache_dir']}generated_forms/";
  if(!file_exists($dir_path)){
  	sugar_mkdir($dir_path,0777);  	
  }
  //Check to ensure we have <html> tags in the form. Without them, IE8 will attempt to display the page as XML.
  $rawsource = $_REQUEST['body_html'];
  
  $SugarTiny =  new SugarTinyMCE();
  $rawsource = $SugarTiny->cleanEncodedMCEHtml($rawsource);
  $html = from_html($rawsource);
  
  if (stripos($html, "<html") === false)
  {
  	$html = "<html><body>" . $html . "</body></html>"; 
  }
  $file = $dir_path.'WebToLeadForm_'.time().'.html';
  $fp = sugar_fopen($file,'wb');
  fwrite($fp, $html);
  fclose($fp);	 
} 
$xtpl=new XTemplate ('modules/Campaigns/WebToLeadDownloadForm.html');
$xtpl->assign("MOD", $mod_strings);
$xtpl->assign("APP", $app_strings);

$webformlink = "<b>$mod_strings[LBL_DOWNLOAD_TEXT_WEB_TO_LEAD_FORM]</b><br/>";
$webformlink .= "<a href={$GLOBALS['sugar_config']['cache_dir']}generated_forms/WebToLeadForm_".time().".html>$mod_strings[LBL_DOWNLOAD_WEB_TO_LEAD_FORM]</a>";
$xtpl->assign("LINK_TO_WEB_FORM",$webformlink);
if ($rawsource !== false)
{
	$xtpl->assign("RAW_SOURCE", $rawsource);
	$xtpl->parse("main.copy_source");
}
	$xtpl->parse("main");
$xtpl->out("main");

?>