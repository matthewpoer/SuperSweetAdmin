<?php /* Smarty version 2.6.11, created on 2011-04-18 14:20:49
         compiled from include/SugarEmailAddress/templates/forEditView.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'sugar_getimagepath', 'include/SugarEmailAddress/templates/forEditView.tpl', 66, false),)), $this); ?>
<?php 
global $emailInstances; 
if (empty($emailInstances))
	$emailInstances = array(); 
if (!isset($emailInstances[$this->_tpl_vars['module']]))
	$emailInstances[$this->_tpl_vars['module']] = 0;
$this->_tpl_vars['index'] = $emailInstances[$this->_tpl_vars['module']];
$emailInstances['module']++;
 ?>
<script type="text/javascript" language="javascript">
var emailAddressWidgetLoaded = false;
</script>
<script type="text/javascript" src="include/SugarEmailAddress/SugarEmailAddress.js"></script>
<script type="text/javascript">
	var module = '<?php echo $this->_tpl_vars['module']; ?>
';
</script>
<table style="border-spacing: 0pt;">
	<tr>
		<td  valign="top" NOWRAP>
			<table id="<?php echo $this->_tpl_vars['module']; ?>
emailAddressesTable<?php echo $this->_tpl_vars['index']; ?>
" class="emailaddresses">
				<tbody id="targetBody"></tbody>
				<tr>
					<td scope="row" NOWRAP>
					    <input type=hidden id="<?php echo $this->_tpl_vars['module']; ?>
_email_widget_id" name="<?php echo $this->_tpl_vars['module']; ?>
_email_widget_id" value="">
						<input type=hidden id='emailAddressWidget' name='emailAddressWidget' value='1'>
						<span class="id-ff multiple ownline">
						<button class='button' type='button'
onClick="javascript:SUGAR.EmailAddressWidget.instances.<?php echo $this->_tpl_vars['module'];  echo $this->_tpl_vars['index']; ?>
.addEmailAddress('<?php echo $this->_tpl_vars['module']; ?>
emailAddressesTable<?php echo $this->_tpl_vars['index']; ?>
','','');" 
value='<?php echo $this->_tpl_vars['app_strings']['LBL_ADD_BUTTON']; ?>
'><img src="<?php echo smarty_function_sugar_getimagepath(array('file' => "id-ff-add.png"), $this);?>
"></button>
						</span>
					</td>
					<td scope="row" NOWRAP>
					    &nbsp;
					</td>
					<td scope="row" NOWRAP>
						<?php echo $this->_tpl_vars['app_strings']['LBL_EMAIL_PRIMARY']; ?>

					</td>
					<?php if ($this->_tpl_vars['useReplyTo'] == true): ?>
					<td scope="row" NOWRAP>
						<?php echo $this->_tpl_vars['app_strings']['LBL_EMAIL_REPLY_TO']; ?>

					</td>
					<?php endif; ?>
					<?php if ($this->_tpl_vars['useOptOut'] == true): ?>
					<td scope="row" NOWRAP>
						<?php echo $this->_tpl_vars['app_strings']['LBL_EMAIL_OPT_OUT']; ?>

					</td>
					<?php endif; ?>
					<?php if ($this->_tpl_vars['useInvalid'] == true): ?>
					<td scope="row" NOWRAP>
						<?php echo $this->_tpl_vars['app_strings']['LBL_EMAIL_INVALID']; ?>

					</td>
					<?php endif; ?>
				</tr>
			</table>
		</td>
	</tr>
</table>
<input type="hidden" name="useEmailWidget" value="true">
<script type="text/javascript" language="javascript">
SUGAR_callsInProgress++;
function init<?php echo $this->_tpl_vars['module']; ?>
Email<?php echo $this->_tpl_vars['index']; ?>
(){
	if(emailAddressWidgetLoaded || SUGAR.EmailAddressWidget){
		var table = YAHOO.util.Dom.get("<?php echo $this->_tpl_vars['module']; ?>
emailAddressesTable<?php echo $this->_tpl_vars['index']; ?>
");
	    var eaw = SUGAR.EmailAddressWidget.instances.<?php echo $this->_tpl_vars['module'];  echo $this->_tpl_vars['index']; ?>
 = new SUGAR.EmailAddressWidget("<?php echo $this->_tpl_vars['module']; ?>
");
		eaw.emailView = '<?php echo $this->_tpl_vars['emailView']; ?>
';
	    eaw.emailIsRequired = "<?php echo $this->_tpl_vars['required']; ?>
";
	    eaw.tabIndex = '<?php echo $this->_tpl_vars['tabindex']; ?>
';
	    var addDefaultAddress = '<?php echo $this->_tpl_vars['addDefaultAddress']; ?>
';
	    var prefillEmailAddress = '<?php echo $this->_tpl_vars['prefillEmailAddresses']; ?>
';
	    var prefillData = <?php echo $this->_tpl_vars['prefillData']; ?>
;
	    if(prefillEmailAddress == 'true') {
	        eaw.prefillEmailAddresses('<?php echo $this->_tpl_vars['module']; ?>
emailAddressesTable<?php echo $this->_tpl_vars['index']; ?>
', prefillData);
		} else if(addDefaultAddress == 'true') {
	        eaw.addEmailAddress('<?php echo $this->_tpl_vars['module']; ?>
emailAddressesTable<?php echo $this->_tpl_vars['index']; ?>
');
		}
		if('<?php echo $this->_tpl_vars['module']; ?>
_email_widget_id') {
		   document.getElementById('<?php echo $this->_tpl_vars['module']; ?>
_email_widget_id').value = eaw.count;
		}
		SUGAR_callsInProgress--;
	}else{
		setTimeout("init<?php echo $this->_tpl_vars['module']; ?>
Email<?php echo $this->_tpl_vars['index']; ?>
();", 500);
	}
}

YAHOO.util.Event.onDOMReady(init<?php echo $this->_tpl_vars['module']; ?>
Email<?php echo $this->_tpl_vars['index']; ?>
);
</script>