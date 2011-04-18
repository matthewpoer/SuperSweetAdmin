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
	<tr class='pagination'>
		<td colspan='{if $prerow}{$colCount+1}{else}{$colCount}{/if}'>
			<table border='0' cellpadding='0' cellspacing='0' width='100%' class='paginationTable'>
				<tr>
					<td nowrap="nowrap" width='2%' class='paginationActionButtons'>
						{$actionsLink}&nbsp;
						&nbsp;{$selectedObjectsSpan}		
					</td>
					<td  nowrap='nowrap' width='1%' align="right" class='paginationChangeButtons'>
						{if $pageData.urls.startPage}
							<button type='button' id='listViewStartButton' name='listViewStartButton' title='{$navStrings.start}' class='button' {if $prerow}onclick='return sListView.save_checks(0, "{$moduleString}");'{else} onClick='location.href="{$pageData.urls.startPage}"' {/if}>
								<img src='{sugar_getimagepath file='start.png'}' alt='{$navStrings.start}' align='absmiddle' border='0'>
							</button>
						{else}
							<button type='button' id='listViewStartButton' name='listViewStartButton' title='{$navStrings.start}' class='button' disabled='disabled'>
								<img src='{sugar_getimagepath file='start_off.png'}' alt='{$navStrings.start}' align='absmiddle' border='0'>
							</button>
						{/if}
						{if $pageData.urls.prevPage}
							<button type='button' id='listViewPrevButton' name='listViewPrevButton' title='{$navStrings.previous}' class='button' {if $prerow}onclick='return sListView.save_checks({$pageData.offsets.prev}, "{$moduleString}")' {else} onClick='location.href="{$pageData.urls.prevPage}"'{/if}>
								<img src='{sugar_getimagepath file='previous.png'}' alt='{$navStrings.previous}' align='absmiddle' border='0'>							
							</button>
						{else}
							<button type='button' id='listViewPrevButton' name='listViewPrevButton' class='button' title='{$navStrings.previous}' disabled='disabled'>
								<img src='{sugar_getimagepath file='previous_off.png'}' alt='{$navStrings.previous}' align='absmiddle' border='0'>
							</button>
						{/if}
							<span class='pageNumbers'>({if $pageData.offsets.lastOffsetOnPage == 0}0{else}{$pageData.offsets.current+1}{/if} - {$pageData.offsets.lastOffsetOnPage} {$navStrings.of} {if $pageData.offsets.totalCounted}{$pageData.offsets.total}{else}{$pageData.offsets.total}{if $pageData.offsets.lastOffsetOnPage != $pageData.offsets.total}+{/if}{/if})</span>
						{if $pageData.urls.nextPage}
							<button type='button' id='listViewNextButton' name='listViewNextButton' title='{$navStrings.next}' class='button' {if $prerow}onclick='return sListView.save_checks({$pageData.offsets.next}, "{$moduleString}")' {else} onClick='location.href="{$pageData.urls.nextPage}"'{/if}>
								<img src='{sugar_getimagepath file='next.png'}' alt='{$navStrings.next}' align='absmiddle' border='0'>
							</button>
						{else}
							<button type='button' id='listViewNextButton' name='listViewNextButton' class='button' title='{$navStrings.next}' disabled='disabled'>
								<img src='{sugar_getimagepath file='next_off.png'}' alt='{$navStrings.next}' align='absmiddle' border='0'>
							</button>
						{/if}
						{if $pageData.urls.endPage  && $pageData.offsets.total != $pageData.offsets.lastOffsetOnPage}
							<button type='button' id='listViewEndButton' name='listViewEndButton' title='{$navStrings.end}' class='button' {if $prerow}onclick='return sListView.save_checks("end", "{$moduleString}")' {else} onClick='location.href="{$pageData.urls.endPage}"'{/if}>
								<img src='{sugar_getimagepath file='end.png'}' alt='{$navStrings.end}' align='absmiddle' border='0'>							
							</button>
						{elseif !$pageData.offsets.totalCounted || $pageData.offsets.total == $pageData.offsets.lastOffsetOnPage}
							<button type='button' id='listViewEndButton' name='listViewEndButton' title='{$navStrings.end}' class='button' disabled='disabled'>
							 	<img src='{sugar_getimagepath file='end_off.png'}' alt='{$navStrings.end}' align='absmiddle'>
							</button>
						{/if}
					</td>
				</tr>
			</table>
		</td>
	</tr>