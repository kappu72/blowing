<?php
$url="http://dev.retemet.com:3333/station/st_19070267";

$data = file_get_contents($url);
header("Access-Control-Allow-Origin: *");
header("Content-type:application/json; charset=utf-8");
echo $data;

?>