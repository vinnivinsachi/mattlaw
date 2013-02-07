<?php

class TestController extends Custom_Zend_Controller_Action
{

    public function indexAction() {
	
    	//Application_Process_Emails::emailTemplate(array('order/confirmation.tpl', 'Order confirmation'))
    	
    	Application_Process_Emails::emailTemplate(array('order/confirmation.tpl', 'Order confirmation'), 'vinzha@gmail.com');
		//Application_Process_Emails::send('vinzha@gmail.com', 'blah', 'hi', 'dr@admin.com');
		//echo 'here';
			//$emailHTML = $this->evalPartial('emails/order/confirmation.tpl'); // might have been blocked.

			/*	$mail = new Zend_Mail();
				$mail->setFrom('dr@gmail.com')
					 ->addTo('vinzha@gmail.com')
					 ->setSubject('Notification from DR!')
					 ->setBodyHtml('hi');
				$mail->send();
				
				*/

				//Zend_Debug::dump($mail);
    }

	public function javascriptAction() {}
	
}
