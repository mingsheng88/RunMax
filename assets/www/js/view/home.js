$(document).on(
		"pageinit",
		".ui-page",
		function() {
			$('#distance-completed').html(
					localStorage.getItem('distance-completed'));
			if(localStorage.getItem('distance-completed')>99){
				$('#distance-completed').css( "font-size", "50px !important" );
			}
			$('#runs-completed').html(localStorage.getItem('runs-completed'));
			$('#coins-collected').html(localStorage.getItem('coins'));
			if(localStorage.getItem('coins')>999){
				$('#coins-collected').css( "font-size", "50px !important" );
			}
			$('#pets-in-total').html(localStorage.getItem('number-of-pets'));
			
		});

function changeName(petId, petName) {
	var name = prompt("Please enter Rumon name", petName);
	if (name != null && name != "") {
		var p = new rumon(petId);
		p.petName = name;
		p.update();
		window.location = "home.html";

		// alert("Rumon name changed.");
	} else {
		alert("Invalide name.");
	}
}
// instantiat gps
var accuracy = 500;
watchRun = navigator.geolocation.watchPosition(function(position) {
	// latitude = position.coords.latitude;
	// longitude = position.coords.longitude;
	accuracy = position.coords.accuracy;
	if (accuracy <= 30) {
		$("#signal").html("<img src='css/global/images/green_dot.png'>");
	} else {
		$("#signal").html("<img src='css/global/images/red_dot.png'>");
	}
}, function() { /* error */
}, {
	maximumAge : 1000,
	enableHighAccuracy : true
});

function goToRun(petId) {
	console.log("!!!" + accuracy);
	var event = localStorage.getItem("event");
	if (accuracy <= 30) {
		localStorage.setItem("petSelection", petId);
		$.mobile.navigate("running-map.html");
	} else {
		alert("Unable to start run, your GPS signal is too weak.");
	}
}

window.setTimeout(function() {
	var finishedRun=localStorage.getItem("finishedRun");
	if (finishedRun=='true') {
		localStorage.setItem("finishedRun",'false');
		var petName = getUrlVars()["rumonName"];
		var addedFit = getUrlVars()["addedFit"];
		alert("Rumon " + petName + "'s fitness has increased by "
				+ addedFit + ".");
	}
}, 1000);

function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(
			window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}