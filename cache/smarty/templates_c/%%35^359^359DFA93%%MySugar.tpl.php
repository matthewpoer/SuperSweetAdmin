<?php /* Smarty version 2.6.11, created on 2011-04-18 14:21:09
         compiled from include/MySugar/tpls/MySugar.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('function', 'sugar_getjspath', 'include/MySugar/tpls/MySugar.tpl', 65, false),array('function', 'sugar_getimagepath', 'include/MySugar/tpls/MySugar.tpl', 99, false),array('function', 'counter', 'include/MySugar/tpls/MySugar.tpl', 106, false),)), $this); ?>
<?php echo '
<style>
.menu{
	z-index:100;
}

.subDmenu{
	z-index:100;
}


li.active a img.deletePageImg {
   display: inline !important;
   margin-bottom: 2px;
}

div.moduleTitle {
height: 10px;
	}
</style>
'; ?>


<!-- begin includes for overlib -->
<script type="text/javascript" src="<?php echo smarty_function_sugar_getjspath(array('file' => 'include/javascript/sugar_grp_overlib.js'), $this);?>
"></script>
<div id="overDiv" style="position:absolute; visibility:hidden; z-index:1000"></div>
<!-- end includes for overlib -->

<script type="text/javascript">
var activePage = <?php echo $this->_tpl_vars['activePage']; ?>
;
var theme = '<?php echo $this->_tpl_vars['theme']; ?>
';
current_user_id = '<?php echo $this->_tpl_vars['current_user']; ?>
';
jsChartsArray = new Array();
var moduleName = '<?php echo $this->_tpl_vars['module']; ?>
';
document.body.setAttribute("class", "yui-skin-sam");
</script>

<script type="text/javascript" src="<?php echo smarty_function_sugar_getjspath(array('file' => 'include/javascript/sugar_grp_yui_widgets.js'), $this);?>
"></script>
<script type="text/javascript" src="<?php echo smarty_function_sugar_getjspath(array('file' => 'include/javascript/dashlets.js'), $this);?>
"></script>
<script type="text/javascript" src='<?php echo smarty_function_sugar_getjspath(array('file' => 'include/JSON.js'), $this);?>
'></script>
<script type='text/javascript' src='<?php echo smarty_function_sugar_getjspath(array('file' => 'include/MySugar/javascript/MySugar.js'), $this);?>
'></script>
<link rel='stylesheet' href='<?php echo smarty_function_sugar_getjspath(array('file' => 'include/ytree/TreeView/css/folders/tree.css'), $this);?>
'>


<?php echo $this->_tpl_vars['chartResources']; ?>

<?php echo $this->_tpl_vars['mySugarChartResources']; ?>



<div class="clear"></div>
<div id="pageContainer" class="yui-skin-sam">
<div id="pageNum_<?php echo $this->_tpl_vars['activePage']; ?>
_div">
<table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top: 5px;">
 	<tr>
	 	<td>
		
		</td>
	
		<td rowspan="3">
				<img src='<?php echo smarty_function_sugar_getimagepath(array('file' => 'blank.gif'), $this);?>
' width='40' height='1' border='0'>
		</td>
		<td align='right'>
			<?php if (! $this->_tpl_vars['lock_homepage']): ?><input id="add_dashlets" class="button" type="button" value="<?php echo $this->_tpl_vars['lblAddDashlets']; ?>
" onclick="return SUGAR.mySugar.showDashletsDialog();"/><?php endif; ?>
		</td>
	</tr>
	<tr>
		<?php echo smarty_function_counter(array('assign' => 'hiddenCounter','start' => 0,'print' => false), $this);?>

		<?php $_from = $this->_tpl_vars['columns']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['colNum'] => $this->_tpl_vars['data']):
?>
		<td valign='top' width='<?php echo $this->_tpl_vars['data']['width']; ?>
'>
			<ul class='noBullet' id='col_<?php echo $this->_tpl_vars['activePage']; ?>
_<?php echo $this->_tpl_vars['colNum']; ?>
'>
				<li id='page_<?php echo $this->_tpl_vars['activePage']; ?>
_hidden<?php echo $this->_tpl_vars['hiddenCounter']; ?>
b' style='height: 5px; margin-top: 12px\9;' class='noBullet'>&nbsp;&nbsp;&nbsp;</li>
		        <?php $_from = $this->_tpl_vars['data']['dashlets']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['id'] => $this->_tpl_vars['dashlet']):
?>		
				<li class='noBullet' id='dashlet_<?php echo $this->_tpl_vars['id']; ?>
'>
					<div id='dashlet_entire_<?php echo $this->_tpl_vars['id']; ?>
' class='dashletPanel'>
						<?php echo $this->_tpl_vars['dashlet']['script']; ?>

                        <?php echo $this->_tpl_vars['dashlet']['displayHeader']; ?>

						<?php echo $this->_tpl_vars['dashlet']['display']; ?>

                        <?php echo $this->_tpl_vars['dashlet']['displayFooter']; ?>

                  </div> 
				</li>
				<?php endforeach; endif; unset($_from); ?>
				<li id='page_<?php echo $this->_tpl_vars['activePage']; ?>
_hidden<?php echo $this->_tpl_vars['hiddenCounter']; ?>
' style='height: 5px' class='noBullet'>&nbsp;&nbsp;&nbsp;</li>
			</ul>
		</td>
		<?php echo smarty_function_counter(array(), $this);?>

		<?php endforeach; endif; unset($_from); ?>
	</tr>
</table>
	</div>
	
	<?php $_from = $this->_tpl_vars['divPages']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }if (count($_from)):
    foreach ($_from as $this->_tpl_vars['divPageIndex'] => $this->_tpl_vars['divPageNum']):
?>
	<div id="pageNum_<?php echo $this->_tpl_vars['divPageNum']; ?>
_div" style="display:none;">
	</div>
	<?php endforeach; endif; unset($_from); ?>

	
	
	<div id="dashletsDialog" style="display:none;">
		<div class="hd" id="dashletsDialogHeader"><a href="javascript:void(0)" onClick="javascript:SUGAR.mySugar.closeDashletsDialog();">
			<div class="container-close">&nbsp;</div></a><?php echo $this->_tpl_vars['lblAdd']; ?>

		</div>	
		<div class="bd" id="dashletsList">
			<form></form>
		</div>
		
	</div>
				
	
</div>

<?php echo '
<script type="text/javascript">
SUGAR.mySugar.maxCount = 	';  echo $this->_tpl_vars['maxCount'];  echo ';
SUGAR.mySugar.homepage_dd = new Array();
SUGAR.mySugar.init = function () {
	j = 0;
	
	'; ?>

	dashletIds = <?php echo $this->_tpl_vars['dashletIds']; ?>
;
	
	<?php if (! $this->_tpl_vars['lock_homepage']): ?>
	<?php echo '
	for(i in dashletIds) {
		SUGAR.mySugar.homepage_dd[j] = new ygDDList(\'dashlet_\' + dashletIds[i]);
		SUGAR.mySugar.homepage_dd[j].setHandleElId(\'dashlet_header_\' + dashletIds[i]);
		SUGAR.mySugar.homepage_dd[j].onMouseDown = SUGAR.mySugar.onDrag;  
		SUGAR.mySugar.homepage_dd[j].afterEndDrag = SUGAR.mySugar.onDrop;
		j++;
	}
	for(var wp = 0; wp <= ';  echo $this->_tpl_vars['hiddenCounter'];  echo '; wp++) {
	    SUGAR.mySugar.homepage_dd[j++] = new ygDDListBoundary(\'page_\'+activePage+\'_hidden\' + wp);
	}

	YAHOO.util.DDM.mode = 1;
	'; ?>

	<?php endif; ?>
	<?php echo '
	SUGAR.mySugar.renderDashletsDialog();
	SUGAR.mySugar.sugarCharts.loadSugarCharts(activePage);
}

</script>
'; ?>


<script type="text/javascript">
	YAHOO.util.Event.addListener(window, 'load', SUGAR.mySugar.init); 
</script>