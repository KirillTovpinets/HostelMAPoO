<?php 
	ini_set("display_errors", 1);
	ini_set("error_reporting", E_ALL);
	include "config.php";

	$mysql = mysqli_connect($host, $user, $pass, $dbname) or die("Ошибка подключения к базе данных: " . mysquli_connect_error());
	$mysql->query("SET NAMES utf8");
	$result = $mysql->query("SELECT * FROM appointment");

	$places = array();

	while ($temp = $result->fetch_assoc()) {
		array_push($places, $temp);
	}

	echo json_encode($places);
?>