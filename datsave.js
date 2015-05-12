
var usersdata;

onload = function () {
    var name = prompt("Enter username:" + "");
    if (inArray(name)) {
        alert("Welcome back " + name + "!");
    } else {
        window.usersdata.add(name);
        alert("New user! Welcome " + name + "!");
    }
}

function inArray(obj) {
    for (i = 0; i < window.usersdata.length ; i++) {
        if (obj.equals(window.usersdata[i])) {
            return true;
        }
    }
    return false;
}

