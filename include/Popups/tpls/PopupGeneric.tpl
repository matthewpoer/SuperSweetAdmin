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
{{include file=$headerTpl}}
{$jsLang}
{$LIST_HEADER}
{if $should_process}
	<table cellpadding='0' cellspacing='0' width='100%' border='0' class='list view'>
		<tr class='pagination'>
			<td colspan='{$colCount+1}' align='right'>
				<table border='0' cellpadding='0' cellspacing='0' width='100%'>
					<tr>
						<td align='left' >
							&nbsp;</td>
						<td  align='right' nowrap='nowrap'>						
							{if $pageData.urls.startPage}
								<button type='button' id='popupViewStartButton' title='{$navStrings.start}' class='button' {if $prerow}onclick='return sListView.save_checks(0, "{$moduleString}");'{else} onClick='location.href="{$pageData.urls.startPage}"' {/if}>
									<img src='{sugar_getimagepath file="start.png"}' alt='{$navStrings.start}' align='absmiddle' border='0' >
								</button>						
								<!--<a href='{$pageData.urls.startPage}' {if $prerow}onclick="return sListView.save_checks(0, '{$moduleString}')"{/if} ><img src='{sugar_getimagepath file="start.png"}' alt='{$navStrings.start}' align='absmiddle' border='0' >&nbsp;{$navStrings.start}</a>&nbsp;-->
							{else}
								<button type='button' id='popupViewStartButton' title='{$navStrings.start}' class='button' disabled>
									<img src='{sugar_getimagepath file="start_off.png"}' alt='{$navStrings.start}' align='absmiddle' border='0' >
								</button>
								<!--<img src='{sugar_getimagepath file="start_off.png"}' alt='{$navStrings.start}' align='absmiddle' border='0' >&nbsp;{$navStrings.start}&nbsp;&nbsp;-->
							{/if}
							{if $pageData.urls.prevPage}
								<button type='button' id='popupViewPrevButton' title='{$navStrings.previous}' class='button' {if $prerow}onclick='return sListView.save_checks({$pageData.offsets.prev}, "{$moduleString}")' {else} onClick='location.href="{$pageData.urls.prevPage}"'{/if}>
									<img src='{sugar_getimagepath file="previous.png"}' alt='{$navStrings.previous}' align='absmiddle' border='0' >							
								</button>
								<!--<a href='{$pageData.urls.prevPage}' {if $prerow}onclick="return sListView.save_checks({$pageData.offsets.prev}, '{$moduleString}')"{/if} ><img src='{sugar_getimagepath file="previous.png"}' alt='{$navStrings.previous}' align='absmiddle' border='0' >&nbsp;{$navStrings.previous}</a>&nbsp;-->
							{else}
								<button type='button' id='popupViewPrevButton' class='button' disabled title='{$navStrings.previous}'>
									<img src='{sugar_getimagepath file="previous_off.png"}' alt='{$navStrings.previous}' align='absmiddle' border='0' >
								</button>
								<!--<img src='{sugar_getimagepath file="previous_off.png"}' alt='{$navStrings.previous}' align='absmiddle' border='0' >&nbsp;{$navStrings.previous}&nbsp;-->
							{/if}
								<span class='pageNumbers'>({if $pageData.offsets.lastOffsetOnPage == 0}0{else}{$pageData.offsets.current+1}{/if} - {$pageData.offsets.lastOffsetOnPage} {$navStrings.of} {if $pageData.offsets.totalCounted}{$pageData.offsets.total}{else}{$pageData.offsets.total}{if $pageData.offsets.lastOffsetOnPage != $pageData.offsets.total}+{/if}{/if})</span>
							{if $pageData.urls.nextPage}
								<button type='button' id='popupViewNextButton' title='{$navStrings.next}' class='button' {if $prerow}onclick='return sListView.save_checks({$pageData.offsets.next}, "{$moduleString}")' {else} onClick='location.href="{$pageData.urls.nextPage}"'{/if}>
									<img src='{sugar_getimagepath file="next.png"}' alt='{$navStrings.next}' align='absmiddle' border='0' >
								</button>
								<!--&nbsp;<a href='{$pageData.urls.nextPage}' {if $prerow}onclick="return sListView.save_checks({$pageData.offsets.next}, '{$moduleString}')"{/if} >{$navStrings.next}&nbsp;<img src='{sugar_getimagepath file="next.png"}' alt='{$navStrings.next}' align='absmiddle' border='0' ></a>&nbsp;-->
							{else}
								<button type='button' id='popupViewNextButton' class='button' title='{$navStrings.next}' disabled>
									<img src='{sugar_getimagepath file="next_off.png"}' alt='{$navStrings.next}' align='absmiddle' border='0' >
								</button>
								<!--&nbsp;{$navStrings.next}&nbsp;<img src='{sugar_getimagepath file="next_off.png"}' alt='{$navStrings.next}' align='absmiddle' border='0' >-->
							{/if}
							{if $pageData.urls.endPage  && $pageData.offsets.total != $pageData.offsets.lastOffsetOnPage}
								<button type='button' id='popupViewEndButton' title='{$navStrings.end}' class='button' {if $prerow}onclick='return sListView.save_checks({$pageData.offsets.end}, "{$moduleString}")' {else} onClick='location.href="{$pageData.urls.endPage}"'{/if}>
									<img src='{sugar_getimagepath file="end.png"}' alt='{$navStrings.end}' align='absmiddle' border='0' >							
								</button>
								<!--<a href='{$pageData.urls.endPage}' {if $prerow}onclick="return sListView.save_checks({$pageData.offsets.end}, '{$moduleString}')"{/if} >{$navStrings.end}&nbsp;<img src='{sugar_getimagepath file="end.png"}' alt='{$navStrings.end}' align='absmiddle' border='0' ></a></td>-->
							{elseif !$pageData.offsets.totalCounted || $pageData.offsets.total == $pageData.offsets.lastOffsetOnPage}
								<button type='button' id='popupViewEndButton' class='button' disabled title='{$navStrings.end}'>
								 	<img src='{sugar_getimagepath file="end_off.png"}' alt='{$navStrings.end}' align='absmiddle' border='0' >
								</button>
								<!--&nbsp;{$navStrings.end}&nbsp;<img src='{sugar_getimagepath file="end_off.png"}' alt='{$navStrings.end}' align='absmiddle' border='0' >-->
							{/if}
						</td>
					</tr>
				</table>
			</td>
		</tr>
	
		<tr height='20'>
			{if $prerow}
				<th scope='col' nowrap="nowrap" width='1%' class="selectCol">
				<div>
					<input type='checkbox' class='checkbox' id='massall' name='massall' value='' onclick='sListView.check_all(document.MassUpdate, "mass[]", this.checked);' />
					{$selectLink}
				</div>
				</th>
				<th scope='col' nowrap="nowrap" width='1%'>&nbsp;</th>
			{/if}
			{counter start=0 name="colCounter" print=false assign="colCounter"}
			{foreach from=$displayColumns key=colHeader item=params}
				<th scope='col' width='{$params.width}%' nowrap="nowrap">
					<div style='white-space: nowrap;'width='100%' align='{$params.align|default:'left'}'>
	                {if $params.sortable|default:true}              
		                <a href='#' onclick='location.href="{$pageData.urls.orderBy}{$params.orderBy|default:$colHeader|lower}"; return sListView.save_checks(0, "{$moduleString}");' class='listViewThLinkS1'>{sugar_translate label=$params.label module=$pageData.bean.moduleDir}&nbsp;&nbsp;
						{if $params.orderBy|default:$colHeader|lower == $pageData.ordering.orderBy}
							{if $pageData.ordering.sortOrder == 'ASC'}
								{capture assign="imageName"}arrow_down.{$arrowExt}{/capture}
								<img border='0' src='{sugar_getimagepath file=$imageName}' width='{$arrowWidth}' height='{$arrowHeight}' align='absmiddle' alt='{$arrowAlt}'>
							{else}
								{capture assign="imageName"}arrow_up.{$arrowExt}{/capture}
								<img border='0' src='{sugar_getimagepath file=$imageName}' width='{$arrowWidth}' height='{$arrowHeight}' align='absmiddle' alt='{$arrowAlt}'>
							{/if}
						{else}
							{capture assign="imageName"}arrow.{$arrowExt}{/capture}
							<img border='0' src='{sugar_getimagepath file=$imageName}' width='{$arrowWidth}' height='{$arrowHeight}' align='absmiddle' alt='{$arrowAlt}'>
						{/if}
						</a>
					{else}
						{sugar_translate label=$params.label module=$pageData.bean.moduleDir}
					{/if}
					</div>
				</th>
				{counter name="colCounter"}
			{/foreach}
			{if !empty($quickViewLinks)}
			<th scope='col' nowrap="nowrap" width='1%'>&nbsp;</th>
			{/if}
		</tr>
			
		{foreach name=rowIteration from=$data key=id item=rowData}
			{if $smarty.foreach.rowIteration.iteration is odd}
				{assign var='_rowColor' value=$rowColor[0]}
			{else}
				{assign var='_rowColor' value=$rowColor[1]}
			{/if}
			<tr height='20' class='{$_rowColor}S1'>
				{if $prerow}
				<td width='1%' nowrap='nowrap'>
						<input onclick='sListView.check_item(this, document.MassUpdate)' type='checkbox' class='checkbox' name='mass[]' value='{$rowData.ID}'>
				</td>
				<td width='1%' nowrap='nowrap'>
						{$pageData.additionalDetails.$id}
				</td>
				{/if}
				{counter start=0 name="colCounter" print=false assign="colCounter"}
				{foreach from=$displayColumns key=col item=params}
					<td scope='row' align='{$params.align|default:'left'}' valign=top class='{$_rowColor}S1' bgcolor='{$_bgColor}'>
						{if $params.link && !$params.customCode}
							
							<{$pageData.tag.$id[$params.ACLTag]|default:$pageData.tag.$id.MAIN} href='#' onclick="send_back('{if $params.dynamic_module}{$rowData[$params.dynamic_module]}{else}{$params.module|default:$pageData.bean.moduleDir}{/if}','{$rowData[$params.id]|default:$rowData.ID}');">{$rowData.$col}</{$pageData.tag.$id[$params.ACLTag]|default:$pageData.tag.$id.MAIN}>
	
						{elseif $params.customCode} 
							{sugar_evalcolumn_old var=$params.customCode rowData=$rowData}
						{elseif $params.currency_format} 
							{sugar_currency_format 
	                            var=$rowData.$col 
	                            round=$params.currency_format.round 
	                            decimals=$params.currency_format.decimals 
	                            symbol=$params.currency_format.symbol
	                            convert=$params.currency_format.convert
	                            currency_symbol=$params.currency_format.currency_symbol
							}
						{elseif $params.type == 'bool'}
								<input type='checkbox' disabled=disabled class='checkbox'
								{if !empty($rowData[$col])}
									checked=checked
								{/if}
								/>
                        {elseif $params.type == 'multienum' } 
								{counter name="oCount" assign="oCount" start=0}
								{multienum_to_array string=$rowData.$col assign="vals"}
								{foreach from=$vals item=item}
									{counter name="oCount"}
									{sugar_translate label=$params.options select=$item}{if $oCount !=  count($vals)},{/if} 
								{/foreach}
						{else}	
							{$rowData.$col}
						{/if}
					</td>
					{counter name="colCounter"}
				{/foreach}
		 	
		{/foreach}
		<tr class='pagination'>
			<td colspan='{$colCount+1}' align='right'>
				<table border='0' cellpadding='0' cellspacing='0' width='100%'>
					<tr>
						<td align='left' >
							&nbsp;</td>
						<td  align='right' nowrap='nowrap'>						
							{if $pageData.urls.startPage}
								<button type='button' title='{$navStrings.start}' class='button' {if $prerow}onclick='return sListView.save_checks(0, "{$moduleString}");'{else} onClick='location.href="{$pageData.urls.startPage}"' {/if}>
									<img src='{sugar_getimagepath file="start.png"}' alt='{$navStrings.start}' align='absmiddle' border='0' >
								</button>						
								<!--<a href='{$pageData.urls.startPage}' {if $prerow}onclick="return sListView.save_checks(0, '{$moduleString}')"{/if} ><img src='{sugar_getimagepath file="start.png"}' alt='{$navStrings.start}' align='absmiddle' border='0' >&nbsp;{$navStrings.start}</a>&nbsp;-->
							{else}
								<button type='button' title='{$navStrings.start}' class='button' disabled>
									<img src='{sugar_getimagepath file="start_off.png"}' alt='{$navStrings.start}' align='absmiddle' border='0' >
								</button>
								<!--<img src='{sugar_getimagepath file="start_off.png"}' alt='{$navStrings.start}' align='absmiddle' border='0' >&nbsp;{$navStrings.start}&nbsp;&nbsp;-->
							{/if}
							{if $pageData.urls.prevPage}
								<button type='button' title='{$navStrings.previous}' class='button' {if $prerow}onclick='return sListView.save_checks({$pageData.offsets.prev}, "{$moduleString}")' {else} onClick='location.href="{$pageData.urls.prevPage}"'{/if}>
									<img src='{sugar_getimagepath file="previous.png"}' alt='{$navStrings.previous}' align='absmiddle' border='0' >							
								</button>
								<!--<a href='{$pageData.urls.prevPage}' {if $prerow}onclick="return sListView.save_checks({$pageData.offsets.prev}, '{$moduleString}')"{/if} ><img src='{sugar_getimagepath file="previous.png"}' alt='{$navStrings.previous}' align='absmiddle' border='0' >&nbsp;{$navStrings.previous}</a>&nbsp;-->
							{else}
								<button type='button' class='button' disabled title='{$navStrings.previous}'>
									<img src='{sugar_getimagepath file="previous_off.png"}' alt='{$navStrings.previous}' align='absmiddle' border='0' >
								</button>
								<!--<img src='{sugar_getimagepath file="previous_off.png"}' alt='{$navStrings.previous}' align='absmiddle' border='0' >&nbsp;{$navStrings.previous}&nbsp;-->
							{/if}
								<span class='pageNumbers'>({if $pageData.offsets.lastOffsetOnPage == 0}0{else}{$pageData.offsets.current+1}{/if} - {$pageData.offsets.lastOffsetOnPage} {$navStrings.of} {if $pageData.offsets.totalCounted}{$pageData.offsets.total}{else}{$pageData.offsets.total}{if $pageData.offsets.lastOffsetOnPage != $pageData.offsets.total}+{/if}{/if})</span>
							{if $pageData.urls.nextPage}
								<button type='button' title='{$navStrings.next}' class='button' {if $prerow}onclick='return sListView.save_checks({$pageData.offsets.next}, "{$moduleString}")' {else} onClick='location.href="{$pageData.urls.nextPage}"'{/if}>
									<img src='{sugar_getimagepath file="next.png"}' alt='{$navStrings.next}' align='absmiddle' border='0' >
								</button>
								<!--&nbsp;<a href='{$pageData.urls.nextPage}' {if $prerow}onclick="return sListView.save_checks({$pageData.offsets.next}, '{$moduleString}')"{/if} >{$navStrings.next}&nbsp;<img src='{sugar_getimagepath file="next.png"}' alt='{$navStrings.next}' align='absmiddle' border='0' ></a>&nbsp;-->
							{else}
								<button type='button' class='button' title='{$navStrings.next}' disabled>
									<img src='{sugar_getimagepath file="next_off.png"}' alt='{$navStrings.next}' align='absmiddle' border='0' >
								</button>
								<!--&nbsp;{$navStrings.next}&nbsp;<img src='{sugar_getimagepath file="next_off.png"}' alt='{$navStrings.next}' align='absmiddle' border='0' >-->
							{/if}
							{if $pageData.urls.endPage  && $pageData.offsets.total != $pageData.offsets.lastOffsetOnPage}
								<button type='button' title='{$navStrings.end}' class='button' {if $prerow}onclick='return sListView.save_checks({$pageData.offsets.end}, "{$moduleString}")' {else} onClick='location.href="{$pageData.urls.endPage}"'{/if}>
									<img src='{sugar_getimagepath file="end.png"}' alt='{$navStrings.end}' align='absmiddle' border='0' >							
								</button>
								<!--<a href='{$pageData.urls.endPage}' {if $prerow}onclick="return sListView.save_checks({$pageData.offsets.end}, '{$moduleString}')"{/if} >{$navStrings.end}&nbsp;<img src='{sugar_getimagepath file="end.png"}' alt='{$navStrings.end}' align='absmiddle' border='0' ></a></td>-->
							{elseif !$pageData.offsets.totalCounted || $pageData.offsets.total == $pageData.offsets.lastOffsetOnPage}
								<button type='button' class='button' disabled title='{$navStrings.end}'>
								 	<img src='{sugar_getimagepath file="end_off.png"}' alt='{$navStrings.end}' align='absmiddle' border='0' >
								</button>
								<!--&nbsp;{$navStrings.end}&nbsp;<img src='{sugar_getimagepath file="end_off.png"}' alt='{$navStrings.end}' align='absmiddle' border='0' >-->
							{/if}
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	{if $prerow}
	<script>
	{literal}function lvg_dtails(id){return SUGAR.util.getAdditionalDetails( '{/literal}{$module}{literal}',id, 'adspan_'+id);}{/literal}
	</script>
	{/if}
{else}
	{$APP.LBL_SEARCH_POPULATE_ONLY}
{/if}
{{include file=$footerTpl}}