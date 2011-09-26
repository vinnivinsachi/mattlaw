<?php

class ExamplesController extends Custom_Zend_Controller_Action
{

    public function init() {
    	parent::init();  // Because this is a custom controller class

		$this->_ajaxContext->addActionContext('rialto-ajax', 'json')
						   ->addActionContext('rialto-pagination-load', 'json')
			 			   ->initContext();

		// get a requested variable
			$var = $this->_request->getParam('paramName');
    }

    public function indexAction() {}

	public function jquerytoolstabsAction() {}
	public function jquerytoolsformvalidatorAction() {}
	
	
	
	public function zendAction() {}
	public function partialAction() {}
	public function partialEvalAction() {
		$this->view->evaluatedPartial = $this->evalPartial('partials/example.tpl', array('example'=>'<div>GOGOGOGO</div>'));
	}
	public function imageUploadAction() {
		if($this->_request->isPost()) {
			$formName = 'uploadForm'; // the name of upload form
			$processResult = Application_Process_Main::runProcess('Application_Process_Image::saveImagesFromForm', array($formName)); // process images from the form
		}
	}

	
	public function rialtoAction() {}
	public function rialtoGetPluginAction() {}
	public function rialtoCallbacksAction() {}
	public function rialtoClickOnLoadAction() {}
	public function rialtoDatePickerAction() {}
	public function rialtoDeleteAction() {}
	public function rialtoDialogAction() {}
	public function rialtoFlashMessageAction() {}
	public function rialtoImageBookAction() {}
	public function rialtoLoadingImageAction() {}
	public function rialtoLoadReplacesAction() {}
	public function rialtoPopupAction() {}
	public function rialtoScrollAction() {}
	public function rialtoTableAction() {}
	public function rialtoTabsAction() {}
	public function rialtoTooltipAction() {}
	public function rialtoEndingCallbackAction() {}
	public function rialtoRolloverImageAction() {}
	
	public function rialtoAjaxAction() {
		$this->view->success = true;
	}
	
	public function rialtoImageScrollSwitchAction() {
	}
	
	public function rialtoPaginationAction() {
		$this->rialtoPaginationLoad(10, 1);
		$this->rialtoPaginationLoad(10, 2);
		$this->rialtoPaginationLoad(10, 3);
	}
	public function rialtoPaginationLoadAction() {
		$page = $this->_request->getParam('page');
		$this->rialtoPaginationLoad(10, $page);
	}
	private function rialtoPaginationLoad($count=10, $page=1) {
		$elmts = $this->view->elmts;
		if(!$elmts) $elmts = array();
		for($i=1; $i <= $count; $i++) {
			$elmts[] = $page;
		}
		$this->view->elmts = $elmts;
		$this->view->color = rand(0, 9).'f'.rand(0, 9).'f'.rand(0, 9).'f';
	}
	
	public function noAccessAction() {}
	
}

