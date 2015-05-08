var time = 0;
var TIME_MAX = 10;

//
function waterTimer(){
    if(time >= TIME_MAX){
        alert("You Lose!");
    }
}

// timeAdd 
function timeAdd(){
    time++;
    waterTimer();
}

window.onload = function () {
    document.getElementById('waterTest').onclick = function () {
        if (time < 1) {
            setInterval(timeAdd(), 1000);
        } else {
            clearInterval(time);
            time = 0;
        }
    }
}

function batman(){
    alert("Batman!");
}
// Sets the timeAdd() function to go off once a second.
function test() {
    setInterval(timeAdd(), 1000);
}