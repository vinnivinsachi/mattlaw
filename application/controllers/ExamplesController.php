<?php

class ExamplesController extends Application_Controller
{
    public function init() {
    	parent::init();

		$this->_ajaxContext->addActionContext('image-upload', 'json')
		                   ->initContext();
    }

    public function indexAction() {}


    // ------------------------------------------------------------------ Zend Stuff ----------------------------------------------------------------------
    public function zendAction() {}
    public function partialAction() {}

    public function partialEvalAction() {
	    $this->view->evaluatedPartial = $this->evalViewScript('partials/example.tpl', array('passedVar'=>'<div>This div was passed to the partial!</div>'));
    }

    public function imageUploadAction() {
	if ($_FILES) {
		Application_Process_Uploads::runMethodInTransaction('uploadAndThumbImages');
//		    NovumWare_Process_Uploads_Images::uploadImagesToDir(SITE_ROOT.'/public/uploads');
//			$formName = 'uploadForm'; // the name of upload form
//			$processResult = Application_Process_Main::runProcess('Application_Process_Image::saveImagesFromForm', array($formName)); // process images from the form
	    }
    }

	// TODO MARK: is this working?
    public function noAccessAction() {
        throw new Exception('Needs to be implemented');
    }


    // ------------------------------------------------------------------ NovumWare Public Library ----------------------------------------------------------------------
    public function novumwareAction() {}
    public function nwGetPluginAction() {}
    public function nwLoadingImageAction() {}
    public function nwAjaxAction() {
		$this->view->success = true;
	}
    public function nwLoadReplacesAction() {}
    public function nwFlashMessageAction() {}
    public function nwCallbacksAction() {}
    public function nwBubbleAction() {}
    public function nwClickOnLoadAction() {}
    public function nwDatePickerAction() {}
    public function nwDeleteAction() {}
    public function nwDialogAction() {}
    public function nwImageBookAction() {}
    public function nwTooltipAction() {}
    public function nwHintAction() {}
    public function nwTourAction() {}
    public function nwPopupAction() {}
    public function nwTabsAction() {}
    public function nwScrollAction() {}
    public function nwRolloverImageAction() {}
    public function nwFormAction() {}
    public function nwUploadAction() {}


    // ------------------------------------------------------------------ Rialto Javascripts ----------------------------------------------------------------------
    public function jquerytoolstabsAction() {}
	public function jquerytoolsformvalidatorAction() {}

	public function rialtoEndingCallbackAction() {}
	public function rialtoPaletteAction() {}
	public function rialtoTableAccordionAction() {}
	public function rialtoDropdownAction() {}
	public function rialtoStarsAction() {}

	public function rialtoImageScrollSwitchAction() {
	}

	public function rialtoPaginationAction() {
		$this->rialtoPaginationLoad(10, 1);
		$this->rialtoPaginationLoad(10, 3);
		$this->rialtoPaginationLoad(10, 5);
	}
	public function rialtoPaginationLoadAction() {
		$page = $this->_request->getParam('page');
		$this->rialtoPaginationLoad(10, $page);
	}
	private function rialtoPaginationLoad($count=10, $page=1) {
		$elmts = $this->view->elmts;
		if(!$elmts) $elmts = array();
		$color = rand(0, 9).'f'.rand(0, 9).'f'.rand(0, 9).'f';
		for($i=1; $i <= $count; $i++) {
			$elmt = array('page'=>$page, 'color'=>$color);
			if($i == 1) $elmt['class'] = 'rPaginationPageTop';
			$elmts[] = $elmt;
		}
		$this->view->elmts = $elmts;
	}

	public function rialtoScrollableAction() {}
	public function rialtoGalleryAction() {
		$images = array();
		$dirPath = DOCUMENT_ROOT.DIR_IMAGES.'/rialtoGallery/';
		$dirHandle = openDir($dirPath);
		while($dirItem = readdir($dirHandle)) {
			if(is_file($dirPath.$dirItem)) { array_push($images, DIR_IMAGES.'/rialtoGallery/'.$dirItem); }
		}
		$this->view->images = $images;
	}


	// FX
	public function rialtoFxFadeOutAction() {}
	public function rialtoFxFadeInAction() {}
	public function rialtoFxHighlightAction() {}


	// CSS
	public function cssDropdownAction() {}

}

