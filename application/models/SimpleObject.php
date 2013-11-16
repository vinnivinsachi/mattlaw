<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
class Application_Model_SimpleObject extends stdClass implements ArrayAccess{
   
    // columns
    
    public function toArray() {
        return get_object_vars($this);
    }
    public function offsetExists($offset) { return isset($this->$offset); }
    public function offsetGet($offset) { return $this->$offset; }
    public function offsetUnset($offset) {
            throw new Exception('Need to implement this method with the magic method __unset()');
            //unset($this->$offset);
    }
    public function offsetSet($offset, $value) { $this->$offset = $value; }
}
?>
