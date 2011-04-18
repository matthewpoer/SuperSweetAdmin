<?php
$manifest = array (
	'acceptable_sugar_versions' => 
	array (
		'6\\.[0-9]\\.0[a-z]'
	),
	'acceptable_sugar_flavors' =>
	array(
		'CE',
		'PRO',
		'ENT'
	),
	'readme'=>'',
	'key'=>'PSI',
	'author' => 'Matt Poer <mpoer@profilingsolutions.com>',
	'description' => 'Add a few extra configuration options that were left out of the SugarCRM Admin page',
	'icon' => '',
	'is_uninstallable' => true,
	'name' => 'SuperSweetAdmin',
	'published_date' => '2011-04-18 16:00:00',
	'type' => 'module',
	'version' => '1.0',
);
$installdefs = array (
'id' => 'SuperSweetAdmin',
	'copy' => 
	array (
		array(
			'from'           => '<basepath>/custom/Extension/modules/Administration',
			'to'             => 'custom/Extension/modules/Administration',
		),
		array(
			'from'           => '<basepath>/custom/modules/Administration',
			'to'             => 'custom/modules/Administration',
		),
	),
	'language' => 
	array (
		array (
			'from' => '<basepath>/custom/Extension/modules/Administration/Ext/Language/en_us.SuperSweetAdmin.php',
			'to_module' => 'Administration',
			'language' => 'en_us',
		)
	)
);

?>