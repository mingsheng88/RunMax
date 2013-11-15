var lat = 0;
var lng = 0;
var polylines = [];
var pos = [];
var myPath;
var totalDistance = 0;
var pace = 0;
var petSelection;
var totalTime = 0;
var coins = 0;
var startTime;
var endTime;
var petSelection;
var runMap = new google.maps.Map(document.getElementById("runMap"), {
	zoom : 17,
	disableDefaultUI : true,
	zoomControl : true,
	mapTypeId : google.maps.MapTypeId.ROADMAP
});
var tempStr = localStorage.getItem('runDetail');
var runJson = JSON.parse(tempStr);

totalDistance = runJson.Run.totalDistance;
pace = runJson.Run.pace;
petSelection = runJson.Run.petSelection;
totalTime = runJson.Run.totalTime;

startTime = runJson.Run.startTime;
endTime = runJson.Run.endTime;
coins = runJson.Run.coins;
var petName="Non";
if(petSelection!="Non"){
	var tempStr = localStorage.getItem(petSelection);
	var petJson = JSON.parse(tempStr);
	petName = petJson[0];
}

$(document).ready(function() {
	$('#totalDistance2').html(totalDistance + 'Km');
	$('#pace2').html(pace + " (min:sec)/Km");
	$('#totalTime2').html(totalTime + " min:sec");
	$('#startTime').html(startTime);
	$('#endTime').html(endTime);
	$('#coins').html(coins);
	$('#petSelection2').html(petName);
});

var data = runJson.Run.posData;
if (data) {
	data = data.split(","); 
	for (var i = 0; i < data.length; i += 2) {
		lat = data[i]; 
		lng = data[i + 1]; 
		if (i == 0) {
			var startMarker = new google.maps.Marker({
				position : new google.maps.LatLng(lat, lng),
				icon : {
					path : google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
					strokeColor : "blue",
					scale : 3
				},
				map : runMap,
				title : "Start"
			});
		} else if (i == (data.length - 2)) {
			var endMarker = new google.maps.Marker({
				position : new google.maps.LatLng(lat, lng),
				icon : {
					path : google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
					strokeColor : "red",
					scale : 3
				},
				map : runMap,
				title : "End"
			});

		}
		pos.push([ lat, lng ]);
		polylines.push(new google.maps.LatLng(lat, lng));
	}

	var runTimer = window.setTimeout(function() {
		resizeMap();
	}, 2000);
}

var itemData = runJson.Run.itemPos;
var noItems = 0;
if (itemData) {
	itemData = itemData.split(",");
	for (var i = 0; i < itemData.length; i += 2) {
		var ilat = itemData[i];
		var ilng = itemData[i + 1];
		var itemMarker = new google.maps.Marker({
			position : new google.maps.LatLng(ilat, ilng),
			icon : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
			map : runMap,
			title : "Item"
		});
		noItems++;
	}
	$('#noItems2').html(noItems);
}
var monsterData = runJson.Run.monCapLocation;
if (monsterData) {
	monsterData = monsterData.split(",");
	for (var i = 0; i < monsterData.length; i += 2) {
		var mlat = monsterData[i];
		var mlng = monsterData[i + 1];
		var monsterMarker = new google.maps.Marker({
			position : new google.maps.LatLng(mlat, mlng),
			icon : 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
			map : runMap,
			title : "Rumon"
		});
		$('#monsterCaptured2').html('Yes');
	}
}

$("#run_save").bind("tap", function(event, ui) {
	var r = confirm("Are you sure to save the run?");
	if (r == true) {
		var noRun = localStorage.getItem("runs-completed");
		var dist = localStorage.getItem("distance-completed");
		var tempStr = localStorage.getItem('runDetail');
		var totalcoins =localStorage.getItem("coins");
		localStorage.setItem("run"+noRun,tempStr);
		noRun++;
		localStorage.setItem("runs-completed",noRun);
		dist = parseFloat(dist) + parseFloat(totalDistance);
		localStorage.setItem("distance-completed",dist.toFixed(1));
		totalcoins=Number(totalcoins)+Number(coins);
		localStorage.setItem("coins",totalcoins);
		
		var enableEvent= localStorage.getItem("event");
		var addedFit=0;
		if(enableEvent == 'yes'&&petSelection!="Non"){
			petId=petSelection.substring(3);
			var p = new rumon(petId);
			var fitness=p.fitness;
			var multi=1;
			if(fitness<=25){
				multi=2;
			}
			else if(fitness<=50&&fitness>25){
				multi=1.5;
			}else if(fitness>50&&fitness<=75){
				multi=1;
			}else if(fitness<75){
				multi=0.5;
			}
			addedFit=Math.round(parseFloat(totalDistance)*multi);
			p.fitness = Math.round(fitness+parseFloat(totalDistance)*multi);
			p.update();
			
			//items
			//noItems
			var totalItem=localStorage.getItem("totalItems");
			for(var i=0;i<noItems;i++){
				var itemType= Math.floor((Math.random() * totalItem) + 1);
				var it = new item((itemType-1));
				it.quantity=it.quantity+1;
				it.isNew=true;
				it.update();
			}
			if (monsterData) {
				var totalPet=localStorage.getItem("number-of-pets");
				localStorage.setItem("pet"+totalPet, JSON.stringify(["NewRumon", 0, new Date(), new Date(), 0, 50, 50, false]));
				totalPet=Number(totalPet)+1;
				localStorage.setItem("number-of-pets", totalPet);
			}
			
		}
		localStorage.setItem("finishedRun",'true');
		window.location = "home.html?rumonName="+$('#petSelection2').html()+"&addedFit="+addedFit;
		// to update pet, items
	}	
});
$("#run_discard").bind("tap", function(event, ui) {
	var r = confirm("Are you sure to discard the run?");
	if (r == true) {
		var tempStr = localStorage.setItem('runDetail',null);
		$.mobile.navigate("home.html");
	}
	
});

function resizeMap() {
	console.log('!!!');
	google.maps.event.trigger(runMap, 'resize');
	drawPolyline();
	runMap.setCenter(new google.maps.LatLng(lat, lng));
}

function drawPolyline() {
	myPath = new google.maps.Polyline({
		path : polylines,
		strokeColor : "#ff0000", 
		strokeOpacity : 0.5,
		strokeWeight : 5
	});
	myPath.setMap(runMap); 
}
// get url
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
}// Common functions
function pad(number, length) {
	var str = '' + number;
	while (str.length < length) {
		str = '0' + str;
	}
	return str;
}
function formatTime(time) {
	time = time / 10;
	var min = parseInt(time / 6000), sec = parseInt(time / 100) - (min * 60), hundredths = pad(
			time - (sec * 100) - (min * 6000), 2);
	return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2);
}