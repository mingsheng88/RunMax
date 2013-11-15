var noRun = localStorage.getItem("runs-completed");
var str='';
if(noRun == 0) {
  str = '<li data-icon="false"><a href="#">No runs have been logged at the moment.</a></li>';
} else {
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
}

setTimeout(function () {
	$('#runList').html(str).listview('refresh');
}, 1000);



