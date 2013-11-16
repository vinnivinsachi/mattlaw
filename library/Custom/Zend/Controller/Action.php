<?php
/**
 * Parent controller action that all other controller actions should extend from.
 */
class Custom_Zend_Controller_Action extends Zend_Controller_Action{
	// TODO prevent cross domain communication (submitting POST forms from other servers) (make exception for PAYPAL)
	// TODO fix commenting on this page
	
	protected $_ajaxContext;
	protected $_db;
	//static public $_WebSocket;
	
	public function init() {
		// setup db adapter
			$this->_db = Zend_Db_Table::getDefaultAdapter();
			
		// set layout
			$this->setLayout();
		
		// Enable context switching for JSON
			$this->_ajaxContext = $this->_helper->getHelper('AjaxContext');
			
		// get the logger
			$this->_logger = Zend_Registry::get('logger');
		
		// Enable ACL
			$this->_acl = new Application_Acl_Acl;
			
		// get an instance of the Zend_Auth
			$this->_auth = Zend_Auth::getInstance();
			
		// set namespace
			$this->_sessionNamespace = new Custom_Zend_Session_Namespace(Application_Constants_Sessions::$USER_APP); // get DR namespace
			
			
	
	}
	
	public function preDispatch() {
		parent::preDispatch();
		
		// get the logged in user (or null)
			$this->_loggedInUser = $this->getLoggedInUser();			
			
		// optionally check ACL (Access Control List)
			if(isset($this->_acl)) $this->checkAcl();
	}
	
	public function postDispatch() {
		if(!$this->isJsonContext()) { // IF NOT JSON context
			$this->setPathConstants(); // Make path constants available in views / templates
			$this->view->loggedInUser = $this->getLoggedInUser(); // send logged in user to view
		}
		parent::postDispatch();
	}
	
	/**
	 * Check permissions.
	 * Will throw an error and redirect to login page if permissions as not valid.
	 * 
	 * @return void
	 */
	protected function checkAcl() {
		$role = ($this->_auth->hasIdentity()) // IF logged in
			? $this->_loggedInUser // get role of logged in user
			: 'guest'; // default role or NON-logged in user
			
		$controller = $this->_request->getControllerName(); // get the requested controller's name
		$action = $this->_request->getActionName(); // get the requested action's name
		
		if(!$this->_acl->isAllowed($role, $controller, $action)) { // IF user NOT allowed to this controller / action
			$this->_sessionNamespace->setRedirect($this->_request->getActionName(), $this->_request->getControllerName(), $this->_request->getParams()); // set redirect after login
			$this->errorAndRedirect('Please login to view this page!', 'login', 'authentication'); // display error and redirect
			//Zend_Debug::dump("$role : $controller : $action");
		}
	}
	
	/**
	 * Checks whether the current request is for json or not.
	 * 
	 * @return bool true if json was request, false otherwise.
	 */
	public function isJsonContext() {
		return ($this->_ajaxContext->getCurrentContext() == 'json') ? true : false;
	}

	/**
	 * Sets a message in the flash helper to be displayed with the next request.
	 * 
	 * @param string $message
	 * @return void
	 */
	protected function msg($message) {
		$this->_helper->flashMessenger($message); // display HTML flash message
	}
	
	// set the layout
	protected function setLayout() {
		// get the default layout
			$this->view->layout = $this->view->layout();
                        
		// IF a layout param has been passed with the request
			if($layout = $this->_request->getParam('layout')) {
                            $this->view->layoutValue = $layout;
				// make sure the request was a json request for certain layouts
					if($layout == 'none') if(!$this->_request->isXmlHttpRequest()) return;
				$this->view->layout->setLayout($layout);
			}
	}
	
	/**
	 * Send all path constants to the view.
	 * 
	 * @return void
	 */
	protected function setPathConstants() {
		$this->view->siteRoot = SITE_ROOT; // public folder
		$this->view->documentRoot = DOCUMENT_ROOT; // document root on server
		$this->view->dirPartials = DIR_PARTIALS; // partials
		$this->view->dirCSS = DIR_CSS; // CSS
		$this->view->dirImages = DIR_IMAGES; // IMAGES
		$this->view->dirJS = DIR_JS; // JAVASCRIPT
		$this->view->dirScript = DIR_RIALTO_SCRIPT_LIBRARY;
		$this->view->dirUploads = DIR_UPLOADS;
		$this->view->dirRialtoPublicLibrary = DIR_RIALTO_PUBLIC_LIBRARY;
	}
	
	/**
	 * Append all path constants to an array.
	 * 
	 * @param array $array The array to append path constants to.
	 * @return void
	 */
	protected function appendPathConstants(array &$array) {
		$array['siteRoot'] = SITE_ROOT; // public folder
		$array['documentRoot'] = DOCUMENT_ROOT; // document root on server
		$array['dirPartials'] = DIR_PARTIALS; // partials
		$array['dirCSS'] = DIR_CSS; // CSS
		$array['dirImages'] = DIR_IMAGES; // IMAGES
		$array['dirJS'] = DIR_JS; // JAVASCRIPT
		$array['dirScript'] = DIR_RIALTO_SCRIPT_LIBRARY;
		$array['dirUploads'] = DIR_UPLOADS;
		$array['dirRialtoPublicLibrary'] = DIR_RIALTO_PUBLIC_LIBRARY;
	}

	
	/**
	 * Get the current logged in user.
	 * 
	 * @param bool $createModel returns a model if true, an associative array if false.
	 * @return Custom_Model_Abstract|array returns null if no user is logged in.
	 */
	protected function getLoggedInUser($createModel=false) {
		// TODO MARK: update this function to only set the user when it isn't already set
		// get identity from Zend_Auth and save it in a variable/
			$this->_loggedInUser = $this->_auth->getIdentity();
			
		if($createModel) {
			$member = new Application_Model_Member(); // create model
			$member->member_ID = $this->_loggedInUser->member_ID;
			$member->display_name = $this->_loggedInUser->display_name;
			$member->display_name_original = $this->_loggedInUser->display_name_original;
			$member->role = $this->_loggedInUser->role;
			$member->email = $this->_loggedInUser->email;
			$member->status = $this->_loggedInUser->status;
			return $member;
		}
		// return the identity
			return $this->_loggedInUser;
	}
	
	/**
	 * Send an error message to the flash messenger and redirect to another controller/action.
	 * 
	 * @param string $message The message to send to the flash messenger.
	 * @param string $action
	 * @param string $controller
	 * @param array $params Params to include in the redirected request.
	 * @return void
	 */
	protected function errorAndRedirect($message, $action=null, $controller=null, array $params=null) {
		$this->msg(array('error' => $message)); // display message
		$this->redirect($action, $controller, $params); // redirect
	}
	
	// redirect
	/**
	 * Redirect to another controller/action.
	 * 
	 * @param string $action
	 * @param string $controller
	 * @param array $params Params to include in the redirected request.
	 * @return void
	 */
	public function redirect($action=null, $controller=null, array $params=null) {
		if($action == null && $controller == null) {
			$action = 'index';
			$controller = 'index';
		}
		if($controller == null) $controller = $this->_request->getControllerName();
		if($params == null) $params = array();
		if(!in_array('layout', $params)) { $params['layout'] = $this->view->layout->getLayout(); } // use the current layout in the redirect
		$this->_helper->redirector($action, $controller, null, $params);
	}
	
	protected function goToRoute($routeName, $params) {
		$this->_helper->redirector->gotoRoute($params, $routeName);
	}
	
	// add a javascript to view and inlineScript
	/**
	 * Add some javascript to the view.  Concatenates if called multiple times.
	 * 
	 * @param string $script A javascript string to be executed upon page load.
	 * @return void
	 */
	protected function addScript($script) {
		// initiate view->scripts variable (used for AJAX calls)
			if(!$this->view->scripts) $this->view->scripts = '';
		// add script to $scripts variable (AJAX calls)
			$this->view->scripts .= $script;	
		// initiate inlineScripts (non-AJAX calls)
			$inlineScripts = $this->view->inlineScript();		
		// add scripts to inlineScripts (non-AJAX calls)
			$inlineScripts->appendScript($script);
		
	} // END addScript()

	/**
	 * Sends an error message to the view and optionally logs the error.
	 * 
	 * @param string $errorMessage
	 * @param bool $logError
	 * @param array $errorData Data related to the error.
	 * @return void
	 */
	protected function processFailure($errorMessage, $logError=false, $errorData=null) {
		$this->view->success = false;
		$this->view->error = array('message' => $errorMessage, 'data' => $errorData); // send error message / data to view
		if(!$this->_request->isXmlHttpRequest()) $this->msg(array('error' => $errorMessage)); // create flash message (only if no AJAX)
		//Zend_Debug::dump($errorData);
		// TODO log errors
		// IF logError
			// log the error
			// send email to admins about error
	}
	
	/**
	 * Don't render any view for this request.
	 * 
	 * @return void
	 */
	protected function noRender() {
		if(!$this->isJsonContext()) { // if accessed directly (not through Ajax request)
			$this->_helper->layout->disableLayout(); // don't show layout
			$this->_helper->viewRenderer->setNoRender(true); // don't render view
		}
	}
	
	/**
	 * Get the html from a view script.
	 * 
	 * @param string $filePath The path to the file to evaluate (starting from Application/views/scripts/).
	 * @param array $params Data to be passed to the view script.
	 * @return string The evaluated view script.
	 */
	protected function evalPartial($filePath, array $params=null) {
		if(!$params) $params = array();
		$this->appendPathConstants($params);
		return Custom_Process_Partials::evalPartial($filePath, $params); // delegate
		//return $this->view->partial($filePath, null, $params);
	}
	
	protected function useView($view) {
		$this->_helper->viewRenderer->setScriptAction($view);
	}
	
	/**
	 * Send an email generated from an email template.
	 * 
	 * @param array $templateInfo From Application_Constants_Emails.
	 * @param string $to Recipient email adress.
	 * @param array $params Params to pass to the template.
	 * @param string $from Sender email address.
	 * @return void
	 */
	/*protected function emailTemplate(array $templateInfo, $to, array $params=null, $from=null) {
		if(!$from) { $from = Application_Constants_Emails::$SENDER_NOTIFICATIONS; } // default sender email
		$html = $this->evalPartial('emails/'.$templateInfo[0], $params); // generate email html
		Custom_Process_Email::send($to, $templateInfo[1], $html, $from); // send email
	}*/

	
	/*protected function requireAjax() {
		if(!$this->isJsonContext()) $this->noRender();
	}*/
}
