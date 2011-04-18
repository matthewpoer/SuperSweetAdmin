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
*      		int
*      		long
*      		varchar
*      		text
*      		date
*      		datetime
*      		double
*      		float
*      		uint
*      		ulong
*      		time
*      		short
*      		enum
* length	This is used only when the type is varchar and denotes the length of the string.
*  			The max value is 255.
* enumvals  This is a list of valid values for an enum separated by "|".
*			It is used only if the type is ?enum?;
* required	This field dictates whether it is a required value.
*			The default value is ?FALSE?.
* isPrimary	This field identifies the primary key of the table.
*			If none of the fields have this flag set to ?TRUE?,
*			the first field definition is assume to be the primary key.
*			Default value for this field is ?FALSE?.
* default	This field sets the default value for the field definition.
*
*
* Portions created by SugarCRM are Copyright (C) SugarCRM, Inc.
* All Rights Reserved.
* Contributor(s): ______________________________________..
********************************************************************************/

class MssqlManager extends DBManager
{
    /**
     * @see DBManager::$dbType
     */
    public $dbType = 'mssql';

	/**
     * @see DBManager::$backendFunctions
     */
    protected $backendFunctions = array(
        'free_result' => 'mssql_free_result',
        'close'       => 'mssql_close',
        'row_count'   => 'mssql_num_rows'
        );


	/**
     * @see DBManager::connect()
     */
    public function connect(
        array $configOptions = null,
        $dieOnError = false
        )
    {
        global $sugar_config;

        if (is_null($configOptions))
            $configOptions = $sugar_config['dbconfig'];

        //SET DATEFORMAT to 'YYYY-MM-DD''
        ini_set('mssql.datetimeconvert', '0');

        //set the text size and textlimit to max number so that blob columns are not truncated
        ini_set('mssql.textlimit','2147483647');
        ini_set('mssql.textsize','2147483647');

        //set the connections parameters
        $connect_param = '';
        $configOptions['db_host_instance'] = trim($configOptions['db_host_instance']);
        if (empty($configOptions['db_host_instance']))
            $connect_param = $configOptions['db_host_name'];
        else
            $connect_param = $configOptions['db_host_name']."\\".$configOptions['db_host_instance'];

        //create persistent connection
        if ($sugar_config['dbconfigoption']['persistent'] == true) {
            $this->database =@mssql_pconnect(
                $connect_param ,
                $configOptions['db_user_name'],
                $configOptions['db_password']
                );
        }
        //if no persistent connection created, then create regular connection
        if(!$this->database){
            $this->database = mssql_connect(
                    $connect_param ,
                    $configOptions['db_user_name'],
                    $configOptions['db_password']
                    );
            if(!$this->database){
                $GLOBALS['log']->fatal("Could not connect to server ".$configOptions['db_host_name'].
                    " as ".$configOptions['db_user_name'].".");
                sugar_die($GLOBALS['app_strings']['ERR_NO_DB']);
            }
            if($this->database && $sugar_config['dbconfigoption']['persistent'] == true){
                $_SESSION['administrator_error'] = "<B>Severe Performance Degradation: Persistent Database Connections "
                    . "not working.  Please set \$sugar_config['dbconfigoption']['persistent'] to false in your "
                    . "config.php file</B>";
            }
        }
        //make sure connection exists
        if(!$this->database){
            sugar_die($GLOBALS['app_strings']['ERR_NO_DB']);
        }

        //select database

        //Adding sleep and retry for mssql connection. We have come across scenarios when
        //an error is thrown.' Unable to select database'. Following will try to connect to
        //mssql db maximum number of 5 times at the interval of .2 second. If can not connect
        //it will throw an Unable to select database message.

        if(!@mssql_select_db($configOptions['db_name'], $this->database)){
			$connected = false;
			for($i=0;$i<5;$i++){
				usleep(200000);
				if(@mssql_select_db($configOptions['db_name'], $this->database)){
					$connected = true;
					break;
				}
			}
			if(!$connected){
			    $GLOBALS['log']->fatal( "Unable to select database {$configOptions['db_name']}");
				sugar_die($GLOBALS['app_strings']['ERR_NO_DB']);
			}
         }

        if($this->checkError('Could Not Connect', $dieOnError))
            $GLOBALS['log']->info("connected to db");

        $GLOBALS['log']->info("Connect:".$this->database);
    }

	/**
     * @see DBManager::version()
     */
    public function version()
    {
        return $this->getOne("SELECT @@VERSION as version");
	}

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

        $sqlmsg = mssql_get_last_message();
        
        $sqlpos = strpos($sqlmsg, 'Changed database context to');
        $sqlpos2 = strpos($sqlmsg, 'Warning:');
        $sqlpos3 = strpos($sqlmsg, 'Checking identity information:');
        if ( $sqlpos !== false || $sqlpos2 !== false || $sqlpos3 !== false )
            $sqlmsg = '';  // empty out sqlmsg if its either of the two error messages described above
        else {
        	global $app_strings;
            //ERR_MSSQL_DB_CONTEXT: localized version of 'Changed database context to' message
            if (empty($app_strings) or !isset($app_strings['ERR_MSSQL_DB_CONTEXT'])) {
                //ignore the message from sql-server if $app_strings array is empty. This will happen
                //only if connection if made before languge is set.
                $GLOBALS['log']->debug("Ignoring this database message: " . $sqlmsg);
                $sqlmsg = '';
            }
            else {
                $sqlpos = strpos($sqlmsg, $app_strings['ERR_MSSQL_DB_CONTEXT']);
                if ( $sqlpos !== false )
                    $sqlmsg = '';
            }
        }

        if ( strlen($sqlmsg) > 2 ) {
        	$GLOBALS['log']->fatal("$msg: SQL Server error: " . $sqlmsg);
            return true;
        }

        return false;
	}

	/**
     * @see DBManager::query()
	 */
	public function query(
        $sql,
        $dieOnError = false,
        $msg = '',
        $suppress = false
        )
    {
        // Flag if there are odd number of single quotes
        if ((substr_count($sql, "'") & 1))
            $GLOBALS['log']->error("SQL statement[" . $sql . "] has odd number of single quotes.");

        $this->countQuery($sql);
        $GLOBALS['log']->info('Query:' . $sql);
        $this->checkConnection();
        $this->query_time = microtime(true);

        // Bug 34892 - Clear out previous error message by checking the @@ERROR global variable
        $errorNumberHandle = mssql_query("SELECT @@ERROR",$this->database);
		$errorNumber = array_shift(mssql_fetch_row($errorNumberHandle));

        if ($suppress) {
        }
        else {
            $result = @mssql_query($sql, $this->database);
        }

        if (!$result) {

            // awu Bug 10657: ignoring mssql error message 'Changed database context to' - an intermittent
            // 				  and difficult to reproduce error. The message is only a warning, and does
            //				  not affect the functionality of the query
            $sqlmsg = mssql_get_last_message();
            $sqlpos = strpos($sqlmsg, 'Changed database context to');
			$sqlpos2 = strpos($sqlmsg, 'Warning:');
			$sqlpos3 = strpos($sqlmsg, 'Checking identity information:');
            
			if ($sqlpos !== false || $sqlpos2 !== false || $sqlpos3 !== false)		// if sqlmsg has 'Changed database context to', just log it
				$GLOBALS['log']->debug($sqlmsg . ": " . $sql );
			else {
				$GLOBALS['log']->fatal($sqlmsg . ": " . $sql );
				if($dieOnError)
					sugar_die('SQL Error : ' . $sqlmsg);
				else
					echo 'SQL Error : ' . $sqlmsg;
			}
        }
        $this->lastmysqlrow = -1;

        $this->query_time = microtime(true) - $this->query_time;
        $GLOBALS['log']->info('Query Execution Time:'.$this->query_time);


        $this->checkError($msg.' Query Failed: ' . $sql, $dieOnError);

        return $result;
    }

    /**
     * This function take in the sql for a union query, the start and offset,
     * and wraps it around an "mssql friendly" limit query
     *
     * @param  string $sql
     * @param  int    $start record to start at
     * @param  int    $count number of records to retrieve
     * @return string SQL statement
     */
    private function handleUnionLimitQuery(
        $sql,
        $start,
        $count
        )
    {
        //set the start to 0, no negs
        if ($start < 0)
            $start=0;

        $GLOBALS['log']->debug(print_r(func_get_args(),true));

        $this->lastsql = $sql;

        //change the casing to lower for easier string comparison, and trim whitespaces
        $sql = strtolower(trim($sql)) ;

        //set default sql
        $limitUnionSQL = $sql;
        $order_by_str = 'order by';

        //make array of order by's.  substring approach was proving too inconsistent
        $orderByArray = explode($order_by_str, $sql);
        $unionOrderBy = '';
        $rowNumOrderBy = '';

        //count the number of array elements
        $unionOrderByCount = count($orderByArray);
        $arr_count = 0;

        //process if there are elements
        if ($unionOrderByCount){
            //we really want the last ordery by, so reconstruct string
            //adding a 1 to count, as we dont wish to process the last element
            $unionsql = '';
            while ($unionOrderByCount>$arr_count+1) {
                $unionsql .= $orderByArray[$arr_count];
                $arr_count = $arr_count+1;
                //add an "order by" string back if we are coming into loop again
                //remember they were taken out when array was created
                if ($unionOrderByCount>$arr_count+1) {
                    $unionsql .= "order by";
                }
            }
            //grab the last order by element, set both order by's'
            $unionOrderBy = $orderByArray[$arr_count];
            $rowNumOrderBy = $unionOrderBy;

            //if last element contains a "select", then this is part of the union query,
            //and there is no order by to use
            if (strpos($unionOrderBy, "select")) {
                $unionsql = $sql;
                //with no guidance on what to use for required order by in rownumber function,
                //resort to using name column.
                $rowNumOrderBy = 'id';
                $unionOrderBy = "";
            }
        }
        else {
            //there are no order by elements, so just pass back string
            $unionsql = $sql;
            //with no guidance on what to use for required order by in rownumber function,
            //resort to using name column.
            $rowNumOrderBy = 'id';
            $unionOrderBy = '';
        }
        //Unions need the column name being sorted on to match acroos all queries in Union statement
        //so we do not want to strip the alias like in other queries.  Just add the "order by" string and
        //pass column name as is
        if ($unionOrderBy != '') {
            $unionOrderBy = ' order by ' . $unionOrderBy;
        }

        //if start is 0, then just use a top query
        if($start == 0) {
            $limitUnionSQL = "select top $count * from (" .$unionsql .") as top_count ".$unionOrderBy;
        }
        else {
            //if start is more than 0, then use top query in conjunction
            //with rownumber() function to create limit query.
            $limitUnionSQL = "select top $count * from( select ROW_NUMBER() OVER ( order by "
            .$rowNumOrderBy.") AS row_number, * from ("
            .$unionsql .") As numbered) "
            . "As top_count_limit WHERE row_number > $start "
            .$unionOrderBy;
        }

        return $limitUnionSQL;
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
        $newSQL = $sql;
        $distinctSQLARRAY = array();
        if (strpos($sql, "UNION") && !preg_match("/(\')(UNION).?(\')/i", $sql))
            $newSQL = $this->handleUnionLimitQuery($sql,$start,$count);
        else {
            if ($start < 0)
                $start = 0;
            $GLOBALS['log']->debug(print_r(func_get_args(),true));
            $this->lastsql = $sql;
            $matches = array();
            preg_match('/^(.*SELECT )(.*?FROM.*WHERE)(.*)$/isU',$sql, $matches);
            if (!empty($matches[3])) {
                if ($start == 0) {
                    $match_two = strtolower($matches[2]);
                    if (!strpos($match_two, "distinct")> 0 && strpos($match_two, "distinct") !==0) {
    					//proceed as normal
                    	$newSQL = $matches[1] . " TOP $count " . $matches[2] . $matches[3];
                    }
                    else {
                        $distinct_o = strpos($match_two, "distinct");
                        $up_to_distinct_str = substr($match_two, 0, $distinct_o);
                        //check to see if the distinct is within a function, if so, then proceed as normal
                        if (strpos($up_to_distinct_str,"(")) {
                            //proceed as normal
                            $newSQL = $matches[1] . " TOP $count " . $matches[2] . $matches[3];
                        }
                        else {
                            //if distinct is not within a function, then parse
                            //string contains distinct clause, "TOP needs to come after Distinct"
                            //get position of distinct
                            $match_zero = strtolower($matches[0]);
                            $distinct_pos = strpos($match_zero , "distinct");
                            //get position of where
                            $where_pos = strpos($match_zero, "where");
                            //parse through string
                            $beg = substr($matches[0], 0, $distinct_pos+9 );
                            $mid = substr($matches[0], strlen($beg), ($where_pos+5) - (strlen($beg)));
                            $end = substr($matches[0], strlen($beg) + strlen($mid) );
                            //repopulate matches array
                            $matches[1] = $beg; $matches[2] = $mid; $matches[3] = $end;

                            $newSQL = $matches[1] . " TOP $count " . $matches[2] . $matches[3];
                        }
                    }
                }
                else {
                    $orderByMatch = array();
                    preg_match('/^(.*)(ORDER BY)(.*)$/is',$matches[3], $orderByMatch);

                    //if there is a distinct clause, parse sql string as we will have to insert the rownumber
                    //for paging, AFTER the distinct clause
                    $hasDistinct = strpos(strtolower($matches[0]), "distinct");
                    if ($hasDistinct) {
                        $matches_sql = strtolower($matches[0]);
                        //remove reference to distinct and select keywords, as we will use a group by instead
                        //we need to use group by because we are introducing rownumber column which would make every row unique

                        //take out the select and distinct from string so we can reuse in group by
                        $dist_str = ' distinct ';
                        $distinct_pos = strpos($matches_sql, $dist_str);
                        $matches_sql = substr($matches_sql,$distinct_pos+ strlen($dist_str));
                        //get the position of where and from for further processing
                        $from_pos = strpos($matches_sql , " from ");
                        $where_pos = strpos($matches_sql, "where");
                        //split the sql into a string before and after the from clause
                        //we will use the columns being selected to construct the group by clause
                        if ($from_pos>0 ) {
                            $distinctSQLARRAY[0] = substr($matches_sql,0, $from_pos+1);
                            $distinctSQLARRAY[1] = substr($matches_sql,$from_pos+1);
                            //get position of order by (if it exists) so we can strip it from the string
                            $ob_pos = strpos($distinctSQLARRAY[1], "order by");
                            if ($ob_pos) {
                                $distinctSQLARRAY[1] = substr($distinctSQLARRAY[1],0,$ob_pos);
                            }
                        }

                        //place group by string into array
                        $grpByArr = explode(',', $distinctSQLARRAY[0]);
                        $grpByStr = '';
                        $first = true;
                        //remove the aliases for each group by element, sql server doesnt like these in group by.
                        foreach ($grpByArr as $gb) {
                            $gb = trim($gb);

                            //remove outer reference if they exist
                            if (strpos($gb,"'")!==false){
                                continue;
                            }
                            //if there is a space, then an alias exists, remove alias
                            if (strpos($gb,' ')){
                                $gb = substr( $gb, 0,strpos($gb,' '));
                            }

                            //if resulting string is not empty then add to new group by string
                            if (!empty($gb)) {
                                if ($first) {
                                    $grpByStr .= " $gb";
                                    $first = false;
                                }
                                else {
                                    $grpByStr .= ", $gb";
                                }
                            }
                        }
                    }

                    if (!empty($orderByMatch[3])) {
                        //if there is a distinct clause, form query with rownumber after distinct
                        if ($hasDistinct) {
                            $newSQL = "SELECT TOP $count * FROM
                                        (
                                            SELECT ROW_NUMBER()
                                                OVER (ORDER BY ".$this->returnOrderBy($sql, $orderByMatch[3]).") AS row_number,
                                                count(*) counter, " . $distinctSQLARRAY[0] . "
                                                " . $distinctSQLARRAY[1] . "
                                                group by " . $grpByStr . "
                                        ) AS a
                                        WHERE row_number > $start";
                        }
                        else {
                        $newSQL = "SELECT TOP $count * FROM
                                    (
                                        " . $matches[1] . " ROW_NUMBER()
                                        OVER (ORDER BY " . $this->returnOrderBy($sql, $orderByMatch[3]) . ") AS row_number,
                                        " . $matches[2] . $orderByMatch[1]. "
                                    ) AS a
                                    WHERE row_number > $start";
                        }
                    }else{
                        //bug: 22231 Records in campaigns' subpanel may not come from
                        //table of $_REQUEST['module']. Get it directly from query
                        $upperQuery = strtoupper($matches[2]);
                        if (!strpos($upperQuery,"JOIN")){
                            $from_pos = strpos($upperQuery , "FROM") + 4;
                            $where_pos = strpos($upperQuery, "WHERE");
                            $tablename = trim(substr($upperQuery,$from_pos, $where_pos - $from_pos));
                        }else{
                            $tablename = $this->getTableNameFromModuleName($_REQUEST['module'],$sql);
                        }
                        //if there is a distinct clause, form query with rownumber after distinct
                        if ($hasDistinct) {
                             $newSQL = "SELECT TOP $count * FROM
                                            (
                            SELECT ROW_NUMBER() OVER (ORDER BY ".$tablename.".id) AS row_number, count(*) counter, " . $distinctSQLARRAY[0] . "
                                                        " . $distinctSQLARRAY[1] . "
                                                    group by " . $grpByStr . "
                                            )
                                            AS a
                                            WHERE row_number > $start";
                        }
                        else {
                             $newSQL = "SELECT TOP $count * FROM
                                           (
                                  " . $matches[1] . " ROW_NUMBER() OVER (ORDER BY ".$tablename.".id) AS row_number, " . $matches[2] . $matches[3]. "
                                           )
                                           AS a
                                           WHERE row_number > $start";
                        }
                    }
                }
            }
        }

        $GLOBALS['log']->debug('Limit Query: ' . $newSQL);
        $result =  $this->query($newSQL, $dieOnError, $msg);
        $this->dump_slow_queries($newSQL);
        return $result;
    }


    /**
     * Searches for begginning and ending characters.  It places contents into
     * an array and replaces contents in original string.  This is used to account for use of
     * nested functions while aliasing column names
     *
     * @param  string $p_sql     SQL statement
     * @param  string $strip_beg Beginning character
     * @param  string $strip_end Ending character
     * @param  string $patt      Optional, pattern to
     */
    private function removePatternFromSQL(
        $p_sql,
        $strip_beg,
        $strip_end,
        $patt = 'patt')
    {
        //strip all single quotes out
        $beg_sin = 0;
        $sec_sin = 0;
        $count = substr_count ( $p_sql, $strip_beg);
        $increment = 1;
        if ($strip_beg != $strip_end)
            $increment = 2;

        $i=0;
        $offset = 0;
        $strip_array = array();
        while ($i<$count) {
            $beg_sin = strpos($p_sql, $strip_beg, $offset);
            if (!$beg_sin)
                break;
            $sec_sin = strpos($p_sql, $strip_end, $beg_sin+1);
            $strip_array[$patt.$i] = substr($p_sql, $beg_sin, $sec_sin - $beg_sin +1);
            if ($increment > 1) {
                //we are in here because beginning and end patterns are not identical, so search for nesting
                $exists = strpos($strip_array[$patt.$i], $strip_beg );
                if ($exists>=0) {
                    $nested_pos = (strrpos($strip_array[$patt.$i], $strip_beg ));
                    $strip_array[$patt.$i] = substr($p_sql,$nested_pos+$beg_sin,$sec_sin - ($nested_pos+$beg_sin)+1);
                    $p_sql = substr($p_sql, 0, $nested_pos+$beg_sin) . " ##". $patt.$i."## " . substr($p_sql, $sec_sin+1);
                    $i = $i + 1;
                    $beg_sin = $nested_pos;
                    continue;
                }
            }
            $p_sql = substr($p_sql, 0, $beg_sin) . " ##". $patt.$i."## " . substr($p_sql, $sec_sin+1);
            //move the marker up
            $offset = $sec_sin+1;

            $i = $i + 1;
        }
        $strip_array['sql_string'] = $p_sql;

        return $strip_array;
    }

    /**
     * adds a pattern
     *
     * @param  string $token
     * @param  array  $pattern_array
     * @return string
     */
	private function addPatternToSQL(
        $token,
        array $pattern_array
        )
    {
        //strip all single quotes out
        $pattern_array = array_reverse($pattern_array);

        foreach ($pattern_array as $key => $replace) {
            $token = str_replace( "##".$key."##", $replace,$token);
        }

        return $token;
    }

    /**
     * gets an alias from the sql statement
     *
     * @param  string $sql
     * @param  string $alias
     * @return string
     */
	private function getAliasFromSQL(
        $sql,
        $alias
        )
    {
        $matches = array();
        preg_match('/^(.*SELECT)(.*?FROM.*WHERE)(.*)$/isU',$sql, $matches);
        //parse all single and double  quotes out of array
        $sin_array = $this->removePatternFromSQL($matches[2], "'", "'","sin_");
        $new_sql = array_pop($sin_array);
        $dub_array = $this->removePatternFromSQL($new_sql, "\"", "\"","dub_");
        $new_sql = array_pop($dub_array);

        //search for parenthesis
        $paren_array = $this->removePatternFromSQL($new_sql, "(", ")", "par_");
        $new_sql = array_pop($paren_array);

        //all functions should be removed now, so split the array on comma's
        $mstr_sql_array = explode(",", $new_sql);
        foreach($mstr_sql_array as $token ) {
            if (strpos($token, $alias)) {
                //found token, add back comments
                $token = $this->addPatternToSQL($token, $paren_array);
                $token = $this->addPatternToSQL($token, $dub_array);
                $token = $this->addPatternToSQL($token, $sin_array);

                //log and break out of this function
                return $token;
            }
        }
        return null;
    }


    /**
     * Finds the alias of the order by column, and then return the preceding column name
     *
     * @param  string $sql
     * @param  string $orderMatch
     * @return string
     */
    private function findColumnByAlias(
        $sql,
        $orderMatch
        )
    {
        //change case to lowercase
        $sql = strtolower($sql);
        $patt = '/\s+'.trim($orderMatch).'\s*,/';

        //check for the alias, it should contain comma, may contain space, \n, or \t
        $matches = array();
        preg_match($patt, $sql, $matches, PREG_OFFSET_CAPTURE);
        $found_in_sql = isset($matches[0][1]) ? $matches[0][1] : false;


        //set default for found variable
        $found = $found_in_sql;

        //if still no match found, then we need to parse through the string
        if (!$found_in_sql){
            //get count of how many times the match exists in string
            $found_count = substr_count($sql, $orderMatch);
            $i = 0;
            $first_ = 0;
            $len = strlen($orderMatch);
            //loop through string as many times as there is a match
            while ($found_count > $i) {
                //get the first match
                $found_in_sql = strpos($sql, $orderMatch,$first_);
                //make sure there was a match
                if($found_in_sql){
                    //grab the next 2 individual characters
                    $str_plusone = substr($sql,$found_in_sql + $len,1);
                    $str_plustwo = substr($sql,$found_in_sql + $len+1,1);
                    //if one of those characters is a comma, then we have our alias
                    if ($str_plusone === "," || $str_plustwo === ","){
                        //keep track of this position
                        $found = $found_in_sql;
                    }
                }
                //set the offset and increase the iteration counter
                $first_ = $found_in_sql+$len;
                $i = $i+1;
            }
        }
        //return $found, defaults have been set, so if no match was found it will be a negative number
        return $found;
    }


    /**
     * Return the order by string to use in case the column has been aliased
     *
     * @param  string $sql
     * @param  string $orig_order_match
     * @return string
     */
    private function returnOrderBy(
        $sql,
        $orig_order_match
        )
    {
        $sql = strtolower($sql);
        $orig_order_match = trim($orig_order_match);
        if (strpos($orig_order_match, "."))
            //this has a tablename defined, pass in the order match
            return $orig_order_match;

        //grab first space in order by
        $firstSpace = strpos($orig_order_match, " ");

        //split order by into column name and ascending/descending
        $orderMatch = " " . strtolower(substr($orig_order_match, 0, $firstSpace));
        $asc_desc =  substr($orig_order_match,$firstSpace);

        //look for column name as an alias in sql string
        $found_in_sql = $this->findColumnByAlias($sql, $orderMatch);

        if (!$found_in_sql) {
            //check if this column needs the tablename prefixed to it
            $orderMatch = ".".trim($orderMatch);
            $colMatchPos = strpos($sql, $orderMatch);
            if ($colMatchPos !== false) {
                //grab sub string up to column name
                $containsColStr = substr($sql,0, $colMatchPos);
                //get position of first space, so we can grab table name
                $lastSpacePos = strrpos($containsColStr, " ");
                //use positions of column name, space before name, and length of column to find the correct column name
                $col_name = substr($sql, $lastSpacePos, $colMatchPos-$lastSpacePos+strlen($orderMatch));
				//bug 25485. When sorting by a custom field in Account List and then pressing NEXT >, system gives an error
				$containsCommaPos = strpos($col_name, ",");
				if($containsCommaPos !== false) {
					$col_name = substr($col_name, $containsCommaPos+1);
				}
                //return column name
                return $col_name;
            }
            //break out of here, log this
            $GLOBALS['log']->debug("No match was found for order by, pass string back untouched as: $orig_order_match");
            return $orig_order_match;
        }
        else {
            //if found, then parse and return
            //grab string up to the aliased column
            $GLOBALS['log']->debug("order by found, process sql string");

            $psql = (trim($this->getAliasFromSQL($sql, $orderMatch )));
            if (empty($psql))
                $psql = trim(substr($sql, 0, $found_in_sql));

            //grab the last comma before the alias
            $comma_pos = strrpos($psql, " ");
            //substring between the comma and the alias to find the joined_table alias and column name
            $col_name = substr($psql,0, $comma_pos);

            //make sure the string does not have an end parenthesis
            //and is not part of a function (i.e. "ISNULL(leads.last_name,'') as name"  )
            //this is especially true for unified search from home screen

            $alias_beg_pos = 0;
            if(strpos($psql, " as "))
                $alias_beg_pos = strpos($psql, " as ");
            else if (strncasecmp($psql, 'isnull', 6))
                $alias_beg_pos = strpos($psql, " ");

            if ($alias_beg_pos > 0) {
                $col_name = substr($psql,0, $alias_beg_pos );
            }
            //add the "asc/desc" order back
            $col_name = $col_name. " ". $asc_desc;

            //pass in new order by
            $GLOBALS['log']->debug("order by being returned is " . $col_name);
            return $col_name;
        }
    }

    /**
     * Take in a string of the module and retrieve the correspondent table name
     *
     * @param  string $module_str module name
     * @param  string $sql        SQL statement
     * @return string table name
     */
    private function getTableNameFromModuleName(
        $module_str,
        $sql
        )
    {

        global $beanList, $beanFiles;
        $GLOBALS['log']->debug("Module being processed is " . $module_str);
        //get the right module files
        //the module string exists in bean list, then process bean for correct table name
        //note that we exempt the reports module from this, as queries from reporting module should be parsed for
        //correct table name.
        if (($module_str != 'Reports' && $module_str != 'SavedReport') && isset($beanList[$module_str])  &&  isset($beanFiles[$beanList[$module_str]])){
            //if the class is not already loaded, then load files
            if (!class_exists($beanList[$module_str]))
                require_once($beanFiles[$beanList[$module_str]]);

            //instantiate new bean
            $module_bean = new $beanList[$module_str]();
            //get table name from bean
            $tbl_name = $module_bean->table_name;
            //make sure table name is not just a blank space, or empty
            $tbl_name = trim($tbl_name);

            if(empty($tbl_name)){
                $GLOBALS['log']->debug("Could not find table name for module $module_str. ");
                $tbl_name = $module_str;
            }
        }
        else {
            //since the module does NOT exist in beanlist, then we have to parse the string
            //and grab the table name from the passed in sql
            $GLOBALS['log']->debug("Could not find table name from module in request, retrieve from passed in sql");
            $tbl_name = $module_str;
            $sql = strtolower($sql);

            //look for the location of the "from" in sql string
            $fromLoc = strpos ( $sql,"from" );
            if ($fromLoc>0){
                //found from, substring from the "FROM" string in sql to end
                $tableEnd = substr($sql, $fromLoc+5);
                //We know that tablename will be next parameter after from, so
                //grab the next space after table name.
                // MFH BUG #14009: Also check to see if there are any carriage returns before the next space so that we don't grab any arbitrary joins or other tables.
                $carriage_ret = strpos($tableEnd,"\n");
                $next_space = strpos ( $tableEnd," " );
                if ($carriage_ret < $next_space)
                    $next_space = $carriage_ret;
                if ($next_space > 0) {
                    $tbl_name= substr($tableEnd,0, $next_space);
                    if(empty($tbl_name)){
                        $GLOBALS['log']->debug("Could not find table name sql either, return $module_str. ");
                        $tbl_name = $module_str;
                    }
                }

                //grab the table, to see if it is aliased
                $aliasTableEnd = trim(substr($tableEnd, $next_space));
                $alias_space = strpos ($aliasTableEnd, " " );
                if ($alias_space > 0){
                    $alias_tbl_name= substr($aliasTableEnd,0, $alias_space);
                    strtolower($alias_tbl_name);
                    if(empty($alias_tbl_name)
                        || $alias_tbl_name == "where"
                        || $alias_tbl_name == "inner"
                        || $alias_tbl_name == "left"
                        || $alias_tbl_name == "join"
                        || $alias_tbl_name == "outer"
                        || $alias_tbl_name == "right") {
                        //not aliased, do nothing
                    }
                    elseif ($alias_tbl_name == "as") {
                            //the next word is the table name
                            $aliasTableEnd = trim(substr($aliasTableEnd, $alias_space));
                            $alias_space = strpos ($aliasTableEnd, " " );
                            if ($alias_space > 0) {
                                $alias_tbl_name= trim(substr($aliasTableEnd,0, $alias_space));
                                if (!empty($alias_tbl_name))
                                    $tbl_name = $alias_tbl_name;
                            }
                    }
                    else {
                        //this is table alias
                        $tbl_name = $alias_tbl_name;
                    }
                }
            }
        }
        //return table name
        $GLOBALS['log']->debug("Table name for module $module_str is: ".$tbl_name);
        return $tbl_name;
    }


	/**
     * @see DBManager::getFieldsArray()
     */
	public function getFieldsArray(
        &$result,
        $make_lower_case = false
        )
	{
		$field_array = array();

		if(! isset($result) || empty($result))
            return 0;

        $i = 0;
        while ($i < mssql_num_fields($result)) {
            $meta = mssql_fetch_field($result, $i);
            if (!$meta)
                return 0;
            if($make_lower_case==true)
                $meta->name = strtolower($meta->name);

            $field_array[] = $meta->name;

            $i++;
        }

        return $field_array;
	}

    /**
     * @see DBManager::getAffectedRowCount()
     */
	public function getAffectedRowCount()
    {
        return $this->getOne("SELECT @@ROWCOUNT");
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
        if(isset($table_descriptions[$tablename]) && isset($table_descriptions[$tablename][$name])){
            return 	$table_descriptions[$tablename][$name];
        }
        $table_descriptions[$tablename] = array();

        $sql = sprintf( "SELECT COLUMN_NAME AS Field
				, DATA_TYPE + CASE WHEN CHARACTER_MAXIMUM_LENGTH IS NOT NULL
                        THEN '(' + RTRIM(CAST(CHARACTER_MAXIMUM_LENGTH AS CHAR)) + ')' 
						ELSE '' END as 'Type'
				, CHARACTER_MAXIMUM_LENGTH
				, IS_NULLABLE AS 'Null'
				, CASE WHEN COLUMN_DEFAULT LIKE '((0))' THEN '(''0'')' ELSE COLUMN_DEFAULT END as 'Default'
			FROM INFORMATION_SCHEMA.COLUMNS
			WHERE TABLE_NAME = '%s'",
			$tablename
        );

        $result = $this->query($sql);
        while ($row = $this->fetchByAssoc($result) )
            $table_descriptions[$tablename][$row['Field']] = $row;

        if (isset($table_descriptions[$tablename][$name]))
            return 	$table_descriptions[$tablename][$name];

        return array();
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

		if ($result && $rowNum < 0) {
            $row = mssql_fetch_assoc($result);
            //MSSQL returns a space " " when a varchar column is empty ("") and not null.
            //We need to iterate through the returned row array and strip empty spaces
            if(!empty($row)){
                foreach($row as $key => $column) {
                    //notice we only strip if one space is returned.  we do not want to strip
                    //strings with intentional spaces (" foo ")
                    if (!empty($column) && $column ==" ") {
                        $row[$key] = '';
                    }
                }
            }

            if($encode && $this->encode&& is_array($row))
                return array_map('to_html', $row);

            return $row;
		}

		if ($this->getRowCount($result) > $rowNum) {
			if ( $rowNum == -1 )
                $rowNum = 0;
			@mssql_data_seek($result, $rowNum);
        }

        $this->lastmysqlrow = $rowNum;
        $row = @mssql_fetch_assoc($result);
        if($encode && $this->encode && is_array($row))
            return array_map('to_html', $row);
        return $row;
	}

    /**
     * @see DBManager::quote()
     */
    public function quote(
        $string,
        $isLike = true
        )
    {
        return $string = str_replace("'","''", parent::quote($string));
    }

    /**
     * @see DBManager::quoteForEmail()
     */
    public function quoteForEmail(
        $string,
        $isLike = true
        )
    {
        return str_replace("'","''", $string);
    }


    /**
     * @see DBManager::tableExists()
     */
    public function tableExists(
        $tableName
        )
    {
        $GLOBALS['log']->info("tableExists: $tableName");

        $this->checkConnection();
        $result = $this->query(
            "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE' AND TABLE_NAME='".$tableName."'");

        $rowCount = $this->getRowCount($result);
        $this->freeResult($result);
        return ($rowCount == 0) ? false : true;
    }

    /**
     * @see DBManager::addIndexes()
     */
    public function addIndexes(
        $tablename,
        $indexes,
        $execute = true
        )
    {
    	$alters = $this->helper->indexSQL($tablename,array(),$indexes);
    	if ($execute)
            $this->query($alters);

        return $alters;
    }

    /**
     * @see DBManager::dropIndexes()
     */
    public function dropIndexes(
        $tablename,
        $indexes,
        $execute = true
        )
    {
        $sql = '';
        foreach ($indexes as $index) {
            if ( !empty($sql) ) $sql .= ";";
            $name = $index['name'];
            if($execute)
                unset($GLOBALS['table_descriptions'][$tablename]['indexes'][$name]);
            if ($index['type'] == 'primary')
                $sql .= "ALTER TABLE $tablename DROP CONSTRAINT $name";
            else
                $sql .= "DROP INDEX $name on $tablename";
        }
        if (!empty($sql))
            if($execute)
                $this->query($sql);

        return $sql;
    }

    /**
     * @see DBManager::checkQuery()
     */
    protected function checkQuery(
        $sql
        )
    {
        return true;
    }

    /**
     * @see DBManager::getTablesArray()
     */
    public function getTablesArray()
    {
        $GLOBALS['log']->debug('MSSQL fetching table list');

        if($this->getDatabase()) {
            $tables = array();
            $r = $this->query('SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES');
            if (is_resource($r)) {
                while ($a = $this->fetchByAssoc($r))
                    $tables[] = $a['TABLE_NAME'];

                return $tables;
            }
        }

        return false; // no database available
    }


    /**
     * This call is meant to be used during install, when Full Text Search is enabled
     * Indexing would always occur after a fresh sql server install, so this code creates
     * a catalog and table with full text index.
     */
    public function wakeupFTS()
    {
        $GLOBALS['log']->debug('MSSQL about to wakeup FTS');

        if($this->getDatabase()) {
                //create wakup catalog
                $FTSqry[] = "if not exists(  select * from sys.fulltext_catalogs where name ='wakeup_catalog' )
                CREATE FULLTEXT CATALOG wakeup_catalog
                ";

                //drop wakeup table if it exists
                $FTSqry[] = "IF EXISTS(SELECT 'fts_wakeup' FROM sysobjects WHERE name = 'fts_wakeup' AND xtype='U')
                    DROP TABLE fts_wakeup
                ";
                //create wakeup table
                $FTSqry[] = "CREATE TABLE fts_wakeup(
                    id varchar(36) NOT NULL CONSTRAINT pk_fts_wakeup_id PRIMARY KEY CLUSTERED (id ASC ),
                    body text NULL,
                    kb_index int IDENTITY(1,1) NOT NULL CONSTRAINT wakeup_fts_unique_idx UNIQUE NONCLUSTERED
                )
                ";
                //create full text index
                 $FTSqry[] = "CREATE FULLTEXT INDEX ON fts_wakeup
                (
                    body
                    Language 0X0
                )
                KEY INDEX wakeup_fts_unique_idx ON wakeup_catalog
                WITH CHANGE_TRACKING AUTO
                ";

                //insert dummy data
                $FTSqry[] = "INSERT INTO fts_wakeup (id ,body)
                VALUES ('".create_guid()."', 'SugarCRM Rocks' )";


                //create queries to stop and restart indexing
                $FTSqry[] = 'ALTER FULLTEXT INDEX ON fts_wakeup STOP POPULATION';
                $FTSqry[] = 'ALTER FULLTEXT INDEX ON fts_wakeup DISABLE';
                $FTSqry[] = 'ALTER FULLTEXT INDEX ON fts_wakeup ENABLE';
                $FTSqry[] = 'ALTER FULLTEXT INDEX ON fts_wakeup SET CHANGE_TRACKING MANUAL';
                $FTSqry[] = 'ALTER FULLTEXT INDEX ON fts_wakeup START FULL POPULATION';
                $FTSqry[] = 'ALTER FULLTEXT INDEX ON fts_wakeup SET CHANGE_TRACKING AUTO';

                foreach($FTSqry as $q){
                    sleep(3);
                    $this->query($q);
                }


        }

        return false; // no database available
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
        case 'today': return "GETDATE()";
        case 'left': return "LEFT($string".$additional_parameters_string.")";
        case 'date_format':
            if(!empty($additional_parameters) && in_array("'%Y-%m'", $additional_parameters))
               return "CONVERT(varchar(7),". $string . ",120)";
            else
               return "CONVERT(varchar(10),". $string . ",120)";
        case 'IFNULL': return "ISNULL($string".$additional_parameters_string.")";
        case 'CONCAT': return "$string+".implode("+",$additional_parameters);
        case 'text2char': return "CAST($string AS varchar(8000))";
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
			    $ret =  db_convert($table.".".$field,'IFNULL', array("''"));
			else
			    $ret .=	" + ' ' + ".db_convert($table.".".$field,'IFNULL', array("''"));

		return empty($ret)?$ret:"LTRIM(RTRIM($ret))";
    }

    /**
     * @see DBManager::fromConvert()
     */
    public function fromConvert(
        $string,
        $type)
    {
        switch($type) {
        case 'datetime': return substr($string, 0,19);
        case 'date': return substr($string, 0,11);
        case 'time': return substr($string, 11);
		}

		return $string;
    }
}
