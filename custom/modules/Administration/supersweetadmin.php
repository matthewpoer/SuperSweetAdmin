<?php
if(!defined('sugarEntry') || !sugarEntry) die('Not A Valid Entry Point');
global $current_user;
if (!is_admin($current_user)) sugar_die("Unauthorized access to administration.");
require_once('modules/Configurator/Configurator.php');
global $sugar_config;

if($_GET['phpinfo'] == 1){
    phpinfo();
    die();
}

$config = new Configurator;

if(isset($_POST['supersweetadmin_save'])){
    if(isset($_POST['supersweetadmin'])){
        $supersweetadmin = $_POST['supersweetadmin'];
    } else {
        $supersweetadmin = array(
            'disable_count_query' => 'off'
        );
    }

	// disable count query
	$configurator = new Configurator();
	if(isset($supersweetadmin['disable_count_query']) && ($supersweetadmin['disable_count_query'] == 'on')){
		$disable_count_query = true;
	} else {
		$disable_count_query = false;
	}
	$configurator->config['disable_count_query'] = $disable_count_query;

    // config any other options?

    // save new config
	$configurator->saveConfig();

    echo "<h2 style='color:#ff0000;'>Configuration Updated</h2>";
}


// checking value for Disable Count Query
if(isset($sugar_config['disable_count_query'])){
	$countquerys = $sugar_config['disable_count_query'];
} else {
	$countquerys = false;
}
if($countquerys){
	$countquerys_checked = "CHECKED";
} else {
	$countquerys_checked = "";
}

echo <<<CONFIGFORM
<form id="" name="" method="POST" action="./index.php?module=Administration&entryPoint=SuperSweetAdmin">
    <input type='hidden' name='supersweetadmin_save' value='true' />

	<input type='checkbox' name='supersweetadmin[disable_count_query]' $countquerys_checked />
	<label for="supersweetadmin[disable_count_query]">Disable count queries?</label><br>
    
    <br>
    <input type='submit' value='Save Configuration' />
</form>

<input type='button' onclick='window.close()' value='Close Config Window' />



CONFIGFORM;


?>