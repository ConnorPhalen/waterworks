<?php
    
    // clear leaderboard
    
    $contents = file_get_contents("ldb.txt");
    
    $clear = str_replace ($contents, "", $contents);

    file_put_contents("ldb.txt", $clear);

    //  start sorting
    
    $bad = array();
    
    $token = 1;

    while ($token != 11) {
        
        $lead = 0;

        $targ;

        foreach (file("dat.txt") as $line) {

            if (!in_array($line, $bad)) {
                
                $scstr = substr($line, strpos($line, ';') + 1);

                $score = (int)$scstr;

                if($score >= $lead) {
                
                    $lead = $score;

                    $targ = $line;

                    $name = substr($line, 0, strpos($line, ';'));

                }

            }  

        }
        array_push($bad, $targ);

        file_put_contents("ldb.txt", "$token)\t $name\t -\t $lead points \n", FILE_APPEND);  

        $token++;

    }

    header("Location: leadbd.html?rdir=true");
    die();
?>