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

//-------------------- testing out some collision code
collideX = false;
collideY = false;

function testCollision(){
    aX = parseInt(document.getElementById("batman").style.left);
    bX = parseInt(document.getElementById("gateImg").style.left);
    aY = parseInt(document.getElementById("batman").style.top);
    bY = parseInt(document.getElementById("gateImg").style.top);

    if(aX - 50 < bX && aX + 50 > bX){
        collideX = true;
    }else{
        collideX = false;
    }

    if(aY - 50 < bY && aY + 50 > bY){
        collideY = true;
    }else{
        collideY = false;
    }

    if(collideX && collideY){
        alert("Collision!");
    }else{
        alert("Nope.");
    }
}
//-------------------- End Collision test code.
