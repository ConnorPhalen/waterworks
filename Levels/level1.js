// Just sets up some initial variables.
var time = 0;
var timeOverflow = 0;
var TIMEOVERFLOW_MAX = 2;
var timerDelay = 33;
var waveMovement = 4;
var mainTimer = setInterval(function () { timeAdd();}, timerDelay);

// Checks to see if time has reached its max limit.
function loseCheck(){
    if(testCollision('batman', 'gateImg')){
        clearInterval(mainTimer);
     }
}

// Increments the timer and moves the image. timeOverflow basically slows things down by a division of X.
// Want to make an algorithm to just plug-in numbers to get a set time. Would take a lot of math and time though.
function timeAdd(){
    time++;
    timeOverflow++;
    if(timeOverflow > TIMEOVERFLOW_MAX){
        timeOverflow = 0;
        move();
    }
    loseCheck();
    // Tests for checking if there is a stickmanX, then run the collision code and delete them if true.
    if(document.getElementById('stickman1') !== null){
        stickmanCollision('batman', 'stickman1');
    }
    if(document.getElementById('stickman2') !== null){
        stickmanCollision('batman', 'stickman2');
    }
    if(document.getElementById('stickman3') !== null){
        stickmanCollision('batman', 'stickman3');
    }
    if(document.getElementById('stickman4') !== null){
        stickmanCollision('batman', 'stickman4');
    }
    if(document.getElementById('stickman5') !== null){
        stickmanCollision('batman', 'stickman5');
    }
}

// Grabs the picture ID, and its style value of left, and adds x px.
function move() {
    batman = document.getElementById("batman").style.left;
	batman = (parseInt(batman)+ waveMovement + "px");
	document.getElementById("batman").style.left = batman;
}

// Page loads, then starts a timer that moves and increments values with a delay of timerDelay.
/*window.onload = function () {
        if (time < 1) {
          var mainTimer = setInterval(function () { timeAdd();}, timerDelay);
        } else {
            clearInterval(mainTimer);
            time = 0;
        }  
}*/

// Function to test out the "wave" and stickman collisions. If they do collide, the stickman will delete itself.
function stickmanCollision(wave, stickman) {
    waveID = wave;
    stickmanID = stickman;
    if(testCollision(waveID, stickmanID)){
        stickmanID = document.getElementById(stickman);
        if (stickmanID.parentNode) {
            stickmanID.parentNode.removeChild(stickmanID);
        }
    }
}

// ---------------------- Function to test out collisions between images. Best used with more rectangular images.
function testCollision(objectA, objectB){

    // Set these to false at start to prevent false positives.
    collideX = false;
    collideY = false;

    // Sets these variables to simplify code later by getting .css varibles easy.
    aID = document.getElementById(objectA).style;
    bID = document.getElementById(objectB).style;

    // Checks to see if the X position (from left of screen) is within the width of the second image.
    if((parseInt(bID.left) - parseInt(aID.width)) - 1 < parseInt(aID.left) && parseInt(aID.left) < ((parseInt(bID.left) + parseInt(bID.width)) + 1)){
        collideX = true;
    }else{
        collideX = false;
    }

    // Checks to see if the Y position (from top of screen) is within the height of the second image.
    if((parseInt(bID.top) - parseInt(aID.height)) - 1 < parseInt(aID.top) && parseInt(aID.top) < ((parseInt(bID.top) + parseInt(bID.height)) + 1)){
        collideY = true;
    }else{
        collideY = false;
    }

    // If both X and Y have collided, then a collision has occured.
    if(collideX && collideY){
        alert("Collision!");
        return true;
    }else{
        return false;
    }
}
//-------------------- End Collision code.
