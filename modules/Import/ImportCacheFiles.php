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

 * Description: Static class to that is used to get the filenames for the various
 * cache files used
 * Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
 * All Rights Reserved.
 ********************************************************************************/
 
class ImportCacheFiles
{
    /**
     * Returns the filename for a temporary file
     *
     * @param  string $type string to prepend to the filename, typically to indicate the file's use
     * @return string filename
     */
    private static function _createFileName(
        $type = 'misc'
        )
    {
        global $sugar_config, $current_user;
        
        if( !is_dir($sugar_config['import_dir']) )
            create_cache_directory(preg_replace('/^cache\//','',$sugar_config['import_dir']));
        
        if( !is_writable($sugar_config['import_dir']) )
            return false;
        
        return "{$sugar_config['import_dir']}{$type}_{$current_user->id}.csv";        
    }
    
    /**
     * Returns the duplicates filename
     *
     * @return string filename
     */
    public static function getDuplicateFileName()
    {
        return self::_createFileName("dupes");
    }
    
    /**
     * Returns the error filename
     *
     * @return string filename
     */
    public static function getErrorFileName()
    {
        return self::_createFileName("error");
    }
    
    /**
     * Returns the error records filename
     *
     * @return string filename
     */
    public static function getErrorRecordsFileName()
    {
        return self::_createFileName("errorrecords");
    }
    
    /**
     * Returns the status filename
     *
     * @return string filename
     */
    public static function getStatusFileName()
    {
        return self::_createFileName("status");
    }
    
    /**
     * Clears out all cache files in the $sugar_config['import_dir'] directory
     */
    public static function clearCacheFiles()
    {
        global $sugar_config;
        
        if ( is_dir($sugar_config['import_dir']) ) {
            $files = dir($sugar_config['import_dir']);
            while (false !== ($file = $files->read())) {
                if ( !is_dir($file) && stristr($file,'.csv') )
                    unlink($sugar_config['import_dir'].$file);
            }
        }
    }
}
