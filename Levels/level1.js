// Just sets up some initial variables.
var time = 0;
var TIME_MAX = 1100;
var timeOverflow = 0;
var overflowDelay = 2;
var timerDelay = 33;
var mainTimer;

// Checks to see if time has reached its max limit.
function loseCheck(){
    if(testCollision('batman', 'gateImg')){
        clearInterval(mainTimer);
        alert("You Lose!");
    }
}

// Increments the timer and moves the image. timeOverflow basically slows things down by a division of X.
// Want to make an algorithm to just plug-in numbers to get a set time. Would take a lot of math and time though.
function timeAdd(){
    timeOverflow++;
    if(timeOverflow > overflowDelay){
        timeOverflow = 0;
        time++;
        move();
    }
}

// Grabs the picture ID, and its style value of left, and adds x px.
function move() {
    batman = document.getElementById("batman").style.left;
	batman = (parseInt(batman)+ 1 + "px");
	document.getElementById("batman").style.left = batman;
}

// Page loads, then starts a timer that moves and increments values with a delay of timerDelay.
window.onload = function () {
        if (time < 1) {
           mainTimer = setInterval(function () { timeAdd();loseCheck();}, timerDelay);
        } else {
            clearInterval(mainTimer);
            time = 0;
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
        // document.getElementById(objectB).id = 'dead';
        collideX = false;
        collideY = false;
    }
}
//-------------------- End Collision code.
