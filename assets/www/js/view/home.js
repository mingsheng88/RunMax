$(document).on("pageinit", ".ui-page", function() {
	$('#distance-completed').html(localStorage.getItem('distance-completed'));
	$('#runs-completed').html(localStorage.getItem('runs-completed'));
	$('#coins-collected').html(localStorage.getItem('coins'));
	$('#pets-in-total').html(localStorage.getItem('number-of-pets'));
});

function changeName(petId, petName) {
	var name = prompt("Please enter Rumon name", petName);
	if (name != null && name != "") {

		var p = new pet(petId);
		p.petName = name;
		p.update();
		window.location = "home.html";

		//alert("Rumon name changed.");
	}else{
		alert("Invalide name.");
	}
}
// instantiat gps
var accuracy=500;
watchRun = navigator.geolocation.watchPosition(function(position) {
	// latitude = position.coords.latitude;
	// longitude = position.coords.longitude;
	accuracy = position.coords.accuracy;
}, function() { /* error */
}, {
	maximumAge : 1000,
	enableHighAccuracy : true
});

function goToRun(petId){
	 console.log("!!!"+accuracy);
	 var event= localStorage.getItem("event");
	 if(accuracy<=30){
		 localStorage.setItem("petSelection",petId);
		 $.mobile.navigate("running-map.html");
	 }else{
		 alert("Unable to start run, your GPS signal is too weak.");
	 }
}
