<?php

$id = $_GET['id'];
$url="http://dev.retemet.com:3333/station/$id/last";

$data = file_get_contents($url);
$data = $data != false ? $data : [];

$dataMax = file_get_contents($url."max");

$res=array( 'last' => json_decode($data), 'max' => json_decode($dataMax));


header("Access-Control-Allow-Origin: *");
header("Content-type:application/json; charset=utf-8");
echo json_encode($res);

?>