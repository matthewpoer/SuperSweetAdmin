<?PHP
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


class EAPMController extends SugarController
{
    /**
     * API implementation
     * @var ExternalAPIPlugin
     */
    protected $api;

    var $admin_actions = array('listview', 'index');

	public function process() {
		if(!is_admin($GLOBALS['current_user']) && in_array(strtolower($this->action), $this->admin_actions)) {
			$this->hasAccess = false;
		}
		parent::process();
	}

    protected function failed($error)
    {
        SugarApplication::appendErrorMessage($error);
        $GLOBALS['log']->error("Login error: $error");
        $url = 'index.php?module=EAPM&action=EditView&record='.$this->bean->id;
        return $this->set_redirect($url);
    }

    public function pre_save()
    {
        parent::pre_save();
        $this->api = ExternalAPIFactory::loadAPI($this->bean->application,true);
        if(empty($this->api)) {
            return $this->failed(translate('LBL_AUTH_UNSUPPORTED', $this->bean->module_dir));
        }
        if(empty($this->bean->id)){
            $eapmBean = EAPM::getLoginInfo($this->bean->application,true);
            if($eapmBean){
                SugarApplication::appendErrorMessage(translate('LBL_APPLICATION_FOUND_NOTICE', $this->bean->module_dir));
                $this->bean->id = $eapmBean->id;
            }
        }
        $this->bean->validated = false;
        $this->bean->save_cleanup();
        $this->api->loadEAPM($this->bean);
    }

    protected function post_save()
    {
        if($this->bean->active) {
            // do not load bean here since password is already encoded
            $reply = $this->api->checkLogin();
            if ( !$reply['success'] ) {
                return $this->failed(translate('LBL_AUTH_ERROR', $this->bean->module_dir));
            } else {
                $this->bean->validated();
            }
        }
        if($this->return_module == 'Users'){
            $this->return_action = 'EditView';
        }
        return parent::post_save();
    }

    protected function action_oauth()
    {
        if(empty($this->bean->id)) {
            return $this->set_redirect('index.php');
        }
		if(!$this->bean->ACLAccess('save')){
			ACLController::displayNoAccess(true);
			sugar_cleanup(true);
			return true;
		}
        $this->api = ExternalAPIFactory::loadAPI($this->bean->application,true);
        $reply = $this->api->checkLogin($this->bean);
        if ( !$reply['success'] ) {
            return $this->failed(translate('LBL_AUTH_ERROR', $this->bean->module_dir));
        } else {
            $this->bean->validated();
            
            // This is a tweak so that we can automatically close windows if requested by the external account system
            if ( isset($_REQUEST['closeWhenDone']) && $_REQUEST['closeWhenDone'] == 1 ) {
                if(!empty($_REQUEST['callbackFunction']) && !empty($_REQUEST['application'])){
            	    $js = '<script type="text/javascript">window.opener.' . $_REQUEST['callbackFunction'] . '("' . $_REQUEST['application'] . '"); window.close();</script>';
                }else if(!empty($_REQUEST['refreshParentWindow'])){
                    $js = '<script type="text/javascript">window.opener.location.reload();window.close();</script>';
                }else{
                    $js = '<script type="text/javascript">window.close();</script>';
                }
                echo($js);
                return;
            }            

            // redirect to detail view, as in save
            return parent::post_save();
        }
    }

    protected function pre_QuickSave(){
        if(!empty($_REQUEST['application'])){
            $eapmBean = EAPM::getLoginInfo($_REQUEST['application'],true);
            if (!$eapmBean) {
                $this->bean->application = $_REQUEST['application'];
                $this->bean->assigned_user_id = $GLOBALS['current_user']->id;
            }else{
                $this->bean = $eapmBean;
                $this->bean->active = 1;
            }
            $this->pre_save();
                    
        }else{
            sugar_die("Please pass an application name.");
        }
    }
    
	public function action_QuickSave(){
		$this->action_save();
	}

    protected function post_QuickSave(){
        $this->post_save();
    }

    protected function pre_Reauthenticate(){
        $this->bean->active = 1;
        $this->pre_save();
    }

    protected function action_Reauthenticate(){
        $this->action_save();
    }

    protected function post_Reauthenticate(){
        $this->post_save();
    }

    protected function action_FlushFileCache()
    {
        $api = ExternalAPIFactory::loadAPI($_REQUEST['api']);
        if ( $api == false ) {
            echo 'FAILED';
            return;
        }

        if ( method_exists($api,'loadDocCache') ) {
            $api->loadDocCache(true);
        }

        echo 'SUCCESS';
    }
}