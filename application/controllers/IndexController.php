<?php

class IndexController extends Application_Controller
{
        public function preDispatch() {
            parent::preDispatch();
            $this->view->moduleAction = $this->getRequest()->getParam('action');
            //echo $this->getRequest()->getParam('action');
        }
    
	public function indexAction(){
	
		$contactForm = new Application_Form_ContactUs($this->getRequest()->getParam('contactUs'), 'contactUs');
                $this->view->fp = $contactForm;
	}	
        
        public function practiceAreaAction(){
            
        }
        
        public function attorneyProfileAction(){
            
        }
	
	
	
	public function termsAction(){
		
	}
	
	
	
	public function contactusAction(){
		$contactForm = new Application_Form_ContactUs($this->getRequest()->getParam('contactUs'), 'contactUs');
            
                $formResult = $contactForm->processForm();
                
                if($formResult->success){
                    $formValues = $contactForm->getValues();
                    //Zend_Debug::dump($formValues);
                    Application_Process_Emails::emailTemplate(Application_Constants_Emails::$CONTACT_NOTIFICATIONS, $formValues['email'], $formValues);

                }
                
            $this->view->fp = $contactForm;
	}
	
	public function mapsAction(){

	}
}