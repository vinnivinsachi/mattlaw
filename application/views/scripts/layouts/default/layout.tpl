{include file='layouts/all/header.tpl'}
{include file='layouts/all/top.tpl'}

{include file='layouts/all/content-open.tpl'}

	{$this->flashMessenger()}<!-- PHP FLASH MESSENGER -->
	{$layout->content}<!-- PAGE CONTENT -->
	
{include file='layouts/all/content-close.tpl'}

{include file='layouts/all/bottom.tpl'}
{include file='layouts/all/footer.tpl'}
