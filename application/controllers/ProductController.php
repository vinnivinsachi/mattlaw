<?php

class ProductController extends Application_Controller
{
	public function indexAction(){
		$category = $this->_request->getParam('category');
		$brand = $this->_request->getParam('brand');
		$item = $this->_request->getParam('item');
		$sex = $this->_request->getParam('sex');
		
		if(Application_Constants_Category::$CATEGORY[$sex][$category]['brands'][$brand][$item]){
			$this->view->sex = $sex;
			$this->view->category = $category;
			$this->view->brand = $brand;
			$this->view->item = $item;
			$this->view->itemPrice = Application_Constants_Category::$CATEGORY[$sex][$category]['brands'][$brand][$item];
			$this->view->itemImages = Application_Constants_Category::$ITEM_IMAGES[$item];
			$this->view->itemAttributes = Application_Constants_Category::$CATEGORY_FORM_ATTRIBUTES[$item];
		}else{ }
	}	
	
	public function brandsAction(){
		
	}
	
	public function categoryAction(){
		$sex = $this->_request->getParam('sex');
		$category = $this->_request->getParam('category');
		
		$categoryItems = Application_Constants_Category::$CATEGORY[$sex][$category];
		//Zend_Debug::dump($categoryItems);
		$this->view->sex = $sex;
		
		$this->view->categoryItems = $categoryItems;
		$this->view->category = $category;
	}
}