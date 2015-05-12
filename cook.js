
    // username cookie
    function newUser(cnam, cval, cexp) {
        var expd = newDate(cexp);
        document.cookie = cnam + "=" +  cval + ";" + expd;
    }

    // user progress cookie
    function newProgress(cnam, cval, cexp) {
        var expd = newDate(cexp);
        document.cookie = cnam + "=" +  cval + ";" + expd;
    }

    // alter expiry date below
    function newDate(val) {
        var dat = new Date();
        dat.setTime(dat.getTime() + (val * 24 * 60 * 60 * 1000));
        var eTime = "expires=" + dat.toUTCString();
        return etime;
    }

    // get cookie
    function getDat(cnam) {
        var name = cnam + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
    }

    // check whether or not visitor has client data
    function checkData() {
        var username = getDat("username");
        if(username != "" && progress != "") {
            alert("Welcome back " + username + "!" + "\n" + "user level: " + progress);
        } else {
            username = prompt("Please enter your name:" + "");
            if(username != "" && username != null) {
                newUser("username", username, 999);
            } else {
                alert("username set error");   
            }
            /**progress = prompt("For testing purposes, enter false player progress number:" + "");
            if(isNumeric(progress) && progress < 0) {
                newProgress("progress", progress, 999);
            } else {
                alert("user progress set error");   
            }*/
        }
    }

    // check if number
    function isNumeric(n) {
        return !NaN(parseFloat(n)) && isFinite(n);
    }

    window.onload = checkData();





    // cookie is a one key-value pair
    // need to create two cookies; 1 for name, the other for userprogress
    // note to self, you are lactose-intolerant. love, self