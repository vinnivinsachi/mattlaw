<?php

class TestController extends Custom_Zend_Controller_Action
{

    public function indexAction() {    	
    	$treeMapper = new Custom_Tree('books.xml');
    	
    	$books = $treeMapper->getSimpleXML();
    	
  		//$books = $treeMapper->saveSimpleXML();
    	
    	Zend_Debug::dump($books);
    }

	public function javascriptAction() {}
	
}
