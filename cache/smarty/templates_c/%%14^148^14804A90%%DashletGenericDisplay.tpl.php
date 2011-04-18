<?php /* Smarty version 2.6.11, created on 2011-04-18 14:21:09
         compiled from include/Dashlets/DashletGenericDisplay.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'sugar_getimagepath', 'include/Dashlets/DashletGenericDisplay.tpl', 52, false),array('function', 'sugar_translate', 'include/Dashlets/DashletGenericDisplay.tpl', 113, false),array('function', 'counter', 'include/Dashlets/DashletGenericDisplay.tpl', 151, false),array('function', 'sugar_evalcolumn_old', 'include/Dashlets/DashletGenericDisplay.tpl', 160, false),array('function', 'sugar_field', 'include/Dashlets/DashletGenericDisplay.tpl', 162, false),array('modifier', 'default', 'include/Dashlets/DashletGenericDisplay.tpl', 111, false),array('modifier', 'lower', 'include/Dashlets/DashletGenericDisplay.tpl', 113, false),)), $this); ?>


<table cellpadding='0' cellspacing='0' width='100%' border='0' class='list view'>
    <tr class="pagination">
        <td colspan='<?php echo $this->_tpl_vars['colCount']+1; ?>
' align='right'>
            <table border='0' cellpadding='0' cellspacing='0' width='100%'>
                <tr>
                    <td align='left'>&nbsp;</td>
                    <td align='right' nowrap='nowrap'>                    
                        <?php if ($this->_tpl_vars['pageData']['urls']['startPage']): ?>
                            <!--<a href='#' onclick='return SUGAR.mySugar.retrieveDashlet("<?php echo $this->_tpl_vars['dashletId']; ?>
", "<?php echo $this->_tpl_vars['pageData']['urls']['startPage']; ?>
")' ><img src='<?php echo smarty_function_sugar_getimagepath(array('file' => "start.png"), $this);?>
' alt='<?php echo $this->_tpl_vars['navStrings']['start']; ?>
' align='absmiddle' border='0' width='14' height='13'>&nbsp;<?php echo $this->_tpl_vars['navStrings']['start']; ?>
</a>&nbsp;-->
							<button title='<?php echo $this->_tpl_vars['navStrings']['start']; ?>
' class='button' onclick='return SUGAR.mySugar.retrieveDashlet("<?php echo $this->_tpl_vars['dashletId']; ?>
", "<?php echo $this->_tpl_vars['pageData']['urls']['startPage']; ?>
")'>
								<img src='<?php echo smarty_function_sugar_getimagepath(array('file' => 'start.png'), $this);?>
' alt='<?php echo $this->_tpl_vars['navStrings']['start']; ?>
' align='absmiddle' border='0'>
							</button>
                            
                        <?php else: ?>
                            <!--<img src='<?php echo smarty_function_sugar_getimagepath(array('file' => "start_off.png"), $this);?>
' alt='<?php echo $this->_tpl_vars['navStrings']['start']; ?>
' align='absmiddle' border='0'>&nbsp;<?php echo $this->_tpl_vars['navStrings']['start']; ?>
&nbsp;&nbsp;-->
							<button title='<?php echo $this->_tpl_vars['navStrings']['start']; ?>
' class='button' disabled>
								<img src='<?php echo smarty_function_sugar_getimagepath(array('file' => 'start_off.png'), $this);?>
' alt='<?php echo $this->_tpl_vars['navStrings']['start']; ?>
' align='absmiddle' border='0'>
							</button>
                            
                        <?php endif; ?>
                        <?php if ($this->_tpl_vars['pageData']['urls']['prevPage']): ?>
                            <!--<a href='#' onclick='return SUGAR.mySugar.retrieveDashlet("<?php echo $this->_tpl_vars['dashletId']; ?>
", "<?php echo $this->_tpl_vars['pageData']['urls']['prevPage']; ?>
")' ><img src='<?php echo smarty_function_sugar_getimagepath(array('file' => "previous.png"), $this);?>
' alt='<?php echo $this->_tpl_vars['navStrings']['previous']; ?>
' align='absmiddle' border='0' width='8' height='13'>&nbsp;<?php echo $this->_tpl_vars['navStrings']['previous']; ?>
</a>&nbsp;-->
							<button title='<?php echo $this->_tpl_vars['navStrings']['previous']; ?>
' class='button' onclick='return SUGAR.mySugar.retrieveDashlet("<?php echo $this->_tpl_vars['dashletId']; ?>
", "<?php echo $this->_tpl_vars['pageData']['urls']['prevPage']; ?>
")'>
								<img src='<?php echo smarty_function_sugar_getimagepath(array('file' => 'previous.png'), $this);?>
' alt='<?php echo $this->_tpl_vars['navStrings']['previous']; ?>
' align='absmiddle' border='0'>							
							</button>
                            
                        <?php else: ?>
                            <!--<img src='<?php echo smarty_function_sugar_getimagepath(array('file' => "previous_off.png"), $this);?>
' alt='<?php echo $this->_tpl_vars['navStrings']['previous']; ?>
' align='absmiddle' border='0' width='8' height='13'>&nbsp;<?php echo $this->_tpl_vars['navStrings']['previous']; ?>
&nbsp;-->
							<button class='button' disabled title='<?php echo $this->_tpl_vars['navStrings']['previous']; ?>
'>
								<img src='<?php echo smarty_function_sugar_getimagepath(array('file' => 'previous_off.png'), $this);?>
' alt='<?php echo $this->_tpl_vars['navStrings']['previous']; ?>
' align='absmiddle' border='0'>
							</button>
                        <?php endif; ?>
                            <span class='pageNumbers'>(<?php if ($this->_tpl_vars['pageData']['offsets']['lastOffsetOnPage'] == 0): ?>0<?php else:  echo $this->_tpl_vars['pageData']['offsets']['current']+1;  endif; ?> - <?php echo $this->_tpl_vars['pageData']['offsets']['lastOffsetOnPage']; ?>
 <?php echo $this->_tpl_vars['navStrings']['of']; ?>
 <?php if ($this->_tpl_vars['pageData']['offsets']['totalCounted']):  echo $this->_tpl_vars['pageData']['offsets']['total'];  else:  echo $this->_tpl_vars['pageData']['offsets']['total'];  if ($this->_tpl_vars['pageData']['offsets']['lastOffsetOnPage'] != $this->_tpl_vars['pageData']['offsets']['total']): ?>+<?php endif;  endif; ?>)</span>
                        <?php if ($this->_tpl_vars['pageData']['urls']['nextPage']): ?>
                            <!--&nbsp;<a href='#' onclick='return SUGAR.mySugar.retrieveDashlet("<?php echo $this->_tpl_vars['dashletId']; ?>
", "<?php echo $this->_tpl_vars['pageData']['urls']['nextPage']; ?>
")' ><?php echo $this->_tpl_vars['navStrings']['next']; ?>
&nbsp;<img src='<?php echo smarty_function_sugar_getimagepath(array('file' => "next.png"), $this);?>
' alt='<?php echo $this->_tpl_vars['navStrings']['next']; ?>
' align='absmiddle' border='0' width='8' height='13'></a>&nbsp;-->
							<button title='<?php echo $this->_tpl_vars['navStrings']['next']; ?>
' class='button' onclick='return SUGAR.mySugar.retrieveDashlet("<?php echo $this->_tpl_vars['dashletId']; ?>
", "<?php echo $this->_tpl_vars['pageData']['urls']['nextPage']; ?>
")'>
								<img src='<?php echo smarty_function_sugar_getimagepath(array('file' => 'next.png'), $this);?>
' alt='<?php echo $this->_tpl_vars['navStrings']['next']; ?>
' align='absmiddle' border='0'>
							</button>
                            
                        <?php else: ?>
                           <!-- &nbsp;<?php echo $this->_tpl_vars['navStrings']['next']; ?>
&nbsp;<img src='<?php echo smarty_function_sugar_getimagepath(array('file' => "next_off.png"), $this);?>
' alt='<?php echo $this->_tpl_vars['navStrings']['next']; ?>
' align='absmiddle' border='0' width='8' height='13'>-->
							<button class='button' title='<?php echo $this->_tpl_vars['navStrings']['next']; ?>
' disabled>
								<img src='<?php echo smarty_function_sugar_getimagepath(array('file' => 'next_off.png'), $this);?>
' alt='<?php echo $this->_tpl_vars['navStrings']['next']; ?>
' align='absmiddle' border='0'>
							</button>

                        <?php endif; ?>
						<?php if ($this->_tpl_vars['pageData']['urls']['endPage'] && $this->_tpl_vars['pageData']['offsets']['total'] != $this->_tpl_vars['pageData']['offsets']['lastOffsetOnPage']): ?>
                            <!--<a href='#' onclick='return SUGAR.mySugar.retrieveDashlet("<?php echo $this->_tpl_vars['dashletId']; ?>
", "<?php echo $this->_tpl_vars['pageData']['urls']['endPage']; ?>
")' ><?php echo $this->_tpl_vars['navStrings']['end']; ?>
&nbsp;<img src='<?php echo smarty_function_sugar_getimagepath(array('file' => "end.png"), $this);?>
' alt='<?php echo $this->_tpl_vars['navStrings']['end']; ?>
' align='absmiddle' border='0' width='14' height='13'></a></td>-->
							<button title='<?php echo $this->_tpl_vars['navStrings']['end']; ?>
' class='button' onclick='return SUGAR.mySugar.retrieveDashlet("<?php echo $this->_tpl_vars['dashletId']; ?>
", "<?php echo $this->_tpl_vars['pageData']['urls']['endPage']; ?>
")'>
								<img src='<?php echo smarty_function_sugar_getimagepath(array('file' => 'end.png'), $this);?>
' alt='<?php echo $this->_tpl_vars['navStrings']['end']; ?>
' align='absmiddle' border='0'>							
							</button>
                            
						<?php elseif (! $this->_tpl_vars['pageData']['offsets']['totalCounted'] || $this->_tpl_vars['pageData']['offsets']['total'] == $this->_tpl_vars['pageData']['offsets']['lastOffsetOnPage']): ?>
                            <!--&nbsp;<?php echo $this->_tpl_vars['navStrings']['end']; ?>
&nbsp;<img src='<?php echo smarty_function_sugar_getimagepath(array('file' => "end_off.png"), $this);?>
' alt='<?php echo $this->_tpl_vars['navStrings']['end']; ?>
' align='absmiddle' border='0' width='14' height='13'>-->
							<button class='button' disabled title='<?php echo $this->_tpl_vars['navStrings']['end']; ?>
'>
							 	<img src='<?php echo smarty_function_sugar_getimagepath(array('file' => 'end_off.png'), $this);?>
' alt='<?php echo $this->_tpl_vars['navStrings']['end']; ?>
' align='absmiddle' border='0'>
							</button>
                            
                        <?php endif; ?>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr height='20'>
        <?php $_from = $this->_tpl_vars['displayColumns']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['colHeader'] => $this->_tpl_vars['params']):
?>
	        <th scope='col' width='<?php echo $this->_tpl_vars['params']['width']; ?>
%' nowrap="nowrap">
				<div style='white-space: nowrap;'width='100%' align='<?php echo ((is_array($_tmp=@$this->_tpl_vars['params']['align'])) ? $this->_run_mod_handler('default', true, $_tmp, 'left') : smarty_modifier_default($_tmp, 'left')); ?>
'>
                <?php if (((is_array($_tmp=@$this->_tpl_vars['params']['sortable'])) ? $this->_run_mod_handler('default', true, $_tmp, true) : smarty_modifier_default($_tmp, true))): ?> 
	                <a href='#' onclick='return SUGAR.mySugar.retrieveDashlet("<?php echo $this->_tpl_vars['dashletId']; ?>
", "<?php echo $this->_tpl_vars['pageData']['urls']['orderBy'];  echo ((is_array($_tmp=((is_array($_tmp=@$this->_tpl_vars['params']['orderBy'])) ? $this->_run_mod_handler('default', true, $_tmp, @$this->_tpl_vars['colHeader']) : smarty_modifier_default($_tmp, @$this->_tpl_vars['colHeader'])))) ? $this->_run_mod_handler('lower', true, $_tmp) : smarty_modifier_lower($_tmp)); ?>
&sugar_body_only=1&id=<?php echo $this->_tpl_vars['dashletId']; ?>
")' class='listViewThLinkS1'><?php echo smarty_function_sugar_translate(array('label' => $this->_tpl_vars['params']['label'],'module' => $this->_tpl_vars['pageData']['bean']['moduleDir']), $this);?>
</a>&nbsp;&nbsp;
	                <?php if (((is_array($_tmp=((is_array($_tmp=@$this->_tpl_vars['params']['orderBy'])) ? $this->_run_mod_handler('default', true, $_tmp, @$this->_tpl_vars['colHeader']) : smarty_modifier_default($_tmp, @$this->_tpl_vars['colHeader'])))) ? $this->_run_mod_handler('lower', true, $_tmp) : smarty_modifier_lower($_tmp)) == $this->_tpl_vars['pageData']['ordering']['orderBy']): ?>
	                    <?php if ($this->_tpl_vars['pageData']['ordering']['sortOrder'] == 'ASC'): ?>
                            <?php ob_start(); ?>arrow_down.<?php echo $this->_tpl_vars['arrowExt'];  $this->_smarty_vars['capture']['default'] = ob_get_contents();  $this->assign('imageName', ob_get_contents());ob_end_clean(); ?>
	                        <img border='0' src='<?php echo smarty_function_sugar_getimagepath(array('file' => $this->_tpl_vars['imageName']), $this);?>
' width='<?php echo $this->_tpl_vars['arrowWidth']; ?>
' height='<?php echo $this->_tpl_vars['arrowHeight']; ?>
' align='absmiddle' alt='<?php echo $this->_tpl_vars['arrowAlt']; ?>
'>
	                    <?php else: ?>
                            <?php ob_start(); ?>arrow_up.<?php echo $this->_tpl_vars['arrowExt'];  $this->_smarty_vars['capture']['default'] = ob_get_contents();  $this->assign('imageName', ob_get_contents());ob_end_clean(); ?>
	                        <img border='0' src='<?php echo smarty_function_sugar_getimagepath(array('file' => $this->_tpl_vars['imageName']), $this);?>
' width='<?php echo $this->_tpl_vars['arrowWidth']; ?>
' height='<?php echo $this->_tpl_vars['arrowHeight']; ?>
' align='absmiddle' alt='<?php echo $this->_tpl_vars['arrowAlt']; ?>
'>
	                    <?php endif; ?>
	                <?php else: ?>
                        <?php ob_start(); ?>arrow.<?php echo $this->_tpl_vars['arrowExt'];  $this->_smarty_vars['capture']['default'] = ob_get_contents();  $this->assign('imageName', ob_get_contents());ob_end_clean(); ?>
	                    <img border='0' src='<?php echo smarty_function_sugar_getimagepath(array('file' => $this->_tpl_vars['imageName']), $this);?>
' width='<?php echo $this->_tpl_vars['arrowWidth']; ?>
' height='<?php echo $this->_tpl_vars['arrowHeight']; ?>
' align='absmiddle' alt='<?php echo $this->_tpl_vars['arrowAlt']; ?>
'>
	                <?php endif; ?>
	           <?php else: ?>
                    <?php if (! isset ( $this->_tpl_vars['params']['noHeader'] ) || $this->_tpl_vars['params']['noHeader'] == false): ?> 
	           		  <?php echo smarty_function_sugar_translate(array('label' => $this->_tpl_vars['params']['label'],'module' => $this->_tpl_vars['pageData']['bean']['moduleDir']), $this);?>

                    <?php endif; ?>
	           <?php endif; ?>
			   </div>
            </th>
        <?php endforeach; endif; unset($_from); ?>
		<?php if (! empty ( $this->_tpl_vars['quickViewLinks'] )): ?>
		<th scope='col' nowrap="nowrap" width='1%'>&nbsp;</th>
		<?php endif; ?>
    </tr>
        
	<?php $_from = $this->_tpl_vars['data']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }$this->_foreach['rowIteration'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['rowIteration']['total'] > 0):
    foreach ($_from as $this->_tpl_vars['id'] => $this->_tpl_vars['rowData']):
        $this->_foreach['rowIteration']['iteration']++;
?>
		<?php if ((1 & $this->_foreach['rowIteration']['iteration'])): ?>
			<?php $this->assign('_rowColor', $this->_tpl_vars['rowColor'][0]); ?>
		<?php else: ?>
			<?php $this->assign('_rowColor', $this->_tpl_vars['rowColor'][1]); ?>
		<?php endif; ?>
		<tr height='20' class='<?php echo $this->_tpl_vars['_rowColor']; ?>
S1'>
			<?php if ($this->_tpl_vars['prerow']): ?>
			<td width='1%' nowrap='nowrap'>
					<input onclick='sListView.check_item(this, document.MassUpdate)' type='checkbox' class='checkbox' name='mass[]' value='<?php echo ((is_array($_tmp=@$this->_tpl_vars['rowData'][$this->_tpl_vars['params']['id']])) ? $this->_run_mod_handler('default', true, $_tmp, @$this->_tpl_vars['rowData']['ID']) : smarty_modifier_default($_tmp, @$this->_tpl_vars['rowData']['ID'])); ?>
'>
			</td>
			<?php endif; ?>
			<?php echo smarty_function_counter(array('start' => 0,'name' => 'colCounter','print' => false,'assign' => 'colCounter'), $this);?>

			<?php $_from = $this->_tpl_vars['displayColumns']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['col'] => $this->_tpl_vars['params']):
?>
			    <?php echo '<td scope=\'row\' align=\'';  echo ((is_array($_tmp=@$this->_tpl_vars['params']['align'])) ? $this->_run_mod_handler('default', true, $_tmp, 'left') : smarty_modifier_default($_tmp, 'left'));  echo '\' valign="top" ';  if (( $this->_tpl_vars['params']['type'] == 'teamset' )):  echo 'class="nowrap"';  endif;  echo '>';  if ($this->_tpl_vars['col'] == 'NAME' || $this->_tpl_vars['params']['bold']):  echo '<b>';  endif;  echo '';  if ($this->_tpl_vars['params']['link'] && ! $this->_tpl_vars['params']['customCode']):  echo '<';  echo ((is_array($_tmp=@$this->_tpl_vars['pageData']['tag'][$this->_tpl_vars['id']][$this->_tpl_vars['params']['ACLTag']])) ? $this->_run_mod_handler('default', true, $_tmp, @$this->_tpl_vars['pageData']['tag'][$this->_tpl_vars['id']]['MAIN']) : smarty_modifier_default($_tmp, @$this->_tpl_vars['pageData']['tag'][$this->_tpl_vars['id']]['MAIN']));  echo ' href=\'index.php?action=';  echo ((is_array($_tmp=@$this->_tpl_vars['params']['action'])) ? $this->_run_mod_handler('default', true, $_tmp, 'DetailView') : smarty_modifier_default($_tmp, 'DetailView'));  echo '&module=';  if ($this->_tpl_vars['params']['dynamic_module']):  echo '';  echo $this->_tpl_vars['rowData'][$this->_tpl_vars['params']['dynamic_module']];  echo '';  else:  echo '';  echo ((is_array($_tmp=@$this->_tpl_vars['params']['module'])) ? $this->_run_mod_handler('default', true, $_tmp, @$this->_tpl_vars['pageData']['bean']['moduleDir']) : smarty_modifier_default($_tmp, @$this->_tpl_vars['pageData']['bean']['moduleDir']));  echo '';  endif;  echo '&record=';  echo ((is_array($_tmp=@$this->_tpl_vars['rowData'][$this->_tpl_vars['params']['id']])) ? $this->_run_mod_handler('default', true, $_tmp, @$this->_tpl_vars['rowData']['ID']) : smarty_modifier_default($_tmp, @$this->_tpl_vars['rowData']['ID']));  echo '&offset=';  echo $this->_tpl_vars['pageData']['offsets']['current']+$this->_foreach['rowIteration']['iteration'];  echo '&stamp=';  echo $this->_tpl_vars['pageData']['stamp'];  echo '\'>';  endif;  echo '';  if ($this->_tpl_vars['params']['customCode']):  echo '';  echo smarty_function_sugar_evalcolumn_old(array('var' => $this->_tpl_vars['params']['customCode'],'rowData' => $this->_tpl_vars['rowData']), $this); echo '';  else:  echo '';  echo smarty_function_sugar_field(array('parentFieldArray' => $this->_tpl_vars['rowData'],'vardef' => $this->_tpl_vars['params'],'displayType' => 'ListView','field' => $this->_tpl_vars['col']), $this); echo '';  endif;  echo '';  if (empty ( $this->_tpl_vars['rowData'][$this->_tpl_vars['col']] ) && empty ( $this->_tpl_vars['params']['customCode'] )):  echo '&nbsp;';  endif;  echo '';  if ($this->_tpl_vars['params']['link'] && ! $this->_tpl_vars['params']['customCode']):  echo '</';  echo ((is_array($_tmp=@$this->_tpl_vars['pageData']['tag'][$this->_tpl_vars['id']][$this->_tpl_vars['params']['ACLTag']])) ? $this->_run_mod_handler('default', true, $_tmp, @$this->_tpl_vars['pageData']['tag'][$this->_tpl_vars['id']]['MAIN']) : smarty_modifier_default($_tmp, @$this->_tpl_vars['pageData']['tag'][$this->_tpl_vars['id']]['MAIN']));  echo '>';  endif;  echo '';  if ($this->_tpl_vars['col'] == 'NAME' || $this->_tpl_vars['params']['bold']):  echo '</b>';  endif;  echo '</td>'; ?>

				<?php echo smarty_function_counter(array('name' => 'colCounter'), $this);?>

			<?php endforeach; endif; unset($_from); ?>
			<?php if (! empty ( $this->_tpl_vars['quickViewLinks'] )): ?>
			<td width='1%' class='<?php echo $this->_tpl_vars['_rowColor']; ?>
S1' bgcolor='<?php echo $this->_tpl_vars['_bgColor']; ?>
' nowrap>
				<?php if ($this->_tpl_vars['pageData']['access']['edit']): ?>
					<a title='<?php echo $this->_tpl_vars['editLinkString']; ?>
' href='index.php?action=EditView&module=<?php echo ((is_array($_tmp=@$this->_tpl_vars['params']['module'])) ? $this->_run_mod_handler('default', true, $_tmp, @$this->_tpl_vars['pageData']['bean']['moduleDir']) : smarty_modifier_default($_tmp, @$this->_tpl_vars['pageData']['bean']['moduleDir'])); ?>
&record=<?php echo ((is_array($_tmp=@$this->_tpl_vars['rowData'][$this->_tpl_vars['params']['parent_id']])) ? $this->_run_mod_handler('default', true, $_tmp, @$this->_tpl_vars['rowData']['ID']) : smarty_modifier_default($_tmp, @$this->_tpl_vars['rowData']['ID'])); ?>
&offset=<?php echo $this->_tpl_vars['pageData']['offsets']['current']+$this->_foreach['rowIteration']['iteration']; ?>
&stamp=<?php echo $this->_tpl_vars['pageData']['stamp']; ?>
&return_module=Home&return_action=index'><img border="0" src="<?php echo smarty_function_sugar_getimagepath(array('file' => "edit_inline.png"), $this);?>
"></a>
				<?php endif; ?>
				<?php if ($this->_tpl_vars['pageData']['access']['view']): ?>
					<a title='<?php echo $this->_tpl_vars['viewLinkString']; ?>
' href='index.php?action=DetailView&module=<?php echo ((is_array($_tmp=@$this->_tpl_vars['params']['module'])) ? $this->_run_mod_handler('default', true, $_tmp, @$this->_tpl_vars['pageData']['bean']['moduleDir']) : smarty_modifier_default($_tmp, @$this->_tpl_vars['pageData']['bean']['moduleDir'])); ?>
&record=<?php echo ((is_array($_tmp=@$this->_tpl_vars['rowData'][$this->_tpl_vars['params']['parent_id']])) ? $this->_run_mod_handler('default', true, $_tmp, @$this->_tpl_vars['rowData']['ID']) : smarty_modifier_default($_tmp, @$this->_tpl_vars['rowData']['ID'])); ?>
&offset=<?php echo $this->_tpl_vars['pageData']['offsets']['current']+$this->_foreach['rowIteration']['iteration']; ?>
&stamp=<?php echo $this->_tpl_vars['pageData']['stamp']; ?>
&return_module=Home&return_action=index'><img border="0" src="<?php echo smarty_function_sugar_getimagepath(array('file' => "view_inline.png"), $this);?>
"></a>
				<?php endif; ?>
			</td>
			<?php endif; ?>
	    	</tr>
	<?php endforeach; else: ?>
	<tr height='20' class='<?php echo $this->_tpl_vars['rowColor'][0]; ?>
S1'>
	    <td colspan="<?php echo $this->_tpl_vars['colCount']; ?>
">
	        <em><?php echo $this->_tpl_vars['APP']['LBL_NO_DATA']; ?>
</em>
	    </td>
	</tr>
	<?php endif; unset($_from); ?>
</table>