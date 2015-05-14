<?php
    $name = $_GET["usn"];
    $score = $_GET["s"];
    $new = "no";

    if(strlen($name) > 5) {
        
        if (!is_numeric($score)) {

            die("Score is not a number.");
            
        } 

    } else {
        
        die("Name can not be less than 5 characters.");

    }

    foreach (file("dat.txt") as $line) {

         $match = FALSE;

         if (strcmp($name, substr($line, 0, strpos($line, ';'))) == 0) {
             
              $match = TRUE;
             
              break;
         } 
         
    }

    if (!$match) {
        
        $new = "yes";

        $dat = fopen("dat.txt", "a+") or die("Unable to open file!");
    
        echo fwrite($dat, "$name;$score\n");

        fclose($dat);

    } else {

        $score = substr($line, strpos($line, ';') + 1);

    }  

    header("Location: http://www.doooge.netau.net/prgTst/dataTest.html?reg=true&ndat=$new");
    die();
?>