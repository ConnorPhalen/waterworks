 // gets the sound
            var audio = new Audio('sounds/water_click.wav');
            //plays the sound when clicked
            function click_Button() {
            audio.play();
            }


// Just sets up some initial variables.
var time = 0;
var timeOverflow = 0;
var TIMEOVERFLOW_MAX = 2;
var timerDelay = 33;
var waveMovement = 4;
var mainTimer = setInterval(function () { timeAdd();}, timerDelay);
var playerTurns = 0;
var scoreStart = 1000;
var TURNS_MAX = 0;
var scoreReduction = 100;

// Checks to see if time has reached its max limit.
function loseCheck(){
    if(testCollision('wave', 'gateImg')){
        clearInterval(mainTimer);
     }
}

// Increments the timer and moves the image. timeOverflow basically slows things down by a division of X.
// Want to make an algorithm to just plug-in numbers to get a set time. Would take a lot of math and time though.
function timeAdd(){
    time++;
    timeOverflow++;
    // Basically acts as a divider to slow down movement of the wave.
    if(timeOverflow > TIMEOVERFLOW_MAX){
        timeOverflow = 0;
        move();
    }
    loseCheck();
    // Tests for checking if there is an antX, then run the collision code and delete them if true.
    if(document.getElementById('ant1') !== null){
        antCollision('wave', 'ant1');
    }
    if(document.getElementById('ant2') !== null){
        antCollision('wave', 'ant2');
    }
    if(document.getElementById('ant3') !== null){
        antCollision('wave', 'ant3');
    }
    if(document.getElementById('ant4') !== null){
        antCollision('wave', 'ant4');
    }
    if(document.getElementById('ant5') !== null){
        antCollision('wave', 'ant5');
    }
    if(document.getElementById('ant6') !== null){
        antCollision('wave', 'ant6');
    }
}

// Grabs the picture ID, and its style value of left, and adds x px.
function move() {
    wave = document.getElementById("wave").style.left;
	wave = (parseInt(wave)+ waveMovement + "px");
	document.getElementById("wave").style.left = wave;
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
function antCollision(wave, ant) {
    waveID = wave;
    antID = ant;
    // Tests collision of wave against ant.
    if(testCollision(waveID, antID)){
        antID = document.getElementById(ant);
        if (antID.parentNode) {
            antID.parentNode.removeChild(antID);
        }
    }
}

// Checks the values of the buckets, and adds turns if they pass the specififed cases.
function scoreCounter(){
    
    // Sets some variables to help keep the code cleaner.
    var buck1 = parseInt(document.getElementById("bucketnumchange").innerHTML);
    var buck2 = parseInt(document.getElementById("bucketnumchange2").innerHTML);
    var buck1max = parseInt(document.getElementById("bucketnummax").innerHTML);
    var buck2max = parseInt(document.getElementById("bucketnummax2").innerHTML);

    // Sets variables to get the values of turns that do not count towards the total.
    var trythis = buck1 + buck2;
    var trythiscomp = buck1max + buck2max;

    // By default, get add a turn, but if turn exception, do not increment.
    switch(trythis) {

        case 0:

            break; 

        case trythiscomp:

            break;

        default:

            playerTurns++;

            break;

    }

    // Displays the turns used, and score reduction (could get rid of it, or have it subtract from total level score and show).
    document.getElementById("turnDisplay").innerHTML = "Turns Used: " + playerTurns;

    if(playerTurns > TURNS_MAX){
        scoreStart -= scoreReduction;
        document.getElementById("scoreDisplay").innerHTML = "Score: " + scoreStart;
    }
    if(scoreStart < 1){
        alert("gameOver();");
        
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
        // alert("Collision!");
        return true;
    }else{
        return false;
    }
}
//-------------------- End Collision code.



            //fills the buckets when dropped on waterBox
            function fillBucket(imgName) {
                var data = event.dataTransfer.getData("text");
                if (data == "bucket1" || data == "bucketone") {
                    image = document.getElementById("bucketNum1");
                    image.src = imgName;
                    var max = document.getElementById("bucketnummax").innerHTML;
                    document.getElementById("bucketnumchange").innerHTML = max;
                }
                if (data == "bucket2" || data == "bucketNum2") {
                    image = document.getElementById("bucketNum2");
                    image.src = imgName;
                    var max = document.getElementById("bucketnummax2").innerHTML;
                    document.getElementById("bucketnumchange2").innerHTML = max;
                }
                else {
                }
            }
            //allows items to be dragged
            function dragStart(event) {
                event.preventDefault();
            }
            //drag for first bucket
            function drag(event) {
                event.dataTransfer.setData("text", event.target.id);
            }
            //drag for second bucket
            function drag2(event) {
                event.dataTransfer.setData("text", event.target.id);
            }
            //empties buckets when dragged over
            function emptyBucket(imgName) {
                var data = event.dataTransfer.getData("text");
                if (data == "bucket1" || data == "bucketone") {
                    scoreCounter();
                    image = document.getElementById("bucketNum1");
                    image.src = imgName;
                    var max = document.getElementById("bucketnummax").innerHTML;
                    document.getElementById("bucketnumchange").innerHTML = "0";
                }
                if (data == "bucket2" || data == "bucketNum2") {
                    scoreCounter();
                    image = document.getElementById("bucketNum2");
                    image.src = imgName;
                    var max = document.getElementById("bucketnummax2").innerHTML;
                    document.getElementById("bucketnumchange2").innerHTML = "0";
                }
                else {

                }
            }
            function moveWater(imgName, imgName2) {
                var data = event.dataTransfer.getData("text");
                if ((data == "bucket1" || data == "bucketone" || event.target.id == "bucketnumchange" || event.target.id == "bucketnummax") && (event.target.id == "bucket2" || event.target.id == "buckettwo" || event.target.id == "bucketnumchange2" || event.target.id == "bucketnummax2")) {
                    // bucket2max parsed
                    var bucket2max = document.getElementById('bucketnummax2').innerHTML;
                    var bucket2max2 = parseInt(bucket2max);
                    // bucket2change parsed
                    var bucket2change = document.getElementById('bucketnumchange2').innerHTML;
                    var bucket2change2 = parseInt(bucket2change);
                    // numChange parsed
                    var numChange = document.getElementById('bucketnumchange').innerHTML;
                    var numChange2 = parseInt(numChange);
                    // diff parsed
                    var diff2 = bucket2max - bucket2change;
                    var diff = parseInt(diff2);
                    var zero = "0";
                    // if( document.getElementById('bucketnumchange').innerHTML == 0 || document.getElementById('bucketnumchange').innerHTML == document.getElementById('bucketnummax').innerHTML)
                    if (numChange2 > diff) {
                        document.getElementById('bucketnumchange2').innerHTML = bucket2max2;
                        var originBucket = numChange2 - diff;
                        document.getElementById('bucketnumchange').innerHTML = originBucket;
                        scoreCounter();
                        if (originBucket == zero) {
                            image = document.getElementById('bucketNum1');
                            image.src = imgName;
                        }
                    }
                    if (numChange2 < diff) {
                        var both = numChange2 + bucket2change2;
                        document.getElementById('bucketnumchange2').innerHTML = both;
                        document.getElementById('bucketnumchange').innerHTML = zero;
                        image = document.getElementById('bucketNum1');
                        image.src = imgName;
                        image2 = document.getElementById('bucketNum2');
                        image2.src = imgName2;
                        scoreCounter();
                        if (both == zero) {
                            image = document.getElementById('bucketNum2');
                            image.src = imgName;
                        }
                    }
                    if (numChange2 == diff) {
                        document.getElementById('bucketnumchange2').innerHTML = bucket2max2;
                        document.getElementById('bucketnumchange').innerHTML = zero;
                        image = document.getElementById('bucketNum1');
                        image.src = imgName;
                        image2 = document.getElementById('bucketNum2');
                        image2.src = imgName2;
                        scoreCounter();
                    }
                }
                if ((data == "bucket2" || data == "buckettwo" || event.target.id == "bucketnumchange2" || event.target.id == "bucketnummax2") && (event.target.id == "bucket1" || event.target.id == "bucketone" || event.target.id == "bucketnumchange" || event.target.id == "bucketnummax")) {
                    //bucket1max parsed
                    var bucket1max = document.getElementById('bucketnummax').innerHTML;
                    var bucket1max1 = parseInt(bucket1max);
                    //bucket1change parsed
                    var bucket1change = document.getElementById('bucketnumchange').innerHTML;
                    var bucket1change1 = parseInt(bucket1change);
                    //numChange parsed
                    var numChange = document.getElementById('bucketnumchange2').innerHTML;
                    var numChange2 = parseInt(numChange);
                    //diff parsed
                    var diff = bucket1max1 - bucket1change1;
                    var diff2 = parseInt(diff);
                    //ZERO
                    var zero = "0";
                    if (numChange2 > diff2) {
                        document.getElementById('bucketnumchange').innerHTML = bucket1max1;
                        var originBucket = numChange2 - diff2;
                        document.getElementById('bucketnumchange2').innerHTML = originBucket;
                        image2 = document.getElementById('bucketNum1');
                        image2.src = imgName2;
                        scoreCounter();

                        if (originBucket == zero) {
                            image = document.getElementById('bucketNum2');
                            image.src = imgName;
                        }
                    }
                    if (numChange2 < diff2) {
                        var both = numChange2 + bucket1change1;
                        document.getElementById('bucketnumchange').innerHTML = both;
                        document.getElementById('bucketnumchange2').innerHTML = zero;
                        image2 = document.getElementById('bucketNum1');
                        image2.src = imgName2;
                        image = document.getElementById('bucketNum2');
                        image.src = imgName;
                        scoreCounter();

                        if (both == zero) {
                            image2 = document.getElementById('bucketNum1');
                            image2.src = imgName
                        }
                    }
                    if (numChange2 == diff2) {
                        document.getElementById('bucketnumchange').innerHTML = bucket1max1;
                        document.getElementById('bucketnumchange2').innerHTML = "0";
                        image = document.getElementById('bucketNum2');
                        image.src = imgName;
                        image2 = document.getElementById('bucketNum1');
                        image2.src = imgName2;
                        scoreCounter();
                    }
                }
                if ((data == "bucket1" || data == "bucketone" || event.target.id == "bucketnumchange" || event.target.id == "bucketnummax") && (event.target.id == "bucket1" || event.target.id == "bucketone" || event.target.id == "bucketnumchange" || event.target.id == "bucketnummax")) {
                    // bucket2change parsed
                    var bucket2change = document.getElementById('bucketnumchange').innerHTML;
                    var bucket2change2 = parseInt(bucket2change);
                    document.getElementById('bucketnumchange').innerHTML = bucket2change2;

                }
                if ((data == "bucket2" || data == "buckettwo" || event.target.id == "bucketnumchange2" || event.target.id == "bucketnummax2") && (event.target.id == "bucket2" || event.target.id == "buckettwo" || event.target.id == "bucketnumchange2" || event.target.id == "bucketnummax2")) {
                    // bucket2change parsed
                    var bucket2change = document.getElementById('bucketnumchange2').innerHTML;
                    var bucket2change2 = parseInt(bucket2change);
                    document.getElementById('bucketnumchange2').innerHTML = bucket2change2;
                }
            }
           /* function fillTank(){
                
                
            }*/