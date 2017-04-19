<?php 
	ini_set("display_errors", 1);
	ini_set("error_reporting", E_ALL);
	include "config.php";

	$mysql = mysqli_connect($host, $user, $pass, $dbname) or die("Ошибка подключения к базе данных: " . mysquli_connect_error());
	$mysql->query("SET NAMES utf8");

	if($_GET["id"] == 1){
		$result = $mysql->query("SELECT * FROM work_place");	
	}else if($_GET["id"] == 2){
		$result = $mysql->query("SELECT * FROM appointment");	
	}else if($_GET["id"] == 3){
		$result = $mysql->query("SELECT * FROM nationality");	
	}
	else if($_GET["id"] == 4){
		$result = $mysql->query("SELECT * FROM sex");	
	}else if($_GET['id'] == 5){
		$result = $mysql->query("SELECT * FROM visitor");
	}

	$places = array();

	while ($temp = $result->fetch_assoc()) {
		array_push($places, $temp);
	}

	echo json_encode($places);
?>