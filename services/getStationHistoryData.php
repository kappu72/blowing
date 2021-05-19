<?php
error_reporting(E_ERROR | E_PARSE);
$id = $_GET['id'];
$idro = $_GET['idro'];

if(isset($idro)) {
  $url="http://dev.retemet.com:3333/station/$id/idrometro";
}else {
  $url="http://dev.retemet.com:3333/station/$id/hourly";
}
$data = file_get_contents($url);
$data = $data != false ? $data : [];

$res=array( 'history' => json_decode($data));


header("Access-Control-Allow-Origin: *");
header("Content-type:application/json; charset=utf-8");
echo json_encode($res);

?>