<?php

class Application_Form_ContactUs extends Custom_Zend_Form
{

    public function init()
    {
		$this->setName('contactUs');

		$name = new Zend_Form_Element_Text('customer');
                $name->setRequired(true);

		$phone = new Zend_Form_Element_Text('phone');
                $phone->setRequired(true);
                
		$email = new Zend_Form_Element_Text('email');
                $email->setRequired(true);
                
		$message = new Zend_Form_Element_Text('message');
                $message->setRequired(true);
		
		
		// Add all the elements to the form
		$this->addElement($name)
                    ->addElement($phone)
                    ->addElement($email)
                    ->addElement($message);		 
    }


}