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
var runId = getUrlVars()["id"];
var runMap = new google.maps.Map(document.getElementById("runMap"), {
	zoom : 17,
	// center : new google.maps.LatLng(lat, lng),
	disableDefaultUI : true,
	zoomControl : true,
	mapTypeId : google.maps.MapTypeId.ROADMAP
});
var tempStr = localStorage.getItem(runId);
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
	data = data.split(","); // ,�Ƿָ���Фˉ�Q
	for (var i = 0; i < data.length; i += 2) {
		lat = data[i]; // ����
		lng = data[i + 1]; // �U��
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
		pos.push([ lat, lng ]); // ���ˤ����Ф�׷��
		polylines.push(new google.maps.LatLng(lat, lng)); // �軭�ä����Ф����ˤ�׷��
	}

	var runTimer = window.setTimeout(function() {
		resizeMap();
	}, 2000);
}

var itemData = runJson.Run.itemPos;
var noItems = 0;
if (itemData) {
	itemData = itemData.split(","); // ,�Ƿָ���Фˉ�Q
	for (var i = 0; i < itemData.length; i += 2) {
		var ilat = itemData[i]; // ����
		var ilng = itemData[i + 1]; // �U��
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
	monsterData = monsterData.split(","); // ,�Ƿָ���Фˉ�Q
	for (var i = 0; i < monsterData.length; i += 2) {
		var mlat = monsterData[i]; // ����
		var mlng = monsterData[i + 1]; // �U��
		var monsterMarker = new google.maps.Marker({
			position : new google.maps.LatLng(mlat, mlng),
			icon : 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
			map : runMap,
			title : "Rumon"
		});
		$('#monsterCaptured2').html('Yes');
	}
}

function resizeMap() {
	google.maps.event.trigger(runMap, 'resize');
	drawPolyline();
	runMap.setCenter(new google.maps.LatLng(lat, lng));
}

function drawPolyline() {
	myPath = new google.maps.Polyline({
		path : polylines,
		strokeColor : "#ff0000", // ��ɫ
		strokeOpacity : 0.5, // 50%��͸����
		strokeWeight : 5
	// ����̫��(px)
	});
	myPath.setMap(runMap); // �B�Aֱ�����軭����
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
	// return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" +
	// hundredths;
	return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2);
}