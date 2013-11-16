<?php
function smarty_block_rialtoExample($params, $content, &$smarty, $open)
{
	if($open) { // called when {rialtoExample} is reached
		// nothing
	} else { // called when {/rialtoExample} is reached
		echo $content;
		echo '<br /><br />';
		echo '<h3>Source:</h3>';
		echo '<pre>';
		echo htmlspecialchars($content);
		echo '</pre>';
	}
}
?>
