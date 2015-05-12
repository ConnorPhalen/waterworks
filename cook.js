
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

    function newDate(val) {
        var dat = new Date();
        dat.setTime(dat.getTime() + (val * 24 * 60 * 60 * 1000));
        var eTime = "expires=" + dat.toUTCString();
        return etime;
    }

    function getName(cnam) {
        var name = cnam + "=";

    }

    function getProgress() {
        
    }

    function checkData() {
        var cname = getCookieData("username");
        if(cname != "") {
            alert(cname);
        }
    }

    // cookie is a one key-value pair
    // need to create two cookies; 1 for name, the other for userprogress
    // note to self, you are lactose-intolerant. love, self