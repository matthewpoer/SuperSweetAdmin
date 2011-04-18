<?php
// created: 2011-04-18 14:20:38
$GLOBALS["dictionary"]["EmailAddress"] = array (
  'table' => 'email_addresses',
  'fields' => 
  array (
    'id' => 
    array (
      'name' => 'id',
      'type' => 'id',
      'vname' => 'LBL_EMAIL_ADDRESS_ID',
      'required' => true,
    ),
    'email_address' => 
    array (
      'name' => 'email_address',
      'type' => 'varchar',
      'vname' => 'LBL_EMAIL_ADDRESS',
      'length' => 100,
      'required' => true,
    ),
    'email_address_caps' => 
    array (
      'name' => 'email_address_caps',
      'type' => 'varchar',
      'vname' => 'LBL_EMAIL_ADDRESS_CAPS',
      'length' => 100,
      'required' => true,
      'reportable' => false,
    ),
    'invalid_email' => 
    array (
      'name' => 'invalid_email',
      'type' => 'bool',
      'default' => 0,
      'vname' => 'LBL_INVALID_EMAIL',
    ),
    'opt_out' => 
    array (
      'name' => 'opt_out',
      'type' => 'bool',
      'default' => 0,
      'vname' => 'LBL_OPT_OUT',
    ),
    'date_created' => 
    array (
      'name' => 'date_created',
      'type' => 'datetime',
      'vname' => 'LBL_DATE_CREATE',
    ),
    'date_modified' => 
    array (
      'name' => 'date_modified',
      'type' => 'datetime',
      'vname' => 'LBL_DATE_MODIFIED',
    ),
    'deleted' => 
    array (
      'name' => 'deleted',
      'type' => 'bool',
      'default' => 0,
      'vname' => 'LBL_DELETED',
    ),
  ),
  'indices' => 
  array (
    0 => 
    array (
      'name' => 'email_addressespk',
      'type' => 'primary',
      'fields' => 
      array (
        0 => 'id',
      ),
    ),
    1 => 
    array (
      'name' => 'idx_ea_caps_opt_out_invalid',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'email_address_caps',
        1 => 'opt_out',
        2 => 'invalid_email',
      ),
    ),
    2 => 
    array (
      'name' => 'idx_ea_opt_out_invalid',
      'type' => 'index',
      'fields' => 
      array (
        0 => 'email_address',
        1 => 'opt_out',
        2 => 'invalid_email',
      ),
    ),
  ),
  'custom_fields' => false,
);
?>
