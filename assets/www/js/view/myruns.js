/*
function onloadmethods() {
  onresizemethods();
}

function onresizemethods() {
  resizeAnalytics();
  resizeRunListing();
}

function resizeAnalytics() {
  $("#analytics-a").height($("#analytics-a").width());
  $("#analytics-b").height($("#analytics-b").width());
}

function resizeRunListing () {
    var leftoverHeight = window.innerHeight - $('#analytics').innerHeight() - $('#subtract-a').innerHeight() - $('#subtract-b').innerHeight() - 35;
    $("#run-listing").height(leftoverHeight);
}

window.onload = onloadmethods;
window.onresize = onloadmethods;
 */

var noRun = localStorage.getItem("runs-completed");
var str = '<li data-theme="b" data-role="list-divider" class="sec-header-wording">Run Listing</li>';
for (i = 0; i < noRun; i++) {
	var tempStr = localStorage.getItem('run' + i);
	var runJson = JSON.parse(tempStr);
	 str = str+' <li><a href="runDetail.html?id=run' + i + '">\
	             <h1>'
			+ runJson.Run.startTime + '</h1>\
	             <p>Distance:'
			+ runJson.Run.totalDistance + ' Km  Time Used:'
			+ runJson.Run.totalTime + ' min:sec</p>\
	        	 </a></li>';
	
}
$('.run-listing').html(str);
