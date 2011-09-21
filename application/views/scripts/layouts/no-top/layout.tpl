{include file='layouts/all/header.tpl'}

{include file='layouts/all/content-open.tpl'}

	{$this->flashMessenger()}<!-- PHP FLASH MESSENGER -->
	{$layout->content}<!-- PAGE CONTENT -->
	
{include file='layouts/all/content-close.tpl'}
{literal}
<style>
	#content-wrapper{
		padding: 0px;
	}
</style>
{/literal}
{include file='layouts/all/footer.tpl'}


