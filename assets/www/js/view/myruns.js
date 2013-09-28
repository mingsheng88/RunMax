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