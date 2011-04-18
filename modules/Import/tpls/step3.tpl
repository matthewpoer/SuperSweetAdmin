{*

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




*}
{literal}
<style>
<!--
textarea { width: 20em }
-->
</style>
{/literal}
<script type="text/javascript" src="{sugar_getjspath file='include/javascript/sugar_grp_yui_widgets.js'}"></script>
{overlib_includes}
{$MODULE_TITLE}
<form enctype="multipart/form-data" real_id="importstep3" id="importstep3" name="importstep3" method="POST" action="index.php">
<input type="hidden" name="module" value="Import">
<input type="hidden" name="custom_delimiter" value="{$CUSTOM_DELIMITER}">
<input type="hidden" name="custom_enclosure" value="{$CUSTOM_ENCLOSURE}">
<input type="hidden" name="import_type" value="{$TYPE}">
<input type="hidden" name="source" value="{$SOURCE}">
<input type="hidden" name="source_id" value="{$SOURCE_ID}">
<input type="hidden" name="action" value="Step3">
<input type="hidden" name="import_module" value="{$IMPORT_MODULE}">
<input type="hidden" name="to_pdf" value="1">
<input type="hidden" name="has_header" value="{$HAS_HEADER}">
<input type="hidden" name="tmp_file" value="{$TMP_FILE}">
<input type="hidden" name="tmp_file_base" value="{$TMP_FILE}">
<input type="hidden" name="firstrow" value="{$FIRSTROW}">
<input type="hidden" name="columncount" value ="{$COLUMNCOUNT}">
<input type="hidden" name="display_tabs_def">

<div align="right">
    <span class="required" align="right">{$APP.LBL_REQUIRED_SYMBOL}</span> {$APP.NTC_REQUIRED}
</div>

<p>
{$MOD.LBL_SELECT_FIELDS_TO_MAP}
</p>
<br />
<table border="0" cellpadding="0" width="100%" id="importTable" class="detail view">
{foreach from=$rows key=key item=item name=rows}
{if $smarty.foreach.rows.first}
<tr>
    <td style="text-align: left;" scope="row">
        <b>{$MOD.LBL_DATABASE_FIELD}</b>&nbsp;
        {sugar_help text=$MOD.LBL_DATABASE_FIELD_HELP}
    </td>
    {if $HAS_HEADER == 'on'}
    <td style="text-align: left;" scope="row">
        <b>{$MOD.LBL_HEADER_ROW}</b>&nbsp;
        {sugar_help text=$MOD.LBL_HEADER_ROW_HELP}
    </td>
    {/if}
    <td style="text-align: left;" scope="row">
        <b>{$MOD.LBL_DEFAULT_VALUE}</b>&nbsp;
        {sugar_help text=$MOD.LBL_DEFAULT_VALUE_HELP}
    </td>
    <td style="text-align: left;" scope="row">
        <b>{$MOD.LBL_ROW} 1</b>&nbsp;
        {sugar_help text=$MOD.LBL_ROW_HELP}
    </td>
    {if $HAS_HEADER != 'on'}
    <td style="text-align: left;"><b>{$MOD.LBL_ROW} 2</b></td>
    {/if}
</tr>
{/if}
<tr>
    <td valign="top" align="left" id="row_{$smarty.foreach.rows.index}_col_0">
        <select class='fixedwidth' name="colnum_{$smarty.foreach.rows.index}">
            <option value="-1">{$MOD.LBL_DONT_MAP}</option>
            {$item.field_choices}
        </select>
    </td>
    {if $HAS_HEADER == 'on'}
    <td id="row_{$smarty.foreach.rows.index}_header">{$item.cell1}</td>
    {/if}
    <td id="defaultvaluepicker_{$smarty.foreach.rows.index}" nowrap="nowrap">
        {$item.default_field}
    </td>
    {if $item.show_remove}
    <td colspan="2">
        <input title="{$MOD.LBL_REMOVE_ROW}" accessKey=""
            id="deleterow_{$smarty.foreach.rows.index}" class="button" type="button"
            value="  {$MOD.LBL_REMOVE_ROW}  ">
    </td>
    {else}
    {if $HAS_HEADER != 'on'}
    <td id="row_{$smarty.foreach.rows.index}_col_1" scope="row">{$item.cell1}</td>
    {/if}
    <td id="row_{$smarty.foreach.rows.index}_col_2" scope="row">{$item.cell2}</td>
    {/if}
</tr>
{/foreach}
<tr>
    <td align="left" colspan="4" style="background: transparent;">
        <input title="{$MOD.LBL_ADD_ROW}" accessKey="" id="addrow" class="button" type="button"
            name="button" value="  {$MOD.LBL_ADD_ROW}  ">
        <input title="{$MOD.LBL_SHOW_ADVANCED_OPTIONS}" accessKey="" id="toggleImportOptions" class="button" type="button"
            name="button" value="  {$MOD.LBL_SHOW_ADVANCED_OPTIONS}  ">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span scope="row"><strong>{$MOD.LBL_SAVE_MAPPING_AS}</strong></span>
        <span >
            <input type="text" name="save_map_as" id="save_map_as" value=""
                style="width: 20em" maxlength="254">
            &nbsp;{sugar_help text=$MOD.LBL_SAVE_MAPPING_HELP}
        </span>
    </td>
</tr>
<tr style="display: none;" id="importOptions">
    <td valign="middle" colspan="4">
        <table border="0" width="100%">
        <tr>
            <td valign="top" width="50%">
                <div>
                    <h4>{$MOD.LBL_IMPORT_FILE_SETTINGS}&nbsp;{sugar_help text=$MOD.LBL_IMPORT_FILE_SETTINGS_HELP}</h4>
                    <table border=0 class="edit view">
                    <tr>
                        <td scope="row"><slot>{$MOD.LBL_CHARSET}</slot></td>
                        <td ><slot><select tabindex='4' name='importlocale_charset'>{$CHARSETOPTIONS}</select></slot></td>
                    </tr>
                    <tr>
                        <td scope="row"><slot>{$MOD.LBL_DATE_FORMAT}</slot></td>
                        <td ><slot><select tabindex='4' name='importlocale_dateformat'>{$DATEOPTIONS}</select></slot></td>
                    </tr>
                    <tr>
                        <td scope="row"><slot>{$MOD.LBL_TIME_FORMAT}</slot></td>
                        <td ><slot><select tabindex='4' name='importlocale_timeformat'>{$TIMEOPTIONS}</select></slot></td>
                    </tr>
                    <tr>
                        <td scope="row"><slot>{$MOD.LBL_TIMEZONE}</slot></td>
                        <td ><slot><select tabindex='4' name='importlocale_timezone'>{html_options options=$TIMEZONEOPTIONS selected=$TIMEZONE_CURRENT}</select></slot></td>
                    </tr>
                    <tr>
                        <td scope="row"><slot>{$MOD.LBL_CURRENCY}</slot></td>
                        <td ><slot>
                            <select tabindex='4' id='currency_select' name='importlocale_currency' onchange='setSymbolValue(this.selectedIndex);setSigDigits();'>{$CURRENCY}</select>
                            <input type="hidden" id="symbol" value="">
                        </slot></td>
                    </tr>
                    <tr>
                        <td scope="row"><slot>
                            {$MOD.LBL_CURRENCY_SIG_DIGITS}:
                        </slot></td>
                        <td ><slot>
                            <select id='sigDigits' onchange='setSigDigits(this.value);' name='importlocale_default_currency_significant_digits'>{$sigDigits}</select>
                        </slot></td>
                    </tr>
                    <tr>
                        <td scope="row"><slot>
                            <i>{$MOD.LBL_LOCALE_EXAMPLE_NAME_FORMAT}</i>:
                        </slot></td>
                        <td ><slot>
                            <input type="text" disabled id="sigDigitsExample" name="sigDigitsExample">
                        </slot></td>
                    </tr>
                    <tr>
                        <td scope="row"><slot>{$MOD.LBL_NUMBER_GROUPING_SEP}</slot></td>
                        <td ><slot>
                            <input tabindex='4' name='importlocale_num_grp_sep' id='default_number_grouping_seperator'
                                type='text' maxlength='1' size='1' value='{$NUM_GRP_SEP}'
                                onkeydown='setSigDigits();' onkeyup='setSigDigits();'>
                        </slot></td>
                    </tr>
                    <tr>
                        <td scope="row"><slot>{$MOD.LBL_DECIMAL_SEP}</slot></td>
                        <td ><slot>
                            <input tabindex='4' name='importlocale_dec_sep' id='default_decimal_seperator'
                                type='text' maxlength='1' size='1' value='{$DEC_SEP}'
                                onkeydown='setSigDigits();' onkeyup='setSigDigits();'>
                        </slot></td>
                    </tr>
                    <tr>
                        <td scope="row" valign="top">{$MOD.LBL_LOCALE_DEFAULT_NAME_FORMAT}: </td>
                        <td  valign="top">
                            <input onkeyup="setPreview();" onkeydown="setPreview();" id="default_locale_name_format" type="text" tabindex='4' name="importlocale_default_locale_name_format" value="{$default_locale_name_format}">
                           <br />{$MOD.LBL_LOCALE_NAME_FORMAT_DESC}
                        </td>
                    </tr>
                    <tr>
                        <td scope="row" valign="top"><i>{$MOD.LBL_LOCALE_EXAMPLE_NAME_FORMAT}:</i> </td>
                        <td  valign="top"><input tabindex='4' id="nameTarget" name="no_value" id=":q" value="" style="border: none;" disabled size="50"></td>
                    </tr>
                    </table>
                </div>
            </td>
            <td valign="top" width="50%">
                <div>
                    <h4>{$MOD.LBL_VERIFY_DUPS}&nbsp;{sugar_help text=$MOD.LBL_VERIFY_DUPLCATES_HELP}</h4>
                    {$TAB_CHOOSER}
                </div>
            </td>
        </tr>
        </table>
    </td>
</tr>
</table>
{$JAVASCRIPT_CHOOSER}

{if $NOTETEXT != '' || $required_fields != ''}
<p>
<b>{$MOD.LBL_NOTES}</b>
<ul>
<li>{$MOD.LBL_REQUIRED_NOTE}{$required_fields}</li>
{$NOTETEXT}
</ul>
</p>
{/if}

<br />
<table width="100%" cellpadding="2" cellspacing="0" border="0">
<tr>
    <td align="left">
        <input title="{$MOD.LBL_BACK}" accessKey="" id="goback" class="button" type="submit" name="button" value="  {$MOD.LBL_BACK}  ">&nbsp;
        <input title="{$MOD.LBL_IMPORT_NOW}" accessKey="" id="importnow" class="button" type="button" name="button" value="  {$MOD.LBL_IMPORT_NOW}  ">
    </td>
</tr>
</table>

</form>
{literal}
<script type="text/javascript">
<!--
/**
 * Singleton to handle processing the import
 */
ProcessImport = new function()
{
    /*
     * number of file to process processed
     */
    this.fileCount         = 0;

    /*
     * total files to processs
     */
    this.fileTotal         = {/literal}{$FILECOUNT-1}{literal};

    /*
     * total records to process
     */
    this.recordCount       = {/literal}{$RECORDCOUNT}{literal};

    /*
     * maximum number of records per file
     */
    this.recordThreshold   = {/literal}{$RECORDTHRESHOLD}{literal};

    /*
     * submits the form
     */
    this.submit = function()
    {
        document.getElementById("importstep3").tmp_file.value =
            document.getElementById("importstep3").tmp_file_base.value + '-' + this.fileCount;
        YAHOO.util.Connect.setForm(document.getElementById("importstep3"));
        YAHOO.util.Connect.asyncRequest('POST', 'index.php',
            {
                success: function(o) {
                    if (o.responseText.replace(/^\s+|\s+$/g, '') != '') {
                        this.failure(o);
                    }
                    else {
                        var locationStr = "index.php?module=Import"
                            + "&action=Last"
                            + "&type={/literal}{$TYPE}{literal}"
                            + "&import_module={/literal}{$IMPORT_MODULE}{literal}";
                        if ( ProcessImport.fileCount >= ProcessImport.fileTotal ) {
                        	YAHOO.SUGAR.MessageBox.updateProgress(1,'{/literal}{$MOD.LBL_IMPORT_COMPLETE}{literal}');
                            document.location.href = locationStr;
                        }
                        else {
                            document.getElementById("importstep3").save_map_as.value = '';
                            ProcessImport.fileCount++;
                            ProcessImport.submit();
                        }
                    }
                },
                failure: function(o) {
                	YAHOO.SUGAR.MessageBox.minWidth = 500;
                	YAHOO.SUGAR.MessageBox.show({
                    	type:  "alert",
                    	title: '{/literal}{$MOD.LBL_IMPORT_ERROR}{literal}',
                    	msg:   o.responseText,
                        fn: function() { window.location.reload(true); }
                    });
                }
            }
        );
        var move = 0;
        if ( this.fileTotal > 0 ) {
            move = this.fileCount/this.fileTotal;
        }
        YAHOO.SUGAR.MessageBox.updateProgress( move,
            "{/literal}{$MOD.LBL_IMPORT_RECORDS}{literal} " + ((this.fileCount * this.recordThreshold) + 1)
                        + " {/literal}{$MOD.LBL_IMPORT_RECORDS_TO}{literal} " + Math.min(((this.fileCount+1) * this.recordThreshold),this.recordCount)
                        + " {/literal}{$MOD.LBL_IMPORT_RECORDS_OF}{literal} " + this.recordCount );
    }

    /*
     * begins the form submission process
     */
    this.begin = function()
    {
        datestarted = '{/literal}{$MOD.LBL_IMPORT_STARTED}{literal} ' +
                YAHOO.util.Date.format('{/literal}{$datetimeformat}{literal}');
        YAHOO.SUGAR.MessageBox.show({
            title: '{/literal}{$STEP4_TITLE}{literal}',
            msg: datestarted,
            width: 500,
            type: "progress",
            closable:false,
            animEl: 'importnow'
        });
        this.submit();
    }
}
-->
</script>
{/literal}
{$JAVASCRIPT}
{literal}
<script type="text/javascript" language="Javascript">
enableQS(false);
{/literal}{$getNameJs}{literal}
{/literal}{$getNumberJs}{literal}
{/literal}{$currencySymbolJs}{literal}
	setSymbolValue(document.getElementById('currency_select').selectedIndex);
	setSigDigits();

{/literal}{$confirmReassignJs}{literal}
</script>
{/literal}
