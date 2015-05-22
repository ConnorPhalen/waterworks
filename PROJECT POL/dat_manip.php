<?php
    $name = $_GET["usn"];
    $score = $_GET["s"];
    $new = "yes";

    if(strlen($name) > 5) {
        
        if (!is_numeric($score)) {

            die("Score is not a number.");
            
        } 

    } else {
        
        die("Name can not be less than 5 characters.");

    }

    $loc = "http://www.doooge.netau.net/prgTst/dataTest.html?reg=true&ndat=$new";

    $dat = fopen("dat.txt", "a+") or die("Unable to open file!");
    
    echo fwrite($dat, "$name;$score\n");

    fclose($dat);

    header("Location: $loc");
    die();
?>