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
            //drag for frist bucket
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
                    image = document.getElementById("bucketNum1");
                    image.src = imgName;
                    var max = document.getElementById("bucketnummax").innerHTML;
                    document.getElementById("bucketnumchange").innerHTML = "0";
                }
                if (data == "bucket2" || data == "bucketNum2") {
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
                    if (numChange2 > diff) {
                        document.getElementById('bucketnumchange2').innerHTML = bucket2max2;
                        var originBucket = numChange2 - diff;
                        document.getElementById('bucketnumchange').innerHTML = originBucket;

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
            
            function fillTank(imgName, imgName2) {
                var data = event.dataTransfer.getData("text");
                var zero = "0";

                if ((data == "bucket1" || data == "bucketone" || data == "bucketnumchange" || data == "bucketnummax") && (event.target.id == "endBucket" || event.target.id == "endBucketone" || event.target.id == "bucketnumchangeend")) {
                    // parse the changing number of end bucket
                    var tank = document.getElementById('bucketnumchangeend').innerHTML;
                    var tankAmount = parseInt(tank);
                    // parse changing number of bucket 1
                    var bucket1Change = document.getElementById('bucketnumchange').innerHTML;
                    var bucketChange = parseInt(bucket1Change);
                    // parse max of bucket 1
                    var bucket1Max = document.getElementById('bucketnummax').innerHTML;
                    var bucketMax = parseInt(bucket1Max);
                    // create the total for end bucket
                    var total = tankAmount + bucketChange;
                    if (bucketChange == zero) {
                        if (tankAmount == zero) {
                            document.getElementById('bucketnumchangeend').innerHTML = zero;
                            document.getElementById('bucketnumchange').innerHTML = zero;
                        }
                        if (tankAmount > zero) {
                            var newSum = tankAmount - bucketMax;
                            if (newSum > zero) {
                                document.getElementById('bucketnumchangeend').innerHTML = newSum;
                                document.getElementById('bucketnumchange').innerHTML = bucketMax;
                                image = document.getElementById('bucketNum1');
                                image.src = imgName2;
                            }
                            if (newSum == zero) {
                                document.getElementById('bucketnumchangeend').innerHTML = zero;
                                document.getElementById('bucketnumchange').innerHTML = tankAmount;
                                document.getElementById('endBucket').style.backgroundColor = '';
                                image = document.getElementById('bucketNum1');
                                image.src = imgName2;
                            }
                            if (newSum < zero) {
                                document.getElementById('bucketnumchangeend').innerHTML = zero;
                                document.getElementById('bucketnumchange').innerHTML = tankAmount;
                                document.getElementById('endBucket').style.backgroundColor = '';
                                image = document.getElementById('bucketNum1');
                                image.src = imgName2;
                            }
                        }
                    }
                    if (bucketChange > zero) {
                        document.getElementById('bucketnumchangeend').innerHTML = total;
                        document.getElementById('bucketnumchange').innerHTML = zero;
                        image = document.getElementById('bucketNum1');
                        image.src = imgName;
                        document.getElementById('endBucket').style.backgroundColor = 'LightBlue';
                    }
                }
                if ((data == "bucket2" || data == "buckettwo" || data == "bucketnumchange2" || data == "bucketnummax2") && (event.target.id == "endBucket" || event.target.id == "endBucketone" || event.target.id == "bucketnumchangeend")) {
                    // parse the changing number of end bucket
                    var tank = document.getElementById('bucketnumchangeend').innerHTML;
                    var tankAmount = parseInt(tank);
                    // parse changing number of bucket 2
                    var bucket2Change = document.getElementById('bucketnumchange2').innerHTML;
                    var bucketChange = parseInt(bucket2Change);
                    // parse max of bucket 2
                    var bucket2Max = document.getElementById('bucketnummax2').innerHTML;
                    var bucketMax = parseInt(bucket2Max);
                    // create the total for end bucket
                    var total = tankAmount + bucketChange;
                    if (bucketChange == zero) {
                        if (tankAmount == zero) {
                            document.getElementById('bucketnumchangeend').innerHTML = zero;
                            document.getElementById('bucketnumchange2').innerHTML = zero;
                        }
                        if (tankAmount > zero) {
                            var newSum = tankAmount - bucketMax;
                            if (newSum > zero) {
                                document.getElementById('bucketnumchangeend').innerHTML = newSum;
                                document.getElementById('bucketnumchange2').innerHTML = bucketMax;
                                image = document.getElementById('bucketNum2');
                                image.src = imgName2;
                            }
                            if (newSum == zero) {
                                document.getElementById('bucketnumchangeend').innerHTML = zero;
                                document.getElementById('bucketnumchange2').innerHTML = tankAmount;
                                document.getElementById('endBucket').style.backgroundColor = '';
                                image = document.getElementById('bucketNum2');
                                image.src = imgName2;
                            }
                            if (newSum < zero) {
                                document.getElementById('bucketnumchangeend').innerHTML = zero;
                                document.getElementById('bucketnumchange2').innerHTML = tankAmount;
                                document.getElementById('endBucket').style.backgroundColor = '';
                                image = document.getElementById('bucketNum2');
                                image.src = imgName2;
                            }
                        }
                    }
                    if (bucketChange > zero) {
                        document.getElementById('bucketnumchangeend').innerHTML = total;
                        document.getElementById('bucketnumchange2').innerHTML = zero;
                        image = document.getElementById('bucketNum2');
                        image.src = imgName;
                        document.getElementById('endBucket').style.backgroundColor = 'LightBlue';
                    }
                }
                if ((data == "bucket3" || data == "bucketthree" || data == "bucektnumchange3" || data == "bucketnummax3") && (event.target.id == "endBucket" || event.target.id == "endBucketone" || event.target.id == "bucketnumchangeend")) {
                    // parse the changing number of end bucket
                    var tank = document.getElementById('bucketnumchangeend').innerHTML;
                    var tankAmount = parseInt(tank);
                    // parse changing number of bucket 3
                    var bucket3Change = document.getElementById('bucketnumchange3').innerHTML;
                    var bucketChange = parseInt(bucket3Change);
                    // parse max of bucket 3
                    var bucket3Max = document.getElementById('bucketnummax3').innerHTML;
                    var bucketMax = parseInt(bucket3Max);
                    // create the total for end bucket
                    var total = tankAmount + bucketChange;
                    if (bucketChange == zero) {
                        if (tankAmount == zero) {
                            document.getElementById('bucketnumchangeend').innerHTML = zero;
                            document.getElementById('bucketnumchange3').innerHTML = zero;
                        }
                        if (tankAmount > zero) {
                            var newSum = tankAmount - bucketMax;
                            if (newSum > zero) {
                                document.getElementById('bucketnumchangeend').innerHTML = newSum;
                                document.getElementById('bucketnumchange3').innerHTML = bucketMax;
                                image = document.getElementById('bucketNum3');
                                image.src = imgName2;
                            }
                            if (newSum == zero) {
                                document.getElementById('bucketnumchangeend').innerHTML = zero;
                                document.getElementById('bucketnumchange3').innerHTML = tankAmount;
                                document.getElementById('endBucket').style.backgroundColor = '';
                                image = document.getElementById('bucketNum3');
                                image.src = imgName2;
                            }
                            if (newSum < zero) {
                                document.getElementById('bucketnumchangeend').innerHTML = zero;
                                document.getElementById('bucketnumchange3').innerHTML = tankAmount;
                                document.getElementById('endBucket').style.backgroundColor = '';
                                image = document.getElementById('bucketNum3');
                                image.src = imgName2;
                            }
                        }
                    }
                    if (bucketChange > zero) {
                        document.getElementById('bucketnumchangeend').innerHTML = total;
                        document.getElementById('bucketnumchange3').innerHTML = zero;
                        image = document.getElementById('bucketNum3');
                        image.src = imgName;
                        document.getElementById('endBucket').style.backgroundColor = 'LightBlue';
                    }
                }
            }