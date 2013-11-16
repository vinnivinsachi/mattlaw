<?php

class Custom_Tree
{
	public $_filePath;
	public $_defaultRootNodeName = 'rootNode';
	
	/**
	 * @var SimpleXMLElement
	 */
	protected $_xml;
	protected $_rootNodeName;
	protected $prefix = '_';
	
	public function __construct($path, $createFile=false) {		
		$realPath = realpath($path); // resolve path
		if(!$realPath) { // IF file doesn't exist
			$realPath = $path;
			if($createFile) self::createTreeFile($realPath, $this->_defaultRootNodeName); // optionally create file
			else throw new Exception('XML file not found: '.$path); // make sure file exists
		}
		$this->_filePath = $realPath; // save the file path
		$this->_xml = simplexml_load_file($this->_filePath);
		$this->_rootNodeName = $this->getXML()->getName();
		
		//$this->_xml = new DOMDocument(); // create DOM Document for XML
		//$this->_xml->formatOutput = true;
		//$this->_xml->load(realpath($realPath)); // load XML file
	}
	
	/**
	 * Create an XML file.
	 * 
	 * @param string $path The absolute path of the file to create.
	 * @param string $nodeName The name of the parent node to create.
	 * @return void
	 */
	static public function createTreeFile($path, $nodeName) {
		$xml = new SimpleXMLElement("<$nodeName/>");
		$xml->saveXml($path);
	}
	
	/**
	 * Get the XML.
	 * 
	 * @return SimpleXMLElement
	 */
	public function getXML() {
		return $this->_xml;
	}
	
	/**
	 * Echo the XML.
	 * 
	 * @return void
	 */
	public function echoXML($xml=null) {
		if(!$xml) $xml = $this->getXML();
		
		echo '<div><pre>';
		self::echoXMLRecursive($xml, 0);
		echo '</pre></div>';
	}
	private function echoXMLRecursive($xml, $count) {
		foreach($xml as $node) { // FOREACH node
			echo str_repeat('     ', $count).$node->getName(); // echo node name
			foreach($node->attributes() as $key => $val) echo " $key:$val"; // echo each attribute
			echo PHP_EOL; // echo newline
			if(count($node->children())) self::echoXMLRecursive($node->children(), $count+1); // recursively call for child nodes
		}
	}
	
	/**
	 * Add the existing node combination if it doesn't exist.
	 * 
	 * @param array $values An array of node leaves (array(level1, level2 => array(attr1 => val1), level3...)).
	 * @return SimpleXMLElement
	 */
	public function addValue(array $values) {
		$xml = $this->getXML(); // get the xml
		reset($values); // start at the first element of the values array
		
		while(($key = key($values)) !== false && $val = array_shift($values)) {
			if(is_array($val)) { // IF $key is array, then $key is new node name
				$nodeName = $key;
				$attributes = $val;
				$xpathValues = array($nodeName => $attributes);
			} else { // ELSE $val is new node name
				$nodeName = $val;
				$attributes = null;
				$xpathValues = array($nodeName);
			}
			$node = self::findChildNode($xml, $xpathValues);
			if(!$node) {
				$node = $xml->addChild($nodeName);
				if($attributes) foreach($attributes as $attrKey => $attrVal) $node->addAttribute($attrKey, $attrVal);
			}
			$xml = $node; // make the node the new xml root
		}
		return $xml;
	}
	
	public function findChildNode($xml, array $vals=null) {
		$xpath = '.';
		while(($key = key($vals)) !== false && $val = array_shift($vals)) {
			$nodeName = (is_array($val)) ? $key : $val;
			$xpath .= "/$nodeName";
			if(is_array($val)) {
				$attributes = '';
				while(($attrKey = key($val)) !== false && $attrVal = array_shift($val)) {
					$attributes .= "@$attrKey='$attrVal'";
					if(count($val)) $attributes .= ' and ';
				}
				$xpath .= "[$attributes]";
			}
		}
		$nodes = $xml->xpath($xpath);
		if(count($nodes) == 1) return $nodes[0];
		elseif(count($nodes) == 0) return null;
		else throw new Exception('Unexpected number of nodes found, expecting 1, found '.count($nodes)); // make sure no more than 1 node was found
	}
	
	/**
	 * Remove a node combination, and recursively remove the parent node if no children are left.
	 * 
	 * @param array $values An array of node leaves (array(level1, level2, level3...)).
	 * @return void
	 */
	public function removeValue(array $values) {
		$xml = $this->getXML(); // get the xml
		$node = self::findChildNode($xml, $values);
		if($node) $this->recursiveRemoveNode($node); // ELSE recursively remove all empty nodes
	}
	
	/**
	 * Remove an empty node and all parent nodes that then become empty.
	 * 
	 * @param SimpleXMLElement $node
	 * @return void
	 */
	public function recursiveRemoveNode($node) {
		//Zend_Debug::dump($node->getName());
		if($node->getName() != $this->_rootNodeName) {
			//$parentNodes = $node->xpath('parent::*'); // get parent nodes array
			//$parentNode = $parentNodes[0]; // get parent node
			//$nodeName = $node->getName(); // get node name
			$domNode = dom_import_simplexml($node);
			$parentNode = $domNode->parentNode;
			$parentNode->removeChild($domNode);
			$parentNode = simplexml_import_dom($parentNode);
			//unset($parent->$nodeName); // remove node
			//Zend_Debug::dump($parent->children()->count());
			if(!count($parentNode->children())) $this->recursiveRemoveNode($parentNode);
		}
	}
	
	/**
	 * Save the XML to the file.
	 * 
	 * @return int|bool number of bytes written or false if error occurred.
	 */
	public function saveXML() {
		return $this->getXML()->saveXML($this->_filePath); // save to the XML file
	}
	
	
	/*
	 * $sxe = simplexml_import_dom($dom);
	 * $dom = dom_import_simplexml($sxe);
	 */
	
}
