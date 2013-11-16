<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
class Application_Model_FormResult extends Application_Model_SimpleObject{
   
    // columns
    
    public $success;
    public $flashMessage;
    public $errorFlashMessages;
    public $errorFormMessages;
    public $message;
    public $redirectUrl;
    public $closePopup = true;
    public $formName;
    
    
    
}
?>
