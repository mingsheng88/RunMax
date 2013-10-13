$(document).on("pageinit", ".ui-page", function() {
	$('#distance-completed').html(localStorage.getItem('distance-completed'));
	$('#runs-completed').html(localStorage.getItem('runs-completed'));
	$('#coins-collected').html(localStorage.getItem('coins'));
	$('#pets-in-total').html(localStorage.getItem('number-of-pets'));
});


function changeName(petId,petName) {
	var name = prompt("Please enter Rumon name", petName);
	if (name != null && name != "") {
		//to do
		alert("Rumon name changed.");
	}
}
//instantiat gps
watchRun = navigator.geolocation.watchPosition(function(position) {
	//latitude = position.coords.latitude;
	//longitude = position.coords.longitude;
	accuracy = position.coords.accuracy;
}, function() { /* error */
}, {
	maximumAge : 1000,
	enableHighAccuracy : true
});

