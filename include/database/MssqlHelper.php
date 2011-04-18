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
* to Mssql database. It is called by the DBManager class to generate various sql statements.
*
* All the functions in this class will work with any bean which implements the meta interface.
* Please refer the DBManager documentation for the details.
*
* Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
* All Rights Reserved.
* Contributor(s): ___RPS___________________________________..
********************************************************************************/

include_once('include/database/DBHelper.php');

class MssqlHelper extends DBHelper
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
        $map = array( 
            'int'      => 'int',
            'double'   => 'float',
            'float'    => 'float',
            'uint'     => 'int',
            'ulong'    => 'int',
            'long'     => 'bigint',
            'short'    => 'smallint',
            'varchar'  => 'varchar',
            'text'     => 'text',
            'longtext' => 'text',
            'date'     => 'datetime',
            'enum'     => 'varchar',
            'relate'   => 'varchar',
            'multienum'=> 'text',
            'html'     => 'text',
            'datetime' => 'datetime',
            'datetimecombo' => 'datetime',
            'time'     => 'datetime',
            'bool'     => 'bit',
            'tinyint'  => 'tinyint',
            'char'     => 'char',
            'blob'     => 'image',
            'longblob' => 'image',
            'currency' => 'decimal(26,6)',
            'decimal'  => 'decimal',
            'decimal2' => 'decimal',
            'id'       => 'varchar(36)',
            'url'=>'varchar',
            'encrypt'=>'varchar',
            'file'     => 'varchar',
            );
        
        return $map[$type];
    }
    
    /**
     * @see DBHelper::dropTableNameSQL()
     */
    public function dropTableNameSQL(
        $name
        )
    {
		return "DROP TABLE ".$name;
    }

    /**
     * Returns the SQL Alter table statment
     *
     * MSSQL has a quirky T-SQL alter table syntax. Pay special attention to the
     * modify operation
     * @param string $action
     * @param array  $def
     * @param bool   $ignorRequired
     * @param string $tablename
     */
    private function alterSQLRep(
        $action, 
        array $def, 
        $ignoreRequired, 
        $tablename = ''
        ) 
    {
        switch($action){
        case 'add':
             $f_def=$this->oneColumnSQLRep($def, $ignoreRequired,$tablename,false);
            return "ADD " . $f_def;
            break;
        case 'drop':
            return "DROP COLUMN " . $def['name'];
            break;
        case 'modify':
            //You cannot specify a default value for a column for MSSQL
            $f_def  = $this->oneColumnSQLRep($def, $ignoreRequired,$tablename, true);
            $f_stmt = "ALTER COLUMN ".$f_def['name'].' '.$f_def['colType'].' '.
                        $f_def['required'].' '.$f_def['auto_increment']."\n";
            if (!empty( $f_def['default']))
                $f_stmt .= " ALTER TABLE " . $tablename .  " ADD  ". $f_def['default'] . " FOR " . $def['name'];
            return $f_stmt;
            break;
        default:
            return '';
    	}
    }

    /**
     * @see DBHelper::changeColumnSQL()
     *
     * MSSQL uses a different syntax than MySQL for table altering that is
     * not quite as simplistic to implement...
     */
    protected function changeColumnSQL(
        $tablename, 
        $fieldDefs, 
        $action, 
        $ignoreRequired = false
        )
    {
        $sql=$sql2='';
        $constraints = $this->get_field_default_constraint_name($tablename);
        if ($this->isFieldArray($fieldDefs)) {
            foreach ($fieldDefs as $def)
      		{
          		//if the column is being modified drop the default value
          		//constraint if it exists. alterSQLRep will add the constraint back
          		if (!empty($constraints[$def['name']])) {
          			$sql.=" ALTER TABLE " . $tablename . " DROP CONSTRAINT " . $constraints[$def['name']];
          		}
          		//check to see if we need to drop related indexes before the alter
          		$indices = $this->get_indices($tablename);
                foreach ( $indices as $index ) {
                    if ( in_array($def['name'],$index['fields']) ) {
                        $sql  .= ' ' . $this->add_drop_constraint($tablename,$index,true).' ';
                        $sql2 .= ' ' . $this->add_drop_constraint($tablename,$index,false).' ';
                    }
                }
            
          		$columns[] = $this->alterSQLRep($action, $def, $ignoreRequired,$tablename);
      		}
        }
        else {
            //if the column is being modified drop the default value
      		//constraint if it exists. alterSQLRep will add the constraint back
      		if (!empty($constraints[$fieldDefs['name']])) {
      			$sql.=" ALTER TABLE " . $tablename . " DROP CONSTRAINT " . $constraints[$fieldDefs['name']];
      		}
      		//check to see if we need to drop related indexes before the alter
            $indices = $this->get_indices($tablename);
            foreach ( $indices as $index ) {
                if ( in_array($fieldDefs['name'],$index['fields']) ) {
                    $sql  .= ' ' . $this->add_drop_constraint($tablename,$index,true).' ';
                    $sql2 .= ' ' . $this->add_drop_constraint($tablename,$index,false).' ';
                }
            }
            

          	$columns[] = $this->alterSQLRep($action, $fieldDefs, $ignoreRequired,$tablename);
        }

        $columns = implode(", ", $columns);
        $sql .= " ALTER TABLE $tablename $columns " . $sql2;
        
        return $sql;
    }

    /**
     * @see DBHelper::deleteColumnSQL()
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
        
        return "ALTER TABLE ".$bean->getTableName()." DROP COLUMN ".implode(", DROP COLUMN ", $columns);
    }
    
    /**
     * returns an alter table statement to build the list of indices
     *
     * @param  string $tableName
     * @param  array  $fieldDefs
     * @param  array  $indices
     * @return string SQL statement
     */
    public function indexSQL( 
        $tableName, 
        $fieldDefs, 
        $indices
        ) 
    {
       // check if the passed value is an array of fields.
       // if not, convert it into an array
       if (!$this->isFieldArray($indices)) 
           $indices[] = $indices;

       $columns = array();
       foreach ($indices as $index) {
           if(!empty($index['db']) && $index['db'] != 'mssql')
               continue;
           if (isset($index['source']) && $index['source'] != 'db')
               continue;

           $type = $index['type'];
           $name = $index['name'];

           if (is_array($index['fields']))
               $fields = implode(", ", $index['fields']);
           else
               $fields = $index['fields'];

           switch ($type) {
           case 'primary':
               // SQL server requires primary key constraints to be created with
               // key word "PRIMARY KEY".  Cannot default to index as synonym
               $columns[] = "ALTER TABLE $tableName ADD CONSTRAINT pk_$tableName PRIMARY KEY ($fields)";
               break;
           case 'unique':
               $columns[] = "ALTER TABLE $tableName ADD CONSTRAINT " . $index['name'] . " UNIQUE ($fields)";
               break;
           case 'clustered':
               $columns[] = "CREATE CLUSTERED INDEX $name ON $tableName ( $fields )";
               break;
           case 'index':
           case 'alternate_key':
           case 'foreign':
               $columns[] = "CREATE INDEX $name ON $tableName ( $fields )";
               break;
           case 'fulltext':
               if ($this->full_text_indexing_enabled()) {
                   $catalog_name="sugar_fts_catalog";
                   if ( isset($index['catalog_name']) 
                            && $index['catalog_name'] != 'default')
            			$catalog_name = $index['catalog_name'];

            		$language = "Language 1033";
            		if (isset($index['language']) && !empty($index['language']))
            			$language = "Language " . $index['language'];
            		
            		$key_index = $index['key_index'];;

            		$change_tracking = "auto";
            		if (isset($index['change_tracking']) 
                            && !empty($index['change_tracking']))
            			$change_tracking = $index['change_tracking'];
            		
            		$columns[] = " CREATE FULLTEXT INDEX ON $tableName($fields $language) KEY INDEX $key_index ON $catalog_name WITH CHANGE_TRACKING $change_tracking" ;
               }
               break;
           }
       }

       $columns = implode(" ", $columns);
       
       return $columns;
    }

 	protected function setAutoIncrement(
        $table, 
        $field_name
        )
    {
		return "identity(1,1)";
	}

    /**
     * @see DBHelper::setAutoIncrementStart()
     */
    public function setAutoIncrementStart(
        $table,
        $field_name,
        $start_value
        )
    {
        if($start_value > 1)
            $start_value -= 1;
		$this->db->query("DBCC CHECKIDENT ('$table', RESEED, $start_value)");
        return true;
    }
	
	/**
     * @see DBHelper::getAutoIncrement()
     */
    public function getAutoIncrement(
        $table,
        $field_name
        )
    {
        
        
		$result = $this->db->query("select IDENT_CURRENT('$table') + IDENT_INCR ( '$table' ) as 'Auto_increment'");
        $row = $this->db->fetchByAssoc($result);
		if (!empty($row['Auto_increment']))
            return $row['Auto_increment'];
        
        return "";
    }

    /**
     * @see DBHelper::createTableSQLParams()
     */
	public function createTableSQLParams(
        $tablename, 
        $fieldDefs, 
        $indices,
        $engine = null
        )
    {
        if (empty($tablename) || empty($fieldDefs)) 
            return '';

        $sql ='';
        $columns = $this->columnSQLRep($fieldDefs, false, $tablename);
        if (empty($columns))
            return false;
        
        return "CREATE TABLE $tablename ($columns ) " .
            $this->indexSQL($tablename, $fieldDefs, $indices);
    }

   	/**
     * @see DBHelper::get_indices()
     */
    public function get_indices(
        $tablename
        ) 
    {
        //find all unique indexes and primary keys.
        $query = <<<EOSQL
SELECT LEFT(so.[name], 30) TableName, 
        LEFT(si.[name], 50) 'Key_name',
        LEFT(sik.[keyno], 30) Sequence, 
        LEFT(sc.[name], 30) Column_name,
		isunique = CASE
            WHEN si.status & 2 = 2 AND so.xtype != 'PK' THEN 1
            ELSE 0
        END
    FROM sysindexes si
        INNER JOIN sysindexkeys sik 
            ON (si.[id] = sik.[id] AND si.indid = sik.indid)
        INNER JOIN sysobjects so 
            ON si.[id] = so.[id]
        INNER JOIN syscolumns sc 
            ON (so.[id] = sc.[id] AND sik.colid = sc.colid)
        INNER JOIN sysfilegroups sfg 
            ON si.groupid = sfg.groupid
    WHERE so.[name] = '$tablename'
    ORDER BY Key_name, Sequence, Column_name
EOSQL;
        $result = $this->db->query($query);
        
        $indices = array();
        while (($row=$this->db->fetchByAssoc($result)) != null) {
            $index_type = 'index';
            if ($row['Key_name'] == 'PRIMARY')
                $index_type = 'primary';
            elseif ($row['isunique'] == 1 )
                $index_type = 'unique';
            $name = strtolower($row['Key_name']);
            $indices[$name]['name']     = $name;
            $indices[$name]['type']     = $index_type;
            $indices[$name]['fields'][] = strtolower($row['Column_name']);
        }
        return $indices;
    }

    /**
     * @see DBHelper::get_columns()
     */
    public function get_columns(
        $tablename
        ) 
    {
        //find all unique indexes and primary keys.
        $result = $this->db->query("sp_columns $tablename");
        
        $columns = array();
        while (($row=$this->db->fetchByAssoc($result)) !=null) {
            $column_name = strtolower($row['COLUMN_NAME']);
            $columns[$column_name]['name']=$column_name;
            $columns[$column_name]['type']=strtolower($row['TYPE_NAME']);
            if ( $row['TYPE_NAME'] == 'decimal' ) {
                $columns[$column_name]['len']=strtolower($row['PRECISION']);
                $columns[$column_name]['len'].=','.strtolower($row['SCALE']);
            }
			elseif ( in_array($row['TYPE_NAME'],array('nchar','nvarchar')) )
				$columns[$column_name]['len']=strtolower($row['PRECISION']);
            elseif ( !in_array($row['TYPE_NAME'],array('datetime','text','bit')) )
                $columns[$column_name]['len']=strtolower($row['LENGTH']);
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
     * @see DBHelper::add_drop_constraint()
     */
    public function add_drop_constraint(
        $table,
        $definition, 
        $drop = false
        ) 
    {
        $type         = $definition['type'];
        $fields       = implode(',',$definition['fields']);
        $name         = $definition['name'];
        $foreignTable = isset($definition['foreignTable']) ? $definition['foreignTable'] : array();
        $sql          = '';
        
        switch ($type){
        // generic indices
        case 'index':
        case 'alternate_key':
            if ($drop)
                $sql = "DROP INDEX {$name} ON {$table}";
            else
                $sql = "CREATE INDEX {$name} ON {$table} ({$fields})";
            break;
        // constraints as indices
        case 'unique':
            if ($drop)
                $sql = "ALTER TABLE {$table} DROP CONSTRAINT $name";
            else
                $sql = "ALTER TABLE {$table} ADD CONSTRAINT {$name} UNIQUE ({$fields})";
            break;
        case 'primary':
            if ($drop)
                $sql = "ALTER TABLE {$table} DROP PRIMARY KEY";
            else
                $sql = "ALTER TABLE {$table} ADD CONSTRAINT {$name} PRIMARY KEY ({$fields})";
            break;
        case 'foreign':
            if ($drop)
                $sql = "ALTER TABLE {$table} DROP FOREIGN KEY ({$fields})";
            else
                $sql = "ALTER TABLE {$table} ADD CONSTRAINT {$name}  FOREIGN KEY ({$fields}) REFERENCES {$foreignTable}({$foreignfields})";
            break;
        case 'fulltext':
            if ($this->full_text_indexing_enabled() && $drop)
                $sql = "DROP FULLTEXT INDEX ON {$table}";
            elseif ($this->full_text_indexing_enabled()) {
                $catalog_name="sugar_fts_catalog";
                if ( isset($index['catalog_name']) && $index['catalog_name'] != 'default')
                    $catalog_name = $index['catalog_name'];

                $language = "Language 1033";
                if (isset($index['language']) && !empty($index['language']))
                    $language = "Language " . $index['language'];
                
                $key_index = $index['key_index'];

                $change_tracking = "auto";
                if (isset($index['change_tracking']) && !empty($index['change_tracking']))
                    $change_tracking = $index['change_tracking'];
                
                $columns[] = " CREATE FULLTEXT INDEX ON $table ($fields $language) KEY INDEX $key_index ON $catalog_name WITH CHANGE_TRACKING $change_tracking" ;
            }
            break;
        }
        return $sql;
    }

    /**
     * @see DBHelper::number_of_columns()
     */
    public function number_of_columns(
        $table_name
        ) 
    {
        $def_query = <<<EOSQL
SELECT count(*) as cols 
    FROM sys.columns col join sys.types col_type 
        on col.user_type_id=col_type.user_type_id 
    where col.object_id = (
        select object_id(sys.schemas.name + '.' + sys.tables.name)
            from sys.tables join sys.schemas 
                on sys.schemas.schema_id = sys.tables.schema_id
            where sys.tables.name='$table_name'
        )
EOSQL;
        /**
         * @TODO test the similarities of the above the query against all system tables vs the query below against
         * the information_schema view in terms of results and efficiency. suspician is provided the two produce
         * the same information the latter will be slightly faster.
         * <code>
         * <?php
         * $def_query = "SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='$table_name'";
         * ?>
         * </code>
         */

        $result = $this->db->query($def_query);
        $row    = $this->db->fetchByAssoc($result);
        if (!empty($row)) {
            return $row['cols'];
        }
        return 0;
    }

    /**
     * Returns true if Full Text Search is installed
     *
     * @return bool
     */
    protected function full_text_indexing_installed() 
    {
        $ftsChckRes = $this->db->query(
            "SELECT FULLTEXTSERVICEPROPERTY('IsFulltextInstalled') as fts");
        $row = $this->db->fetchByAssoc($ftsChckRes);

        return (isset($row) && isset($row['fts']) && ($row['fts'] == 1 || $row['fts'] == '1'));
    }

    /**
     * @see DBHelper::full_text_indexing_enabled()
     */
    protected function full_text_indexing_enabled(
        $dbname = null
        ) 
    {
        // check to see if we already have install setting in session
    	if(!isset($_SESSION['IsFulltextInstalled']))
            $_SESSION['IsFulltextInstalled'] = $this->full_text_indexing_installed();
        
        // check to see if FTS Indexing service is installed
        if(empty($_SESSION['IsFulltextInstalled']) 
                || $_SESSION['IsFulltextInstalled'] === false)
            return false;

        // grab the dbname if it was not passed through
		if (empty($dbname)) {
			global $sugar_config;
			$dbname = $sugar_config['dbconfig']['db_name'];
		}
        //we already know that Indexing service is installed, now check
        //to see if it is enabled
		$res = $this->db->query(
            "SELECT DATABASEPROPERTY('$dbname', 'IsFulltextEnabled') ftext");
		$row = $GLOBALS['db']->fetchByAssoc($res);
        
        return (isset($row['ftext']) && $row['ftext'] == 1);
	}

    /**
     * Creates default full text catalog
     */
	public function create_default_full_text_catalog() 
    {
		if ($this->full_text_indexing_enabled()) {
            $GLOBALS['log']->debug('Creating the default catalog for full-text indexing, sugar_fts_catalog');
			
            //drop catalog if exists.
			$ret = $this->db->query("
                if not exists(
                    select * 
                        from sys.fulltext_catalogs 
                        where name ='sugar_fts_catalog'
                        ) 
                CREATE FULLTEXT CATALOG sugar_fts_catalog");

			if (empty($ret)) {
				$GLOBALS['log']->error('Error creating default full-text catalog, sugar_fts_catalog');
			}
		}
	}

    /**
     * Function returns name of the constraint automatically generated by sql-server.
     * We request this for default, primary key, required
     *
     * @param  string $table
     * @param  string $column
     * @return string 
     */
	private function get_field_default_constraint_name(
        $table, 
        $column = null
        ) 
    {
        static $results = array();
        
        if ( empty($column) && isset($results[$table]) )
            return $results[$table];
        
        $query = <<<EOQ
select s.name, o.name, c.name dtrt, d.name ctrt
    from sys.default_constraints as d
        join sys.objects as o
            on o.object_id = d.parent_object_id
        join sys.columns as c
            on c.object_id = o.object_id and c.column_id = d.parent_column_id
        join sys.schemas as s
            on s.schema_id = o.schema_id
    where o.name = '$table'
EOQ;
        if ( !empty($column) )
            $query .= " and c.name = '$column'";
        $res = $this->db->query($query);
        if ( !empty($column) ) {
            $row = $this->db->fetchByAssoc($res);
            if (!empty($row)) 
                return $row['ctrt'];
        }
        else {
            $returnResult = array();
            while ( $row = $this->db->fetchByAssoc($res) )
                $returnResult[$row['dtrt']] = $row['ctrt'];
            $results[$table] = $returnResult;
            return $returnResult;
        }
		
        return null;
	}
    
    /**
     * @see DBHelper::massageFieldDef()
     */
    public function massageFieldDef(
        &$fieldDef,
        $tablename
        )
    {
        parent::massageFieldDef($fieldDef,$tablename);
        
        if ($fieldDef['type'] == 'int')
            $fieldDef['len'] = '4';
        if ($fieldDef['type'] == 'bit' && empty($fieldDef['len']) )
            $fieldDef['len'] = '1';
		if ($fieldDef['type'] == 'bool' && empty($fieldDef['len']) )
            $fieldDef['len'] = '1';
        if ($fieldDef['type'] == 'float' && empty($fieldDef['len']) )
            $fieldDef['len'] = '8';
        if ($fieldDef['type'] == 'varchar' && empty($fieldDef['len']) )
            $fieldDef['len'] = '255';
		if ($fieldDef['type'] == 'nvarchar' && empty($fieldDef['len']) )
            $fieldDef['len'] = '255';
        if ($fieldDef['type'] == 'bit' && empty($fieldDef['default']) )
            $fieldDef['default'] = '0';
		if ($fieldDef['type'] == 'bool' && empty($fieldDef['default']) )
            $fieldDef['default'] = '0';
        if ($fieldDef['type'] == 'image' && empty($fieldDef['len']) )
            $fieldDef['len'] = '2147483647';
        if ($fieldDef['type'] == 'ntext' && empty($fieldDef['len']) )
            $fieldDef['len'] = '2147483646';
        if ($fieldDef['type'] == 'smallint' && empty($fieldDef['len']) )
            $fieldDef['len'] = '2';
		if (isset($fieldDef['required']) && $fieldDef['required'] && !isset($fieldDef['default']) )
			$fieldDef['default'] = '';
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
    	//Bug 25814
		if(isset($fieldDef['name'])){
			$name = $fieldDef['name'];
	        $type = $this->getFieldType($fieldDef);
	        $colType = $this->getColumnType($type, $name, $table);
	    	if(stristr($colType, 'decimal')){
				$fieldDef['len'] = isset($fieldDef['len'])? min($fieldDef['len'],38) : 38;
			}
			//bug: 39690 float(8) is interpreted as real and this generates a diff when doing repair
			if(stristr($colType, 'float')){
				if(isset($fieldDef['len']) && $fieldDef['len'] == 8){
					unset($fieldDef['len']);
				}
			}
		}
		
		$ref = parent::oneColumnSQLRep($fieldDef, $ignoreRequired, $table, true);
        
		// Bug 24307 - Don't add precision for float fields.
		if ( stristr($ref['colType'],'float') )
			$ref['colType'] = preg_replace('/(,\d+)/','',$ref['colType']);
            
        if ( $return_as_array )
            return $ref;
        else
            return "{$ref['name']} {$ref['colType']} {$ref['default']} {$ref['required']} {$ref['auto_increment']}";
	}
	
    /**
     * Saves changes to module's audit table
     *
     * @param object $bean    Sugarbean instance
     * @param array  $changes changes
     * @see DBHelper::getDataChanges()
     */
    public function save_audit_records(
        SugarBean &$bean,
        &$changes
        )
	{
		//Bug 25078 fixed by Martin Hu: sqlserver haven't 'date' type, trim extra "00:00:00"
		if($changes['data_type'] == 'date'){
			$changes['before'] = str_replace(' 00:00:00','',$changes['before']);
		}
		parent::save_audit_records($bean,$changes);
	}
}
?>