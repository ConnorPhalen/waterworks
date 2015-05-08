
    function changeImage() {
        var image = document.getElementById('bucket');
        if(image.src.match("bucketwater")){
            image.src = "../../Justin%20Test/bucketempty.png"
        }else{
            image.src = "../../Justin%20Test/bucketwater.png"
        }
    }
    function fontSizeUp() {
        var fontEnlarge = document.getElementById("paragraph");
        fontEnlarge.style.fontSize = "25px";
    }