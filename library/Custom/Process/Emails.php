<?php

class Custom_Process_Emails
{	
	
	/**
	 * Send an email generated from an email template.
	 * 
	 * @param array $templateInfo array(path/to/template/view/script, subject).
	 * @param string|array $recipient Recipient email adress.
	 * @param string $from Sender email address.
	 * @param array $params Params to pass to the template.
	 * @return void
	 */
	static public function emailTemplate(array $templateInfo, $recipient, $from, array $params=null) {
		$html = Custom_Process_Partials::evalPartial('emails/'.$templateInfo[0], $params); // generate email html
		
		//echo $html;
		self::send($recipient, $templateInfo[1], $html, $from); // send email
	}
	
	/**
	 * Send an email via php mail().
	 * 
	 * @param string $recipient Recipient email address.
	 * @param string $subject Subject of the email.
	 * @param string $html HTML content of the email.
	 * @param string $from Sender email address.
	 * @return void
	 */
	static public function send($recipient, $subject, $html, $from) {
		$mail = new Zend_Mail(); // Create a new mail
		
		if(is_array($from)) { // IF $from is an array
			$fromKeys = array_keys($from); // get array keys in from array
			$fromName = $fromKeys[0]; // get the name of the sender
			$from = $from[$fromName]; // get email address of the sender
		} else { $fromName = null; } // else there is no sender name
		
		$mail->setFrom($from, $fromName) // set the sender address
			 ->addTo($recipient) // set the receiver address
			 ->setSubject($subject) // set the subject
			 ->setBodyHtml($html); // set the message
		
		$mail->send(); // send the email
	}
	
}
