{nwExample}

<div id='book' class='nw-imageBook nw-imageBook-medium'>
	<div class='nw-imageBook-mainImage'>
		<img src='{$dirImages}/nwImageBook/1/1_medium.jpg' />
	</div>
	<ul>
		<li>
			<a>
				<img src='{$dirImages}/nwImageBook/2/2_small.jpg' data-nwImageBook-largeImageURL='{$dirImages}/nwImageBook/2/2_medium.jpg' />
			</a>
		</li>
		<li>
			<a>
				<img src='{$dirImages}/nwImageBook/3/3_small.jpg' data-nwImageBook-largeImageURL='{$dirImages}/nwImageBook/3/3_medium.jpg' />
			</a>
		</li>
		<li>
			<a>
				<img src='{$dirImages}/nwImageBook/4/4_small.jpg' data-nwImageBook-largeImageURL='{$dirImages}/nwImageBook/4/4_medium.jpg' />
			</a>
		</li>
	</ul>
</div>

<div class='spacer-large'></div>

<button onclick='addImage()'>Add One</button>

{literal}<script type='text/javascript'>
	function addImage() {
		$NW.getPlugin('NWImageBook').addImageToBook(
			$('book'),
			'{/literal}{$dirImages}/nwImageBook/5/5_medium.jpg{literal}',
			'{/literal}{$dirImages}/nwImageBook/5/5_small.jpg{literal}'
		);
	}
</script>{/literal}

{/nwExample}