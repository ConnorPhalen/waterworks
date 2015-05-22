$(document).ready(function() {

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

    var mySound = document.createElement('audio');
    $('#player').append(mySound);
    mySound.id = "mySound";
    playAudio('audio/bg_msc', 1);
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

function setMusic(volume) {
    var music = document.getElementById('mySound');
    music.volume = volume;
}


