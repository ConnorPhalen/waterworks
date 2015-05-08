var time = 0;
var TIME_MAX = 10;

// Checks to see if time has reached its max limit.
function waterTimer(){
    if(time >= TIME_MAX){
        alert("You Lose!");
    }
}

// Increments time by 1, and starts waterTimer().
function timeAdd(){
    time++;
    waterTimer();
}

// Tried to get the page to set an interval when it loaded.
window.onload = function () {
        if (time < 1) {
            setInterval(timeAdd(), 1000);
        } else {
            clearInterval(time);
            time = 0;
        }
    
}

// Rises from the shadows of JavaScript...
function batman(){
    alert("Batman!");
}

// Back snap in 3...2...1...
function bane(){
    alert("You mearly adopted the darkness, I... was born in it.");
}

// Sets the timeAdd() function to go off once a second.
function test() {
    setInterval(function(){time++; waterTimer();}, 1000);
}