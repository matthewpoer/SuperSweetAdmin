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


include_once('include/database/MssqlHelper.php');

class FreeTDSHelper extends MssqlHelper 
{
    /**
	 * @see DBHelper::massageValue()
	 */
	public function massageValue(
        $val, 
        $fieldDef
        )
    {
        if (!$val) 
            return "''";
        
        $type = $this->getFieldType($fieldDef);
        
		switch ($type) {
		case 'int':
		case 'double':
		case 'float':
		case 'uint':
		case 'ulong':
		case 'long':
		case 'short':
		case 'tinyint':
            return $val;
            break;
        }
        
        $qval = $this->quote($val);

        switch ($type) {
        case 'varchar':
        case 'nvarchar':
        case 'char':
        case 'nchar':
        case 'longtext':
        case 'text':
        case 'ntext':		  
        case 'enum':
        case 'multienum':
        case 'blob':
        case 'longblob':
        case 'clob':
        case 'id':
            return $qval;
            break;
        case 'date':
            return "$qval";
            break;
        case 'datetime':
            return $qval;
            break;
        case 'time':
            return "$qval";
            break;
        }
        
        return $val;
	}	
    
    /** 
     * Returns the valid type for a column given the type in fieldDef
     *
     * @param  string $type field type
     * @param  string $name field name
     * @param  string $table table name
     * @return string valid type for the given field
     */
    public function getColumnType(
        $type, 
        $name='', 
        $table=''
        )
    {
		$map = array( 
            'int'      => 'int',
            'double'   => 'float',
            'float'    => 'float',
            'uint'     => 'int',
            'ulong'    => 'int',
            'long'     => 'bigint',
            'short'    => 'smallint',
            'varchar'  => 'nvarchar',
            'nvarchar' => 'nvarchar',
            'longtext' => 'ntext',
            'text'     => 'ntext',
            'ntext'    => 'ntext',
            'date'     => 'datetime',
            'enum'     => 'nvarchar',
            'multienum'=> 'ntext',
            'datetime' => 'datetime',
            'datetimecombo' => 'datetime',
            'time'     => 'datetime',
            'bool'     => 'bit',
            'tinyint'  => 'tinyint',
            'char'     => 'char',
            'nchar'    => 'nchar',
            'blob'     => 'ntext',
            'longblob' => 'ntext',
            'decimal'  => 'decimal',
            'decimal2' => 'decimal',
            'currency' => 'decimal(26,6)',
            'id'       => 'nvarchar(36)',
            'url'=>'nvarchar',
            'encrypt'=>'nvarchar',
            );
            
        return $map[$type];
    }
    
    /**
     * @see DBHelper::oneColumnSQLRep()
     */
	protected function oneColumnSQLRep(
        $fieldDef,
        $ignoreRequired = false,
        $table = '',
        $return_as_array = false
        )
    {
        $ref = parent::oneColumnSQLRep($fieldDef,$ignoreRequired,$table,true);
        
        
        if ( $ref['colType'] == 'nvarchar' 
                || $ref['colType'] == 'nchar' ) {
            if( !empty($fieldDef['len']))
                $ref['colType'] .= "(".$fieldDef['len'].")";
            else 
                $ref['colType'] .= "(255)";
        }
   
        if ( $return_as_array )
            return $ref;
        else
            return "{$ref['name']} {$ref['colType']} {$ref['default']} {$ref['required']} {$ref['auto_increment']}";
    }

}

?>
