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




require_once('include/database/DBManager.php');

/**
 * @deprecated
 */
class PearDatabase
{
    /**
     * Returns DBManager instance
     *
     * @deprecated
     * @param  string $instanceName optional, name of the instance
     * @return object DBManager instance 
     */
    public static function getInstance($instanceName='')
    {
        $GLOBALS['log']->info('call to PearDatabase::getInstance() is deprecated');
        return DBManagerFactory::getInstance($instanceName);
    }
    
    /**
     * Returns a quoted string
     *
     * @deprecated
     * @param  string $string
     * @param  bool   $isLike optional
     * @return string
     */
    public static function quote(
        $string,
        $isLike = true
        )
    {
        $GLOBALS['log']->info('call to PearDatabase::quote() is deprecated');
        return $GLOBALS['db']->quote($string, $isLike);
    }

    /**
     * Returns a quoted string for email
     *
     * @deprecated
     * @param  string $string
     * @param  bool   $isLike optional
     * @return string
     */
    public static function quoteForEmail(
        $string, 
        $isLike = true
        )
    {
        $GLOBALS['log']->info('call to PearDatabase::quoteForEmail() is deprecated');
        return $GLOBALS['db']->quoteForEmail($string, $isLike);
    }    
    
    /**
     * Quotes each string in the given array
     *
     * @deprecated
     * @param  array  $array
     * @param  bool   $isLike optional
     * @return string
     */
    public static function arrayQuote(
        array &$array, 
        $isLike = true
        ) 
    {
        $GLOBALS['log']->info('call to PearDatabase::arrayQuote() is deprecated');
        return $GLOBALS['db']->arrayQuote($array, $isLike);
    }
    
    /**
     * Truncates a string to a given length
     *
     * @deprecated
     * @param string $string
     * @param int    $len    length to trim to
     * @param string
     */
    public static function truncate(
        $string, 
        $len
        ) 
    {
        $GLOBALS['log']->info('call to PearDatabase::truncate() is deprecated');
        if ( is_numeric($len) && $len > 0 )
                $string=mb_substr($string,0,(int) $len);
        return $string;
    }


}
?>
