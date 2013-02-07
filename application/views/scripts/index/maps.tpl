<div class='content' style='height: 400px;'>

    <div id="map_canvas" style='width: 100%; height: 100%;'></div>

   
   
<span class='rialtoClickOnLoad RialtoLink' rialtoInitCB='setMapTag' ></span>
    
    
<span class='rialtoClickOnLoad RialtoLink' rialtoInitCB='codeAddress' ></span>
{literal}

<script>

function sendAjaxRequest(){
	var ajaxVar={address: "Jackson Height, NY 11372"};

	var myRequest = new Request({
		method: 'get', // setting the method to get!
		url: "http://maps.googleapis.com/maps/api/geocode/output?address=New York, USA&sensor=false",
		onRequest: function(){
			console.log('OnRequest');
		}, // show loading image on row
		onSuccess: function(responseHTML){
			console.log(responseHTML);
		},
		onComplete: function(){
			console.log('con complted')
		} // hide loading image on parent container
	});
	myRequest.send();
}

function codeAddress() {
	//console.log(map);
	var address = "Jackson Heights, NY 11372";
	console.log(google);
	//console.log(geocoder);
	//console.log(geocoder);
	var geocoder = new google.maps.Geocoder();
	
	  geocoder.geocode( { 'address': address}, function(results, status) {
		 console.log(results);
	    if (status == google.maps.GeocoderStatus.OK) {
	     // map.setCenter(results[0].geometry.location);
	      var marker = new google.maps.Marker({
	        map: map,
	        position: results[0].geometry.location
	      });

	      attachHoverInformation(marker);
	      
	    } else {
	      alert("Geocode was not successful for the following reason: " + status);
	    }
	  });  
} 

function attachHoverInformation(marker){

	 var infowindow = new google.maps.InfoWindow(
      {
        content: 'Your search are listed in this area',
        size: new google.maps.Size(25,25),
        maxWidth: 100,
      });

	  google.maps.event.addListener(marker, 'mouseover', function() {
	    infowindow.open(map,marker);
	  });
	  google.maps.event.addListener(marker, 'mouseout', function() {
		    infowindow.close(map,marker);
	  });
}

function setMapTag(){

	var mapOptions = {
	          //center: new google.maps.LatLng(-34.397, 150.644),
	          zoom: 8,
	          mapTypeId: google.maps.MapTypeId.ROADMAP,
	          streetViewControl: false,
	        };
	        
	map = new google.maps.Map($("map_canvas"),
            mapOptions);
    
	console.log('here');
	
	var northEast = new google.maps.LatLng(70,130);
	var southWest = new google.maps.LatLng(20,-130);
	var bounds = new google.maps.LatLngBounds(southWest,northEast);
	//console.log(map);
	map.fitBounds(bounds);
	var lngSpan = northEast.lng() - southWest.lng();
	var latSpan = northEast.lat() - southWest.lat();
	  for (var i = 0; i < 5; i++) {
	    var location = new google.maps.LatLng(southWest.lat() + latSpan * Math.random(),
	        southWest.lng() + lngSpan * Math.random());
	    var marker = new google.maps.Marker({
	        position: location,
	        map: map
	    });
	    var j = i + 1;
	    marker.setTitle(j.toString());
	    attachSecretMessage(marker, i);
	  };
}

function attachSecretMessage(marker, number) {
	  var message = ["This","is","the","secret","message"];
	  var infowindow = new google.maps.InfoWindow(
	      { content: message[number],
	        size: new google.maps.Size(50,50)
	      });
	  google.maps.event.addListener(marker, 'click', function() {
		  markerClicked();
	    //infowindow.open(map,marker);
	  });
}

function markerClicked(){
	alert('marker clicked');
}
</script>

{/literal}

</div>