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

* Description: This file handles the Data base functionality for the application specific
* to SQL Server database using the php_sqlsrv extension. It is called by the DBManager class to generate various sql statements.
*
* All the functions in this class will work with any bean which implements the meta interface.
* Please refer the DBManager documentation for the details.
*
* Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
* All Rights Reserved.
* Contributor(s): ______________________________________..
********************************************************************************/
require_once('include/database/MssqlHelper.php');

class SqlsrvHelper extends MssqlHelper
{
	/**
     * @see DBHelper::getColumnType()
     */
    public function getColumnType(
        $type,
        $name = '',
        $table = ''
        )
    {
		$columnType = parent::getColumnType($type,$name,$table);

		if ( in_array($columnType,array('char','varchar')) && !preg_match('/(_id$|^id$)/', $name))
			$columnType = 'n'.$columnType;

		if ( in_array($columnType,array('text','ntext','image')) ) {
		    $columnType = 'nvarchar(max)';
        }

        return $columnType;
    }

	/**
	 * @see DBHelper::massageValue()
	 */
	public function massageValue(
        $val,
        $fieldDef
        )
    {
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
        case 'enum':
        case 'multienum':
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
        case 'text':
        case 'ntext':
        case 'blob':
        case 'longblob':
        case 'clob':
        case 'longtext':
        case 'image':
            return $qval;
            break;
		}

        return $val;
	}

	/**
	 * Detect if no clustered index has been created for a table; if none created then just pick the first index and make it that
	 *
	 * @see MssqlHelper::indexSQL()
     */
    public function indexSQL(
        $tableName,
        $fieldDefs,
        $indices
        )
    {
        if ( $this->doesTableHaveAClusteredIndexDefined($tableName) ) {
            return parent::indexSQL($tableName, $fieldDefs, $indices);
        }

        // check to see if one of the passed in indices is a primary one; if so we can bail as well
        foreach ( $indices as $index ) {
            if ( $index['type'] == 'primary' ) {
                return parent::indexSQL($tableName, $fieldDefs, $indices);
            }
        }

        // Change the first index listed to be a clustered one instead ( so we have at least one for the table )
        if ( isset($indices[0]) ) {
            $indices[0]['type'] = 'clustered';
        }

        return parent::indexSQL($tableName, $fieldDefs, $indices);
    }

    /**
     * @see DBHelper::get_columns()
     */
    public function get_columns(
        $tablename
        )
    {
        //find all unique indexes and primary keys.
        $result = $this->db->query("sp_columns_90 $tablename");

        $columns = array();
        while (($row=$this->db->fetchByAssoc($result)) !=null) {
            $column_name = strtolower($row['COLUMN_NAME']);
            $columns[$column_name]['name']=$column_name;
            $columns[$column_name]['type']=strtolower($row['TYPE_NAME']);
            if ( $row['TYPE_NAME'] == 'decimal' ) {
                $columns[$column_name]['len']=strtolower($row['PRECISION']);
                $columns[$column_name]['len'].=','.strtolower($row['SCALE']);
            }
			elseif ( in_array($row['TYPE_NAME'],array('nchar','nvarchar')) ) {
				$columns[$column_name]['len']=strtolower($row['PRECISION']);
				if ( $row['TYPE_NAME'] == 'nvarchar' && $row['PRECISION'] == '0' ) {
				    $columns[$column_name]['len']='max';
				}
			}
            elseif ( !in_array($row['TYPE_NAME'],array('datetime','text')) ) {
                $columns[$column_name]['len']=strtolower($row['LENGTH']);
            }
            if ( stristr($row['TYPE_NAME'],'identity') ) {
                $columns[$column_name]['auto_increment'] = '1';
                $columns[$column_name]['type']=str_replace(' identity','',strtolower($row['TYPE_NAME']));
            }

            if (!empty($row['IS_NULLABLE']) && $row['IS_NULLABLE'] == 'NO' && (empty($row['KEY']) || !stristr($row['KEY'],'PRI')))
                $columns[strtolower($row['COLUMN_NAME'])]['required'] = 'true';

            $column_def = 0;
            if ( strtolower($tablename) == 'relationships' ) {
                $column_def = $this->db->getOne("select cdefault from syscolumns where id = object_id('relationships') and name = '$column_name'");
            }
            if ( $column_def != 0 ) {
                $matches = array();
                $row['COLUMN_DEF'] = html_entity_decode($row['COLUMN_DEF'],ENT_QUOTES);
                if ( preg_match("/\([\(|'](.*)[\)|']\)/i",$row['COLUMN_DEF'],$matches) )
                    $columns[$column_name]['default'] = $matches[1];
                elseif ( preg_match("/\(N'(.*)'\)/i",$row['COLUMN_DEF'],$matches) )
                    $columns[$column_name]['default'] = $matches[1];
                else
                    $columns[$column_name]['default'] = $row['COLUMN_DEF'];
            }
        }
        return $columns;
    }

    /**
     * @see DBHelper::get_indices()
     */
    public function get_indices(
        $tableName
        ) 
    {
        //find all unique indexes and primary keys.
        $query = <<<EOSQL
SELECT sys.tables.object_id, sys.tables.name as table_name, sys.columns.name as column_name, 
        sys.indexes.name as index_name, sys.indexes.is_unique, sys.indexes.is_primary_key
    FROM sys.tables, sys.indexes, sys.index_columns, sys.columns 
    WHERE (sys.tables.object_id = sys.indexes.object_id 
            AND sys.tables.object_id = sys.index_columns.object_id 
            AND sys.tables.object_id = sys.columns.object_id
            AND sys.indexes.index_id = sys.index_columns.index_id 
            AND sys.index_columns.column_id = sys.columns.column_id) 
        AND sys.tables.name = '$tableName'
EOSQL;
        $result = $this->db->query($query);

        $indices = array();
        while (($row=$this->db->fetchByAssoc($result)) != null) {
            $index_type = 'index';
            if ($row['is_primary_key'] == '1')
                $index_type = 'primary';
            elseif ($row['is_unique'] == 1 )
                $index_type = 'unique';
            $name = strtolower($row['index_name']);
            $indices[$name]['name']     = $name;
            $indices[$name]['type']     = $index_type;
            $indices[$name]['fields'][] = strtolower($row['column_name']);
        }
        return $indices;
    }

    /**
     * protected function to return true if the given tablename has any clustered indexes defined.
     *
     * @param  string $tableName
     * @return bool
     */
    protected function doesTableHaveAClusteredIndexDefined($tableName)
    {
        $query = <<<EOSQL
SELECT IST.TABLE_NAME
    FROM INFORMATION_SCHEMA.TABLES IST
    WHERE objectProperty(object_id(IST.TABLE_NAME), 'IsUserTable') = 1
        AND objectProperty(object_id(IST.TABLE_NAME), 'TableHasClustIndex') = 1
        AND IST.TABLE_NAME = '{$tableName}'
EOSQL;

        $result = $this->db->getOne($query);
        if ( !$result ) {
            return false;
        }

        return true;
    }

    /**
     * protected function to return true if the given tablename has any fulltext indexes defined.
     *
     * @param  string $tableName
     * @return bool
     */
    protected function doesTableHaveAFulltextIndexDefined($tableName)
    {
        $query = <<<EOSQL
SELECT 1
    FROM sys.fulltext_indexes i
        JOIN sys.objects o ON i.object_id = o.object_id
    WHERE o.name = '{$tableName}'
EOSQL;

        $result = $this->db->getOne($query);
        if ( !$result ) {
            return false;
        }

        return true;
    }

    /**
     * Override method to add support for detecting and dropping fulltext indices.
     *
     * @see DBHelper::changeColumnSQL()
     * @see MssqlHelper::changeColumnSQL()
     */
    protected function changeColumnSQL(
        $tablename,
        $fieldDefs,
        $action,
        $ignoreRequired = false
        )
    {
        $sql = '';
        if ( $this->doesTableHaveAFulltextIndexDefined($tablename) ) {
            $sql .= "DROP FULLTEXT INDEX ON {$tablename}";
        }

        $sql .= parent::changeColumnSQL($tablename, $fieldDefs, $action, $ignoreRequired);

        return $sql;
    }
}
?>
