<?php
function smarty_block_rialtoPre($params, $content, &$smarty, $open)
{
	if($open) { // called when {rialtoPre} is reached
		// nothing
	} else { // called when {/rialtoPre} is reached
		echo '<pre>';
		echo htmlspecialchars($content);
		echo '</pre>';
	}
}
?>
