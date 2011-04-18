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

 * Description:  Includes generic helper functions used throughout the application.
 * Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
 * All Rights Reserved.
 * Contributor(s): ______________________________________..
 ********************************************************************************/

class JSON
{
    /**
     * JSON encode a string
     *
     * @param string $string
     * @param bool $addSecurityEnvelope defaults to false
     * @return string 
     */
    public static function encode($string, $addSecurityEnvelope = false)
    {
        $encodedString = json_encode($string);
        
        if($addSecurityEnvelope) {
            $encodedString = "while(1);/*" . $encodedString . "*/";
        }
        
        return $encodedString;
    }

    /**
     * JSON decode a string
     *
     * @param string $string
     * @param bool $examineEnvelope Default false, true to extract and verify envelope
     * @return string 
     */
    public static function decode($string, $examineEnvelope=false)
    {
        if ($examineEnvelope) {
            $meta = json_decode($string,true);
            if($meta['asychronous_key'] != $_SESSION['asychronous_key']) {
                $GLOBALS['log']->fatal("*** SECURITY: received asynchronous call with invalid ['asychronous_key'] value. Possible CSRF attack.");
                return '';
            }
            
            return $meta['jsonObject'];
        }
        
        return json_decode($string,true);
    }

    /**
     * @deprecated use JSON::encode() instead
     */
    public static function encodeReal($string)
    {
        return self::encode($string);
    }
    
    /**
     * @deprecated use JSON::decode() instead
     */
    public static function decodeReal($string)
    {
        return self::decode($string);
    }
}
