<?php
function smarty_modifier_allowedOrderReturnDate($mysqlDate)
{
	$phpDate = Custom_Helpers::dateMysqlToPHP($mysqlDate);
	
	$allowedOrderReturnDate = $phpDate+604800;
	return Custom_Helpers::formatPHPDate($allowedOrderReturnDate);
}
?>
