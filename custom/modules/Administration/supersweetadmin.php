<?php
if(!defined('sugarEntry') || !sugarEntry) die('Not A Valid Entry Point');
global $current_user;
if (!is_admin($current_user)) sugar_die("Unauthorized access to administration.");
require_once('modules/Configurator/Configurator.php');
global $sugar_config;

if(!empty($_GET['phpinfo']) && $_GET['phpinfo'] == 1){
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
    $configurator = new Configurator();

    // disable count query
	if(isset($supersweetadmin['disable_count_query']) && ($supersweetadmin['disable_count_query'] == 'on')){
		$configurator->config['disable_count_query'] = true;
	} else {
		$configurator->config['disable_count_query'] = false;
	}

    // weak http referrers
    if(isset($supersweetadmin['http_referer']['weak']) && ($supersweetadmin['http_referer']['weak'] == 'on')){
        $configurator->config['http_referer']['weak'] = true;
    } else {
        $configurator->config['http_referer']['weak'] = false;
    }

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

// checking value for Weak Http Referer
if(isset($sugar_config['http_referer']['weak'])){
    $http_referer_weak = $sugar_config['http_referer']['weak'];
} else {
    $http_referer_weak = false;
}
if($http_referer_weak){
    $http_referer_weak_checked = 'CHECKED';
} else {
    $http_referer_weak_checked = '';
}

echo <<<CONFIGFORM
<form id="" name="" method="POST" action="./index.php?module=Administration&entryPoint=SuperSweetAdmin">
    <input type='hidden' name='supersweetadmin_save' value='true' />

	<input type='checkbox' name='supersweetadmin[disable_count_query]' $countquerys_checked />
	<label for="supersweetadmin[disable_count_query]">Disable count queries?</label><br>

    <input type='checkbox' name='supersweetadmin[http_referer][weak]' $http_referer_weak_checked />
    <label for="supersweetadmin[http_referer][weak]">Weak Http Referrer?</label><br>
    
    <br>
    <input type='submit' value='Save Configuration' />
</form>

<input type='button' onclick='window.close()' value='Close Config Window' />



CONFIGFORM;


?>