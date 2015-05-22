// gets the sound
            var audio = new Audio('../sounds/water_click.wav');
            //plays the sound when clicked
            function click_Button() {
            audio.play();
            window.location.replace("../index.html")
            }


// Just sets up some initial variables.
var time = 0;
var timeOverflow = 0;
var TIMEOVERFLOW_MAX = 12;
var timerDelay = 33;
var waveMovement = 1;
var mainTimer = setInterval(function () { timeAdd();}, timerDelay);
var playerTurns = 0;
var scoreStart = 1000;
var turnsLowest = 4;
var turnsMax = 9;
var scoreReduction = 100;
// Checks to see if time has reached its max limit.
function loseCheck(){
    if(testCollision('wave', 'gateImg')){
        clearInterval(mainTimer);
        gameOver();
     }
}

function winCheck(){
    if(parseInt(document.getElementById('fillTo').innerHTML) == parseInt(document.getElementById('bucketnumchangeend').innerHTML)){
        gameWin();
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
	wave = (parseInt(wave)+ waveMovement + "%");
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
            scoreStart -= scoreReduction;
            document.getElementById("scoreDisplay").innerHTML = "Score: " + scoreStart;

            break;

    }

    // Displays the turns used, and score reduction (could get rid of it, or have it subtract from total level score and show).
    document.getElementById("turnDisplay").innerHTML = "Turns Used: " + playerTurns;

    // If score is zero or lower, call gameOver();
    if(scoreStart < 1){
        gameOver();
        
    }
}

//
function scoreCounterTank(){
    

    // Takes away a bit of score for each turn the player takes.
        playerTurns++;
        scoreStart -= scoreReduction;
        document.getElementById("scoreDisplay").innerHTML = "Score: " + scoreStart;

    // Displays the turns used, and score reduction (could get rid of it, or have it subtract from total level score and show).
    document.getElementById("turnDisplay").innerHTML = "Turns Used: " + playerTurns;

    // If score is zero or lower, call gameOver();
    if(scoreStart < 1){
        gameOver();
        
    }
}

// Creates a new div on the screen to display the users end score and other values.
function gameOver(){
    
    //creates the quit button
   var button = document.createElement("BUTTON");
    var buttonText = document.createTextNode("Quit");
    button.id = "winQuit";
    
    //creates the restart button
    var buttonRestart = document.createElement("BUTTON");
    var buttonText1 = document.createTextNode("restart");
    buttonRestart.id = "restart"; 
    
        var starImage = document.createElement("img");
    starImage.id = "starImage";
    
    starImage.src = "../artwork/3emptystar.png";
    
    // Creates the new Div that will show and hold the final scores.
    var gameOverDiv = document.createElement("div");
    gameOverDiv.id = 'endScreen';
    
    
    // Creates a paragraph element to hold the game over message.
    var gameOverDisplay = document.createElement("p");
    gameOverDisplay.id = 'gameEndDisplay';
    gameOverDisplay.innerHTML = "GAME OVER, FOOLS!";
    
     var winQuit = document.createElement("div");
    winQuit.id = 'winQuit';
    
    var restart = document.createElement("div");
    restart.id = 'restart';
    
    
    

        var starDisplay = document.createElement("div");
    starDisplay.id = 'starDisplay';
    
    // Creates a paragraph element to hold the score values around.
    var finalScoreDisplay = document.createElement("p");
    finalScoreDisplay.id = 'displayScore';
    finalScoreDisplay.innerHTML = "Final Score: " + scoreStart + "\n Turns Used: " + playerTurns + ".";
    
    // Attaches the new elements together and then puts them on the document body to display.
        starDisplay.appendChild(starImage);
    winQuit.appendChild(button);
    button.appendChild(buttonText);
    gameOverDiv.appendChild(winQuit);
    
    restart.appendChild(buttonRestart);
    buttonRestart.appendChild(buttonText1);
    gameOverDiv.appendChild(restart);
    
    gameOverDiv.appendChild(finalScoreDisplay);
    gameOverDiv.appendChild(gameOverDisplay);
    document.body.appendChild(gameOverDiv);
     gameOverDiv.appendChild(starDisplay);
    
    
    // Clears the wave timer to get rid of the wave movement.
    clearInterval(mainTimer);

    // Changes the src of the wave so it stops the .gif animation.
    document.getElementById('wave').src = "../artwork/wave_2.png";
    
    
    button.addEventListener("click", function() {
        audio.play();
        window.location.replace("../index.html");
                                                
                                                })
    buttonRestart.addEventListener("click", function() {
        audio.play();
        window.location.replace("7Level.html") 
    
    })
    
}




function gameWin(){
    
    //creates the quit button
    var button = document.createElement("BUTTON");
    var buttonText = document.createTextNode("Quit");
    button.id = "winQuit";
    
    //creates the restart button
    var buttonRestart = document.createElement("BUTTON");
    var buttonText1 = document.createTextNode("restart");
    buttonRestart.id = "restart";
    
    //creates the continue button
    var continueButton = document.createElement("BUTTON");
    var continueButtonText = document.createTextNode("continue");
    continueButton.id = "continues";
    
    // Creates the element for the star image, and checks to see how many stars the user should have.
    var starImage = document.createElement("img");
    starImage.id = "starImage";
    
        if (playerTurns <= turnsLowest) {
            starImage.src = "../artwork/3stars.png";
        }else if(playerTurns <= turnsMax && playerTurns > turnsLowest){
            starImage.src = "../artwork/3stars1empty.png";
        }else{
        starImage.src = "../artwork/3star2empty.png";
    }
        // Creates the new Div that will show and hold the final scores.
    var gameOverDiv = document.createElement("div");
    gameOverDiv.id = 'endScreen';

    
    
    // Creates a paragraph element to hold the game over message.
    var gameOverDisplay = document.createElement("p");
    gameOverDisplay.id = 'gameEndDisplay';
    gameOverDisplay.innerHTML = "YOU WIN M8";

    var starDisplay = document.createElement("div");
    starDisplay.id = 'starDisplay';
    
    var winQuit = document.createElement("div");
    winQuit.id = 'winQuit';
    
    var restart = document.createElement("div");
    restart.id = 'restart';
    
    var continues = document.createElement("div");
    continues.id = 'continues';
    
    // Creates a paragraph element to hold the score values around.
    var finalScoreDisplay = document.createElement("p");
    finalScoreDisplay.id = 'displayScore';
    finalScoreDisplay.innerHTML = "Score: " + scoreStart + "\n Turns Used: " + playerTurns + ".";
    // Attaches the new elements together and then puts them on the document body to display.
    starDisplay.appendChild(starImage);
    
    winQuit.appendChild(button);
    button.appendChild(buttonText);
    gameOverDiv.appendChild(winQuit);
    
    restart.appendChild(buttonRestart);
    buttonRestart.appendChild(buttonText1);
    gameOverDiv.appendChild(restart);
    
    continues.appendChild(continueButton);
    continueButton.appendChild(continueButtonText);
    gameOverDiv.appendChild(continues);
    
    gameOverDiv.appendChild(finalScoreDisplay);
    gameOverDiv.appendChild(gameOverDisplay);
    document.body.appendChild(gameOverDiv);
    
     gameOverDiv.appendChild(starDisplay);
    
    // Clears the wave timer to get rid of the wave movement.
    clearInterval(mainTimer);

    // Changes the src of the wave so it stops the .gif animation.
    document.getElementById('wave').src = "../artwork/long_wave_1.png";

    // Creates a Division to hold the star image.
    button.addEventListener("click", function() {
        audio.play();
        window.location.replace("../index.html") })
    buttonRestart.addEventListener("click", function() {
        audio.play();
        window.location.replace("7Level.html") })
    continueButton.addEventListener("click", function() {
        audio.play();
        window.location.replace("8Level.html") })
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
    if((parseInt(bID.left) - parseInt(aID.width)) + 10 < parseInt(aID.left) && parseInt(aID.left) < ((parseInt(bID.left) + parseInt(bID.width)) + 1)){
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
               if (data == "bucket3" || data == "bucketNum3") {
                    image = document.getElementById("bucketNum3");
                    image.src = imgName;
                    var max = document.getElementById("bucketnummax3").innerHTML;
                    document.getElementById("bucketnumchange3").innerHTML = max;
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
            //drag for third bucket
            function drag3(event) {
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
                 if (data == "bucket3" || data == "bucketNum3") {
                     scoreCounter();
                    image = document.getElementById("bucketNum3");
                    image.src = imgName;
                    var max = document.getElementById("bucketnummax3").innerHTML;
                    document.getElementById("bucketnumchange3").innerHTML = "0";
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
                
                
                
                
                
                
                if ((data == "bucket1" || data == "bucketone" || data == "bucketnumchange" || data == "bucketnummax") && (event.target.id == "bucket3" || event.target.id == "bucketthree" || event.target.id == "bucketnumchange3" || event.target.id == "bucketnummax3")) {
                    // bucket2max parsed
                    var bucket3max = document.getElementById('bucketnummax3').innerHTML;
                    var bucket3max3 = parseInt(bucket3max);
                    // bucket2change parsed
                    var bucket3change = document.getElementById('bucketnumchange3').innerHTML;
                    var bucket3change3 = parseInt(bucket3change);
                    // numChange parsed
                    var numChange = document.getElementById('bucketnumchange').innerHTML;
                    var numChange2 = parseInt(numChange);
                    // diff parsed
                    var diff2 = bucket3max - bucket3change;
                    var diff = parseInt(diff2);
                    var zero = "0";
                    if (numChange2 > diff) {
                        document.getElementById('bucketnumchange3').innerHTML = bucket3max3;
                        var originBucket = numChange2 - diff;
                        document.getElementById('bucketnumchange').innerHTML = originBucket;
                        scoreCounter();
                        if (originBucket == zero) {
                            image = document.getElementById('bucketNum1');
                            image.src = imgName;
                        }
                    }
                    if (numChange2 < diff) {
                        var both = numChange2 + bucket3change3;
                        document.getElementById('bucketnumchange3').innerHTML = both;
                        document.getElementById('bucketnumchange').innerHTML = zero;
                        image = document.getElementById('bucketNum1');
                        image.src = imgName;
                        image2 = document.getElementById('bucketNum3');
                        image2.src = imgName2;
                        scoreCounter();
                        if (both == zero) {
                            image = document.getElementById('bucketNum3');
                            image.src = imgName;
                        }
                    }
                    if (numChange2 == diff) {
                        document.getElementById('bucketnumchange3').innerHTML = bucket3max3;
                        document.getElementById('bucketnumchange').innerHTML = zero;
                        image = document.getElementById('bucketNum1');
                        image.src = imgName;
                        image2 = document.getElementById('bucketNum3');
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
                
                
                
                 if ((data == "bucket2" || data == "buckettwo" || data == "bucketnumchange2" || data == "bucketnummax2") && (event.target.id == "bucket3" || event.target.id == "bucketthree" || event.target.id == "bucketnumchange3" || event.target.id == "bucketnummax3")) {
                    // bucket2max parsed
                    var bucket3max = document.getElementById('bucketnummax3').innerHTML;
                    var bucket3max3 = parseInt(bucket3max);
                    // bucket2change parsed
                    var bucket3change = document.getElementById('bucketnumchange3').innerHTML;
                    var bucket3change3 = parseInt(bucket3change);
                    // numChange parsed
                    var numChange = document.getElementById('bucketnumchange2').innerHTML;
                    var numChange2 = parseInt(numChange);
                    // diff parsed
                    var diff2 = bucket3max - bucket3change;
                    var diff = parseInt(diff2);
                    var zero = "0";
                    if (numChange2 > diff) {
                        document.getElementById('bucketnumchange3').innerHTML = bucket3max3;
                        var originBucket = numChange2 - diff;
                        document.getElementById('bucketnumchange2').innerHTML = originBucket;
                        scoreCounter();
                        if (originBucket == zero) {
                            image = document.getElementById('bucketNum2');
                            image.src = imgName;
                        }
                    }
                    if (numChange2 < diff) {
                        var both = numChange2 + bucket3change3;
                        document.getElementById('bucketnumchange3').innerHTML = both;
                        document.getElementById('bucketnumchange2').innerHTML = zero;
                        image = document.getElementById('bucketNum2');
                        image.src = imgName;
                        image2 = document.getElementById('bucketNum3');
                        image2.src = imgName2;
                        scoreCounter();
                        if (both == zero) {
                            image = document.getElementById('bucketNum3');
                            image.src = imgName;
                        }
                    }
                    if (numChange2 == diff) {
                        document.getElementById('bucketnumchange3').innerHTML = bucket3max3;
                        document.getElementById('bucketnumchange2').innerHTML = zero;
                        image = document.getElementById('bucketNum2');
                        image.src = imgName;
                        image2 = document.getElementById('bucketNum3');
                        image2.src = imgName2;
                        scoreCounter();
                    }
                } 
                
                
                
                   if ((data == "bucket3" || data == "bucketthree" || data == "bucektnumchange3" || data == "bucketnummax3") && (event.target.id == "bucket1" || event.target.id == "bucketone" || event.target.id == "bucketnumchange" || event.target.id == "bucketnummax")) {
                    //bucket1max parsed
                    var bucket1max = document.getElementById('bucketnummax').innerHTML;
                    var bucket1max1 = parseInt(bucket1max);
                    //bucket1change parsed
                    var bucket1change = document.getElementById('bucketnumchange').innerHTML;
                    var bucket1change1 = parseInt(bucket1change);
                    //numChange parsed
                    var numChange = document.getElementById('bucketnumchange3').innerHTML;
                    var numChange2 = parseInt(numChange);
                    //diff parsed
                    var diff = bucket1max1 - bucket1change1;
                    var diff2 = parseInt(diff);
                    //ZERO
                    var zero = "0";
                    if (numChange2 > diff2) {
                        document.getElementById('bucketnumchange').innerHTML = bucket1max1;
                        var originBucket = numChange2 - diff2;
                        document.getElementById('bucketnumchange3').innerHTML = originBucket;
                        image2 = document.getElementById('bucketNum1');
                        image2.src = imgName2;
                        scoreCounter();
                        if (originBucket == zero) {
                            image = document.getElementById('bucketNum3');
                            image.src = imgName;
                        }
                    }
                    if (numChange2 < diff2) {
                        var both = numChange2 + bucket1change1;
                        document.getElementById('bucketnumchange').innerHTML = both;
                        document.getElementById('bucketnumchange3').innerHTML = zero;
                        image2 = document.getElementById('bucketNum1');
                        image2.src = imgName2;
                        image = document.getElementById('bucketNum3');
                        image.src = imgName;
                        scoreCounter();
                        if (both == zero) {
                            image2 = document.getElementById('bucketNum1');
                            image2.src = imgName
                        }
                    }
                    if (numChange2 == diff2) {
                        document.getElementById('bucketnumchange').innerHTML = bucket1max1;
                        document.getElementById('bucketnumchange3').innerHTML = "0";
                        image = document.getElementById('bucketNum3');
                        image.src = imgName;
                        image2 = document.getElementById('bucketNum1');
                        image2.src = imgName2;
                        scoreCounter();
                    }
                }
                
                
                
                 if ((data == "bucket3" || data == "bucketthree" || data == "bucektnumchange3" || data == "bucketnummax3") && (event.target.id == "bucket2" || event.target.id == "buckettwo" || event.target.id == "bucketnumchange2" || event.target.id == "bucketnummax2")) {
                    // bucket2max parsed
                    var bucket2max = document.getElementById('bucketnummax2').innerHTML;
                    var bucket2max2 = parseInt(bucket2max);
                    // bucket2change parsed
                    var bucket2change = document.getElementById('bucketnumchange2').innerHTML;
                    var bucket2change2 = parseInt(bucket2change);
                    // numChange parsed
                    var numChange = document.getElementById('bucketnumchange3').innerHTML;
                    var numChange2 = parseInt(numChange);
                    // diff parsed
                    var diff2 = bucket2max - bucket2change;
                    var diff = parseInt(diff2);
                    var zero = "0";
                    if (numChange2 > diff) {
                        document.getElementById('bucketnumchange2').innerHTML = bucket2max2;
                        var originBucket = numChange2 - diff;
                        document.getElementById('bucketnumchange3').innerHTML = originBucket;
                        image = document.getElementById('bucketNum2')
                        image.src = imgName2;
                        scoreCounter();
                        if (originBucket == zero) {
                            image = document.getElementById('bucketNum3');
                            image.src = imgName;
                        }
                    }
                    if (numChange2 < diff) {
                        var both = numChange2 + bucket2change2;
                        document.getElementById('bucketnumchange2').innerHTML = both;
                        document.getElementById('bucketnumchange3').innerHTML = zero;
                        image = document.getElementById('bucketNum3');
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
                        document.getElementById('bucketnumchange3').innerHTML = zero;
                        image = document.getElementById('bucketNum3');
                        image.src = imgName;
                        image2 = document.getElementById('bucketNum2');
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
                    if ((data == "bucket3" || data == "bucketthree" || data == "bucektnumchange3" || data == "bucketnummax3") && (event.target.id == "bucket3" || event.target.id == "bucketthree" || event.target.id == "bucketnumchange3" || event.target.id == "bucketnummax3")) {
                    // bucket2change parsed
                    var bucket3change = document.getElementById('bucketnumchange3').innerHTML;
                    var bucket3change3 = parseInt(bucket3change);
                    document.getElementById('bucketnumchange3').innerHTML = bucket3change3;
                }
            }









//fill tank function-----------------------------------------------------------------------------------------------------------------------------------------
function fillTank(imgName, imgName2, tank1, tank2, tank3, tank4) {
                var data = event.dataTransfer.getData("text");
                var zero = "0";
                scoreCounterTank();

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
                    // parse tanker max 
                    var tankermax1 = document.getElementById('fillTo').innerHTML;
                    var tankermax = parseInt(tankermax1);
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
                                scoreCounter();
                                if (newSum > tankermax) {
                                    image2 = document.getElementById('tanker');
                                    image2.src = tank3;
                                }
                                if (newSum < tankermax) {
                                    image2 = document.getElementById('tanker');
                                    image2.src = tank4;
                                }
                                if (newSum == tankermax) {
                                    image2 = document.getElementById('tanker');
                                    image2.src = tank1;
                                    document.getElementById('endBucketone').style.right = "30%";
                                    gameWin();
                                }
                            }
                            if (newSum == zero) {
                                document.getElementById('bucketnumchangeend').innerHTML = zero;
                                document.getElementById('bucketnumchange').innerHTML = tankAmount;
                                image = document.getElementById('bucketNum1');
                                image.src = imgName2;
                                image2 = document.getElementById('tanker');
                                image2.src = tank2;
                            }
                            if (newSum < zero) {
                                document.getElementById('bucketnumchangeend').innerHTML = zero;
                                document.getElementById('bucketnumchange').innerHTML = tankAmount;
                                image = document.getElementById('bucketNum1');
                                image.src = imgName2;
                                image2 = document.getElementById('tanker');
                                image2.src = tank2;
                                scoreCounter();
                            }
                        }
                    }
                    if (bucketChange > zero) {
                        document.getElementById('bucketnumchangeend').innerHTML = total;
                        document.getElementById('bucketnumchange').innerHTML = zero;
                        image = document.getElementById('bucketNum1');
                        image.src = imgName;
                        if (total > tankermax) {
                            image2 = document.getElementById('tanker');
                            image2.src = tank3;
                        }
                        if (total < tankermax) {
                            image2 = document.getElementById('tanker');
                            image2.src = tank4;
                        }
                        if (total == tankermax) {
                            image2 = document.getElementById('tanker');
                            image2.src = tank1;
                            document.getElementById('endBucketone').style.right = "30%";
                            gameWin();
                        }
                        if (total == zero) {
                            image2 = document.getElementById('tanker');
                            image2.src = tank2;
                        }
                        
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
                    // parse tanker max 
                    var tankermax1 = document.getElementById('fillTo').innerHTML;
                    var tankermax = parseInt(tankermax1);
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
                                if (newSum > tankermax) {
                                    image2 = document.getElementById('tanker');
                                    image2.src = tank3;
                                }
                                if (newSum < tankermax) {
                                    image2 = document.getElementById('tanker');
                                    image2.src = tank4;
                                }
                                if (newSum == tankermax) {
                                    image2 = document.getElementById('tanker');
                                    image2.src = tank1;
                                    document.getElementById('endBucketone').style.right = "30%";
                                    gameWin();
                                }
                            }
                            if (newSum == zero) {
                                document.getElementById('bucketnumchangeend').innerHTML = zero;
                                document.getElementById('bucketnumchange2').innerHTML = tankAmount;
                                image = document.getElementById('bucketNum2');
                                image.src = imgName2;
                                image2 = document.getElementById('tanker');
                                image2.src = tank2;
                            }
                            if (newSum < zero) {
                                document.getElementById('bucketnumchangeend').innerHTML = zero;
                                document.getElementById('bucketnumchange2').innerHTML = tankAmount;
                                image = document.getElementById('bucketNum2');
                                image.src = imgName2;
                                image2 = document.getElementById('tanker');
                                image2.src = tank2;
                            }
                        }
                    }
                    if (bucketChange > zero) {
                        document.getElementById('bucketnumchangeend').innerHTML = total;
                        document.getElementById('bucketnumchange2').innerHTML = zero;
                        image = document.getElementById('bucketNum2');
                        image.src = imgName;
                        if (total > tankermax) {
                            image2 = document.getElementById('tanker');
                            image2.src = tank3;
                        }
                        if (total < tankermax) {
                            image2 = document.getElementById('tanker');
                            image2.src = tank4;
                        }
                        if (total == tankermax) {
                            image2 = document.getElementById('tanker');
                            image2.src = tank1;
                            document.getElementById('endBucketone').style.right = "30%";
                            gameWin();
                        }
                        if (total == zero) {
                            image2 = document.getElementById('tanker');
                            image2.src = tank2;
                        }
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
                    // parse tanker max 
                    var tankermax1 = document.getElementById('fillTo').innerHTML;
                    var tankermax = parseInt(tankermax1);
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
                                scoreCounterTank();
                                if (newSum > tankermax) {
                                    image2 = document.getElementById('tanker');
                                    image2.src = tank3;
                                }
                                if (newSum < tankermax) {
                                    image2 = document.getElementById('tanker');
                                    image2.src = tank4;
                                }
                                if (newSum == tankermax) {
                                    image2 = document.getElementById('tanker');
                                    image2.src = tank1;
                                    document.getElementById('endBucketone').style.right = "30%";
                                    gameWin();
                                }
                            }
                            if (newSum == zero) {
                                document.getElementById('bucketnumchangeend').innerHTML = zero;
                                document.getElementById('bucketnumchange3').innerHTML = tankAmount;
                                image = document.getElementById('bucketNum3');
                                image.src = imgName2;
                                image2 = document.getElementById('tanker');
                                image2.src = tank2;
                                scoreCounterTank();
                            }
                            if (newSum < zero) {
                                document.getElementById('bucketnumchangeend').innerHTML = zero;
                                document.getElementById('bucketnumchange3').innerHTML = tankAmount;
                                image = document.getElementById('bucketNum3');
                                image.src = imgName2;
                                image2 = document.getElementById('tanker');
                                image2.src = tank2;
                            }
                        }
                    }
                    if (bucketChange > zero) {
                        document.getElementById('bucketnumchangeend').innerHTML = total;
                        document.getElementById('bucketnumchange3').innerHTML = zero;
                        image = document.getElementById('bucketNum3');
                        image.src = imgName;
                        if (total > tankermax) {
                            image2 = document.getElementById('tanker');
                            image2.src = tank3;
                        }
                        if (total < tankermax) {
                            image2 = document.getElementById('tanker');
                            image2.src = tank4;
                        }
                        if (total == tankermax) {
                            image2 = document.getElementById('tanker');
                            image2.src = tank1;
                            document.getElementById('endBucketone').style.right = "30%";
                            gameWin();
                        }
                        if (total == zero) {
                            image2 = document.getElementById('tanker');
                            image2.src = tank2;
                        }
                    }
                }
                winCheck();
            }