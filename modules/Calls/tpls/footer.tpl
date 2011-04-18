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
</form>
{{if $externalJSFile}}
require_once("'".$externalJSFile."'");
{{/if}}
{$set_focus_block}
{{if isset($scriptBlocks)}}
<!-- Begin Meta-Data Javascript -->
{{$scriptBlocks}}
<!-- End Meta-Data Javascript -->
{{/if}}


<div class="h3Row" id="scheduler"></div>

<script type="text/javascript">
{literal}
function fill_invitees() { 
	if (typeof(GLOBAL_REGISTRY) != 'undefined')  {    
		SugarWidgetScheduler.fill_invitees(document.EditView);
	} 
}
{/literal}

var root_div = document.getElementById('scheduler');
var sugarContainer_instance = new SugarContainer(document.getElementById('scheduler'));
sugarContainer_instance.start(SugarWidgetScheduler);
{literal}
if ( document.getElementById('save_and_continue') ) {
    var oldclick = document.getElementById('save_and_continue').attributes['onclick'].nodeValue;
    document.getElementById('save_and_continue').onclick = function(){
        fill_invitees();
        eval(oldclick);
    }
}
{/literal}
</script>
</form>
<form >
	<div class="buttons">
		{{if !empty($form) && !empty($form.buttons)}}
		   {{foreach from=$form.buttons key=val item=button}}
		      {{sugar_button module="$module" id="$button" view="$view"}}
		   {{/foreach}}
		{{else}}
				{{sugar_button module="$module" id="SAVE" view="$view"}}
				{{sugar_button module="$module" id="CANCEL" view="$view"}}
		{{/if}}
		{{sugar_button module="$module" id="Audit" view="$view"}}
	</div>
</form> 