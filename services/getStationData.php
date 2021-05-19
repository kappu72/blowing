<?php
error_reporting(E_ERROR | E_PARSE);
$id = $_GET['id'];
$delta = $_GET['delta'];

$url="http://dev.retemet.com:3333/station/$id/last";

$data = file_get_contents(isset($delta) ? "$url/$delta" : $url);
$data = $data != false ? $data : [];

$dataMax = file_get_contents($url."max");

$res=array( 'last' => json_decode($data), 'max' => json_decode($dataMax));


header("Access-Control-Allow-Origin: *");
header("Content-type:application/json; charset=utf-8");
echo json_encode($res);

?>