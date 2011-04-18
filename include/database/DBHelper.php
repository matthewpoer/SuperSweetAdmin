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

* Description: This file is an abstract class and handles the Data base functionality for
* the application. It is called by the DBManager class to generate various sql statements.
*
* All the functions in this class will work with any bean which implements the meta interface.
* Please refer the DBManager documentation for the details.
*
* Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
* All Rights Reserved.
* Contributor(s): ______________________________________..
********************************************************************************/

abstract class DBHelper
{
    /**
     * Instance of the related DBManager object
     *
     * @var object DBManager instance
     */
    public $db;

    /**
     * Instance of the related SugarBean object
     *
     * @var object SugarBean instance
     */
    public $bean;

    /**
	 * Generates sql for create table statement for a bean.
	 *
	 * @param  object $bean SugarBean instance
	 * @return string SQL Create Table statement
	 */
	public function createTableSQL(
        SugarBean $bean
        )
    {
		$tablename = $bean->getTableName();
		$fieldDefs = $bean->getFieldDefinitions();
		$indices = $bean->getIndices();
		return $this->createTableSQLParams($tablename, $fieldDefs, $indices);

	}

	/**
	 * Generates sql for create table statement for a bean.
	 *
	 * @param  string $tablename
	 * @param  array  $fieldDefs
     * @param  array  $indices
     * @param  string $engine
     * @return string SQL Create Table statement
	 */
	public function createTableSQLParams(
        $tablename,
        $fieldDefs,
        $indices,
        $engine = null
        )
    {
        $columns = $this->columnSQLRep($fieldDefs, false, $tablename);
        if (empty($columns))
            return false;

        $keys = $this->keysSQL($indices);
        if (!empty($keys))
            $keys = ",$keys";

        // cn: bug 9873 - module tables do not get created in utf8 with assoc collation
        return "CREATE TABLE $tablename ($columns $keys) CHARACTER SET utf8 COLLATE utf8_general_ci";
	}


	/**
     * Generates SQL for insert statement.
     *
     * @param  object $bean SugarBean instance
     * @return string SQL Create Table statement
     */
    public function insertSQL(
        SugarBean $bean
        )
    {
		// get column names and values
		$values = array();
		foreach ($bean->getFieldDefinitions() as $fieldDef)
		{
            if (isset($fieldDef['source']) && $fieldDef['source'] != 'db')
                continue;

            $val = $bean->getFieldValue($fieldDef['name']);
            // clean the incoming value..
            $val = from_html($val);
            if (strlen($val) <= 0) {
                if(isset($fieldDef['default']) && (strlen($fieldDef['default']) > 0))
                    $val = $fieldDef['default'];
                else
                    $val = null;
            }

            //handle auto increment values here only need to do this on insert not create
            if (isset($fieldDef['auto_increment']) && $fieldDef['auto_increment']) {
                $values[$fieldDef['name']] =
                    $this->getAutoIncrementSQL($bean->getTableName(), $fieldDef['name']);
            }
            elseif (isset($bean->$fieldDef['name'])) {
                // need to do some thing about types of values
                $values[$fieldDef['name']] = $this->massageValue($val, $fieldDef);
            }
            elseif ($fieldDef['name'] == 'deleted'){
                $values['deleted'] = $val;
            }
		}

		if ( sizeof($values) == 0 )
            return ""; // no columns set

		// get the entire sql
		return "INSERT INTO ".$bean->getTableName()."
                    (".implode(",", array_keys($values)).")
                    VALUES (".implode(",", $values).")";
	}

	/**
     * Generates SQL for update statement.
     *
     * @param  object $bean SugarBean instance
     * @param  array  $where Optional, where conditions in an array
     * @return string SQL Create Table statement
     */
    public function updateSQL(
        SugarBean $bean,
        array $where = array()
        )
    {
        $primaryField = $bean->getPrimaryFieldDefinition();
        $columns = array();

		// get column names and values
		foreach ($bean->getFieldDefinitions() as $field => $fieldDef) {
           // Do not write out the id field on the update statement.
           // We are not allowed to change ids.
           if ($fieldDef['name'] == $primaryField['name'])
               continue;

           // If the field is an auto_increment field, then we shouldn't be setting it.  This was added
           // specially for Bugs and Cases which have a number associated with them.
           if (isset($bean->field_name_map[$field]['auto_increment']) &&
                    $bean->field_name_map[$field]['auto_increment'] == true)
               continue;

           //custom fields handle their save seperatley
           if(isset($bean->field_name_map) && !empty($bean->field_name_map[$field]['custom_type']))
               continue;

           if (isset($bean->$fieldDef['name'])
                    && (!isset($fieldDef['source']) || $fieldDef['source'] == 'db')) {
               $val = $bean->getFieldValue($fieldDef['name']);
               // clean the incoming value..
               $val = from_html($val);

               // need to do some thing about types of values
               if (strlen($val) <= 0)
                    $columns[] = "{$fieldDef['name']}=null";
		       else
                    $columns[] = "{$fieldDef['name']}=".$this->massageValue($val, $fieldDef);
           }
		}

		if ( sizeof($columns) == 0 )
            return ""; // no columns set

        // build where clause
        $where = $this->updateWhereArray($bean, $where);
        $where = $this->getWhereClause($bean, $where);

        return "update ".$bean->getTableName()."
                    set ".implode(",", $columns)."
                    $where and deleted=0";
	}

    /**
     * This method returns a where array so that it has id entry if
     * where is not an array or is empty
     *
     * @param  object $bean SugarBean instance
     * @param  array  $where Optional, where conditions in an array
     * @return array
     */
    protected function updateWhereArray(
        SugarBean $bean,
        array $where = array()
        )
    {
		if (sizeof($where) == 0) {
            $fieldDef = $bean->getPrimaryFieldDefinition();
            $primaryColumn = $fieldDef['name'];

            $val = $bean->getFieldValue($fieldDef['name']);
            if ($val != FALSE){
                $where[$primaryColumn] = $val;
            }
        }

        return $where;
	}

    /**
     * Returns a where clause without the 'where' key word
     *
     * The clause returned does not have an 'and' at the beginning and the columns
     * are joined by 'and'.
     *
     * @param  string $table table name
     * @param  array  $whereArray Optional, where conditions in an array
     * @return string
     */
    protected function getColumnWhereClause(
        $table,
        array $whereArray = array()
        )
    {
        foreach ($whereArray as $name => $val) {
            $op = "=";
            if (is_array($val)) {
                $op = "IN";
                $temp = array();
                foreach ($val as $tval){
                    $temp[] = "'$tval'";
                }
                $val = implode(",", $temp);
                $val = "($val)";
            }
            else
                $val = "'$val'";

            $where[] = " $table.$name $op $val";
        }

        if (is_array($where))
            $where = implode(" and ", $where);

        return $where;
    }

    /**
     * This method returns a complete where clause built from the
     * where values specified.
     *
     * @param  string $table table name
     * @param  array  $whereArray Optional, where conditions in an array
     * @return string
     */
	protected function getWhereClause(
        SugarBean $bean,
        array $whereArray
        )
	{
       return " where " . $this->getColumnWhereClause($bean->getTableName(), $whereArray);
	}

	/**
	 * Designed to take an SQL statement and produce a list of fields used in that select
	 * @param String $selectStatement
	 */
	public function getSelectFieldsFromQuery($selectStatement)
	{
		$selectStatement = trim($selectStatement);
		if (strtoupper(substr($selectStatement, 0, 6)) == "SELECT")
			$selectStatement = trim(substr($selectStatement, 6));

		//Due to sql functions existing in many selects, we can't use php explode
		$fields = array();
		$level = 0;
		$selectField = "";
		$strLen = strlen($selectStatement);
		for($i = 0; $i < $strLen; $i++)
		{
			$char = $selectStatement[$i];

			if ($char == "," && $level == 0)
			{
				$field = $this->getFieldNameFromSelect(trim($selectField));
				$fields[$field] = $selectField;
				$selectField = "";
			}
			else if ($char == "("){
				$level++;
				$selectField .= $char;
			}
			else if($char == ")"){
				$level--;
				$selectField .= $char;


			}else{
				$selectField .= $char;
			}

		}
		$fields[$this->getFieldNameFromSelect($selectField)] = $selectField;
		return $fields;
	}

	/**
	 * returns the field name used in a select
	 * @param String $string
	 */
	protected function getFieldNameFromSelect($string)
	{
	    if(strncasecmp($string, "DISTINCT ", 9) == 0) {
	        $string = substr($string, 9);
	    }
		if (stripos($string, " as ") !== false)
			//"as" used for an alias
			return trim(substr($string, strripos($string, " as ") + 4));
		else if (strrpos($string, " ") != 0)
			//Space used as a delimeter for an alias
			return trim(substr($string, strrpos($string, " ")));
		else if (strpos($string, ".") !== false)
			//No alias, but a table.field format was used
			return substr($string, strpos($string, ".") + 1);
		else
			//Give up and assume the whole thing is the field name
			return $string;
	}

    /**
     * Generates SQL for delete statement identified by id.
     *
     * @param  object $bean SugarBean instance
     * @param  array  $where where conditions in an array
     * @return string SQL Update Statement
     */
	public function deleteSQL(
        SugarBean $bean,
        array $where
        )
    {
        $where = $this->updateWhereArray($bean, $where);
        $where = $this->getWhereClause($bean, $where);

        return "update ".$bean->getTableName()." set deleted=1 $where";
	}



    /**
     * Generates SQL for select statement for any bean identified by id.
     *
     * @param  object $bean SugarBean instance
     * @param  array  $where where conditions in an array
     * @return string SQL Select Statement
     */
	public function retrieveSQL(
        SugarBean $bean,
        array $where
        )
    {
        $where = $this->updateWhereArray($bean, $where);
        $where = $this->getWhereClause($bean, $where);

        return "select * from ".$bean->getTableName()." $where and deleted=0";
    }

    /**
     * This method implements a generic sql for a collection of beans.
     *
     * Currently, this function does not support outer joins.
     *
     * @param  array $bean value returned by get_class method as the keys and a bean as
     *      the value for that key. These beans will be joined in the sql by the key
     *      attribute of field defs.
     * @param  array $cols Optional, columns to be returned with the keys as names of bean
     *      as identified by get_class of bean. Values of this array is the array of fieldDefs
     *      to be returned for a bean. If an empty array is passed, all columns are selected.
     * @param  array $whereClause Optional, values with the keys as names of bean as identified
     *      by get_class of bean. Each value at the first level is an array of values for that
     *      bean identified by name of fields. If we want to pass multiple values for a name,
     *      pass it as an array. If where is not passed, all the rows will be returned.
     * @return string SQL Select Statement
     */
    public function retrieveViewSQL(
        array $beans,
        array $cols = array(),
        array $whereClause = array()
        )
    {
        $relations = array(); // stores relations between tables as they are discovered

        foreach ($beans as $beanID => $bean) {
            $tableName = $bean->getTableName();
            $beanTables[$beanID] = $tableName;

            $table = "$beanID";
            $tables[$table] = $tableName;
            $aliases[$tableName][] = $table;

            // build part of select for this table
            if (is_array($cols[$beanID]))
                foreach ($cols[$beanID] as $def) $select[] = $table.".".$def['name'];

            // build part of where clause
            if (is_array($whereClause[$beanID])){
                $where[] = $this->getColumnWhereClause($table, $whereClause[$beanID]);
            }
            // initialize so that it can be used properly in form clause generation
            $table_used_in_from[$table] = false;

            $indices = $bean->getIndices();
            foreach ($indices as $index){
                if ($index['type'] == 'foreign') {
                    $relationship[$table][] = array('foreignTable'=> $index['foreignTable']
                                                   ,'foreignColumn'=>$index['foreignField']
                                                   ,'localColumn'=> $index['fields']
                                                   );
                }
            }
            $where[] = " $table.deleted = 0";
        }

        // join these clauses
        $select = (sizeof($select) > 0) ? implode(",", $select) : "*";
        $where = implode(" and ", $where);

        // generate the from clause. Use relations array to generate outer joins
        // all the rest of the tables will be used as a simple from
        // relations table define relations between table1 and table2 through column on table 1
        // table2 is assumed to joing through primaty key called id
        $separator = "";
        foreach ($relations as $table1 => $rightsidearray){
            if ($table_used_in_from[$table1]) continue; // table has been joined

            $from .= $separator." ".$table1;
            $table_used_in_from[$table1] = true;
            foreach ($rightsidearray as $tablearray){
                $table2 = $tablearray['foreignTable']; // get foreign table
                $tableAlias = $aliases[$table2]; // get a list of aliases fo thtis table
                foreach ($tableAlias as $table2) {
                    //choose first alias that does not match
                    // we are doing this because of self joins.
                    // in case of self joins, the same table will bave many aliases.
                    if ($table2 != $table1) break;
                }

                $col = $tablearray['foreingColumn'];
                $name = $tablearray['localColumn'];
                $from .= " LEFT JOIN $table on ($table1.$name = $table2.$col)";
                $table_used_in_from[$table2] = true;
            }
            $separator = ",";
        }

        return "select $select from $from where $where";
    }

    /**
     * Generates SQL for create index statement for a bean.
     *
     * @param  object $bean SugarBean instance
     * @param  array  $fields fields used in the index
     * @param  string $name index name
     * @param  bool   $unique Optional, set to true if this is an unique index
     * @return string SQL Select Statement
     */
	public function createIndexSQL(
        SugarBean $bean,
        array $fields,
        $name,
        $unique = TRUE
        )
    {
		$unique = ($unique) ? "unique" : "";
		$tablename = $bean->getTableName();

		// get column names
		foreach ($fields as $fieldDef)
            $columns[] = $fieldDef['name'];

        if (sizeof($columns) == 0)
            return "";

        $columns = implode(",", $columns);

        return "create $unique index $name on $tablename ($columns)";
	}

    /**
     * Returns the type of the variable in the field
     *
     * @param  array $fieldDef
     * @return string
     */
    public function getFieldType(
        $fieldDef
        )
    {
        // get the type for db type. if that is not set,
        // get it from type. This is done so that
        // we do not have change a lot of existing code
        // and add dbtype where type is being used for some special
        // purposes like referring to foreign table etc.
        if(!empty($fieldDef['dbType']))
            return  $fieldDef['dbType'];
        if(!empty($fieldDef['dbtype']))
            return  $fieldDef['dbtype'];
        if (!empty($fieldDef['type']))
            return  $fieldDef['type'];
        if (!empty($fieldDef['Type']))
            return  $fieldDef['Type'];
        if (!empty($fieldDef['data_type']))
            return  $fieldDef['data_type'];

        return null;
    }

    /**
     * Returns the defintion for a single column
     *
     * @param  array  $fieldDef
     * @param  bool   $ignoreRequired  Optional, true if we should ignor this being a required field
     * @param  string $table           Optional, table name
     * @param  bool   $return_as_array Optional, true if we should return the result as an array instead of sql
     * @return string or array if $return_as_array is true
     */
	protected function oneColumnSQLRep(
        $fieldDef,
        $ignoreRequired = false,
        $table = '',
        $return_as_array = false
        )
    {

        $name = $fieldDef['name'];
        $type = $this->getFieldType($fieldDef);
        $colType = $this->getColumnType($type, $name, $table);

        if (( $colType == 'nvarchar'
				or $colType == 'nchar'
				or $colType == 'varchar'
				or $colType == 'char'
				or $colType == 'varchar2') ) {
            if( !empty($fieldDef['len']))
                $colType .= "(".$fieldDef['len'].")";
            else
                $colType .= "(255)";
        }
       if($colType == 'decimal' || $colType == 'float'){
	        if(!empty($fieldDef	['len'])){
	        	if(!empty($fieldDef['precision']) && is_numeric($fieldDef['precision']))
	        		if(strpos($fieldDef	['len'],',') === false){
	                    $colType .= "(".$fieldDef['len'].",".$fieldDef['precision'].")";
	        		}else{
	                    $colType .= "(".$fieldDef['len'].")";
	        		}
	        	else
	                    $colType .= "(".$fieldDef['len'].")";
	        }
       }


        if (isset($fieldDef['default']) && strlen($fieldDef['default']) > 0)
            $default = " DEFAULT '".$fieldDef['default']."'";
        elseif (!isset($default) && $type == 'bool')
            $default = " DEFAULT 0 ";
        elseif (!isset($default))
            $default = '';

        $auto_increment = '';
        if(!empty($fieldDef['auto_increment']) && $fieldDef['auto_increment'])
        	$auto_increment = $this->setAutoIncrement($table , $fieldDef['name']);

        $required = 'NULL';  // MySQL defaults to NULL, SQL Server defaults to NOT NULL -- must specify
        //Starting in 6.0, only ID and auto_increment fields will be NOT NULL in the DB.
        if ((empty($fieldDef['isnull'])  || strtolower($fieldDef['isnull']) == 'false') &&
		(!empty($auto_increment) || $name == 'id' || ($fieldDef['type'] == 'id' && isset($fieldDef['required']) && $fieldDef['required'])))
		{
            $required =  "NOT NULL";
        }
		if ($ignoreRequired)
            $required = "";

        if ( $return_as_array )
            return array(
                'name' => $name,
                'colType' => $colType,
                'default' => $default,
                'required' => $required,
                'auto_increment' => $auto_increment,
                'full' => "$name $colType $default $required $auto_increment",
                );
	    else
	    	return "$name $colType $default $required $auto_increment";

	}

    /**
     * Returns SQL defintions for all columns in a table
     *
     * @param  array  $fieldDefs
     * @param  bool   $ignoreRequired Optional, true if we should ignor this being a required field
     * @param  string $tablename      Optional, table name
     * @return string SQL column definitions
     */
	protected function columnSQLRep(
        $fieldDefs,
        $ignoreRequired = false,
        $tablename
        )
    {
		$columns = array();

		if ($this->isFieldArray($fieldDefs)) {
			foreach ($fieldDefs as $fieldDef) {
				if(!isset($fieldDef['source']) || $fieldDef['source'] == 'db') {
					$columns[] = $this->oneColumnSQLRep($fieldDef,false, $tablename);
				}
			}
			$columns = implode(",", $columns);
		}
		else {
			$columns = $this->oneColumnSQLRep($fieldDefs,$ignoreRequired, $tablename);
		}

		return $columns;
	}

	/**
     * Returns the next value for an auto increment
     *
     * @param  string $table tablename
     * @param  string $field_name
     * @return string
     */
	public function getAutoIncrement(
        $table,
        $field_name
        )
    {
		return "";
	}

	/**
     * Returns the sql for the next value in a sequence
     *
     * @param  string $table tablename
     * @param  string $field_name
     * @return string
     */
    public function getAutoIncrementSQL(
        $table,
        $field_name
        )
    {
        return "";
    }



	/**
     * Either creates an auto increment through queries or returns sql for auto increment
     * that can be appended to the end of column defination (mysql)
     *
     * @param  string $table tablename
     * @param  string $field_name
     * @return string
     */
	protected function setAutoIncrement(
        $table,
        $field_name
        )
    {
        $this->deleteAutoIncrement($table, $field_name);
        return "";
	}


    /**
     * Sets the next auto-increment value of a column to a specific value.
     *
     * @param  string $table tablename
     * @param  string $field_name
     */
    public function setAutoIncrementStart(
        $table,
        $field_name,
        $start_value
        )
    {
        return "";
    }

	/**
     * Deletes an auto increment (for oracle not mysql)
     *
     * @param string $table tablename
     * @param string $field_name
     */
	public function deleteAutoIncrement(
        $table,
        $field_name
        )
    {
        return;
	}

	/**
     * Generates the SQL for changing columns
     *
     * @param string $tablename
     * @param array  $fieldDefs
     * @param string $action
     * @param bool   $ignoreRequired Optional, true if we should ignor this being a required field
	 */
	abstract protected function changeColumnSQL(
        $tablename,
        $fieldDefs,
        $action,
        $ignoreRequired = false);

    /**
     * This method generates sql for adding a column to table identified by field def.
     *
     * @param  string $tablename
     * @param  array  $fieldDefs
     * @return string SQL statement
     */
	public function addColumnSQL(
        $tablename,
        $fieldDefs
        )
    {
       return $this->changeColumnSQL($tablename, $fieldDefs, 'add');
	}

    /**
     * This method genrates sql for altering old column identified by oldFieldDef to new fieldDef.
     *
     * @param  string $tablename
     * @param  array  $newFieldDefs
     * @param  bool   $ignoreRequired Optional, true if we should ignor this being a required field
     * @return string SQL statement
     */
	public function alterColumnSQL(
        $tablename,
        $newFieldDefs,
        $ignorerequired = false
        )
    {
        return $this->changeColumnSQL($tablename, $newFieldDefs, 'modify', $ignorerequired);
    }

    /**
     * Generates SQL for dropping a table.
     *
     * @param  object $bean Sugarbean instance
     * @return string SQL statement
     */
	public function dropTableSQL(
        SugarBean $bean
        )
    {
		return $this->dropTableNameSQL($bean->getTableName());
	}

	/**
     * Generates SQL for dropping a table.
     *
     * @param  string $name table name
     * @return string SQL statement
     */
	public function dropTableNameSQL(
        $name
        )
    {
		return "drop table if exists ".$name;
	}

    /**
     * This method generates sql that deletes a column identified by fieldDef.
     *
     * @param  object $bean      Sugarbean instance
     * @param  array  $fieldDefs
     * @return string SQL statement
     */
	public function deleteColumnSQL(
        SugarBean $bean,
        $fieldDefs
        )
    {
        if ($this->isFieldArray($fieldDefs))
            foreach ($fieldDefs as $fieldDef)
                $columns[] = $fieldDef['name'];
        else
            $columns[] = $fieldDefs['name'];

        return "alter table ".$bean->getTableName()." drop (".implode(", ", $columns).")";
	}

    /**
     * This method generates sql that drops a column identified by fieldDef.
     * Designed to work like the other addColumnSQL() and alterColumnSQL() functions
     *
     * @param  string $tablename
     * @param  array  $fieldDefs
     * @return string SQL statement
     */
	public function dropColumnSQL(
        $tablename,
        $fieldDefs
        )
    {
        $sql = $this->changeColumnSQL(
            $tablename,
            $fieldDefs,
            'drop'
            );
        return $sql;

	}

    /**
     * Generates SQL for key statement for any bean identified by id.
     *
     * The passes array is an array of field definitions or a field definition
     * itself. The keys generated will be either primary, foreign, unique, index
     * or none at all depending on the setting of the "key" parameter of a field definition
     *
     * @param  array  $indices
     * @param  bool   $alter_table
     * @param  string $alter_action
     * @return string SQL Statement
     */
    protected function keysSQL(
        $indices,
        $alter_table = false,
        $alter_action = ''
        )
	{
        return '';
    }

    /**
     * Outputs a correct string for the sql statement according to value
     *
     * @param  mixed $val
     * @param  array $fieldDef field definition
     * @return mixed
     */
	public function massageValue(
        $val,
        $fieldDef
        )
    {
        if ( strlen($val) <= 0 )
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
        case 'bool':
            return $val;
            break;
		}

        $qval = $this->quote($val);

        switch ($type) {
        case 'varchar':
        case 'char':
        case 'longtext':
        case 'text':
        case 'enum':
        case 'multienum':
        case 'html':
        case 'blob':
        case 'longblob':
        case 'clob':
        case 'id':
        case 'datetime':
            return $qval;
            break;
        case 'date':
        case 'time':
            return "$qval";
            break;
        }

        return $val;
	}

    /**
     * Massages the field defintions to fill in anything else the DB backend may add
     *
     * @param  array  $fieldDef
     * @param  string $tablename
     * @return array
     */
    public function massageFieldDef(
        &$fieldDef,
        $tablename
        )
    {
        if ( !isset($fieldDef['dbType']) ) {
            if ( isset($fieldDef['dbtype']) )
                $fieldDef['dbType'] = $fieldDef['dbtype'];
            else
                $fieldDef['dbType'] = $fieldDef['type'];
        }
        $type = $this->getColumnType($fieldDef['dbType'],$fieldDef['name'],$tablename);
        $matches = array();
        preg_match_all("/(\w+)(?:\(([0-9]+,?[0-9]*)\)|)/i", $type, $matches);
        if ( isset($matches[1][0]) )
            $fieldDef['type'] = $matches[1][0];
        if ( isset($matches[2][0]) && empty($fieldDef['len']) )
            $fieldDef['len'] = $matches[2][0];
        if ( !empty($fieldDef['precision']) && is_numeric($fieldDef['precision']) && !strstr($fieldDef['len'],',') )
            $fieldDef['len'] .= ",{$fieldDef['precision']}";
        if (isset($fieldDef['required']) && ($fieldDef['required'] == true
                    || $fieldDef['required'] == '1'
                    || $fieldDef['required'] == 1)
                || ($fieldDef['name'] == 'id' && !isset($fieldDef['required'])) )
            $fieldDef['required'] = 'true';
    }

    /**
     * Returns the valid type for a column given the type in fieldDef
     *
     * @param  string $type field type
     * @return string valid type for the given field
     */
    abstract public function getColumnType(
        $type,
        $name = '',
        $table = ''
        );

    /**
     * Checks to see if passed array is truely an array of defitions
     *
     * Such an array may have type as a key but it will point to an array
     * for a true array of definitions an to a col type for a definition only
     *
     * @param  mixed $defArray
     * @return bool
     */
    public function isFieldArray(
        $defArray
        )
    {
        if ( !is_array($defArray) )
            return false;

        if ( isset($defArray['type']) ){
            // type key exists. May be an array of defs or a simple definition
            $type = $defArray['type'];
            return is_array($type); // type is not an array => definition else array
        }

        // type does not exist. Must be array of definitions
        return true;
    }

    /**
     * returns true if the type can be mapped to a valid column type
     *
     * @param  string $type
     * @return bool
     */
    protected function validColumnType(
        $type
        )
    {
        $coltype = $this->getColumnType($type);
        return ($coltype) ? true : false;
    }

    /**
     * Saves changes to module's audit table
     *
     * @param object $bean    Sugarbean instance
     * @param array  $changes changes
     * @see DBHelper::getDataChanges()
     */
    public function save_audit_records(SugarBean $bean, $changes)
	{
		global $current_user;
		$sql = "INSERT INTO ".$bean->get_audit_table_name();
		//get field defs for the audit table.
		require('metadata/audit_templateMetaData.php');
		$fieldDefs = $dictionary['audit']['fields'];

		$values=array();
		$values['id']=$this->massageValue(create_guid(), $fieldDefs['id']);
		$values['parent_id']=$bean->dbManager->getHelper()->massageValue($bean->id, $fieldDefs['parent_id']);
		$values['field_name']=$bean->dbManager->getHelper()->massageValue($changes['field_name'], $fieldDefs['field_name']);
		$values['data_type']=$bean->dbManager->getHelper()->massageValue($changes['data_type'], $fieldDefs['data_type']);
		if ($changes['data_type']=='text') {
			$bean->fetched_row[$changes['field_name']]=$changes['after'];;
			$values['before_value_text']=$bean->dbManager->getHelper()->massageValue($changes['before'], $fieldDefs['before_value_text']);
			$values['after_value_text']=$bean->dbManager->getHelper()->massageValue($changes['after'], $fieldDefs['after_value_text']);
		} else {
			$bean->fetched_row[$changes['field_name']]=$changes['after'];;
			$values['before_value_string']=$bean->dbManager->getHelper()->massageValue($changes['before'], $fieldDefs['before_value_string']);
			$values['after_value_string']=$bean->dbManager->getHelper()->massageValue($changes['after'], $fieldDefs['after_value_string']);
		}
		$values['date_created']=$bean->dbManager->getHelper()->massageValue(TimeDate::getInstance()->nowDb(), $fieldDefs['date_created'] );
		$values['created_by']=$bean->dbManager->getHelper()->massageValue($current_user->id, $fieldDefs['created_by']);

		$sql .= "(".implode(",", array_keys($values)).") ";
		$sql .= "VALUES(".implode(",", $values).")";

        if ( $this->db->dbType == 'oci8' && $changes['data_type'] == 'text' ) {
            $sql .= " RETURNING before_value_text, after_value_text INTO :before_value_text, :after_value_text";
            $stmt = oci_parse($this->db->getDatabase(), $sql);
            $err = oci_error($this->db->getDatabase());
            if ($err != false){
                $GLOBALS['log']->fatal($sql.">>".$err['code'].":".$err['message']);
                return false;
            }
            $before_value_text_LOB = oci_new_descriptor($this->db->getDatabase(), OCI_D_LOB);
            oci_bind_by_name($stmt, ":before_value_text", $before_value_text_LOB, -1, OCI_B_CLOB);
            $after_value_text_LOB = oci_new_descriptor($this->db->getDatabase(), OCI_D_LOB);
            oci_bind_by_name($stmt, ":after_value_text", $after_value_text_LOB, -1, OCI_B_CLOB);
            oci_execute($stmt, OCI_DEFAULT);
            $err = oci_error($this->db->getDatabase());
            if ($err != false){
                $GLOBALS['log']->fatal($sql.">>".$err['code'].":".$err['message']);
                return false;
            }
            $before_value_text_LOB->save($changes['before']);
            $after_value_text_LOB->save($changes['after']);
            oci_commit($this->db->getDatabase());
            $before_value_text_LOB->free();
            $after_value_text_LOB->free();
            oci_free_statement($stmt);
        }
        else {
            $bean->db->query($sql);
        }
	}

    /**
     * Uses the audit enabled fields array to find fields whose value has changed.
	 * The before and after values are stored in the bean.
     *
     * @param object $bean Sugarbean instance
     * @return array
     */
	public function getDataChanges(
        SugarBean &$bean
        )
    {
    	$changed_values=array();
		$audit_fields=$bean->getAuditEnabledFieldDefinitions();

		if (is_array($audit_fields) and count($audit_fields) > 0) {
			foreach ($audit_fields as $field=>$properties) {

				if (!empty($bean->fetched_row) && array_key_exists($field, $bean->fetched_row)) {

					$before_value=$bean->fetched_row[$field];
					$after_value=$bean->$field;
					if (isset($properties['type']))
						$field_type=$properties['type'];
					else {
						if (isset($properties['dbType']))
							$field_type=$properties['dbType'];
						else if(isset($properties['data_type']))
							$field_type=$properties['data_type'];
						else
							$field_type=$properties['dbtype'];
					}

					//Because of bug #25078(sqlserver haven't 'date' type, trim extra "00:00:00" when insert into *_cstm table). so when we read the audit datetime field from sqlserver, we have to replace the extra "00:00:00" again.
					if(!empty($field_type) && $field_type == 'date'){
						$before_value = from_db_convert($before_value , $field_type);
					}
					//if the type and values match, do nothing.
					if (!($this->_emptyValue($before_value,$field_type) && $this->_emptyValue($after_value,$field_type))) {
						if (trim($before_value) !== trim($after_value)) {
							if (!($this->_isTypeNumber($field_type) && (trim($before_value)+0) == (trim($after_value)+0))) {
								if (!($this->_isTypeBoolean($field_type) && ($this->_getBooleanValue($before_value)== $this->_getBooleanValue($after_value)))) {
									$changed_values[$field]=array('field_name'=>$field,
										'data_type'=>$field_type,
										'before'=>$before_value,
										'after'=>$after_value);
								}
							}
						}
					}
				}
			}
		}
		return $changed_values;
	}

    /**
     * Function returns true is full-text indexing is available in the connected database.
     *
     * Default value is false.
     *
     * @param  string $dbname
     * @return bool
     */
	abstract protected function full_text_indexing_enabled(
        $dbname = null
        );

    /**
     * Quotes a string for storing in the database
     *
     * Return value will be surrounded by quotes
     *
     * @param  string $string
     * @return string
     */
    public function quote(
        $string
        )
    {
        return "'".$this->db->quote($string)."'";
    }

    /**
     * Quotes a string for storing in the database
     *
     * Return value will be not surrounded by quotes
     *
     * @param  string $string
     * @return string
     */
    public function escape_quote(
        $string
        )
    {
        return $this->db->quote($string);
    }

    /**
     * Returns definitions of all indies for passed table.
     *
     * return will is a multi-dimensional array that
     * categorizes the index definition by types, unique, primary and index.
     * <code>
     * <?php
     * array(
     *       'index1'=> array (
     *           'name'   => 'index1',
     *           'type'   => 'primary',
     *           'fields' => array('field1','field2')
     *           )
     *       )
     * ?>
     * </code>
     * This format is similar to how indicies are defined in vardef file.
     *
     * @param  string $tablename
     * @return array
     */
    abstract public function get_indices(
        $tablename
        );

    /**
     * Returns definitions of all indies for passed table.
     *
     * return will is a multi-dimensional array that
     * categorizes the index definition by types, unique, primary and index.
     * <code>
     * <?php
     * array(
     *       'field1'=> array (
     *           'name'   => 'field1',
     *           'type'   => 'varchar',
     *           'len' => '200'
     *           )
     *       )
     * ?>
     * </code>
     * This format is similar to how indicies are defined in vardef file.
     *
     * @param  string $tablename
     * @return array
     */
    abstract public function get_columns(
        $tablename
        );

    /**
     * Generates alter constraint statement given a table name and vardef definition.
     *
     * Supports both adding and droping a constraint.
     *
     * @param  string $table     tablename
     * @param  array  $defintion field definition
     * @param  bool   $drop      true if we are dropping the constraint, false if we are adding it
     * @return string SQL statement
     */
    abstract public function add_drop_constraint(
        $table,
        $definition,
        $drop = false);

    /**
     * Renames an index definition
     *
     * @param  array  $old_definition
     * @param  array  $new_definition
     * @param  string $tablename
     * @return string SQL statement
     */
    public function rename_index(
        $old_definition,
        $new_definition,
        $table_name
        )
    {
        $ret_commands   = array();
        $ret_commands[] = $this->add_drop_constraint($table_name,$old_definition,true);
        $ret_commands[] = $this->add_drop_constraint($table_name,$new_definition);

        return $ret_commands;
    }

    /**
     * Returns the number of columns in a table
     *
     * @param  string $table_name
     * @return int
     */
    abstract public function number_of_columns(
        $table_name
        );

    protected function _isTypeBoolean(
        $type
        )
    {
        switch ($type) {
        case 'bool':
            return true;
        }

        return false;
    }

    protected function _getBooleanValue(
        $val
        )
    {
    	//need to put the === sign here otherwise true == 'non empty string'
        if (empty($val) or $val==='off')
            return false;

        return true;
    }

    protected function _isTypeNumber(
        $type
        )
    {
        switch ($type) {
        case 'decimal':
        case 'int':
        case 'double':
        case 'float':
        case 'uint':
        case 'ulong':
        case 'long':
        case 'short':
            return true;
        }
        return false;
    }

    /**
     * return true if the value if empty
     */
    protected function _emptyValue(
        $val,
        $type
        )
    {
        if (empty($val))
            return true;

        switch ($type) {
        case 'decimal':
        case 'int':
        case 'double':
        case 'float':
        case 'uint':
        case 'ulong':
        case 'long':
        case 'short':
            if ($val == 0)
                return true;
            return false;
        case 'date':
            if ($val == '0000-00-00')
                return true;
            if ($val == 'NULL')
                return true;
            return false;
        }

        return false;
    }
}
?>
