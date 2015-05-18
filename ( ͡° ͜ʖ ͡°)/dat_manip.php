<?php
    $name = $_GET["usn"];
    $score = $_GET["s"];
    $new = "no";

    $targ;

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

              $targ = $line;
             
              break;
         } 
         
    }

    $loc = "http://www.doooge.netau.net/prgTst/dataTest.html?reg=true&ndat=$new";

    if (!$match) {
        
        $new = "yes";

        $dat = fopen("dat.txt", "a+") or die("Unable to open file!");
    
        echo fwrite($dat, "$name;$score\n");

        fclose($dat);

    } else {

        // get score
        //$score = substr($line, strpos($line, ';') + 1);

        //update score
        $dat = file_get_contents("dat.txt");

        $newdat = str_replace($targ, "$name;$score\n", $dat);

        file_put_contents("dat.txt", $newdat);

        $loc = "http://www.doooge.netau.net/prgTst/leadbd.php";

    }  

    header("Location: $loc");
    die();
?>