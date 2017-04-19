<?php
ini_set("display_errors", 1);
ini_set("error_reporting", E_ALL);
include "config.php";
$mysql = mysqli_connect($host,$user,$pass, $dbname) or die ("Ошибка: " . mysqli_connect_error()); // коннект с сервером бд
$mysql->query("SET NAMES utf8");

$result=$mysql->query("SELECT visitor.*, appointment.title AS AppTitle, work_place.title AS WorkTitle, work_place.city, work_place.region, sex.title AS Gender, nationality.title AS NationTitle  FROM visitor INNER JOIN appointment ON visitor.appointment = appointment.id INNER JOIN work_place ON visitor.work_place = work_place.id INNER JOIN sex ON visitor.sex = sex.id INNER JOIN nationality ON visitor.Nationality = nationality.id ORDER BY m_name"); // запрос на выборку

$list = array();
while( $row = $result->fetch_assoc()){
  array_push($list, $row);
}

mysqli_close($mysql);
echo json_encode($list);
?>