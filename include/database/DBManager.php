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

* Description: This file handles the Data base functionality for the application.
* It acts as the DB abstraction layer for the application. It depends on helper classes
* which generate the necessary SQL. This sql is then passed to PEAR DB classes.
* The helper class is chosen in DBManagerFactory, which is driven by 'db_type' in 'dbconfig' under config.php.
*
* All the functions in this class will work with any bean which implements the meta interface.
* The passed bean is passed to helper class which uses these functions to generate correct sql.
*
* The meta interface has the following functions:
* getTableName()	        	Returns table name of the object.
* getFieldDefinitions()	    	Returns a collection of field definitions in order.
* getFieldDefintion(name)		Return field definition for the field.
* getFieldValue(name)	    	Returns the value of the field identified by name.
*                           	If the field is not set, the function will return boolean FALSE.
* getPrimaryFieldDefinition()	Returns the field definition for primary key
*
* The field definition is an array with the following keys:
*
* name 		This represents name of the field. This is a required field.
* type 		This represents type of the field. This is a required field and valid values are:
*           �   int
*           �   long
*           �   varchar
*           �   text
*           �   date
*           �   datetime
*           �   double
*           �   float
*           �   uint
*           �   ulong
*           �   time
*           �   short
*           �   enum
* length    This is used only when the type is varchar and denotes the length of the string.
*           The max value is 255.
* enumvals  This is a list of valid values for an enum separated by "|".
*           It is used only if the type is �enum�;
* required  This field dictates whether it is a required value.
*           The default value is �FALSE�.
* isPrimary This field identifies the primary key of the table.
*           If none of the fields have this flag set to �TRUE�,
*           the first field definition is assume to be the primary key.
*           Default value for this field is �FALSE�.
* default   This field sets the default value for the field definition.
*
*
* Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
* All Rights Reserved.
* Contributor(s): ______________________________________..
********************************************************************************/




abstract class DBManager
{
    /**
     * DBHelper object instance for this class
     */
    public $helper;

    /**
     * Name of database table we are dealing with
     */
    protected $tableName;

    /**
     * Name of database
     */
    public $database = null;

    /**
     * Indicates whether we should die when we get an error from the DB
     */
    protected $dieOnError = false;

    /**
     * Indicates whether we should html encode the results from a query by default
     */
    protected $encode = true;

    /**
     * Records the execution time of the last query
     */
    protected $query_time = 0;

    /**
     * Number of the last row fetched from the query result set
     */
    protected $lastmysqlrow = -1;

    /**
     * Last error message from the DB backend
     */
    protected $last_error = '';

    /**
     * Registry of available result sets
     */
    protected $lastResult = array();

    /**
     * Current query count
     */
    private static $queryCount = 0;

    /**
     * Query threshold limit
     */
    private static $queryLimit = 0;

    /**
     * Array of common backend functions and what the PHP they map to is
     */
    protected $backendFunctions = array();

    /**
     * Array of prepared statements and their correspoding parsed tokens
     */
    protected $preparedTokens = array();

    /**
     * Wrapper for those trying to access the private and protected class members directly
     */
    public function __get($p)
    {
        $GLOBALS['log']->info('call to DBManagerFactory::$'.$p.' is deprecated');
        return $this->$p;
    }

    public function __construct()
    {
    }

    /**
     * Returns the current tablename
     *
     * @return string
     */
    public function getTableName()
    {
        return $this->tableName;
    }

    /**
     * Returns the current database handle
     *
     * @return resource
     */
    public function getDatabase()
    {
        $this->checkConnection();
        return $this->database;
    }

    /**
     * Returns this instance's DBHelper
     *
     * @return object DBHelper instance
     */
    public function getHelper()
    {
        if ( !($this->helper instanceof DBHelper) ) {
            global $sugar_config;

            switch ( $sugar_config['dbconfig']['db_type'] ) {
            case "mysql":
                $my_db_helper = 'MysqlHelper';
                if ( (!isset($sugar_config['mysqli_disabled'])
                            || $sugar_config['mysqli_disabled'] == false)
                        && function_exists('mysqli_connect') )
                    $my_db_helper = 'MysqliHelper';
                break;
            case "mssql":
                if ( function_exists('sqlsrv_connect')
                        && (empty($config['db_mssql_force_driver']) || $config['db_mssql_force_driver'] == 'sqlsrv' ))
                    $my_db_helper = 'SqlsrvHelper';
                elseif (is_freetds()
                        && (empty($config['db_mssql_force_driver']) || $config['db_mssql_force_driver'] == 'freetds' ))
                    $my_db_helper = 'FreeTDSHelper';
                else
                    $my_db_helper = 'MssqlHelper';
                break;
            default:
                $my_db_helper = 'MysqlHelper';
            }
            $GLOBALS['log']->info("using $my_db_helper DBHelper backend");
            require_once("include/database/{$my_db_helper}.php");
            $this->helper = new $my_db_helper();
            $this->helper->db = $this;
        }

        return $this->helper;
    }

    /**
     * Checks for database not being connected
     *
     * @param  string $msg        message to prepend to the error message
     * @param  bool   $dieOnError true if we want to die immediately on error
     * @return bool
     */
    public function checkError(
        $msg = '',
        $dieOnError = false)
    {
    	$userMsg = inDeveloperMode()?"$msg: ":"";

        if (!isset($this->database)) {
            $GLOBALS['log']->error("Database Is Not Connected");
            if($this->dieOnError || $dieOnError)
                sugar_die ($userMsg."Database Is Not Connected");
            else
                $this->last_error = $userMsg."Database Is Not Connected";
            return true;
        }
        return false;
    }

    /**
     * This method is called by every method that runs a query.
     * If slow query dumping is turned on and the query time is beyond
     * the time limit, we will log the query. This function may do
     * additional reporting or log in a different area in the future.
     *
     * @param  string  $query query to log
     * @return boolean true if the query was logged, false otherwise
     */
    protected function dump_slow_queries(
        $query
        )
    {
        global $sugar_config;

        $do_the_dump = isset($sugar_config['dump_slow_queries'])
            ? $sugar_config['dump_slow_queries'] : false;
        $slow_query_time_msec = isset($sugar_config['slow_query_time_msec'])
            ? $sugar_config['slow_query_time_msec'] : 5000;

        if($do_the_dump) {
            if($slow_query_time_msec < ($this->query_time * 1000)) {
                // Then log both the query and the query time
                $GLOBALS['log']->fatal('Slow Query (time:'.$this->query_time."\n".$query);
                return true;
            }
        }
        return false;
    }

   /**
    * Scans order by to ensure that any field being ordered by is.
    *
    * It will throw a warning error to the log file - fatal if slow query logging is enabled
    *
    * @param  string $sql         query to be run
    * @param  bool   $object_name optional, object to look up indices in
    * @return bool   true if an index is found false otherwise
    */
   protected function checkQuery(
       $sql,
       $object_name = false
       )
   {
       $match = array();
       preg_match_all("'.* FROM ([^ ]*).* ORDER BY (.*)'is", $sql, $match);
       $indices = false;
       if (!empty($match[1][0]))
           $table = $match[1][0];
       else
           return false;

       if (!empty($object_name) && !empty($GLOBALS['dictionary'][$object_name]))
           $indices = $GLOBALS['dictionary'][$object_name]['indices'];

       if (empty($indices)) {
           foreach ( $GLOBALS['dictionary'] as $current ) {
               if ($current['table'] == $table){
                   $indices = $current['indices'];
                   break;
               }
           }
       }
       if (empty($indices)) {
           $GLOBALS['log']->warn('CHECK QUERY: Could not find index definitions for table ' . $table);
           return false;
       }
       if (!empty($match[2][0])) {
           $orderBys = explode(' ', $match[2][0]);
           foreach ($orderBys as $orderBy){
               $orderBy = trim($orderBy);
               if (empty($orderBy))
                   continue;
               $orderBy = strtolower($orderBy);
               if ($orderBy == 'asc' || $orderBy == 'desc')
                   continue;

               $orderBy = str_replace(array($table . '.', ','), '', $orderBy);

               foreach ($indices as $index)
                   if (empty($index['db']) || $index['db'] == $this->dbType)
                       foreach ($index['fields'] as $field)
                           if ($field == $orderBy)
                               return true;

               $warning = 'Missing Index For Order By Table: ' . $table . ' Order By:' . $orderBy ;
               if (!empty($GLOBALS['sugar_config']['dump_slow_queries']))
                   $GLOBALS['log']->fatal('CHECK QUERY:' .$warning);
               else
                   $GLOBALS['log']->warn('CHECK QUERY:' .$warning);

           }
       }
       return false;
    }

    /**
     * Returns the time the last query took to execute
     *
     * @return int
     */
    public function getQueryTime()
    {
        return $this->query_time;
    }

    /**
     * Checks the current connection; if it is not connected then reconnect
     */
    public function checkConnection()
    {
        $this->last_error = '';
        if (!isset($this->database))
            $this->connect();
    }

    /**
     * Sets the dieOnError value
     *
     * @param bool $value
     */
    public function setDieOnError(
        $value
        )
    {
        $this->dieOnError = $value;
    }

    /**
	 * Implements a generic insert for any bean.
	 *
	 * @param object $bean SugarBean instance
	 */
    public function insert(
        SugarBean $bean
        )
    {
        $sql = $this->getHelper()->insertSQL($bean);
        $this->tableName = $bean->getTableName();
        $msg = "Error inserting into table: ".$this->tableName;
        $this->query($sql,true,$msg);
    }

    /**
     * Implements a generic update for any bean
     *
     * @param object $bean  Sugarbean instance
     * @param array  $where values with the keys as names of fields.
     * If we want to pass multiple values for a name, pass it as an array
     * If where is not passed, it defaults to id of table
     */
    public function update(
        SugarBean $bean,
        array $where = array()
        )
    {
        $sql = $this->getHelper()->updateSQL($bean, $where);
        $this->tableName = $bean->getTableName();
        $msg = "Error updating table: ".$this->tableName. ":";
        $this->query($sql,true,$msg);
    }

    /**
	 * Implements a generic delete for any bean identified by id
     *
     * @param object $bean  Sugarbean instance
     * @param array  $where values with the keys as names of fields.
	 * If we want to pass multiple values for a name, pass it as an array
	 * If where is not passed, it defaults to id of table
	 */
    public function delete(
        SugarBean $bean,
        array $where = array()
        )
    {
        $sql = $this->getHelper()->deleteSQL($bean, $where);
        $this->tableName = $bean->getTableName();
        $msg = "Error deleting from table: ".$this->tableName. ":";
        $this->query($sql,true,$msg);
    }

    /**
     * Implements a generic retrieve for any bean identified by id
     *
     * If we want to pass multiple values for a name, pass it as an array
     * If where is not passed, it defaults to id of table
     *
     * @param  object   $bean  Sugarbean instance
     * @param  array    $where values with the keys as names of fields.
     * @return resource result from the query
     */
    public function retrieve(
        SugarBean $bean,
        array $where = array()
        )
    {
        $sql = $this->getHelper()->retrieveSQL($bean, $where);
        $this->tableName = $bean->getTableName();
        $msg = "Error retriving values from table:".$this->tableName. ":";
        return $this->query($sql,true,$msg);
    }

    /**
     * Implements a generic retrieve for a collection of beans.
     *
     * These beans will be joined in the sql by the key attribute of field defs.
     * Currently, this function does support outer joins.
     *
     * @param  array $beans Sugarbean instance(s)
     * @param  array $cols  columns to be returned with the keys as names of bean as identified by
     * get_class of bean. Values of this array is the array of fieldDefs to be returned for a bean.
     * If an empty array is passed, all columns are selected.
     * @param  array $where  values with the keys as names of bean as identified by get_class of bean
     * Each value at the first level is an array of values for that bean identified by name of fields.
     * If we want to pass multiple values for a name, pass it as an array
     * If where is not passed, all the rows will be returned.
     * @return resource
     */
    public function retrieveView(
        array $beans,
        array $cols = array(),
        array $where = array()
        )
    {
        $sql = $this->getHelper()->retrieveViewSQL($beans, $cols, $where);
        $this->tableName = "View Collection"; // just use this string for msg
        $msg = "Error retriving values from table:".$this->tableName. ":";
        $this->query($sql,true,$msg);
    }


    /**
	 * Implements creation of a db table for a bean.
	 *
     * @param object $bean  Sugarbean instance
     */
    public function createTable(
        SugarBean $bean
        )
    {
        $sql = $this->getHelper()->createTableSQL($bean);
        $this->tableName = $bean->getTableName();
        $msg = "Error creating table: ".$this->tableName. ":";
        $this->query($sql,true,$msg);
    }

    /**
     * Implements creation of a db table
     *
     * @param string $tablename
     * @param array  $fieldDefs
     * @param array  $indices
     * @param string $engine    MySQL engine to use
     */
    public function createTableParams(
        $tablename,
        $fieldDefs,
        $indices,
        $engine = null
        )
    {
        if (!empty($fieldDefs)) {
            $sql = $this->getHelper()
                        ->createTableSQLParams($tablename, $fieldDefs, $indices,$engine);
            $this->tableName = $tablename;
            if ($sql) {
                $msg = "Error creating table: ".$this->tableName. ":";
                $this->query($sql,true,$msg);
            }
        }
    }

    /**
	 * Implements repair of a db table for a bean.
	 *
	 * @param  object $bean    SugarBean instance
     * @param  bool   $execute true if we want the action to take place, false if we just want the sql returned
	 * @return string SQL statement or empty string, depending upon $execute
	 */
    public function repairTable(SugarBean $bean, $execute = true)
    {
        $indices   = $bean->getIndices();
        $fielddefs = $bean->getFieldDefinitions();
        $tablename = $bean->getTableName();

		//Clean the indicies to prevent duplicate definitions
		$new_Indecies = array();
		foreach($indices as $ind_def){
			$new_Indecies[$ind_def['name']] = $ind_def;
		}
		//jc: added this for beans that do not actually have a table, namely
		//ForecastOpportunities
        if($tablename == 'does_not_exist' || $tablename == '')
        	return '';

        global $dictionary;
        $engine=null;
        if (isset($dictionary[$bean->getObjectName()]['engine']) && !empty($dictionary[$bean->getObjectName()]['engine']) )
            $engine = $dictionary[$bean->getObjectName()]['engine'];

        return $this->repairTableParams($tablename, $fielddefs,$new_Indecies,$execute,$engine);
    }

    /**
     * Builds the SQL commands that repair a table structure
     *
     * @param  string $tablename
     * @param  array  $fielddefs
     * @param  array  $indices
     * @param  bool   $execute   optional, true if we want the queries executed instead of returned
     * @param  string $engine    optional, MySQL engine
     */
    public function repairTableParams(
        $tablename,
        $fielddefs,
        $indices,
        $execute = true,
        $engine = null
        )
    { 
        global $table_descriptions;

		//jc: had a bug when running the repair if the tablename is blank the repair will
		//fail when it tries to create a repair table
        if ($tablename == '')
            return '';
        if (empty($fielddefs))
            return '';

        //if the table does not exist create it and we are done
        $sql = "/* Table : $tablename */\n";
        if (!$this->tableExists($tablename)){

            $createtablesql = $this->getHelper()
                                    ->createTableSQLParams($tablename,$fielddefs,$indices,$engine);
            if($execute && $createtablesql){
                $this->createTableParams($tablename,$fielddefs,$indices,$engine);
            }

            $sql .= "/* MISSING TABLE: {$tablename} */\n";
            $sql .= $createtablesql . "\n";
            return $sql;
        }

        $compareFieldDefs = $this->getHelper()->get_columns($tablename);
        $compareIndices = $this->getHelper()->get_indices($tablename);

        $take_action = false;

        // do column comparisions
        $sql .=	"/*COLUMNS*/\n";
        foreach ($fielddefs as $value) {
            if (isset($value['source']) && $value['source'] != 'db')
                continue;

            $name = $value['name'];
            // add or fix the field defs per what the DB is expected to give us back
            $this->getHelper()->massageFieldDef($value,$tablename);

            $ignorerequired=false;

			//Do not track requiredness in the DB, auto_increment, ID, and deleted fields are always required in the DB, so don't force those
            if (empty($value['auto_increment']) && (empty($value['type']) || $value['type'] != 'id')
                    && (empty($value['dbType']) || $value['dbType'] != 'id')
					&& (empty($value['name']) || ($value['name'] != 'id' && $value['name'] != 'deleted'))
			){
			    $value['required'] = false;
			}
			//Should match the conditions in DBHelper::oneColumnSQLRep for DB required fields, type='id' fields will sometimes
			//come into this function as 'type' = 'char', 'dbType' = 'id' without required set in $value. Assume they are correct and leave them alone.
			else if (($name == 'id' || $value['type'] == 'id' || (isset($value['dbType']) && $value['dbType'] == 'id'))
                && (!isset($value['required']) && isset($compareFieldDefs[$name]['required'])))
			{
				$value['required'] = $compareFieldDefs[$name]['required'];
			}

            if ( !isset($compareFieldDefs[$name]) ) {
                // ok we need this field lets create it
                $sql .=	"/*MISSING IN DATABASE - $name -  ROW*/\n";
                $sql .= $this->getHelper()->addColumnSQL($tablename, $value) .  "\n";
                if ($execute)
                    $this->addColumn($tablename, $value);
                $take_action = true;
            }
            elseif ( !$this->compareVarDefs($compareFieldDefs[$name],$value)) {
                //fields are different lets alter it
                $sql .=	"/*MISMATCH WITH DATABASE - $name -  ROW ";
                foreach($compareFieldDefs[$name] as $rKey => $rValue)
                    $sql .=	"[$rKey] => '$rValue'  ";
                $sql .=	"*/\n";
                $sql .=	"/* VARDEF - $name -  ROW";
                foreach($value as $rKey => $rValue)
                    $sql .=	"[$rKey] => '$rValue'  ";
                $sql .=	"*/\n";

                //jc: oracle will complain if you try to execute a statement that sets a column to (not) null
                //when it is already (not) null
                if ( isset($value['isnull']) && isset($compareFieldDefs[$name]['isnull']) ) {
                    if ($value['isnull'] === $compareFieldDefs[$name]['isnull']) {
                        unset($value['required']);
                        $ignorerequired=true;
                    }
                }

                //dwheeler: Once a column has been defined as null, we cannot try to force it back to !null
                if ((isset($value['required']) && ($value['required'] === true || $value['required'] == 'true' || $value['required'] === 1))
				    && (empty($compareFieldDefs[$name]['required']) || $compareFieldDefs[$name]['required'] != 'true'))
			    {
				    $ignorerequired = true;
			    }

                $sql .= $this->getHelper()->alterColumnSQL($tablename, $value,$ignorerequired) .  "\n";
                if($execute){
                    $this->alterColumn($tablename, $value,$ignorerequired);
                }
                $take_action = true;
            }
        }
        
        // do index comparisions
        $sql .=	"/* INDEXES */\n";
        $correctedIndexs = array();
        foreach ($indices as $value) {
            if (isset($value['source']) && $value['source'] != 'db')
                continue;

            $name = $value['name'];

			//Don't attempt to fix the same index twice in one pass;
			if (isset($correctedIndexs[$name]))
				continue;

            //don't bother checking primary nothing we can do about them
            if (isset($value['type']) && $value['type'] == 'primary')
                continue;

            //database helpers do not know how to handle full text indices
            if ($value['type']=='fulltext')
                continue;

            if ( in_array($value['type'],array('alternate_key','foreign')) )
                $value['type'] = 'index';

            if ( !isset($compareIndices[$name]) ) {
                // ok we need this field lets create it
                $sql .=	 "/*MISSING INDEX IN DATABASE - $name -{$value['type']}  ROW */\n";
                $sql .= $this->addIndexes($tablename,array($value), $execute) .  "\n";
                $take_action = true;
				$correctedIndexs[$name] = true;
            }
            elseif ( !$this->compareVarDefs($compareIndices[$name],$value) ) {
                // fields are different lets alter it
                $sql .=	"/*INDEX MISMATCH WITH DATABASE - $name -  ROW ";
                foreach ($compareIndices[$name] as $n1 => $t1) {
                    $sql .=	 "<$n1>";
                    if ( $n1 == 'fields' )
                        foreach($t1 as $rKey => $rValue)
                            $sql .= "[$rKey] => '$rValue'  ";
                    else
                        $sql .= " $t1 ";
                }
                $sql .=	"*/\n";
                $sql .=	"/* VARDEF - $name -  ROW";
                foreach ($value as $n1 => $t1) {
                    $sql .=	"<$n1>";
                    if ( $n1 == 'fields' )
                        foreach ($t1 as $rKey => $rValue)
                            $sql .=	"[$rKey] => '$rValue'  ";
                    else
                        $sql .= " $t1 ";
                }
                $sql .=	"*/\n";
                $sql .= $this->modifyIndexes($tablename,array($value), $execute) .  "\n";
                $take_action = true;
				$correctedIndexs[$name] = true;
            }
        }
        
        return ($take_action === true) ? $sql : "";
    }

    /**
     * Compares two vardefs
     *
     * @param  array  $fielddef1 This is from the database
     * @param  array  $fielddef2 This is from the vardef
     * @return bool   true if they match, false if they don't
     */
    public function compareVarDefs(
        $fielddef1,
        $fielddef2
        )
    {
        foreach ( $fielddef1 as $key => $value ) {
            if ( $key == 'name' && ( strtolower($fielddef1[$key]) == strtolower($fielddef2[$key]) ) )
                continue;
            if ( isset($fielddef2[$key]) && $fielddef1[$key] == $fielddef2[$key] )
                continue;
            return false;
        }
        
        return true;
    }

    /**
     * Compare a field in two tables
     *
     * @param  string $name   field name
     * @param  string $table1
     * @param  string $table2
     * @return array  array with keys 'msg','table1','table2'
     */
    public function compareFieldInTables(
        $name,
        $table1,
        $table2
        )
    {
        $row1 = $this->describeField($name, $table1);
        $row2 = $this->describeField($name, $table2);
        $returnArray = array(
            'table1' => $row1,
            'table2' => $row2,
            'msg'    => 'error',
            );

        $ignore_filter = array('Key'=>1);
        if ($row1) {
            if (!$row2) {
                // Exists on table1 but not table2
                $returnArray['msg'] = 'not_exists_table2';
            }
            else {
                if (sizeof($row1) != sizeof($row2)) {
                    $returnArray['msg'] = 'no_match';
                }
                else {
                    $returnArray['msg'] = 'match';
                    foreach($row1 as $key => $value){
                        //ignore keys when checking we will check them when we do the index check
                        if( !isset($ignore_filter[$key]) && $row1[$key] !== $row2[$key]){
                            $returnArray['msg'] = 'no_match';
                        }
                    }
                }
            }
        }
        else {
            $returnArray['msg'] = 'not_exists_table1';
        }

        return $returnArray;
    }

    /**
     * Compare an index in two different tables
     *
     * @param  string $name   index name
     * @param  string $table1
     * @param  string $table2
     * @return array  array with keys 'msg','table1','table2'
     */
    public function compareIndexInTables(
        $name,
        $table1,
        $table2
        )
    {
        $row1 = $this->describeIndex($name, $table1);
        $row2 = $this->describeIndex($name, $table2);
        $returnArray = array(
            'table1' => $row1,
            'table2' => $row2,
            'msg'    => 'error',
            );
        $ignore_filter = array('Table'=>1, 'Seq_in_index'=>1,'Cardinality'=>1, 'Sub_part'=>1, 'Packed'=>1, 'Comment'=>1);

        if ($row1) {
            if (!$row2) {
                //Exists on table1 but not table2
                $returnArray['msg'] = 'not_exists_table2';
            }
            else {
                if (sizeof($row1) != sizeof($row2)) {
                    $returnArray['msg'] = 'no_match';
                }
                else {
                    $returnArray['msg'] = 'match';
                    foreach ($row1 as $fname => $fvalue) {
                        if (!isset($row2[$fname])) {
                            $returnArray['msg'] = 'no_match';
                        }
                        foreach($fvalue as $key => $value) {
                            //ignore keys when checking we will check them when we do the index check
                            if(!isset($ignore_filter[$key]) && $row1[$fname][$key] != $row2[$fname][$key]){
                                $returnArray['msg'] = 'no_match';
                            }
                        }
                    }
                }
            }
        }
        else {
            $returnArray['msg'] = 'not_exists_table1';
        }

        return $returnArray;
    }


    /**
	 * Creates an index identified by name on the given fields.
	 *
     * @param object $bean      SugarBean instance
     * @param array  $fieldDefs
     * @param string $name      index name
     * @param bool   $unique    optional, true if we want to create an unique index
	 */
    public function createIndex(
        SugarBean $bean,
        $fieldDefs,
        $name,
        $unique = true
        )
    {
        $sql = $this->getHelper()->createIndexSQL($bean, $fieldDefs, $name, $unique);
        $this->tableName = $bean->getTableName();
        $msg = "Error creating index $name on table: ".$this->tableName. ":";
        $this->query($sql,true,$msg);
    }

    /**
     * Adds a new indexes
     *
     * @param  string $tablename
     * @param  array  $indexes   indexes to add
     * @param  bool   $execute   true if we want to execute the returned sql statement
     * @return string SQL statement
     */
    public function addIndexes(
        $tablename,
        $indexes,
        $execute = true
        )
    {
        $alters = $this->getHelper()->keysSQL($indexes,true,'ADD');
        $sql = "ALTER TABLE $tablename $alters";
        if ($execute)
            $this->query($sql);
        return $sql;
    }

    /**
     * Drops indexes
     *
     * @param  string $tablename
     * @param  array  $indexes   indexes to drop
     * @param  bool   $execute   true if we want to execute the returned sql statement
     * @return string SQL statement
     */
    public function dropIndexes(
        $tablename,
        $indexes,
        $execute = true
        )
    {
        $sql = '';
        foreach ($indexes as $index) {
            $name =$index['name'];
            if($execute)
                unset($GLOBALS['table_descriptions'][$tablename]['indexes'][$name]);
            if ($index['type'] == 'primary')
                $name = 'PRIMARY KEY';
            else
                $name = "INDEX $name";
            if (empty($sql))
                $sql .= " DROP $name ";
            else
                $sql .= ", DROP $name ";
        }
        if (!empty($sql)) {
            $sql = "ALTER TABLE $tablename $sql";
            if($execute)
                $this->query($sql);
        }
        return $sql;
    }

    /**
     * Modifies indexes
     *
     * @param  string $tablename
     * @param  array  $indexes   indexes to modify
     * @param  bool   $execute   true if we want to execute the returned sql statement
     * @return string SQL statement
     */
    public function modifyIndexes(
        $tablename,
        $indexes,
        $execute = true
        )
    {
        return $this->dropIndexes($tablename, $indexes, $execute)."\n".
            $this->addIndexes($tablename, $indexes, $execute);
    }

    /**
	 * Adds a column to table identified by field def.
	 *
	 * @param string $tablename
	 * @param array  $fieldDefs
	 */
    public function addColumn(
        $tablename,
        $fieldDefs
        )
    {
        $this->tableName = $tablename;
        $sql = $this->getHelper()->addColumnSQL($this->tableName, $fieldDefs);
        if ($this->getHelper()->isFieldArray($fieldDefs)){
            foreach ($fieldDefs as $fieldDef) $columns[] = $fieldDef['name'];
            $columns = implode(",", $columns);
        }
        else
            $columns = $fieldDefs['name'];

        $msg = "Error adding column(s) ".$columns." on table: ".$this->tableName. ":";
        $this->query($sql,true,$msg);
    }

    /**
	 * Alters old column identified by oldFieldDef to new fieldDef.
	 *
	 * @param string $tablename
     * @param array  $newFieldDef
     * @param bool   $ignoreRequired optional, true if we are ignoring this being a required field
	 */
    public function alterColumn(
        $tablename,
        $newFieldDef,
        $ignoreRequired = false
        )
    {
        $this->tableName = $tablename;
        $sql = $this->getHelper()->alterColumnSQL($this->tableName, $newFieldDef,$ignoreRequired);
        if ($this->getHelper()->isFieldArray($newFieldDef)){
            foreach ($newFieldDef as $fieldDef) {
                unset($GLOBALS['table_descriptions'][$tablename][$fieldDef['name']]);
                $columns[] = $fieldDef['name'];
            }
            $columns = implode(",", $columns);
        }
        else {
            unset($GLOBALS['table_descriptions'][$tablename][$newFieldDef['name']]);
            $columns = $newFieldDef['name'];
        }

        $msg = "Error altering column(s) ".$columns." on table: ".$this->tableName. ":";
        $this->query($sql,true,$msg);
    }

    /**
     * Drops the table associated with a bean
     *
     * @param object $bean SugarBean instance
     */
    public function dropTable(
        SugarBean $bean
        )
    {
        $this->tableName =  $bean->getTableName();
        $this->dropTableName( $this->tableName);
    }

    /**
     * Drops the table by name
     *
     * @param string $name SugarBean instance
     */
    public function dropTableName(
        $name
        )
    {
        $sql = $this->getHelper()->dropTableNameSQL($name);
        $msg = "Error dropping table ".$this->tableName. ":";
        $this->query($sql,true,$msg);
    }

    /**
     * Deletes a column identified by fieldDef.
     *
     * @param string $name      SugarBean instance
     * @param array  $fieldDefs
     */
    public function deleteColumn(
        SugarBean $bean,
        $fieldDefs
        )
    {
        $sql = $this->getHelper()->deleteColumnSQL($bean, $fieldDefs);
        $this->tableName = $bean->getTableName();
        $msg = "Error deleting column(s) ".$columns." on table: ".$this->tableName. ":";
        $this->query($sql,true,$msg);
    }

    /**
	 * Fetches all the rows for a select query. Returns FALSE if query failed and
	 * DB_OK for all other queries
     *
     * @deprecated
     *
     * @param  resource $result
     * @return array    All rows in result set
     */
    private function setResult(
        $result
        )
    {
        $GLOBALS['log']->info('call to DBManager::setResult() is deprecated');
        if (PEAR::isError($result) === true) {
            $GLOBALS['log']->error($msg);
            $result = FALSE;
        }
        elseif ($result != DB_OK) {
            // must be a result
            $GLOBALS['log']->fatal("setResult:".print_r($result,true));
            $row = array();
            $rows = array();
            while (ocifetchinto($result, $row, OCI_ASSOC|OCI_RETURN_NULLS|OCI_RETURN_LOBS)){
                $err = ocierror($result);
                if ($err == false) $rows[] = $row;
                else print_r($err);
            }
            $result = $rows;
        }
        $GLOBALS['log']->fatal("setResult: returning rows from setResult");
        return $result;
    }

    /**
     * Private function to handle most of the sql statements which go as queries
     *
     * @deprecated
     *
     * @param  string   $sql
     * @param  int      $start
     * @param  int      $count
     * @param  boolean  $dieOnError
     * @param  string   $msg
     * @return array    All rows in result set
     */
    public function executeLimitQuery(
        $query,
        $start,
        $count,
        $dieOnError = false,
        $msg = '')
    {
        $GLOBALS['log']->info('call to DBManager::executeLimitQuery() is deprecated');
        $result = $this->limitQuery($query,$start,$count, $dieOnError, $msg);
        return $this->setResult($result);
    }

    /**
     * Private function to handle most of the sql statements which go as queries
     *
     * @deprecated
     *
     * @param  string $query
     * @param  string $msg
     * @param  bool   $getRows
     * @return array  All rows in result set
	 */
    public function executeQuery(
        $query,
        $msg,
        $getRows = false
        )
    {
        $GLOBALS['log']->info('call to DBManager::executeQuery() is deprecated');
        $result = $this->query($query,true,$msg);
        if ($getRows)
            return $this->setResult($result);
        // dd not get rows. Simply go on.
	}

    /**
     * Given a db_type return the correct DBHelper
     *
     * @deprecated
     *
     * @param  string $db_type the type of database being used
     * @return object DBHelper instance corresponding to the db_type
    */
    private function configureHelper(
        $db_type
        )
    {
        $GLOBALS['log']->info('call to DBManager::configureHelper() is deprecated');
        global $sugar_config;

        $my_db_helper = 'MysqlHelper';
        if( $sugar_config['dbconfig']['db_type'] == "mysql" ) {
            if (!isset($sugar_config['mysqli_disabled']) or $sugar_config['mysqli_disabled']==false) {
                if (function_exists('mysqli_connect')) {
                    $my_db_helper = 'MysqliHelper';
                }
            }
        }

        if($db_type == "oci8" ){
        }else if($db_type == "mssql"){
            require_once('include/database/MssqlHelper.php');
            $my_db_helper = 'MssqlHelper';
        }
        if($my_db_helper == 'MysqlHelper'){
            require_once('include/database/MysqlHelper.php');
        }
        return new $my_db_helper();
    }

    /**
     * Generate a set of Insert statements based on the bean given
     *
     * @deprecated
     *
     * @param  object $bean         the bean from which table we will generate insert stmts
     * @param  string $select_query the query which will give us the set of objects we want to place into our insert statement
     * @param  int    $start        the first row to query
     * @param  int    $count        the number of rows to query
     * @param  string $table        the table to query from
     * @param  string $db_type      the client db type
     * @return string SQL insert statement
     */
	public function generateInsertSQL(
        SugarBean $bean,
        $select_query,
        $start,
        $count = -1,
        $table,
        $db_type,
        $is_related_query = false
        )
    {
        $GLOBALS['log']->info('call to DBManager::generateInsertSQL() is deprecated');
        global $sugar_config;

        $count_query = $bean->create_list_count_query($select_query);
		if(!empty($count_query))
		{
			// We have a count query.  Run it and get the results.
			$result = $this->query($count_query, true, "Error running count query for $this->object_name List: ");
			$assoc = $this->fetchByAssoc($result);
			if(!empty($assoc['c']))
			{
				$rows_found = $assoc['c'];
			}
		}
		if($count == -1){
			$count 	= $sugar_config['list_max_entries_per_page'];
		}
		$next_offset = $start + $count;

		$result = $this->limitQuery($select_query, $start, $count);
		$row_count = $this->getRowCount($result);
		// get basic insert
		$sql = "INSERT INTO ".$table;
		$custom_sql = "INSERT INTO ".$table."_cstm";

		// get field definitions
		$fields = $bean->getFieldDefinitions();
		$custom_fields = array();

		if($bean->hasCustomFields()){
			foreach ($fields as $fieldDef){
				if($fieldDef['source'] == 'custom_fields'){
					$custom_fields[$fieldDef['name']] = $fieldDef['name'];
				}
			}
			if(!empty($custom_fields)){
				$custom_fields['id_c'] = 'id_c';
				$id_field = array('name' => 'id_c', custom_type => 'id',);
				$fields[] = $id_field;
			}
		}

		// get column names and values
		$row_array = array();
		$columns = array();
		$cstm_row_array = array();
		$cstm_columns = array();
		$built_columns = false;
        //configure client helper
        $dbHelper = $this->configureHelper($db_type);
		while(($row = $this->fetchByAssoc($result)) != null)
		{
			$values = array();
			$cstm_values = array();
            if(!$is_related_query){
    			foreach ($fields as $fieldDef)
    			{
    				if(isset($fieldDef['source']) && $fieldDef['source'] != 'db' && $fieldDef['source'] != 'custom_fields') continue;
    				$val = $row[$fieldDef['name']];

    		   		//handle auto increment values here only need to do this on insert not create
               		if ($fieldDef['name'] == 'deleted'){
    		   			 $values['deleted'] = $val;
    		   			 if(!$built_columns){
               				$columns[] = 'deleted';
               			}
    		   		}
               		else
    		   		{
    		   			$type = $fieldDef['type'];
						if(!empty($fieldDef['custom_type'])){
							$type = $fieldDef['custom_type'];
						}
    		    		 // need to do some thing about types of values
						 if($db_type == 'mysql' && $val == '' && ($type == 'datetime' ||  $type == 'date' || $type == 'int' || $type == 'currency' || $type == 'decimal')){
							if(!empty($custom_fields[$fieldDef['name']]))
								$cstm_values[$fieldDef['name']] = 'null';
							else
						 		$values[$fieldDef['name']] = 'null';
						 }else{
    		     			 if(isset($type) && $type=='int') {
                             	if(!empty($custom_fields[$fieldDef['name']]))
                             		$cstm_values[$fieldDef['name']] = $GLOBALS['db']->quote(from_html($val));
    		     			 	else
                             		$values[$fieldDef['name']] = $GLOBALS['db']->quote(from_html($val));
                             } else {
                             	if(!empty($custom_fields[$fieldDef['name']]))
                             		$cstm_values[$fieldDef['name']] = "'".$GLOBALS['db']->quote(from_html($val))."'";
                             	else
                             		$values[$fieldDef['name']] = "'".$GLOBALS['db']->quote(from_html($val))."'";
                             }
						 }
    		     		if(!$built_columns){
               				if(!empty($custom_fields[$fieldDef['name']]))
								$cstm_columns[] = $fieldDef['name'];
							else
    		     				$columns[] = $fieldDef['name'];
               			}
    		   		}

    			}
            }else{
               foreach ($row as $key=>$val)
               {
               		if($key != 'orc_row'){
	                    $values[$key] = "'$val'";
	                    if(!$built_columns){
	                        $columns[] = $key;
	                    }
               		}
               }
            }
			$built_columns = true;
			if(!empty($values)){
				$row_array[] = $values;
			}
			if(!empty($cstm_values) && !empty($cstm_values['id_c']) && (strlen($cstm_values['id_c']) > 7)){
				$cstm_row_array[] = $cstm_values;
			}
		}

		//if (sizeof ($values) == 0) return ""; // no columns set

		// get the entire sql
		$sql .= "(".implode(",", $columns).") ";
		$sql .= "VALUES";
		for($i = 0; $i < count($row_array); $i++){
			$sql .= " (".implode(",", $row_array[$i]).")";
			if($i < (count($row_array) - 1)){
				$sql .= ", ";
			}
		}
		//custom
		// get the entire sql
		$custom_sql .= "(".implode(",", $cstm_columns).") ";
		$custom_sql .= "VALUES";

		for($i = 0; $i < count($cstm_row_array); $i++){
			$custom_sql .= " (".implode(",", $cstm_row_array[$i]).")";
			if($i < (count($cstm_row_array) - 1)){
				$custom_sql .= ", ";
			}
		}
		return array('data' => $sql, 'cstm_sql' => $custom_sql, 'result_count' => $row_count, 'total_count' => $rows_found, 'next_offset' => $next_offset);
	}

    /**
     * Disconnects all instances
     */
    public function disconnectAll()
    {
        global $dbinstances;

        if (!empty($dbinstances)) {
            $cur = current($dbinstances);
            while ($cur) {
                $cur->disconnect();
                $cur = next($dbinstances);
            }
        }

    }

    /**
     * This function sets the query threshold limit
     *
     * @param int $limit value of query threshold limit
     */
    public static function setQueryLimit($limit){
		//reset the queryCount
		self::$queryCount = 0;

		self::$queryLimit = $limit;
    }

    /**
     * Returns the static queryCount value
     *
     * @return int value of the queryCount static variable
     */
    public static function getQueryCount()
    {
        return self::$queryCount;
    }


    /**
     * Resets the queryCount value to 0
     *
     */
    public static function resetQueryCount() {
    	self::$queryCount = 0;
    }

    /**
     * This function increments the global $sql_queries variable
     *
     * @param $sql The SQL statement being counted
     */
    public function countQuery(
        $sql
        )
    {
		if (self::$queryLimit != 0 && ++self::$queryCount > self::$queryLimit
            &&(empty($GLOBALS['current_user']) || !is_admin($GLOBALS['current_user']))) {
		   require_once('include/resource/ResourceManager.php');
		   $resourceManager = ResourceManager::getInstance();
		   $resourceManager->notifyObservers('ERR_QUERY_LIMIT');
		}
    }

    /**
     * Returns a string properly quoted for this database
     *
     * @param string $string
     * @param bool   $isLike
     */
    public function quote(
        $string,
        $isLike = true
        )
    {
        return from_html($string);
    }

    /**
     * Returns a string properly quoted for this database that is an email
     *
     * @param string $string
     * @param bool   $isLike
     */
    abstract public function quoteforEmail(
        $string,
        $isLike = true
        );

    /**
     * Quote the strings of the passed in array
     *
     * The array must only contain strings
     *
     * @param array $array
     * @param bool  $isLike
     */
    public function arrayQuote(
        array &$array,
        $isLike = true
        )
    {
        for($i = 0; $i < count($array); $i++){
            $array[$i] = $this->quote($array[$i], $isLike);
        }
    }
    /**
     * Parses and runs queries
     *
     * @param  string   $sql        SQL Statement to execute
     * @param  bool     $dieOnError True if we want to call die if the query returns errors
     * @param  string   $msg        Message to log if error occurs
     * @param  bool     $suppress   Flag to suppress all error output unless in debug logging mode.
     * @return resource result set
     */
    abstract public function query(
        $sql,
        $dieOnError = false,
        $msg = '',
        $suppress = false
        );

    /**
     * Runs a limit query: one where we specify where to start getting records and how many to get
     *
     * @param  string   $sql
     * @param  int      $start
     * @param  int      $count
     * @param  boolean  $dieOnError
     * @param  string   $msg
     * @return resource query result
     */
    abstract function limitQuery(
        $sql,
        $start,
        $count,
        $dieOnError = false,
        $msg = '');

    /**
     * Frees out previous results
     *
     * @param resource $result optional, pass if you want to free a single result instead of all results
     */
    protected function freeResult(
        $result = false
        )
    {
        $free_result = $this->backendFunctions['free_result'];
        if(!$result && $this->lastResult){
            $result = current($this->lastResult);
            while($result){
                $free_result($result);
                $result = next($this->lastResult);
            }
            $this->lastResult = array();
        }
        if($result){
            $free_result($result);
        }
    }

    /**
     * Runs a query and returns a single row
     *
     * @param  string   $sql        SQL Statement to execute
     * @param  bool     $dieOnError True if we want to call die if the query returns errors
     * @param  string   $msg        Message to log if error occurs
     * @param  bool     $suppress   Message to log if error occurs
     * @return array    single row from the query
     */
    public function getOne(
        $sql,
        $dieOnError = false,
        $msg = '',
        $suppress = false
        )
    {
        $GLOBALS['log']->info("Get One: . |$sql|");
        $this->checkConnection();
        if(!($this instanceof MysqlManager) || stripos($sql, ' LIMIT ') === false) {
            $queryresult = $this->limitQuery($sql, 0, 1, $dieOnError, $msg);
        } else {
            // backward compatibility with queries having LIMIT
            $queryresult = $this->query($sql, $dieOnError, $msg);
        }
        if (!$queryresult)
            return false;

        $row = $this->fetchByAssoc($queryresult);
        if ( !$row )
            return false;

        $this->checkError($msg.' Get One Failed:' . $sql, $dieOnError);

        $this->freeResult($queryresult);
        return array_shift($row);
    }

 /**
     * will return the associative array of the row for a query or false if more than one row was returned
     *
     * @deprecated
     *
     * @param  string $sql
     * @param  bool   $dieonerror
     * @param  string $msg
     * @param  bool   $encode
     * @return array  associative array of the row or false
     */
    public function requireSingleRow(
        $sql,
        $dieOnError = false,
        $msg = '',
        $encode = true
        )
    {
        $GLOBALS['log']->info('call to DBManager::requireSingleRow() is deprecated');
        $result = $this->limitQuery($sql,0,2, $dieOnError, $msg);
        $count = 0;
        $firstRow = false;
        while ($row = $this->fetchByAssoc($result)){
        	if(!$firstRow)$firstRow = $row;
            $count++;
        }

        if ($count > 1)
            return false;

        return $firstRow;
    }

    /**
     * Returns the description of fields based on the result
     *
     * @param  resource $result
     * @param  boolean  $make_lower_case
     * @return array field array
     */
    abstract public function getFieldsArray(
        &$result,
        $make_lower_case = false);

    /**
     * Returns the number of rows returned by the result
     *
     * @param  resource $result
     * @return int
     */
    public function getRowCount(
        &$result
        )
    {
        $row_count = $this->backendFunctions['row_count'];
        if(isset($result) && !empty($result)){
            return $row_count($result);
		}
		return 0;
	}

    /**
     * Returns the number of rows affected by the last query
     *
     * @return int
     */
    public function getAffectedRowCount()
    {
        $affected_row_count = $this->backendFunctions['affected_row_count'];
        return $affected_row_count($this->getDatabase());
    }

    /**
     * Fetches the next row in the query result into an associative array
     *
     * @param  resource $result
     * @param  int      $rowNum optional, specify a certain row to return
     * @param  bool     $encode optional, true if we want html encode the resulting array
     * @return array    returns false if there are no more rows available to fetch
     */
    abstract public function fetchByAssoc(
        &$result,
        $rowNum = -1,
        $encode = true);

    /**
     * Connects to the database backend
     *
     * Takes in the database settings and opens a database connection based on those
     * will open either a persistent or non-persistent connection.
     * If a persistent connection is desired but not available it will defualt to non-persistent
     *
     * configOptions must include
     * db_host_name - server ip
     * db_user_name - database user name
     * db_password - database password
     *
     * @param array   $configOptions
     * @param boolean $dieOnError
     */
    abstract public function connect(
         array $configOptions = null,
         $dieOnError = false
         );

    /**
     * Disconnects from the database
     *
     * Also handles any cleanup needed
     */
    public function disconnect()
    {
    	$GLOBALS['log']->debug('Calling DBManager::disconnect()');
        $close = $this->backendFunctions['close'];
        if(isset($this->database)){
            $this->freeResult();
            if ( is_resource($this->database) || is_object($this->database) )
				$close($this->database);
            unset($this->database);
        }
    }

    /**
     * Returns the field description for a given field in table
     *
     * @param  string $name
     * @param  string $tablename
     * @return array
     */
    protected function describeField(
        $name,
        $tablename
        )
    {
        global $table_descriptions;
        if(isset($table_descriptions[$tablename])
                && isset($table_descriptions[$tablename][$name]))
            return 	$table_descriptions[$tablename][$name];

        $table_descriptions[$tablename] = array();
        $table_descriptions[$tablename][$name] = $this->helper->get_columns($tablename);

        if(isset($table_descriptions[$tablename][$name]))
            return 	$table_descriptions[$tablename][$name];

        return array();
    }

    /**
     * Returns the index description for a given index in table
     *
     * @param  string $name
     * @param  string $tablename
     * @return array
     */
    protected function describeIndex(
        $name,
        $tablename
        )
    {
        global $table_descriptions;
        if(isset($table_descriptions[$tablename]) && isset($table_descriptions[$tablename]['indexes']) && isset($table_descriptions[$tablename]['indexes'][$name])){
            return 	$table_descriptions[$tablename]['indexes'][$name];
        }

        $table_descriptions[$tablename]['indexes'] = array();

        $result = $this->helper->get_indices($tablename);

		foreach($result as $index_name => $row) {
            if(!isset($table_descriptions[$tablename]['indexes'][$index_name])){
                $table_descriptions[$tablename]['indexes'][$index_name] = array();
            }
            $table_descriptions[$tablename]['indexes'][$index_name]['Column_name'] = $row;
		}

        if(isset($table_descriptions[$tablename]['indexes'][$name])){
            return 	$table_descriptions[$tablename]['indexes'][$name];
        }

        return array();
    }

    /**
     * Returns an array of table for this database
     *
     * @return	$tables		an array of with table names
     * @return	false		if no tables found
     */
    abstract public function getTablesArray();

    /**
     * Return's the version of the database
     *
     * @return string
     */
    abstract public function version();

    /**
     * Checks if a table with the name $tableName exists
     * and returns true if it does or false otherwise
     *
     * @param  string $tableName
     * @return bool
     */
    abstract public function tableExists($tableName);

    /**
     * Truncates a string to a given length
     *
     * @param string $string
     * @param int    $len    length to trim to
     * @param string
     */
    public function truncate(
        $string,
        $len
        )
    {
    	if ( is_numeric($len) && $len > 0)
        {
            $string = mb_substr($string,0,(int) $len, "UTF-8");
        }
        return $string;
    }


	/**
     * Given a sql stmt attempt to parse it into the sql and the tokens. Then return the index of this prepared statement
     * Tokens can come in the following forms:
     * ? - a scalar which will be quoted
     * ! - a literal which will not be quoted
     * & - binary data to read from a file
     *
     * @param  string	$sql        The sql to parse
     * @return int index of the prepared statement to be used with execute
     */
    public function prepareQuery($sql){
    	//parse out the tokens
    	$tokens = preg_split('/((?<!\\\)[&?!])/', $sql, -1, PREG_SPLIT_DELIM_CAPTURE);

    	//maintain a count of the actual tokens for quick reference in execute
    	$count = 0;

    	$sqlStr = '';
	    foreach ($tokens as $key => $val) {
	        switch ($val) {
	            case '?' :
	            case '!' :
	            case '&' :
	            	$count++;
	            	$sqlStr .= '?';
	            	break;

	            default :
	            	//escape any special characters
	                $tokens[$key] = preg_replace('/\\\([&?!])/', "\\1", $val);
	                $sqlStr .= $tokens[$key];
	                break;
	        } // switch
	    } // foreach

	    $this->preparedTokens[] = array('tokens' => $tokens, 'tokenCount' => $count, 'sqlString' => $sqlStr);
	    end($this->preparedTokens);
	    return key($this->preparedTokens);
    }

    /**
     * Takes a prepared stmt index and the data to replace and creates the query and runs it.
     *
     * @param  int		$stmt       The index of the prepared statement from preparedTokens
     * @param  array    $data 		The array of data to replace the tokens with.
     * @return resource result set or false on error
     */
    public function executePreparedQuery($stmt, $data = array()){
    	if(!empty($this->preparedTokens[$stmt])){
    		if(!is_array($data)){
				$data = array($data);
			}

    		$pTokens = $this->preparedTokens[$stmt];

    		//ensure that the number of data elements matches the number of replacement tokens
    		//we found in prepare().
    		if(count($data) != $pTokens['tokenCount']){
    			//error the data count did not match the token count
    			return false;
    		}

    		$query = '';
    		$dataIndex = 0;
    		$tokens = $pTokens['tokens'];
    		foreach ($tokens as $val) {
            	switch ($val) {
            		case '?':
            			$query .= $this->quote($data[$dataIndex++]);
            			break;
            		case '&':
            			$filename = $data[$dataIndex++];
				        $query .= sugar_file_get_contents($filename);
            			break;
            		case '!':
            			$query .= $data[$dataIndex++];
            			break;
            		default:
            			$query .= $val;
            			break;
            	}//switch
    		}//foreach
    		return $this->query($query);
    	}else{
    		return false;
    	}
    }

    /**
     * Run both prepare and execute without the client having to run both individually.
     *
     * @param  string	$sql        The sql to parse
     * @param  array    $data 		The array of data to replace the tokens with.
     * @return resource result set or false on error
     */
    public function pQuery($sql, $data = array()){
    	$stmt = $this->prepareQuery($sql);
    	return $this->executePreparedQuery($stmt, $data);
    }

    /**
     * Use when you need to convert a database string to a different value; this function does it in a
     * database-backend aware way
     *
     * @param string $string database string to convert
     * @param string $type type of conversion to do
     * @param array  $additional_parameters optional, additional parameters to pass to the db function
     * @param array  $additional_parameters_oracle_only optional, additional parameters to pass to the db function on oracle only
     * @return string
     */
    public function convert(
        $string,
        $type,
        array $additional_parameters = array(),
        array $additional_parameters_oracle_only = array()
        )
    {
        return "$string";
    }

    /**
     * Returns the database string needed for concatinating multiple database strings together
     *
     * @param string $table table name of the database fields to concat
     * @param array $fields fields in the table to concat together
     * @return string
     */
    abstract public function concat(
        $table,
        array $fields
        );

    /**
     * Undoes database conversion
     *
     * @param string $string database string to convert
     * @param string $type type of conversion to do
     * @return string
     */
    public function fromConvert(
        $string,
        $type)
    {
        return $string;
    }
}

?>
