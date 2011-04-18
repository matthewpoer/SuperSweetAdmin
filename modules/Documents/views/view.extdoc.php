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

 * Description: This file is used to override the default Meta-data EditView behavior
 * to provide customization specific to the Calls module.
 * Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
 * All Rights Reserved.
 * Contributor(s): ______________________________________..
 ********************************************************************************/
require_once('include/Sugar_Smarty.php');
require_once('include/externalAPI/ExternalAPIFactory.php');


class DocumentsViewExtdoc extends SugarView
{
    var $options = array('show_header' => false, 'show_title' => false, 'show_subpanels' => false, 'show_search' => true, 'show_footer' => false, 'show_javascript' => false, 'view_print' => false,);

    public function init($bean, $view_object_map) {
        $this->seed = $bean;
    }

 	public function display(){

        if ( isset($_REQUEST['name_basic']) ) {
            $file_search = trim($_REQUEST['name_basic']);
        } else {
            $file_search = '';
        }
        
        // $apiName = 'LotusLiveDirect';
        if ( !isset($_REQUEST['apiName']) ) {
            $apiName = 'LotusLive';
        } else {
            $apiName = $_REQUEST['apiName'];
        }

        // See if we are running as a popup window
        if ( isset($_REQUEST['isPopup']) && $_REQUEST['isPopup'] == 1 && !empty($_REQUEST['elemBaseName']) ) {
            $isPopup = true;
        } else {
            $isPopup = false;
        }

        // Need to manually attempt to fetch the EAPM record, we don't want to give them the signup screen when they just have a deactivated account.
        
        if ( !$eapmBean = EAPM::getLoginInfo($apiName,true) ) {
            $smarty = new Sugar_Smarty();
            echo $smarty->fetch('include/externalAPI/LotusLive/LotusLiveSignup.'.$GLOBALS['current_language'].'.tpl');
            return;
        }


        $api = ExternalAPIFactory::loadAPI($apiName,true);
        $api->loadEAPM($eapmBean);

        $quickCheck = $api->quickCheckLogin();
        if ( ! $quickCheck['success'] ) {
            $errorMessage = string_format(translate('LBL_ERR_FAILED_QUICKCHECK','EAPM'), array('LotusLive'));
            $errorMessage .= '<form method="POST" target="_EAPM_CHECK" action="index.php">';
            $errorMessage .= '<input type="hidden" name="module" value="EAPM">';
            $errorMessage .= '<input type="hidden" name="action" value="Save">';
            $errorMessage .= '<input type="hidden" name="record" value="'.$eapmBean->id.'">';
            $errorMessage .= '<input type="hidden" name="active" value="1">';
            $errorMessage .= '<input type="hidden" name="closeWhenDone" value="1">';
            $errorMessage .= '<input type="hidden" name="refreshParentWindow" value="1">';

            $errorMessage .= '<br><input type="submit" value="'.$GLOBALS['app_strings']['LBL_EMAIL_OK'].'">&nbsp;';
            $errorMessage .= '<input type="button" onclick="lastLoadedMenu=undefined;DCMenu.closeOverlay();return false;" value="'.$GLOBALS['app_strings']['LBL_CANCEL_BUTTON_LABEL'].'">';
            $errorMessage .= '</form>';
            echo $errorMessage;
            return;
        }

        $searchDataLower = $api->searchDoc($file_search,true);


        // In order to emulate the list views for the SugarFields, I need to uppercase all of the key names.
        $searchData = array();

        if ( is_array($searchDataLower) ) {
            foreach ( $searchDataLower as $row ) {
                $newRow = array();
                foreach ( $row as $key => $value ) {
                    $newRow[strtoupper($key)] = $value;
                }
                
                if ( $isPopup ) {
                    // We are running as a popup window, we need to replace the direct url with some javascript
                    $newRow['DOC_URL'] = "javascript:window.opener.SUGAR.field.file.populateFromPopup('".addslashes($_REQUEST['elemBaseName'])."','".addslashes($newRow['ID'])."','".addslashes($newRow['NAME'])."','".addslashes($newRow['URL'])."','".addslashes($newRow['URL'])."'); window.close();";
                }else{
                    $newRow['DOC_URL'] = $newRow['URL'];
                }
                $searchData[] = $newRow;
            }
        }

        $displayColumns = array(
            'NAME' => array(
                'label' => 'LBL_LIST_EXT_DOCUMENT_NAME',
                'type' => 'varchar',
                'link' => true,
                ),
            'DATE_MODIFIED' => array(
                'label' => 'LBL_DATE',
                'type' => 'date',
                ),
        );

        $ss = new Sugar_Smarty();
        $ss->assign('searchFieldLabel',translate('LBL_SEARCH_EXTERNAL_DOCUMENT','Documents'));
        $ss->assign('displayedNote',translate('LBL_EXTERNAL_DOCUMENT_NOTE','Documents'));
        $ss->assign('APP',$GLOBALS['app_strings']);
        $ss->assign('MOD',$GLOBALS['mod_strings']);
        $ss->assign('data', $searchData);
        $ss->assign('displayColumns',$displayColumns);
        $ss->assign('imgPath',SugarThemeRegistry::current()->getImageURL($apiName.'_image_inline.png'));

        if ( $isPopup ) { 
            $ss->assign('linkTarget','');
            $ss->assign('isPopup',1);
            $ss->assign('elemBaseName',$_REQUEST['elemBaseName']);
        } else {
            $ss->assign('linkTarget','_new');
            $ss->assign('isPopup',0);
            $ss->assign('elemBaseName','');
        }
        $ss->assign('apiName',$apiName);
        $ss->assign('DCSEARCH',$file_search);

        if ( $isPopup ) {
            // Need the popup header... I feel so dirty.
            ob_start();
            echo('<div class="dccontent">');
            insert_popup_header($GLOBALS['theme']);
            $output_html = ob_get_contents();
            ob_end_clean();
            
            $output_html .= get_form_header(translate('LBL_SEARCH_FORM_TITLE','Documents'), '', false);
            
            echo($output_html);
        }

        $ss->display('modules/Documents/tpls/view.extdoc.tpl');
        
        if ( $isPopup ) {
            // Close the dccontent div
            echo('</div>');
        }
 	}
}
