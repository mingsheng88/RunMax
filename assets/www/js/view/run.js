var lat = 0;	// 初期の緯度
var lng = 0;	// 初期の経度
var polylines = [ ];	// 連続直線オブジェクトを格納する配列変数
var pos = [ ];	// ローカルストレージ用に座標値を保存する配列変数
var myPath;	// 連続直線を描画するための変数

var totalDistance=0;
var runTimer=undefined;
var totalTime=0;


var map = new google.maps.Map(
	document.getElementById("myMap"),{
		zoom : 17,
		//center : new google.maps.LatLng(lat, lng),
                disableDefaultUI: true,
                zoomControl:true,
		mapTypeId : google.maps.MapTypeId.ROADMAP
		
	}
);
var marker = new google.maps.Marker({
	position: new google.maps.LatLng(lat,lng),
	map: map,
	title:"Me"
});

var enableEvent = getUrlVars()["events"];
var petSelection = getUrlVars()["petSelection"];

$('#petSelection').html(petSelection);

var lastCheckPoint=0;
var noItems=0;
if(enableEvent=='yes'){
	$('#noItems').html(noItems);
}else{
	$('#noItems').html("Off");
	$('#monsterCaptured').html("Off");
}




var itemPos = [ ];

function runEvent(){
	if(enableEvent=='yes'){
		console.log("displace "+((totalDistance*1000)-lastCheckPoint));
		//happen evey 100m for now
		if(((totalDistance*1000)-lastCheckPoint)>100){
			var tmp=(totalDistance*1000)/100;
			lastCheckPoint=Math.floor(tmp)*100;
			var chance=Math.floor((Math.random()*100)+1);
			//possibility change here!! 69%chance
			if(chance<70){
				itemPos.push([lat, lng]);
				var itemMarker = new google.maps.Marker({
					position: new google.maps.LatLng(lat,lng),
					icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
					map: map,
					title:"Item"
				});
				noItems++;
				$('#noItems').html(noItems);
				var itemSnd = new Media("file:///android_asset/www/sounds/itemFound.mp3");
				itemSnd.play();
				navigator.notification.vibrate(500);
			}else if(chance>=70){
				//30% chance get monster
				if(captureEventStarted==false&&monsterCaptured==false){
					captureEventInit();		
				}
			}
			
		}
	}
}
var monsterSpotedTime=0;
var monsterSpotedLoc=0;
var currentSpeed =0;
var monsterCaptured=false;
var captureEventStarted=false;
var monsterSpeed=0;
var monsterLoc=0;
function captureEventInit(){
	monsterSpotedTime=totalTime;
	monsterSpotedLoc=(totalDistance*1000);
	currentSpeed=(totalDistance*1000)/totalTime;
	//30% faster than ur orginal speed
	monsterSpeed= currentSpeed*1.1;
	//monster 50m away
	monsterLoc=monsterSpotedLoc+50;
	captureEventStarted=true;
	
	var spottedSnd = new Media("file:///android_asset/www/sounds/spotted.mp3");
	spottedSnd.play();
	navigator.notification.vibrate(1000);
	//console.log('caputre event started!!!! m loc:'+monsterLoc);
}

var monCapLocation=[];
function captureCheck(){
	if(captureEventStarted==true&&monsterCaptured==false){
	   monsterLoc=monsterSpotedLoc+50+(monsterSpeed*(totalTime-monsterSpotedTime));
	   console.log('m loc:'+monsterLoc+"speed"+monsterSpeed+" my loc:"+(totalDistance*1000));
	   
	   var dist=monsterLoc-(totalDistance*1000);
	   var timeUsed=totalTime-monsterSpotedTime;
	   //time limit 2 min
	   if(timeUsed>120000){
		$('#monsterCaptured').html('<font color="red">Escaped!</font>');
		captureEventStarted=false;
		var escapedSnd = new Media("file:///android_asset/www/sounds/escaped.mp3");
		escapedSnd.play();
		navigator.notification.vibrate(1000);
	   }else{
		if(dist<5){
			monsterCaptured=true;
			captureEventStarted=false;
			$('#monsterCaptured').html('<font color="green">Captured!</font>');
			monCapLocation.push([lat, lng]);
			var monMarker = new google.maps.Marker({
					position: new google.maps.LatLng(lat,lng),
					icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
					map: map,
					title:"Monster Captured"
			});
			var capturedSnd = new Media("file:///android_asset/www/sounds/captured.mp3");
			capturedSnd.play();
			navigator.notification.vibrate(1000);
		}else{
			$('#monsterCaptured').html('<font color="red">'+Math.round(dist)+'m Away!</font>');
			if(Math.round(dist)<50)
			        navigator.notification.vibrate(500);
			else
				navigator.notification.vibrate(1000);
		}
	   } 
	}
}


navigator.geolocation.watchPosition(
	function(position){
		lat = position.coords.latitude;
		lng = position.coords.longitude;
		
		//var accuracy=position.coords.accuracy;
		//console.log("AccStr!!"+Math.round(position.coords.accuracy)+"!!");
		var acc=Math.round(position.coords.accuracy);
		//console.log("Accuracy: "+acc);
		if(acc<=30){
			if(acc<=10){
				$('#singal').html('<font color="green">Strong</font>');
			}else{
				$('#singal').html('<font color="orange">Okay</font>');
			}
			if(typeof runTimer === "undefined"){
				navigator.notification.vibrate(500);
				var startSnd = new Media("file:///android_asset/www/sounds/workoutstarted.mp3");
				startSnd.play();
				google.maps.event.trigger(map, 'resize');
				runTimer=setInterval(function(){myTimer()},1000);
			}
			runEvent();
			captureCheck();
					
			//map.setCenter(new google.maps.LatLng(lat, lng));	// 現在地を地図の中心にする
			pos.push([lat, lng]);	// 座標を配列に追加
			polylines.push(new google.maps.LatLng(lat, lng));
			if(!(typeof myPath === "undefined")){
				myPath.setMap(null);
			}
			drawPolyline();	// 連続直線を描画する
			var dist=google.maps.geometry.spherical.computeLength(myPath.getPath().getArray());
			totalDistance= Math.round(dist)/1000;
			//console.log(lat+"   "+lng+ " "+totalTime);
			
			$('#totalDistance').html(totalDistance+" Km");
			
			if(totalTime!=0&&totalDistance!=0){
				$('#pace').html(formatTime(totalTime/totalDistance)+"(min:sec)/Km");
				
			}
			map.setCenter(new google.maps.LatLng(lat,lng));
			marker.setPosition(new google.maps.LatLng(lat,lng));
			
			
		}else{
			
			$('#singal').html('<font color="red">Weak</font>');
		}
		
	},
	function(error){
		 alert('code: '    + error.code    + '\n' +
			'message: ' + error.message + '\n');
	},
	{
		enableHighAccuracy : true,	
		maximumAge : 4*1000,	
		timeout : 30*1000	
	}
);	




//setTimeout("window.scrollTo(0,1)", 10);	// ナビゲーションバーを消す


// 連続直線を描画
function drawPolyline(){
	myPath = new google.maps.Polyline({
		path: polylines,
		strokeColor: "#ff0000",	// 赤色
		strokeOpacity: 0.5,	// 50%の透明度
		strokeWeight: 5	// 線の太さ(px)
	});
	myPath.setMap(map);	// 連続直線を描画する
	
}

// ボタンがクリックされたら軌跡を全て削除
function clearTrack(){
	myPath.setMap(null);
	polylines = [ ];
	pos = [ ];
}

/*
// データ読み出し、マップ上に表示
var data = localStorage.getItem("posData");	// データがなければnullがdataに入る
if (data){
	data = data.split(",");	// ,で分割し配列に変換
	for(var i=0; i<data.length; i+=2){
		lat = data[i];	// 緯度
		lng = data[i+1];	// 経度
		pos.push([lat, lng]);	// 座標を配列に追加
		polylines.push(new google.maps.LatLng(lat, lng));	// 描画用の配列に座標を追加
	}
	drawPolyline();	// 連続直線を描画する
}
*/
//buttons
$( "#run_reset" ).bind( "tap", function(event, ui) {
	/*
	if(totalTime>0){
		var r=confirm("Are you sure to reset?");
		if (r==true)
		{	
		navigator.notification.vibrate(500);
		navigator.notification.beep(1);
		$('#pace').html("Loading...");
		clearTrack();
		totalDistance=0;
		totalTime=0;
		}
		else
		{
		//x="You pressed Cancel!";
		}
	}*/
});

$( "#run_stop" ).bind( "tap", function(event, ui) {
	if(totalTime>0){
		var r=confirm("Are you sure to stop the run?");
		if (r==true)
		{
			myStopFunction();
			
			var endSnd = new Media("file:///android_asset/www/sounds/workoutended.mp3");
			endSnd.play();
			var qureyStr='totalDistance='+totalDistance+
			'&pace='+(totalTime/totalDistance)+
			'&petSelection='+petSelection+
			'&totalTime='+totalTime;
			storeTolocal();
			navigator.notification.vibrate(500);
			$.mobile.navigate( "details-page.html?"+qureyStr );
		}
		else
		{
		}
	}
});

function storeTolocal(){
	try{
		localStorage.setItem("posData", pos.toString()); 
		localStorage.setItem("itemPos", itemPos.toString());
		localStorage.setItem("monCapLocation", monCapLocation.toString());
		
	}catch(e){
		alert("storage error!");
	}
	
}

function myTimer()
{
		//console.log('!!!!'+totalTime);
		if (totalTime<0){
			totalTime=0;
		}else{
			totalTime+=1000;
		}
		$('#stopwatch').html(formatTime(totalTime));
}

function myStopFunction()
{
	clearInterval(runTimer);
}


// Common functions
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {str = '0' + str;}
    return str;
}
function formatTime(time) {
    time = time / 10;
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    //return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2);
}

// get url
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

