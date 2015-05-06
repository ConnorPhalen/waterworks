// Creates an element called Canvas, and passes it as a 2D element.
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");

//Sets the width and height of the canvas.
canvas.width = 512;
canvas.height = 512;

// Sets canvas as a child of the body.
document.body.appendChild(canvas);

// Set a variable to check if the image is loaded.
var backReady = 'false';

// Sets the var backImage to be a new Image, and creates a function to check to see if it is loaded.
var backImage = new Image();
backImage.onload = function () {
    backReady = true;
}

// Sets the backImage to be an image.
backImage.src = "images/background_star.png";