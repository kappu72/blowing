<?php
$id = $_GET['id'];
$url="http://dev.retemet.com:3333/station/$id/hourly";

$data = file_get_contents($url);
$data = $data != false ? $data : [];

$res=array( 'history' => json_decode($data));


header("Access-Control-Allow-Origin: *");
header("Content-type:application/json; charset=utf-8");
echo json_encode($res);

?>