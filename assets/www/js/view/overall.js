$(document).bind("mobileinit", function () {
  $.event.special.tap.tapholdThreshold = 1000,
  $.event.special.swipe.durationThreshold = 999;
});

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
  $page.on( "swipeleft swiperight", function( e ) {
    // We check if there is no open panel on the page because otherwise
    // a swipe to close the left panel would also open the right panel (and v.v.).
    // We do this by checking the data that the framework stores on the page element (panel: open).
    if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
      if ( e.type === "swiperight" ) {
        $( ".ui-left-panel" ).panel( "open" );
      } else if ( e.type === "swipeleft" ) {
        $( ".ui-right-panel" ).panel( "open" );
      }
    }
  });

  // Load left panel
  $(function() {
    var link1 = "'profile.html'";
    var imageSrc1 = "image.png'";
    var title1 = 'Profile';
    var subtext1 = 'Lorem ipsum dolor sit amet.';
    // $(".left-panel-data").append($("<li data-icon='false'><a data-transition='slide' href=" + link1 +"><img src=" + imageSrc1 +" />" +
    //   "<h1>" + title1 + "</h1><p>" + subtext1 + "</p></a></li>")).listview('refresh');

link2 = "'myruns.html'";
imageSrc2 = "run.jpg'";
title2 = 'My Runs';
subtext2 = 'Lorem ipsum dolor sit amet.';
    // $(".left-panel-data").append($("<li data-icon='false'><a href=" + link2 +"><img src=" + imageSrc2 +" />" +
    //   "<h1>" + title2 + "</h1><p>" + subtext2 + "</p></a></li>")).listview('refresh');

link3 = "'listing-page.html'";
imageSrc3 = "egg.png'";
title3 = 'My Pets';
subtext3 = 'Lorem ipsum dolor sit amet.';
    // $(".left-panel-data").append($("<li data-icon='false'><a href=" + link3 +"><img src=" + imageSrc3 +" />" +
    //   "<h1>" + title3 + "</h1><p>" + subtext3 + "</p></a></li>")).listview('refresh');

    // To be developed in the future
    link4 = "'#'";
    imageSrc4 = "egg.png'";
    title4 = 'The Pet Shop';
    subtext4 = 'Lorem ipsum dolor sit amet.';
    // $(".left-panel-data").append($("<li data-icon='false'><a href=" + link4 +"><img src=" + imageSrc4 +" />" +
    //   "<h1>" + title4 + "</h1><p>" + subtext4 + "</p></a></li>")).listview('refresh');

link5 = "'friends.html'";
imageSrc5 = "friend.jpg'";
title5 = 'Training Gym';
subtext5 = 'Lorem ipsum dolor sit amet.';
    // $(".left-panel-data").append($("<li data-icon='false'><a href=" + link5 +"><img src=" + imageSrc5 +" />" +
    //   "<h1>" + title5 + "</h1><p>" + subtext5 + "</p></a></li>")).listview('refresh');

$(".left-panel-data").html($("<li id='username-field' data-icon='false'>Stranger</li><li data-icon='false'><a data-transition='slide' href=" + link1 +"><img id='profile-link' style='margin-top:16px;margin-left:20px;' src='css/global/images/" + imageSrc1 +" />" +
  "<h1>" + title1 + "</h1><p>" + subtext1 + "</p></a></li><li data-icon='false'><a data-transition='slide' href=" + link2 +"><img src='css/global/images/" + imageSrc2 +" />" +
  "<h1>" + title2 + "</h1><p>" + subtext2 + "</p></a></li><li data-icon='false'><a data-transition='slide' href=" + link3 +"><img src='css/global/images/" + imageSrc3 +" />" +
  "<h1>" + title3 + "</h1><p>" + subtext3 + "</p></a></li><li data-icon='false'><a data-transition='slide' href=" + link4 +"><img src='css/global/images/" + imageSrc4 +" />" +
  "<h1>" + title4 + "</h1><p>" + subtext4 + "</p></a></li><li data-icon='false'><a data-transition='slide' href=" + link5 +"><img src='css/global/images/" + imageSrc5 +" />" +
  "<h1>" + title5 + "</h1><p>" + subtext5 + "</p></a></li><li data-icon='false'><a class='btn' href='javascript:logout()' data-ajax='false' data-role='button'>Logout</a></li>")).listview('refresh');

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
$('.pet-img-grid').height(imgHeight);
$('.pet-img-grid').width(imgHeight);
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

$("#username-field").text("Stranger");
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
  if(1==1) {
    $('.primary-header-text').text("My Profile");
// $('#username').text("Lorem ipsum.");
// $('#email').text("Lorem@Ipsum.com");
}
else
  $('.primary-header-text').text("Registration");
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
function login(url) {
  FB.getLoginStatus(function(response) {
    if (response.status == 'connected') {
      alert(response);
      window.location = "home.html";
    } else {
    }
  });
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

// FB.Event.subscribe('auth.login', function(response) {
//   alert('auth.login event');
// });

// FB.Event.subscribe('auth.logout', function(response) {
//   alert('auth.logout event');
// });

// FB.Event.subscribe('auth.sessionChange', function(response) {
//   alert('auth.sessionChange event');
// });

// FB.Event.subscribe('auth.statusChange', function(response) {
//   alert('auth.statusChange event');
// });
// Facebook Related Functions end



// Getting parameters
function getURLParameter(name) {
  return decodeURI(
    (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}
// Getting parameters end


// Listing-page.HTML
function initializeListingPage() {
  // item.getUserItems("
  //   $('#listing-ul').append('<li><a href=\"#\"><img src=\"css/global/images/image.png\" /></a></li>'');
  // ");
  // alert("HERE");
  var actions = addObjectToUnorderedList('listing-ul', '#', 'sushi.gif', 'Sushi', 'Delicacies of the sea!') +
  addObjectToUnorderedList('listing-ul', '#', 'icecream.jpg', 'Ice-Cream', 'Cheer up!') +
  addObjectToUnorderedList('listing-ul', '#', 'dumbbell.png', 'Dumbbells', 'Get fit~!') +
  addObjectToUnorderedList('listing-ul', '#', 'image.png', 'Lorem ipsum.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, possimus.') +
  addObjectToUnorderedList('listing-ul', '#', 'image.png', 'Lorem ipsum.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, possimus.') +
  addObjectToUnorderedList('listing-ul', '#', 'image.png', 'Lorem ipsum.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, possimus.');
  var items = new item(1);
  items.getUserItems(actions);
}
// Listing-page.HTML end


// Addition of content to unordered list for listing pages
function addObjectToUnorderedList(id, url, img, header, content) {
  return '$("#' + id + '").append(\'<li><a href="' + url + '"><img src="css/global/images/' + img + '" /><h1>' + header + '</h1><p>' + content + '</p></a></li>\').listview("refresh");';
}
// Addition of content to unordered list for listing pages end

function feedPet(petId, itemId) {

  // Need to find the way to create item quickly
  var items = new item(0);
  items.deleteItem(itemId);
  var pets = new pet('','','','','');
  pets.feedPet(petId);
}
