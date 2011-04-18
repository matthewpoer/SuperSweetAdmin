<?php
// created: 2011-04-18 14:59:43
$GLOBALS["dictionary"]["UpgradeHistory"] = array (
  'table' => 'upgrade_history',
  'comment' => 'Tracks Sugar upgrades made over time; used by Upgrade Wizard and Module Loader',
  'fields' => 
  array (
    'id' => 
    array (
      'name' => 'id',
      'type' => 'id',
      'required' => true,
      'reportable' => false,
      'comment' => 'Unique identifier',
    ),
    'filename' => 
    array (
      'name' => 'filename',
      'type' => 'varchar',
      'len' => '255',
      'comment' => 'Cached filename containing the upgrade scripts and content',
    ),
    'md5sum' => 
    array (
      'name' => 'md5sum',
      'type' => 'varchar',
      'len' => '32',
      'comment' => 'The MD5 checksum of the upgrade file',
    ),
    'type' => 
    array (
      'name' => 'type',
      'type' => 'varchar',
      'len' => '30',
      'comment' => 'The upgrade type (module, patch, theme, etc)',
    ),
    'status' => 
    array (
      'name' => 'status',
      'type' => 'varchar',
      'len' => '50',
      'comment' => 'The status of the upgrade (ex:  "installed")',
    ),
    'version' => 
    array (
      'name' => 'version',
      'type' => 'varchar',
      'len' => '10',
      'comment' => 'Version as contained in manifest file',
    ),
    'name' => 
    array (
      'name' => 'name',
      'type' => 'varchar',
      'len' => '255',
    ),
    'description' => 
    array (
      'name' => 'description',
      'type' => 'text',
    ),
    'id_name' => 
    array (
      'name' => 'id_name',
      'type' => 'varchar',
      'len' => '255',
      'comment' => 'The unique id of the module',
    ),
    'manifest' => 
    array (
      'name' => 'manifest',
      'type' => 'longtext',
      'comment' => 'A serialized copy of the manifest file.',
    ),
    'date_entered' => 
    array (
      'name' => 'date_entered',
      'type' => 'datetime',
      'required' => true,
      'comment' => 'Date of upgrade or module load',
    ),
    'enabled' => 
    array (
      'name' => 'enabled',
      'type' => 'bool',
      'len' => '1',
      'default' => '1',
    ),
  ),
  'indices' => 
  array (
    0 => 
    array (
      'name' => 'upgrade_history_pk',
      'type' => 'primary',
      'fields' => 
      array (
        0 => 'id',
      ),
    ),
    1 => 
    array (
      'name' => 'upgrade_history_md5_uk',
      'type' => 'unique',
      'fields' => 
      array (
        0 => 'md5sum',
      ),
    ),
  ),
);
?>
