<?php
    $name = $_GET["usn"];
    $score = $_GET["s"];

    $file = fopen("dat.txt", "r") or die("Unable to open file!");








    //if match do
    $file = fopen("dat.txt", "a+") or die("Unable to open file!");
    //get score datum
    //set name to name and set score to datum
    //else
    echo fwrite($file, "$name;$score<br/>");

    fclose($file);
    header("Location: http://www.doooge.netau.net/prgTst/dataTest.html?usn=$user&s=$score&reg=true");
?>
