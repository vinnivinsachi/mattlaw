<?php

class AuthenticationController extends NovumWare_Controller_AuthenticationController
{

    public function init() {
        parent::init();  // Because this is a custom controller class
    	$this->_ajaxContext->addActionContext('changepassword', 'json')
						   ->addActionContext('authenticate', 'json')
			 			   ->initContext();
    }

    public function indexAction() {}
    public function loginAction() {}

	public function authenticateAction() {
		if(!$this->_request->isPost()) return; // make sure the form was POSTed
		$form = new Application_Form_Authentication_Login(); // get login form
		
		if(!$form->isValid($this->_request->getPost('login'))) return; // check for form validity
		$loginFormValues = $form->getValues(); // get user info (includes any filters)
		
		if(!$this->login($loginFormValues['email'], $loginFormValues['password'])) return; // validate the login info
		
		// TODO MARK: is this necessary?
		$this->view->loggedInUser = $this->getLoggedInUser();
        $this->msg('You have successfully logged in!');
		
		if(!$this->isJsonContext()) {
			if($authRedirect = $this->_sessionNamespace->getRedirect()) { // IF a redirect was provided
			    // TODO MARK: get auth redirect params from the controller or something, so they come in automatically
				$this->redirect($authRedirect['action'], $authRedirect['controller'], $authRedirect['params']); // redirect
			}
		}
//	    
//	    
//	    
//		$form = new Application_Form_Authentication_Login(); // get login form
//		$request = $this->getRequest(); // get request
//      	if($request->isPost()) { // IF form was submitted (via POST)
//			if($form->isValid($request->getPost('login'))) { // IF the form is valid
//				$loginValues = $form->getValues(); // get user info (includes any filters)
//	        	if($this->_validLogin($loginValues['email'], $loginValues['password'])) { // IF user is authenticated
//	            	/*$usersMapper = new Application_Model_Mapper_Users_UsersMapper;
//	            	$user = $usersMapper->findByUsername($this->_auth->getIdentity()->username);
//	            	$user->lastLogin = date('Y-m-d H:i:s');
//	            	$usersMapper->save($user);
//	           		$this->addScript('top.location.reload()');*/
//					// TODO update last login time
//					$this->view->loggedInUser = $this->getLoggedInUser();
//					$this->view->success = true; // login success
//					if(!$this->isJsonContext()) { // IF NOT a JSON call
//						$sessionNamespace = new Zend_Session_Namespace('DR'); // get the session namespace
//						if($authRedirect = $sessionNamespace->authRedirect) { // IF a redirect was provided
//							$this->redirect($authRedirect['action'], $authRedirect['controller'], $authRedirect['params']); // redirect
//						}
//					}
//				}
//				else $this->view->success = false; // login failure if user can't be authenticated
//			}
//			else $this->view->success = false; // login failure if form is not valid
//       }
	}

	public function logoutAction() {
        $this->logout(); // erase user info from SESSION
        $this->redirect('index', 'index'); // back to home page
    }

    // an ajax function to change the logged in user's password
//    public function changepasswordAction() {
//		// TODO update changepassword Action
//		// set up the usersMapper and
//		// get the logged in user's info from the database
//		$this->getLoggedInUser();
//			
//		$request = $this->getRequest();
//		$form = new Application_Form_Authentication_ChangePassword();
//
//		if($form->isValid($request->getPost())) { // IF form is valid
//			// check the old password
//				$adapter = self::_getAuthAdapter();
//		        $adapter->setIdentity($this->user->username); // set username to check
//		        $adapter->setCredential($form->getValue('oldPassword')); // set password to check
//		        if(!$adapter->authenticate()->isValid()) { // IF wrong password
//		        	$this->errorAndRedirect('Could not verify your old password, please try again', 'editbasicinfo', 'account');
//		        }
//			
//            // save the user info
//               	$this->user->setOptions($form->getValues());
//                $this->usersMapper->save($this->user);      
//            // display success message
//                $this->msg('New password has been saved!');
//                $this->redirect('editbasicinfo', 'account');       	
//            }
//		else $this->errorAndRedirect('Your submission was not valid', 'editbasicinfo', 'account'); // If form is NOT valid	
//	}
	
	public function forgotPasswordAction() {
		// IF POST
			// IF form valid
				// IF create member password reset security key (process) successful
					// get security key from result
					// send email with security key
					// pass success to view
				// ELSE (process failure)
					// process failure
			// ELSE (invalid form)
				// process failure
		// ELSE (not POST)
			// nothing
	}
	
	public function resetpasswordAction() {
		// IF GET
			// get security key from GET
			// pass security to view
		// ELSE IF POST
			// IF form valid
				// IF reset password (process) successful
					// get email from result
					// send confirmation email
					// pass success to view
				// ELSE (process failure)
					// process failure
			// ELSE (invalid form)
				// process failure
		// ELSE (not POST)
			// nothing
	}
}

