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
            $contactForm = new Application_Form_ContactUs($this->getRequest()->getParam('contactUs'), 'contactUs');
                $this->view->fp = $contactForm;

        }
        
        public function attorneyProfileAction(){
            $contactForm = new Application_Form_ContactUs($this->getRequest()->getParam('contactUs'), 'contactUs');
                $this->view->fp = $contactForm;
        }
	
	
	
	public function termsAction(){
		
	}
	
	
	
	public function contactusAction(){
		$contactForm = new Application_Form_ContactUs($this->getRequest()->getParam('contactUs'), 'contactUs');
            
                $formResult = $contactForm->processForm();
                
                if($formResult->success){
                    $formValues = $contactForm->getValues();
                    //Zend_Debug::dump($formValues);
                    Application_Process_Emails::emailTemplate(Application_Constants_Emails::$CONTACT_NOTIFICATIONS, Application_Constants_Emails::$SYSTEM_CONTACT, $formValues);

                    Application_Process_Emails::emailTemplate(Application_Constants_Emails::$CONTACT_NOTIFICATION_CONFIRMATION, $formValues['email'], $formValues);

                    $this->msg("Thank you for your inquiry, we will contact you shortly.");
                }
                
            $this->view->fp = $contactForm;
	}
	
	public function mapsAction(){

	}
}