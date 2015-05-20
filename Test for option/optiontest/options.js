$(document).ready(function() {

    $("#volume").slider({
        min: 0,
        max: 100,
        value: 0,
        range: "min",
        animate: true,
        slide: function(event, ui) {
            setVolume((ui.value) / 100);
        }

    });

    $("#music").slider({
        min: 0,
        max: 100,
        value: 0,
        range: "min",
        animate: true,
        slide: function(event, ui) {
            setMusic((ui.value) / 100);
        }

    });

    var myMedia = document.createElement('audio');
    $('#player').append(myMedia);
    myMedia.id = "myMedia";
    playAudio('audio/bg_msc', 0);

    var mySound = document.createElement('audio');
    $('#player').append(mySound);
    mySound.id = "mySound";
    playAudio('audio/ryan_mod_hov', 1);
});


function playAudio(fileName, musicFlag) {
    if (musicFlag === 0) {
        var mediaExt = (myMedia.canPlayType('audio/mp3')) ? '.mp3' : (myMedia.canPlayType('audio/ogg')) ? '.ogg' : '';
        if (mediaExt) {
            myMedia.src = fileName + mediaExt;
            myMedia.setAttribute('loop', 'loop');
            myMedia.volume = 0;
            myMedia.play();
        }
    } else {
        var mediaExt = (mySound.canPlayType('audio/mp3')) ? '.mp3' : (mySound.canPlayType('audio/ogg')) ? '.ogg' : '';
        if (mediaExt) {
            mySound.src = fileName + mediaExt;
            mySound.setAttribute('loop', 'loop');
            mySound.volume = 0;
            mySound.play();
        }
    }
}

function setVolume(volume) {
    var music = document.getElementById('myMedia');
    music.volume = volume;
}

function setMusic(volume) {
    var music = document.getElementById('mySound');
    music.volume = volume;
}

// sound for button
var audio = new Audio('audio/water_click.wav');

function click_Button() {
    audio.play();
}

var check = 0;
function sound () {
	if (check == 0) {
		setVolume(1);
		
		setMusic(1);
		check = 1;
		document.getElementById("myImage").src="images/volume.png";
	} else {
		setVolume(0);
		
		setMusic(0);
		check = 0;
		document.getElementById("myImage").src="images/muted.png";
	} 	 
}

