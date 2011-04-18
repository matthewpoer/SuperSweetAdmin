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

	var elems = new Array("address_street", "address_city", "address_state", "address_postalcode", "address_country");
    var tHasText = false;
    var originalBgColor = '#FFFFFF';  
    var Dom = YAHOO.util.Dom;
	
	function TestCheckboxReady(id) { 
	   YAHOO.util.Event.onAvailable(id, this.handleOnAvailable, this);  
	} 
	 
	TestCheckboxReady.prototype.handleOnAvailable = function(me) { 
	    for(x in elems) {
		    f = fromKey + "_" + elems[x];
		    t = toKey + "_" + elems[x];
	
		    e1 = document.getElementById(t);
		    e2 = document.getElementById(f);
            
		    if(e1 != null && typeof e1 != "undefined" && e2 != null && typeof e2 != "undefined") {
	
		        if(!tHasText && trim(e1.value) != "") {
		           tHasText = true;
		        }
		        if(e1.value != e2.value) {
		           document.getElementById(this.id).checked = false;
		           break;
		        }
		        originalBgColor = e1.style.backgroundColor;
		    }
	    }
	    
	    if(!tHasText) {
	       document.getElementById(this.id).checked = false;
	    } else {
	       syncFields(fromKey, toKey);
	    }	  
	} 
	
    function writeToSyncField(e) {
         fromEl = YAHOO.util.Event.getTarget(e, true);
         if(typeof fromEl != "undefined") {
            toEl = document.getElementById(fromEl.id.replace(fromKey, toKey));
            toEl.value = fromEl.value;
         }
    }
    
    function syncFields(fromKey, toKey) {
         for(x in elems) {
             f = fromKey + "_" + elems[x];
             e2 = document.getElementById(f);
             t = toKey + "_" + elems[x];
             e1 = document.getElementById(t);
             if(e1 != null && typeof e1 != "undefined" && e2 != null && typeof e2 != "undefined") {
                  if(!document.getElementById(toKey + '_checkbox').checked) {
		             Dom.setStyle(e1,'backgroundColor',originalBgColor);
		             e1.removeAttribute('readOnly');
		             YAHOO.util.Event.removeListener(e2, 'keyup'); 
		          } else {
		             e1.value = e2.value;
                     Dom.setStyle(e1,'backgroundColor','#DCDCDC');
                     e1.setAttribute('readOnly', true);
                     YAHOO.util.Event.addListener(e2, 'keyup', writeToSyncField);
                  }
             }
         } //for
    }


