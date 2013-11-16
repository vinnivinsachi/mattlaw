<?php

class Custom_Process_Partials
{	
	
	/**
	 * Get the html from a view script.
	 * 
	 * @param string $filePath The path to the file to evaluate (starting from Application/views/scripts/).
	 * @param array $params Data to be passed to the view script.
	 * @return string The evaluated view script.
	 */
	static public function evalPartial($filePath, array $params=null) {
		// TODO MARK: is this efficient?
		$viewRenderer = Zend_Controller_Action_HelperBroker::getStaticHelper('ViewRenderer'); // get view renderer
		$view = $viewRenderer->view; // get view
		return $view->partial($filePath, null, $params);
	}
	
}
