function fillBucket(imgName) {
                image = document.getElementById('emptyBucket');
                image.src = imgName;
            }
function dragStart(event) {
                event.preventDefault();
            }
function drag(event) {
                event.dataTransfer.setData("text", event.target.id);
            }