var firstBucket = document.getElementById("emptyBucket0");

var audio = new Audio('../sounds/water_click.wav');
var hollow = new Audio('../sounds/water_click_hollow.wav')
var back = document.getElementById("homeScreens");

function click_Button() {
    audio.play();
}
function click_Bucket() {
    hollow.play();
}