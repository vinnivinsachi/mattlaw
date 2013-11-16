<?php
function smarty_function_errorMessageTranslate($params, &$smarty)
{
	return from_camel_case($params['key']);
}

function from_camel_case($str) {
    $str[0] = strtolower($str[0]);
    $func = create_function('$c', 'return " " . strtolower($c[1]);');
    return preg_replace_callback('/([A-Z])/', $func, $str);
  }
?>
