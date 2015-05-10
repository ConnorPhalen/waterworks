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

// Increments time by 1, and starts waterTimer().
function timeAdd(){
    time++;
    waterTimer();
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
           mainTimer = setInterval(function () { time++; waterTimer(); }, 1000);
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

// testing out some collision code
collideX = false;
collideY = false;
aX = document.getElementById("batman").style.left;
bX = document.getElementById("bucket").style.left;
aY = document.getElementById("batman").style.top;
bY = document.getElementById("bucket").style.top;

if(aX - 20 < bX && aX + 20 > bX){
    collideX = true;
}else{
    collideX = false;
}

if(aY - 20 < bY && aY + 20 > bY){
    collideY = true;
}else{
    collideY = false;
}

if(collideX && collideY){
    alert("Collision!");
}
