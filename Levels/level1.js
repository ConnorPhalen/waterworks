// Just sets up some initial variables.
var time = 0;
var TIME_MAX = 10;

// Checks to see if time has reached its max limit.
function waterTimer(){
    if(time >= TIME_MAX){
        alert("You Lose!");
        clearInterval(mainTimer);
    }
}

// MANUAL ACTIVATION ONLY: Increments time by 1, and starts waterTimer().
function timeAdd(){
    time++;
    waterTimer();
    move();
}

// Grabs the picture ID, and its style value of left, and adds 100px.
function move() {
    batman = document.getElementById("batman").style.left;
				batman = (parseInt(batman)+ 100 + "px");
				document.getElementById("batman").style.left = batman;
}

// Page loads, then starts a timer that adds time plus 1 every second, and runs waterTimer.
window.onload = function () {
        if (time < 1) {
           mainTimer = setInterval(function () { time++; waterTimer(); move(); }, 1000);
        } else {
            clearInterval(mainTimer);
            time = 0;
        }  
}

// Sets the timeAdd() function to go off once a second.
function test() {
    if (time < 1) {
        setInterval(function () { time++; waterTimer(); }, 1000);
    }
}

// Set these varibales to test if two objects collide with each other using testCollsion()
testCollisionA = "batman";
testCollisionB = "gateImg";

// ---------------------- Function to test out collisions between images. Best used with more rectangular images.
function testCollision(){

    // Set these to false at start to prevent false positives.
    collideX = false;
    collideY = false;

    // Sets these variables to simplify code later by getting .css varibles easy.
    aID = document.getElementById(testCollisionA).style;
    bID = document.getElementById(testCollisionB).style;

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
    }else{
        alert("Nope.");
    }
}
//-------------------- End Collision code.
