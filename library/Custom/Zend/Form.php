<?php

/**
 * WARNING:
 * CHECKBOXES: add "value='1'" to all checkbox elements, and "->setUncheckedValue(false)" to all Zend_Form_Element_Checkbox
 */
class Custom_Zend_Form extends Zend_Form
{
	
        public $formResult;
        public $formProcessedCorrectly = false;

        public function __construct($options = null, $formName) {
            parent::__construct($options);
            
            if(!formName){
                 throw new Exception('Form name can not be null');
            }
            $this->formResult = new Application_Model_FormResult();
            $this->setName($formName);
            $this->formResult->formName = $this->getName();

        }

	public function init() {
                $this->formResult = new Application_Model_FormResult();
		$this->addElementPrefixPath('Form_Decorator', 'Form/Decorator', 'decorator');
		$this->addPrefixPath('Form_Decorator', 'Form/Decorator', 'decorator');
                
	}
	
	/**
	 * Checks whether or not the form is valid with current data.  Optionally sets the form values before checking.
	 * 
	 * @param array $valuesArray Values to set in the form.
	 * @return void
	 */
	public function drIsValid(array $valuesArray=null) {
		if($valuesArray) return parent::isValid($this->getAttribs());
		else return parent::isValid($this->getAttribs());
	}
	
	public function getValues($suppressArrayNotation=false) {
		$values = parent::getValues($suppressArrayNotation); // call parent method
		$formName = $this->getName(); // get the form name
		if(array_key_exists($formName, $values)) { return $values[$formName]; } // IF the array values where wrapped in another array
		return $values; // return normal values by default
	}
        
        public function getErrors($name = null, $suppressArrayNotation = false) {
            
            $errorMessages = parent::getMessages();
            return $errorMessages;
            //$errors = parent::getErrors($name, $suppressArrayNotation);
            //return $errors;

            //return NovumWare_Helpers::filterFormErrorMessages($errors);
        }
        
        /*
         * Error will be automatically be passe to view in json or variable because
         * it is access via object references. 
         * @return Application_Model_FormResult
         */
        public function processForm() {

                if($this->drIsValid()){
                    $this->formProcessedCorrectly = true;
                    $this->formResult->success = true;
                    return $this->formResult;
                }else{
                    //if($applicationContext->isJsonContext()) { // IF a JSON call
                        $this->formResult->success = false;
                        $this->formResult->errorFlashMessages = 'There is an issue with your form submission.';
                        $this->formResult->errorFormMessages = $this->getErrors();
                        return $this->formResult;
                    //}   
                }

            }	
	
}