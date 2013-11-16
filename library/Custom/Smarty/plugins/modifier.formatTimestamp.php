<?php
function smarty_modifier_formatTimestamp($timestamp)
{
	return Custom_Helpers::formatPHPDate($timestamp, 'F, jS');
}
