<?php
   $json = $_POST['json'];

   if (json_decode($json) != null) { /* sanity check */
     $file = fopen('topics.json','w+');
     fwrite($file, $json);
     fclose($file);
   } else {
     // handle error 
   }
?>