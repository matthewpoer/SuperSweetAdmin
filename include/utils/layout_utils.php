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
 * Contains a variety of utility functions used to display UI components such as form headers and footers.
 *
 * @todo refactor out these functions into the base UI objects as indicated
 */

/**
 * Create HTML to display formatted form title.
 * 
 * @param  $form_title string to display as the title in the header
 * @param  $other_text string to next to the title.  Typically used for form buttons.
 * @param  $show_help  boolean which determines if the print and help links are shown.
 * @return string HTML
 */
function get_form_header(
    $form_title, 
    $other_text, 
    $show_help
    )
{
    global $sugar_version, $sugar_flavor, $server_unique_key, $current_language, $current_module, $current_action;
    global $app_strings;
    
    $blankImageURL = SugarThemeRegistry::current()->getImageURL('blank.gif');
    $printImageURL = SugarThemeRegistry::current()->getImageURL("print.gif");
    $helpImageURL  = SugarThemeRegistry::current()->getImageURL("help.gif");
    
    $is_min_max = strpos($other_text,"_search.gif");
    if($is_min_max !== false)
        $form_title = "{$other_text}&nbsp;{$form_title}";

    $the_form = <<<EOHTML
<table width="100%" cellpadding="0" cellspacing="0" border="0" class="formHeader h3Row">
<tr>
<td nowrap><h3><span>{$form_title}</span></h3></td>
EOHTML;
    
    $keywords = array("/class=\"button\"/","/class='button'/","/class=button/","/<\/form>/");
    $match="";
    foreach ($keywords as $left)
        if (preg_match($left,$other_text))
            $match = true;
    
    if ($other_text && $match) {
        $the_form .= <<<EOHTML
<td colspan='10' width='100%'><IMG height='1' width='1' src='$blankImageURL' alt=''></td>
</tr>
<tr>
<td align='left' valign='middle' nowrap style='padding-bottom: 2px;'>$other_text</td>
<td width='100%'><IMG height='1' width='1' src='$blankImageURL' alt=''></td>
EOHTML;
        if ($show_help) {
            $the_form .= "<td align='right' nowrap>";
            if ($_REQUEST['action'] != "EditView") {
                $the_form .= <<<EOHTML
    <a href='index.php?{$GLOBALS['request_string']}' class='utilsLink'>
    <img src='{$printImageURL}' alt='Print' border='0' align='absmiddle'>
    </a>&nbsp;
    <a href='index.php?{$GLOBALS['request_string']}' class='utilsLink'>
    {$app_strings['LNK_PRINT']}
    </a>
EOHTML;
            }
            $the_form .= <<<EOHTML
&nbsp;
    <a href='index.php?module=Administration&action=SupportPortal&view=documentation&version={$sugar_version}&edition={$sugar_flavor}&lang={$current_language}&help_module={$current_module}&help_action={$current_action}&key={$server_unique_key}'
       class='utilsLink' target='_blank'>
    <img src='{$helpImageURL}' alt='Help' border='0' align='absmiddle'>
    </a>&nbsp;
    <a href='index.php?module=Administration&action=SupportPortal&view=documentation&version={$sugar_version}&edition={$sugar_flavor}&lang={$current_language}&help_module={$current_module}&help_action={$current_action}&key={$server_unique_key}'
        class='utilsLink' target='_blank'>
    {$app_strings['LNK_HELP']}
    </a>
</td>
EOHTML;
        }
    } 
    else {
        if ($other_text && $is_min_max === false) {
            $the_form .= <<<EOHTML
<td width='20'><img height='1' width='20' src='$blankImageURL' alt=''></td>
<td valign='middle' nowrap width='100%'>$other_text</td>
EOHTML;
        }
        else {
            $the_form .= <<<EOHTML
<td width='100%'><IMG height='1' width='1' src='$blankImageURL' alt=''></td>
EOHTML;
        }
    
        if ($show_help) {
            $the_form .= "<td align='right' nowrap>";
            if ($_REQUEST['action'] != "EditView") {
                $the_form .= <<<EOHTML
    <a href='index.php?{$GLOBALS['request_string']}' class='utilsLink'>
    <img src='{$printImageURL}' alt='Print' border='0' align='absmiddle'>
    </a>&nbsp;
    <a href='index.php?{$GLOBALS['request_string']}' class='utilsLink'>
    {$app_strings['LNK_PRINT']}</a>
EOHTML;
            }
            $the_form .= <<<EOHTML
    &nbsp;
    <a href='index.php?module=Administration&action=SupportPortal&view=documentation&version={$sugar_version}&edition={$sugar_flavor}&lang={$current_language}&help_module={$current_module}&help_action={$current_action}&key={$server_unique_key}'
       class='utilsLink' target='_blank'>
    <img src='{$helpImageURL}' alt='Help' border='0' align='absmiddle'>
    </a>&nbsp;
    <a href='index.php?module=Administration&action=SupportPortal&view=documentation&version={$sugar_version}&edition={$sugar_flavor}&lang={$current_language}&help_module={$current_module}&help_action={$current_action}&key={$server_unique_key}'
        class='utilsLink' target='_blank'>{$app_strings['LNK_HELP']}</a>
</td>
EOHTML;
        }
    }
    
    $the_form .= <<<EOHTML
</tr>
</table>
EOHTML;
    
    return $the_form;
}

/**
 * Wrapper function for the get_module_title function, which is mostly used for pre-MVC modules.
 * 
 * @deprecated use SugarView::getModuleTitle() for MVC modules, or getClassicModuleTitle() for non-MVC modules
 *
 * @param  $module       string  to next to the title.  Typically used for form buttons.
 * @param  $module_title string  to display as the module title
 * @param  $show_help    boolean which determines if the print and help links are shown.
 * @return string HTML
 */
function get_module_title(
    $module, 
    $module_title, 
    $show_create,
    $count=0
    )
{
    global $sugar_version, $sugar_flavor, $server_unique_key, $current_language, $action;
    global $app_strings;
    
    $the_title = "<div class='moduleTitle'>\n<h2>";
    $module = preg_replace("/ /","",$module);
    $iconPath = "";
    if(is_file(SugarThemeRegistry::current()->getImageURL('icon_'.$module.'_32.png',false)))
    {
    	$iconPath = SugarThemeRegistry::current()->getImageURL('icon_'.$module.'_32.png');
    } else if (is_file(SugarThemeRegistry::current()->getImageURL('icon_'.ucfirst($module).'_32.png',false)))
    {
        $iconPath = SugarThemeRegistry::current()->getImageURL('icon_'.ucfirst($module).'_32.png');
    }
    if (!empty($iconPath)) {
    	if (SugarThemeRegistry::current()->directionality == "ltr") {
	        $the_title .= "<a href='index.php?module={$module}&action=index'><img src='{$iconPath}' " 
	                    . "alt='".$module."' title='".$module."' align='absmiddle'></a>";
	        $the_title .= ($count >= 1) ? SugarView::getBreadCrumbSymbol() : "";
	        $the_title .=  $module_title;	
    	} else {
    		$the_title .= $module_title;
    		$the_title .= ($count > 1) ? SugarView::getBreadCrumbSymbol() : "";
    		$the_title .= "<a href='index.php?module={$module}&action=index'><img src='{$iconPath}' " 
	                    . "alt='".$module."' title='".$module."' align='absmiddle'></a>";
    	}
    } else {
		$the_title .= $module_title;
	}
    $the_title .= "</h2>\n";
    
    if ($show_create) {
        $the_title .= "<span class='utils'>";
        $createRecordURL = SugarThemeRegistry::current()->getImageURL('create-record.gif');
        $the_title .= <<<EOHTML
&nbsp;
<a href="index.php?module={$module}&action=EditView&return_module={$module}&return_action=DetailView" class="utilsLink">
<img src='{$createRecordURL}' alt='{$GLOBALS['app_strings']['LNK_CREATE']}'></a>
<a href="index.php?module={$module}&action=EditView&return_module={$module}&return_action=DetailView" class="utilsLink">
{$GLOBALS['app_strings']['LNK_CREATE']}
</a>
EOHTML;

        $the_title .= '</span>';
    }
    
    $the_title .= "</div>\n";
    return $the_title;
}

/**
 * Handles displaying the header for classic view modules
 *
 * @param  $module      string  to next to the title.  Typically used for form buttons.
 * @param array $params optional, params to display in the breadcrumb, overriding SugarView::_getModuleTitleParams()
 * These should be in the form of array('label' => '<THE LABEL>', 'link' => '<HREF TO LINK TO>');
 * the first breadcrumb should be index at 0, and built from there e.g.
 * <code>
 * array(
 *    '<a href="index.php?module=Contacts&action=index">Contacts</a>',
 *    '<a href="index.php?module=Contacts&action=DetailView&record=123">John Smith</a>',
 *    'Edit',
 *    );
 * </code>
 * would display as:
 * <a href='index.php?module=Contacts&action=index'>Contacts</a> >> <a href='index.php?module=Contacts&action=DetailView&record=123'>John Smith</a> >> Edit   
 * @param  $show_help    boolean which determines if the print and help links are shown.
 * @return string HTML
 */
function getClassicModuleTitle(
    $module, 
    $params, 
    $show_create,
    $index_url_override="")
{
	global $sugar_version, $sugar_flavor, $server_unique_key, $current_language, $action;
    global $app_strings;
    
	$module_title = '';
	$count = count($params);
	$index = 0;



    $module = preg_replace("/ /","",$module);
    $iconPath = "";
    $the_title = "<div class='moduleTitle'>\n<h2>";
    
    
    if(is_file(SugarThemeRegistry::current()->getImageURL('icon_'.$module.'_32.png',false)))
    {
    	$iconPath = SugarThemeRegistry::current()->getImageURL('icon_'.$module.'_32.png');
    } else if (is_file(SugarThemeRegistry::current()->getImageURL('icon_'.ucfirst($module).'_32.png',false)))
    {
        $iconPath = SugarThemeRegistry::current()->getImageURL('icon_'.ucfirst($module).'_32.png');
    }
    if (!empty($iconPath)) {
    	$url = (!empty($index_url_override)) ? $index_url_override : "index.php?module={$module}&action=index";
    	array_unshift ($params,"<a href='{$url}'><img src='{$iconPath}' " 
	                    . "alt='".$module."' title='".$module."' align='absmiddle'></a>");
	}
	
	$new_params = array();
	$i = 0;
	foreach ($params as $value) {
	  if ((!is_null($value)) && ($value !== "")) {
	    $new_params[$i] = $value;
	    $i++;
	  }
	} 


	if(SugarThemeRegistry::current()->directionality == "rtl") {
		$new_params = array_reverse($new_params);
	}
	
	$module_title = join(SugarView::getBreadCrumbSymbol(),$new_params);
	
	
	
    $the_title .= $module_title."</h2>\n";
    
    if ($show_create) {
        $the_title .= "<span class='utils'>";
        $createRecordURL = SugarThemeRegistry::current()->getImageURL('create-record.gif');
        $the_title .= <<<EOHTML
&nbsp;
<a href="index.php?module={$module}&action=EditView&return_module={$module}&return_action=DetailView" class="utilsLink">
<img src='{$createRecordURL}' alt='{$GLOBALS['app_strings']['LNK_CREATE']}'></a>
<a href="index.php?module={$module}&action=EditView&return_module={$module}&return_action=DetailView" class="utilsLink">
{$GLOBALS['app_strings']['LNK_CREATE']}
</a>
EOHTML;

        $the_title .= '</span>';
    }
    
    $the_title .= "</div>\n";
    return $the_title;
    
}

/**
 * Create a header for a popup.
 *
 * @todo refactor this into the base Popup_Picker class
 *
 * @param  $theme string the name of the current theme, ignorred to use SugarThemeRegistry::current() instead.
 * @return string HTML
 */
function insert_popup_header(
    $theme = null
    )
{
    global $app_strings, $sugar_config;
    
    $charset = isset($app_strings['LBL_CHARSET']) 
        ? $app_strings['LBL_CHARSET'] : $sugar_config['default_charset'];
    
    $themeCSS = SugarThemeRegistry::current()->getCSS();
    
    echo <<<EOHTML
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset="{$charset}">
<title>{$app_strings['LBL_BROWSER_TITLE']}</title>
{$themeCSS}
EOHTML;
    echo '<script type="text/javascript" src="' . getJSPath('include/javascript/sugar_grp1_yui.js') . '"></script>';
    echo '<script type="text/javascript" src="' . getJSPath('include/javascript/sugar_grp1.js') . '"></script>';
    echo <<<EOHTML
</head>
<body class="popupBody">
EOHTML;
}

/**
 * Create a footer for a popup.
 *
 * @todo refactor this into the base Popup_Picker class
 *
 * @return string HTML
 */
function insert_popup_footer()
{
    echo <<<EOQ
</body>
</html>
EOQ;
}
