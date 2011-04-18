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

//Technically we can port all the functions in the latest bean to this file
// that is what PEAR is doing anyways.

class MysqlManager extends DBManager
{
    /**
     * @see DBManager::$dbType
     */
    public $dbType = 'mysql';

    /**
     * @see DBManager::$backendFunctions
     */
    protected $backendFunctions = array(
        'free_result'        => 'mysql_free_result',
        'close'              => 'mysql_close',
        'row_count'          => 'mysql_num_rows',
        'affected_row_count' => 'mysql_affected_rows',
        );

    /**
     * @see DBManager::checkError()
     */
    public function checkError(
        $msg = '',
        $dieOnError = false
        )
    {
        if (parent::checkError($msg, $dieOnError))
            return true;

        if (mysql_errno($this->getDatabase())) {
            if ($this->dieOnError || $dieOnError){
                $GLOBALS['log']->fatal("MySQL error ".mysql_errno($this->database).": ".mysql_error($this->database));
                sugar_die ($GLOBALS['app_strings']['ERR_DB_FAIL']);
            }
            else {
                $this->last_error = $msg."MySQL error ".mysql_errno($this->database).": ".mysql_error($this->database);
                $GLOBALS['log']->error("MySQL error ".mysql_errno($this->database).": ".mysql_error($this->database));

            }
            return true;
        }
        return false;
    }

    /**
     * Parses and runs queries
     *
     * @param  string   $sql        SQL Statement to execute
     * @param  bool     $dieOnError True if we want to call die if the query returns errors
     * @param  string   $msg        Message to log if error occurs
     * @param  bool     $suppress   Flag to suppress all error output unless in debug logging mode.
     * @param  bool     $autofree   True if we want to push this result into the $lastResult array.
     * @return resource result set
     */
    public function query(
        $sql,
        $dieOnError = false,
        $msg = '',
        $suppress = false,
        $autofree = false
        )
    {
        parent::countQuery($sql);
        $GLOBALS['log']->info('Query:' . $sql);
        $this->checkConnection();
        //$this->freeResult();
        $this->query_time = microtime(true);
        $this->lastsql = $sql;
        if ($suppress==true) {
        }
        else {
            $result = mysql_query($sql, $this->database);
        }

        $this->lastmysqlrow = -1;
        $this->query_time = microtime(true) - $this->query_time;
        $GLOBALS['log']->info('Query Execution Time:'.$this->query_time);


        $this->checkError($msg.' Query Failed:' . $sql . '::', $dieOnError);
        if($autofree)
            $this->lastResult[] =& $result;

        return $result;
    }

    /**
     * @see DBManager::limitQuery()
     */
    public function limitQuery(
        $sql,
        $start,
        $count,
        $dieOnError = false,
        $msg = '')
    {
        if ($start < 0)
            $start = 0;
        $GLOBALS['log']->debug('Limit Query:' . $sql. ' Start: ' .$start . ' count: ' . $count);

        $sql = "$sql LIMIT $start,$count";
        $this->lastsql = $sql;

        if(!empty($GLOBALS['sugar_config']['check_query'])){
            $this->checkQuery($sql);
        }

        return $this->query($sql, $dieOnError, $msg);
    }


    /**
     * @see DBManager::checkQuery()
     */
    protected function checkQuery(
        $sql
        )
    {
        $result   = $this->query('EXPLAIN ' . $sql);
        $badQuery = array();
        while ($row = $this->fetchByAssoc($result)) {
            if (empty($row['table']))
                continue;
            $badQuery[$row['table']] = '';
            if (strtoupper($row['type']) == 'ALL')
                $badQuery[$row['table']]  .=  ' Full Table Scan;';
            if (empty($row['key']))
                $badQuery[$row['table']] .= ' No Index Key Used;';
            if (!empty($row['Extra']) && substr_count($row['Extra'], 'Using filesort') > 0)
                $badQuery[$row['table']] .= ' Using FileSort;';
            if (!empty($row['Extra']) && substr_count($row['Extra'], 'Using temporary') > 0)
                $badQuery[$row['table']] .= ' Using Temporary Table;';
        }

        if ( empty($badQuery) )
            return true;

        foreach($badQuery as $table=>$data ){
            if(!empty($data)){
                $warning = ' Table:' . $table . ' Data:' . $data;
                if(!empty($GLOBALS['sugar_config']['check_query_log'])){
                    $GLOBALS['log']->fatal($sql);
                    $GLOBALS['log']->fatal('CHECK QUERY:' .$warning);
                }
                else{
                    $GLOBALS['log']->warn('CHECK QUERY:' .$warning);
                }
            }
        }

        return false;
    }

    /**
     * @see DBManager::describeField()
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
        $sql = "DESCRIBE $tablename";
        $result = $this->query($sql);
        while ($row = $this->fetchByAssoc($result) ){
            $table_descriptions[$tablename][$row['Field']] = $row;
            if(empty($table_descriptions[$tablename][$row['Field']]['Null']))
            	$table_descriptions[$tablename][$row['Field']]['Null'] = 'NO';
        }
        if(isset($table_descriptions[$tablename][$name]))
            return 	$table_descriptions[$tablename][$name];

        return array();
    }

    /**
     * @see DBManager::getFieldsArray()
     */
    public function getFieldsArray(
        &$result,
        $make_lower_case=false)
    {
        $field_array = array();

        if(! isset($result) || empty($result))
            return 0;

        $i = 0;
        while ($i < mysql_num_fields($result)) {
            $meta = mysql_fetch_field($result, $i);
            if (!$meta)
                return 0;

            if($make_lower_case == true)
                $meta->name = strtolower($meta->name);

            $field_array[] = $meta->name;
            $i++;
        }

        return $field_array;
    }



    /**
     * @see DBManager::fetchByAssoc()
     */
    public function fetchByAssoc(
        &$result,
        $rowNum = -1,
        $encode = true
        )
    {
        if (!$result)
            return false;

        if ($result && $rowNum > -1){
            if ($this->getRowCount($result) > $rowNum)
                mysql_data_seek($result, $rowNum);
            $this->lastmysqlrow = $rowNum;
        }

        $row = mysql_fetch_assoc($result);

        if ($encode && $this->encode && is_array($row))
            return array_map('to_html', $row);

        return $row;
    }

    /**
     * @see DBManager::getTablesArray()
     */
    public function getTablesArray()
    {
        global $sugar_config;
        $GLOBALS['log']->debug('Fetching table list');

        if ($this->getDatabase()) {
            $tables = array();
            $r = $this->query('SHOW TABLES');
            if (is_resource($r) || $r instanceOf mysqli_result ) {
                while ($a = $this->fetchByAssoc($r)) {
                    $row = array_values($a);
					$tables[]=$row[0];
                }
                return $tables;
            }
        }

        return false; // no database available
    }

    /**
     * @see DBManager::version()
     */
    public function version()
    {
        return $this->getOne("SELECT version() version");
    }

    /**
     * @see DBManager::tableExists()
     */
    public function tableExists(
        $tableName
        )
    {
        $GLOBALS['log']->info("tableExists: $tableName");

        if ($this->getDatabase()) {
            $result = $this->query("SHOW TABLES LIKE '".$tableName."'");
            return ($this->getRowCount($result) == 0) ? false : true;
        }

        return false;
    }

    /**
     * @see DBManager::quote()
     */
    public function quote(
        $string,
        $isLike = true
        )
    {
        return mysql_real_escape_string(parent::quote($string), $this->getDatabase());
    }

    /**
     * @see DBManager::quoteForEmail()
     */
    public function quoteForEmail(
        $string,
        $isLike = true
        )
    {
        return mysql_real_escape_string($string, $this->getDatabase());
    }

    /**
     * @see DBManager::connect()
     */
	public function connect(
        array $configOptions = null,
        $dieOnError = false
        )
    {
		global $sugar_config;

        if(is_null($configOptions))
			$configOptions = $sugar_config['dbconfig'];

        if ($sugar_config['dbconfigoption']['persistent'] == true) {
            $this->database = @mysql_pconnect(
                $configOptions['db_host_name'],
                $configOptions['db_user_name'],
                $configOptions['db_password']
                );
        }

        if (!$this->database) {
            $this->database = mysql_connect(
                    $configOptions['db_host_name'],
                    $configOptions['db_user_name'],
                    $configOptions['db_password']
                    );
            if(empty($this->database)) {
                $GLOBALS['log']->fatal("Could not connect to server ".$configOptions['db_host_name']." as ".$configOptions['db_user_name'].":".mysql_error());
                sugar_die($GLOBALS['app_strings']['ERR_NO_DB']);
            }
            // Do not pass connection information because we have not connected yet
            if($this->database  && $sugar_config['dbconfigoption']['persistent'] == true){
                $_SESSION['administrator_error'] = "<b>Severe Performance Degradation: Persistent Database Connections "
                    . "not working.  Please set \$sugar_config['dbconfigoption']['persistent'] to false "
                    . "in your config.php file</b>";
            }
        }
        if(!@mysql_select_db($configOptions['db_name'])) {
            $GLOBALS['log']->fatal( "Unable to select database {$configOptions['db_name']}: " . mysql_error($this->database));
            sugar_die($GLOBALS['app_strings']['ERR_NO_DB']);
        }

        // cn: using direct calls to prevent this from spamming the Logs
        $charset = "SET CHARACTER SET utf8";
        if(isset($sugar_config['dbconfigoption']['collation']) && !empty($sugar_config['dbconfigoption']['collation']))
        	$charset .= " COLLATE {$sugar_config['dbconfigoption']['collation']}";
        mysql_query($charset, $this->database); // no quotes around "[charset]"
        mysql_query("SET NAMES 'utf8'", $this->database);

        if($this->checkError('Could Not Connect:', $dieOnError))
            $GLOBALS['log']->info("connected to db");

        $GLOBALS['log']->info("Connect:".$this->database);
    }

    /**
     * @see DBManager::repairTableParams()
     *
     * For MySQL, we can write the ALTER TABLE statement all in one line, which speeds things
     * up quite a bit. So here, we'll parse the returned SQL into a single ALTER TABLE command.
     */
    public function repairTableParams(
        $tablename,
        $fielddefs,
        $indices,
        $execute = true,
        $engine = null
        )
    {
        $sql = parent::repairTableParams($tablename,$fielddefs,$indices,false,$engine);

        if ( $sql == '' )
            return '';

        if ( stristr($sql,'create table') )
        {
            if ($execute) {
                $msg = "Error creating table: ".$tablename. ":";
                $this->query($sql,true,$msg);
	        }
            return $sql;
        }

        // first, parse out all the comments
        $match = array();
        preg_match_all("!/\*.*?\*/!is", $sql, $match);
        $commentBlocks = $match[0];
        $sql = preg_replace("!/\*.*?\*/!is",'', $sql);

        // now, we should only have alter table statements
        // let's replace the 'alter table name' part with a comma
        $sql = preg_replace("!alter table $tablename!is",', ', $sql);

        // re-add it at the beginning
        $sql = substr_replace($sql,'',strpos($sql,','),1);
        $sql = str_replace(";","",$sql);
        $sql = str_replace("\n","",$sql);
        $sql = "ALTER TABLE $tablename $sql";

        if ( $execute )
            $this->query($sql,'Error with MySQL repair table');

        // and re-add the comments at the beginning
        $sql = implode("\n",$commentBlocks) . "\n". $sql . "\n";

        return $sql;
    }

    /**
     * @see DBManager::convert()
     */
    public function convert(
        $string,
        $type,
        array $additional_parameters = array(),
        array $additional_parameters_oracle_only = array()
        )
    {
        // convert the parameters array into a comma delimited string
        $additional_parameters_string = '';
        if (!empty($additional_parameters))
            $additional_parameters_string = ','.implode(',',$additional_parameters);

        switch ($type) {
        case 'today': return "CURDATE()";
        case 'left': return "LEFT($string".$additional_parameters_string.")";
        case 'date_format': return "DATE_FORMAT($string".$additional_parameters_string.")";
        case 'datetime': return "DATE_FORMAT($string, '%Y-%m-%d %H:%i:%s')";
        case 'IFNULL': return "IFNULL($string".$additional_parameters_string.")";
        case 'CONCAT': return "CONCAT($string,".implode(",",$additional_parameters).")";
        case 'text2char': return "$string";
        }

        return "$string";
    }

    /**
     * @see DBManager::concat()
     */
    public function concat(
        $table,
        array $fields
        )
    {
        $ret = '';

        foreach ( $fields as $index => $field )
            if (empty($ret))
                $ret = "CONCAT(". db_convert($table.".".$field,'IFNULL', array("''"));
            else
                $ret.=	",' ',".db_convert($table.".".$field,'IFNULL', array("''"));

		if (!empty($ret)) {
		    $ret = "TRIM($ret))";
		}

		return $ret;
    }
}
