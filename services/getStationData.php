<?php
$url="http://dev.retemet.com:3333/station/st_19070267/last";

$data = file_get_contents($url);
$data = $data != false ? $data : [];

$dataMax = file_get_contents($url."max");

header("Access-Control-Allow-Origin: *");
header("Content-type:application/json; charset=utf-8");
echo "{ last:".$data. "max: ".$dataMax."}";

?>