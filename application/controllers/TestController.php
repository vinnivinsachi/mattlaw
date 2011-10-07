<?php

class TestController extends Custom_Zend_Controller_Action
{

    public function indexAction() {
		$booksTree = new Custom_Tree(DIR_TREES.'/books.xml');
    	//$xml = $booksTree->getXML();
    	//echo $xml->childNodes->item(0);
    	
		//$booksTree->addValue(array('blue', 'leather', 'heel3'));
    	$booksTree->removeValue(array('orange', 'leather', 'heel1'));
 
    	$booksTree->echoXML();
    	$booksTree->saveXML();
    	
    	
    	//$books = $treeMapper->getSimpleXML();
    	
  		//$books = $treeMapper->saveSimpleXML();
    	
    	//Zend_Debug::dump($books);
    }

	public function javascriptAction() {}
	
}
