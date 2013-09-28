function onloadmethods() {
  onresizemethods();
}

function onresizemethods() {
  resizeMap();
}

function resizeMap () {
    $(".map-position").attr("style", "padding: 0px;");
    $(".map-position").width(window.innerWidth);
    $(".map-position").height('150px');
}

window.onload = onloadmethods;
window.onresize = onloadmethods;