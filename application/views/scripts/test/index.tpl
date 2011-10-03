<div id='demo'>
	<h3>Kwick</h3>
	<div id="kwicks_container">
		<ul id="kwicks">
			<li id="kwick_red" class="kwick"><span>Red</span></li>
			<li id="kwick_orange" class="kwick"><span>Orange</span></li>
			<li id="kwick_yellow" class="kwick"><span>Yellow</span></li>
			<li id="kwick_green" class="kwick"><span>Green</span></li>
			<li id="kwick_blue" class="kwick"><span>Blue</span></li>
			<li id="kwick_indigo" class="kwick"><span>Indigo</span></li>
			<li id="kwick_violet" class="kwick"><span>Violet</span></li>
		</ul>
		<span class="clr"><!-- spanner --></span>
	</div>
</div>

{literal}
<script type='text/javascript'>
	window.addEvent('domready', function(){
		var szNormal = 117, szSmall  = 100, szFull   = 219;

		var kwicks = $$("#kwicks .kwick");
		var fx = new Fx.Elements(kwicks, {wait: false, duration: 300, transition: Fx.Transitions.Back.easeOut});
		kwicks.each(function(kwick, i) {
			kwick.addEvent("mouseenter", function(event) {
				var o = {};
				o[i] = {width: [kwick.getStyle("width").toInt(), szFull]}
				kwicks.each(function(other, j) {
					if(i != j) {
						var w = other.getStyle("width").toInt();
						if(w != szSmall) o[j] = {width: [w, szSmall]};
					}
				});
				fx.start(o);
			});
		});

		$("kwicks").addEvent("mouseleave", function(event) {
			var o = {};
			kwicks.each(function(kwick, i) {
				o[i] = {width: [kwick.getStyle("width").toInt(), szNormal]}
			});
			fx.start(o);
		});
	});
</script>

<style>
	#demo {
		width: 825px;
	}
	#kwicks_container { 
		background-color: violet;
		height: 100px;
	}
	#kwicks {
		position: relative;
	}

	#kwicks .kwick {
		float: left;
		display: block;
		width: 117px;
		height: 100px;
	}

	#kwick_red {background-color: red;}
	#kwick_orange {background-color: orange;}
	#kwick_yellow {background-color: yellow;}
	#kwick_green {background-color: green;}
	#kwick_blue {background-color: blue;}
	#kwick_indigo {background-color: indigo; color: #fff; }
	#kwick_violet {background-color: violet;}
</style>
{/literal}