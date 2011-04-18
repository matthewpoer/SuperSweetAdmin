<?php /* Smarty version 2.6.11, created on 2011-04-18 14:20:39
         compiled from modules/Users/login.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'sugar_translate', 'modules/Users/login.tpl', 42, false),array('function', 'sugar_getimagepath', 'modules/Users/login.tpl', 119, false),)), $this); ?>
<!--
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

 ********************************************************************************/
-->
<script type='text/javascript'>
var LBL_LOGIN_SUBMIT = '<?php echo smarty_function_sugar_translate(array('module' => 'Users','label' => 'LBL_LOGIN_SUBMIT'), $this);?>
';
var LBL_REQUEST_SUBMIT = '<?php echo smarty_function_sugar_translate(array('module' => 'Users','label' => 'LBL_REQUEST_SUBMIT'), $this);?>
';
</script>
<table cellpadding="0" align="center" width="100%" cellspacing="0" border="0">
	<tr>
		<td align="center">
		<div class="loginBoxShadow" style="width: 460px;">
			<div class="loginBox">
			<table cellpadding="0" cellspacing="0" border="0" align="center">
				<tr>
					<td align="left"><b><?php echo smarty_function_sugar_translate(array('module' => 'Users','label' => 'LBL_LOGIN_WELCOME_TO'), $this);?>
</b><br>
					    <?php echo $this->_tpl_vars['LOGIN_IMAGE']; ?>

					</td>
				</tr>
				<tr>
					<td align="center">
						<div class="login">
							<form action="index.php" method="post" name="DetailView" id="form" onsubmit="return document.getElementById('cant_login').value == ''">
								<table cellpadding="0" cellspacing="2" border="0" align="center" width="100%">
									<?php if ($this->_tpl_vars['LOGIN_ERROR'] != ''): ?>
									<tr>
										<td scope="row" colspan="2"><span class="error"><?php echo $this->_tpl_vars['LOGIN_ERROR']; ?>
</span></td>
						    	<?php if ($this->_tpl_vars['WAITING_ERROR'] != ''): ?>
							        <tr>
							            <td scope="row" colspan="2"><span class="error"><?php echo $this->_tpl_vars['WAITING_ERROR']; ?>
</span></td>
									</tr>
								<?php endif; ?>
									</tr>
								<?php else: ?>
									<tr>
										<td scope="row" width='1%'></td>
										<td scope="row"><span id='post_error' class="error"></span></td>
									</tr>
								<?php endif; ?>
									<tr>
										<td scope="row" colspan="2" width="100%" style="font-size: 12px; font-weight: normal; padding-bottom: 4px;">
										<?php echo smarty_function_sugar_translate(array('label' => 'NTC_LOGIN_MESSAGE'), $this);?>

										<input type="hidden" name="module" value="Users">
										<input type="hidden" name="action" value="Authenticate">
										<input type="hidden" name="return_module" value="Users">
										<input type="hidden" name="return_action" value="Login">
										<input type="hidden" id="cant_login" name="cant_login" value="">
										<input type="hidden" name="login_module" value="<?php echo $this->_tpl_vars['LOGIN_MODULE']; ?>
">
										<input type="hidden" name="login_action" value="<?php echo $this->_tpl_vars['LOGIN_ACTION']; ?>
">
										<input type="hidden" name="login_record" value="<?php echo $this->_tpl_vars['LOGIN_RECORD']; ?>
">
										</td>
									</tr>
									
                                    <tr><td>&nbsp;</td></tr>
									<tr>
										<td scope="row" width="30%"><?php echo smarty_function_sugar_translate(array('module' => 'Users','label' => 'LBL_USER_NAME'), $this);?>
:</td>
										<td width="70%"><input type="text" size='35' tabindex="1" id="user_name" name="user_name"  value='<?php echo $this->_tpl_vars['LOGIN_USER_NAME']; ?>
' /></td>
									</tr>
									<tr>
										<td scope="row"><?php echo smarty_function_sugar_translate(array('module' => 'Users','label' => 'LBL_PASSWORD'), $this);?>
:</td>
										<td width="30%"><input type="password" size='26' tabindex="2" id="user_password" name="user_password" value='<?php echo $this->_tpl_vars['LOGIN_PASSWORD']; ?>
' /></td>
									</tr>
									<?php if (! empty ( $this->_tpl_vars['SELECT_LANGUAGE'] )): ?>
									
									
									<tr>
									    <td scope="row"><?php echo smarty_function_sugar_translate(array('module' => 'Users','label' => 'LBL_LANGUAGE'), $this);?>
:</td>
                                        <td><select style='width: 152px' name='login_language' onchange="switchLanguage(this.value)"><?php echo $this->_tpl_vars['SELECT_LANGUAGE']; ?>
</select></td>
									</tr>
                                    <tr><td>&nbsp;</td></tr>
									<?php endif; ?>
									<tr>
										<td>&nbsp;</td>
										<td><input title="<?php echo smarty_function_sugar_translate(array('module' => 'Users','label' => 'LBL_LOGIN_BUTTON_TITLE'), $this);?>
" accessKey="<?php echo smarty_function_sugar_translate(array('module' => 'Users','label' => 'LBL_LOGIN_BUTTON_TITLE'), $this);?>
" class="button primary" type="submit" tabindex="3" id="login_button" name="Login" value="<?php echo smarty_function_sugar_translate(array('module' => 'Users','label' => 'LBL_LOGIN_BUTTON_LABEL'), $this);?>
"><br>&nbsp;</td>		
									</tr>
								</table>
							</form>
							<form action="index.php" method="post" name="fp_form" id="fp_form" >
								<table cellpadding="0" cellspacing="2" border="0" align="center" width="100%">
									<tr>
										<td colspan="2" class="login_more">
										<div  style="cursor: hand; cursor: pointer; display:<?php echo $this->_tpl_vars['DISPLAY_FORGOT_PASSWORD_FEATURE']; ?>
;" onclick='toggleDisplay("forgot_password_dialog");'>
											<IMG src="<?php echo smarty_function_sugar_getimagepath(array('file' => 'advanced_search.gif'), $this);?>
" border="0" alt="Hide Options" id="forgot_password_dialog_options">
											<a href='javascript:void(0)'><?php echo smarty_function_sugar_translate(array('module' => 'Users','label' => 'LBL_LOGIN_FORGOT_PASSWORD'), $this);?>
</a>
										</div>
											<div id="forgot_password_dialog" style="display:none" >
												<input type="hidden" name="entryPoint" value="GeneratePassword">
												<table cellpadding="0" cellspacing="2" border="0" align="center" width="100%" >
													<tr>
														<td colspan="2">
															<div id="generate_success" class='error' style="display:inline;"> </div>
														</td>
													</tr>
													<tr>
														<td scope="row" width="30%"><?php echo smarty_function_sugar_translate(array('module' => 'Users','label' => 'LBL_USER_NAME'), $this);?>
:</td>
														<td width="70%"><input type="text" size='26' id="fp_user_name" name="fp_user_name"  value='<?php echo $this->_tpl_vars['LOGIN_USER_NAME']; ?>
' /></td>
													</tr>
													<tr>
											            <td scope="row" width="30%"><?php echo smarty_function_sugar_translate(array('module' => 'Users','label' => 'LBL_EMAIL'), $this);?>
:</td>
											            <td width="70%"><input type="text" size='26' id="fp_user_mail" name="fp_user_mail"  value='' ></td>
											     	</tr>
													<?php echo $this->_tpl_vars['CAPTCHA']; ?>

													<tr>
													    <td scope="row" width="30%"><div id='wait_pwd_generation'></div></td>
														<td width="70%"><input title="Email Temp Password" class="button" type="button" style="display:inline" onclick="validateAndSubmit(); return document.getElementById('cant_login').value == ''" id="generate_pwd_button" name="fp_login" value="<?php echo smarty_function_sugar_translate(array('module' => 'Users','label' => 'LBL_LOGIN_SUBMIT'), $this);?>
"></td>
													</tr>
												</table>
											</div>
										</td>
									</tr>
								</table>
							</form>
						</div>


					</td>
				</tr>
			</table>
			</div>

</div>
		</td>
	</tr>
</table>
<br>
<br>