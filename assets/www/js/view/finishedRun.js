var lat = 0;
var lng = 0;
var polylines = [];
var pos = [];
var myPath;

var runMap = new google.maps.Map(document.getElementById("runMap"), {
	zoom : 17,
	// center : new google.maps.LatLng(lat, lng),
	disableDefaultUI : true,
	zoomControl : true,
	mapTypeId : google.maps.MapTypeId.ROADMAP
});
var data = localStorage.getItem("posData");
console.log(data);
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
	}, 3000);
}
function resizeMap() {
	console.log('!!!');
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
}