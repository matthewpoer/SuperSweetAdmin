<?php /* Smarty version 2.6.11, created on 2011-04-18 14:20:34
         compiled from ModuleInstall/PackageManager/tpls/PackageForm.tpl */ ?>
<?php echo $this->_tpl_vars['scripts']; ?>

<?php echo $this->_tpl_vars['TREEHEADER']; ?>

<?php echo '

<style type="text/css">
#demo { width:100%; }
#demo .yui-content {
    padding:1em; /* pad content container */
}
.list {list-style:square;width:500px;padding-left:16px;}
.list li{padding:2px;font-size:8pt;}

/* hide the tab content while loading */
.tab-content{display:none;}

pre {
   font-size:11px;
}

#tabs1 {width:100%;}
#tabs1 .yui-ext-tabbody {border:1px solid #999;border-top:none;}
#tabs1 .yui-ext-tabitembody {display:none;padding:10px;}

/* default loading indicator for ajax calls */
.loading-indicator {
	font-size:8pt;
	background-image:url(\'../../resources/images/grid/loading.gif\');
	background-repeat: no-repeat;
	background-position: left;
	padding-left:20px;
}
/* height of the rows in the grids */
.ygrid-row {
    height:27px;
}
.ygrid-col {
    height:27px !important;
}
</style>
'; ?>

<?php echo $this->_tpl_vars['INSTALLED_PACKAGES_HOLDER']; ?>

<br>

<form action='<?php echo $this->_tpl_vars['form_action']; ?>
' method="post" name="installForm">
<input type=hidden name="release_id">
<?php echo $this->_tpl_vars['hidden_fields']; ?>

<div id='server_upload_div'>
<?php echo $this->_tpl_vars['FORM_2_PLACE_HOLDER']; ?>

<?php echo $this->_tpl_vars['MODULE_SELECTOR']; ?>

<div id='search_results_div'></div>
</div>
</form>
<div id='local_upload_div'>
<?php echo $this->_tpl_vars['FORM_1_PLACE_HOLDER']; ?>

</div>

<?php if ($this->_tpl_vars['module_load'] == 'true'): ?>
<div id='upload_table'>
<table width='100%'><tr><td><div id='patch_downloads' class='ygrid-mso' style='height:205px;'></div></td></tr></table>
</div>

<?php echo '<script>
//PackageManager.toggleView(\'browse\');
</script>
'; ?>

<?php endif; ?>


