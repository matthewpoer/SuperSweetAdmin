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

 * Description: Class to handle processing an import file
 * Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
 * All Rights Reserved.
 ********************************************************************************/
 
require_once('modules/Import/ImportCacheFiles.php');

class ImportFile
{
    /**
     * Delimiter string we are using (i.e. , or ;)
     */
    private $_delimiter;
    
    /**
     * Enclosure string we are using (i.e. ' or ")
     */
    private $_enclosure;
    
    /**
     * Stores whether or not we are deleting the import file in the destructor
     */
    private $_deleteFile;
    
    /**
     * File pointer returned from fopen() call
     */
    private $_fp;
    
    /**
     * Filename of file we are importing
     */
    private $_filename;
    
    /**
     * Array of the values in the current array we are in
     */
    private $_currentRow;
    
    /**
     * Count of rows processed
     */
    private $_rowsCount = 0;
    
    /**
     * Count of rows with errors
     */
    private $_errorCount = 0;
    
    /**
     * Count of duplicate rows
     */
    private $_dupeCount = 0;
    
    /**
     * Count of newly created rows
     */
    private $_createdCount = 0;
    
    /**
     * Count of updated rows
     */
    private $_updatedCount = 0;
    
    /**
     * True if the current row has already had an error it in, so we don't increase the $_errorCount
     */
    private $_rowCountedForErrors = false;
    
    /**
     * Constructor
     *
     * @param string $filename
     * @param string $delimiter
     * @param string $enclosure
     * @param bool   $deleteFile
     */
    public function __construct( 
        $filename, 
        $delimiter  = ',',
        $enclosure  = '',
        $deleteFile = true
        )
    {
        if ( !is_file($filename) || !is_readable($filename) ) {
            return false;
        }
        
        // turn on auto-detection of line endings to fix bug #10770
        ini_set('auto_detect_line_endings', '1');
        
        $this->_fp         = sugar_fopen($filename,'r');
        $this->_filename   = $filename;
        $this->_deleteFile = $deleteFile;
        $this->_delimiter  = ( empty($delimiter) ? ',' : $delimiter );
        $this->_enclosure  = ( empty($enclosure) ? '' : trim($enclosure) );

        // Bug 39494 - Remove the BOM (Byte Order Mark) from the beginning of the import row if it exists
        $bomCheck = fread($this->_fp, 3); 
        if($bomCheck != pack("CCC",0xef,0xbb,0xbf)) {
            rewind($this->_fp);
        }
    }
    
    /**
     * Destructor
     *
     * Deletes $_importFile if $_deleteFile is true
     */
    public function __destruct()
    {
        if ( $this->_deleteFile && $this->fileExists() ) {
            fclose($this->_fp);
            //Make sure the file exists before unlinking
            if(file_exists($this->_filename)) {
               unlink($this->_filename);
            }
        }
        
        ini_restore('auto_detect_line_endings');
    }
    
    /**
     * Returns true if the filename given exists and is readable
     *
     * @return bool
     */
    public function fileExists()
    {
    	return !$this->_fp ? false : true;
    }
    
    /**
     * Gets the next row from $_importFile
     *
     * @return array current row of file
     */
    public function getNextRow()
    {
        if (!$this->fileExists()) 
            return false;
        
        // explode on delimiter instead if enclosure is an empty string
        if ( empty($this->_enclosure) ) {
            $row = explode($this->_delimiter,rtrim(fgets($this->_fp, 8192),"\r\n"));
            if ($row !== false && !( count($row) == 1 && trim($row[0]) == '') )
                $this->_currentRow = $row;
            else
                return false;
        }
        else {
            $row = fgetcsv($this->_fp, 8192, $this->_delimiter, $this->_enclosure);
            if ($row !== false && $row != array(null))
                $this->_currentRow = $row;
            else
                return false;
        }
        
        // Bug 26219 - Convert all line endings to the same style as PHP_EOL
        foreach ( $this->_currentRow as $key => $value ) {
            // use preg_replace instead of str_replace as str_replace may cause extra lines on Windows
            $this->_currentRow[$key] = preg_replace("[\r\n|\n|\r]", PHP_EOL, $value);
        }
            
        $this->_rowsCount++;
        $this->_rowCountedForErrors = false;
        
        return $this->_currentRow;
    }
    
    /**
     * Returns the number of fields in the current row
     *
     * @return int count of fiels in the current row
     */
    public function getFieldCount()
    {
        return count($this->_currentRow);
    }
    
    /**
     * Writes the row out to the ImportCacheFiles::getDuplicateFileName() file
     */
    public function markRowAsDuplicate()
    {
        $fp = sugar_fopen(ImportCacheFiles::getDuplicateFileName(),'a');
        if ( empty($this->_enclosure) )
            fputs($fp,implode($this->_delimiter,$this->_currentRow).PHP_EOL);
        else
            fputcsv($fp,$this->_currentRow, $this->_delimiter, $this->_enclosure);
        fclose($fp);
        
        $this->_dupeCount++;
    }
    
    /**
     * Writes the row out to the ImportCacheFiles::getErrorFileName() file
     *
     * @param $error string
     * @param $fieldName string
     * @param $fieldValue mixed
     */
    public function writeError(
        $error,
        $fieldName,
        $fieldValue
        )
    {
        $fp = sugar_fopen(ImportCacheFiles::getErrorFileName(),'a');
        fputcsv($fp,array($error,$fieldName,$fieldValue,$this->_rowsCount));
        fclose($fp);
        
        if ( !$this->_rowCountedForErrors ) {
            $this->_errorCount++;
            $this->_rowCountedForErrors = true;
            $this->writeErrorRecord();
        }
    }
    
    /**
     * Writes the row out to the ImportCacheFiles::getErrorRecordsFileName() file
     */
    public function writeErrorRecord()
    {
        $fp = sugar_fopen(ImportCacheFiles::getErrorRecordsFileName(),'a');
        if ( empty($this->_enclosure) )
            fputs($fp,implode($this->_delimiter,$this->_currentRow).PHP_EOL);
        else
            fputcsv($fp,$this->_currentRow, $this->_delimiter, $this->_enclosure);
        fclose($fp);
    }
    
    /**
     * Writes the totals and filename out to the ImportCacheFiles::getStatusFileName() file
     */
    public function writeStatus()
    {
        $fp = sugar_fopen(ImportCacheFiles::getStatusFileName(),'a');
        fputcsv($fp,array($this->_rowsCount,$this->_errorCount,$this->_dupeCount,
            $this->_createdCount,$this->_updatedCount,$this->_filename));
        fclose($fp);
    }
    
    /**
     * Add this row to the UsersLastImport table
     *
     * @param string $import_module name of the module we are doing the import into
     * @param string $module        name of the bean we are creating for this import
     * @param string $id            id of the recorded created in the $module
     */
    public static function writeRowToLastImport(
        $import_module,
        $module,
        $id
        )
    {
        // cache $last_import instance
        static $last_import;
        
        if ( !($last_import instanceof UsersLastImport) ) 
            $last_import = new UsersLastImport();
        
        $last_import->id = null;
        $last_import->deleted = null;
        $last_import->assigned_user_id = $GLOBALS['current_user']->id;
        $last_import->import_module = $import_module;
        if ( $module == 'Case' ) {
            $module = 'aCase';
        }
        $last_import->bean_type = $module;
        $last_import->bean_id = $id;
        return $last_import->save();
    }
    
    /**
     * Marks whether this row created a new record or not
     *
     * @param $createdRecord bool true if record is created, false if it is just updated 
     */
    public function markRowAsImported(
        $createdRecord = true
        )
    {
        if ( $createdRecord )
            ++$this->_createdCount;
        else
            ++$this->_updatedCount;
    }
}
