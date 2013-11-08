

var loadCSS = function(href) {
  var cssLink = $("<link>");
  $("head").append(cssLink);
  cssLink.attr({
    rel: "stylesheet",
    type: "text/css",
    href: href
  });
};

var loadJS = function(src) {
  var jsLink = $("<script>");
  $("head").append(jsLink);
  jsLink.attr({
    type: "text/javascript",
    src: src
  });
};

// Swipe Function
$( document ).on( "pageinit", ".ui-page", function() {
  var $page = $(this);
  
 //  $.extend($.event.special.swipe,{
	//   scrollSupressionThreshold: 100, // More than this horizontal displacement, and we will suppress scrolling.
	//   durationThreshold: 200, // More time than this, and it isn't a swipe.
	//   horizontalDistanceThreshold: 100,  // Swipe horizontal displacement must be more than this.
	//   verticalDistanceThreshold: 1000,  // Swipe vertical displacement must be less than this.
	// });

  // $page.on( "swiperight", function( e ) {
  //   // We check if there is no open panel on the page because otherwise
  //   // a swipe to close the left panel would also open the right panel (and v.v.).
  //   // We do this by checking the data that the framework stores on the page element (panel: open).
  //   if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
  //     if ( e.type === "swiperight" ) {
  //       $( ".ui-left-panel" ).panel( "open" );
  //     } 
  //   }
  // });

  // Load left panel
  $(function() {
   var name = localStorage.getItem('firstname');
   var link0 = "'home.html'";
   var imageSrc0 = "css/global/images/icons/home.png";
   var title0 = 'Home';
   var subtext0 = '';
	    // $(".left-panel-data").append($("<li data-icon='false'><a data-transition='slide' href=" + link1 +"><img src=" + imageSrc1 +" />" +
	    //   "<h1>" + title1 + "</h1><p>" + subtext1 + "</p></a></li>")).listview('refresh');

var link1 = "'profile.html'";
var imageSrc1 = "icons/profile.png'";
   if (localStorage.getItem('photo')) {
    imageSrc1 = localStorage.getItem('photo');
  } else {
    imageSrc1 = "css/global/images/icons/profile.png";
  }
var title1 = 'Profile';
var subtext1 = '';
    // $(".left-panel-data").append($("<li data-icon='false'><a data-transition='slide' href=" + link1 +"><img src=" + imageSrc1 +" />" +
    //   "<h1>" + title1 + "</h1><p>" + subtext1 + "</p></a></li>")).listview('refresh');

link2 = "'myruns.html'";
imageSrc2 = "icons/run.png'";
title2 = 'My Runs';
subtext2 = '';
    // $(".left-panel-data").append($("<li data-icon='false'><a href=" + link2 +"><img src=" + imageSrc2 +" />" +
    //   "<h1>" + title2 + "</h1><p>" + subtext2 + "</p></a></li>")).listview('refresh');

link3 = "'listing-page.html'";
imageSrc3 = "pet.gif'";
title3 = 'My Pets';
subtext3 = '';
    // $(".left-panel-data").append($("<li data-icon='false'><a href=" + link3 +"><img src=" + imageSrc3 +" />" +
    //   "<h1>" + title3 + "</h1><p>" + subtext3 + "</p></a></li>")).listview('refresh');

    // To be developed in the future
    link4 = "'itemShop.html'";
    imageSrc4 = "icons/shop.png'";
    title4 = 'The Item Shop';
    subtext4 = '';
    // $(".left-panel-data").append($("<li data-icon='false'><a href=" + link4 +"><img src=" + imageSrc4 +" />" +
    //   "<h1>" + title4 + "</h1><p>" + subtext4 + "</p></a></li>")).listview('refresh');

link5 = "'friends.html'";
imageSrc5 = "icons/gym.png'";
title5 = 'Training Gym';
subtext5 = '';
    // $(".left-panel-data").append($("<li data-icon='false'><a href=" + link5 +"><img src=" + imageSrc5 +" />" +
    //   "<h1>" + title5 + "</h1><p>" + subtext5 + "</p></a></li>")).listview('refresh');

$(".left-panel-data").html($("<li id='username-field' data-icon='false'>" + name + "</li>"+
  "<li data-icon='false'><a data-transition='slide' data-ajax='false' href=" + link0 +">"+
  "<img id='profile-link' style='margin-top:10px;margin-left:10px;width:60px;' src='" + imageSrc0 +"' />" +
  "<h1>" + title0 + "</h1><p>" + subtext0 + "</p>"+
  "<li data-icon='false'><a data-transition='slide' href=" + link1 +">"+
  "<img id='profile-link' style='margin-top:10px;margin-left:10px;width:60px;' src='" + imageSrc1 +"' />" +
  "<h1>" + title1 + "</h1><p>" + subtext1 + "</p></a></li><li data-icon='false'><a data-transition='slide' href=" + link2 +"><img style='margin-top:10px;margin-left:10px;width:60px;' src='css/global/images/" + imageSrc2 +" />" +
  "<h1>" + title2 + "</h1><p>" + subtext2 + "</p></a></li>"+
  //"<li data-icon='false'><a data-transition='slide' href=" + link3 +">" +
  //"<img style='margin-top:10px;margin-left:10px;width:60px;' src='css/global/images/" + imageSrc3 +" />" +
  //"<h1>" + title3 + "</h1><p>" + subtext3 + "</p></a></li>"+
  "<li data-icon='false'><a data-transition='slide' href=" + link4 +">"+
  "<img style='margin-top:10px;margin-left:10px;width:60px;' src='css/global/images/" + imageSrc4 +" />" +
  "<h1>" + title4 + "</h1><p>" + subtext4 + "</p></a></li>"
  //+"<li data-icon='false'><a data-transition='slide' href=" + link5 +"><img style='margin-top:10px;margin-left:10px;width:60px;' src='css/global/images/" + imageSrc5 +" />" +
  //"<h1>" + title5 + "</h1><p>" + subtext5 + "</p></a></li>"
  +" ")).listview('refresh');

$('#initialized').text("y");

});
  // Load left panel end
});


// Swipe Function End


// Home.html JS
function initializeHome() {
// Resize image div
var imgHeight = window.innerWidth * 0.32;
if(imgHeight > 100) imgHeight = 100;
$('.pet-info').height(imgHeight + 30);
// Resize image div end

// Modify slider
$('.slider-font').css("fontSize", ($('html').css('font-size').replace(/[^-\d\.]/g, '') * 0.6));
$('.slider-one').slider('disable', true);
$('.slider-two').slider('disable', true);
// Modify slider end

// Resize stats div
var statsWidth = window.innerWidth * 0.42;
var statsHeight = window.innerWidth * 0.32;
if(statsHeight > 130) statsHeight = 130;
$('.pet-stats-grid').height(statsHeight);
$('.pet-stats-grid').width(statsWidth);
// Resize stats div end

// Resize run listing
$('.sec-header-wording').attr("style", "text-align:center;");
var leftoverHeight = window.innerHeight - $(".primary-header").innerHeight() - $(".secondary-header").innerHeight() - $(".pet-info").innerHeight();
$(".run-listing").height(leftoverHeight);
// Resize run listing end

$("#username-field").text(localStorage.getItem('firstname'));
}
// Home.html JS end


// MyRuns.html JS
function initializeMyRuns() {
// Resize analytics
var width = $(".analytics-a").innerWidth() * 2.3;
if (width > 165) width = 165;
$(".analytics-a").height(width);
$(".analytics-b").height(width);
$(".analytics").height(width + 35);
// Resize analytics end

// Resize run listing
$('.sec-header-wording').attr("style", "text-align:center;");
var leftoverHeight = window.innerHeight - $('.analytics-a').innerHeight() - $(".primary-header").innerHeight() - $(".secondary-header").innerHeight() - 35;
$(".run-listing").height(leftoverHeight);
// Resize run listing end
}
// MyRuns.html JS end


// Profile / Registration.html JS
function initializeProfile() {
  $('.primary-header-text').text("My Profile");
  $('#firstname').val(localStorage.getItem('firstname'));
  $('#email').val(localStorage.getItem('email'));
  $('#weight').val(localStorage.getItem('weight'));
  $('#event').val(localStorage.getItem('event')).slider("refresh");
}
// Profile / Registration.html JS end


// Running-map.html JS
function initializeMap() {
  // Resize run listing
  $('.sec-header-wording').attr("style", "text-align:center;");
  var leftoverHeight = window.innerHeight - $('.map-position').innerHeight() - $(".primary-header").innerHeight() - 39 - $(".secondary-header").innerHeight() - 35;
  $(".run-info").height(leftoverHeight);
  // Resize run listing end
}
// Running-map.html JS end


// Details-page.html JS
function initializeDetailsPage() {
  $('.slider-a').slider('disable');
  $('.slider-b').slider('disable');
}
// Details-page.html JS end



// Facebook Related Functions
function login() {
  var name;
  FB.login(function(response) {
    if(response.authResponse) {
      FB.api('/me',function(response) {
        // var user1= new userProfile(response.first_name, response.last_name,response.email,0,response.link + "/picture");
        // user1.persist();
        localStorage.setItem("firstname", response.name);
        localStorage.setItem("email", response.email);
        localStorage.setItem("photo", 'http://graph.facebook.com/' + response.id + '/picture');
        window.location = "home.html";
      });
    } else {
      window.location = "index.html";
    }
  },
  { scope: "email" });
}

function logout() {
  FB.logout(function(response) {
    window.location = "index.html";
  });
}

function getLoginStatus(location, force) {
  FB.getLoginStatus(function(response) {
    if (response.status == 'connected') {
      var accessToken = response.authResponse.accessToken;
      window.location = location + "?token=" + accessToken;
    } else {
    }
  }, force);
}

function getName() {
  var name;
  FB.login(function(response) {
    if(response.authResponse) {
      FB.api('/me',function(response) {
        var user1= new userProfile(response.first_name, response.last_name,response.email,0,response.link + "/picture");
        user1.persist();
        $("#username-field").text(response.name);
        $("#profile-link").attr('src', 'http://graph.facebook.com/' + response.id + '/picture');
      });
      return name;
    } else {
      window.location = "index.html";
    }
  },
  { scope: "email" });
}

function getAppUsers() {
  var users;
  FB.getAuthResponse(function(response) {
    alert(JSON.stringify(response));
    FB.api('/me/friends?fields=installed', function(response) {
      alert(JSON.stringify(response));
    });
  });
}


// Getting parameters
function getURLParameter(name) {
  return decodeURI(
    (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}
// Getting parameters end


// Listing-page.HTML
function initializeListingPage() {
  var action = "";
  var pet = getUrlVars()["petSelection"];
  for (i = 0; i < 6; i++) {
    tmp = JSON.parse(localStorage.getItem('item' + i));
    if(tmp[5] !== 0) {
      var newUrl = "javascript:feedPet('" + pet + "', " + i + ")";
      action += addObjectToUnorderedList(newUrl, tmp[3], tmp[0], tmp[4], tmp[5]);
    }
  }
  $('#listing-ul').html(action).listview('refresh');
  if ($('#listing-ul').html() == "") {
    $('#listing-ul').html("<li><h1>Oops.. Your inventory is empty!</h1><p></p></li><li><a href='home.html' class='btn'>Click here to go back</a></li>").listview('refresh');
  }
}
// Listing-page.HTML end


// Addition of content to unordered list for listing pages
function addObjectToUnorderedList(url, img, header, content, quantity) {
  return '<li><a href="' + url + '"><img src="css/global/images/' + img + '" /><h1>' + header + ' (Quantity: ' + quantity + ')</h1><p>' + content + '</p></a></li>';
}
// Addition of content to unordered list for listing pages end

function feedPet(petLabel, itemId) {
  // Need to find the way to create item quickly
  var consumedItem = new item(itemId);
  consumedItem.quantity--;
  consumedItem.update();
  var fedPet = new rumon(petLabel.charAt(petLabel.length-1));
  fedPet.energy = fedPet.energy + consumedItem.energy_impact;
  fedPet.fitness = fedPet.fitness + consumedItem.fitness_impact;
  fedPet.update();
  alert("After eating, your pet has gained " + consumedItem.energy_impact + " energy and " + consumedItem.fitness_impact + " fitness points~");
  window.location = "home.html";
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

function setupProfile() {
  var user = document.forms["profile-form"]["firstname"].value.trim();
  var email = document.forms["profile-form"]["email"].value.trim();
  localStorage.setItem('firstname', user);
  localStorage.setItem('email', email);
  window.location = "home.html";
}

function updateProfile() {
  var user = document.forms["profile-form"]["firstname"].value.trim();
  var email = document.forms["profile-form"]["email"].value.trim();
  var weight = document.forms["profile-form"]["weight"].value.trim();
  var events = document.forms["profile-form"]["event"].value.trim();
  localStorage.setItem('firstname', user);
  localStorage.setItem('email', email);
  localStorage.setItem('weight', weight);
  localStorage.setItem('event', events);
  window.location = "home.html";
}
/*
function renamePet() {
  var newName = document.forms["rename-form"]["newName"].value.trim();
  var thepet = $("#variable").html();
  var p = new rumon(thepet);
  p.petName = newName;
  p.update();
  window.location = "home.html";
}*/