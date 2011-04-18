<?php /* Smarty version 2.6.11, created on 2011-04-18 14:20:49
         compiled from modules/Users/tpls/wizard.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'overlib_includes', 'modules/Users/tpls/wizard.tpl', 65, false),array('function', 'sugar_getjspath', 'modules/Users/tpls/wizard.tpl', 66, false),array('function', 'sugar_help', 'modules/Users/tpls/wizard.tpl', 200, false),array('function', 'html_options', 'modules/Users/tpls/wizard.tpl', 201, false),)), $this); ?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="SHORTCUT ICON" href="<?php echo $this->_tpl_vars['FAVICON_URL']; ?>
">
<meta http-equiv="Content-Type" content="text/html; charset=<?php echo $this->_tpl_vars['APP']['LBL_CHARSET']; ?>
">
<title><?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_TITLE']; ?>
</title>
<?php echo '
<script type=\'text/javascript\'>
function disableReturnSubmission(e) {
   var key = window.event ? window.event.keyCode : e.which;
   return (key != 13);
}
</script>
'; ?>

<?php echo $this->_tpl_vars['SUGAR_JS']; ?>

<?php echo $this->_tpl_vars['SUGAR_CSS']; ?>

<?php echo $this->_tpl_vars['CSS']; ?>

</head>
<body class="yui-skin-sam">
<div id="main">
    <div id="content">
        <table style="width:auto;height:600px;" align="center"><tr><td align="center">

<form id="UserWizard" name="UserWizard" enctype='multipart/form-data' method="POST" action="index.php" onkeypress="return disableReturnSubmission(event);">
<input type='hidden' name='action' value='SaveUserWizard'/>
<input type='hidden' name='module' value='Users'/>
<span class='error'><?php echo $this->_tpl_vars['error']['main']; ?>
</span>
<?php echo smarty_function_overlib_includes(array(), $this);?>

<script type="text/javascript" src="<?php echo smarty_function_sugar_getjspath(array('file' => 'include/javascript/sugar_grp_yui_widgets.js'), $this);?>
"></script>
<script type="text/javascript" src="<?php echo smarty_function_sugar_getjspath(array('file' => 'modules/Emails/javascript/vars.js'), $this);?>
"></script>
<script type="text/javascript" src="<?php echo smarty_function_sugar_getjspath(array('file' => 'include/javascript/sugar_grp_emails.js'), $this);?>
"></script>
<script type="text/javascript" src="<?php echo smarty_function_sugar_getjspath(array('file' => 'modules/Users/User.js'), $this);?>
"></script>

<div class="dashletPanelMenu">
<div class="hd"><div class="tl"></div><div class="hd-center"></div><div class="tr"></div></div>
<div class="bd">
		<div class="ml"></div>
		<div class="bd-center">
<div id="welcome" class="screen">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
        <td>
            <div class="edit view">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <th align="left" scope="row" colspan="4"><h2><?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_WELCOME_TITLE']; ?>
</h2></th>
            </tr>
            <tr>
                <td scope="row">

                <?php if (! $this->_tpl_vars['HIDE_IF_CAN_USE_DEFAULT_OUTBOUND']): ?>
               <p> <?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_WELCOME']; ?>
</p>
                <?php else: ?>
               <p> <?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_WELCOME_NOSMTP']; ?>
</p>
                <?php endif; ?>

				<div class="userWizWelcome"><img src='include/images/sugar_wizard_welcome.jpg' border='0' width='765px' height='325px'></div>
                </td>
            </tr>
            </table>
            </div>
        </td>
    </tr>
    </table>
    <div class="nav-buttons">
        <input title="<?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_NEXT_BUTTON']; ?>
"
            class="button primary" type="button" name="next_tab1" value="  <?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_NEXT_BUTTON']; ?>
  "
            onclick="SugarWizard.changeScreen('personalinfo',false);" />
    </div>
</div>

<div id="personalinfo" class="screen">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td>
                <div class="edit view">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <th align="left" scope="row" colspan="4"><h2><slot><?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_PERSONALINFO']; ?>
</slot></h2></th>
                    </tr>
                    <tr>
                        <td align="left" scope="row" colspan="4"><i><?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_PERSONALINFO_DESC']; ?>
</i></td>
                    </tr>
                    <tr>
                        <td width="17%" scope="row" nowrap="nowrap"><slot><?php echo $this->_tpl_vars['MOD']['LBL_FIRST_NAME']; ?>
:</slot></td>
                        <td width="33%"><slot><input id='first_name' name='first_name' tabindex='1' size='25' maxlength='25' type="text" value="<?php echo $this->_tpl_vars['FIRST_NAME']; ?>
"></slot></td>
                        <td width="17%" scope="row" nowrap="nowrap"><slot><?php echo $this->_tpl_vars['MOD']['LBL_LAST_NAME']; ?>
: <span class="required"><?php echo $this->_tpl_vars['APP']['LBL_REQUIRED_SYMBOL']; ?>
</span></slot></td>
                        <td width="33%"><slot><input id='last_name' name='last_name' tabindex='2' size='25' maxlength='25' type="text" value="<?php echo $this->_tpl_vars['LAST_NAME']; ?>
"></slot></td>
                    </tr>
                    <tr>
                        <td scope="row" width="17%">
                        <?php echo $this->_tpl_vars['MOD']['LBL_EMAIL']; ?>
: <?php if ($this->_tpl_vars['REQUIRED_EMAIL_ADDRESS']): ?><span class="required"><?php echo $this->_tpl_vars['APP']['LBL_REQUIRED_SYMBOL']; ?>
</span><?php endif; ?>
                        </td>
                        <td width="33%"><slot><input name='email1' tabindex='11' size='30' maxlength='100' value='<?php echo $this->_tpl_vars['EMAIL1']; ?>
' id='email1' /></slot></td>
                        <td scope="row" nowrap="nowrap"><slot>&nbsp;</slot></td>
                        <td><slot>&nbsp;</slot></td>
                    </tr>
                    <tr>
                        <td width="17%" scope="row" nowrap="nowrap"><slot><?php echo $this->_tpl_vars['MOD']['LBL_OFFICE_PHONE']; ?>
:</slot></td>
                        <td width="33%" ><slot><input name='phone_work' type="text" tabindex='6' size='20' maxlength='25' value='<?php echo $this->_tpl_vars['PHONE_WORK']; ?>
'></slot></td>
                        <td scope="row" nowrap="nowrap"><slot><?php echo $this->_tpl_vars['MOD']['LBL_MESSENGER_TYPE']; ?>
:</slot></td>
                        <td  ><slot><?php echo $this->_tpl_vars['MESSENGER_TYPE_OPTIONS']; ?>
</slot></td>
                    </tr>
                    <tr>
                        <td scope="row"><slot><?php echo $this->_tpl_vars['MOD']['LBL_MOBILE_PHONE']; ?>
:</slot></td>
                        <td  ><slot><input name='phone_mobile' type="text" tabindex='6' size='20' maxlength='25' value='<?php echo $this->_tpl_vars['PHONE_MOBILE']; ?>
'></slot></td>
                        <td scope="row" nowrap="nowrap"><slot><?php echo $this->_tpl_vars['MOD']['LBL_MESSENGER_ID']; ?>
:</slot></td>
                        <td  ><slot><input name='messenger_id' type="text" tabindex='6' size='30' maxlength='100' value='<?php echo $this->_tpl_vars['MESSENGER_ID']; ?>
'></slot></td>
                    </tr>
                    <tr>
                        <td width="17%" scope="row" nowrap="nowrap"><slot><?php echo $this->_tpl_vars['MOD']['LBL_PRIMARY_ADDRESS']; ?>
:</slot></td>
                        <td width="33%" ><slot><textarea name='address_street' rows="2" tabindex='8' cols="30"><?php echo $this->_tpl_vars['ADDRESS_STREET']; ?>
</textarea></slot></td>
                        <td scope="row" nowrap="nowrap"><slot>&nbsp;</slot></td>
                        <td><slot>&nbsp;</slot></td>
                    </tr>
                    <tr>
                        <td width="17%" scope="row" nowrap="nowrap"><slot><?php echo $this->_tpl_vars['MOD']['LBL_CITY']; ?>
:</slot></td>
                        <td width="33%" ><slot><input name='address_city' tabindex='8' size='15' maxlength='100' value='<?php echo $this->_tpl_vars['ADDRESS_CITY']; ?>
'></slot></td>
                        <td scope="row" nowrap="nowrap"><slot><?php echo $this->_tpl_vars['MOD']['LBL_STATE']; ?>
:</slot></td>
                        <td><slot><input name='address_state' tabindex='9' size='15' maxlength='100' value='<?php echo $this->_tpl_vars['ADDRESS_STATE']; ?>
'></slot></td>
                    </tr>
                    <tr>
                        <td scope="row" nowrap="nowrap"><slot><?php echo $this->_tpl_vars['MOD']['LBL_POSTAL_CODE']; ?>
:</slot></td>
                        <td><slot><input name='address_postalcode' tabindex='9' size='10' maxlength='20' value='<?php echo $this->_tpl_vars['ADDRESS_POSTALCODE']; ?>
'></slot></td>
                        <td scope="row" nowrap="nowrap"><slot><?php echo $this->_tpl_vars['MOD']['LBL_COUNTRY']; ?>
:</slot></td>
                        <td><slot><input name='address_country' tabindex='10' size='10' maxlength='20' value='<?php echo $this->_tpl_vars['ADDRESS_COUNTRY']; ?>
'></slot></td>
                    </tr>
                </table>
                </div>
            </td>
        </tr>
    </table>
    <div class="nav-buttons">
        <?php if ($this->_tpl_vars['SKIP_WELCOME']): ?>
        <input title="<?php echo $this->_tpl_vars['MOD']['LBL_BACK']; ?>
"
            onclick="document.location.href='index.php?module=Configurator&action=AdminWizard&page=smtp';" class="button"
            type="button" name="cancel" value="  <?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_BACK_BUTTON']; ?>
  " />&nbsp;
        <?php else: ?>
        <input title="<?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_BACK_BUTTON']; ?>
"
            class="button" type="button" name="next_tab1" value="  <?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_BACK_BUTTON']; ?>
  "
            onclick="SugarWizard.changeScreen('welcome',true);" />&nbsp;
        <?php endif; ?>
        <input title="<?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_NEXT_BUTTON']; ?>
"
            class="button primary" type="button" name="next_tab1" value="  <?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_NEXT_BUTTON']; ?>
  "
            onclick="SugarWizard.changeScreen('locale',false);" />
    </div>
</div>

<div id="locale" class="screen">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td>
                <div class="edit view">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <th width="100%" align="left" scope="row" colspan="4">
                            <h2><slot><?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_LOCALE']; ?>
</slot></h2></th>
                    </tr>
                    <tr>
                        <td align="left" scope="row" colspan="4"><i><?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_LOCALE_DESC']; ?>
</i></td>
                    </tr>
                    <tr>
                        <td scope="row" nowrap="nowrap"><slot><?php echo $this->_tpl_vars['MOD']['LBL_TIMEZONE']; ?>
:</slot>&nbsp;<?php echo smarty_function_sugar_help(array('text' => $this->_tpl_vars['MOD']['LBL_TIMEZONE_TEXT']), $this);?>
</td>
                        <td colspan="3"><slot><select tabindex='14' name='timezone'><?php echo smarty_function_html_options(array('options' => $this->_tpl_vars['TIMEZONEOPTIONS'],'selected' => $this->_tpl_vars['TIMEZONE_CURRENT']), $this);?>
</select></slot></td>
                    </tr>
                    <tr>
                        <td width="17%" scope="row" nowrap="nowrap"><slot><?php echo $this->_tpl_vars['MOD']['LBL_DATE_FORMAT']; ?>
:</slot>&nbsp;<?php echo smarty_function_sugar_help(array('text' => $this->_tpl_vars['MOD']['LBL_DATE_FORMAT_TEXT']), $this);?>
</td>
                        <td width="33%"><slot><select tabindex='14' name='dateformat'><?php echo $this->_tpl_vars['DATEOPTIONS']; ?>
</select></slot></td>
                        <td scope="row" nowrap="nowrap"><slot><?php echo $this->_tpl_vars['MOD']['LBL_TIME_FORMAT']; ?>
:</slot>&nbsp;<?php echo smarty_function_sugar_help(array('text' => $this->_tpl_vars['MOD']['LBL_TIME_FORMAT_TEXT']), $this);?>
</td>
                        <td ><slot><select tabindex='14' name='timeformat'><?php echo $this->_tpl_vars['TIMEOPTIONS']; ?>
</select></slot></td>

                    </tr>
                    <tr>
                        <td colspan="4"><hr /></td>
                    </tr>
                    <tr>
                        <td width="17%" scope="row" nowrap="nowrap"><slot><?php echo $this->_tpl_vars['MOD']['LBL_CURRENCY']; ?>
:</slot>&nbsp;<?php echo smarty_function_sugar_help(array('text' => $this->_tpl_vars['MOD']['LBL_CURRENCY_TEXT']), $this);?>
</td>
                            <td ><slot>
                                <select tabindex='14' id='currency_select' name='currency' onchange='setSymbolValue(this.selectedIndex);setSigDigits();'><?php echo $this->_tpl_vars['CURRENCY']; ?>
</select>
                                <input type="hidden" id="symbol" value="">
                            </slot></td>
                        <td width="17%" scope="row" nowrap="nowrap"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td width="17%" scope="row" nowrap="nowrap"><slot>
                            <?php echo $this->_tpl_vars['MOD']['LBL_CURRENCY_SIG_DIGITS']; ?>
:
                        </slot></td>
                        <td ><slot>
                            <select id='sigDigits' onchange='setSigDigits(this.value);' name='default_currency_significant_digits'><?php echo $this->_tpl_vars['sigDigits']; ?>
</select>
                        </slot></td>
                        <td width="17%" scope="row" nowrap="nowrap"><slot>
                            <i><?php echo $this->_tpl_vars['MOD']['LBL_LOCALE_EXAMPLE_NAME_FORMAT']; ?>
:</i>
                        </slot></td>
                        <td ><slot>
                            <input type="text" disabled id="sigDigitsExample" name="sigDigitsExample">
                        </slot></td>
                    </tr>
                    <tr>
                        <td width="17%" scope="row" nowrap="nowrap"><slot><?php echo $this->_tpl_vars['MOD']['LBL_DECIMAL_SEP']; ?>
:</slot>&nbsp;<?php echo smarty_function_sugar_help(array('text' => $this->_tpl_vars['MOD']['LBL_DECIMAL_SEP_TEXT']), $this);?>
</td>
                        <td ><slot>
                            <input tabindex='14' name='dec_sep' id='default_decimal_seperator'
                                type='text' maxlength='1' size='1' value='<?php echo $this->_tpl_vars['DEC_SEP']; ?>
'
                                onkeydown='setSigDigits();' onkeyup='setSigDigits();'>
                        </slot></td>
                        <td width="17%" scope="row" nowrap="nowrap"><slot><?php echo $this->_tpl_vars['MOD']['LBL_NUMBER_GROUPING_SEP']; ?>
:</slot>&nbsp;<?php echo smarty_function_sugar_help(array('text' => $this->_tpl_vars['MOD']['LBL_NUMBER_GROUPING_SEP_TEXT']), $this);?>
</td>
                        <td><input tabindex='14' name='num_grp_sep' id='default_number_grouping_seperator'
                                    type='text' maxlength='1' size='1' value='<?php echo $this->_tpl_vars['NUM_GRP_SEP']; ?>
'
                                    onkeydown='setSigDigits();' onkeyup='setSigDigits();'></td>
                    </tr>
                    <tr>
                        <td colspan="4"><hr /></td>
                    </tr>
                    <tr>
                        <?php ob_start(); ?>&nbsp;<?php echo $this->_tpl_vars['MOD']['LBL_LOCALE_NAME_FORMAT_DESC']; ?>
<br /><?php echo $this->_tpl_vars['MOD']['LBL_LOCALE_NAME_FORMAT_DESC_2'];  $this->_smarty_vars['capture']['SMARTY_LOCALE_NAME_FORMAT_DESC'] = ob_get_contents(); ob_end_clean(); ?>
                        <td nowrap="nowrap" scope="row" valign="top"><?php echo $this->_tpl_vars['MOD']['LBL_LOCALE_DEFAULT_NAME_FORMAT']; ?>
:&nbsp;<?php echo smarty_function_sugar_help(array('text' => $this->_smarty_vars['capture']['SMARTY_LOCALE_NAME_FORMAT_DESC']), $this);?>
</td>
                        <td valign="top">
                            <input onkeyup="setPreview();" onkeydown="setPreview();" id="default_locale_name_format" type="text" tabindex='14' name="default_locale_name_format" value="<?php echo $this->_tpl_vars['default_locale_name_format']; ?>
">
                        </td>
                        <td nowrap="nowrap" scope="row" valign="top"><i><?php echo $this->_tpl_vars['MOD']['LBL_LOCALE_EXAMPLE_NAME_FORMAT']; ?>
:</i> </td>
                        <td valign="top"><input tabindex='14' name="no_value" id="nameTarget" value="" style="border: none;" disabled size="30"></td>
                    </tr>
                </table>
                </div>
            </td>
        </tr>
    </table>
    <div class="nav-buttons">
        <input title="<?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_BACK_BUTTON']; ?>
"
            class="button" type="button" name="next_tab1" value="  <?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_BACK_BUTTON']; ?>
  "
            onclick="SugarWizard.changeScreen('personalinfo',true);" />&nbsp;
        <input title="<?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_NEXT_BUTTON']; ?>
"
            class="button primary" type="button" name="next_tab1" value="  <?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_NEXT_BUTTON']; ?>
  "
            <?php if (! $this->_tpl_vars['HIDE_IF_CAN_USE_DEFAULT_OUTBOUND']): ?>
            onclick="SugarWizard.changeScreen('smtp',false);" />
            <?php else: ?>
            onclick="SugarWizard.changeScreen('finish',false);" />
            <?php endif; ?>
    </div>
</div>
<?php if (! $this->_tpl_vars['HIDE_IF_CAN_USE_DEFAULT_OUTBOUND']): ?>
<div id="smtp" class="screen">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
    <td>
        <div class="edit view">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <th align="left" scope="row" colspan="4">
                    <h2><?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_SMTP']; ?>
</h2>
                </th>
            </tr>
            <tr>
                <td align="left" scope="row" colspan="4"><i><?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_SMTP_DESC']; ?>
</i></td>
            </tr>
            <tr>
                <td width="20%" scope="row"><span id="mail_smtpserver_label"><?php echo $this->_tpl_vars['MOD']['LBL_EMAIL_PROVIDER']; ?>
</span></td>
                <td width="30%" ><slot><?php echo $this->_tpl_vars['mail_smtpdisplay']; ?>
<input id='mail_smtpserver' name='mail_smtpserver' type="hidden" value='<?php echo $this->_tpl_vars['mail_smtpserver']; ?>
' /></slot></td>
                <td scope="row">&nbsp;</td>
                <td >&nbsp;</td>
            </tr>
            <?php if (! empty ( $this->_tpl_vars['mail_smtpauth_req'] )): ?>
            <tr>
                <td width="20%" scope="row" nowrap="nowrap"><span id="mail_smtpuser_label"><?php echo $this->_tpl_vars['MOD']['LBL_MAIL_SMTPUSER']; ?>
</span></td>
                <td width="30%" ><slot><input type="text" id="mail_smtpuser" name="mail_smtpuser" size="25" maxlength="64" value="<?php echo $this->_tpl_vars['mail_smtpuser']; ?>
" tabindex='1' ></slot></td>
                <td scope="row">&nbsp;</td>
                <td >&nbsp;</td>
            </tr>
            <tr>
                <td width="20%" scope="row" nowrap="nowrap"><span id="mail_smtppass_label"><?php echo $this->_tpl_vars['MOD']['LBL_MAIL_SMTPPASS']; ?>
</span></td>
                <td width="30%" ><slot><input type="password" id="mail_smtppass" name="mail_smtppass" size="25" maxlength="64" value="<?php echo $this->_tpl_vars['mail_smtppass']; ?>
" tabindex='1'></slot></td>
                <td scope="row">&nbsp;</td>
                <td >&nbsp;</td>
            </tr>
            <?php endif; ?>
            <tr>
                <td width="17%" scope="row"><input type="button" class="button" value="<?php echo $this->_tpl_vars['APP']['LBL_EMAIL_TEST_OUTBOUND_SETTINGS']; ?>
" onclick="startOutBoundEmailSettingsTest();"></td>
                <td width="33%" >&nbsp;</td>
                <td width="17%" scope="row">&nbsp;</td>
                <td width="33%" >&nbsp;</td>
            </tr>
        </table>
        </div>
    </td>
    </table>
    <div class="nav-buttons">
        <input title="<?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_BACK_BUTTON']; ?>
"
            class="button" type="button" name="next_tab1" value="  <?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_BACK_BUTTON']; ?>
  "
            onclick="SugarWizard.changeScreen('locale',true);" />&nbsp;
        <input title="<?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_NEXT_BUTTON']; ?>
"
            class="button primary" type="button" name="next_tab1" value="  <?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_NEXT_BUTTON']; ?>
  "
            onclick="SugarWizard.changeScreen('finish',false);" />
    </div>
</div>
<?php endif; ?>
<div id="finish" class="screen">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td>
                <div class="edit view">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <th align="left" scope="row" colspan="4"><h2><?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_FINISH_TITLE']; ?>
</h2></th>
                </tr>
                <tr>
                    <td scope="row"><?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_FINISH']; ?>
</td>
                </tr>
                </table>
                </div>
            </td>
        </tr>
    </table>
    <div class="nav-buttons">
        <input title="<?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_BACK_BUTTON']; ?>
"
            class="button" type="button" name="next_tab1" value="  <?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_BACK_BUTTON']; ?>
  "
            <?php if (! $this->_tpl_vars['HIDE_IF_CAN_USE_DEFAULT_OUTBOUND']): ?>
            onclick="SugarWizard.changeScreen('smtp',true);" />&nbsp;
            <?php else: ?>
            onclick="SugarWizard.changeScreen('locale',true);" />&nbsp;
            <?php endif; ?>
        <input title="<?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_FINISH_BUTTON']; ?>
" class="button primary"
            type="submit" name="save" value="  <?php echo $this->_tpl_vars['MOD']['LBL_WIZARD_FINISH_BUTTON']; ?>
  " />&nbsp;
    </div>
</div>

			</div>
			<div class="mr"></div>

</div>
<div class="ft"><div class="bl"></div><div class="ft-center"></div><div class="br"></div></div>
</div>

<?php echo '
<script type=\'text/javascript\'>
<!--
var SugarWizard = new function()
{
    this.currentScreen = \'welcome\';

    this.handleKeyStroke = function(e)
    {
        // get the key pressed
        var key;
        if (window.event) {
            key = window.event.keyCode;
        }
        else if(e.which) {
            key = e.which
        }

        switch(key) {
        case 13:
            primaryButton = YAHOO.util.Selector.query(\'input.primary\',SugarWizard.currentScreen,true);
            primaryButton.click();
            break;
        }
    }

    this.changeScreen = function(screen,skipCheck)
    {
        if ( !skipCheck ) {
            clear_all_errors();
            var form = document.getElementById(\'UserWizard\');
            var isError = false;

            switch(this.currentScreen) {
            case \'personalinfo\':
                if ( document.getElementById(\'last_name\').value == \'\' ) {
                    add_error_style(\'UserWizard\',form.last_name.name,
                        \'';  echo $this->_tpl_vars['APP']['ERR_MISSING_REQUIRED_FIELDS']; ?>
 <?php echo $this->_tpl_vars['MOD']['LBL_LAST_NAME'];  echo '\' );
                    isError = true;
                }
                '; ?>

                <?php if ($this->_tpl_vars['REQUIRED_EMAIL_ADDRESS']): ?>
                <?php echo '
                if ( document.getElementById(\'email1\').value == \'\' ) {
                    add_error_style(\'UserWizard\',form.email1.name,
                        \'';  echo $this->_tpl_vars['APP']['ERR_MISSING_REQUIRED_FIELDS']; ?>
 <?php echo $this->_tpl_vars['MOD']['LBL_EMAIL'];  echo '\' );
                    isError = true;
                }
                '; ?>

                <?php endif; ?>
                <?php echo '
                break;
            }
            if (isError == true)
                return false;
        }

        document.getElementById(this.currentScreen).style.display = \'none\';
        document.getElementById(screen).style.display = \'block\';

        this.currentScreen = screen;
    }
}
'; ?>

<?php if ($this->_tpl_vars['SKIP_WELCOME']): ?>
SugarWizard.changeScreen('personalinfo');
<?php else: ?>
SugarWizard.changeScreen('welcome');
<?php endif;  echo '
document.onkeypress = SugarWizard.handleKeyStroke;

var mail_smtpport = \'';  echo $this->_tpl_vars['MAIL_SMTPPORT'];  echo '\';
var mail_smtpssl = \'';  echo $this->_tpl_vars['MAIL_SMTPSSL'];  echo '\';

EmailMan = {};

function startOutBoundEmailSettingsTest()
{
    var loader = new YAHOO.util.YUILoader({
    require : ["element","sugarwidgets"],
    loadOptional: true,
    skin: { base: \'blank\', defaultSkin: \'\' },
    onSuccess: testOutboundSettings,
    allowRollup: true,
    base: "include/javascript/yui/build/"
    });
    loader.addModule({
        name :"sugarwidgets",
        type : "js",
        fullpath: "include/javascript/sugarwidgets/SugarYUIWidgets.js",
        varName: "YAHOO.SUGAR",
        requires: ["datatable", "dragdrop", "treeview", "tabview"]
    });
    loader.insert();

}

function testOutboundSettings()
{
	var errorMessage = \'\';
	var isError = false;
	var fromAddress = document.getElementById("outboundtest_from_address").value;
    var errorMessage = \'\';
    var isError = false;
    var smtpServer = document.getElementById(\'mail_smtpserver\').value;

    var mailsmtpauthreq = document.getElementById(\'mail_smtpauth_req\');
    if(trim(smtpServer) == \'\' || trim(mail_smtpport) == \'\')
    {
        isError = true;
        errorMessage += "';  echo $this->_tpl_vars['MOD']['LBL_MISSING_DEFAULT_OUTBOUND_SMTP_SETTINGS'];  echo '" + "<br/>";
        overlay("';  echo $this->_tpl_vars['APP']['ERR_MISSING_REQUIRED_FIELDS'];  echo '", errorMessage, \'alert\');
        return false;
    }
    
    if(document.getElementById(\'mail_smtpuser\') && trim(document.getElementById(\'mail_smtpuser\').value) == \'\') 
    {
        isError = true;
        errorMessage += "';  echo $this->_tpl_vars['APP']['LBL_EMAIL_ACCOUNTS_SMTPUSER'];  echo '" + "<br/>";
    }
    
    if(document.getElementById(\'mail_smtppass\') && trim(document.getElementById(\'mail_smtppass\').value) == \'\') 
    {
        isError = true;
        errorMessage += "';  echo $this->_tpl_vars['APP']['LBL_EMAIL_ACCOUNTS_SMTPPASS'];  echo '" + "<br/>";
    }
    
    if(isError) {
        overlay("';  echo $this->_tpl_vars['APP']['ERR_MISSING_REQUIRED_FIELDS'];  echo '", errorMessage, \'alert\');
        return false;
    }

    testOutboundSettingsDialog();
}

function sendTestEmail()
{
    var fromAddress = document.getElementById("outboundtest_from_address").value;

    if (trim(fromAddress) == "")
    {
        overlay("';  echo $this->_tpl_vars['APP']['ERR_MISSING_REQUIRED_FIELDS'];  echo '", "{'; ?>
$APP.LBL_EMAIL_SETTINGS_FROM_TO_EMAIL_ADDR}<?php echo '", \'alert\');
        return;
    }
    else if (!isValidEmail(fromAddress)) {
        overlay("';  echo $this->_tpl_vars['APP']['ERR_INVALID_REQUIRED_FIELDS'];  echo '", "';  echo $this->_tpl_vars['APP']['LBL_EMAIL_SETTINGS_FROM_TO_EMAIL_ADDR'];  echo '", \'alert\');
        return;
    }

    //Hide the email address window and show a message notifying the user that the test email is being sent.
    EmailMan.testOutboundDialog.hide();
    overlay("';  echo $this->_tpl_vars['APP']['LBL_EMAIL_PERFORMING_TASK'];  echo '", "';  echo $this->_tpl_vars['APP']['LBL_EMAIL_ONE_MOMENT'];  echo '", \'alert\');

    var callbackOutboundTest = {
    	success	: function(o) {
    		hideOverlay();
    		overlay("';  echo $this->_tpl_vars['APP']['LBL_EMAIL_TEST_OUTBOUND_SETTINGS'];  echo '", "';  echo $this->_tpl_vars['APP']['LBL_EMAIL_TEST_NOTIFICATION_SENT'];  echo '", \'alert\');
    	}
    };
    var smtpServer = document.getElementById(\'mail_smtpserver\').value;
    if(document.getElementById(\'mail_smtpuser\') && document.getElementById(\'mail_smtppass\'))
       {
         var postDataString = \'mail_sendtype=SMTP&mail_smtpserver=\' + smtpServer + "&mail_smtpport=" + mail_smtpport + "&mail_smtpssl=" + mail_smtpssl + "&mail_smtpauth_req=true&mail_smtpuser=" + trim(document.getElementById(\'mail_smtpuser\').value) + "&mail_smtppass=" + trim(document.getElementById(\'mail_smtppass\').value) + "&outboundtest_from_address=" + fromAddress;
        }
    else
       {
    	 var postDataString = \'mail_sendtype=SMTP&mail_smtpserver=\' + smtpServer + "&mail_smtpport=" + mail_smtpport + "&mail_smtpssl=" + mail_smtpssl + "&outboundtest_from_address=" + fromAddress;
        }
	YAHOO.util.Connect.asyncRequest("POST", "index.php?action=testOutboundEmail&module=EmailMan&to_pdf=true&sugar_body_only=true", callbackOutboundTest, postDataString);
}
function testOutboundSettingsDialog() {
        // lazy load dialogue
        if(!EmailMan.testOutboundDialog) {
        	EmailMan.testOutboundDialog = new YAHOO.widget.Dialog("testOutboundDialog", {
                modal:true,
				visible:true,
            	fixedcenter:true,
            	constraintoviewport: true,
                width	: 600,
                shadow	: false
            });
            EmailMan.testOutboundDialog.setHeader("';  echo $this->_tpl_vars['APP']['LBL_EMAIL_TEST_OUTBOUND_SETTINGS'];  echo '");
            YAHOO.util.Dom.removeClass("testOutboundDialog", "yui-hidden");
        } // end lazy load

        EmailMan.testOutboundDialog.render();
        EmailMan.testOutboundDialog.show();
} // fn

function overlay(reqtitle, body, type) {
    var config = { };
    config.type = type;
    config.title = reqtitle;
    config.msg = body;
    YAHOO.SUGAR.MessageBox.show(config);
}

function hideOverlay() {
	YAHOO.SUGAR.MessageBox.hide();
}
-->
</script>
'; ?>

<?php echo $this->_tpl_vars['JAVASCRIPT']; ?>

<?php echo '
<script type="text/javascript" language="Javascript">
'; ?>

<?php echo $this->_tpl_vars['getNameJs']; ?>

<?php echo $this->_tpl_vars['getNumberJs']; ?>

<?php echo $this->_tpl_vars['currencySymbolJs']; ?>

setSymbolValue(document.getElementById('currency_select').selectedIndex);
setSigDigits();

<?php echo $this->_tpl_vars['confirmReassignJs']; ?>

</script>
</form>

<div id="testOutboundDialog" class="yui-hidden">
    <div id="testOutbound">
        <form>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="edit view">
			<tr>
				<td scope="row">
					<?php echo $this->_tpl_vars['APP']['LBL_EMAIL_SETTINGS_FROM_TO_EMAIL_ADDR']; ?>

					<span class="required">
						<?php echo $this->_tpl_vars['APP']['LBL_REQUIRED_SYMBOL']; ?>

					</span>
				</td>
				<td >
					<input type="text" id="outboundtest_from_address" name="outboundtest_from_address" size="35" maxlength="64" value="">
				</td>
			</tr>
			<tr>
				<td scope="row" colspan="2">
					<input type="button" class="button" value="   <?php echo $this->_tpl_vars['APP']['LBL_EMAIL_SEND']; ?>
   " onclick="javascript:sendTestEmail();">&nbsp;
					<input type="button" class="button" value="   <?php echo $this->_tpl_vars['APP']['LBL_CANCEL_BUTTON_LABEL']; ?>
   " onclick="javascript:EmailMan.testOutboundDialog.hide();">&nbsp;
				</td>
			</tr>
		</table>
		</form>
	</div>
</div>